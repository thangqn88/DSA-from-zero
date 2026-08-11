@part ly-thuyet

### Hàng người xếp hàng và ba thành phần của đệ quy

<p class="idea-label">🧩 Ý tưởng cốt lõi</p>

Bạn đứng trong một hàng dài, muốn biết mình đứng thứ mấy nhưng không thấy đầu hàng. Bạn hỏi người phía trước: "anh đứng thứ mấy?". Người đó cũng không biết, nên hỏi tiếp người phía trước nữa. Cứ thế cho tới người đầu hàng — người này biết ngay, mình thứ nhất, không cần hỏi ai. Câu trả lời rồi truyền ngược lại, mỗi người cộng thêm một vào con số nghe được. Toàn bộ đệ quy nằm trong câu chuyện đó: một câu hỏi tự hỏi lại chính nó trên một bài toán nhỏ hơn, cộng một người biết câu trả lời mà không cần hỏi ai nữa.

**Đây là gì?** Đệ quy là một hàm gọi lại chính nó, trên một phiên bản nhỏ hơn của cùng bài toán. Một hàm đệ quy đúng luôn có ba thành phần: **trường hợp cơ sở** — bài toán đủ nhỏ để trả lời ngay, không cần hỏi ai (người đầu hàng biết mình thứ nhất); **bước thu nhỏ** — chuyển bài toán hiện tại thành một bài toán nhỏ hơn của chính nó (hỏi người phía trước); và **bước ghép kết quả** — dùng câu trả lời của bài toán nhỏ để dựng câu trả lời của bài toán ban đầu (cộng thêm một).

**Vì sao quan trọng?** Thiếu bất kỳ thành phần nào, hàm đều hỏng theo cách rất khó nhận ra khi đọc code lần đầu. Thiếu trường hợp cơ sở thì hàm không bao giờ dừng — không ai trong hàng biết trả lời, mọi người cứ hỏi tiếp mãi. Có trường hợp cơ sở nhưng bước thu nhỏ không thật sự làm bài toán nhỏ đi — ví dụ gọi lại đúng với số thứ tự cũ thay vì lùi một người — thì hàng người không bao giờ tới được đầu hàng, và kết quả giống hệt thiếu trường hợp cơ sở: chạy mãi.

```cpp
// Thiếu trường hợp cơ sở: không có điều kiện dừng, chạy mãi
int dem(int n) {
    return 1 + dem(n - 1);   // không có "if (n == 0) return 0;"
}

// Có trường hợp cơ sở nhưng bước thu nhỏ sai: n không hề nhỏ đi
int demSai(int n) {
    if (n == 0) return 0;
    return 1 + demSai(n);    // gọi lại với đúng n, không phải n - 1
}

// Đúng cả ba thành phần
int demDung(int n) {
    if (n == 0) return 0;        // trường hợp cơ sở
    return 1 + demDung(n - 1);   // bước thu nhỏ + ghép kết quả
}
```

### Ngăn xếp lời gọi

Mỗi lần một người trong hàng hỏi người phía trước, người đó phải đứng đó chờ câu trả lời — chưa xong việc, chưa rời khỏi hàng. Bên trong máy tính, mỗi lời gọi hàm chưa hoàn tất cũng "đứng chờ" như vậy: nó chiếm một **khung** trên **ngăn xếp lời gọi**, giữ biến cục bộ của lần gọi đó (số thứ tự đang hỏi) và địa chỉ cần quay về khi có câu trả lời. Gọi đệ quy sâu `n` lần nghĩa là có `n` khung đang chồng lên nhau trên ngăn xếp cùng một lúc.

Đây chính là lý do **độ sâu đệ quy là bộ nhớ tiêu tốn**, không chỉ là thời gian. Ngăn xếp lời gọi có giới hạn dung lượng do hệ điều hành cấp cho mỗi luồng chạy; vượt qua giới hạn đó thì chương trình sập với lỗi tràn ngăn xếp, dù logic của hàm hoàn toàn đúng và cuối cùng vẫn sẽ dừng nếu có đủ chỗ chứa.

Chú ý đây là **cùng một cấu trúc ngăn xếp** bạn đã học ở bài Ngăn xếp và hàng đợi — vào sau ra trước, chỉ thêm và chỉ bớt ở một đầu. Khác biệt duy nhất là ở đây bạn không tự tay `push`/`pop`; trình dịch và hệ điều hành làm việc đó hộ bạn mỗi khi có lời gọi hàm và mỗi khi hàm trả về.

### Cây đệ quy và hệ thức truy hồi

Vẽ lại mọi lời gọi của `fib(5)` thành một cây — mỗi lời gọi là một nút, hai lời gọi con của nó là hai nhánh:

```cpp
                    fib(5)
                 /          \
             fib(4)          fib(3)
            /      \        /      \
        fib(3)    fib(2)  fib(2)   fib(1)
       /    \      /  \    /  \
   fib(2) fib(1) fib(1)fib(0)fib(1)fib(0)
   /   \
fib(1) fib(0)
```

Đếm số nút trong cây này sẽ thấy nó bùng nổ rất nhanh: `fib(2)` xuất hiện lại nhiều lần ở nhiều nhánh khác nhau, và `fib(1)`, `fib(0)` càng xuất hiện nhiều hơn. Mỗi nút không phải lá sinh ra đúng hai nút con, và chiều cao cây là `n`, nên tổng số nút tăng theo cấp `O(2ⁿ)` — đây là cách trực quan để thấy đệ quy trần của `fib` tốn hàm mũ mà không cần chứng minh bằng công thức.

Cách tổng quát để nói ra chi phí của một hàm đệ quy là viết nó thành một **hệ thức truy hồi**: `T(n) = a·T(n/b) + f(n)`, đọc là "bài toán cỡ `n` tốn thời gian bằng `a` lần bài toán con cỡ `n/b`, cộng thêm `f(n)` để chia bài toán ra và ghép kết quả lại". Không cần nhớ định lý Master đầy đủ; ba mốc dưới đây phủ hầu hết các hàm đệ quy bạn sẽ gặp trong suốt chương trình học này:

| Hệ thức truy hồi | Đọc là | Kết quả | Ví dụ |
|---|---|---|---|
| `T(n) = T(n/2) + O(1)` | Mỗi lần chỉ đi vào một nửa, việc ngoài lời gọi tốn hằng số | `O(log n)` | Tìm kiếm nhị phân |
| `T(n) = 2T(n/2) + O(n)` | Chia đôi thành hai bài toán con, ghép lại tốn tuyến tính | `O(n log n)` | Merge sort |
| `T(n) = 2T(n-1) + O(1)` | Mỗi lần đẻ ra hai lời gọi, kích thước chỉ giảm đi một | `O(2ⁿ)` | Liệt kê tập con, fib đệ quy trần |

**Chỗ hay nhầm:** hai hệ thức đầu đều "chia đôi" nhưng cho ra kết quả rất khác nhau, vì phần `f(n)` — chi phí ghép — khác nhau. Tìm nhị phân chỉ so sánh rồi bỏ hẳn một nửa, không cần ghép gì nên `f(n) = O(1)`. Merge sort phải trộn hai mảng con đã sắp thành một mảng lớn, và việc trộn đó tốn `O(n)`. Nhìn hệ thức mà không để ý tới `f(n)` là nguồn nhầm lẫn phổ biến nhất khi mới học phần này.

### Chia để trị và ghi nhớ

**Chia để trị** là một khuôn mẫu, không phải một mẹo vặt: chia bài toán thành các phần rời nhau, giải từng phần bằng chính thuật toán đó (đệ quy), rồi ghép các kết quả con lại thành kết quả cuối. Hệ thức truy hồi `T(n) = 2T(n/2) + O(n)` ở trên chính là "dấu vân tay" của khuôn mẫu này. Hai nhóm kiến thức sắp tới của Chương 2 — Sắp xếp và Tìm kiếm nhị phân — là hai ứng dụng trực tiếp, và cả hai sẽ dựa hẳn vào cách đọc hệ thức truy hồi bạn vừa học ở đây, không giải thích lại từ đầu.

Còn khi bài toán có các nhánh con **trùng lặp** — như cây `fib(5)` ở trên, nơi `fib(2)` bị tính lại nhiều lần — thì chia để trị thuần không cứu được bạn, vì nó không biết một bài toán con đã được giải rồi. Cách sửa là **ghi nhớ**: giữ một bảng lưu kết quả theo tham số đầu vào; trước khi tính, tra bảng, có rồi thì trả về ngay, chưa có thì tính và lưu lại trước khi trả về.

```cpp
// fib có ghi nhớ: dùng -1 để đánh dấu "chưa tính", tách bạch với kết quả 0
vector<long long> bang;

long long fib(int n) {
    if (n <= 1) return n;                 // trường hợp cơ sở
    if (bang[n] != -1) return bang[n];     // đã tính rồi, trả về ngay
    bang[n] = fib(n - 1) + fib(n - 2);     // tính và lưu lại
    return bang[n];
}
```

Với bảng ghi nhớ, mỗi giá trị `n` chỉ được tính đúng một lần, nên tổng chi phí tụt từ `O(2ⁿ)` xuống `O(n)`. Đây chính là **cửa vào của Quy hoạch động** ở Chương 6 — bạn đã có sẵn công cụ để hiểu nó khi tới đó: Quy hoạch động, nói ngắn gọn, là đệ quy có ghi nhớ được nhìn theo một góc có hệ thống hơn.

@part vi-sao

### Vì sao đệ quy đáng học kỹ ngay từ đầu

**Nó là ngôn ngữ chung của mọi cấu trúc có tính "một phần giống toàn thể".** Cây, danh sách liên kết, đồ thị duyệt theo chiều sâu — tất cả đều tự nhiên diễn đạt bằng đệ quy, vì cây con của một cây vẫn là một cây, phần còn lại của một danh sách vẫn là một danh sách. Cố viết những cấu trúc này bằng vòng lặp thuần thường ra code rối hơn, không phải gọn hơn.

**Hệ thức truy hồi là công cụ phân tích, không phải bài tập lý thuyết suông.** Ba mốc bạn học ở bài này — `O(log n)`, `O(n log n)`, `O(2ⁿ)` — sẽ tái xuất hiện xuyên suốt chương trình. Khi gặp một hàm đệ quy mới, việc đầu tiên đáng làm là viết ra hệ thức truy hồi của nó rồi so với ba mốc này, trước khi nghĩ tới việc đo giờ chạy thực tế.

**Nó dạy đúng phản xạ "đừng tính lại cái đã biết".** Khoảng cách giữa `fib` đệ quy trần và bản có ghi nhớ chỉ là một dòng kiểm tra bảng, nhưng đổi hẳn thuật toán từ hàm mũ sang tuyến tính. Phản xạ này — nhận ra bài toán con trùng lặp và lưu lại kết quả — là hạt giống của cả nhóm kiến thức Quy hoạch động sẽ học sau.

@part vi-du

@vidu vd-dq-cay-fibonacci | Đếm số lời gọi của fib đệ quy trần rồi so với bản có ghi nhớ

@slot de-bai

Hàm Fibonacci viết theo đúng định nghĩa toán học là đoạn code đệ quy đẹp nhất mà ai cũng gặp đầu tiên:

```cpp
long long fib(int n) {
    if (n <= 1) return n;              // trường hợp cơ sở
    return fib(n - 1) + fib(n - 2);    // bước đệ quy
}
```

Nó ngắn, nó đúng, và nó chậm tới mức không dùng được. Nhiệm vụ của ví dụ này là chỉ ra **chính xác chỗ nào lãng phí** bằng cách đếm số lời gọi, chứ không chỉ nói suông "đệ quy trần thì chậm".

@slot y-tuong

Đoạn code trên không sai. Cái sai nằm ở chỗ nó **quên**: mỗi lần cần `fib(3)`, nó tính lại từ đầu như thể chưa từng gặp bao giờ, dù có thể đã tính đúng giá trị đó vài giây trước.

Hãy tưởng tượng bạn tra một từ trong từ điển, gấp sách lại, rồi năm phút sau cần đúng từ đó và lại mở từ đầu tra lại — làm vậy hai mươi lần. Không ai làm thế trong đời thật, nhưng đoạn code trên làm đúng thế.

Cách chữa gọi là **ghi nhớ**, tiếng Anh là memoization: giữ một quyển sổ, trước khi tính thì tra sổ, tính xong thì ghi vào sổ. Chỉ thêm hai dòng, và bậc rơi từ luỹ thừa xuống tuyến tính.

@slot thuat-toan

Bản ghi nhớ chỉ khác bản trần đúng ba chi tiết:

1. Một mảng `nho` kích thước `n + 1`, khởi tạo toàn `-1` để đánh dấu "chưa tính".
2. Ngay đầu hàm, sau khi kiểm tra trường hợp cơ sở: nếu `nho[n] != -1` thì trả về luôn, không đệ quy nữa.
3. Trước khi trả về kết quả vừa tính, ghi nó vào `nho[n]`.

Vì sao điều này đủ để đổi bậc? Vì mỗi giá trị `n` chỉ có thể đi qua nhánh "tính thật" đúng một lần trong suốt cả chương trình — lần thứ hai trở đi nó bị chặn ngay ở bước 2. Có `n + 1` giá trị, mỗi giá trị tính một lần với chi phí cố định, nên tổng là `O(n)`.

@slot chay-tay

Với cây lời gọi `fib(5)` đã vẽ ở phần lý thuyết, đếm số lần mỗi giá trị `n` xuất hiện lại (tức số lần nó bị tính lại từ đầu):

| n | Số lần fib(n) được gọi — đệ quy trần | Số lần thật sự tính — bản ghi nhớ |
|---|---|---|
| 4 | 1 | 1 |
| 3 | 2 | 1 |
| 2 | 3 | 1 |
| 1 | 5 | 1 |
| 0 | 3 | 1 |

Tổng cộng 15 lời gọi cho `fib(5)` — với đệ quy trần. Với `n` lớn hơn, số lần tính lại tăng theo cấp luỹ: bảng số lời gọi theo công thức `2·fib(n+1) − 1` cho thấy `fib(10)` đã cần 177 lời gọi, còn `fib(30)` cần hơn 2,6 triệu lời gọi dù kết quả chỉ là một số nguyên duy nhất.

| n | Số lời gọi — đệ quy trần | Số lần tính — bản ghi nhớ |
|---|---|---|
| 5 | 15 | 6 |
| 10 | 177 | 11 |
| 20 | 21891 | 21 |
| 30 | 2692537 | 31 |
| 50 | ≈ 4×10¹⁰ | 51 |

Cột giữa nhân lên khoảng 1,6 lần mỗi khi `n` tăng 1. Cột phải cộng thêm đúng 1. Đó là hai thế giới khác nhau, và chúng chỉ cách nhau hai dòng code.

@slot code

```cpp
#include <cstdio>
#include <vector>
using namespace std;

long long soLoiGoi = 0;

long long fibTran(int n) {
    soLoiGoi++;
    if (n <= 1) return n;
    return fibTran(n - 1) + fibTran(n - 2);
}

vector<long long> nho;

long long fibNho(int n) {
    soLoiGoi++;
    if (n <= 1) return n;
    if (nho[n] != -1) return nho[n];              // đã tính rồi, trả về ngay
    return nho[n] = fibNho(n - 1) + fibNho(n - 2); // tính xong thì ghi vào sổ
}

int main() {
    for (int n : {5, 10, 20, 30}) {
        soLoiGoi = 0; fibTran(n);
        long long a = soLoiGoi;

        nho.assign(n + 1, -1);
        soLoiGoi = 0; fibNho(n);

        printf("n=%-3d tran=%-10lld nho=%-4lld  ti le=%.0f lan\n",
               n, a, soLoiGoi, (double)a / soLoiGoi);
    }
}
```

Đừng bỏ qua bước tự chạy đoạn này. Nhìn cột `ti le` phình ra theo `n` có sức thuyết phục hơn mọi lời giải thích về `O(2ⁿ)`.

@slot toi-uu

**Chỗ then chốt:** `fib(2)` bị tính lại 3 lần trong `fib(5)`, và tỉ lệ này không giảm mà còn tăng khi `n` lớn hơn — đó là toàn bộ vấn đề của đệ quy trần. Bản có ghi nhớ chặn đứng sự lãng phí này: mỗi giá trị `n` từ 0 tới 5 chỉ được tính đúng một lần, tổng cộng chỉ 6 lần tính thay vì 15 lần gọi.

**Chi phí:** đệ quy trần là `O(2ⁿ)` thời gian. Bản ghi nhớ là `O(n)` thời gian và `O(n)` bộ nhớ cho bảng lưu. Với `n = 50`, khác biệt này là khác biệt giữa việc chờ nhiều ngày và việc có kết quả tức thì.

**Còn tối ưu được nữa.** Bản ghi nhớ vẫn tốn `O(n)` bộ nhớ cho mảng và `O(n)` khung ngăn xếp lời gọi. Nhưng để tính `fib(n)` bạn chỉ cần nhớ đúng hai số gần nhất, nên viết lặp từ dưới lên là xong — `O(n)` thời gian, `O(1)` bộ nhớ, không đệ quy nên không sợ tràn ngăn xếp:

```cpp
long long fibLap(int n) {
    if (n <= 1) return n;
    long long a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        long long c = a + b;
        a = b; b = c;
    }
    return b;
}
```

Con đường trần → ghi nhớ → lặp từ dưới lên mà bạn vừa đi chính là con đường dẫn tới **quy hoạch động** ở Chương 6. Ở đó bạn sẽ làm lại đúng ba bước này, chỉ khác là trên những bài toán mà bước cuối không còn hiển nhiên như ở đây.

Một chú thích để khỏi hiểu nhầm: riêng Fibonacci còn có công thức ma trận cho ra `O(log n)`, nhưng đó là mẹo dành riêng cho dãy này, không phải bài học tổng quát. Cái đáng mang theo là ba bước ở trên.

@vidu vd-dq-giai-truy-hoi-merge | Giải T(n) = 2T(n/2) + O(n) bằng cách đếm theo tầng

@slot de-bai

Một hàm đệ quy chia bài toán kích thước `n` thành **hai** bài con mỗi bài kích thước `n/2`, giải xong hai bài con thì tốn thêm `c·n` để ghép kết quả lại. Viết thành hệ thức truy hồi:

`T(n) = 2·T(n/2) + c·n`, với `T(1) = c`.

Hãy tìm `T(n)` theo O lớn (Big O). Đây không phải bài tập trên giấy cho vui: đó chính xác là hệ thức của merge sort, và bạn sẽ dùng lại kết quả này ở Chương 2.

@slot y-tuong

Thay `T(n/2)` bằng định nghĩa của chính nó rồi lại thay tiếp là cách làm đúng nhưng rối, vì công thức phình ra rất nhanh và bạn dễ lạc.

Cách nhìn dễ hơn nhiều: **vẽ cây đệ quy ra rồi cộng chi phí theo từng tầng ngang**, thay vì lần theo từng nhánh dọc. Mỗi nút của cây là một lời gọi; chi phí ghi ở nút chỉ là phần **ghép** của riêng nó, không tính phần các nút con làm.

Lý do cách này hiệu quả: trong rất nhiều hệ thức, tổng chi phí của mỗi tầng ngang hoá ra là một con số dễ chịu — bằng nhau ở mọi tầng, hoặc tăng/giảm theo cấp số nhân. Lúc đó bài toán rút gọn thành "chi phí một tầng × số tầng", hai đại lượng đều tính nhẩm được.

@slot thuat-toan

Quy trình đếm theo tầng, dùng được cho mọi hệ thức chia để trị:

1. **Đếm số nút ở tầng k.** Mỗi lời gọi đẻ ra 2 lời gọi con, nên tầng `k` có `2ᵏ` nút.
2. **Tính kích thước mỗi bài ở tầng k.** Mỗi tầng chia đôi, nên kích thước là `n/2ᵏ`.
3. **Nhân hai số đó với chi phí ghép** để ra tổng chi phí của tầng: `2ᵏ × c·(n/2ᵏ) = c·n`.
4. **Đếm số tầng.** Cây dừng khi kích thước còn 1, tức `n/2ᵏ = 1`, tức `k = log₂n`.
5. **Nhân chi phí mỗi tầng với số tầng.**

@slot chay-tay

| Tầng | Số bài toán con | Kích thước mỗi bài | Chi phí ghép của tầng |
|---|---|---|---|
| 0 (gốc) | 1 | n | c·n |
| 1 | 2 | n/2 | 2 · c·(n/2) = c·n |
| 2 | 4 | n/4 | 4 · c·(n/4) = c·n |
| ... | ... | ... | c·n |
| log₂n (lá) | n | 1 | c·n |

Thay `n = 8` và `c = 1` để ra con số thật:

| Tầng | Số nút | Kích thước | Chi phí tầng | Cộng dồn |
|---|---|---|---|---|
| 0 | 1 | 8 | 8 | 8 |
| 1 | 2 | 4 | 2 × 4 = 8 | 16 |
| 2 | 4 | 2 | 4 × 2 = 8 | 24 |
| 3 | 8 | 1 | 8 × 1 = 8 | 32 |

Bốn tầng, mỗi tầng đúng 8, tổng 32. Đối chiếu công thức: `n·log₂n = 8 × 3 = 24`, cộng tầng lá `n = 8` nữa là 32. Khớp.

@slot code

Đoạn dưới đây tính `T(n)` bằng đúng định nghĩa truy hồi rồi so với `n·log₂n`, để bạn tự thấy tỉ lệ giữa hai bên hội tụ về một hằng số — dấu hiệu chắc chắn của "cùng bậc":

```cpp
#include <cmath>
#include <cstdio>

double T(long long n) {                 // c = 1
    if (n <= 1) return 1;
    return 2 * T(n / 2) + n;
}

int main() {
    for (long long n = 8; n <= 8192; n *= 4) {
        double nlogn = n * log2((double)n);
        printf("n=%-6lld T(n)=%-10.0f n·log2(n)=%-10.0f  ti le=%.2f\n",
               n, T(n), nlogn, T(n) / nlogn);
    }
}
```

Cột `ti le` lởn vởn quanh 1,1–1,3 và không hề tăng theo `n`. Nếu `T(n)` thật sự thuộc bậc cao hơn, tỉ lệ đó đã phải phình ra không giới hạn.

@slot toi-uu

**Chỗ then chốt:** mỗi tầng đều tốn đúng `c·n`, bất kể tầng đó có bao nhiêu bài toán con — vì số bài toán con tăng gấp đôi mỗi tầng trong khi kích thước mỗi bài giảm đi một nửa, hai hiệu ứng triệt tiêu nhau. Cây có `log₂n` tầng vì mỗi tầng kích thước giảm một nửa, và `n` chỉ chia đôi được `log₂n` lần trước khi chạm kích thước 1. Tổng chi phí là số tầng nhân chi phí mỗi tầng: `log₂n × c·n = O(n log n)`.

**Chi phí:** đây chính là độ phức tạp của merge sort — bài học kế tiếp ở Chương 2 dùng đúng phép đếm này, không giải thích lại.

**Đổi một con số, đổi cả kết luận.** Sức mạnh thật của cách đếm theo tầng là nó cho bạn thấy hệ thức nhạy cảm tới mức nào:

| Hệ thức | Chi phí mỗi tầng | Kết quả | Thuật toán quen thuộc |
|---|---|---|---|
| `T(n) = 2T(n/2) + c·n` | Bằng nhau mọi tầng | `O(n log n)` | Merge sort |
| `T(n) = T(n/2) + c` | Chỉ một nhánh | `O(log n)` | Tìm kiếm nhị phân |
| `T(n) = 2T(n/2) + c` | Tăng gấp đôi mỗi tầng, tầng lá nuốt hết | `O(n)` | Duyệt cây nhị phân |
| `T(n) = 4T(n/2) + c·n` | Tăng gấp đôi mỗi tầng | `O(n²)` | Nhân ma trận ngây thơ |

Hai dòng đầu và dòng thứ ba chỉ khác nhau ở một chi tiết nhỏ trong công thức, nhưng ra ba bậc khác nhau. Đây là lý do đừng đoán mà hãy vẽ tầng ra.

Cách đếm theo tầng dùng lại được cho mọi hệ thức truy hồi dạng chia để trị, kể cả những hệ thức không rơi đúng vào ba mốc đã nhớ ở bảng phần lý thuyết — cứ vẽ tầng, cộng chi phí mỗi tầng, rồi nhân với số tầng.
