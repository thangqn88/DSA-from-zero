@part ly-thuyet

### Tủ đựng đồ ở bể bơi

<p class="idea-label">🧩 Ý tưởng cốt lõi</p>

Bể bơi có một nghìn ngăn tủ. Bạn đưa thẻ hội viên cho nhân viên, họ nhìn số thẻ, lấy ba chữ số cuối, và đưa bạn chìa khoá đúng ngăn đó. Lần sau bạn quay lại, họ làm đúng phép tính ấy và ra ngay ngăn cũ — không phải mở từng ngăn để tìm. Nhưng có chuyện: hai người có ba chữ số cuối giống nhau sẽ được chỉ vào cùng một ngăn. Lúc đó nhân viên phải xử lý bằng cách nào đó, ví dụ để cả hai túi chung một ngăn rồi dán nhãn.

Toàn bộ bảng băm nằm trong câu chuyện này: **một phép tính biến khoá thành số ngăn, cộng một cách xử lý khi hai khoá trùng ngăn**.

**Đây là gì?** Bảng băm là một mảng cố định các ngăn, kèm một hàm băm biến khoá bất kỳ thành chỉ số ngăn. Muốn lưu cặp khoá-giá trị thì tính chỉ số rồi đặt vào ngăn đó. Muốn tìm thì tính lại đúng chỉ số ấy và nhìn vào đúng ngăn. Nhờ vậy tra cứu không phụ thuộc vào việc bảng đang chứa mười hay mười triệu phần tử.

**Vì sao quan trọng?** Đây là cấu trúc dữ liệu bạn dùng nhiều nhất trong cả đời lập trình, thường mà không để ý. Object của JavaScript, dict của Python, `unordered_map` của C++, bảng phiên đăng nhập của máy chủ, bộ nhớ đệm của mọi API — tất cả đều là bảng băm. Nếu chỉ được giữ lại một cấu trúc dữ liệu duy nhất trong đầu, phần lớn lập trình viên sẽ chọn cái này.

### Map là hợp đồng, hash table là một cách thực hiện

Đây là ý quan trọng nhất của cả bài, và nó vượt ra ngoài phạm vi bảng băm.

Khi bạn nói "tôi cần một Map", bạn đang mô tả một **hợp đồng**: có thể đặt một giá trị theo khoá, lấy lại theo khoá, xoá theo khoá. Hợp đồng đó không nói gì về cách làm. Người ta gọi thứ này là kiểu dữ liệu trừu tượng, viết tắt tiếng Anh là ADT.

Còn khi bạn nói "tôi cần một hash table", bạn đang chỉ định **cách thực hiện** hợp đồng đó. Và có nhiều cách khác nhau cùng thực hiện được hợp đồng Map:

| Cách cài | Tra cứu | Giữ thứ tự khoá? | Khi nào chọn |
|---|---|---|---|
| Mảng cặp khoá-giá trị | O(n) | Không | Dưới vài chục phần tử, code cực đơn giản |
| Mảng đã sắp + tìm nhị phân | O(log n) | Có | Dữ liệu tĩnh, ít thêm bớt |
| Cây tìm kiếm cân bằng | O(log n) chắc chắn | Có | Cần duyệt theo thứ tự, cần truy vấn khoảng |
| **Bảng băm** | O(1) trung bình | Không | Chỉ cần tra đúng một khoá, và cần thật nhanh |

**Vì sao phải phân biệt?** Vì nó đổi cách bạn thiết kế phần mềm. Khi hàm của bạn nhận vào một Map thay vì nhận vào một hash table cụ thể, người dùng hàm đó được tự do đổi cách cài mà không phải sửa hàm của bạn. Đây đúng là nguyên tắc thiết kế API mà bạn sẽ áp dụng hằng ngày trong công việc thật, và bảng băm là chỗ dễ nhìn thấy nó nhất: cùng một hợp đồng, bốn cách làm, mỗi cách mạnh ở một chỗ.

Chú ý dòng cuối cùng của bảng: bảng băm **không** giữ thứ tự. Nếu bài toán của bạn cần "cho tôi mọi khoá trong khoảng từ a tới b" thì bảng băm hoàn toàn vô dụng, và bạn phải quay sang cây — đó chính là Chương 4.

### Hàm băm và va chạm

Hàm băm cho chuỗi thường dùng kiểu đa thức: coi mỗi ký tự là một chữ số trong hệ cơ số nào đó.

```cpp
size_t bam(const string& khoa, size_t soNgan) {
    size_t ma = 0;
    for (char c : khoa)
        ma = (ma * 31 + (unsigned char)c) % soNgan;   // lấy dư dần để khỏi tràn
    return ma;
}
```

Số 31 không thiêng liêng gì, chỉ là một số lẻ nhỏ giúp rải đều và nhân nhanh. Điều quan trọng là hàm này **rải đều**: hai khoá khác nhau dù chỉ một ký tự cũng nên rơi vào hai ngăn xa nhau.

Số khoá có thể có là vô hạn, số ngăn là hữu hạn, nên chắc chắn có lúc hai khoá rơi cùng ngăn. Đó gọi là **va chạm**, và nó là chuyện bình thường chứ không phải sự cố. Hai cách xử lý phổ biến:

| Cách | Làm gì | Ưu | Nhược |
|---|---|---|---|
| **Chuỗi móc nối** | Mỗi ngăn giữ một danh sách các cặp cùng rơi vào đó | Đơn giản, xoá dễ, chịu được hệ số tải cao | Tốn thêm bộ nhớ cho con trỏ, các nút nằm rải rác nên hay trượt cache |
| **Dò tuyến tính** | Ngăn bận thì thử ngăn kế tiếp cho tới khi gặp ngăn trống | Mọi thứ nằm liền nhau nên rất hợp cache | Xoá phức tạp, và các cụm bận dính vào nhau làm chậm dần |

### Hệ số tải, nở bảng, và vì sao O(1) là trung bình

**Hệ số tải** là số phần tử chia cho số ngăn. Bảng có 100 ngăn chứa 75 phần tử thì hệ số tải là 0,75. Khi hệ số tải càng cao, các ngăn càng đông và tra cứu càng chậm — vì sau khi nhảy tới đúng ngăn bạn vẫn phải duyệt danh sách trong ngăn đó.

Cách xử lý là **nở bảng**: khi hệ số tải vượt ngưỡng, cấp một bảng mới lớn gấp đôi và băm lại toàn bộ khoá cũ. Bắt buộc phải băm lại chứ không được sao chép nguyên vị trí, vì chỉ số ngăn phụ thuộc vào số ngăn — số ngăn đổi thì chỉ số cũng đổi.

Một lần nở tốn `O(n)`, nghe có vẻ đắt. Nhưng nó chỉ xảy ra sau mỗi lần số phần tử tăng gấp đôi, nên chia đều ra thì mỗi lần thêm vẫn chỉ tốn `O(1)`. Đây đúng là lối phân tích khấu trừ bạn đã gặp ở bài Mảng động — cùng một lập luận, áp cho một cấu trúc khác.

**Và đây là chỗ phải nói cho rõ:** `O(1)` của bảng băm là `O(1)` **trung bình**, không phải xấu nhất. Nó dựa trên giả định hàm băm rải đều. Nếu hàm băm tồi — chẳng hạn chỉ lấy độ dài chuỗi — thì mười nghìn từ sẽ dồn vào khoảng hai chục ngăn, mỗi ngăn giữ năm trăm phần tử, và tra cứu tụt xuống `O(n)`. Cây cân bằng ở Chương 4 thì khác: nó cho bạn `O(log n)` chắc chắn, không kèm điều kiện nào. Đó là lựa chọn đánh đổi thật sự giữa hai cấu trúc, không phải chuyện cái nào tốt hơn cái nào.

@part vi-sao

### Vì sao đây là cấu trúc bạn dùng nhiều nhất

**Nó có mặt trong mọi phần mềm bạn từng viết.** Mỗi lần bạn viết `obj.ten` trong JavaScript hay `d["ten"]` trong Python, bạn đang tra một bảng băm. Ngôn ngữ giấu nó đi kỹ tới mức nhiều người dùng cả sự nghiệp mà không biết bên dưới là gì — và rồi bối rối khi chương trình đột nhiên chậm vì hàm băm của khoá tự định nghĩa quá tồi.

**Nó là câu trả lời mặc định cho câu hỏi "làm sao tra nhanh".** Bảng phiên đăng nhập, bộ nhớ đệm kết quả API, chỉ mục ngược của công cụ tìm kiếm, bảng định tuyến — tất cả đều bắt đầu bằng một bảng băm rồi mới tính tiếp.

**Nó biến nhiều bài toán O(n²) thành O(n).** Bài Two Sum là ví dụ nhỏ nhất, nhưng khuôn mẫu đó lặp lại khắp nơi: thay vì so mọi cặp, hãy ghi lại những gì đã thấy vào một bảng tra, rồi với mỗi phần tử mới chỉ cần hỏi bảng một câu.

**Và nó dạy bạn một bài học về thiết kế.** Phần Map là hợp đồng còn hash table là cách cài ở trên không chỉ là chuyện thuật ngữ. Nó là cách bạn sẽ nghĩ khi thiết kế mọi module về sau: mô tả cái mình cần trước, chọn cách làm sau, và đừng để người dùng module phụ thuộc vào cách làm.

@part vi-du

@vidu vd-bb-dem-tan-suat | Đếm số lần xuất hiện của từng từ trong một đoạn văn

@slot de-bai

Cho đoạn văn `"mua ha mua thu mua dong mua"`. Hãy đếm mỗi từ xuất hiện bao nhiêu lần và in ra kết quả.

Bài này nhỏ tới mức làm tay cũng xong, nhưng hãy trả lời thêm một câu: nếu đầu vào không phải 7 từ mà là một quyển sách nửa triệu từ, cách làm của bạn còn chạy nổi không?

@slot y-tuong

**Cách không dùng bảng băm:** giữ một danh sách các từ đã gặp cùng số đếm. Với mỗi từ mới đọc được, duyệt lại toàn bộ danh sách đó xem đã có chưa. Với `n` từ thì đây là `O(n²)`. Một quyển sách có nửa triệu từ sẽ cần khoảng `2,5×10¹¹` phép so sánh — vài tiếng đồng hồ.

Chỗ lãng phí nằm ở chữ "duyệt lại toàn bộ". Ta biết chính xác mình đang tìm từ nào, vậy tại sao phải xem qua cả những từ chẳng liên quan gì?

**Cách dùng bảng băm:** để chính nội dung của từ quyết định chỗ cất nó. Hàm băm biến chuỗi `"mua"` thành một con số, con số đó chỉ thẳng tới một ngăn cụ thể, và ta đi thẳng tới ngăn ấy mà không ngó qua ngăn nào khác. Mỗi từ tốn `O(1)` trung bình, tổng cộng `O(n)`. Nửa triệu từ xong trong chớp mắt.

@slot thuat-toan

Với mỗi từ trong đoạn văn, làm đúng ba việc:

1. **Băm từ đó ra số ngăn.** Ở ví dụ này dùng hàm băm đơn giản nhất có thể: lấy tổng mã ký tự rồi chia dư cho số ngăn.
2. **Đi tới ngăn đó và tìm khoá thật trong đó.** Đây là bước người mới hay bỏ sót — tìm đúng ngăn **chưa** có nghĩa là tìm đúng khoá, vì nhiều từ khác nhau có thể rơi vào cùng một ngăn.
3. Thấy khoá thì tăng số đếm lên 1; không thấy thì thêm cặp mới với số đếm bằng 1 vào ngăn đó.

Khi hai khoá khác nhau rơi vào cùng một ngăn, ta gọi đó là **va chạm**. Cách xử lý dùng ở đây là **nối chuỗi**: mỗi ngăn giữ một danh sách các cặp, va chạm thì nối thêm vào danh sách chứ không ghi đè và cũng không đi tìm ngăn khác.

@slot chay-tay

Chạy tay với bảng 8 ngăn, hàm băm lấy tổng mã ký tự chia dư 8:

| Bước | Từ | Ngăn | Hành động | Trạng thái ngăn |
|---|---|---|---|---|
| 1 | mua | 2 | Chưa có, thêm mới | ngăn 2: [mua=1] |
| 2 | ha | 5 | Chưa có, thêm mới | ngăn 5: [ha=1] |
| 3 | mua | 2 | Đã có, tăng lên 2 | ngăn 2: [mua=2] |
| 4 | thu | 5 | **Va chạm với ha**, nối vào danh sách ngăn 5 | ngăn 5: [ha=1, thu=1] |
| 5 | mua | 2 | Đã có, tăng lên 3 | ngăn 2: [mua=3] |
| 6 | dong | 7 | Chưa có, thêm mới | ngăn 7: [dong=1] |
| 7 | mua | 2 | Đã có, tăng lên 4 | ngăn 2: [mua=4] |

**Kết quả:** mua=4, ha=1, thu=1, dong=1.

**Chú ý bước 4.** Từ `thu` rơi vào ngăn 5 đang có `ha`. Bảng băm không hoảng loạn và cũng không ghi đè: nó nối `thu` vào danh sách của ngăn đó. Khi tra `ha` sau này, ta nhảy tới ngăn 5 rồi **vẫn phải so khoá thật** để phân biệt `ha` với `thu`. Đây là chi tiết người mới hay quên: tìm đúng ngăn chưa có nghĩa là tìm đúng khoá.

Trạng thái cuối cùng của cả bảng, để bạn thấy dữ liệu nằm rải ra sao:

| Ngăn | Nội dung |
|---|---|
| 0, 1, 3, 4, 6 | trống |
| 2 | [mua=4] |
| 5 | [ha=1, thu=1] |
| 7 | [dong=1] |

Bốn khoá nằm trong 8 ngăn, và đã có một va chạm. Chuyện đó bình thường hơn bạn tưởng — phần cuối sẽ nói vì sao.

@slot code

```cpp
// Giả sử BangBam là bảng băm chuỗi -> int mà bạn tự cài
BangBam dem;
for (const string& tu : cacTu) {
    dem.dat(tu, dem.lay(tu, 0) + 1);   // lay(tu, 0): chưa có thì trả về 0
}
```

Bản dùng thư viện chuẩn C++, ngắn tới mức gần như không còn gì để sai:

```cpp
#include <iostream>
#include <sstream>
#include <string>
#include <unordered_map>
using namespace std;

int main() {
    string vanBan = "mua ha mua thu mua dong mua";
    unordered_map<string, int> dem;

    istringstream luong(vanBan);
    string tu;
    while (luong >> tu) dem[tu]++;      // chưa có khoá thì tự tạo với giá trị 0

    for (const auto& [k, v] : dem)
        cout << k << " = " << v << "\n";
}
```

Hai chi tiết đáng nhớ về dòng `dem[tu]++`. Thứ nhất, toán tử `[]` của `unordered_map` **tự tạo** phần tử với giá trị 0 nếu khoá chưa có, nên không cần `if` kiểm tra. Thứ hai, cũng vì thế, chỉ **đọc** `dem["abc"]` thôi cũng đã lặng lẽ thêm một khoá mới vào bảng — muốn kiểm tra sự tồn tại mà không làm bảng phình ra thì dùng `dem.count(tu)` hoặc `dem.find(tu)`.

Và đừng bất ngờ khi thứ tự in ra không giống thứ tự xuất hiện trong văn bản: chữ `unordered` trong tên nghĩa là bảng băm không hứa hẹn thứ tự nào cả. Cần thứ tự thì dùng `map`, đổi lấy `O(log n)` mỗi thao tác thay vì `O(1)`.

@slot toi-uu

**Đã tối ưu về bậc rồi.** Đếm tần suất bắt buộc phải đọc qua mỗi từ ít nhất một lần, nên `O(n)` là sàn và bảng băm đã chạm sàn. Từ đây trở đi chỉ còn chuyện hằng số — nhưng hằng số ở đây có thể chênh nhau vài lần, nên vẫn đáng bàn.

**Hàm băm trong ví dụ này rất tệ.** Lấy tổng mã ký tự khiến mọi hoán vị của cùng bộ chữ cái băm ra cùng một số: `"mua"`, `"amu"`, `"uam"` đều rơi vào một ngăn. Với dữ liệu thật, cách đó dồn cục nặng và biến các thao tác `O(1)` thành `O(k)` với `k` là độ dài chuỗi va chạm. Hàm băm dùng được cần trộn theo vị trí ký tự, chẳng hạn `h = h * 31 + c` — thêm một phép nhân, đổi lại phân bố đều hẳn.

**Đặt trước số ngăn nếu biết trước lượng dữ liệu.** Gọi `dem.reserve(n)` trước vòng lặp để bảng không phải nở và băm lại nhiều lần giữa chừng. Đây đúng là mẹo `reserve` đã gặp ở bài Mảng động, áp dụng cho một cấu trúc khác.

**Nếu khoá là số nguyên nhỏ và liên tục,** ví dụ đếm tần suất 26 chữ cái, thì đừng dùng bảng băm chút nào — một mảng `int dem[26]` là đủ. Nó cho `O(1)` thật sự chứ không phải `O(1)` trung bình, không tốn chi phí băm, và trúng cache gần như tuyệt đối. Bảng băm sinh ra để xử lý những khoá không đánh chỉ số thẳng được; khi khoá đã tự đánh chỉ số được rồi thì mảng luôn thắng.

Ví dụ tiếp theo mổ xẻ đúng cái phần mà ví dụ này còn cho qua: va chạm và chuyện bảng tự nở ra.

@vidu vd-bb-va-cham-va-resize | Xem bảng băm va chạm và tự nở ra như thế nào

@slot de-bai

Bắt đầu với một bảng băm 4 ngăn, ngưỡng hệ số tải 0,75 — nghĩa là chạm 3 phần tử thì phải nở. Hàm băm giả định: `bam(k) = k % soNgan`, khoá là số nguyên.

Thêm lần lượt ba khoá `5`, `9`, `2`. Hãy theo dõi **từng khoá nằm ở ngăn nào** sau mỗi bước, và cho biết chuyện gì xảy ra ở đúng thời điểm bảng nở ra.

@slot y-tuong

**Hệ số tải** là số phần tử chia cho số ngăn. Nó trả lời câu hỏi "trung bình mỗi ngăn đang gánh bao nhiêu khoá". Hệ số tải càng cao thì chuỗi va chạm trong mỗi ngăn càng dài, và thao tác tra cứu càng trượt xa khỏi `O(1)` lý tưởng về phía `O(n)`.

Vậy nên bảng băm tự theo dõi con số đó, và khi nó vượt ngưỡng thì bảng **nở ra**: cấp một mảng ngăn lớn gấp đôi rồi chuyển toàn bộ khoá sang.

Đây là chỗ then chốt và cũng là chỗ dễ hiểu sai nhất: chuyển sang bảng mới **không phải** là copy khoá về đúng ngăn cũ. Số ngăn đã đổi, mà số ngăn là một phần của phép tính băm, nên mọi khoá phải được **băm lại từ đầu** theo số ngăn mới. Việc băm lại này chính là thứ đắt đỏ, và cũng chính là thứ có ích.

@slot thuat-toan

Thao tác thêm một khoá gồm hai phần:

1. **Đặt khoá vào ngăn `bam(k) % soNgan`**, nối vào chuỗi của ngăn đó nếu đã có khoá khác nằm sẵn.
2. **Kiểm tra hệ số tải.** Nếu `soPhanTu / soNgan ≥ 0,75` thì nở: cấp mảng ngăn mới gấp đôi, duyệt lại toàn bộ khoá cũ, tính lại `k % soNganMoi` cho từng khoá và đặt vào bảng mới, rồi bỏ bảng cũ.

Vì sao ngưỡng lại là 0,75 chứ không phải 1,0 hay 0,5? Đây là một điểm cân bằng đã được đo đạc nhiều: để bảng đầy tới 1,0 thì chuỗi va chạm dài ra rõ rệt và tra cứu chậm đi; nở sớm ở 0,5 thì tốn gấp đôi bộ nhớ mà tốc độ cải thiện không tương xứng. Con số 0,75 là mặc định của cả Java lẫn nhiều thư viện khác, không phải ngẫu nhiên.

@slot chay-tay

| Thêm khoá | Số ngăn | Ngăn | Số phần tử | Hệ số tải | Kết quả |
|---|---|---|---|---|---|
| 5 | 4 | 5 % 4 = 1 | 1 | 0,25 | Đặt vào ngăn 1 |
| 9 | 4 | 9 % 4 = 1 | 2 | 0,50 | **Va chạm**, nối vào ngăn 1 |
| 2 | 4 | 2 % 4 = 2 | 3 | 0,75 | Đặt vào ngăn 2, chạm ngưỡng → **nở bảng** |

Nở lên 8 ngăn và băm lại cả ba khoá bằng số ngăn mới:

| Khoá | Ngăn cũ (4 ngăn) | Ngăn mới (8 ngăn) |
|---|---|---|
| 5 | 1 | 5 % 8 = 5 |
| 9 | 1 | 9 % 8 = 1 |
| 2 | 2 | 2 % 8 = 2 |

Trước và sau, nhìn theo ngăn:

| Ngăn | Bảng cũ, 4 ngăn | Bảng mới, 8 ngăn |
|---|---|---|
| 0 | trống | trống |
| 1 | **[5, 9]** — chuỗi dài 2 | [9] |
| 2 | [2] | [2] |
| 3 | trống | trống |
| 4–7 | không tồn tại | ngăn 5 giữ [5], còn lại trống |

Hệ số tải rơi từ 0,75 xuống 3/8 = 0,375, và chuỗi dài nhất rút từ 2 xuống 1. Mọi thao tác tra cứu từ đây trở đi lại nhanh như lúc bảng còn rỗng.

@slot code

```cpp
// Phần cốt lõi của thao tác nở bảng, dạng nối chuỗi
void noBang() {
    vector<list<pair<int, int>>> cu = move(ngan);   // giữ tạm bảng cũ
    ngan.assign(cu.size() * 2, {});                 // bảng mới, gấp đôi số ngăn

    for (auto& chuoi : cu)
        for (auto& [k, v] : chuoi)
            ngan[k % ngan.size()].push_back({k, v});   // BĂM LẠI, không copy vị trí cũ
}

void dat(int k, int v) {
    ngan[k % ngan.size()].push_back({k, v});
    soPhanTu++;
    if ((double)soPhanTu / ngan.size() >= 0.75) noBang();
}
```

Dòng đáng để tâm nhất là `ngan[k % ngan.size()]` bên trong `noBang`. Lúc đó `ngan.size()` đã là số ngăn **mới**, nên phép chia dư cho ra vị trí mới. Viết nhầm thành số ngăn cũ ở đây là sinh ra đúng con bọ được mô tả ở phần dưới.

@slot toi-uu

**Đây là chỗ then chốt của cả ví dụ:** khoá 5 và khoá 9 vốn va chạm nhau ở bảng cũ, giờ tách ra hai ngăn khác nhau. Đó chính là tác dụng của việc nở bảng — không chỉ có thêm chỗ, mà còn gỡ bớt va chạm.

**Và đây là cái bẫy:** nếu bạn sao chép nguyên vị trí cũ sang bảng mới thay vì băm lại, khoá 5 sẽ nằm ở ngăn 1 của bảng 8 ngăn. Lần sau tra khoá 5, chương trình tính `5 % 8 = 5` rồi nhìn vào ngăn 5, thấy trống, và kết luận là không có khoá đó. Lỗi này đặc biệt khó chịu vì chương trình không hề báo lỗi — nó chỉ lặng lẽ trả về sai.

**Chi phí:** lần thêm khoá số 3 tốn `O(n)` vì phải băm lại tất cả. Nhưng lần nở tiếp theo phải đợi tới khi có 6 phần tử, lần sau nữa là 12, rồi 24. Số lần nở giảm theo cấp số nhân trong khi số phần tử tăng, nên bình quân mỗi lần thêm vẫn là `O(1)`. Đây đúng là lập luận khấu trừ đã dùng cho mảng động ở Chương 1, chỉ đổi cấu trúc.

**Tối ưu rẻ nhất, vẫn là câu chuyện cũ:** gọi `reserve` với số phần tử ước tính trước khi nạp dữ liệu. Bảng được cấp đủ ngăn ngay từ đầu nên không lần băm lại nào xảy ra.

**Số ngăn nên là số nguyên tố hay luỹ thừa của 2?** Luỹ thừa của 2 cho phép thay phép chia dư bằng phép and bit — nhanh hơn đáng kể — nhưng đổi lại nó chỉ giữ đúng vài bit thấp của mã băm, nên một hàm băm kém sẽ dồn cục thảm hại. Số nguyên tố trộn đều hơn nhưng phép chia dư đắt hơn. Thư viện thật chọn cả hai đường: nhiều thư viện C++ dùng số nguyên tố, còn Java dùng luỹ thừa của 2 kèm một bước trộn lại mã băm để bù.

**Còn khi bảng nở ra thì có gì phải trả giá?** Với ứng dụng thường thì không, vì `O(1)` khấu trừ là đủ tốt. Nhưng với hệ thống thời gian thực — chơi game, giao dịch tài chính — một lần nở bảng đúng lúc cao điểm là một khựng lại thấy được. Ở những chỗ đó người ta dùng bảng nở dần, chuyển từng phần khoá qua bảng mới sau mỗi thao tác thay vì chuyển hết một lần. Bậc khấu trừ không đổi, nhưng trường hợp tệ nhất của **một** thao tác rơi từ `O(n)` xuống `O(1)`.
