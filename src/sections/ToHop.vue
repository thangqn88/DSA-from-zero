<template>
<section id="to-hop" class="day-section" data-sid="to-hop" v-show="active">

<h2>Tổ Hợp <span class="exam-tag">★ Đề ôn tập — Bài 1</span></h2>
<div class="mini-toc">
  <span class="mt-label">Chuyển nhanh tới</span>
  <a class="mt-exam" href="#bai1-hoanvi-ke-tiep">★ Bài 1 — Hoán vị kế tiếp</a>
</div>

<h3 id="auto-vi-du-khoi-dong-lam-quen-co-che-chua-phai-bai-tron">Ví dụ khởi động (làm quen cơ chế — chưa phải bài trong đề): Tổ hợp — chọn k trong n, không tính thứ tự</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Bạn có 4 người bạn {1,2,3,4} và cần chọn ra 2 người đi chơi cùng. "Chọn 1 và 2" với "chọn 2 và 1" là <strong>cùng một nhóm</strong> — thứ tự không quan trọng. Để máy tính không in trùng, ta đặt quy tắc: <strong>phần tử chọn sau luôn phải lớn hơn phần tử chọn trước</strong>.</p>

<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int n = 4, k = 2, chosen[10];

void backtrack(int start, int count) {
    if (count == k) {
        for (int i = 0; i &lt; count; i++) cout &lt;&lt; chosen[i] &lt;&lt; " ";
        cout &lt;&lt; "\n";
        return;
    }
    for (int v = start; v &lt;= n; v++) {
        chosen[count] = v;
        backtrack(v + 1, count + 1);   // chỉ xét số LỚN HƠN v ở bước sau
    }
}

int main() {
    backtrack(1, 0);   // in ra: 1 2 / 1 3 / 1 4 / 2 3 / 2 4 / 3 4
    return 0;
}</code></pre>

<div class="widget">
  <div class="widget-label">Trạng thái mảng chosen[] — tổ hợp chập 2 của {1,2,3,4}</div>
  <div id="d2CombArrayView" style="display:flex; justify-content:center; gap: 10px; margin: 1.5rem 0;"></div>
  <div class="widget-label">Đang ở lời gọi backtrack nào — dạng thư mục lồng nhau</div>
  <div id="d2CombCallStackView" style="font-family: monospace; font-size: 0.85rem; line-height: 1.9; min-height: 130px; margin-bottom: 1rem;"></div>
  <div class="caption" id="d2CombCaption">Bấm "Bước tiếp theo" để bắt đầu.</div>
  <div class="controls">
    <button class="secondary" id="d2CombPrev">← Lùi lại</button>
    <button id="d2CombNext">Bước tiếp theo →</button>
    <button class="secondary" id="d2CombReset">Chạy lại từ đầu</button>
  </div>
  <div class="step-info"><span id="d2CombStepNum">0</span> / <span id="d2CombStepTotal">0</span> bước — kết quả đã in: <span id="d2CombResults" style="font-family: monospace;"></span></div>
</div>

<div class="realworld">
  <span class="rw-title">🌐 Ứng dụng thực tế</span>
  <dl>
    <dt>Dùng ở đâu</dt>
    <dd>Tính xác suất trúng số/xổ số; hệ thống gợi ý ưu đãi thương mại điện tử "chọn 2 trong 5 món"; thiết kế thử nghiệm A/B khi chọn tập con người dùng để test.</dd>
    <dt>Giải quyết vấn đề gì</dt>
    <dd>Đếm hoặc liệt kê số cách chọn ra 1 tập con, không quan tâm thứ tự.</dd>
    <dt class="good">Khi nào NÊN dùng</dt>
    <dd class="good">Cần liệt kê từng tổ hợp cụ thể, n và k đủ nhỏ.</dd>
    <dt class="bad">Khi nào KHÔNG NÊN dùng</dt>
    <dd class="bad">Nếu chỉ cần <em>số lượng</em>, dùng công thức C(n,k) bằng QHĐ sẽ nhanh hơn — không cần sinh hết rồi đếm.</dd>
  </dl>
</div>

<h3 id="bai1-hoanvi-ke-tiep">★ Bài chính thức trong Đề ôn tập — Bài 1: Hoán vị kế tiếp (Next Permutation)</h3>

<div class="problem-box">
<span class="pb-title">📋 Nguyên văn đề bài</span>
<p>Cho số tự nhiên N và một hoán vị X[] của 1, 2, ..., N. Nhiệm vụ của bạn là đưa ra hoán vị kế tiếp theo X[].</p>
<p>Ví dụ N=5, X[] = {1, 2, 3, 4, 5} thì hoán vị kế tiếp theo của X[] là {1, 2, 3, 5, 4}.</p>
<p><strong>Input:</strong> Dòng đầu tiên đưa vào số lượng test T. Những dòng kế tiếp đưa vào các bộ test. Mỗi bộ test gồm hai dòng: dòng thứ nhất là số N; dòng tiếp theo đưa vào hoán vị X[] của 1, 2, ..., N. Ràng buộc: 1≤T≤100; 1≤N≤10³.</p>
<p><strong>Output:</strong> Đưa ra kết quả mỗi test theo từng dòng.</p>
<table class="formula-table"><tr><th>Input</th><th>Output</th></tr>
<tr><td>2<br>5<br>1 2 3 4 5<br>5<br>5 4 3 2 1</td><td>1 2 3 5 4<br>1 2 3 4 5</td></tr></table>
</div>
<blockquote><p>📌 Bài Tổ hợp ở trên chỉ để bạn quen với khung quay lui "chọn k trong n". <strong>Đây mới là bài bạn sẽ gặp đúng nguyên văn trong đề thi</strong> — chú ý thuật toán này KHÔNG dùng quay lui, mà là một kỹ thuật riêng.</p></blockquote>

<p class="idea-label">🗣️ Bước 0 — Hoán vị là gì (nếu bạn chưa chắc khái niệm này)</p>
<p><strong>Hoán vị</strong> của {1,2,3} chỉ đơn giản là <strong>1 cách sắp xếp thứ tự</strong> 3 số đó. Có đúng <code>3! = 6</code> cách sắp xếp khác nhau: 123, 132, 213, 231, 312, 321. Không có gì phức tạp — đó chỉ là danh sách mọi cách trộn thứ tự có thể của cùng 1 bộ số.</p>

<p class="idea-label">🗣️ Bước 1 — "Kế tiếp" nghĩa là gì</p>
<p>Nếu bạn xếp <strong>cả 6 hoán vị đó theo thứ tự từ nhỏ tới lớn</strong> (giống so sánh 2 số: so chữ số đầu trước, bằng nhau mới so chữ số sau), bạn có 1 danh sách cố định:</p>
<p style="text-align:center; font-family:monospace; font-size:1.05rem; margin:1rem 0;">123 → 132 → 213 → 231 → 312 → 321</p>
<p>"Hoán vị kế tiếp của X" chỉ đơn giản là <strong>hoán vị đứng ngay sau X trong danh sách này</strong>. Ví dụ X=123 → kế tiếp là 132 (đứng ngay sau). Nếu X=321 (đứng cuối danh sách, không còn gì lớn hơn) → <strong>quay vòng về đầu danh sách</strong>, kế tiếp là 123.</p>
<blockquote><p>💡 Đây đúng là 2 test case trong đề của bạn: N=5, X={1,2,3,4,5} → kế tiếp {1,2,3,5,4} (trường hợp bình thường); và N=5, X={5,4,3,2,1} (hoán vị LỚN NHẤT có thể) → kế tiếp {1,2,3,4,5} (trường hợp quay vòng về nhỏ nhất). Nếu đề chỉ cho ví dụ 1 mà bạn không để ý ví dụ 2, rất dễ bỏ sót trường hợp quay vòng khi code.</p></blockquote>

<p class="idea-label">🗣️ Bước 2 — Vì sao cần thuật toán, không liệt kê hết ra?</p>
<p>Với 3 số thì liệt kê hết 6 hoán vị rồi tìm "đứng sau" rất dễ. Nhưng đề cho <strong>n tới 1000</strong> — số hoán vị khi đó là <code>1000!</code>, một con số khổng lồ không thể liệt kê hết. Vậy câu hỏi thật sự của bài toán là: <strong>làm sao suy ra được "hộp kế tiếp" trực tiếp từ X, mà không cần vẽ ra cả danh sách?</strong> Đó là lý do cần 1 thuật toán riêng — thuật toán chỉ là mẹo tính tắt, bản chất bài toán vẫn là "tìm ô kế tiếp trong danh sách" như Bước 1.</p>

<p class="idea-label">🗣️ Bước 3 — Trực giác của thuật toán: sửa "ít nhất có thể"</p>
<p>Nghĩ về việc đếm số thường ngày: sau 129 là 130 — bạn không đổi hết cả 3 chữ số, chỉ đổi <strong>đoạn đuôi ngắn nhất có thể</strong> (129→130: chữ số hàng chục 2→3, hàng đơn vị 9→0). Hoán vị kế tiếp hoạt động y hệt: giữ nguyên phần đầu càng nhiều càng tốt, chỉ sửa 1 đoạn đuôi nhỏ nhất.</p>

<p>Vậy khi nào 1 đoạn đuôi "hết cách" để tăng thêm? Khi đoạn đó đang <strong>giảm dần</strong> — ví dụ đuôi "43" của số 1543: đây đã là cách xếp LỚN NHẤT có thể từ 2 chữ số {3,4}, không thể lớn hơn nữa. Phải lùi ra xa hơn, tới chữ số đầu tiên (từ phải qua) mà <strong>còn tăng được</strong> so với chữ số ngay sau nó.</p>

<p><strong>Thuật toán 3 bước chuẩn</strong> (áp dụng cho hoán vị X[0..n-1]):</p>
<ol>
  <li><strong>Tìm điểm gãy (pivot)</strong>: đi từ phải sang trái, tìm chỉ số <code>i</code> lớn nhất sao cho <code>X[i] &lt; X[i+1]</code> (đoạn từ i+1 tới cuối đang giảm dần — đã "cạn" khả năng lớn hơn). Nếu không tìm thấy <code>i</code> nào (cả dãy giảm dần từ đầu tới cuối) → đây đã là hoán vị lớn nhất, quay vòng về nhỏ nhất.</li>
  <li><strong>Tìm người thay thế</strong>: trong đoạn giảm dần <code>X[i+1..n-1]</code>, tìm phần tử <strong>nhỏ nhất nhưng vẫn lớn hơn <code>X[i]</code></strong> — chính là phần tử cuối cùng (đi từ phải sang) còn lớn hơn <code>X[i]</code>. Đổi chỗ nó với <code>X[i]</code>.</li>
  <li><strong>Sắp lại đoạn đuôi</strong>: sau khi đổi chỗ, đoạn <code>X[i+1..n-1]</code> vẫn đang giảm dần — đảo ngược nó thành tăng dần để có giá trị <strong>nhỏ nhất có thể</strong> cho đoạn đuôi này (nhỏ nhất trong số các hoán vị lớn hơn hoán vị gốc).</li>
</ol>

<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int a[1005];   // mảng cố định, đủ lớn cho n ≤ 1000 theo đề

void nextPermutation(int n) {
    int i = n - 2;
    while (i &gt;= 0 && a[i] &gt;= a[i + 1]) i--;   // Bước 1: tìm pivot i

    if (i &gt;= 0) {
        int j = n - 1;
        while (a[j] &lt;= a[i]) j--;              // Bước 2: tìm người thay thế nhỏ nhất > a[i]
        swap(a[i], a[j]);
    }

    // Bước 3: đảo ngược đoạn đuôi a[i+1 .. n-1] bằng 2 con trỏ (giống bài "đảo ngược từng từ" ở phần Ngăn xếp)
    int l = i + 1, r = n - 1;
    while (l &lt; r) { swap(a[l], a[r]); l++; r--; }
    // Nếu i == -1 (không tìm thấy pivot): l=0, r=n-1 → đảo ngược cả mảng — quay về hoán vị nhỏ nhất
}

int main() {
    int T; cin &gt;&gt; T;
    while (T--) {
        int n; cin &gt;&gt; n;
        for (int k = 0; k &lt; n; k++) cin &gt;&gt; a[k];
        nextPermutation(n);
        for (int k = 0; k &lt; n; k++) cout &lt;&lt; a[k] &lt;&lt; " ";
        cout &lt;&lt; "\n";
    }
    return 0;
}</code></pre>

<blockquote><p>📎 <strong>Vì sao dùng mảng thường thay vì <code>vector</code>?</strong> Đề cho <strong>n thay đổi theo từng bộ test</strong> (test này n=5, test khác có thể n=1000). Với mảng thường, cách xử lý là khai báo 1 mảng đủ lớn (<code>int a[1005]</code>) dùng chung cho mọi test, rồi tự truyền biến <code>n</code> riêng vào hàm để biết đang dùng bao nhiêu phần tử — khác với <code>vector</code> tự co giãn kích thước và tự nhớ <code>a.size()</code>. Ở bước 3, thay vì gọi sẵn <code>reverse()</code> của <code>vector</code>, ta tự viết vòng lặp 2 con trỏ <code>l, r</code> tiến vào nhau — đây đúng là kỹ thuật bạn đã dùng ở bài "đảo ngược từng từ trong xâu" (Bài 5, phần Ngăn xếp). <strong>Thuật toán (tìm pivot → tìm người thay thế → đảo ngược đuôi) hoàn toàn không đổi</strong> — khác biệt duy nhất là công cụ lưu trữ dữ liệu.</p></blockquote>

<p class="idea-label">🔁 Cách viết khác — dùng <code>vector</code> (nếu bạn thích cú pháp gọn hơn)</p>
<p>Đây là <strong>đúng thuật toán y hệt</strong> ở trên, chỉ đổi công cụ lưu trữ. Với <code>vector</code>, hàm <code>reverse()</code> có sẵn được gọi thẳng bằng <code>a.begin()</code>/<code>a.end()</code> — không cần tự viết vòng lặp 2 con trỏ <code>l, r</code> nữa, vì <code>reverse()</code> chính là kỹ thuật đó đã được đóng gói sẵn.</p>

<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

void nextPermutation(vector&lt;int&gt;& a) {
    int n = a.size();
    int i = n - 2;
    while (i &gt;= 0 && a[i] &gt;= a[i + 1]) i--;   // Bước 1: tìm pivot i

    if (i &gt;= 0) {
        int j = n - 1;
        while (a[j] &lt;= a[i]) j--;              // Bước 2: tìm người thay thế nhỏ nhất > a[i]
        swap(a[i], a[j]);
    }
    reverse(a.begin() + i + 1, a.end());        // Bước 3: gọi thẳng hàm reverse() có sẵn
    // Nếu i == -1 (không tìm thấy pivot): reverse cả mảng — quay về hoán vị nhỏ nhất
}

int main() {
    int T; cin &gt;&gt; T;
    while (T--) {
        int n; cin &gt;&gt; n;
        vector&lt;int&gt; a(n);
        for (int &v : a) cin &gt;&gt; v;
        nextPermutation(a);
        for (int v : a) cout &lt;&lt; v &lt;&lt; " ";
        cout &lt;&lt; "\n";
    }
    return 0;
}</code></pre>

<blockquote><p>💡 <strong>So sánh nhanh 2 bản</strong>: bản mảng thường phải tự khai báo kích thước đủ lớn và tự truyền <code>n</code>, còn bản <code>vector</code> tự co giãn theo từng test (<code>vector&lt;int&gt; a(n)</code>) và tự biết kích thước qua <code>a.size()</code>. Về mặt thuật toán, <strong>2 bản giống nhau 100%</strong> — chọn bản nào là tùy bạn thấy quen tay hơn khi đi thi.</p></blockquote>

<p><strong>Chạy tay đúng ví dụ 1 trong đề</strong>: N=5, X = {1, 2, 3, 4, 5}.</p>
<table class="formula-table">
  <tr><th>Bước</th><th>Việc làm</th><th>Kết quả</th></tr>
  <tr><td>1. Tìm pivot i</td><td>Đi từ phải: so <code>a[i]&lt;a[i+1]</code>: a[3]=4 &lt; a[4]=5 → đúng ngay tại i=3</td><td>i = 3 (giá trị 4)</td></tr>
  <tr><td>2. Tìm người thay thế</td><td>Đoạn sau i chỉ có {5}. Phần tử nhỏ nhất mà vẫn lớn hơn 4 chính là 5</td><td>j = 4 (giá trị 5)</td></tr>
  <tr><td>Đổi chỗ a[i], a[j]</td><td>Đổi 4 và 5</td><td>{1, 2, 3, 5, 4}</td></tr>
  <tr><td>3. Đảo ngược đuôi sau i</td><td>Đoạn sau i (vị trí 4) chỉ có 1 phần tử "4" — đảo ngược không đổi gì</td><td><strong>{1, 2, 3, 5, 4}</strong></td></tr>
</table>
<p>Khớp đúng đáp án đề bài: hoán vị kế tiếp của {1,2,3,4,5} là <strong>{1,2,3,5,4}</strong>.</p>

<p><strong>Chạy tay đúng ví dụ 2 trong đề — trường hợp quay vòng</strong>: N=5, X = {5, 4, 3, 2, 1}.</p>
<table class="formula-table">
  <tr><th>Bước</th><th>Việc làm</th><th>Kết quả</th></tr>
  <tr><td>1. Tìm pivot i</td><td>Đi từ phải: a[3]=2 &lt; a[4]=1? không. a[2]=3&lt;a[3]=2? không. a[1]=4&lt;a[2]=3? không. a[0]=5&lt;a[1]=4? không. Không tìm thấy i nào — cả dãy giảm dần từ đầu tới cuối.</td><td>i = -1 (không có pivot)</td></tr>
  <tr><td>Kết luận</td><td>{5,4,3,2,1} đã là hoán vị LỚN NHẤT có thể của {1..5} — không còn gì lớn hơn nữa</td><td>Quay vòng về nhỏ nhất</td></tr>
  <tr><td>3. Đảo ngược toàn bộ mảng</td><td>Vì i=-1, đoạn "đuôi" chính là toàn bộ mảng — đảo ngược {5,4,3,2,1} thành tăng dần</td><td><strong>{1, 2, 3, 4, 5}</strong></td></tr>
</table>
<p>Khớp đúng đáp án đề bài: hoán vị kế tiếp của {5,4,3,2,1} là <strong>{1,2,3,4,5}</strong> — đúng như bức tranh "quay vòng về đầu danh sách" ở Bước 1.</p>

<blockquote><p>💡 <strong>Vì sao phải đảo ngược ở bước 3, không phải sắp xếp tăng dần bằng <code>sort()</code>?</strong> Vì đoạn đuôi trước khi đổi chỗ vốn <em>đã giảm dần</em> (đó là lý do ta chọn được nó ở bước 1) — sau khi đổi chỗ nó vẫn giảm dần, nên chỉ cần <code>reverse()</code> (O(k)) là ra ngay thứ tự tăng dần, không cần <code>sort()</code> tốn O(k log k).</p></blockquote>

<div class="realworld">
  <span class="rw-title">🌐 Ứng dụng thực tế</span>
  <dl>
    <dt>Dùng ở đâu</dt>
    <dd>Hàm <code>std::next_permutation</code> có sẵn trong thư viện chuẩn C++ (chính là thuật toán này); sinh test case theo thứ tự để kiểm thử toàn bộ hoán vị nhỏ mà không cần lưu hết vào bộ nhớ; xếp hạng thứ tự từ điển trong bài toán đếm/tìm hoán vị thứ k.</dd>
    <dt>Giải quyết vấn đề gì</dt>
    <dd>Duyệt tuần tự tất cả hoán vị theo thứ tự tăng dần mà không cần sinh hết bằng quay lui rồi sắp xếp (tiết kiệm bộ nhớ, chạy tại chỗ O(n)).</dd>
    <dt class="good">Khi nào NÊN dùng</dt>
    <dd class="good">Cần hoán vị kế tiếp/trước đó theo thứ tự từ điển, hoặc duyệt tuần tự mọi hoán vị mà không cần lưu toàn bộ danh sách.</dd>
    <dt class="bad">Khi nào KHÔNG NÊN dùng</dt>
    <dd class="bad">Cần liệt kê TOÀN BỘ hoán vị cùng lúc (dùng quay lui như bài Tổ hợp) hoặc cần hoán vị ngẫu nhiên (dùng <code>random_shuffle</code>/<code>shuffle</code>) thay vì tuần tự.</dd>
  </dl>
</div>

<h4 id="auto-luyen-tap">Luyện tập</h4>
<ol class="practice">
  <li>Code lại không nhìn tài liệu.
    <div class="idea"><em>Ý tưởng:</em> đừng cố nhớ code — nhớ 4 câu hỏi khung (giá trị đặt ở bước i là gì / vòng lặp chạy từ đâu / điều kiện chấp nhận / có lọc gì lúc in). Trả lời đúng 4 câu này thì code tự viết ra được.</div>
    <div class="hint"><em>Hướng dẫn:</em> nếu bí, tự hỏi: giá trị đặt ở vị trí i là gì / vòng lặp j chạy từ đâu / điều kiện chấp nhận j.</div>
  </li>
  <li>Chạy tay hoán vị kế tiếp của {3, 2, 1} — trường hợp không tìm thấy pivot.
    <div class="idea"><em>Ý tưởng:</em> {3,2,1} giảm dần toàn bộ — không có <code>i</code> nào thỏa <code>a[i]&lt;a[i+1]</code>. Đây là hoán vị LỚN NHẤT của {1,2,3}, nên hoán vị kế tiếp phải "quay vòng" về hoán vị NHỎ NHẤT.</div>
    <div class="hint"><em>Hướng dẫn:</em> khi i=-1, đảo ngược toàn bộ mảng → {1,2,3}.</div>
  </li>
  <li>Chạy tay hoán vị kế tiếp của {1, 3, 2}.
    <div class="hint"><em>Hướng dẫn:</em> pivot i=0 (giá trị 1, vì 1&lt;3); người thay thế là 2 (nhỏ nhất còn lớn hơn 1 trong đoạn {3,2}); đổi chỗ → {2,3,1}; đảo ngược đuôi {3,1} → {1,3}; kết quả {2,1,3}.</div>
  </li>
  <li>Tổ hợp có lặp (một số chọn nhiều lần).
    <div class="idea"><em>Ý tưởng:</em> điều duy nhất ngăn 1 số được chọn lại là ràng buộc "phần tử sau phải LỚN HƠN NGHIÊM NGẶT phần tử trước" — nới lỏng đúng 1 chữ (từ "lớn hơn" thành "lớn hơn hoặc bằng") là cho phép chọn lại.</div>
    <div class="hint"><em>Hướng dẫn:</em> đổi <code>backtrack(v+1, count+1)</code> thành <code>backtrack(v, count+1)</code>.</div>
  </li>
  <li>Vì sao Tổ hợp không cần mảng <code>used[]</code> để tránh trùng, mà chỉ cần điều kiện "chỉ số sau &gt; chỉ số trước"?
    <div class="hint"><em>Hướng dẫn:</em> vì mỗi lần chọn luôn đi "về phía trước" trong danh sách, không bao giờ quay lại số nhỏ hơn đã bỏ qua.</div>
  </li>
</ol>


</section>
</template>

<script setup>
import { onMounted } from 'vue'
import { initToHopWidgets } from '../widgets/to-hop.js'

defineProps({ active: Boolean })

onMounted(() => {
  initToHopWidgets()
})
</script>
