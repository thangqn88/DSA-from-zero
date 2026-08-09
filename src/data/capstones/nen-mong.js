// MVP Chương 1. Đặc tả đầy đủ: docs/superpowers/specs/2026-08-09-dac-ta-7-mvp.md
export default {
  title: 'core + bench — thư viện nền và công cụ đo hiệu năng',
  why: 'Mọi nhóm kỹ thuật nghiêm túc đều có một bộ đo hiệu năng riêng trước khi tối ưu bất cứ thứ gì — Google Benchmark, hyperfine, perf đều làm việc này. Không có nó, mọi câu "tôi nghĩ cách này nhanh hơn" chỉ là cảm giác. Đây cũng là công cụ bạn dùng lại suốt sáu chương còn lại, nên nó phải đúng ngay từ đầu.',
  input: 'Không đọc dữ liệu ngoài. bench nhận tham số dòng lệnh: tên phép đo, dãy kích thước n, số lần lặp mỗi kích thước. Kết quả xuất ra CSV hai cột n,ms.',
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
    'make test xanh, tối thiểu ba ca: Vec nhân đôi sức chứa đúng lúc; List xoá phần tử giữa không rò rỉ; bench::run trả đúng số điểm đo.',
    'Chạy demo_growth và nhìn thấy đường O(n²) tách hẳn khỏi hai đường kia từ n khoảng vài chục nghìn.',
    'Đo core::Vec::push_back một triệu lần, thời gian trung bình mỗi lần gần như không đổi khi n tăng — chính là phân tích khấu trừ nhìn bằng mắt.',
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
