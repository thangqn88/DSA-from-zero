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

<p>Đầu vào: <code>"mua ha mua thu mua dong mua"</code>. Cần đếm mỗi từ xuất hiện bao nhiêu lần.</p>

<p><strong>Cách không dùng bảng băm:</strong> với mỗi từ, duyệt lại toàn bộ danh sách từ đã gặp để xem có chưa. Với <code>n</code> từ thì đây là <code>O(n²)</code>. Một quyển sách có nửa triệu từ sẽ cần khoảng <code>2,5×10¹¹</code> phép so sánh — vài tiếng đồng hồ.</p>

<p><strong>Cách dùng bảng băm:</strong> mỗi từ chỉ cần tra và cập nhật đúng một lần.</p>

<pre v-pre><code>// Giả sử BangBam là bảng băm chuỗi -&gt; int mà bạn tự cài
BangBam dem;
for (const string&amp; tu : cacTu) {
    dem.dat(tu, dem.lay(tu, 0) + 1);   // lay(tu, 0): chưa có thì trả về 0
}</code></pre>

<p>Mỗi từ tốn <code>O(1)</code> trung bình, tổng cộng <code>O(n)</code>. Nửa triệu từ xong trong chớp mắt.</p>

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

</WorkedExample>

<WorkedExample id="vd-bb-va-cham-va-resize" title="Xem bảng băm va chạm và tự nở ra như thế nào">

<p>Bắt đầu với bảng 4 ngăn, ngưỡng hệ số tải 0,75 — nghĩa là chạm 3 phần tử thì phải nở.</p>

<p>Hàm băm giả định: <code>bam(k) = k % soNgan</code>, khoá là số nguyên.</p>

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

<p><strong>Đây là chỗ then chốt của cả ví dụ:</strong> khoá 5 và khoá 9 vốn va chạm nhau ở bảng cũ, giờ tách ra hai ngăn khác nhau. Đó chính là tác dụng của việc nở bảng — không chỉ có thêm chỗ, mà còn gỡ bớt va chạm.</p>

<p><strong>Và đây là cái bẫy:</strong> nếu bạn sao chép nguyên vị trí cũ sang bảng mới thay vì băm lại, khoá 5 sẽ nằm ở ngăn 1 của bảng 8 ngăn. Lần sau tra khoá 5, chương trình tính <code>5 % 8 = 5</code> rồi nhìn vào ngăn 5, thấy trống, và kết luận là không có khoá đó. Lỗi này đặc biệt khó chịu vì chương trình không hề báo lỗi — nó chỉ lặng lẽ trả về sai.</p>

<p><strong>Chi phí:</strong> lần thêm khoá số 3 tốn <code>O(n)</code> vì phải băm lại tất cả. Nhưng lần nở tiếp theo phải đợi tới khi có 6 phần tử, lần sau nữa là 12, rồi 24. Số lần nở giảm theo cấp số nhân trong khi số phần tử tăng, nên bình quân mỗi lần thêm vẫn là <code>O(1)</code>.</p>

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
