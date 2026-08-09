<template>
<section id="qhd-nen-tang" class="day-section" data-sid="qhd-nen-tang" v-show="active">

<h2>Quy Hoạch Động — Nền Tảng</h2>

<LessonGoal :sid="'qhd-nen-tang'">
  <ul><li v-for="(g, i) in data.goal" :key="i">{{ g }}</li></ul>
</LessonGoal>

<LessonPart :sid="'qhd-nen-tang'" part="ly-thuyet">

<h4>Quy hoạch động — ghi đáp án ra giấy nháp để lần sau khỏi tính lại</h4>

<p><strong>Đây là gì?</strong> Hãy tưởng tượng bạn đang làm một bài tập có nhiều câu hỏi con giống nhau lặp đi lặp lại. Nếu bạn giải xong câu 3, rồi 5 phút sau đề lại hỏi đúng câu 3 đó lần nữa, bạn không giải lại từ đầu — bạn ghi đáp án ra giấy nháp, lần sau chỉ cần nhìn lại giấy nháp là xong. <strong>Quy hoạch động (QHĐ / Dynamic Programming)</strong> làm đúng việc đó với các bài toán con: giải một lần, lưu kết quả vào một bảng, những lần sau cần tới cùng bài toán con đó thì tra bảng thay vì tính lại.</p>

<p><strong>Vì sao quan trọng?</strong> QHĐ chỉ áp dụng được — và chỉ đáng áp dụng — khi bài toán có đủ 3 khái niệm sau:</p>
<ol>
  <li><strong>Bài toán con gối nhau (overlapping subproblems)</strong>: cùng một bài toán con nhỏ bị hỏi lại nhiều lần trong quá trình giải bài toán lớn. Nếu mỗi bài toán con chỉ bị hỏi đúng 1 lần, ghi ra giấy nháp chẳng giúp được gì — QHĐ không có tác dụng.</li>
  <li><strong>Cấu trúc con tối ưu (optimal substructure)</strong>: lời giải tối ưu của bài toán lớn được ghép trực tiếp từ lời giải tối ưu của các bài toán con nhỏ hơn — không cần xét lại bài toán con theo cách khác.</li>
  <li><strong>Bảng lưu kết quả (thường gọi là <code>dp[]</code>)</strong>: chính là "giấy nháp" — một mảng hoặc bảng, mỗi ô lưu đáp án của đúng một bài toán con.</li>
</ol>

<p><strong>Làm sao dùng?</strong> Cùng một bài toán, có 3 cách viết code, đi từ chậm tới nhanh:</p>
<table class="formula-table">
  <tr><th>Cách viết</th><th>Cơ chế</th><th>Độ phức tạp thời gian (Fibonacci)</th></tr>
  <tr><td>Đệ quy thuần</td><td>Gọi lại hàm cho mọi bài toán con, không lưu gì cả — tính lại từ đầu mỗi lần cần</td><td>O(2<sup>n</sup>) — chậm theo cấp lũy thừa</td></tr>
  <tr><td>Đệ quy có nhớ (memoization)</td><td>Vẫn gọi đệ quy theo đúng thứ tự tự nhiên, nhưng tra bảng trước — nếu đã có đáp án thì trả về ngay, chưa có mới tính và lưu lại</td><td>O(n) — mỗi bài toán con chỉ tính đúng 1 lần</td></tr>
  <tr><td>Dựng bảng từ dưới lên (tabulation)</td><td>Không gọi đệ quy — lặp tuần tự từ base case, điền dần bảng <code>dp[]</code> tới khi tới bài toán lớn cần giải</td><td>O(n) — cùng tốc độ với đệ quy có nhớ, không tốn ngăn xếp gọi hàm</td></tr>
</table>
<p>3 cách viết luôn cho <strong>đáp án cuối cùng giống nhau</strong> — khác nhau ở thứ tự tính ra từng giá trị và ở việc có tốn ngăn xếp gọi hàm hay không. Trong phòng thi, dựng bảng từ dưới lên thường được chọn vì code ngắn, không lo tràn ngăn xếp đệ quy khi n lớn.</p>

</LessonPart>

<LessonPart :sid="'qhd-nen-tang'" part="vi-sao">

<p class="idea-label">🪜 Trả lời trực tiếp bài đổi tiền mà Tham lam làm sai</p>
<p>Nhớ lại bài Đổi tiền ở phần Tham lam, hệ mệnh giá <strong>{1, 3, 4}</strong>, cần đổi <strong>6đ</strong>:</p>
<table class="formula-table">
  <tr><th></th><th>Cách làm</th><th>Kết quả</th></tr>
  <tr><td><strong>Tham lam</strong></td><td>Chỉ đi 1 đường: lấy đồng lớn nhất trước (4), còn 2 → lấy 1, còn 1 → lấy 1. Không xét lại.</td><td>4+1+1 = <strong>3 đồng</strong></td></tr>
  <tr><td><strong>QHĐ</strong></td><td>Với MỖI số tiền từ 0 tới 6, thử <strong>cả 3 mệnh giá</strong> {1,3,4}, ghi nhớ số đồng ít nhất cho số tiền đó, dùng lại kết quả đã ghi nhớ cho số tiền nhỏ hơn.</td><td>3+3 = <strong>2 đồng</strong> (tối ưu thật)</td></tr>
</table>
<p>QHĐ ra đáp án đúng vì nó <strong>không bỏ sót khả năng nào</strong>: với số tiền 6, nó thử cả "lấy đồng 1 rồi giải bài toán con 5đ", "lấy đồng 3 rồi giải bài toán con 3đ", "lấy đồng 4 rồi giải bài toán con 2đ" — rồi <strong>so sánh cả 3</strong>, chọn cái tốt nhất. Tham lam chỉ thử 1 trong 3 khả năng đó (luôn là "lấy đồng lớn nhất") và tin luôn là nó tốt nhất — đó là lý do nó có thể sai.</p>

<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int coins[] = {1, 3, 4};
int numCoins = 3;

int minCoinsDP(int amount) {
    vector&lt;int&gt; dp(amount + 1, INT_MAX);
    dp[0] = 0;
    for (int i = 1; i &lt;= amount; i++) {
        for (int k = 0; k &lt; numCoins; k++) {
            int c = coins[k];
            if (c &lt;= i && dp[i - c] != INT_MAX) {
                dp[i] = min(dp[i], dp[i - c] + 1);
            }
        }
    }
    return dp[amount];
}

int main() {
    cout &lt;&lt; minCoinsDP(6);   // in ra: 2  (đúng bằng 3+3)
    return 0;
}</code></pre>

<p><strong>Chạy tay toàn bộ bảng <code>dp[]</code> từ 0 tới 6</strong>:</p>
<table class="formula-table">
  <tr><th>i</th><th>Thử từng mệnh giá c ≤ i</th><th>dp[i] = min(dp[i-c]+1)</th></tr>
  <tr><td>0</td><td>base case</td><td><strong>0</strong></td></tr>
  <tr><td>1</td><td>c=1: dp[0]+1=1</td><td><strong>1</strong></td></tr>
  <tr><td>2</td><td>c=1: dp[1]+1=2</td><td><strong>2</strong></td></tr>
  <tr><td>3</td><td>c=1: dp[2]+1=3. c=3: dp[0]+1=1</td><td><strong>1</strong> (chọn nhỏ nhất)</td></tr>
  <tr><td>4</td><td>c=1: dp[3]+1=2. c=3: dp[1]+1=2. c=4: dp[0]+1=1</td><td><strong>1</strong></td></tr>
  <tr><td>5</td><td>c=1: dp[4]+1=2. c=3: dp[2]+1=3. c=4: dp[1]+1=2</td><td><strong>2</strong></td></tr>
  <tr><td>6</td><td>c=1: dp[5]+1=3. c=3: dp[3]+1=2. c=4: dp[2]+1=3</td><td><strong>2</strong></td></tr>
</table>
<p>Kết quả <code>dp[6] = 2</code>, đúng bằng cách đổi 3+3 — khớp với đáp án tối ưu, không phải 3 đồng như Tham lam.</p>

<blockquote><p>📎 So sánh với đổi tiền hệ chuẩn ({25,10,5,1}) đã học ở phần Tham lam: về code, khác biệt duy nhất là Tham lam chỉ cần <strong>1 vòng lặp</strong> (chia lấy dư liên tục), còn QHĐ cần <strong>2 vòng lặp lồng nhau</strong> (1 vòng cho từng số tiền từ 0 tới amount, 1 vòng cho từng mệnh giá) — đây chính là "cái giá" phải trả để đảm bảo luôn đúng với mọi hệ mệnh giá, kể cả hệ "không chuẩn" như {1,3,4}.</p></blockquote>

<p class="idea-label">📊 Bảng so sánh Tham lam ↔ QHĐ</p>
<table class="formula-table">
  <tr><th></th><th>Tham lam</th><th>QHĐ</th></tr>
  <tr><td>Cách chọn</td><td>1 lựa chọn tốt nhất tại chỗ, không xét lại</td><td>Xét <strong>mọi</strong> lựa chọn hợp lệ ở mỗi bước, ghi nhớ đáp án bài toán con</td></tr>
  <tr><td>Tốc độ</td><td>Nhanh (thường O(n log n) do chỉ cần sort)</td><td>Chậm hơn (thường O(n²) hoặc hơn, vì phải tính hết mọi bài toán con)</td></tr>
  <tr><td>Độ tin cậy</td><td>Chỉ đúng nếu <strong>chứng minh được</strong> lựa chọn tốt nhất tại chỗ luôn nằm trong lời giải tối ưu (như "kết thúc sớm nhất" ở Activity Selection)</td><td><strong>Luôn đúng</strong> — vì không bỏ sót khả năng nào</td></tr>
  <tr><td>Khi nào dùng</td><td>Đã chứng minh được greedy đúng cho bài toán cụ thể đó</td><td>Không chứng minh được greedy đúng, hoặc biết chắc nó sai (như hệ tiền {1,3,4})</td></tr>
</table>

<blockquote><p>💡 <strong>Câu hỏi tự đặt ra khi đi thi</strong>: "Nếu tôi chọn cái tốt nhất ngay bây giờ, tôi có chắc không bao giờ hối hận ở các bước sau không?" Nếu câu trả lời là <strong>có</strong> và bạn giải thích được vì sao → dùng Tham lam. Nếu câu trả lời là <strong>"không chắc"</strong>, hoặc bạn tìm được 1 ví dụ mà cách chọn tốt nhất tại chỗ dẫn tới kết quả sai → phải dùng QHĐ.</p></blockquote>

<p>Nhóm bài này là <strong>nền tảng cho toàn bộ QHĐ nâng cao</strong> phía sau (dãy con tăng dài nhất, dãy con chung dài nhất, xâu đối xứng…) — mọi bài đó đều dùng lại đúng 4 bước tư duy bạn sẽ học ở 2 ví dụ dưới đây, chỉ đổi công thức truy hồi.</p>

<div class="realworld">
  <span class="rw-title">🌐 Ứng dụng thực tế</span>
  <dl>
    <dt>Dùng ở đâu</dt>
    <dd>Mô hình tăng trưởng trong tài chính (lãi kép đơn giản hóa); phân tích số lượng cách mã hóa/giải mã trong lý thuyết thông tin; bài toán đếm số cách trong game (số cách hoàn thành 1 chuỗi hành động); tối ưu tuyến đường giao hàng, phân bổ ngân sách.</dd>
    <dt>Giải quyết vấn đề gì</dt>
    <dd>Các bài toán tối ưu hoặc đếm số cách, mà lời giải lớn ghép được từ lời giải của các bài toán con nhỏ hơn, và các bài toán con đó lặp lại nhiều lần.</dd>
    <dt class="good">Khi nào NÊN dùng</dt>
    <dd class="good">Đã nhận ra bài toán có bài toán con gối nhau và cấu trúc con tối ưu — 2 dấu hiệu nhận biết ở phần Lý thuyết.</dd>
    <dt class="bad">Khi nào KHÔNG NÊN dùng</dt>
    <dd class="bad">Nếu chứng minh được tham lam đúng cho bài đó, dùng tham lam sẽ nhanh hơn hẳn, không cần bảng phụ. Nếu n cực lớn (hàng tỷ) và công thức truy hồi tuyến tính đơn giản, có kỹ thuật nhân ma trận (fast doubling) tính trong O(log n) thay vì O(n).</dd>
  </dl>
</div>

</LessonPart>

<LessonPart :sid="'qhd-nen-tang'" part="quiz">
  <QuizBlock :questions="data.quiz" />
</LessonPart>

<LessonPart :sid="'qhd-nen-tang'" part="vi-du">

<WorkedExample id="vd-fibonacci" title="Fibonacci — từ đệ quy chậm tới bảng nhanh">
  <template #de-bai>
    <p>Tính số Fibonacci thứ n, biết F(0)=0, F(1)=1, và F(n) = F(n-1) + F(n-2) với n ≥ 2.</p>
    <table class="formula-table">
      <tr><th>Input</th><th>Output</th></tr>
      <tr><td>n = 6</td><td>8</td></tr>
      <tr><td>n = 10</td><td>55</td></tr>
    </table>
  </template>

  <template #y-tuong>
    <p>Nếu ai đó hỏi "1+1+...+1 (10 số 1) bằng mấy?", bạn cộng ra 10. Nếu họ hỏi tiếp "vậy 11 số 1?", bạn <strong>không cộng lại từ đầu</strong> — bạn nhớ kết quả cũ là 10, chỉ cần 10+1=11. Fibonacci đúng bản chất đó: F(n) luôn ghép từ 2 kết quả nhỏ hơn đã biết.</p>
    <p>Nhưng nếu viết bằng đệ quy thuần, hàm không nhớ gì cả — mỗi lần cần F(n-1) hay F(n-2), nó gọi lại hàm và tính từ đầu. Vẽ cây gọi đệ quy cho F(5):</p>
    <p style="text-align:center; font-family:monospace; font-size:0.95rem; margin:1rem 0; line-height:1.6;">
      F(5)<br>
      &nbsp;├─ F(4)<br>
      &nbsp;│&nbsp;&nbsp;├─ F(3)<br>
      &nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├─ F(2) ...<br>
      &nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;└─ F(1)<br>
      &nbsp;│&nbsp;&nbsp;└─ F(2) ← tính lại lần 2<br>
      &nbsp;└─ F(3) ← tính lại lần 2, kéo theo F(2) tính lại thêm lần nữa
    </p>
    <p><code>F(3)</code> bị tính lại, <code>F(2)</code> bị tính lại nhiều lần hơn nữa — đây chính là <strong>bài toán con gối nhau</strong>. Số lần tính lại tăng theo cấp lũy thừa khi n lớn lên, khiến đệ quy thuần trở nên rất chậm.</p>
  </template>

  <template #thuat-toan>
    <p>4 bước tư duy để giải mọi bài QHĐ, áp dụng cho Fibonacci:</p>
    <ol>
      <li><strong><code>dp[i]</code> nghĩa là gì</strong>: số Fibonacci thứ i.</li>
      <li><strong>Công thức truy hồi</strong>: <code>dp[i] = dp[i-1] + dp[i-2]</code>.</li>
      <li><strong>Base case</strong>: <code>dp[0] = 0</code>, <code>dp[1] = 1</code>.</li>
      <li><strong>Thứ tự tính</strong>: tăng dần từ i=2 tới n, vì <code>dp[i]</code> luôn cần 2 giá trị liền trước đã tính xong.</li>
    </ol>
    <p>Đệ quy có nhớ dùng đúng công thức này nhưng gọi hàm theo thứ tự tự nhiên (từ n lùi về base case, tra bảng trước khi tính); dựng bảng từ dưới lên lặp xuôi từ base case tới n — cả 2 đều tính mỗi <code>dp[i]</code> đúng 1 lần.</p>
  </template>

  <template #chay-tay>
    <p>Chạy tay dựng bảng từ dưới lên cho n = 6:</p>
    <table class="formula-table">
      <tr><th>i</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr>
      <tr><td>dp[i]</td><td>0</td><td>1</td><td>0+1=1</td><td>1+1=2</td><td>1+2=3</td><td>2+3=5</td><td>3+5=<strong>8</strong></td></tr>
    </table>
    <p>Kết quả F(6) = <strong>8</strong>, mỗi ô chỉ cần nhìn lại đúng 2 ô liền trước, không cần tính lại gì.</p>
  </template>

  <template #code>
<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

// Cách 1: đệ quy thuần — chậm, chỉ để thấy vấn đề
int fibNaive(int n) {
    if (n &lt;= 1) return n;
    return fibNaive(n - 1) + fibNaive(n - 2);   // tính lại rất nhiều lần
}

// Cách 2: đệ quy có nhớ (memoization)
int memo[100];
bool visited[100];
int fibMemo(int n) {
    if (n &lt;= 1) return n;
    if (visited[n]) return memo[n];             // đã tính rồi, tra bảng luôn
    visited[n] = true;
    return memo[n] = fibMemo(n - 1) + fibMemo(n - 2);
}

// Cách 3: dựng bảng từ dưới lên (tabulation)
int fibDP(int n) {
    vector&lt;int&gt; dp(n + 1);
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i &lt;= n; i++) dp[i] = dp[i-1] + dp[i-2];
    return dp[n];
}

int main() {
    cout &lt;&lt; fibDP(10);   // in ra: 55
    return 0;
}</code></pre>
  </template>

  <template #toi-uu>
    <p>Nhìn kỹ công thức truy hồi <code>dp[i] = dp[i-1] + dp[i-2]</code>: mỗi bước chỉ cần đúng 2 giá trị liền trước, không cần giữ lại toàn bộ mảng <code>dp[]</code>. Có thể thay bằng 2 biến, giảm bộ nhớ từ O(n) xuống <strong>O(1)</strong>:</p>
<pre v-pre><code>int fibOptimized(int n) {
    if (n &lt;= 1) return n;
    int prev2 = 0, prev1 = 1;
    for (int i = 2; i &lt;= n; i++) {
        int cur = prev1 + prev2;
        prev2 = prev1;
        prev1 = cur;
    }
    return prev1;
}</code></pre>
    <p>Đây là mẹo tối ưu bộ nhớ rất phổ biến ở các bài QHĐ có công thức truy hồi "tuyến tính bậc thấp" (chỉ phụ thuộc vài bước liền trước) — không phải bài nào cũng làm được, vì có bài cần nhìn lại nguyên cả bảng (như 2 ví dụ bài tập đường đi trên lưới bên dưới).</p>
  </template>
</WorkedExample>

<p>Bấm "Bước tiếp theo" để xem bảng <code>dp[]</code> được lấp đầy từng ô theo đúng thứ tự dựng bảng từ dưới lên:</p>

<div class="widget">
  <div class="widget-label">Bảng dp[] — Fibonacci đến F(10)</div>
  <div id="d6FibView" style="display:flex; flex-wrap:wrap; justify-content:center; gap: 8px; margin: 1rem 0;"></div>
  <div class="caption" id="d6FibCaption">Bấm "Bước tiếp theo" để bắt đầu.</div>
  <div class="controls">
    <button class="secondary" id="d6FibPrev">← Lùi lại</button>
    <button id="d6FibNext">Bước tiếp theo →</button>
    <button class="secondary" id="d6FibReset">Chạy lại từ đầu</button>
  </div>
  <div class="step-info"><span id="d6FibStepNum">0</span> / <span id="d6FibStepTotal">0</span> bước</div>
</div>

<WorkedExample id="vd-bac-thang" title="Leo bậc thang">
  <template #de-bai>
    <p>Cho n bậc thang, mỗi lần bước được 1 hoặc 2 bậc. Đếm số cách khác nhau để lên tới bậc thứ n.</p>
    <table class="formula-table">
      <tr><th>Input</th><th>Output</th></tr>
      <tr><td>n = 5</td><td>8</td></tr>
    </table>
  </template>

  <template #y-tuong>
    <p>Để lên tới bậc n, bước cuối cùng chỉ có 2 khả năng: <strong>bước 1 bậc từ bậc n-1</strong>, hoặc <strong>bước 2 bậc từ bậc n-2</strong> — không còn khả năng nào khác. Vậy tổng số cách lên tới bậc n bằng tổng số cách lên tới bậc n-1 và số cách lên tới bậc n-2, vì mỗi cách lên tới 1 trong 2 bậc đó đều ghép thêm được đúng 1 bước cuối để tới bậc n.</p>
  </template>

  <template #thuat-toan>
    <p>4 bước tư duy:</p>
    <ol>
      <li><strong><code>dp[i]</code> nghĩa là gì</strong>: số cách khác nhau để lên tới bậc thứ i.</li>
      <li><strong>Công thức truy hồi</strong>: <code>dp[i] = dp[i-1] + dp[i-2]</code> — giống hệt Fibonacci về mặt công thức, vì lý do bước cuối chỉ có 2 khả năng vừa nêu.</li>
      <li><strong>Base case</strong>: <code>dp[0] = 1</code> (đứng nguyên tại chân thang, có đúng 1 cách "không bước nào"), <code>dp[1] = 1</code> (chỉ có 1 cách: bước 1 bậc).</li>
      <li><strong>Thứ tự tính</strong>: tăng dần từ i=2 tới n.</li>
    </ol>
  </template>

  <template #chay-tay>
    <p>Chạy tay cho n = 5:</p>
    <table class="formula-table">
      <tr><th>i</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr>
      <tr><td>dp[i]</td><td>1</td><td>1</td><td>1+1=2</td><td>2+1=3</td><td>3+2=5</td><td>5+3=<strong>8</strong></td></tr>
    </table>
    <p>Kết quả: có <strong>8</strong> cách lên tới bậc 5 — khớp đúng câu hỏi quiz ở trên.</p>
  </template>

  <template #code>
<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int climbStairs(int n) {
    if (n &lt;= 1) return 1;
    vector&lt;int&gt; dp(n + 1);
    dp[0] = 1; dp[1] = 1;
    for (int i = 2; i &lt;= n; i++) dp[i] = dp[i-1] + dp[i-2];
    return dp[n];
}

int main() {
    cout &lt;&lt; climbStairs(5);   // in ra: 8
    return 0;
}</code></pre>
  </template>

  <template #toi-uu>
    <p><strong>Biến thể có chi phí mỗi bậc</strong> (ví dụ LeetCode 746 — Min Cost Climbing Stairs): mỗi bậc i có 1 chi phí <code>cost[i]</code> khi bạn đặt chân lên, và câu hỏi đổi từ "đếm số cách" sang "tìm tổng chi phí NHỎ NHẤT để lên hết thang". Cách đọc đề để nhận ra vẫn là cùng công thức truy hồi: bước cuối tới bậc i vẫn chỉ từ i-1 hoặc i-2, chỉ đổi phép cộng "đếm số cách" (<code>dp[i] = dp[i-1] + dp[i-2]</code>) thành phép chọn "tốt nhất" (<code>dp[i] = min(dp[i-1], dp[i-2]) + cost[i]</code>). Cùng 1 cấu trúc bài toán, chỉ đổi <strong>phép toán ghép bài toán con</strong> từ cộng sang min — đây là mẹo nhận diện rất hữu ích: nhiều bài QHĐ khác nhau về đề bài nhưng dùng chung 1 khung tư duy, chỉ khác phép toán ở công thức truy hồi.</p>
  </template>
</WorkedExample>

</LessonPart>

<LessonPart :sid="'qhd-nen-tang'" part="bai-tap">
  <PracticeSet :items="data.practice" />
</LessonPart>

<LessonPart :sid="'qhd-nen-tang'" part="leetcode">
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
import data from '../data/lessons/qhd-nen-tang.js'
import { initQhdNenTangWidgets } from '../widgets/qhd-nen-tang.js'

defineProps({ active: Boolean })

onMounted(() => {
  initQhdNenTangWidgets()
})
</script>
