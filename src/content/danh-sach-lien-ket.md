@part ly-thuyet

### Mẩu giấy dẫn đường, và cấu tạo một nút

<p class="idea-label">🧩 Ý tưởng cốt lõi</p>

Bạn đang chơi trò truy tìm kho báu. Bạn nhận một mẩu giấy, trên đó ghi một manh mối và chỗ giấu mẩu giấy tiếp theo. Bạn không biết trò chơi có bao nhiêu mẩu giấy, và bạn cũng không nhảy thẳng tới mẩu thứ bảy được — muốn tới đó phải đi qua đúng sáu mẩu trước nó. Nhưng đổi lại, muốn chèn một mẩu mới vào giữa trò chơi thì chỉ cần sửa đúng một dòng địa chỉ trên mẩu trước nó, không phải viết lại cả trò chơi từ đầu.

**Đây là gì?** Một danh sách liên kết là một chuỗi các nút, mỗi nút giữ dữ liệu của mình cộng thêm địa chỉ của nút kế tiếp. Bản thân danh sách chỉ cần giữ một thứ duy nhất: con trỏ tới nút đầu. Từ đó, muốn tới nút thứ i thì đi lần lượt qua i nút, không có cách nào nhảy thẳng tới.

```cpp
struct Nut {
    int giaTri;
    Nut* sau;   // địa chỉ nút kế tiếp, hoặc nullptr nếu đây là nút cuối
};
// Danh sách chỉ là một con trỏ tới nút đầu tiên:
Nut* dauDanhSach;
```

**Vì sao quan trọng?** Đây là cấu trúc dữ liệu đầu tiên bạn gặp mà bộ nhớ của nó không nằm liên tục. Mảng ở bài trước dồn mọi phần tử sát nhau nên tính được địa chỉ bằng một phép nhân; danh sách liên kết thì mỗi nút có thể nằm ở bất kỳ đâu trong bộ nhớ, và thứ duy nhất nối chúng lại là các con trỏ. Đánh đổi đó — mất khả năng nhảy thẳng, đổi lại khả năng chèn xoá không cần dịch chuyển gì — là chủ đề chính của cả bài.

### Bảng đánh đổi với mảng

So sánh trực diện các thao tác thường dùng:

| Thao tác | Mảng | Danh sách liên kết |
|---|---|---|
| Đọc phần tử thứ i | O(1) | O(n) — phải đi từ đầu |
| Thêm vào đầu | O(n) — phải dịch cả mảng | O(1) |
| Thêm vào cuối | O(1) khấu trừ | O(1) nếu giữ con trỏ đuôi |
| Chèn khi đã cầm con trỏ tới chỗ chèn | O(n) — vẫn phải dịch | O(1) — chỉ sửa liên kết |
| Tìm theo giá trị | O(n) | O(n) |
| Bộ nhớ phụ cho mỗi phần tử | 0 | Một con trỏ (hoặc hai, nếu là danh sách đôi) |
| Thân thiện với cache | Rất tốt, đọc liên tục | Kém, các nút rải rác |

**Điểm mấu chốt cần nói rõ:** danh sách liên kết chèn xoá O(1) **chỉ khi đã cầm sẵn con trỏ** tới đúng chỗ cần chèn hoặc xoá. Nếu bạn chỉ có một giá trị và phải tìm ra chỗ đó trước, việc tìm vẫn tốn O(n), và khi đó danh sách liên kết không hề thắng mảng — cả hai cùng O(n) cho toàn bộ thao tác.

### Vì sao mảng thường thắng trong thực tế

Nhìn bảng trên, danh sách liên kết có vẻ ngang ngửa hoặc hơn mảng ở nhiều dòng. Nhưng trong thực tế, mảng vẫn thường được chọn hơn — vì bảng chi phí chỉ đếm số phép toán, không đếm chi phí đi tới bộ nhớ.

Mảng nằm liên tục nên khi bạn đọc phần tử thứ i, máy tính đã tự động nạp sẵn cả một khối các phần tử lân cận vào bộ nhớ đệm nhanh (cache) — đây là locality đã nói ở bài Độ phức tạp thuật toán và nhắc lại ở phần cuối bài Mảng. Đọc phần tử kế tiếp gần như miễn phí vì nó đã có sẵn trong cache.

Các nút của danh sách liên kết thì nằm rải rác khắp bộ nhớ, tuỳ nơi bộ nhớ cấp cho mỗi lần tạo nút mới. Mỗi lần đi sang nút kế tiếp là một lần máy tính phải nhảy tới một vùng nhớ hoàn toàn khác — gọi là trượt cache — và việc đó chậm hơn đọc liên tục rất nhiều lần, dù cả hai đều "chỉ một bước" theo cách đếm Big O. Đây là lý do bạn sẽ thấy ở bài tập cuối bài: dù cộng tổng một triệu phần tử là O(n) trên cả hai cấu trúc, thời gian thật trên danh sách liên kết có thể chậm hơn hẳn con số O(n) gợi ý.

### Đơn, đôi, vòng, và nút giả

Có ba biến thể thường gặp:

| Loại | Thêm được gì | Tốn thêm gì |
|---|---|---|
| Đơn | Cấu trúc đơn giản nhất, duyệt một chiều | Không tốn gì thêm ngoài con trỏ sau |
| Đôi | Duyệt hai chiều, xoá O(1) khi đã cầm chính nút cần xoá | Thêm một con trỏ trước cho mỗi nút |
| Vòng | Từ nút cuối quay lại được nút đầu, hữu ích cho lịch quay vòng | Dễ lặp vô hạn nếu điều kiện dừng viết sai |

Danh sách đôi cho xoá O(1) khi cầm chính nút cần xoá — vì có con trỏ trước, ta nối trực tiếp nút trước và nút sau với nhau, không cần tìm nút trước. Đây đúng là điều một bộ nhớ đệm kiểu LRU cần: nó luôn cầm sẵn con trỏ tới nút vừa dùng và phải xoá nút cũ nhất với chi phí O(1).

Một mẹo nhỏ nhưng quan trọng: thêm một **nút giả** rỗng đứng trước nút đầu tiên. Không có nút giả, code phải xử lý riêng hai trường hợp: danh sách đang trống, và đang xoá đúng nút đầu. Có nút giả, mọi nút thật — kể cả nút đầu — luôn có một nút phía trước, nên hai trường hợp đặc biệt đó biến mất, code chạy chung một đường xử lý.

```cpp
void push_front(Nut* giaDauDanhSach, int giaTri) {
    Nut* moi = new Nut{giaTri, giaDauDanhSach->sau};
    giaDauDanhSach->sau = moi;   // luôn đúng, kể cả khi danh sách đang trống
}

void erase_after(Nut* truoc) {
    Nut* canXoa = truoc->sau;
    truoc->sau = canXoa->sau;   // gỡ liên kết trước khi giải phóng
    delete canXoa;
}
```

### Hai con trỏ nhanh chậm, và chuyện bộ nhớ

Một khuôn mẫu dùng đúng đặc điểm của danh sách liên kết: hai con trỏ đi với tốc độ khác nhau trên cùng một danh sách, một đi một nhịp, một đi hai nhịp mỗi bước. Khi con trỏ nhanh chạm cuối, con trỏ chậm đang đứng đúng ở giữa danh sách — tìm nút giữa xong trong một lượt duyệt. Cũng đúng khuôn mẫu này, nếu danh sách có chu trình, hai con trỏ sẽ gặp nhau tại một điểm nào đó trong chu trình — cách phát hiện chu trình kiểu rùa và thỏ. Khuôn mẫu hai con trỏ này sẽ quay lại thành một nhóm kiến thức riêng ở Chương 2, dùng cho cả mảng.

Còn một chuyện không liên quan tới thời gian chạy nhưng dễ gây lỗi nặng: mỗi nút của danh sách liên kết được cấp phát riêng, nên phải giải phóng riêng từng nút, không thể giải phóng "cả danh sách" bằng một lệnh như mảng. Xoá nửa vời — ví dụ giải phóng nút nhưng quên gỡ liên kết trỏ tới nó từ nút trước — để lại con trỏ treo hoặc rò rỉ bộ nhớ. Và nếu việc rò rỉ đó nằm trong một vòng lặp chạy nhiều lần, chương trình chạy càng lâu sẽ ăn bộ nhớ càng nhiều rồi chết.

@part vi-sao

### Vì sao danh sách liên kết đáng học

**Nó là bài học đầu tiên về con trỏ và cấu trúc tự trỏ tới nhau.** Cây, đồ thị, hàng đợi kiểu LRU — mọi cấu trúc phức tạp hơn ở các chương sau đều là biến thể của ý tưởng "một nút giữ dữ liệu cộng địa chỉ nút khác". Hiểu chắc danh sách liên kết đơn là nền để hiểu mọi thứ dựa trên con trỏ về sau.

**Nó dạy bạn phân biệt chi phí lý thuyết với chi phí thật.** Bảng đánh đổi cho danh sách liên kết những dòng O(1) đẹp mắt, nhưng thực tế mảng vẫn thắng ở nhiều việc vì locality và cache — điều Big O không đếm. Đây là bài học về việc đọc bảng độ phức tạp một cách tỉnh táo, không phải chọn cấu trúc dữ liệu chỉ vì cột O nhỏ hơn.

**Khuôn mẫu hai con trỏ nhanh chậm xuất hiện khắp nơi.** Từ tìm nút giữa, phát hiện chu trình, tới các bài toán trên mảng ở Chương 2 — một khi đã hiểu bản chất "khoảng cách giảm đều mỗi bước" thì nhận ra dạng bài này rất nhanh, dù đề bài diễn đạt khác nhau đến đâu.

**Và nó khép lại đủ ba mảnh của một thư viện dùng được thật.** Sau bài này bạn có Vec, Str, List do chính bạn viết — không phải bài tập rời rạc, mà là những module MVP cuối chương ghép lại thành sản phẩm chạy được đầu tiên.

@part vi-du

@vidu vd-dsll-dao-danh-sach | Đảo ngược danh sách liên kết bằng ba con trỏ, chạy tay từng bước

@slot de-bai

Cho danh sách liên kết đơn `1 → 2 → 3 → 4`. Hãy đảo ngược nó thành `4 → 3 → 2 → 1` và trả về nút đầu mới.

Ràng buộc quan trọng, và cũng là chỗ khiến bài này đáng làm: **không được cấp phát nút mới**. Phải đảo tại chỗ, chỉ bằng cách sửa các con trỏ `sau` của những nút đang có, dùng thêm tối đa vài biến.

@slot y-tuong

Đảo danh sách nghe to tát, nhưng thực ra nó chỉ là làm đi làm lại đúng một việc tí hon: **lấy một nút và bẻ mũi tên của nó quay ngược lại**. Làm việc đó với từng nút, từ trái sang phải, là xong.

Có đúng một rắc rối. Ngay khi bạn bẻ mũi tên của nút hiện tại quay về phía sau, bạn **mất luôn đường đi tiếp** — vì con trỏ vừa bị ghi đè chính là thứ duy nhất chỉ tới phần còn lại của danh sách. Trong mảng bạn còn có chỉ số để dò lại; ở đây thì không, phần bị mất là mất thật.

Vậy nên cần ba biến chứ không phải hai: `truoc` nhớ phần đã đảo xong, `hien_tai` là nút đang xử lý, và `sau` — cái quan trọng nhất — giữ hộ đường đi tiếp **trước khi** ta phá nó.

@slot thuat-toan

Khởi tạo `truoc = nullptr` và `hien_tai = dau`. Chừng nào `hien_tai` chưa là `nullptr`, lặp lại đúng bốn dòng, và **thứ tự bốn dòng này là bất di bất dịch**:

1. `sau = hien_tai->sau` — cất đường đi tiếp vào chỗ an toàn.
2. `hien_tai->sau = truoc` — bẻ mũi tên quay ngược.
3. `truoc = hien_tai` — nút vừa xử lý trở thành phần đã đảo xong.
4. `hien_tai = sau` — bước sang nút kế tiếp bằng cái đã cất ở bước 1.

Khi vòng lặp dừng, `hien_tai` đã ra khỏi danh sách còn `truoc` đang đứng ở nút cuối cùng của danh sách cũ — tức nút đầu của danh sách mới. Trả về `truoc`, không phải `hien_tai`.

Vì sao `truoc` khởi tạo bằng `nullptr` chứ không phải nút nào đó? Vì nút 1, sau khi đảo, phải trở thành nút cuối — mà nút cuối thì trỏ vào `nullptr`. Khởi tạo như vậy làm chuyện đó tự xảy ra ở vòng lặp đầu tiên, không cần xử lý riêng.

@slot chay-tay

Ba con trỏ: `truoc` (ban đầu `nullptr`), `hien_tai` (ban đầu trỏ vào nút 1), và `sau` dùng để lưu tạm.

| Bước | truoc | hien_tai | sau | Trạng thái danh sách |
|---|---|---|---|---|
| 0 (khởi đầu) | nullptr | 1 | — | 1 → 2 → 3 → 4 |
| 1 | nullptr | 1 | 2 | lưu sau = 2 trước khi sửa gì |
| 2 | 1 | 2 | 2 | 1 ← đã quay đầu, hien_tai chuyển sang 2 |
| 3 | 1 | 2 | 3 | lưu sau = 3 |
| 4 | 2 | 3 | 3 | 2 ← 1, hien_tai chuyển sang 3 |
| 5 | 2 | 3 | 4 | lưu sau = 4 |
| 6 | 3 | 4 | 4 | 3 ← 2 ← 1, hien_tai chuyển sang 4 |
| 7 | 3 | 4 | nullptr | lưu sau = nullptr |
| 8 (kết thúc) | 4 | nullptr | nullptr | 4 → 3 → 2 → 1 |

Để ý các bước lẻ và bước chẵn xen kẽ nhau: bước lẻ chỉ cất `sau`, bước chẵn mới thật sự bẻ mũi tên và dịch hai con trỏ kia. Và ở bước 8, `hien_tai` thành `nullptr` nên vòng lặp dừng, còn `truoc` đang nằm ở nút 4 — đúng nút đầu mới.

@slot code

```cpp
Nut* dao(Nut* dau) {
    Nut* truoc = nullptr;
    Nut* hien_tai = dau;
    while (hien_tai != nullptr) {
        Nut* sau = hien_tai->sau;   // lưu trước khi sửa
        hien_tai->sau = truoc;      // đảo hướng con trỏ
        truoc = hien_tai;
        hien_tai = sau;
    }
    return truoc;   // nút đầu mới
}
```

Hai ca biên đáng kiểm tra trước khi nộp, cả hai đều chạy đúng mà không cần thêm dòng nào: danh sách rỗng (`dau == nullptr`) thì vòng lặp không chạy lần nào và hàm trả về `nullptr`; danh sách một nút thì chạy đúng một vòng, nút đó tự trỏ vào `nullptr` và trở thành đầu mới. Nếu code của bạn cần `if` riêng cho hai ca này, gần như chắc chắn bạn đang viết phức tạp hơn mức cần thiết.

@slot toi-uu

**Chỗ then chốt:** phải lưu `sau` trước khi sửa con trỏ của `hien_tai`. Nếu sửa `hien_tai->sau = truoc` trước, bạn đã ghi đè mất địa chỉ của phần còn lại danh sách, và không có cách nào tìm lại — phần đó bị mất vĩnh viễn khỏi chương trình, không phải lỗi có thể debug bằng cách in ra thêm, vì dữ liệu đã thật sự biến mất.

**Chi phí:** O(n) thời gian — đi qua mỗi nút đúng một lần. O(1) bộ nhớ phụ — chỉ ba con trỏ, không phụ thuộc độ dài danh sách. Đây là lý do bài này được hỏi nhiều khi phỏng vấn: nó phân biệt rõ người hiểu con trỏ đang làm gì với người chỉ thuộc lòng đoạn code.

**Có tối ưu được nữa không?** Về bậc thì không: mỗi nút bắt buộc phải bị chạm ít nhất một lần để mũi tên của nó đổi chiều, nên `O(n)` đã là sàn. Về bộ nhớ cũng vậy, `O(1)` không thể tốt hơn. Bản trên đã tối ưu.

**Nhưng có hai cách viết khác đáng biết, và cả hai đều tệ hơn** — biết vì sao chúng tệ mới là phần có giá trị:

- **Đổ ra mảng rồi dựng lại danh sách theo thứ tự ngược.** Vẫn `O(n)` thời gian nhưng tốn thêm `O(n)` bộ nhớ cho mảng. Đổi bộ nhớ lấy sự dễ nghĩ, và ở đây bạn chẳng nhận lại được gì vì bản ba con trỏ cũng chỉ có bốn dòng.
- **Đệ quy.** Viết ngắn và trông đẹp, nhưng mỗi nút chiếm một khung ngăn xếp nên bộ nhớ phụ là `O(n)` ẩn — và với danh sách một triệu nút, chương trình tràn ngăn xếp rồi chết. Đây đúng là cái bẫy đã gặp ở bài Đệ quy: `O(n)` bộ nhớ ngăn xếp không hiện ra trong code nên rất dễ quên.

**Còn một cách rẻ hơn tất cả, nếu bài toán cho phép:** đừng đảo gì cả. Nếu bạn chỉ cần **đọc** danh sách theo thứ tự ngược chứ không cần bản thân danh sách bị đảo, hãy dùng danh sách liên kết đôi và đi ngược bằng con trỏ `truoc` có sẵn — `O(n)` để đọc, và không sửa dữ liệu gốc chút nào. Câu hỏi "mình có thật sự cần đảo không" thường đáng giá hơn mọi tối ưu vi mô.

@vidu vd-dsll-rua-tho-phat-hien-chu-trinh | Rùa và thỏ: phát hiện danh sách có chu trình

@slot de-bai

Cho một danh sách liên kết đơn. Hãy cho biết nó có **chu trình** hay không — nghĩa là có nút nào đó trỏ ngược về một nút đã đi qua, khiến việc duyệt danh sách không bao giờ gặp `nullptr` mà chạy vòng vòng mãi.

Ràng buộc: chỉ được dùng `O(1)` bộ nhớ phụ. Nếu được thoải mái bộ nhớ thì bài này quá dễ, và phần thú vị nằm đúng ở chỗ bị chặn.

Ví dụ để chạy tay: danh sách 6 nút `1 → 2 → 3 → 4 → 5 → 6`, nhưng nút 6 không trỏ ra ngoài mà trỏ ngược về nút 3, tạo thành chu trình `3 → 4 → 5 → 6 → 3 → ...`.

@slot y-tuong

Cách hiển nhiên là ghi lại mọi nút đã thăm vào một tập hợp, gặp lại nút cũ thì kết luận có chu trình. Đúng, nhưng tốn `O(n)` bộ nhớ — vi phạm ràng buộc.

Ý tưởng cứu bài lấy từ đường chạy điền kinh: **cho hai người chạy vòng quanh sân với tốc độ khác nhau, người nhanh sớm muộn cũng đuổi kịp và gặp lại người chậm**. Điều đó chỉ xảy ra được nếu đường chạy là một vòng khép kín. Trên một đường thẳng, người nhanh chỉ đơn giản về đích trước rồi hết đường.

Chuyển sang danh sách liên kết: cho hai con trỏ cùng xuất phát từ nút đầu, **rùa** đi 1 nhịp mỗi bước, **thỏ** đi 2 nhịp mỗi bước. Nếu chúng gặp nhau thì có chu trình. Nếu thỏ chạm `nullptr` thì danh sách có điểm kết thúc, tức không có chu trình. Bộ nhớ dùng thêm: đúng hai con trỏ.

@slot thuat-toan

Đặt `rua = dau` và `tho = dau`. Lặp:

1. Nếu `tho == nullptr` hoặc `tho->sau == nullptr` thì dừng và trả về "không có chu trình" — thỏ đã ra khỏi danh sách. Phải kiểm tra **cả hai**, vì bước sau thỏ nhảy 2 nhịp nên nó cần cả nút hiện tại lẫn nút kế tiếp đều tồn tại.
2. `rua = rua->sau` (1 nhịp), `tho = tho->sau->sau` (2 nhịp).
3. Nếu `rua == tho` thì trả về "có chu trình".

Vì sao thuật toán chắc chắn dừng, chứ không chạy mãi? Xét hai trường hợp. Không có chu trình: thỏ đi nhanh gấp đôi nên nó chạm cuối danh sách sau khoảng `n/2` bước, điều kiện ở bước 1 bắt được. Có chu trình: cả hai rồi cũng vào trong vòng, và lúc đó khoảng cách giữa chúng — đếm theo chiều đi, vòng quanh chu trình — giảm đúng 1 sau mỗi bước, vì thỏ nhanh hơn rùa đúng 1 nhịp. Một số nguyên không âm giảm đều 1 mỗi bước chắc chắn chạm 0, và chạm 0 nghĩa là hai con trỏ trùng nhau.

Đó cũng là lý do bước nhảy của thỏ phải là 2 chứ không phải 3 hay 5. Với hiệu tốc độ đúng bằng 1, khoảng cách giảm từng nấc một nên không thể nhảy cóc qua số 0 — tức không thể vượt mặt rùa mà không hề trùng vào nó.

@slot chay-tay

Rùa đi 1 nhịp mỗi bước, thỏ đi 2 nhịp mỗi bước, cả hai bắt đầu từ nút 1.

| Bước | Rùa (vị trí) | Thỏ (vị trí) | Nhận xét |
|---|---|---|---|
| 0 | 1 | 1 | Cùng xuất phát |
| 1 | 2 | 3 | Thỏ đi 2 nhịp: 1 → 2 → 3 |
| 2 | 3 | 5 | Thỏ đã vào chu trình |
| 3 | 4 | 3 | Thỏ đi hết vòng 6→3, quay lại nút 3 |
| 4 | 5 | 5 | Rùa và thỏ trùng nhau tại nút 5 |

Đối chiếu với danh sách **không** có chu trình, cùng 6 nút nhưng nút 6 trỏ vào `nullptr`:

<table class="formula-table">
      <tr><th>Bước</th><th>Rùa</th><th>Thỏ</th><th>Nhận xét</th></tr>
      <tr><td>0</td><td>1</td><td>1</td><td>Cùng xuất phát</td></tr>
      <tr><td>1</td><td>2</td><td>3</td><td>—</td></tr>
      <tr><td>2</td><td>3</td><td>5</td><td>—</td></tr>
      <tr><td>3</td><td>4</td><td>nullptr</td><td>Thỏ đi 5 &#8594; 6 &#8594; nullptr, hết danh sách</td></tr>
      <tr><td>4</td><td colspan="3">Dừng: thỏ chạm nullptr &#8594; kết luận không có chu trình</td></tr>
    </table>

Hai bảng, cùng một thuật toán, hai kết luận trái ngược — và không bảng nào cần tới một byte bộ nhớ phụ nào ngoài hai con trỏ.

@slot code

```cpp
bool coChuTrinh(Nut* dau) {
    Nut* rua = dau;
    Nut* tho = dau;
    while (tho != nullptr && tho->sau != nullptr) {
        rua = rua->sau;          // 1 nhịp
        tho = tho->sau->sau;     // 2 nhịp
        if (rua == tho) return true;
    }
    return false;   // thỏ chạm nullptr: danh sách có điểm kết thúc
}
```

Ba chỗ dễ viết sai, đều là lỗi im lặng chứ không báo gì:

- **Quên kiểm tra `tho->sau != nullptr`.** Dòng `tho->sau->sau` sẽ đọc con trỏ từ địa chỉ `nullptr` và chương trình sập — hoặc tệ hơn, chạy được trên máy bạn mà sập trên máy chấm.
- **So sánh `rua->giaTri == tho->giaTri` thay vì `rua == tho`.** Hai nút khác nhau hoàn toàn có thể chứa cùng một giá trị. Ở đây ta so **địa chỉ**, tức "có phải cùng một nút không", chứ không so nội dung.
- **Kiểm tra `rua == tho` trước khi dịch chuyển.** Cả hai cùng xuất phát ở nút đầu nên chúng bằng nhau ngay từ bước 0, và hàm sẽ báo có chu trình với mọi danh sách. Phải dịch trước, so sau.

@slot toi-uu

**Chỗ then chốt:** một khi cả hai con trỏ đã vào trong chu trình, mỗi bước khoảng cách giữa thỏ và rùa — tính theo số nút trong chu trình — giảm đúng 1, vì thỏ đi nhanh hơn rùa đúng 1 nhịp mỗi bước. Một khoảng cách nguyên không âm giảm đều mỗi bước chắc chắn về 0, nên rùa và thỏ chắc chắn gặp nhau. Nếu danh sách không có chu trình, thỏ sẽ ra khỏi danh sách (gặp `nullptr`) trước khi hai con trỏ có cơ hội gặp nhau — đó là dấu hiệu để kết luận không có chu trình.

**Chi phí:** O(n) thời gian, O(1) bộ nhớ phụ — hơn hẳn cách dùng bảng băm ghi lại các nút đã thăm, vốn cũng O(n) thời gian nhưng tốn thêm O(n) bộ nhớ để lưu tập nút đã thăm.

**Thuật toán này còn cho không bạn hai thứ nữa**, và cả hai đều được hỏi trong phỏng vấn ngay sau câu đầu tiên:

- **Tìm nút bắt đầu chu trình.** Sau khi rùa và thỏ gặp nhau, đưa một con trỏ về nút đầu, giữ con trỏ kia tại điểm gặp, rồi cho **cả hai** cùng đi 1 nhịp mỗi bước. Chỗ chúng gặp nhau lần thứ hai chính là nút mở đầu chu trình — ở ví dụ trên là nút 3. Kết quả này ra từ một phép tính khoảng cách nho nhỏ, và nó vẫn giữ nguyên `O(1)` bộ nhớ.
- **Đo độ dài chu trình.** Từ điểm gặp, giữ một con trỏ đứng yên, cho con trỏ kia đi cho tới khi quay lại chính chỗ đó. Số bước đã đi là độ dài vòng — ở đây là 4.

Cái tên chính thức của kỹ thuật này là **Floyd cycle detection**, hay gọi dân dã là thuật toán rùa và thỏ. Ý tưởng "hai con trỏ chạy khác tốc độ" còn dùng được để tìm nút giữa danh sách trong một lượt duy nhất, và bạn sẽ gặp lại chính nó dưới dạng kỹ thuật hai con trỏ ở Chương 2.
