export default {
  goal: [
    'Kiểm tra đúng một cây có phải BST hay không, không mắc bẫy so sánh cục bộ.',
    'Nói được vì sao BST lệch làm mọi thao tác chậm về O(n).',
    'Tìm được tổ tiên chung gần nhất trên BST và trên cây nhị phân thường.',
  ],
  examples: [
    { id: 'vd-kiem-tra-bst', title: 'Kiểm tra một cây có phải BST', official: false },
    { id: 'vd-lca', title: 'Tổ tiên chung gần nhất (LCA)', official: false },
  ],
  quiz: [
    {
      q: 'Vì sao chỉ so sánh mỗi node với 2 con trực tiếp của nó là SAI khi kiểm tra một cây có phải BST?',
      options: [
        'Vì một node ở sâu bên trái vẫn có thể lớn hơn gốc, dù nó nhỏ hơn cha trực tiếp của nó',
        'Vì phép so sánh 2 số nguyên trong C++ không đáng tin cậy',
        'Vì cây nhị phân không cho phép so sánh giá trị giữa các node',
      ],
      answer: 0,
      why: 'Luật BST áp dụng cho TOÀN BỘ cây con, không chỉ 2 con trực tiếp. Một node nằm ở nhánh phải của gốc phải nhỏ hơn mọi node bên nhánh phải của tổ tiên xa hơn nó — nếu chỉ so nó với cha trực tiếp, ta có thể bỏ lỡ trường hợp nó lớn hơn (hoặc nhỏ hơn) một tổ tiên ở xa hơn. Cách đúng là truyền xuống mỗi lời gọi đệ quy một khoảng giá trị hợp lệ (lo, hi) được thu hẹp dần từ tổ tiên.',
    },
    {
      q: 'Chiều cao của một BST trong trường hợp xấu nhất (n node) là bao nhiêu?',
      options: [
        'n, khi cây lệch hẳn về một bên và trở thành giống một danh sách liên kết',
        'log₂(n), vì BST luôn tự giữ cân bằng',
        '2, bất kể n lớn cỡ nào',
      ],
      answer: 0,
      why: 'BST thường (không tự cân bằng) không có gì đảm bảo hình dạng cây. Nếu chèn dữ liệu đã sắp theo thứ tự (ví dụ 1,2,3,4,5), mỗi số mới luôn lớn hơn mọi số trước nên luôn rẽ về một phía — cây biến thành một chuỗi dài giống danh sách liên kết, chiều cao bằng đúng n. Lúc đó tìm/chèn/xóa đều tụt về O(n), mất hẳn lợi thế của BST.',
    },
    {
      q: 'Trên một BST, muốn tìm LCA của 2 giá trị p và q, ta làm thế nào?',
      options: [
        'Đi từ gốc xuống, rẽ theo hướng mà cả p và q cùng nhỏ hơn hoặc cùng lớn hơn node hiện tại, tới khi 2 giá trị nằm về 2 phía (hoặc trùng) node hiện tại — đó chính là LCA',
        'Duyệt toàn bộ cây bằng BFS rồi so sánh độ sâu của p và q',
        'Luôn luôn là node gốc của cây, vì gốc là tổ tiên của mọi node',
      ],
      answer: 0,
      why: 'Nhờ luật "trái nhỏ, phải lớn" của BST, tại mỗi node ta biết ngay p và q đang cùng nằm ở nhánh nào (không cần dò cả 2 nhánh như cây thường). Cứ đi theo hướng chung của cả 2 giá trị; ngay khi chúng tách sang 2 phía khác nhau (hoặc một trong 2 trùng với node hiện tại), node đó chính là điểm chia nhánh cuối cùng — tức là tổ tiên chung gần nhất.',
    },
    {
      q: 'Duyệt giữa (inorder) của một cây nhị phân cho ra dãy tăng nghiêm ngặt khi nào?',
      options: [
        'Khi và chỉ khi cây đó là một BST hợp lệ (không có giá trị trùng, đúng luật trái nhỏ phải lớn)',
        'Với mọi cây nhị phân, bất kể có phải BST hay không',
        'Chỉ khi cây có số node là số chẵn',
      ],
      answer: 0,
      why: 'Duyệt giữa luôn thăm trái → gốc → phải. Nếu cây là BST đúng luật, nhánh trái toàn giá trị nhỏ hơn gốc và nhánh phải toàn giá trị lớn hơn gốc ở mọi cấp, nên kết quả chắc chắn là dãy tăng nghiêm ngặt. Ngược lại, nếu dãy thu được KHÔNG tăng nghiêm ngặt ở bất kỳ vị trí nào, cây đó chắc chắn không phải BST hợp lệ — đây là cách kiểm tra BST thay thế cho cách truyền khoảng (lo, hi).',
    },
  ],
  practice: [
    {
      title: 'Viết hàm kiểm tra một cây nhị phân có cân bằng chiều cao không (chênh lệch chiều cao 2 cây con ở MỌI node đều không vượt quá 1).',
      idea: 'Đừng tính chiều cao 2 cây con rồi kiểm tra riêng ở từng node theo kiểu duyệt lại từ đầu mỗi lần (tốn O(n²)) — hãy tính chiều cao từ dưới lên (từ lá lên gốc) trong đúng 1 lần đệ quy, và cho hàm trả về ngay giá trị báo hiệu -1 nếu phát hiện mất cân bằng ở bất kỳ node con nào, để không cần đi tiếp.',
      hint: 'height(null) = 0. Với node hiện tại: tính l = height(trái); nếu l == -1 thì trả về -1 ngay. Tính r = height(phải); nếu r == -1 thì trả về -1 ngay. Nếu abs(l - r) > 1 thì trả về -1. Ngược lại trả về 1 + max(l, r). Cây cân bằng khi kết quả cuối cùng khác -1.',
    },
    {
      title: 'Cho một mảng đã sắp xếp tăng dần, chuyển nó thành một BST cân bằng chiều cao.',
      idea: 'Phần tử ở giữa mảng luôn là lựa chọn tốt nhất để làm gốc: nửa trái của mảng (toàn giá trị nhỏ hơn) trở thành cây con trái, nửa phải (toàn giá trị lớn hơn) trở thành cây con phải — và áp dụng đệ quy y hệt cho từng nửa, mỗi nửa lại chọn đúng phần tử giữa của nó làm gốc con.',
      hint: 'buildBalanced(a, lo, hi): nếu lo > hi trả về nullptr. mid = (lo + hi) / 2. Tạo node mới với giá trị a[mid]. node->left = buildBalanced(a, lo, mid-1). node->right = buildBalanced(a, mid+1, hi). Cách chọn mid ở giữa đảm bảo 2 nửa luôn gần bằng nhau về kích thước, nên chiều cao cây luôn ở mức O(log n).',
    },
    {
      title: 'Cho một BST mà đúng 2 node của nó đã bị hoán đổi giá trị nhầm với nhau (làm sai luật BST), khôi phục lại giá trị đúng của cây mà không đổi cấu trúc cây.',
      idea: 'Duyệt giữa (inorder) của một BST đúng luật phải là dãy tăng nghiêm ngặt. Nếu chỉ có đúng 2 giá trị bị hoán đổi, dãy inorder thu được sẽ có đúng 1 hoặc 2 vị trí bị "lệch thứ tự" (giá trị sau nhỏ hơn hoặc bằng giá trị trước) — tìm ra 2 node gây lệch đó rồi hoán đổi giá trị của chúng lại là xong, không cần đụng tới cấu trúc con trỏ của cây.',
      hint: 'Duyệt giữa toàn cây, so mỗi giá trị với giá trị ngay trước nó (prev). Mỗi lần gặp prev >= giá trị hiện tại, đó là 1 lần lệch: lần lệch đầu tiên đánh dấu node trước (prev) là node lỗi thứ nhất (nếu chưa có), lần lệch nào cũng cập nhật node hiện tại là node lỗi thứ hai. Sau khi duyệt hết, hoán đổi giá trị của 2 node lỗi đã đánh dấu.',
    },
  ],
  leetcode: [
    { no: 110, name: 'Balanced Binary Tree', slug: 'balanced-binary-tree', level: 'Easy', note: 'Đúng bài tập 1.' },
    { no: 108, name: 'Convert Sorted Array to Binary Search Tree', slug: 'convert-sorted-array-to-binary-search-tree', level: 'Easy', note: 'Đúng bài tập 2.' },
    { no: 653, name: 'Two Sum IV - Input is a BST', slug: 'two-sum-iv-input-is-a-bst', level: 'Easy', note: 'Tận dụng duyệt giữa cho dãy tăng.' },
    { no: 98, name: 'Validate Binary Search Tree', slug: 'validate-binary-search-tree', level: 'Medium', note: 'Đúng ví dụ 1, chính là cái bẫy so sánh cục bộ.' },
    { no: 235, name: 'Lowest Common Ancestor of a Binary Search Tree', slug: 'lowest-common-ancestor-of-a-binary-search-tree', level: 'Medium', note: 'Bản LCA cho BST của ví dụ 2.' },
    { no: 236, name: 'Lowest Common Ancestor of a Binary Tree', slug: 'lowest-common-ancestor-of-a-binary-tree', level: 'Medium', note: 'Bản LCA cho cây thường của ví dụ 2.' },
    { no: 173, name: 'Binary Search Tree Iterator', slug: 'binary-search-tree-iterator', level: 'Medium', note: 'Duyệt giữa từng bước bằng ngăn xếp.' },
    { no: 538, name: 'Convert BST to Greater Tree', slug: 'convert-bst-to-greater-tree', level: 'Medium', note: 'Duyệt giữa theo chiều ngược.' },
    { no: 1382, name: 'Balance a Binary Search Tree', slug: 'balance-a-binary-search-tree', level: 'Medium', note: 'Cân bằng lại cây lệch.' },
    { no: 99, name: 'Recover Binary Search Tree', slug: 'recover-binary-search-tree', level: 'Medium', note: 'Đúng bài tập 3.' },
    { no: 297, name: 'Serialize and Deserialize Binary Tree', slug: 'serialize-and-deserialize-binary-tree', level: 'Hard', note: 'Tổng hợp mọi kỹ thuật duyệt cây.' },
  ],
}
