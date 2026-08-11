// MVP Chương 1. Đặc tả đầy đủ: docs/superpowers/specs/2026-08-09-dac-ta-7-mvp.md
export default {
  title: 'core + bench — thư viện nền và công cụ đo hiệu năng',
  // Câu dẫn đứng ngay trước khối MVP ở cuối bài cuối chương. Nó thuộc về chương
  // chứ không thuộc bài, nên nằm ở đây — trước kia nó là một thẻ <p> viết tay
  // trong file .vue của bài cuối, tức mỗi chương lại phải nhớ tự viết một lần.
  ketChuong:
    'Chương 1 kết thúc ở đây. Bạn đã có đủ ba mảnh của thư viện nền và một công cụ đo, giờ là lúc ghép chúng thành sản phẩm chạy được đầu tiên.',
  why: 'Mọi nhóm kỹ thuật nghiêm túc đều có một bộ đo hiệu năng riêng trước khi tối ưu bất cứ thứ gì — Google Benchmark, hyperfine, perf đều làm việc này. Không có nó, mọi câu "tôi nghĩ cách này nhanh hơn" chỉ là cảm giác. Đây cũng là công cụ bạn dùng lại suốt sáu chương còn lại, nên nó phải đúng ngay từ đầu.',
  input: 'Không đọc dữ liệu ngoài. bench nhận tham số dòng lệnh: tên phép đo, dãy kích thước n, số lần lặp mỗi kích thước. Kết quả xuất ra CSV hai cột n,ms.',
  needs: [
    'Trọn Chương 1: O lớn (Big O) và mô hình chi phí, mảng động, đệ quy và hệ thức truy hồi, danh sách liên kết.',
    'Bốn dự án nhỏ của bốn bài trong chương. MVP này không viết lại từ đầu — nó lắp bốn mảnh đó thành một thư viện có Makefile.',
    'C++: template, con trỏ, new/delete, std::chrono, đọc ghi file bằng fstream.',
    'Makefile mức tối thiểu, hai đích: all và test.',
  ],
  output: 'Một thư viện core/ và một công cụ bench/ chạy được bằng một lệnh, cộng chương trình demo_growth vẽ ba đường O(n), O(n log n), O(n²) lên cùng một biểu đồ.',
  outputSample: `$ make test
7/7 ca xanh

$ ./demo_growth 1000,10000,100000,1000000

       n | O(n) ms | O(n log n) ms | O(n^2) ms
    1000 |   0.004 |         0.021 |     0.812
   10000 |   0.041 |         0.258 |    81.400
  100000 |   0.402 |         3.115 |  8140.20
 1000000 |   4.015 |        38.902 |  (bo qua)

O(n^2) tach han khoi hai duong kia tu n = 10000`,
  start: [
    'Gom bốn dự án nhỏ đã làm vào một thư mục core/. Chưa sửa gì cả, chỉ xếp file cho đúng chỗ và viết Makefile để chúng biên dịch được cùng nhau.',
    'Chạy make test với đúng những ca kiểm bạn đã viết ở bốn bài trước. Xanh hết rồi mới đi tiếp.',
    'Tách bench ra thành module riêng: bench::run trước, bench::plot sau, bench::ghi_csv cuối.',
    'Viết demo_growth với ba hàm cố ý khác bậc. Hàm O(n) là cộng tổng, O(n log n) là sort, O(n²) là hai vòng lồng nhau.',
    'Chạy demo_growth với n tăng dần cho tới khi đường O(n²) tách hẳn ra. Đó là lúc MVP này coi như xong phần chính.',
  ],
  must: [
    'core::Vec<T> — mảng động tự cài, có push_back, operator[], size, capacity, nhân đôi sức chứa khi đầy. Không dùng std::vector bên trong.',
    'core::Str — chuỗi tự cài trên nền core::Vec<char>, có split, trim, to_lower.',
    'core::List<T> — danh sách liên kết đơn, có push_front, push_back, erase_after, duyệt được bằng vòng lặp.',
    'bench::run(ten, ham, cac_n, so_lan_lap) — chạy ham(n) đúng so_lan_lap lần cho mỗi n, lấy trung vị chứ không lấy trung bình.',
    'bench::plot(ket_qua) — vẽ biểu đồ ASCII trên terminal, trục hoành là n, trục tung là thời gian.',
    'bench::doc_csv và bench::ghi_csv để lưu và so kết quả giữa các lần chạy.',
    'Chương trình mẫu demo_growth đo ba hàm cố ý có độ phức tạp khác nhau — O(n), O(n log n), O(n²) — rồi vẽ cả ba lên cùng một biểu đồ để nhìn thấy hình dạng khác nhau của chúng.',
  ],
  done: [
    {
      dat: 'Cả thư viện biên dịch và kiểm được bằng một lệnh duy nhất.',
      kiem: 'make test từ thư mục gốc — biên dịch core lẫn bench rồi in số ca xanh, tối thiểu 7/7.',
    },
    {
      dat: 'Ba module của core đều có ca kiểm riêng và đều xanh.',
      kiem: 'Trong kết quả make test có đủ ba dòng: Vec nhân đôi sức chứa đúng lúc, List xoá nút giữa không rò rỉ, Str split đúng trên chuỗi nhiều khoảng trắng liền nhau.',
    },
    {
      dat: 'bench::run trả về đúng số điểm đo và lấy trung vị, không lấy trung bình.',
      kiem: 'Gọi bench::run với 4 giá trị n và 5 lần lặp: trả về đúng 4 điểm. Truyền vào một dãy có một giá trị dị thường rất lớn, kết quả gần như không đổi.',
    },
    {
      dat: 'demo_growth cho thấy ba bậc tách nhau.',
      kiem: './demo_growth 1000,10000,100000 — tại n = 100000, thời gian O(n²) lớn hơn O(n) ít nhất 100 lần, và biểu đồ ASCII cho thấy điều đó bằng mắt.',
    },
    {
      dat: 'push_back là O(1) khấu trừ, nhìn thấy được chứ không phải tin lời sách.',
      kiem: 'Đo push_back một triệu lần: cột thời gian bình quân mỗi lần gần như nằm ngang khi n tăng. Đó chính là phân tích khấu trừ hiện thành một đường thẳng.',
    },
    {
      dat: 'Không rò rỉ bộ nhớ ở bất kỳ module nào.',
      kiem: 'Chạy toàn bộ test dưới -fsanitize=address — báo 0 byte rò rỉ.',
    },
    {
      dat: 'Kết quả lưu lại và so lại được giữa hai lần chạy.',
      kiem: 'Chạy bench hai lần, ghi ra hai file CSV, đọc lại cả hai bằng bench::doc_csv và in bảng so sánh. Số dòng và cột n phải khớp nhau.',
    },
  ],
  traps: [
    'Lấy trung bình thay vì trung vị: một lần hệ điều hành chen ngang là hỏng cả phép đo.',
    'Quên cờ -O2: trình biên dịch không tối ưu thì mọi đường cong đều méo.',
    'Trình biên dịch xoá hẳn vòng lặp đo vì kết quả không được dùng. Phải cộng dồn kết quả vào một biến volatile hoặc in ra.',
    'Đo cả thời gian cấp phát bộ nhớ ban đầu vào phép đo chính.',
    'Vec nhân sức chứa theo cấp cộng (+10) thay vì cấp nhân (×2) — khi đó push_back không còn là O(1) khấu trừ nữa, và biểu đồ sẽ cho bạn thấy điều đó.',
  ],
  uses: ['do-phuc-tap', 'mang-chuoi', 'de-quy', 'danh-sach-lien-ket'],
  reuses: [],
  stretch: [
    'Xuất kết quả ra file HTML có biểu đồ SVG.',
    'Thêm chế độ so hai lần chạy để phát hiện hồi quy hiệu năng.',
    'Đo cả bộ nhớ đỉnh, không chỉ thời gian.',
  ],
  data: {
    format: 'CSV hai cột: n là kích thước đầu vào, ms là thời gian chạy tính bằng mili giây. Đây là định dạng bench tự sinh ra, bạn không cần tải gì — nhưng hãy giữ đúng định dạng này vì sáu chương sau đều đọc lại nó.',
    sample: `n,ms
1000,0.42
2000,0.88
4000,1.79
8000,3.55
16000,7.12
32000,14.30
64000,28.71
128000,57.40
256000,114.9
512000,229.6`,
  },
}
