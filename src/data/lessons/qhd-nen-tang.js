export default {
  goal: [
    'Nói được vì sao đệ quy thuần tính lại cùng một việc rất nhiều lần.',
    'Chuyển được một công thức đệ quy thành bảng lặp từ dưới lên.',
    'Nhận ra dấu hiệu của một bài quy hoạch động khi đọc đề.',
  ],
  examples: [
    { id: 'vd-fibonacci', title: 'Fibonacci — từ đệ quy chậm tới bảng nhanh', official: false },
    { id: 'vd-bac-thang', title: 'Leo bậc thang', official: false },
  ],
  quiz: [
    {
      q: 'Vì sao Fibonacci viết bằng đệ quy thuần lại chạy rất chậm khi n tăng lên?',
      options: [
        'Vì đệ quy luôn chậm hơn vòng lặp trong mọi trường hợp',
        'Vì nó tính lại cùng một bài toán con rất nhiều lần, số lần tính lại tăng theo cấp lũy thừa',
        'Vì máy tính xử lý số âm chậm hơn số dương',
      ],
      answer: 1,
      why: 'Gọi fib(6) sẽ gọi fib(5) và fib(4); fib(5) lại gọi fib(4) một lần nữa — fib(4) bị tính lại nhiều lần, và càng xuống sâu số lần tính lại càng nhân đôi. Đây gọi là "bài toán con gối nhau" (overlapping subproblems), nguyên nhân chính khiến đệ quy thuần chậm.',
    },
    {
      q: 'Đệ quy có nhớ (memoization) và dựng bảng từ dưới lên (tabulation) khác nhau ở điểm nào?',
      options: [
        'Khác nhau về kết quả cuối cùng — đệ quy có nhớ luôn cho đáp án nhỏ hơn',
        'Khác nhau ở thứ tự tính ra từng giá trị, nhưng kết quả cuối cùng giống nhau',
        'Đệ quy có nhớ không cần bảng lưu kết quả, dựng bảng thì cần',
      ],
      answer: 1,
      why: 'Đệ quy có nhớ vẫn gọi hàm theo đúng thứ tự đệ quy tự nhiên, chỉ tra bảng trước khi tính lại; dựng bảng đi tuần tự từ base case lên dần. Cả hai đều lưu kết quả bài toán con vào bảng, nên đáp án cuối cùng luôn giống nhau — chỉ khác thứ tự lấp đầy bảng.',
    },
    {
      q: 'Dấu hiệu nào giúp nhận ra một bài toán có thể giải bằng quy hoạch động?',
      options: [
        'Đề bài có nhắc tới từ "tối ưu" hoặc "đếm số cách"',
        'Bài toán có bài toán con gối nhau (lặp lại nhiều lần) và cấu trúc con tối ưu (lời giải lớn ghép được từ lời giải tối ưu của bài toán con)',
        'Dữ liệu đầu vào là một mảng số nguyên',
      ],
      answer: 1,
      why: 'Hai điều kiện bắt buộc của QHĐ là: bài toán con gối nhau (nếu không có, đệ quy thường đã đủ nhanh) và cấu trúc con tối ưu (nếu không có, ghép lời giải con tối ưu không chắc ra lời giải lớn tối ưu). Nhắc tới "tối ưu" hay là mảng số chỉ là gợi ý bề mặt, không phải điều kiện quyết định.',
    },
    {
      q: 'Leo thang n = 5 bậc, mỗi lần bước 1 hoặc 2 bậc, có bao nhiêu cách lên tới bậc 5?',
      options: ['5', '8', '13'],
      answer: 1,
      why: 'dp[1]=1, dp[2]=2, dp[3]=dp[2]+dp[1]=3, dp[4]=dp[3]+dp[2]=5, dp[5]=dp[4]+dp[3]=5+3=8 — đúng công thức Fibonacci lệch chỉ số, kết quả là 8 cách.',
    },
  ],
  practice: [
    {
      title: 'Đếm số đường đi từ góc trên-trái tới góc dưới-phải trên lưới m×n, mỗi bước chỉ được đi phải hoặc đi xuống.',
      idea: 'Muốn tới ô (i,j), bước cuối cùng chỉ có thể tới từ ô bên trái (i,j-1) hoặc ô bên trên (i-1,j) — không còn khả năng khác. Vậy số đường đi tới (i,j) bằng tổng số đường đi tới 2 ô đó.',
      hint: 'dp[i][j] = dp[i-1][j] + dp[i][j-1], base case dp[0][j] = dp[i][0] = 1 (chỉ có đúng 1 đường đi dọc theo biên). Tính dp theo thứ tự hàng trên xuống, mỗi hàng trái sang phải.',
    },
    {
      title: 'House Robber: cho một dãy nhà với số tiền trong mỗi nhà, chọn cướp một số nhà để tổng tiền lớn nhất, nhưng không được cướp 2 nhà liền kề nhau.',
      idea: 'Ở mỗi nhà i, chỉ có 2 lựa chọn: không cướp nhà i (giữ nguyên kết quả tốt nhất tính tới nhà i-1), hoặc cướp nhà i (cộng tiền nhà i vào kết quả tốt nhất tính tới nhà i-2, vì nhà i-1 bắt buộc phải bỏ qua). Lấy giá trị lớn hơn trong 2 lựa chọn đó.',
      hint: 'dp[i] = max(dp[i-1], dp[i-2] + nums[i]), base case dp[0] = nums[0], dp[1] = max(nums[0], nums[1]). Có thể rút gọn về 2 biến vì chỉ cần nhìn lại đúng 2 giá trị liền trước.',
    },
    {
      title: 'Đổi tiền với số tờ ít nhất, cho một bộ mệnh giá bất kỳ (không đảm bảo là hệ tiền "chuẩn" như {25,10,5,1}) — giải đúng cho mọi trường hợp bằng quy hoạch động.',
      idea: 'Đây đúng là bài đổi tiền mà tham lam làm sai với hệ {1,3,4}. Với mỗi số tiền i, thử lần lượt từng mệnh giá c ≤ i, mỗi mệnh giá cho ra một cách đổi khả dĩ là "1 đồng c + cách đổi tốt nhất cho số tiền còn lại i-c" — giữ lại cách nhỏ nhất trong tất cả các mệnh giá đã thử.',
      hint: 'dp[i] = min(dp[i-c] + 1) với mọi mệnh giá c ≤ i mà dp[i-c] có giá trị hợp lệ; dp[0] = 0; nếu không có cách nào đổi được số tiền i thì dp[i] giữ giá trị "vô cực" (ví dụ amount+1) để loại ra ở bước cuối.',
    },
  ],
  leetcode: [
    { no: 509, name: 'Fibonacci Number', slug: 'fibonacci-number', level: 'Easy', note: 'Đúng ví dụ 1, làm cả 3 cách viết.' },
    { no: 70, name: 'Climbing Stairs', slug: 'climbing-stairs', level: 'Easy', note: 'Đúng ví dụ 2.' },
    { no: 746, name: 'Min Cost Climbing Stairs', slug: 'min-cost-climbing-stairs', level: 'Easy', note: 'Biến thể có chi phí mỗi bậc.' },
    { no: 1137, name: 'N-th Tribonacci Number', slug: 'n-th-tribonacci-number', level: 'Easy', note: 'Mở rộng công thức sang 3 số hạng.' },
    { no: 198, name: 'House Robber', slug: 'house-robber', level: 'Medium', note: 'Đúng bài tập 2, có ràng buộc không lấy liền kề.' },
    { no: 213, name: 'House Robber II', slug: 'house-robber-ii', level: 'Medium', note: 'Cùng bài nhưng dãy vòng tròn.' },
    { no: 62, name: 'Unique Paths', slug: 'unique-paths', level: 'Medium', note: 'Đúng bài tập 1, bảng 2 chiều đầu tiên.' },
    { no: 63, name: 'Unique Paths II', slug: 'unique-paths-ii', level: 'Medium', note: 'Thêm vật cản, học cách xử lý ô cấm.' },
    { no: 64, name: 'Minimum Path Sum', slug: 'minimum-path-sum', level: 'Medium', note: 'Đổi từ đếm sang tối ưu trên cùng một bảng.' },
    { no: 322, name: 'Coin Change', slug: 'coin-change', level: 'Medium', note: 'Đúng bài tập 3, chính là bài tham lam làm sai.' },
  ],
}
