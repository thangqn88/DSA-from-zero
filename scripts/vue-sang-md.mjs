// Chuyển một bài học viết bằng .vue sang định dạng Markdown của src/content/.
//
// Vì sao là script chứ không phải agent: HTML -> Markdown là việc cơ học. Nhờ LLM
// đọc rồi viết lại từng bài tốn khoảng 20k token mỗi bài mà không mua được thêm
// chất lượng nào — script làm đúng phần chiếm 95% khối lượng với chi phí bằng không,
// người chỉ soát lại chỗ nó tự báo là lệch.
//
// Dùng:  node scripts/vue-sang-md.mjs src/sections/DoPhucTap.vue [--ghi]
// Không có --ghi thì chỉ in ra màn hình, không đụng vào cây thư mục.
//
// Script KHÔNG cố chuyển mọi thứ. Ba chỗ nó cố tình giữ nguyên HTML thô, vì cố
// chuyển sẽ hỏng: thẻ có class riêng (.idea-label, .realworld, .problem-box,
// .widget), bảng có ô gộp hoặc <br>, và mọi thẻ nó không nhận ra.
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, basename } from 'node:path'

const SLOT = ['de-bai', 'y-tuong', 'thuat-toan', 'chay-tay', 'code', 'toi-uu']
const PART_VAN_XUOI = ['ly-thuyet', 'vi-sao']

const canhBao = []
function bao(m) {
  canhBao.push(m)
}

// ---------------------------------------------------------------- inline

function giaiMa(s) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&') // luôn cuối cùng, nếu không &amp;lt; sẽ ra "<"
}

// <code> xử lý TRƯỚC <strong> vì trong bài có <strong>...<code>x</code>...</strong>,
// tức code nằm bên trong. Làm ngược lại thì cặp ** rơi vào giữa backtick.
function inline(html) {
  let s = html
    .replace(/<code>([\s\S]*?)<\/code>/g, (_, c) => '`' + giaiMa(c).replace(/\s+/g, ' ').trim() + '`')
    .replace(/<strong>([\s\S]*?)<\/strong>/g, (_, c) => '**' + c.trim() + '**')
    .replace(/<br\s*\/?>/g, ' ')
  if (/<[a-zA-Z/]/.test(s.replace(/`[^`]*`/g, ''))) {
    bao(`còn thẻ HTML trong đoạn văn: ${s.slice(0, 90)}`)
  }
  return giaiMa(s).replace(/\s+/g, ' ').trim()
}

// ---------------------------------------------------------------- khối

function khoiCode(html) {
  const m = html.match(/^<pre[^>]*><code>([\s\S]*?)<\/code><\/pre>/)
  if (!m) return null
  return { dai: m[0].length, md: '```cpp\n' + giaiMa(m[1]).replace(/^\n+|\n+$/g, '') + '\n```' }
}

function khoiTieuDe(html) {
  const m = html.match(/^<h([2-6])[^>]*>([\s\S]*?)<\/h\1>/)
  if (!m) return null
  // id viết tay trong thẻ cũ bị bỏ: md.js tự sinh id "auto-<slug tiêu đề>", và
  // không có gì trong dự án trỏ tới các id cũ đó (đã kiểm bằng grep).
  return { dai: m[0].length, md: '#'.repeat(Number(m[1])) + ' ' + inline(m[2]) }
}

function khoiDoan(html) {
  const m = html.match(/^<p(\s[^>]*)?>([\s\S]*?)<\/p>/)
  if (!m) return null
  // Đoạn có class riêng (.idea-label) giữ nguyên HTML thô — class là thứ Markdown
  // không diễn đạt được, và md.js bật html:true đúng để nhận những chỗ này.
  if (m[1]) return { dai: m[0].length, md: m[0].trim() }
  return { dai: m[0].length, md: inline(m[2]) }
}

function khoiDanhSach(html) {
  const m = html.match(/^<(ul|ol)>([\s\S]*?)<\/\1>/)
  if (!m) return null
  const muc = [...m[2].matchAll(/<li>([\s\S]*?)<\/li>/g)].map(x => inline(x[1]))
  if (!muc.length) return null
  const md = muc.map((t, i) => (m[1] === 'ol' ? `${i + 1}. ` : '- ') + t).join('\n')
  return { dai: m[0].length, md }
}

function khoiTrichDan(html) {
  const m = html.match(/^<blockquote>([\s\S]*?)<\/blockquote>/)
  if (!m) return null
  const noi = [...m[1].matchAll(/<p>([\s\S]*?)<\/p>/g)].map(x => inline(x[1]))
  const md = (noi.length ? noi : [inline(m[1])]).map(t => '> ' + t).join('\n>\n')
  return { dai: m[0].length, md }
}

function khoiBang(html) {
  const m = html.match(/^<table[^>]*>([\s\S]*?)<\/table>/)
  if (!m) return null
  const raw = { dai: m[0].length, md: m[0].trim() }

  const dong = [...m[1].matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map(r =>
    [...r[1].matchAll(/<(t[hd])(\s[^>]*)?>([\s\S]*?)<\/\1>/g)].map(c => ({
      dau: c[1],
      coThuocTinh: !!c[2],
      noi: c[3],
    })),
  )
  if (!dong.length) return raw

  const rong = dong[0].length
  const phucTap =
    dong.some(r => r.length !== rong || r.some(c => c.coThuocTinh || /<br/.test(c.noi))) ||
    dong[0].some(c => c.dau !== 'th')
  // Ô gộp, <br>, hay hàng lệch số cột: bảng Markdown không diễn đạt được. Giữ
  // nguyên HTML thô còn hơn xuất ra một bảng vỡ.
  if (phucTap) {
    bao('bảng giữ nguyên HTML thô (ô gộp, <br>, hoặc không có hàng tiêu đề)')
    return raw
  }

  const o = c => inline(c.noi).replace(/\|/g, '\\|')
  const md = [
    '| ' + dong[0].map(o).join(' | ') + ' |',
    '|' + '---|'.repeat(rong),
    ...dong.slice(1).map(r => '| ' + r.map(o).join(' | ') + ' |'),
  ].join('\n')
  return { dai: m[0].length, md }
}

const BOC = [khoiCode, khoiTieuDe, khoiDoan, khoiDanhSach, khoiTrichDan, khoiBang]

// Đọc lần lượt các khối cấp cao nhất. Gặp thứ không nhận ra thì chép nguyên và
// báo ra, chứ tuyệt đối không bỏ qua — mất nội dung âm thầm là hỏng nặng nhất.
function sangMarkdown(html) {
  let con = html
  const ra = []
  while (true) {
    con = con.replace(/^\s+/, '')
    if (!con) break
    if (con.startsWith('<!--')) {
      const het = con.indexOf('-->')
      con = het < 0 ? '' : con.slice(het + 3)
      continue
    }
    let xong = null
    for (const f of BOC) {
      xong = f(con)
      if (xong) break
    }
    if (!xong) {
      const het = con.indexOf('\n\n')
      const doan = (het < 0 ? con : con.slice(0, het)).trim()
      bao(`không nhận ra khối, chép nguyên HTML: ${doan.slice(0, 90)}`)
      xong = { dai: het < 0 ? con.length : het, md: doan }
    }
    ra.push(xong.md)
    con = con.slice(xong.dai)
  }
  return ra.join('\n\n')
}

// ---------------------------------------------------------------- bài học

function layPart(src, sid, part) {
  const mo = `<LessonPart :sid="'${sid}'" part="${part}">`
  const i = src.indexOf(mo)
  if (i < 0) return null
  const j = src.indexOf('</LessonPart>', i)
  return src.slice(i + mo.length, j)
}

function viDuSangMd(html) {
  const ra = []
  let con = html
  while (true) {
    const i = con.indexOf('<WorkedExample')
    if (i < 0) break
    const truoc = con.slice(0, i).trim()
    if (truoc) ra.push('@ngoai\n\n' + sangMarkdown(truoc))

    const j = con.indexOf('</WorkedExample>', i)
    const than = con.slice(i, j)
    const dau = than.slice(0, than.indexOf('>') + 1)
    const id = dau.match(/\bid="([^"]+)"/)?.[1]
    const title = dau.match(/\btitle="([^"]+)"/)?.[1]
    const sao = /:official="true"|\bofficial\b(?!=)/.test(dau)
    if (!id || !title) throw new Error(`WorkedExample thiếu id hoặc title: ${dau}`)

    const slot = new Map()
    for (const m of than.matchAll(/<template #([a-z-]+)>([\s\S]*?)<\/template>/g)) {
      slot.set(m[1], m[2])
    }
    const thieu = SLOT.filter(s => !slot.has(s))
    if (thieu.length) bao(`ví dụ ${id} thiếu slot: ${thieu.join(', ')}`)

    const khoi = [`@vidu${sao ? '*' : ''} ${id} | ${giaiMa(title)}`]
    for (const s of SLOT) {
      if (!slot.has(s)) continue
      khoi.push(`@slot ${s}\n\n` + sangMarkdown(slot.get(s)))
    }
    ra.push(khoi.join('\n\n'))
    con = con.slice(j + '</WorkedExample>'.length)
  }
  const cuoi = con.trim()
  if (cuoi) ra.push('@ngoai\n\n' + sangMarkdown(cuoi))
  return ra.join('\n\n')
}

// Đếm ký tự văn bản thuần hai bên để bắt chỗ mất nội dung. Không đòi khớp tuyệt
// đối — dấu ** và ` của Markdown vốn ít hơn thẻ HTML — chỉ đòi lệch dưới 2%.
//
// Phải tách code ra khỏi văn xuôi rồi đếm riêng hai phần, không được đếm gộp.
// Trong .vue, code C++ escape thành &lt; &gt; nên phép gỡ thẻ không đụng tới nó;
// trong .md nó là "vector<int>" thật, và phép gỡ thẻ ăn luôn "<int>". Đếm gộp thì
// hai bên lệch 40% chỉ vì cách viết code khác nhau, đúng chỗ chẳng mất gì.
function boKhoang(s) {
  return s.replace(/[`*#|>\-\s]/g, '').length
}

function demVanXuoi(s) {
  return boKhoang(giaiMa(s.replace(/<[^>]+>/g, '')))
}

function tachCodeVue(s) {
  const code = [...s.matchAll(/<pre[^>]*><code>([\s\S]*?)<\/code><\/pre>/g)].map(m => m[1])
  return { vanXuoi: s.replace(/<pre[^>]*><code>[\s\S]*?<\/code><\/pre>/g, ' '), code }
}

function tachCodeMd(s) {
  const code = [...s.matchAll(/```[a-z]*\n([\s\S]*?)```/g)].map(m => m[1])
  // Bốn dòng chỉ thị không phải nội dung: bên .vue chúng là tên thẻ và thuộc tính,
  // vốn đã bị phép gỡ thẻ ăn mất. Để lại thì mọi bài đều báo dư khoảng 3%.
  const vanXuoi = s
    .replace(/```[a-z]*\n[\s\S]*?```/g, ' ')
    .replace(/^@(part|slot|vidu\*?|ngoai)\b.*$/gm, '')
  return { vanXuoi, code }
}

function soSanh(nhan, truoc, sau) {
  const lech = truoc === 0 ? 0 : Math.abs(sau - truoc) / truoc
  if (lech > 0.02) {
    bao(`${nhan} LỆCH ${(lech * 100).toFixed(1)}% (${truoc} -> ${sau}) — phải soát tay`)
  }
  return lech
}

function chuyen(duongDan) {
  const src = readFileSync(duongDan, 'utf8')
  const sid = src.match(/data-sid="([^"]+)"/)?.[1]
  if (!sid) throw new Error(`${duongDan}: không tìm thấy data-sid`)

  const ra = []
  for (const part of PART_VAN_XUOI) {
    const html = layPart(src, sid, part)
    if (html === null) throw new Error(`${duongDan}: thiếu @part ${part}`)
    ra.push(`@part ${part}\n\n` + sangMarkdown(html))
  }
  const viDu = layPart(src, sid, 'vi-du')
  if (viDu === null) throw new Error(`${duongDan}: thiếu @part vi-du`)
  ra.push('@part vi-du\n\n' + viDuSangMd(viDu))

  const md = ra.join('\n\n') + '\n'

  const nguon = tachCodeVue(layPart(src, sid, 'ly-thuyet') + layPart(src, sid, 'vi-sao') + viDu)
  const dich = tachCodeMd(md)
  const lech = Math.max(
    soSanh('VĂN XUÔI', demVanXuoi(nguon.vanXuoi), demVanXuoi(dich.vanXuoi)),
    soSanh('CODE', boKhoang(giaiMa(nguon.code.join(''))), boKhoang(dich.code.join(''))),
  )
  if (nguon.code.length !== dich.code.length) {
    bao(`SỐ KHỐI CODE lệch: ${nguon.code.length} -> ${dich.code.length}`)
  }
  return { sid, md, lech }
}

// ---------------------------------------------------------------- chạy

const doiSo = process.argv.slice(2)
const ghi = doiSo.includes('--ghi')
const tep = doiSo.filter(a => !a.startsWith('--'))
if (!tep.length) {
  console.error('Dùng: node scripts/vue-sang-md.mjs <file.vue> [...] [--ghi]')
  process.exit(1)
}

for (const t of tep) {
  canhBao.length = 0
  const { sid, md, lech } = chuyen(resolve(t))
  const dich = resolve('src/content', sid + '.md')
  if (ghi) {
    writeFileSync(dich, md, 'utf8')
    console.log(`✓ ${basename(t)} -> src/content/${sid}.md  (lệch ${(lech * 100).toFixed(1)}%)`)
  } else {
    console.log(md)
  }
  for (const c of canhBao) console.error(`  ! [${sid}] ${c}`)
}
