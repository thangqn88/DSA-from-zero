export default {
  goal: [
    'Giải thích được DSU bằng ví dụ gộp các nhóm bạn có chung một nhóm trưởng (đại diện).',
    'Cài đúng 2 hàm find và union, kèm nén đường (path compression) và gộp theo kích thước.',
    'Nhận ra bài nào nên dùng DSU thay vì DFS.',
  ],
  examples: [
    { id: 'vd-dsu-lien-thong', title: 'Đếm số nhóm khi thêm dần các liên kết', official: false },
    { id: 'vd-dsu-chu-trinh', title: 'Phát hiện chu trình trong đồ thị vô hướng', official: false },
  ],
  quiz: [
    {
      q: 'find(x) trong DSU trả về cái gì?',
      options: [
        'Đại diện (nhóm trưởng) của nhóm chứa x',
        'Đỉnh liền kề trực tiếp với x',
        'Số phần tử đang có trong nhóm chứa x',
      ],
      answer: 0,
      why: 'find(x) luôn đi ngược lên theo parent[] cho tới khi gặp 1 đỉnh tự làm cha của chính nó — đỉnh đó là đại diện (nhóm trưởng) của cả nhóm chứa x. Nó không trả về hàng xóm của x, và cũng không đếm số phần tử — muốn biết kích thước nhóm phải tra thêm mảng size[]/num[] riêng.',
    },
    {
      q: 'Khi thêm 1 cạnh (u, v) vào đồ thị vô hướng đang xây dần bằng DSU, làm sao biết cạnh này tạo ra chu trình?',
      options: [
        'Khi find(u) và find(v) đã cùng ra 1 đại diện, TRƯỚC khi gộp',
        'Khi num[u] lớn hơn num[v]',
        'Khi u và v là 2 số liên tiếp',
      ],
      answer: 0,
      why: 'Nếu u và v đã cùng chung 1 đại diện, nghĩa là giữa chúng đã có sẵn ít nhất 1 đường đi khác trong đồ thị đang xây — thêm cạnh (u,v) trực tiếp sẽ tạo ra 1 đường đi thứ hai, tức là 1 chu trình. Nếu 2 đại diện khác nhau, gộp cạnh này chỉ nối 2 nhóm rời nhau, không tạo chu trình.',
    },
    {
      q: 'Nén đường (path compression) trong findSet làm gì?',
      options: [
        'Rút ngắn đường đi lên đại diện cho các lần hỏi (find) sau',
        'Xóa hẳn 1 nhóm khỏi cấu trúc DSU',
        'Đổi đại diện của nhóm sang 1 đỉnh ngẫu nhiên',
      ],
      answer: 0,
      why: 'Mỗi lần findSet(x) đi ngược lên tới gốc, ta gắn thẳng luôn các đỉnh vừa đi qua trỏ trực tiếp vào gốc đó (dòng parent[x] = findSet(parent[x])). Lần find tiếp theo trên đúng các đỉnh này chỉ còn mất 1 bước, không phải đi lại cả chuỗi dài như trước — về lâu dài chi phí mỗi lần find gần như O(1).',
    },
    {
      q: 'DSU có hỗ trợ "xóa" một liên kết đã gộp trước đó không (ví dụ tách 1 nhóm đã gộp ra làm 2 nhóm riêng)?',
      options: [
        'Không, DSU chỉ gộp thêm, không tách nhóm đã gộp',
        'Có, chỉ cần gọi lại union theo chiều ngược',
        'Có, nhưng chỉ tách được nếu nhóm có đúng 2 phần tử',
      ],
      answer: 0,
      why: 'DSU được thiết kế cho bài toán "liên kết chỉ tăng dần theo thời gian" — mỗi lần union chỉ có thể nối 2 nhóm lại thành 1, không có cách nào lần theo cấu trúc parent[] để tách ngược lại đúng ranh giới nhóm cũ. Nếu bài toán cần xóa cạnh/tách nhóm động, DSU không phải công cụ phù hợp, phải dùng cấu trúc khác (ví dụ xây lại từ đầu hoặc dùng cấu trúc nâng cao hơn).',
    },
  ],
  practice: [
    {
      title: 'Cho ma trận kề n thành phố, isConnected[i][j]=1 nếu i và j nối trực tiếp (hoặc i=j). Đếm số tỉnh (nhóm thành phố liên thông với nhau) bằng DSU.',
      idea: 'Mỗi thành phố là 1 phần tử DSU. Với mọi cặp (i,j) mà isConnected[i][j]=1, gọi union(i,j). Sau khi quét hết ma trận, số tỉnh chính là số đại diện gốc khác nhau còn lại — đếm i sao cho find(i)==i.',
      hint: 'Chỉ cần xét i<j để không union 2 lần cho cùng 1 cặp (union lần 2 sẽ tự nhận ra rx==ry và bỏ qua, không sai nhưng dư việc); nhớ khởi tạo parent[i]=i cho mọi i trước khi union.',
    },
    {
      title: 'Cho n đỉnh và danh sách cạnh xây thành cây, nhưng có thêm đúng 1 cạnh dư khiến đồ thị xuất hiện chu trình. Tìm cạnh dư đó (đúng bài Redundant Connection).',
      idea: 'Xử lý các cạnh theo đúng thứ tự đề cho, mỗi cạnh (u,v) gọi find(u) và find(v) TRƯỚC khi union: nếu 2 đại diện đã giống nhau, cạnh này chính là cạnh dư (nó nối 2 đỉnh đã liên thông từ trước) — trả về ngay, không cần union nó. Nếu khác nhau, union bình thường rồi tiếp tục cạnh sau.',
      hint: 'Vì đề luôn đảm bảo chỉ có đúng 1 cạnh dư và các cạnh trước nó vẫn tạo thành rừng cây hợp lệ, cạnh dư luôn là cạnh ĐẦU TIÊN gặp hai đầu mút đã cùng đại diện — không cần quét tiếp sau khi tìm thấy.',
    },
    {
      title: 'Cài thuật toán Kruskal tìm cây khung nhỏ nhất (minimum spanning tree) cho một đồ thị nhỏ có trọng số trên cạnh.',
      idea: 'Sắp xếp toàn bộ cạnh theo trọng số tăng dần. Duyệt từng cạnh (u,v,w) theo thứ tự đó: nếu find(u) != find(v) (chưa cùng nhóm) thì nhận cạnh này vào cây khung, union(u,v), cộng w vào tổng; nếu đã cùng nhóm thì bỏ qua (nhận cạnh này sẽ tạo chu trình, không phải cây). Dừng khi đã nhận đủ n-1 cạnh.',
      hint: 'DSU ở đây dùng đúng 2 hàm find/union không đổi gì so với các bài trước — phần khác biệt duy nhất là phải sort cạnh theo trọng số trước khi bắt đầu duyệt.',
    },
  ],
  leetcode: [
    { no: 547, name: 'Number of Provinces', slug: 'number-of-provinces', level: 'Medium', note: 'Đúng bài tập 1, đầu vào ma trận kề.' },
    { no: 200, name: 'Number of Islands', slug: 'number-of-islands', level: 'Medium', note: 'Làm lại bằng DSU để so với cách DFS đã học.' },
    { no: 684, name: 'Redundant Connection', slug: 'redundant-connection', level: 'Medium', note: 'Đúng bài tập 2, cạnh gây chu trình.' },
    { no: 990, name: 'Satisfiability of Equality Equations', slug: 'satisfiability-of-equality-equations', level: 'Medium', note: 'DSU trên quan hệ bằng nhau.' },
    { no: 1319, name: 'Number of Operations to Make Network Connected', slug: 'number-of-operations-to-make-network-connected', level: 'Medium', note: 'Đếm nhóm và đếm cạnh thừa.' },
    { no: 947, name: 'Most Stones Removed with Same Row or Column', slug: 'most-stones-removed-with-same-row-or-column', level: 'Medium', note: 'Gộp theo hàng và cột.' },
    { no: 721, name: 'Accounts Merge', slug: 'accounts-merge', level: 'Medium', note: 'DSU trên chuỗi, cần ánh xạ tên sang chỉ số.' },
    { no: 128, name: 'Longest Consecutive Sequence', slug: 'longest-consecutive-sequence', level: 'Medium', note: 'Gộp các số liền nhau thành đoạn.' },
    { no: 1584, name: 'Min Cost to Connect All Points', slug: 'min-cost-to-connect-all-points', level: 'Medium', note: 'Đúng bài tập 3, Kruskal.' },
    { no: 839, name: 'Similar String Groups', slug: 'similar-string-groups', level: 'Hard', note: 'Gộp nhóm với hàm so sánh tự định nghĩa.' },
  ],
}
