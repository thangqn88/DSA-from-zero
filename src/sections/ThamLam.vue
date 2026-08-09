<template>
<section id="tham-lam" class="day-section" data-sid="tham-lam" v-show="active">

<h2>Tham Lam Cơ Bản — Activity Selection &amp; Đổi Tiền <span class="exam-tag">★ Đề ôn tập — Bài 3</span></h2>
<div class="mini-toc">
  <span class="mt-label">Chuyển nhanh tới</span>
  <a class="mt-exam" href="#bai3-activity-selection">★ Bài 3 — Activity Selection</a>
</div>

<h3 id="auto-tham-lam-chon-tot-nhat-ngay-luc-nay-khong-nghi-lai">Tham lam — chọn tốt nhất ngay lúc này, không nghĩ lại</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Bạn trả tiền thối đúng 60.000đ, trong tay có tờ 50k, 20k, 10k. Bạn tự nhiên lấy tờ <strong>lớn nhất có thể</strong> trước (50k), rồi lấy tờ lớn nhất còn phù hợp (10k) — xong với 2 tờ. Bạn không hề tính trước xem cách chọn này về sau có tối ưu không.</p>
<p>Đó là <strong>Tham lam (Greedy)</strong>. Nó chỉ <strong>chắc chắn đúng</strong> khi bài toán có 2 tính chất: (1) lựa chọn tốt nhất tại mỗi bước luôn nằm trong lời giải tối ưu tổng thể; (2) lời giải tối ưu của bài toán lớn được ghép từ lời giải tối ưu của bài toán con. Thiếu 1 trong 2, Tham lam có thể <strong>sai</strong> — câu hỏi lý thuyết hay gặp nhất: <em>"Tham lam có giải đúng bài này không? Chứng minh hoặc phản ví dụ."</em></p>
<blockquote><p>⚠️ Đây là điều khiến Tham lam "khó" hơn Quay lui hay QHĐ: <strong>code của Tham lam luôn ngắn</strong> (thường chỉ vài dòng sau khi sort), nhưng <strong>chứng minh vì sao nó đúng mới là phần khó thật sự</strong>. Cả 3 bài dưới đây, mình sẽ đi chậm vào đúng phần chứng minh đó — vì đây thường là chỗ đề thi hỏi lắt léo nhất.</p></blockquote>

<h3 id="bai3-activity-selection">★ Bài chính thức trong Đề ôn tập — Bài 3: Activity Selection</h3>

<div class="problem-box">
<span class="pb-title">📋 Nguyên văn đề bài</span>
<p>Cho hệ gồm N hành động. Mỗi hành động được biểu diễn như một bộ đôi &lt;Si, Fi&gt; tương ứng với thời gian bắt đầu và thời gian kết thúc của mỗi hành động. Hãy tìm phương án thực hiện nhiều nhất các hành động được thực hiện bởi một máy hoặc một người sao cho hệ không xảy ra mâu thuẫn.</p>
<p><strong>Input:</strong> Dòng đầu tiên đưa vào số lượng bộ test T. Những dòng kế tiếp đưa vào các bộ test. Mỗi bộ test gồm 3 dòng: dòng thứ nhất đưa vào số lượng hành động N; dòng tiếp theo đưa vào N số Si tương ứng với thời gian bắt đầu mỗi hành động; dòng cuối cùng đưa vào N số Fi tương ứng với thời gian kết thúc mỗi hành động; các số được viết cách nhau một vài khoảng trống. Ràng buộc: 1≤T≤100; 1≤N, Fi, Si≤1000.</p>
<p><strong>Output:</strong> Đưa số lượng lớn nhất các hành động có thể được thực thi bởi một máy hoặc một người.</p>
<table class="formula-table"><tr><th>Input</th><th>Output</th></tr>
<tr><td>1<br>6<br>1 3 0 5 8 5<br>2 4 6 7 9 9</td><td>4</td></tr></table>
</div>

<p class="idea-label">🗣️ Bước 0 — Đề thực sự hỏi gì (tình huống cụ thể)</p>
<p>Hãy tưởng tượng bạn quản lý <strong>1 hội trường duy nhất</strong>. Có N nhóm đăng ký dùng hội trường, mỗi nhóm đưa ra khung giờ mong muốn <code>[S<sub>i</sub>, F<sub>i</sub>]</code>. Hội trường chỉ phục vụ được 1 nhóm tại 1 thời điểm — 2 nhóm có khung giờ chồng nhau thì chỉ chọn được 1 trong 2. Câu hỏi: <strong>xếp được tối đa bao nhiêu nhóm</strong> vào hội trường, sao cho không nhóm nào bị chồng giờ với nhóm khác?</p>

<p class="idea-label">🗣️ Bước 1 — Thử trực giác "hiển nhiên" trước (và xem nó sai ở đâu)</p>
<p>Phản xạ tự nhiên đầu tiên: "cứ xếp nhóm nào <strong>đăng ký giờ bắt đầu sớm nhất</strong> trước". Hãy thử với 4 nhóm: X đăng ký <strong>[0, 10]</strong> (chiếm nguyên cả buổi), Y đăng ký [1, 2], Z đăng ký [3, 4], W đăng ký [5, 6].</p>
<table class="formula-table">
  <tr><th>Chiến lược</th><th>Chọn theo thứ tự</th><th>Kết quả</th></tr>
  <tr><td>Bắt đầu sớm nhất</td><td>X[0,10] có giờ bắt đầu sớm nhất (=0) → chọn X trước → X chiếm cả khung 0-10 → Y, Z, W đều rơi vào khoảng đó → chồng giờ hết → không chọn được ai thêm</td><td><strong>Chỉ được 1 nhóm (X)</strong></td></tr>
  <tr><td>Cách xếp tốt nhất thực sự</td><td>Bỏ qua X, chọn Y, Z, W (3 khung giờ này không hề chồng nhau)</td><td><strong>Được 3 nhóm</strong></td></tr>
</table>
<p>Vậy "bắt đầu sớm nhất" là một trực giác <strong>sai</strong> — chỉ vì X bắt đầu sớm không có nghĩa là chọn X sẽ tốt, nếu X "chiếm chỗ" quá lâu. Một trực giác khác cũng hay bị nhầm: "chọn nhóm có <strong>thời lượng ngắn nhất</strong> trước" — trực giác này cũng có thể sai trong nhiều trường hợp khác (không phải lúc nào ngắn nhất cũng nhường chỗ tốt nhất cho các nhóm còn lại).</p>

<p class="idea-label">🗣️ Bước 2 — Trực giác đúng: vì sao phải là "kết thúc sớm nhất"</p>
<p>Nhóm nào <strong>kết thúc sớm nhất</strong> — bất kể nó bắt đầu lúc nào hay kéo dài bao lâu — luôn "trả lại hội trường" sớm nhất cho các nhóm còn lại. Vì thế nó luôn để lại <strong>nhiều thời gian trống nhất có thể</strong> cho các lựa chọn tiếp theo — không thể có lựa chọn nào khác "nhường chỗ" tốt hơn thế.</p>
<p>Nói chặt chẽ hơn (đây là kiểu lập luận hay được hỏi khi đề yêu cầu <em>"chứng minh"</em>): giả sử có 1 lời giải tối ưu nào đó <strong>không</strong> chọn nhóm kết thúc sớm nhất (gọi là M) làm lựa chọn đầu tiên, mà chọn nhóm K khác. Vì M kết thúc sớm hơn hoặc bằng K, ta luôn có thể <strong>thay K bằng M</strong> ở vị trí đầu tiên — mọi lựa chọn phía sau vẫn hợp lệ y hệt (vì M nhường chỗ sớm hơn hoặc bằng K, không thể gây thêm xung đột nào so với K). Vậy chọn M ngay từ đầu <strong>không bao giờ tệ hơn</strong> bất kỳ lựa chọn nào khác — đây chính là lý do Tham lam theo giờ kết thúc luôn đúng.</p>

<p class="idea-label">🪜 Bước 3 — Từ trực giác ra thuật toán</p>
<ol>
  <li>Sắp xếp toàn bộ N nhóm theo giờ kết thúc F tăng dần.</li>
  <li>Luôn chọn nhóm đầu tiên trong danh sách đã sắp (kết thúc sớm nhất trong tất cả) — đây chắc chắn là 1 lựa chọn đúng theo lập luận ở Bước 2.</li>
  <li>Duyệt tiếp các nhóm còn lại theo thứ tự đã sắp: nhóm nào có giờ bắt đầu ≥ giờ kết thúc của nhóm được chọn gần nhất thì chọn nó, cập nhật lại "giờ kết thúc gần nhất".</li>
  <li>Đếm tổng số nhóm đã chọn.</li>
</ol>

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

<p class="idea-label">🔁 Cách viết khác — dùng mảng thường (nếu bạn chưa quen <code>vector</code>)</p>
<p>Vẫn <strong>đúng thuật toán y hệt</strong> ở trên. Khác biệt duy nhất: thay vì <code>vector&lt;pair&lt;int,int&gt;&gt;</code>, ta tự khai báo 1 <code>struct</code> đơn giản để gói 2 giá trị (start, finish) lại với nhau, rồi sort mảng struct đó bằng hàm so sánh tự viết.</p>

<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

struct Activity { int start, finish; };
Activity act[1005];   // mảng struct cố định, đủ lớn cho n ≤ 1000 theo đề

bool cmp(Activity a, Activity b) {
    return a.finish &lt; b.finish;   // so sánh để sort tăng dần theo finish
}

int main() {
    int T; cin &gt;&gt; T;
    while (T--) {
        int n; cin &gt;&gt; n;
        int S[1005], F[1005];
        for (int i = 0; i &lt; n; i++) cin &gt;&gt; S[i];
        for (int i = 0; i &lt; n; i++) cin &gt;&gt; F[i];
        for (int i = 0; i &lt; n; i++) act[i] = {S[i], F[i]};

        sort(act, act + n, cmp);   // sort mảng struct theo finish tăng dần

        int count = 1;
        int lastFinish = act[0].finish;
        for (int i = 1; i &lt; n; i++) {
            if (act[i].start &gt;= lastFinish) {   // start &gt;= lastFinish → không chồng giờ
                count++;
                lastFinish = act[i].finish;
            }
        }
        cout &lt;&lt; count &lt;&lt; "\n";
    }
    return 0;
}</code></pre>

<blockquote><p>💡 <strong>Vì sao cần viết hàm <code>cmp</code> riêng?</strong> Hàm <code>sort()</code> mặc định không biết bạn muốn sắp theo <code>start</code> hay <code>finish</code> của struct — nó cần bạn "dạy" nó cách so sánh 2 phần tử <code>Activity</code> bằng 1 hàm trả về <code>true</code> nếu phần tử thứ nhất phải đứng TRƯỚC phần tử thứ hai. Ở đây ta viết <code>a.finish &lt; b.finish</code> — nghĩa là "ai kết thúc sớm hơn thì đứng trước". Đây chính là bước "dạy máy tính tiêu chí kết thúc sớm nhất" mà bạn đã hiểu ở Bước 2-3 phía trên, chỉ là được viết ra thành code.</p></blockquote>
<p>So với bản <code>vector</code>: bản <code>vector&lt;pair&lt;int,int&gt;&gt;</code> tận dụng việc <code>pair</code> đã tự biết so sánh theo phần tử đầu tiên trước (nên không cần viết hàm <code>cmp</code>), còn bản <code>struct</code> phải tự viết rõ ràng tiêu chí so sánh — đổi lại code dễ đọc hơn vì <code>act[i].start</code>, <code>act[i].finish</code> có tên rõ ràng thay vì <code>act[i].first</code>, <code>act[i].second</code> khó nhớ ý nghĩa.</p>
<table class="formula-table">
  <tr><th>Nhóm (S,F)</th><th>(1,2)</th><th>(3,4)</th><th>(0,6)</th><th>(5,7)</th><th>(8,9)</th><th>(5,9)</th></tr>
  <tr><td>Sau khi sort theo F tăng dần</td><td colspan="6">(1,2) → (3,4) → (0,6) → (5,7) → (8,9) → (5,9)</td></tr>
</table>
<p>Chọn (1,2) trước, count=1, lastFinish=2. Xét (3,4): start=3 ≥ 2 → chọn, count=2, lastFinish=4. Xét (0,6): start=0 &lt; 4 → bỏ. Xét (5,7): start=5 ≥ 4 → chọn, count=3, lastFinish=7. Xét (8,9): start=8 ≥ 7 → chọn, count=4, lastFinish=9. Xét (5,9): start=5 &lt; 9 → bỏ.</p>
<p style="text-align:center; font-family:monospace; font-size:1.1rem;">Output = <strong>4</strong> ✓ khớp đúng đề</p>

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

<div class="realworld">
  <span class="rw-title">🌐 Ứng dụng thực tế</span>
  <dl>
    <dt>Dùng ở đâu</dt>
    <dd>Xếp lịch phòng họp/phòng chiếu tự động (Google Calendar, hệ thống đặt phòng); lập lịch sử dụng 1 tài nguyên dùng chung (1 máy CNC, 1 sân bóng) cho nhiều yêu cầu đặt chỗ.</dd>
    <dt>Giải quyết vấn đề gì</dt>
    <dd>Tối đa số lượng công việc/sự kiện có thể xếp vào 1 tài nguyên duy nhất, không chồng chéo thời gian.</dd>
    <dt class="good">Khi nào NÊN dùng</dt>
    <dd class="good">Chỉ có 1 tài nguyên (1 phòng, 1 máy); mục tiêu là số lượng sự kiện tối đa, không phải tổng giá trị.</dd>
    <dt class="bad">Khi nào KHÔNG NÊN dùng</dt>
    <dd class="bad">Có nhiều tài nguyên cùng lúc (nhiều phòng) — cần thuật toán khác (ví dụ bài "số sân ga tối thiểu"); hoặc mục tiêu là tối ưu tổng giá trị/lợi nhuận thay vì số lượng — khi đó cần QHĐ.</dd>
  </dl>
</div>

<h3 id="auto-doi-tien-co-ban-he-tien-chuan-kien-thuc-nen-khong-">Đổi tiền cơ bản (hệ tiền chuẩn) — kiến thức nền, không có trong đề ôn tập</h3>
<p class="idea-label">🗣️ Bước 0 — Đề thực sự hỏi gì</p>
<p>Bạn cần trả lại đúng 1 số tiền cho khách, dùng <strong>ít tờ/đồng nhất có thể</strong>, với 1 bộ mệnh giá cho trước (ví dụ {25, 10, 5, 1}).</p>
<p class="idea-label">🗣️ Bước 1 — Trực giác, chạy tay trước khi viết code</p>
<p>Với hệ {25, 10, 5, 1}, thử đổi 41đ bằng tay: mệnh giá lớn nhất không vượt quá 41 là 25 → lấy 1 tờ, còn lại 41-25=16. Mệnh giá lớn nhất không vượt quá 16 là 10 → lấy 1 tờ, còn lại 6. Mệnh giá lớn nhất không vượt quá 6 là 5 → lấy 1 tờ, còn lại 1. Lấy 1 tờ mệnh giá 1. Tổng: 1+1+1+1 = <strong>4 tờ</strong>.</p>
<p>Nhận ra chưa? Ở mỗi bước ta chỉ hỏi đúng 1 câu: <strong>"mệnh giá lớn nhất mà tôi còn dùng được là bao nhiêu?"</strong> — không cần nghĩ trước các bước sau, cứ lấy nhiều nhất có thể rồi lặp lại với phần còn dư.</p>

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

<p class="idea-label">⚠️ Bước 2 — Vì sao chiến lược này KHÔNG phải lúc nào cũng đúng</p>
<p>Thử đổi 6đ với hệ mệnh giá khác: <strong>{1, 3, 4}</strong>.</p>
<table class="formula-table">
  <tr><th></th><th>Các bước</th><th>Kết quả</th></tr>
  <tr><td>Tham lam (lấy lớn nhất trước)</td><td>Lớn nhất ≤6 là 4 → lấy 1 đồng, còn 2. Lớn nhất ≤2 là 1 → lấy 2 đồng.</td><td>4+1+1 = <strong>3 đồng</strong></td></tr>
  <tr><td>Cách tốt nhất thực sự</td><td>3 + 3 = 6</td><td><strong>2 đồng</strong></td></tr>
</table>
<p>Tham lam cho ra 3 đồng, nhưng đáp án đúng chỉ cần 2 đồng — Tham lam <strong>sai</strong> ở hệ tiền này. Lý do: khi lấy đồng 4 trước, nó "dùng hết" phần lớn giá trị 6đ một cách vội vàng, không để lại phần dư đẹp cho các đồng khác — trong khi hệ {25,10,5,1} được thiết kế cẩn thận (mỗi mệnh giá đều là bội số "đẹp" của mệnh giá nhỏ hơn) để điều này không bao giờ xảy ra.</p>
<blockquote><p><strong>Ghi nhớ</strong>: chiến lược tham lam ở trên <strong>chỉ đúng với hệ tiền "chuẩn"</strong> như tiền thật đang lưu hành. Với hệ mệnh giá tùy ý, bắt buộc phải giải bằng Quy hoạch động để đảm bảo luôn đúng.</p></blockquote>

<div class="realworld">
  <span class="rw-title">🌐 Ứng dụng thực tế</span>
  <dl>
    <dt>Dùng ở đâu</dt>
    <dd>Máy ATM/máy bán hàng tự động tính tiền thối với hệ mệnh giá chuẩn của quốc gia; hệ thống POS (điểm bán hàng) gợi ý tiền thối tối thiểu.</dd>
    <dt>Giải quyết vấn đề gì</dt>
    <dd>Tính số lượng tờ/đồng tiền ít nhất để trả đúng 1 số tiền, với hệ mệnh giá đang lưu hành.</dd>
    <dt class="good">Khi nào NÊN dùng</dt>
    <dd class="good">Hệ tiền tệ thực tế đang dùng (hầu hết đều là hệ "chuẩn" được thiết kế để Tham lam đúng).</dd>
    <dt class="bad">Khi nào KHÔNG NÊN dùng</dt>
    <dd class="bad">Hệ mệnh giá tùy ý/không chuẩn (ví dụ hệ điểm thưởng, xu game với mệnh giá bất kỳ) — bắt buộc dùng QHĐ để đảm bảo đúng.</dd>
  </dl>
</div>

<h3 id="auto-noi-day-rope-joining-kien-thuc-nen-khong-co-trong-">Nối dây (Rope Joining) — kiến thức nền, không có trong đề ôn tập</h3>
<p class="idea-label">🗣️ Bước 0 — Đề thực sự hỏi gì</p>
<p>Có n đoạn dây độ dài khác nhau. Nối 2 đoạn bất kỳ lại tốn chi phí = <strong>tổng độ dài 2 đoạn đó</strong> (đoạn mới tạo ra có độ dài bằng tổng, dùng để nối tiếp ở bước sau). Nối hết thành 1 đoạn duy nhất, hỏi <strong>tổng chi phí nhỏ nhất</strong> là bao nhiêu.</p>
<p class="idea-label">🗣️ Bước 1 — Trực giác: vì sao luôn nối 2 đoạn NGẮN nhất</p>
<p>Mỗi đoạn dây sẽ bị "cộng dồn chi phí" nhiều lần — mỗi lần nó nằm trong 1 lần nối là 1 lần chi phí của nó được tính thêm 1 lần. Đoạn càng bị nối trễ (nối ở những bước sau, khi nó đã "gộp" với nhiều đoạn khác) thì giá trị của nó càng được cộng dồn nhiều lần vào tổng chi phí. Vậy ta muốn: <strong>đoạn có giá trị nhỏ luôn được "gộp" sớm nhất</strong> để nó chỉ bị cộng dồn ít lần — tức luôn nối 2 đoạn nhỏ nhất hiện có trước.</p>
<p class="idea-label">🗣️ Bước 2 — Công cụ cần dùng: hàng đợi ưu tiên (priority queue / min-heap)</p>
<p>Vấn đề: sau mỗi lần nối, ta lại tạo ra 1 đoạn MỚI (bằng tổng 2 đoạn cũ) — đoạn mới này lại phải so sánh với các đoạn cũ còn lại để tìm "2 đoạn nhỏ nhất hiện có" cho bước tiếp theo. Nếu dùng mảng thường, mỗi lần tìm nhỏ nhất phải duyệt lại từ đầu — chậm. <strong>Hàng đợi ưu tiên (priority queue)</strong> là 1 cấu trúc dữ liệu luôn tự động biết "phần tử nhỏ nhất hiện có là gì" chỉ trong O(1), và khi thêm/lấy phần tử tốn O(log n) — nhanh hơn nhiều so với duyệt lại từ đầu mỗi lần.</p>
<p>Trong C++, khai báo hàng đợi ưu tiên kiểu "lấy nhỏ nhất trước" (min-heap) là <code>priority_queue&lt;int, vector&lt;int&gt;, greater&lt;int&gt;&gt;</code> — mặc định <code>priority_queue</code> lấy LỚN nhất trước, nên cần thêm <code>greater&lt;int&gt;</code> để đảo lại thành lấy NHỎ nhất trước.</p>

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

<blockquote><p>🎯 Đây chính là ý tưởng cốt lõi của <strong>Huffman Coding</strong> (thuật toán nén dữ liệu): liên tục ghép 2 phần tử nhỏ nhất, xây cây từ dưới lên.</p></blockquote>

<div class="realworld">
  <span class="rw-title">🌐 Ứng dụng thực tế</span>
  <dl>
    <dt>Dùng ở đâu</dt>
    <dd>Nén file (ZIP/JPEG/MP3) qua thuật toán Huffman Coding; gộp file/gói tin nhỏ thành khối lớn hơn để giảm chi phí xử lý (I/O batching); lập lịch ghép nối các tác vụ có "chi phí khởi động" theo kích thước.</dd>
    <dt>Giải quyết vấn đề gì</dt>
    <dd>Tối thiểu tổng chi phí khi phải ghép nối tuần tự nhiều phần tử thành 1.</dd>
    <dt class="good">Khi nào NÊN dùng</dt>
    <dd class="good">Chi phí ghép 2 phần tử tỉ lệ thuận với tổng kích thước của chúng; cần nén dữ liệu không mất mát dựa trên tần suất.</dd>
    <dt class="bad">Khi nào KHÔNG NÊN dùng</dt>
    <dd class="bad">Chi phí ghép không đơn giản là tổng 2 phần tử (ví dụ có chi phí cố định mỗi lần ghép) — cần mô hình hóa lại bài toán trước khi áp dụng.</dd>
  </dl>
</div>

<h4 id="auto-luyen-tap">Luyện tập</h4>
<ol class="practice">
  <li>Chạy tay Activity Selection với 1 bộ 5-6 hoạt động tự nghĩ.
    <div class="idea"><em>Ý tưởng:</em> trước khi động bút, tự hỏi "hoạt động nào giải phóng thời gian sớm nhất?" — câu trả lời đó luôn là hoạt động được chọn kế tiếp, không cần so sánh gì phức tạp hơn.</div>
    <div class="hint"><em>Hướng dẫn:</em> sắp theo <code>finish</code> tăng dần trước — bước hay bị quên.</div>
  </li>
  <li>Đổi 63đ với hệ {1,5,10,25}, đối chiếu tay và code.
    <div class="idea"><em>Ý tưởng:</em> mỗi bước chỉ hỏi 1 câu duy nhất — "đồng lớn nhất tôi còn dùng được là bao nhiêu?" — rồi lấy nhiều nhất có thể, không cần nghĩ trước các bước sau.</div>
    <div class="hint"><em>Hướng dẫn:</em> 63/25=2 dư 13; 13/10=1 dư 3; 3/5=0 dư 3; 3/1=3. Tổng 2+1+0+3=6 đồng.</div>
  </li>
  <li>Nối các đoạn dây {1, 2, 3, 4, 5} — tính tổng chi phí nhỏ nhất bằng tay rồi đối chiếu code.
    <div class="idea"><em>Ý tưởng:</em> luôn lấy 2 đoạn nhỏ nhất hiện có trong hàng đợi ưu tiên, không phải 2 đoạn nhỏ nhất ban đầu — sau mỗi lần nối, đoạn mới tạo ra có thể lại là 1 trong 2 đoạn nhỏ nhất tiếp theo.</div>
    <div class="hint"><em>Hướng dẫn:</em> nối 1+2=3 (còn {3,3,4,5}) → nối 3+3=6 (còn {4,5,6}) → nối 4+5=9 (còn {6,9}) → nối 6+9=15. Tổng: 3+6+9+15=33.</div>
  </li>
  <li>Vì sao Activity Selection sắp theo giờ <strong>kết thúc</strong>, không phải giờ bắt đầu?
    <div class="hint"><em>Hướng dẫn:</em> hoạt động kết thúc sớm nhất luôn nhường chỗ sớm nhất cho hoạt động sau.</div>
  </li>
</ol>


</section>
</template>

<script setup>
import { onMounted } from 'vue'
import { initThamLamWidgets } from '../widgets/tham-lam.js'

defineProps({ active: Boolean })

onMounted(() => {
  initThamLamWidgets()
})
</script>
