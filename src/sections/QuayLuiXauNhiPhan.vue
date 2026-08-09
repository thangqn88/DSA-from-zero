<template>
<section id="quay-lui-xau-nhi-phan" class="day-section" data-sid="quay-lui-xau-nhi-phan" v-show="active">

<h2>Quay Lui Vét Cạn — Đệ Quy, Khung Quay Lui &amp; Xâu Nhị Phân <span class="exam-tag">★ Đề ôn tập — Bài 2</span></h2>
<div class="mini-toc">
  <span class="mt-label">Chuyển nhanh tới</span>
  <a class="mt-exam" href="#bai2-nqueens">★ Bài 2 — N-Queens</a>
</div>

<h3 id="auto-de-quy-hoi-lai-chinh-minh-voi-bai-toan-nho-hon">Đệ quy — hỏi lại chính mình với bài toán nhỏ hơn</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Bạn đứng xếp hàng mua vé, muốn biết mình là người thứ mấy. Bạn không đếm lại từ đầu hàng — bạn quay sang hỏi người đứng ngay trước mình: <em>"Anh là số mấy?"</em> Người đó cũng không tự biết, nên lại hỏi người trước họ. Cứ thế tới người đầu tiên trong hàng — người này biết chắc chắn, không cần hỏi ai: <em>"Tôi là số 1."</em></p>
<p>Từ đó, câu trả lời "dội ngược" lại: người thứ 2 nghe câu trả lời của người thứ 1 rồi tự cộng thêm 1. Người thứ 3 nghe người thứ 2 rồi cộng thêm 1. Cứ thế cho tới khi bạn nhận được câu trả lời của chính mình.</p>
<p>Đó là <strong>đệ quy</strong>: một bài toán lớn được giải bằng cách hỏi lại chính nó với kích thước nhỏ hơn, cho tới khi gặp <strong>base case</strong> — trường hợp đủ nhỏ để trả lời trực tiếp, không cần hỏi ai. Mọi hàm đệ quy cần đúng 2 phần: <strong>base case</strong> (dừng, trả lời trực tiếp) và <strong>recursive case</strong> (gọi lại chính hàm đó với bài toán nhỏ hơn). Thiếu base case → hàm gọi mãi mãi không dừng → chương trình bị treo (Stack Overflow).</p>

<p><strong>Ví dụ: tính n! (giai thừa)</strong>. <code>5! = 5×4×3×2×1 = 120</code>. Công thức đệ quy: <code>n! = n × (n-1)!</code>, base case <code>0! = 1</code>.</p>

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

<p>Sơ đồ dưới đây cho thấy máy tính "đi xuống" (gọi hàm nhỏ dần) rồi "đi ngược lên" (trả kết quả về) như thế nào khi chạy <code>factorial(3)</code> — đọc từ trên xuống là chiều gọi hàm, dòng cuối mỗi khối là chiều trả kết quả:</p>

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

<div class="realworld">
  <span class="rw-title">🌐 Ứng dụng thực tế</span>
  <dl>
    <dt>Dùng ở đâu</dt>
    <dd>Lệnh <code>tree</code> / File Explorer khi hiển thị cây thư mục lồng nhau; trình duyệt web duyệt cây DOM; trình biên dịch phân tích cú pháp biểu thức lồng nhau; thư viện parse JSON/XML xử lý object lồng trong object.</dd>
    <dt>Giải quyết vấn đề gì</dt>
    <dd>Xử lý dữ liệu có cấu trúc "lồng nhau" mà không biết trước độ sâu.</dd>
    <dt class="good">Khi nào NÊN dùng</dt>
    <dd class="good">Bài toán tự nhiên chia nhỏ thành bài toán con giống hệt; độ sâu đệ quy không quá vài nghìn tầng.</dd>
    <dt class="bad">Khi nào KHÔNG NÊN dùng</dt>
    <dd class="bad">Độ sâu có thể rất lớn (dễ tràn ngăn xếp); hoặc có nhiều bài toán con lặp lại mà không lưu kết quả (dẫn tới chạy chậm theo cấp số nhân — lý do Quy hoạch động ra đời).</dd>
  </dl>
</div>

<h3 id="auto-quay-lui-backtracking-thu-sai-thi-lui-lai">Quay lui (Backtracking) — thử, sai thì lùi lại</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Bạn đi vào một mê cung không có bản đồ. Tại mỗi ngã rẽ, bạn chọn 1 hướng để thử và đi tiếp. Nếu gặp ngõ cụt, bạn <strong>quay lại đúng ngã rẽ đó</strong>, thử hướng khác. Nếu tất cả hướng ở ngã rẽ này đều là ngõ cụt, bạn <strong>lùi về ngã rẽ trước nữa</strong> để thử hướng khác ở đó.</p>
<p>Đó chính xác là Quay lui: <em>"Thử một lựa chọn → đi sâu hơn nếu vẫn ổn → bế tắc thì lùi lại và thử lựa chọn khác."</em> Khung code luôn có đúng 3 việc — thử, đệ quy đi tiếp, và hoàn tác trước khi thử lựa chọn kế:</p>

<pre v-pre><code>void backtrack(State current) {
    if (isComplete(current)) { processResult(current); return; }
    for (each candidate at this step) {
        if (isValid(candidate)) {
            applyChoice(candidate);      // TRY: đi vào 1 hướng
            backtrack(nextState);        // RECURSE: đi sâu hơn
            undoChoice(candidate);       // UNDO: xóa dấu chân, thử hướng khác
        }
    }
}</code></pre>

<blockquote><p>📎 Đây là khung <strong>giả mã minh họa</strong> (không biên dịch được — <code>State</code>, <code>isComplete</code>, <code>each candidate</code> chỉ là chỗ giữ chỗ), nên không có <code>main()</code>. Bài "Sinh xâu nhị phân" ngay sau đây là bản cụ thể, biên dịch chạy được, có đủ <code>main()</code>.</p></blockquote>
<div class="realworld">
  <span class="rw-title">🌐 Ứng dụng thực tế</span>
  <dl>
    <dt>Dùng ở đâu</dt>
    <dd>Bộ giải Sudoku trong các app/báo; công cụ giải ô chữ tự động; AI chơi cờ khi khám phá cây nước đi ở độ sâu giới hạn; công cụ regex khi so khớp mẫu phức tạp; lập lịch/phân bổ tài nguyên quy mô nhỏ.</dd>
    <dt>Giải quyết vấn đề gì</dt>
    <dd>Tìm hoặc liệt kê tất cả cấu hình thỏa mãn ràng buộc, khi không có công thức tính trực tiếp.</dd>
    <dt class="good">Khi nào NÊN dùng</dt>
    <dd class="good">Kích thước bài toán nhỏ (n dưới vài chục); không có quy luật để dùng Tham lam/QHĐ nhanh hơn; cần đúng lời giải chính xác.</dd>
    <dt class="bad">Khi nào KHÔNG NÊN dùng</dt>
    <dd class="bad">n lớn — thời gian tăng theo cấp số nhân; hệ thống cần phản hồi tức thời nên dùng thuật toán chuyên biệt hoặc heuristic.</dd>
  </dl>
</div>

<h4 id="auto-vi-du-khoi-dong-lam-quen-co-che-chua-phai-bai-tron">Ví dụ khởi động (làm quen cơ chế — chưa phải bài trong đề): Sinh tất cả xâu nhị phân độ dài n</h4>
<p>Mỗi vị trí trong xâu chỉ có đúng 2 lựa chọn: đặt 0, hoặc đặt 1. Đây là dạng vét cạn đơn giản nhất, nhưng cũng là ví dụ tốt nhất để <strong>thấy</strong> "cây trạng thái" thực sự trông như thế nào.</p>

<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int n, a[30];   // a[i] = 0 hoặc 1

void printResult() {
    for (int i = 0; i &lt; n; i++) cout &lt;&lt; a[i];
    cout &lt;&lt; "\n";
}

void backtrack(int idx) {
    if (idx == n) { printResult(); return; }
    for (int v = 0; v &lt;= 1; v++) {   // mỗi vị trí có đúng 2 lựa chọn: 0 hoặc 1
        a[idx] = v;
        backtrack(idx + 1);
    }
}

int main() {
    n = 3;
    backtrack(0);   // in ra 8 xâu: 000,001,010,011,100,101,110,111
    return 0;
}</code></pre>

<blockquote><p>Đây là đúng khuôn <code>for (mỗi lựa chọn có thể) { thử; đệ quy; }</code> — số lựa chọn ở đây luôn cố định là 2 (0 hoặc 1). Quen với bản có <code>for</code> giúp bạn áp dụng ngay cho mọi bài quay lui khác, kể cả khi số lựa chọn thay đổi theo input.</p></blockquote>

<blockquote><p>⚠️ <strong>Để ý: bài này KHÔNG có dòng "hoàn tác" tường minh</strong> — vì <code>a[idx]</code> tự động bị <strong>ghi đè</strong> ở lần lặp kế tiếp của vòng <code>for</code> (khi v chuyển 0→1), đó chính là hoàn tác rồi, chỉ ngầm định chứ không cần viết thêm dòng riêng. Chỉ cần dòng hoàn tác tường minh (như <code>used[v]=false</code>) khi thuật toán có <strong>biến trạng thái phụ</strong> không tự mất đi giữa các lần lặp — bạn sẽ thấy rõ sự khác biệt này ở bài Hoán vị ngay sau đây.</p></blockquote>

<p>Bấm "Bước tiếp theo" để xem 3 góc nhìn đồng bộ: mảng lưu gì, đang ở lời gọi <code>backtrack</code> nào, và toàn cảnh cây đã khám phá tới đâu (n=3, ra đủ 2³=8 xâu):</p>

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

<h3 id="auto-bien-the-xau-nhi-phan-chan">Biến thể: Xâu nhị phân CHẴN</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Một số nhị phân là số chẵn khi và chỉ khi <strong>bit cuối cùng bằng 0</strong>. Ta không cần đổi cách sinh, chỉ cần <strong>lọc thêm điều kiện tại nơi in kết quả</strong>:</p>

<pre v-pre><code>void printResult() {
    if (a[n - 1] != 0) return;    // chỉ giữ xâu kết thúc bằng bit 0
    for (int i = 0; i &lt; n; i++) cout &lt;&lt; a[i];
    cout &lt;&lt; "\n";
}</code></pre>

<blockquote><p>📎 <strong>Ngữ cảnh</strong>: đoạn này chỉ thay <code>printResult()</code> — <code>main()</code>, <code>backtrack()</code> và biến toàn cục <code>n, a[]</code> giữ nguyên như ví dụ phía trên, không cần viết lại.</p></blockquote>

<blockquote><p>Cách nhanh hơn (không bắt buộc): ép bit cuối luôn = 0 ngay tại bước cuối cùng của đệ quy thay vì sinh hết rồi lọc — ví dụ đầu tiên cho thấy "duyệt rồi lọc" luôn đúng nhưng chưa chắc tối ưu.</p></blockquote>

<div class="realworld">
  <span class="rw-title">🌐 Ứng dụng thực tế</span>
  <dl>
    <dt>Dùng ở đâu</dt>
    <dd>Hệ thống feature flag (bật/tắt tính năng) khi liệt kê tổ hợp cấu hình để test; phân quyền kiểu bitmask (Unix rwx); mã hóa trạng thái trong bitmask DP.</dd>
    <dt>Giải quyết vấn đề gì</dt>
    <dd>Biểu diễn và liệt kê mọi tổ hợp có thể của một tập lựa chọn nhị phân bằng dãy bit.</dd>
    <dt class="good">Khi nào NÊN dùng</dt>
    <dd class="good">n nhỏ (≤ 20-25) — 2ⁿ tăng rất nhanh.</dd>
    <dt class="bad">Khi nào KHÔNG NÊN dùng</dt>
    <dd class="bad">n lớn hơn ~25-30 — chuyển sang lấy mẫu, heuristic, hoặc QHĐ tùy bài toán.</dd>
  </dl>
</div>

<h3 id="bai2-nqueens">★ Bài chính thức trong Đề ôn tập — Bài 2: N-Quân Hậu (N-Queens)</h3>

<div class="problem-box">
<span class="pb-title">📋 Nguyên văn đề bài</span>
<p>Cho một bàn cờ vua có kích thước n*n, ta biết rằng quân hậu có thể di chuyển theo chiều ngang, dọc, chéo. Vấn đề đặt ra rằng, có n quân hậu, bạn cần đếm số cách đặt n quân hậu này lên bàn cờ sao cho với 2 quân hậu bất kì, chúng không "ăn" nhau.</p>
<p><strong>Input:</strong> Dòng đầu ghi số bộ test T (T&lt;5). Mỗi bộ test ghi một số nguyên dương n duy nhất (không quá 10).</p>
<p><strong>Output:</strong> Ghi kết quả mỗi bộ test trên một dòng. Số cách đặt quân hậu.</p>
<table class="formula-table"><tr><th>Input</th><th>Output</th></tr>
<tr><td>1<br>4</td><td>2</td></tr></table>
</div>
<blockquote><p>📌 Hai ví dụ ở trên (xâu nhị phân, xâu nhị phân chẵn) chỉ để bạn quen tay với khung Quay lui. <strong>Đây mới là bài bạn sẽ gặp đúng nguyên văn trong đề thi</strong> — hãy tập trung hiểu kỹ phần này.</p></blockquote>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Đây vẫn là đúng khung Quay lui bạn vừa học — chỉ khác ở chỗ <strong>mỗi bước có nhiều lựa chọn hơn 2</strong>, và có thêm điều kiện <code>isValid</code> thật sự (không phải lúc nào cũng đúng như bài xâu nhị phân). Hình dung: đặt lần lượt quân hậu vào <strong>từng hàng một</strong>, hàng 0 rồi hàng 1... Ở mỗi hàng, thử đặt vào từng cột; nếu quân hậu mới đặt <strong>không "ăn" được</strong> bất kỳ quân hậu nào đã đặt trước đó (không cùng cột, không cùng 2 đường chéo) thì đi tiếp xuống hàng sau; nếu bí ở mọi cột của hàng này, <strong>lùi lại hàng trước</strong> để thử cột khác.</p>

<p><strong>Chìa khóa của bài này</strong>: hậu ăn theo hàng, cột, chéo — nhưng vì ta đặt <em>mỗi hàng đúng 1 quân</em>, "không cùng hàng" luôn tự động đúng. Chỉ cần kiểm tra 3 điều còn lại: không cùng cột, không cùng đường chéo chính (hiệu <code>hàng-cột</code> bằng nhau), không cùng đường chéo phụ (tổng <code>hàng+cột</code> bằng nhau).</p>

<p class="idea-label">🧩 Ý nghĩa mảng <code>col[]</code> — đọc kỹ trước khi xem code</p>
<p><code>col[r]</code> trả lời đúng 1 câu hỏi: <strong>"quân hậu ở hàng r đang đứng cột nào?"</strong> Vì mỗi hàng chỉ đặt đúng 1 quân hậu, chỉ cần 1 con số (số cột) để mô tả vị trí quân hậu ở hàng đó — không cần lưu cả cặp (hàng, cột), vì hàng đã chính là chỉ số của mảng rồi. Ví dụ với lời giải (1, 3, 0, 2): <code>col[0]=1</code> nghĩa là quân hậu hàng 0 đứng cột 1; <code>col[2]=0</code> nghĩa là quân hậu hàng 2 đứng cột 0.</p>
<p>Nhờ vậy, hàm <code>isValid(row, c)</code> chỉ cần duyệt qua các hàng <code>r &lt; row</code> đã đặt trước đó và đọc lại <code>col[r]</code> để biết "hàng đó từng đứng cột nào", từ đó so sánh với cột <code>c</code> đang định thử.</p>

<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int n, col[30];      // col[r] = cột đặt quân hậu ở hàng r
long long count_ways = 0;

bool isValid(int row, int c) {
    for (int r = 0; r &lt; row; r++) {
        if (col[r] == c) return false;                  // cùng cột
        if (abs(col[r] - c) == abs(r - row)) return false; // cùng đường chéo
    }
    return true;
}

void backtrack(int row) {
    if (row == n) { count_ways++; return; }
    for (int c = 0; c &lt; n; c++) {
        if (isValid(row, c)) {
            col[row] = c;        // TRY
            backtrack(row + 1);  // RECURSE
            // không cần dòng UNDO tường minh — col[row] sẽ bị GHI ĐÈ
            // ở lượt lặp kế tiếp của for, giống hệt bài xâu nhị phân ở trên
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

<blockquote><p>📎 <strong>Vì sao gán <code>col[row] = c</code> ngay tại dòng đó, không phải trước khi gọi <code>isValid</code>?</strong> Trình tự bắt buộc là <em>kiểm tra xong mới được ghi</em>. <code>isValid(row, c)</code> chỉ hỏi "nếu đặt vào (row, c) thì có ổn không" — đây là câu hỏi giả định, chưa hề đặt gì cả. Chỉ khi câu trả lời là <code>true</code>, dòng <code>col[row] = c</code> mới "chốt lại": hàng <code>row</code> chọn cột <code>c</code>. Ngay sau đó, <code>backtrack(row+1)</code> sẽ đọc lại đúng giá trị vừa chốt này khi xét hàng tiếp theo.</p></blockquote>

<blockquote><p>📎 <strong>Vì sao không cần dòng "xóa" <code>col[row]</code> khi lùi lại?</strong> Khi lùi về hàng <code>row</code> để thử cột khác, <code>col[row]</code> của lượt thử cũ không bị xóa về giá trị rỗng nào — nó chỉ đơn giản bị <strong>ghi đè</strong> ở lượt lặp <code>for</code> tiếp theo (nếu vẫn đang ở hàng đó, thử cột mới), hoặc <strong>không còn được đọc tới nữa</strong> (nếu lùi hẳn về hàng trước, vì <code>isValid</code> chỉ đọc <code>col[0..row-1]</code>, không bao giờ đọc lại <code>col[row]</code> sau khi đã lùi khỏi hàng đó). Đúng nguyên tắc "ghi đè thay vì xóa tường minh" bạn đã học ở bài xâu nhị phân phía trên.</p></blockquote>

<blockquote><p>📎 Đối chiếu đúng khuôn quay lui: vẫn là <code>for (mỗi lựa chọn) { thử; đệ quy; }</code>, chỉ đổi "lựa chọn" từ {0,1} (2 giá trị cố định) thành {0..n-1} (n cột), và thêm <code>isValid</code> để loại bớt nhánh sai ngay từ đầu — kỹ thuật này gọi là <strong>cắt tỉa (pruning)</strong>, giúp không phải sinh hết rồi lọc như bài xâu nhị phân.</p></blockquote>

<p><strong>Chạy tay n=4</strong> — đáp số đúng là 2 cách. Dưới đây là animation chạy đúng từng bước của thuật toán quay lui — bấm "Bước tiếp theo" để xem máy tính thử từng cột, phát hiện xung đột, và lùi lại như thế nào:</p>

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

<p>Nếu bạn tự bấm hết animation, hãy để ý: mỗi lần gặp "xung đột" máy tính KHÔNG quay lại từ đầu — nó chỉ thử cột tiếp theo ngay tại hàng đang đứng, đúng như khung <code>for (mỗi lựa chọn) {...}</code> bạn đã học.</p>

<div class="realworld">

  <span class="rw-title">🌐 Ứng dụng thực tế</span>
  <dl>
    <dt>Dùng ở đâu</dt>
    <dd>Bài toán kinh điển kiểm thử tốc độ giải Constraint Satisfaction (CSP); sắp lịch không trùng tài nguyên theo nhiều ràng buộc chéo nhau (ví dụ xếp ca trực không ai trùng 2 loại điều kiện cùng lúc); benchmark chuẩn cho các thuật toán tìm kiếm có cắt tỉa.</dd>
    <dt>Giải quyết vấn đề gì</dt>
    <dd>Đếm/liệt kê cấu hình thỏa mãn nhiều ràng buộc "không được trùng" cùng lúc theo nhiều chiều khác nhau.</dd>
    <dt class="good">Khi nào NÊN dùng</dt>
    <dd class="good">n nhỏ (đề giới hạn n≤10 — 10! vẫn đủ nhỏ nhờ cắt tỉa <code>isValid</code>, chứ không phải duyệt hết mọi cách xếp).</dd>
    <dt class="bad">Khi nào KHÔNG NÊN dùng</dt>
    <dd class="bad">n lớn (vài chục trở lên) — số cấu hình tăng cực nhanh, cần thuật toán chuyên biệt hoặc chỉ tìm 1 lời giải thay vì đếm hết.</dd>
  </dl>
</div>

<h4 id="auto-luyen-tap">Luyện tập</h4>
<ol class="practice">
  <li>Viết lại hàm tính <code>1+2+...+n</code> và đếm số chữ số của n bằng đệ quy.
    <div class="idea"><em>Ý tưởng:</em> mọi bài đệ quy đều trả lời được 2 câu hỏi: "bài toán nhỏ hơn trông như thế nào?" và "khi nào đủ nhỏ để trả lời ngay?". Với tổng 1..n: bài nhỏ hơn là tổng 1..(n-1); với đếm chữ số: bài nhỏ hơn là đếm chữ số của n sau khi bỏ chữ số cuối (n/10).</div>
    <div class="hint"><em>Hướng dẫn:</em> tổng 1..n — base case <code>n==0</code> trả về 0, else <code>n + f(n-1)</code>. Đếm chữ số — base case <code>n&lt;10</code> trả về 1, else <code>1 + f(n/10)</code>.</div>
  </li>
  <li>Sinh xâu nhị phân có đúng k số 1.
    <div class="idea"><em>Ý tưởng:</em> đừng cố "chỉ sinh những xâu đúng" ngay từ đầu — cứ sinh HẾT như bình thường (không đổi gì ở <code>backtrack</code>), việc kiểm tra tính chất "đúng k số 1" chỉ cần làm 1 lần duy nhất, ngay tại thời điểm xâu đã hoàn chỉnh. Đây là mẫu chung: tách rời "sinh" và "lọc".</div>
    <div class="hint"><em>Hướng dẫn:</em> dùng lại code sinh xâu nhị phân, sửa <code>printResult()</code> — đếm số lượng 1 trong <code>a[]</code>, chỉ in nếu đếm được đúng k.</div>
  </li>
  <li>Sinh xâu nhị phân lẻ (bit cuối = 1).
    <div class="idea"><em>Ý tưởng:</em> số lẻ và số chẵn chỉ khác nhau đúng 1 bit cuối cùng — nếu đã hiểu vì sao bài chẵn lọc bằng <code>a[n-1]==0</code>, bài lẻ chỉ là phủ định điều kiện đó.</div>
    <div class="hint"><em>Hướng dẫn:</em> đổi <code>if (a[n-1] != 0) return;</code> thành <code>if (a[n-1] != 1) return;</code>.</div>
  </li>
  <li>Giải thích: với các bài quay lui có dùng biến trạng thái phụ như <code>used[]</code> (sẽ gặp ở bài Hoán vị, phần Tổ hợp), tại sao thiếu bước "hoàn tác" sẽ làm sai kết quả?
    <div class="hint"><em>Hướng dẫn:</em> nhánh sau sẽ coi giá trị đó "đã dùng" dù thực ra không còn trong lời giải đang xây — dẫn tới bỏ sót cấu hình hợp lệ. (Bài xâu nhị phân ở trên không cần hoàn tác tường minh vì không có biến trạng thái phụ nào — xem lại lưu ý ⚠️ phía trên.)</div>
  </li>
  <li>Chạy tay N-Queens với n=4, liệt kê đúng cả 2 cách đặt bằng tay trước khi đối chiếu code.
    <div class="idea"><em>Ý tưởng:</em> đặt hàng 0 cột 0 trước — thử đi hết nhánh này tới ngõ cụt để cảm nhận được lúc nào <code>isValid</code> trả về false và code phải lùi lại.</div>
    <div class="hint"><em>Hướng dẫn:</em> 2 cách đúng là (1,3,0,2) và (2,0,3,1) — đọc là cột đặt tương ứng ở hàng 0,1,2,3.</div>
  </li>
  <li>Vì sao N-Queens không cần mảng <code>used[]</code> riêng cho cột, mà chỉ cần mảng <code>col[]</code> đã lưu vị trí từng hàng?
    <div class="hint"><em>Hướng dẫn:</em> <code>col[]</code> đã lưu đủ thông tin để suy ra cả 3 điều kiện (cột, 2 đường chéo) ngay trong <code>isValid</code>, không cần thêm biến trạng thái phụ nào khác.</div>
  </li>
</ol>


</section>
</template>

<script setup>
import { onMounted } from 'vue'
import { initQuayLuiXauNhiPhanWidgets } from '../widgets/quay-lui-xau-nhi-phan.js'

defineProps({ active: Boolean })

onMounted(() => {
  initQuayLuiXauNhiPhanWidgets()
})
</script>
