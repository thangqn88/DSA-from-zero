<template>
<section id="qhd-nen-tang" class="day-section" data-sid="qhd-nen-tang" v-show="active">

<h2>Quy Hoạch Động — Nền Tảng: Fibonacci &amp; Bậc Thang <span class="exam-tag exam-tag-neutral">nền tảng, không có trong đề</span></h2>

<h3 id="auto-quy-hoach-dong-khac-gi-tham-lam-doc-truoc-khi-hoc-">Quy hoạch động khác gì Tham lam? (đọc trước khi học QHĐ, vì 2 cái rất dễ nhầm)</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Cả 2 phương pháp đều "xây lời giải từ những phần nhỏ hơn" — đây là lý do dễ nhầm. Khác biệt nằm ở đúng 1 điểm: <strong>Tham lam chỉ đi 1 đường duy nhất và không bao giờ quay lại</strong>, còn <strong>QHĐ xét lại đầy đủ mọi khả năng ở mỗi bước rồi mới chọn cái tốt nhất</strong>.</p>

<p>Ẩn dụ: bạn đứng trên núi cần xuống chân núi nhanh nhất, có nhiều ngã rẽ. <strong>Tham lam</strong>: ở mỗi ngã rẽ, chọn ngay hướng dốc nhất trước mắt, không nhìn xa hơn, không quay lại. <strong>QHĐ</strong>: tính sẵn từ chân núi lên — "từ mỗi điểm, đường ngắn nhất xuống chân núi là bao nhiêu?" — ghi nhớ đáp án cho từng điểm, đảm bảo chọn đúng đường ngắn nhất.</p>

<p class="idea-label">🪜 Cùng 1 ví dụ, 2 cách làm ra 2 kết quả khác nhau</p>
<p>Nhớ lại bài Đổi tiền ở phần Tham lam, hệ mệnh giá <strong>{1, 3, 4}</strong>, cần đổi <strong>6đ</strong>:</p>
<table class="formula-table">
  <tr><th></th><th>Cách làm</th><th>Kết quả</th></tr>
  <tr><td><strong>Tham lam</strong></td><td>Chỉ đi 1 đường: lấy đồng lớn nhất trước (4), còn 2 → lấy 1, còn 1 → lấy 1. Không xét lại.</td><td>4+1+1 = <strong>3 đồng</strong></td></tr>
  <tr><td><strong>QHĐ</strong></td><td>Với MỖI số tiền từ 0 tới 6, thử <strong>cả 3 mệnh giá</strong> {1,3,4}, ghi nhớ số đồng ít nhất cho số tiền đó, dùng lại kết quả đã ghi nhớ cho số tiền nhỏ hơn.</td><td>3+3 = <strong>2 đồng</strong> (tối ưu thật)</td></tr>
</table>
<p>QHĐ ra đáp án đúng vì nó <strong>không bỏ sót khả năng nào</strong> — với số tiền 6, nó thử cả "lấy đồng 1 rồi giải bài toán con 5đ", "lấy đồng 3 rồi giải bài toán con 3đ", "lấy đồng 4 rồi giải bài toán con 2đ" — rồi <strong>so sánh cả 3</strong>, chọn cái tốt nhất. Tham lam chỉ thử 1 trong 3 khả năng đó (luôn là "lấy đồng lớn nhất") và tin luôn là nó tốt nhất — đó là lý do nó có thể sai.</p>

<p class="idea-label">🪜 Code QHĐ đúng cho hệ {1, 3, 4}</p>
<ol>
  <li><strong><code>dp[i]</code> nghĩa là gì</strong>: số đồng ít nhất cần dùng để đổi đúng số tiền <code>i</code>.</li>
  <li><strong>Công thức truy hồi</strong>: với số tiền <code>i</code>, thử <strong>lần lượt từng mệnh giá</strong> <code>c</code> trong hệ tiền — nếu <code>c ≤ i</code>, một cách đổi hợp lệ là "dùng 1 đồng <code>c</code>, cộng với cách đổi tốt nhất cho số tiền còn lại <code>i-c</code>" tức <code>dp[i-c] + 1</code>. Vì có nhiều mệnh giá để thử, <strong>lấy giá trị nhỏ nhất</strong> trong tất cả các cách: <code>dp[i] = min(dp[i-c] + 1)</code> với mọi mệnh giá <code>c ≤ i</code>.</li>
  <li><strong>Base case</strong>: <code>dp[0] = 0</code> (đổi số tiền 0 cần 0 đồng).</li>
  <li><strong>Thứ tự tính</strong>: tăng dần từ <code>i=1</code> tới số tiền cần đổi, vì <code>dp[i]</code> luôn cần các giá trị <code>dp[i-c]</code> nhỏ hơn đã tính trước đó.</li>
</ol>

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
<p>Kết quả <code>dp[6] = 2</code>, đúng bằng cách đổi 3+3 — khớp với đáp án tối ưu bạn đã thấy ở bảng trên, không phải 3 đồng như Tham lam.</p>

<blockquote><p>📎 So sánh với đổi tiền hệ chuẩn ({25,10,5,1}) đã học ở phần Tham lam: về code, khác biệt duy nhất là Tham lam chỉ cần <strong>1 vòng lặp</strong> (chia lấy dư liên tục), còn QHĐ cần <strong>2 vòng lặp lồng nhau</strong> (1 vòng cho từng số tiền từ 0 tới amount, 1 vòng cho từng mệnh giá) — đây chính là "cái giá" phải trả để đảm bảo luôn đúng với mọi hệ mệnh giá, kể cả hệ "không chuẩn" như {1,3,4}.</p></blockquote>

<p class="idea-label">📊 Bảng so sánh tổng quát</p>
<table class="formula-table">
  <tr><th></th><th>Tham lam</th><th>QHĐ</th></tr>
  <tr><td>Cách chọn</td><td>1 lựa chọn tốt nhất tại chỗ, không xét lại</td><td>Xét <strong>mọi</strong> lựa chọn hợp lệ ở mỗi bước, ghi nhớ đáp án bài toán con</td></tr>
  <tr><td>Tốc độ</td><td>Nhanh (thường O(n log n) do chỉ cần sort)</td><td>Chậm hơn (thường O(n²) hoặc hơn, vì phải tính hết mọi bài toán con)</td></tr>
  <tr><td>Độ tin cậy</td><td>Chỉ đúng nếu <strong>chứng minh được</strong> lựa chọn tốt nhất tại chỗ luôn nằm trong lời giải tối ưu (như "kết thúc sớm nhất" ở Activity Selection)</td><td><strong>Luôn đúng</strong> — vì không bỏ sót khả năng nào</td></tr>
  <tr><td>Khi nào dùng</td><td>Đã chứng minh được greedy đúng cho bài toán cụ thể đó</td><td>Không chứng minh được greedy đúng, hoặc biết chắc nó sai (như hệ tiền {1,3,4})</td></tr>
</table>

<blockquote><p>💡 <strong>Câu hỏi tự đặt ra khi đi thi</strong>: "Nếu tôi chọn cái tốt nhất ngay bây giờ, tôi có chắc không bao giờ hối hận ở các bước sau không?" Nếu câu trả lời là <strong>có</strong> và bạn giải thích được vì sao (như lập luận "đổi chỗ" ở Activity Selection) → dùng Tham lam. Nếu câu trả lời là <strong>"không chắc"</strong>, hoặc bạn tìm được 1 ví dụ mà cách chọn tốt nhất tại chỗ dẫn tới kết quả sai (như hệ tiền {1,3,4}) → phải dùng QHĐ.</p></blockquote>

<h3 id="auto-vi-sao-can-quy-hoach-dong">Vì sao cần Quy hoạch động</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Nếu ai đó hỏi "1+1+...+1 (10 số 1) bằng mấy?", bạn cộng ra 10. Nếu họ hỏi tiếp "vậy 11 số 1?", bạn <strong>không cộng lại từ đầu</strong> — bạn nhớ kết quả cũ là 10, chỉ cần 10+1=11. Đó là bản chất <strong>Quy hoạch động (QHĐ)</strong>: lưu lại kết quả bài toán con đã giải, không tính lại.</p>
<p>Đệ quy Fibonacci thường tính lại F(3), F(2)... nhiều lần lãng phí — gọi là <strong>"overlapping subproblems"</strong>. QHĐ sửa việc này bằng cách lưu kết quả vào mảng <code>dp[]</code>.</p>


<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

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

<blockquote><p><strong>4 bước tư duy để giải MỌI bài QHĐ</strong> (viết ra giấy khi làm bài thi): (1) <code>dp[i]</code> nghĩa là gì, (2) công thức truy hồi, (3) base case, (4) thứ tự tính.</p></blockquote>

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

<h3 id="auto-bac-thang-climbing-stairs">Bậc thang (Climbing Stairs)</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p><strong>Đề bài</strong>: n bậc thang, mỗi lần bước 1 hoặc 2 bậc, đếm số cách lên tới bậc n. (1) <code>dp[i]</code> = số cách lên bậc i. (2) bước cuối từ i-1 hoặc i-2 → <code>dp[i]=dp[i-1]+dp[i-2]</code>. (3) <code>dp[0]=dp[1]=1</code>. (4) tăng dần.</p>

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

<blockquote><p>Công thức truy hồi giống hệt Fibonacci! Nhận ra sự lặp lại cấu trúc toán học này giúp bạn giải nhanh hơn rất nhiều trong phòng thi.</p></blockquote>

<div class="realworld">
  <span class="rw-title">🌐 Ứng dụng thực tế</span>
  <dl>
    <dt>Dùng ở đâu</dt>
    <dd>Mô hình tăng trưởng trong tài chính (lãi kép đơn giản hóa); phân tích số lượng cách mã hóa/giải mã trong lý thuyết thông tin; bài toán đếm số cách trong game (số cách hoàn thành 1 chuỗi hành động).</dd>
    <dt>Giải quyết vấn đề gì</dt>
    <dd>Đếm số cách đạt tới 1 trạng thái khi có vài lựa chọn bước đi cố định ở mỗi bước.</dd>
    <dt class="good">Khi nào NÊN dùng</dt>
    <dd class="good">Bài toán đếm có công thức truy hồi tuyến tính đơn giản (phụ thuộc vài bước liền trước).</dd>
    <dt class="bad">Khi nào KHÔNG NÊN dùng</dt>
    <dd class="bad">n cực lớn (hàng tỷ) — cần công thức nhân ma trận (fast doubling) để tính Fibonacci trong O(log n) thay vì O(n).</dd>
  </dl>
</div>

<h4 id="auto-luyen-tap">Luyện tập</h4>
<ol class="practice">
  <li>Tính tay Fibonacci F(0)..F(10) kiểu bottom-up — đối chiếu widget ở trên.
    <div class="idea"><em>Ý tưởng:</em> mỗi ô chỉ cần nhìn lại đúng 2 ô liền trước — không cần nhớ gì xa hơn, đây là dấu hiệu của công thức truy hồi "tuyến tính bậc 2".</div>
  </li>
  <li>Bậc thang với biến thể "bước 1, 2, hoặc 3" — tự suy công thức mới.
    <div class="idea"><em>Ý tưởng:</em> tự hỏi "bước CUỐI CÙNG để tới bậc i có thể là gì?" — nếu được bước 1,2, hoặc 3, thì bước cuối đến từ bậc i-1, i-2, hoặc i-3 — cộng cả 3 khả năng đó lại.</div>
    <div class="hint"><em>Hướng dẫn:</em> <code>dp[i]=dp[i-1]+dp[i-2]+dp[i-3]</code>, cần base case cả dp[0],dp[1],dp[2].</div>
  </li>
  <li>Học thuộc 4 bước tư duy QHĐ và áp dụng lại cho cả Fibonacci lẫn Bậc thang, không nhìn sách.
    <div class="idea"><em>Ý tưởng:</em> cả 2 bài dùng chung 1 công thức truy hồi — nhận ra điều này giúp bạn không cần học thuộc riêng từng bài.</div>
  </li>
</ol>


</section>
</template>

<script setup>
import { onMounted } from 'vue'
import { initQhdNenTangWidgets } from '../widgets/qhd-nen-tang.js'

defineProps({ active: Boolean })

onMounted(() => {
  initQhdNenTangWidgets()
})
</script>
