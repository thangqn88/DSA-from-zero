export default {
  goal: [
    'Giải thích được quay lui bằng hình ảnh "đi trong mê cung, cụt đường thì lùi lại".',
    'Tự viết được khung đệ quy sinh mọi xâu nhị phân độ dài n.',
  ],
  examples: [
    { id: 'vd-sinh-xau-nhi-phan', title: 'Sinh mọi xâu nhị phân độ dài n', official: true },
  ],
  quiz: [
    {
      q: 'Quay lui khác vét cạn thường ở điểm nào?',
      options: ['Không khác gì', 'Có bước hoàn tác lựa chọn để thử nhánh khác', 'Luôn nhanh hơn'],
      answer: 1,
      why: 'Quay lui đi sâu theo 1 lựa chọn, khi hết đường thì hoàn tác đúng bước vừa làm rồi thử lựa chọn kế tiếp.',
    },
    {
      q: 'Điều kiện dừng của đệ quy sinh xâu nhị phân độ dài n là gì?',
      options: ['Khi i > n', 'Khi đã đặt đủ n vị trí', 'Khi gặp số 1'],
      answer: 1,
      why: 'Đặt đủ n vị trí nghĩa là đã có 1 xâu hoàn chỉnh, in ra rồi quay lui.',
    },
    {
      q: 'Có bao nhiêu xâu nhị phân độ dài n?',
      options: ['n²', '2ⁿ', 'n!'],
      answer: 1,
      why: 'Mỗi vị trí có 2 lựa chọn độc lập, n vị trí cho 2ⁿ xâu.',
    },
  ],
  practice: [
    {
      title: 'Sinh mọi xâu nhị phân độ dài n không có hai số 1 đứng cạnh nhau.',
      idea: 'Thêm 1 điều kiện trước khi đặt số 1: vị trí ngay trước phải khác 1.',
      hint: 'Trong vòng lặp thử giá trị v, bỏ qua v = 1 nếu x[i-1] == 1.',
    },
    {
      title: 'Sinh mọi tập con của {1..n} bằng quay lui.',
      idea: 'Mỗi phần tử có 2 lựa chọn: lấy hoặc không lấy — đúng khung xâu nhị phân, chỉ đổi cách in.',
      hint: 'Khi đặt x[i] = 1 nghĩa là chọn phần tử i; lúc in thì in các chỉ số có x[i] == 1.',
    },
    {
      title: 'Đếm số cách xếp 4 quân hậu trên bàn cờ 4×4 sao cho không quân nào ăn nhau.',
      idea: 'Mỗi hàng đặt đúng 1 quân, kiểm tra cột và 2 đường chéo trước khi đặt.',
      hint: 'Dùng 3 mảng đánh dấu: cột, đường chéo chính (i - j + n), đường chéo phụ (i + j).',
    },
  ],
  leetcode: [
    { no: 1863, name: 'Sum of All Subset XOR Totals', slug: 'sum-of-all-subset-xor-totals', level: 'Easy', note: 'Khung sinh tập con ở mức dễ nhất.' },
    { no: 401, name: 'Binary Watch', slug: 'binary-watch', level: 'Easy', note: 'Sinh xâu nhị phân có ràng buộc số bit 1.' },
    { no: 78, name: 'Subsets', slug: 'subsets', level: 'Medium', note: 'Bài chuẩn mực nhất của khung chọn/không chọn.' },
    { no: 46, name: 'Permutations', slug: 'permutations', level: 'Medium', note: 'Quay lui có mảng used[].' },
    { no: 784, name: 'Letter Case Permutation', slug: 'letter-case-permutation', level: 'Medium', note: 'Giống sinh xâu nhị phân, chỉ đổi bảng chữ cái.' },
    { no: 22, name: 'Generate Parentheses', slug: 'generate-parentheses', level: 'Medium', note: 'Quay lui có cắt nhánh bằng điều kiện hợp lệ.' },
    { no: 39, name: 'Combination Sum', slug: 'combination-sum', level: 'Medium', note: 'Quay lui cho phép chọn lại phần tử.' },
    { no: 79, name: 'Word Search', slug: 'word-search', level: 'Medium', note: 'Quay lui trên lưới, có đánh dấu và hoàn tác.' },
    { no: 51, name: 'N-Queens', slug: 'n-queens', level: 'Hard', note: 'Chính là ví dụ điển hình thứ hai của bài này.' },
    { no: 37, name: 'Sudoku Solver', slug: 'sudoku-solver', level: 'Hard', note: 'Quay lui với 3 ràng buộc cùng lúc.' },
  ],
}
