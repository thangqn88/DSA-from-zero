<template>
<section id="cay-nhi-phan-bst" class="day-section" data-sid="cay-nhi-phan-bst" v-show="active">

<h2>Cây Nhị Phân &amp; BST <span class="exam-tag">★ Đề ôn tập — Bài 7, 8 · Đề bổ sung — D05006, D05008, D05001</span></h2>

<LessonGoal :sid="'cay-nhi-phan-bst'">
  <ul><li v-for="(g, i) in data.goal" :key="i">{{ g }}</li></ul>
</LessonGoal>

<LessonPart :sid="'cay-nhi-phan-bst'" part="ly-thuyet">

<h3 id="auto-cay-nhi-phan-la-gi">Cây nhị phân là gì?</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Hãy nghĩ tới 1 sơ đồ gia phả: ông bà ở trên cùng (gốc), mỗi người có tối đa 2 con (con trái, con phải), mỗi con lại có tối đa 2 con riêng của nó, cứ thế xuống mãi. Người không có con nào cả gọi là lá — họ ở tầng cuối của gia phả.</p>
<p><strong>Đây là gì?</strong> Cây nhị phân là 1 cấu trúc gồm các node nối với nhau, mỗi node có tối đa 2 con: con trái và con phải. Node trên cùng gọi là gốc (root). Node không có con nào gọi là lá (leaf). Chiều cao của cây là số bước xa nhất từ gốc xuống 1 lá — cây chỉ có gốc thì cao 0, thêm 1 tầng con thì cao 1, và cứ thế tăng dần.</p>
<p><strong>Vì sao quan trọng?</strong> Rất nhiều cấu trúc dữ liệu và bài toán thực tế có hình dạng cây: cây thư mục trên máy tính, cây DOM của 1 trang web, cây quyết định, cây phân cấp tổ chức. Nắm chắc cách duyệt và xử lý cây nhị phân là nền cho toàn bộ nhóm bài này lẫn nhóm BST nâng cao sau đó.</p>
<p><strong>Làm sao dùng?</strong> Cài đặt bằng con trỏ, mỗi node giữ giá trị và 2 con trỏ tới con trái/con phải (<code>nullptr</code> nghĩa là không có con phía đó):</p>
<pre v-pre><code>struct Node {
    int val;
    Node *left, *right;
};</code></pre>

<h3 id="auto-3-phep-duyet-cay">3 phép duyệt cây</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Duyệt cây nghĩa là "thăm" từng node theo 1 thứ tự nhất định. Với cây nhị phân có đúng 3 cách duyệt kinh điển, khác nhau ở đúng 1 điểm: <strong>vị trí thăm gốc</strong> so với 2 nhánh con.</p>
<p><strong>NLR — tiền tự (preorder):</strong> thăm Gốc → Trái → Phải. <strong>LNR — trung tự (inorder):</strong> thăm Trái → Gốc → Phải — với BST, cách này luôn cho ra dãy TĂNG DẦN, đây là tính chất quan trọng nhất của BST. <strong>LRN — hậu tự (postorder):</strong> thăm Trái → Phải → Gốc.</p>

<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

struct Node { int val; Node *left, *right; };

void preorder(Node* r)  { if (!r) return; cout&lt;&lt;r-&gt;val&lt;&lt;" "; preorder(r-&gt;left);  preorder(r-&gt;right); }
void inorder(Node* r)   { if (!r) return; inorder(r-&gt;left);  cout&lt;&lt;r-&gt;val&lt;&lt;" "; inorder(r-&gt;right); }
void postorder(Node* r) { if (!r) return; postorder(r-&gt;left); postorder(r-&gt;right); cout&lt;&lt;r-&gt;val&lt;&lt;" "; }

int main() {
    // Dựng cây: gốc 5, trái 3 (con 1,4), phải 8 (con phải 9)
    Node* root = new Node{5,
        new Node{3, new Node{1, nullptr, nullptr}, new Node{4, nullptr, nullptr}},
        new Node{8, nullptr, new Node{9, nullptr, nullptr}}};

    preorder(root);  cout &lt;&lt; "\n";   // in ra: 5 3 1 4 8 9
    inorder(root);   cout &lt;&lt; "\n";   // in ra: 1 3 4 5 8 9
    postorder(root);                  // in ra: 1 4 3 9 8 5
    return 0;
}</code></pre>

<blockquote><p>Mẹo nhớ: chỉ cần nhớ vị trí chữ N (Gốc) nằm ở đâu trong tên gọi — đầu (NLR), giữa (LNR) hay cuối (LRN). Code của 3 hàm giống hệt nhau, chỉ đổi vị trí dòng <code>cout</code>.</p></blockquote>

<h3 id="auto-bst-luat-trai-nho-phai-lon">BST — luật "trái nhỏ, phải lớn"</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Cây tìm kiếm nhị phân (Binary Search Tree — BST) là 1 cây nhị phân có thêm đúng 1 luật: <strong>tại mọi node, toàn bộ cây con trái chứa giá trị nhỏ hơn nó, toàn bộ cây con phải chứa giá trị lớn hơn nó</strong> — giống hệt cách bạn tìm 1 từ trong từ điển: so giá trị đang tìm với từ đang mở, nhỏ hơn thì lùi về trước, lớn hơn thì tiến lên sau.</p>
<p><strong>Vì sao quan trọng?</strong> Chính luật này khiến duyệt giữa (LNR) trên BST luôn ra dãy tăng dần — không phải ngẫu nhiên, mà vì "thăm hết cây con trái (toàn giá trị nhỏ hơn gốc) → thăm gốc → thăm cây con phải (toàn giá trị lớn hơn gốc)" đúng là định nghĩa của 1 dãy sắp xếp tăng.</p>
<p><strong>Làm sao dùng?</strong> Chèn 1 giá trị mới vào BST chỉ cần đi theo đúng luật so sánh đó tới khi gặp chỗ trống:</p>
<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

struct Node { int val; Node *left, *right; };

Node* newNode(int v) {
    Node* n = new Node();
    n-&gt;val = v; n-&gt;left = n-&gt;right = nullptr;
    return n;
}

Node* insertBST(Node* root, int v) {
    if (!root) return newNode(v);
    if (v &lt; root-&gt;val) root-&gt;left = insertBST(root-&gt;left, v);
    else if (v &gt; root-&gt;val) root-&gt;right = insertBST(root-&gt;right, v);
    return root;
}

void inorder(Node* r) { if (!r) return; inorder(r-&gt;left); cout&lt;&lt;r-&gt;val&lt;&lt;" "; inorder(r-&gt;right); }

int main() {
    Node* root = nullptr;
    int values[] = {5, 3, 8, 1, 4, 9};
    for (int v : values) root = insertBST(root, v);
    inorder(root);   // in ra: 1 3 4 5 8 9 (đúng dãy tăng dần)
    return 0;
}</code></pre>

<h3 id="bai-cay-cha-con">★ Mới theo đề cương thầy: Dựng cây nhị phân từ các cặp node cha-con</h3>

<p class="idea-label">🗣️ Bước 0 — Khác gì với BST bạn vừa học?</p>
<p>Ở BST, cây được xây <strong>tự động</strong> theo quy tắc so sánh giá trị (nhỏ hơn → trái, lớn hơn → phải) — bạn không được chọn hình dạng cây. Ở dạng bài này, đề <strong>cho thẳng cấu trúc cây</strong> qua từng cặp (cha, con) — không có quy tắc so sánh giá trị nào cả, cây có thể chứa bất kỳ giá trị nào ở bất kỳ vị trí nào, hình dạng cây hoàn toàn do dữ liệu input quyết định, không phải do thuật toán chèn.</p>

<p class="idea-label">🗣️ Bước 1 — Vì sao không dùng con trỏ <code>Node*</code> như BST mà dùng mảng?</p>
<p>Vì input cho trực tiếp <strong>số hiệu node</strong> (ví dụ node 1, node 2...), cách tiện nhất là dùng luôn số hiệu đó làm <strong>chỉ số mảng</strong> — giống hệt cách <code>List[]</code> ở DFS/BFS dùng số hiệu đỉnh làm chỉ số. Ta dùng 2 mảng <code>leftChild[]</code>, <code>rightChild[]</code>: <code>leftChild[u]</code> lưu số hiệu con trái của node <code>u</code> (0 nếu không có).</p>

<p class="idea-label">🪜 Bước 2 — Quy tắc xác định con trái/phải khi đề chỉ cho "cặp cha-con"</p>
<p>Nếu đề <strong>không nói rõ</strong> đâu là con trái/phải, quy ước phổ biến nhất: <strong>con đầu tiên gặp của 1 node là con trái, con thứ hai là con phải</strong> (mỗi node tối đa 2 con vì đây là cây nhị phân). Một số đề sẽ cho rõ thêm 1 số 0/1 hoặc chữ "L"/"R" ngay trong dòng input — <strong>luôn đọc kỹ đề</strong> để biết quy tắc chính xác trước khi code, vì đây là chi tiết dễ đoán sai nhất ở dạng bài này.</p>

<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int leftChild[1005], rightChild[1005];
bool isRoot[1005];   // dùng để tìm ra node nào là gốc (không là con của ai)

void preorder(int u) {
    if (u == 0) return;
    cout &lt;&lt; u &lt;&lt; " ";
    preorder(leftChild[u]);
    preorder(rightChild[u]);
}
void inorder(int u) {
    if (u == 0) return;
    inorder(leftChild[u]);
    cout &lt;&lt; u &lt;&lt; " ";
    inorder(rightChild[u]);
}
void postorder(int u) {
    if (u == 0) return;
    postorder(leftChild[u]);
    postorder(rightChild[u]);
    cout &lt;&lt; u &lt;&lt; " ";
}

int main() {
    int n; cin &gt;&gt; n;              // n = số cặp cha-con (số cạnh, không phải số node)
    for (int i = 1; i &lt;= 1000; i++) isRoot[i] = true;
    for (int i = 0; i &lt; n; i++) {
        int parent, child;
        cin &gt;&gt; parent &gt;&gt; child;
        isRoot[child] = false;             // child không thể là gốc
        if (leftChild[parent] == 0) leftChild[parent] = child;   // con đầu tiên → trái
        else rightChild[parent] = child;                          // con thứ hai → phải
    }
    int root = 1;
    for (int i = 1; i &lt;= 1000; i++) if (isRoot[i] && (leftChild[i] || rightChild[i] || i==1)) { root = i; break; }

    preorder(root);  cout &lt;&lt; "\n";
    inorder(root);   cout &lt;&lt; "\n";
    postorder(root);
    return 0;
}</code></pre>

<p><strong>Chạy tay</strong>: 5 cặp cha-con <code>(1,2) (1,3) (2,4) (2,5) (3,6)</code>:</p>
<table class="formula-table">
  <tr><th>Cặp đọc vào</th><th>Việc làm</th></tr>
  <tr><td>(1,2)</td><td>Node 1 chưa có con trái → 2 là con trái của 1</td></tr>
  <tr><td>(1,3)</td><td>Node 1 đã có con trái (2) → 3 là con phải của 1</td></tr>
  <tr><td>(2,4)</td><td>Node 2 chưa có con trái → 4 là con trái của 2</td></tr>
  <tr><td>(2,5)</td><td>Node 2 đã có con trái (4) → 5 là con phải của 2</td></tr>
  <tr><td>(3,6)</td><td>Node 3 chưa có con trái → 6 là con trái của 3</td></tr>
</table>

<div class="widget">
  <div class="widget-label">Cây dựng từ (1,2)(1,3)(2,4)(2,5)(3,6) — gốc là 1 (không là con của ai)</div>
  <div style="font-family: monospace; text-align:center; line-height:1.9; margin:0.6rem 0; font-size:1.05rem;">
        1<br>
       / \<br>
      2   3<br>
     / \  /<br>
    4  5 6
  </div>
</div>
<p style="text-align:center; font-family:monospace;">Preorder: 1 2 4 5 3 6 &nbsp;|&nbsp; Inorder: 4 2 5 1 6 3 &nbsp;|&nbsp; Postorder: 4 5 2 6 3 1</p>

<blockquote><p>📎 <strong>Vì sao cần tìm gốc bằng "node nào không là con của ai"</strong>? Vì input chỉ cho các cặp cha-con, không nói thẳng "gốc là node nào" — nhưng gốc chắc chắn là node <strong>duy nhất không xuất hiện ở vị trí "con"</strong> trong toàn bộ danh sách cặp. Nếu đề của bạn nói rõ luôn gốc là node nào (ví dụ luôn là node 1), có thể bỏ qua bước dò tìm này.</p></blockquote>

<h3 id="auto-4-tinh-chat-hay-hoi">4 dạng đệ quy khác hay gặp trên cây</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Ngoài duyệt và chèn, đề bài còn hay hỏi các thao tác khác trên cây — tất cả đều đi theo đúng 1 khuôn: "nếu cây rỗng trả về giá trị cơ sở; nếu không, xử lý gốc rồi kết hợp kết quả đệ quy của 2 cây con".</p>
<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

struct Node { int val; Node *left, *right; };
Node* newNode(int v) { Node* n = new Node(); n-&gt;val=v; n-&gt;left=n-&gt;right=nullptr; return n; }

// Cây phản chiếu
Node* mirrorTree(Node* root) {
    if (!root) return nullptr;
    Node* l = mirrorTree(root-&gt;left);
    Node* r = mirrorTree(root-&gt;right);
    root-&gt;left = r; root-&gt;right = l;
    return root;
}

// Kiểm tra 2 cây giống hệt nhau
bool isIdentical(Node* a, Node* b) {
    if (!a && !b) return true;
    if (!a || !b) return false;
    return a-&gt;val==b-&gt;val && isIdentical(a-&gt;left,b-&gt;left) && isIdentical(a-&gt;right,b-&gt;right);
}

// Đếm số node lá
int countLeaves(Node* root) {
    if (!root) return 0;
    if (!root-&gt;left && !root-&gt;right) return 1;
    return countLeaves(root-&gt;left) + countLeaves(root-&gt;right);
}

// In mọi đường đi từ gốc tới lá
void printPaths(Node* root, vector&lt;int&gt;& path) {
    if (!root) return;
    path.push_back(root-&gt;val);
    if (!root-&gt;left && !root-&gt;right) {
        for (int v : path) cout &lt;&lt; v &lt;&lt; " ";
        cout &lt;&lt; "\n";
    } else {
        printPaths(root-&gt;left, path);
        printPaths(root-&gt;right, path);
    }
    path.pop_back();   // hoàn tác, giống ý tưởng quay lui
}

int main() {
    // Cây: gốc 5, trái 3 (con 1,4), phải 8 (con phải 9)
    Node* root = newNode(5);
    root-&gt;left = newNode(3); root-&gt;left-&gt;left = newNode(1); root-&gt;left-&gt;right = newNode(4);
    root-&gt;right = newNode(8); root-&gt;right-&gt;right = newNode(9);

    cout &lt;&lt; countLeaves(root) &lt;&lt; "\n";   // in ra: 3 (lá 1, 4, 9)
    vector&lt;int&gt; path;
    printPaths(root, path);                // in ra: "5 3 1", "5 3 4", "5 8 9"
    return 0;
}</code></pre>

<blockquote><p>🎯 Nhận ra khuôn chung: cả 4 hàm đi theo cấu trúc "nếu cây rỗng trả về giá trị cơ sở; nếu không, xử lý gốc rồi kết hợp kết quả đệ quy của 2 nhánh con". Đây là khuôn đệ quy tổng quát cho hầu hết bài toán trên cây, kể cả bài tính chiều cao và đếm lá ở phần bài tập.</p></blockquote>

</LessonPart>

<LessonPart :sid="'cay-nhi-phan-bst'" part="vi-sao">

<h3 id="auto-duyet-cay-la-dfs">Duyệt cây chính là DFS trên cấu trúc không có chu trình</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Ở bài DFS/BFS bạn đã học cách "đi càng sâu càng tốt trước khi lùi lại" trên đồ thị. 3 phép duyệt cây (NLR/LNR/LRN) chính là DFS áp dụng lên 1 dạng đồ thị đặc biệt: cây — không có chu trình, mỗi node có tối đa 2 "đỉnh kề" (con trái, con phải), và luôn xuất phát từ gốc. Khác biệt duy nhất là cây có <strong>thứ tự thăm gốc rõ ràng</strong> (trước/giữa/sau nhánh con), còn DFS tổng quát trên đồ thị chỉ quan tâm "đã thăm đỉnh này chưa".</p>
<p><strong>Vì sao quan trọng?</strong> Nhận ra mối liên hệ này giúp bạn không phải học lại từ đầu: mọi kỹ thuật DFS (đệ quy, khử đệ quy bằng ngăn xếp, đánh dấu đã thăm) đều áp dụng được lên cây, chỉ cần đổi "đỉnh kề" thành "con trái, con phải".</p>

<h3 id="auto-bst-o-log-n">BST cho tìm kiếm O(chiều cao) thay vì O(n)</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Tìm 1 giá trị trong mảng thường phải quét từng phần tử — O(n) trong trường hợp xấu nhất. Tìm giá trị đó trong BST, mỗi bước so sánh loại bỏ được hẳn 1 nửa cây con (nhánh còn lại chắc chắn không chứa giá trị cần tìm) — chi phí chỉ còn O(chiều cao). Với 1 cây cân bằng, chiều cao chỉ khoảng log₂(n), nên n lớn cỡ triệu phần tử vẫn tìm ra trong khoảng 20 bước so sánh.</p>

<div class="realworld">
  <span class="rw-title">🌐 Ứng dụng thực tế</span>
  <dl>
    <dt>Dùng ở đâu</dt>
    <dd>BST là nền tảng của index trong cơ sở dữ liệu (B-Tree/B+Tree trong MySQL, PostgreSQL); cấu trúc <code>std::map</code>/<code>std::set</code> trong C++ dùng Red-Black Tree (1 biến thể BST tự cân bằng); cây thư mục trên máy tính và cây DOM của trang web cũng là cấu trúc cây tương tự; thao tác Undo/Redo phân cấp trong phần mềm đồ họa.</dd>
    <dt>Giải quyết vấn đề gì</dt>
    <dd>Tìm kiếm, thêm, xóa dữ liệu có thứ tự với tốc độ O(log n) thay vì O(n) như mảng thường.</dd>
    <dt class="good">Khi nào NÊN dùng</dt>
    <dd class="good">Dữ liệu cần tìm kiếm/thêm/xóa thường xuyên, cần giữ thứ tự.</dd>
    <dt class="bad">Khi nào KHÔNG NÊN dùng</dt>
    <dd class="bad">Nếu dữ liệu chèn vào theo thứ tự đã sắp sẵn — BST thường (không tự cân bằng) suy biến thành danh sách liên kết, chậm còn O(n). Cần dùng AVL/Red-Black Tree để đảm bảo cân bằng (xem bài BST nâng cao).</dd>
  </dl>
</div>

</LessonPart>

<LessonPart :sid="'cay-nhi-phan-bst'" part="quiz">
  <QuizBlock :questions="data.quiz" />
</LessonPart>

<LessonPart :sid="'cay-nhi-phan-bst'" part="vi-du">

<WorkedExample id="vd-ba-phep-duyet" title="Ba phép duyệt cây nhị phân" :official="true">
  <template #de-bai>
    <div class="problem-box">
    <span class="pb-title">📋 Đề bài</span>
    <p>Cho cây nhị phân: gốc 5, con trái 3 (có con trái 1, con phải 4), con phải 8 (có con phải 9). Hãy viết cả 3 phép duyệt — tiền tự (NLR), trung tự (LNR), hậu tự (LRN) — và cho biết thứ tự thăm node của từng phép duyệt.</p>
    </div>
  </template>
  <template #y-tuong>
    <p>Cả 3 phép duyệt chạy trên cùng 1 cây, chỉ khác đúng 1 điểm: <strong>vị trí thăm gốc</strong> so với lúc đi vào nhánh trái và nhánh phải. Nhớ đúng vị trí chữ N (Node — gốc) trong tên gọi là suy ra được toàn bộ thuật toán.</p>
  </template>
  <template #thuat-toan>
    <ol>
      <li>NLR (tiền tự): in gốc → đệ quy nhánh trái → đệ quy nhánh phải.</li>
      <li>LNR (trung tự): đệ quy nhánh trái → in gốc → đệ quy nhánh phải.</li>
      <li>LRN (hậu tự): đệ quy nhánh trái → đệ quy nhánh phải → in gốc.</li>
      <li>Trường hợp cơ sở giống nhau ở cả 3 hàm: cây rỗng thì dừng ngay, không làm gì.</li>
    </ol>
  </template>
  <template #chay-tay>
    <p>Đúng cây trong đề (gốc 5, trái 3 (con 1,4), phải 8 (con phải 9)) — cùng 1 cây, chạy đủ 3 thứ tự duyệt:</p>
    <table class="formula-table">
      <tr><th>Phép duyệt</th><th>Trình tự thăm</th><th>Kết quả</th></tr>
      <tr><td>NLR (tiền tự)</td><td>5 → (3 → 1 → 4) → (8 → 9)</td><td>5 3 1 4 8 9</td></tr>
      <tr><td>LNR (trung tự)</td><td>(1 → 3 → 4) → 5 → (8 → 9)</td><td>1 3 4 5 8 9</td></tr>
      <tr><td>LRN (hậu tự)</td><td>(1 → 4 → 3) → (9 → 8) → 5</td><td>1 4 3 9 8 5</td></tr>
    </table>
    <p>Widget bên dưới minh họa từng bước thăm node cho cả 3 chế độ trên đúng cây này — bấm "Bước tiếp theo" để xem thứ tự tô màu.</p>
  </template>
  <template #code>
<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

struct Node { int val; Node *left, *right; };

void preorder(Node* r)  { if (!r) return; cout&lt;&lt;r-&gt;val&lt;&lt;" "; preorder(r-&gt;left);  preorder(r-&gt;right); }
void inorder(Node* r)   { if (!r) return; inorder(r-&gt;left);  cout&lt;&lt;r-&gt;val&lt;&lt;" "; inorder(r-&gt;right); }
void postorder(Node* r) { if (!r) return; postorder(r-&gt;left); postorder(r-&gt;right); cout&lt;&lt;r-&gt;val&lt;&lt;" "; }

int main() {
    Node* root = new Node{5,
        new Node{3, new Node{1, nullptr, nullptr}, new Node{4, nullptr, nullptr}},
        new Node{8, nullptr, new Node{9, nullptr, nullptr}}};

    preorder(root);  cout &lt;&lt; "\n";   // 5 3 1 4 8 9
    inorder(root);   cout &lt;&lt; "\n";   // 1 3 4 5 8 9
    postorder(root);                  // 1 4 3 9 8 5
    return 0;
}</code></pre>
  </template>
  <template #toi-uu>
    <p><strong>Khử đệ quy bằng ngăn xếp</strong> (liên hệ bài Ngăn xếp &amp; Hàng đợi): mọi lời gọi đệ quy đều có thể thay bằng 1 ngăn xếp tường minh — máy tính vốn cũng dùng ngăn xếp gọi hàm (call stack) để chạy đệ quy, ta chỉ đang tự quản lý ngăn xếp đó thay cho máy:</p>
    <pre v-pre><code>void preorderIterative(Node* root) {
    if (!root) return;
    stack&lt;Node*&gt; st;
    st.push(root);
    while (!st.empty()) {
        Node* cur = st.top(); st.pop();
        cout &lt;&lt; cur-&gt;val &lt;&lt; " ";
        if (cur-&gt;right) st.push(cur-&gt;right);   // đẩy phải trước
        if (cur-&gt;left)  st.push(cur-&gt;left);    // đẩy trái sau, để trái được lấy ra trước
    }
}</code></pre>
    <p><strong>Duyệt theo mức (level-order) bằng hàng đợi</strong>: đây là BFS áp dụng lên cây — thăm hết mức hiện tại rồi mới sang mức kế tiếp, dùng hàng đợi (queue) thay vì ngăn xếp:</p>
    <pre v-pre><code>void levelOrder(Node* root) {
    if (!root) return;
    queue&lt;Node*&gt; q;
    q.push(root);
    while (!q.empty()) {
        Node* cur = q.front(); q.pop();
        cout &lt;&lt; cur-&gt;val &lt;&lt; " ";
        if (cur-&gt;left)  q.push(cur-&gt;left);
        if (cur-&gt;right) q.push(cur-&gt;right);
    }
}
// Trên cây trong đề: in ra 5 3 8 1 4 9 (mức 0: 5; mức 1: 3,8; mức 2: 1,4,9)</code></pre>
  </template>
</WorkedExample>

<p>Chọn phép duyệt để xem thứ tự thăm node trên cùng 1 cây:</p>

<div class="widget">
  <div class="widget-label">Cây: gốc 5, trái 3 (con 1,4), phải 8 (con phải 9)</div>
  <div style="text-align:center; margin-bottom:0.8rem;">
    <button class="secondary" id="d13ModeNlr" style="background:var(--navy); color:white;">NLR</button>
    <button class="secondary" id="d13ModeLnr">LNR</button>
    <button class="secondary" id="d13ModeLrn">LRN</button>
  </div>
  <div id="d13TreeSvg" style="position:relative; width:100%; height:220px;"></div>
  <div class="caption" id="d13Caption">Bấm "Bước tiếp theo" để bắt đầu.</div>
  <div class="controls">
    <button class="secondary" id="d13Prev">← Lùi lại</button>
    <button id="d13Next">Bước tiếp theo →</button>
    <button class="secondary" id="d13Reset">Chạy lại từ đầu</button>
  </div>
  <div class="step-info"><span id="d13StepNum">0</span> / <span id="d13StepTotal">0</span> bước — thứ tự thăm: <span id="d13Order" style="font-family:monospace;"></span></div>
</div>

<WorkedExample id="vd-bst-chen-xoa" title="Dựng, chèn và xóa trên BST" :official="true">
  <template #de-bai>
    <div class="problem-box">
    <span class="pb-title">📋 Nguyên văn đề bài 7 — Xây BST rồi in Post Order</span>
    <p>Cho mảng a gồm có n phần tử, các phần tử được đánh số từ 1 đến n và khác nhau từng đôi một. Nhiệm vụ của bạn đó là hãy xây dựng một cây nhị phân tìm kiếm bằng cách chèn lần lượt các phần tử a₁, a₂, ..., aₙ. Sau khi xây cây thành công, bạn cần in ra kết quả của phép duyệt Post Order.</p>
    <p><strong>Input:</strong> Dòng đầu tiên chứa số nguyên dương n là độ dài mảng (1≤n≤10³). Dòng tiếp theo chứa n phần tử của mảng (1≤aᵢ≤10³).</p>
    <p><strong>Output:</strong> Với mỗi test, đưa ra kết quả của phép duyệt Post Order trên 1 dòng theo mẫu dưới đây.</p>
    <table class="formula-table"><tr><th>Input</th><th>Output</th></tr>
    <tr><td>3<br>5<br>3 1 4 2 5<br>8<br>1 6 2 3 8 5 7 4<br>7<br>4 7 2 5 3 6 1</td><td>Test #1: 2 1 5 4 3<br>Test #2: 4 5 3 2 7 8 6 1<br>Test #3: 1 3 6 2 5 7 4</td></tr></table>
    </div>
    <div class="problem-box">
    <span class="pb-title">📋 Nguyên văn đề bài 8 — BST đầy đủ: cài đặt, chèn, xây cây, duyệt, xóa (7 điểm)</span>
    <p>Giả sử ta có cây nhị phân tìm kiếm tree có khóa là một số nguyên.</p>
    <ol>
      <li>Cài đặt cây nhị phân tìm kiếm bằng con trỏ (1 điểm)</li>
      <li>Viết phép toán chèn 1 khóa x vào cây nhị phân tìm kiếm (1 điểm)</li>
      <li>Tạo cây nhị phân tìm kiếm bằng cách thêm dần n số nguyên vào cây (1 điểm) (1≤n≤10³)</li>
      <li>In cây theo thứ tự duyệt sau (1 điểm)</li>
      <li>Viết phép toán xóa một khóa x trên cây bằng phương pháp copy (2 điểm) (1≤x≤10³)</li>
      <li>In cây sau khi xóa theo thứ tự duyệt trước (1 điểm)</li>
    </ol>
    <p><strong>Input:</strong> Dòng đầu tiên chứa n (1≤n≤10³). Dòng 2 chứa n số nguyên (1≤aᵢ≤10³). Dòng 3 là số nguyên cần xóa trên cây.</p>
    <p><strong>Output:</strong> Dòng 1 là duyệt sau của cây tạo ở ý c. Dòng 2 là duyệt trước của cây sau khi xóa ở ý e.</p>
    <table class="formula-table"><tr><th>Input</th><th>Output</th></tr>
    <tr><td>5<br>4 2 1 6 3<br>1</td><td>1 3 2 6 4<br>4 2 3 6</td></tr></table>
    </div>
    <blockquote><p>⚠️ Bài 7 có nhiều bộ test (đọc số T ở đầu) và in kèm tiền tố "Test #i: "; Bài 8 chỉ có 1 bộ test, không có tiền tố, và có thêm yêu cầu xóa 1 khóa — đọc kỹ để không nhầm định dạng.</p></blockquote>
  </template>
  <template #y-tuong>
    <p>Luật "trái nhỏ, phải lớn" của BST dẫn đường cho cả 3 thao tác trong đề: <strong>xây cây</strong> chỉ là chèn lần lượt từng số theo đúng luật đó; <strong>duyệt</strong> là 1 trong 3 phép duyệt đã học; <strong>xóa</strong> khó hơn vì phải giữ đúng luật BST sau khi node biến mất — chọn đúng người thay thế mới không phá vỡ thứ tự của cây.</p>
  </template>
  <template #thuat-toan>
    <ol>
      <li><strong>Chèn:</strong> so sánh giá trị mới với node hiện tại, nhỏ hơn thì đi trái, lớn hơn thì đi phải, tới khi gặp chỗ trống (<code>nullptr</code>) thì tạo node mới ở đó.</li>
      <li><strong>Xóa node lá</strong> (không con): xóa thẳng, không cần thay ai.</li>
      <li><strong>Xóa node có 1 con:</strong> con duy nhất đó "lên thay" ngay vị trí node bị xóa.</li>
      <li><strong>Xóa node có 2 con:</strong> tìm inorder successor (giá trị nhỏ nhất bên nhánh phải), copy giá trị đó lên node cần xóa, rồi xóa bản gốc của successor ở vị trí cũ — vị trí cũ chắc chắn chỉ có tối đa 1 con nên việc xóa tiếp theo quay lại trường hợp (2) hoặc (3).</li>
    </ol>
  </template>
  <template #chay-tay>
    <p>Cây gốc dùng cho cả 3 trường hợp xóa: chèn lần lượt 4, 2, 1, 6, 3 vào BST rỗng.</p>
    <table class="formula-table">
      <tr><th>Chèn</th><th>Việc làm</th></tr>
      <tr><td>4</td><td>Cây rỗng → 4 làm gốc</td></tr>
      <tr><td>2</td><td>2 &lt; 4 → sang trái của 4</td></tr>
      <tr><td>1</td><td>1 &lt; 4 → trái (2); 1 &lt; 2 → trái của 2</td></tr>
      <tr><td>6</td><td>6 &gt; 4 → sang phải của 4</td></tr>
      <tr><td>3</td><td>3 &lt; 4 → trái (2); 3 &gt; 2 → phải của 2</td></tr>
    </table>
    <div class="widget">
      <div class="widget-label">Cây kết quả sau khi chèn 4, 2, 1, 6, 3</div>
      <div style="font-family: monospace; text-align:center; line-height:1.9; margin:0.6rem 0; font-size:1.05rem;">
            4<br>
           / \<br>
          2   6<br>
         / \<br>
        1   3
      </div>
    </div>
    <p style="text-align:center; font-family:monospace;">Post Order = <strong>1 3 2 6 4</strong> ✓ khớp dòng 1 của đề bài 8</p>

    <p><strong>Trường hợp 1 — xóa node lá:</strong> xóa x=1. Node 1 không có con nào → xóa thẳng.</p>
    <table class="formula-table">
      <tr><th>Bước</th><th>Việc làm</th></tr>
      <tr><td>Tìm node 1</td><td>1&lt;4 → trái (2); 1&lt;2 → trái (1) → tìm thấy</td></tr>
      <tr><td>Loại node</td><td>Không con trái, không con phải → lá → xóa thẳng</td></tr>
      <tr><td>Cây sau khi xóa</td><td>4 (trái: 2 (chỉ còn phải: 3), phải: 6)</td></tr>
    </table>
    <p style="text-align:center; font-family:monospace;">Preorder sau khi xóa = <strong>4 2 3 6</strong> ✓ khớp dòng 2 của đề bài 8</p>

    <p><strong>Trường hợp 2 — xóa node có 1 con:</strong> để thấy rõ trường hợp này, giả sử ta chèn thêm 7 vào bên phải của 6 (cây gốc trở thành 4 (trái 2 (con 1,3), phải 6 (chỉ có phải: 7))), rồi xóa x=6.</p>
    <table class="formula-table">
      <tr><th>Bước</th><th>Việc làm</th></tr>
      <tr><td>Tìm node 6</td><td>6&gt;4 → phải (6) → tìm thấy</td></tr>
      <tr><td>Loại node</td><td>Không có con trái, CÓ con phải (7) → 1 con → 7 lên thay thẳng vị trí 6</td></tr>
      <tr><td>Cây sau khi xóa</td><td>4 (trái: 2 (con 1,3), phải: 7)</td></tr>
    </table>

    <p><strong>Trường hợp 3 — xóa node có 2 con:</strong> trên cây gốc (chèn 4,2,1,6,3), xóa x=2 (có đủ 2 con: 1 và 3).</p>
    <table class="formula-table">
      <tr><th>Bước</th><th>Việc làm</th></tr>
      <tr><td>Tìm node 2</td><td>2&lt;4 → trái (2) → tìm thấy, có đủ 2 con (1, 3)</td></tr>
      <tr><td>Tìm successor</td><td>findMin ở nhánh phải của 2 (chỉ có node 3) → successor = 3</td></tr>
      <tr><td>Copy + xóa bản gốc</td><td>Copy giá trị 3 lên vị trí node 2; xóa node 3 ở vị trí cũ (nó là lá, quay về trường hợp 1)</td></tr>
      <tr><td>Cây sau khi xóa</td><td>4 (trái: 3 (chỉ còn trái: 1), phải: 6)</td></tr>
    </table>
    <p style="text-align:center; font-family:monospace;">Preorder sau khi xóa = <strong>4 3 1 6</strong></p>
  </template>
  <template #code>
<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

struct Node { int val; Node *left, *right; };

Node* newNode(int v) {
    Node* n = new Node();
    n-&gt;val = v; n-&gt;left = n-&gt;right = nullptr;
    return n;
}

Node* insertBST(Node* root, int v) {
    if (!root) return newNode(v);
    if (v &lt; root-&gt;val) root-&gt;left = insertBST(root-&gt;left, v);
    else if (v &gt; root-&gt;val) root-&gt;right = insertBST(root-&gt;right, v);
    return root;
}

void postorder(Node* r) { if (!r) return; postorder(r-&gt;left); postorder(r-&gt;right); cout&lt;&lt;r-&gt;val&lt;&lt;" "; }
void preorder(Node* r)  { if (!r) return; cout&lt;&lt;r-&gt;val&lt;&lt;" "; preorder(r-&gt;left); preorder(r-&gt;right); }

// Tìm giá trị nhỏ nhất trong 1 cây con (đi mãi sang trái)
int findMin(Node* r) { while (r-&gt;left) r = r-&gt;left; return r-&gt;val; }

// Xóa khóa x khỏi BST bằng phương pháp copy
Node* deleteNode(Node* root, int x) {
    if (!root) return root;                       // không tìm thấy x, không làm gì

    if (x &lt; root-&gt;val) root-&gt;left = deleteNode(root-&gt;left, x);
    else if (x &gt; root-&gt;val) root-&gt;right = deleteNode(root-&gt;right, x);
    else {
        // TÌM THẤY node cần xóa
        if (!root-&gt;left && !root-&gt;right) {         // Trường hợp 1: lá
            delete root;
            return nullptr;
        }
        if (!root-&gt;left) {                          // Trường hợp 2: chỉ có con phải
            Node* temp = root-&gt;right;
            delete root;
            return temp;
        }
        if (!root-&gt;right) {                         // Trường hợp 2: chỉ có con trái
            Node* temp = root-&gt;left;
            delete root;
            return temp;
        }
        // Trường hợp 3: có đủ 2 con — copy giá trị nhỏ nhất bên phải lên, rồi xóa nó ở chỗ cũ
        int successorVal = findMin(root-&gt;right);
        root-&gt;val = successorVal;                   // COPY giá trị lên node hiện tại
        root-&gt;right = deleteNode(root-&gt;right, successorVal);  // xóa bản gốc của successor
    }
    return root;
}

int main() {
    int n; cin &gt;&gt; n;
    Node* root = nullptr;
    for (int i = 0; i &lt; n; i++) { int v; cin &gt;&gt; v; root = insertBST(root, v); }

    postorder(root); cout &lt;&lt; "\n";     // Post Order của cây vừa xây (câu c của Bài 8)

    int x; cin &gt;&gt; x;
    root = deleteNode(root, x);
    preorder(root); cout &lt;&lt; "\n";       // Pre Order sau khi xóa x (câu f của Bài 8)
    return 0;
}</code></pre>
  </template>
  <template #toi-uu>
    <p><strong>Vì sao cây lệch làm chi phí về O(n).</strong> Chèn/xóa/tìm trên BST chỉ nhanh (O(chiều cao)) khi cây tương đối cân bằng. Nếu bạn chèn dữ liệu đã sắp sẵn theo thứ tự — ví dụ chèn liên tiếp 1, 2, 3, 4, 5 — mỗi số mới luôn lớn hơn mọi số trước, nên nó luôn rẽ phải, tạo ra 1 cây lệch hẳn về 1 bên, hình dạng giống 1 danh sách liên kết. Lúc đó chiều cao cây bằng đúng n, và mọi thao tác tìm/chèn/xóa tụt về O(n) — mất hẳn lợi thế của BST.</p>
    <p>Đây chính là lý do có các cấu trúc BST tự cân bằng như AVL Tree hay Red-Black Tree — chúng tự động xoay cây sau mỗi lần chèn/xóa để giữ chiều cao luôn ở mức O(log n), bất kể thứ tự dữ liệu đưa vào. Nội dung này sẽ học ở bài BST nâng cao.</p>
  </template>
</WorkedExample>

</LessonPart>

<LessonPart :sid="'cay-nhi-phan-bst'" part="bai-tap">
  <PracticeSet :items="data.practice" />
</LessonPart>

<LessonPart :sid="'cay-nhi-phan-bst'" part="leetcode">
  <LeetCodeList :items="data.leetcode" />

  <h3 id="cay-luyen-tap-mo-rong">Luyện tập mở rộng (tự làm thêm để chắc tay)</h3>
  <ol class="practice">
    <li>Chèn 10,5,15,3,7,12,18 vào BST; viết cả 3 kết quả duyệt và toàn bộ root-to-leaf paths.
      <div class="idea">Ý tưởng: mỗi số mới chỉ cần so sánh với gốc hiện tại để quyết định "rẽ trái hay rẽ phải", rồi lặp lại y hệt ở node con — đây chính là "tìm kiếm nhị phân" áp dụng lúc chèn.</div>
      <div class="hint">Hướng dẫn: gốc 10, trái 5 (con 3,7), phải 15 (con 12,18). LNR phải ra 3,5,7,10,12,15,18.</div>
    </li>
    <li>Vẽ tay cây sau khi chạy <code>mirrorTree()</code> trên cây ở widget "Ba phép duyệt" phía trên.
      <div class="idea">Ý tưởng: phản chiếu không chỉ đổi chỗ 2 con của gốc — nó phải áp dụng ở MỌI cấp, kể cả các cháu/chắt. Vẽ từ lá lên sẽ tránh bỏ sót cấp nào.</div>
    </li>
    <li>Viết hàm đếm tổng số node và hàm tìm giá trị lớn nhất trong BST.
      <div class="idea">Ý tưởng: đếm node dùng đúng khuôn đệ quy "1 (chính nó) + kết quả nhánh trái + kết quả nhánh phải" — giống hệt <code>countLeaves</code> nhưng không cần điều kiện "là lá". Tìm giá trị lớn nhất trong BST thì không cần đệ quy — chỉ cần tận dụng tính chất sắp xếp, đi thẳng một đường sang phải.</div>
    </li>
    <li>(Bài 7&amp;8 trong đề) Tự xây tay BST từ mảng {8, 3, 10, 1, 6, 14, 4, 7, 13}, viết Post Order, rồi xóa khóa 3 (có 2 con) và viết lại Pre Order sau khi xóa.
      <div class="idea">Ý tưởng: đây là trường hợp 3 (2 con) đầy đủ — trước khi xóa, tự xác định trước "ai sẽ là inorder successor của node 3" (tức giá trị nhỏ nhất bên nhánh phải của 3) rồi mới bắt đầu xóa, để không bị rối khi code chạy qua nhiều bước đệ quy.</div>
      <div class="hint">Hướng dẫn: cây ban đầu: gốc 8 (trái 3 (con 1, 6 (con 4,7)), phải 10 (con 14 (con trái 13))). Successor của 3 là 4 (nhỏ nhất bên phải của 3). Sau khi xóa: gốc 8 (trái 4 (con 1, 6 (chỉ còn phải 7)), phải 10...).</div>
    </li>
  </ol>

  <h3 id="cay-day-du-bst-postorder-muc">★ Bài chính thức trong Đề bổ sung — D05006 Cây đầy đủ, D05008 Preorder→Postorder, D05001 Duyệt mức</h3>

  <div class="problem-box">
  <span class="pb-title">📋 Nguyên văn đề bài D05006 — Cây nhị phân đầy đủ</span>
  <p>Cho cây nhị phân qua các bộ ba (cha, con, L/R). Kiểm tra cây có phải cây đầy đủ (full binary tree — mọi node trung gian đều có đủ 2 con) hay không.</p>
  <p><strong>Input:</strong> T. Mỗi test: N (số cạnh) rồi N bộ ba u v x (x='L' hoặc 'R').</p>
  <p><strong>Output:</strong> 1 nếu là cây đầy đủ, 0 nếu không, mỗi test 1 dòng.</p>
  <table class="formula-table"><tr><th>Input</th><th>Output</th></tr>
  <tr><td>2<br>4<br>1 2 L 1 3 R 2 4 L 2 5 R<br>3<br>1 2 L 1 3 R 2 4 L</td><td>1<br>0</td></tr></table>
  </div>

  <div class="problem-box">
  <span class="pb-title">📋 Nguyên văn đề bài D05008 — BST: Preorder → Postorder</span>
  <p>Cho mảng A[] là kết quả duyệt Preorder của một cây nhị phân tìm kiếm (BST). Đưa ra kết quả duyệt Postorder của cây đó.</p>
  <p><strong>Input:</strong> T. Mỗi test: N rồi N số A[i] (preorder).</p>
  <p><strong>Output:</strong> Postorder mỗi test, 1 dòng.</p>
  <table class="formula-table"><tr><th>Input</th><th>Output</th></tr>
  <tr><td>2<br>5<br>40 30 35 80 100<br>8<br>40 30 32 35 80 90 100 120</td><td>35 30 100 80 40<br>35 32 30 120 100 90 80 40</td></tr></table>
  </div>

  <div class="problem-box">
  <span class="pb-title">📋 Nguyên văn đề bài D05001 — Duyệt cây theo mức</span>
  <p>Cho cây nhị phân qua các bộ ba (cha, con, L/R). Duyệt cây theo Level-order (thăm theo từng mức, trái→phải).</p>
  <p><strong>Input:</strong> T. Mỗi test: N (số cạnh) rồi N bộ ba u v x.</p>
  <p><strong>Output:</strong> Kết quả duyệt level-order mỗi test, 1 dòng.</p>
  <table class="formula-table"><tr><th>Input</th><th>Output</th></tr>
  <tr><td>2<br>2<br>1 2 R 1 3 L<br>4<br>10 20 L 10 30 R 20 40 L 20 60 R</td><td>1 3 2<br>10 20 30 40 60</td></tr></table>
  </div>

  <p class="idea-label">🗣️ D05006 — Kiểm tra cây đầy đủ (full binary tree)</p>
  <p>"Đầy đủ" (full) khác "hoàn chỉnh" (complete) và "cân bằng" (balanced) — đừng nhầm 3 khái niệm. Full chỉ đòi hỏi đúng 1 điều: <strong>không node nào có đúng 1 con</strong> (0 con hoặc 2 con đều hợp lệ).</p>
  <pre v-pre><code>// CayDayDu.cpp
bool isFullTree(Node* root){
    if(!root) return true;                 // cây rỗng: coi như đầy đủ (trường hợp cơ sở)
    if(!root-&gt;left &amp;&amp; !root-&gt;right) return true;    // lá: 0 con, hợp lệ
    if(root-&gt;left &amp;&amp; root-&gt;right)                    // có ĐỦ 2 con
        return isFullTree(root-&gt;left) &amp;&amp; isFullTree(root-&gt;right);   // đệ quy kiểm tra tiếp
    return false;                           // rơi vào đây nghĩa là chỉ có ĐÚNG 1 con → vi phạm
}</code></pre>
  <p><strong>Chạy tay ví dụ 1</strong> (cạnh 1-2 L, 1-3 R, 2-4 L, 2-5 R): node 1 có đủ 2 con (2,3) ✓; node 2 có đủ 2 con (4,5) ✓; node 3,4,5 là lá ✓ → cây đầy đủ → in <strong>1</strong>. <strong>Ví dụ 2</strong> (cạnh 1-2 L, 1-3 R, 2-4 L): node 2 chỉ có con trái (4), KHÔNG có con phải → vi phạm → in <strong>0</strong>.</p>

  <p class="idea-label">🗣️ D05008 — Từ Preorder của BST suy ra Postorder</p>
  <p>Mẹo khi thi: <strong>không cần nghĩ thuật toán "chia mảng theo giá trị gốc"</strong> phức tạp — chỉ cần chèn lần lượt từng phần tử preorder vào 1 BST rỗng bằng insert bình thường, rồi duyệt Postorder. Vì phần tử đầu preorder luôn là gốc và các phần tử chèn theo đúng thứ tự này sẽ tự động rơi đúng vào nhánh trái/phải như cây gốc.</p>
  <pre v-pre><code>// CayTimKiem.cpp
void insert(Node*&amp; root, int x){
    if(root == NULL){ root = new Node(x); return; }
    if(root-&gt;data &gt; x) insert(root-&gt;left, x);
    if(root-&gt;data &lt; x) insert(root-&gt;right, x);
}
void postOrder(Node* root){
    if(root == NULL) return;
    postOrder(root-&gt;left);
    postOrder(root-&gt;right);
    cout &lt;&lt; root-&gt;data &lt;&lt; " ";
}
// main: đọc n số vào mảng a[], insert lần lượt a[1..n] vào root, rồi postOrder(root)</code></pre>
  <p><strong>Chạy tay ví dụ 1</strong> (preorder: 40 30 35 80 100): chèn 40 (gốc) → chèn 30 (30&lt;40, trái của 40) → chèn 35 (35&lt;40 đi trái tới 30, 35&gt;30 → phải của 30) → chèn 80 (80&gt;40, phải của 40) → chèn 100 (100&gt;40 đi phải tới 80, 100&gt;80 → phải của 80). Cây: 40(trái 30(phải 35), phải 80(phải 100)). Postorder = trái-phải-gốc = <strong>35 30 100 80 40</strong> — khớp đề.</p>

  <p class="idea-label">🗣️ D05001 — Duyệt mức (Level-order) từ cặp (cha, con, L/R) tường minh</p>
  <p>Khác với phần "dựng cây từ cặp cha-con" đã học ở trên (phải TỰ đoán con nào là trái/phải), bài này đề cho thẳng ký tự L/R trong input, nên việc dựng cây đơn giản hơn — chỉ cần map đúng ký tự vào đúng con trỏ:</p>
  <pre v-pre><code>// Duyettheomuc.cpp
struct Node{ int data; Node *left, *right; };

void insert(Node* root, int n1, int n2, char c){
    if(root == NULL) return;
    if(root-&gt;data == n1){                          // tìm thấy đúng node cha
        if(c == 'L') root-&gt;left = new Node(n2);
        else root-&gt;right = new Node(n2);
    } else {
        insert(root-&gt;left, n1, n2, c);              // chưa thấy, dò tiếp bên trái
        insert(root-&gt;right, n1, n2, c);             // và bên phải
    }
}
void levelOrder(Node* root){
    queue&lt;Node*&gt; Q; Q.push(root);
    while(!Q.empty()){
        Node* nd = Q.front(); Q.pop();
        cout &lt;&lt; nd-&gt;data &lt;&lt; " ";
        if(nd-&gt;left)  Q.push(nd-&gt;left);
        if(nd-&gt;right) Q.push(nd-&gt;right);
    }
}
// main: dòng dữ liệu ĐẦU TIÊN tạo root (vì root chưa tồn tại, insert() thường không tìm thấy được);
// các dòng SAU mới gọi insert(root, n1, n2, c) như bình thường</code></pre>
  <p><strong>Chạy tay ví dụ 1</strong> (cạnh: 1 2 R, 1 3 L): dòng đầu tạo root=1 với con phải=2 luôn (xử lý đặc biệt dòng đầu); dòng sau insert(1,3,'L') tìm thấy node 1, gán con trái=3. Cây: 1(trái 3, phải 2). Level-order (thăm gốc → mức 1 → mức 2, trái trước phải sau vì <code>left</code> được push trước <code>right</code>): <strong>1 3 2</strong> — khớp đề.</p>

  <blockquote><p>⚠️ Bẫy hay gặp nhất ở D05001: hàm <code>insert()</code> dò cha bằng đệ quy trên TOÀN CÂY mỗi lần — nếu <code>root == NULL</code> mà gọi thẳng <code>insert()</code> (chưa xử lý dòng đầu tiên riêng), chương trình sẽ không tạo được node nào vì không có node cha nào tồn tại để so khớp <code>n1</code>. Luôn tách dòng dữ liệu đầu tiên ra xử lý tạo root trước, y hệt cách <code>Duyettheomuc.cpp</code> và <code>CayDayDu.cpp</code> đều làm.</p></blockquote>

  <h4 id="auto-luyen-tap-2">Luyện tập thêm</h4>
  <ol class="practice">
    <li>Tự vẽ cây từ ví dụ 2 của D05001 (10 20 L, 10 30 R, 20 40 L, 20 60 R), tự chạy tay level-order trước khi đối chiếu — đáp án đúng là "10 20 30 40 60".
      <div class="idea">Ý tưởng: mức 0 chỉ có gốc; mức 1 là toàn bộ con của gốc theo đúng thứ tự trái→phải; mức 2 là toàn bộ con của các node ở mức 1, cũng duyệt trái→phải theo đúng thứ tự cha của chúng xuất hiện ở mức 1.</div>
    </li>
    <li>Với D05008, thử preorder {50, 30, 20, 40, 70, 60, 80} — tự chèn tay vào BST rỗng rồi viết ra Postorder.
      <div class="hint">Hướng dẫn: cây: 50(trái 30(trái 20, phải 40), phải 70(trái 60, phải 80)). Postorder: 20 40 30 60 80 70 50.</div>
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
import data from '../data/lessons/cay-nhi-phan-bst.js'
import { initCayNhiPhanBstWidgets } from '../widgets/cay-nhi-phan-bst.js'

defineProps({ active: Boolean })

onMounted(() => {
  initCayNhiPhanBstWidgets()
})
</script>
