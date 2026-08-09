export default {
  goal: [
    'Đọc được ma trận kề và vẽ lại đồ thị tương ứng.',
    'Nói được khi nào dùng DFS, khi nào dùng BFS và vì sao.',
    'Giải đúng bài đồ thị trong đề: kiểm tra liên thông và tìm đường đi bằng BFS.',
  ],
  examples: [
    { id: 'vd-lien-thong', title: 'Đếm số thành phần liên thông', official: true },
    { id: 'vd-duong-di-bfs', title: 'Tìm đường đi ngắn nhất bằng BFS', official: true },
  ],
  quiz: [
    {
      q: 'DFS dùng cấu trúc dữ liệu nào để "nhớ đường quay lại", và BFS dùng cấu trúc dữ liệu nào để "chờ tới lượt"?',
      options: [
        'DFS dùng ngăn xếp (hoặc đệ quy — về bản chất là ngăn xếp ẩn của hệ thống), BFS dùng hàng đợi',
        'DFS dùng hàng đợi, BFS dùng ngăn xếp',
        'Cả hai đều dùng hàng đợi, chỉ khác nhau ở cách khởi tạo',
      ],
      answer: 0,
      why: 'DFS "đi sâu 1 hướng rồi mới quay lại" — đúng nguyên tắc LIFO của ngăn xếp: đỉnh vừa thêm được đào sâu tiếp ngay. BFS "loang đều theo từng vòng" — đúng nguyên tắc FIFO của hàng đợi: đỉnh thêm trước phải được xử lý xong trước khi tới đỉnh thêm sau. Đổi đúng 1 chữ (queue thành stack) trong code BFS sẽ biến nó thành DFS, chứng minh khác biệt duy nhất nằm ở cấu trúc dữ liệu chờ xử lý.',
    },
    {
      q: 'Muốn tìm đường đi có số cạnh ít nhất giữa 2 đỉnh trên đồ thị không trọng số, nên dùng thuật toán nào?',
      options: ['DFS', 'BFS', 'Cả hai cho cùng kết quả nên dùng cái nào cũng được'],
      answer: 1,
      why: 'BFS duyệt lan đều theo từng lớp — lớp gần gốc nhất luôn được xét hết trước khi sang lớp xa hơn, nên lần đầu tiên BFS chạm tới 1 đỉnh cũng chính là đường đi ngắn nhất về số cạnh tới đỉnh đó. DFS đi sâu theo 1 nhánh trước nên đường đi nó tìm ra đầu tiên có thể dài hơn nhiều so với đường ngắn nhất thực sự.',
    },
    {
      q: 'Nếu bỏ mảng visited[] (chuaxet[]/daxet[]) khi DFS hoặc BFS trên một đồ thị có chu trình, điều gì xảy ra?',
      options: [
        'Không ảnh hưởng gì, thuật toán vẫn đúng nhưng chạy chậm hơn 1 chút',
        'Thuật toán lặp vô hạn: cứ quay lại thăm các đỉnh cũ theo đúng chu trình đó, không bao giờ dừng',
        'Chương trình sẽ báo lỗi biên dịch ngay lập tức',
      ],
      answer: 1,
      why: 'visited[] có đúng 1 nhiệm vụ: ngăn không cho DFS/BFS thăm lại 1 đỉnh đã thăm. Nếu đồ thị có chu trình (ví dụ 1→2→3→1) và không có visited[], thuật toán cứ đi theo chu trình này lặp lại vô tận, không có điều kiện nào khiến nó dừng — với đồ thị vô hướng thì ngay cả không có chu trình "thật" cũng lặp vô hạn giữa 2 đỉnh kề nhau (đi tới rồi lại đi về).',
    },
    {
      q: 'Ma trận kề adj[n][n] cho một đồ thị n đỉnh tốn bao nhiêu bộ nhớ?',
      options: [
        'O(n), không phụ thuộc số cạnh',
        'O(n+m), phụ thuộc cả số đỉnh và số cạnh',
        'O(n²), bất kể đồ thị có bao nhiêu cạnh',
      ],
      answer: 2,
      why: 'Ma trận kề luôn cấp phát đủ n×n ô để có thể tra adj[u][v] cho MỌI cặp đỉnh, dù thực tế đồ thị chỉ có vài cạnh hay đầy cạnh — bộ nhớ không đổi theo số cạnh thật. Đây khác hẳn danh sách kề (List[]), chỉ tốn O(n+m) vì chỉ lưu đúng những cạnh có thật.',
    },
  ],
  practice: [
    {
      title: 'Đếm số "hòn đảo" trên lưới ký tự (ma trận chỉ gồm \'1\' = đất và \'0\' = nước, 2 ô kề theo 4 hướng trên/dưới/trái/phải cùng là đất thì thuộc cùng 1 đảo).',
      idea: 'Một lưới ô vuông cũng là 1 đồ thị — chỉ khác cách xác định "kề nhau": không tra adj[u][v], mà kiểm tra 4 ô lân cận trực tiếp. Dùng đúng ý tưởng countComponents(): mỗi lần gặp ô đất chưa thăm là 1 đảo mới, DFS/BFS loang hết đảo đó rồi đánh dấu đã thăm trước khi sang ô tiếp theo.',
      hint: 'Không cần mảng adj[][] hay List[] tường minh — hàm "lấy các đỉnh kề với (i,j)" chỉ cần trả về tối đa 4 ô (i±1,j) và (i,j±1) miễn còn nằm trong lưới và là đất.',
    },
    {
      title: 'Bài toán "cam thối" (Rotting Oranges): lưới ô có cam tươi, cam thối và ô rỗng; mỗi phút cam thối làm thối các ô cam tươi kề nó. Tính số phút để toàn bộ cam tươi thối hết (hoặc báo không thể).',
      idea: 'Đây là BFS nhưng xuất phát từ NHIỀU nguồn cùng lúc: đẩy hết mọi ô cam thối ban đầu vào hàng đợi ngay từ đầu (không phải chỉ 1 đỉnh), rồi BFS bình thường — vì mọi nguồn cùng bắt đầu ở "vòng 0", số vòng loang lớn nhất chính là số phút cần.',
      hint: 'Đếm số cam tươi còn lại lúc đầu; nếu sau khi BFS xong vẫn còn cam tươi chưa bị thối (chưa từng được thăm) thì trả về -1; số phút cần chính là số lớp loang xa nhất mà BFS đạt tới.',
    },
    {
      title: 'Kiểm tra một đồ thị CÓ HƯỚNG có chu trình hay không, dùng DFS.',
      idea: 'Với đồ thị có hướng, chỉ 1 mảng visited[] (đã thăm/chưa thăm) là không đủ, vì "đã thăm" không phân biệt được "đang xử lý trên đường đi hiện tại" với "đã xử lý xong và không còn liên quan". Cần 3 trạng thái: 0=chưa thăm, 1=đang xử lý (đang trên nhánh đệ quy hiện tại), 2=đã xử lý xong hoàn toàn — gặp lại 1 đỉnh đang ở trạng thái 1 nghĩa là quay lại chính nhánh đang đi, tức có chu trình.',
      hint: 'Nhớ đổi trạng thái đỉnh từ 1 về 2 SAU KHI đã đệ quy hết mọi đỉnh kề — nếu quên bước này, mọi đỉnh sẽ mãi mãi ở trạng thái 1 và thuật toán báo có chu trình một cách sai lệch.',
    },
  ],
  leetcode: [
    { no: 733, name: 'Flood Fill', slug: 'flood-fill', level: 'Easy', note: 'Loang trên lưới ở mức dễ nhất.' },
    { no: 200, name: 'Number of Islands', slug: 'number-of-islands', level: 'Medium', note: 'Đúng bài tập 1, đếm thành phần liên thông trên lưới.' },
    { no: 695, name: 'Max Area of Island', slug: 'max-area-of-island', level: 'Medium', note: 'Cùng khuôn, thêm việc đếm kích thước.' },
    { no: 547, name: 'Number of Provinces', slug: 'number-of-provinces', level: 'Medium', note: 'Đúng ví dụ 1, đầu vào là ma trận kề.' },
    { no: 994, name: 'Rotting Oranges', slug: 'rotting-oranges', level: 'Medium', note: 'Đúng bài tập 2, BFS nhiều nguồn.' },
    { no: 1091, name: 'Shortest Path in Binary Matrix', slug: 'shortest-path-in-binary-matrix', level: 'Medium', note: 'BFS tìm đường ngắn nhất trên lưới.' },
    { no: 133, name: 'Clone Graph', slug: 'clone-graph', level: 'Medium', note: 'Duyệt đồ thị kèm ánh xạ đỉnh.' },
    { no: 207, name: 'Course Schedule', slug: 'course-schedule', level: 'Medium', note: 'Đúng bài tập 3, phát hiện chu trình.' },
    { no: 210, name: 'Course Schedule II', slug: 'course-schedule-ii', level: 'Medium', note: 'Sắp xếp tô-pô bằng BFS.' },
    { no: 785, name: 'Is Graph Bipartite', slug: 'is-graph-bipartite', level: 'Medium', note: 'Tô màu 2 màu khi duyệt.' },
    { no: 127, name: 'Word Ladder', slug: 'word-ladder', level: 'Hard', note: 'BFS trên đồ thị ngầm, không cho sẵn cạnh.' },
  ],
}
