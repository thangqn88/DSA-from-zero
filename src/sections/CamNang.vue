<template>
<section id="cam-nang" class="day-section" data-sid="cam-nang" v-show="active">

<h2>Vì sao cẩm nang này khác với phần lý thuyết ở dưới?</h2>
<p>Phần lý thuyết theo nhóm kiến thức bên dưới dạy <strong>thuật toán</strong>. Cẩm nang này dạy <strong>quy trình suy nghĩ</strong> — tức là làm sao đi từ "đọc đề xong không biết bắt đầu từ đâu" tới "biết chính xác cần dùng gì và viết như thế nào". Với mỗi bài, mình sẽ hỏi lại đúng những câu bạn nên tự hỏi mình khi ngồi vào phòng thi, thay vì đưa thẳng đáp án.</p>

<h3 id="auto-lich-uu-tien-5-ngay">Lịch ưu tiên 5 ngày</h3>
<p>Bạn chỉ còn 5 ngày (8/8 để nghỉ ngơi, không học mới). Với 9 bài, đừng cố học đều tay — <strong>Bài 8 và Bài 9 có thang điểm chi tiết theo từng ý nhỏ (mỗi bài 7 điểm)</strong>, cao hơn hẳn các bài còn lại — nên dồn nhiều thời gian nhất vào đó. Thứ tự dưới đây ưu tiên: <em>điểm cao trước, bài dễ ăn điểm trước, bài khó/ít điểm để cuối cùng.</em></p>

<table class="formula-table">
  <tr><th>Ngày</th><th>Bài cần làm chủ</th><th>Vì sao</th></tr>
  <tr><td><strong>T2 3/8</strong> (hôm nay)</td><td><a href="#guide-bai6">Bài 6</a> + <a href="#guide-bai5">Bài 5</a></td><td>2 bài dễ nhất trong đề — thắng nhanh để lấy tinh thần, thao tác đơn giản (stack, xử lý xâu)</td></tr>
  <tr><td><strong>T3 4/8</strong></td><td><a href="#guide-bai3">Bài 3</a></td><td>Tham lam kinh điển, chỉ 1 bước tư duy chính (sort theo finish)</td></tr>
  <tr><td><strong>T4 5/8</strong></td><td><a href="#guide-bai9">Bài 9</a></td><td><strong>7 điểm</strong> — nhiều ý nhỏ nhưng đều dùng lại đúng 1 kỹ thuật (BFS), ăn điểm từng phần dễ</td></tr>
  <tr><td><strong>T5 6/8</strong></td><td><a href="#guide-bai78">Bài 7 + Bài 8 (ý a→d)</a></td><td>Bài 7 gần như miễn phí nếu làm được Bài 8 ý a-d (cài cây + chèn + duyệt)</td></tr>
  <tr><td><strong>T6 7/8</strong></td><td><a href="#guide-bai78">Bài 8 (ý e, f)</a> + ôn lại toàn bộ</td><td>Ý xóa node (e) là phần khó nhất cả đề nhưng chiếm riêng 2/7 điểm của bài — xứng đáng dành nguyên buổi. Nếu còn giờ mới quay lại <a href="#guide-bai12">Bài 1, 2</a>, <a href="#guide-bai4">Bài 4</a></td></tr>
</table>

<blockquote><p>💡 <strong>Nguyên tắc khi thời gian gấp</strong>: thà làm chắc 6/9 bài còn hơn làm dở 9/9 bài. Nếu tới 7/8 vẫn chưa vững Bài 8 ý e (xóa node), hãy chấp nhận bỏ Bài 1, 2, 4 để dồn hết cho ý đó — vì riêng ý e đã bằng hoặc hơn điểm của 2-3 bài nhỏ cộng lại.</p></blockquote>

<h3 id="guide-bai6">Bài 6 — Kiểm tra dãy ngoặc hợp lệ</h3>
<p class="idea-label">🗣️ Đề thực sự hỏi gì (nói lại bằng lời của bạn)</p>
<p>Cho 1 xâu chỉ toàn dấu ngoặc 3 loại. Hỏi: ngoặc mở và ngoặc đóng có "khớp cặp" đúng thứ tự lồng nhau không — giống việc kiểm tra 1 câu văn có ngoặc kép mở mà quên đóng, hay đóng nhầm loại ngoặc.</p>
<p class="idea-label">🔎 Nhận diện dạng bài → thuật toán</p>
<p>Từ khóa cần bắt: <strong>"khớp cặp", "lồng nhau", "mở trước đóng sau"</strong> → đây luôn là dấu hiệu của <strong>Ngăn xếp (Stack)</strong>. Vì sao Stack mà không phải cấu trúc khác? Vì ngoặc mở gần nhất luôn phải đóng trước — đúng tính chất "vào sau ra trước" (LIFO) của Stack. Xem lại lý thuyết Stack ở <a href="#ngan-xep-hang-doi">phần Ngăn xếp</a>.</p>
<p class="idea-label">🪜 Quy trình suy nghĩ từng bước (tự hỏi mình, đừng nhìn code)</p>
<ol>
  <li>Duyệt qua xâu từng ký tự một. Gặp ký tự MỞ (<code>( [ {</code>) — tôi làm gì với Stack? <em>→ đẩy nó vào Stack, vì tôi cần "nhớ" nó để đối chiếu sau.</em></li>
  <li>Gặp ký tự ĐÓNG (<code>) ] }</code>) — tôi cần kiểm tra 2 điều gì? <em>→ (a) Stack có đang rỗng không (rỗng nghĩa là đóng mà không có gì để đóng cùng → sai ngay); (b) ký tự ở đỉnh Stack có đúng loại mở tương ứng không.</em></li>
  <li>Nếu cả 2 điều trên đều ổn — tôi làm gì với đỉnh Stack? <em>→ pop nó ra, vì cặp này đã khớp xong, không cần nhớ nữa.</em></li>
  <li>Sau khi duyệt hết xâu — điều kiện cuối cùng để kết luận "hợp lệ" là gì? <em>→ Stack phải RỖNG. Nếu còn sót ký tự mở chưa đóng, Stack sẽ còn phần tử.</em></li>
</ol>
<blockquote><p>⚠️ <strong>2 bẫy hay mất điểm nhất</strong>: (1) quên kiểm tra Stack rỗng trước khi lấy đỉnh ra so sánh → chương trình crash hoặc đọc rác; (2) chỉ kiểm tra "Stack rỗng cuối cùng chưa" mà quên rằng Stack còn phải rỗng đúng nghĩa — không thể kết luận sớm giữa chừng.</p></blockquote>
<p>👉 Code đầy đủ + chạy tay đúng ví dụ trong đề: xem <a href="#bai6-ngoac-hop-le">chi tiết ở phần Ngăn xếp</a>.</p>
<p class="idea-label">⚡ Luyện nhanh để nhớ lâu</p>
<p>Tự cầm giấy bút, kẻ 1 cột là "Stack hiện tại", rồi tự tay chạy qua xâu <code>"{[()]}"</code> (hợp lệ) và <code>"([)]"</code> (sai) từng ký tự một trước khi mở code ra đối chiếu. Nếu tự chạy tay đúng cả 2 ví dụ mà không cần nhìn gợi ý, bạn đã chắc bài này.</p>

<h3 id="guide-bai5">Bài 5 — Đảo ngược từng từ trong xâu</h3>
<p class="idea-label">🗣️ Đề thực sự hỏi gì</p>
<p>Đọc kỹ: <strong>đảo ngược TỪNG TỪ</strong>, không phải đảo thứ tự các từ. "Hoc thuat toan" → "coH tauht naot" (mỗi từ tự lộn ngược, thứ tự từ giữ nguyên). Đây là bẫy đọc-hiểu-đề nhiều bạn nhầm nhất trong cả 9 bài.</p>
<p class="idea-label">🔎 Nhận diện dạng bài → thuật toán</p>
<p>Không cần thuật toán phức tạp — chỉ cần kỹ thuật <strong>2 con trỏ đầu/cuối tiến vào nhau</strong> để đảo ngược 1 đoạn ký tự, áp dụng riêng cho từng từ. Đây là kỹ thuật nền bạn đã quen khi đảo ngược mảng số.</p>
<p class="idea-label">🪜 Quy trình suy nghĩ từng bước</p>
<ol>
  <li>Làm sao biết đâu là ranh giới 1 từ? <em>→ Một từ là đoạn ký tự liên tục KHÔNG chứa khoảng trắng, nằm giữa 2 khoảng trắng (hoặc đầu/cuối xâu).</em></li>
  <li>Tìm ra 1 từ (biết vị trí bắt đầu <code>start</code> và kết thúc <code>i-1</code>) — tôi làm gì với riêng đoạn đó? <em>→ Đặt 2 con trỏ l=start, r=i-1, đổi chỗ dần vào giữa cho tới khi l≥r.</em></li>
  <li>Đảo xong 1 từ rồi thì làm tiếp gì? <em>→ Nhảy qua khoảng trắng, tìm từ tiếp theo, lặp lại bước 2 — KHÔNG động vào thứ tự các từ.</em></li>
</ol>
<blockquote><p>⚠️ Bẫy về đọc input: mỗi test là <strong>1 dòng có chứa nhiều từ</strong> (có khoảng trắng) → phải dùng <code>getline()</code>, không dùng <code>cin &gt;&gt;</code> (chỉ đọc tới khoảng trắng đầu tiên, làm mất các từ sau).</p></blockquote>
<p>👉 Code đầy đủ + chạy tay: xem <a href="#bai5-reverse-words">chi tiết ở phần Ngăn xếp</a>.</p>

<h3 id="guide-bai3">Bài 3 — Activity Selection</h3>
<p class="idea-label">🗣️ Đề thực sự hỏi gì</p>
<p>Có N công việc, mỗi công việc chiếm 1 khoảng thời gian [S,F]. Chỉ có 1 người/1 máy làm được tại 1 thời điểm. Hỏi: xếp được <strong>nhiều công việc nhất</strong> là bao nhiêu, miễn không công việc nào chồng giờ với công việc khác.</p>
<p class="idea-label">🔎 Nhận diện dạng bài → thuật toán</p>
<p>Từ khóa "nhiều nhất có thể", "không chồng chéo", "1 tài nguyên duy nhất" → đây là dấu hiệu kinh điển của <strong>Tham lam (Greedy)</strong>. Xem lại lý thuyết ở <a href="#tham-lam">phần Tham lam</a>.</p>
<p class="idea-label">🪜 Quy trình suy nghĩ từng bước</p>
<ol>
  <li>Tại sao lại chọn công việc <strong>kết thúc sớm nhất</strong> trước, chứ không phải bắt đầu sớm nhất hay ngắn nhất? <em>→ Công việc kết thúc càng sớm càng "giải phóng" tài nguyên sớm, để lại nhiều chỗ trống nhất cho các công việc sau — đây chính là lý do cần chứng minh nếu đề hỏi lý thuyết.</em></li>
  <li>Bước 1 luôn phải làm gì trước khi chọn? <em>→ Sắp xếp toàn bộ công việc theo thời gian kết thúc F tăng dần.</em></li>
  <li>Duyệt qua từng công việc đã sắp — điều kiện gì để CHỌN công việc này? <em>→ Thời gian bắt đầu của nó phải ≥ thời gian kết thúc của công việc được chọn gần nhất (<code>lastFinish</code>).</em></li>
  <li>Nếu được chọn thì cập nhật gì? <em>→ count+1, và lastFinish = F của công việc vừa chọn.</em></li>
</ol>
<blockquote><p>⚠️ Bẫy: sort theo <strong>thời gian bắt đầu</strong> thay vì <strong>thời gian kết thúc</strong> — nhìn qua tưởng hợp lý nhưng sẽ ra kết quả sai ở nhiều test case.</p></blockquote>
<p>👉 Code đầy đủ đúng định dạng I/O của đề + chạy tay: xem <a href="#tham-lam">chi tiết ở phần Tham lam</a>.</p>

<h3 id="guide-bai9">Bài 9 — Đồ thị ma trận kề, liên thông, đường đi BFS (7 điểm)</h3>
<p class="idea-label">🗣️ Đề thực sự hỏi gì</p>
<p>Bài này thực ra là <strong>5 việc nhỏ nối tiếp nhau</strong>, không phải 1 bài to: (1) lưu đồ thị bằng ma trận, (2) thêm đỉnh, (3) thêm cạnh, (4) kiểm tra "đi từ đỉnh bất kỳ có tới được mọi đỉnh khác không", (5) tìm đường đi cụ thể giữa 2 đỉnh. Vì có breakdown điểm rõ ràng theo từng ý, <strong>bạn có thể ăn điểm từng phần</strong> dù chưa làm trọn vẹn ý cuối.</p>
<p class="idea-label">🔎 Nhận diện dạng bài → thuật toán</p>
<p>"Kiểm tra tới được mọi đỉnh" và "tìm đường đi giữa 2 đỉnh" đều là bài toán <strong>duyệt đồ thị</strong> — đề yêu cầu rõ dùng BFS. Xem lại lý thuyết BFS ở <a href="#dfs-bfs">phần BFS/DFS</a> trước khi làm bài này.</p>
<p class="idea-label">🪜 Quy trình suy nghĩ từng bước</p>
<ol>
  <li><strong>Ý cài đặt ma trận</strong>: vì sao dùng ma trận <code>adj[i][j]</code> mà không dùng danh sách kề? <em>→ n≤20 rất nhỏ, ma trận đơn giản hơn để code nhanh trong lúc thi, dù tốn bộ nhớ hơn danh sách kề.</em> Thêm cạnh (i,j) nghĩa là gán gì? <em>→ <code>adj[i][j]=adj[j][i]=1</code> (đồ thị vô hướng, gán cả 2 chiều).</em></li>
  <li><strong>Ý kiểm tra liên thông</strong>: làm sao biết đồ thị liên thông mà không cần kiểm tra từng cặp đỉnh? <em>→ Chạy BFS/DFS 1 lần duy nhất từ đỉnh 0, đếm số đỉnh thăm được. Nếu đếm được đúng bằng n → liên thông. Vì sao chỉ cần xuất phát từ 1 đỉnh? Vì đồ thị vô hướng: nếu 0 tới được mọi đỉnh thì mọi đỉnh cũng tới được nhau qua đường ngược lại.</em></li>
  <li><strong>Ý tìm đường đi u→v</strong>: BFS thông thường chỉ trả lời "có tới được không". Làm sao "nhớ" lại được đường đi cụ thể? <em>→ Mỗi lần BFS thăm 1 đỉnh mới <code>v</code> từ đỉnh <code>u</code>, lưu lại <code>parent[v] = u</code>. Sau khi BFS xong, "đi ngược" từ v theo parent[] tới khi về start, rồi đảo ngược mảng đó lại đúng chiều.</em></li>
  <li>Nếu BFS chạy xong mà chưa từng thăm tới <code>v</code> thì kết luận gì? <em>→ In "Not found" — nghĩa là không có đường đi.</em></li>
</ol>
<blockquote><p>⚠️ Bẫy: quên đánh dấu <code>visited</code> ngay khi ĐẨY vào hàng đợi (chứ không phải khi lấy ra xử lý) — nếu đánh dấu trễ, 1 đỉnh có thể bị đẩy vào hàng đợi nhiều lần, sai cả kết quả liên thông lẫn đường đi.</p></blockquote>
<p>👉 Code đầy đủ (đủ cả 5 ý) + chạy tay khớp đúng cả 2 ví dụ trong đề: xem <a href="#bai9-graph-matrix">chi tiết ở phần BFS/DFS</a>.</p>
<p class="idea-label">⚡ Luyện nhanh</p>
<p>Trước khi code, tự vẽ đồ thị của ví dụ 1 trong đề ra giấy (4 đỉnh, 4 cạnh), tự chạy tay BFS từ đỉnh 1, ghi lại parent[] của từng đỉnh — nếu tự ra đúng đường đi "1 2 3" mà không cần xem gợi ý, bạn đã hiểu chắc bài này.</p>

<h3 id="guide-bai78">Bài 7 &amp; Bài 8 — Xây dựng, duyệt và xóa trên BST (Bài 8: 7 điểm)</h3>
<p class="idea-label">🗣️ Đề thực sự hỏi gì</p>
<p>Bài 7 và Bài 8 dùng <strong>chung 1 cây</strong> — Bài 7 chỉ là "Bài 8 nhưng bỏ bớt phần xóa". Vì vậy học kỹ Bài 8 là coi như làm được cả 2. Đề chia rõ 6 ý nhỏ: (a) cài cây bằng con trỏ, (b) chèn 1 khóa, (c) xây cây từ n số, (d) duyệt sau (Post Order), (e) xóa 1 khóa bằng phương pháp copy, (f) duyệt trước (Pre Order) sau khi xóa.</p>
<p class="idea-label">🔎 Nhận diện dạng bài → thuật toán</p>
<p>Đây thuần túy là <strong>Cây nhị phân tìm kiếm (BST)</strong> — không cần thuật toán nào mới ngoài các thao tác cơ bản. Xem lại lý thuyết chèn/duyệt ở <a href="#cay-nhi-phan-bst">phần Cây nhị phân/BST</a> trước khi làm ý a-d, phần xóa mới cần đọc kỹ thêm.</p>
<p class="idea-label">🪜 Quy trình suy nghĩ — Ý a→d (xây cây, duyệt)</p>
<ol>
  <li>Cài bằng con trỏ nghĩa là gì? <em>→ struct Node có 2 con trỏ <code>left</code>, <code>right</code> trỏ tới node con, thay vì dùng mảng chỉ số như một số cách cài khác.</em></li>
  <li>Chèn 1 khóa x — quy tắc quyết định đi trái hay phải ở mỗi bước là gì? <em>→ x nhỏ hơn giá trị node hiện tại → đi trái; lớn hơn → đi phải; tới khi gặp chỗ trống (null) thì tạo node mới ở đó.</em></li>
  <li>Xây cây từ mảng n số — có cần sắp xếp mảng trước khi chèn không? <em>→ KHÔNG. Chèn đúng theo thứ tự đề cho, vì thứ tự chèn quyết định hình dạng cây — đây là điểm dễ nhầm nhất.</em></li>
  <li>Post Order duyệt theo thứ tự nào? <em>→ Trái → Phải → Gốc (đệ quy con trái trước, con phải sau, in gốc cuối cùng).</em></li>
</ol>
<p class="idea-label">🪜 Quy trình suy nghĩ — Ý e (xóa bằng phương pháp copy, phần khó nhất)</p>
<ol>
  <li>Trước khi code, tự hỏi: node cần xóa thuộc 1 trong <strong>3 tình huống</strong> nào? <em>→ (1) Không có con nào (lá); (2) chỉ có 1 con; (3) có đủ 2 con.</em></li>
  <li>Tình huống (1) và (2) xử lý thế nào? <em>→ (1) xóa thẳng; (2) cho con duy nhất "lên thay" đúng vị trí node bị xóa.</em></li>
  <li>Tình huống (3) — vì sao không thể để 1 trong 2 con "lên thay" trực tiếp? <em>→ Vì như vậy sẽ phá vỡ tính chất BST (con còn lại không còn đúng quan hệ nhỏ hơn/lớn hơn với các node khác).</em></li>
  <li>Vậy cách đúng là gì? <em>→ Tìm "người kế tiếp theo thứ tự" (giá trị nhỏ nhất bên nhánh phải — đi phải 1 bước rồi đi trái tới cùng), COPY giá trị đó lên node đang xóa, rồi xóa người kế tiếp đó ở vị trí gốc của nó (người này chắc chắn chỉ có tối đa 1 con, nên việc xóa nó quay lại thành tình huống (1) hoặc (2) đơn giản hơn).</em></li>
</ol>
<blockquote><p>⚠️ Bẫy hay gặp nhất ở ý e: xóa nhầm node bằng cách gán null trực tiếp mà không xét đủ 3 tình huống — làm mất luôn cả nhánh con của node đó. Luôn viết đủ 3 nhánh <code>if</code> tách biệt, đừng gộp tắt.</p></blockquote>
<p>👉 Code đầy đủ (đủ cả a→f) + chạy tay khớp đúng ví dụ trong đề (xóa khóa 1, ra đúng Preorder "4 2 3 6"): xem <a href="#bai7-8-bst-build-delete">chi tiết ở phần Cây nhị phân/BST</a>.</p>
<p class="idea-label">⚡ Luyện nhanh cho ý e</p>
<p>Tự vẽ 1 cây BST bất kỳ có ít nhất 1 node đủ 2 con, tự tay xóa node đó trên giấy theo đúng 4 câu hỏi ở trên trước khi viết code — nếu tự vẽ đúng cây kết quả, ý e coi như đã nắm.</p>

<h3 id="guide-bai12">Bài 1 &amp; Bài 2 — Hoán vị kế tiếp &amp; N-Queens (làm nếu còn thời gian)</h3>
<p>Hai bài này không có breakdown điểm chi tiết như Bài 8, 9 — ưu tiên thấp hơn nếu thời gian gấp. Quy trình suy nghĩ:</p>
<ul>
  <li><strong>Bài 1</strong>: tự hỏi "đoạn cuối xâu đang giảm dần tới đâu?" → đó là điểm cần sửa. Chi tiết: <a href="#bai1-hoanvi-ke-tiep">phần Tổ hợp</a>.</li>
  <li><strong>Bài 2</strong>: tự hỏi "đặt quân hậu này có bị quân nào trước ăn không — cùng cột? cùng đường chéo?" → dùng đúng khung Quay lui đã học. Chi tiết: <a href="#bai2-nqueens">phần Quay lui</a>.</li>
</ul>

<h3 id="guide-bai4">Bài 4 — LCS (làm nếu còn thời gian)</h3>
<p>Đây là bài <strong>khó nhận diện nhất</strong> nếu chưa quen QHĐ 2 chiều. Câu hỏi mấu chốt cần tự trả lời: "2 ký tự đang xét trùng nhau hay không?" — trùng thì cộng 1 vào kết quả của phần trước đó (chéo lên-trái); không trùng thì lấy max của 2 hướng còn lại (trên, trái). Chi tiết: <a href="#bai4-lcs">phần QHĐ</a>.</p>

<div class="group-divider" style="margin-top:1.5rem;">📩 Cẩm nang cho đề bổ sung (đồ thị nâng cao + cây nhị phân)</div>

<h3 id="guide-baiBS123">Bài D04012, D04007, D04004 — Ba bài toán DSU: Kết bạn / Chu trình / Đếm thành phần liên thông</h3>
<p class="idea-label">🗣️ Đề thực sự hỏi gì</p>
<p>Cả 3 bài đều cho một danh sách cạnh vô hướng và hỏi về "ai thuộc nhóm nào" — chỉ khác nhau ở câu hỏi cuối cùng: D04012 hỏi <strong>nhóm lớn nhất có bao nhiêu người</strong>, D04007 hỏi <strong>có chu trình không</strong>, D04004 hỏi <strong>có bao nhiêu nhóm</strong>. Vì bản chất giống hệt nhau, học 1 lần là làm được cả 3.</p>
<p class="idea-label">🔎 Nhận diện dạng bài → thuật toán</p>
<p>Từ khóa "bạn của bạn cũng là bạn", "gộp nhóm dần theo từng cạnh", "hỏi về liên thông mà đồ thị lớn (N,M ≤ 100.000)" → đây là dấu hiệu kinh điển của <strong>DSU (Disjoint Set Union)</strong>, không phải BFS/DFS (BFS/DFS tốn công build lại danh sách kề và duyệt lại từ đầu mỗi khi cần biết liên thông, còn DSU trả lời tức thời khi cạnh được thêm dần). Xem lại lý thuyết ở <a href="#dsu">phần DSU</a> trước khi làm.</p>
<p class="idea-label">🪜 Quy trình suy nghĩ từng bước</p>
<ol>
  <li><strong>Phần dùng chung cho cả 3 bài:</strong> khởi tạo <code>parent[i]=i, sz[i]=1</code> cho mọi sinh viên; với mỗi cặp (u,v) đọc vào, tìm gốc <code>Find(u)</code>, <code>Find(v)</code>.</li>
  <li><strong>D04012 (Kết bạn)</strong>: sau mỗi lần gộp 2 nhóm, nhóm mới có kích thước bao nhiêu? <em>→ <code>sz[gốc mới] = sz[a] + sz[b]</code>. Đáp án là giá trị lớn nhất từng đạt được của <code>sz[]</code> qua toàn bộ quá trình — không phải chỉ nhìn <code>sz[]</code> ở cuối, vì đề chỉ hỏi "nhiều nhất trong 1 nhóm bạn" tại một thời điểm bất kỳ, nên cập nhật <code>ans = max(ans, sz[gốc mới])</code> ngay sau mỗi Union.</em></li>
  <li><strong>D04007 (chu trình)</strong>: khi nào 1 cạnh (u,v) tạo ra chu trình? <em>→ Khi <code>Find(u) == Find(v)</code> TRƯỚC khi gộp — nghĩa là u và v đã cùng nhóm rồi mà vẫn có thêm 1 cạnh nối chúng, cạnh đó chính là cạnh "thừa" tạo vòng lặp. Nếu gặp dù chỉ 1 lần trong toàn bộ M cạnh, in "YES" (không cần Union nữa vì Union khi cùng gốc chỉ là no-op).</em></li>
  <li><strong>D04004 (đếm TPLT)</strong>: sau khi Union hết M cạnh, làm sao biết có bao nhiêu nhóm? <em>→ Đếm số đỉnh <code>i</code> mà <code>Find(i) == i</code> (tức nó là gốc của chính nó) — mỗi "gốc" đại diện đúng 1 nhóm liên thông.</em></li>
</ol>
<blockquote><p>⚠️ Bẫy chung cả 3 bài: quên gọi <code>Find()</code> (có nén đường) mà so sánh thẳng <code>parent[u]==parent[v]</code> — sai vì <code>parent[u]</code> chỉ là cha trực tiếp, chưa chắc là gốc thật sự.</p></blockquote>
<p>👉 Code đầy đủ (đủ cả 3 biến thể, chỉ khác vài dòng) + chạy tay: xem <a href="#dsu-3bai">chi tiết ở phần DSU</a>.</p>

<h3 id="guide-baiBS1011">Bài D04005, D04006 — Đỉnh trụ &amp; Cạnh cầu</h3>
<p class="idea-label">🗣️ Đề thực sự hỏi gì</p>
<p>Đỉnh trụ (articulation point): xóa đỉnh đó đi thì đồ thị bị rời rạc thêm. Cạnh cầu (bridge): xóa cạnh đó đi thì đồ thị bị rời rạc thêm. Cả hai đều hỏi "cái gì đang giữ đồ thị liền lại".</p>
<p class="idea-label">🔎 Nhận diện dạng bài → thuật toán</p>
<p>Với ràng buộc nhỏ (N≤10³) trong đề này, cách <strong>dễ nghĩ và dễ code nhất trong lúc thi</strong> là làm trực tiếp theo đúng định nghĩa: <strong>thử xóa từng đỉnh/cạnh một, chạy lại DFS xem đồ thị còn liên thông không</strong> — không cần thuật toán Tarjan (low-link) phức tạp hơn, vì Tarjan chỉ cần thiết khi N, M rất lớn.</p>
<p class="idea-label">🪜 Quy trình suy nghĩ — Đỉnh trụ (Dinhtru.cpp)</p>
<ol>
  <li>Với mỗi đỉnh <code>u</code> từ 1 đến N, ta "xóa" nó bằng cách nào mà không cần dựng lại đồ thị? <em>→ Đánh dấu <code>chuaxet[u] = false</code> ngay từ đầu (coi như đã thăm rồi, DFS sẽ tự động bỏ qua nó).</em></li>
  <li>Sau khi "xóa" u, kiểm tra liên thông bằng cách nào? <em>→ Chạy DFS từ 1 đỉnh bất kỳ còn lại (nếu u=1 thì bắt đầu từ đỉnh 2, ngược lại bắt đầu từ đỉnh 1).</em></li>
  <li>Kết luận u là đỉnh trụ khi nào? <em>→ Sau DFS, nếu vẫn còn ít nhất 1 đỉnh khác (khác u) mà <code>chuaxet[]</code> vẫn true (chưa thăm được) → đồ thị bị rời rạc khi thiếu u → u là đỉnh trụ.</em></li>
  <li>Sau mỗi lần thử, nhớ làm gì trước khi thử đỉnh tiếp theo? <em>→ <code>memset(chuaxet, true, ...)</code> để reset lại trạng thái "chưa thăm" cho vòng lặp kế tiếp.</em></li>
</ol>
<p class="idea-label">🪜 Quy trình suy nghĩ — Cạnh cầu (Canhcau.cpp)</p>
<ol>
  <li>Ý tưởng giống hệt đỉnh trụ nhưng xóa <strong>cạnh</strong> thay vì đỉnh — làm sao "xóa tạm" 1 cạnh (i,j) trong danh sách kề? <em>→ Tìm vị trí <code>j</code> trong <code>List[i]</code> rồi <code>erase</code> nó ra (cạnh vô hướng nên chỉ cần xóa 1 chiều là đủ để DFS không đi qua được, vì DFS xuất phát từ i).</em></li>
  <li>Sau khi xóa cạnh, kiểm tra gì? <em>→ DFS từ i, nếu tồn tại ít nhất 1 đỉnh khác chưa thăm được → cạnh (i,j) là cạnh cầu.</em></li>
  <li>Xóa cạnh xong kiểm tra rồi, bước cuối cùng bắt buộc phải làm gì để không phá hỏng đồ thị cho lần thử tiếp theo? <em>→ <code>insert</code> lại đúng chỗ cũ (dùng lại vị trí <code>u</code> vừa erase) — nếu quên bước này, các lần thử cạnh sau sẽ chạy trên 1 đồ thị đã bị mất cạnh oan.</em></li>
</ol>
<blockquote><p>⚠️ Bẫy chung: quên reset <code>chuaxet[]</code> hoặc quên chèn lại cạnh/đỉnh đã "xóa tạm" trước khi thử phần tử tiếp theo — lỗi này rất khó nhận ra vì chương trình vẫn chạy, chỉ ra sai kết quả từ phần tử thứ 2 trở đi.</p></blockquote>
<p>👉 Code đầy đủ + chạy tay ví dụ trong đề: xem <a href="#dinh-tru-canh-cau">chi tiết ở phần DFS/BFS</a>.</p>

<h3 id="guide-baiBS567">Bài D04014, D04015, D04010 — Cây khung DFS/BFS &amp; Đường đi DFS-BFS</h3>
<p class="idea-label">🗣️ Đề thực sự hỏi gì</p>
<p>Cây khung (spanning tree): chọn ra đúng N-1 cạnh từ đồ thị sao cho N đỉnh vẫn nối liền nhau, không cạnh nào dư. Đường đi DFS-BFS: chỉ đơn giản là in ra đường đi cụ thể (không chỉ độ dài) giữa 2 đỉnh bằng 2 thuật toán khác nhau.</p>
<p class="idea-label">🔎 Nhận diện dạng bài → thuật toán</p>
<p>Cả 3 bài đều dựa trên 1 quan sát chung: <strong>mỗi lần DFS/BFS "đi" từ đỉnh <code>u</code> sang đỉnh mới <code>v</code> chưa thăm, cặp (u,v) đó chính là 1 cạnh của cây khung</strong> — cây khung không gì khác hơn là "dấu vết" của phép duyệt. Xem lại lý thuyết DFS/BFS ở <a href="#dfs-bfs">phần DFS/BFS</a>.</p>
<p class="idea-label">🪜 Quy trình suy nghĩ — Cây khung (CaykhungDFS.cpp)</p>
<ol>
  <li>Làm sao "ghi lại" cây khung trong lúc DFS, thay vì chỉ in ra thứ tự thăm như DFS thường? <em>→ Mỗi lần chuẩn bị đệ quy sang đỉnh mới <code>v</code> từ <code>u</code>, đẩy cặp <code>(u,v)</code> vào 1 <code>vector&lt;pair&lt;int,int&gt;&gt; ck</code> TRƯỚC khi gọi <code>DFS(v)</code>.</em></li>
  <li>Sau khi DFS xong, làm sao biết đồ thị KHÔNG có cây khung (tức không liên thông)? <em>→ 1 cây khung hợp lệ luôn có đúng N-1 cạnh. Nếu <code>ck.size() != n-1</code> → một số đỉnh không tới được từ gốc u → in -1.</em></li>
  <li>Cây khung theo BFS (D04015) khác gì về code? <em>→ Thay đệ quy DFS bằng vòng lặp hàng đợi (queue) kiểu BFS, nhưng vẫn giữ đúng nguyên tắc: mỗi lần đẩy 1 đỉnh mới <code>v</code> vào hàng đợi từ đỉnh đang xét <code>x</code>, ghi nhận cạnh (x,v) vào kết quả.</em></li>
</ol>
<p class="idea-label">🪜 Quy trình suy nghĩ — Đường đi DFS-BFS (Duongdi_DFS.cpp, Duongdi_BFS.cpp)</p>
<ol>
  <li>Muốn in ra cả đường đi (không chỉ biết có tới được không), cần thêm biến gì so với DFS/BFS thường? <em>→ Mảng <code>truoc[v]</code> (parent) — mỗi lần thăm đỉnh mới v từ u, lưu <code>truoc[v] = u</code>.</em></li>
  <li>Có <code>truoc[]</code> rồi, làm sao dựng lại đường đi từ 1 → v theo đúng thứ tự xuôi (không phải ngược)? <em>→ Đi ngược từ v theo <code>truoc[]</code>, đẩy từng đỉnh vào 1 <strong>stack</strong>, tới khi gặp đỉnh gốc; sau đó lần lượt pop stack ra sẽ được đúng thứ tự xuôi 1→...→v (đây là lý do dùng stack chứ không in trực tiếp).</em></li>
  <li>Vì sao bài này bắt DFS đi 1→v nhưng lại bắt BFS đi ngược v→1? <em>→ Đề chỉ muốn luyện cả 2 thuật toán trên cùng 1 đồ thị; áp dụng đúng kỹ thuật <code>truoc[]</code> ở trên cho cả 2 chiều là đủ, không có gì đặc biệt khác nhau về bản chất.</em></li>
</ol>
<blockquote><p>⚠️ Bẫy: với BFS tìm đường đi trên đồ thị biểu diễn bằng <strong>ma trận kề</strong> (thay vì danh sách kề), phải duyệt đủ N đỉnh (<code>for v=1..N: if(a[t][v])</code>) để tìm đỉnh kề của <code>t</code>, thay vì duyệt <code>List[t]</code> như danh sách kề — dễ nhầm lẫn 2 cách biểu diễn khi đổi qua đổi lại giữa các bài.</p></blockquote>
<p>👉 Code đầy đủ + chạy tay: xem <a href="#cay-khung-duong-di">chi tiết ở phần DFS/BFS</a>.</p>

<h3 id="guide-baiBS121314">Bài D05006, D05008, D05001 — Cây đầy đủ, BST Preorder→Postorder, Duyệt mức</h3>
<p class="idea-label">🗣️ Đề thực sự hỏi gì</p>
<p>Cả 3 bài đều thao tác trên cây nhị phân nhưng theo 2 cách biểu diễn khác nhau: D05006, D05001 cho cây qua các bộ ba (cha, con, L/R) — bạn phải TỰ dựng cây; D05008 cho sẵn 1 mảng preorder của BST — bạn phải suy luận ra hình dạng cây mà KHÔNG cần dựng cây tường minh.</p>
<p class="idea-label">🔎 Nhận diện dạng bài → thuật toán</p>
<p>D05006, D05001 dùng lại đúng kỹ thuật dựng cây từ cặp cha-con đã học ở <a href="#bai-cay-cha-con">phần Cây nhị phân</a> — chỉ khác là L/R được cho rõ ràng trong input (không cần đoán "con đầu là trái"). D05008 là ứng dụng thú vị của tính chất BST: <strong>phần tử đầu tiên trong preorder luôn là gốc</strong>.</p>
<p class="idea-label">🪜 Quy trình suy nghĩ — D05006 (Cây đầy đủ, CayDayDu.cpp)</p>
<ol>
  <li>Định nghĩa "cây đầy đủ" chuyển thành câu hỏi đệ quy như thế nào? <em>→ Một node là "ổn" nếu: nó là lá (không con nào) HOẶC nó có ĐỦ CẢ 2 con và cả 2 cây con đó cũng đều "ổn" (đệ quy).</em></li>
  <li>Trường hợp nguy hiểm nhất cần loại là gì? <em>→ Node chỉ có DUY NHẤT 1 con (trái hoặc phải) — đây chính là trường hợp vi phạm, khiến hàm phải trả về <code>false</code>.</em></li>
</ol>
<p class="idea-label">🪜 Quy trình suy nghĩ — D05008 (Preorder → Postorder của BST)</p>
<ol>
  <li>Tại sao không cần dựng cây tường minh vẫn ra được đáp án? <em>→ Cách đơn giản nhất khi thi: dựng lại BST bằng cách chèn lần lượt từng phần tử của mảng preorder vào 1 BST rỗng (đúng kỹ thuật <code>insert</code> đã học), sau đó duyệt Postorder bình thường — <code>CayTimKiem.cpp</code> làm đúng như vậy, không cần thủ thuật chia mảng.</em></li>
  <li>Vì sao chèn preorder vào lại đúng ra được cây gốc ban đầu? <em>→ Vì phần tử đầu tiên của preorder luôn là gốc; các phần tử nhỏ hơn nó xuất hiện trước các phần tử lớn hơn theo đúng cấu trúc "gốc rồi tới trái rồi tới phải" — chèn theo đúng thứ tự đó vào BST sẽ tự tái tạo đúng hình cây ban đầu.</em></li>
</ol>
<p class="idea-label">🪜 Quy trình suy nghĩ — D05001 (Duyệt mức, Duyettheomuc.cpp)</p>
<ol>
  <li>Dựng cây từ (cha, con, L/R): khác gì với bản dùng mảng <code>leftChild[]/rightChild[]</code> đã học? <em>→ <code>Duyettheomuc.cpp</code> dùng <code>Node*</code> (con trỏ) và tìm node cha bằng cách <strong>đệ quy dò toàn cây</strong> mỗi lần chèn — chậm hơn cách dùng mảng chỉ số (mảng là O(1) khi tìm cha, con trỏ là O(N)) nhưng dễ hình dung hơn khi mới học; với N≤10³ trong đề này, tốc độ này vẫn đủ nhanh.</em></li>
  <li>Duyệt theo mức (level-order) cần cấu trúc dữ liệu gì, khác Preorder/Inorder/Postorder ở điểm nào? <em>→ Cần 1 <strong>hàng đợi (queue)</strong>, không phải đệ quy: đẩy gốc vào queue; mỗi lần lấy 1 node ra thì in giá trị rồi đẩy lần lượt con trái, con phải (nếu có) vào queue — đây chính là BFS áp dụng lên cây, cùng nguyên lý với BFS trên đồ thị.</em></li>
</ol>
<blockquote><p>⚠️ Bẫy: khi dựng cây bằng con trỏ ở D05006/D05001, phải xử lý riêng trường hợp <strong>node đầu tiên đọc vào là gốc</strong> (root chưa tồn tại) trước khi bắt đầu vòng lặp tìm-cha bình thường — nhìn code <code>Duyettheomuc.cpp</code>/<code>CayDayDu.cpp</code> sẽ thấy cả hai đều tách riêng dòng dữ liệu đầu tiên ra xử lý khác các dòng sau.</p></blockquote>
<p>👉 Code đầy đủ + chạy tay: xem <a href="#cay-day-du-bst-postorder-muc">chi tiết ở phần Cây nhị phân/BST</a>.</p>

<h3 id="guide-baiBS123bonus">Dãy ngoặc đúng dài nhất, D03003, D03014 &amp; nhóm D03 (Ngăn xếp/Hàng đợi bổ sung)</h3>
<p>6 bài này (Dãy ngoặc đúng dài nhất, D03003, D03014, và nhóm D03) đều thuộc nhóm kiến thức <strong>Ngăn xếp &amp; Hàng đợi</strong> — để tránh lặp nội dung, toàn bộ đề bài + quy trình suy nghĩ + code đầy đủ đã được chuyển thẳng vào đúng phần lý thuyết tương ứng: <a href="#guide-baiBS1-full">Dãy ngoặc đúng dài nhất</a>, <a href="#guide-baiBS2">D03003</a>, <a href="#guide-baiBS3-full">D03014</a>, <a href="#guide-baiD03">nhóm D03</a> — xem tại <a href="#ngan-xep-hang-doi">phần Ngăn xếp &amp; Hàng đợi</a>.</p>

</section>
</template>

<script setup>
defineProps({ active: Boolean })
</script>
