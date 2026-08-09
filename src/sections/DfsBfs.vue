<template>
<section id="dfs-bfs" class="day-section" data-sid="dfs-bfs" v-show="active">

<h2>BFS &amp; DFS</h2>

<LessonGoal :sid="'dfs-bfs'">
  <ul><li v-for="(g, i) in data.goal" :key="i">{{ g }}</li></ul>
</LessonGoal>

<LessonPart :sid="'dfs-bfs'" part="ly-thuyet">

<h3 id="auto-do-thi-la-gi">Đồ thị là gì</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Bản đồ tuyến xe buýt: mỗi bến là 1 <strong>đỉnh</strong>, mỗi tuyến nối 2 bến là 1 <strong>cạnh</strong>. <strong>DFS</strong> giống bạn khám phá mê cung: đi thẳng sâu nhất có thể theo 1 hướng — chính là <strong>đệ quy + quay lui</strong> đã học ở phần Quay lui. <strong>BFS</strong> giống việc lan truyền tin đồn: kể cho bạn bè trực tiếp trước, rồi họ kể cho bạn của họ... lan ra xa dần theo từng lớp.</p>

<h3 id="thuat-ngu-do-thi">Thuật ngữ cơ bản — hiểu qua 1 đồ thị mẫu dùng xuyên suốt</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Thay vì học thuộc định nghĩa suông, ta dùng đúng 1 đồ thị mẫu <strong>G</strong> (6 đỉnh, 9 cạnh) cho toàn bộ phần này. Cứ mỗi khi quên 1 thuật ngữ, quay lại nhìn hình này.</p>

<div style="text-align:center; margin: 1rem 0;">
<svg width="100%" height="230" viewBox="0 0 600 230" style="max-width:420px;">
  <line x1="300" y1="30" x2="450" y2="70" stroke="#bbb" stroke-width="2"/>
  <line x1="300" y1="30" x2="150" y2="70" stroke="#bbb" stroke-width="2"/>
  <line x1="450" y1="70" x2="150" y2="70" stroke="#bbb" stroke-width="2"/>
  <line x1="450" y1="70" x2="450" y2="170" stroke="#bbb" stroke-width="2"/>
  <line x1="450" y1="70" x2="150" y2="170" stroke="#bbb" stroke-width="2"/>
  <line x1="150" y1="70" x2="450" y2="170" stroke="#bbb" stroke-width="2"/>
  <line x1="450" y1="170" x2="150" y2="170" stroke="#bbb" stroke-width="2"/>
  <line x1="450" y1="170" x2="300" y2="210" stroke="#bbb" stroke-width="2"/>
  <line x1="150" y1="170" x2="300" y2="210" stroke="#bbb" stroke-width="2"/>
  <circle cx="300" cy="30" r="20" fill="#eee" stroke="var(--navy)" stroke-width="2"/><text x="300" y="30" font-size="15" text-anchor="middle" dy="5" font-family="monospace">1</text>
  <circle cx="450" cy="70" r="20" fill="#eee" stroke="var(--navy)" stroke-width="2"/><text x="450" y="70" font-size="15" text-anchor="middle" dy="5" font-family="monospace">2</text>
  <circle cx="150" cy="70" r="20" fill="#eee" stroke="var(--navy)" stroke-width="2"/><text x="150" y="70" font-size="15" text-anchor="middle" dy="5" font-family="monospace">3</text>
  <circle cx="450" cy="170" r="20" fill="#eee" stroke="var(--navy)" stroke-width="2"/><text x="450" y="170" font-size="15" text-anchor="middle" dy="5" font-family="monospace">4</text>
  <circle cx="150" cy="170" r="20" fill="#eee" stroke="var(--navy)" stroke-width="2"/><text x="150" y="170" font-size="15" text-anchor="middle" dy="5" font-family="monospace">5</text>
  <circle cx="300" cy="210" r="20" fill="#eee" stroke="var(--navy)" stroke-width="2"/><text x="300" y="210" font-size="15" text-anchor="middle" dy="5" font-family="monospace">6</text>
</svg>
<div class="caption">Đồ thị mẫu G: đỉnh {1,2,3,4,5,6}, cạnh (1,2)(1,3)(2,3)(2,4)(2,5)(3,4)(4,5)(4,6)(5,6)</div>
</div>

<table class="formula-table">
<tr><th>Thuật ngữ</th><th>Định nghĩa (nói đơn giản)</th><th>Ví dụ trên G</th></tr>
<tr><td><strong>Đỉnh kề</strong></td><td>u và v kề nhau nếu có 1 cạnh nối thẳng chúng</td><td>1 kề 2 và kề 3, nhưng 1 không kề 4</td></tr>
<tr><td><strong>Bậc deg(v)</strong></td><td>Số cạnh "mọc ra" từ đỉnh v = đếm số đỉnh kề với v</td><td>deg(2)=4 (nối 1,3,4,5); deg(1)=2 (nối 2,3)</td></tr>
<tr><td><strong>Đường đi</strong></td><td>Dãy đỉnh nối tiếp nhau, mỗi cặp liền kề đều có cạnh thật</td><td>1→2→4→6 là 1 đường đi hợp lệ (đúng 3 cạnh có thật)</td></tr>
<tr><td><strong>Chu trình</strong></td><td>Đường đi mà đỉnh cuối trùng đỉnh đầu</td><td>1→2→3→1 là 1 chu trình</td></tr>
<tr><td><strong>Liên thông</strong></td><td>Từ bất kỳ đỉnh nào cũng có đường đi tới bất kỳ đỉnh nào khác</td><td>G liên thông: đi từ 1 tới 6 được (1→2→4→6)</td></tr>
<tr><td><strong>Thành phần liên thông</strong></td><td>Nếu đồ thị KHÔNG liên thông, mỗi "cụm" tách rời là 1 thành phần</td><td>Nếu bỏ hết cạnh nối tới đỉnh 6 thì G tách thành 2 cụm = 2 thành phần</td></tr>
</table>
<blockquote><p>💡 <strong>Đỉnh trụ</strong> (articulation point) và <strong>cạnh cầu</strong> (bridge) — hai khái niệm hay gặp trong đề bổ sung — chỉ là mở rộng của "liên thông": đỉnh trụ là đỉnh mà bỏ nó đi làm đồ thị tách thành nhiều thành phần hơn; cạnh cầu tương tự nhưng bỏ 1 cạnh. Xem phần "Đỉnh trụ &amp; Cạnh cầu" ở khối tài nguyên tự luyện bên dưới để có code đầy đủ.</p></blockquote>

<h3 id="bieu-dien-do-thi">3 cách biểu diễn đồ thị — và nên chọn cách nào khi đi thi</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Cùng 1 đồ thị G ở trên, có 3 cách "lưu" nó trong máy — khác nhau ở việc <strong>đánh đổi bộ nhớ lấy tốc độ tra cứu</strong>. Hiểu rõ trade-off này giúp bạn không hoang mang khi đề bài yêu cầu 1 cách cụ thể.</p>

<table class="formula-table">
<tr><th>Cách biểu diễn</th><th>Lưu gì</th><th>Bộ nhớ</th><th>Kiểm tra u,v có kề không</th><th>Duyệt DFS/BFS toàn đồ thị</th></tr>
<tr><td><strong>1. Ma trận kề</strong> <code>adj[u][v]</code></td><td>Bảng 0/1 kích thước n×n</td><td>O(n²)</td><td>O(1) — tra thẳng <code>adj[u][v]</code></td><td>O(n²)</td></tr>
<tr><td><strong>2. Danh sách cạnh</strong></td><td>Mảng các cặp (u,v) — chỉ liệt kê cạnh có thật</td><td>O(m)</td><td>O(m) — phải quét hết cạnh</td><td>O(n·m)</td></tr>
<tr><td><strong>3. Danh sách kề</strong> <code>List[u]</code></td><td>Mỗi đỉnh giữ 1 danh sách các đỉnh kề với nó</td><td>O(n+m)</td><td>O(deg(u)) — quét riêng List[u]</td><td>O(max(n,m))</td></tr>
</table>
<p>(n = số đỉnh, m = số cạnh.)</p>

<table class="formula-table">
<tr><th>Cách</th><th>G biểu diễn thế nào (n=6, m=9)</th></tr>
<tr><td>Ma trận kề <code>adj[7][7]</code> (bỏ trống dòng/cột 0)</td><td><code>&nbsp;&nbsp;1 2 3 4 5 6<br>1 0 1 1 0 0 0<br>2 1 0 1 1 1 0<br>3 1 1 0 1 0 0<br>4 0 1 1 0 1 1<br>5 0 1 0 1 0 1<br>6 0 0 0 1 1 0</code></td></tr>
<tr><td>Danh sách cạnh</td><td><code>(1,2) (1,3) (2,3) (2,4) (2,5) (3,4) (4,5) (4,6) (5,6)</code></td></tr>
<tr><td>Danh sách kề <code>List[u]</code></td><td><code>List(1)={2,3}<br>List(2)={1,3,4,5}<br>List(3)={1,2,4}<br>List(4)={2,3,5,6}<br>List(5)={2,4,6}<br>List(6)={4,5}</code></td></tr>
</table>

<pre v-pre><code>// Cách 1: Ma trận kề — đọc m cạnh rồi bật 2 chiều
int adj[105][105];      // adj[u][v]=1 nghĩa là có cạnh u-v
for (int e = 0; e &lt; m; e++) {
    int u, v; cin &gt;&gt; u &gt;&gt; v;
    adj[u][v] = adj[v][u] = 1;   // vô hướng → bật cả 2 chiều
}

// Cách 3: Danh sách kề — mỗi đỉnh tự "nhớ" ai kề với mình
vector&lt;int&gt; List[1005];
for (int e = 0; e &lt; m; e++) {
    int u, v; cin &gt;&gt; u &gt;&gt; v;
    List[u].push_back(v);
    List[v].push_back(u);       // vô hướng → thêm cả 2 chiều
}</code></pre>

<blockquote><p>📌 <strong>Chọn cách nào khi đi thi?</strong> Mặc định dùng <strong>danh sách kề</strong> (<code>List[]</code>) — nhanh và tiết kiệm bộ nhớ nhất khi đồ thị thưa (m không quá lớn so với n²), là trường hợp thường gặp trong đề thi. <strong>Chỉ chuyển sang ma trận kề</strong> khi đề <strong>yêu cầu rõ ràng</strong> "cài đặt bằng ma trận kề" hoặc khi n rất nhỏ (≤ vài chục) và bạn cần tra kề cực nhanh nhiều lần. Danh sách cạnh ít khi dùng để duyệt — chủ yếu dùng cho các thuật toán chỉ cần "nhìn qua từng cạnh 1 lần" như Kruskal.</p></blockquote>

<div class="problem-box">
<span class="pb-title">📋 Cách đặt tên biến hay gặp — <code>List[]</code>, <code>chuaxet[]</code></span>
<p>Cách phổ biến: dùng <strong>danh sách kề</strong> (<code>vector&lt;int&gt; List[]</code>) — mỗi đỉnh <code>u</code> lưu 1 danh sách các đỉnh kề với nó, thay vì ma trận. Trạng thái mỗi đỉnh lưu trong <code>chuaxet[]</code> — chú ý kỹ chiều ngược của tên biến này: <code>chuaxet[u] = true</code> nghĩa là đỉnh u <strong>CHƯA</strong> được xét (khởi tạo toàn bộ là <code>true</code>), và ta gán về <code>false</code> ngay khi đã thăm nó. Đây là chiều <strong>ngược lại</strong> với cách đặt tên "trực quan" hơn là <code>visited[]</code> (true = đã thăm) mà nhiều tài liệu khác dùng — đọc kỹ để không hiểu nhầm điều kiện <code>if</code>.</p>
</div>

<pre v-pre><code>#include&lt;bits/stdc++.h&gt;
using namespace std;
int n,m,u;
bool chuaxet[1005];              // true = CHƯA xét, false = ĐÃ xét (chú ý chiều ngược!)
vector&lt;int&gt; List[1005];          // danh sách kề

void DFS(int u){
	chuaxet[u]=false;             // đánh dấu u đã xét NGAY khi bước vào
	cout &lt;&lt; u &lt;&lt; " ";
	for(int v: List[u]){
		if(chuaxet[v]) DFS(v);    // chỉ đi tiếp nếu v CHƯA xét
	}
}

int main(){
	int t,x,y,i; cin&gt;&gt;t;
	while(t--){
		memset(chuaxet,true,sizeof(chuaxet));   // reset: mọi đỉnh đều CHƯA xét
		for(i=0;i&lt;1005;i++) List[i].clear();
		cin &gt;&gt; n &gt;&gt; m &gt;&gt; u;
		for(i=1;i&lt;=m;i++){
			cin &gt;&gt; x &gt;&gt; y;
			List[x].push_back(y);
			List[y].push_back(x);            // đồ thị vô hướng: 2 chiều
		}
		DFS(u);   cout&lt;&lt;endl;
	}
}</code></pre>

<blockquote><p>⚠️ <strong>Lưu ý khi đối chiếu 2 quy ước khác nhau</strong>: nhiều nơi (kể cả file mẫu BFS bên dưới) lại dùng biến <code>daxet[]</code> (kiểu <code>int</code>, <code>1</code> = ĐÃ xét — chiều <strong>THUẬN</strong>, ngược với <code>chuaxet[]</code> ở trên). Hai quy ước này mỗi cái tự nó đúng và nhất quán bên trong, nhưng <strong>đừng trộn lẫn</strong> khi copy code. Luôn đọc lại đúng dòng khai báo và dòng khởi tạo trước khi viết điều kiện <code>if</code>.</p></blockquote>

<pre v-pre><code>#include&lt;bits/stdc++.h&gt;
using namespace std;
vector&lt;int&gt; List[1005];
int daxet[1005];                 // 1 = ĐÃ xét, 0 = chưa xét (chiều THUẬN — khác chuaxet ở DFS!)

void BFS(int u){
	queue&lt;int&gt; Q;
	Q.push(u); daxet[u] = 1;
	while(!Q.empty()){
		int x = Q.front(); Q.pop();
		cout &lt;&lt; x &lt;&lt; " ";
		for(int i: List[x]){
			if(!daxet[i]){        // chỉ đi tiếp nếu i CHƯA xét (daxet[i]==0)
				daxet[i] = 1; Q.push(i);
			}
		}
	}
	cout &lt;&lt; endl;
}

int main(){
	int t; cin&gt;&gt;t;
	while(t--){
		for(int i = 0; i &lt; 1005; i++){ daxet[i] = 0; List[i].clear(); }
		int n,m,u;
		cin &gt;&gt; n &gt;&gt; m &gt;&gt; u;
		for(int i = 0; i &lt; m; i++){
			int x,y;
			cin &gt;&gt; x &gt;&gt; y;
			List[x].push_back(y);
			List[y].push_back(x);
		}
		BFS(u);
	}
}</code></pre>

<h3 id="auto-kiem-tra-chu-trinh-do-thi-co-huong">Kiểm tra chu trình (đồ thị có hướng)</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Với đồ thị VÔ hướng, chỉ cần 1 mảng chuaxet[]/visited[] là đủ để nhận ra chu trình (gặp lại đỉnh đã thăm mà không phải cha trực tiếp). Nhưng với đồ thị CÓ hướng, "đã thăm" không đủ thông tin — cần phân biệt "đang đứng trên nhánh đệ quy hiện tại" với "đã xử lý xong toàn bộ và rời khỏi nhánh đó từ lâu". Vì vậy dùng 3 trạng thái: 0 = chưa thăm, 1 = đang xử lý (đang trên đường đi hiện tại), 2 = đã xử lý xong. Gặp lại 1 đỉnh đang ở trạng thái 1 nghĩa là quay lại chính nhánh đang đứng → có chu trình.</p>
<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int n, adj[100][100];
int state[100];   // 0=chưa thăm, 1=đang xử lý, 2=xong

bool hasCycleDFS(int u) {
    state[u] = 1;
    for (int v = 0; v &lt; n; v++) {
        if (adj[u][v]) {
            if (state[v] == 1) return true;
            if (state[v] == 0 && hasCycleDFS(v)) return true;
        }
    }
    state[u] = 2;
    return false;
}

int main() {
    n = 3;
    adj[0][1] = 1; adj[1][2] = 1; adj[2][0] = 1;   // 0 tới 1 tới 2 tới 0: có chu trình
    cout &lt;&lt; hasCycleDFS(0);   // in ra: 1 (true)
    return 0;
}</code></pre>
<blockquote><p>⚠️ Bẫy hay gặp: quên đổi trạng thái đỉnh từ 1 về 2 SAU KHI đã đệ quy hết mọi đỉnh kề — nếu quên, mọi đỉnh sẽ mãi mãi ở trạng thái 1 (như "đang xử lý"), và thuật toán sẽ báo có chu trình một cách sai lệch ngay cả khi đồ thị không có chu trình thật.</p></blockquote>

</LessonPart>

<LessonPart :sid="'dfs-bfs'" part="vi-sao">

<h3 id="auto-vi-sao-dfs-di-sau-con-bfs-lan-rong-nhin-tu-ngan-xe">Vì sao DFS "đi sâu" còn BFS "lan rộng"? — nhìn từ ngăn xếp và hàng đợi</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Code đệ quy <code>DFS(u)</code> ở phần lý thuyết trông không giống có ngăn xếp nào cả — nhưng thực ra máy tính đang tự quản lý 1 ngăn xếp ẩn (call stack) cho bạn: mỗi lần gọi <code>DFS(v)</code>, lời gọi <code>DFS(u)</code> hiện tại bị "đẩy tạm xuống đáy" chờ, y hệt <code>Push(stack, u)</code>. Viết tường minh ra, DFS bằng stack trông thế này:</p>

<pre v-pre><code>// DFS(u) dùng stack tường minh — cùng bản chất với đệ quy ở trên
void DFS_stack(int start) {
    stack&lt;int&gt; st;
    st.push(start);
    chuaxet[start] = false;
    cout &lt;&lt; start &lt;&lt; " ";
    while (!st.empty()) {
        int s = st.top();          // xem đỉnh TRÊN CÙNG (vào sau, ra trước = LIFO)
        bool wentDeeper = false;
        for (int t : List[s]) {
            if (chuaxet[t]) {
                chuaxet[t] = false;
                cout &lt;&lt; t &lt;&lt; " ";
                st.push(t);          // đi sâu thêm 1 bước theo nhánh t
                wentDeeper = true;
                break;               // chỉ lấy 1 đỉnh rồi lặp lại vòng while ngay
            }
        }
        if (!wentDeeper) st.pop();  // s hết đường đi tiếp → lùi lại (quay lui)
    }
}</code></pre>

<table class="formula-table">
<tr><th></th><th>DFS — dùng <strong>ngăn xếp (Stack)</strong></th><th>BFS — dùng <strong>hàng đợi (Queue)</strong></th></tr>
<tr><td>Nguyên tắc lấy ra</td><td>LIFO — vào sau ra trước</td><td>FIFO — vào trước ra trước</td></tr>
<tr><td>Hệ quả</td><td>Vừa thêm 1 đỉnh mới là lập tức "đào sâu" tiếp vào chính nó ngay bước sau</td><td>Đỉnh mới thêm phải "xếp hàng" chờ hết lượt các đỉnh cũ hơn mới tới lượt</td></tr>
<tr><td>Hình dung</td><td>Đi vào ngõ cụt rồi mới lùi lại thử ngõ khác</td><td>Thăm hết hàng xóm tầng 1, rồi mới sang tầng 2</td></tr>
<tr><td>Trong code</td><td>Đệ quy (ngăn xếp ẩn của hệ thống) hoặc <code>stack</code> tường minh</td><td><code>queue</code> tường minh — không thể thay bằng đệ quy đơn giản</td></tr>
</table>
<blockquote><p>💡 <strong>Tự kiểm tra hiểu bài</strong>: nếu đổi đúng 1 chữ trong code BFS — thay <code>queue&lt;int&gt; Q</code> bằng <code>stack&lt;int&gt; Q</code> (và đổi <code>Q.front()</code> thành <code>Q.top()</code>) — thuật toán sẽ chạy giống DFS chứ không còn là BFS nữa. Đây là bằng chứng rõ nhất: <strong>DFS và BFS chỉ khác nhau ở cấu trúc dữ liệu chờ xử lý</strong>, ý tưởng "thăm rồi lan ra các đỉnh kề chưa thăm" là giống hệt nhau. Đây cũng chính là mối liên hệ ngược lại với ngăn xếp/hàng đợi đã học ở nhóm trước: DFS về bản chất là <strong>quay lui trên đồ thị</strong>, dùng đúng ngăn xếp (đệ quy) làm bộ nhớ tạm; BFS dùng đúng hàng đợi.</p></blockquote>

<p>Đồ thị mẫu G (đúng đồ thị đã dùng ở phần thuật ngữ): 6 đỉnh, cạnh (1,2)(1,3)(2,3)(2,4)(2,5)(3,4)(4,5)(4,6)(5,6). Chọn cách duyệt để xem trực quan — chú ý DFS và BFS cho ra <strong>thứ tự thăm khác nhau</strong> dù cùng xuất phát từ đỉnh 1 và cùng dùng chung 1 <code>List[]</code>:</p>

<div class="widget">
  <div class="widget-label">BFS/DFS trên đồ thị mẫu G (6 đỉnh)</div>
  <div style="text-align:center; font-size:0.78rem; color:#888; margin-bottom:0.5rem; font-family:monospace;">List(1)={2,3} · List(2)={4,5,1,3} · List(3)={1,4,2} · List(4)={2,3,6,5} · List(5)={2,6,4} · List(6)={4,5}</div>
  <div style="text-align:center; margin-bottom:0.8rem;">
    <button class="secondary" id="d10ModeDfs" style="background:var(--navy); color:white;">DFS</button>
    <button class="secondary" id="d10ModeBfs">BFS</button>
  </div>
  <div id="d10GraphSvg" style="position:relative; width:100%; height:240px;"></div>
  <div style="text-align:center; font-size:0.85rem; color:#888; margin:0.5rem 0;">Hàng đợi/Ngăn xếp: <span id="d10Structure" style="font-family:monospace;"></span></div>
  <div class="caption" id="d10Caption">Bấm "Bước tiếp theo" để bắt đầu.</div>
  <div class="controls">
    <button class="secondary" id="d10Prev">← Lùi lại</button>
    <button id="d10Next">Bước tiếp theo →</button>
    <button class="secondary" id="d10Reset">Chạy lại từ đầu</button>
  </div>
  <div class="step-info"><span id="d10StepNum">0</span> / <span id="d10StepTotal">0</span> bước — thứ tự thăm: <span id="d10Order" style="font-family: monospace;"></span></div>
</div>

<div class="realworld">
  <span class="rw-title">🌐 Ứng dụng thực tế</span>
  <dl>
    <dt>Dùng ở đâu</dt>
    <dd>BFS: tìm số bước ngắn nhất trong mạng xã hội (gợi ý kết bạn "bạn của bạn"), lan truyền thông tin trong mạng lưới, định tuyến gói tin. DFS: quét toàn bộ file trong ổ đĩa, giải mê cung/tìm đường trong game world, phát hiện chu trình trong hệ thống quản lý phụ thuộc (dependency resolver như npm/pip).</dd>
    <dt>Giải quyết vấn đề gì</dt>
    <dd>Duyệt hết mọi đỉnh có thể tới được từ 1 điểm xuất phát, theo 1 trong 2 chiến lược khác nhau.</dd>
    <dt class="good">Khi nào NÊN dùng</dt>
    <dd class="good">BFS: cần đường đi ít cạnh nhất (không trọng số). DFS: cần duyệt hết/kiểm tra tính chất toàn cục (chu trình, liên thông), không quan tâm thứ tự.</dd>
    <dt class="bad">Khi nào KHÔNG NÊN dùng</dt>
    <dd class="bad">BFS cho đồ thị có trọng số khác nhau trên các cạnh — cần Dijkstra thay vì BFS thuần.</dd>
  </dl>
</div>

</LessonPart>

<LessonPart :sid="'dfs-bfs'" part="quiz">
  <QuizBlock :questions="data.quiz" />
</LessonPart>

<LessonPart :sid="'dfs-bfs'" part="vi-du">

<WorkedExample id="vd-lien-thong" title="Đếm số thành phần liên thông" :official="true">
  <template #de-bai>
    <div class="problem-box">
    <span class="pb-title">📋 Đề bài</span>
    <p>Cho một đồ thị vô hướng gồm n đỉnh và m cạnh, biểu diễn bằng danh sách kề. Đếm xem đồ thị có bao nhiêu thành phần liên thông (bao nhiêu "cụm" đỉnh tách rời nhau, không có cạnh nào nối giữa 2 cụm khác nhau).</p>
    <p><strong>Input:</strong> n, m rồi m cặp cạnh (u, v).</p>
    <p><strong>Output:</strong> Số thành phần liên thông.</p>
    <table class="formula-table"><tr><th>Input</th><th>Output</th></tr>
    <tr><td>6 3<br>1 2<br>2 3<br>4 5</td><td>3</td></tr></table>
    </div>
  </template>

  <template #y-tuong>
    <p>Nếu đồ thị liên thông hoàn toàn, chỉ cần DFS/BFS đúng 1 lần từ 1 đỉnh bất kỳ là thăm hết mọi đỉnh. Khi đồ thị KHÔNG liên thông, DFS/BFS 1 lần chỉ thăm hết đúng 1 "cụm" mà nó xuất phát trong đó, các đỉnh còn lại vẫn chưa thăm. Ý tưởng: <strong>mỗi lần bắt đầu duyệt từ 1 đỉnh chưa thăm là thêm 1 thành phần liên thông mới</strong> — cứ lặp lại việc "tìm đỉnh chưa thăm, DFS từ đó, tăng biến đếm" cho tới khi mọi đỉnh đều đã thăm.</p>
  </template>

  <template #thuat-toan>
    <ol>
      <li>Khởi tạo mọi đỉnh là chuaxet[u] = true (chưa thăm), biến đếm count = 0.</li>
      <li>Duyệt u từ 1 tới n: nếu chuaxet[u] vẫn còn true (chưa thăm) → đây là 1 thành phần liên thông mới, tăng count, rồi DFS(u) để đánh dấu "đã thăm" hết cả cụm chứa u.</li>
      <li>Duyệt hết mọi đỉnh, trả về count.</li>
    </ol>
  </template>

  <template #chay-tay>
    <p>Với đồ thị 6 đỉnh, 3 cạnh (1,2)(2,3)(4,5) — đỉnh 6 không có cạnh nào (cô lập):</p>
    <table class="formula-table">
      <tr><th>u đang xét</th><th>chuaxet[u]?</th><th>Hành động</th><th>count sau bước</th></tr>
      <tr><td>1</td><td>true (chưa thăm)</td><td>Thành phần mới → DFS(1) thăm hết {1,2,3}</td><td>1</td></tr>
      <tr><td>2, 3</td><td>false (đã thăm nhờ DFS(1))</td><td>Bỏ qua</td><td>1</td></tr>
      <tr><td>4</td><td>true (chưa thăm)</td><td>Thành phần mới → DFS(4) thăm hết {4,5}</td><td>2</td></tr>
      <tr><td>5</td><td>false (đã thăm nhờ DFS(4))</td><td>Bỏ qua</td><td>2</td></tr>
      <tr><td>6</td><td>true (chưa thăm, không có cạnh nào)</td><td>Thành phần mới → DFS(6) chỉ thăm được chính nó</td><td>3</td></tr>
    </table>
    <p>Kết quả: <strong>3</strong> thành phần liên thông ({1,2,3}, {4,5}, {6}) — khớp đề.</p>
  </template>

  <template #code>
<pre v-pre><code>#include&lt;bits/stdc++.h&gt;
using namespace std;

int n, m;
bool chuaxet[1005];
vector&lt;int&gt; List[1005];

void DFS(int u){
	chuaxet[u]=false;
	for(int v: List[u]) if(chuaxet[v]) DFS(v);
}

int countComponents() {
    memset(chuaxet, true, sizeof(chuaxet));
    int count = 0;
    for (int u = 1; u &lt;= n; u++) {
        if (chuaxet[u]) { count++; DFS(u); }   // còn CHƯA xét → là 1 thành phần liên thông mới
    }
    return count;
}

int main() {
    cin &gt;&gt; n &gt;&gt; m;
    for (int i = 1; i &lt;= m; i++) {
        int x, y; cin &gt;&gt; x &gt;&gt; y;
        List[x].push_back(y); List[y].push_back(x);
    }
    cout &lt;&lt; countComponents();
    return 0;
}</code></pre>
  </template>

  <template #toi-uu>
    <p><strong>Chuyển sang danh sách kề khi đồ thị thưa.</strong> Nếu đề không bắt buộc dùng ma trận kề, ưu tiên <code>List[]</code>: với đồ thị thưa (m nhỏ hơn nhiều so với n²) — trường hợp rất thường gặp — duyệt DFS/BFS bằng danh sách kề tốn O(n+m), trong khi bằng ma trận kề tốn O(n²) vì phải quét hết n cột cho mỗi đỉnh dù đa số ô là 0. Với n lớn (ví dụ n=10⁵) mà m chỉ vài nghìn, chênh lệch này là khác biệt giữa chạy được và bị time limit exceeded.</p>
    <p>Nếu đề yêu cầu cụ thể "cài bằng ma trận kề" (như ví dụ 2 phía dưới), cứ dùng — với n nhỏ (vài trăm, vài nghìn) sự khác biệt tốc độ không đáng kể, và ma trận kề có ưu điểm tra <code>adj[u][v]</code> trong O(1) nếu cần kiểm tra kề nhiều lần.</p>
  </template>
</WorkedExample>

<blockquote><p>📎 <strong>Vì sao ví dụ dưới đây lại dùng ma trận kề <code>adj[][]</code> chứ không dùng <code>List[]</code>?</strong> Vì đề bài đó <strong>yêu cầu rõ</strong> "cài đặt bằng ma trận kề" — đây là yêu cầu của đề, không phải quy tắc chung. Với DFS/BFS thông thường không có yêu cầu cụ thể, danh sách kề (<code>List[]</code>) thường nhanh hơn và tốn ít bộ nhớ hơn khi đồ thị thưa (ít cạnh so với số đỉnh).</p></blockquote>

<WorkedExample id="vd-duong-di-bfs" title="Tìm đường đi ngắn nhất bằng BFS" :official="true">
  <template #de-bai>
    <blockquote><p>📌 Các phần DFS/BFS/kiểm tra chu trình ở phần lý thuyết là nền tảng bắt buộc phải nắm. <strong>Đây mới là bài bạn sẽ gặp đúng nguyên văn trong đề thi</strong> — nó dùng lại đúng BFS bạn vừa học, chỉ thêm bước truy vết đường đi.</p></blockquote>
    <div class="problem-box">
    <span class="pb-title">📋 Nguyên văn đề bài (7 điểm)</span>
    <ol>
      <li>Cài đặt đồ thị vô hướng bằng ma trận kề, mỗi đỉnh lưu một kí tự (1 điểm)</li>
      <li>Viết phép toán thêm 1 đỉnh vào đồ thị (1 điểm)</li>
      <li>Viết phép toán thêm 1 cạnh vào đồ thị (1 điểm)</li>
      <li>Tạo một đồ thị có n đỉnh gồm n kí tự với m cạnh (1 điểm)</li>
      <li>Kiểm tra đồ thị có liên thông không (1 điểm)</li>
      <li>Tìm đường đi giữa hai đỉnh u và v trên đồ thị bằng thuật toán duyệt theo chiều rộng BFS. Nếu hai đỉnh không có đường đi thì thông báo "not found", nếu có đường đi giữa hai đỉnh thì hiển thị danh sách các đỉnh trên đường đi từ u đến v trên 1 dòng (2 điểm)</li>
    </ol>
    <p><strong>Input:</strong> Dòng 1 chứa hai số nguyên n và m (1≤n, m≤20). m dòng tiếp theo mỗi dòng chứa hai số nguyên i và j là cạnh của đồ thị (0≤i, j≤n-1). Dòng cuối cùng là hai đỉnh u, v của đồ thị.</p>
    <p><strong>Output:</strong> Dòng 1: điền số 1 nếu đồ thị liên thông, 0 nếu đồ thị không liên thông. Dòng 2: điền "not found" nếu không tồn tại đường đi từ u đến v, nếu tồn tại đường đi thì liệt kê các đỉnh trên đường đi từ u đến v, mỗi đỉnh cách nhau bởi 1 dấu cách.</p>
    <table class="formula-table"><tr><th>Input</th><th>Output</th></tr>
    <tr><td>4 4<br>0 1<br>0 2<br>1 2<br>2 3<br>1 3</td><td>1<br>1 2 3</td></tr>
    <tr><td>5 4<br>0 1<br>0 2<br>1 2<br>2 3<br>1 4</td><td>0<br>Not found</td></tr></table>
    </div>
  </template>

  <template #y-tuong>
    <p>Bài này gộp đúng 3 việc: (1) cài đặt đồ thị bằng <strong>ma trận kề</strong> — <code>adj[i][j]=1</code> nghĩa là có cạnh nối đỉnh i và đỉnh j; (2) <strong>kiểm tra liên thông toàn đồ thị</strong> — chạy BFS/DFS 1 lần từ đỉnh 0, nếu thăm được HẾT n đỉnh thì liên thông; (3) <strong>tìm đường đi cụ thể</strong> giữa 2 đỉnh u, v bằng BFS — không chỉ trả lời "có nối không" mà phải <strong>liệt kê đúng các đỉnh trên đường đi</strong>, và vì BFS loang đều theo từng lớp, đường đi tìm được luôn là đường có ít cạnh nhất.</p>
  </template>

  <template #thuat-toan>
    <p>Chìa khóa cho việc (3): khi BFS lan ra từng lớp, mỗi lần thăm 1 đỉnh mới <code>v</code> từ đỉnh <code>u</code>, ta ghi nhớ lại "<code>v</code> được thăm tới TỪ đâu" bằng mảng <code>parent[v] = u</code>. Sau khi BFS xong, muốn biết đường đi từ start tới v, ta chỉ cần "đi ngược" theo <code>parent[]</code> từ v về tới start, rồi đảo ngược lại thứ tự.</p>
  </template>

  <template #chay-tay>
    <p><strong>Đối chiếu đúng ví dụ 1 trong đề</strong>: n=4, m=4, cạnh (0,1)(0,2)(1,2)(2,3), tìm đường u=1 → v=3.</p>
    <table class="formula-table">
      <tr><th>Bước BFS từ u=1</th><th>Hàng đợi</th><th>parent[] cập nhật</th></tr>
      <tr><td>Bắt đầu, thăm 1</td><td>[1]</td><td>—</td></tr>
      <tr><td>Xét 1 → láng giềng 0, 2 (đều đi từ 1 mà tới)</td><td>[0, 2]</td><td>parent[0]=1, parent[2]=1</td></tr>
      <tr><td>Xét 0 → láng giềng 2 đã thăm, bỏ qua</td><td>[2]</td><td>—</td></tr>
      <tr><td>Xét 2 → láng giềng 3 (đi từ 2 mà tới)</td><td>[3]</td><td>parent[3]=2</td></tr>
      <tr><td>Gặp target=3, dừng. Truy vết: 3→parent=2→parent=1→parent=-1</td><td colspan="2">Đảo ngược: <strong>1 2 3</strong></td></tr>
    </table>
    <p>Khớp đúng: liên thông = 1 (cả 4 đỉnh cùng thăm được), đường đi = <strong>"1 2 3"</strong>. Với ví dụ 2 (đỉnh 4 bị cô lập, u=1,v=4), <code>isConnected()</code> đếm chỉ được 4 trong 5 đỉnh → in 0; <code>bfsPath</code> không bao giờ thăm được đỉnh 4 → in "Not found".</p>
  </template>

  <template #code>
<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int n, m;
int adj[25][25];

// (2) Kiểm tra liên thông: BFS từ đỉnh 0, đếm số đỉnh thăm được
bool isConnected() {
    vector&lt;bool&gt; visited(n, false);
    queue&lt;int&gt; q;
    q.push(0); visited[0] = true;
    int count = 1;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v = 0; v &lt; n; v++) {
            if (adj[u][v] && !visited[v]) {
                visited[v] = true;
                count++;
                q.push(v);
            }
        }
    }
    return count == n;   // thăm được hết n đỉnh mới coi là liên thông
}

// (3) BFS tìm đường đi cụ thể từ u tới v, dùng parent[] để truy vết
vector&lt;int&gt; bfsPath(int start, int target) {
    vector&lt;int&gt; parent(n, -1);
    vector&lt;bool&gt; visited(n, false);
    queue&lt;int&gt; q;
    q.push(start); visited[start] = true;

    while (!q.empty()) {
        int u = q.front(); q.pop();
        if (u == target) break;
        for (int v = 0; v &lt; n; v++) {
            if (adj[u][v] && !visited[v]) {
                visited[v] = true;
                parent[v] = u;      // ghi nhớ: tới v là từ u mà ra
                q.push(v);
            }
        }
    }

    if (!visited[target]) return {};        // không tới được → rỗng = "not found"

    vector&lt;int&gt; path;
    for (int cur = target; cur != -1; cur = parent[cur]) path.push_back(cur);
    reverse(path.begin(), path.end());      // truy vết ngược rồi đảo lại cho đúng chiều
    return path;
}

int main() {
    cin &gt;&gt; n &gt;&gt; m;
    for (int e = 0; e &lt; m; e++) {
        int i, j; cin &gt;&gt; i &gt;&gt; j;
        adj[i][j] = adj[j][i] = 1;   // đồ thị vô hướng: 2 chiều
    }
    int u, v; cin &gt;&gt; u &gt;&gt; v;

    cout &lt;&lt; (isConnected() ? 1 : 0) &lt;&lt; "\n";

    vector&lt;int&gt; path = bfsPath(u, v);
    if (path.empty()) cout &lt;&lt; "Not found\n";
    else { for (int x : path) cout &lt;&lt; x &lt;&lt; " "; cout &lt;&lt; "\n"; }
    return 0;
}</code></pre>
  </template>

  <template #toi-uu>
    <p><strong>BFS 2 đầu (bidirectional BFS).</strong> Khi đồ thị lớn và cần tìm đường đi ngắn nhất giữa đúng 2 đỉnh cụ thể (không phải tới mọi đỉnh), có thể loang đồng thời từ cả u và v, mỗi bên 1 hàng đợi riêng, và dừng ngay khi 2 vùng đã loang gặp nhau. Cách này giảm số đỉnh phải thăm từ khoảng O(b^d) xuống khoảng O(b^(d/2)) (b là số nhánh trung bình, d là độ dài đường đi) — hữu ích khi n rất lớn, còn với ràng buộc nhỏ như đề này (n≤20) BFS 1 chiều đã đủ nhanh.</p>
    <p><strong>Lưu ý quan trọng</strong>: BFS chỉ đảm bảo tìm đường ngắn nhất khi mọi cạnh có <strong>cùng trọng số</strong> (hoặc không trọng số, coi mỗi cạnh "giá" bằng nhau). Nếu đề đổi thành đồ thị có trọng số khác nhau trên từng cạnh, phải dùng Dijkstra — BFS thuần sẽ ra kết quả sai vì nó chỉ đếm SỐ CẠNH, không cộng trọng số.</p>
    <blockquote><p>📎 <strong>Đỉnh có nhãn ký tự</strong> (đề yêu cầu "mỗi đỉnh lưu một kí tự"): chỉ cần thêm 1 mảng phụ <code>char label[25]</code> song song với chỉ số 0..n-1 — mọi thao tác BFS/liên thông vẫn làm việc HOÀN TOÀN trên chỉ số nguyên như trên, chỉ khi IN KẾT QUẢ mới tra <code>label[đỉnh]</code> để hiển thị đúng ký tự. Tách biệt "chỉ số dùng để tính toán" và "nhãn dùng để hiển thị" là nguyên tắc chung, áp dụng được cho rất nhiều bài khác.</p></blockquote>
  </template>
</WorkedExample>

</LessonPart>

<LessonPart :sid="'dfs-bfs'" part="bai-tap">
  <PracticeSet :items="data.practice" />

  <h4 id="auto-luyen-tap">Luyện tập</h4>
  <ol class="practice">
    <li>Tự chạy tay ví dụ 2 trong đề BFS (n=5, cạnh 0-1,0-2,1-2,2-3, u=1,v=4) bằng bảng như trên trước khi đối chiếu code.
      <div class="idea">Ý tưởng: BFS từ đỉnh 1 sẽ thăm được đúng {1,0,2,3} rồi hàng đợi rỗng — đỉnh 4 không hề xuất hiện trong toàn bộ quá trình vì không có cạnh nào nối tới nó.</div>
    </li>
    <li>Viết thêm hàm <code>addVertex()</code> và <code>addEdge(i,j)</code> tường minh thay vì đọc trực tiếp vào mảng toàn cục.
      <div class="hint">Hướng dẫn: <code>addVertex()</code> chỉ cần tăng biến đếm <code>n</code>; <code>addEdge(i,j)</code> chính là dòng <code>adj[i][j]=adj[j][i]=1</code> đã có, tách thành hàm riêng để code rõ ràng hơn khi chấm điểm từng phần.</div>
    </li>
    <li>Vì sao dùng BFS (không phải DFS) để tìm đường đi trong bài này, dù DFS cũng tìm ra 1 đường đi hợp lệ?
      <div class="hint">Hướng dẫn: đề không yêu cầu đường đi ngắn nhất, nhưng BFS có sẵn tính chất "đường đi tìm được là ngắn nhất về số cạnh" mà không tốn thêm chi phí — nên dùng BFS luôn là lựa chọn an toàn hơn khi không chắc đề có ẩn ý cần đường ngắn nhất hay không.</div>
    </li>
  </ol>

  <h4 id="auto-luyen-tap-chung-phan-bfs-dfs">Luyện tập (chung phần BFS/DFS)</h4>
  <ol class="practice">
    <li>Vẽ 1 đồ thị 6 đỉnh, chạy tay DFS và BFS từ 2 đỉnh khác nhau.
      <div class="idea">Ý tưởng: tự hỏi ở mỗi bước "tôi đang dùng ngăn xếp (đi sâu 1 nhánh trước) hay hàng đợi (đi rộng từng lớp trước)?" — vẽ sai thứ tự thường là do lẫn lộn 2 nguyên tắc này.</div>
    </li>
    <li>Đếm "hòn đảo" trong ma trận 0/1 (1=đất).
      <div class="idea">Ý tưởng: 1 lưới ô vuông cũng là 1 đồ thị — chỉ khác cách biểu diễn cạnh (kề nhau theo 4 hướng thay vì tra ma trận adj[][]). Nhận ra được điều này, bạn không cần học thuật toán mới, chỉ cần "dịch" lại khái niệm kề.</div>
      <div class="hint">Hướng dẫn: dùng đúng code countComponents, chỉ thay điều kiện kề bằng 4 hướng trên/dưới/trái/phải.</div>
    </li>
    <li>Với đồ thị vô hướng, cách kiểm tra chu trình khác: gặp lại đỉnh đã thăm mà không phải cha trực tiếp → có chu trình.
      <div class="idea">Ý tưởng: trong đồ thị vô hướng, mỗi cạnh được "nhìn thấy" 2 lần khi duyệt (từ cả 2 đầu) — nên phải nhớ "tôi vừa đi từ ai tới đây" để không tưởng nhầm việc đi ngược lại cha là 1 chu trình.</div>
    </li>
  </ol>

  <h4 id="auto-luyen-tap-2">Luyện tập</h4>
  <ol class="practice">
    <li>Tự vẽ lại đúng đồ thị 5 đỉnh trong ví dụ đề đỉnh trụ/cạnh cầu, tự tay thử xóa từng đỉnh và từng cạnh một, đối chiếu với bảng chạy tay ở khối tài nguyên tự luyện trước khi xem code.
      <div class="idea">Ý tưởng: cùng 1 đồ thị dùng chung cho cả đỉnh trụ và cạnh cầu — quan sát xem đỉnh trụ và cạnh cầu ở đây có liên quan gì tới nhau không (gợi ý: mọi cạnh cầu luôn có ít nhất 1 đầu mút là đỉnh trụ, trừ trường hợp đồ thị chỉ có đúng 2 đỉnh).</div>
    </li>
  </ol>
</LessonPart>

<LessonPart :sid="'dfs-bfs'" part="leetcode">
  <LeetCodeList :items="data.leetcode" />

<h3 id="cay-khung-duong-di">★ Bài chính thức trong Đề bổ sung — D04014/D04015 Cây khung DFS/BFS &amp; D04010 Đường đi DFS-BFS</h3>

<div class="problem-box">
<span class="pb-title">📋 Nguyên văn đề bài D04014 — Cây khung theo DFS</span>
<p>Cho đồ thị vô hướng G=(V,E). Xây một cây khung với đỉnh u làm gốc bằng thuật toán DFS.</p>
<p><strong>Input:</strong> T (≤20). Mỗi test: N=|V|, M=|E|, u (N≤10³, M≤10⁵) rồi M cặp cạnh a b.</p>
<p><strong>Output:</strong> N-1 cạnh cây khung theo thứ tự duyệt DFS, mỗi cạnh 1 dòng; nếu không có cây khung, in -1.</p>
<table class="formula-table"><tr><th>Input</th><th>Output</th></tr>
<tr><td>2<br>4 4 2<br>1 2<br>1 3<br>2 4<br>3 4<br>4 2 2<br>1 2<br>3 4</td><td>2 1<br>1 3<br>3 4<br>-1</td></tr></table>
<p style="margin-top:0.5rem;">D04015 — Cây khung theo BFS: giống hệt D04014 nhưng chọn cạnh theo thứ tự duyệt BFS thay vì DFS, cùng định dạng input/output.</p>
</div>

<div class="problem-box">
<span class="pb-title">📋 Nguyên văn đề bài D04010 — Đường đi DFS – BFS</span>
<p>Cho đồ thị vô hướng G có N đỉnh, M cạnh. In đường đi từ đỉnh 1 tới các đỉnh khác bằng DFS, và đường đi ngược lại về 1 bằng BFS.</p>
<p><strong>Input:</strong> N, M (N≤1000, M≤2000) rồi M cạnh.</p>
<p><strong>Output:</strong> Với mỗi đỉnh từ 2 đến N: dòng 1 là đường đi 1→đỉnh đó theo DFS, dòng 2 là đường đi đỉnh đó→1 theo BFS. Không có đường đi thì in -1.</p>
<table class="formula-table"><tr><th>Input</th><th>Output</th></tr>
<tr><td>4 4<br>1 2<br>1 3<br>1 4<br>3 4</td><td>1 2<br>2 1<br>1 3<br>3 1<br>1 3 4<br>4 1</td></tr></table>
</div>

<p class="idea-label">🧩 Ý tưởng cốt lõi: cây khung = "dấu vết" của phép duyệt</p>
<p>Khi DFS/BFS chạy trên 1 đồ thị liên thông, mỗi đỉnh (trừ gốc) được thăm đúng 1 lần, và lần thăm đó luôn "đi tới" từ đúng 1 đỉnh cha. Tập hợp toàn bộ các cặp (cha, con) này chính xác là N-1 cạnh — và chúng luôn tạo thành 1 cây liên thông không có chu trình, tức là 1 cây khung hợp lệ.</p>

<pre v-pre><code>// Cây khung theo DFS — CaykhungDFS.cpp
vector&lt;pair&lt;int,int&gt; &gt; ck;
void DFS(int u){
    chuaxet[u] = false;
    for(int v : List[u]){
        if(chuaxet[v]){
            ck.push_back({u, v});   // ghi lại cạnh (cha=u, con=v) TRƯỚC khi đệ quy
            DFS(v);
        }
    }
}
// main: DFS(u_gốc); nếu ck.size() != n-1 thì in -1 (đồ thị không liên thông từ gốc)
// ngược lại in từng cặp trong ck theo đúng thứ tự đã ghi</code></pre>

<p><strong>Chạy tay ví dụ trong đề</strong> (N=4,M=4,u=2, cạnh 1-2,1-3,2-4,3-4): DFS từ 2 → thăm 1 (láng giềng đầu tiên của 2 trong <code>List[2]</code>) → ghi (2,1) → từ 1 thăm 3 → ghi (1,3) → từ 3 thăm 4 → ghi (3,4) → hết. <code>ck = {(2,1),(1,3),(3,4)}</code>, đủ 3 = N-1 cạnh → in đúng 3 dòng khớp đề.</p>

<p class="idea-label">🪜 Chuyển từ DFS sang BFS (D04015) — chỉ đổi đúng 1 chỗ</p>
<pre v-pre><code>// Cây khung theo BFS — chỉ cần đổi đệ quy DFS thành vòng lặp hàng đợi
void BFS(int u){
    queue&lt;int&gt; Q; Q.push(u); chuaxet[u] = false;
    while(!Q.empty()){
        int x = Q.front(); Q.pop();
        for(int v : List[x]){
            if(chuaxet[v]){
                ck.push_back({x, v});   // vẫn ghi (cha=x, con=v) ngay khi phát hiện
                chuaxet[v] = false;
                Q.push(v);
            }
        }
    }
}</code></pre>
<blockquote><p>💡 So sánh 2 đoạn code trên: phần "ghi cạnh vào <code>ck</code>" giống hệt nhau — khác biệt DUY NHẤT là DFS dùng đệ quy (ngăn xếp ẩn của hệ thống) còn BFS dùng <code>queue</code> tường minh. Đây là ví dụ rõ nhất cho thấy DFS và BFS chỉ khác nhau ở "cấu trúc dữ liệu chờ xử lý", không khác nhau ở ý tưởng.</p></blockquote>

<p class="idea-label">🪜 D04010 — Đường đi cụ thể bằng DFS và bằng BFS</p>
<p>Đường đi cây khung ở trên chỉ cho biết QUAN HỆ cha-con, chưa in ra được đường đi từ gốc tới 1 đỉnh cụ thể. Muốn có đường đi, ta dùng đúng mảng <code>truoc[]</code> (parent) rồi truy vết bằng stack:</p>
<pre v-pre><code>int truoc[1005];
void DFS(int u){        // ghi truoc[] khi đi
    chuaxet[u] = false;
    for(int v : List[u])
        if(chuaxet[v]){ truoc[v] = u; DFS(v); }
}
void induongdi(int start, int target){       // truy vết từ target ngược về start
    stack&lt;int&gt; st;
    st.push(target);
    while(st.top() != start) st.push(truoc[st.top()]);   // đi ngược theo truoc[]
    while(!st.empty()){ cout &lt;&lt; st.top() &lt;&lt; " "; st.pop(); }  // pop ra là đúng thứ tự xuôi
}</code></pre>
<p>Với BFS chiều ngược lại (đỉnh khác → về 1), logic <code>truoc[]</code> và <code>induongdi()</code> giữ nguyên hệt như trên — chỉ đổi hàm duyệt từ đệ quy DFS sang vòng lặp <code>queue</code> kiểu BFS y hệt đoạn cây khung BFS ở trên.</p>

<blockquote><p>⚠️ Bẫy trong <code>induongdi()</code>: nếu <code>target</code> không có đường đi tới <code>start</code> (chưa từng được DFS/BFS thăm), <code>truoc[target]</code> vẫn mang giá trị mặc định (0) — <strong>phải kiểm tra <code>chuaxet[target]</code> còn true hay không TRƯỚC khi gọi <code>induongdi()</code></strong>, nếu còn true (chưa thăm được) thì in -1 ngay, đừng gọi hàm truy vết vì sẽ chạy sai hoặc lặp vô hạn.</p></blockquote>

<h3 id="dinh-tru-canh-cau">★ Bài chính thức trong Đề bổ sung — D04005 Đỉnh trụ &amp; D04006 Cạnh cầu</h3>

<div class="problem-box">
<span class="pb-title">📋 Nguyên văn đề bài D04005 — Liệt kê đỉnh trụ</span>
<p>Cho đồ thị vô hướng liên thông G=&lt;V, E&gt; được biểu diễn dưới dạng danh sách cạnh. Hãy đưa ra tất cả các đỉnh trụ (articulation points) của đồ thị.</p>
<p><strong>Input:</strong> T. Mỗi test: |V|, |E| rồi các cặp u v.</p>
<p><strong>Output:</strong> Danh sách đỉnh trụ mỗi test, theo thứ tự tăng dần.</p>
<table class="formula-table"><tr><th>Input</th><th>Output</th></tr>
<tr><td>1<br>5 5<br>1 2<br>1 3<br>2 3<br>2 5<br>3 4</td><td>2 3</td></tr></table>
</div>

<div class="problem-box">
<span class="pb-title">📋 Nguyên văn đề bài D04006 — Liệt kê cạnh cầu</span>
<p>Cho đồ thị vô hướng liên thông G=&lt;V, E&gt; được biểu diễn dưới dạng danh sách cạnh. Hãy đưa ra tất cả các cạnh cầu (bridges), in theo thứ tự từ điển "a b" với a&lt;b.</p>
<p><strong>Input:</strong> T. Mỗi test: |V|, |E| rồi các cặp u v.</p>
<p><strong>Output:</strong> Danh sách cạnh cầu mỗi test.</p>
<table class="formula-table"><tr><th>Input</th><th>Output</th></tr>
<tr><td>1<br>5 5<br>1 2<br>1 3<br>2 3<br>2 5<br>3 4</td><td>2 5 3 4</td></tr></table>
</div>

<p class="idea-label">🧩 Ý tưởng cốt lõi: "thử xóa rồi kiểm tra liên thông"</p>
<p>Với N nhỏ (≤10³), cách an toàn nhất để thi là làm đúng theo định nghĩa: lần lượt giả sử xóa từng đỉnh (hoặc từng cạnh), chạy lại DFS xem đồ thị có bị rời ra hay không.</p>

<pre v-pre><code>// D04005 — Liệt kê đỉnh trụ (Dinhtru.cpp)
bool chuaxet[1005];
void DFS(int u){
    chuaxet[u] = false;
    for(int v : List[u]) if(chuaxet[v]) DFS(v);
}
void dinhtru(){
    for(int u = 1; u &lt;= n; u++){
        chuaxet[u] = false;                 // "xóa tạm" đỉnh u
        if(u == 1) DFS(2); else DFS(1);     // DFS từ 1 đỉnh còn lại bất kỳ khác u
        bool check = false;
        for(int i = 1; i &lt;= n; i++) if(chuaxet[i]) check = true;   // còn đỉnh chưa tới được?
        if(check) cout &lt;&lt; u &lt;&lt; " ";         // rời rạc thêm → u là đỉnh trụ
        memset(chuaxet, true, sizeof(chuaxet));   // reset lại cho vòng lặp kế tiếp — BẮT BUỘC
    }
}</code></pre>

<p><strong>Chạy tay ví dụ trong đề</strong> (5 đỉnh, cạnh 1-2,1-3,2-3,2-5,3-4): thử xóa đỉnh 2 → DFS từ 1 chỉ thăm được {1,3,4}, còn đỉnh 5 bị cô lập (vì 5 chỉ nối với 2 duy nhất) → 2 là đỉnh trụ. Thử xóa đỉnh 3 → DFS từ 1 chỉ thăm {1,2,5}, đỉnh 4 bị cô lập (4 chỉ nối với 3) → 3 là đỉnh trụ. Các đỉnh 1,4,5 xóa đi vẫn không làm rời đồ thị → kết quả <strong>"2 3"</strong>, khớp đề.</p>

<pre v-pre><code>// D04006 — Liệt kê cạnh cầu (Canhcau.cpp)
void canhcau(){
    for(int i = 1; i &lt;= n; i++){
        for(int u = 0; u &lt; (int)List[i].size(); u++){
            int j = List[i][u];
            List[i].erase(List[i].begin() + u);      // "xóa tạm" cạnh (i,j)
            DFS(i);
            bool check = false;
            for(int k = 1; k &lt;= n; k++) if(chuaxet[k]) check = true;
            if(check &amp;&amp; i &lt; j) cout &lt;&lt; i &lt;&lt; " " &lt;&lt; j &lt;&lt; " ";   // in i&lt;j để tránh trùng cả 2 chiều
            List[i].insert(List[i].begin() + u, j);  // chèn lại đúng chỗ cũ — BẮT BUỘC
            memset(chuaxet, true, sizeof(chuaxet));
        }
    }
}</code></pre>
<p>Điều kiện <code>i &lt; j</code> ở đây không phải để đúng thuật toán, mà chỉ để <strong>không in cạnh (j,i) trùng lặp</strong> khi vòng lặp ngoài chạy tới đỉnh j và gặp lại đúng cạnh đó theo chiều ngược.</p>

<blockquote><p>📎 <strong>Vì sao cách này chấp nhận được dù có vẻ "chạy lại DFS rất nhiều lần"</strong>? Với N≤10³, độ phức tạp O(N·(N+M)) cho đỉnh trụ và O(M·(N+M)) cho cạnh cầu vẫn đủ nhanh trong giới hạn thời gian thi. Thuật toán tối ưu hơn (Tarjan, dùng <code>low[]</code>/<code>num[]</code>, chỉ 1 lần DFS duy nhất) tồn tại nhưng phức tạp hơn nhiều để nhớ chính xác trong phòng thi — chỉ nên học thêm nếu còn thời gian sau khi đã chắc cách "thử xóa" này.</p></blockquote>

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
import data from '../data/lessons/dfs-bfs.js'
import { initDfsBfsWidgets } from '../widgets/dfs-bfs.js'

defineProps({ active: Boolean })

onMounted(() => {
  initDfsBfsWidgets()
})
</script>
