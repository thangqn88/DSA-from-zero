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

  <template #de-bai>
    <p>Hàm Fibonacci viết theo đúng định nghĩa toán học là đoạn code đệ quy đẹp nhất mà ai cũng gặp đầu tiên:</p>

    <pre v-pre><code>long long fib(int n) {
    if (n &lt;= 1) return n;              // trường hợp cơ sở
    return fib(n - 1) + fib(n - 2);    // bước đệ quy
}</code></pre>

    <p>Nó ngắn, nó đúng, và nó chậm tới mức không dùng được. Nhiệm vụ của ví dụ này là chỉ ra <strong>chính xác chỗ nào lãng phí</strong> bằng cách đếm số lời gọi, chứ không chỉ nói suông "đệ quy trần thì chậm".</p>
  </template>

  <template #y-tuong>
    <p>Đoạn code trên không sai. Cái sai nằm ở chỗ nó <strong>quên</strong>: mỗi lần cần <code>fib(3)</code>, nó tính lại từ đầu như thể chưa từng gặp bao giờ, dù có thể đã tính đúng giá trị đó vài giây trước.</p>

    <p>Hãy tưởng tượng bạn tra một từ trong từ điển, gấp sách lại, rồi năm phút sau cần đúng từ đó và lại mở từ đầu tra lại — làm vậy hai mươi lần. Không ai làm thế trong đời thật, nhưng đoạn code trên làm đúng thế.</p>

    <p>Cách chữa gọi là <strong>ghi nhớ</strong>, tiếng Anh là memoization: giữ một quyển sổ, trước khi tính thì tra sổ, tính xong thì ghi vào sổ. Chỉ thêm hai dòng, và bậc rơi từ luỹ thừa xuống tuyến tính.</p>
  </template>

  <template #thuat-toan>
    <p>Bản ghi nhớ chỉ khác bản trần đúng ba chi tiết:</p>

    <ol>
      <li>Một mảng <code>nho</code> kích thước <code>n + 1</code>, khởi tạo toàn <code>-1</code> để đánh dấu "chưa tính".</li>
      <li>Ngay đầu hàm, sau khi kiểm tra trường hợp cơ sở: nếu <code>nho[n] != -1</code> thì trả về luôn, không đệ quy nữa.</li>
      <li>Trước khi trả về kết quả vừa tính, ghi nó vào <code>nho[n]</code>.</li>
    </ol>

    <p>Vì sao điều này đủ để đổi bậc? Vì mỗi giá trị <code>n</code> chỉ có thể đi qua nhánh "tính thật" đúng một lần trong suốt cả chương trình — lần thứ hai trở đi nó bị chặn ngay ở bước 2. Có <code>n + 1</code> giá trị, mỗi giá trị tính một lần với chi phí cố định, nên tổng là <code>O(n)</code>.</p>
  </template>

  <template #chay-tay>
    <p>Với cây lời gọi <code>fib(5)</code> đã vẽ ở phần lý thuyết, đếm số lần mỗi giá trị <code>n</code> xuất hiện lại (tức số lần nó bị tính lại từ đầu):</p>

    <table class="formula-table">
      <tr><th>n</th><th>Số lần fib(n) được gọi — đệ quy trần</th><th>Số lần thật sự tính — bản ghi nhớ</th></tr>
      <tr><td>4</td><td>1</td><td>1</td></tr>
      <tr><td>3</td><td>2</td><td>1</td></tr>
      <tr><td>2</td><td>3</td><td>1</td></tr>
      <tr><td>1</td><td>5</td><td>1</td></tr>
      <tr><td>0</td><td>3</td><td>1</td></tr>
    </table>

    <p>Tổng cộng 15 lời gọi cho <code>fib(5)</code> — với đệ quy trần. Với <code>n</code> lớn hơn, số lần tính lại tăng theo cấp luỹ: bảng số lời gọi theo công thức <code>2·fib(n+1) − 1</code> cho thấy <code>fib(10)</code> đã cần 177 lời gọi, còn <code>fib(30)</code> cần hơn 2,6 triệu lời gọi dù kết quả chỉ là một số nguyên duy nhất.</p>

    <table class="formula-table">
      <tr><th>n</th><th>Số lời gọi — đệ quy trần</th><th>Số lần tính — bản ghi nhớ</th></tr>
      <tr><td>5</td><td>15</td><td>6</td></tr>
      <tr><td>10</td><td>177</td><td>11</td></tr>
      <tr><td>20</td><td>21891</td><td>21</td></tr>
      <tr><td>30</td><td>2692537</td><td>31</td></tr>
      <tr><td>50</td><td>≈ 4×10¹⁰</td><td>51</td></tr>
    </table>

    <p>Cột giữa nhân lên khoảng 1,6 lần mỗi khi <code>n</code> tăng 1. Cột phải cộng thêm đúng 1. Đó là hai thế giới khác nhau, và chúng chỉ cách nhau hai dòng code.</p>
  </template>

  <template #code>
    <pre v-pre><code>#include &lt;cstdio&gt;
#include &lt;vector&gt;
using namespace std;

long long soLoiGoi = 0;

long long fibTran(int n) {
    soLoiGoi++;
    if (n &lt;= 1) return n;
    return fibTran(n - 1) + fibTran(n - 2);
}

vector&lt;long long&gt; nho;

long long fibNho(int n) {
    soLoiGoi++;
    if (n &lt;= 1) return n;
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
}</code></pre>

    <p>Đừng bỏ qua bước tự chạy đoạn này. Nhìn cột <code>ti le</code> phình ra theo <code>n</code> có sức thuyết phục hơn mọi lời giải thích về <code>O(2ⁿ)</code>.</p>
  </template>

  <template #toi-uu>
    <p><strong>Chỗ then chốt:</strong> <code>fib(2)</code> bị tính lại 3 lần trong <code>fib(5)</code>, và tỉ lệ này không giảm mà còn tăng khi <code>n</code> lớn hơn — đó là toàn bộ vấn đề của đệ quy trần. Bản có ghi nhớ chặn đứng sự lãng phí này: mỗi giá trị <code>n</code> từ 0 tới 5 chỉ được tính đúng một lần, tổng cộng chỉ 6 lần tính thay vì 15 lần gọi.</p>

    <p><strong>Chi phí:</strong> đệ quy trần là <code>O(2ⁿ)</code> thời gian. Bản ghi nhớ là <code>O(n)</code> thời gian và <code>O(n)</code> bộ nhớ cho bảng lưu. Với <code>n = 50</code>, khác biệt này là khác biệt giữa việc chờ nhiều ngày và việc có kết quả tức thì.</p>

    <p><strong>Còn tối ưu được nữa.</strong> Bản ghi nhớ vẫn tốn <code>O(n)</code> bộ nhớ cho mảng và <code>O(n)</code> khung ngăn xếp lời gọi. Nhưng để tính <code>fib(n)</code> bạn chỉ cần nhớ đúng hai số gần nhất, nên viết lặp từ dưới lên là xong — <code>O(n)</code> thời gian, <code>O(1)</code> bộ nhớ, không đệ quy nên không sợ tràn ngăn xếp:</p>

    <pre v-pre><code>long long fibLap(int n) {
    if (n &lt;= 1) return n;
    long long a = 0, b = 1;
    for (int i = 2; i &lt;= n; i++) {
        long long c = a + b;
        a = b; b = c;
    }
    return b;
}</code></pre>

    <p>Con đường trần → ghi nhớ → lặp từ dưới lên mà bạn vừa đi chính là con đường dẫn tới <strong>quy hoạch động</strong> ở Chương 6. Ở đó bạn sẽ làm lại đúng ba bước này, chỉ khác là trên những bài toán mà bước cuối không còn hiển nhiên như ở đây.</p>

    <p>Một chú thích để khỏi hiểu nhầm: riêng Fibonacci còn có công thức ma trận cho ra <code>O(log n)</code>, nhưng đó là mẹo dành riêng cho dãy này, không phải bài học tổng quát. Cái đáng mang theo là ba bước ở trên.</p>
  </template>

</WorkedExample>

<WorkedExample id="vd-dq-giai-truy-hoi-merge" title="Giải T(n) = 2T(n/2) + O(n) bằng cách đếm theo tầng">

  <template #de-bai>
    <p>Một hàm đệ quy chia bài toán kích thước <code>n</code> thành <strong>hai</strong> bài con mỗi bài kích thước <code>n/2</code>, giải xong hai bài con thì tốn thêm <code>c·n</code> để ghép kết quả lại. Viết thành hệ thức truy hồi:</p>

    <p><code>T(n) = 2·T(n/2) + c·n</code>, với <code>T(1) = c</code>.</p>

    <p>Hãy tìm <code>T(n)</code> theo O lớn (Big O). Đây không phải bài tập trên giấy cho vui: đó chính xác là hệ thức của merge sort, và bạn sẽ dùng lại kết quả này ở Chương 2.</p>
  </template>

  <template #y-tuong>
    <p>Thay <code>T(n/2)</code> bằng định nghĩa của chính nó rồi lại thay tiếp là cách làm đúng nhưng rối, vì công thức phình ra rất nhanh và bạn dễ lạc.</p>

    <p>Cách nhìn dễ hơn nhiều: <strong>vẽ cây đệ quy ra rồi cộng chi phí theo từng tầng ngang</strong>, thay vì lần theo từng nhánh dọc. Mỗi nút của cây là một lời gọi; chi phí ghi ở nút chỉ là phần <strong>ghép</strong> của riêng nó, không tính phần các nút con làm.</p>

    <p>Lý do cách này hiệu quả: trong rất nhiều hệ thức, tổng chi phí của mỗi tầng ngang hoá ra là một con số dễ chịu — bằng nhau ở mọi tầng, hoặc tăng/giảm theo cấp số nhân. Lúc đó bài toán rút gọn thành "chi phí một tầng × số tầng", hai đại lượng đều tính nhẩm được.</p>
  </template>

  <template #thuat-toan>
    <p>Quy trình đếm theo tầng, dùng được cho mọi hệ thức chia để trị:</p>

    <ol>
      <li><strong>Đếm số nút ở tầng k.</strong> Mỗi lời gọi đẻ ra 2 lời gọi con, nên tầng <code>k</code> có <code>2ᵏ</code> nút.</li>
      <li><strong>Tính kích thước mỗi bài ở tầng k.</strong> Mỗi tầng chia đôi, nên kích thước là <code>n/2ᵏ</code>.</li>
      <li><strong>Nhân hai số đó với chi phí ghép</strong> để ra tổng chi phí của tầng: <code>2ᵏ × c·(n/2ᵏ) = c·n</code>.</li>
      <li><strong>Đếm số tầng.</strong> Cây dừng khi kích thước còn 1, tức <code>n/2ᵏ = 1</code>, tức <code>k = log₂n</code>.</li>
      <li><strong>Nhân chi phí mỗi tầng với số tầng.</strong></li>
    </ol>
  </template>

  <template #chay-tay>
    <table class="formula-table">
      <tr><th>Tầng</th><th>Số bài toán con</th><th>Kích thước mỗi bài</th><th>Chi phí ghép của tầng</th></tr>
      <tr><td>0 (gốc)</td><td>1</td><td>n</td><td>c·n</td></tr>
      <tr><td>1</td><td>2</td><td>n/2</td><td>2 · c·(n/2) = c·n</td></tr>
      <tr><td>2</td><td>4</td><td>n/4</td><td>4 · c·(n/4) = c·n</td></tr>
      <tr><td>...</td><td>...</td><td>...</td><td>c·n</td></tr>
      <tr><td>log₂n (lá)</td><td>n</td><td>1</td><td>c·n</td></tr>
    </table>

    <p>Thay <code>n = 8</code> và <code>c = 1</code> để ra con số thật:</p>

    <table class="formula-table">
      <tr><th>Tầng</th><th>Số nút</th><th>Kích thước</th><th>Chi phí tầng</th><th>Cộng dồn</th></tr>
      <tr><td>0</td><td>1</td><td>8</td><td>8</td><td>8</td></tr>
      <tr><td>1</td><td>2</td><td>4</td><td>2 × 4 = 8</td><td>16</td></tr>
      <tr><td>2</td><td>4</td><td>2</td><td>4 × 2 = 8</td><td>24</td></tr>
      <tr><td>3</td><td>8</td><td>1</td><td>8 × 1 = 8</td><td>32</td></tr>
    </table>

    <p>Bốn tầng, mỗi tầng đúng 8, tổng 32. Đối chiếu công thức: <code>n·log₂n = 8 × 3 = 24</code>, cộng tầng lá <code>n = 8</code> nữa là 32. Khớp.</p>
  </template>

  <template #code>
    <p>Đoạn dưới đây tính <code>T(n)</code> bằng đúng định nghĩa truy hồi rồi so với <code>n·log₂n</code>, để bạn tự thấy tỉ lệ giữa hai bên hội tụ về một hằng số — dấu hiệu chắc chắn của "cùng bậc":</p>

    <pre v-pre><code>#include &lt;cmath&gt;
#include &lt;cstdio&gt;

double T(long long n) {                 // c = 1
    if (n &lt;= 1) return 1;
    return 2 * T(n / 2) + n;
}

int main() {
    for (long long n = 8; n &lt;= 8192; n *= 4) {
        double nlogn = n * log2((double)n);
        printf("n=%-6lld T(n)=%-10.0f n·log2(n)=%-10.0f  ti le=%.2f\n",
               n, T(n), nlogn, T(n) / nlogn);
    }
}</code></pre>

    <p>Cột <code>ti le</code> lởn vởn quanh 1,1–1,3 và không hề tăng theo <code>n</code>. Nếu <code>T(n)</code> thật sự thuộc bậc cao hơn, tỉ lệ đó đã phải phình ra không giới hạn.</p>
  </template>

  <template #toi-uu>
    <p><strong>Chỗ then chốt:</strong> mỗi tầng đều tốn đúng <code>c·n</code>, bất kể tầng đó có bao nhiêu bài toán con — vì số bài toán con tăng gấp đôi mỗi tầng trong khi kích thước mỗi bài giảm đi một nửa, hai hiệu ứng triệt tiêu nhau. Cây có <code>log₂n</code> tầng vì mỗi tầng kích thước giảm một nửa, và <code>n</code> chỉ chia đôi được <code>log₂n</code> lần trước khi chạm kích thước 1. Tổng chi phí là số tầng nhân chi phí mỗi tầng: <code>log₂n × c·n = O(n log n)</code>.</p>

    <p><strong>Chi phí:</strong> đây chính là độ phức tạp của merge sort — bài học kế tiếp ở Chương 2 dùng đúng phép đếm này, không giải thích lại.</p>

    <p><strong>Đổi một con số, đổi cả kết luận.</strong> Sức mạnh thật của cách đếm theo tầng là nó cho bạn thấy hệ thức nhạy cảm tới mức nào:</p>

    <table class="formula-table">
      <tr><th>Hệ thức</th><th>Chi phí mỗi tầng</th><th>Kết quả</th><th>Thuật toán quen thuộc</th></tr>
      <tr><td><code>T(n) = 2T(n/2) + c·n</code></td><td>Bằng nhau mọi tầng</td><td><code>O(n log n)</code></td><td>Merge sort</td></tr>
      <tr><td><code>T(n) = T(n/2) + c</code></td><td>Chỉ một nhánh</td><td><code>O(log n)</code></td><td>Tìm kiếm nhị phân</td></tr>
      <tr><td><code>T(n) = 2T(n/2) + c</code></td><td>Tăng gấp đôi mỗi tầng, tầng lá nuốt hết</td><td><code>O(n)</code></td><td>Duyệt cây nhị phân</td></tr>
      <tr><td><code>T(n) = 4T(n/2) + c·n</code></td><td>Tăng gấp đôi mỗi tầng</td><td><code>O(n²)</code></td><td>Nhân ma trận ngây thơ</td></tr>
    </table>

    <p>Hai dòng đầu và dòng thứ ba chỉ khác nhau ở một chi tiết nhỏ trong công thức, nhưng ra ba bậc khác nhau. Đây là lý do đừng đoán mà hãy vẽ tầng ra.</p>

    <p>Cách đếm theo tầng dùng lại được cho mọi hệ thức truy hồi dạng chia để trị, kể cả những hệ thức không rơi đúng vào ba mốc đã nhớ ở bảng phần lý thuyết — cứ vẽ tầng, cộng chi phí mỗi tầng, rồi nhân với số tầng.</p>
  </template>

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
