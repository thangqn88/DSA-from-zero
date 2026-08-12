// Nguồn sự thật duy nhất về cấu trúc 1 bài học. Mọi component, menu và test
// đều đọc từ đây — muốn đổi khung bài học thì sửa đúng 1 chỗ này.
export const LESSON_PARTS = [
  { key: 'muc-tieu', num: 0, title: 'Mục tiêu bài học' },
  { key: 'ly-thuyet', num: 1, title: 'Lý thuyết cơ bản' },
  { key: 'vi-sao', num: 2, title: 'Vì sao kiến thức này quan trọng' },
  { key: 'quiz', num: 3, title: 'Quiz kiểm tra lý thuyết' },
  { key: 'vi-du', num: 4, title: 'Ví dụ điển hình' },
  { key: 'bai-tap', num: 5, title: 'Bài tập kiểm tra' },
  { key: 'leetcode', num: 6, title: 'Tài nguyên tự luyện LeetCode' },
]

const BY_KEY = Object.fromEntries(LESSON_PARTS.map(p => [p.key, p]))

export function partId(sid, key) {
  return `${sid}--${key}`
}

export function partTitle(key) {
  const p = BY_KEY[key]
  if (!p) throw new Error(`Không có phần bài học tên "${key}"`)
  return p.num === 0 ? p.title : `${p.num}. ${p.title}`
}

// sid 'dfs-bfs' -> 'src/sections/DfsBfs.vue'. Quy ước này đúng với cả 10 file cũ,
// nên không còn phải viết tay đường dẫn ở hai nơi.
export function sidToFile(sid) {
  const pascal = sid.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join('')
  return `src/sections/${pascal}.vue`
}

// Bài viết bằng Markdown nằm ở đây. Sự tồn tại của file này CHÍNH LÀ công tắc:
// có nó thì bài render bằng LessonRenderer.vue, không có thì dùng file .vue theo
// sidToFile ở trên. Không thêm cờ nào trong CHAPTERS cho việc này — một cờ nữa là
// một nguồn sự thật nữa để quên bật.
export function sidToMd(sid) {
  return `src/content/${sid}.md`
}

// Nguồn sự thật duy nhất về thứ tự học. LESSON_SECTIONS và menu trái đều suy ra
// từ đây — đừng định nghĩa thứ tự bài học ở bất kỳ chỗ nào khác.
// ready: cờ của BÀI, đã có file nội dung. capstoneReady: cờ của CHƯƠNG, đã có dữ
// liệu dự án thực hành ở src/data/capstones/<key>.js.
// Cờ duAn đã bị xoá ở Giai đoạn 2.6 — nó là cờ của bài, mà bài không còn dự án
// riêng. Đừng dựng lại nó.
// "trang-chu" không nằm ở đây vì nó là trang giới thiệu, không phải bài học.
export const CHAPTERS = [
  {
    key: 'nen-mong', num: 1, title: 'Nền móng', capstoneReady: true,
    lessons: [
      { sid: 'do-phuc-tap', title: 'Độ phức tạp thuật toán và mô hình chi phí', ready: true },
      { sid: 'mang-chuoi', title: 'Mảng, chuỗi và mảng động', ready: true },
      { sid: 'de-quy', title: 'Đệ quy và hệ thức truy hồi', ready: true },
      { sid: 'danh-sach-lien-ket', title: 'Danh sách liên kết', ready: true },
    ],
  },
  {
    key: 'xu-ly-day', num: 2, title: 'Xử lý dãy', capstoneReady: false,
    lessons: [
      { sid: 'sap-xep', title: 'Sắp xếp: merge, quick, counting', ready: false },
      { sid: 'tim-kiem-nhi-phan', title: 'Tìm kiếm nhị phân và tìm nhị phân trên đáp án', ready: false },
      { sid: 'hai-con-tro-cua-so-truot', title: 'Hai con trỏ và cửa sổ trượt', ready: false },
      { sid: 'tong-tien-to', title: 'Tổng tiền tố và mảng hiệu', ready: false },
    ],
  },
  {
    key: 'tra-cuu', num: 3, title: 'Tra cứu', capstoneReady: false,
    lessons: [
      { sid: 'ngan-xep-hang-doi', title: 'Ngăn xếp và hàng đợi', ready: true },
      { sid: 'bang-bam', title: 'Bảng băm', ready: true },
      { sid: 'heap-hang-doi-uu-tien', title: 'Heap và hàng đợi ưu tiên', ready: false },
      { sid: 'trie', title: 'Trie — cây tiền tố', ready: false },
    ],
  },
  {
    key: 'cay', num: 4, title: 'Cây', capstoneReady: false,
    lessons: [
      { sid: 'cay-nhi-phan-bst', title: 'Cây nhị phân và BST', ready: true },
      { sid: 'bst-nang-cao', title: 'BST nâng cao', ready: true },
      { sid: 'fenwick-segment-tree', title: 'Fenwick và Segment Tree', ready: false },
    ],
  },
  {
    key: 'do-thi', num: 5, title: 'Đồ thị', capstoneReady: false,
    lessons: [
      { sid: 'dfs-bfs', title: 'DFS và BFS', ready: true },
      { sid: 'dsu', title: 'DSU — Disjoint Set Union', ready: true },
      { sid: 'sap-xep-to-po', title: 'Sắp xếp tô-pô', ready: false },
      { sid: 'duong-di-ngan-nhat', title: 'Đường đi ngắn nhất có trọng số', ready: false },
      { sid: 'cay-khung-nho-nhat', title: 'Cây khung nhỏ nhất', ready: false },
    ],
  },
  {
    key: 'thiet-ke-thuat-toan', num: 6, title: 'Thiết kế thuật toán', capstoneReady: false,
    lessons: [
      { sid: 'quay-lui-xau-nhi-phan', title: 'Quay lui và xâu nhị phân', ready: true },
      { sid: 'to-hop', title: 'Tổ hợp', ready: true },
      { sid: 'tham-lam', title: 'Tham lam', ready: true },
      { sid: 'qhd-nen-tang', title: 'Quy hoạch động nền tảng', ready: true },
      { sid: 'qhd-lis-lcs-doixung', title: 'QHĐ nâng cao: Knapsack, LIS, LCS, xâu đối xứng', ready: true },
    ],
  },
  {
    key: 'chuyen-de', num: 7, title: 'Chuyên đề và giới hạn', capstoneReady: false,
    lessons: [
      { sid: 'thao-tac-bit', title: 'Thao tác bit', ready: false },
      { sid: 'toan-so-hoc', title: 'Toán và số học: GCD, modulo, sàng, luỹ thừa nhanh', ready: false },
      { sid: 'chuoi-nang-cao', title: 'Chuỗi nâng cao: KMP và hash chuỗi', ready: false },
      { sid: 'work-span', title: 'Work/Span và tư duy song song', ready: false },
      { sid: 'do-kho-bai-toan', title: 'Độ khó bài toán: NP-đầy đủ và khi nào dùng xấp xỉ', ready: false },
    ],
  },
]

export const LESSON_SECTIONS = CHAPTERS.flatMap(c =>
  c.lessons.map(l => ({ ...l, chapter: c.key, file: sidToFile(l.sid) })),
)

// Menu trái KHÔNG được viết tay. Nó suy ra từ CHAPTERS ngay phía trên, nếu không
// sẽ có hai nơi cùng định nghĩa thứ tự bài học và chúng sẽ lệch nhau — đó đúng là
// lý do src/data/nav.js bị xoá.
// Trang chủ không còn là một mục menu riêng — khối thương hiệu ở đầu sidebar
// chính là đường về nó. Mục này giữ lại làm dữ liệu: allSectionIds cần id, và
// nhãn gấp/mở ở màn hẹp cần tên để hiển thị khi đang đứng ở trang chủ.
export const navTop = [
  { id: 'trang-chu', label: 'Trang chủ' },
]

// Id của section dự án thực hành của 1 chương. Chỉ được sinh chuỗi 'du-an-...'
// bằng hàm này, không viết tay ở bất cứ đâu khác.
export function chapterProjectId(key) {
  return `du-an-${key}`
}

// Mỗi chương kết thúc bằng ĐÚNG MỘT mục "Dự án thực hành", đứng sau danh sách bài.
// Cờ laDuAn cố ý không đặt tên là duAn: cờ đó vừa bị xoá, dùng lại đúng cái tên
// cũ chỉ khiến người sau tưởng nó chưa chết.
export const navGroups = CHAPTERS.map(c => ({
  label: `Chương ${c.num} — ${c.title}`,
  items: [
    ...c.lessons.map(l => ({ id: l.sid, label: l.title, ready: l.ready })),
    { id: chapterProjectId(c.key), label: 'Dự án thực hành', ready: c.capstoneReady, laDuAn: true },
  ],
}))

// Chỉ bài đã viết mới điều hướng được. Bài chưa viết vẫn hiện trên sidebar để
// người học thấy lộ trình, nhưng không phải là section thật. Dự án của chương
// cũng vậy: chưa có dữ liệu thì chưa là section.
export const allSectionIds = [
  ...navTop.map(i => i.id),
  ...LESSON_SECTIONS.filter(l => l.ready).map(l => l.sid),
  ...CHAPTERS.filter(c => c.capstoneReady).map(c => chapterProjectId(c.key)),
]

// Bài đầu tiên của lộ trình đã viết xong. Dành cho nút "bắt đầu học" trên trang
// chủ — sidebar KHÔNG dùng nó, vì chỗ đó là khối thương hiệu.
export const FIRST_LESSON_ID = LESSON_SECTIONS.find(l => l.ready).sid

export const DEFAULT_ID = 'trang-chu'
