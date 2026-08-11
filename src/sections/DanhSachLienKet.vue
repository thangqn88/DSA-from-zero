<template>
<section id="danh-sach-lien-ket" class="day-section" data-sid="danh-sach-lien-ket" v-show="active">

<h2>Danh sách liên kết</h2>

<LessonGoal :sid="'danh-sach-lien-ket'">
  <ul><li v-for="(g, i) in data.goal" :key="i">{{ g }}</li></ul>
</LessonGoal>

<LessonPart :sid="'danh-sach-lien-ket'" part="ly-thuyet">

<h3 id="auto-dsll-mau-giay-va-nut">Mẩu giấy dẫn đường, và cấu tạo một nút</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Bạn đang chơi trò truy tìm kho báu. Bạn nhận một mẩu giấy, trên đó ghi một manh mối và chỗ giấu mẩu giấy tiếp theo. Bạn không biết trò chơi có bao nhiêu mẩu giấy, và bạn cũng không nhảy thẳng tới mẩu thứ bảy được — muốn tới đó phải đi qua đúng sáu mẩu trước nó. Nhưng đổi lại, muốn chèn một mẩu mới vào giữa trò chơi thì chỉ cần sửa đúng một dòng địa chỉ trên mẩu trước nó, không phải viết lại cả trò chơi từ đầu.</p>

<p><strong>Đây là gì?</strong> Một danh sách liên kết là một chuỗi các nút, mỗi nút giữ dữ liệu của mình cộng thêm địa chỉ của nút kế tiếp. Bản thân danh sách chỉ cần giữ một thứ duy nhất: con trỏ tới nút đầu. Từ đó, muốn tới nút thứ i thì đi lần lượt qua i nút, không có cách nào nhảy thẳng tới.</p>

<pre v-pre><code>struct Nut {
    int giaTri;
    Nut* sau;   // địa chỉ nút kế tiếp, hoặc nullptr nếu đây là nút cuối
};
// Danh sách chỉ là một con trỏ tới nút đầu tiên:
Nut* dauDanhSach;</code></pre>

<p><strong>Vì sao quan trọng?</strong> Đây là cấu trúc dữ liệu đầu tiên bạn gặp mà bộ nhớ của nó không nằm liên tục. Mảng ở bài trước dồn mọi phần tử sát nhau nên tính được địa chỉ bằng một phép nhân; danh sách liên kết thì mỗi nút có thể nằm ở bất kỳ đâu trong bộ nhớ, và thứ duy nhất nối chúng lại là các con trỏ. Đánh đổi đó — mất khả năng nhảy thẳng, đổi lại khả năng chèn xoá không cần dịch chuyển gì — là chủ đề chính của cả bài.</p>

<h3 id="auto-dsll-bang-danh-doi">Bảng đánh đổi với mảng</h3>

<p>So sánh trực diện các thao tác thường dùng:</p>

<table class="formula-table">
  <tr><th>Thao tác</th><th>Mảng</th><th>Danh sách liên kết</th></tr>
  <tr><td>Đọc phần tử thứ i</td><td>O(1)</td><td>O(n) — phải đi từ đầu</td></tr>
  <tr><td>Thêm vào đầu</td><td>O(n) — phải dịch cả mảng</td><td>O(1)</td></tr>
  <tr><td>Thêm vào cuối</td><td>O(1) khấu trừ</td><td>O(1) nếu giữ con trỏ đuôi</td></tr>
  <tr><td>Chèn khi đã cầm con trỏ tới chỗ chèn</td><td>O(n) — vẫn phải dịch</td><td>O(1) — chỉ sửa liên kết</td></tr>
  <tr><td>Tìm theo giá trị</td><td>O(n)</td><td>O(n)</td></tr>
  <tr><td>Bộ nhớ phụ cho mỗi phần tử</td><td>0</td><td>Một con trỏ (hoặc hai, nếu là danh sách đôi)</td></tr>
  <tr><td>Thân thiện với cache</td><td>Rất tốt, đọc liên tục</td><td>Kém, các nút rải rác</td></tr>
</table>

<p><strong>Điểm mấu chốt cần nói rõ:</strong> danh sách liên kết chèn xoá O(1) <strong>chỉ khi đã cầm sẵn con trỏ</strong> tới đúng chỗ cần chèn hoặc xoá. Nếu bạn chỉ có một giá trị và phải tìm ra chỗ đó trước, việc tìm vẫn tốn O(n), và khi đó danh sách liên kết không hề thắng mảng — cả hai cùng O(n) cho toàn bộ thao tác.</p>

<h3 id="auto-dsll-vi-sao-mang-thang">Vì sao mảng thường thắng trong thực tế</h3>

<p>Nhìn bảng trên, danh sách liên kết có vẻ ngang ngửa hoặc hơn mảng ở nhiều dòng. Nhưng trong thực tế, mảng vẫn thường được chọn hơn — vì bảng chi phí chỉ đếm số phép toán, không đếm chi phí đi tới bộ nhớ.</p>

<p>Mảng nằm liên tục nên khi bạn đọc phần tử thứ i, máy tính đã tự động nạp sẵn cả một khối các phần tử lân cận vào bộ nhớ đệm nhanh (cache) — đây là locality đã nói ở bài Độ phức tạp thuật toán và nhắc lại ở phần cuối bài Mảng. Đọc phần tử kế tiếp gần như miễn phí vì nó đã có sẵn trong cache.</p>

<p>Các nút của danh sách liên kết thì nằm rải rác khắp bộ nhớ, tuỳ nơi bộ nhớ cấp cho mỗi lần tạo nút mới. Mỗi lần đi sang nút kế tiếp là một lần máy tính phải nhảy tới một vùng nhớ hoàn toàn khác — gọi là trượt cache — và việc đó chậm hơn đọc liên tục rất nhiều lần, dù cả hai đều "chỉ một bước" theo cách đếm Big O. Đây là lý do bạn sẽ thấy ở bài tập cuối bài: dù cộng tổng một triệu phần tử là O(n) trên cả hai cấu trúc, thời gian thật trên danh sách liên kết có thể chậm hơn hẳn con số O(n) gợi ý.</p>

<h3 id="auto-dsll-don-doi-vong">Đơn, đôi, vòng, và nút giả</h3>

<p>Có ba biến thể thường gặp:</p>

<table class="formula-table">
  <tr><th>Loại</th><th>Thêm được gì</th><th>Tốn thêm gì</th></tr>
  <tr><td>Đơn</td><td>Cấu trúc đơn giản nhất, duyệt một chiều</td><td>Không tốn gì thêm ngoài con trỏ sau</td></tr>
  <tr><td>Đôi</td><td>Duyệt hai chiều, xoá O(1) khi đã cầm chính nút cần xoá</td><td>Thêm một con trỏ trước cho mỗi nút</td></tr>
  <tr><td>Vòng</td><td>Từ nút cuối quay lại được nút đầu, hữu ích cho lịch quay vòng</td><td>Dễ lặp vô hạn nếu điều kiện dừng viết sai</td></tr>
</table>

<p>Danh sách đôi cho xoá O(1) khi cầm chính nút cần xoá — vì có con trỏ trước, ta nối trực tiếp nút trước và nút sau với nhau, không cần tìm nút trước. Đây đúng là điều một bộ nhớ đệm kiểu LRU cần: nó luôn cầm sẵn con trỏ tới nút vừa dùng và phải xoá nút cũ nhất với chi phí O(1).</p>

<p>Một mẹo nhỏ nhưng quan trọng: thêm một <strong>nút giả</strong> rỗng đứng trước nút đầu tiên. Không có nút giả, code phải xử lý riêng hai trường hợp: danh sách đang trống, và đang xoá đúng nút đầu. Có nút giả, mọi nút thật — kể cả nút đầu — luôn có một nút phía trước, nên hai trường hợp đặc biệt đó biến mất, code chạy chung một đường xử lý.</p>

<pre v-pre><code>void push_front(Nut* giaDauDanhSach, int giaTri) {
    Nut* moi = new Nut{giaTri, giaDauDanhSach-&gt;sau};
    giaDauDanhSach-&gt;sau = moi;   // luôn đúng, kể cả khi danh sách đang trống
}

void erase_after(Nut* truoc) {
    Nut* canXoa = truoc-&gt;sau;
    truoc-&gt;sau = canXoa-&gt;sau;   // gỡ liên kết trước khi giải phóng
    delete canXoa;
}</code></pre>

<h3 id="auto-dsll-hai-con-tro-va-bo-nho">Hai con trỏ nhanh chậm, và chuyện bộ nhớ</h3>

<p>Một khuôn mẫu dùng đúng đặc điểm của danh sách liên kết: hai con trỏ đi với tốc độ khác nhau trên cùng một danh sách, một đi một nhịp, một đi hai nhịp mỗi bước. Khi con trỏ nhanh chạm cuối, con trỏ chậm đang đứng đúng ở giữa danh sách — tìm nút giữa xong trong một lượt duyệt. Cũng đúng khuôn mẫu này, nếu danh sách có chu trình, hai con trỏ sẽ gặp nhau tại một điểm nào đó trong chu trình — cách phát hiện chu trình kiểu rùa và thỏ. Khuôn mẫu hai con trỏ này sẽ quay lại thành một nhóm kiến thức riêng ở Chương 2, dùng cho cả mảng.</p>

<p>Còn một chuyện không liên quan tới thời gian chạy nhưng dễ gây lỗi nặng: mỗi nút của danh sách liên kết được cấp phát riêng, nên phải giải phóng riêng từng nút, không thể giải phóng "cả danh sách" bằng một lệnh như mảng. Xoá nửa vời — ví dụ giải phóng nút nhưng quên gỡ liên kết trỏ tới nó từ nút trước — để lại con trỏ treo hoặc rò rỉ bộ nhớ. Và nếu việc rò rỉ đó nằm trong một vòng lặp chạy nhiều lần, chương trình chạy càng lâu sẽ ăn bộ nhớ càng nhiều rồi chết.</p>

</LessonPart>

<LessonPart :sid="'danh-sach-lien-ket'" part="vi-sao">

<h3 id="auto-dsll-vi-sao">Vì sao danh sách liên kết đáng học</h3>

<p><strong>Nó là bài học đầu tiên về con trỏ và cấu trúc tự trỏ tới nhau.</strong> Cây, đồ thị, hàng đợi kiểu LRU — mọi cấu trúc phức tạp hơn ở các chương sau đều là biến thể của ý tưởng "một nút giữ dữ liệu cộng địa chỉ nút khác". Hiểu chắc danh sách liên kết đơn là nền để hiểu mọi thứ dựa trên con trỏ về sau.</p>

<p><strong>Nó dạy bạn phân biệt chi phí lý thuyết với chi phí thật.</strong> Bảng đánh đổi cho danh sách liên kết những dòng O(1) đẹp mắt, nhưng thực tế mảng vẫn thắng ở nhiều việc vì locality và cache — điều Big O không đếm. Đây là bài học về việc đọc bảng độ phức tạp một cách tỉnh táo, không phải chọn cấu trúc dữ liệu chỉ vì cột O nhỏ hơn.</p>

<p><strong>Khuôn mẫu hai con trỏ nhanh chậm xuất hiện khắp nơi.</strong> Từ tìm nút giữa, phát hiện chu trình, tới các bài toán trên mảng ở Chương 2 — một khi đã hiểu bản chất "khoảng cách giảm đều mỗi bước" thì nhận ra dạng bài này rất nhanh, dù đề bài diễn đạt khác nhau đến đâu.</p>

<p><strong>Và nó khép lại đủ ba mảnh của một thư viện dùng được thật.</strong> Sau bài này bạn có Vec, Str, List do chính bạn viết — không phải bài tập rời rạc, mà là những module MVP cuối chương ghép lại thành sản phẩm chạy được đầu tiên.</p>

</LessonPart>

<LessonPart :sid="'danh-sach-lien-ket'" part="quiz">
  <QuizBlock :questions="data.quiz" />
</LessonPart>

<LessonPart :sid="'danh-sach-lien-ket'" part="vi-du">

<WorkedExample id="vd-dsll-dao-danh-sach" title="Đảo ngược danh sách liên kết bằng ba con trỏ, chạy tay từng bước">

  <template #de-bai>
    <p>Cho danh sách liên kết đơn <code>1 &#8594; 2 &#8594; 3 &#8594; 4</code>. Hãy đảo ngược nó thành <code>4 &#8594; 3 &#8594; 2 &#8594; 1</code> và trả về nút đầu mới.</p>

    <p>Ràng buộc quan trọng, và cũng là chỗ khiến bài này đáng làm: <strong>không được cấp phát nút mới</strong>. Phải đảo tại chỗ, chỉ bằng cách sửa các con trỏ <code>sau</code> của những nút đang có, dùng thêm tối đa vài biến.</p>
  </template>

  <template #y-tuong>
    <p>Đảo danh sách nghe to tát, nhưng thực ra nó chỉ là làm đi làm lại đúng một việc tí hon: <strong>lấy một nút và bẻ mũi tên của nó quay ngược lại</strong>. Làm việc đó với từng nút, từ trái sang phải, là xong.</p>

    <p>Có đúng một rắc rối. Ngay khi bạn bẻ mũi tên của nút hiện tại quay về phía sau, bạn <strong>mất luôn đường đi tiếp</strong> — vì con trỏ vừa bị ghi đè chính là thứ duy nhất chỉ tới phần còn lại của danh sách. Trong mảng bạn còn có chỉ số để dò lại; ở đây thì không, phần bị mất là mất thật.</p>

    <p>Vậy nên cần ba biến chứ không phải hai: <code>truoc</code> nhớ phần đã đảo xong, <code>hien_tai</code> là nút đang xử lý, và <code>sau</code> — cái quan trọng nhất — giữ hộ đường đi tiếp <strong>trước khi</strong> ta phá nó.</p>
  </template>

  <template #thuat-toan>
    <p>Khởi tạo <code>truoc = nullptr</code> và <code>hien_tai = dau</code>. Chừng nào <code>hien_tai</code> chưa là <code>nullptr</code>, lặp lại đúng bốn dòng, và <strong>thứ tự bốn dòng này là bất di bất dịch</strong>:</p>

    <ol>
      <li><code>sau = hien_tai-&gt;sau</code> — cất đường đi tiếp vào chỗ an toàn.</li>
      <li><code>hien_tai-&gt;sau = truoc</code> — bẻ mũi tên quay ngược.</li>
      <li><code>truoc = hien_tai</code> — nút vừa xử lý trở thành phần đã đảo xong.</li>
      <li><code>hien_tai = sau</code> — bước sang nút kế tiếp bằng cái đã cất ở bước 1.</li>
    </ol>

    <p>Khi vòng lặp dừng, <code>hien_tai</code> đã ra khỏi danh sách còn <code>truoc</code> đang đứng ở nút cuối cùng của danh sách cũ — tức nút đầu của danh sách mới. Trả về <code>truoc</code>, không phải <code>hien_tai</code>.</p>

    <p>Vì sao <code>truoc</code> khởi tạo bằng <code>nullptr</code> chứ không phải nút nào đó? Vì nút 1, sau khi đảo, phải trở thành nút cuối — mà nút cuối thì trỏ vào <code>nullptr</code>. Khởi tạo như vậy làm chuyện đó tự xảy ra ở vòng lặp đầu tiên, không cần xử lý riêng.</p>
  </template>

  <template #chay-tay>
    <p>Ba con trỏ: <code>truoc</code> (ban đầu <code>nullptr</code>), <code>hien_tai</code> (ban đầu trỏ vào nút 1), và <code>sau</code> dùng để lưu tạm.</p>

    <table class="formula-table">
  <tr><th>Bước</th><th>truoc</th><th>hien_tai</th><th>sau</th><th>Trạng thái danh sách</th></tr>
  <tr><td>0 (khởi đầu)</td><td>nullptr</td><td>1</td><td>—</td><td>1 &#8594; 2 &#8594; 3 &#8594; 4</td></tr>
  <tr><td>1</td><td>nullptr</td><td>1</td><td>2</td><td>lưu sau = 2 trước khi sửa gì</td></tr>
  <tr><td>2</td><td>1</td><td>2</td><td>2</td><td>1 &#8592; đã quay đầu, hien_tai chuyển sang 2</td></tr>
  <tr><td>3</td><td>1</td><td>2</td><td>3</td><td>lưu sau = 3</td></tr>
  <tr><td>4</td><td>2</td><td>3</td><td>3</td><td>2 &#8592; 1, hien_tai chuyển sang 3</td></tr>
  <tr><td>5</td><td>2</td><td>3</td><td>4</td><td>lưu sau = 4</td></tr>
  <tr><td>6</td><td>3</td><td>4</td><td>4</td><td>3 &#8592; 2 &#8592; 1, hien_tai chuyển sang 4</td></tr>
  <tr><td>7</td><td>3</td><td>4</td><td>nullptr</td><td>lưu sau = nullptr</td></tr>
  <tr><td>8 (kết thúc)</td><td>4</td><td>nullptr</td><td>nullptr</td><td>4 &#8594; 3 &#8594; 2 &#8594; 1</td></tr>
    </table>

    <p>Để ý các bước lẻ và bước chẵn xen kẽ nhau: bước lẻ chỉ cất <code>sau</code>, bước chẵn mới thật sự bẻ mũi tên và dịch hai con trỏ kia. Và ở bước 8, <code>hien_tai</code> thành <code>nullptr</code> nên vòng lặp dừng, còn <code>truoc</code> đang nằm ở nút 4 — đúng nút đầu mới.</p>
  </template>

  <template #code>
    <pre v-pre><code>Nut* dao(Nut* dau) {
    Nut* truoc = nullptr;
    Nut* hien_tai = dau;
    while (hien_tai != nullptr) {
        Nut* sau = hien_tai-&gt;sau;   // lưu trước khi sửa
        hien_tai-&gt;sau = truoc;      // đảo hướng con trỏ
        truoc = hien_tai;
        hien_tai = sau;
    }
    return truoc;   // nút đầu mới
}</code></pre>

    <p>Hai ca biên đáng kiểm tra trước khi nộp, cả hai đều chạy đúng mà không cần thêm dòng nào: danh sách rỗng (<code>dau == nullptr</code>) thì vòng lặp không chạy lần nào và hàm trả về <code>nullptr</code>; danh sách một nút thì chạy đúng một vòng, nút đó tự trỏ vào <code>nullptr</code> và trở thành đầu mới. Nếu code của bạn cần <code>if</code> riêng cho hai ca này, gần như chắc chắn bạn đang viết phức tạp hơn mức cần thiết.</p>
  </template>

  <template #toi-uu>
    <p><strong>Chỗ then chốt:</strong> phải lưu <code>sau</code> trước khi sửa con trỏ của <code>hien_tai</code>. Nếu sửa <code>hien_tai-&gt;sau = truoc</code> trước, bạn đã ghi đè mất địa chỉ của phần còn lại danh sách, và không có cách nào tìm lại — phần đó bị mất vĩnh viễn khỏi chương trình, không phải lỗi có thể debug bằng cách in ra thêm, vì dữ liệu đã thật sự biến mất.</p>

    <p><strong>Chi phí:</strong> O(n) thời gian — đi qua mỗi nút đúng một lần. O(1) bộ nhớ phụ — chỉ ba con trỏ, không phụ thuộc độ dài danh sách. Đây là lý do bài này được hỏi nhiều khi phỏng vấn: nó phân biệt rõ người hiểu con trỏ đang làm gì với người chỉ thuộc lòng đoạn code.</p>

    <p><strong>Có tối ưu được nữa không?</strong> Về bậc thì không: mỗi nút bắt buộc phải bị chạm ít nhất một lần để mũi tên của nó đổi chiều, nên <code>O(n)</code> đã là sàn. Về bộ nhớ cũng vậy, <code>O(1)</code> không thể tốt hơn. Bản trên đã tối ưu.</p>

    <p><strong>Nhưng có hai cách viết khác đáng biết, và cả hai đều tệ hơn</strong> — biết vì sao chúng tệ mới là phần có giá trị:</p>

    <ul>
      <li><strong>Đổ ra mảng rồi dựng lại danh sách theo thứ tự ngược.</strong> Vẫn <code>O(n)</code> thời gian nhưng tốn thêm <code>O(n)</code> bộ nhớ cho mảng. Đổi bộ nhớ lấy sự dễ nghĩ, và ở đây bạn chẳng nhận lại được gì vì bản ba con trỏ cũng chỉ có bốn dòng.</li>
      <li><strong>Đệ quy.</strong> Viết ngắn và trông đẹp, nhưng mỗi nút chiếm một khung ngăn xếp nên bộ nhớ phụ là <code>O(n)</code> ẩn — và với danh sách một triệu nút, chương trình tràn ngăn xếp rồi chết. Đây đúng là cái bẫy đã gặp ở bài Đệ quy: <code>O(n)</code> bộ nhớ ngăn xếp không hiện ra trong code nên rất dễ quên.</li>
    </ul>

    <p><strong>Còn một cách rẻ hơn tất cả, nếu bài toán cho phép:</strong> đừng đảo gì cả. Nếu bạn chỉ cần <strong>đọc</strong> danh sách theo thứ tự ngược chứ không cần bản thân danh sách bị đảo, hãy dùng danh sách liên kết đôi và đi ngược bằng con trỏ <code>truoc</code> có sẵn — <code>O(n)</code> để đọc, và không sửa dữ liệu gốc chút nào. Câu hỏi "mình có thật sự cần đảo không" thường đáng giá hơn mọi tối ưu vi mô.</p>
  </template>

</WorkedExample>

<WorkedExample id="vd-dsll-rua-tho-phat-hien-chu-trinh" title="Rùa và thỏ: phát hiện danh sách có chu trình">

  <template #de-bai>
    <p>Cho một danh sách liên kết đơn. Hãy cho biết nó có <strong>chu trình</strong> hay không — nghĩa là có nút nào đó trỏ ngược về một nút đã đi qua, khiến việc duyệt danh sách không bao giờ gặp <code>nullptr</code> mà chạy vòng vòng mãi.</p>

    <p>Ràng buộc: chỉ được dùng <code>O(1)</code> bộ nhớ phụ. Nếu được thoải mái bộ nhớ thì bài này quá dễ, và phần thú vị nằm đúng ở chỗ bị chặn.</p>

    <p>Ví dụ để chạy tay: danh sách 6 nút <code>1 &#8594; 2 &#8594; 3 &#8594; 4 &#8594; 5 &#8594; 6</code>, nhưng nút 6 không trỏ ra ngoài mà trỏ ngược về nút 3, tạo thành chu trình <code>3 &#8594; 4 &#8594; 5 &#8594; 6 &#8594; 3 &#8594; ...</code>.</p>
  </template>

  <template #y-tuong>
    <p>Cách hiển nhiên là ghi lại mọi nút đã thăm vào một tập hợp, gặp lại nút cũ thì kết luận có chu trình. Đúng, nhưng tốn <code>O(n)</code> bộ nhớ — vi phạm ràng buộc.</p>

    <p>Ý tưởng cứu bài lấy từ đường chạy điền kinh: <strong>cho hai người chạy vòng quanh sân với tốc độ khác nhau, người nhanh sớm muộn cũng đuổi kịp và gặp lại người chậm</strong>. Điều đó chỉ xảy ra được nếu đường chạy là một vòng khép kín. Trên một đường thẳng, người nhanh chỉ đơn giản về đích trước rồi hết đường.</p>

    <p>Chuyển sang danh sách liên kết: cho hai con trỏ cùng xuất phát từ nút đầu, <strong>rùa</strong> đi 1 nhịp mỗi bước, <strong>thỏ</strong> đi 2 nhịp mỗi bước. Nếu chúng gặp nhau thì có chu trình. Nếu thỏ chạm <code>nullptr</code> thì danh sách có điểm kết thúc, tức không có chu trình. Bộ nhớ dùng thêm: đúng hai con trỏ.</p>
  </template>

  <template #thuat-toan>
    <p>Đặt <code>rua = dau</code> và <code>tho = dau</code>. Lặp:</p>

    <ol>
      <li>Nếu <code>tho == nullptr</code> hoặc <code>tho-&gt;sau == nullptr</code> thì dừng và trả về "không có chu trình" — thỏ đã ra khỏi danh sách. Phải kiểm tra <strong>cả hai</strong>, vì bước sau thỏ nhảy 2 nhịp nên nó cần cả nút hiện tại lẫn nút kế tiếp đều tồn tại.</li>
      <li><code>rua = rua-&gt;sau</code> (1 nhịp), <code>tho = tho-&gt;sau-&gt;sau</code> (2 nhịp).</li>
      <li>Nếu <code>rua == tho</code> thì trả về "có chu trình".</li>
    </ol>

    <p>Vì sao thuật toán chắc chắn dừng, chứ không chạy mãi? Xét hai trường hợp. Không có chu trình: thỏ đi nhanh gấp đôi nên nó chạm cuối danh sách sau khoảng <code>n/2</code> bước, điều kiện ở bước 1 bắt được. Có chu trình: cả hai rồi cũng vào trong vòng, và lúc đó khoảng cách giữa chúng — đếm theo chiều đi, vòng quanh chu trình — giảm đúng 1 sau mỗi bước, vì thỏ nhanh hơn rùa đúng 1 nhịp. Một số nguyên không âm giảm đều 1 mỗi bước chắc chắn chạm 0, và chạm 0 nghĩa là hai con trỏ trùng nhau.</p>

    <p>Đó cũng là lý do bước nhảy của thỏ phải là 2 chứ không phải 3 hay 5. Với hiệu tốc độ đúng bằng 1, khoảng cách giảm từng nấc một nên không thể nhảy cóc qua số 0 — tức không thể vượt mặt rùa mà không hề trùng vào nó.</p>
  </template>

  <template #chay-tay>
    <p>Rùa đi 1 nhịp mỗi bước, thỏ đi 2 nhịp mỗi bước, cả hai bắt đầu từ nút 1.</p>

    <table class="formula-table">
      <tr><th>Bước</th><th>Rùa (vị trí)</th><th>Thỏ (vị trí)</th><th>Nhận xét</th></tr>
      <tr><td>0</td><td>1</td><td>1</td><td>Cùng xuất phát</td></tr>
      <tr><td>1</td><td>2</td><td>3</td><td>Thỏ đi 2 nhịp: 1 &#8594; 2 &#8594; 3</td></tr>
      <tr><td>2</td><td>3</td><td>5</td><td>Thỏ đã vào chu trình</td></tr>
      <tr><td>3</td><td>4</td><td>3</td><td>Thỏ đi hết vòng 6&#8594;3, quay lại nút 3</td></tr>
      <tr><td>4</td><td>5</td><td>5</td><td>Rùa và thỏ trùng nhau tại nút 5</td></tr>
    </table>

    <p>Đối chiếu với danh sách <strong>không</strong> có chu trình, cùng 6 nút nhưng nút 6 trỏ vào <code>nullptr</code>:</p>

    <table class="formula-table">
      <tr><th>Bước</th><th>Rùa</th><th>Thỏ</th><th>Nhận xét</th></tr>
      <tr><td>0</td><td>1</td><td>1</td><td>Cùng xuất phát</td></tr>
      <tr><td>1</td><td>2</td><td>3</td><td>—</td></tr>
      <tr><td>2</td><td>3</td><td>5</td><td>—</td></tr>
      <tr><td>3</td><td>4</td><td>nullptr</td><td>Thỏ đi 5 &#8594; 6 &#8594; nullptr, hết danh sách</td></tr>
      <tr><td>4</td><td colspan="3">Dừng: thỏ chạm nullptr &#8594; kết luận không có chu trình</td></tr>
    </table>

    <p>Hai bảng, cùng một thuật toán, hai kết luận trái ngược — và không bảng nào cần tới một byte bộ nhớ phụ nào ngoài hai con trỏ.</p>
  </template>

  <template #code>
    <pre v-pre><code>bool coChuTrinh(Nut* dau) {
    Nut* rua = dau;
    Nut* tho = dau;
    while (tho != nullptr &amp;&amp; tho-&gt;sau != nullptr) {
        rua = rua-&gt;sau;          // 1 nhịp
        tho = tho-&gt;sau-&gt;sau;     // 2 nhịp
        if (rua == tho) return true;
    }
    return false;   // thỏ chạm nullptr: danh sách có điểm kết thúc
}</code></pre>

    <p>Ba chỗ dễ viết sai, đều là lỗi im lặng chứ không báo gì:</p>

    <ul>
      <li><strong>Quên kiểm tra <code>tho-&gt;sau != nullptr</code>.</strong> Dòng <code>tho-&gt;sau-&gt;sau</code> sẽ đọc con trỏ từ địa chỉ <code>nullptr</code> và chương trình sập — hoặc tệ hơn, chạy được trên máy bạn mà sập trên máy chấm.</li>
      <li><strong>So sánh <code>rua-&gt;giaTri == tho-&gt;giaTri</code> thay vì <code>rua == tho</code>.</strong> Hai nút khác nhau hoàn toàn có thể chứa cùng một giá trị. Ở đây ta so <strong>địa chỉ</strong>, tức "có phải cùng một nút không", chứ không so nội dung.</li>
      <li><strong>Kiểm tra <code>rua == tho</code> trước khi dịch chuyển.</strong> Cả hai cùng xuất phát ở nút đầu nên chúng bằng nhau ngay từ bước 0, và hàm sẽ báo có chu trình với mọi danh sách. Phải dịch trước, so sau.</li>
    </ul>
  </template>

  <template #toi-uu>
    <p><strong>Chỗ then chốt:</strong> một khi cả hai con trỏ đã vào trong chu trình, mỗi bước khoảng cách giữa thỏ và rùa — tính theo số nút trong chu trình — giảm đúng 1, vì thỏ đi nhanh hơn rùa đúng 1 nhịp mỗi bước. Một khoảng cách nguyên không âm giảm đều mỗi bước chắc chắn về 0, nên rùa và thỏ chắc chắn gặp nhau. Nếu danh sách không có chu trình, thỏ sẽ ra khỏi danh sách (gặp <code>nullptr</code>) trước khi hai con trỏ có cơ hội gặp nhau — đó là dấu hiệu để kết luận không có chu trình.</p>

    <p><strong>Chi phí:</strong> O(n) thời gian, O(1) bộ nhớ phụ — hơn hẳn cách dùng bảng băm ghi lại các nút đã thăm, vốn cũng O(n) thời gian nhưng tốn thêm O(n) bộ nhớ để lưu tập nút đã thăm.</p>

    <p><strong>Thuật toán này còn cho không bạn hai thứ nữa</strong>, và cả hai đều được hỏi trong phỏng vấn ngay sau câu đầu tiên:</p>

    <ul>
      <li><strong>Tìm nút bắt đầu chu trình.</strong> Sau khi rùa và thỏ gặp nhau, đưa một con trỏ về nút đầu, giữ con trỏ kia tại điểm gặp, rồi cho <strong>cả hai</strong> cùng đi 1 nhịp mỗi bước. Chỗ chúng gặp nhau lần thứ hai chính là nút mở đầu chu trình — ở ví dụ trên là nút 3. Kết quả này ra từ một phép tính khoảng cách nho nhỏ, và nó vẫn giữ nguyên <code>O(1)</code> bộ nhớ.</li>
      <li><strong>Đo độ dài chu trình.</strong> Từ điểm gặp, giữ một con trỏ đứng yên, cho con trỏ kia đi cho tới khi quay lại chính chỗ đó. Số bước đã đi là độ dài vòng — ở đây là 4.</li>
    </ul>

    <p>Cái tên chính thức của kỹ thuật này là <strong>Floyd cycle detection</strong>, hay gọi dân dã là thuật toán rùa và thỏ. Ý tưởng "hai con trỏ chạy khác tốc độ" còn dùng được để tìm nút giữa danh sách trong một lượt duy nhất, và bạn sẽ gặp lại chính nó dưới dạng kỹ thuật hai con trỏ ở Chương 2.</p>
  </template>

</WorkedExample>

</LessonPart>

<LessonPart :sid="'danh-sach-lien-ket'" part="bai-tap">
  <PracticeSet :items="data.practice" />
</LessonPart>

<LessonPart :sid="'danh-sach-lien-ket'" part="leetcode">
  <LeetCodeList :items="data.leetcode" />
</LessonPart>

<LessonPart :sid="'danh-sach-lien-ket'" part="du-an">

<ProjectBrief :brief="data.project" />

<p>Chương 1 kết thúc ở đây. Bạn đã có đủ ba mảnh của thư viện nền và một công cụ đo, giờ là lúc ghép chúng thành sản phẩm chạy được đầu tiên.</p>

<!-- Bài cuối chương là chỗ MVP của cả chương xuất hiện. Dữ liệu nằm ở
     src/data/capstones/, không nằm trong dữ liệu bài, vì nó thuộc về cả chương. -->
<ProjectBrief :brief="capstone" mode="capstone" />

</LessonPart>

</section>
</template>

<script setup>
import LessonGoal from '../components/LessonGoal.vue'
import LessonPart from '../components/LessonPart.vue'
import QuizBlock from '../components/QuizBlock.vue'
import WorkedExample from '../components/WorkedExample.vue'
import PracticeSet from '../components/PracticeSet.vue'
import LeetCodeList from '../components/LeetCodeList.vue'
import ProjectBrief from '../components/ProjectBrief.vue'
import data from '../data/lessons/danh-sach-lien-ket.js'
import { capstoneCuaChuong } from '../data/capstones/index.js'

const capstone = capstoneCuaChuong('nen-mong')

defineProps({ active: Boolean })
</script>
