// Cấu trúc menu bên trái — mỗi item trỏ tới 1 section (component) theo id.
// "exam" = true nghĩa là nhóm có bài chính thức trong đề ôn tập (đánh dấu nổi bật).
export const navTop = [
  { id: 'trang-chu', label: '📘 Trang chủ' },
  { id: 'cam-nang', label: '🎯 Cẩm nang giải đề' },
];

export const navGroups = [
  {
    label: 'Nhóm 1 — Vét cạn',
    items: [
      { id: 'quay-lui-xau-nhi-phan', label: 'Quay lui, Xâu nhị phân', exam: true },
      { id: 'to-hop', label: 'Tổ hợp', exam: true },
    ],
  },
  {
    label: 'Nhóm 2 — Bài toán tối ưu',
    items: [
      { id: 'tham-lam', label: 'Tham lam: Activity Selection, Đổi tiền', exam: true },
      { id: 'qhd-nen-tang', label: 'QHĐ nền tảng: Fibonacci, Bậc thang', exam: false },
      { id: 'qhd-lis-lcs-doixung', label: 'QHĐ: Knapsack, LIS, LCS, Xâu đối xứng', exam: true },
    ],
  },
  {
    label: 'Nhóm 3 — Cấu trúc dữ liệu',
    items: [
      { id: 'ngan-xep-hang-doi', label: 'Ngăn xếp & Hàng đợi', exam: true },
    ],
  },
  {
    label: 'Nhóm 4 — Duyệt đồ thị',
    items: [
      { id: 'dfs-bfs', label: 'BFS & DFS', exam: true },
      { id: 'dsu', label: 'DSU (Disjoint Set Union)', exam: false },
    ],
  },
  {
    label: 'Nhóm 5 — Cây nhị phân',
    items: [
      { id: 'cay-nhi-phan-bst', label: '3 phép duyệt, Cây cha-con, BST', exam: true },
      { id: 'bst-nang-cao', label: 'BST nâng cao: Kiểm tra, Cân bằng, LCA', exam: false },
    ],
  },
];

export const allSectionIds = [
  ...navTop.map(i => i.id),
  ...navGroups.flatMap(g => g.items.map(i => i.id)),
];

export const DEFAULT_ID = 'trang-chu';
