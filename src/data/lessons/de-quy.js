export default {
  goal: [
    'Nói được ba thành phần bắt buộc của một hàm đệ quy đúng: trường hợp cơ sở, bước thu nhỏ, và ghép kết quả.',
    'Giải thích được vì sao mỗi lời gọi đệ quy chiếm một khung trên ngăn xếp, và vì sao độ sâu đệ quy chính là bộ nhớ tiêu tốn.',
    'Đọc được hệ thức truy hồi dạng T(n) = a·T(n/b) + f(n) và nhận ra ba mốc quen thuộc: O(log n), O(n log n), O(2ⁿ).',
    'Tự cài được bản ghi nhớ cho fib, hạ độ phức tạp từ O(2ⁿ) xuống O(n).',
  ],
  // Không có trường examples ở đây: bài này viết bằng Markdown, danh sách ví dụ
  // rút ra từ các chỉ thị @vidu trong src/content/de-quy.md.
  quiz: [
    {
      q: 'Một hàm đệ quy chạy mãi không dừng, dù có viết trường hợp dừng. Nguyên nhân nhiều khả năng nhất là gì?',
      options: [
        'Bước thu nhỏ bài toán không thật sự làm bài toán nhỏ đi, nên không bao giờ chạm tới trường hợp cơ sở',
        'Máy tính không đủ mạnh để chạy đệ quy',
        'Hàm đệ quy luôn luôn chạy mãi, đó là bản chất của đệ quy',
      ],
      answer: 0,
      why: 'Một hàm đệ quy đúng cần ba thành phần: trường hợp cơ sở để biết khi nào dừng, bước thu nhỏ để bài toán tiến gần hơn tới trường hợp cơ sở, và bước ghép kết quả. Nếu trường hợp cơ sở có nhưng tham số truyền vào lời gọi tiếp theo không hề nhỏ đi — ví dụ gọi lại với đúng n như cũ, hoặc trừ sai chiều — thì hàm không bao giờ chạm tới điều kiện dừng. Đây không phải chuyện máy yếu, và đệ quy hoàn toàn dừng được nếu viết đúng; ngăn xếp lời gọi sẽ đầy lên và tràn trước khi bạn kịp thấy chương trình "chạy mãi".',
      recall: false,
    },
    {
      q: 'Mỗi lời gọi đệ quy chưa hoàn tất chiếm chỗ ở đâu trong bộ nhớ?',
      options: [
        'Một khung trên ngăn xếp lời gọi, giữ biến cục bộ và chỗ quay về',
        'Một vùng nhớ heap được cấp phát và giải phóng tự động',
        'Không chiếm chỗ nào, vì đệ quy chỉ là một cách viết vòng lặp',
      ],
      answer: 0,
      why: 'Khi một hàm gọi hàm khác — kể cả gọi lại chính nó — máy phải nhớ nó đang làm tới đâu để quay về đúng chỗ sau khi lời gọi con xong. Đó là lý do mỗi lời gọi chiếm một khung trên ngăn xếp: khung giữ biến cục bộ của lần gọi đó và địa chỉ quay về. Đệ quy sâu 100000 lần nghĩa là 100000 khung đang chồng lên nhau, và đó chính là cùng cấu trúc ngăn xếp bạn đã học ở bài Ngăn xếp và hàng đợi, chỉ khác là ở đây máy quản lý hộ bạn. Vượt quá giới hạn ngăn xếp thì chương trình sập với lỗi tràn ngăn xếp, không phải lỗi bộ nhớ heap.',
    },
    {
      q: 'Hệ thức truy hồi T(n) = 2T(n/2) + O(n) ứng với thuật toán có độ phức tạp nào?',
      options: [
        'O(n log n)',
        'O(2ⁿ)',
        'O(log n)',
      ],
      answer: 0,
      why: 'Đây là một trong ba mốc cần nhớ ngay khi nhìn hệ thức. T(n) = T(n/2) + O(1) — mỗi lần chỉ xử lý một nửa với chi phí hằng số ngoài lời gọi — cho O(log n), như tìm nhị phân. T(n) = 2T(n-1) + O(1) — mỗi lần đẻ ra hai lời gọi mà kích thước chỉ giảm đi một — cho O(2ⁿ), như đệ quy trần liệt kê tập con. Còn T(n) = 2T(n/2) + O(n) — chia đôi thành hai bài toán con và tốn O(n) để ghép chúng lại — là đúng khuôn của merge sort, và giải bằng cách đếm theo tầng ra O(n log n): có log₂n tầng, mỗi tầng tốn tổng cộng O(n).',
    },
    {
      q: 'fib(5) tính bằng đệ quy trần (không ghi nhớ) và fib(5) tính bằng bản có ghi nhớ khác nhau ở điểm nào?',
      options: [
        'Bản trần tính lại fib(2), fib(1)... nhiều lần vì cây lời gọi có các nhánh trùng nhau; bản ghi nhớ chỉ tính mỗi giá trị đúng một lần',
        'Hai bản cho ra kết quả khác nhau vì cách tính khác nhau',
        'Bản ghi nhớ nhanh hơn vì nó dùng vòng lặp thay cho đệ quy, không liên quan gì tới việc lưu kết quả',
      ],
      answer: 0,
      why: 'Cây lời gọi của fib(5) có các nhánh chồng lặp: cả fib(3) và fib(4) đều cần gọi tới fib(2), fib(2) lại được gọi từ nhiều nơi khác nữa. Đệ quy trần không nhớ gì cả nên tính lại từ đầu mỗi lần gặp cùng một n, khiến số lời gọi tăng theo cấp luỹ thành O(2ⁿ). Bản có ghi nhớ dùng một bảng lưu kết quả: trước khi tính, kiểm tra bảng đã có chưa; có rồi thì trả về ngay, chưa có thì tính và lưu lại. Nhờ vậy mỗi giá trị n chỉ tốn công tính đúng một lần, tổng chi phí tụt xuống O(n). Cả hai bản cho kết quả giống nhau tuyệt đối — khác nhau chỉ ở tốc độ, không ở đáp số.',
    },
    {
      q: 'Ôn lại bài trước: với n = 40, một thuật toán O(2ⁿ) và một thuật toán O(n²) chênh nhau cỡ nào?',
      options: [
        'Khoảng một tỉ lần: 2⁴⁰ cỡ 10¹² còn 40² chỉ là 1600, tức khác biệt giữa nhiều giờ và tức thì',
        'Không đáng kể, vì cả hai đều là hàm tăng theo n',
        'Khoảng 40 lần, đúng bằng giá trị của n',
      ],
      answer: 0,
      recall: true,
      why: 'Đây là bài học bạn đã gặp ở bài Độ phức tạp, giờ quay lại đúng chỗ nó cần: hàm mũ và hàm đa thức bỏ xa nhau cực nhanh khi n tăng. 2⁴⁰ xấp xỉ 10¹², còn 40² chỉ là 1600 — chênh nhau khoảng một tỉ lần. Với mốc phản xạ khoảng 10⁸ phép toán mỗi giây, thuật toán O(n²) chạy tức thì, còn thuật toán O(2ⁿ) mất hàng giờ. Đây chính xác là lý do fib đệ quy trần với n cỡ 40 đã đủ chậm để bạn cảm nhận được, và cũng chính là lý do ghi nhớ đáng giá: nó chuyển một hàm mũ thành một hàm tuyến tính.',
    },
  ],
  practice: [
    {
      title: 'Cài fib bằng ba cách — đệ quy trần, đệ quy có ghi nhớ, vòng lặp — rồi đếm số lời gọi hàm của từng cách với n chạy từ 10 tới 40.',
      idea: 'Thêm một biến đếm toàn cục hoặc tham số đếm truyền theo tham chiếu, tăng lên mỗi lần hàm được gọi. So ba đường số lời gọi theo n: đường của bản trần phải tăng theo cấp luỹ, đường của hai bản còn lại phải gần như thẳng.',
      hint: 'Nhớ đặt lại biến đếm về 0 giữa hai lần đo khác n, nếu không con số cộng dồn sẽ đánh lừa bạn rằng thuật toán chậm hơn thật.',
    },
    {
      title: 'Viết hàm đệ quy tính tổng một mảng bằng cách chia đôi, viết hệ thức truy hồi của nó, giải bằng cách đếm theo tầng, rồi so độ sâu ngăn xếp với cách đệ quy tuyến tính bớt một phần tử mỗi lần.',
      idea: 'Chia đôi cho ra T(n) = 2T(n/2) + O(1) vì việc ghép chỉ là một phép cộng, khác với merge sort phải tốn O(n) để trộn. Đếm theo tầng để thấy số tầng là log₂n, còn cách bớt một phần tử mỗi lần cho độ sâu ngăn xếp là n — chênh nhau rất xa khi n lớn.',
      hint: 'Đừng nhầm chi phí ghép của phép cộng (hằng số) với chi phí ghép của merge sort (tuyến tính) — hai hệ thức truy hồi trông giống nhau về hình dạng chia đôi nhưng ra kết quả khác hẳn.',
    },
    {
      title: 'Tìm độ sâu đệ quy tối đa mà máy bạn chịu được trước khi tràn ngăn xếp: viết hàm đệ quy tuyến tính chỉ cộng một, tăng dần n cho tới khi chương trình chết, rồi thêm một mảng cục bộ 1000 số vào mỗi lời gọi và đo lại.',
      idea: 'Tăng n theo cấp nhân (nhân đôi mỗi lần thử) để tìm khoảng dò nhanh hơn tăng theo cấp cộng. Khi thêm mảng 1000 số vào mỗi khung, mỗi khung nặng hơn nhiều, nên độ sâu tối đa trước khi tràn sẽ giảm mạnh dù logic hàm không đổi.',
      hint: 'Kết quả phụ thuộc máy và trình dịch, không có con số đúng duy nhất — điều cần rút ra là độ sâu đệ quy tối đa co lại rất nhanh khi mỗi khung nặng hơn, đúng như lập luận "độ sâu đệ quy chính là bộ nhớ".',
    },
  ],
  leetcode: [
    { no: 509, name: 'Fibonacci Number', slug: 'fibonacci-number', level: 'Easy', note: 'Đúng bài của cả buổi học — cài cả ba cách và so số lời gọi.' },
    { no: 70, name: 'Climbing Stairs', slug: 'climbing-stairs', level: 'Easy', note: 'Hệ thức truy hồi giống fib nhưng đề bài không nói ra, luyện khả năng tự nhận ra khuôn mẫu.' },
    { no: 206, name: 'Reverse Linked List', slug: 'reverse-linked-list', level: 'Easy', note: 'Làm lại bằng đệ quy để thấy trường hợp cơ sở và bước ghép của cấu trúc liên kết.' },
    { no: 21, name: 'Merge Two Sorted Lists', slug: 'merge-two-sorted-lists', level: 'Easy', note: 'Bước ghép chính là toàn bộ độ khó của đệ quy này — trường hợp cơ sở chỉ là danh sách rỗng.' },
    { no: 104, name: 'Maximum Depth of Binary Tree', slug: 'maximum-depth-of-binary-tree', level: 'Easy', note: 'Đệ quy trên cây: bước ghép là lấy max của hai bên con cộng một.' },
    { no: 226, name: 'Invert Binary Tree', slug: 'invert-binary-tree', level: 'Easy', note: 'Ghép kết quả ở đây chỉ là tráo hai con — đệ quy cây thường đơn giản hơn đệ quy tuyến tính nhìn qua.' },
    { no: 50, name: 'Pow(x, n)', slug: 'powx-n', level: 'Medium', note: 'Chia đôi số mũ cho hệ thức T(n) = T(n/2) + O(1), tức O(log n) — nhanh hơn hẳn nhân n lần.' },
    { no: 241, name: 'Different Ways to Add Parentheses', slug: 'different-ways-to-add-parentheses', level: 'Medium', note: 'Đệ quy chia bài toán theo từng vị trí dấu phép toán, rồi ghép mọi kết quả con — nên thử ghi nhớ để tránh tính lại.' },
    { no: 395, name: 'Longest Substring with At Least K Repeating Characters', slug: 'longest-substring-with-at-least-k-repeating-characters', level: 'Medium', note: 'Chia để trị trên chuỗi: cắt tại ký tự hiếm rồi đệ quy trên từng đoạn.' },
    { no: 4, name: 'Median of Two Sorted Arrays', slug: 'median-of-two-sorted-arrays', level: 'Hard', note: 'Đệ quy chia đôi kiểu tìm nhị phân trên cả hai mảng cùng lúc — bài khó nhất luyện đúng trực giác về hệ thức truy hồi.' },
  ],
}
