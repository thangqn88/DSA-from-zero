<template>
<section id="to-hop" class="day-section" data-sid="to-hop" v-show="active">

<h2>Tổ Hợp <span class="exam-tag">★ Đề ôn tập — Bài 1</span></h2>

<LessonGoal :sid="'to-hop'">
  <ul>
    <li v-for="(g, i) in data.goal" :key="i">{{ g }}</li>
  </ul>
</LessonGoal>

<LessonPart :sid="'to-hop'" part="ly-thuyet">

<h4>Tổ hợp — chọn ai, không quan tâm ai chọn trước ai chọn sau</h4>

<p>Bạn có 4 người bạn {1, 2, 3, 4} và cần chọn ra 2 người đi chơi cùng. "Chọn 1 rồi chọn 2" và "chọn 2 rồi chọn 1" cho ra đúng một nhóm bạn đi chơi — <strong>thứ tự bạn nhắc tên họ không làm nhóm khác đi</strong>.</p>

<p><strong>Đây là gì?</strong> Đó chính là <strong>tổ hợp</strong> (combination): chọn ra một nhóm con từ một tập lớn hơn, mà thứ tự chọn không tạo ra sự khác biệt. Ngược lại, nếu bài toán là "xếp 2 người này vào ghế thứ nhất và ghế thứ hai" thì thứ tự lại quan trọng — đó là <strong>hoán vị</strong> (permutation), việc bạn sẽ gặp ở ví dụ chính thức phía dưới.</p>

<p><strong>Vì sao quan trọng?</strong> Rất nhiều bài toán đếm/liệt kê thực chất chỉ là hỏi "tổ hợp hay hoán vị" trước khi hỏi "làm sao code". Nhận sai câu hỏi này dẫn tới sinh dư nghiệm trùng, hoặc thiếu nghiệm vì lọc quá tay.</p>

<p><strong>Làm sao dùng?</strong> Khi sinh tổ hợp bằng quay lui, ta cần một quy tắc để máy tính không in trùng {1,2} và {2,1}. Quy tắc đó là: <strong>phần tử chọn sau luôn phải lớn hơn phần tử chọn ngay trước nó.</strong> Nhờ vậy mỗi nhóm chỉ được sinh ra đúng một lần, theo đúng thứ tự tăng dần của chỉ số.</p>

<table class="formula-table">
  <tr><th>Khái niệm</th><th>Thứ tự có tính không?</th><th>Ví dụ với {1,2,3}, chọn 2</th></tr>
  <tr><td>Tổ hợp</td><td>Không — {1,2} = {2,1}</td><td>{1,2}, {1,3}, {2,3} — 3 nhóm</td></tr>
  <tr><td>Hoán vị (chọn có sắp xếp)</td><td>Có — (1,2) ≠ (2,1)</td><td>(1,2),(2,1),(1,3),(3,1),(2,3),(3,2) — 6 cách</td></tr>
  <tr><td>Tập con</td><td>Không, và có thể chọn 0 phần tử</td><td>{}, {1}, {2}, {3}, {1,2}, {1,3}, {2,3}, {1,2,3} — 8 tập</td></tr>
</table>

<p>Để ý tập con chính là tổ hợp nhưng không cố định số lượng phải chọn — nó gộp lại tổ hợp chập 0, chập 1, ..., chập n của cùng một tập.</p>

</LessonPart>

<LessonPart :sid="'to-hop'" part="vi-sao">

<p>Đây là nơi <strong>quay lui bạn vừa học được dùng lại y hệt</strong>, chỉ đổi một điều kiện nhỏ. Khung "thử — đi sâu — hoàn tác" và 4 câu hỏi khung (đặt gì ở bước i / vòng lặp chạy từ đâu / điều kiện chấp nhận / khi nào là nghiệm hoàn chỉnh) vẫn áp dụng nguyên vẹn — khác biệt duy nhất so với sinh xâu nhị phân là vòng lặp thử nhiều lựa chọn hơn 2, và có thêm điều kiện "chỉ thử số lớn hơn số vừa chọn".</p>

<div class="realworld">
  <span class="rw-title">🌐 Ứng dụng thực tế</span>
  <dl>
    <dt>Dùng ở đâu</dt>
    <dd>Tính xác suất trúng số/xổ số; hệ thống gợi ý ưu đãi thương mại điện tử "chọn 2 trong 5 món"; thiết kế thử nghiệm A/B khi chọn tập con người dùng để test; hàm <code>std::next_permutation</code> có sẵn trong thư viện chuẩn C++ dùng đúng thuật toán ở ví dụ 2 dưới đây.</dd>
    <dt>Giải quyết vấn đề gì</dt>
    <dd>Đếm hoặc liệt kê số cách chọn ra một tập con (tổ hợp), hoặc duyệt tuần tự các cách sắp xếp theo thứ tự (hoán vị) mà không cần sinh hết rồi sắp lại.</dd>
    <dt class="good">Khi nào NÊN dùng</dt>
    <dd class="good">Cần liệt kê từng tổ hợp cụ thể với n, k đủ nhỏ; hoặc cần hoán vị kế tiếp/trước đó theo thứ tự từ điển mà không lưu toàn bộ danh sách.</dd>
    <dt class="bad">Khi nào KHÔNG NÊN dùng</dt>
    <dd class="bad">Nếu chỉ cần <strong>số lượng</strong> tổ hợp, dùng công thức C(n,k) bằng QHĐ sẽ nhanh hơn — không cần sinh hết rồi đếm. Nếu cần liệt kê TOÀN BỘ hoán vị cùng lúc, dùng quay lui (như ví dụ 1) thay vì hoán vị kế tiếp.</dd>
  </dl>
</div>

</LessonPart>

<LessonPart :sid="'to-hop'" part="quiz">
  <QuizBlock :questions="data.quiz" />
</LessonPart>

<LessonPart :sid="'to-hop'" part="vi-du">

<WorkedExample id="vd-to-hop-chap-k" title="Tổ hợp chập k của n">
  <template #de-bai>
    <p>Cho hai số nguyên dương n và k. Hãy in ra mọi tổ hợp chập k của n số {1, 2, ..., n}, mỗi tổ hợp trên một dòng, theo thứ tự tăng dần các chỉ số.</p>
    <table class="formula-table">
      <tr><th>Input</th><th>Output</th></tr>
      <tr><td>n = 4, k = 2</td><td>1 2<br>1 3<br>1 4<br>2 3<br>2 4<br>3 4</td></tr>
    </table>
  </template>

  <template #y-tuong>
    <p>Bạn có 4 người bạn {1,2,3,4} và cần chọn ra 2 người đi chơi cùng. "Chọn 1 và 2" với "chọn 2 và 1" là <strong>cùng một nhóm</strong> — thứ tự không quan trọng. Để máy tính không in trùng, ta đặt quy tắc: <strong>phần tử chọn sau luôn phải lớn hơn phần tử chọn trước</strong>.</p>
    <p>Đây vẫn là khung quay lui bạn vừa học, chỉ khác hai chỗ so với sinh xâu nhị phân: vòng lặp thử nhiều hơn 2 giá trị, và có thêm điều kiện "số sau lớn hơn số trước" thay vì mọi giá trị đều hợp lệ.</p>
  </template>

  <template #thuat-toan>
    <p>Trả lời 4 câu hỏi khung:</p>
    <ol>
      <li><strong>Bước thứ mấy đặt gì?</strong> Đặt phần tử thứ <code>count</code> của tổ hợp, ghi vào <code>chosen[count]</code>.</li>
      <li><strong>Thử lựa chọn nào?</strong> Vòng lặp <code>for (v = start; v &lt;= n; v++)</code>.</li>
      <li><strong>Điều kiện chấp nhận?</strong> Không cần kiểm tra riêng — biến <code>start</code> đã tự loại các giá trị nhỏ hơn hoặc bằng phần tử vừa chọn.</li>
      <li><strong>Khi nào là nghiệm hoàn chỉnh?</strong> Khi <code>count == k</code>, tức đã chọn đủ k phần tử.</li>
    </ol>
    <p>Lời gọi đệ quy kế tiếp dùng <code>backtrack(v + 1, count + 1)</code> — chỉ xét những số <strong>lớn hơn</strong> v ở bước sau, đây chính là quy tắc chống trùng.</p>
  </template>

  <template #chay-tay>
    <p>Với n = 4, k = 2, gọi <code>backtrack(1, 0)</code>. Bảng dưới theo dõi 6 lần chương trình chạm <code>count == 2</code> và in ra kết quả:</p>
    <table class="formula-table">
      <tr><th>Lần in</th><th>chosen[0]</th><th>chosen[1]</th><th>In ra</th></tr>
      <tr><td>1</td><td>1</td><td>2</td><td>1 2</td></tr>
      <tr><td>2</td><td>1</td><td>3</td><td>1 3</td></tr>
      <tr><td>3</td><td>1</td><td>4</td><td>1 4</td></tr>
      <tr><td>4</td><td>2</td><td>3</td><td>2 3</td></tr>
      <tr><td>5</td><td>2</td><td>4</td><td>2 4</td></tr>
      <tr><td>6</td><td>3</td><td>4</td><td>3 4</td></tr>
    </table>
    <p>Đúng C(4,2) = 6 tổ hợp, không có nghiệm nào lặp lại vì mỗi cặp luôn được in theo đúng một thứ tự tăng dần.</p>
  </template>

  <template #code>
<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int n = 4, k = 2, chosen[10];

void backtrack(int start, int count) {
    if (count == k) {
        for (int i = 0; i &lt; count; i++) cout &lt;&lt; chosen[i] &lt;&lt; " ";
        cout &lt;&lt; "\n";
        return;
    }
    for (int v = start; v &lt;= n; v++) {
        chosen[count] = v;
        backtrack(v + 1, count + 1);   // chỉ xét số LỚN HƠN v ở bước sau
    }
}

int main() {
    backtrack(1, 0);   // in ra: 1 2 / 1 3 / 1 4 / 2 3 / 2 4 / 3 4
    return 0;
}</code></pre>
  </template>

  <template #toi-uu>
    <p><strong>Cắt nhánh khi phần còn lại không đủ k phần tử.</strong> Nếu n lớn, có những nhánh chắc chắn không thể hoàn thành: ví dụ đã chọn được 1 phần tử, còn cần thêm 3 phần tử nữa, nhưng chỉ còn 2 số lớn hơn <code>start</code> trong dãy — nhánh này chắc chắn thất bại, không cần đi tiếp. Điều kiện cắt là: số phần tử còn cần chọn <code>(k - count)</code> phải không lớn hơn số ứng viên còn lại <code>(n - start + 1)</code>.</p>
<pre v-pre><code>void backtrack(int start, int count) {
    if (count == k) { /* in kết quả */ return; }
    if (k - count &gt; n - start + 1) return;   // CẮT NHÁNH: không đủ số để chọn tiếp
    for (int v = start; v &lt;= n; v++) {
        chosen[count] = v;
        backtrack(v + 1, count + 1);
    }
}</code></pre>
    <p>Với n = 4, k = 2 con số này nhỏ nên không thấy khác biệt, nhưng khi n lên tới vài chục và k gần bằng n, cắt nhánh này bỏ được rất nhiều nhánh vô ích ngay từ sớm.</p>
  </template>
</WorkedExample>

<p>Bấm "Bước tiếp theo" để xem trạng thái mảng <code>chosen[]</code> và lời gọi <code>backtrack</code> đang lồng nhau thế nào khi sinh tổ hợp chập 2 của {1,2,3,4}:</p>

<div class="widget">
  <div class="widget-label">Trạng thái mảng chosen[] — tổ hợp chập 2 của {1,2,3,4}</div>
  <div id="d2CombArrayView" style="display:flex; justify-content:center; gap: 10px; margin: 1.5rem 0;"></div>
  <div class="widget-label">Đang ở lời gọi backtrack nào — dạng thư mục lồng nhau</div>
  <div id="d2CombCallStackView" style="font-family: monospace; font-size: 0.85rem; line-height: 1.9; min-height: 130px; margin-bottom: 1rem;"></div>
  <div class="caption" id="d2CombCaption">Bấm "Bước tiếp theo" để bắt đầu.</div>
  <div class="controls">
    <button class="secondary" id="d2CombPrev">← Lùi lại</button>
    <button id="d2CombNext">Bước tiếp theo →</button>
    <button class="secondary" id="d2CombReset">Chạy lại từ đầu</button>
  </div>
  <div class="step-info"><span id="d2CombStepNum">0</span> / <span id="d2CombStepTotal">0</span> bước — kết quả đã in: <span id="d2CombResults" style="font-family: monospace;"></span></div>
</div>

<WorkedExample id="vd-hoan-vi-ke-tiep" title="Hoán vị kế tiếp (Next Permutation)" :official="true">
  <template #de-bai>
    <div class="problem-box">
      <span class="pb-title">📋 Nguyên văn đề bài</span>
      <p>Cho số tự nhiên N và một hoán vị X[] của 1, 2, ..., N. Nhiệm vụ của bạn là đưa ra hoán vị kế tiếp theo X[].</p>
      <p>Ví dụ N=5, X[] = {1, 2, 3, 4, 5} thì hoán vị kế tiếp theo của X[] là {1, 2, 3, 5, 4}.</p>
      <p><strong>Input:</strong> Dòng đầu tiên đưa vào số lượng test T. Những dòng kế tiếp đưa vào các bộ test. Mỗi bộ test gồm hai dòng: dòng thứ nhất là số N; dòng tiếp theo đưa vào hoán vị X[] của 1, 2, ..., N. Ràng buộc: 1≤T≤100; 1≤N≤10³.</p>
      <p><strong>Output:</strong> Đưa ra kết quả mỗi test theo từng dòng.</p>
      <table class="formula-table"><tr><th>Input</th><th>Output</th></tr>
      <tr><td>2<br>5<br>1 2 3 4 5<br>5<br>5 4 3 2 1</td><td>1 2 3 5 4<br>1 2 3 4 5</td></tr></table>
    </div>
    <blockquote><p>📌 Bài Tổ hợp ở trên chỉ để bạn quen với khung quay lui "chọn k trong n". <strong>Đây mới là bài bạn sẽ gặp đúng nguyên văn trong đề thi</strong> — chú ý thuật toán này KHÔNG dùng quay lui, mà là một kỹ thuật riêng.</p></blockquote>
  </template>

  <template #y-tuong>
    <p class="idea-label">🗣️ Bước 0 — Hoán vị là gì (nếu bạn chưa chắc khái niệm này)</p>
    <p><strong>Hoán vị</strong> của {1,2,3} chỉ đơn giản là <strong>1 cách sắp xếp thứ tự</strong> 3 số đó. Có đúng <code>3! = 6</code> cách sắp xếp khác nhau: 123, 132, 213, 231, 312, 321. Không có gì phức tạp — đó chỉ là danh sách mọi cách trộn thứ tự có thể của cùng 1 bộ số.</p>

    <p class="idea-label">🗣️ Bước 1 — "Kế tiếp" nghĩa là gì</p>
    <p>Nếu bạn xếp <strong>cả 6 hoán vị đó theo thứ tự từ nhỏ tới lớn</strong> (giống so sánh 2 số: so chữ số đầu trước, bằng nhau mới so chữ số sau), bạn có 1 danh sách cố định:</p>
    <p style="text-align:center; font-family:monospace; font-size:1.05rem; margin:1rem 0;">123 → 132 → 213 → 231 → 312 → 321</p>
    <p>"Hoán vị kế tiếp của X" chỉ đơn giản là <strong>hoán vị đứng ngay sau X trong danh sách này</strong>. Ví dụ X=123 → kế tiếp là 132 (đứng ngay sau). Nếu X=321 (đứng cuối danh sách, không còn gì lớn hơn) → <strong>quay vòng về đầu danh sách</strong>, kế tiếp là 123.</p>
    <blockquote><p>💡 Đây đúng là 2 test case trong đề của bạn: N=5, X={1,2,3,4,5} → kế tiếp {1,2,3,5,4} (trường hợp bình thường); và N=5, X={5,4,3,2,1} (hoán vị LỚN NHẤT có thể) → kế tiếp {1,2,3,4,5} (trường hợp quay vòng về nhỏ nhất). Nếu đề chỉ cho ví dụ 1 mà bạn không để ý ví dụ 2, rất dễ bỏ sót trường hợp quay vòng khi code.</p></blockquote>

    <p class="idea-label">🗣️ Bước 2 — Vì sao cần thuật toán, không liệt kê hết ra?</p>
    <p>Với 3 số thì liệt kê hết 6 hoán vị rồi tìm "đứng sau" rất dễ. Nhưng đề cho <strong>n tới 1000</strong> — số hoán vị khi đó là <code>1000!</code>, một con số khổng lồ không thể liệt kê hết. Vậy câu hỏi thật sự của bài toán là: <strong>làm sao suy ra được "hộp kế tiếp" trực tiếp từ X, mà không cần vẽ ra cả danh sách?</strong> Đó là lý do cần 1 thuật toán riêng — thuật toán chỉ là mẹo tính tắt, bản chất bài toán vẫn là "tìm ô kế tiếp trong danh sách" như Bước 1.</p>

    <p class="idea-label">🗣️ Bước 3 — Trực giác của thuật toán: sửa "ít nhất có thể"</p>
    <p>Nghĩ về việc đếm số thường ngày: sau 129 là 130 — bạn không đổi hết cả 3 chữ số, chỉ đổi <strong>đoạn đuôi ngắn nhất có thể</strong> (129→130: chữ số hàng chục 2→3, hàng đơn vị 9→0). Hoán vị kế tiếp hoạt động y hệt: giữ nguyên phần đầu càng nhiều càng tốt, chỉ sửa 1 đoạn đuôi nhỏ nhất.</p>
    <p>Vậy khi nào 1 đoạn đuôi "hết cách" để tăng thêm? Khi đoạn đó đang <strong>giảm dần</strong> — ví dụ đuôi "43" của số 1543: đây đã là cách xếp LỚN NHẤT có thể từ 2 chữ số {3,4}, không thể lớn hơn nữa. Phải lùi ra xa hơn, tới chữ số đầu tiên (từ phải qua) mà <strong>còn tăng được</strong> so với chữ số ngay sau nó.</p>
  </template>

  <template #thuat-toan>
    <p><strong>Thuật toán 3 bước chuẩn</strong> (áp dụng cho hoán vị X[0..n-1]):</p>
    <ol>
      <li><strong>Tìm điểm gãy (pivot)</strong>: đi từ phải sang trái, tìm chỉ số <code>i</code> lớn nhất sao cho <code>X[i] &lt; X[i+1]</code> (đoạn từ i+1 tới cuối đang giảm dần — đã "cạn" khả năng lớn hơn). Nếu không tìm thấy <code>i</code> nào (cả dãy giảm dần từ đầu tới cuối) → đây đã là hoán vị lớn nhất, quay vòng về nhỏ nhất.</li>
      <li><strong>Tìm người thay thế</strong>: trong đoạn giảm dần <code>X[i+1..n-1]</code>, tìm phần tử <strong>nhỏ nhất nhưng vẫn lớn hơn <code>X[i]</code></strong> — chính là phần tử cuối cùng (đi từ phải sang) còn lớn hơn <code>X[i]</code>. Đổi chỗ nó với <code>X[i]</code>.</li>
      <li><strong>Sắp lại đoạn đuôi</strong>: sau khi đổi chỗ, đoạn <code>X[i+1..n-1]</code> vẫn đang giảm dần — đảo ngược nó thành tăng dần để có giá trị <strong>nhỏ nhất có thể</strong> cho đoạn đuôi này (nhỏ nhất trong số các hoán vị lớn hơn hoán vị gốc).</li>
    </ol>
  </template>

  <template #chay-tay>
    <p><strong>Chạy tay đúng ví dụ 1 trong đề</strong>: N=5, X = {1, 2, 3, 4, 5}.</p>
    <table class="formula-table">
      <tr><th>Bước</th><th>Việc làm</th><th>Kết quả</th></tr>
      <tr><td>1. Tìm pivot i</td><td>Đi từ phải: so <code>a[i]&lt;a[i+1]</code>: a[3]=4 &lt; a[4]=5 → đúng ngay tại i=3</td><td>i = 3 (giá trị 4)</td></tr>
      <tr><td>2. Tìm người thay thế</td><td>Đoạn sau i chỉ có {5}. Phần tử nhỏ nhất mà vẫn lớn hơn 4 chính là 5</td><td>j = 4 (giá trị 5)</td></tr>
      <tr><td>Đổi chỗ a[i], a[j]</td><td>Đổi 4 và 5</td><td>{1, 2, 3, 5, 4}</td></tr>
      <tr><td>3. Đảo ngược đuôi sau i</td><td>Đoạn sau i (vị trí 4) chỉ có 1 phần tử "4" — đảo ngược không đổi gì</td><td><strong>{1, 2, 3, 5, 4}</strong></td></tr>
    </table>
    <p>Khớp đúng đáp án đề bài: hoán vị kế tiếp của {1,2,3,4,5} là <strong>{1,2,3,5,4}</strong>.</p>

    <p><strong>Chạy tay đúng ví dụ 2 trong đề — trường hợp quay vòng</strong>: N=5, X = {5, 4, 3, 2, 1}.</p>
    <table class="formula-table">
      <tr><th>Bước</th><th>Việc làm</th><th>Kết quả</th></tr>
      <tr><td>1. Tìm pivot i</td><td>Đi từ phải: a[3]=2 &lt; a[4]=1? không. a[2]=3&lt;a[3]=2? không. a[1]=4&lt;a[2]=3? không. a[0]=5&lt;a[1]=4? không. Không tìm thấy i nào — cả dãy giảm dần từ đầu tới cuối.</td><td>i = -1 (không có pivot)</td></tr>
      <tr><td>Kết luận</td><td>{5,4,3,2,1} đã là hoán vị LỚN NHẤT có thể của {1..5} — không còn gì lớn hơn nữa</td><td>Quay vòng về nhỏ nhất</td></tr>
      <tr><td>3. Đảo ngược toàn bộ mảng</td><td>Vì i=-1, đoạn "đuôi" chính là toàn bộ mảng — đảo ngược {5,4,3,2,1} thành tăng dần</td><td><strong>{1, 2, 3, 4, 5}</strong></td></tr>
    </table>
    <p>Khớp đúng đáp án đề bài: hoán vị kế tiếp của {5,4,3,2,1} là <strong>{1,2,3,4,5}</strong> — đúng như bức tranh "quay vòng về đầu danh sách" ở Bước 1.</p>
  </template>

  <template #code>
<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int a[1005];   // mảng cố định, đủ lớn cho n ≤ 1000 theo đề

void nextPermutation(int n) {
    int i = n - 2;
    while (i &gt;= 0 && a[i] &gt;= a[i + 1]) i--;   // Bước 1: tìm pivot i

    if (i &gt;= 0) {
        int j = n - 1;
        while (a[j] &lt;= a[i]) j--;              // Bước 2: tìm người thay thế nhỏ nhất > a[i]
        swap(a[i], a[j]);
    }

    // Bước 3: đảo ngược đoạn đuôi a[i+1 .. n-1] bằng 2 con trỏ (giống bài "đảo ngược từng từ" ở phần Ngăn xếp)
    int l = i + 1, r = n - 1;
    while (l &lt; r) { swap(a[l], a[r]); l++; r--; }
    // Nếu i == -1 (không tìm thấy pivot): l=0, r=n-1 → đảo ngược cả mảng — quay về hoán vị nhỏ nhất
}

int main() {
    int T; cin &gt;&gt; T;
    while (T--) {
        int n; cin &gt;&gt; n;
        for (int k = 0; k &lt; n; k++) cin &gt;&gt; a[k];
        nextPermutation(n);
        for (int k = 0; k &lt; n; k++) cout &lt;&lt; a[k] &lt;&lt; " ";
        cout &lt;&lt; "\n";
    }
    return 0;
}</code></pre>
    <blockquote><p>📎 <strong>Vì sao dùng mảng thường thay vì <code>vector</code>?</strong> Đề cho <strong>n thay đổi theo từng bộ test</strong> (test này n=5, test khác có thể n=1000). Với mảng thường, cách xử lý là khai báo 1 mảng đủ lớn (<code>int a[1005]</code>) dùng chung cho mọi test, rồi tự truyền biến <code>n</code> riêng vào hàm để biết đang dùng bao nhiêu phần tử — khác với <code>vector</code> tự co giãn kích thước và tự nhớ <code>a.size()</code>. Ở bước 3, thay vì gọi sẵn <code>reverse()</code> của <code>vector</code>, ta tự viết vòng lặp 2 con trỏ <code>l, r</code> tiến vào nhau — đây đúng là kỹ thuật bạn đã dùng ở bài "đảo ngược từng từ trong xâu" (Bài 5, phần Ngăn xếp). <strong>Thuật toán (tìm pivot → tìm người thay thế → đảo ngược đuôi) hoàn toàn không đổi</strong> — khác biệt duy nhất là công cụ lưu trữ dữ liệu.</p></blockquote>

    <p class="idea-label">🔁 Cách viết khác — dùng <code>vector</code> (nếu bạn thích cú pháp gọn hơn)</p>
    <p>Đây là <strong>đúng thuật toán y hệt</strong> ở trên, chỉ đổi công cụ lưu trữ. Với <code>vector</code>, hàm <code>reverse()</code> có sẵn được gọi thẳng bằng <code>a.begin()</code>/<code>a.end()</code> — không cần tự viết vòng lặp 2 con trỏ <code>l, r</code> nữa, vì <code>reverse()</code> chính là kỹ thuật đó đã được đóng gói sẵn.</p>
<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

void nextPermutation(vector&lt;int&gt;& a) {
    int n = a.size();
    int i = n - 2;
    while (i &gt;= 0 && a[i] &gt;= a[i + 1]) i--;   // Bước 1: tìm pivot i

    if (i &gt;= 0) {
        int j = n - 1;
        while (a[j] &lt;= a[i]) j--;              // Bước 2: tìm người thay thế nhỏ nhất > a[i]
        swap(a[i], a[j]);
    }
    reverse(a.begin() + i + 1, a.end());        // Bước 3: gọi thẳng hàm reverse() có sẵn
    // Nếu i == -1 (không tìm thấy pivot): reverse cả mảng — quay về hoán vị nhỏ nhất
}

int main() {
    int T; cin &gt;&gt; T;
    while (T--) {
        int n; cin &gt;&gt; n;
        vector&lt;int&gt; a(n);
        for (int &v : a) cin &gt;&gt; v;
        nextPermutation(a);
        for (int v : a) cout &lt;&lt; v &lt;&lt; " ";
        cout &lt;&lt; "\n";
    }
    return 0;
}</code></pre>
    <blockquote><p>💡 <strong>So sánh nhanh 2 bản</strong>: bản mảng thường phải tự khai báo kích thước đủ lớn và tự truyền <code>n</code>, còn bản <code>vector</code> tự co giãn theo từng test (<code>vector&lt;int&gt; a(n)</code>) và tự biết kích thước qua <code>a.size()</code>. Về mặt thuật toán, <strong>2 bản giống nhau 100%</strong> — chọn bản nào là tùy bạn thấy quen tay hơn khi đi thi.</p></blockquote>
  </template>

  <template #toi-uu>
    <p><strong>Vì sao dùng <code>reverse()</code> ở bước 3, không phải <code>sort()</code>?</strong> Đoạn đuôi trước khi đổi chỗ vốn <strong>đã giảm dần</strong> (đó là lý do ta chọn được nó ở bước 1) — sau khi đổi chỗ nó vẫn giảm dần, nên chỉ cần <code>reverse()</code> chạy O(k) là ra ngay thứ tự tăng dần, không cần <code>sort()</code> tốn O(k log k). Đây là điểm khác biệt lớn nhất so với cách "sinh hết bằng quay lui rồi sort lại tìm hoán vị kế tiếp": thuật toán này chạy tại chỗ trong O(n), không tốn bộ nhớ phụ để lưu danh sách hoán vị.</p>
  </template>
</WorkedExample>

</LessonPart>

<LessonPart :sid="'to-hop'" part="bai-tap">
  <PracticeSet :items="data.practice" />
</LessonPart>

<LessonPart :sid="'to-hop'" part="leetcode">
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
import data from '../data/lessons/to-hop.js'
import { initToHopWidgets } from '../widgets/to-hop.js'

defineProps({ active: Boolean })

onMounted(() => {
  initToHopWidgets()
})
</script>
