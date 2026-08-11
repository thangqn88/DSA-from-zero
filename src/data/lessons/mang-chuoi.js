export default {
  goal: [
    'Giải thích được vì sao đọc một mảng theo chỉ số là O(1), bằng đúng phép tính địa chỉ.',
    'Phân biệt được sức chứa và số phần tử của mảng động, và nói được vì sao phải nhân đôi khi đầy.',
    'Tự cài được Vec<T> và Str tối thiểu, không dựa vào std::vector.',
    'Dùng được phân tích khấu trừ để giải thích vì sao push_back trung bình là O(1).',
  ],
  examples: [
    { id: 'vd-mc-nhan-doi-suc-chua', title: 'Xem mảng động nở ra và đếm tổng số lần copy', official: false },
    { id: 'vd-mc-chen-giua-vs-cuoi', title: 'So chèn vào giữa với chèn vào cuối trên mảng một triệu phần tử', official: false },
  ],
  quiz: [
    {
      q: 'Vì sao truy cập một phần tử mảng theo chỉ số là O(1)?',
      options: [
        'Vì địa chỉ của phần tử thứ i bằng địa chỉ đầu cộng i nhân kích thước một phần tử, chỉ một phép nhân và một phép cộng',
        'Vì máy tính lưu sẵn một bảng tra chỉ số cho mọi mảng',
        'Vì mảng luôn được sắp xếp sẵn nên tìm rất nhanh',
      ],
      answer: 0,
      why: 'Mảng nằm trên một vùng nhớ liên tục, nên chỉ cần biết địa chỉ của phần tử đầu tiên và kích thước một phần tử là tính ngay được địa chỉ của phần tử thứ i, không phụ thuộc n lớn hay nhỏ. Không có bảng tra ẩn nào cả — chính vì không cần bảng tra mà phép tính mới rẻ. Và mảng không nhất thiết phải sắp xếp; tính chất O(1) này đến từ cách bố trí trong bộ nhớ, không đến từ thứ tự dữ liệu.',
    },
    {
      q: 'Thao tác nào trên mảng có chi phí O(n) trong trường hợp chung, kể cả khi mảng còn thừa sức chứa?',
      options: [
        'Chèn hoặc xoá một phần tử ở giữa mảng',
        'Đọc phần tử ở một chỉ số cho trước',
        'Thêm một phần tử vào cuối mảng khi còn chỗ',
      ],
      answer: 0,
      why: 'Chèn hoặc xoá ở giữa buộc phải dịch mọi phần tử phía sau sang một chỗ để giữ mảng liên tục, và số phần tử phải dịch tỉ lệ với n, nên là O(n). Đọc theo chỉ số là O(1) như câu trên đã nói. Thêm vào cuối khi còn sức chứa cũng chỉ là một phép ghi vào ô trống kế tiếp, không phải dịch gì cả, nên vẫn O(1).',
    },
    {
      q: 'Khi mảng động đầy sức chứa, chiến lược nào giữ được chi phí push_back trung bình là O(1)?',
      options: [
        'Cấp mảng mới với sức chứa gấp đôi, copy phần tử cũ sang rồi giải phóng mảng cũ',
        'Cấp thêm đúng 10 ô mỗi lần đầy, để không lãng phí bộ nhớ',
        'Không cấp thêm, báo lỗi và dừng chương trình khi đầy',
      ],
      answer: 0,
      why: 'Nhân đôi sức chứa làm số lần nở giảm theo cấp số nhân khi n tăng, nên tổng chi phí copy cộng dồn qua n lần thêm nhỏ hơn 2n, và bình quân mỗi lần thêm là O(1) — đây gọi là khấu trừ. Cộng thêm một lượng cố định như 10 mỗi lần đầy thì số lần nở tỉ lệ với n, và tổng chi phí copy trở thành O(n²), tức bình quân mỗi lần thêm là O(n) — chậm hơn hẳn. Dừng chương trình khi đầy thì không còn là mảng động nữa, đó là mảng tĩnh.',
    },
    {
      q: 'Vì sao nối chuỗi bằng += trong một vòng lặp lặp n lần lại tốn O(n²) tổng cộng?',
      options: [
        'Vì mỗi lần nối, chương trình tạo ra một chuỗi mới và copy toàn bộ nội dung cũ sang, nên chi phí lần thứ k tỉ lệ với k',
        'Vì phép += trên chuỗi luôn có chi phí O(n²) cố định mỗi lần gọi',
        'Vì chuỗi trong C++ không lưu liên tục trong bộ nhớ nên phải tìm chỗ nối mỗi lần',
      ],
      answer: 0,
      why: 'Chuỗi là mảng ký tự, nên += hoạt động giống push_back nhiều ký tự một lúc: nếu không cấp trước đủ chỗ, mỗi lần nối có thể phải cấp vùng mới và copy toàn bộ nội dung đã có. Cộng dồn 1+2+3+...+n bước copy cho ra O(n²), không phải O(n²) cố định ở từng lần — mỗi lần riêng lẻ có thể rẻ, chỉ tổng cộng mới đắt. Chuỗi trong C++ vẫn lưu liên tục trong bộ nhớ, đúng như mảng thường; vấn đề nằm ở việc cấp lại vùng nhớ, không nằm ở việc tìm chỗ nối.',
    },
    {
      q: 'Ôn lại bài trước: với n = 10⁶, một đoạn chương trình chèn vào đầu mảng n lần tốn khoảng O(n²) ≈ 10¹² phép dịch. Với mốc 10⁸ phép toán mỗi giây, chương trình này chạy khoảng bao lâu?',
      options: [
        'Cỡ hàng giờ, vì 10¹² chia cho 10⁸ ra khoảng 10⁴ giây',
        'Cỡ một giây, vì máy tính hiện đại rất nhanh',
        'Không thể ước lượng được nếu không biết cấu hình máy cụ thể',
      ],
      answer: 0,
      recall: true,
      why: 'Đây đúng là bảng mốc phản xạ ở bài Độ phức tạp thuật toán: lấy số phép toán chia cho 10⁸ để ước lượng thời gian. 10¹² chia 10⁸ bằng 10⁴ giây, tức khoảng gần ba giờ — không phải một giây, và cũng không cần biết cấu hình máy cụ thể để thấy ngay quy mô sai lệch này. Đây chính là lý do phải học danh sách liên kết ở bài kế tiếp: một cấu trúc cho phép chèn vào đầu với chi phí O(1) thay vì phải dịch cả mảng.',
    },
  ],
  practice: [
    {
      title: 'Cài Vec<T> có push_back, operator[], size, capacity, tự nhân đôi sức chứa khi đầy. Không dùng std::vector bên trong.',
      idea: 'Giữ ba thứ: một con trỏ tới vùng nhớ cấp bằng new, một biến đếm số phần tử đang có, một biến sức chứa hiện tại. push_back kiểm nếu số phần tử bằng sức chứa thì cấp vùng mới gấp đôi, copy từng phần tử sang, giải phóng vùng cũ, rồi mới ghi phần tử mới vào.',
      hint: 'Sức chứa ban đầu là 0 thì nhân đôi vẫn ra 0 — nhớ xử lý riêng trường hợp sức chứa bằng 0 bằng cách cấp 1. Nhớ giải phóng vùng cũ sau copy, không thì rò rỉ bộ nhớ mỗi lần nở.',
    },
    {
      title: 'Đo thời gian trung bình mỗi push_back khi n tăng từ 1000 lên 1000000, với hai chiến lược nở: nhân đôi sức chứa và cộng thêm 10 mỗi lần đầy. Vẽ hai đường lên cùng biểu đồ.',
      idea: 'Dùng công cụ đo bạn đã viết ở bài Độ phức tạp thuật toán. Với mỗi n, chạy n lần push_back liên tiếp, chia tổng thời gian cho n để ra thời gian bình quân một lần, rồi ghi lại theo n.',
      hint: 'Đường của bản nhân đôi phải nằm gần như ngang khi n tăng — đó là dấu hiệu O(1) khấu trừ. Nếu đường đó dốc lên, kiểm tra lại bạn có đang copy đúng số phần tử hay đang copy cả vùng sức chứa chưa dùng.',
    },
    {
      title: 'Cài Str::split tách một chuỗi theo dấu phân cách, rồi so hai cách xây kết quả: nối chuỗi bằng += trong vòng lặp so với cấp sẵn đủ chỗ một lần rồi ghi trực tiếp.',
      idea: 'split trả về một Vec<Str> các đoạn con. Cách một: mỗi đoạn con được xây bằng += từng ký tự. Cách hai: biết trước độ dài đoạn con nên gọi reserve hoặc cấp đúng sức chứa đó một lần rồi ghi thẳng vào từng ô.',
      hint: 'Với chuỗi dài và nhiều đoạn con, cách += sẽ chậm hẳn thấy rõ, đúng như phân tích O(n²) đã học. Nhớ phân biệt cắt chuỗi tạo bản sao mới với chỉ trỏ vào vùng cũ — split ở đây phải tạo bản sao vì các đoạn con sống độc lập với chuỗi gốc.',
    },
  ],
  leetcode: [
    { no: 27, name: 'Remove Element', slug: 'remove-element', level: 'Easy', note: 'Xoá phần tử tại chỗ mà không dùng thêm mảng khác. Luyện cảm giác dịch phần tử trong mảng.' },
    { no: 26, name: 'Remove Duplicates from Sorted Array', slug: 'remove-duplicates-from-sorted-array', level: 'Easy', note: 'Vẫn là dịch phần tử tại chỗ, nhưng phải nhận ra phần tử trùng trước khi dịch.' },
    { no: 88, name: 'Merge Sorted Array', slug: 'merge-sorted-array', level: 'Easy', note: 'Ghép từ cuối mảng lên để tránh ghi đè — một mẹo dùng lại được nhiều lần.' },
    { no: 283, name: 'Move Zeroes', slug: 'move-zeroes', level: 'Easy', note: 'Dịch phần tử tại chỗ theo hướng khác, không cấp mảng phụ.' },
    { no: 66, name: 'Plus One', slug: 'plus-one', level: 'Easy', note: 'Xử lý mảng như một số lớn, chú ý trường hợp phải tăng độ dài mảng.' },
    { no: 344, name: 'Reverse String', slug: 'reverse-string', level: 'Easy', note: 'Đảo chuỗi tại chỗ bằng hai chỉ số đi ngược nhau, không cấp chuỗi mới.' },
    { no: 14, name: 'Longest Common Prefix', slug: 'longest-common-prefix', level: 'Easy', note: 'So từng ký tự giữa các chuỗi, luyện thao tác đọc chuỗi như mảng ký tự.' },
    { no: 189, name: 'Rotate Array', slug: 'rotate-array', level: 'Medium', note: 'Xoay mảng tại chỗ với O(1) bộ nhớ phụ, không cấp mảng mới cho từng bước xoay.' },
    { no: 238, name: 'Product of Array Except Self', slug: 'product-of-array-except-self', level: 'Medium', note: 'Duyệt mảng hai lần theo hai hướng — bài luyện tư duy tận dụng bộ nhớ liên tục và cache tốt.' },
    { no: 54, name: 'Spiral Matrix', slug: 'spiral-matrix', level: 'Medium', note: 'Mảng hai chiều là mảng của mảng — luyện quản lý chỉ số biên cẩn thận.' },
  ],
  project: {
    title: 'Thư viện mảng động và chuỗi tự cài, phần đầu của core',
    why: 'Đây chính là hai module đầu tiên của thư viện core mà MVP Chương 1 lắp ráp, và cả sáu chương sau đều liên kết vào nó — bảng băm cần Vec để làm mảng các ngăn, cây và đồ thị cần Vec để làm mảng kề. Vì vậy phải viết thành header dùng lại được, khai báo trong .h và định nghĩa trong .cpp riêng, chứ không được nhét thẳng vào hàm main của một bài tập.',
    input: 'Một file .txt bất kỳ để thử Str::split, ví dụ một quyển sách tải từ Project Gutenberg tại https://www.gutenberg.org.',
    needs: [
      'Ba thứ ở phần Lý thuyết bài này: cách mảng động cấp phát, vì sao phải nhân đôi sức chứa, và vì sao push_back là O(1) khấu trừ.',
      'C++ con trỏ mức cơ bản: new[], delete[], và chuyện copy con trỏ khác hẳn copy nội dung.',
      'Template mức vỡ lòng: một dòng template<typename T> là đủ, chưa cần gì sâu hơn.',
      'Tách khai báo ra .h và định nghĩa ra .cpp — vì đây là thư viện dùng lại, không phải một file bài tập.',
      'Công cụ đo bạn đã viết ở bài Độ phức tạp thuật toán. Chưa làm bài đó thì làm trước, dự án này dùng lại nó ở yêu cầu cuối.',
    ],
    output: 'Một thư mục core/ có Vec.h, Str.h và một chương trình thử. Chương trình in bảng so sánh hai chiến lược nở mảng — nhân đôi và cộng thêm 10 — trên cùng một triệu lần push_back.',
    outputSample: `$ ./demo_vec
n = 1000000

chien luoc      | tong ms | ms moi push_back
nhan doi (x2)   |    8.42 |       0.0000084
cong them 10    | 2140.51 |       0.0021405

=> nhan doi nhanh hon 254 lan`,
    start: [
      'Viết Vec<int> trước, chưa dùng template. Đúng ba thứ: con trỏ mảng, size, capacity. push_back chưa cần biết nở, cứ cho capacity cố định 100 đã.',
      'Thêm phần nở: khi size chạm capacity thì cấp mảng mới gấp đôi, copy sang, xoá mảng cũ. Chạy push_back 100 lần và in capacity sau mỗi lần — nhìn nó nhảy 1, 2, 4, 8, 16.',
      'Đổi Vec<int> thành Vec<T>: thêm một dòng template<typename T>, thay int bằng T. Chỉ vậy thôi.',
      'Viết ba ca kiểm bằng assert ngay trong main. Chưa cần framework test nào cả.',
      'Viết Str trên nền Vec<char>. Làm to_lower trước vì nó dễ nhất, rồi trim, rồi split.',
      'Cuối cùng mới đo: cài thêm một bản Vec nở kiểu cộng thêm 10, rồi đo cả hai bằng công cụ ở bài trước.',
    ],
    must: [
      'Cài Vec<T> với push_back, operator[], size, capacity, tự nhân đôi sức chứa khi đầy.',
      'Cài Str trên nền Vec<char>, có split theo dấu phân cách, trim bỏ khoảng trắng hai đầu, to_lower chuyển chữ thường.',
      'Có test tự động kiểm sức chứa nhân đôi đúng lúc: capacity chỉ tăng khi size chạm capacity, và tăng đúng gấp đôi.',
      'Đo bằng công cụ đo bạn đã viết ở bài Độ phức tạp thuật toán: so thời gian bình quân mỗi push_back của chiến lược nhân đôi với chiến lược cộng thêm 10, rồi tự giải thích chênh lệch đó bằng đúng ngôn ngữ khấu trừ đã học trong bài này.',
    ],
    done: [
      {
        dat: 'Vec nở đúng cấp nhân, không phải cấp cộng.',
        kiem: 'push_back 100 lần, in capacity sau mỗi lần: dãy phải là 1, 2, 4, 8, 16, 32, 64, 128 — không có giá trị nào khác xen vào.',
      },
      {
        dat: 'Không rò rỉ bộ nhớ khi nở và khi huỷ.',
        kiem: 'valgrind ./demo_vec hoặc biên dịch với -fsanitize=address — báo 0 byte rò rỉ sau một triệu lần push_back.',
      },
      {
        dat: 'Copy một Vec ra Vec khác là copy nội dung, không phải copy con trỏ.',
        kiem: 'Tạo a, push vài phần tử, gán Vec b = a, sửa b[0], in a[0] — a[0] phải không đổi. Rồi để cả hai bị huỷ mà chương trình không sập.',
      },
      {
        dat: 'Str làm đúng ba việc trên dữ liệu thật.',
        kiem: 'Chạy split trên một dòng có nhiều khoảng trắng liền nhau, trim trên chuỗi có tab hai đầu, to_lower trên chuỗi có sẵn chữ hoa lẫn chữ thường. In kết quả và đối chiếu bằng mắt.',
      },
      {
        dat: 'Ba ca kiểm tự động đều xanh.',
        kiem: 'make test — in 3/3 ca xanh, trong đó có ca kiểm capacity chỉ tăng khi size chạm capacity.',
      },
      {
        dat: 'Đo được và nhìn thấy khác biệt giữa hai chiến lược nở.',
        kiem: 'Chạy demo_vec với n = 1000000: cột ms mỗi push_back của bản nhân đôi gần như không đổi khi n tăng, còn bản cộng thêm 10 chậm hơn ít nhất 100 lần ở n lớn nhất.',
      },
    ],
    traps: [
      'Quên giải phóng mảng cũ sau khi copy sang mảng mới, gây rò rỉ bộ nhớ mỗi lần nở.',
      'Nở theo cấp cộng (ví dụ +10 mỗi lần) khiến push_back trung bình thành O(n) thay vì O(1).',
      'operator[] không kiểm biên, đọc hoặc ghi ngoài vùng sức chứa mà không báo lỗi gì.',
      'Nối chuỗi bằng += trong vòng lặp mà không cấp trước sức chứa, biến split thành O(n²).',
      'Copy đối tượng Vec bằng cách copy con trỏ thay vì copy toàn bộ nội dung, khiến hai đối tượng cùng trỏ một vùng nhớ rồi giải phóng hai lần khi cả hai bị huỷ.',
    ],
  },
}
