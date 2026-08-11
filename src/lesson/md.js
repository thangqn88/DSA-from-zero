// Bộ đọc định dạng bài học Markdown.
//
// Vì sao có file này: mỗi bài viết bằng .vue tốn khoảng 48 dòng dây nối lặp lại y
// hệt nhau (thẻ <section>, 7 khối <LessonPart>, 8 dòng import, defineProps), cộng
// thuế thẻ HTML bọc quanh từng đoạn văn và từng ô bảng. Ở định dạng này tác giả
// chỉ viết nội dung, còn khung do LessonRenderer.vue dựng.
//
// File này CHỈ chạy lúc build (vite.config.js gọi vào), không đi vào bundle trình
// duyệt — nên markdown-it không tính vào dung lượng người học phải tải.
//
// Cú pháp: ba chỉ thị, luôn nằm ở đầu dòng.
//
//   @part ly-thuyet          bắt đầu một mục của khung bài học
//   @vidu  <id> | <tiêu đề>  bắt đầu một ví dụ điển hình (@vidu* nếu là ví dụ sao)
//   @slot  de-bai            bắt đầu một trong 6 phần của ví dụ đó
//   @ngoai                   đóng ví dụ đang mở, quay lại văn xuôi của mục Ví dụ
//
// HTML thô vẫn dùng được, cần cho điểm neo widget và các hộp có class riêng
// (.widget, .realworld, .problem-box). Lưu ý của CommonMark: một khối HTML kết
// thúc ở dòng trống đầu tiên, nên ĐỪNG chèn dòng trống vào giữa một khối <div>.
//
// Mọi thứ còn lại là Markdown thường. Code C++ dùng khối ``` nên không phải escape
// &lt; và &amp; bằng tay nữa — nội dung được nhúng bằng v-html nên Vue không đụng vào.
import MarkdownIt from 'markdown-it'

// Chỉ ba mục này chứa nội dung do tác giả viết. Năm mục còn lại của khung bài học
// (mục tiêu, quiz, bài tập, leetcode, dự án) sinh ra từ dữ liệu có cấu trúc trong
// src/data/lessons/<sid>.js, không phải từ file .md.
const PART_HOP_LE = new Set(['ly-thuyet', 'vi-sao', 'vi-du'])
const PART_VAN_XUOI = ['ly-thuyet', 'vi-sao']

// Đúng 6 slot của WorkedExample.vue. Thiếu một cái là nhãn vẫn hiện mà bên dưới
// trống trơn — đúng con bọ đã sống sót qua 5 bài ở thời còn viết bằng .vue, nên ở
// đây nó bị bắt ngay lúc build chứ không đợi ai đó nhìn thấy.
const SLOT = ['de-bai', 'y-tuong', 'thuat-toan', 'chay-tay', 'code', 'toi-uu']

const md = new MarkdownIt({
  html: true, // cần cho điểm neo widget và vài nhãn có class riêng
  linkify: false,
  typographer: false,
  breaks: false,
})

// Mọi bảng trong bài học đều dùng chung một kiểu. Gắn class ở đây để tác giả viết
// được bảng Markdown thuần thay vì tụt về HTML thô chỉ vì một cái class.
md.renderer.rules.table_open = () => '<table class="formula-table">\n'

// Tiêu đề trong thân bài cần id để neo được. Sinh tự động theo đúng quy ước
// "auto-" đã dùng ở các bài viết bằng .vue.
md.renderer.rules.heading_open = (tokens, i, opts, env, self) => {
  const inline = tokens[i + 1]
  if (inline && inline.type === 'inline' && !tokens[i].attrGet('id')) {
    tokens[i].attrSet('id', 'auto-' + slug(inline.content))
  }
  return self.renderToken(tokens, i, opts)
}

export function slug(s) {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function parseLessonMd(src, ten = 'bài học') {
  const loi = (m) => {
    throw new Error(`[${ten}] ${m}`)
  }

  const parts = {}
  // Mục Ví dụ điển hình là một DÃY khối theo đúng thứ tự tác giả viết, không phải
  // một danh sách ví dụ thuần. Bài Tham lam chèn văn xuôi và hai widget xen giữa
  // các ví dụ; giữ thứ tự ở đây là cách duy nhất để renderer dựng lại đúng.
  const viDu = []
  const daKhaiBao = new Set()

  let part = null
  let vd = null
  let slot = null
  let ngoai = false
  let buf = []

  // Đổ phần văn bản đang tích luỹ vào đúng chỗ của nó. Gọi trước mỗi chỉ thị mới
  // và một lần nữa ở cuối file.
  function xaBuf() {
    const text = buf.join('\n').trim()
    buf = []
    if (!text) return
    if (vd) {
      if (!slot) loi(`nội dung trong @vidu "${vd.id}" chưa nằm trong @slot nào`)
      vd.slots[slot] += md.render(text)
      return
    }
    if (!part) loi('có nội dung trước @part đầu tiên')
    if (part === 'vi-du') {
      if (!ngoai) {
        loi('văn xuôi trong mục vi-du phải nằm sau một @ngoai (hoặc thuộc về một @slot)')
      }
      viDu.push({ kind: 'html', html: md.render(text) })
      return
    }
    parts[part] += md.render(text)
  }

  for (const raw of src.split(/\r?\n/)) {
    const line = raw.trimEnd()

    if (line.startsWith('@part ')) {
      xaBuf()
      vd = null
      slot = null
      ngoai = false
      part = line.slice(6).trim()
      if (!PART_HOP_LE.has(part)) {
        loi(`@part "${part}" không thuộc khung bài học (chỉ nhận: ${[...PART_HOP_LE].join(', ')})`)
      }
      if (daKhaiBao.has(part)) loi(`@part "${part}" khai báo hai lần`)
      daKhaiBao.add(part)
      if (part !== 'vi-du') parts[part] = ''
      continue
    }

    if (line === '@vidu' || line.startsWith('@vidu ') || line.startsWith('@vidu*')) {
      xaBuf()
      if (part !== 'vi-du') loi('@vidu chỉ được nằm trong @part vi-du')
      const official = line.startsWith('@vidu*')
      const rest = line.slice(official ? 6 : 5).trim()
      const vach = rest.indexOf('|')
      if (vach < 0) loi(`@vidu phải có dạng "@vidu <id> | <tiêu đề>", nhận được: ${line}`)
      const id = rest.slice(0, vach).trim()
      const title = rest.slice(vach + 1).trim()
      if (!id || !title) loi(`@vidu thiếu id hoặc tiêu đề: ${line}`)
      if (viDu.some((b) => b.kind === 'vidu' && b.id === id)) loi(`hai ví dụ cùng id "${id}"`)
      vd = {
        kind: 'vidu',
        id,
        title,
        official,
        slots: Object.fromEntries(SLOT.map((s) => [s, ''])),
        daCo: new Set(),
      }
      slot = null
      ngoai = false
      viDu.push(vd)
      continue
    }

    if (line.startsWith('@slot ')) {
      xaBuf()
      if (!vd) loi('@slot phải nằm sau một @vidu')
      slot = line.slice(6).trim()
      if (!SLOT.includes(slot)) loi(`@slot "${slot}" không có trong WorkedExample (chỉ nhận: ${SLOT.join(', ')})`)
      if (vd.daCo.has(slot)) loi(`ví dụ "${vd.id}" khai báo @slot ${slot} hai lần`)
      vd.daCo.add(slot)
      continue
    }

    if (line === '@ngoai') {
      xaBuf()
      if (part !== 'vi-du') loi('@ngoai chỉ có nghĩa trong @part vi-du')
      vd = null
      slot = null
      ngoai = true
      continue
    }

    if (/^@[a-z]+\b/.test(line)) {
      loi(`chỉ thị lạ ở đầu dòng: ${line}`)
    }

    buf.push(raw)
  }
  xaBuf()

  for (const p of PART_VAN_XUOI) {
    if (!parts[p]?.trim()) loi(`thiếu nội dung cho @part ${p}`)
  }
  if (!daKhaiBao.has('vi-du')) loi('thiếu @part vi-du')

  const examples = viDu.filter((b) => b.kind === 'vidu')
  if (!examples.length) loi('mục vi-du không có ví dụ nào')
  for (const e of examples) {
    for (const s of SLOT) {
      if (!e.slots[s].trim()) loi(`ví dụ "${e.id}" thiếu nội dung cho @slot ${s}`)
    }
    delete e.daCo
  }

  return { parts, viDu, examples }
}
