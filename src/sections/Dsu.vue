<template>
<section id="dsu" class="day-section" data-sid="dsu" v-show="active">

<h2>Duyệt Đồ Thị — DSU (Disjoint Set Union) <span class="exam-tag">★ Đề bổ sung — Bài D04012, D04007, D04004</span></h2>
<div class="mini-toc">
  <span class="mt-label">Chuyển nhanh tới</span>
  <a class="mt-exam" href="#dsu-3bai">★ D04012, D04007, D04004 — Kết bạn, Chu trình, Đếm TPLT</a>
</div>

<h3 id="auto-dsu-disjoint-set-union-ai-chung-nhom-voi-ai">DSU (Disjoint Set Union) — ai chung nhóm với ai?</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Mỗi người trong 1 sự kiện đeo 1 vòng tay màu — cùng nhóm đeo cùng màu. 2 câu hỏi thường gặp: "2 người này có cùng nhóm không?" (Find-Set) và "gộp 2 nhóm lại làm 1" (Union).</p>

<div class="problem-box">
<span class="pb-title">📋 Đúng 3 hàm theo slide của thầy: Make-Set, Find-Set, Union</span>
<p>Thầy đặt tên <code>p(x)</code> là "đại diện (cha)" của x, <code>num(x)</code> là kích thước nhóm chứa x. Trong code C++, ta viết thành 2 mảng <code>parent[]</code> và <code>size[]</code> — ý nghĩa giống hệt <code>p()</code>, <code>num()</code> trên slide.</p>
</div>

<p class="idea-label">🗣️ Vì sao Union cần so sánh <code>num(x)</code> và <code>num(y)</code> trước khi gộp?</p>
<p>Theo slide: <code>UNION(x,y)</code> — nếu <code>num(x) &gt; num(y)</code> thì gắn <code>y</code> vào <code>x</code> (nhóm nhỏ nối vào nhóm lớn), ngược lại gắn <code>x</code> vào <code>y</code>. Đây gọi là <strong>"Union theo kích thước"</strong>: luôn gắn nhóm <strong>nhỏ hơn</strong> vào nhóm <strong>lớn hơn</strong>, không bao giờ làm ngược lại. Lý do: nếu luôn gắn tùy tiện (không quan tâm kích thước), cây đại diện có thể "cao" dần lên tới O(n) trong trường hợp xấu nhất, khiến <code>Find-Set</code> phải đi ngược rất nhiều bước. Gắn nhóm nhỏ vào nhóm lớn giữ cây luôn "thấp và phẳng", kết hợp thêm nén đường (path compression) ở <code>Find-Set</code> giúp mỗi truy vấn chỉ mất gần O(1).</p>

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
    if (sz[rx] &gt; sz[ry]) {                    // num(x) &gt; num(y) → gắn y vào x
        parent[ry] = rx;
        sz[rx] += sz[ry];
    } else {                                   // ngược lại → gắn x vào y
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

<blockquote><p><strong>Path compression</strong> (nén đường): mỗi lần <code>findSet</code>, ta gắn thẳng mọi node trên đường đi về gốc, khiến lần gọi sau gần như O(1).</p></blockquote>

<div class="realworld">
  <span class="rw-title">🌐 Ứng dụng thực tế</span>
  <dl>
    <dt>Dùng ở đâu</dt>
    <dd>Kiểm tra kết nối mạng xã hội (2 người có chung 1 nhóm bạn không); phát hiện chu trình khi thêm cạnh vào đồ thị (thêm cạnh mà 2 đỉnh đã cùng nhóm → tạo chu trình); hệ thống phân loại/gộp nhóm động (union-find) trong game (kiểm tra 2 vùng đất có nối liền nhau không).</dd>
    <dt>Giải quyết vấn đề gì</dt>
    <dd>Trả lời nhanh 2 câu hỏi: "2 phần tử có cùng nhóm không?" và "gộp 2 nhóm lại làm 1", với hàng nghìn/triệu phần tử.</dd>
    <dt class="good">Khi nào NÊN dùng</dt>
    <dd class="good">Cần kiểm tra liên thông động (đồ thị thay đổi dần theo thời gian, thêm cạnh liên tục); không cần biết đường đi cụ thể, chỉ cần biết "có nối được không".</dd>
    <dt class="bad">Khi nào KHÔNG NÊN dùng</dt>
    <dd class="bad">Cần xóa cạnh (DSU không hỗ trợ tốt việc tách nhóm); cần biết đường đi cụ thể giữa 2 đỉnh, không chỉ biết chúng có liên thông hay không.</dd>
  </dl>
</div>

<h4 id="auto-luyen-tap">Luyện tập</h4>
<ol class="practice">
  <li>Chạy tay DSU: Make-Set(5 đỉnh), Union(0,1), Union(2,3), Union(1,3) — đối chiếu widget ở trên.
    <div class="idea"><em>Ý tưởng:</em> mỗi lần Union, chỉ 1 trong 2 "đại diện nhóm" bị đổi để trỏ sang nhóm kia — tự hỏi "ai đang là đại diện của ai" trước khi gộp, đừng nhầm đỉnh với đại diện của đỉnh.</div>
  </li>
  <li>Code lại findSet/unionSet không nhìn tài liệu.
    <div class="idea"><em>Ý tưởng:</em> <code>findSet</code> phải trả lời được câu "gốc thật sự của tôi là ai", không dừng ở "cha trực tiếp của tôi là ai" — vì cha có thể chưa phải gốc.</div>
  </li>
  <li>Với 8 đỉnh, thực hiện Union(0,1), Union(2,3), Union(4,5), Union(6,7), Union(1,3), Union(5,7) — sau cùng có bao nhiêu nhóm liên thông?
    <div class="idea"><em>Ý tưởng:</em> đếm số "đại diện gốc" khác nhau còn lại sau khi thực hiện hết các Union — đó chính là số nhóm.</div>
    <div class="hint"><em>Hướng dẫn:</em> đáp án là 2 nhóm: {0,1,2,3} và {4,5,6,7}.</div>
  </li>
</ol>

<h3 id="dsu-3bai">★ Bài chính thức trong Đề bổ sung — D04012 Kết bạn, D04007 Chu trình, D04004 Đếm thành phần liên thông</h3>

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


</section>
</template>

<script setup>
import { onMounted } from 'vue'
import { initDsuWidgets } from '../widgets/dsu.js'

defineProps({ active: Boolean })

onMounted(() => {
  initDsuWidgets()
})
</script>
