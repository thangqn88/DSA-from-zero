<template>
<section id="bang-bam" class="day-section" data-sid="bang-bam" v-show="active">

<h2>Bảng băm</h2>

<LessonGoal :sid="'bang-bam'">
  <ul><li v-for="(g, i) in data.goal" :key="i">{{ g }}</li></ul>
</LessonGoal>

<LessonPart :sid="'bang-bam'" part="ly-thuyet">

<h3 id="auto-bb-tu-do-o-be-boi">Tủ đựng đồ ở bể bơi</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Bể bơi có một nghìn ngăn tủ. Bạn đưa thẻ hội viên cho nhân viên, họ nhìn số thẻ, lấy ba chữ số cuối, và đưa bạn chìa khoá đúng ngăn đó. Lần sau bạn quay lại, họ làm đúng phép tính ấy và ra ngay ngăn cũ — không phải mở từng ngăn để tìm. Nhưng có chuyện: hai người có ba chữ số cuối giống nhau sẽ được chỉ vào cùng một ngăn. Lúc đó nhân viên phải xử lý bằng cách nào đó, ví dụ để cả hai túi chung một ngăn rồi dán nhãn.</p>

<p>Toàn bộ bảng băm nằm trong câu chuyện này: <strong>một phép tính biến khoá thành số ngăn, cộng một cách xử lý khi hai khoá trùng ngăn</strong>.</p>

<p><strong>Đây là gì?</strong> Bảng băm là một mảng cố định các ngăn, kèm một hàm băm biến khoá bất kỳ thành chỉ số ngăn. Muốn lưu cặp khoá-giá trị thì tính chỉ số rồi đặt vào ngăn đó. Muốn tìm thì tính lại đúng chỉ số ấy và nhìn vào đúng ngăn. Nhờ vậy tra cứu không phụ thuộc vào việc bảng đang chứa mười hay mười triệu phần tử.</p>

<p><strong>Vì sao quan trọng?</strong> Đây là cấu trúc dữ liệu bạn dùng nhiều nhất trong cả đời lập trình, thường mà không để ý. Object của JavaScript, dict của Python, <code>unordered_map</code> của C++, bảng phiên đăng nhập của máy chủ, bộ nhớ đệm của mọi API — tất cả đều là bảng băm. Nếu chỉ được giữ lại một cấu trúc dữ liệu duy nhất trong đầu, phần lớn lập trình viên sẽ chọn cái này.</p>

<h3 id="auto-bb-adt-vs-cai-dat">Map là hợp đồng, hash table là một cách thực hiện</h3>

<p>Đây là ý quan trọng nhất của cả bài, và nó vượt ra ngoài phạm vi bảng băm.</p>

<p>Khi bạn nói "tôi cần một Map", bạn đang mô tả một <strong>hợp đồng</strong>: có thể đặt một giá trị theo khoá, lấy lại theo khoá, xoá theo khoá. Hợp đồng đó không nói gì về cách làm. Người ta gọi thứ này là kiểu dữ liệu trừu tượng, viết tắt tiếng Anh là ADT.</p>

<p>Còn khi bạn nói "tôi cần một hash table", bạn đang chỉ định <strong>cách thực hiện</strong> hợp đồng đó. Và có nhiều cách khác nhau cùng thực hiện được hợp đồng Map:</p>

<table class="formula-table">
  <tr><th>Cách cài</th><th>Tra cứu</th><th>Giữ thứ tự khoá?</th><th>Khi nào chọn</th></tr>
  <tr><td>Mảng cặp khoá-giá trị</td><td>O(n)</td><td>Không</td><td>Dưới vài chục phần tử, code cực đơn giản</td></tr>
  <tr><td>Mảng đã sắp + tìm nhị phân</td><td>O(log n)</td><td>Có</td><td>Dữ liệu tĩnh, ít thêm bớt</td></tr>
  <tr><td>Cây tìm kiếm cân bằng</td><td>O(log n) chắc chắn</td><td>Có</td><td>Cần duyệt theo thứ tự, cần truy vấn khoảng</td></tr>
  <tr><td><strong>Bảng băm</strong></td><td>O(1) trung bình</td><td>Không</td><td>Chỉ cần tra đúng một khoá, và cần thật nhanh</td></tr>
</table>

<p><strong>Vì sao phải phân biệt?</strong> Vì nó đổi cách bạn thiết kế phần mềm. Khi hàm của bạn nhận vào một Map thay vì nhận vào một hash table cụ thể, người dùng hàm đó được tự do đổi cách cài mà không phải sửa hàm của bạn. Đây đúng là nguyên tắc thiết kế API mà bạn sẽ áp dụng hằng ngày trong công việc thật, và bảng băm là chỗ dễ nhìn thấy nó nhất: cùng một hợp đồng, bốn cách làm, mỗi cách mạnh ở một chỗ.</p>

<p>Chú ý dòng cuối cùng của bảng: bảng băm <strong>không</strong> giữ thứ tự. Nếu bài toán của bạn cần "cho tôi mọi khoá trong khoảng từ a tới b" thì bảng băm hoàn toàn vô dụng, và bạn phải quay sang cây — đó chính là Chương 4.</p>

<h3 id="auto-bb-ham-bam-va-va-cham">Hàm băm và va chạm</h3>

<p>Hàm băm cho chuỗi thường dùng kiểu đa thức: coi mỗi ký tự là một chữ số trong hệ cơ số nào đó.</p>

<pre v-pre><code>size_t bam(const string&amp; khoa, size_t soNgan) {
    size_t ma = 0;
    for (char c : khoa)
        ma = (ma * 31 + (unsigned char)c) % soNgan;   // lấy dư dần để khỏi tràn
    return ma;
}</code></pre>

<p>Số 31 không thiêng liêng gì, chỉ là một số lẻ nhỏ giúp rải đều và nhân nhanh. Điều quan trọng là hàm này <strong>rải đều</strong>: hai khoá khác nhau dù chỉ một ký tự cũng nên rơi vào hai ngăn xa nhau.</p>

<p>Số khoá có thể có là vô hạn, số ngăn là hữu hạn, nên chắc chắn có lúc hai khoá rơi cùng ngăn. Đó gọi là <strong>va chạm</strong>, và nó là chuyện bình thường chứ không phải sự cố. Hai cách xử lý phổ biến:</p>

<table class="formula-table">
  <tr><th>Cách</th><th>Làm gì</th><th>Ưu</th><th>Nhược</th></tr>
  <tr><td><strong>Chuỗi móc nối</strong></td><td>Mỗi ngăn giữ một danh sách các cặp cùng rơi vào đó</td><td>Đơn giản, xoá dễ, chịu được hệ số tải cao</td><td>Tốn thêm bộ nhớ cho con trỏ, các nút nằm rải rác nên hay trượt cache</td></tr>
  <tr><td><strong>Dò tuyến tính</strong></td><td>Ngăn bận thì thử ngăn kế tiếp cho tới khi gặp ngăn trống</td><td>Mọi thứ nằm liền nhau nên rất hợp cache</td><td>Xoá phức tạp, và các cụm bận dính vào nhau làm chậm dần</td></tr>
</table>

<h3 id="auto-bb-he-so-tai">Hệ số tải, nở bảng, và vì sao O(1) là trung bình</h3>

<p><strong>Hệ số tải</strong> là số phần tử chia cho số ngăn. Bảng có 100 ngăn chứa 75 phần tử thì hệ số tải là 0,75. Khi hệ số tải càng cao, các ngăn càng đông và tra cứu càng chậm — vì sau khi nhảy tới đúng ngăn bạn vẫn phải duyệt danh sách trong ngăn đó.</p>

<p>Cách xử lý là <strong>nở bảng</strong>: khi hệ số tải vượt ngưỡng, cấp một bảng mới lớn gấp đôi và băm lại toàn bộ khoá cũ. Bắt buộc phải băm lại chứ không được sao chép nguyên vị trí, vì chỉ số ngăn phụ thuộc vào số ngăn — số ngăn đổi thì chỉ số cũng đổi.</p>

<p>Một lần nở tốn <code>O(n)</code>, nghe có vẻ đắt. Nhưng nó chỉ xảy ra sau mỗi lần số phần tử tăng gấp đôi, nên chia đều ra thì mỗi lần thêm vẫn chỉ tốn <code>O(1)</code>. Đây đúng là lối phân tích khấu trừ bạn đã gặp ở bài Mảng động — cùng một lập luận, áp cho một cấu trúc khác.</p>

<p><strong>Và đây là chỗ phải nói cho rõ:</strong> <code>O(1)</code> của bảng băm là <code>O(1)</code> <strong>trung bình</strong>, không phải xấu nhất. Nó dựa trên giả định hàm băm rải đều. Nếu hàm băm tồi — chẳng hạn chỉ lấy độ dài chuỗi — thì mười nghìn từ sẽ dồn vào khoảng hai chục ngăn, mỗi ngăn giữ năm trăm phần tử, và tra cứu tụt xuống <code>O(n)</code>. Cây cân bằng ở Chương 4 thì khác: nó cho bạn <code>O(log n)</code> chắc chắn, không kèm điều kiện nào. Đó là lựa chọn đánh đổi thật sự giữa hai cấu trúc, không phải chuyện cái nào tốt hơn cái nào.</p>

</LessonPart>

<LessonPart :sid="'bang-bam'" part="vi-sao">

<h3 id="auto-bb-vi-sao">Vì sao đây là cấu trúc bạn dùng nhiều nhất</h3>

<p><strong>Nó có mặt trong mọi phần mềm bạn từng viết.</strong> Mỗi lần bạn viết <code>obj.ten</code> trong JavaScript hay <code>d["ten"]</code> trong Python, bạn đang tra một bảng băm. Ngôn ngữ giấu nó đi kỹ tới mức nhiều người dùng cả sự nghiệp mà không biết bên dưới là gì — và rồi bối rối khi chương trình đột nhiên chậm vì hàm băm của khoá tự định nghĩa quá tồi.</p>

<p><strong>Nó là câu trả lời mặc định cho câu hỏi "làm sao tra nhanh".</strong> Bảng phiên đăng nhập, bộ nhớ đệm kết quả API, chỉ mục ngược của công cụ tìm kiếm, bảng định tuyến — tất cả đều bắt đầu bằng một bảng băm rồi mới tính tiếp.</p>

<p><strong>Nó biến nhiều bài toán O(n²) thành O(n).</strong> Bài Two Sum là ví dụ nhỏ nhất, nhưng khuôn mẫu đó lặp lại khắp nơi: thay vì so mọi cặp, hãy ghi lại những gì đã thấy vào một bảng tra, rồi với mỗi phần tử mới chỉ cần hỏi bảng một câu.</p>

<p><strong>Và nó dạy bạn một bài học về thiết kế.</strong> Phần Map là hợp đồng còn hash table là cách cài ở trên không chỉ là chuyện thuật ngữ. Nó là cách bạn sẽ nghĩ khi thiết kế mọi module về sau: mô tả cái mình cần trước, chọn cách làm sau, và đừng để người dùng module phụ thuộc vào cách làm.</p>

</LessonPart>

<LessonPart :sid="'bang-bam'" part="quiz">
  <QuizBlock :questions="data.quiz" />
</LessonPart>

<LessonPart :sid="'bang-bam'" part="vi-du">

<WorkedExample id="vd-bb-dem-tan-suat" title="Đếm số lần xuất hiện của từng từ trong một đoạn văn">

  <template #de-bai>
    <p>Cho đoạn văn <code>"mua ha mua thu mua dong mua"</code>. Hãy đếm mỗi từ xuất hiện bao nhiêu lần và in ra kết quả.</p>

    <p>Bài này nhỏ tới mức làm tay cũng xong, nhưng hãy trả lời thêm một câu: nếu đầu vào không phải 7 từ mà là một quyển sách nửa triệu từ, cách làm của bạn còn chạy nổi không?</p>
  </template>

  <template #y-tuong>
    <p><strong>Cách không dùng bảng băm:</strong> giữ một danh sách các từ đã gặp cùng số đếm. Với mỗi từ mới đọc được, duyệt lại toàn bộ danh sách đó xem đã có chưa. Với <code>n</code> từ thì đây là <code>O(n²)</code>. Một quyển sách có nửa triệu từ sẽ cần khoảng <code>2,5×10¹¹</code> phép so sánh — vài tiếng đồng hồ.</p>

    <p>Chỗ lãng phí nằm ở chữ "duyệt lại toàn bộ". Ta biết chính xác mình đang tìm từ nào, vậy tại sao phải xem qua cả những từ chẳng liên quan gì?</p>

    <p><strong>Cách dùng bảng băm:</strong> để chính nội dung của từ quyết định chỗ cất nó. Hàm băm biến chuỗi <code>"mua"</code> thành một con số, con số đó chỉ thẳng tới một ngăn cụ thể, và ta đi thẳng tới ngăn ấy mà không ngó qua ngăn nào khác. Mỗi từ tốn <code>O(1)</code> trung bình, tổng cộng <code>O(n)</code>. Nửa triệu từ xong trong chớp mắt.</p>
  </template>

  <template #thuat-toan>
    <p>Với mỗi từ trong đoạn văn, làm đúng ba việc:</p>

    <ol>
      <li><strong>Băm từ đó ra số ngăn.</strong> Ở ví dụ này dùng hàm băm đơn giản nhất có thể: lấy tổng mã ký tự rồi chia dư cho số ngăn.</li>
      <li><strong>Đi tới ngăn đó và tìm khoá thật trong đó.</strong> Đây là bước người mới hay bỏ sót — tìm đúng ngăn <strong>chưa</strong> có nghĩa là tìm đúng khoá, vì nhiều từ khác nhau có thể rơi vào cùng một ngăn.</li>
      <li>Thấy khoá thì tăng số đếm lên 1; không thấy thì thêm cặp mới với số đếm bằng 1 vào ngăn đó.</li>
    </ol>

    <p>Khi hai khoá khác nhau rơi vào cùng một ngăn, ta gọi đó là <strong>va chạm</strong>. Cách xử lý dùng ở đây là <strong>nối chuỗi</strong>: mỗi ngăn giữ một danh sách các cặp, va chạm thì nối thêm vào danh sách chứ không ghi đè và cũng không đi tìm ngăn khác.</p>
  </template>

  <template #chay-tay>
    <p>Chạy tay với bảng 8 ngăn, hàm băm lấy tổng mã ký tự chia dư 8:</p>

    <table class="formula-table">
  <tr><th>Bước</th><th>Từ</th><th>Ngăn</th><th>Hành động</th><th>Trạng thái ngăn</th></tr>
  <tr><td>1</td><td>mua</td><td>2</td><td>Chưa có, thêm mới</td><td>ngăn 2: [mua=1]</td></tr>
  <tr><td>2</td><td>ha</td><td>5</td><td>Chưa có, thêm mới</td><td>ngăn 5: [ha=1]</td></tr>
  <tr><td>3</td><td>mua</td><td>2</td><td>Đã có, tăng lên 2</td><td>ngăn 2: [mua=2]</td></tr>
  <tr><td>4</td><td>thu</td><td>5</td><td><strong>Va chạm với ha</strong>, nối vào danh sách ngăn 5</td><td>ngăn 5: [ha=1, thu=1]</td></tr>
  <tr><td>5</td><td>mua</td><td>2</td><td>Đã có, tăng lên 3</td><td>ngăn 2: [mua=3]</td></tr>
  <tr><td>6</td><td>dong</td><td>7</td><td>Chưa có, thêm mới</td><td>ngăn 7: [dong=1]</td></tr>
  <tr><td>7</td><td>mua</td><td>2</td><td>Đã có, tăng lên 4</td><td>ngăn 2: [mua=4]</td></tr>
    </table>

    <p><strong>Kết quả:</strong> mua=4, ha=1, thu=1, dong=1.</p>

    <p><strong>Chú ý bước 4.</strong> Từ <code>thu</code> rơi vào ngăn 5 đang có <code>ha</code>. Bảng băm không hoảng loạn và cũng không ghi đè: nó nối <code>thu</code> vào danh sách của ngăn đó. Khi tra <code>ha</code> sau này, ta nhảy tới ngăn 5 rồi <strong>vẫn phải so khoá thật</strong> để phân biệt <code>ha</code> với <code>thu</code>. Đây là chi tiết người mới hay quên: tìm đúng ngăn chưa có nghĩa là tìm đúng khoá.</p>

    <p>Trạng thái cuối cùng của cả bảng, để bạn thấy dữ liệu nằm rải ra sao:</p>

    <table class="formula-table">
      <tr><th>Ngăn</th><th>Nội dung</th></tr>
      <tr><td>0, 1, 3, 4, 6</td><td>trống</td></tr>
      <tr><td>2</td><td>[mua=4]</td></tr>
      <tr><td>5</td><td>[ha=1, thu=1]</td></tr>
      <tr><td>7</td><td>[dong=1]</td></tr>
    </table>

    <p>Bốn khoá nằm trong 8 ngăn, và đã có một va chạm. Chuyện đó bình thường hơn bạn tưởng — phần cuối sẽ nói vì sao.</p>
  </template>

  <template #code>
    <pre v-pre><code>// Giả sử BangBam là bảng băm chuỗi -&gt; int mà bạn tự cài
BangBam dem;
for (const string&amp; tu : cacTu) {
    dem.dat(tu, dem.lay(tu, 0) + 1);   // lay(tu, 0): chưa có thì trả về 0
}</code></pre>

    <p>Bản dùng thư viện chuẩn C++, ngắn tới mức gần như không còn gì để sai:</p>

    <pre v-pre><code>#include &lt;iostream&gt;
#include &lt;sstream&gt;
#include &lt;string&gt;
#include &lt;unordered_map&gt;
using namespace std;

int main() {
    string vanBan = "mua ha mua thu mua dong mua";
    unordered_map&lt;string, int&gt; dem;

    istringstream luong(vanBan);
    string tu;
    while (luong &gt;&gt; tu) dem[tu]++;      // chưa có khoá thì tự tạo với giá trị 0

    for (const auto&amp; [k, v] : dem)
        cout &lt;&lt; k &lt;&lt; " = " &lt;&lt; v &lt;&lt; "\n";
}</code></pre>

    <p>Hai chi tiết đáng nhớ về dòng <code>dem[tu]++</code>. Thứ nhất, toán tử <code>[]</code> của <code>unordered_map</code> <strong>tự tạo</strong> phần tử với giá trị 0 nếu khoá chưa có, nên không cần <code>if</code> kiểm tra. Thứ hai, cũng vì thế, chỉ <strong>đọc</strong> <code>dem["abc"]</code> thôi cũng đã lặng lẽ thêm một khoá mới vào bảng — muốn kiểm tra sự tồn tại mà không làm bảng phình ra thì dùng <code>dem.count(tu)</code> hoặc <code>dem.find(tu)</code>.</p>

    <p>Và đừng bất ngờ khi thứ tự in ra không giống thứ tự xuất hiện trong văn bản: chữ <code>unordered</code> trong tên nghĩa là bảng băm không hứa hẹn thứ tự nào cả. Cần thứ tự thì dùng <code>map</code>, đổi lấy <code>O(log n)</code> mỗi thao tác thay vì <code>O(1)</code>.</p>
  </template>

  <template #toi-uu>
    <p><strong>Đã tối ưu về bậc rồi.</strong> Đếm tần suất bắt buộc phải đọc qua mỗi từ ít nhất một lần, nên <code>O(n)</code> là sàn và bảng băm đã chạm sàn. Từ đây trở đi chỉ còn chuyện hằng số — nhưng hằng số ở đây có thể chênh nhau vài lần, nên vẫn đáng bàn.</p>

    <p><strong>Hàm băm trong ví dụ này rất tệ.</strong> Lấy tổng mã ký tự khiến mọi hoán vị của cùng bộ chữ cái băm ra cùng một số: <code>"mua"</code>, <code>"amu"</code>, <code>"uam"</code> đều rơi vào một ngăn. Với dữ liệu thật, cách đó dồn cục nặng và biến các thao tác <code>O(1)</code> thành <code>O(k)</code> với <code>k</code> là độ dài chuỗi va chạm. Hàm băm dùng được cần trộn theo vị trí ký tự, chẳng hạn <code>h = h * 31 + c</code> — thêm một phép nhân, đổi lại phân bố đều hẳn.</p>

    <p><strong>Đặt trước số ngăn nếu biết trước lượng dữ liệu.</strong> Gọi <code>dem.reserve(n)</code> trước vòng lặp để bảng không phải nở và băm lại nhiều lần giữa chừng. Đây đúng là mẹo <code>reserve</code> đã gặp ở bài Mảng động, áp dụng cho một cấu trúc khác.</p>

    <p><strong>Nếu khoá là số nguyên nhỏ và liên tục,</strong> ví dụ đếm tần suất 26 chữ cái, thì đừng dùng bảng băm chút nào — một mảng <code>int dem[26]</code> là đủ. Nó cho <code>O(1)</code> thật sự chứ không phải <code>O(1)</code> trung bình, không tốn chi phí băm, và trúng cache gần như tuyệt đối. Bảng băm sinh ra để xử lý những khoá không đánh chỉ số thẳng được; khi khoá đã tự đánh chỉ số được rồi thì mảng luôn thắng.</p>

    <p>Ví dụ tiếp theo mổ xẻ đúng cái phần mà ví dụ này còn cho qua: va chạm và chuyện bảng tự nở ra.</p>
  </template>

</WorkedExample>

<WorkedExample id="vd-bb-va-cham-va-resize" title="Xem bảng băm va chạm và tự nở ra như thế nào">

  <template #de-bai>
    <p>Bắt đầu với một bảng băm 4 ngăn, ngưỡng hệ số tải 0,75 — nghĩa là chạm 3 phần tử thì phải nở. Hàm băm giả định: <code>bam(k) = k % soNgan</code>, khoá là số nguyên.</p>

    <p>Thêm lần lượt ba khoá <code>5</code>, <code>9</code>, <code>2</code>. Hãy theo dõi <strong>từng khoá nằm ở ngăn nào</strong> sau mỗi bước, và cho biết chuyện gì xảy ra ở đúng thời điểm bảng nở ra.</p>
  </template>

  <template #y-tuong>
    <p><strong>Hệ số tải</strong> là số phần tử chia cho số ngăn. Nó trả lời câu hỏi "trung bình mỗi ngăn đang gánh bao nhiêu khoá". Hệ số tải càng cao thì chuỗi va chạm trong mỗi ngăn càng dài, và thao tác tra cứu càng trượt xa khỏi <code>O(1)</code> lý tưởng về phía <code>O(n)</code>.</p>

    <p>Vậy nên bảng băm tự theo dõi con số đó, và khi nó vượt ngưỡng thì bảng <strong>nở ra</strong>: cấp một mảng ngăn lớn gấp đôi rồi chuyển toàn bộ khoá sang.</p>

    <p>Đây là chỗ then chốt và cũng là chỗ dễ hiểu sai nhất: chuyển sang bảng mới <strong>không phải</strong> là copy khoá về đúng ngăn cũ. Số ngăn đã đổi, mà số ngăn là một phần của phép tính băm, nên mọi khoá phải được <strong>băm lại từ đầu</strong> theo số ngăn mới. Việc băm lại này chính là thứ đắt đỏ, và cũng chính là thứ có ích.</p>
  </template>

  <template #thuat-toan>
    <p>Thao tác thêm một khoá gồm hai phần:</p>

    <ol>
      <li><strong>Đặt khoá vào ngăn <code>bam(k) % soNgan</code></strong>, nối vào chuỗi của ngăn đó nếu đã có khoá khác nằm sẵn.</li>
      <li><strong>Kiểm tra hệ số tải.</strong> Nếu <code>soPhanTu / soNgan ≥ 0,75</code> thì nở: cấp mảng ngăn mới gấp đôi, duyệt lại toàn bộ khoá cũ, tính lại <code>k % soNganMoi</code> cho từng khoá và đặt vào bảng mới, rồi bỏ bảng cũ.</li>
    </ol>

    <p>Vì sao ngưỡng lại là 0,75 chứ không phải 1,0 hay 0,5? Đây là một điểm cân bằng đã được đo đạc nhiều: để bảng đầy tới 1,0 thì chuỗi va chạm dài ra rõ rệt và tra cứu chậm đi; nở sớm ở 0,5 thì tốn gấp đôi bộ nhớ mà tốc độ cải thiện không tương xứng. Con số 0,75 là mặc định của cả Java lẫn nhiều thư viện khác, không phải ngẫu nhiên.</p>
  </template>

  <template #chay-tay>
    <table class="formula-table">
      <tr><th>Thêm khoá</th><th>Số ngăn</th><th>Ngăn</th><th>Số phần tử</th><th>Hệ số tải</th><th>Kết quả</th></tr>
      <tr><td>5</td><td>4</td><td>5 % 4 = 1</td><td>1</td><td>0,25</td><td>Đặt vào ngăn 1</td></tr>
      <tr><td>9</td><td>4</td><td>9 % 4 = 1</td><td>2</td><td>0,50</td><td><strong>Va chạm</strong>, nối vào ngăn 1</td></tr>
      <tr><td>2</td><td>4</td><td>2 % 4 = 2</td><td>3</td><td>0,75</td><td>Đặt vào ngăn 2, chạm ngưỡng → <strong>nở bảng</strong></td></tr>
    </table>

    <p>Nở lên 8 ngăn và băm lại cả ba khoá bằng số ngăn mới:</p>

    <table class="formula-table">
      <tr><th>Khoá</th><th>Ngăn cũ (4 ngăn)</th><th>Ngăn mới (8 ngăn)</th></tr>
      <tr><td>5</td><td>1</td><td>5 % 8 = 5</td></tr>
      <tr><td>9</td><td>1</td><td>9 % 8 = 1</td></tr>
      <tr><td>2</td><td>2</td><td>2 % 8 = 2</td></tr>
    </table>

    <p>Trước và sau, nhìn theo ngăn:</p>

    <table class="formula-table">
      <tr><th>Ngăn</th><th>Bảng cũ, 4 ngăn</th><th>Bảng mới, 8 ngăn</th></tr>
      <tr><td>0</td><td>trống</td><td>trống</td></tr>
      <tr><td>1</td><td><strong>[5, 9]</strong> — chuỗi dài 2</td><td>[9]</td></tr>
      <tr><td>2</td><td>[2]</td><td>[2]</td></tr>
      <tr><td>3</td><td>trống</td><td>trống</td></tr>
      <tr><td>4–7</td><td>không tồn tại</td><td>ngăn 5 giữ [5], còn lại trống</td></tr>
    </table>

    <p>Hệ số tải rơi từ 0,75 xuống 3/8 = 0,375, và chuỗi dài nhất rút từ 2 xuống 1. Mọi thao tác tra cứu từ đây trở đi lại nhanh như lúc bảng còn rỗng.</p>
  </template>

  <template #code>
    <pre v-pre><code>// Phần cốt lõi của thao tác nở bảng, dạng nối chuỗi
void noBang() {
    vector&lt;list&lt;pair&lt;int, int&gt;&gt;&gt; cu = move(ngan);   // giữ tạm bảng cũ
    ngan.assign(cu.size() * 2, {});                 // bảng mới, gấp đôi số ngăn

    for (auto&amp; chuoi : cu)
        for (auto&amp; [k, v] : chuoi)
            ngan[k % ngan.size()].push_back({k, v});   // BĂM LẠI, không copy vị trí cũ
}

void dat(int k, int v) {
    ngan[k % ngan.size()].push_back({k, v});
    soPhanTu++;
    if ((double)soPhanTu / ngan.size() &gt;= 0.75) noBang();
}</code></pre>

    <p>Dòng đáng để tâm nhất là <code>ngan[k % ngan.size()]</code> bên trong <code>noBang</code>. Lúc đó <code>ngan.size()</code> đã là số ngăn <strong>mới</strong>, nên phép chia dư cho ra vị trí mới. Viết nhầm thành số ngăn cũ ở đây là sinh ra đúng con bọ được mô tả ở phần dưới.</p>
  </template>

  <template #toi-uu>
    <p><strong>Đây là chỗ then chốt của cả ví dụ:</strong> khoá 5 và khoá 9 vốn va chạm nhau ở bảng cũ, giờ tách ra hai ngăn khác nhau. Đó chính là tác dụng của việc nở bảng — không chỉ có thêm chỗ, mà còn gỡ bớt va chạm.</p>

    <p><strong>Và đây là cái bẫy:</strong> nếu bạn sao chép nguyên vị trí cũ sang bảng mới thay vì băm lại, khoá 5 sẽ nằm ở ngăn 1 của bảng 8 ngăn. Lần sau tra khoá 5, chương trình tính <code>5 % 8 = 5</code> rồi nhìn vào ngăn 5, thấy trống, và kết luận là không có khoá đó. Lỗi này đặc biệt khó chịu vì chương trình không hề báo lỗi — nó chỉ lặng lẽ trả về sai.</p>

    <p><strong>Chi phí:</strong> lần thêm khoá số 3 tốn <code>O(n)</code> vì phải băm lại tất cả. Nhưng lần nở tiếp theo phải đợi tới khi có 6 phần tử, lần sau nữa là 12, rồi 24. Số lần nở giảm theo cấp số nhân trong khi số phần tử tăng, nên bình quân mỗi lần thêm vẫn là <code>O(1)</code>. Đây đúng là lập luận khấu trừ đã dùng cho mảng động ở Chương 1, chỉ đổi cấu trúc.</p>

    <p><strong>Tối ưu rẻ nhất, vẫn là câu chuyện cũ:</strong> gọi <code>reserve</code> với số phần tử ước tính trước khi nạp dữ liệu. Bảng được cấp đủ ngăn ngay từ đầu nên không lần băm lại nào xảy ra.</p>

    <p><strong>Số ngăn nên là số nguyên tố hay luỹ thừa của 2?</strong> Luỹ thừa của 2 cho phép thay phép chia dư bằng phép and bit — nhanh hơn đáng kể — nhưng đổi lại nó chỉ giữ đúng vài bit thấp của mã băm, nên một hàm băm kém sẽ dồn cục thảm hại. Số nguyên tố trộn đều hơn nhưng phép chia dư đắt hơn. Thư viện thật chọn cả hai đường: nhiều thư viện C++ dùng số nguyên tố, còn Java dùng luỹ thừa của 2 kèm một bước trộn lại mã băm để bù.</p>

    <p><strong>Còn khi bảng nở ra thì có gì phải trả giá?</strong> Với ứng dụng thường thì không, vì <code>O(1)</code> khấu trừ là đủ tốt. Nhưng với hệ thống thời gian thực — chơi game, giao dịch tài chính — một lần nở bảng đúng lúc cao điểm là một khựng lại thấy được. Ở những chỗ đó người ta dùng bảng nở dần, chuyển từng phần khoá qua bảng mới sau mỗi thao tác thay vì chuyển hết một lần. Bậc khấu trừ không đổi, nhưng trường hợp tệ nhất của <strong>một</strong> thao tác rơi từ <code>O(n)</code> xuống <code>O(1)</code>.</p>
  </template>

</WorkedExample>

</LessonPart>

<LessonPart :sid="'bang-bam'" part="bai-tap">
  <PracticeSet :items="data.practice" />
</LessonPart>

<LessonPart :sid="'bang-bam'" part="leetcode">
  <LeetCodeList :items="data.leetcode" />
</LessonPart>

<LessonPart :sid="'bang-bam'" part="du-an">
  <ProjectBrief :brief="data.project" />
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
import data from '../data/lessons/bang-bam.js'

defineProps({ active: Boolean })
</script>
