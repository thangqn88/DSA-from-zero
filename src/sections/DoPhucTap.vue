<template>
<section id="do-phuc-tap" class="day-section" data-sid="do-phuc-tap" v-show="active">

<h2>Độ phức tạp thuật toán và mô hình chi phí</h2>

<LessonGoal :sid="'do-phuc-tap'">
  <ul><li v-for="(g, i) in data.goal" :key="i">{{ g }}</li></ul>
</LessonGoal>

<LessonPart :sid="'do-phuc-tap'" part="ly-thuyet">

<h3 id="auto-dpt-tim-ten-trong-danh-ba">Tìm một cái tên trong danh bạ</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Bạn cầm một quyển danh bạ dày và cần tìm số của người tên "Sơn". Có hai cách. Cách thứ nhất: lật từng trang từ đầu tới cuối. Cách thứ hai: mở giữa quyển, thấy chữ "M", biết "S" nằm ở nửa sau, rồi lại mở giữa nửa sau, cứ thế. Với quyển mỏng thì hai cách chênh nhau không đáng kể. Nhưng nếu quyển danh bạ dày gấp một nghìn lần, cách thứ nhất tốn gấp một nghìn lần thời gian, còn cách thứ hai chỉ tốn thêm khoảng mười bước. Đó chính là toàn bộ nội dung của bài này: <strong>không phải hôm nay chạy mất bao lâu, mà là khi dữ liệu lớn lên thì thời gian lớn lên theo kiểu nào</strong>.</p>

<p><strong>Đây là gì?</strong> Độ phức tạp thuật toán là cách mô tả tốc độ tăng của khối lượng công việc theo kích thước đầu vào. Ta ký hiệu kích thước đầu vào là <code>n</code>, rồi đếm xem chương trình phải làm khoảng bao nhiêu phép toán. Không đếm bằng giây, vì giây phụ thuộc vào máy của bạn, vào trình biên dịch, vào việc lúc đó máy có đang mở trình duyệt hay không. Đếm bằng số phép toán thì con số ấy đúng trên mọi máy.</p>

<p><strong>Vì sao quan trọng?</strong> Vì nó cho bạn biết trước một thuật toán có dùng được hay không, mà không cần viết ra rồi chạy thử. Đề bài nói <code>n</code> tối đa 200000 — chỉ nhìn con số đó thôi là bạn đã loại được mọi ý tưởng có hai vòng lặp lồng nhau, tiết kiệm cả buổi ngồi gõ một lời giải chắc chắn quá hạn giờ. Trong công việc thật, đó là khác biệt giữa một truy vấn trả về sau 50 mili giây và một truy vấn treo máy chủ.</p>

<h3 id="auto-dpt-o-lon">Ký hiệu O lớn — cách viết gọn của "tăng theo kiểu nào"</h3>

<p>Giả sử bạn đếm được một đoạn code làm <code>3n + 7</code> phép toán. Khi <code>n</code> bằng một triệu, số 7 kia hoàn toàn không đáng kể, và con số 3 chỉ làm mọi thứ nhanh hay chậm đúng ba lần chứ không đổi hình dạng của đường cong. Thứ duy nhất thật sự quyết định là chữ <code>n</code>. Vậy nên ta viết gọn thành <code>O(n)</code>, đọc là "ô lớn của n".</p>

<p><strong>Hai quy tắc rút gọn, chỉ có hai thôi:</strong></p>
<ol>
  <li>Bỏ mọi hằng số nhân. <code>5n</code> và <code>100n</code> đều là <code>O(n)</code>.</li>
  <li>Chỉ giữ số hạng lớn nhất. <code>n² + 1000n</code> là <code>O(n²)</code>, vì khi <code>n</code> đủ lớn thì <code>n²</code> nuốt chửng phần còn lại.</li>
</ol>

<p><strong>Và hai quy tắc ghép:</strong> hai vòng lặp <strong>lồng nhau</strong> thì nhân độ phức tạp với nhau; hai đoạn code <strong>nối tiếp</strong> nhau thì lấy cái lớn hơn. Chỉ với bốn quy tắc này bạn đã phân tích được phần lớn code mình gặp.</p>

<h3 id="auto-dpt-bang-so-sanh">Bảng so sánh — nhìn bằng con số thật</h3>

<p>Lý thuyết nói <code>O(n²)</code> tệ hơn <code>O(n log n)</code>. Nhưng tệ hơn bao nhiêu? Bảng dưới đây là số phép toán thực tế, và nó thuyết phục hơn mọi lời giải thích:</p>

<table class="formula-table">
  <tr><th>Độ phức tạp</th><th>n = 10</th><th>n = 1000</th><th>n = 1000000</th><th>Ví dụ điển hình</th></tr>
  <tr><td><code>O(1)</code></td><td>1</td><td>1</td><td>1</td><td>Lấy phần tử thứ i của mảng</td></tr>
  <tr><td><code>O(log n)</code></td><td>3</td><td>10</td><td>20</td><td>Tìm kiếm nhị phân</td></tr>
  <tr><td><code>O(n)</code></td><td>10</td><td>1000</td><td>1000000</td><td>Duyệt một lượt qua mảng</td></tr>
  <tr><td><code>O(n log n)</code></td><td>33</td><td>10000</td><td>20000000</td><td>Sắp xếp tốt</td></tr>
  <tr><td><code>O(n²)</code></td><td>100</td><td>1000000</td><td>10¹²</td><td>So mọi cặp phần tử</td></tr>
  <tr><td><code>O(2ⁿ)</code></td><td>1024</td><td>không tưởng</td><td>không tưởng</td><td>Duyệt mọi tập con</td></tr>
</table>

<p>Hãy để ý cột <code>n = 10</code>: ở đó mọi dòng đều nhỏ và chênh lệch chẳng đáng gì. Đó là lý do một thuật toán tồi vẫn chạy tốt trên dữ liệu ví dụ trong sách. Rồi nhìn cột cuối: <code>O(n²)</code> nhảy lên <code>10¹²</code>, tức khoảng ba giờ chạy máy, trong khi <code>O(n log n)</code> chỉ mất khoảng hai phần mười giây. Cùng một bài toán, cùng một chiếc máy.</p>

<p><strong>Mốc phản xạ cần thuộc:</strong> một máy tính phổ thông làm được khoảng <code>10⁸</code> phép toán đơn giản trong một giây. Lấy con số đó chia cho công thức độ phức tạp là ra ngay giới hạn <code>n</code> mà thuật toán của bạn còn chịu được.</p>

<table class="formula-table">
  <tr><th>Giới hạn n trong đề</th><th>Độ phức tạp còn dùng được</th></tr>
  <tr><td>n ≤ 20</td><td><code>O(2ⁿ)</code> — vét cạn mọi tập con vẫn kịp</td></tr>
  <tr><td>n ≤ 500</td><td><code>O(n³)</code></td></tr>
  <tr><td>n ≤ 5000</td><td><code>O(n²)</code></td></tr>
  <tr><td>n ≤ 10⁶</td><td><code>O(n log n)</code></td></tr>
  <tr><td>n ≥ 10⁸</td><td>gần như bắt buộc <code>O(n)</code> hoặc <code>O(log n)</code></td></tr>
</table>

<h3 id="auto-dpt-bo-nho-cache">Chỗ O lớn nói dối bạn — bộ nhớ và cache</h3>

<p>O lớn đếm <strong>số</strong> phép toán, nhưng nó ngầm giả định mọi phép toán tốn như nhau. Ngoài đời thì không.</p>

<p>Hãy tưởng tượng bạn ngồi bàn làm việc. Giấy tờ cần dùng có thể nằm ngay trên mặt bàn, trong ngăn kéo, hoặc dưới tầng hầm lưu trữ. Lấy từ mặt bàn mất một giây, mở ngăn kéo mất mười giây, xuống hầm mất mười phút. Bộ nhớ máy tính cũng xếp tầng đúng như vậy: thanh ghi, cache L1, L2, L3, rồi RAM. Đọc từ cache L1 nhanh hơn đọc từ RAM khoảng một trăm lần.</p>

<p>Bộ xử lý có một thói quen rất hữu ích: mỗi lần bạn đọc một ô nhớ, nó bê luôn cả khối 64 byte xung quanh ô đó lên cache, vì đoán rằng bạn sắp cần những ô kế bên. Với mảng, dự đoán đó gần như luôn đúng — các phần tử nằm sát nhau. Với danh sách liên kết, mỗi nút được cấp phát ở một chỗ ngẫu nhiên trong bộ nhớ, nên dự đoán đó gần như luôn sai.</p>

<p>Kết quả: duyệt một mảng một triệu phần tử và duyệt một danh sách liên kết một triệu nút <strong>cùng là <code>O(n)</code></strong>, nhưng bản mảng thường nhanh hơn nhiều lần. Đây không phải lỗi của O lớn — nó chưa bao giờ hứa hẹn về hằng số. Đây là lời nhắc rằng phân tích trên giấy cho bạn bậc, còn đo đạc thật cho bạn con số. Phần Dự án thực hành cuối bài chính là để bạn tự dựng công cụ đo đó.</p>

<pre v-pre><code>// Cùng O(n), khác chi phí mỗi bước
long long tongMang(const vector&lt;int&gt;&amp; a) {
    long long s = 0;
    for (int x : a) s += x;      // các phần tử nằm liền nhau -> trúng cache
    return s;
}

struct Nut { int giaTri; Nut* tiep; };

long long tongDanhSach(Nut* dau) {
    long long s = 0;
    for (Nut* p = dau; p != nullptr; p = p-&gt;tiep)
        s += p-&gt;giaTri;          // mỗi bước nhảy tới một chỗ ngẫu nhiên -> trượt cache
    return s;
}</code></pre>

</LessonPart>

<LessonPart :sid="'do-phuc-tap'" part="vi-sao">

<h3 id="auto-dpt-vi-sao">Vì sao phải học thứ này trước mọi thứ khác</h3>

<p><strong>Nó là ngôn ngữ chung của tất cả các bài còn lại.</strong> Mọi bài học sau đây đều kết thúc bằng một câu dạng "cách này là O(n log n), cách kia là O(n²)". Nếu chưa đọc được câu đó thì bạn chỉ đang học thuộc lòng chứ chưa hiểu vì sao người ta chọn cấu trúc này thay vì cấu trúc kia.</p>

<p><strong>Nó tiết kiệm thời gian ngay lập tức.</strong> Đọc đề, nhìn giới hạn <code>n</code>, tra bảng mốc phản xạ ở trên, và bạn biết ngay hướng nào không cần thử. Người chưa quen sẽ viết xong một lời giải rồi mới phát hiện nó quá chậm và phải bỏ đi.</p>

<p><strong>Nó là câu hỏi bạn sẽ bị hỏi ở mọi buổi phỏng vấn.</strong> Không phải vì công ty cần bạn tính toán trên giấy, mà vì trả lời được câu đó chứng tỏ bạn hiểu code mình vừa viết sẽ hành xử ra sao khi lượng người dùng tăng gấp trăm lần.</p>

<p><strong>Nó là thứ phân biệt một web app chạy được với một web app chịu tải được.</strong> Trang tra cứu mười nghìn bản ghi thì viết kiểu gì cũng chạy. Trang tra cứu mười triệu bản ghi trong 50 mili giây thì chỉ người hiểu chương này mới làm nổi — và bạn sẽ dựng đúng thứ đó ở Chương 4.</p>

</LessonPart>

<LessonPart :sid="'do-phuc-tap'" part="quiz">
  <QuizBlock :questions="data.quiz" />
</LessonPart>

<LessonPart :sid="'do-phuc-tap'" part="vi-du">

<WorkedExample id="vd-dpt-dem-phep-toan" title="Đếm phép toán của ba đoạn code lồng vòng lặp">

<p>Ba đoạn dưới đây trông na ná nhau. Hãy đếm số lần dòng <code>dem++</code> được thực hiện, rồi rút gọn về O lớn.</p>

<pre v-pre><code>// Đoạn A
int dem = 0;
for (int i = 0; i &lt; n; i++)
    for (int j = 0; j &lt; n; j++)
        dem++;

// Đoạn B
int dem = 0;
for (int i = 0; i &lt; n; i++)
    dem++;
for (int j = 0; j &lt; n; j++)
    dem++;

// Đoạn C
int dem = 0;
for (int i = 0; i &lt; n; i++)
    for (int j = i; j &lt; n; j++)
        dem++;</code></pre>

<table class="formula-table">
  <tr><th>Đoạn</th><th>Đếm tay với n = 4</th><th>Công thức</th><th>Rút gọn</th></tr>
  <tr><td>A</td><td>16</td><td>n × n = n²</td><td><code>O(n²)</code></td></tr>
  <tr><td>B</td><td>8</td><td>n + n = 2n</td><td><code>O(n)</code></td></tr>
  <tr><td>C</td><td>10</td><td>4 + 3 + 2 + 1 = n(n+1)/2</td><td><code>O(n²)</code></td></tr>
</table>

<p><strong>Đoạn A và B khác nhau ở đúng một chữ:</strong> lồng nhau hay nối tiếp. Lồng thì nhân, nối tiếp thì cộng. Với n = 1000, A làm một triệu bước còn B làm hai nghìn bước — chênh nhau năm trăm lần chỉ vì một dấu thụt lề.</p>

<p><strong>Đoạn C là cái bẫy hay gặp nhất.</strong> Nhìn thì thấy vòng trong "chạy ít hơn hẳn", nên nhiều người kết luận nó nhanh hơn hẳn. Đúng là nó làm ít việc hơn — đúng một nửa. Nhưng <code>n(n+1)/2 = n²/2 + n/2</code>, và sau khi bỏ hằng số 1/2 cùng số hạng nhỏ hơn, ta vẫn còn lại <code>n²</code>. Nhanh hơn hai lần không cứu được bạn khi <code>n</code> tăng lên một nghìn lần.</p>

<p><strong>Rút ra:</strong> "làm ít việc hơn" và "có bậc thấp hơn" là hai chuyện hoàn toàn khác nhau. Chỉ có bậc mới quyết định thuật toán sống hay chết khi dữ liệu lớn lên.</p>

</WorkedExample>

<WorkedExample id="vd-dpt-so-sanh-hai-cach" title="Cùng một bài, hai cách giải, chênh nhau bao nhiêu lần">

<p>Bài toán: cho một mảng <code>n</code> số, tìm tổng lớn nhất của một đoạn con liên tiếp. Đây đúng là bài LeetCode 53 trong danh sách tự luyện phía dưới.</p>

<p><strong>Cách ngây thơ:</strong> thử mọi đoạn, mỗi đoạn cộng lại từ đầu.</p>

<pre v-pre><code>int cachNgayTho(const vector&lt;int&gt;&amp; a) {
    int n = a.size(), tot = a[0];
    for (int i = 0; i &lt; n; i++)
        for (int j = i; j &lt; n; j++) {
            int s = 0;
            for (int k = i; k &lt;= j; k++) s += a[k];   // cộng lại từ đầu
            tot = max(tot, s);
        }
    return tot;
}</code></pre>

<p>Ba vòng lồng nhau, mỗi vòng cỡ <code>n</code> bước, nên đây là <code>O(n³)</code>.</p>

<p><strong>Cách một lượt:</strong> đi qua mảng đúng một lần, mỗi bước hỏi một câu duy nhất — "nối tiếp đoạn đang có, hay bỏ nó và bắt đầu lại từ đây?"</p>

<pre v-pre><code>int cachMotLuot(const vector&lt;int&gt;&amp; a) {
    int tot = a[0], dangCo = a[0];
    for (size_t i = 1; i &lt; a.size(); i++) {
        dangCo = max(a[i], dangCo + a[i]);   // bỏ đoạn cũ, hay nối tiếp?
        tot = max(tot, dangCo);
    }
    return tot;
}</code></pre>

<p>Một vòng lặp, mỗi bước làm việc cố định, nên đây là <code>O(n)</code>.</p>

<table class="formula-table">
  <tr><th>n</th><th>Cách ngây thơ <code>O(n³)</code></th><th>Cách một lượt <code>O(n)</code></th><th>Chênh</th></tr>
  <tr><td>100</td><td>≈ 10⁶ bước</td><td>100 bước</td><td>10 nghìn lần</td></tr>
  <tr><td>1000</td><td>≈ 10⁹ bước, khoảng 10 giây</td><td>1000 bước, tức thì</td><td>1 triệu lần</td></tr>
  <tr><td>100000</td><td>≈ 10¹⁵ bước, khoảng 4 tháng</td><td>10⁵ bước, tức thì</td><td>10 tỉ lần</td></tr>
</table>

<p><strong>Điều đáng nói nhất:</strong> hai đoạn code trên dài xấp xỉ nhau, cùng viết bằng C++, cùng chạy trên cùng một máy. Không có thủ thuật tối ưu nào ở đây cả, không đổi ngôn ngữ, không mua máy mạnh hơn. Toàn bộ khoảng cách mười tỉ lần đến từ việc chọn đúng cách nghĩ. Đó là lý do người ta học thuật toán.</p>

<p>Ở phần Dự án thực hành, bạn sẽ đo chính hai hàm này bằng công cụ mình tự viết và nhìn thấy bảng trên hiện ra bằng số đo thật chứ không phải số ước lượng.</p>

</WorkedExample>

</LessonPart>

<LessonPart :sid="'do-phuc-tap'" part="bai-tap">
  <PracticeSet :items="data.practice" />
</LessonPart>

<LessonPart :sid="'do-phuc-tap'" part="leetcode">
  <LeetCodeList :items="data.leetcode" />
</LessonPart>

<LessonPart :sid="'do-phuc-tap'" part="du-an">
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
import data from '../data/lessons/do-phuc-tap.js'

defineProps({ active: Boolean })
</script>
