export default {
  goal: [
    'Đặt được trạng thái và công thức truy hồi cho Knapsack, LIS, LCS và Xâu đối xứng.',
    'Đọc và điền được bảng dp 2 chiều bằng tay.',
    'Truy vết ngược từ bảng dp để lấy ra lời giải, không chỉ lấy con số.',
  ],
  examples: [
    { id: 'vd-knapsack', title: 'Cái túi 0/1 (Knapsack)', official: true },
    { id: 'vd-lis', title: 'Dãy con tăng dài nhất (LIS)', official: true },
  ],
  quiz: [
    {
      q: 'Dãy con (subsequence) và đoạn con (substring) khác nhau ở đâu?',
      options: [
        'Dãy con không cần các phần tử liền nhau, chỉ cần giữ đúng thứ tự; đoạn con phải liền nhau',
        'Dãy con phải liền nhau, đoạn con không cần liền nhau',
        'Hai khái niệm này thực ra là một, chỉ khác tên gọi',
      ],
      answer: 0,
      why: 'Dãy con (subsequence) cho phép bỏ qua một số phần tử, miễn giữ đúng thứ tự ban đầu — như LCS, LIS. Đoạn con (substring) bắt buộc các phần tử phải đứng liền kề nhau, không được bỏ ai ở giữa — như bài xâu đối xứng dài nhất. Nhầm 2 khái niệm này là lỗi phổ biến nhất khi mới học QHĐ trên xâu/dãy.',
    },
    {
      q: 'Trong bài Knapsack 0/1, trạng thái dp[i][w] nghĩa là gì?',
      options: [
        'Giá trị tốt nhất đạt được khi chỉ xét i món đầu tiên, với sức chứa tối đa w',
        'Trọng lượng còn dư của ba lô sau khi lấy i món',
        'Số cách khác nhau để chọn i món sao cho vừa sức chứa w',
      ],
      answer: 0,
      why: 'dp[i][w] là giá trị lớn nhất có thể đạt được khi chỉ được chọn trong i món đầu tiên, với ba lô sức chứa tối đa w. Công thức truy hồi so sánh 2 lựa chọn ở món thứ i (lấy hoặc không lấy) dựa trên đúng định nghĩa này.',
    },
    {
      q: 'Vì sao bản rút gọn 1 chiều của Knapsack 0/1 phải duyệt sức chứa w từ lớn về nhỏ?',
      options: [
        'Để mỗi món chỉ được lấy đúng 1 lần, không bị tính lại nhiều lần trong cùng 1 vòng lặp món',
        'Để chương trình chạy nhanh hơn về mặt hằng số thời gian',
        'Vì duyệt tăng dần sẽ gây lỗi tràn số (overflow)',
      ],
      answer: 0,
      why: 'Nếu duyệt w tăng dần, khi cập nhật dp[w] ta có thể dùng lại dp[w-weight] đã bị cập nhật NGAY TRONG VÒNG LẶP của chính món đang xét — tức là vô tình cho phép lấy món đó nhiều lần (giống Knapsack không giới hạn). Duyệt w giảm dần đảm bảo dp[w-weight] vẫn là giá trị "trước khi xét món i", đúng với 0/1 Knapsack.',
    },
    {
      q: 'LCS (dãy con chung dài nhất) của "abcde" và "ace" dài bao nhiêu?',
      options: ['2', '3', '5'],
      answer: 1,
      why: 'Dãy con chung là "ace" (a, c, e xuất hiện theo đúng thứ tự ở cả 2 xâu), độ dài 3. Đây cũng đúng bằng độ dài của "ace", vì toàn bộ "ace" là dãy con của "abcde".',
    },
    {
      q: 'Xâu con đối xứng dài nhất (longest palindromic substring) trong "babad" là gì?',
      options: ['"babad"', '"bab" hoặc "aba"', '"ba"'],
      answer: 1,
      why: '"bab" và "aba" đều là đoạn liên tục đọc xuôi = đọc ngược, cùng độ dài 3 — đây là kết quả dài nhất có thể trong "babad" (đề thường chấp nhận cả 2). "babad" cả xâu không đối xứng vì ký tự đầu "b" khác ký tự cuối "d".',
    },
  ],
  practice: [
    {
      title: 'Đếm số cách chọn ra một tập con các số trong mảng sao cho tổng đúng bằng S (biến thể đếm số cách của Knapsack, không phải tìm giá trị lớn nhất).',
      idea: 'Đây là Knapsack nhưng đổi phép toán ghép bài toán con: thay vì "chọn max giữa lấy/không lấy", ta CỘNG số cách của 2 nhánh lại. dp[i][s] = số cách chọn trong i số đầu để có tổng đúng s = dp[i-1][s] (không lấy số i) + dp[i-1][s-a[i]] (lấy số i, nếu a[i] ≤ s).',
      hint: 'Base case dp[0][0] = 1 (không chọn gì thì có đúng 1 cách đạt tổng 0), dp[0][s>0] = 0. Rút gọn về 1 chiều thì vẫn phải duyệt s từ lớn về nhỏ, đúng lý do như Knapsack 0/1 ở ví dụ 1.',
    },
    {
      title: 'Tìm độ dài xâu con chung dài nhất (LCS) của 2 xâu, và truy vết ra đúng xâu đó (không chỉ ra con số).',
      idea: 'Dựng bảng dp[i][j] như ví dụ LCS ở phần lý thuyết. Sau khi có bảng, đi ngược từ dp[n][m]: nếu s1[i-1]==s2[j-1] thì ký tự đó chắc chắn thuộc LCS, lùi cả i và j; nếu không, lùi theo hướng ô nào có giá trị lớn hơn giữa dp[i-1][j] và dp[i][j-1].',
      hint: 'Truy vết đi từ góc dưới-phải (dp[n][m]) ngược lên góc trên-trái (dp[0][0]) — ký tự thu được theo thứ tự ngược, nhớ đảo lại chuỗi kết quả ở cuối.',
    },
    {
      title: 'Đếm số xâu con (substring) đối xứng có trong 1 xâu cho trước (không chỉ tìm cái dài nhất).',
      idea: 'Dùng đúng bảng dp[i][j] (đoạn s[i..j] có đối xứng hay không) như ví dụ xâu đối xứng dài nhất ở phần lý thuyết — mỗi ô dp[i][j] = true đóng góp đúng 1 vào bộ đếm. Duyệt hết bảng theo đúng thứ tự độ dài tăng dần, cộng dồn số ô true.',
      hint: 'Không cần sửa công thức truy hồi, chỉ cần thêm 1 biến đếm và cộng 1 mỗi khi dp[i][j] vừa được tính ra true — đúng nguyên khung bài "xâu đối xứng dài nhất".',
    },
  ],
  leetcode: [
    { no: 392, name: 'Is Subsequence', slug: 'is-subsequence', level: 'Easy', note: 'Làm rõ khái niệm dãy con trước khi vào LCS.' },
    { no: 1143, name: 'Longest Common Subsequence', slug: 'longest-common-subsequence', level: 'Medium', note: 'Đúng bài tập 2.' },
    { no: 300, name: 'Longest Increasing Subsequence', slug: 'longest-increasing-subsequence', level: 'Medium', note: 'Đúng ví dụ 2, làm cả 2 bản O(n²) và O(n log n).' },
    { no: 416, name: 'Partition Equal Subset Sum', slug: 'partition-equal-subset-sum', level: 'Medium', note: 'Knapsack dạng có hay không.' },
    { no: 494, name: 'Target Sum', slug: 'target-sum', level: 'Medium', note: 'Đúng bài tập 1, knapsack đếm số cách.' },
    { no: 1049, name: 'Last Stone Weight II', slug: 'last-stone-weight-ii', level: 'Medium', note: 'Knapsack ẩn sau một đề bài lạ.' },
    { no: 5, name: 'Longest Palindromic Substring', slug: 'longest-palindromic-substring', level: 'Medium', note: 'Xâu đối xứng dạng đoạn con.' },
    { no: 516, name: 'Longest Palindromic Subsequence', slug: 'longest-palindromic-subsequence', level: 'Medium', note: 'Cùng chủ đề nhưng là dãy con, so sánh với bài trên.' },
    { no: 647, name: 'Palindromic Substrings', slug: 'palindromic-substrings', level: 'Medium', note: 'Đúng bài tập 3.' },
    { no: 72, name: 'Edit Distance', slug: 'edit-distance', level: 'Medium', note: 'Bảng 2 chiều họ hàng gần với LCS.' },
    { no: 354, name: 'Russian Doll Envelopes', slug: 'russian-doll-envelopes', level: 'Hard', note: 'LIS sau khi sắp xếp khéo.' },
  ],
}
