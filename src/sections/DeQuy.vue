<template>
<section id="de-quy" class="day-section" data-sid="de-quy" v-show="active">

<h2>Đệ quy và hệ thức truy hồi</h2>

<LessonGoal :sid="'de-quy'">
  <ul><li v-for="(g, i) in data.goal" :key="i">{{ g }}</li></ul>
</LessonGoal>

<LessonPart :sid="'de-quy'" part="ly-thuyet">

<h3 id="auto-dq-hang-doi-va-ba-thanh-phan">Hàng người xếp hàng và ba thành phần của đệ quy</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Bạn đứng trong một hàng dài, muốn biết mình đứng thứ mấy nhưng không thấy đầu hàng. Bạn hỏi người phía trước: "anh đứng thứ mấy?". Người đó cũng không biết, nên hỏi tiếp người phía trước nữa. Cứ thế cho tới người đầu hàng — người này biết ngay, mình thứ nhất, không cần hỏi ai. Câu trả lời rồi truyền ngược lại, mỗi người cộng thêm một vào con số nghe được. Toàn bộ đệ quy nằm trong câu chuyện đó: một câu hỏi tự hỏi lại chính nó trên một bài toán nhỏ hơn, cộng một người biết câu trả lời mà không cần hỏi ai nữa.</p>

<p><strong>Đây là gì?</strong> Đệ quy là một hàm gọi lại chính nó, trên một phiên bản nhỏ hơn của cùng bài toán. Một hàm đệ quy đúng luôn có ba thành phần: <strong>trường hợp cơ sở</strong> — bài toán đủ nhỏ để trả lời ngay, không cần hỏi ai (người đầu hàng biết mình thứ nhất); <strong>bước thu nhỏ</strong> — chuyển bài toán hiện tại thành một bài toán nhỏ hơn của chính nó (hỏi người phía trước); và <strong>bước ghép kết quả</strong> — dùng câu trả lời của bài toán nhỏ để dựng câu trả lời của bài toán ban đầu (cộng thêm một).</p>

<p><strong>Vì sao quan trọng?</strong> Thiếu bất kỳ thành phần nào, hàm đều hỏng theo cách rất khó nhận ra khi đọc code lần đầu. Thiếu trường hợp cơ sở thì hàm không bao giờ dừng — không ai trong hàng biết trả lời, mọi người cứ hỏi tiếp mãi. Có trường hợp cơ sở nhưng bước thu nhỏ không thật sự làm bài toán nhỏ đi — ví dụ gọi lại đúng với số thứ tự cũ thay vì lùi một người — thì hàng người không bao giờ tới được đầu hàng, và kết quả giống hệt thiếu trường hợp cơ sở: chạy mãi.</p>

<pre v-pre><code>// Thiếu trường hợp cơ sở: không có điều kiện dừng, chạy mãi
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
}</code></pre>

<h3 id="auto-dq-ngan-xep-loi-goi">Ngăn xếp lời gọi</h3>

<p>Mỗi lần một người trong hàng hỏi người phía trước, người đó phải đứng đó chờ câu trả lời — chưa xong việc, chưa rời khỏi hàng. Bên trong máy tính, mỗi lời gọi hàm chưa hoàn tất cũng "đứng chờ" như vậy: nó chiếm một <strong>khung</strong> trên <strong>ngăn xếp lời gọi</strong>, giữ biến cục bộ của lần gọi đó (số thứ tự đang hỏi) và địa chỉ cần quay về khi có câu trả lời. Gọi đệ quy sâu <code>n</code> lần nghĩa là có <code>n</code> khung đang chồng lên nhau trên ngăn xếp cùng một lúc.</p>

<p>Đây chính là lý do <strong>độ sâu đệ quy là bộ nhớ tiêu tốn</strong>, không chỉ là thời gian. Ngăn xếp lời gọi có giới hạn dung lượng do hệ điều hành cấp cho mỗi luồng chạy; vượt qua giới hạn đó thì chương trình sập với lỗi tràn ngăn xếp, dù logic của hàm hoàn toàn đúng và cuối cùng vẫn sẽ dừng nếu có đủ chỗ chứa.</p>

<p>Chú ý đây là <strong>cùng một cấu trúc ngăn xếp</strong> bạn đã học ở bài Ngăn xếp và hàng đợi — vào sau ra trước, chỉ thêm và chỉ bớt ở một đầu. Khác biệt duy nhất là ở đây bạn không tự tay <code>push</code>/<code>pop</code>; trình dịch và hệ điều hành làm việc đó hộ bạn mỗi khi có lời gọi hàm và mỗi khi hàm trả về.</p>

<h3 id="auto-dq-cay-de-quy-va-he-thuc-truy-hoi">Cây đệ quy và hệ thức truy hồi</h3>

<p>Vẽ lại mọi lời gọi của <code>fib(5)</code> thành một cây — mỗi lời gọi là một nút, hai lời gọi con của nó là hai nhánh:</p>

<pre v-pre><code>                    fib(5)
                 /          \
             fib(4)          fib(3)
            /      \        /      \
        fib(3)    fib(2)  fib(2)   fib(1)
       /    \      /  \    /  \
   fib(2) fib(1) fib(1)fib(0)fib(1)fib(0)
   /   \
fib(1) fib(0)</code></pre>

<p>Đếm số nút trong cây này sẽ thấy nó bùng nổ rất nhanh: <code>fib(2)</code> xuất hiện lại nhiều lần ở nhiều nhánh khác nhau, và <code>fib(1)</code>, <code>fib(0)</code> càng xuất hiện nhiều hơn. Mỗi nút không phải lá sinh ra đúng hai nút con, và chiều cao cây là <code>n</code>, nên tổng số nút tăng theo cấp <code>O(2ⁿ)</code> — đây là cách trực quan để thấy đệ quy trần của <code>fib</code> tốn hàm mũ mà không cần chứng minh bằng công thức.</p>

<p>Cách tổng quát để nói ra chi phí của một hàm đệ quy là viết nó thành một <strong>hệ thức truy hồi</strong>: <code>T(n) = a·T(n/b) + f(n)</code>, đọc là "bài toán cỡ <code>n</code> tốn thời gian bằng <code>a</code> lần bài toán con cỡ <code>n/b</code>, cộng thêm <code>f(n)</code> để chia bài toán ra và ghép kết quả lại". Không cần nhớ định lý Master đầy đủ; ba mốc dưới đây phủ hầu hết các hàm đệ quy bạn sẽ gặp trong suốt chương trình học này:</p>

<table class="formula-table">
  <tr><th>Hệ thức truy hồi</th><th>Đọc là</th><th>Kết quả</th><th>Ví dụ</th></tr>
  <tr><td><code>T(n) = T(n/2) + O(1)</code></td><td>Mỗi lần chỉ đi vào một nửa, việc ngoài lời gọi tốn hằng số</td><td><code>O(log n)</code></td><td>Tìm kiếm nhị phân</td></tr>
  <tr><td><code>T(n) = 2T(n/2) + O(n)</code></td><td>Chia đôi thành hai bài toán con, ghép lại tốn tuyến tính</td><td><code>O(n log n)</code></td><td>Merge sort</td></tr>
  <tr><td><code>T(n) = 2T(n-1) + O(1)</code></td><td>Mỗi lần đẻ ra hai lời gọi, kích thước chỉ giảm đi một</td><td><code>O(2ⁿ)</code></td><td>Liệt kê tập con, fib đệ quy trần</td></tr>
</table>

<p><strong>Chỗ hay nhầm:</strong> hai hệ thức đầu đều "chia đôi" nhưng cho ra kết quả rất khác nhau, vì phần <code>f(n)</code> — chi phí ghép — khác nhau. Tìm nhị phân chỉ so sánh rồi bỏ hẳn một nửa, không cần ghép gì nên <code>f(n) = O(1)</code>. Merge sort phải trộn hai mảng con đã sắp thành một mảng lớn, và việc trộn đó tốn <code>O(n)</code>. Nhìn hệ thức mà không để ý tới <code>f(n)</code> là nguồn nhầm lẫn phổ biến nhất khi mới học phần này.</p>

<h3 id="auto-dq-chia-de-tri-va-ghi-nho">Chia để trị và ghi nhớ</h3>

<p><strong>Chia để trị</strong> là một khuôn mẫu, không phải một mẹo vặt: chia bài toán thành các phần rời nhau, giải từng phần bằng chính thuật toán đó (đệ quy), rồi ghép các kết quả con lại thành kết quả cuối. Hệ thức truy hồi <code>T(n) = 2T(n/2) + O(n)</code> ở trên chính là "dấu vân tay" của khuôn mẫu này. Hai nhóm kiến thức sắp tới của Chương 2 — Sắp xếp và Tìm kiếm nhị phân — là hai ứng dụng trực tiếp, và cả hai sẽ dựa hẳn vào cách đọc hệ thức truy hồi bạn vừa học ở đây, không giải thích lại từ đầu.</p>

<p>Còn khi bài toán có các nhánh con <strong>trùng lặp</strong> — như cây <code>fib(5)</code> ở trên, nơi <code>fib(2)</code> bị tính lại nhiều lần — thì chia để trị thuần không cứu được bạn, vì nó không biết một bài toán con đã được giải rồi. Cách sửa là <strong>ghi nhớ</strong>: giữ một bảng lưu kết quả theo tham số đầu vào; trước khi tính, tra bảng, có rồi thì trả về ngay, chưa có thì tính và lưu lại trước khi trả về.</p>

<pre v-pre><code>// fib có ghi nhớ: dùng -1 để đánh dấu "chưa tính", tách bạch với kết quả 0
vector&lt;long long&gt; bang;

long long fib(int n) {
    if (n &lt;= 1) return n;                 // trường hợp cơ sở
    if (bang[n] != -1) return bang[n];     // đã tính rồi, trả về ngay
    bang[n] = fib(n - 1) + fib(n - 2);     // tính và lưu lại
    return bang[n];
}</code></pre>

<p>Với bảng ghi nhớ, mỗi giá trị <code>n</code> chỉ được tính đúng một lần, nên tổng chi phí tụt từ <code>O(2ⁿ)</code> xuống <code>O(n)</code>. Đây chính là <strong>cửa vào của Quy hoạch động</strong> ở Chương 6 — bạn đã có sẵn công cụ để hiểu nó khi tới đó: Quy hoạch động, nói ngắn gọn, là đệ quy có ghi nhớ được nhìn theo một góc có hệ thống hơn.</p>

</LessonPart>

<LessonPart :sid="'de-quy'" part="vi-sao">

<h3 id="auto-dq-vi-sao">Vì sao đệ quy đáng học kỹ ngay từ đầu</h3>

<p><strong>Nó là ngôn ngữ chung của mọi cấu trúc có tính "một phần giống toàn thể".</strong> Cây, danh sách liên kết, đồ thị duyệt theo chiều sâu — tất cả đều tự nhiên diễn đạt bằng đệ quy, vì cây con của một cây vẫn là một cây, phần còn lại của một danh sách vẫn là một danh sách. Cố viết những cấu trúc này bằng vòng lặp thuần thường ra code rối hơn, không phải gọn hơn.</p>

<p><strong>Hệ thức truy hồi là công cụ phân tích, không phải bài tập lý thuyết suông.</strong> Ba mốc bạn học ở bài này — <code>O(log n)</code>, <code>O(n log n)</code>, <code>O(2ⁿ)</code> — sẽ tái xuất hiện xuyên suốt chương trình. Khi gặp một hàm đệ quy mới, việc đầu tiên đáng làm là viết ra hệ thức truy hồi của nó rồi so với ba mốc này, trước khi nghĩ tới việc đo giờ chạy thực tế.</p>

<p><strong>Nó dạy đúng phản xạ "đừng tính lại cái đã biết".</strong> Khoảng cách giữa <code>fib</code> đệ quy trần và bản có ghi nhớ chỉ là một dòng kiểm tra bảng, nhưng đổi hẳn thuật toán từ hàm mũ sang tuyến tính. Phản xạ này — nhận ra bài toán con trùng lặp và lưu lại kết quả — là hạt giống của cả nhóm kiến thức Quy hoạch động sẽ học sau.</p>

</LessonPart>

<LessonPart :sid="'de-quy'" part="quiz">
  <QuizBlock :questions="data.quiz" />
</LessonPart>

<LessonPart :sid="'de-quy'" part="vi-du">

<WorkedExample id="vd-dq-cay-fibonacci" title="Đếm số lời gọi của fib đệ quy trần rồi so với bản có ghi nhớ">

<p>Với cây lời gọi <code>fib(5)</code> đã vẽ ở phần lý thuyết, đếm số lần mỗi giá trị <code>n</code> xuất hiện lại (tức số lần nó bị tính lại từ đầu):</p>

<table class="formula-table">
  <tr><th>n</th><th>Số lần fib(n) được gọi trong fib(5)</th></tr>
  <tr><td>4</td><td>1</td></tr>
  <tr><td>3</td><td>2</td></tr>
  <tr><td>2</td><td>3</td></tr>
  <tr><td>1</td><td>5</td></tr>
  <tr><td>0</td><td>3</td></tr>
</table>

<p>Tổng cộng 15 lời gọi cho <code>fib(5)</code> — với đệ quy trần. Với <code>n</code> lớn hơn, số lần tính lại tăng theo cấp luỹ: bảng số lời gọi theo công thức <code>2·fib(n+1) − 1</code> cho thấy <code>fib(10)</code> đã cần 177 lời gọi, còn <code>fib(30)</code> cần hơn 2,6 triệu lời gọi dù kết quả chỉ là một số nguyên duy nhất.</p>

<p><strong>Chỗ then chốt:</strong> <code>fib(2)</code> bị tính lại 3 lần trong <code>fib(5)</code>, và tỉ lệ này không giảm mà còn tăng khi <code>n</code> lớn hơn — đó là toàn bộ vấn đề của đệ quy trần. Bản có ghi nhớ chặn đứng sự lãng phí này: mỗi giá trị <code>n</code> từ 0 tới 5 chỉ được tính đúng một lần, tổng cộng chỉ 6 lần tính thay vì 15 lần gọi (và con số này không tăng theo cấp luỹ khi <code>n</code> lớn lên).</p>

<p><strong>Chi phí:</strong> đệ quy trần là <code>O(2ⁿ)</code> thời gian. Bản ghi nhớ là <code>O(n)</code> thời gian và <code>O(n)</code> bộ nhớ cho bảng lưu. Với <code>n = 50</code>, khác biệt này là khác biệt giữa việc chờ nhiều ngày và việc có kết quả tức thì.</p>

</WorkedExample>

<WorkedExample id="vd-dq-giai-truy-hoi-merge" title="Giải T(n) = 2T(n/2) + O(n) bằng cách đếm theo tầng">

<p>Cách đếm theo tầng: coi cây đệ quy như một cây, mỗi tầng ghi lại số bài toán con ở tầng đó, kích thước mỗi bài toán con, và tổng chi phí <strong>ghép</strong> của riêng tầng đó (không tính phần đệ quy sâu hơn).</p>

<table class="formula-table">
  <tr><th>Tầng</th><th>Số bài toán con</th><th>Kích thước mỗi bài</th><th>Chi phí ghép của tầng</th></tr>
  <tr><td>0 (gốc)</td><td>1</td><td>n</td><td>c·n</td></tr>
  <tr><td>1</td><td>2</td><td>n/2</td><td>2 · c·(n/2) = c·n</td></tr>
  <tr><td>2</td><td>4</td><td>n/4</td><td>4 · c·(n/4) = c·n</td></tr>
  <tr><td>...</td><td>...</td><td>...</td><td>c·n</td></tr>
  <tr><td>log₂n (lá)</td><td>n</td><td>1</td><td>c·n</td></tr>
</table>

<p><strong>Chỗ then chốt:</strong> mỗi tầng đều tốn đúng <code>c·n</code>, bất kể tầng đó có bao nhiêu bài toán con — vì số bài toán con tăng gấp đôi mỗi tầng trong khi kích thước mỗi bài giảm đi một nửa, hai hiệu ứng triệt tiêu nhau. Cây có <code>log₂n</code> tầng vì mỗi tầng kích thước giảm một nửa, và <code>n</code> chỉ chia đôi được <code>log₂n</code> lần trước khi chạm kích thước 1. Tổng chi phí là số tầng nhân chi phí mỗi tầng: <code>log₂n × c·n = O(n log n)</code>.</p>

<p><strong>Chi phí:</strong> đây chính là độ phức tạp của merge sort — bài học kế tiếp ở Chương 2 dùng đúng phép đếm này, không giải thích lại. Cách đếm theo tầng dùng lại được cho mọi hệ thức truy hồi dạng chia để trị, kể cả những hệ thức không rơi đúng vào ba mốc đã nhớ ở bảng phần lý thuyết — cứ vẽ tầng, cộng chi phí mỗi tầng, rồi nhân với số tầng.</p>

</WorkedExample>

</LessonPart>

<LessonPart :sid="'de-quy'" part="bai-tap">
  <PracticeSet :items="data.practice" />
</LessonPart>

<LessonPart :sid="'de-quy'" part="leetcode">
  <LeetCodeList :items="data.leetcode" />
</LessonPart>

<LessonPart :sid="'de-quy'" part="du-an">
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
import data from '../data/lessons/de-quy.js'

defineProps({ active: Boolean })
</script>
