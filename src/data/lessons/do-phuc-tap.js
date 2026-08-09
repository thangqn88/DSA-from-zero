export default {
  goal: [
    'Đọc được ký hiệu O lớn và nói ra bằng lời nó đang hứa hẹn điều gì.',
    'Đếm được số phép toán của một đoạn code và suy ra độ phức tạp của nó.',
    'Nhìn giới hạn đề bài mà đoán được thuật toán nào đủ nhanh, thuật toán nào chắc chắn quá chậm.',
    'Giải thích được vì sao hai đoạn code cùng O(n) mà chạy lệch nhau nhiều lần.',
  ],
  examples: [
    { id: 'vd-dpt-dem-phep-toan', title: 'Đếm phép toán của ba đoạn code lồng vòng lặp', official: false },
    { id: 'vd-dpt-so-sanh-hai-cach', title: 'Cùng một bài, hai cách giải, chênh nhau bao nhiêu lần', official: false },
  ],
  quiz: [
    {
      q: 'O(n) nghĩa là gì?',
      options: [
        'Thời gian chạy tăng tỉ lệ thuận với kích thước đầu vào, khi đầu vào đủ lớn',
        'Chương trình chạy đúng n giây',
        'Chương trình thực hiện đúng n phép toán, không hơn không kém',
      ],
      answer: 0,
      why: 'O lớn nói về xu hướng tăng, không nói về con số tuyệt đối. O(n) nghĩa là khi đầu vào tăng gấp đôi thì thời gian tăng khoảng gấp đôi. Nó cố tình bỏ qua hằng số và các số hạng nhỏ hơn, vì hai thứ đó phụ thuộc vào máy và trình biên dịch, còn xu hướng tăng thì không. Một đoạn O(n) chạy 5n phép toán vẫn là O(n), y hệt đoạn chạy 100n phép toán.',
    },
    {
      q: 'Đoạn code có hai vòng lặp lồng nhau, mỗi vòng chạy từ 0 tới n-1, độ phức tạp là bao nhiêu?',
      options: [
        'O(n²)',
        'O(2n)',
        'O(n log n)',
      ],
      answer: 0,
      why: 'Vòng ngoài chạy n lần, và mỗi lần như thế vòng trong lại chạy trọn n lần, nên tổng số lần thân vòng trong được thực hiện là n × n = n². Chú ý chữ "lồng nhau": nếu hai vòng lặp đặt nối tiếp chứ không lồng, tổng là n + n = 2n và độ phức tạp chỉ là O(n). Lồng nhau thì nhân, nối tiếp thì cộng — đây là quy tắc bạn sẽ dùng lại suốt cả khoá.',
    },
    {
      q: 'Đề cho n tối đa 200000 và giới hạn thời gian 1 giây. Thuật toán O(n²) có dùng được không?',
      options: [
        'Không, vì n² ở đây là 4×10¹⁰ phép toán, vượt xa mức khoảng 10⁸ mà một giây xử lý nổi',
        'Được, vì n² lúc nào cũng nhanh hơn n log n',
        'Được, nếu viết bằng C++ thì máy nào cũng chạy kịp',
      ],
      answer: 0,
      why: 'Một máy tính phổ thông xử lý cỡ 10⁸ phép toán đơn giản trong một giây. Với n = 200000 thì n² = 4×10¹⁰, tức gấp khoảng 400 lần cái mức đó — chạy sẽ mất khoảng vài phút chứ không phải một giây. Trong khi đó n log n chỉ khoảng 3,5×10⁶, thừa sức. Đây chính là cách đọc ngược từ giới hạn đề ra thuật toán cần dùng, và bạn nên tập phản xạ này trước khi viết dòng code nào.',
    },
    {
      q: 'Hai đoạn code cùng là O(n), một đoạn duyệt mảng liên tiếp, một đoạn duyệt danh sách liên kết. Vì sao đoạn duyệt mảng thường nhanh hơn nhiều lần?',
      options: [
        'Vì mảng nằm liền nhau trong bộ nhớ nên bộ đệm cache đoán trước được, còn các nút của danh sách liên kết nằm rải rác',
        'Vì O(n) của mảng thật ra là O(log n)',
        'Vì danh sách liên kết phải sắp xếp lại sau mỗi bước duyệt',
      ],
      answer: 0,
      why: 'O lớn đếm số phép toán chứ không đếm chi phí của từng phép toán. Bộ xử lý đọc bộ nhớ theo từng khối liên tiếp và nạp sẵn khối kế tiếp, nên duyệt mảng gần như luôn "trúng cache". Các nút danh sách liên kết được cấp phát rời rạc, mỗi lần nhảy sang nút sau có thể là một lần trượt cache tốn hàng chục lần lâu hơn. Đây là lý do trong thực tế người ta thường chọn mảng dù lý thuyết nói hai bên như nhau — và cũng là lý do bạn phải tự đo chứ không chỉ tính trên giấy.',
    },
    {
      q: 'Ôn lại chính bài này: O lớn bỏ qua hằng số. Vậy giữa 100n và n², cái nào lớn hơn?',
      options: [
        'Tuỳ n: với n nhỏ thì 100n lớn hơn, nhưng từ n = 100 trở đi thì n² vượt lên và bỏ xa',
        'n² luôn lớn hơn với mọi n',
        '100n luôn lớn hơn vì có hằng số 100',
      ],
      answer: 0,
      recall: true,
      why: 'Giải phương trình 100n = n² được n = 100. Dưới mốc đó thì đoạn O(n) có hằng số lớn lại chậm hơn đoạn O(n²), và đó chính là lý do với dữ liệu bé người ta vẫn dùng thuật toán "tệ" mà đơn giản. Nhưng O lớn quan tâm tới lúc n lớn, và từ mốc đó trở đi thì n² thắng tuyệt đối: ở n = 10⁶, 100n là 10⁸ còn n² là 10¹² — chênh nhau mười nghìn lần. Đây là bài đầu tiên nên câu ôn tập hỏi lại chính bài này; từ bài sau, câu mang nhãn ôn tập sẽ hỏi về những bài bạn đã học trước đó.',
    },
  ],
  practice: [
    {
      title: 'Cho một đoạn code có ba vòng lặp lồng nhau nhưng vòng trong cùng chạy từ i tới n thay vì từ 0 tới n. Tính độ phức tạp và giải thích vì sao nó vẫn là O(n³) chứ không nhỏ hơn.',
      idea: 'Đếm tổng số lần thân vòng trong cùng chạy: với mỗi cặp (i, j) thì vòng trong chạy khoảng n - i lần. Cộng dồn lại được một tổng dạng n³/6. Hằng số 1/6 bị O lớn bỏ đi, nên kết quả vẫn là O(n³) — chỉ nhanh hơn khoảng sáu lần so với ba vòng chạy đủ n, mà sáu lần thì không đổi được bậc.',
      hint: 'Đừng nhìn vào chữ "chạy ít hơn" mà kết luận bậc thấp hơn. Cứ đếm thành công thức rồi giữ lại số hạng lớn nhất, bỏ mọi hằng số nhân — đó là toàn bộ quy trình rút gọn về O lớn.',
    },
    {
      title: 'Cho bảng giới hạn n = 10, n = 1000, n = 10⁶, n = 10⁹. Với mỗi giá trị, liệt kê những độ phức tạp còn dùng được trong một giây và những độ phức tạp chắc chắn không.',
      idea: 'Lấy mốc 10⁸ phép toán mỗi giây làm chuẩn. Tính giá trị của n², n log n, n, log n tại từng mốc rồi so với 10⁸. Ví dụ tại n = 10⁶: n² = 10¹² quá lớn, n log n ≈ 2×10⁷ vừa đẹp, n = 10⁶ rất thoải mái.',
      hint: 'Học thuộc vài mốc phản xạ sẽ tiết kiệm rất nhiều thời gian sau này: n ≤ 20 thì O(2ⁿ) còn được; n ≤ 5000 thì O(n²) được; n ≤ 10⁶ thì phải O(n log n) trở xuống; n ≥ 10⁸ thì gần như bắt buộc O(n) hoặc O(log n).',
    },
    {
      title: 'Viết hai hàm cùng tính tổng một mảng n phần tử: một hàm dùng vòng lặp thường, một hàm đệ quy. Đo thời gian chạy của cả hai với n tăng dần và giải thích chênh lệch.',
      idea: 'Cả hai đều là O(n) về số phép cộng, nhưng bản đệ quy phải tạo n khung ngăn xếp lời gọi hàm, mỗi khung tốn thời gian và bộ nhớ. Đo bằng đồng hồ thật sẽ thấy bản đệ quy chậm hơn vài lần, và với n đủ lớn nó còn tràn ngăn xếp mà dừng hẳn.',
      hint: 'Chạy mỗi phép đo ít nhất năm lần rồi lấy trung vị, đừng lấy lần chạy đầu tiên — lần đầu luôn chậm bất thường vì cache còn lạnh. Nhớ bật cờ tối ưu khi biên dịch, nếu không con số đo được sẽ không phản ánh gì cả.',
    },
  ],
  leetcode: [
    { no: 1929, name: 'Concatenation of Array', slug: 'concatenation-of-array', level: 'Easy', note: 'Bài dễ nhất để tập thói quen: giải xong rồi tự hỏi vòng lặp chạy bao nhiêu lần.' },
    { no: 1480, name: 'Running Sum of 1d Array', slug: 'running-sum-of-1d-array', level: 'Easy', note: 'Giải hai cách: cộng lại từ đầu mỗi vị trí O(n²), và cộng dồn một lượt O(n). Đo cả hai.' },
    { no: 217, name: 'Contains Duplicate', slug: 'contains-duplicate', level: 'Easy', note: 'Ba cách khác bậc nhau: so mọi cặp, sắp xếp rồi so hàng xóm, và dùng tập hợp. So thời gian ba cách.' },
    { no: 121, name: 'Best Time to Buy and Sell Stock', slug: 'best-time-to-buy-and-sell-stock', level: 'Easy', note: 'Cách ngây thơ O(n²) sẽ quá hạn giờ, cách một lượt O(n) thì qua. Chạy cả hai để thấy ranh giới đó bằng số.' },
    { no: 1, name: 'Two Sum', slug: 'two-sum', level: 'Easy', note: 'So cách quét đôi O(n²) với cách dùng bảng tra O(n). Chưa cần hiểu bảng băm, chỉ cần thấy chênh lệch.' },
    { no: 26, name: 'Remove Duplicates from Sorted Array', slug: 'remove-duplicates-from-sorted-array', level: 'Easy', note: 'Đếm xem mỗi phần tử được chạm bao nhiêu lần — đáp án là đúng một lần, nên O(n).' },
    { no: 283, name: 'Move Zeroes', slug: 'move-zeroes', level: 'Easy', note: 'Cách dịch từng phần tử một là O(n²), cách hai con trỏ là O(n). Đo trên mảng 10⁵ phần tử.' },
    { no: 53, name: 'Maximum Subarray', slug: 'maximum-subarray', level: 'Medium', note: 'Ba bậc trong cùng một bài: O(n³) vét cạn, O(n²) có cộng dồn, O(n) một lượt. Đây là bài đo đẹp nhất của cả danh sách.' },
    { no: 238, name: 'Product of Array Except Self', slug: 'product-of-array-except-self', level: 'Medium', note: 'Cách hiển nhiên là O(n²). Tìm cách O(n) rồi đo để thấy khác biệt trên đầu vào lớn.' },
    { no: 152, name: 'Maximum Product Subarray', slug: 'maximum-product-subarray', level: 'Medium', note: 'Làm sau bài 53 để so: cùng dạng một lượt O(n) nhưng phải giữ thêm trạng thái. Bậc không đổi, hằng số đổi.' },
  ],
  project: {
    title: 'Bộ đo thời gian chạy cho chính code của bạn',
    why: 'Trước khi tối ưu bất cứ thứ gì, người ta đo. Google Benchmark, hyperfine và perf đều tồn tại chỉ vì lý do đó. Bạn sắp viết một phiên bản tí hon của chúng, và nó sẽ theo bạn suốt cả khoá: mỗi lần học một cấu trúc dữ liệu mới, bạn sẽ đo nó bằng chính công cụ này thay vì tin lời sách.',
    input: 'Không cần tải dữ liệu. Công cụ nhận tên phép đo, dãy kích thước n và số lần lặp, rồi tự sinh dữ liệu ngẫu nhiên để chạy.',
    must: [
      'Hàm đo một lần chạy, trả về thời gian tính bằng mili giây, dùng std::chrono::steady_clock.',
      'Hàm chạy một phép đo trên nhiều giá trị n, mỗi n lặp nhiều lần và lấy trung vị chứ không lấy trung bình.',
      'Xuất kết quả ra CSV hai cột n,ms để lần sau còn so lại được.',
      'Vẽ biểu đồ ASCII ngay trên terminal, mỗi hàng một giá trị n, độ dài thanh tỉ lệ với thời gian.',
      'Đo ba hàm cố ý khác bậc — O(n), O(n log n), O(n²) — rồi nhìn ba đường tách nhau ra khi n lớn dần.',
      'Đo lại đúng hai cách giải bài LeetCode 53 mà bạn đã viết ở phần trên, in ra bảng so sánh và tự trả lời: từ giá trị n nào thì cách chậm bắt đầu không dùng được nữa.',
    ],
    done: [
      'Chạy được bằng một lệnh và in ra biểu đồ đọc được ngay trên terminal.',
      'Ba đường O(n), O(n log n), O(n²) tách nhau rõ ràng trên biểu đồ khi n vượt vài chục nghìn.',
      'Có ít nhất ba ca kiểm thử tự động: số điểm đo trả về đúng, trung vị tính đúng trên dãy chẵn phần tử, đọc lại CSV vừa ghi ra đúng dữ liệu cũ.',
    ],
    traps: [
      'Lấy trung bình thay vì trung vị — chỉ cần hệ điều hành chen ngang một lần là hỏng cả phép đo.',
      'Quên bật cờ tối ưu khi biên dịch, mọi đường cong đo được đều méo.',
      'Trình biên dịch nhận ra kết quả không được dùng nên xoá luôn vòng lặp cần đo. Phải cộng dồn kết quả vào một biến rồi in ra.',
      'Tính cả thời gian sinh dữ liệu vào thời gian chạy thuật toán.',
      'Chỉ đo một giá trị n rồi kết luận về độ phức tạp. Một điểm không vẽ nên đường cong nào cả.',
    ],
  },
}
