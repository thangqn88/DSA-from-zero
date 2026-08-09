<template>
<section id="dsu" class="day-section" data-sid="dsu" v-show="active">

<h2>DSU — Disjoint Set Union</h2>

<LessonGoal :sid="'dsu'">
  <ul><li v-for="(g, i) in data.goal" :key="i">{{ g }}</li></ul>
</LessonGoal>

<LessonPart :sid="'dsu'" part="ly-thuyet">

<h3 id="auto-dsu-disjoint-set-union-ai-chung-nhom-voi-ai">DSU (Disjoint Set Union) — ai chung nhóm với ai?</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Mỗi người trong 1 sự kiện đeo 1 vòng tay màu — cùng nhóm đeo cùng màu, và mỗi nhóm có đúng 1 "nhóm trưởng" đại diện cho cả nhóm. 2 câu hỏi thường gặp: "2 người này có cùng nhóm không?" và "gộp 2 nhóm lại làm 1". DSU là cấu trúc dữ liệu trả lời nhanh đúng 2 câu hỏi đó, dù có hàng nghìn người và hàng nghìn lần hỏi/gộp.</p>

<p><strong>Đây là gì?</strong> DSU giữ 1 mảng <code>parent[]</code>: mỗi phần tử trỏ tới "cha" của nó, và người tự trỏ vào chính mình (<code>parent[x] == x</code>) là nhóm trưởng — đại diện của cả nhóm. <code>find(x)</code> nghĩa là "hỏi lên trên cho tới khi gặp nhóm trưởng": đi theo <code>parent[x]</code>, rồi <code>parent[parent[x]]</code>, ... cho tới khi gặp 1 người tự làm cha của chính mình. <code>union(a, b)</code> nghĩa là "cho nhóm trưởng của a trỏ vào nhóm trưởng của b": tìm 2 đại diện bằng <code>find</code>, rồi nối đại diện này vào đại diện kia — 2 nhóm rời rạc trở thành 1 nhóm duy nhất.</p>

<p><strong>Vì sao quan trọng?</strong> Nếu union tùy tiện (không quan tâm nhóm nào đang lớn hơn), cây đại diện có thể "cao" dần lên tới O(n) trong trường hợp xấu nhất — mỗi lần find phải đi ngược rất nhiều bước, y hệt bạn phải hỏi qua rất nhiều cấp trung gian mới ra được người đứng đầu. DSU chỉ thật sự nhanh khi có thêm 2 tối ưu sau, và cả 2 đều dựa trên đúng 1 hình ảnh: <strong>kéo mọi người trỏ thẳng lên nhóm trưởng</strong>, càng ít cấp trung gian càng tốt.</p>

<table class="formula-table">
  <tr><th>Tối ưu</th><th>Làm gì</th><th>Hình ảnh</th></tr>
  <tr><td><strong>Nén đường</strong> (path compression)</td><td>Ngay trong lúc find(x) đi ngược lên gốc, gắn thẳng luôn mọi người vừa đi qua trỏ trực tiếp vào gốc đó</td><td>Đi hỏi 1 lần rồi "báo lại" cho tất cả người quen dọc đường: "nhóm trưởng thật sự là người này, đừng hỏi vòng nữa"</td></tr>
  <tr><td><strong>Gộp theo kích thước/hạng</strong> (union by size/rank)</td><td>Khi union, luôn gắn nhóm NHỎ hơn vào nhóm LỚN hơn, không bao giờ làm ngược lại</td><td>Nhóm ít người tự nguyện nhập vào nhóm đông người, không bắt nhóm đông phải đổi trưởng theo nhóm ít</td></tr>
</table>

<p><strong>Làm sao dùng?</strong> Kết hợp cả 2 tối ưu, mỗi lần find/union chỉ tốn gần O(1) trong thực tế (chính xác hơn là O(log n) khấu trừ, gần như hằng số). Trong bài này ta gọi 2 mảng đó là <code>parent[]</code> và <code>size[]</code> — ý nghĩa giống hệt <code>p(x)</code> (đại diện) và <code>num(x)</code> (kích thước nhóm) nếu bạn gặp cách đặt tên này trong slide/tài liệu khác.</p>

<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int parent[100], sz[100];

void makeSet(int n) {
    for (int i = 0; i &lt; n; i++) { parent[i] = i; sz[i] = 1; }   // num(x) = 1
}

int findSet(int x) {
    if (parent[x] == x) return x;
    return parent[x] = findSet(parent[x]);   // nén đường (path compression)
}

void unionSet(int x, int y) {
    int rx = findSet(x), ry = findSet(y);
    if (rx == ry) return;                     // đã cùng nhóm, không làm gì
    if (sz[rx] &gt; sz[ry]) {                    // gắn nhóm nhỏ vào nhóm lớn
        parent[ry] = rx;
        sz[rx] += sz[ry];
    } else {
        parent[rx] = ry;
        sz[ry] += sz[rx];
    }
}

int main() {
    makeSet(5);
    unionSet(0, 1);
    unionSet(2, 3);
    unionSet(1, 3);
    cout &lt;&lt; (findSet(0) == findSet(2));   // in ra: 1 (true, 0 và 2 cùng nhóm)
    return 0;
}</code></pre>

<blockquote><p><strong>Path compression</strong> (nén đường): mỗi lần <code>findSet</code>, ta gắn thẳng mọi node trên đường đi về gốc, khiến lần gọi sau gần như O(1).</p></blockquote>

</LessonPart>

<LessonPart :sid="'dsu'" part="vi-sao">

<h3 id="auto-dsu-vs-dfs">DSU so với DFS — khi nào chọn cái nào?</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Bài trước bạn đã học DFS/BFS để trả lời "đồ thị có liên thông không". DSU trả lời đúng câu hỏi đó, nhưng theo 1 cách khác hẳn: DFS cần đồ thị đã <strong>cố định</strong> toàn bộ cạnh trước khi chạy, còn DSU trả lời được ngay cả khi <strong>cạnh được thêm dần theo thời gian</strong> — mỗi lần thêm 1 cạnh mới, chỉ cần union 1 lần, không phải chạy lại DFS từ đầu trên toàn bộ đồ thị.</p>

<table class="formula-table">
  <tr><th></th><th>DFS/BFS</th><th>DSU</th></tr>
  <tr><td>Đồ thị</td><td>Phải cố định trước khi duyệt</td><td>Xây dần, thêm cạnh lúc nào cũng được</td></tr>
  <tr><td>Trả lời "2 đỉnh có liên thông không"</td><td>Phải duyệt lại từ đầu mỗi lần hỏi (nếu đồ thị vừa đổi)</td><td>2 lần find() và so sánh, không cần duyệt lại gì cả</td></tr>
  <tr><td>Biết đường đi cụ thể giữa 2 đỉnh</td><td>Có (theo dấu vết duyệt)</td><td>Không — DSU chỉ biết "cùng nhóm hay không", không biết đường đi</td></tr>
  <tr><td>Xóa cạnh / tách nhóm</td><td>Duyệt lại là ra ngay</td><td>Không hỗ trợ tốt — DSU chỉ gộp thêm, không tách được</td></tr>
</table>

<div class="realworld">
  <span class="rw-title">🌐 Ứng dụng thực tế</span>
  <dl>
    <dt>Dùng ở đâu</dt>
    <dd>Gợi ý bạn bè trên mạng xã hội (2 người có chung 1 nhóm bạn không); gom cụm động (game kiểm tra 2 vùng đất có nối liền không, hệ thống phân loại/gộp nhóm); thuật toán Kruskal tìm cây khung nhỏ nhất (mỗi lần xét 1 cạnh theo trọng số tăng dần, union nếu 2 đầu chưa cùng nhóm).</dd>
    <dt>Giải quyết vấn đề gì</dt>
    <dd>Trả lời nhanh 2 câu hỏi: "2 phần tử có cùng nhóm không?" và "gộp 2 nhóm lại làm 1", với hàng nghìn/triệu phần tử và hàng nghìn/triệu lần hỏi/gộp.</dd>
    <dt class="good">Khi nào NÊN dùng</dt>
    <dd class="good">Cần kiểm tra liên thông động (đồ thị thay đổi dần theo thời gian, thêm cạnh liên tục); không cần biết đường đi cụ thể, chỉ cần biết "có nối được không".</dd>
    <dt class="bad">Khi nào KHÔNG NÊN dùng</dt>
    <dd class="bad">Cần xóa cạnh (DSU không hỗ trợ tốt việc tách nhóm); cần biết đường đi cụ thể giữa 2 đỉnh, không chỉ biết chúng có liên thông hay không — lúc đó vẫn phải dùng DFS/BFS.</dd>
  </dl>
</div>

</LessonPart>

<LessonPart :sid="'dsu'" part="quiz">
  <QuizBlock :questions="data.quiz" />
</LessonPart>

<LessonPart :sid="'dsu'" part="vi-du">

<WorkedExample id="vd-dsu-lien-thong" title="Đếm số nhóm khi thêm dần các liên kết">
  <template #de-bai>
    <div class="problem-box">
    <span class="pb-title">📋 Đề bài</span>
    <p>Có n người, đánh số 0..n-1, ban đầu ai cũng đứng riêng 1 nhóm. Cho m cặp liên kết (u, v) lần lượt xuất hiện theo thời gian, mỗi cặp nghĩa là "gộp nhóm chứa u và nhóm chứa v lại làm 1". Sau khi xử lý hết m liên kết, hỏi còn lại bao nhiêu nhóm.</p>
    <p><strong>Input:</strong> n, m rồi m cặp (u, v).</p>
    <p><strong>Output:</strong> Số nhóm còn lại sau khi xử lý hết.</p>
    <table class="formula-table"><tr><th>Input</th><th>Output</th></tr>
    <tr><td>5 3<br>0 1<br>2 3<br>1 3</td><td>2</td></tr></table>
    </div>
  </template>

  <template #y-tuong>
    <p>Ban đầu có đúng n nhóm (mỗi người 1 nhóm riêng). Mỗi lần union(u, v) mà u và v <strong>chưa cùng nhóm</strong>, 2 nhóm nhập lại thành 1 — số nhóm giảm đúng 1. Nếu u và v <strong>đã cùng nhóm</strong> từ trước (union không làm gì), số nhóm không đổi. Vậy chỉ cần bắt đầu từ n nhóm, mỗi lần union thành công (2 đại diện khác nhau trước khi gộp) thì trừ đi 1.</p>
  </template>

  <template #thuat-toan>
    <ol>
      <li>makeSet(n): mỗi người tự là 1 nhóm, đặt soNhom = n.</li>
      <li>Với mỗi cặp (u, v) theo đúng thứ tự đề cho: tính rx = find(u), ry = find(v).</li>
      <li>Nếu rx != ry: union chúng lại (gắn nhóm nhỏ vào nhóm lớn), giảm soNhom đi 1.</li>
      <li>Nếu rx == ry: bỏ qua, không làm gì (2 người này đã cùng nhóm).</li>
      <li>Sau khi xử lý hết m cặp, in soNhom.</li>
    </ol>
  </template>

  <template #chay-tay>
    <p>Đúng ví dụ trong đề: n=5 (5 nhóm ban đầu: {0},{1},{2},{3},{4}), liên kết theo thứ tự (0,1), (2,3), (1,3):</p>
    <table class="formula-table">
      <tr><th>Bước</th><th>parent[] (0..4)</th><th>soNhom</th><th>Giải thích</th></tr>
      <tr><td>makeSet(5)</td><td>[0,1,2,3,4]</td><td>5</td><td>Mỗi người tự là 1 nhóm</td></tr>
      <tr><td>union(0,1)</td><td>[1,1,2,3,4]</td><td>4</td><td>find(0)=0, find(1)=1, khác nhau → gộp, 0 trỏ vào 1</td></tr>
      <tr><td>union(2,3)</td><td>[1,1,3,3,4]</td><td>3</td><td>find(2)=2, find(3)=3, khác nhau → gộp, 2 trỏ vào 3</td></tr>
      <tr><td>union(1,3)</td><td>[1,3,3,3,4]</td><td>2</td><td>find(1)=1, find(3)=3, khác nhau → gộp, 1 trỏ vào 3</td></tr>
    </table>
    <p>Kết quả: <strong>2</strong> nhóm còn lại ({0,1,2,3} và {4}) — khớp đề. Đây đúng là 4 sự kiện mà widget bên dưới minh họa (Make-Set rồi 3 lần Union), chỉ khác đúng 1 việc: widget tô màu để bạn NHÌN ra nhóm, còn ở đây ta ĐẾM số nhóm bằng biến soNhom.</p>
  </template>

  <template #code>
<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int parent[100005], sz[100005];

void makeSet(int n) {
    for (int i = 0; i &lt; n; i++) { parent[i] = i; sz[i] = 1; }
}
int findSet(int x) {
    if (parent[x] == x) return x;
    return parent[x] = findSet(parent[x]);   // nén đường
}
bool unionSet(int x, int y) {
    int rx = findSet(x), ry = findSet(y);
    if (rx == ry) return false;             // đã cùng nhóm, không gộp
    if (sz[rx] &lt; sz[ry]) swap(rx, ry);       // luôn gộp nhóm nhỏ vào nhóm lớn
    parent[ry] = rx;
    sz[rx] += sz[ry];
    return true;                            // gộp thành công
}

int main() {
    int n, m; cin &gt;&gt; n &gt;&gt; m;
    makeSet(n);
    int soNhom = n;
    for (int i = 0; i &lt; m; i++) {
        int u, v; cin &gt;&gt; u &gt;&gt; v;
        if (unionSet(u, v)) soNhom--;        // gộp thành công mới giảm số nhóm
    }
    cout &lt;&lt; soNhom;
    return 0;
}</code></pre>
  </template>

  <template #toi-uu>
    <p><strong>Nén đường rút chi phí về gần O(1).</strong> Không nén đường, nếu union luôn theo 1 chiều cố định (không so kích thước), cây đại diện có thể trở thành 1 chuỗi dài — find(x) trên đỉnh cuối chuỗi tốn O(n). Có nén đường (dòng <code>parent[x] = findSet(parent[x])</code>), mỗi lần find đi qua 1 đỉnh là đỉnh đó được gắn thẳng vào gốc luôn, nên những lần find sau trên đúng các đỉnh đó chỉ tốn O(1). Kết hợp thêm gộp theo kích thước, độ phức tạp mỗi lần find/union giảm xuống gần O(1) trong thực tế (chính xác là O(log n) khấu trừ).</p>
  </template>
</WorkedExample>

<div class="widget">
  <div class="widget-label">Make-Set(5) → Union(0,1) → Union(2,3) → Union(1,3)</div>
  <div id="d11DsuView" style="display:flex; justify-content:center; gap: 10px; margin: 1rem 0;"></div>
  <div class="caption" id="d11DsuCaption">Bấm "Bước tiếp theo" để bắt đầu.</div>
  <div class="controls">
    <button class="secondary" id="d11DsuPrev">← Lùi lại</button>
    <button id="d11DsuNext">Bước tiếp theo →</button>
    <button class="secondary" id="d11DsuReset">Chạy lại từ đầu</button>
  </div>
  <div class="step-info"><span id="d11DsuStepNum">0</span> / <span id="d11DsuStepTotal">0</span> bước</div>
</div>

<WorkedExample id="vd-dsu-chu-trinh" title="Phát hiện chu trình trong đồ thị vô hướng">
  <template #de-bai>
    <div class="problem-box">
    <span class="pb-title">📋 Đề bài</span>
    <p>Cho đồ thị vô hướng G=&lt;V, E&gt; được biểu diễn dưới dạng danh sách cạnh. Hãy kiểm tra xem đồ thị có tồn tại chu trình hay không.</p>
    <p><strong>Input:</strong> T. Mỗi test: |V|, |E| rồi các cặp u v.</p>
    <p><strong>Output:</strong> "YES"/"NO" mỗi test.</p>
    <table class="formula-table"><tr><th>Input</th><th>Output</th></tr>
    <tr><td>1<br>6 9<br>1 2 1 3 2 3 2 5 3 4 3 5 4 5 4 6 5 6</td><td>YES</td></tr></table>
    </div>
  </template>

  <template #y-tuong>
    <p>Xét từng cạnh (u, v) lần lượt theo đúng thứ tự đề cho, trước khi gộp chúng vào cùng 1 nhóm, hỏi: "u và v đã cùng đại diện chưa?". Nếu <strong>đã cùng đại diện</strong>, nghĩa là giữa u và v đã có sẵn ít nhất 1 đường đi khác (đi qua các cạnh đã xét trước đó) — thêm cạnh (u,v) trực tiếp tạo ra đường đi thứ 2, tức là 1 chu trình. Nếu <strong>khác đại diện</strong>, cạnh này chỉ nối 2 nhóm rời nhau, không tạo chu trình — cứ union bình thường rồi xét cạnh tiếp.</p>
  </template>

  <template #thuat-toan>
    <ol>
      <li>makeSet(|V|).</li>
      <li>Với mỗi cạnh (u, v): tính rx = find(u), ry = find(v).</li>
      <li>Nếu rx == ry: đồ thị có chu trình → in "YES", dừng luôn không cần xét cạnh còn lại.</li>
      <li>Nếu rx != ry: union chúng lại, chuyển sang cạnh tiếp theo.</li>
      <li>Nếu xét hết mọi cạnh mà không phát hiện chu trình nào: in "NO".</li>
    </ol>
  </template>

  <template #chay-tay>
    <p>Rút gọn ví dụ (đủ để thấy cách phát hiện, không cần chạy hết 9 cạnh): 4 đỉnh {1,2,3,4}, cạnh theo thứ tự (1,2), (2,3), (1,3):</p>
    <table class="formula-table">
      <tr><th>Cạnh đang xét</th><th>find(u), find(v)</th><th>Kết luận</th></tr>
      <tr><td>(1,2)</td><td>find(1)=1, find(2)=2 — khác nhau</td><td>Không chu trình → union(1,2)</td></tr>
      <tr><td>(2,3)</td><td>find(2)=1 (sau union), find(3)=3 — khác nhau</td><td>Không chu trình → union(2,3), giờ {1,2,3} cùng nhóm</td></tr>
      <tr><td>(1,3)</td><td>find(1)=find(3) — CÙNG 1 đại diện</td><td>Có chu trình → in "YES", dừng</td></tr>
    </table>
    <p>Đúng vậy: 1→2→3→1 là 1 chu trình có thật. Với đồ thị đầy đủ trong đề (6 đỉnh, 9 cạnh), quá trình lặp lại tương tự và sớm gặp 1 cạnh khiến 2 đầu mút đã cùng đại diện → kết quả <strong>"YES"</strong>, khớp đề.</p>
  </template>

  <template #code>
<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int parent[100005], sz[100005];

void makeSet(int n) {
    for (int i = 1; i &lt;= n; i++) { parent[i] = i; sz[i] = 1; }
}
int findSet(int x) {
    if (parent[x] == x) return x;
    return parent[x] = findSet(parent[x]);
}
void unionSet(int x, int y) {
    int rx = findSet(x), ry = findSet(y);
    if (sz[rx] &lt; sz[ry]) swap(rx, ry);
    parent[ry] = rx;
    sz[rx] += sz[ry];
}

int main() {
    int t; cin &gt;&gt; t;
    while (t--) {
        int n, m; cin &gt;&gt; n &gt;&gt; m;
        makeSet(n);
        bool coChuTrinh = false;
        for (int i = 0; i &lt; m; i++) {
            int u, v; cin &gt;&gt; u &gt;&gt; v;
            int rx = findSet(u), ry = findSet(v);
            if (rx == ry) coChuTrinh = true;   // 2 đầu mút đã cùng đại diện → chu trình
            else unionSet(u, v);
        }
        cout &lt;&lt; (coChuTrinh ? "YES" : "NO") &lt;&lt; "\n";
    }
    return 0;
}</code></pre>
  </template>

  <template #toi-uu>
    <p><strong>So với cách dùng DFS.</strong> Cách quen thuộc để phát hiện chu trình trong đồ thị vô hướng bằng DFS là: gặp lại 1 đỉnh đã thăm mà KHÔNG PHẢI cha trực tiếp của đỉnh hiện tại → có chu trình. Cách này đúng và hiệu quả tương đương O(n+m), nhưng đòi hỏi đồ thị đã <strong>cố định toàn bộ cạnh</strong> trước khi duyệt, và phải cẩn thận truyền đúng "đỉnh cha" qua từng lời gọi đệ quy để không tưởng nhầm việc đi ngược lại cha là 1 chu trình.</p>
    <p>DSU tiện hơn khi các cạnh <strong>xuất hiện dần theo thời gian</strong> (ví dụ: "sau khi thêm cạnh thứ k, đồ thị đã có chu trình chưa?") — mỗi cạnh mới chỉ cần 2 lần find, không phải chạy lại DFS từ đầu trên toàn bộ đồ thị mỗi lần có cạnh mới. Ngược lại, nếu đồ thị đã cố định sẵn và chỉ cần hỏi 1 lần duy nhất "có chu trình không", DFS và DSU nhanh như nhau — chọn cách nào quen tay hơn.</p>
  </template>
</WorkedExample>

<blockquote><p>💡 Cả 2 ví dụ trên dùng chung đúng 3 hàm không đổi: <strong>makeSet / findSet / unionSet</strong>. Phần khác nhau giữa các bài chỉ nằm ở việc bạn "hỏi" cấu trúc DSU câu gì sau khi build xong (đếm số đại diện gốc? kiểm tra find trùng nhau trước khi gộp? hay việc khác) — đây là lý do DSU rất đáng đầu tư thời gian, học 1 lần dùng được nhiều bài.</p></blockquote>

</LessonPart>

<LessonPart :sid="'dsu'" part="bai-tap">
  <PracticeSet :items="data.practice" />
</LessonPart>

<LessonPart :sid="'dsu'" part="leetcode">
  <LeetCodeList :items="data.leetcode" />

<h3 id="dsu-3bai">★ Bài chính thức trong Đề bổ sung — D04012 Kết bạn, D04007 Chu trình, D04004 Đếm TPLT</h3>

<div class="problem-box">
<span class="pb-title">📋 Nguyên văn đề bài D04012 — Kết bạn</span>
<p>Trường học X có N sinh viên, trong đó có M cặp là bạn bè của nhau. Bạn của bạn cũng là bạn, tức là nếu A là bạn của B, B là bạn của C thì A và C cũng là bạn bè của nhau. Hãy xác định số lượng sinh viên nhiều nhất trong một nhóm bạn.</p>
<p><strong>Input:</strong> T (≤20). Mỗi test: N, M (≤100000), rồi M dòng cặp u, v.</p>
<p><strong>Output:</strong> Đáp án mỗi test 1 dòng.</p>
<table class="formula-table"><tr><th>Input</th><th>Output</th></tr>
<tr><td>2<br>3 2<br>1 2<br>2 3<br>10 12<br>1 2<br>3 1<br>3 4<br>5 4<br>3 5<br>4 6<br>5 2<br>2 1<br>7 1<br>1 2<br>9 10<br>8 9</td><td>3<br>7</td></tr></table>
</div>

<div class="problem-box">
<span class="pb-title">📋 Nguyên văn đề bài D04007 — Kiểm tra chu trình trên đồ thị vô hướng</span>
<p>Cho đồ thị vô hướng G=&lt;V, E&gt; được biểu diễn dưới dạng danh sách cạnh. Hãy kiểm tra xem đồ thị có tồn tại chu trình hay không.</p>
<p><strong>Input:</strong> T. Mỗi test: |V|, |E| rồi các cặp u v.</p>
<p><strong>Output:</strong> "YES"/"NO" mỗi test.</p>
<table class="formula-table"><tr><th>Input</th><th>Output</th></tr>
<tr><td>1<br>6 9<br>1 2 1 3 2 3 2 5 3 4 3 5 4 5 4 6 5 6</td><td>YES</td></tr></table>
</div>

<div class="problem-box">
<span class="pb-title">📋 Nguyên văn đề bài D04004 — Đếm số thành phần liên thông</span>
<p>Cho đồ thị vô hướng G=&lt;V, E&gt; được biểu diễn dưới dạng danh sách cạnh. Hãy tìm số thành phần liên thông của đồ thị.</p>
<p><strong>Input:</strong> T. Mỗi test: |V|, |E| rồi các cặp u v.</p>
<p><strong>Output:</strong> Số thành phần liên thông mỗi test.</p>
<table class="formula-table"><tr><th>Input</th><th>Output</th></tr>
<tr><td>1<br>5 6<br>1 2 1 3 2 3 3 4 3 5 4 5</td><td>1</td></tr></table>
</div>

<p>Cả 3 bài dùng chung 1 khung DSU với đánh số đỉnh từ 1 (không phải từ 0 như ví dụ lý thuyết ở trên) — chỉ khác đúng 1-2 dòng ở phần xử lý kết quả. So sánh trực tiếp để thấy rõ điểm khác biệt:</p>

<div class="problem-box">
<span class="pb-title">📋 D04012 — Kết bạn: theo dõi kích thước nhóm LỚN NHẤT ngay trong lúc Union</span>
</div>
<pre v-pre><code>int n, m, ans, parent[100001], num[100001];
void init(){
    for(int i=1; i&lt;=n; i++){ parent[i]=i; num[i]=1; }
}
int Find(int u){
    if(u != parent[u]) parent[u] = Find(parent[u]);   // nén đường
    return parent[u];
}
void Union(int u, int v){
    int a = Find(u), b = Find(v);
    if(a == b) return;                    // đã cùng nhóm rồi, không làm gì
    if(num[a] &lt; num[b]) swap(a,b);        // luôn gộp nhóm nhỏ vào nhóm lớn
    parent[b] = a;
    num[a] += num[b];
    ans = max(ans, num[a]);               // cập nhật nhóm lớn nhất TỪNG có
}</code></pre>
<p><strong>Chạy tay ví dụ 1</strong> (N=3, cạnh 1-2, 2-3): Union(1,2) → nhóm {1,2}, num=2, ans=2. Union(2,3) → Find(2)=1, Find(3)=3, gộp → nhóm {1,2,3}, num=3, ans=3. Kết quả: <strong>3</strong> — khớp đề.</p>

<div class="problem-box">
<span class="pb-title">📋 D04007 — Kiểm tra chu trình: hỏi Find(u)==Find(v) TRƯỚC khi gộp</span>
</div>
<pre v-pre><code>bool Union(int u, int v){
    int a = Find(u), b = Find(v);
    if(a == b) return 0;      // u,v ĐÃ cùng nhóm → cạnh này thừa → tạo chu trình
    if(num[a] &lt; num[b]) swap(a,b);
    parent[b] = a;
    num[a] += num[b];
    return 1;                 // gộp thành công, cạnh này KHÔNG tạo chu trình
}
// main: đọc từng cạnh (u,v); nếu Union() trả 0 ở bất kỳ cạnh nào → check = true → in "YES"</code></pre>
<p>Khác biệt duy nhất so với D04012: hàm trả về <code>bool</code> để báo "cạnh này có thừa không", thay vì âm thầm cập nhật <code>ans</code>.</p>

<div class="problem-box">
<span class="pb-title">📋 D04004 — Đếm thành phần liên thông: đếm số gốc còn lại SAU khi Union hết</span>
</div>
<pre v-pre><code>// Sau khi Union hết m cạnh:
int dem = 0;
for(int i=1; i&lt;=n; i++)
    if(i == parent[i]) dem++;   // i là gốc của chính nó → i đại diện cho 1 nhóm
cout &lt;&lt; dem &lt;&lt; endl;</code></pre>
<p>Khác biệt duy nhất so với D04012/D04007: không cần trả về gì trong lúc Union, chỉ cần đếm gốc ở bước cuối cùng.</p>

<blockquote><p>💡 Nhìn 3 bài cạnh nhau như trên để thấy: <strong>DSU chỉ có đúng 3 hàm (init/Find/Union) không đổi</strong>, phần thay đổi giữa các bài chỉ nằm ở việc bạn "hỏi" cấu trúc DSU câu gì sau khi build xong — đây là lý do DSU rất đáng đầu tư thời gian, học 1 lần dùng được nhiều bài.</p></blockquote>

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
import data from '../data/lessons/dsu.js'
import { initDsuWidgets } from '../widgets/dsu.js'

defineProps({ active: Boolean })

onMounted(() => {
  initDsuWidgets()
})
</script>
