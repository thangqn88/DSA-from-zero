// Dự án thực hành Chương 1. Đặc tả đầy đủ, là nguồn để chép chứ không sáng tác
// thêm: docs/superpowers/specs/2026-08-09-dac-ta-7-mvp.md, mục "Dự án Chương 1".
export default {
  title: 'Sổ chi tiêu cá nhân — đọc file sao kê ngân hàng rồi nói cho bạn biết tiền đi đâu',
  // Câu dẫn đứng ngay đầu trang dự án của chương. Nó thuộc về chương chứ không
  // thuộc bài nào, nên nằm ở đây.
  ketChuong:
    'Chương 1 kết thúc ở đây. Bốn thứ vừa học — mảng động, chuỗi, đệ quy, danh sách liên kết — không phải bốn bài tập rời nhau: ghép lại chúng vừa đủ để dựng một công cụ bạn dùng thật, trên chính tiền của mình.',
  why: 'Cuối tháng nhìn số dư mà không hiểu tiền đi đâu là chuyện của gần như tất cả mọi người. Money Lover, Sổ Thu Chi Misa và mục "phân tích chi tiêu" trong app ngân hàng đều sinh ra để trả lời đúng câu hỏi đó. Bạn sắp viết một phiên bản dòng lệnh của chúng: đọc file CSV sao kê, tự phân loại từng giao dịch, rồi in báo cáo tháng có so sánh với tháng trước. Điểm mạnh của dự án này là bạn chạy nó trên chính tiền của mình — không có bài tập nào cho cảm giác "cái này dùng được thật" nhanh bằng.',
  needs: [
    'Trọn Chương 1: mảng động, chuỗi, đệ quy và hệ thức truy hồi, danh sách liên kết, cộng cách đọc O lớn (Big O).',
    'C++ mức cơ bản: template, con trỏ, new/delete, đọc ghi file bằng fstream, std::chrono để đo thời gian.',
    'Makefile mức tối thiểu, đúng hai đích: all và test.',
    'CHƯA cần biết: bảng băm, cây, đồ thị, sắp xếp nâng cao, hay bất cứ thứ gì của sáu chương sau. Danh mục ở đây là cây nhưng bạn chỉ cần đệ quy để cộng tổng, không cần lý thuyết cây.',
    'CHƯA cần biết std::regex — bài này cấm dùng nó, mọi thao tác chuỗi đều tự cắt tự so.',
  ],
  input:
    'Một file CSV sao kê bốn cột ngay,mo_ta,so_tien,loai. so_tien là số nguyên đơn vị đồng, loai là "no" (tiền ra) hoặc "co" (tiền vào). Đây là định dạng chung nhất mà các ngân hàng xuất ra — cột thừa thì bỏ qua, thiếu cột nào thì báo lỗi kèm số dòng. Bạn tải sao kê thật của mình, hoặc dùng file mẫu bên dưới.',
  output:
    'Một bảng báo cáo tháng in thẳng ra terminal: tổng chi và tổng thu, từng danh mục kèm cột phần trăm thay đổi so với tháng trước, năm khoản chi lớn nhất, và dòng cảnh báo cho danh mục tăng vượt ngưỡng. Kèm hai lệnh sửa và hoàn tác phân loại.',
  outputSample: `$ ./sochitieu saoke-thang-6.csv --so-voi saoke-thang-5.csv

BAO CAO THANG 06/2026          20 giao dich, 18 khoan chi

Danh muc                Thang 6      Thang 5    Thay doi
------------------------------------------------------------
An uong                  681.000      512.000      +33.0%
  - Ca phe               220.000      165.000      +33.3%
  - Di cho               305.000      241.000      +26.6%
  - Do an giao           156.000      106.000      +47.2%
Di lai                   178.000      203.000      -12.3%
Hoa don                  955.000      938.000       +1.8%
Mua sam                  830.000    1.204.000      -31.1%
Giai tri                 180.000            0         moi
Chua phan loai                 0            0           -
------------------------------------------------------------
TONG CHI               2.824.000    2.857.000       -1.2%
TONG THU              18.512.400   18.500.000       +0.1%

5 KHOAN LON NHAT
  1  2026-06-03   612.000  EVN HCMC TIEN DIEN T5          Hoa don
  2  2026-06-05   389.000  SHOPEE DON HANG 2206051        Mua sam
  3  2026-06-15   314.000  VINMART+ Q1 HD 224890          An uong / Di cho
  4  2026-06-20   220.000  CHO BEN THANH THIT CA          An uong / Di cho
  5  2026-06-14   180.000  CGV CINEMAS VINCOM             Giai tri

Canh bao: An uong tang 33% so voi thang truoc.`,
  start: [
    'Đọc file CSV rồi in ra đúng hai con số: số dòng đọc được và tổng số tiền cột so_tien. Chưa phân loại, chưa báo cáo, chưa cây danh mục gì cả — chỉ cần chương trình chạy được và con số khớp với file.',
    'Thay chỗ chứa các dòng bằng Vec<T> tự cài của bạn, có push_back và nhân đôi sức chứa khi đầy. Chạy lại bước 1, hai con số phải y hệt.',
    'Viết hàm tách một dòng CSV thành bốn trường và hàm chuẩn hoá mô tả (cắt khoảng trắng, hạ chữ thường, bỏ mã hoá đơn ở cuối). Kiểm bằng hai dòng Grab khác mã: sau chuẩn hoá chúng phải giống nhau.',
    'Đọc file danhmuc.txt thành cây danh mục, đọc file luật phân loại, rồi gán mỗi giao dịch vào một danh mục. Chưa khớp luật nào thì để "Chưa phân loại", không đoán bừa. In ra tổng theo từng danh mục lá.',
    'Cộng tổng lên danh mục cha bằng đệ quy, rồi in bảng báo cáo đầy đủ có cột so với tháng trước và năm khoản lớn nhất.',
    'Thêm lệnh --sua và --hoan-tac dựa trên danh sách liên kết, ghi lịch sử xuống file để lần chạy sau vẫn hoàn tác được.',
    'Cuối cùng mới đo: nhân bản file sao kê lên 1 nghìn, 10 nghìn, 100 nghìn và 1 triệu dòng, đo thời gian từng mức, ghi bảng vào README.',
  ],
  must: [
    'Mảng động tự cài Vec<T> — số dòng sao kê không biết trước. Có push_back, operator[], size, capacity, nhân đôi sức chứa khi đầy. Không dùng std::vector bên trong.',
    'Xử lý chuỗi tự cài: tách một dòng CSV thành các trường, cắt khoảng trắng thừa, hạ chữ thường, và chuẩn hoá mô tả giao dịch — bỏ mã hoá đơn và dãy số ngẫu nhiên ở cuối để GRABBIKE CHUYEN DI 8f2a1 và GRABBIKE CHUYEN DI 4d0e9 gom về cùng một nơi bán. Không dùng std::regex.',
    'Cây danh mục nhiều cấp khai báo trong file danhmuc.txt (Ăn uống → Cà phê / Đi chợ / Đồ ăn giao). Tổng của một danh mục cha là tổng của chính nó cộng tổng mọi danh mục con, cài bằng đệ quy, và viết được hệ thức truy hồi cho chi phí duyệt cây vào README.',
    'Luật phân loại khớp theo từ khoá trong mô tả đã chuẩn hoá, đọc từ file, sửa được mà không phải biên dịch lại. Giao dịch không khớp luật nào rơi vào "Chưa phân loại" — không được đoán bừa.',
    'Danh sách liên kết làm lịch sử hoàn tác: mỗi lần --sua <dong> <danh-muc> thì đẩy thao tác vào đầu danh sách, --hoan-tac lùi một bước và gọi nhiều lần lùi nhiều bước, lịch sử ghi xuống file để lần chạy sau vẫn hoàn tác được. Đây là chỗ danh sách liên kết thắng mảng thật sự: luôn thêm và bỏ ở đầu.',
    'Báo cáo so hai tháng với cột phần trăm thay đổi, năm khoản chi lớn nhất, và cảnh báo cho danh mục tăng quá ngưỡng đặt trong file cấu hình.',
    'Đo và giải thích chi phí: nhân bản file sao kê lên 1 nghìn, 10 nghìn, 100 nghìn và 1 triệu dòng, đo thời gian mỗi mức, ghi bảng vào README. Trả lời hai câu: thời gian tăng theo bậc nào của số dòng, và vì sao push_back một triệu lần lại có thời gian bình quân gần như không đổi.',
  ],
  done: [
    {
      dat: 'Bốn ca kiểm cốt lõi đều xanh bằng một lệnh duy nhất.',
      kiem: 'make test từ thư mục gốc, đủ bốn dòng xanh: Vec nhân đôi sức chứa đúng lúc; chuẩn hoá mô tả gom đúng hai dòng Grab khác mã về một nơi bán; cộng tổng đệ quy trên cây danh mục ba cấp khớp số tính tay; hoàn tác hai bước trả đúng trạng thái trước đó.',
    },
    {
      dat: 'Chạy trên sao kê thật một tháng và không sót giao dịch nào.',
      kiem: './sochitieu saoke.csv rồi cộng tay: tổng chi cộng tổng thu phải khớp đúng tổng cột so_tien trong file, và số giao dịch in ở dòng đầu phải bằng số dòng dữ liệu của file trừ dòng tiêu đề.',
    },
    {
      dat: 'Báo cáo so được hai tháng và cảnh báo đúng ngưỡng.',
      kiem: './sochitieu thang6.csv --so-voi thang5.csv in đủ cột "Thay doi", danh mục chỉ có ở tháng này hiện chữ "moi" chứ không hiện +inf%, và danh mục vượt ngưỡng trong file cấu hình sinh đúng một dòng "Canh bao".',
    },
    {
      dat: 'Sửa phân loại rồi hoàn tác được nhiều bước, kể cả sau khi tắt chương trình.',
      kiem: 'Chạy --sua hai lần, thoát, chạy lại --hoan-tac hai lần, rồi in báo cáo: số liệu phải trùng khít báo cáo trước khi sửa.',
    },
    {
      dat: 'Bảng đo có đủ bốn mức và README giải thích được đường cong bằng ngôn ngữ độ phức tạp.',
      kiem: 'Bảng trong README có đủ bốn dòng 1 nghìn, 10 nghìn, 100 nghìn, 1 triệu; thời gian tăng xấp xỉ tuyến tính theo số dòng, và cột thời gian bình quân mỗi push_back gần như nằm ngang khi n tăng.',
    },
    {
      dat: 'Không rò rỉ bộ nhớ.',
      kiem: 'Chạy toàn bộ test dưới -fsanitize=address — báo 0 byte rò rỉ.',
    },
  ],
  traps: [
    'Lưu tiền bằng double. Cộng vài nghìn giao dịch là lệch vài đồng, và báo cáo tiền bạc lệch một đồng là mất niềm tin. Dùng số nguyên đơn vị đồng.',
    'Tổng tiền tràn int khi cộng cả năm; phải dùng long long.',
    'Vec nở theo cấp cộng (+10) thay vì cấp nhân (×2) — push_back hết là O(1) khấu trừ, và bảng đo ở yêu cầu cuối sẽ cho bạn thấy điều đó.',
    'Copy Vec bằng cách copy con trỏ, thành hai đối tượng cùng trỏ một vùng nhớ rồi giải phóng hai lần khi cả hai bị huỷ.',
    'Cộng tổng cây danh mục đếm hai lần: cộng tổng của nút cha rồi lại cộng tiếp tổng các nút con vốn đã nằm trong đó.',
    'Hoàn tác chỉ lùi trong bộ nhớ mà quên ghi lại xuống file, nên lần chạy sau lịch sử biến mất.',
    'Chuẩn hoá mô tả tay quá mạnh, gom nhầm VINMART+ Q1 với VINMART+ Q7 khi bạn thật sự muốn tách hai cửa hàng.',
  ],
  uses: ['do-phuc-tap', 'mang-chuoi', 'de-quy', 'danh-sach-lien-ket'],
  // Chương đầu, không có gì để dùng lại. Bảy dự án độc lập với nhau nên trường
  // này chỉ là gợi ý cho người học tuần tự, không phải điều kiện.
  reuses: [],
  stretch: [
    'Đoán danh mục cho giao dịch chưa phân loại dựa trên các giao dịch đã phân loại có mô tả gần giống.',
    'Dự báo chi tiêu cuối tháng từ số liệu nửa tháng đầu.',
    'Xuất báo cáo ra HTML có biểu đồ, hoặc ra file để mở bằng bảng tính.',
  ],
  data: {
    format:
      'CSV bốn cột ngay,mo_ta,so_tien,loai. Dòng đầu là dòng tiêu đề. so_tien là số nguyên đơn vị đồng, không dấu chấm phân cách; loai là "no" cho tiền ra và "co" cho tiền vào. Không có link tải: bạn xuất sao kê từ app ngân hàng hoặc ví điện tử của chính mình, đó mới là điểm mạnh của dự án này. Đoạn dưới là file mẫu để chạy thử ngay.',
    sample: `ngay,mo_ta,so_tien,loai
2026-06-01,HIGHLANDS COFFEE NGUYEN HUE,55000,no
2026-06-01,GRABBIKE CHUYEN DI 8f2a1,32000,no
2026-06-02,CHUYEN KHOAN LUONG THANG 5,18500000,co
2026-06-02,VINMART+ Q1 HD 220145,247000,no
2026-06-03,EVN HCMC TIEN DIEN T5,612000,no
2026-06-03,HIGHLANDS COFFEE LE LOI,62000,no
2026-06-04,GRABCAR CHUYEN DI 91bc4,118000,no
2026-06-05,SHOPEE DON HANG 2206051,389000,no
2026-06-06,CHO BEN THANH RAU CU,85000,no
2026-06-07,THE COFFEE HOUSE CMT8,48000,no
2026-06-08,SAWACO TIEN NUOC T5,143000,no
2026-06-09,GRABFOOD DON 77c31,156000,no
2026-06-11,VIETTEL NAP THE 10 SO,200000,no
2026-06-14,CGV CINEMAS VINCOM,180000,no
2026-06-15,VINMART+ Q1 HD 224890,314000,no
2026-06-18,HIGHLANDS COFFEE NGUYEN HUE,55000,no
2026-06-20,CHO BEN THANH THIT CA,220000,no
2026-06-23,SHOPEE DON HANG 2206233,127000,no
2026-06-27,GRABBIKE CHUYEN DI 4d0e9,28000,no
2026-06-30,LAI TIEN GUI KHONG KY HAN,12400,co`,
  },
}
