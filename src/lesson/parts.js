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

// 10 nhóm kiến thức theo khung 6 phần. "trang-chu" không nằm ở đây vì nó là
// trang giới thiệu, không phải bài học.
export const LESSON_SECTIONS = [
  { sid: 'quay-lui-xau-nhi-phan', file: 'src/sections/QuayLuiXauNhiPhan.vue', title: 'Quay lui & Xâu nhị phân' },
  { sid: 'to-hop', file: 'src/sections/ToHop.vue', title: 'Tổ hợp' },
  { sid: 'tham-lam', file: 'src/sections/ThamLam.vue', title: 'Tham lam' },
  { sid: 'qhd-nen-tang', file: 'src/sections/QhdNenTang.vue', title: 'Quy hoạch động nền tảng' },
  { sid: 'qhd-lis-lcs-doixung', file: 'src/sections/QhdLisLcsDoixung.vue', title: 'QHĐ nâng cao: Knapsack, LIS, LCS, Xâu đối xứng' },
  { sid: 'ngan-xep-hang-doi', file: 'src/sections/NganXepHangDoi.vue', title: 'Ngăn xếp & Hàng đợi' },
  { sid: 'dfs-bfs', file: 'src/sections/DfsBfs.vue', title: 'DFS & BFS' },
  { sid: 'dsu', file: 'src/sections/Dsu.vue', title: 'DSU — Disjoint Set Union' },
  { sid: 'cay-nhi-phan-bst', file: 'src/sections/CayNhiPhanBst.vue', title: 'Cây nhị phân & BST' },
  { sid: 'bst-nang-cao', file: 'src/sections/BstNangCao.vue', title: 'BST nâng cao' },
]
