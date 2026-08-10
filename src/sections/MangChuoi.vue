<template>
<section id="mang-chuoi" class="day-section" data-sid="mang-chuoi" v-show="active">

<h2>Mảng, chuỗi và mảng động</h2>

<LessonGoal :sid="'mang-chuoi'">
  <ul><li v-for="(g, i) in data.goal" :key="i">{{ g }}</li></ul>
</LessonGoal>

<LessonPart :sid="'mang-chuoi'" part="ly-thuyet">

<h3 id="auto-mc-day-ghe-rap-phim">Dãy ghế đánh số trong rạp chiếu phim</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Rạp chiếu phim có một hàng ghế đánh số liền nhau từ 1 tới 100. Biết số ghế của mình, bạn đi thẳng tới đó, không cần đếm từ ghế số 1. Nhưng nếu người soát vé muốn chèn thêm một ghế phụ vào giữa hàng, mọi người từ chỗ đó về sau phải dịch sang một chỗ để nhường lối. Và nếu hàng đã đầy mà rạp bán thêm vé, không thể "nới hàng ra" tại chỗ — phải chuyển cả rạp sang phòng lớn hơn rồi xếp lại từng ghế.</p>

<p>Toàn bộ mảng nằm trong câu chuyện đó: <strong>biết vị trí là tới thẳng được, nhưng chèn giữa hàng hoặc hết chỗ đều phải trả giá</strong>.</p>

<p><strong>Đây là gì?</strong> Mảng là một vùng nhớ liên tục, các phần tử nằm sát nhau theo đúng thứ tự chỉ số. Vì các phần tử liên tục, địa chỉ của phần tử thứ i tính được ngay bằng một công thức: địa chỉ đầu cộng i nhân kích thước một phần tử. Đây chỉ là một phép nhân và một phép cộng, không phụ thuộc mảng có 10 hay 10 triệu phần tử, nên truy cập theo chỉ số là <code>O(1)</code>.</p>

<p><strong>Vì sao quan trọng?</strong> Mảng là cấu trúc dữ liệu nền tảng nhất — mọi cấu trúc phức tạp hơn trong các bài sau, từ ngăn xếp, hàng đợi, bảng băm, tới mảng kề của đồ thị, đều dựng trên một mảng bên dưới. Hiểu đúng cái giá của từng thao tác trên mảng là hiểu trước một nửa cái giá của mọi cấu trúc dùng nó.</p>

<h3 id="auto-mc-bang-chi-phi-thao-tac">Bảng chi phí các thao tác trên mảng</h3>

<p>Bốn thao tác thường gặp có bốn cái giá rất khác nhau, và nhầm lẫn giữa chúng là lỗi phổ biến nhất khi mới học:</p>

<table class="formula-table">
  <tr><th>Thao tác</th><th>Chi phí</th><th>Vì sao</th></tr>
  <tr><td>Đọc theo chỉ số</td><td>O(1)</td><td>Tính địa chỉ trực tiếp bằng công thức, không cần dò</td></tr>
  <tr><td>Thêm vào cuối, còn chỗ</td><td>O(1)</td><td>Ghi vào đúng ô trống kế tiếp, không dịch gì cả</td></tr>
  <tr><td>Chèn hoặc xoá ở giữa</td><td>O(n)</td><td>Phải dịch mọi phần tử phía sau sang một chỗ để giữ mảng liên tục</td></tr>
  <tr><td>Tìm một giá trị trong mảng chưa sắp</td><td>O(n)</td><td>Không biết giá trị nằm ở đâu nên phải duyệt qua từng phần tử</td></tr>
</table>

<p><strong>Đây là gì?</strong> Bảng này là mốc tham chiếu cho mọi phân tích độ phức tạp có liên quan đến mảng trong suốt phần còn lại của chương trình học. <strong>Vì sao quan trọng?</strong> Vì "mảng" không có một cái giá chung — cái giá phụ thuộc vào chỗ bạn thao tác. Nhầm chèn giữa với thêm cuối là nhầm O(n) với O(1), và với n lớn, khoảng cách đó là khoảng cách giữa chạy tức thì và treo máy.</p>

<h3 id="auto-mc-mang-dong-va-khau-tru">Mảng động và phân tích khấu trừ</h3>

<p>Mảng thường trong C++ có kích thước cố định ngay khi khai báo. Mảng động — như <code>std::vector</code>, hay <code>Vec&lt;T&gt;</code> bạn sẽ tự cài trong bài này — cho phép thêm phần tử mà không cần biết trước tổng số sẽ là bao nhiêu. Bí quyết là phân biệt hai con số: <strong>sức chứa</strong> (số ô đã cấp phát) và <strong>số phần tử</strong> (số ô đang dùng). Khi số phần tử chạm sức chứa, mảng động cấp một vùng nhớ mới <strong>gấp đôi</strong> sức chứa cũ, copy toàn bộ phần tử cũ sang, rồi giải phóng vùng cũ.</p>

<p><strong>Đây là gì?</strong> Câu hỏi tự nhiên là: nếu mỗi lần đầy phải copy hết, chẳng phải push_back đôi khi rất đắt? Đúng — một lần push_back gặp lúc nở tốn <code>O(n)</code>. Nhưng cộng dồn qua <code>n</code> lần thêm liên tiếp, tổng số phép copy chỉ là 1 + 2 + 4 + ... + n, một tổng nhỏ hơn <code>2n</code>. Chia tổng đó cho <code>n</code> lần thêm, bình quân mỗi lần chỉ tốn <code>O(1)</code>. Cách tính "chia đều cái đắt cho nhiều lần rẻ" này gọi là <strong>phân tích khấu trừ</strong>, và đây là công cụ chính của cả bài.</p>

<p><strong>Vì sao quan trọng?</strong> Vì chiến lược nở quyết định toàn bộ kết quả đó. Nhân đôi sức chứa cho khấu trừ <code>O(1)</code>. Nhưng nếu nở theo cấp cộng — ví dụ cứ đầy thì cộng thêm đúng 10 ô — số lần nở tỉ lệ với <code>n</code> thay vì giảm theo cấp số nhân, và tổng chi phí copy trở thành <code>O(n²)</code>, tức bình quân mỗi lần thêm là <code>O(n)</code>. Đây là chỗ nhiều người cài mảng động sai mà không biết, vì chương trình vẫn chạy đúng — chỉ chậm hơn hẳn khi <code>n</code> lớn.</p>

<h3 id="auto-mc-chuoi-locality-cache">Chuỗi là mảng ký tự, và tại sao thứ tự duyệt cũng có giá</h3>

<p>Chuỗi trong C++ chính là một mảng ký tự có thêm vài thao tác tiện dụng. Vì thế mọi cái giá của mảng áp thẳng lên chuỗi: nối chuỗi bằng <code>+=</code> trong một vòng lặp, nếu không cấp trước đủ chỗ, mỗi lần nối có thể phải cấp vùng mới và copy lại toàn bộ nội dung cũ — cộng dồn ra <code>O(n²)</code>, giống hệt lý do mảng động nở theo cấp cộng bị chậm. Cắt một đoạn con của chuỗi cũng cần phân biệt rõ: có cài tạo ra bản sao mới (an toàn nhưng tốn thêm bộ nhớ và thời gian copy), có cài chỉ trỏ vào vùng nhớ cũ (nhanh nhưng phải cẩn thận vùng gốc còn sống hay không).</p>

<p><strong>Đây là gì?</strong> Bên cạnh chi phí đếm bằng số phép toán, mảng còn có một lợi thế ẩn: các phần tử nằm liên tục nên khi đọc phần tử này, bộ nhớ đệm (cache) của máy đã tự động kéo theo vài phần tử kế tiếp. Duyệt mảng theo đúng thứ tự tận dụng được điều đó; nhảy lung tung giữa các chỉ số xa nhau thì không, dù tổng số phép toán y hệt nhau. <strong>Vì sao quan trọng?</strong> Đây chính là mô hình chi phí bạn đã gặp ở bài Độ phức tạp thuật toán: hai đoạn code cùng độ phức tạp Big O vẫn có thể khác nhau nhiều lần về tốc độ thật, và cách bạn duyệt qua bộ nhớ là một trong những lý do lớn nhất.</p>

</LessonPart>

<LessonPart :sid="'mang-chuoi'" part="vi-sao">

<h3 id="auto-mc-vi-sao">Vì sao mảng và mảng động đáng học kỹ</h3>

<p><strong>Mảng là cấu trúc bạn chạm vào nhiều nhất, dù không để ý.</strong> Mọi ngôn ngữ đều có kiểu mảng hoặc mảng động làm mặc định — <code>list</code> của Python, <code>Array</code> của JavaScript, <code>vector</code> của C++ — và phần lớn cấu trúc dữ liệu khác trong chương trình học này đều dựng trên nó: ngăn xếp và hàng đợi là mảng có quy tắc truy cập riêng, bảng băm là một mảng các ngăn, đồ thị thường lưu bằng mảng kề.</p>

<p><strong>Nó là bài học đầu tiên về đánh đổi thay vì "cách nào tốt hơn".</strong> Không có phiên bản mảng nào tốt tuyệt đối: truy cập nhanh đổi lấy chèn giữa chậm, sức chứa dư ra để tránh nở liên tục đổi lấy tốn thêm bộ nhớ. Cả chương trình học sau này sẽ liên tục quay lại kiểu câu hỏi này dưới hình thức khác.</p>

<p><strong>Phân tích khấu trừ mở khoá cho rất nhiều cấu trúc khác.</strong> Bảng băm nở bảng theo đúng lý do mảng động nở sức chứa. Nhiều cấu trúc nâng cao hơn — hàng đợi hai đầu, cây tự cân bằng theo lô — cũng chứng minh độ phức tạp bằng chính kiểu lập luận "chia cái đắt cho nhiều lần rẻ" mà bạn vừa học ở đây lần đầu.</p>

<p><strong>Và nó là bài học đầu tiên khiến bạn phải nghĩ tới bộ nhớ thật, không chỉ số phép toán.</strong> Locality và cache là lý do vì sao hai đoạn code cùng Big O có thể khác nhau nhiều lần về tốc độ đo được — một khoảng cách giữa lý thuyết và thực hành mà bài Độ phức tạp thuật toán mới chỉ nói tới bằng lời, còn bài này là nơi bạn thấy nó lần đầu bằng một cấu trúc cụ thể.</p>

</LessonPart>

<LessonPart :sid="'mang-chuoi'" part="quiz">
  <QuizBlock :questions="data.quiz" />
</LessonPart>

<LessonPart :sid="'mang-chuoi'" part="vi-du">

<WorkedExample id="vd-mc-nhan-doi-suc-chua" title="Xem mảng động nở ra và đếm tổng số lần copy">

<p>Bắt đầu với mảng động sức chứa 1, thêm lần lượt 9 phần tử bằng push_back. Mỗi lần đầy, sức chứa nhân đôi và toàn bộ phần tử hiện có phải copy sang vùng mới.</p>

<table class="formula-table">
  <tr><th>Lần thêm</th><th>Số phần tử sau khi thêm</th><th>Sức chứa</th><th>Có nở không</th><th>Số phép copy lần này</th><th>Tổng copy tích luỹ</th></tr>
  <tr><td>1</td><td>1</td><td>1</td><td>Không (bắt đầu tại đây)</td><td>0</td><td>0</td></tr>
  <tr><td>2</td><td>2</td><td>2</td><td>Có, 1 → 2</td><td>1</td><td>1</td></tr>
  <tr><td>3</td><td>3</td><td>4</td><td>Có, 2 → 4</td><td>2</td><td>3</td></tr>
  <tr><td>4</td><td>4</td><td>4</td><td>Không</td><td>0</td><td>3</td></tr>
  <tr><td>5</td><td>5</td><td>8</td><td>Có, 4 → 8</td><td>4</td><td>7</td></tr>
  <tr><td>6</td><td>6</td><td>8</td><td>Không</td><td>0</td><td>7</td></tr>
  <tr><td>7</td><td>7</td><td>8</td><td>Không</td><td>0</td><td>7</td></tr>
  <tr><td>8</td><td>8</td><td>8</td><td>Không</td><td>0</td><td>7</td></tr>
  <tr><td>9</td><td>9</td><td>16</td><td>Có, 8 → 16</td><td>8</td><td>15</td></tr>
</table>

<p><strong>Chỗ then chốt:</strong> tổng số phép copy sau đúng 9 lần push_back là <code>1 + 2 + 4 + 8 = 15</code>, nhỏ hơn <code>2 × 9 = 18</code>. Đây không phải trùng hợp: mỗi lần nở copy đúng bằng sức chứa cũ, và các sức chứa cũ cộng lại luôn nhỏ hơn hai lần số phần tử hiện tại, vì đây là một cấp số nhân bội 2. Dù bạn thêm 9 phần tử hay 9 triệu phần tử, tỉ lệ tổng copy trên tổng số lần thêm luôn bị chặn dưới 2 — không tăng theo n.</p>

<p><strong>Chi phí:</strong> mỗi push_back riêng lẻ có thể tốn từ <code>O(1)</code> (không nở) tới <code>O(n)</code> (đúng lúc nở), nhưng tính bình quân trên toàn bộ dãy thao tác, chi phí khấu trừ của mỗi push_back là <code>O(1)</code>.</p>

</WorkedExample>

<WorkedExample id="vd-mc-chen-giua-vs-cuoi" title="So chèn vào giữa với chèn vào cuối trên mảng một triệu phần tử">

<p>Giả sử mảng đã có sẵn sức chứa đủ dùng, để tách riêng chi phí dịch phần tử khỏi chi phí nở mảng. So hai cách thêm một triệu phần tử: luôn thêm vào cuối, và luôn chèn vào đầu.</p>

<table class="formula-table">
  <tr><th>Cách thêm</th><th>Số phần tử phải dịch mỗi lần</th><th>Tổng số phép dịch cho 10⁶ lần thêm</th><th>Thời gian ước lượng (mốc 10⁸ phép/giây)</th></tr>
  <tr><td>Luôn thêm vào cuối</td><td>0</td><td>0</td><td>Không đáng kể</td></tr>
  <tr><td>Luôn chèn vào đầu</td><td>Bằng số phần tử đang có, tăng dần từ 0 tới 10⁶ − 1</td><td>≈ 10⁶ × 10⁶ / 2 = 5×10¹¹</td><td>5×10¹¹ / 10⁸ ≈ 5000 giây, khoảng 1,4 giờ</td></tr>
</table>

<p><strong>Chỗ then chốt:</strong> chèn vào đầu mảng một triệu lần không phải chậm gấp đôi hay gấp mười so với thêm vào cuối — nó chậm hơn theo bậc, vì mỗi lần chèn đầu phải dịch toàn bộ phần tử đang có, và số phần tử đang có tăng dần theo đúng số lần bạn đã chèn. Đây chính xác là lý do người ta cần một cấu trúc cho phép thêm vào đầu với chi phí O(1) — danh sách liên kết, bài học kế tiếp của chương này.</p>

<p><strong>Chi phí:</strong> thêm vào cuối là O(1) mỗi lần, O(n) cho cả n lần. Chèn vào đầu là O(n) mỗi lần, O(n²) cho cả n lần — với n = 10⁶, khoảng cách giữa hai cách là khoảng cách giữa "không đáng kể" và "gần một tiếng rưỡi".</p>

</WorkedExample>

</LessonPart>

<LessonPart :sid="'mang-chuoi'" part="bai-tap">
  <PracticeSet :items="data.practice" />
</LessonPart>

<LessonPart :sid="'mang-chuoi'" part="leetcode">
  <LeetCodeList :items="data.leetcode" />
</LessonPart>

<LessonPart :sid="'mang-chuoi'" part="du-an">
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
import data from '../data/lessons/mang-chuoi.js'

defineProps({ active: Boolean })
</script>
