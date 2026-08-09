<template>
<section id="tham-lam" class="day-section" data-sid="tham-lam" v-show="active">

<h2>Tham Lam <span class="exam-tag">★ Đề ôn tập</span></h2>

<LessonGoal :sid="'tham-lam'">
  <ul><li v-for="(g, i) in data.goal" :key="i">{{ g }}</li></ul>
</LessonGoal>

<LessonPart :sid="'tham-lam'" part="ly-thuyet">

<h4>Tham lam — chọn tốt nhất ngay lúc này, không nghĩ lại</h4>

<p><strong>Đây là gì?</strong> Bạn trả tiền thối đúng 60.000đ, trong tay có tờ 50k, 20k, 10k. Bạn tự nhiên lấy tờ <strong>lớn nhất có thể</strong> trước (50k), rồi lấy tờ lớn nhất còn phù hợp (10k) — xong với 2 tờ. Bạn không hề tính trước xem cách chọn này về sau có tối ưu không, cứ chọn cái tốt nhất trước mắt rồi đi tiếp. Đó chính là <strong>Tham lam (Greedy)</strong>: tại mỗi bước, chọn lựa chọn tốt nhất ngay lúc đó, và không bao giờ quay lại xét phương án khác.</p>

<p><strong>Vì sao quan trọng?</strong> Tham lam chỉ <strong>chắc chắn đúng</strong> khi bài toán có đủ 2 tính chất sau:</p>
<ol>
  <li><strong>Lựa chọn tham lam an toàn</strong>: lựa chọn tốt nhất tại bước hiện tại luôn nằm trong (hoặc không tệ hơn) một lời giải tối ưu tổng thể.</li>
  <li><strong>Bài toán con tối ưu</strong>: sau khi chọn xong bước đầu, phần còn lại là một bài toán nhỏ hơn cùng dạng, và lời giải tối ưu của bài toán lớn được ghép từ lời giải tối ưu của bài toán con đó.</li>
</ol>
<p>Thiếu 1 trong 2 điều kiện, Tham lam có thể <strong>sai</strong> — câu hỏi lý thuyết hay gặp nhất chính là: "Tham lam có giải đúng bài này không? Chứng minh hoặc phản ví dụ."</p>

<p><strong>Làm sao dùng?</strong> Cách chắc chắn nhất để biết tham lam có áp dụng được không là tự tìm một <strong>phản ví dụ nhỏ</strong> trước khi tin vào trực giác. Ví dụ đổi tiền với bộ mệnh giá <strong>{1, 3, 4}</strong>, cần đổi đúng <strong>6đ</strong>:</p>
<table class="formula-table">
  <tr><th></th><th>Các bước</th><th>Kết quả</th></tr>
  <tr><td>Tham lam (lấy lớn nhất trước)</td><td>Lớn nhất ≤6 là 4 → lấy 1 đồng, còn 2. Lớn nhất ≤2 là 1 → lấy 2 đồng.</td><td>4+1+1 = <strong>3 đồng</strong></td></tr>
  <tr><td>Cách tốt nhất thực sự</td><td>3 + 3 = 6</td><td><strong>2 đồng</strong></td></tr>
</table>
<p>Tham lam cho ra 3 đồng, nhưng đáp án đúng chỉ cần 2 đồng — <strong>tham lam sai</strong> ở hệ tiền này. Lý do: lấy đồng 4 trước "dùng hết" phần lớn giá trị 6đ một cách vội vàng, không để lại phần dư đẹp cho các đồng khác — trong khi hệ tiền thật (ví dụ {25,10,5,1}) được thiết kế cẩn thận để điều này không xảy ra. Vì vậy trước khi áp dụng tham lam, luôn tự hỏi: bài toán này đã được chứng minh 2 điều kiện trên chưa, hay mình chỉ đang tin vào trực giác?</p>

</LessonPart>

<LessonPart :sid="'tham-lam'" part="vi-sao">

<p>Khi áp dụng được, tham lam <strong>nhanh hơn hẳn</strong> vét cạn (thử mọi khả năng) và quy hoạch động (QHĐ) — thường chỉ cần một lần sắp xếp rồi quét một lượt, độ phức tạp O(n log n), so với việc vét cạn có thể tốn thời gian mũ hoặc QHĐ cần thêm bảng phụ để lưu bài toán con. Đổi lại, tham lam <strong>không phải lúc nào cũng đúng</strong> — như phản ví dụ đổi tiền {1,3,4} ở trên đã cho thấy.</p>

<p>Đây cũng là <strong>cầu nối trực tiếp sang bài học kế tiếp</strong>: Quy hoạch động. Bài đổi tiền chính là ví dụ rõ nhất — với hệ mệnh giá không chuẩn, tham lam làm sai, nhưng QHĐ (bài học ngay sau đây) sẽ giải đúng chính bài toán này bằng cách xét đầy đủ mọi lựa chọn con thay vì chỉ chọn cái lớn nhất. Nói cách khác: tham lam là "phiên bản tắt" của QHĐ, chỉ dùng được khi chứng minh được phiên bản tắt đó không mất tính đúng đắn.</p>

<div class="realworld">
  <span class="rw-title">🌐 Ứng dụng thực tế</span>
  <dl>
    <dt>Dùng ở đâu</dt>
    <dd>Xếp lịch phòng họp/phòng chiếu tự động (Google Calendar, hệ thống đặt phòng); máy ATM/máy bán hàng tự động tính tiền thối; nén file (ZIP/JPEG/MP3) qua thuật toán Huffman Coding — cũng dựa trên nguyên lý "luôn ghép 2 phần tử nhỏ nhất trước".</dd>
    <dt>Giải quyết vấn đề gì</dt>
    <dd>Các bài toán tối ưu mà lựa chọn tốt nhất ngay tại mỗi bước không bao giờ làm mất đi khả năng đạt lời giải tối ưu tổng thể.</dd>
    <dt class="good">Khi nào NÊN dùng</dt>
    <dd class="good">Đã chứng minh được (hoặc bài toán thuộc dạng đã biết là đúng, như Activity Selection) rằng lựa chọn tham lam là an toàn.</dd>
    <dt class="bad">Khi nào KHÔNG NÊN dùng</dt>
    <dd class="bad">Chưa chứng minh được tính đúng đắn, hoặc đã tìm ra phản ví dụ như bài đổi tiền {1,3,4} — khi đó phải chuyển sang quy hoạch động.</dd>
  </dl>
</div>

<p>Một minh chứng khác cho lập luận "tham lam an toàn": bài <strong>nối dây</strong> — có n đoạn dây độ dài khác nhau, nối 2 đoạn bất kỳ tốn chi phí bằng tổng độ dài 2 đoạn đó, nối hết thành 1 đoạn thì tổng chi phí nhỏ nhất là bao nhiêu? Một đoạn dây bị cộng dồn chi phí thêm 1 lần mỗi khi nó nằm trong 1 lượt nối, nên đoạn có giá trị nhỏ cần được ghép sớm nhất để chỉ bị cộng dồn ít lần — tức luôn nối 2 đoạn <strong>nhỏ nhất hiện có</strong> trước. Công cụ để luôn biết "2 đoạn nhỏ nhất hiện có" nhanh là <strong>hàng đợi ưu tiên (priority queue / min-heap)</strong>, tốn O(log n) mỗi lần thêm/lấy, nhanh hơn hẳn duyệt lại mảng từ đầu.</p>

<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int minCostToConnectRopes(int ropes[], int n) {
    priority_queue&lt;int, vector&lt;int&gt;, greater&lt;int&gt;&gt; pq(ropes, ropes + n);
    long long total = 0;
    while (pq.size() &gt; 1) {
        int a = pq.top(); pq.pop();   // lấy đoạn nhỏ nhất hiện có
        int b = pq.top(); pq.pop();   // lấy đoạn nhỏ nhì hiện có
        int sum = a + b;
        total += sum;
        pq.push(sum);                 // đưa đoạn mới trở lại hàng đợi
    }
    return total;
}

int main() {
    int ropes[] = {4, 3, 2, 6};
    cout &lt;&lt; minCostToConnectRopes(ropes, 4);   // in ra: 29
    return 0;
}</code></pre>

<div class="widget">
  <div class="widget-label">Các đoạn dây {4, 3, 2, 6}</div>
  <div id="d3RopeView" style="text-align:center; margin: 1rem 0;"></div>
  <div class="caption" id="d3RopeCaption">Bấm "Bước tiếp theo" để bắt đầu.</div>
  <div class="controls">
    <button class="secondary" id="d3RopePrev">← Lùi lại</button>
    <button id="d3RopeNext">Bước tiếp theo →</button>
    <button class="secondary" id="d3RopeReset">Chạy lại từ đầu</button>
  </div>
  <div class="step-info"><span id="d3RopeStepNum">0</span> / <span id="d3RopeStepTotal">0</span> bước — tổng chi phí: <span id="d3RopeTotal" style="font-family:monospace;">0</span></div>
</div>

<blockquote><p>🎯 Đây chính là ý tưởng cốt lõi của <strong>Huffman Coding</strong> (thuật toán nén dữ liệu): liên tục ghép 2 phần tử nhỏ nhất, xây cây từ dưới lên. Bạn sẽ tự làm lại đúng ý tưởng này ở phần bài tập bên dưới.</p></blockquote>

</LessonPart>

<LessonPart :sid="'tham-lam'" part="quiz">
  <QuizBlock :questions="data.quiz" />
</LessonPart>

<LessonPart :sid="'tham-lam'" part="vi-du">

<WorkedExample id="vd-activity-selection" title="Activity Selection — chọn nhiều việc nhất" :official="true">
  <template #de-bai>
    <div class="problem-box">
      <span class="pb-title">📋 Nguyên văn đề bài</span>
      <p>Cho hệ gồm N hành động. Mỗi hành động được biểu diễn như một bộ đôi &lt;Si, Fi&gt; tương ứng với thời gian bắt đầu và thời gian kết thúc của mỗi hành động. Hãy tìm phương án thực hiện nhiều nhất các hành động được thực hiện bởi một máy hoặc một người sao cho hệ không xảy ra mâu thuẫn.</p>
      <p><strong>Input:</strong> Dòng đầu tiên đưa vào số lượng bộ test T. Những dòng kế tiếp đưa vào các bộ test. Mỗi bộ test gồm 3 dòng: dòng thứ nhất đưa vào số lượng hành động N; dòng tiếp theo đưa vào N số Si tương ứng với thời gian bắt đầu mỗi hành động; dòng cuối cùng đưa vào N số Fi tương ứng với thời gian kết thúc mỗi hành động. Ràng buộc: 1≤T≤100; 1≤N, Fi, Si≤1000.</p>
      <p><strong>Output:</strong> Đưa số lượng lớn nhất các hành động có thể được thực thi bởi một máy hoặc một người.</p>
      <table class="formula-table"><tr><th>Input</th><th>Output</th></tr>
      <tr><td>1<br>6<br>1 3 0 5 8 5<br>2 4 6 7 9 9</td><td>4</td></tr></table>
    </div>
  </template>

  <template #y-tuong>
    <p>Hãy tưởng tượng bạn quản lý <strong>1 hội trường duy nhất</strong>. Có N nhóm đăng ký dùng hội trường, mỗi nhóm đưa ra khung giờ mong muốn <code>[S<sub>i</sub>, F<sub>i</sub>]</code>. Hội trường chỉ phục vụ được 1 nhóm tại 1 thời điểm — 2 nhóm chồng giờ thì chỉ chọn được 1 trong 2. Câu hỏi: xếp được tối đa bao nhiêu nhóm, không nhóm nào chồng giờ với nhóm khác?</p>
    <p>Trực giác đầu tiên hay bị hỏi: "cứ xếp nhóm nào <strong>bắt đầu sớm nhất</strong> trước". Thử với 4 nhóm: X đăng ký <strong>[0, 10]</strong> (chiếm nguyên cả buổi), Y[1,2], Z[3,4], W[5,6]. Chọn X trước (bắt đầu sớm nhất =0) thì X chiếm cả khung 0-10, mọi nhóm khác rơi vào đó → chỉ được 1 nhóm. Nhưng nếu bỏ qua X, chọn Y, Z, W thì được <strong>3 nhóm</strong> — vậy "bắt đầu sớm nhất" là trực giác sai.</p>
    <p><strong>Trực giác đúng: chọn nhóm kết thúc sớm nhất.</strong> Nhóm nào kết thúc sớm nhất — bất kể nó bắt đầu lúc nào hay kéo dài bao lâu — luôn "trả lại hội trường" sớm nhất cho các nhóm còn lại, nên luôn để lại nhiều thời gian trống nhất cho các lựa chọn tiếp theo.</p>
  </template>

  <template #thuat-toan>
    <p>Lập luận chặt chẽ hơn cho việc "vì sao đúng" (kiểu chứng minh hay được hỏi khi đề yêu cầu giải thích): giả sử có 1 lời giải tối ưu không chọn nhóm kết thúc sớm nhất (gọi là M) làm lựa chọn đầu tiên, mà chọn nhóm K khác. Vì M kết thúc sớm hơn hoặc bằng K, ta luôn có thể <strong>thay K bằng M</strong> ở vị trí đầu — mọi lựa chọn phía sau vẫn hợp lệ y hệt, vì M nhường chỗ sớm hơn hoặc bằng K nên không gây thêm xung đột nào so với K. Vậy chọn M ngay từ đầu không bao giờ tệ hơn — đây là lý do "lựa chọn tham lam an toàn" đúng với bài này.</p>
    <p>Từ đó suy ra thuật toán:</p>
    <ol>
      <li>Sắp xếp toàn bộ N nhóm theo giờ kết thúc F tăng dần.</li>
      <li>Luôn chọn nhóm đầu tiên trong danh sách đã sắp (kết thúc sớm nhất trong tất cả).</li>
      <li>Duyệt tiếp các nhóm còn lại theo thứ tự đã sắp: nhóm nào có giờ bắt đầu ≥ giờ kết thúc của nhóm được chọn gần nhất thì chọn, cập nhật lại "giờ kết thúc gần nhất".</li>
      <li>Đếm tổng số nhóm đã chọn.</li>
    </ol>
  </template>

  <template #chay-tay>
    <p>Chạy tay đúng 6 hoạt động A(1,2) B(3,4) C(0,6) D(5,7) E(8,9) F(5,9), sau khi sort theo F tăng dần: A → B → C → D → E → F.</p>
    <table class="formula-table">
      <tr><th>Xét theo thứ tự</th><th>A(1,2)</th><th>B(3,4)</th><th>C(0,6)</th><th>D(5,7)</th><th>E(8,9)</th><th>F(5,9)</th></tr>
      <tr><td>Quyết định</td><td>Chọn, lastFinish=2</td><td>start=3≥2 → Chọn, lastFinish=4</td><td>start=0&lt;4 → Bỏ</td><td>start=5≥4 → Chọn, lastFinish=7</td><td>start=8≥7 → Chọn, lastFinish=9</td><td>start=5&lt;9 → Bỏ</td></tr>
    </table>
    <p style="text-align:center; font-family:monospace; font-size:1.1rem;">Đã chọn: A, B, D, E → Output = <strong>4</strong> ✓ khớp đúng đề</p>
  </template>

  <template #code>
<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    int T; cin &gt;&gt; T;
    while (T--) {
        int n; cin &gt;&gt; n;
        vector&lt;pair&lt;int,int&gt;&gt; act(n);   // {finish, start} để sort theo finish
        vector&lt;int&gt; S(n), F(n);
        for (int &x : S) cin &gt;&gt; x;
        for (int &x : F) cin &gt;&gt; x;
        for (int i = 0; i &lt; n; i++) act[i] = {F[i], S[i]};

        sort(act.begin(), act.end());   // sort theo finish tăng dần (mặc định pair so theo phần tử đầu)

        int count = 1;
        int lastFinish = act[0].first;
        for (int i = 1; i &lt; n; i++) {
            if (act[i].second &gt;= lastFinish) {   // start &gt;= lastFinish → không chồng giờ
                count++;
                lastFinish = act[i].first;
            }
        }
        cout &lt;&lt; count &lt;&lt; "\n";
    }
    return 0;
}</code></pre>
    <blockquote><p>📎 Đề chỉ yêu cầu in ra <strong>số lượng lớn nhất</strong> (1 số nguyên), không cần in ra "nhóm nào được chọn" — nên code rút gọn thành đếm <code>count</code>.</p></blockquote>
  </template>

  <template #toi-uu>
    <p>Sắp theo giờ kết thúc là điều kiện <strong>sống còn</strong> của thuật toán này — sắp theo giờ bắt đầu hoặc theo thời lượng đều có phản ví dụ khiến tham lam sai (như X[0,10] ở phần ý tưởng). Độ phức tạp là O(n log n) do bước sort, phần quét sau đó chỉ O(n) — không cần cấu trúc dữ liệu phức tạp hơn.</p>
  </template>
</WorkedExample>

<p>Bấm "Bước tiếp theo" để xem từng nhóm được xét theo đúng thứ tự đã sắp (theo giờ kết thúc), xanh = được chọn, đỏ = bị chồng giờ nên loại:</p>

<div class="widget">
  <div class="widget-label">Dòng thời gian — Activity Selection đúng ví dụ trong đề (A(1,2) B(3,4) C(0,6) D(5,7) E(8,9) F(5,9))</div>
  <div id="d4Timeline" style="margin: 1rem 0;"></div>
  <div class="caption" id="d4Caption">Bấm "Bước tiếp theo" để bắt đầu.</div>
  <div class="controls">
    <button class="secondary" id="d4Prev">← Lùi lại</button>
    <button id="d4Next">Bước tiếp theo →</button>
    <button class="secondary" id="d4Reset">Chạy lại từ đầu</button>
  </div>
  <div class="step-info"><span id="d4StepNum">0</span> / <span id="d4StepTotal">0</span> bước — đã chọn: <span id="d4Picked" style="font-family: monospace;"></span></div>
</div>

<WorkedExample id="vd-doi-tien" title="Đổi tiền với số tờ ít nhất" :official="true">
  <template #de-bai>
    <p>Bạn cần trả lại đúng 1 số tiền cho khách, dùng <strong>ít tờ/đồng nhất có thể</strong>, với 1 bộ mệnh giá cho trước.</p>
    <table class="formula-table">
      <tr><th>Input</th><th>Output</th></tr>
      <tr><td>Hệ {25, 10, 5, 1}, đổi 41đ</td><td>4 tờ (1×25 + 1×10 + 1×5 + 1×1)</td></tr>
    </table>
  </template>

  <template #y-tuong>
    <p>Với hệ {25, 10, 5, 1}, thử đổi 41đ bằng tay: mệnh giá lớn nhất không vượt quá 41 là 25 → lấy 1 tờ, còn lại 16. Mệnh giá lớn nhất không vượt quá 16 là 10 → lấy 1 tờ, còn lại 6. Mệnh giá lớn nhất không vượt quá 6 là 5 → lấy 1 tờ, còn lại 1. Lấy 1 tờ mệnh giá 1. Tổng: 1+1+1+1 = <strong>4 tờ</strong>.</p>
    <p>Ở mỗi bước ta chỉ hỏi đúng 1 câu: "mệnh giá lớn nhất mà tôi còn dùng được là bao nhiêu?" — không cần nghĩ trước các bước sau, cứ lấy nhiều nhất có thể rồi lặp lại với phần còn dư. Đây là hệ tiền "chuẩn" (mỗi mệnh giá đều là bội số "đẹp" của mệnh giá nhỏ hơn), nên chiến lược này luôn cho đáp án đúng.</p>
  </template>

  <template #thuat-toan>
    <ol>
      <li>Sắp mệnh giá theo thứ tự giảm dần (hoặc giữ nguyên nếu đề đã cho giảm dần sẵn).</li>
      <li>Với mỗi mệnh giá, lấy số tờ nhiều nhất có thể: <code>total += amount / c</code>, rồi cập nhật <code>amount %= c</code>.</li>
      <li>Chuyển sang mệnh giá kế tiếp (nhỏ hơn), lặp lại tới khi <code>amount == 0</code>.</li>
    </ol>
  </template>

  <template #chay-tay>
    <table class="formula-table">
      <tr><th>Mệnh giá</th><th>25</th><th>10</th><th>5</th><th>1</th></tr>
      <tr><td>Số tờ lấy</td><td>41/25 = 1</td><td>16/10 = 1</td><td>6/5 = 1</td><td>1/1 = 1</td></tr>
      <tr><td>Còn lại</td><td>41−25 = 16</td><td>16−10 = 6</td><td>6−5 = 1</td><td>1−1 = 0</td></tr>
    </table>
    <p style="text-align:center; font-family:monospace; font-size:1.1rem;">Tổng số tờ = 1+1+1+1 = <strong>4</strong></p>
  </template>

  <template #code>
<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int coins[] = {25, 10, 5, 1};

int greedyCoinChange(int amount) {
    int total = 0;
    for (int c : coins) { total += amount / c; amount %= c; }
    return total;
}

int main() {
    cout &lt;&lt; greedyCoinChange(41);   // in ra: 4
    return 0;
}</code></pre>
  </template>

  <template #toi-uu>
    <p><strong>Chiến lược này KHÔNG phải lúc nào cũng đúng.</strong> Với hệ mệnh giá không chuẩn — như {1, 3, 4} đã thấy ở phần Lý thuyết — tham lam đổi 6đ ra 3 đồng, trong khi đáp án tốt nhất chỉ cần 2 đồng (3+3). Với hệ tiền tùy ý, chỉ có cách <strong>chắc chắn đúng mọi trường hợp</strong> là dùng Quy hoạch động: xét đầy đủ mọi lựa chọn mệnh giá tại mỗi bước thay vì chỉ chọn cái lớn nhất, rồi giữ lại phương án tốt nhất trong tất cả — đây đúng là nội dung bài học kế tiếp.</p>
  </template>
</WorkedExample>

<div class="widget">
  <div class="widget-label">Đổi 41đ với hệ {25, 10, 5, 1}</div>
  <div id="d4CoinView" style="text-align:center; font-family:monospace; font-size:1rem; margin: 1rem 0;"></div>
  <div class="caption" id="d4CoinCaption">Bấm "Bước tiếp theo" để bắt đầu.</div>
  <div class="controls">
    <button class="secondary" id="d4CoinPrev">← Lùi lại</button>
    <button id="d4CoinNext">Bước tiếp theo →</button>
    <button class="secondary" id="d4CoinReset">Chạy lại từ đầu</button>
  </div>
  <div class="step-info"><span id="d4CoinStepNum">0</span> / <span id="d4CoinStepTotal">0</span> bước</div>
</div>

</LessonPart>

<LessonPart :sid="'tham-lam'" part="bai-tap">
  <PracticeSet :items="data.practice" />
</LessonPart>

<LessonPart :sid="'tham-lam'" part="leetcode">
  <LeetCodeList :items="data.leetcode" />
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
import data from '../data/lessons/tham-lam.js'
import { initThamLamWidgets } from '../widgets/tham-lam.js'

defineProps({ active: Boolean })

onMounted(() => {
  initThamLamWidgets()
})
</script>
