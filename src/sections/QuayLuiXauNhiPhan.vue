<template>
<section id="quay-lui-xau-nhi-phan" class="day-section" data-sid="quay-lui-xau-nhi-phan" v-show="active">

<h2>Quay Lui &amp; Xâu Nhị Phân</h2>

<LessonGoal :sid="'quay-lui-xau-nhi-phan'">
  <ul>
    <li v-for="(g, i) in data.goal" :key="i">{{ g }}</li>
  </ul>
</LessonGoal>

<LessonPart :sid="'quay-lui-xau-nhi-phan'" part="ly-thuyet">

<h4>Đệ quy — hỏi lại chính mình với bài toán nhỏ hơn</h4>

<p>Bạn đứng xếp hàng mua vé và muốn biết mình là người thứ mấy. Bạn không đếm lại từ đầu hàng — bạn quay sang hỏi người đứng ngay trước: "Anh là số mấy?" Người đó cũng không tự biết, nên lại hỏi người trước họ. Cứ thế tới người đầu hàng — người này biết chắc chắn, không cần hỏi ai: "Tôi là số 1." Rồi câu trả lời dội ngược lại: người thứ hai nghe xong cộng thêm 1, người thứ ba nghe xong cộng thêm 1, cho tới lượt bạn.</p>

<p><strong>Đây là gì?</strong> Đó chính là <strong>đệ quy</strong>: giải bài toán lớn bằng cách hỏi lại chính nó với kích thước nhỏ hơn, cho tới khi gặp trường hợp đủ nhỏ để trả lời thẳng. Trường hợp trả lời thẳng đó gọi là <strong>base case</strong> (người đầu hàng), phần còn lại gọi là <strong>recursive case</strong> (hỏi người phía trước).</p>

<p><strong>Vì sao quan trọng?</strong> Thiếu base case thì hàm gọi mãi không dừng, chương trình tràn bộ nhớ ngăn xếp rồi chết — giống như hàng người vòng tròn, không ai là người đầu tiên nên không ai trả lời được.</p>

<p><strong>Làm sao dùng?</strong> Mỗi lần viết một hàm đệ quy, bạn chỉ cần trả lời 2 câu: "bài toán nhỏ hơn trông thế nào?" và "khi nào đủ nhỏ để trả lời ngay?". Ví dụ tính giai thừa <code>5! = 5×4×3×2×1 = 120</code>: bài nhỏ hơn là <code>(n-1)!</code>, còn trường hợp trả lời ngay là <code>0! = 1</code>.</p>

<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int factorial(int n) {
    if (n == 0) return 1;              // base case
    return n * factorial(n - 1);       // recursive case
}

int main() {
    cout &lt;&lt; factorial(3) &lt;&lt; "\n";   // in ra: 6
    return 0;
}</code></pre>

<p>Sơ đồ dưới đây cho thấy máy tính "đi xuống" (gọi hàm nhỏ dần) rồi "đi ngược lên" (trả kết quả về) thế nào khi chạy <code>factorial(3)</code>:</p>

<div class="widget">
  <div class="widget-label">Sơ đồ lồng nhau — factorial(3)</div>
  <div style="font-family: monospace; font-size: 0.92rem; line-height: 2;">
    <div style="padding: 6px 10px; border-left: 3px solid var(--border); background: var(--card-bg); border-radius: 0 6px 6px 0;">
      📁 factorial(3) — cần factorial(2)
      <div style="margin-left: 24px; margin-top: 4px; padding: 6px 10px; border-left: 3px solid var(--border); background: white; border-radius: 0 6px 6px 0;">
        📁 factorial(2) — cần factorial(1)
        <div style="margin-left: 24px; margin-top: 4px; padding: 6px 10px; border-left: 3px solid var(--border); background: var(--card-bg); border-radius: 0 6px 6px 0;">
          📁 factorial(1) — cần factorial(0)
          <div style="margin-left: 24px; margin-top: 4px; padding: 6px 10px; border-left: 3px solid var(--success); background: var(--success-bg); border-radius: 0 6px 6px 0;">
            📁 factorial(0) → <strong>base case, trả về 1 ngay</strong>
          </div>
          <div style="margin-top: 6px; color: var(--amber);">↑ trả về: factorial(1) = 1 × 1 = <strong>1</strong></div>
        </div>
        <div style="margin-top: 6px; color: var(--amber);">↑ trả về: factorial(2) = 2 × 1 = <strong>2</strong></div>
      </div>
      <div style="margin-top: 6px; color: var(--amber);">↑ trả về: factorial(3) = 3 × 2 = <strong>6</strong></div>
    </div>
  </div>
</div>

<h4>Quay lui — thử, sai thì lùi lại</h4>

<p>Bạn đi vào một mê cung không có bản đồ. Tại mỗi ngã rẽ, bạn chọn một hướng để thử và đi tiếp. Gặp ngõ cụt, bạn quay lại đúng ngã rẽ đó và thử hướng khác. Nếu mọi hướng ở ngã rẽ này đều cụt, bạn lùi thêm một ngã rẽ nữa về phía sau. Bạn không bao giờ phải quay ra tận cửa mê cung để bắt đầu lại — chỉ lùi đúng một bước rồi thử tiếp.</p>

<p><strong>Đây là gì?</strong> Cách đi mê cung đó chính là <strong>quay lui</strong>: thử một lựa chọn, đi sâu hơn nếu vẫn ổn, bế tắc thì <strong>hoàn tác đúng bước vừa làm</strong> rồi thử lựa chọn kế tiếp. Ba việc "thử — đi sâu — hoàn tác" lặp lại ở mọi bước, và đó là toàn bộ khung code:</p>

<pre v-pre><code>void backtrack(State current) {
    if (isComplete(current)) { processResult(current); return; }
    for (each candidate at this step) {
        if (isValid(candidate)) {
            applyChoice(candidate);      // THỬ: đi vào 1 hướng
            backtrack(nextState);        // ĐI SÂU: xuống bước kế tiếp
            undoChoice(candidate);       // HOÀN TÁC: xóa dấu chân, thử hướng khác
        }
    }
}</code></pre>

<blockquote><p>📎 Đây là <strong>giả mã minh họa</strong>, không biên dịch được — <code>State</code>, <code>isComplete</code>, <code>each candidate</code> chỉ là chỗ giữ chỗ, nên không có <code>main()</code>. Hai ví dụ điển hình ở phần 4 là bản cụ thể, biên dịch chạy được.</p></blockquote>

<h4>Bốn câu hỏi khung — trả lời xong là viết được code</h4>

<p>Mọi bài quay lui, dù đề bài khác nhau đến đâu, đều quy về đúng 4 câu hỏi này. Trả lời đủ 4 câu là bạn điền được vào khung ở trên:</p>

<table class="formula-table">
  <tr><th>Câu hỏi</th><th>Điền vào đâu trong khung</th><th>Ví dụ: xâu nhị phân</th></tr>
  <tr><td>1. Ở bước thứ i, tôi đang đặt cái gì?</td><td>tham số của hàm đệ quy</td><td>đặt bit cho vị trí thứ i</td></tr>
  <tr><td>2. Vòng lặp thử những lựa chọn nào?</td><td><code>for (each candidate)</code></td><td>thử v = 0 rồi v = 1</td></tr>
  <tr><td>3. Lựa chọn thế nào thì được chấp nhận?</td><td><code>isValid</code></td><td>luôn hợp lệ, không cần điều kiện</td></tr>
  <tr><td>4. Khi nào thì có 1 nghiệm hoàn chỉnh?</td><td><code>isComplete</code></td><td>khi đã đặt đủ n vị trí</td></tr>
</table>

<h4>Cây lựa chọn và ý nghĩa của bước hoàn tác</h4>

<p>Hãy vẽ mọi khả năng ra thành một cái cây: gốc là "chưa đặt gì", mỗi nhánh đi xuống là một lựa chọn ở bước kế tiếp, mỗi lá là một nghiệm hoàn chỉnh. Với xâu nhị phân độ dài 3, gốc chia 2 nhánh (0 và 1), mỗi nhánh lại chia 2, rồi lại chia 2 — được 2×2×2 = 8 lá, đúng 8 xâu.</p>

<p>Quay lui chính là <strong>đi bộ trên cây này theo chiều sâu</strong>: xuống hết một nhánh, chạm lá thì ghi nhận nghiệm, rồi lùi lên đúng một tầng để rẽ sang nhánh anh em bên cạnh. Bước <strong>hoàn tác</strong> là việc trả trạng thái về đúng như lúc bạn vừa bước xuống nhánh đó — nếu quên hoàn tác, nhánh bên cạnh sẽ thừa hưởng dấu vết của nhánh trước và cho kết quả sai.</p>

<blockquote><p>⚠️ <strong>Khi nào cần viết dòng hoàn tác tường minh?</strong> Chỉ khi thuật toán có <strong>biến trạng thái phụ</strong> không tự mất đi giữa các lần lặp, ví dụ mảng <code>used[]</code> đánh dấu phần tử đã dùng. Còn khi bạn chỉ ghi vào <code>a[i]</code>, lần lặp kế tiếp sẽ <strong>ghi đè</strong> lên chính ô đó — ghi đè đã là hoàn tác rồi, không cần viết thêm dòng nào.</p></blockquote>

</LessonPart>

<LessonPart :sid="'quay-lui-xau-nhi-phan'" part="vi-sao">

<p>Quay lui là <strong>viên gạch đầu tiên</strong> của một loạt chủ đề bạn sẽ học ngay sau đây. Sinh tổ hợp, sinh hoán vị, chia kẹo, xếp n quân hậu, giải Sudoku, sinh bộ test ngẫu nhiên để kiểm tra một thuật toán khác — tất cả đều là cùng một khung code, chỉ đổi câu trả lời cho 4 câu hỏi ở trên. Học chắc một lần ở đây, bạn tiết kiệm được công sức cho toàn bộ phần Tổ hợp phía sau.</p>

<p>Nó cũng là chỗ đệ quy lần đầu tiên trở nên thật sự hữu ích. Trước đó, đệ quy chỉ giúp bạn viết gọn vài công thức như giai thừa hay tổng 1..n — những việc mà vòng lặp làm được và còn nhanh hơn. Với quay lui thì khác: bạn không biết trước phải lồng bao nhiêu vòng lặp, vì số bước phụ thuộc vào n đọc từ input. Đệ quy là cách duy nhất viết được "n vòng lặp lồng nhau" mà không cần biết n bằng bao nhiêu.</p>

<div class="realworld">
  <span class="rw-title">🌐 Ứng dụng thực tế</span>
  <dl>
    <dt>Dùng ở đâu</dt>
    <dd>Bộ giải Sudoku trong các app và báo giấy; công cụ giải ô chữ tự động; AI chơi cờ khi khám phá cây nước đi ở độ sâu giới hạn; bộ máy regex khi so khớp mẫu phức tạp; xếp lịch và phân bổ tài nguyên quy mô nhỏ.</dd>
    <dt>Giải quyết vấn đề gì</dt>
    <dd>Tìm hoặc liệt kê mọi cấu hình thỏa mãn ràng buộc, khi không có công thức tính thẳng ra đáp số.</dd>
    <dt class="good">Khi nào NÊN dùng</dt>
    <dd class="good">Kích thước bài toán nhỏ (n dưới vài chục); không có quy luật để dùng Tham lam hay Quy hoạch động nhanh hơn; cần lời giải chính xác tuyệt đối.</dd>
    <dt class="bad">Khi nào KHÔNG NÊN dùng</dt>
    <dd class="bad">n lớn — thời gian chạy tăng theo cấp số nhân; hoặc hệ thống cần phản hồi tức thời nên phải dùng thuật toán chuyên biệt.</dd>
  </dl>
</div>

<h4>Cái giá phải trả: 2ⁿ và vì sao phải cắt nhánh</h4>

<p>Mỗi vị trí có 2 lựa chọn, n vị trí cho <strong>2ⁿ</strong> xâu. Con số này lớn nhanh đến mức khó tin: n = 10 cho 1.024 xâu (máy tính chạy xong tức thì), n = 20 cho hơn 1 triệu (vẫn ổn), n = 30 cho hơn 1 tỷ (đã quá chậm), n = 40 cho hơn 1.000 tỷ — không máy nào chạy nổi. Cứ thêm 1 vào n là thời gian nhân đôi.</p>

<p>Vì vậy quay lui thuần túy chỉ dùng được khi n nhỏ, và khi n hơi lớn thì phải <strong>cắt nhánh</strong>: kiểm tra điều kiện ngay tại thời điểm vừa đặt, phát hiện nhánh chắc chắn hỏng thì bỏ luôn cả nhánh chứ không đi xuống. Cắt sớm ở tầng trên tiết kiệm hơn cắt muộn ở tầng dưới rất nhiều, vì mỗi tầng bạn bỏ được là bỏ luôn toàn bộ cây con bên dưới nó. Bài N-Queens ở phần sau cho thấy rõ điều này: nhờ hàm kiểm tra hợp lệ, chương trình không bao giờ phải duyệt hết mọi cách xếp.</p>

</LessonPart>

<LessonPart :sid="'quay-lui-xau-nhi-phan'" part="quiz">
  <QuizBlock :questions="data.quiz" />
</LessonPart>

<LessonPart :sid="'quay-lui-xau-nhi-phan'" part="vi-du">

<WorkedExample id="vd-sinh-xau-nhi-phan" title="Sinh mọi xâu nhị phân độ dài n" :official="true">
  <template #de-bai>
    <p>Cho số nguyên dương n. Hãy in ra tất cả các xâu nhị phân có độ dài n, mỗi xâu trên một dòng, theo thứ tự từ điển tăng dần.</p>
    <table class="formula-table">
      <tr><th>Input</th><th>Output</th></tr>
      <tr><td>3</td><td>000<br>001<br>010<br>011<br>100<br>101<br>110<br>111</td></tr>
    </table>
  </template>

  <template #y-tuong>
    <p>Coi xâu cần in như n ô trống xếp thành hàng. Bạn điền lần lượt từ ô trái sang ô phải, mỗi ô chỉ có 2 lựa chọn: viết 0 hoặc viết 1. Điền xong ô cuối cùng thì bạn có một xâu hoàn chỉnh — in ra, rồi lùi lại ô trước để đổi sang lựa chọn còn lại.</p>
    <p>Đây là bài quay lui đơn giản nhất có thể, vì <strong>mọi lựa chọn đều hợp lệ</strong> — không có ràng buộc nào để kiểm tra. Nhờ vậy bạn nhìn thấy cây lựa chọn ở dạng thuần khiết nhất: một cây nhị phân đầy đủ với 2ⁿ lá.</p>
  </template>

  <template #thuat-toan>
    <p>Trả lời 4 câu hỏi khung:</p>
    <ol>
      <li><strong>Bước thứ i đặt gì?</strong> Đặt giá trị cho ô <code>a[i]</code>.</li>
      <li><strong>Thử lựa chọn nào?</strong> Vòng lặp <code>for (v = 0; v &lt;= 1; v++)</code>.</li>
      <li><strong>Điều kiện chấp nhận?</strong> Không có — mọi giá trị đều hợp lệ.</li>
      <li><strong>Khi nào là nghiệm hoàn chỉnh?</strong> Khi <code>i == n</code>, tức đã điền đủ n ô.</li>
    </ol>
    <p>Không cần dòng hoàn tác tường minh: lần lặp sau ghi đè lên <code>a[i]</code>, đó chính là hoàn tác.</p>
  </template>

  <template #chay-tay>
    <p>Với n = 3, gọi <code>backtrack(0)</code>. Bảng dưới theo dõi 8 lần chương trình chạm tới <code>i == 3</code> và in ra kết quả:</p>
    <table class="formula-table">
      <tr><th>Lần in</th><th>a[0]</th><th>a[1]</th><th>a[2]</th><th>In ra</th></tr>
      <tr><td>1</td><td>0</td><td>0</td><td>0</td><td>000</td></tr>
      <tr><td>2</td><td>0</td><td>0</td><td>1</td><td>001</td></tr>
      <tr><td>3</td><td>0</td><td>1</td><td>0</td><td>010</td></tr>
      <tr><td>4</td><td>0</td><td>1</td><td>1</td><td>011</td></tr>
      <tr><td>5</td><td>1</td><td>0</td><td>0</td><td>100</td></tr>
      <tr><td>6</td><td>1</td><td>0</td><td>1</td><td>101</td></tr>
      <tr><td>7</td><td>1</td><td>1</td><td>0</td><td>110</td></tr>
      <tr><td>8</td><td>1</td><td>1</td><td>1</td><td>111</td></tr>
    </table>
    <p>Để ý cột <code>a[2]</code> đổi giá trị nhanh nhất (mỗi lần in một lần), còn <code>a[0]</code> chậm nhất (đổi đúng 1 lần ở giữa bảng). Đó là vì ô càng bên phải càng nằm sâu trong cây, nên được thử lại nhiều lần hơn.</p>
  </template>

  <template #code>
<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int n, a[30];   // a[i] = 0 hoặc 1

void printResult() {
    for (int i = 0; i &lt; n; i++) cout &lt;&lt; a[i];
    cout &lt;&lt; "\n";
}

void backtrack(int idx) {
    if (idx == n) { printResult(); return; }   // đủ n ô: có 1 nghiệm
    for (int v = 0; v &lt;= 1; v++) {             // mỗi ô có đúng 2 lựa chọn
        a[idx] = v;                            // THỬ
        backtrack(idx + 1);                    // ĐI SÂU
        // không cần HOÀN TÁC: lượt sau ghi đè a[idx]
    }
}

int main() {
    cin &gt;&gt; n;
    backtrack(0);   // n = 3 in ra 8 xâu: 000,001,010,011,100,101,110,111
    return 0;
}</code></pre>
  </template>

  <template #toi-uu>
    <p><strong>Cắt nhánh thay vì lọc ở cuối.</strong> Giả sử đề chỉ hỏi các xâu nhị phân chẵn, tức bit cuối bằng 0. Cách dễ nhất là sinh hết rồi lọc ngay chỗ in:</p>
<pre v-pre><code>void printResult() {
    if (a[n - 1] != 0) return;    // chỉ giữ xâu kết thúc bằng bit 0
    for (int i = 0; i &lt; n; i++) cout &lt;&lt; a[i];
    cout &lt;&lt; "\n";
}</code></pre>
    <p>Cách này đúng nhưng lãng phí một nửa công sức — bạn vẫn sinh đủ 2ⁿ xâu rồi vứt đi một nửa. Nhanh gấp đôi là ép luôn ở ô cuối: khi <code>idx == n - 1</code> thì chỉ thử v = 0 chứ không thử v = 1. Đây là ví dụ nhỏ nhất của cắt nhánh — chặn ngay tại nơi sinh, đừng để nhánh hỏng đi sâu thêm.</p>
    <p><strong>Khử đệ quy.</strong> Với riêng bài này còn có mẹo không cần đệ quy chút nào: chạy một vòng lặp từ 0 đến 2ⁿ − 1, mỗi số nguyên trong khoảng đó chính là một xâu nhị phân, chỉ việc in n bit của nó ra. Cách này nhanh hơn và không tốn ngăn xếp, nhưng chỉ áp dụng được khi mỗi vị trí có đúng 2 lựa chọn — nên vẫn phải nắm khung quay lui cho các bài tổng quát.</p>
  </template>
</WorkedExample>

<p>Bấm "Bước tiếp theo" để xem 3 góc nhìn đồng bộ: mảng lưu gì, đang ở lời gọi <code>backtrack</code> nào, và toàn cảnh cây đã khám phá tới đâu (n = 3, ra đủ 8 xâu):</p>

<div class="widget">
  <div class="widget-label">Trạng thái mảng a[] — cập nhật theo từng bước</div>
  <div id="d1ArrayView" style="display:flex; justify-content:center; gap: 10px; margin-bottom: 1.2rem;"></div>
  <div class="widget-label">Đang ở lời gọi backtrack nào — dạng thư mục lồng nhau</div>
  <div id="d1CallStackView" style="font-family: monospace; font-size: 0.85rem; line-height: 1.9; min-height: 150px; margin-bottom: 1.2rem;"></div>
  <div class="widget-label">Cây trạng thái — sinh xâu nhị phân độ dài 3</div>
  <div style="position: relative; width: 100%; height: 320px;" id="d1TreeSvg"></div>
  <div class="caption" id="d1Caption">Bấm "Bước tiếp theo" để bắt đầu.</div>
  <div class="controls">
    <button class="secondary" id="d1Prev">← Lùi lại</button>
    <button id="d1Next">Bước tiếp theo →</button>
    <button class="secondary" id="d1Reset">Chạy lại từ đầu</button>
  </div>
  <div class="step-info"><span id="d1StepNum">0</span> / <span id="d1StepTotal">0</span> bước — đã in ra: <span id="d1Results" style="font-family: monospace;"></span></div>
</div>

<WorkedExample id="vd-n-queens" title="Xếp n quân hậu (N-Queens)">
  <template #de-bai>
    <div class="problem-box">
      <span class="pb-title">📋 Nguyên văn đề bài</span>
      <p>Cho một bàn cờ vua có kích thước n*n, ta biết rằng quân hậu có thể di chuyển theo chiều ngang, dọc, chéo. Vấn đề đặt ra rằng, có n quân hậu, bạn cần đếm số cách đặt n quân hậu này lên bàn cờ sao cho với 2 quân hậu bất kì, chúng không "ăn" nhau.</p>
      <p><strong>Input:</strong> Dòng đầu ghi số bộ test T (T&lt;5). Mỗi bộ test ghi một số nguyên dương n duy nhất (không quá 10).</p>
      <p><strong>Output:</strong> Ghi kết quả mỗi bộ test trên một dòng. Số cách đặt quân hậu.</p>
      <table class="formula-table"><tr><th>Input</th><th>Output</th></tr>
      <tr><td>1<br>4</td><td>2</td></tr></table>
    </div>
  </template>

  <template #y-tuong>
    <p>Vẫn là khung quay lui vừa học, chỉ khác hai chỗ: mỗi bước có nhiều hơn 2 lựa chọn, và lần này điều kiện hợp lệ là thật chứ không phải lúc nào cũng đúng.</p>
    <p>Hình dung bạn đặt quân hậu theo <strong>từng hàng một</strong>: hàng 0 trước, rồi hàng 1, cứ thế xuống dưới. Ở mỗi hàng, thử đặt vào từng cột; nếu quân vừa đặt không ăn được quân nào đã có thì đi tiếp xuống hàng sau; nếu bí ở mọi cột thì lùi về hàng trên để đổi cột.</p>
    <p><strong>Chìa khóa của bài này:</strong> hậu ăn theo hàng, cột và hai đường chéo — nhưng vì ta cố tình đặt mỗi hàng đúng 1 quân nên điều kiện "không cùng hàng" luôn tự động đúng, khỏi kiểm tra. Chỉ còn 3 điều phải xét: không cùng cột, không cùng đường chéo chính (hiệu hàng trừ cột bằng nhau), không cùng đường chéo phụ (tổng hàng cộng cột bằng nhau).</p>
    <p>Ta lưu lời giải đang xây bằng một mảng <code>col[]</code>, trong đó <code>col[r]</code> trả lời đúng một câu: "quân hậu ở hàng r đang đứng cột nào?". Vì mỗi hàng chỉ có 1 quân nên một con số là đủ — hàng đã chính là chỉ số mảng rồi. Với lời giải (1, 3, 0, 2) thì <code>col[0] = 1</code> nghĩa là quân hậu hàng 0 đứng cột 1.</p>
  </template>

  <template #thuat-toan>
    <p>Trả lời 4 câu hỏi khung:</p>
    <ol>
      <li><strong>Bước thứ i đặt gì?</strong> Đặt quân hậu của hàng <code>row</code>, tức ghi giá trị cho <code>col[row]</code>.</li>
      <li><strong>Thử lựa chọn nào?</strong> Vòng lặp <code>for (c = 0; c &lt; n; c++)</code> — thử mọi cột.</li>
      <li><strong>Điều kiện chấp nhận?</strong> Hàm <code>isValid(row, c)</code>: duyệt các hàng <code>r &lt; row</code> đã đặt, loại ngay nếu <code>col[r] == c</code> (cùng cột) hoặc <code>abs(col[r] - c) == abs(r - row)</code> (cùng đường chéo).</li>
      <li><strong>Khi nào là nghiệm hoàn chỉnh?</strong> Khi <code>row == n</code>, tức mọi hàng đều đã có quân hậu — tăng biến đếm lên 1.</li>
    </ol>
    <p>Cũng như bài trước, không cần dòng hoàn tác tường minh: <code>col[row]</code> bị ghi đè ở lượt lặp sau, và khi đã lùi khỏi hàng <code>row</code> thì <code>isValid</code> chỉ đọc <code>col[0..row-1]</code> nên không bao giờ đọc lại giá trị cũ đó nữa.</p>
  </template>

  <template #chay-tay>
    <p>Chạy tay bàn 4×4, lần theo đúng thứ tự chương trình thử, cho tới khi tìm được nghiệm đầu tiên (1, 3, 0, 2):</p>
    <table class="formula-table">
      <tr><th>Bước</th><th>Đang xét</th><th>Kết quả kiểm tra</th><th>Hành động</th></tr>
      <tr><td>1</td><td>hàng 0, cột 0</td><td>hợp lệ (bàn còn trống)</td><td>đặt, xuống hàng 1</td></tr>
      <tr><td>2</td><td>hàng 1, cột 0</td><td>trùng cột với hàng 0</td><td>bỏ, thử cột kế</td></tr>
      <tr><td>3</td><td>hàng 1, cột 1</td><td>trùng chéo với hàng 0</td><td>bỏ, thử cột kế</td></tr>
      <tr><td>4</td><td>hàng 1, cột 2</td><td>hợp lệ</td><td>đặt, xuống hàng 2</td></tr>
      <tr><td>5</td><td>hàng 2, cột 0..3</td><td>cột nào cũng bị ăn</td><td>ngõ cụt, lùi về hàng 1</td></tr>
      <tr><td>6</td><td>hàng 1, cột 3</td><td>hợp lệ</td><td>đặt, xuống hàng 2</td></tr>
      <tr><td>7</td><td>hàng 2, cột 1</td><td>hợp lệ</td><td>đặt, xuống hàng 3</td></tr>
      <tr><td>8</td><td>hàng 3, cột 0..3</td><td>cột nào cũng bị ăn</td><td>ngõ cụt, lùi dần về hàng 0</td></tr>
      <tr><td>9</td><td>hàng 0, cột 1</td><td>hợp lệ</td><td>đặt, xuống hàng 1</td></tr>
      <tr><td>10</td><td>hàng 1, cột 3</td><td>hợp lệ</td><td>đặt, xuống hàng 2</td></tr>
      <tr><td>11</td><td>hàng 2, cột 0</td><td>hợp lệ</td><td>đặt, xuống hàng 3</td></tr>
      <tr><td>12</td><td>hàng 3, cột 2</td><td>hợp lệ, <code>row == n</code></td><td>đếm nghiệm (1, 3, 0, 2)</td></tr>
    </table>
    <p>Chương trình chạy tiếp và tìm thêm nghiệm đối xứng (2, 0, 3, 1), tổng cộng 2 cách — khớp với output mẫu của đề.</p>
  </template>

  <template #code>
<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int n, col[30];      // col[r] = cột đặt quân hậu ở hàng r
long long count_ways = 0;

bool isValid(int row, int c) {
    for (int r = 0; r &lt; row; r++) {
        if (col[r] == c) return false;                     // cùng cột
        if (abs(col[r] - c) == abs(r - row)) return false; // cùng đường chéo
    }
    return true;
}

void backtrack(int row) {
    if (row == n) { count_ways++; return; }   // đủ n hàng: có 1 nghiệm
    for (int c = 0; c &lt; n; c++) {
        if (isValid(row, c)) {                // CẮT NHÁNH ngay tại đây
            col[row] = c;                     // THỬ
            backtrack(row + 1);               // ĐI SÂU
            // không cần HOÀN TÁC: col[row] bị ghi đè ở lượt sau
        }
    }
}

int main() {
    int T; cin &gt;&gt; T;
    while (T--) {
        cin &gt;&gt; n;
        count_ways = 0;
        backtrack(0);
        cout &lt;&lt; count_ways &lt;&lt; "\n";
    }
    return 0;
}</code></pre>
    <blockquote><p>📎 <strong>Vì sao gán <code>col[row] = c</code> sau khi gọi <code>isValid</code>, không phải trước?</strong> Vì <code>isValid(row, c)</code> chỉ hỏi giả định "nếu đặt vào ô này thì có ổn không" — lúc đó chưa đặt gì cả. Chỉ khi câu trả lời là đúng, dòng gán mới chốt lại lựa chọn, để <code>backtrack(row + 1)</code> đọc được ở hàng sau.</p></blockquote>
  </template>

  <template #toi-uu>
    <p>Điểm chậm của code trên nằm ở <code>isValid</code>: mỗi lần muốn đặt một quân, nó phải quét lại toàn bộ các hàng phía trên, tốn khoảng n phép so sánh. Ta thay việc quét lại đó bằng <strong>3 mảng đánh dấu</strong>, mỗi mảng ghi sẵn "đường này đã bị chiếm chưa":</p>
    <ul>
      <li><code>usedCol[c]</code> — cột c đã có hậu chưa.</li>
      <li><code>usedD1[r - c + n]</code> — đường chéo chính đã có hậu chưa (cộng thêm n để chỉ số không âm).</li>
      <li><code>usedD2[r + c]</code> — đường chéo phụ đã có hậu chưa.</li>
    </ul>
    <p>Kiểm tra hợp lệ giờ chỉ còn 3 phép đọc mảng, tức <strong>O(1)</strong> thay vì O(n). Đổi lại, vì 3 mảng này là <strong>biến trạng thái phụ</strong> không tự bị ghi đè, nên lần này bạn <strong>bắt buộc phải viết dòng hoàn tác tường minh</strong> — đặt cả 3 về false ngay sau lời gọi đệ quy, nếu không thì nhánh kế tiếp sẽ tưởng những đường đó vẫn đang bị chiếm và bỏ sót nghiệm.</p>
<pre v-pre><code>bool usedCol[30], usedD1[70], usedD2[70];

void backtrack(int row) {
    if (row == n) { count_ways++; return; }
    for (int c = 0; c &lt; n; c++) {
        if (usedCol[c] || usedD1[row - c + n] || usedD2[row + c]) continue;
        usedCol[c] = usedD1[row - c + n] = usedD2[row + c] = true;   // THỬ
        backtrack(row + 1);                                          // ĐI SÂU
        usedCol[c] = usedD1[row - c + n] = usedD2[row + c] = false;  // HOÀN TÁC
    }
}</code></pre>
    <p>Với n ≤ 10 như đề yêu cầu thì cả hai bản đều chạy tức thì, nhưng đây chính là kỹ thuật giúp giải được n = 14, 15 trở lên. Một cải tiến nữa: lời giải của bàn cờ đối xứng qua trục dọc, nên chỉ cần thử nửa số cột ở hàng 0 rồi nhân đôi kết quả.</p>
  </template>
</WorkedExample>

<p>Animation dưới đây chạy đúng từng bước của bảng chạy tay ở trên — bấm "Bước tiếp theo" để xem chương trình thử cột, phát hiện xung đột và lùi lại:</p>

<div class="widget">
  <div class="widget-label">Quay lui N-Queens với n=4 — theo dõi từng bước thử/lùi</div>
  <div id="d1NqBoard" style="display:flex; justify-content:center; margin: 1rem 0;"></div>
  <div class="caption" id="d1NqCaption">Bấm "Bước tiếp theo" để bắt đầu.</div>
  <div class="controls">
    <button class="secondary" id="d1NqPrev">← Lùi lại</button>
    <button id="d1NqNext">Bước tiếp theo →</button>
    <button class="secondary" id="d1NqReset">Chạy lại từ đầu</button>
  </div>
  <div class="step-info"><span id="d1NqStepNum">0</span> / <span id="d1NqStepTotal">0</span> bước — đã tìm thấy <span id="d1NqFound">0</span>/2 lời giải</div>
</div>

<p>Khi bấm hết animation, hãy để ý: mỗi lần gặp xung đột, chương trình không quay về từ đầu — nó chỉ thử cột tiếp theo ngay tại hàng đang đứng, đúng như khung <code>for (mỗi lựa chọn) { thử; đi sâu; }</code> bạn đã học.</p>

</LessonPart>

<LessonPart :sid="'quay-lui-xau-nhi-phan'" part="bai-tap">
  <PracticeSet :items="data.practice" />
</LessonPart>

<LessonPart :sid="'quay-lui-xau-nhi-phan'" part="leetcode">
  <LeetCodeList :items="data.leetcode" />
</LessonPart>

</section>
</template>

<script setup>
import { onMounted } from 'vue'
import LessonGoal from '../components/LessonGoal.vue'
import LessonPart from '../components/LessonPart.vue'
import QuizBlock from '../components/QuizBlock.vue'
import WorkedExample from '../components/WorkedExample.vue'
import PracticeSet from '../components/PracticeSet.vue'
import LeetCodeList from '../components/LeetCodeList.vue'
import data from '../data/lessons/quay-lui-xau-nhi-phan.js'
import { initQuayLuiXauNhiPhanWidgets } from '../widgets/quay-lui-xau-nhi-phan.js'

defineProps({ active: Boolean })

onMounted(() => {
  initQuayLuiXauNhiPhanWidgets()
})
</script>
