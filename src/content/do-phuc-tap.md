@part ly-thuyet

### Tìm một cái tên trong danh bạ

<p class="idea-label">🧩 Ý tưởng cốt lõi</p>

Bạn cầm một quyển danh bạ dày và cần tìm số của người tên "Sơn". Có hai cách. Cách thứ nhất: lật từng trang từ đầu tới cuối. Cách thứ hai: mở giữa quyển, thấy chữ "M", biết "S" nằm ở nửa sau, rồi lại mở giữa nửa sau, cứ thế. Với quyển mỏng thì hai cách chênh nhau không đáng kể. Nhưng nếu quyển danh bạ dày gấp một nghìn lần, cách thứ nhất tốn gấp một nghìn lần thời gian, còn cách thứ hai chỉ tốn thêm khoảng mười bước. Đó chính là toàn bộ nội dung của bài này: **không phải hôm nay chạy mất bao lâu, mà là khi dữ liệu lớn lên thì thời gian lớn lên theo kiểu nào**.

**Đây là gì?** Độ phức tạp thuật toán là cách mô tả tốc độ tăng của khối lượng công việc theo kích thước đầu vào. Ta ký hiệu kích thước đầu vào là `n`, rồi đếm xem chương trình phải làm khoảng bao nhiêu phép toán. Không đếm bằng giây, vì giây phụ thuộc vào máy của bạn, vào trình biên dịch, vào việc lúc đó máy có đang mở trình duyệt hay không. Đếm bằng số phép toán thì con số ấy đúng trên mọi máy.

**Vì sao quan trọng?** Vì nó cho bạn biết trước một thuật toán có dùng được hay không, mà không cần viết ra rồi chạy thử. Đề bài nói `n` tối đa 200000 — chỉ nhìn con số đó thôi là bạn đã loại được mọi ý tưởng có hai vòng lặp lồng nhau, tiết kiệm cả buổi ngồi gõ một lời giải chắc chắn quá hạn giờ. Trong công việc thật, đó là khác biệt giữa một truy vấn trả về sau 50 mili giây và một truy vấn treo máy chủ.

### Ký hiệu O lớn, tiếng Anh là Big O — cách viết gọn của "tăng theo kiểu nào"

Giả sử bạn đếm được một đoạn code làm `3n + 7` phép toán. Khi `n` bằng một triệu, số 7 kia hoàn toàn không đáng kể, và con số 3 chỉ làm mọi thứ nhanh hay chậm đúng ba lần chứ không đổi hình dạng của đường cong. Thứ duy nhất thật sự quyết định là chữ `n`. Vậy nên ta viết gọn thành `O(n)`, đọc là "ô lớn của n".

**Một chú thích về tên gọi, đọc kỹ chỗ này.** Tài liệu tiếng Việt gọi ký hiệu này là **O lớn**, nhưng gần như toàn bộ tài liệu, khoá học, video và câu hỏi phỏng vấn ngoài kia dùng tên tiếng Anh: **Big O** — viết đầy đủ là **Big O notation**, tức "ký hiệu O lớn". Hai cái tên đó chỉ cùng một thứ, không có khác biệt nào cả. Bạn sẽ còn gặp thêm vài cách viết nữa và tất cả đều là nó: `Big-O`, `big O`, hay đọc thành lời là "big oh of n" cho `O(n)`. Từ đây trở đi trong khoá này, chỗ nào cần nhắc tới ký hiệu, mình sẽ viết là **O lớn (Big O)** để bạn quen dần với cả hai — vì khi đi phỏng vấn hay tra Google, cái tên có ích cho bạn là cái tên tiếng Anh.

Nhân tiện, hai người bà con của Big O mà bạn sẽ gặp trong sách: **Big Omega** viết là `Ω(n)` nói về cận dưới — "nhanh nhất cũng phải tốn chừng này", và **Big Theta** viết là `Θ(n)` nói về cả hai phía — "đúng bằng chừng này, không hơn không kém về mặt bậc". Trong thực tế lập trình, người ta hầu như chỉ dùng Big O, và thường dùng nó với ý nghĩa của Big Theta. Bạn chỉ cần biết ba cái tên đó tồn tại là đủ cho lúc này.

**Hai quy tắc rút gọn, chỉ có hai thôi:**

1. Bỏ mọi hằng số nhân. `5n` và `100n` đều là `O(n)`.
2. Chỉ giữ số hạng lớn nhất. `n² + 1000n` là `O(n²)`, vì khi `n` đủ lớn thì `n²` nuốt chửng phần còn lại.

**Và hai quy tắc ghép:** hai vòng lặp **lồng nhau** thì nhân độ phức tạp với nhau; hai đoạn code **nối tiếp** nhau thì lấy cái lớn hơn. Chỉ với bốn quy tắc này bạn đã phân tích được phần lớn code mình gặp.

### Bảng so sánh — nhìn bằng con số thật

Lý thuyết nói `O(n²)` tệ hơn `O(n log n)`. Nhưng tệ hơn bao nhiêu? Bảng dưới đây là số phép toán thực tế, và nó thuyết phục hơn mọi lời giải thích:

| Độ phức tạp | n = 10 | n = 1000 | n = 1000000 | Ví dụ điển hình |
|---|---|---|---|---|
| `O(1)` | 1 | 1 | 1 | Lấy phần tử thứ i của mảng |
| `O(log n)` | 3 | 10 | 20 | Tìm kiếm nhị phân |
| `O(n)` | 10 | 1000 | 1000000 | Duyệt một lượt qua mảng |
| `O(n log n)` | 33 | 10000 | 20000000 | Sắp xếp tốt |
| `O(n²)` | 100 | 1000000 | 10¹² | So mọi cặp phần tử |
| `O(2ⁿ)` | 1024 | không tưởng | không tưởng | Duyệt mọi tập con |

Hãy để ý cột `n = 10`: ở đó mọi dòng đều nhỏ và chênh lệch chẳng đáng gì. Đó là lý do một thuật toán tồi vẫn chạy tốt trên dữ liệu ví dụ trong sách. Rồi nhìn cột cuối: `O(n²)` nhảy lên `10¹²`, tức khoảng ba giờ chạy máy, trong khi `O(n log n)` chỉ mất khoảng hai phần mười giây. Cùng một bài toán, cùng một chiếc máy.

**Mốc phản xạ cần thuộc:** một máy tính phổ thông làm được khoảng `10⁸` phép toán đơn giản trong một giây. Lấy con số đó chia cho công thức độ phức tạp là ra ngay giới hạn `n` mà thuật toán của bạn còn chịu được.

| Giới hạn n trong đề | Độ phức tạp còn dùng được |
|---|---|
| n ≤ 20 | `O(2ⁿ)` — vét cạn mọi tập con vẫn kịp |
| n ≤ 500 | `O(n³)` |
| n ≤ 5000 | `O(n²)` |
| n ≤ 10⁶ | `O(n log n)` |
| n ≥ 10⁸ | gần như bắt buộc `O(n)` hoặc `O(log n)` |

### Chỗ O lớn (Big O) nói dối bạn — bộ nhớ và cache

O lớn (Big O) đếm **số** phép toán, nhưng nó ngầm giả định mọi phép toán tốn như nhau. Ngoài đời thì không.

Hãy tưởng tượng bạn ngồi bàn làm việc. Giấy tờ cần dùng có thể nằm ngay trên mặt bàn, trong ngăn kéo, hoặc dưới tầng hầm lưu trữ. Lấy từ mặt bàn mất một giây, mở ngăn kéo mất mười giây, xuống hầm mất mười phút. Bộ nhớ máy tính cũng xếp tầng đúng như vậy: thanh ghi, cache L1, L2, L3, rồi RAM. Đọc từ cache L1 nhanh hơn đọc từ RAM khoảng một trăm lần.

Bộ xử lý có một thói quen rất hữu ích: mỗi lần bạn đọc một ô nhớ, nó bê luôn cả khối 64 byte xung quanh ô đó lên cache, vì đoán rằng bạn sắp cần những ô kế bên. Với mảng, dự đoán đó gần như luôn đúng — các phần tử nằm sát nhau. Với danh sách liên kết, mỗi nút được cấp phát ở một chỗ ngẫu nhiên trong bộ nhớ, nên dự đoán đó gần như luôn sai.

Kết quả: duyệt một mảng một triệu phần tử và duyệt một danh sách liên kết một triệu nút **cùng là `O(n)`**, nhưng bản mảng thường nhanh hơn nhiều lần. Đây không phải lỗi của O lớn (Big O) — nó chưa bao giờ hứa hẹn về hằng số. Đây là lời nhắc rằng phân tích trên giấy cho bạn bậc, còn đo đạc thật cho bạn con số. Phần Dự án thực hành cuối bài chính là để bạn tự dựng công cụ đo đó.

```cpp
// Cùng O(n), khác chi phí mỗi bước
long long tongMang(const vector<int>& a) {
    long long s = 0;
    for (int x : a) s += x;      // các phần tử nằm liền nhau -> trúng cache
    return s;
}

struct Nut { int giaTri; Nut* tiep; };

long long tongDanhSach(Nut* dau) {
    long long s = 0;
    for (Nut* p = dau; p != nullptr; p = p->tiep)
        s += p->giaTri;          // mỗi bước nhảy tới một chỗ ngẫu nhiên -> trượt cache
    return s;
}
```

@part vi-sao

### Vì sao phải học thứ này trước mọi thứ khác

**Nó là ngôn ngữ chung của tất cả các bài còn lại.** Mọi bài học sau đây đều kết thúc bằng một câu dạng "cách này là O(n log n), cách kia là O(n²)". Nếu chưa đọc được câu đó thì bạn chỉ đang học thuộc lòng chứ chưa hiểu vì sao người ta chọn cấu trúc này thay vì cấu trúc kia.

**Nó tiết kiệm thời gian ngay lập tức.** Đọc đề, nhìn giới hạn `n`, tra bảng mốc phản xạ ở trên, và bạn biết ngay hướng nào không cần thử. Người chưa quen sẽ viết xong một lời giải rồi mới phát hiện nó quá chậm và phải bỏ đi.

**Nó là câu hỏi bạn sẽ bị hỏi ở mọi buổi phỏng vấn.** Không phải vì công ty cần bạn tính toán trên giấy, mà vì trả lời được câu đó chứng tỏ bạn hiểu code mình vừa viết sẽ hành xử ra sao khi lượng người dùng tăng gấp trăm lần.

**Nó là thứ phân biệt một web app chạy được với một web app chịu tải được.** Trang tra cứu mười nghìn bản ghi thì viết kiểu gì cũng chạy. Trang tra cứu mười triệu bản ghi trong 50 mili giây thì chỉ người hiểu chương này mới làm nổi — và bạn sẽ dựng đúng thứ đó ở Chương 4.

@part vi-du

@vidu vd-dpt-dem-phep-toan | Đếm phép toán của ba đoạn code lồng vòng lặp

@slot de-bai

Ba đoạn dưới đây trông na ná nhau. Hãy đếm số lần dòng `dem++` được thực hiện, rồi rút gọn về O lớn (Big O).

```cpp
// Đoạn A
int dem = 0;
for (int i = 0; i < n; i++)
    for (int j = 0; j < n; j++)
        dem++;

// Đoạn B
int dem = 0;
for (int i = 0; i < n; i++)
    dem++;
for (int j = 0; j < n; j++)
    dem++;

// Đoạn C
int dem = 0;
for (int i = 0; i < n; i++)
    for (int j = i; j < n; j++)
        dem++;
```

@slot y-tuong

Đừng nhìn code rồi đoán. Hãy hỏi đúng một câu cho mỗi vòng lặp: **vòng này chạy bao nhiêu lần, và mỗi lần nó kéo theo bao nhiêu việc bên trong?** Nhân hai con số đó lại là ra chi phí của cả khối.

Toàn bộ khác biệt giữa ba đoạn nằm ở quan hệ giữa các vòng lặp, không nằm ở số dòng code. Đoạn A và C có vòng lồng nhau nên phải **nhân**; đoạn B có hai vòng nối tiếp nên chỉ **cộng**. Riêng đoạn C thêm một chi tiết đánh lừa: vòng trong bắt đầu từ `i` chứ không từ 0, nên nó chạy ngắn dần. Ngắn dần không có nghĩa là bậc thấp hơn — đó là điều ví dụ này muốn bạn thấy tận mắt.

@slot thuat-toan

Quy trình phân tích, ba bước, dùng được cho mọi đoạn code có vòng lặp:

1. **Đếm thành công thức chính xác** theo `n`, chưa vội rút gọn gì cả. Ở bước này bạn được phép giữ hằng số và cả những số hạng nhỏ.
2. **Bỏ mọi hằng số nhân.** `n²/2` thành `n²`, `2n` thành `n`.
3. **Chỉ giữ số hạng lớn nhất.** `n²/2 + n/2` còn lại `n²`.

Riêng với đoạn C, bước 1 cần một mẹo nhỏ: khi `i = 0` vòng trong chạy `n` lần, khi `i = 1` chạy `n − 1` lần, cứ thế tới khi `i = n − 1` thì chạy 1 lần. Cộng dãy `n + (n−1) + ... + 1` lại được `n(n+1)/2`. Đây là tổng cấp số cộng, và bạn sẽ gặp lại nó ở rất nhiều bài sau.

@slot chay-tay

Đặt `n = 4` rồi đếm bằng tay để đối chiếu với công thức:

| Đoạn | Đếm tay với n = 4 | Công thức | Rút gọn |
|---|---|---|---|
| A | 16 | n × n = n² | `O(n²)` |
| B | 8 | n + n = 2n | `O(n)` |
| C | 10 | 4 + 3 + 2 + 1 = n(n+1)/2 | `O(n²)` |

Riêng đoạn C, tách rõ từng giá trị của `i` để thấy vì sao ra 10:

| i | j chạy từ i tới 3 | Số lần dem++ | Tích luỹ |
|---|---|---|---|
| 0 | 0, 1, 2, 3 | 4 | 4 |
| 1 | 1, 2, 3 | 3 | 7 |
| 2 | 2, 3 | 2 | 9 |
| 3 | 3 | 1 | 10 |

Đúng 10, khớp với `n(n+1)/2 = 4×5/2 = 10`. Và đúng bằng một nửa của 16 — nhiều người dừng lại ở đây rồi kết luận đoạn C thuộc bậc thấp hơn đoạn A. Phần cuối sẽ cho thấy vì sao kết luận đó sai.

@slot code

Đừng tin vào phép đếm tay. Hãy chạy đúng ba đoạn đó và bắt chương trình khai ra con số:

```cpp
#include <cstdio>

int main() {
    for (int n : {4, 10, 100, 1000}) {
        long long a = 0, b = 0, c = 0;

        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++) a++;

        for (int i = 0; i < n; i++) b++;
        for (int j = 0; j < n; j++) b++;

        for (int i = 0; i < n; i++)
            for (int j = i; j < n; j++) c++;

        printf("n=%-5d A=%-10lld B=%-6lld C=%-10lld  C/A=%.2f\n",
               n, a, b, c, (double)c / a);
    }
}
```

Cột `C/A` in ra `0.62`, `0.55`, `0.50`, `0.50` — tỉ lệ giữa đoạn C và đoạn A tiến dần về đúng một nửa và **dừng ở đó**, không hề nhỏ đi tiếp khi `n` lớn lên. Một tỉ lệ hằng số như vậy chính là dấu hiệu hai đoạn cùng bậc.

@slot toi-uu

**Đoạn A và B khác nhau ở đúng một chữ:** lồng nhau hay nối tiếp. Lồng thì nhân, nối tiếp thì cộng. Với n = 1000, A làm một triệu bước còn B làm hai nghìn bước — chênh nhau năm trăm lần chỉ vì một dấu thụt lề.

**Đoạn C là cái bẫy hay gặp nhất.** Nhìn thì thấy vòng trong "chạy ít hơn hẳn", nên nhiều người kết luận nó nhanh hơn hẳn. Đúng là nó làm ít việc hơn — đúng một nửa. Nhưng `n(n+1)/2 = n²/2 + n/2`, và sau khi bỏ hằng số 1/2 cùng số hạng nhỏ hơn, ta vẫn còn lại `n²`. Nhanh hơn hai lần không cứu được bạn khi `n` tăng lên một nghìn lần.

**Vậy tối ưu thật sự là gì?** Không phải cắt vòng trong cho ngắn lại — đó chính là điều đoạn C đã làm, và nó chỉ mua được hệ số 2. Muốn xuống bậc thì phải bỏ hẳn một vòng lặp, nghĩa là đổi cách nghĩ chứ không sửa code. Ví dụ tiếp theo cho bạn thấy một trường hợp cụ thể: một bài toán bỏ được hai vòng lặp, đi từ `O(n³)` xuống thẳng `O(n)`.

**Rút ra:** "làm ít việc hơn" và "có bậc thấp hơn" là hai chuyện hoàn toàn khác nhau. Chỉ có bậc mới quyết định thuật toán sống hay chết khi dữ liệu lớn lên.

@vidu vd-dpt-so-sanh-hai-cach | Cùng một bài, hai cách giải, chênh nhau bao nhiêu lần

@slot de-bai

Cho một mảng `n` số nguyên, có thể âm, hãy tìm tổng lớn nhất của một đoạn con **liên tiếp** — nghĩa là một dãy các phần tử nằm sát nhau, không được bỏ cách. Mảng luôn có ít nhất một phần tử, nên đáp án luôn tồn tại.

Ví dụ với mảng `[-2, 1, -3, 4, -1, 2, 1, -5, 4]`, đáp án là `6`, ứng với đoạn `[4, -1, 2, 1]`.

Đây đúng là bài LeetCode 53 trong danh sách tự luyện phía dưới, nên giải xong ở đây thì bạn nộp được luôn.

@slot y-tuong

Cách nghĩ đầu tiên ai cũng có: đoạn con thì có hữu hạn, vậy cứ thử hết mọi đoạn rồi lấy cái tổng lớn nhất. Cách đó chạy đúng, và nó tốn `O(n³)`.

Ý tưởng cứu được mọi thứ nằm ở một câu hỏi đổi góc nhìn: thay vì hỏi "đoạn nào tốt nhất trong cả mảng", hãy đi từ trái sang phải và ở mỗi vị trí `i` chỉ hỏi **"đoạn tốt nhất kết thúc đúng tại i là đoạn nào?"**. Câu hỏi nhỏ này có một tính chất quý: trả lời nó ở vị trí `i` chỉ cần biết câu trả lời ở vị trí `i − 1`, không cần nhìn lại toàn bộ mảng.

Cụ thể, đoạn tốt nhất kết thúc tại `i` chỉ có đúng hai khả năng: hoặc nó nối tiếp đoạn tốt nhất kết thúc tại `i − 1`, hoặc nó vứt bỏ quá khứ và bắt đầu lại từ chính `a[i]`. Vứt bỏ quá khứ là lựa chọn đúng khi tổng đang tích luỹ đã âm — một cái đuôi âm chỉ kéo mọi đoạn nối vào nó xuống thấp hơn, giữ lại chẳng ích gì.

@slot thuat-toan

**Cách ngây thơ:** hai vòng lặp chọn điểm đầu `i` và điểm cuối `j` của đoạn, vòng thứ ba cộng lại các phần tử từ `i` tới `j`. Ba vòng lồng nhau, mỗi vòng cỡ `n` bước, nên tổng là `O(n³)`.

**Cách một lượt,** tên gọi chính thức là thuật toán Kadane. Giữ đúng hai biến trong suốt cả quá trình:

- `dangCo` — tổng của đoạn tốt nhất kết thúc tại vị trí đang xét.
- `tot` — tổng lớn nhất từng thấy tính tới lúc này.

Khởi tạo cả hai bằng `a[0]`. Với mỗi `i` từ 1 tới `n − 1`, làm đúng hai phép gán: `dangCo = max(a[i], dangCo + a[i])` rồi `tot = max(tot, dangCo)`. Hết vòng lặp, `tot` chính là đáp án. Một vòng lặp, mỗi bước làm lượng việc cố định, nên đây là `O(n)`.

@slot chay-tay

Chạy cách một lượt trên mảng `[-2, 1, -3, 4, -1, 2, 1, -5, 4]`:

| i | a[i] | dangCo + a[i] | dangCo mới | Chọn gì | tot |
|---|---|---|---|---|---|
| 0 | -2 | — | -2 | Khởi tạo | -2 |
| 1 | 1 | -1 | 1 | Bỏ quá khứ, bắt đầu lại | 1 |
| 2 | -3 | -2 | -2 | Nối tiếp | 1 |
| 3 | 4 | 2 | 4 | Bỏ quá khứ, bắt đầu lại | 4 |
| 4 | -1 | 3 | 3 | Nối tiếp | 4 |
| 5 | 2 | 5 | 5 | Nối tiếp | 5 |
| 6 | 1 | 6 | 6 | Nối tiếp | **6** |
| 7 | -5 | 1 | 1 | Nối tiếp | 6 |
| 8 | 4 | 5 | 5 | Nối tiếp | 6 |

**Hãy để ý hai dòng "bỏ quá khứ".** Ở bước 1, tổng đang tích luỹ là `-2`, nên nối vào chỉ làm số 1 tệ đi. Ở bước 3, tổng đang tích luỹ là `-2`, nối vào số 4 sẽ ra 2 thay vì 4. Cả hai lần, thuật toán vứt bỏ toàn bộ đoạn phía sau mà không hề tiếc — và đó chính là chỗ nó tiết kiệm được hai vòng lặp.

Chú ý thêm bước 7: `dangCo` tụt từ 6 xuống 1 nhưng `tot` vẫn giữ nguyên 6. Đây là lý do phải có hai biến chứ không phải một — một biến để theo dõi hiện tại, một biến để nhớ kỷ lục.

@slot code

```cpp
int cachNgayTho(const vector<int>& a) {
    int n = a.size(), tot = a[0];
    for (int i = 0; i < n; i++)
        for (int j = i; j < n; j++) {
            int s = 0;
            for (int k = i; k <= j; k++) s += a[k];   // cộng lại từ đầu
            tot = max(tot, s);
        }
    return tot;
}

int cachMotLuot(const vector<int>& a) {
    int tot = a[0], dangCo = a[0];
    for (size_t i = 1; i < a.size(); i++) {
        dangCo = max(a[i], dangCo + a[i]);   // bỏ đoạn cũ, hay nối tiếp?
        tot = max(tot, dangCo);
    }
    return tot;
}
```

Hai hàm, cùng một đáp án, cùng một ngôn ngữ. Hàm dưới ngắn hơn hàm trên. Toàn bộ khác biệt về tốc độ nằm trong bảng ở phần kế tiếp.

@slot toi-uu

| n | Cách ngây thơ `O(n³)` | Cách một lượt `O(n)` | Chênh |
|---|---|---|---|
| 100 | ≈ 10⁶ bước | 100 bước | 10 nghìn lần |
| 1000 | ≈ 10⁹ bước, khoảng 10 giây | 1000 bước, tức thì | 1 triệu lần |
| 100000 | ≈ 10¹⁵ bước, khoảng 4 tháng | 10⁵ bước, tức thì | 10 tỉ lần |

**Còn một bậc trung gian đáng biết.** Nếu bạn giữ nguyên hai vòng chọn `i` và `j` nhưng bỏ vòng cộng lại từ đầu — thay bằng cộng dồn `s += a[j]` ngay trong vòng `j` — bạn được `O(n²)` mà gần như không phải nghĩ gì thêm. Đây là kiểu tối ưu đáng làm đầu tiên khi bí: tìm phần công việc đang bị tính lại và nhớ nó lại. Nhưng `O(n²)` với `n = 10⁵` vẫn là `10¹⁰` bước, tức vẫn quá hạn giờ. Chỉ có cách một lượt mới về đích.

**Điều đáng nói nhất:** hai đoạn code trên dài xấp xỉ nhau, cùng viết bằng C++, cùng chạy trên cùng một máy. Không có thủ thuật tối ưu nào ở đây cả, không đổi ngôn ngữ, không mua máy mạnh hơn. Toàn bộ khoảng cách mười tỉ lần đến từ việc chọn đúng cách nghĩ. Đó là lý do người ta học thuật toán.

Ở phần Dự án thực hành, bạn sẽ đo chính hai hàm này bằng công cụ mình tự viết và nhìn thấy bảng trên hiện ra bằng số đo thật chứ không phải số ước lượng.
