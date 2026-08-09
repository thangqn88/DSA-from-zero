<template>
<section id="bst-nang-cao" class="day-section" data-sid="bst-nang-cao" v-show="active">

<h2>BST Nâng Cao — Kiểm Tra, Cân Bằng, LCA</h2>

<LessonGoal :sid="'bst-nang-cao'">
  <ul><li v-for="(g, i) in data.goal" :key="i">{{ g }}</li></ul>
</LessonGoal>

<LessonPart :sid="'bst-nang-cao'" part="ly-thuyet">

<h3 id="auto-bay-so-sanh-cuc-bo">Bẫy so sánh cục bộ — lỗi hay gặp nhất khi kiểm tra BST</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Bạn đã biết luật của BST: tại mọi node, toàn bộ cây con trái nhỏ hơn nó, toàn bộ cây con phải lớn hơn nó. Nhiều bạn khi kiểm tra một cây có phải BST hợp lệ hay không, chỉ làm đúng 1 việc: so sánh mỗi node với 2 con trực tiếp của nó. Cách này SAI, vì luật BST áp dụng cho toàn bộ cây con, không chỉ 2 con trực tiếp.</p>
<p><strong>Đây là gì?</strong> Xét cây: gốc 5, cây con phải là 8, và cây con phải của 8 lại có con trái là 4. So từng cặp cha-con trực tiếp thì đều đúng luật (5&lt;8, 8&gt;4), nhưng node 4 lại nằm ở nhánh phải của gốc 5, mà 4 &lt; 5 — vi phạm luật BST ở cấp tổ tiên xa hơn. Một node ở sâu bên trong cây vẫn có thể lớn hơn hoặc nhỏ hơn một tổ tiên không phải cha trực tiếp của nó, và cách so sánh cục bộ hoàn toàn bỏ lỡ trường hợp này.</p>
<p><strong>Vì sao quan trọng?</strong> Nếu bỏ sót bẫy này, hàm kiểm tra BST của bạn sẽ báo "hợp lệ" cho những cây thực chất sai luật — hỏng ngay ở bài toán nền tảng nhất của nhóm BST nâng cao.</p>
<p><strong>Làm sao dùng?</strong> Truyền xuống mỗi lời gọi đệ quy một khoảng giá trị hợp lệ (lo, hi), được thu hẹp dần theo đúng hướng đi: đi trái thì hi thu hẹp về giá trị node cha, đi phải thì lo thu hẹp về giá trị node cha. Một node chỉ hợp lệ khi nó nằm đúng trong khoảng do TOÀN BỘ tổ tiên của nó quy định, không chỉ so với cha trực tiếp.</p>

<h3 id="auto-cay-can-bang">Cây cân bằng — vì sao chiều cao mới là thứ quan trọng</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Hãy tưởng tượng một BST được chèn liên tiếp các số 1, 2, 3, 4, 5 theo đúng thứ tự tăng dần. Số nào cũng lớn hơn mọi số trước, nên số nào cũng phải rẽ phải — cây không hề phân nhánh, nó biến thành một chuỗi dài, hình dạng giống hệt một danh sách liên kết.</p>
<p><strong>Đây là gì?</strong> Một cây được gọi là cân bằng chiều cao khi tại mọi node, chênh lệch chiều cao giữa 2 cây con của nó không vượt quá 1. Cây cân bằng luôn có chiều cao ở mức O(log n) — với n lớn cỡ 1 triệu phần tử, chiều cao chỉ khoảng 20.</p>
<p><strong>Vì sao quan trọng?</strong> Mọi thao tác trên BST (tìm, chèn, xóa) đều tốn chi phí tỉ lệ với chiều cao cây, không phải số node. Cây cân bằng cho chi phí O(log n); cây lệch hẳn về một bên (như ví dụ trên) cho chi phí O(n) — mất hẳn lợi thế mà BST hứa hẹn.</p>
<p><strong>Làm sao dùng?</strong> Kiểm tra một cây có cân bằng hay không bằng cách tính chiều cao từ dưới lên (từ lá lên gốc) trong đúng 1 lần đệ quy, dừng sớm và báo hiệu bằng giá trị -1 ngay khi phát hiện một node bất kỳ mất cân bằng:</p>
<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

struct Node { int val; Node *left, *right; };

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
    Node* root = new Node{5,
        new Node{3, new Node{1, nullptr, nullptr}, new Node{4, nullptr, nullptr}},
        new Node{8, nullptr, new Node{9, nullptr, nullptr}}};
    cout &lt;&lt; (checkBalance(root) != -1);   // in ra: 1 (true, cây này cân bằng)
    return 0;
}</code></pre>

<h3 id="auto-lca-la-gi">LCA — tổ tiên chung gần nhất là gì?</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Hãy nghĩ tới sơ đồ gia phả của một dòng họ. 2 anh em họ xa vẫn có chung một ông/bà đâu đó ở các đời trước — người thân chung gần nhất chính là người ở đời gần họ nhất mà cả 2 đều có thể lần theo tổ tiên để tới được. LCA (Lowest Common Ancestor) trên cây nhị phân hỏi đúng câu đó: cho 2 node p và q, tổ tiên chung gần gốc... không, gần p và q nhất là node nào?</p>
<p><strong>Đây là gì?</strong> LCA(p, q) là node sâu nhất trong cây mà cả p và q đều là hậu duệ của nó (một node cũng được coi là hậu duệ của chính nó).</p>
<p><strong>Vì sao quan trọng?</strong> Đây là bài toán nền cho rất nhiều bài toán khác về quan hệ cha con, đường đi giữa 2 node trong cây (đường đi giữa p và q luôn đi qua đúng LCA của chúng).</p>
<p><strong>Làm sao dùng?</strong> Trên BST, tại mỗi node ta biết ngay p và q đang nằm cùng nhánh nào nhờ so sánh giá trị — không cần dò cả 2 nhánh như cây nhị phân thường. Cứ đi theo hướng chung của p và q (cả 2 nhỏ hơn thì sang trái, cả 2 lớn hơn thì sang phải); ngay khi chúng tách sang 2 phía khác nhau (hoặc một trong 2 trùng với node hiện tại), node đó chính là LCA.</p>

</LessonPart>

<LessonPart :sid="'bst-nang-cao'" part="vi-sao">

<h3 id="auto-noi-tiep-bai-bst-co-ban">Nối tiếp trực tiếp bài BST cơ bản</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Ở bài trước bạn đã học BST cho tìm kiếm O(chiều cao) thay vì O(n) như mảng thường. Nhóm bài này chỉ ra chính xác điều kiện để lời hứa đó thành sự thật: cây phải cân bằng. Nếu chèn dữ liệu theo thứ tự đã sắp sẵn — trường hợp hoàn toàn có thể xảy ra trong thực tế — BST thường tự suy biến thành một chuỗi dài, và mọi lợi thế O(log n) biến mất.</p>

<h3 id="auto-lca-nen-cho-quan-he-cha-con">LCA là nền cho các bài về quan hệ cha con trong cây</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Rất nhiều bài toán trên cây quy về việc tìm LCA: tính khoảng cách giữa 2 node (bằng độ sâu của chúng cộng lại trừ 2 lần độ sâu của LCA), tìm đường đi ngắn nhất giữa 2 node trong cây, kiểm tra một node có phải tổ tiên của node khác không (chính là kiểm tra LCA của chúng có phải là 1 trong 2 node đó). Hiểu chắc LCA giúp bạn giải được cả nhóm bài toán này mà không cần học thuộc từng bài riêng lẻ.</p>

<div class="realworld">
  <span class="rw-title">🌐 Ứng dụng thực tế</span>
  <dl>
    <dt>Dùng ở đâu</dt>
    <dd>Cấu trúc cây tự cân bằng như AVL Tree và Red-Black Tree đứng sau <code>std::map</code>/<code>std::set</code> trong C++, index B-Tree/B+Tree trong cơ sở dữ liệu (MySQL, PostgreSQL); LCA dùng trong hệ thống quản lý tổ chức phân cấp (tìm cấp quản lý chung gần nhất của 2 nhân viên), hệ thống file (tìm thư mục chung gần nhất của 2 đường dẫn), mạng máy tính (tìm router trung gian gần nhất trên đường truyền).</dd>
    <dt>Giải quyết vấn đề gì</dt>
    <dd>Giữ chi phí tìm kiếm/thêm/xóa luôn ở mức O(log n) bất kể thứ tự dữ liệu đưa vào; trả lời nhanh câu hỏi về quan hệ tổ tiên-hậu duệ trong cấu trúc cây.</dd>
    <dt class="good">Khi nào NÊN dùng</dt>
    <dd class="good">Thư viện thật hầu như không bao giờ dùng BST thường (không tự cân bằng) cho dữ liệu có thể chèn theo thứ tự bất lợi — luôn ưu tiên cây tự cân bằng khi cần đảm bảo hiệu năng ổn định.</dd>
    <dt class="bad">Khi nào KHÔNG NÊN dùng</dt>
    <dd class="bad">Nếu bạn biết chắc dữ liệu sẽ được chèn theo thứ tự ngẫu nhiên và không quan tâm trường hợp xấu nhất hiếm khi xảy ra, BST thường (đơn giản hơn để cài đặt) vẫn đủ dùng.</dd>
  </dl>
</div>

</LessonPart>

<LessonPart :sid="'bst-nang-cao'" part="quiz">
  <QuizBlock :questions="data.quiz" />
</LessonPart>

<LessonPart :sid="'bst-nang-cao'" part="vi-du">

<WorkedExample id="vd-kiem-tra-bst" title="Kiểm tra một cây có phải BST">
  <template #de-bai>
    <div class="problem-box">
    <span class="pb-title">📋 Đề bài</span>
    <p>Cho một cây nhị phân, kiểm tra xem nó có phải là một cây tìm kiếm nhị phân (BST) hợp lệ hay không — tức tại mọi node, toàn bộ cây con trái nhỏ hơn nó và toàn bộ cây con phải lớn hơn nó.</p>
    </div>
  </template>
  <template #y-tuong>
    <p>Mỗi node phải nằm trong một khoảng giá trị hợp lệ được kế thừa từ tổ tiên của nó, không chỉ so với cha trực tiếp. Đi trái thì cận trên (hi) thu hẹp về giá trị node cha; đi phải thì cận dưới (lo) thu hẹp về giá trị node cha.</p>
  </template>
  <template #thuat-toan>
    <ol>
      <li>Gọi đệ quy <code>isValidBST(root, lo, hi)</code>, ban đầu <code>lo = -∞</code>, <code>hi = +∞</code>.</li>
      <li>Cây rỗng luôn hợp lệ, trả về true.</li>
      <li>Node hiện tại phải thỏa <code>lo &lt; root-&gt;val &lt; hi</code>, nếu không thì cả cây không hợp lệ.</li>
      <li>Đệ quy nhánh trái với khoảng <code>(lo, root-&gt;val)</code>, đệ quy nhánh phải với khoảng <code>(root-&gt;val, hi)</code>.</li>
      <li>Cây hợp lệ khi và chỉ khi cả 2 nhánh con đều hợp lệ.</li>
    </ol>
  </template>
  <template #chay-tay>
    <p>Cây bẫy: gốc 5, con phải là 4 — so sánh cục bộ (chỉ nhìn cha-con trực tiếp) sẽ không phát hiện ra lỗi này vì đề bài chỉ có 1 cặp cha-con, còn cách truyền khoảng (lo, hi) phát hiện ra ngay:</p>
    <table class="formula-table">
      <tr><th>Node đang xét</th><th>Khoảng cho phép (lo, hi)</th><th>Kết quả</th></tr>
      <tr><td>5 (gốc)</td><td>(-∞, +∞)</td><td>5 nằm trong khoảng → hợp lệ, đi tiếp</td></tr>
      <tr><td>4 (con phải của 5)</td><td>(5, +∞) — vì đi phải nên cận dưới thu hẹp về 5</td><td>4 KHÔNG lớn hơn 5 → vi phạm khoảng → cây không hợp lệ</td></tr>
    </table>
    <p>Widget bên dưới minh họa đúng cây bẫy này — bấm "Bước tiếp theo" để xem khoảng (lo, hi) thu hẹp dần và phát hiện lỗi ở đâu.</p>
  </template>
  <template #code>
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
  </template>
  <template #toi-uu>
    <p>Cách thay thế không cần truyền khoảng (lo, hi): duyệt giữa (inorder) toàn cây và so mỗi giá trị với giá trị ngay trước nó (biến <code>prev</code>). Cây là BST hợp lệ khi và chỉ khi dãy thu được tăng nghiêm ngặt — tức mọi giá trị sau đều lớn hơn giá trị ngay trước nó.</p>
    <pre v-pre><code>bool ok = true;
long long prev = LLONG_MIN;
void inorderCheck(Node* r) {
    if (!r || !ok) return;
    inorderCheck(r-&gt;left);
    if (r-&gt;val &lt;= prev) ok = false;   // không tăng nghiêm ngặt → vi phạm
    prev = r-&gt;val;
    inorderCheck(r-&gt;right);
}</code></pre>
  </template>
</WorkedExample>

<p>Bấm "Bước tiếp theo" để xem khoảng (lo, hi) thu hẹp dần trên cây bẫy — gốc 5, con phải là 4:</p>

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

<WorkedExample id="vd-lca" title="Tổ tiên chung gần nhất (LCA)">
  <template #de-bai>
    <div class="problem-box">
    <span class="pb-title">📋 Đề bài</span>
    <p>Cho một cây nhị phân và 2 giá trị p, q có mặt trong cây. Tìm tổ tiên chung gần nhất (LCA) của p và q — node sâu nhất mà cả p và q đều là hậu duệ của nó.</p>
    </div>
  </template>
  <template #y-tuong>
    <p>LCA giống hệt việc đi ngược lên gia phả tới người thân chung gần nhất: nếu p và q còn đang ở cùng 1 nhánh (chung 1 "nhánh họ"), ta cứ đi sâu tiếp vào nhánh đó; ngay khi chúng tách ra 2 nhánh khác nhau, điểm tách đó chính là người thân chung gần nhất.</p>
  </template>
  <template #thuat-toan>
    <ol>
      <li><strong>Bản cho BST</strong> (dùng so sánh giá trị, chi phí O(chiều cao)): tại node hiện tại, nếu cả p và q đều nhỏ hơn giá trị node → đi trái; nếu cả 2 đều lớn hơn → đi phải; ngược lại (1 nhỏ 1 lớn, hoặc 1 trong 2 bằng node hiện tại) → chính node hiện tại là LCA.</li>
      <li><strong>Bản cho cây nhị phân thường</strong> (không có luật giá trị để dựa vào, phải đệ quy trả về node tìm được): đệ quy tìm p, q ở cả 2 nhánh con.</li>
      <li>Nếu node hiện tại chính là p hoặc q, trả về nó ngay.</li>
      <li>Nếu cả 2 nhánh con đều tìm thấy (mỗi nhánh trả về khác <code>nullptr</code>), node hiện tại là LCA.</li>
      <li>Nếu chỉ 1 nhánh tìm thấy, trả về kết quả của nhánh đó lên trên (LCA nằm sâu hơn, ở nhánh đó).</li>
    </ol>
  </template>
  <template #chay-tay>
    <p>Cây: gốc 10, nhánh trái là 5 (con 3, 7), nhánh phải là 15 (con 12, 18). Tìm LCA(3, 7) bằng bản cho BST:</p>
    <table class="formula-table">
      <tr><th>Node đang xét</th><th>So sánh</th><th>Quyết định</th></tr>
      <tr><td>10 (gốc)</td><td>3 &lt; 10 và 7 &lt; 10 — cả 2 đều nhỏ hơn</td><td>Đi trái, sang node 5</td></tr>
      <tr><td>5</td><td>3 &lt; 5 nhưng 7 &gt; 5 — tách sang 2 phía</td><td>Đây là điểm rẽ nhánh → LCA = 5</td></tr>
    </table>
    <p>Widget bên dưới minh họa đúng bước đi này trên cùng cây — bấm "Bước tiếp theo" để xem đường đi từ gốc tới LCA.</p>
  </template>
  <template #code>
<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

struct Node { int val; Node *left, *right; };

// Bản cho BST — dựa vào so sánh giá trị, O(chiều cao)
Node* findLCA_BST(Node* root, int p, int q) {
    if (!root) return nullptr;
    if (p &lt; root-&gt;val && q &lt; root-&gt;val) return findLCA_BST(root-&gt;left, p, q);
    if (p &gt; root-&gt;val && q &gt; root-&gt;val) return findLCA_BST(root-&gt;right, p, q);
    return root;
}

// Bản cho cây nhị phân thường — không dựa vào giá trị, đệ quy trả về node tìm được
Node* findLCA_Tree(Node* root, Node* p, Node* q) {
    if (!root || root == p || root == q) return root;
    Node* left = findLCA_Tree(root-&gt;left, p, q);
    Node* right = findLCA_Tree(root-&gt;right, p, q);
    if (left && right) return root;      // p, q ở 2 nhánh khác nhau → root là LCA
    return left ? left : right;          // chỉ 1 nhánh tìm thấy → trả kết quả nhánh đó lên
}

int main() {
    Node* root = new Node{10,
        new Node{5, new Node{3,nullptr,nullptr}, new Node{7,nullptr,nullptr}},
        new Node{15, new Node{12,nullptr,nullptr}, new Node{18,nullptr,nullptr}}};

    cout &lt;&lt; findLCA_BST(root, 3, 7)-&gt;val;   // in ra: 5
    return 0;
}</code></pre>
  </template>
  <template #toi-uu>
    <p>Nếu chỉ hỏi LCA đúng 1 lần, cách đệ quy ở trên đã đủ nhanh. Nhưng nếu phải trả lời rất nhiều truy vấn LCA trên cùng 1 cây (ví dụ hàng nghìn cặp (p, q) khác nhau), lặp lại đệ quy từ gốc mỗi lần sẽ chậm. Cách tối ưu là tiền xử lý 1 lần: tính trước độ sâu của mọi node, và một bảng "nhảy tổ tiên" (binary lifting) — <code>up[k][v]</code> lưu tổ tiên thứ 2^k của node v. Mỗi truy vấn LCA sau đó chỉ cần nhảy thẳng theo lũy thừa của 2 (giống tìm kiếm nhị phân trên chiều cao cây) để đưa 2 node về cùng độ sâu, rồi nhảy chung tới khi gặp nhau — chi phí mỗi truy vấn giảm xuống O(log n) thay vì phải đi lại từ gốc.</p>
  </template>
</WorkedExample>

<p>Bấm "Bước tiếp theo" để xem đường đi tìm LCA(3, 7) trên cây gốc 10 (trái 5: con 3, 7; phải 15: con 12, 18):</p>

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

</LessonPart>

<LessonPart :sid="'bst-nang-cao'" part="bai-tap">
  <PracticeSet :items="data.practice" />
</LessonPart>

<LessonPart :sid="'bst-nang-cao'" part="leetcode">
  <LeetCodeList :items="data.leetcode" />

  <h3 id="auto-luyen-tap-mo-rong">Luyện tập mở rộng (tự làm thêm để chắc tay)</h3>
  <ol class="practice">
    <li>Code lại <code>isValidBST</code> không nhìn tài liệu, dùng cả 2 cách (truyền khoảng lo/hi, và duyệt giữa so với giá trị trước đó) rồi so sánh kết quả trên cùng 1 cây.
      <div class="idea">Ý tưởng: đừng hỏi "node này có lớn hơn con trái, nhỏ hơn con phải không" (đó là bẫy) — hãy hỏi "node này có nằm đúng trong khoảng mà toàn bộ tổ tiên của nó cho phép không", và truyền khoảng đó xuống ngày càng hẹp dần qua mỗi lần đệ quy.</div>
    </li>
    <li>Tìm giá trị lớn thứ 2 trong BST mà không duyệt toàn bộ cây.
      <div class="idea">Ý tưởng: giá trị lớn nhất luôn nằm ở tận cùng bên phải — vậy giá trị lớn thứ 2 chỉ có thể là 1 trong 2 nơi: cha của node lớn nhất (nếu nó không có con trái), hoặc giá trị lớn nhất của nhánh trái của chính nó (nếu có).</div>
      <div class="hint">Hướng dẫn: đi mãi sang phải để tìm node lớn nhất, nhớ cha của nó. Nếu nó có con trái, đáp án là giá trị lớn nhất của cây con trái đó; nếu không, đáp án là cha vừa nhớ.</div>
    </li>
  </ol>

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
import data from '../data/lessons/bst-nang-cao.js'
import { initBstNangCaoWidgets } from '../widgets/bst-nang-cao.js'

defineProps({ active: Boolean })

onMounted(() => {
  initBstNangCaoWidgets()
})
</script>
