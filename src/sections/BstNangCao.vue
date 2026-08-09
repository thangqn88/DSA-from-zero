<template>
<section id="bst-nang-cao" class="day-section" data-sid="bst-nang-cao" v-show="active">

<h2>Cây Nhị Phân Tìm Kiếm Nâng Cao — Kiểm Tra BST, Cân Bằng, LCA <span class="exam-tag exam-tag-neutral">nền tảng, không có trong đề</span></h2>

<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

struct Node { int val; Node *left, *right; };
Node* newNode(int v) { Node* n = new Node(); n-&gt;val=v; n-&gt;left=n-&gt;right=nullptr; return n; }

int height(Node* root) {
    if (!root) return 0;
    return 1 + max(height(root-&gt;left), height(root-&gt;right));
}

int main() {
    Node* root = newNode(5);
    root-&gt;left = newNode(3); root-&gt;left-&gt;left = newNode(1); root-&gt;left-&gt;right = newNode(4);
    root-&gt;right = newNode(8); root-&gt;right-&gt;right = newNode(9);
    cout &lt;&lt; height(root);   // in ra: 3
    return 0;
}</code></pre>

<h3 id="auto-kiem-tra-bst-hop-le-loi-hay-gap-nhat">Kiểm tra BST hợp lệ — lỗi hay gặp nhất</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Nhiều bạn chỉ so sánh node với 2 con trực tiếp — <strong>SAI</strong>, vì tính chất BST áp dụng cho toàn bộ cây con. Cách đúng: truyền xuống mỗi lời gọi đệ quy một <strong>khoảng giá trị hợp lệ (min, max)</strong>.</p>
<blockquote><p>📎 <strong>Ngữ cảnh</strong>: ví dụ dưới dùng chung <code>struct Node</code> và <code>newNode()</code> đã khai báo ở ví dụ <code>height()</code> phía trên.</p></blockquote>

<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

struct Node { int val; Node *left, *right; };
Node* newNode(int v) { Node* n = new Node(); n-&gt;val=v; n-&gt;left=n-&gt;right=nullptr; return n; }

bool isValidBST(Node* root, long long lo, long long hi) {
    if (!root) return true;
    if (root-&gt;val &lt;= lo || root-&gt;val &gt;= hi) return false;
    return isValidBST(root-&gt;left, lo, root-&gt;val) && isValidBST(root-&gt;right, root-&gt;val, hi);
}

int main() {
    Node* root = newNode(5);
    root-&gt;right = newNode(4);   // cây bẫy: 4 nằm bên phải 5 nhưng 4 &lt; 5
    cout &lt;&lt; isValidBST(root, LLONG_MIN, LLONG_MAX);   // in ra: 0 (false)
    return 0;
}</code></pre>

<p>Bấm "Bước tiếp theo" để xem khoảng (lo, hi) thu hẹp dần trên cây bẫy: <code>5 → phải: (4 → null, null)</code> — node 4 nằm bên phải của 5 nhưng 4&lt;5:</p>

<div class="widget">
  <div class="widget-label">Kiểm tra cây bẫy: gốc 5, con phải là 4</div>
  <div id="d14ValidSvg" style="position:relative; width:100%; height:160px;"></div>
  <div class="caption" id="d14ValidCaption">Bấm "Bước tiếp theo" để bắt đầu.</div>
  <div class="controls">
    <button class="secondary" id="d14ValidPrev">← Lùi lại</button>
    <button id="d14ValidNext">Bước tiếp theo →</button>
    <button class="secondary" id="d14ValidReset">Chạy lại từ đầu</button>
  </div>
  <div class="step-info"><span id="d14ValidStepNum">0</span> / <span id="d14ValidStepTotal">0</span> bước</div>
</div>

<h3 id="auto-cay-can-bang">Cây cân bằng</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Chênh lệch chiều cao 2 cây con mọi node ≤ 1. Trả về <code>-1</code> làm tín hiệu "đã mất cân bằng" để dừng sớm, tính trong 1 lần đệ quy O(n).</p>

<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

struct Node { int val; Node *left, *right; };
Node* newNode(int v) { Node* n = new Node(); n-&gt;val=v; n-&gt;left=n-&gt;right=nullptr; return n; }

int checkBalance(Node* root) {
    if (!root) return 0;
    int l = checkBalance(root-&gt;left);
    if (l == -1) return -1;
    int r = checkBalance(root-&gt;right);
    if (r == -1) return -1;
    if (abs(l - r) &gt; 1) return -1;
    return 1 + max(l, r);
}

int main() {
    Node* root = newNode(5);
    root-&gt;left = newNode(3); root-&gt;left-&gt;left = newNode(1); root-&gt;left-&gt;right = newNode(4);
    root-&gt;right = newNode(8); root-&gt;right-&gt;right = newNode(9);
    cout &lt;&lt; (checkBalance(root) != -1);   // in ra: 1 (true, cây này cân bằng)
    return 0;
}</code></pre>

<div class="realworld">
  <span class="rw-title">🌐 Ứng dụng thực tế</span>
  <dl>
    <dt>Dùng ở đâu</dt>
    <dd>Kiểm tra tính hợp lệ của cấu trúc index trong cơ sở dữ liệu sau khi thao tác hàng loạt; giám sát sức khỏe cấu trúc dữ liệu cây trong hệ thống tự cân bằng (AVL, Red-Black Tree) trước khi đưa vào production.</dd>
    <dt>Giải quyết vấn đề gì</dt>
    <dd>Xác minh cấu trúc cây còn giữ đúng tính chất mong muốn (thứ tự, cân bằng) hay đã bị hỏng do lỗi cài đặt.</dd>
    <dt class="good">Khi nào NÊN dùng</dt>
    <dd class="good">Sau khi cài đặt thao tác chèn/xóa cây, dùng để kiểm thử tự động (unit test) xem cấu trúc còn đúng không.</dd>
    <dt class="bad">Khi nào KHÔNG NÊN dùng</dt>
    <dd class="bad">Không cần chạy kiểm tra này trong code sản phẩm thực tế mỗi lần thao tác (tốn O(n) mỗi lần) — chỉ dùng khi kiểm thử/debug.</dd>
  </dl>
</div>

<h3 id="auto-lca-trong-bst-lowest-common-ancestor">LCA trong BST (Lowest Common Ancestor)</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Nếu cả p và q <strong>nhỏ hơn</strong> node hiện tại → LCA nằm bên trái; nếu cả 2 <strong>lớn hơn</strong> → nằm bên phải; nếu 1 nhỏ 1 lớn (hoặc bằng) → <strong>chính node hiện tại là LCA</strong>.</p>

<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

struct Node { int val; Node *left, *right; };
Node* newNode(int v) { Node* n = new Node(); n-&gt;val=v; n-&gt;left=n-&gt;right=nullptr; return n; }

Node* findLCA(Node* root, int p, int q) {
    if (!root) return nullptr;
    if (p &lt; root-&gt;val && q &lt; root-&gt;val) return findLCA(root-&gt;left, p, q);
    if (p &gt; root-&gt;val && q &gt; root-&gt;val) return findLCA(root-&gt;right, p, q);
    return root;
}

int main() {
    // Cây: gốc 10, trái 5 (con 3,7), phải 15 (con 12,18)
    Node* root = newNode(10);
    root-&gt;left = newNode(5); root-&gt;left-&gt;left = newNode(3); root-&gt;left-&gt;right = newNode(7);
    root-&gt;right = newNode(15); root-&gt;right-&gt;left = newNode(12); root-&gt;right-&gt;right = newNode(18);

    cout &lt;&lt; findLCA(root, 3, 7)-&gt;val;   // in ra: 5
    return 0;
}</code></pre>

<div class="widget">
  <div class="widget-label">Tìm LCA(3, 7) trên cây gốc 10 (trái 5: con 3,7; phải 15: con 12,18)</div>
  <div id="d14LcaSvg" style="position:relative; width:100%; height:220px;"></div>
  <div class="caption" id="d14LcaCaption">Bấm "Bước tiếp theo" để bắt đầu.</div>
  <div class="controls">
    <button class="secondary" id="d14LcaPrev">← Lùi lại</button>
    <button id="d14LcaNext">Bước tiếp theo →</button>
    <button class="secondary" id="d14LcaReset">Chạy lại từ đầu</button>
  </div>
  <div class="step-info"><span id="d14LcaStepNum">0</span> / <span id="d14LcaStepTotal">0</span> bước</div>
</div>

<p>Với <strong>cây nhị phân thường</strong> (không phải BST): đệ quy tìm p, q ở 2 nhánh; nếu chúng ở 2 nhánh khác nhau, node hiện tại là LCA.</p>

<h3 id="auto-tong-on">Tổng ôn</h3>
<p>Nếu còn thời gian, bấm giờ làm lại 1 đề thi thử từ đầu không nhìn lời giải cũ. Đọc lại toàn bộ sổ tay lỗi 14 ngày qua.</p>

<h4 id="auto-luyen-tap">Luyện tập</h4>
<ol class="practice">
  <li>Code lại <code>isValidBST</code> không nhìn tài liệu.
    <div class="idea"><em>Ý tưởng:</em> đừng hỏi "node này có lớn hơn con trái, nhỏ hơn con phải không" (đó là bẫy!) — hãy hỏi "node này có nằm ĐÚNG TRONG KHOẢNG mà toàn bộ tổ tiên của nó cho phép không", và truyền khoảng đó xuống ngày càng hẹp dần qua mỗi lần đệ quy.</div>
  </li>
  <li>Tìm node đầu tiên (gần gốc nhất) gây mất cân bằng trong 1 cây tự nghĩ.
    <div class="idea"><em>Ý tưởng:</em> tính chiều cao từ LÁ lên GỐC (không phải từ gốc xuống) — node đầu tiên bạn phát hiện chênh lệch >1 trong quá trình tính từ dưới lên chính là node gần gốc nhất bị lỗi, vì hàm dừng ngay khi phát hiện.</div>
  </li>
  <li>Tìm giá trị lớn thứ 2 trong BST không duyệt toàn bộ cây.
    <div class="idea"><em>Ý tưởng:</em> giá trị lớn nhất luôn nằm ở "tận cùng bên phải" — vậy giá trị lớn THỨ HAI chỉ có thể là 1 trong 2 nơi: cha của node lớn nhất (nếu nó không có con trái), hoặc giá trị lớn nhất của nhánh trái của chính nó (nếu có).</div>
    <div class="hint"><em>Hướng dẫn:</em> đi mãi sang phải để tìm node lớn nhất, nhớ cha của nó. Nếu nó có con trái, đáp án là giá trị lớn nhất cây con trái đó; nếu không, đáp án là cha vừa nhớ.</div>
  </li>
</ol>

<h3 id="auto-cong-thuc-truy-hoi-qhd-bang-tra-nhanh-truoc-khi-th">Công thức truy hồi QHĐ — bảng tra nhanh trước khi thi</h3>
<table class="formula-table">
  <tr><th>Bài toán</th><th>dp[i] nghĩa là gì</th><th>Công thức</th></tr>
  <tr><td>Fibonacci / Bậc thang</td><td>Giá trị/số cách tại bước i</td><td><code>dp[i]=dp[i-1]+dp[i-2]</code></td></tr>
  <tr><td>Kadane</td><td>Tổng lớn nhất dãy liên tiếp kết thúc tại i</td><td><code>dp[i]=max(a[i], dp[i-1]+a[i])</code></td></tr>
  <tr><td>Coin Change</td><td>Số đồng ít nhất đổi số tiền i</td><td><code>dp[i]=min(dp[i-coin]+1)</code></td></tr>
  <tr><td>0/1 Knapsack</td><td>Giá trị lớn nhất, i vật đầu, ba lô j</td><td><code>max(dp[i-1][j], v[i]+dp[i-1][j-w[i]])</code></td></tr>
  <tr><td>Subset Sum = S</td><td>Chọn được tổng s từ i phần tử đầu?</td><td><code>dp[i-1][s]</code> OR <code>dp[i-1][s-a[i-1]]</code></td></tr>
  <tr><td>LCS</td><td>Độ dài LCS của X[0..i], Y[0..j]</td><td>khớp: +1 đường chéo; khác: max(trên, trái)</td></tr>
  <tr><td>LIS</td><td>Độ dài LIS kết thúc tại i</td><td><code>max(dp[j]+1), j&lt;i, a[j]&lt;a[i]</code></td></tr>
  <tr><td>C(n,k)</td><td>Giá trị tổ hợp</td><td><code>dp[i-1][j-1]+dp[i-1][j]</code></td></tr>
</table>


</section>
</template>

<script setup>
import { onMounted } from 'vue'
import { initBstNangCaoWidgets } from '../widgets/bst-nang-cao.js'

defineProps({ active: Boolean })

onMounted(() => {
  initBstNangCaoWidgets()
})
</script>
