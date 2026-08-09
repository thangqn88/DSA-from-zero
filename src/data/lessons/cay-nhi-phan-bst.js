export default {
  goal: [
    'Vẽ được cây nhị phân từ dữ liệu cha con cho trước.',
    'Viết được cả 3 phép duyệt và nói được kết quả trước khi chạy.',
    'Dựng, chèn và xóa được node trên BST, kể cả trường hợp node có 2 con.',
  ],
  examples: [
    { id: 'vd-ba-phep-duyet', title: 'Ba phép duyệt cây nhị phân', official: true },
    { id: 'vd-bst-chen-xoa', title: 'Dựng, chèn và xóa trên BST', official: true },
  ],
  quiz: [
    {
      q: 'Duyệt giữa (inorder, LNR) trên 1 cây BST cho ra dãy gì?',
      options: [
        'Dãy tăng dần',
        'Dãy giảm dần',
        'Thứ tự chèn ban đầu vào cây',
      ],
      answer: 0,
      why: 'Luật của BST là "trái nhỏ hơn gốc, phải lớn hơn gốc". Duyệt giữa luôn thăm hết cây con trái (toàn giá trị nhỏ hơn gốc) trước, rồi tới gốc, rồi mới sang cây con phải (toàn giá trị lớn hơn gốc) — kết quả luôn là 1 dãy tăng dần, bất kể cây được chèn theo thứ tự nào.',
    },
    {
      q: 'Muốn tìm giá trị nhỏ nhất trong 1 cây BST, bạn đi theo hướng nào?',
      options: [
        'Đi thẳng sang trái cho tới khi hết đường (không còn con trái)',
        'Đi thẳng sang phải cho tới khi hết đường',
        'Phải duyệt hết toàn bộ cây rồi lấy min',
      ],
      answer: 0,
      why: 'Vì mọi node bên trái luôn nhỏ hơn gốc của nó, giá trị nhỏ nhất của cả cây chắc chắn nằm ở node cực trái — cứ đi left, left, left... cho tới khi gặp node không còn con trái. Không cần duyệt hết cây, chỉ cần đi 1 đường duy nhất, tốn O(chiều cao).',
    },
    {
      q: 'Xóa 1 node có đủ 2 con trong BST, ta thay giá trị của nó bằng giá trị của ai?',
      options: [
        'Node nhỏ nhất của cây con phải (hoặc tương đương: node lớn nhất của cây con trái)',
        'Node gốc của toàn cây',
        'Node bất kỳ nằm ở lá',
      ],
      answer: 0,
      why: 'Node nhỏ nhất bên cây con phải (gọi là inorder successor) là giá trị duy nhất vừa lớn hơn node cần xóa vừa không phá vỡ luật BST khi đưa lên thay thế. Copy giá trị đó lên node cần xóa, rồi xóa nó ở vị trí cũ — vị trí cũ chắc chắn chỉ có tối đa 1 con nên việc xóa tiếp theo lại đơn giản.',
    },
    {
      q: 'Một cây nhị phân cân bằng có 7 node thì cao bao nhiêu (tính chiều cao từ 0, gốc là mức 0)?',
      options: [
        '2 (3 mức: gốc, 2 con, 4 cháu)',
        '7 (mỗi node 1 mức)',
        '1 (chỉ có gốc và 1 lớp con)',
      ],
      answer: 0,
      why: '7 node chia đều thành 3 mức: mức 0 có 1 node (gốc), mức 1 có 2 node, mức 2 có 4 node — cộng lại đúng 7. Chiều cao tính từ mức gốc = 0 nên cây này cao 2. Đây là lý do cây cân bằng cho chi phí tìm kiếm O(log n): số mức tăng rất chậm so với số node.',
    },
  ],
  practice: [
    {
      title: 'Viết hàm tính chiều cao của 1 cây nhị phân (số mức tính từ gốc = 0, cây rỗng cao -1 hoặc quy ước riêng tùy đề).',
      idea: 'Dùng đúng khuôn đệ quy "cây rỗng trả về giá trị cơ sở; ngược lại lấy 1 + max(chiều cao cây con trái, chiều cao cây con phải)". Chiều cao của cả cây phụ thuộc vào nhánh SÂU HƠN trong 2 nhánh con, không phải cả 2.',
      hint: 'height(null) = -1 (quy ước phổ biến); height(node) = 1 + max(height(node->left), height(node->right)). Với cây 7 node cân bằng ở quiz, height trả về 2.',
    },
    {
      title: 'Viết hàm đếm số node lá (node không có con nào) trong 1 cây nhị phân.',
      idea: 'Một node là lá khi cả con trái và con phải đều rỗng. Dùng khuôn đệ quy: cây rỗng trả về 0; node là lá trả về 1; ngược lại trả về tổng số lá của 2 cây con.',
      hint: 'countLeaves(null) = 0; nếu !left && !right trả về 1; ngược lại return countLeaves(left) + countLeaves(right). Với cây gốc 5, trái 3 (con 1,4), phải 8 (con phải 9) — có đúng 3 lá: 1, 4, 9.',
    },
    {
      title: 'Viết hàm tìm 1 giá trị x trong BST, trả về true/false, đồng thời đếm số lần so sánh (số node đã đi qua) để tìm ra hoặc xác nhận không có.',
      idea: 'Đi từ gốc, mỗi bước so sánh x với giá trị node hiện tại: bằng thì tìm thấy (dừng); nhỏ hơn thì sang trái; lớn hơn thì sang phải. Mỗi lần so sánh, tăng biến đếm lên 1 trước khi rẽ nhánh.',
      hint: 'Số phép so sánh tối đa bằng chiều cao cây + 1 (đường đi dài nhất từ gốc tới node cần tìm hoặc tới chỗ xác nhận không tồn tại) — đây chính là lý do BST cân bằng tìm kiếm nhanh hơn mảng thường rất nhiều khi n lớn.',
    },
  ],
  leetcode: [
    { no: 94, name: 'Binary Tree Inorder Traversal', slug: 'binary-tree-inorder-traversal', level: 'Easy', note: 'Đúng ví dụ 1, làm cả bản đệ quy và bản ngăn xếp.' },
    { no: 104, name: 'Maximum Depth of Binary Tree', slug: 'maximum-depth-of-binary-tree', level: 'Easy', note: 'Đúng bài tập 1.' },
    { no: 226, name: 'Invert Binary Tree', slug: 'invert-binary-tree', level: 'Easy', note: 'Đệ quy trên cây ở mức dễ nhất.' },
    { no: 100, name: 'Same Tree', slug: 'same-tree', level: 'Easy', note: 'Duyệt song song 2 cây.' },
    { no: 700, name: 'Search in a Binary Search Tree', slug: 'search-in-a-binary-search-tree', level: 'Easy', note: 'Đúng bài tập 3.' },
    { no: 701, name: 'Insert into a Binary Search Tree', slug: 'insert-into-a-binary-search-tree', level: 'Medium', note: 'Phần chèn của ví dụ 2.' },
    { no: 450, name: 'Delete Node in a BST', slug: 'delete-node-in-a-bst', level: 'Medium', note: 'Phần xóa của ví dụ 2, đủ 3 trường hợp.' },
    { no: 102, name: 'Binary Tree Level Order Traversal', slug: 'binary-tree-level-order-traversal', level: 'Medium', note: 'Duyệt theo mức bằng hàng đợi.' },
    { no: 230, name: 'Kth Smallest Element in a BST', slug: 'kth-smallest-element-in-a-bst', level: 'Medium', note: 'Dùng tính chất duyệt giữa cho dãy tăng.' },
    { no: 105, name: 'Construct Binary Tree from Preorder and Inorder Traversal', slug: 'construct-binary-tree-from-preorder-and-inorder-traversal', level: 'Medium', note: 'Dựng lại cây từ 2 thứ tự duyệt.' },
  ],
}
