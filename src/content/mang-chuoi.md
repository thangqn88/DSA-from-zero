@part ly-thuyet

### Dãy ghế đánh số trong rạp chiếu phim

<p class="idea-label">🧩 Ý tưởng cốt lõi</p>

Rạp chiếu phim có một hàng ghế đánh số liền nhau từ 1 tới 100. Biết số ghế của mình, bạn đi thẳng tới đó, không cần đếm từ ghế số 1. Nhưng nếu người soát vé muốn chèn thêm một ghế phụ vào giữa hàng, mọi người từ chỗ đó về sau phải dịch sang một chỗ để nhường lối. Và nếu hàng đã đầy mà rạp bán thêm vé, không thể "nới hàng ra" tại chỗ — phải chuyển cả rạp sang phòng lớn hơn rồi xếp lại từng ghế.

Toàn bộ mảng nằm trong câu chuyện đó: **biết vị trí là tới thẳng được, nhưng chèn giữa hàng hoặc hết chỗ đều phải trả giá**.

**Đây là gì?** Mảng là một vùng nhớ liên tục, các phần tử nằm sát nhau theo đúng thứ tự chỉ số. Vì các phần tử liên tục, địa chỉ của phần tử thứ i tính được ngay bằng một công thức: địa chỉ đầu cộng i nhân kích thước một phần tử. Đây chỉ là một phép nhân và một phép cộng, không phụ thuộc mảng có 10 hay 10 triệu phần tử, nên truy cập theo chỉ số là `O(1)`.

**Vì sao quan trọng?** Mảng là cấu trúc dữ liệu nền tảng nhất — mọi cấu trúc phức tạp hơn trong các bài sau, từ ngăn xếp, hàng đợi, bảng băm, tới mảng kề của đồ thị, đều dựng trên một mảng bên dưới. Hiểu đúng cái giá của từng thao tác trên mảng là hiểu trước một nửa cái giá của mọi cấu trúc dùng nó.

### Bảng chi phí các thao tác trên mảng

Bốn thao tác thường gặp có bốn cái giá rất khác nhau, và nhầm lẫn giữa chúng là lỗi phổ biến nhất khi mới học:

| Thao tác | Chi phí | Vì sao |
|---|---|---|
| Đọc theo chỉ số | O(1) | Tính địa chỉ trực tiếp bằng công thức, không cần dò |
| Thêm vào cuối, còn chỗ | O(1) | Ghi vào đúng ô trống kế tiếp, không dịch gì cả |
| Chèn hoặc xoá ở giữa | O(n) | Phải dịch mọi phần tử phía sau sang một chỗ để giữ mảng liên tục |
| Tìm một giá trị trong mảng chưa sắp | O(n) | Không biết giá trị nằm ở đâu nên phải duyệt qua từng phần tử |

**Đây là gì?** Bảng này là mốc tham chiếu cho mọi phân tích độ phức tạp có liên quan đến mảng trong suốt phần còn lại của chương trình học. **Vì sao quan trọng?** Vì "mảng" không có một cái giá chung — cái giá phụ thuộc vào chỗ bạn thao tác. Nhầm chèn giữa với thêm cuối là nhầm O(n) với O(1), và với n lớn, khoảng cách đó là khoảng cách giữa chạy tức thì và treo máy.

### Mảng động và phân tích khấu trừ

Mảng thường trong C++ có kích thước cố định ngay khi khai báo. Mảng động — như `std::vector`, hay `Vec<T>` bạn sẽ tự cài trong bài này — cho phép thêm phần tử mà không cần biết trước tổng số sẽ là bao nhiêu. Bí quyết là phân biệt hai con số: **sức chứa** (số ô đã cấp phát) và **số phần tử** (số ô đang dùng). Khi số phần tử chạm sức chứa, mảng động cấp một vùng nhớ mới **gấp đôi** sức chứa cũ, copy toàn bộ phần tử cũ sang, rồi giải phóng vùng cũ.

**Đây là gì?** Câu hỏi tự nhiên là: nếu mỗi lần đầy phải copy hết, chẳng phải push_back đôi khi rất đắt? Đúng — một lần push_back gặp lúc nở tốn `O(n)`. Nhưng cộng dồn qua `n` lần thêm liên tiếp, tổng số phép copy chỉ là 1 + 2 + 4 + ... + n, một tổng nhỏ hơn `2n`. Chia tổng đó cho `n` lần thêm, bình quân mỗi lần chỉ tốn `O(1)`. Cách tính "chia đều cái đắt cho nhiều lần rẻ" này gọi là **phân tích khấu trừ**, và đây là công cụ chính của cả bài.

**Vì sao quan trọng?** Vì chiến lược nở quyết định toàn bộ kết quả đó. Nhân đôi sức chứa cho khấu trừ `O(1)`. Nhưng nếu nở theo cấp cộng — ví dụ cứ đầy thì cộng thêm đúng 10 ô — số lần nở tỉ lệ với `n` thay vì giảm theo cấp số nhân, và tổng chi phí copy trở thành `O(n²)`, tức bình quân mỗi lần thêm là `O(n)`. Đây là chỗ nhiều người cài mảng động sai mà không biết, vì chương trình vẫn chạy đúng — chỉ chậm hơn hẳn khi `n` lớn.

### Chuỗi là mảng ký tự, và tại sao thứ tự duyệt cũng có giá

Chuỗi trong C++ chính là một mảng ký tự có thêm vài thao tác tiện dụng. Vì thế mọi cái giá của mảng áp thẳng lên chuỗi: nối chuỗi bằng `+=` trong một vòng lặp, nếu không cấp trước đủ chỗ, mỗi lần nối có thể phải cấp vùng mới và copy lại toàn bộ nội dung cũ — cộng dồn ra `O(n²)`, giống hệt lý do mảng động nở theo cấp cộng bị chậm. Cắt một đoạn con của chuỗi cũng cần phân biệt rõ: có cài tạo ra bản sao mới (an toàn nhưng tốn thêm bộ nhớ và thời gian copy), có cài chỉ trỏ vào vùng nhớ cũ (nhanh nhưng phải cẩn thận vùng gốc còn sống hay không).

**Đây là gì?** Bên cạnh chi phí đếm bằng số phép toán, mảng còn có một lợi thế ẩn: các phần tử nằm liên tục nên khi đọc phần tử này, bộ nhớ đệm (cache) của máy đã tự động kéo theo vài phần tử kế tiếp. Duyệt mảng theo đúng thứ tự tận dụng được điều đó; nhảy lung tung giữa các chỉ số xa nhau thì không, dù tổng số phép toán y hệt nhau. **Vì sao quan trọng?** Đây chính là mô hình chi phí bạn đã gặp ở bài Độ phức tạp thuật toán: hai đoạn code cùng độ phức tạp Big O vẫn có thể khác nhau nhiều lần về tốc độ thật, và cách bạn duyệt qua bộ nhớ là một trong những lý do lớn nhất.

@part vi-sao

### Vì sao mảng và mảng động đáng học kỹ

**Mảng là cấu trúc bạn chạm vào nhiều nhất, dù không để ý.** Mọi ngôn ngữ đều có kiểu mảng hoặc mảng động làm mặc định — `list` của Python, `Array` của JavaScript, `vector` của C++ — và phần lớn cấu trúc dữ liệu khác trong chương trình học này đều dựng trên nó: ngăn xếp và hàng đợi là mảng có quy tắc truy cập riêng, bảng băm là một mảng các ngăn, đồ thị thường lưu bằng mảng kề.

**Nó là bài học đầu tiên về đánh đổi thay vì "cách nào tốt hơn".** Không có phiên bản mảng nào tốt tuyệt đối: truy cập nhanh đổi lấy chèn giữa chậm, sức chứa dư ra để tránh nở liên tục đổi lấy tốn thêm bộ nhớ. Cả chương trình học sau này sẽ liên tục quay lại kiểu câu hỏi này dưới hình thức khác.

**Phân tích khấu trừ mở khoá cho rất nhiều cấu trúc khác.** Bảng băm nở bảng theo đúng lý do mảng động nở sức chứa. Nhiều cấu trúc nâng cao hơn — hàng đợi hai đầu, cây tự cân bằng theo lô — cũng chứng minh độ phức tạp bằng chính kiểu lập luận "chia cái đắt cho nhiều lần rẻ" mà bạn vừa học ở đây lần đầu.

**Và nó là bài học đầu tiên khiến bạn phải nghĩ tới bộ nhớ thật, không chỉ số phép toán.** Locality và cache là lý do vì sao hai đoạn code cùng Big O có thể khác nhau nhiều lần về tốc độ đo được — một khoảng cách giữa lý thuyết và thực hành mà bài Độ phức tạp thuật toán mới chỉ nói tới bằng lời, còn bài này là nơi bạn thấy nó lần đầu bằng một cấu trúc cụ thể.

@part vi-du

@vidu vd-mc-nhan-doi-suc-chua | Xem mảng động nở ra và đếm tổng số lần copy

@slot de-bai

Bắt đầu với mảng động sức chứa 1, thêm lần lượt 9 phần tử bằng `push_back`. Mỗi lần đầy, sức chứa nhân đôi và toàn bộ phần tử hiện có phải copy sang vùng mới.

Câu hỏi cần trả lời: **sau 9 lần thêm, tổng cộng đã có bao nhiêu phép copy?** Và quan trọng hơn: con số đó tăng theo kiểu nào khi số lần thêm lớn dần?

@slot y-tuong

Nhìn thoáng qua thì đáng lo: có những lần `push_back` phải copy cả mảng, tức tốn `O(n)`. Nếu mỗi lần thêm đều như thế thì thêm `n` phần tử sẽ tốn `O(n²)` — mảng động sẽ là một cấu trúc tồi.

Nhưng những lần đắt đỏ đó **rất hiếm**, và càng ngày càng hiếm hơn. Ý tưởng cốt lõi là đừng nhìn từng lần thêm riêng lẻ; hãy cộng chi phí của cả dãy thao tác rồi chia đều cho số thao tác. Cách tính đó gọi là **chi phí khấu trừ**, tiếng Anh là amortized cost — giống như tiền mua máy giặt: trả một cục rất to đúng một lần, nhưng chia cho vài nghìn lần giặt thì mỗi lần rẻ bèo.

Chìa khoá nằm ở việc sức chứa **nhân đôi** chứ không phải cộng thêm một hằng số. Nhân đôi làm khoảng cách giữa hai lần nở giãn ra theo cấp số nhân, nên số lần nở chỉ là `log₂n` chứ không phải `n`.

@slot thuat-toan

`push_back` làm đúng ba việc, theo thứ tự:

1. Nếu số phần tử vẫn nhỏ hơn sức chứa, ghi giá trị mới vào ô trống kế tiếp rồi tăng số phần tử. Xong, tốn `O(1)`.
2. Nếu đã đầy, xin cấp một vùng nhớ mới có sức chứa gấp đôi, copy toàn bộ phần tử cũ sang, trả lại vùng cũ.
3. Rồi mới ghi giá trị mới vào.

Vậy chi phí copy của một lần nở đúng bằng sức chứa cũ. Tổng chi phí copy sau `n` lần thêm là tổng các sức chứa cũ tại mỗi lần nở: `1 + 2 + 4 + 8 + ...` — một cấp số nhân bội 2, và tổng của nó luôn nhỏ hơn hai lần số hạng cuối, tức nhỏ hơn `2n`.

@slot chay-tay

| Lần thêm | Số phần tử sau khi thêm | Sức chứa | Có nở không | Số phép copy lần này | Tổng copy tích luỹ |
|---|---|---|---|---|---|
| 1 | 1 | 1 | Không (bắt đầu tại đây) | 0 | 0 |
| 2 | 2 | 2 | Có, 1 → 2 | 1 | 1 |
| 3 | 3 | 4 | Có, 2 → 4 | 2 | 3 |
| 4 | 4 | 4 | Không | 0 | 3 |
| 5 | 5 | 8 | Có, 4 → 8 | 4 | 7 |
| 6 | 6 | 8 | Không | 0 | 7 |
| 7 | 7 | 8 | Không | 0 | 7 |
| 8 | 8 | 8 | Không | 0 | 7 |
| 9 | 9 | 16 | Có, 8 → 16 | 8 | 15 |

Chỉ có 4 trong 9 lần thêm phải copy, và khoảng cách giữa các lần copy giãn ra dần: nở ở lần 2, lần 3, lần 5, lần 9 — lần tiếp theo sẽ là lần 17, rồi lần 33.

@slot code

Bạn không cần tin bảng trên. `std::vector` cho phép hỏi thẳng sức chứa hiện tại, nên hãy để chương trình tự in ra bảng đó:

```cpp
#include <cstdio>
#include <vector>
using namespace std;

int main() {
    vector<int> v;
    v.reserve(1);                       // ép sức chứa ban đầu bằng 1
    size_t chuaCu = v.capacity(), tongCopy = 0;

    for (int i = 1; i <= 9; i++) {
        v.push_back(i);
        if (v.capacity() != chuaCu) {   // vừa nở: đã copy chuaCu phần tử
            tongCopy += chuaCu;
            printf("lan %d: no %zu -> %zu, copy %zu, tong copy %zu\n",
                   i, chuaCu, v.capacity(), chuaCu, tongCopy);
            chuaCu = v.capacity();
        }
    }
    printf("tong copy = %zu cho %d lan them\n", tongCopy, 9);
}
```

Lưu ý: chiến lược nở là quyền của thư viện, không phải quy định của chuẩn C++. Phần lớn thư viện nhân đôi, nhưng có thư viện nhân 1,5 lần. Bậc `O(1)` khấu trừ vẫn đúng với mọi hệ số nhân lớn hơn 1 — chỉ hằng số đổi.

@slot toi-uu

**Chỗ then chốt:** tổng số phép copy sau đúng 9 lần push_back là `1 + 2 + 4 + 8 = 15`, nhỏ hơn `2 × 9 = 18`. Đây không phải trùng hợp: mỗi lần nở copy đúng bằng sức chứa cũ, và các sức chứa cũ cộng lại luôn nhỏ hơn hai lần số phần tử hiện tại, vì đây là một cấp số nhân bội 2. Dù bạn thêm 9 phần tử hay 9 triệu phần tử, tỉ lệ tổng copy trên tổng số lần thêm luôn bị chặn dưới 2 — không tăng theo n.

**Chi phí:** mỗi push_back riêng lẻ có thể tốn từ `O(1)` (không nở) tới `O(n)` (đúng lúc nở), nhưng tính bình quân trên toàn bộ dãy thao tác, chi phí khấu trừ của mỗi push_back là `O(1)`.

**Tối ưu thật sự, và nó chỉ tốn một dòng:** nếu bạn biết trước sẽ thêm bao nhiêu phần tử, gọi `v.reserve(n)` một lần trước vòng lặp. Sức chứa được cấp đủ ngay từ đầu nên không lần nở nào xảy ra, tổng số phép copy về 0. Bậc vẫn là `O(n)` cho cả dãy như trước, nhưng hằng số giảm hẳn và — quan trọng hơn với code thật — mọi con trỏ hay iterator đang trỏ vào mảng không còn bị hỏng giữa chừng vì mảng dời chỗ.

**Điều KHÔNG nên làm:** nở thêm một hằng số, kiểu sức chứa cộng 10 mỗi lần đầy. Nghe có vẻ tiết kiệm bộ nhớ, nhưng lúc đó số lần nở tỉ lệ thuận với `n` chứ không còn là `log₂n`, và tổng chi phí copy nhảy lên `O(n²)`. Nhân đôi tốn thêm bộ nhớ nhưng đổi lại được cả một bậc — đây là một trong những đánh đổi bộ nhớ lấy thời gian sạch sẽ nhất mà bạn sẽ gặp.

@vidu vd-mc-chen-giua-vs-cuoi | So chèn vào giữa với chèn vào cuối trên mảng một triệu phần tử

@slot de-bai

Cần đưa một triệu phần tử vào một mảng. Có hai cách viết, và chúng chỉ khác nhau ở chỗ đặt phần tử mới vào đâu: luôn thêm vào **cuối**, hay luôn chèn vào **đầu**.

Giả sử mảng đã có sẵn sức chứa đủ dùng — gọi `reserve` trước — để tách riêng chi phí dịch phần tử khỏi chi phí nở mảng đã bàn ở ví dụ trước. Câu hỏi: hai cách chênh nhau bao nhiêu?

@slot y-tuong

Mảng nằm liên tục trong bộ nhớ, và đó vừa là sức mạnh vừa là điểm yếu của nó. Sức mạnh: biết chỉ số là tới thẳng được. Điểm yếu: **các chỉ số phải luôn liền mạch, không được thủng lỗ**.

Vậy nên chèn một phần tử vào vị trí `k` không đơn giản là ghi vào ô `k`. Mọi phần tử từ `k` trở về sau phải dịch sang phải một ô để nhường chỗ — đúng như hàng ghế trong rạp ở đầu bài. Số phép dịch bằng số phần tử nằm sau vị trí chèn.

Từ đó suy ra ngay: chèn vào cuối là trường hợp tốt nhất, dịch 0 phần tử. Chèn vào đầu là trường hợp tệ nhất, dịch toàn bộ. Và cái tệ nhất đó không cố định — nó lớn dần theo đúng số lần bạn đã chèn.

@slot thuat-toan

Đếm tổng số phép dịch cho `n = 10⁶` lần thêm:

- **Thêm vào cuối:** mỗi lần dịch 0 phần tử. Tổng là 0.
- **Chèn vào đầu:** lần thứ nhất mảng rỗng nên dịch 0, lần thứ hai dịch 1, lần thứ ba dịch 2, ... lần thứ `n` dịch `n − 1`. Tổng là `0 + 1 + 2 + ... + (n−1) = n(n−1)/2 ≈ n²/2`.

Đây lại đúng cái tổng cấp số cộng đã gặp ở bài Độ phức tạp — và một lần nữa nó cho ra bậc `n²`, không phải `n`.

@slot chay-tay

| Cách thêm | Số phần tử phải dịch mỗi lần | Tổng số phép dịch cho 10⁶ lần thêm | Thời gian ước lượng (mốc 10⁸ phép/giây) |
|---|---|---|---|
| Luôn thêm vào cuối | 0 | 0 | Không đáng kể |
| Luôn chèn vào đầu | Bằng số phần tử đang có, tăng dần từ 0 tới 10⁶ − 1 | ≈ 10⁶ × 10⁶ / 2 = 5×10¹¹ | 5×10¹¹ / 10⁸ ≈ 5000 giây, khoảng 1,4 giờ |

Thu nhỏ về `n = 5` với các giá trị 1, 2, 3, 4, 5 để nhìn thấy từng phép dịch bằng mắt:

| Lần chèn đầu | Mảng trước khi chèn | Số phép dịch | Mảng sau khi chèn | Tích luỹ |
|---|---|---|---|---|
| 1 | [] | 0 | [1] | 0 |
| 2 | [1] | 1 | [2, 1] | 1 |
| 3 | [2, 1] | 2 | [3, 2, 1] | 3 |
| 4 | [3, 2, 1] | 3 | [4, 3, 2, 1] | 6 |
| 5 | [4, 3, 2, 1] | 4 | [5, 4, 3, 2, 1] | 10 |

Tổng 10 phép dịch cho 5 lần chèn, khớp `n(n−1)/2 = 5×4/2 = 10`. Cùng công việc đó, thêm vào cuối tốn 0 phép dịch.

@slot code

```cpp
#include <chrono>
#include <cstdio>
#include <vector>
using namespace std;
using namespace std::chrono;

double doMs(void (*f)(vector<int>&, int), int n) {
    vector<int> v;
    v.reserve(n);                        // loại bỏ chi phí nở mảng khỏi phép đo
    auto t0 = steady_clock::now();
    f(v, n);
    return duration<double, milli>(steady_clock::now() - t0).count();
}

void themCuoi(vector<int>& v, int n) {
    for (int i = 0; i < n; i++) v.push_back(i);
}

void chenDau(vector<int>& v, int n) {
    for (int i = 0; i < n; i++) v.insert(v.begin(), i);   // dịch toàn bộ mỗi lần
}

int main() {
    for (int n : {10000, 20000, 40000, 80000})
        printf("n=%-6d cuoi=%7.2f ms   dau=%9.2f ms\n",
               n, doMs(themCuoi, n), doMs(chenDau, n));
}
```

Hãy chạy với đúng dãy `n` gấp đôi dần đó và nhìn cột bên phải: mỗi lần `n` gấp đôi, thời gian chèn đầu tăng khoảng **bốn** lần chứ không phải hai. Nhân bốn khi đầu vào nhân hai chính là chữ ký của `O(n²)` — bạn nhận ra được bậc chỉ bằng cách nhìn tỉ lệ giữa các dòng, không cần đọc code.

Đừng thử `n = 10⁶` ở nhà trừ khi bạn rảnh một tiếng rưỡi.

@slot toi-uu

**Chỗ then chốt:** chèn vào đầu mảng một triệu lần không phải chậm gấp đôi hay gấp mười so với thêm vào cuối — nó chậm hơn theo bậc, vì mỗi lần chèn đầu phải dịch toàn bộ phần tử đang có, và số phần tử đang có tăng dần theo đúng số lần bạn đã chèn.

**Chi phí:** thêm vào cuối là O(1) mỗi lần, O(n) cho cả n lần. Chèn vào đầu là O(n) mỗi lần, O(n²) cho cả n lần — với n = 10⁶, khoảng cách giữa hai cách là khoảng cách giữa "không đáng kể" và "gần một tiếng rưỡi".

**Cách tối ưu rẻ nhất, làm được ngay:** nếu thứ tự cuối cùng mới quan trọng chứ không phải thứ tự lúc chèn, hãy cứ `push_back` vào cuối rồi `reverse` một lần ở cuối cùng. Đảo mảng là `O(n)`, nên tổng vẫn là `O(n)` — bạn vừa đổi một tiếng rưỡi lấy vài mili giây bằng cách viết lại hai dòng.

**Khi mẹo đó không dùng được** — chẳng hạn bạn phải xen kẽ chèn đầu với đọc dữ liệu ra — thì vấn đề không nằm ở code nữa mà nằm ở cấu trúc dữ liệu. Lúc đó bạn cần một cấu trúc thêm vào đầu tốn `O(1)`: `std::deque` nếu chỉ cần hai đầu, hoặc danh sách liên kết nếu cần chèn ở giữa. Danh sách liên kết chính là bài học kế tiếp của chương này, và nó sinh ra để giải quyết đúng cái bảng bạn vừa nhìn.
