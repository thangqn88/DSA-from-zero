<template>
<section id="qhd-lis-lcs-doixung" class="day-section" data-sid="qhd-lis-lcs-doixung" v-show="active">

<h2>Quy Hoạch Động: 0/1 Knapsack, LIS, LCS, Xâu Đối Xứng <span class="exam-tag">★ Đề ôn tập — Bài 4</span></h2>
<div class="mini-toc">
  <span class="mt-label">Chuyển nhanh tới</span>
  <a class="mt-exam" href="#bai4-lcs">★ Bài 4 — LCS</a>
  <a href="#bai-lis">LIS</a>
  <a href="#bai-palindrome">Xâu con đối xứng dài nhất</a>
</div>

<h3 id="auto-vi-du-khoi-dong-lam-quen-tu-duy-qhd-chua-phai-bai-">Ví dụ khởi động (làm quen tư duy QHĐ — chưa phải bài trong đề): 0/1 Knapsack</h3>

<p class="idea-label">🗣️ Bước 0 — Đề thực sự hỏi gì</p>
<p>Bạn có 1 cái ba lô chỉ chịu được tối đa <strong>W kg</strong>. Có n món đồ, mỗi món có <strong>trọng lượng</strong> và <strong>giá trị</strong> riêng. Hỏi: chọn 1 tập con các món đồ để nhét vào ba lô, sao cho <strong>tổng trọng lượng không vượt W</strong> và <strong>tổng giá trị lớn nhất có thể</strong>.</p>
<p>"0/1" nghĩa là: với mỗi món đồ, chỉ có <strong>đúng 2 lựa chọn</strong> — lấy NGUYÊN món đó (không được bẻ/cắt nhỏ ra lấy 1 phần), hoặc không lấy gì cả. Đây là điểm khác với việc chia nhỏ được (ví dụ: 1kg gạo có thể lấy 0.5kg, nhưng 1 cái laptop không thể lấy "nửa cái").</p>

<p class="idea-label">🗣️ Bước 1 — Thử trực giác "hiển nhiên" trước (và xem nó sai ở đâu)</p>
<p>Phản xạ tự nhiên: ưu tiên lấy món có <strong>tỉ lệ giá trị/trọng lượng cao nhất</strong> trước (giống Tham lam bạn học ở phần Tham lam). Thử với 3 món, ba lô W=50:</p>
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
<p>Tham lam theo tỉ lệ cho ra 160, nhưng đáp án đúng là 220 — <strong>Tham lam sai</strong>. Lý do: A có tỉ lệ tốt nhất nhưng lại "chiếm chỗ" theo cách không khớp với các món còn lại — khác với Activity Selection, ở đây <strong>không có cách chọn nào chứng minh được luôn an toàn</strong>. Đây chính là lý do bài này cần QHĐ.</p>

<p class="idea-label">🗣️ Bước 2 — Vì sao là QHĐ, không phải Quay lui thuần</p>
<p>Với mỗi món đồ, chỉ có 2 lựa chọn (lấy/không lấy) — nếu dùng Quay lui thuần, cây quyết định sẽ có tới <strong>2ⁿ nhánh</strong>, quá chậm khi n lớn. Nhưng để ý: rất nhiều nhánh khác nhau lại dẫn tới <strong>cùng 1 trạng thái</strong> — ví dụ "đã xét xong 2 món đầu, ba lô còn dư đúng 3kg" có thể đạt được bằng nhiều tổ hợp lấy/không lấy khác nhau ở 2 món đó, nhưng phần <em>còn lại phải giải</em> từ trạng thái này luôn giống nhau. Đây chính là <strong>"overlapping subproblems"</strong> bạn đã gặp ở Fibonacci — QHĐ tránh tính lại bằng cách ghi nhớ đáp án cho từng trạng thái <code>(i, j)</code> = "đã xét i món đầu, ba lô còn dư j kg".</p>

<p class="idea-label">🪜 Bước 3 — Từ trực giác ra công thức QHĐ</p>
<ol>
  <li><strong><code>dp[i][j]</code> nghĩa là gì</strong>: giá trị lớn nhất đạt được khi chỉ xét <strong>i món đầu tiên</strong>, với ba lô sức chứa tối đa <strong>j</strong>.</li>
  <li><strong>Công thức truy hồi</strong>: với món thứ i, chỉ có 2 lựa chọn — <strong>không lấy</strong> (giá trị = giống hệt khi chưa có món i: <code>dp[i-1][j]</code>) hoặc <strong>lấy</strong> nếu nó vừa (<code>weight[i] ≤ j</code>): giá trị = <code>value[i] + dp[i-1][j-weight[i]]</code> (giá trị món i, cộng với giá trị tốt nhất có thể từ chỗ còn dư sau khi trừ trọng lượng món i). Chọn cách nào cho giá trị <strong>lớn hơn</strong>.</li>
  <li><strong>Base case</strong>: <code>dp[0][j] = 0</code> (chưa xét món nào thì giá trị luôn = 0, bất kể ba lô còn bao nhiêu chỗ).</li>
  <li><strong>Thứ tự tính</strong>: tăng dần theo cả i và j.</li>
</ol>

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

<p><strong>Chạy tay trước khi bấm animation</strong>: 3 vật (w=2,v=3), (w=3,v=4), (w=4,v=5), ba lô W=5. Vài ô đầu tiên của bảng <code>dp[i][j]</code>:</p>
<table class="formula-table">
  <tr><th>dp[i][j]</th><th>j=0</th><th>j=1</th><th>j=2</th><th>j=3</th><th>j=4</th><th>j=5</th></tr>
  <tr><th>i=0 (chưa xét vật nào)</th><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
  <tr><th>i=1 (vật w=2,v=3)</th><td>0</td><td>0</td><td>3</td><td>3</td><td>3</td><td>3</td></tr>
</table>
<p>Đọc ô <code>dp[1][2]</code>: xét vật 1 (w=2,v=3), ba lô j=2. Không lấy → 0. Lấy (vì 2≤2 vừa) → <code>3 + dp[0][0] = 3+0 = 3</code>. Chọn max(0,3) = <strong>3</strong>. Đọc ô <code>dp[1][1]</code>: vật w=2 không vừa ba lô j=1 (2&gt;1) → chỉ có thể không lấy → <strong>0</strong>. Bấm "Bước tiếp theo" để xem máy tính điền tiếp toàn bộ bảng theo đúng logic này, kết quả cuối <code>dp[3][5] = 7</code>:</p>

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

<blockquote><p>🎯 Tự vẽ lại đúng bảng trên bằng tay với 1 bộ số liệu khác (ví dụ ví dụ A,B,C ở Bước 1). Nếu bạn tự điền được toàn bộ bảng mà không cần xem lại — bạn đã hiểu 0/1 Knapsack thật sự.</p></blockquote>

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

<h4 id="auto-luyen-tap">Luyện tập</h4>
<ol class="practice">
  <li>Tự vẽ bảng 0/1 Knapsack với 4-5 vật khác.
    <div class="idea"><em>Ý tưởng:</em> mỗi ô chỉ hỏi đúng 1 câu: "có vật này thì tốt hơn hay không có vật này thì tốt hơn?" — không cần nghĩ tới các vật khác chưa xét.</div>
  </li>
  <li>Đếm số cách đổi 1 số tiền: <code>dp[i]+=dp[i-coin]</code>, vòng lặp loại đồng phải ở NGOÀI vòng lặp số tiền.
    <div class="idea"><em>Ý tưởng:</em> nếu vòng lặp số tiền ở ngoài, chương trình sẽ đếm "1 rồi 2" và "2 rồi 1" là 2 cách khác nhau — nhưng với tiền, thứ tự dùng đồng không quan trọng. Đặt vòng lặp loại đồng ra ngoài ép mỗi loại đồng chỉ được "xét quyết định dùng hay không" đúng 1 lần cho toàn bộ dãy số tiền.</div>
    <div class="hint"><em>Hướng dẫn:</em> với hệ {1,2}, S=3, đúng phải ra 2 cách ("1+1+1" và "1+2"). Đảo ngược thứ tự 2 vòng lặp sẽ đếm trùng.</div>
  </li>
</ol>

<h3 id="bai4-lcs">★ Bài chính thức trong Đề ôn tập — Bài 4: Xâu con chung dài nhất (LCS)</h3>

<div class="problem-box">
<span class="pb-title">📋 Nguyên văn đề bài</span>
<p>Cho 2 xâu S1 và S2. Hãy tìm xâu con chung dài nhất của 2 xâu này (các phần tử không nhất thiết phải liên tiếp nhau).</p>
<p><strong>Input:</strong> Dòng đầu tiên là số lượng bộ test T (T ≤ 20). Mỗi test gồm hai dòng, mô tả xâu S1 và S2, mỗi xâu có độ dài không quá 1000 và chỉ gồm các chữ cái in hoa.</p>
<p><strong>Output:</strong> Với mỗi test, in ra độ dài dãy con chung dài nhất trên một dòng.</p>
<table class="formula-table"><tr><th>Input</th><th>Output</th></tr>
<tr><td>2<br>AGGTAB<br>GXTXAYB<br>AA<br>BB</td><td>4<br>0</td></tr></table>
</div>
<blockquote><p>📌 Knapsack ở trên giúp bạn quen 4 bước tư duy QHĐ (định nghĩa dp, công thức, base case, thứ tự tính). <strong>LCS mới là bài bạn sẽ gặp đúng nguyên văn trong đề thi</strong> — áp dụng lại đúng 4 bước đó, chỉ khác công thức.</p></blockquote>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Khác với "xâu con liên tiếp", <strong>xâu con (subsequence)</strong> ở đây được phép <strong>bỏ qua</strong> một số ký tự, miễn giữ đúng thứ tự — giống việc bạn đọc lướt 1 câu, bỏ vài từ, nhưng thứ tự các từ còn lại không đổi. Đề bài hỏi: giữa 2 xâu S1, S2, xâu con chung <strong>dài nhất</strong> mà cả 2 cùng chứa được (theo đúng thứ tự) là bao nhiêu ký tự?</p>

<p>Áp dụng đúng 4 bước tư duy QHĐ đã học ở phần trước:</p>
<ol>
  <li><strong><code>dp[i][j]</code> nghĩa là gì</strong>: độ dài LCS giữa <code>i</code> ký tự đầu của S1 và <code>j</code> ký tự đầu của S2.</li>
  <li><strong>Công thức truy hồi</strong>: nếu ký tự thứ i của S1 <strong>trùng</strong> ký tự thứ j của S2 → 2 ký tự này chắc chắn nên "ghép cặp" với nhau, cộng thêm 1 vào kết quả tốt nhất KHÔNG có 2 ký tự đó: <code>dp[i][j] = dp[i-1][j-1] + 1</code>. Nếu <strong>không trùng</strong> → 1 trong 2 ký tự này chắc chắn thừa (không thể cả 2 cùng vào LCS), bỏ ký tự thừa của bên nào cho kết quả tốt hơn: <code>dp[i][j] = max(dp[i-1][j], dp[i][j-1])</code>.</li>
  <li><strong>Base case</strong>: <code>dp[0][j] = dp[i][0] = 0</code> (so với xâu rỗng thì LCS luôn = 0).</li>
  <li><strong>Thứ tự tính</strong>: tăng dần theo cả i và j.</li>
</ol>

<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int lcs(string s1, string s2) {
    int n = s1.size(), m = s2.size();
    vector&lt;vector&lt;int&gt;&gt; dp(n + 1, vector&lt;int&gt;(m + 1, 0));

    for (int i = 1; i &lt;= n; i++) {
        for (int j = 1; j &lt;= m; j++) {
            if (s1[i - 1] == s2[j - 1])
                dp[i][j] = dp[i - 1][j - 1] + 1;
            else
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
        }
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

<p><strong>Chạy tay bảng dp — ví dụ S1="ABCB", S2="BDCA"</strong> (LCS đúng là "BC", dài 2):</p>
<table class="formula-table">
  <tr><th>dp[i][j]</th><th>""</th><th>B</th><th>D</th><th>C</th><th>A</th></tr>
  <tr><th>""</th><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
  <tr><th>A</th><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td></tr>
  <tr><th>B</th><td>0</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
  <tr><th>C</th><td>0</td><td>1</td><td>1</td><td>2</td><td>2</td></tr>
  <tr><th>B</th><td>0</td><td>1</td><td>1</td><td>2</td><td>2</td></tr>
</table>
<p>Đọc từng ô: hàng "A" cột "A" trùng ký tự → <code>dp=dp[i-1][j-1]+1=0+1=1</code>. Hàng "C" cột "C" trùng ký tự → <code>dp[i-1][j-1]+1</code>, với <code>dp</code>(sau B, sau D)=1, cộng 1 = 2. Kết quả cuối <code>dp[4][4] = 2</code> — đúng bằng độ dài "BC".</p>

<blockquote><p>⚠️ <strong>Bẫy hay gặp</strong>: LCS (subsequence, được bỏ ký tự) khác hẳn "xâu con liên tiếp dài nhất" (substring, không được bỏ ký tự nào ở giữa) — bài đó dùng công thức khác: chỉ cộng dồn khi trùng, gặp sai lệch phải reset <code>dp[i][j]=0</code> chứ không lấy max. Đọc kỹ đề trước khi chọn công thức.</p></blockquote>

<div class="realworld">
  <span class="rw-title">🌐 Ứng dụng thực tế</span>
  <dl>
    <dt>Dùng ở đâu</dt>
    <dd>Lệnh <code>diff</code> so sánh 2 phiên bản file (Git, các công cụ version control); công cụ so khớp trình tự DNA/protein trong sinh học; tính độ giống nhau giữa 2 văn bản để phát hiện đạo văn.</dd>
    <dt>Giải quyết vấn đề gì</dt>
    <dd>Đo mức độ "giống nhau về thứ tự" giữa 2 dãy dữ liệu, cho phép bỏ qua một số phần tử không khớp.</dd>
    <dt class="good">Khi nào NÊN dùng</dt>
    <dd class="good">2 xâu độ dài vừa phải (đề giới hạn ≤1000 — đủ cho O(n×m)); cần biết mức độ trùng khớp theo thứ tự, không cần liên tiếp.</dd>
    <dt class="bad">Khi nào KHÔNG NÊN dùng</dt>
    <dd class="bad">Xâu quá dài (hàng trăm nghìn trở lên) — bảng dp O(n×m) quá lớn, cần thuật toán xấp xỉ hoặc giảm chiều bộ nhớ (chỉ lưu 2 dòng dp gần nhất) nếu chỉ cần độ dài, không cần truy vết xâu.</dd>
  </dl>
</div>

<h4 id="auto-luyen-tap-bai-4">Luyện tập (Bài 4)</h4>
<ol class="practice">
  <li>Tự điền bảng dp cho S1="AGGTAB", S2="GXTXAYB" (đáp án đúng: LCS dài 4, ví dụ "GTAB").
    <div class="idea"><em>Ý tưởng:</em> điền theo hàng, mỗi ô chỉ cần nhìn 3 ô lân cận (trên, trái, chéo trên-trái) — không cần nhìn xa hơn.</div>
  </li>
  <li>Vì sao khi 2 ký tự trùng, ta luôn cộng thêm 1 vào <code>dp[i-1][j-1]</code> mà không so sánh thêm với <code>dp[i-1][j]</code> hay <code>dp[i][j-1]</code>?
    <div class="hint"><em>Hướng dẫn:</em> có thể chứng minh <code>dp[i-1][j-1]+1</code> luôn ≥ 2 lựa chọn còn lại khi 2 ký tự trùng nhau, nên không cần so sánh thêm.</div>
  </li>
</ol>

<h3 id="bai-lis">★ Mới theo đề cương thầy: Dãy con tăng dài nhất (LIS)</h3>

<p class="idea-label">🗣️ Bước 0 — Đề thực sự hỏi gì</p>
<p>Cho 1 dãy số, tìm <strong>dãy con</strong> (được bỏ bớt phần tử, giữ đúng thứ tự — giống LCS, KHÔNG cần liên tục) sao cho các phần tử còn lại xếp theo thứ tự <strong>tăng dần</strong>, và <strong>dài nhất có thể</strong>. Ví dụ <code>{10, 9, 2, 5, 3, 7, 101, 18}</code>: dãy con tăng dài nhất là <code>{2, 3, 7, 101}</code> (hoặc <code>{2, 5, 7, 18}</code>...), độ dài 4.</p>

<p class="idea-label">🗣️ Bước 1 — Định nghĩa <code>dp[i]</code> dễ hiểu lầm nhất trong cả sách</p>
<p>Khác với LCS (2 xâu, dp 2 chiều), LIS chỉ có 1 dãy → <code>dp[i]</code> chỉ cần 1 chiều. Nhưng định nghĩa chính xác là: <code>dp[i]</code> = độ dài LIS <strong>mà PHẦN TỬ CUỐI CÙNG chính là <code>a[i]</code></strong> — không phải "LIS trong đoạn từ 0 tới i". Đây là điểm hay nhầm nhất: nếu định nghĩa lỏng "LIS trong đoạn 0..i" thì không thể suy ra công thức truy hồi rõ ràng, vì không biết dãy đó đang "dừng ở đâu" để nối tiếp phần tử mới.</p>

<p class="idea-label">🪜 Bước 2 — Từ định nghĩa ra công thức</p>
<p>Với <code>dp[i]</code> = LIS kết thúc tại <code>a[i]</code>: nhìn lại mọi vị trí <code>j &lt; i</code> — nếu <code>a[j] &lt; a[i]</code>, ta có thể "nối" <code>a[i]</code> vào sau dãy LIS kết thúc tại <code>a[j]</code>, được 1 dãy tăng dài <code>dp[j]+1</code>. Xét <strong>tất cả</strong> các <code>j</code> hợp lệ như vậy, lấy giá trị lớn nhất. Nếu không có <code>j</code> nào thỏa (không ai nhỏ hơn <code>a[i]</code> đứng trước nó) — <code>a[i]</code> tự nó là 1 dãy tăng có độ dài 1.</p>
<p style="text-align:center; font-family:monospace;">dp[i] = max(1, max(dp[j] + 1)) với mọi j &lt; i mà a[j] &lt; a[i]</p>
<p>Đáp số cuối cùng là <code>max(dp[i])</code> trên <strong>toàn mảng</strong> — không nhất thiết là <code>dp[n-1]</code>, vì LIS có thể kết thúc ở giữa dãy.</p>

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

<p><strong>Chạy tay toàn bộ mảng <code>dp[]</code></strong>:</p>
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
<p>Kết quả = <code>max(1,1,1,2,2,3,4,4) = 4</code> ✓.</p>

<blockquote><p>🎯 Với n lớn (10⁵ trở lên), có kỹ thuật tối ưu bằng <strong>tìm kiếm nhị phân</strong> đưa độ phức tạp xuống O(n log n) — nhưng bản O(n²) ở trên đủ dùng cho hầu hết đề thi cơ bản (n ≤ vài nghìn) và dễ nhớ hơn nhiều.</p></blockquote>

<h4 id="auto-luyen-tap-lis">Luyện tập (LIS)</h4>
<ol class="practice">
  <li>Tự tính tay LIS của mảng <code>{3, 10, 2, 1, 20}</code> (đáp án: độ dài 3, ví dụ {3,10,20}).
    <div class="hint"><em>Hướng dẫn:</em> dp = [1,2,1,1,3] — chú ý dp[3]=1 vì không ai nhỏ hơn 1 đứng trước nó.</div>
  </li>
</ol>

<h3 id="bai-palindrome">★ Mới theo đề cương thầy: Xâu con đối xứng dài nhất</h3>

<p class="idea-label">🗣️ Bước 0 — Đề thực sự hỏi gì (bẫy đọc-hiểu-đề quan trọng nhất bài này)</p>
<p>Đề hỏi <strong>"xâu con"</strong> (substring) — nghĩa là đoạn ký tự <strong>LIÊN TỤC</strong>, KHÔNG được bỏ ký tự nào ở giữa. Điều này khác hẳn với "dãy con" (subsequence) ở LCS/LIS phía trên — <strong>được</strong> bỏ ký tự. Tìm đoạn liên tục dài nhất mà đọc xuôi = đọc ngược (đối xứng/palindrome). Ví dụ <code>"babad"</code>: đoạn đối xứng dài nhất là <code>"bab"</code> hoặc <code>"aba"</code> (cả 2 đều độ dài 3, đề thường chấp nhận 1 trong 2).</p>

<p class="idea-label">🗣️ Bước 1 — Thử cách "hiển nhiên" trước (và thấy nó chậm)</p>
<p>Cách nghĩ đầu tiên: liệt kê <strong>tất cả</strong> đoạn con liên tục (~n²/2 đoạn), với mỗi đoạn kiểm tra đối xứng bằng cách so 2 đầu tiến vào giữa (~n phép so sánh) → tổng O(n³). Đúng nhưng chậm với xâu dài.</p>

<p class="idea-label">🗣️ Bước 2 — Trực giác QHĐ: tận dụng lại kết quả của đoạn ngắn hơn</p>
<p>Nhận xét quan trọng: đoạn <code>s[i..j]</code> đối xứng <strong>khi và chỉ khi</strong> ký tự đầu bằng ký tự cuối (<code>s[i]==s[j]</code>) <strong>VÀ</strong> đoạn ở giữa (bỏ 2 đầu) <code>s[i+1..j-1]</code> cũng đối xứng. Đây chính là bài toán con nhỏ hơn — nếu đã biết đáp án cho đoạn ngắn hơn ở giữa, kiểm tra đoạn lớn hơn chỉ tốn O(1) thêm.</p>

<p class="idea-label">🪜 Bước 3 — Từ trực giác ra công thức QHĐ</p>
<ol>
  <li><strong><code>dp[i][j]</code> nghĩa là gì</strong>: đoạn <code>s[i..j]</code> có phải là xâu đối xứng hay không (true/false).</li>
  <li><strong>Công thức truy hồi</strong>: <code>dp[i][j] = true</code> nếu <code>s[i]==s[j]</code> VÀ (đoạn chỉ có 1-2 ký tự, hoặc <code>dp[i+1][j-1]==true</code>).</li>
  <li><strong>Base case</strong>: đoạn 1 ký tự (<code>dp[i][i]</code>) luôn đối xứng. Đoạn 2 ký tự (<code>dp[i][i+1]</code>) đối xứng khi 2 ký tự đó bằng nhau.</li>
  <li><strong>Thứ tự tính</strong>: theo <strong>độ dài đoạn tăng dần</strong> (từ ngắn tới dài) — vì <code>dp[i][j]</code> luôn cần <code>dp[i+1][j-1]</code> (đoạn ngắn hơn) đã tính trước.</li>
</ol>

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

<div class="realworld">
  <span class="rw-title">🌐 Ứng dụng thực tế</span>
  <dl>
    <dt>Dùng ở đâu</dt>
    <dd>Tìm đoạn DNA đối xứng trong tin sinh học; kiểm tra cấu trúc dữ liệu đối xứng trong xử lý ngôn ngữ tự nhiên; 1 dạng bài phổ biến trong phỏng vấn kỹ thuật (LeetCode "Longest Palindromic Substring").</dd>
    <dt>Giải quyết vấn đề gì</dt>
    <dd>Tìm đoạn liên tục dài nhất có tính đối xứng trong 1 xâu.</dd>
    <dt class="good">Khi nào NÊN dùng</dt>
    <dd class="good">Xâu độ dài vừa phải (≤ vài nghìn, đủ cho O(n²)); cần chính xác 100%, không cần xấp xỉ.</dd>
    <dt class="bad">Khi nào KHÔNG NÊN dùng</dt>
    <dd class="bad">Xâu rất dài (hàng trăm nghìn) — cần thuật toán "mở rộng từ tâm" O(n²) nhưng O(1) bộ nhớ, hoặc thuật toán Manacher O(n) chuyên biệt.</dd>
  </dl>
</div>

<h4 id="auto-luyen-tap-xau-doi-xung">Luyện tập (Xâu đối xứng)</h4>
<ol class="practice">
  <li>Tự tính tay xâu đối xứng dài nhất của <code>"cbbd"</code> (đáp án: "bb", độ dài 2).
    <div class="hint"><em>Hướng dẫn:</em> không có đoạn đối xứng độ dài ≥3 nào trong "cbbd" — chỉ "bb" (2 ký tự giống nhau liền kề) là đoạn dài nhất.</div>
  </li>
  <li>Vì sao phải tính theo thứ tự "độ dài tăng dần", không thể tính theo thứ tự chỉ số <code>i</code> tăng dần như LCS?
    <div class="hint"><em>Hướng dẫn:</em> công thức <code>dp[i][j]</code> phụ thuộc vào <code>dp[i+1][j-1]</code> — đoạn NGẮN HƠN nằm ở i lớn hơn nhưng j nhỏ hơn, không theo thứ tự "hàng trên hàng dưới" đơn giản như LCS. Chỉ có "độ dài" mới đảm bảo đoạn cần luôn được tính trước.</div>
  </li>
</ol>


</section>
</template>

<script setup>
import { onMounted } from 'vue'
import { initQhdLisLcsDoixungWidgets } from '../widgets/qhd-lis-lcs-doixung.js'

defineProps({ active: Boolean })

onMounted(() => {
  initQhdLisLcsDoixungWidgets()
})
</script>
