// Nối widget tương tác vào bài viết bằng Markdown.
//
// Bài viết bằng .vue tự import widget của mình rồi gọi trong onMounted. Bài
// Markdown không có chỗ để viết câu lệnh đó, nên quy ước thay thế là: widget của
// bài <sid> nằm ở src/widgets/<sid>.js và xuất ra đúng một hàm tên bắt đầu bằng
// "init". Không có file thì bài đó đơn giản là không có widget.
//
// Điểm neo (các thẻ có id mà widget gọi getElementById) nằm trong HTML thô của
// file .md và được nhúng bằng v-html. Vue không đụng vào nội dung v-html, nhưng
// nó VẪN nằm trong DOM thật, nên getElementById tìm thấy bình thường.
const modules = import.meta.glob('../widgets/*.js', { eager: true })

export function coWidget(sid) {
  return `../widgets/${sid}.js` in modules
}

export function initWidgets(sid) {
  const mod = modules[`../widgets/${sid}.js`]
  if (!mod) return false

  const ten = Object.keys(mod).find((k) => k.startsWith('init') && typeof mod[k] === 'function')
  if (!ten) {
    throw new Error(`src/widgets/${sid}.js không xuất ra hàm init nào`)
  }
  mod[ten]()
  return true
}
