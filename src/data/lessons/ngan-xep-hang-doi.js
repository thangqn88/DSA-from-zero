export default {
  goal: [
    'Nói được LIFO và FIFO bằng ví dụ chồng đĩa và hàng mua vé.',
    'Chọn đúng ngăn xếp hay hàng đợi ngay khi đọc đề.',
    'Giải đúng bài Dãy ngoặc hợp lệ và bài Đảo ngược từng từ trong đề.',
  ],
  examples: [
    { id: 'vd-day-ngoac', title: 'Kiểm tra dãy ngoặc hợp lệ', official: true },
    { id: 'vd-dao-tu-trong-xau', title: 'Đảo ngược từng từ trong xâu', official: true },
  ],
  quiz: [
    {
      q: 'Ngăn xếp (Stack, LIFO) và hàng đợi (Queue, FIFO) khác nhau ở điểm nào?',
      options: [
        'Khác nhau ở thứ tự lấy phần tử ra: Stack lấy ra phần tử mới nhất (vào sau ra trước), Queue lấy ra phần tử cũ nhất (vào trước ra trước)',
        'Stack chỉ lưu được số, Queue lưu được mọi kiểu dữ liệu',
        'Queue luôn nhanh hơn Stack vì có 2 con trỏ',
      ],
      answer: 0,
      why: 'Cả 2 đều thêm/lấy phần tử với chi phí O(1), khác nhau duy nhất ở quy tắc chọn phần tử để lấy ra: Stack giống chồng đĩa (đĩa đặt sau cùng lấy ra trước — LIFO), Queue giống hàng mua vé (ai xếp hàng trước được phục vụ trước — FIFO).',
    },
    {
      q: 'Bài kiểm tra dãy ngoặc hợp lệ nên dùng ngăn xếp hay hàng đợi, và vì sao?',
      options: [
        'Hàng đợi, vì cần xử lý các dấu ngoặc theo đúng thứ tự xuất hiện trong xâu',
        'Ngăn xếp, vì dấu ngoặc mở gần nhất luôn phải được đóng trước — đúng tính chất LIFO',
        'Cả hai đều được, không ảnh hưởng tới kết quả',
      ],
      answer: 1,
      why: 'Xét "([)]": nếu chỉ đếm số ngoặc mở/đóng thì xâu này có vẻ hợp lệ (2 mở, 2 đóng), nhưng thực tế sai vì "]" đóng trước khi "(" kịp đóng. Cái cần kiểm tra là "dấu mở gần nhất phải khớp với dấu đóng đang xét" — đó chính xác là hành vi push/pop của ngăn xếp.',
    },
    {
      q: 'BFS (duyệt theo từng lớp, tìm đường đi ngắn nhất trên đồ thị không trọng số) dùng cấu trúc dữ liệu nào để lưu các đỉnh đang chờ xử lý?',
      options: ['Ngăn xếp (Stack)', 'Hàng đợi (Queue)', 'Không cần cấu trúc phụ nào'],
      answer: 1,
      why: 'BFS cần xử lý đỉnh nào được thêm vào trước tiên trước (đỉnh ở lớp gần gốc hơn), đúng tính chất FIFO của hàng đợi. Nếu đổi sang ngăn xếp, thứ tự duyệt sẽ đi sâu vào 1 nhánh trước — đó lại là DFS, không còn đảm bảo tìm đường ngắn nhất.',
    },
    {
      q: 'Đẩy lần lượt 1, 2, 3 vào một ngăn xếp rồi lấy ra (pop) 2 lần liên tiếp, thứ tự 2 giá trị lấy ra là gì?',
      options: ['1 rồi 2', '3 rồi 2', '2 rồi 3'],
      answer: 1,
      why: 'Ngăn xếp là LIFO — phần tử đẩy vào sau cùng (3) luôn được lấy ra trước. Sau khi push 1,2,3, đỉnh ngăn xếp là 3 → pop lần 1 ra 3, đỉnh còn lại là 2 → pop lần 2 ra 2. Thứ tự lấy ra: 3 rồi 2.',
    },
  ],
  practice: [
    {
      title: 'Tính giá trị một biểu thức hậu tố (Reverse Polish Notation), ví dụ "3 4 2 * +" phải ra 11.',
      idea: 'Đọc từng token trái sang phải: gặp số thì đẩy vào ngăn xếp; gặp toán tử thì lấy 2 số ở đỉnh ra tính rồi đẩy kết quả trở lại. Vì toán tử luôn đứng ngay sau 2 toán hạng của nó, 2 số cần dùng luôn chính là 2 giá trị gần nhất vừa đẩy vào — đúng tính chất LIFO.',
      hint: 'Nhớ đúng thứ tự khi pop: phần tử pop ra trước là toán hạng bên phải, phần tử pop ra sau là toán hạng bên trái — với phép trừ/chia thứ tự này ảnh hưởng trực tiếp tới kết quả.',
    },
    {
      title: 'Cài Min Stack: một ngăn xếp hỗ trợ thêm push, pop, top như thường, cộng thêm hàm lấy giá trị nhỏ nhất hiện có trong O(1).',
      idea: 'Không thể quét lại cả ngăn xếp mỗi lần hỏi giá trị nhỏ nhất (tốn O(n)). Giải pháp: giữ thêm một ngăn xếp phụ chỉ lưu "giá trị nhỏ nhất tính đến thời điểm đó" — mỗi lần push, so sánh với đỉnh ngăn xếp phụ và đẩy vào giá trị nhỏ hơn; mỗi lần pop, pop luôn cả 2 ngăn xếp.',
      hint: 'Ngăn xếp phụ luôn có cùng độ dài với ngăn xếp chính, và đỉnh của nó luôn là giá trị nhỏ nhất hiện có — tra đỉnh là xong, không cần quét.',
    },
    {
      title: 'Cài một hàng đợi (FIFO) chỉ dùng 2 ngăn xếp (không dùng mảng/deque có sẵn).',
      idea: 'Một ngăn xếp lo việc "nhận vào" (enqueue: chỉ push), một ngăn xếp lo việc "lấy ra" (dequeue: chỉ pop). Khi ngăn xếp lấy ra bị rỗng mà cần dequeue, đổ hết ngăn xếp nhận vào sang ngăn xếp lấy ra — việc đổ qua đổ lại này tự động lộn ngược thứ tự đúng 1 lần, biến LIFO+LIFO thành FIFO.',
      hint: 'Chỉ đổ dữ liệu từ ngăn xếp nhận sang ngăn xếp lấy khi ngăn xếp lấy đang rỗng — nếu đổ mỗi lần dequeue sẽ làm sai thứ tự và tốn thời gian không cần thiết.',
    },
  ],
  leetcode: [
    { no: 20, name: 'Valid Parentheses', slug: 'valid-parentheses', level: 'Easy', note: 'Đúng ví dụ 1.' },
    { no: 155, name: 'Min Stack', slug: 'min-stack', level: 'Easy', note: 'Đúng bài tập 2.' },
    { no: 232, name: 'Implement Queue using Stacks', slug: 'implement-queue-using-stacks', level: 'Easy', note: 'Đúng bài tập 3.' },
    { no: 1047, name: 'Remove All Adjacent Duplicates In String', slug: 'remove-all-adjacent-duplicates-in-string', level: 'Easy', note: 'Ngăn xếp trên xâu, rất dễ hình dung.' },
    { no: 844, name: 'Backspace String Compare', slug: 'backspace-string-compare', level: 'Easy', note: 'Ngăn xếp mô phỏng phím xóa.' },
    { no: 496, name: 'Next Greater Element I', slug: 'next-greater-element-i', level: 'Easy', note: 'Làm quen ngăn xếp đơn điệu.' },
    { no: 150, name: 'Evaluate Reverse Polish Notation', slug: 'evaluate-reverse-polish-notation', level: 'Medium', note: 'Đúng bài tập 1, biểu thức hậu tố.' },
    { no: 151, name: 'Reverse Words in a String', slug: 'reverse-words-in-a-string', level: 'Medium', note: 'Đúng ví dụ 2.' },
    { no: 739, name: 'Daily Temperatures', slug: 'daily-temperatures', level: 'Medium', note: 'Ngăn xếp đơn điệu ở dạng kinh điển.' },
    { no: 394, name: 'Decode String', slug: 'decode-string', level: 'Medium', note: 'Ngăn xếp lồng nhau, luyện tư duy đệ quy.' },
    { no: 239, name: 'Sliding Window Maximum', slug: 'sliding-window-maximum', level: 'Hard', note: 'Hàng đợi hai đầu.' },
    { no: 84, name: 'Largest Rectangle in Histogram', slug: 'largest-rectangle-in-histogram', level: 'Hard', note: 'Đỉnh cao của ngăn xếp đơn điệu.' },
  ],
}
