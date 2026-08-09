<template>
<section id="qhd-lis-lcs-doixung" class="day-section" data-sid="qhd-lis-lcs-doixung" v-show="active">

<h2>QHĐ Nâng Cao — Knapsack, LIS, LCS, Xâu Đối Xứng <span class="exam-tag">★ Đề ôn tập</span></h2>

<LessonGoal :sid="'qhd-lis-lcs-doixung'">
  <ul><li v-for="(g, i) in data.goal" :key="i">{{ g }}</li></ul>
</LessonGoal>

<LessonPart :sid="'qhd-lis-lcs-doixung'" part="ly-thuyet">

<h3 id="auto-4-buoc-dat-bai-qhd">4 bước đặt bài quy hoạch động — dùng lại cho mọi bài trong nhóm này</h3>
<p><strong>Đây là gì?</strong> Mọi bài QHĐ ở bài này — Knapsack, LIS, LCS, Xâu đối xứng — đều được đặt ra bằng đúng 4 câu hỏi theo thứ tự cố định:</p>
<ol>
  <li><strong>Trạng thái là gì</strong>: <code>dp[...]</code> đại diện cho câu hỏi nào (ví dụ "giá trị tốt nhất khi xét i món đầu, sức chứa j" hay "độ dài LIS kết thúc tại vị trí i").</li>
  <li><strong>Lựa chọn ở mỗi bước</strong>: đứng ở trạng thái đó, có những cách đi tiếp nào (lấy hay không lấy? ký tự này có khớp không?).</li>
  <li><strong>Công thức truy hồi</strong>: ghép trạng thái hiện tại từ trạng thái nhỏ hơn đã biết, dựa trên các lựa chọn ở bước 2.</li>
  <li><strong>Điều kiện biên và thứ tự tính</strong>: giá trị khởi đầu (base case) là gì, và phải điền bảng theo thứ tự nào để mọi ô cần tới đều đã có sẵn khi tính tới nó.</li>
</ol>
<p><strong>Vì sao quan trọng?</strong> Nối tiếp trực tiếp QHĐ nền tảng bạn học ở bài trước — chỗ khác duy nhất là bảng <code>dp</code> ở đó chỉ có 1 chiều (1 chỉ số), còn 4 bài trong nhóm này cần bảng <strong>2 chiều</strong> (Knapsack, LCS, Xâu đối xứng) hoặc phải nhìn lại toàn bộ các vị trí trước đó (LIS). Đây là bước nâng cấp tự nhiên: cùng 1 cách tư duy, chỉ đổi số chiều của bảng.</p>

<p class="idea-label">⚠️ Bẫy hay gặp nhất: "dãy con" và "đoạn con" không phải cùng 1 thứ</p>
<table class="formula-table">
  <tr><th></th><th>Dãy con (subsequence)</th><th>Đoạn con (substring)</th></tr>
  <tr><td>Được bỏ ký tự/phần tử ở giữa?</td><td>Được — chỉ cần giữ đúng thứ tự</td><td>KHÔNG — phải liền nhau tuyệt đối</td></tr>
  <tr><td>Bài dùng khái niệm này trong nhóm này</td><td>LIS (dãy con tăng dài nhất), LCS (dãy con chung dài nhất)</td><td>Xâu con đối xứng dài nhất (substring)</td></tr>
  <tr><td>Ví dụ trên "abcde"</td><td>"ace" là 1 dãy con hợp lệ</td><td>"ace" KHÔNG phải đoạn con hợp lệ (không liền nhau); "abc" mới là đoạn con</td></tr>
</table>
<p>Đọc sai chữ "dãy con" thành "đoạn con" (hoặc ngược lại) là lý do phổ biến nhất khiến bài làm đúng thuật toán nhưng ra công thức truy hồi sai ngay từ đầu. Luôn đọc lại đúng 1 từ này trong đề trước khi đặt <code>dp</code>.</p>

<p class="idea-label">📐 Hình ảnh đọc bảng dp 2 chiều</p>
<p>Với cả Knapsack và LCS, hãy tưởng tượng bảng <code>dp</code> là 1 tấm lưới ô vuông: điền <strong>từ trái sang phải, từ trên xuống dưới</strong>, mỗi ô chỉ cần nhìn 1-3 ô đã điền trước nó (ô bên trái, ô bên trên, hoặc ô chéo trên-trái) — không bao giờ cần nhìn ô chưa điền. Với Xâu đối xứng, thứ tự điền đổi thành "theo độ dài đoạn tăng dần" (không phải theo hàng/cột), vì công thức ở đó cần đoạn ngắn hơn ở giữa đã tính trước, không nằm ngay hàng trên hay cột trái.</p>

<p class="idea-label">📊 Tóm tắt nhanh 2 bài LCS và Xâu đối xứng (đề có hỏi trực tiếp)</p>
<table class="formula-table">
  <tr><th></th><th>LCS — Xâu con chung dài nhất</th><th>Xâu con đối xứng dài nhất</th></tr>
  <tr><td>Khái niệm</td><td>Dãy con (subsequence) — được bỏ ký tự</td><td>Đoạn con (substring) — phải liền nhau</td></tr>
  <tr><td>Trạng thái</td><td><code>dp[i][j]</code> = độ dài LCS giữa i ký tự đầu S1 và j ký tự đầu S2</td><td><code>dp[i][j]</code> = đoạn <code>s[i..j]</code> có đối xứng hay không (true/false)</td></tr>
  <tr><td>Công thức truy hồi</td><td>Trùng ký tự: <code>dp[i][j]=dp[i-1][j-1]+1</code>. Không trùng: <code>dp[i][j]=max(dp[i-1][j], dp[i][j-1])</code></td><td><code>dp[i][j] = (s[i]==s[j]) && (đoạn ≤2 ký tự hoặc dp[i+1][j-1])</code></td></tr>
  <tr><td>Kết quả nằm ở ô nào</td><td><code>dp[n][m]</code> (góc dưới-phải của bảng, ứng với xét hết cả 2 xâu)</td><td>Ô <code>dp[i][j]=true</code> có <code>j-i</code> lớn nhất trong toàn bảng</td></tr>
</table>

<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

// LCS — dãy con chung dài nhất
int lcs(string s1, string s2) {
    int n = s1.size(), m = s2.size();
    vector&lt;vector&lt;int&gt;&gt; dp(n + 1, vector&lt;int&gt;(m + 1, 0));
    for (int i = 1; i &lt;= n; i++)
        for (int j = 1; j &lt;= m; j++) {
            if (s1[i - 1] == s2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
            else dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
        }
    return dp[n][m];
}

// Xâu con đối xứng dài nhất
bool dp[1005][1005];
string longestPalindrome(string s) {
    int n = s.size(), start = 0, maxLen = 1;
    for (int i = 0; i &lt; n; i++) dp[i][i] = true;
    for (int len = 2; len &lt;= n; len++) {
        for (int i = 0; i + len - 1 &lt; n; i++) {
            int j = i + len - 1;
            if (len == 2) dp[i][j] = (s[i] == s[j]);
            else dp[i][j] = (s[i] == s[j]) && dp[i+1][j-1];
            if (dp[i][j] && len &gt; maxLen) { maxLen = len; start = i; }
        }
    }
    return s.substr(start, maxLen);
}</code></pre>

<blockquote><p>⚠️ <strong>Bẫy hay gặp</strong>: LCS (subsequence, được bỏ ký tự) khác hẳn "xâu con liên tiếp dài nhất" (substring) — 2 bài dùng công thức khác hẳn nhau, đừng lẫn.</p></blockquote>

</LessonPart>

<LessonPart :sid="'qhd-lis-lcs-doixung'" part="vi-sao">

<p class="idea-label">🪜 Từ bảng 1 chiều lên bảng 2 chiều</p>
<p>Ở bài QHĐ nền tảng, mọi bảng <code>dp</code> chỉ có 1 chỉ số (<code>dp[i]</code>) vì bài toán chỉ có 1 "chiều thay đổi" (số bậc thang, số tiền cần đổi...). 4 bài trong nhóm này thêm 1 chiều thứ hai vào bảng vì bài toán có 2 thứ đang thay đổi cùng lúc:</p>
<table class="formula-table">
  <tr><th>Bài</th><th>2 chiều của dp là gì</th></tr>
  <tr><td>Knapsack 0/1</td><td>Đã xét bao nhiêu món (i) × ba lô còn dư bao nhiêu chỗ (w)</td></tr>
  <tr><td>LCS</td><td>Đã xét bao nhiêu ký tự của xâu 1 (i) × đã xét bao nhiêu ký tự của xâu 2 (j)</td></tr>
  <tr><td>Xâu đối xứng</td><td>Điểm bắt đầu đoạn (i) × điểm kết thúc đoạn (j)</td></tr>
</table>
<p>LIS là ngoại lệ: vẫn 1 chiều (<code>dp[i]</code>), nhưng để tính 1 ô lại phải nhìn lại <strong>toàn bộ</strong> các ô phía trước nó, không chỉ 1-2 ô liền kề như Fibonacci hay Leo thang — đây là lý do LIS có độ phức tạp O(n²) chứ không phải O(n).</p>

<p>4 bài này không phải chỉ để luyện tư duy — chúng là <strong>khung của rất nhiều bài biến thể</strong> khác trong đề thi và trên LeetCode. Đổi 1 chi tiết nhỏ trong đề bài, công thức truy hồi đổi theo nhưng khung 4 bước và cách đọc bảng vẫn giữ nguyên:</p>
<ul>
  <li>Knapsack đổi "giá trị lớn nhất" thành "đếm số cách" → Target Sum, Partition Equal Subset Sum.</li>
  <li>LCS đổi "giữ nguyên ký tự khớp" thành "cho phép sửa/xóa/thêm ký tự" → Edit Distance.</li>
  <li>LIS đổi "dãy số" thành "cặp số cần thỏa 2 điều kiện" → Russian Doll Envelopes.</li>
  <li>Xâu đối xứng đổi "tìm đoạn dài nhất" thành "đếm tổng số đoạn" → Palindromic Substrings.</li>
</ul>
<p>Nhận ra được 1 bài lạ thực chất là bài quen "cải trang" — đó chính là kỹ năng mà việc học kỹ 4 bài gốc này mang lại.</p>

</LessonPart>

<LessonPart :sid="'qhd-lis-lcs-doixung'" part="quiz">
  <QuizBlock :questions="data.quiz" />
</LessonPart>

<LessonPart :sid="'qhd-lis-lcs-doixung'" part="vi-du">

<WorkedExample id="vd-knapsack" title="Cái túi 0/1 (Knapsack)" :official="true">
  <template #de-bai>
    <p>Bạn có 1 cái ba lô chỉ chịu được tối đa <strong>W kg</strong>. Có n món đồ, mỗi món có <strong>trọng lượng</strong> và <strong>giá trị</strong> riêng. Chọn 1 tập con các món đồ để nhét vào ba lô, sao cho <strong>tổng trọng lượng không vượt W</strong> và <strong>tổng giá trị lớn nhất có thể</strong>.</p>
    <p>"0/1" nghĩa là: với mỗi món đồ, chỉ có <strong>đúng 2 lựa chọn</strong> — lấy NGUYÊN món đó (không được bẻ/cắt nhỏ ra lấy 1 phần), hoặc không lấy gì cả.</p>
    <table class="formula-table">
      <tr><th>Input</th><th>Output</th></tr>
      <tr><td>3 vật (w=2,v=3), (w=3,v=4), (w=4,v=5), W=5</td><td>7</td></tr>
    </table>
  </template>

  <template #y-tuong>
    <p>Phản xạ tự nhiên: ưu tiên lấy món có <strong>tỉ lệ giá trị/trọng lượng cao nhất</strong> trước (giống Tham lam). Thử với 3 món, ba lô W=50:</p>
    <table class="formula-table">
      <tr><th>Món</th><th>Trọng lượng</th><th>Giá trị</th><th>Tỉ lệ giá trị/kg</th></tr>
      <tr><td>A</td><td>10</td><td>60</td><td>6</td></tr>
      <tr><td>B</td><td>20</td><td>100</td><td>5</td></tr>
      <tr><td>C</td><td>30</td><td>120</td><td>4</td></tr>
    </table>
    <table class="formula-table">
      <tr><th>Chiến lược</th><th>Chọn theo thứ tự</th><th>Kết quả</th></tr>
      <tr><td>Tham lam (tỉ lệ cao nhất trước)</td><td>Lấy A (còn dư 40kg) → lấy B (còn dư 20kg) → C (30kg) không vừa → dừng</td><td>Giá trị = 60+100 = <strong>160</strong></td></tr>
      <tr><td>Cách tốt nhất thực sự</td><td>Lấy B + C = 20+30 = 50kg (vừa khít W)</td><td>Giá trị = 100+120 = <strong>220</strong></td></tr>
    </table>
    <p>Tham lam theo tỉ lệ cho ra 160, nhưng đáp án đúng là 220 — <strong>Tham lam sai</strong>: không có cách chọn nào ở đây chứng minh được luôn an toàn, khác với Activity Selection. Với mỗi món đồ, chỉ có 2 lựa chọn (lấy/không lấy) — nếu dùng Quay lui thuần, cây quyết định có tới <strong>2ⁿ nhánh</strong>, quá chậm khi n lớn. Nhưng rất nhiều nhánh khác nhau lại dẫn tới <strong>cùng 1 trạng thái</strong> — ví dụ "đã xét xong 2 món đầu, ba lô còn dư đúng 3kg" — đây chính là <strong>"overlapping subproblems"</strong> bạn đã gặp ở Fibonacci, QHĐ tránh tính lại bằng cách ghi nhớ đáp án cho từng trạng thái <code>(i, j)</code>.</p>
  </template>

  <template #thuat-toan>
    <ol>
      <li><strong><code>dp[i][j]</code> nghĩa là gì</strong>: giá trị lớn nhất đạt được khi chỉ xét <strong>i món đầu tiên</strong>, với ba lô sức chứa tối đa <strong>j</strong>.</li>
      <li><strong>Công thức truy hồi</strong>: với món thứ i, chỉ có 2 lựa chọn — <strong>không lấy</strong> (<code>dp[i-1][j]</code>) hoặc <strong>lấy</strong> nếu nó vừa (<code>weight[i] ≤ j</code>): <code>value[i] + dp[i-1][j-weight[i]]</code>. Chọn cách nào cho giá trị <strong>lớn hơn</strong>.</li>
      <li><strong>Base case</strong>: <code>dp[0][j] = 0</code> (chưa xét món nào thì giá trị luôn = 0, bất kể ba lô còn bao nhiêu chỗ).</li>
      <li><strong>Thứ tự tính</strong>: tăng dần theo cả i và j.</li>
    </ol>
  </template>

  <template #chay-tay>
    <p>3 vật (w=2,v=3), (w=3,v=4), (w=4,v=5), ba lô W=5. Vài ô đầu tiên của bảng <code>dp[i][j]</code>:</p>
    <table class="formula-table">
      <tr><th>dp[i][j]</th><th>j=0</th><th>j=1</th><th>j=2</th><th>j=3</th><th>j=4</th><th>j=5</th></tr>
      <tr><th>i=0 (chưa xét vật nào)</th><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
      <tr><th>i=1 (vật w=2,v=3)</th><td>0</td><td>0</td><td>3</td><td>3</td><td>3</td><td>3</td></tr>
    </table>
    <p>Đọc ô <code>dp[1][2]</code>: xét vật 1 (w=2,v=3), ba lô j=2. Không lấy → 0. Lấy (vì 2≤2 vừa) → <code>3 + dp[0][0] = 3+0 = 3</code>. Chọn max(0,3) = <strong>3</strong>. Đọc ô <code>dp[1][1]</code>: vật w=2 không vừa ba lô j=1 (2&gt;1) → chỉ có thể không lấy → <strong>0</strong>. Bấm "Bước tiếp theo" để xem máy tính điền tiếp toàn bộ bảng theo đúng logic này, kết quả cuối <code>dp[3][5] = 7</code>. Muốn <strong>truy vết</strong> ra chọn món nào: từ ô <code>dp[3][5]</code>, nếu nó khác <code>dp[2][5]</code> thì vật 3 chắc chắn được lấy — lùi tới <code>dp[2][5-4]=dp[2][1]</code>, lặp lại so sánh cho tới i=0.</p>
    <div class="widget">
      <div class="widget-label">Bảng dp[i][j] — 0/1 Knapsack, 3 vật (w=2,v=3)(w=3,v=4)(w=4,v=5), W=5</div>
      <div id="d7KnapTable" style="overflow-x:auto; margin: 1rem 0;"></div>
      <div class="caption" id="d7KnapCaption">Bấm "Bước tiếp theo" để bắt đầu.</div>
      <div class="controls">
        <button class="secondary" id="d7KnapPrev">← Lùi lại</button>
        <button id="d7KnapNext">Bước tiếp theo →</button>
        <button class="secondary" id="d7KnapReset">Chạy lại từ đầu</button>
      </div>
      <div class="step-info"><span id="d7KnapStepNum">0</span> / <span id="d7KnapStepTotal">0</span> bước</div>
    </div>
    <blockquote><p>🎯 Tự vẽ lại đúng bảng trên bằng tay với 1 bộ số liệu khác (ví dụ ví dụ A,B,C ở trên). Nếu bạn tự điền được toàn bộ bảng mà không cần xem lại — bạn đã hiểu 0/1 Knapsack thật sự.</p></blockquote>
  </template>

  <template #code>
<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int knapsack01(int weight[], int value[], int n, int capacity) {
    vector&lt;vector&lt;int&gt;&gt; dp(n + 1, vector&lt;int&gt;(capacity + 1, 0));
    for (int i = 1; i &lt;= n; i++) {
        for (int j = 0; j &lt;= capacity; j++) {
            dp[i][j] = dp[i - 1][j];   // không lấy vật i
            if (weight[i - 1] &lt;= j) {
                dp[i][j] = max(dp[i][j], value[i - 1] + dp[i - 1][j - weight[i - 1]]);   // lấy vật i
            }
        }
    }
    return dp[n][capacity];
}

int main() {
    int weight[] = {2, 3, 4};
    int value[]  = {3, 4, 5};
    cout &lt;&lt; knapsack01(weight, value, 3, 5);   // in ra: 7
    return 0;
}</code></pre>
  </template>

  <template #toi-uu>
    <p>Nhìn kỹ công thức: <code>dp[i][j]</code> chỉ cần dòng <code>dp[i-1][...]</code> ngay trước nó, không cần giữ lại mọi dòng cũ hơn — có thể rút bảng 2 chiều xuống <strong>1 mảng 1 chiều</strong> <code>dp[j]</code>, giảm bộ nhớ từ O(n×W) xuống O(W):</p>
<pre v-pre><code>int knapsack01Optimized(int weight[], int value[], int n, int capacity) {
    vector&lt;int&gt; dp(capacity + 1, 0);
    for (int i = 0; i &lt; n; i++) {
        for (int j = capacity; j &gt;= weight[i]; j--) {   // BẮT BUỘC duyệt j giảm dần
            dp[j] = max(dp[j], value[i] + dp[j - weight[i]]);
        }
    }
    return dp[capacity];
}</code></pre>
    <p><strong>Vì sao phải duyệt j từ lớn về nhỏ</strong>: nếu duyệt j tăng dần, khi tính <code>dp[j]</code> cho món i, giá trị <code>dp[j-weight[i]]</code> có thể đã bị món i CHÍNH NÓ cập nhật trước đó trong cùng vòng lặp — tức là vô tình cho phép lấy món i nhiều lần (giống Knapsack không giới hạn, một bài khác hẳn). Duyệt j giảm dần đảm bảo <code>dp[j-weight[i]]</code> vẫn đang giữ giá trị "tính tới trước khi xét món i", đúng với ràng buộc 0/1 — mỗi món chỉ lấy tối đa 1 lần.</p>
  </template>
</WorkedExample>

<div class="realworld">
  <span class="rw-title">🌐 Ứng dụng thực tế</span>
  <dl>
    <dt>Dùng ở đâu</dt>
    <dd>Đóng gói hàng vào container/xe tải tối ưu giá trị vận chuyển; phân bổ ngân sách đầu tư vào các dự án (chọn tập dự án tối đa lợi nhuận trong ngân sách cố định); phân bổ tài nguyên máy chủ (CPU/RAM) cho các tiến trình.</dd>
    <dt>Giải quyết vấn đề gì</dt>
    <dd>Chọn tập con vật/dự án nguyên khối để tối đa giá trị trong giới hạn tài nguyên cố định.</dd>
    <dt class="good">Khi nào NÊN dùng</dt>
    <dd class="good">Vật/dự án không chia nhỏ được; cần đáp án tối ưu chính xác; W không quá lớn (độ phức tạp O(n×W)).</dd>
    <dt class="bad">Khi nào KHÔNG NÊN dùng</dt>
    <dd class="bad">W cực lớn (hàng triệu/tỷ) — bảng dp quá lớn để lưu trong bộ nhớ, cần thuật toán xấp xỉ (FPTAS) thay vì QHĐ chính xác.</dd>
  </dl>
</div>

<WorkedExample id="vd-lis" title="Dãy con tăng dài nhất (LIS)" :official="true">
  <template #de-bai>
    <p>Cho 1 dãy số, tìm <strong>dãy con</strong> (được bỏ bớt phần tử, giữ đúng thứ tự, KHÔNG cần liên tục) sao cho các phần tử còn lại xếp theo thứ tự <strong>tăng dần</strong>, và <strong>dài nhất có thể</strong>.</p>
    <table class="formula-table">
      <tr><th>Input</th><th>Output</th></tr>
      <tr><td>{10, 9, 2, 5, 3, 7, 101, 18}</td><td>4 (ví dụ {2, 3, 7, 101} hoặc {2, 5, 7, 18})</td></tr>
    </table>
  </template>

  <template #y-tuong>
    <p><code>dp[i]</code> là độ dài dãy tăng dài nhất kết thúc tại đúng vị trí <code>i</code>. Đây là điểm hay nhầm nhất trong cả bài: nếu định nghĩa lỏng "LIS trong đoạn 0..i" thì không thể suy ra công thức truy hồi rõ ràng, vì không biết dãy đó đang "dừng ở đâu" để nối tiếp phần tử mới. Định nghĩa đúng — kết thúc <strong>chính tại</strong> <code>a[i]</code> — mới cho phép ta hỏi "phần tử nào đứng trước có thể nối vào a[i] để được dãy dài hơn?".</p>
  </template>

  <template #thuat-toan>
    <p>Với <code>dp[i]</code> = LIS kết thúc tại <code>a[i]</code>: nhìn lại mọi vị trí <code>j &lt; i</code> — nếu <code>a[j] &lt; a[i]</code>, ta có thể "nối" <code>a[i]</code> vào sau dãy LIS kết thúc tại <code>a[j]</code>, được 1 dãy tăng dài <code>dp[j]+1</code>. Xét <strong>tất cả</strong> các <code>j</code> hợp lệ như vậy, lấy giá trị lớn nhất. Nếu không có <code>j</code> nào thỏa — <code>a[i]</code> tự nó là 1 dãy tăng có độ dài 1.</p>
    <p style="text-align:center; font-family:monospace;">dp[i] = max(1, max(dp[j] + 1)) với mọi j &lt; i mà a[j] &lt; a[i]</p>
    <p>Đáp số cuối cùng là <code>max(dp[i])</code> trên <strong>toàn mảng</strong> — không nhất thiết là <code>dp[n-1]</code>, vì LIS có thể kết thúc ở giữa dãy. Muốn <strong>truy vết</strong> ra dãy con cụ thể: lưu thêm mảng <code>prev[i]</code> = vị trí j đã cho ra <code>dp[i]</code> tốt nhất, rồi lùi dần từ vị trí có <code>dp</code> lớn nhất về theo <code>prev</code>.</p>
  </template>

  <template #chay-tay>
    <p>Chạy tay toàn bộ mảng <code>dp[]</code> cho <code>a = {10, 9, 2, 5, 3, 7, 101, 18}</code>:</p>
    <table class="formula-table">
      <tr><th>i</th><th>a[i]</th><th>Xét j&lt;i có a[j]&lt;a[i]</th><th>dp[i]</th></tr>
      <tr><td>0</td><td>10</td><td>không có j</td><td>1</td></tr>
      <tr><td>1</td><td>9</td><td>không có j (10 không &lt; 9)</td><td>1</td></tr>
      <tr><td>2</td><td>2</td><td>không có j</td><td>1</td></tr>
      <tr><td>3</td><td>5</td><td>j=2 (a=2&lt;5, dp=1) → 2</td><td>2</td></tr>
      <tr><td>4</td><td>3</td><td>j=2 (a=2&lt;3, dp=1) → 2</td><td>2</td></tr>
      <tr><td>5</td><td>7</td><td>j=3 (dp=2→3), j=4 (dp=2→3)</td><td>3</td></tr>
      <tr><td>6</td><td>101</td><td>mọi j đều a[j]&lt;101; lớn nhất dp[5]=3→4</td><td>4</td></tr>
      <tr><td>7</td><td>18</td><td>j=5 (a=7&lt;18, dp=3→4)</td><td>4</td></tr>
    </table>
    <p>Kết quả = <code>max(1,1,1,2,2,3,4,4) = 4</code> ✓. Truy vết ngược từ vị trí 6 (dp=4, prev=5) → vị trí 5 (dp=3, prev=4) → vị trí 4 (dp=2, prev=2) → vị trí 2 (dp=1, prev=không có), đảo ngược lại ra dãy <code>{2, 3, 7, 101}</code>.</p>
  </template>

  <template #code>
<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int LIS(vector&lt;int&gt;& a) {
    int n = a.size();
    vector&lt;int&gt; dp(n, 1);   // mỗi phần tử tự nó là 1 dãy tăng độ dài 1
    for (int i = 1; i &lt; n; i++) {
        for (int j = 0; j &lt; i; j++) {
            if (a[j] &lt; a[i]) dp[i] = max(dp[i], dp[j] + 1);
        }
    }
    return *max_element(dp.begin(), dp.end());
}

int main() {
    vector&lt;int&gt; a = {10, 9, 2, 5, 3, 7, 101, 18};
    cout &lt;&lt; LIS(a);   // in ra: 4
    return 0;
}</code></pre>
  </template>

  <template #toi-uu>
    <p>Bản O(n²) ở trên đủ dùng cho hầu hết đề thi cơ bản (n ≤ vài nghìn) và dễ nhớ. Với n lớn (10⁵ trở lên), có bản <strong>O(n log n)</strong> dùng 1 mảng phụ <code>tails[]</code> — <code>tails[k]</code> là giá trị nhỏ nhất có thể làm phần tử cuối của 1 dãy tăng có độ dài <code>k+1</code> tính tới thời điểm hiện tại. Với mỗi số mới <code>x</code>: tìm bằng tìm kiếm nhị phân vị trí đầu tiên trong <code>tails</code> có giá trị <code>≥ x</code>, rồi ghi đè <code>x</code> vào đó (hoặc thêm vào cuối nếu không có vị trí nào như vậy). Độ dài LIS cuối cùng chính là độ dài của <code>tails</code>.</p>
    <p><strong>Trực giác vì sao đúng</strong>: <code>tails</code> không phải là 1 dãy tăng thật đã tìm ra — nó chỉ ghi lại "để có 1 dãy tăng độ dài k+1, phần tử cuối NHỎ NHẤT có thể là bao nhiêu". Giữ phần tử cuối càng nhỏ thì càng dễ nối thêm số mới vào sau — đó là lý do luôn ghi đè bằng giá trị nhỏ hơn khi tìm được vị trí phù hợp, không bao giờ làm ngược lại.</p>
<pre v-pre><code>int LISFast(vector&lt;int&gt;& a) {
    vector&lt;int&gt; tails;
    for (int x : a) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    return tails.size();
}</code></pre>
  </template>
</WorkedExample>

<div class="realworld">
  <span class="rw-title">🌐 Ứng dụng thực tế</span>
  <dl>
    <dt>Dùng ở đâu</dt>
    <dd>Xếp lịch việc theo thứ tự ưu tiên tăng dần; bài toán "hộp lồng nhau" (Russian Doll Envelopes); phân tích cổ phiếu (chuỗi tăng giá dài nhất).</dd>
    <dt>Giải quyết vấn đề gì</dt>
    <dd>Tìm chuỗi con dài nhất giữ được tính đơn điệu (tăng hoặc giảm) trong 1 dãy dữ liệu.</dd>
    <dt class="good">Khi nào NÊN dùng</dt>
    <dd class="good">n vừa phải (đủ cho O(n²)) hoặc n lớn nhưng chỉ cần độ dài LIS, không cần truy vết (dùng bản O(n log n)).</dd>
    <dt class="bad">Khi nào KHÔNG NÊN dùng</dt>
    <dd class="bad">Cần truy vết ra đúng dãy con cụ thể VÀ n rất lớn — bản O(n log n) không lưu trực tiếp dãy, phải lưu thêm mảng chỉ số phụ mới truy vết được, phức tạp hơn nhiều so với bản O(n²).</dd>
  </dl>
</div>

</LessonPart>

<LessonPart :sid="'qhd-lis-lcs-doixung'" part="bai-tap">
  <PracticeSet :items="data.practice" />
</LessonPart>

<LessonPart :sid="'qhd-lis-lcs-doixung'" part="leetcode">
  <LeetCodeList :items="data.leetcode" />

<h3 id="auto-luyen-tap-bo-sung">Luyện tập bổ sung — đề thực chiến, chạy tay thêm</h3>

<div class="problem-box">
<span class="pb-title">📋 Đề bổ sung — Xâu con chung dài nhất (LCS), nguyên văn dạng đề thi</span>
<p>Cho 2 xâu S1 và S2. Hãy tìm xâu con chung dài nhất của 2 xâu này (các phần tử không nhất thiết phải liên tiếp nhau).</p>
<p><strong>Input:</strong> Dòng đầu tiên là số lượng bộ test T (T ≤ 20). Mỗi test gồm hai dòng, mô tả xâu S1 và S2, mỗi xâu có độ dài không quá 1000 và chỉ gồm các chữ cái in hoa.</p>
<p><strong>Output:</strong> Với mỗi test, in ra độ dài dãy con chung dài nhất trên một dòng.</p>
<table class="formula-table"><tr><th>Input</th><th>Output</th></tr>
<tr><td>2<br>AGGTAB<br>GXTXAYB<br>AA<br>BB</td><td>4<br>0</td></tr></table>
</div>
<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int lcs(string s1, string s2) {
    int n = s1.size(), m = s2.size();
    vector&lt;vector&lt;int&gt;&gt; dp(n + 1, vector&lt;int&gt;(m + 1, 0));
    for (int i = 1; i &lt;= n; i++)
        for (int j = 1; j &lt;= m; j++) {
            if (s1[i - 1] == s2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
            else dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
        }
    return dp[n][m];
}

int main() {
    int T; cin &gt;&gt; T;
    while (T--) {
        string s1, s2;
        cin &gt;&gt; s1 &gt;&gt; s2;
        cout &lt;&lt; lcs(s1, s2) &lt;&lt; "\n";
    }
    return 0;
}</code></pre>
<p><strong>Chạy tay bảng dp — S1="ABCB", S2="BDCA"</strong> (LCS đúng là "BC", dài 2):</p>
<table class="formula-table">
  <tr><th>dp[i][j]</th><th>""</th><th>B</th><th>D</th><th>C</th><th>A</th></tr>
  <tr><th>""</th><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
  <tr><th>A</th><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td></tr>
  <tr><th>B</th><td>0</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
  <tr><th>C</th><td>0</td><td>1</td><td>1</td><td>2</td><td>2</td></tr>
  <tr><th>B</th><td>0</td><td>1</td><td>1</td><td>2</td><td>2</td></tr>
</table>
<p>Đọc từng ô: hàng "A" cột "A" trùng ký tự → <code>dp=dp[i-1][j-1]+1=0+1=1</code>. Hàng "C" cột "C" trùng ký tự → <code>dp[i-1][j-1]+1</code>, với <code>dp</code>(sau B, sau D)=1, cộng 1 = 2. Kết quả cuối <code>dp[4][4] = 2</code> — đúng bằng độ dài "BC".</p>
<p>Tự điền lại bảng dp cho S1="AGGTAB", S2="GXTXAYB" (đáp án đúng: LCS dài 4, ví dụ "GTAB") — mỗi ô chỉ cần nhìn 3 ô lân cận (trên, trái, chéo trên-trái), không cần nhìn xa hơn.</p>

<div class="realworld">
  <span class="rw-title">🌐 Ứng dụng thực tế của LCS</span>
  <dl>
    <dt>Dùng ở đâu</dt>
    <dd>Lệnh <code>diff</code> so sánh 2 phiên bản file (Git, các công cụ version control); công cụ so khớp trình tự DNA/protein trong sinh học; tính độ giống nhau giữa 2 văn bản để phát hiện đạo văn.</dd>
    <dt>Giải quyết vấn đề gì</dt>
    <dd>Đo mức độ "giống nhau về thứ tự" giữa 2 dãy dữ liệu, cho phép bỏ qua một số phần tử không khớp.</dd>
    <dt class="good">Khi nào NÊN dùng</dt>
    <dd class="good">2 xâu độ dài vừa phải (đề giới hạn ≤1000 — đủ cho O(n×m)); cần biết mức độ trùng khớp theo thứ tự, không cần liên tiếp.</dd>
    <dt class="bad">Khi nào KHÔNG NÊN dùng</dt>
    <dd class="bad">Xâu quá dài (hàng trăm nghìn trở lên) — bảng dp O(n×m) quá lớn, cần giảm chiều bộ nhớ (chỉ lưu 2 dòng dp gần nhất) nếu chỉ cần độ dài, không cần truy vết xâu.</dd>
  </dl>
</div>

<div class="problem-box">
<span class="pb-title">📋 Đề bổ sung — Xâu con đối xứng dài nhất, nguyên văn dạng đề thi</span>
<p>Đề hỏi <strong>"xâu con"</strong> (substring) — nghĩa là đoạn ký tự <strong>LIÊN TỤC</strong>, KHÔNG được bỏ ký tự nào ở giữa — khác hẳn với "dãy con" ở LCS/LIS. Tìm đoạn liên tục dài nhất mà đọc xuôi = đọc ngược.</p>
<table class="formula-table"><tr><th>Input</th><th>Output</th></tr>
<tr><td>"babad"</td><td>"bab" (hoặc "aba")</td></tr></table>
</div>
<p>Cách nghĩ đầu tiên: liệt kê <strong>tất cả</strong> đoạn con liên tục (~n²/2 đoạn), với mỗi đoạn kiểm tra đối xứng bằng cách so 2 đầu tiến vào giữa (~n phép so sánh) → tổng O(n³), đúng nhưng chậm. Nhận xét quan trọng để tăng tốc: đoạn <code>s[i..j]</code> đối xứng <strong>khi và chỉ khi</strong> ký tự đầu bằng ký tự cuối <strong>VÀ</strong> đoạn ở giữa (bỏ 2 đầu) <code>s[i+1..j-1]</code> cũng đối xứng — đây chính là bài toán con nhỏ hơn, kiểm tra đoạn lớn chỉ tốn O(1) thêm nếu đoạn giữa đã biết.</p>
<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

bool dp[1005][1005];

string longestPalindrome(string s) {
    int n = s.size();
    int start = 0, maxLen = 1;
    for (int i = 0; i &lt; n; i++) dp[i][i] = true;   // đoạn 1 ký tự

    for (int len = 2; len &lt;= n; len++) {
        for (int i = 0; i + len - 1 &lt; n; i++) {
            int j = i + len - 1;
            if (len == 2) dp[i][j] = (s[i] == s[j]);
            else dp[i][j] = (s[i] == s[j]) && dp[i+1][j-1];

            if (dp[i][j] && len &gt; maxLen) { maxLen = len; start = i; }
        }
    }
    return s.substr(start, maxLen);
}

int main() {
    cout &lt;&lt; longestPalindrome("babad");   // in ra: "bab" (hoặc "aba")
    return 0;
}</code></pre>
<p><strong>Chạy tay với <code>s = "babad"</code></strong> (n=5, chỉ số 0..4: b,a,b,a,d):</p>
<table class="formula-table">
  <tr><th>Độ dài đang xét</th><th>Kiểm tra từng đoạn</th><th>Kết quả</th></tr>
  <tr><td>1</td><td>dp[i][i] = true với mọi i</td><td>5 đoạn 1 ký tự đều đối xứng</td></tr>
  <tr><td>2</td><td>"ba","ab","ba","ad" — không cặp nào 2 ký tự giống nhau</td><td>Không có đoạn đối xứng độ dài 2</td></tr>
  <tr><td>3</td><td>s[0..2]="bab": s[0]='b'=s[2]='b' → true. s[1..3]="aba": s[1]='a'=s[3]='a' → true. s[2..4]="bad": 'b'≠'d' → false</td><td>Tìm được "bab" (i=0) — cập nhật maxLen=3</td></tr>
  <tr><td>4</td><td>s[0..3]="baba": s[0]≠s[3] false. s[1..4]="abad": s[1]≠s[4] false</td><td>Không có đoạn đối xứng độ dài 4</td></tr>
  <tr><td>5</td><td>s[0..4]="babad": s[0]='b'≠s[4]='d' → false</td><td>Không đối xứng</td></tr>
</table>
<p>Kết quả: <code>maxLen=3</code>, <code>start=0</code> → <strong>"bab"</strong> ✓ (dừng lại ở lần đầu tìm được độ dài 3 tại i=0, không cập nhật lại vì "aba" cũng chỉ dài 3, không dài hơn).</p>
<p>Tự tính tay xâu đối xứng dài nhất của <code>"cbbd"</code> (đáp án: "bb", độ dài 2 — không có đoạn đối xứng độ dài ≥3 nào). Tự trả lời: vì sao phải tính theo thứ tự "độ dài tăng dần", không thể theo thứ tự chỉ số <code>i</code> tăng dần như LCS? (Gợi ý: <code>dp[i][j]</code> phụ thuộc <code>dp[i+1][j-1]</code> — đoạn ngắn hơn nằm ở i lớn hơn nhưng j nhỏ hơn, không theo thứ tự hàng-trên-hàng-dưới đơn giản như LCS.)</p>

<div class="realworld">
  <span class="rw-title">🌐 Ứng dụng thực tế của Xâu đối xứng</span>
  <dl>
    <dt>Dùng ở đâu</dt>
    <dd>Tìm đoạn DNA đối xứng trong tin sinh học; kiểm tra cấu trúc dữ liệu đối xứng trong xử lý ngôn ngữ tự nhiên; 1 dạng bài phổ biến trong phỏng vấn kỹ thuật.</dd>
    <dt>Giải quyết vấn đề gì</dt>
    <dd>Tìm đoạn liên tục dài nhất có tính đối xứng trong 1 xâu.</dd>
    <dt class="good">Khi nào NÊN dùng</dt>
    <dd class="good">Xâu độ dài vừa phải (≤ vài nghìn, đủ cho O(n²)); cần chính xác 100%, không cần xấp xỉ.</dd>
    <dt class="bad">Khi nào KHÔNG NÊN dùng</dt>
    <dd class="bad">Xâu rất dài (hàng trăm nghìn) — cần thuật toán "mở rộng từ tâm" O(n²) nhưng O(1) bộ nhớ, hoặc thuật toán Manacher O(n) chuyên biệt.</dd>
  </dl>
</div>

<div class="problem-box">
<span class="pb-title">📋 Ví dụ khởi động gốc — Đổi tiền theo hệ mệnh giá đếm số cách</span>
<p>Nhắc lại mẹo áp dụng cho bài tập 1 ở trên: đếm số cách đổi 1 số tiền <code>dp[i]+=dp[i-coin]</code>, vòng lặp loại đồng phải ở NGOÀI vòng lặp số tiền — nếu đảo ngược thứ tự 2 vòng lặp, chương trình sẽ đếm "1 rồi 2" và "2 rồi 1" là 2 cách khác nhau, dù với tiền thứ tự dùng đồng không quan trọng. Với hệ {1,2}, S=3, đúng phải ra 2 cách ("1+1+1" và "1+2").</p>
</div>

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
import data from '../data/lessons/qhd-lis-lcs-doixung.js'
import { initQhdLisLcsDoixungWidgets } from '../widgets/qhd-lis-lcs-doixung.js'

defineProps({ active: Boolean })

onMounted(() => {
  initQhdLisLcsDoixungWidgets()
})
</script>
