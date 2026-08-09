// Cấu trúc menu bên trái — mỗi item trỏ tới 1 section (component) theo id.
export const navTop = [
  { id: 'trang-chu', label: '📘 Trang chủ' },
];

export const navGroups = [
  {
    label: 'Nhóm 1 — Vét cạn',
    items: [
      { id: 'quay-lui-xau-nhi-phan', label: 'Quay lui, Xâu nhị phân' },
      { id: 'to-hop', label: 'Tổ hợp' },
    ],
  },
  {
    label: 'Nhóm 2 — Bài toán tối ưu',
    items: [
      { id: 'tham-lam', label: 'Tham lam: Activity Selection, Đổi tiền' },
      { id: 'qhd-nen-tang', label: 'QHĐ nền tảng: Fibonacci, Bậc thang' },
      { id: 'qhd-lis-lcs-doixung', label: 'QHĐ: Knapsack, LIS, LCS, Xâu đối xứng' },
    ],
  },
  {
    label: 'Nhóm 3 — Cấu trúc dữ liệu',
    items: [
      { id: 'ngan-xep-hang-doi', label: 'Ngăn xếp & Hàng đợi' },
    ],
  },
  {
    label: 'Nhóm 4 — Duyệt đồ thị',
    items: [
      { id: 'dfs-bfs', label: 'BFS & DFS' },
      { id: 'dsu', label: 'DSU (Disjoint Set Union)' },
    ],
  },
  {
    label: 'Nhóm 5 — Cây nhị phân',
    items: [
      { id: 'cay-nhi-phan-bst', label: '3 phép duyệt, Cây cha-con, BST' },
      { id: 'bst-nang-cao', label: 'BST nâng cao: Kiểm tra, Cân bằng, LCA' },
    ],
  },
];

export const allSectionIds = [
  ...navTop.map(i => i.id),
  ...navGroups.flatMap(g => g.items.map(i => i.id)),
];

export const DEFAULT_ID = 'trang-chu';
