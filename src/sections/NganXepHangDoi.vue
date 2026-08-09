<template>
<section id="ngan-xep-hang-doi" class="day-section" data-sid="ngan-xep-hang-doi" v-show="active">

<h2>Ngăn Xếp &amp; Hàng Đợi <span class="exam-tag">★ Đề ôn tập — Bài 5, 6 · Đề bổ sung — Dãy ngoặc đúng dài nhất, D03003, D03014, nhóm D03</span></h2>
<div class="mini-toc">
  <span class="mt-label">Chuyển nhanh tới</span>
  <a class="mt-exam" href="#bai6-ngoac-hop-le">★ Bài 6 — Kiểm tra ngoặc hợp lệ</a>
  <a class="mt-exam" href="#bai5-reverse-words">★ Bài 5 — Đảo ngược từng từ</a>
  <a class="mt-exam" href="#guide-baiBS1-full">Ngoặc đúng dài nhất</a>
  <a class="mt-exam" href="#guide-baiBS2">D03003 — Dư thừa ngoặc</a>
  <a class="mt-exam" href="#guide-baiBS3-full">D03014 — Biến đổi S→T</a>
  <a class="mt-exam" href="#guide-baiD03">Nhóm D03 (Ngăn xếp/Hàng đợi bổ sung)</a>
</div>
<p>Đây là 2 cấu trúc dữ liệu nền tảng cho toàn bộ chương Đồ thị sắp học (DFS dùng ngăn xếp, BFS dùng hàng đợi), và cũng có bài tập độc lập hay bị hỏi riêng.</p>

<h3 id="auto-ngan-xep-stack-lifo">Ngăn xếp (Stack) — LIFO</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Giống 1 chồng đĩa trong quán ăn: đĩa nào rửa xong <strong>đặt lên trên cùng</strong> thì cũng là đĩa <strong>lấy ra trước tiên</strong> khi cần dùng. Đó là nguyên tắc <strong>LIFO — Last In, First Out</strong>.</p>

<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int stackArr[100], top = -1;

void push(int v) { stackArr[++top] = v; }
int pop() { return stackArr[top--]; }
int peek() { return stackArr[top]; }
bool isEmpty() { return top == -1; }

int main() {
    push(1); push(2); push(3);
    cout &lt;&lt; peek() &lt;&lt; "\n";   // in ra: 3
    cout &lt;&lt; pop() &lt;&lt; "\n";    // in ra: 3 (và loại khỏi ngăn xếp)
    cout &lt;&lt; peek();           // in ra: 2
    return 0;
}</code></pre>

<p>STL có sẵn: <code>stack&lt;int&gt; s; s.push(); s.pop(); s.top(); s.empty();</code></p>

<h4 id="bai6-ngoac-hop-le">★ Bài chính thức trong Đề ôn tập — Bài 6: Kiểm tra biểu thức dấu ngoặc cân xứng</h4>

<div class="problem-box">
<span class="pb-title">📋 Nguyên văn đề bài</span>
<p>Cho một xâu chỉ gồm các kí tự '(', ')', '[', ']', '{', '}'. Một dãy ngoặc đúng được định nghĩa như sau: Xâu rỗng là 1 dãy ngoặc đúng. Nếu A là 1 dãy ngoặc đúng thì (A), [A], {A} là 1 dãy ngoặc đúng. Nếu A và B là 2 dãy ngoặc đúng thì AB là 1 dãy ngoặc đúng. Cho một xâu S. Nhiệm vụ của bạn là xác định xâu S có là dãy ngoặc đúng hay không?</p>
<p><strong>Input:</strong> Dòng đầu tiên là số lượng bộ test T (T ≤ 20). Mỗi test gồm 1 xâu S có độ dài không vượt quá 100 000.</p>
<p><strong>Output:</strong> Với mỗi test, in ra "YES" nếu như S là dãy ngoặc đúng, in ra "NO" trong trường hợp ngược lại.</p>
<table class="formula-table"><tr><th>Input</th><th>Output</th></tr>
<tr><td>2<br>[()]{}{[()()]()}<br>[(])</td><td>YES<br>NO</td></tr></table>
</div>

<p class="idea-label">🗣️ Bước 0 — Đề thực sự hỏi gì</p>
<p>Cho 1 xâu chỉ gồm 6 loại ký tự: <code>( ) [ ] { }</code>. Hỏi: mọi dấu mở có "khớp cặp" đúng với dấu đóng cùng loại, và đúng thứ tự lồng nhau không? Ví dụ <code>"([)]"</code> tuy có đủ số lượng dấu mở/đóng bằng nhau nhưng vẫn **sai**, vì dấu <code>]</code> đóng trước khi dấu <code>(</code> kịp đóng — lồng nhau sai thứ tự.</p>

<p class="idea-label">🗣️ Bước 1 — Vì sao đây là bài toán của Stack, không phải đếm số lượng</p>
<p>Thử nghĩ: nếu chỉ đếm số dấu mở và số dấu đóng rồi so sánh bằng nhau, xâu <code>"([)]"</code> sẽ bị coi là ĐÚNG (2 mở, 2 đóng) — trong khi thực tế nó SAI. Vậy đếm số lượng là **không đủ** — cái quan trọng là <strong>thứ tự đóng phải ngược với thứ tự mở</strong> (dấu mở gần nhất phải đóng trước). Đây chính xác là tính chất <strong>LIFO (vào sau ra trước)</strong> của Stack: dấu mở nào được "cất vào" (push) sau cùng thì phải được "lấy ra" (pop) để đối chiếu trước tiên.</p>

<p class="idea-label">🪜 Bước 2 — Chạy tay trước khi xem code</p>
<p>Xét xâu <code>"([)]"</code> — chạy tay từng ký tự, ghi lại trạng thái Stack sau mỗi bước:</p>
<table class="formula-table">
  <tr><th>Ký tự</th><th>Hành động</th><th>Stack sau bước (đáy → đỉnh)</th></tr>
  <tr><td><code>(</code></td><td>Dấu mở → đẩy vào Stack</td><td>( </td></tr>
  <tr><td><code>[</code></td><td>Dấu mở → đẩy vào Stack</td><td>( [</td></tr>
  <tr><td><code>)</code></td><td>Dấu đóng → lấy đỉnh Stack ra so sánh: đỉnh đang là <code>[</code>, mà <code>)</code> cần khớp với <code>(</code> → <strong>KHÔNG khớp!</strong></td><td>— dừng lại, kết luận SAI ngay tại đây</td></tr>
</table>
<p>Chú ý: lỗi bị phát hiện <strong>ngay khi gặp dấu đóng thứ nhất</strong> — không cần đọc hết cả xâu. Đây là lý do thuật toán luôn kiểm tra ngay tại chỗ, không đợi tới cuối.</p>

<p class="idea-label">🪜 Bước 3 — Từ chạy tay ra quy tắc thuật toán</p>
<ol>
  <li>Duyệt qua xâu từng ký tự một.</li>
  <li>Gặp dấu MỞ (<code>( [ {</code>) → đẩy vào Stack (để "nhớ" nó, chờ đối chiếu sau).</li>
  <li>Gặp dấu ĐÓNG (<code>) ] }</code>) → kiểm tra 2 điều: (a) Stack có đang rỗng không (rỗng nghĩa là đóng mà không có gì để đóng cùng → SAI ngay); (b) ký tự ở đỉnh Stack có đúng loại mở tương ứng không (nếu không → SAI ngay). Nếu cả 2 đều ổn → lấy đỉnh Stack ra (pop), vì cặp này đã khớp xong.</li>
  <li>Sau khi duyệt hết xâu: Stack phải <strong>RỖNG</strong> mới kết luận hợp lệ (nếu còn sót dấu mở chưa đóng, Stack sẽ còn phần tử).</li>
</ol>

<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

bool isBalanced(string s) {
    stack&lt;char&gt; st;
    for (char c : s) {
        if (c=='('||c=='['||c=='{') st.push(c);
        else {
            if (st.empty()) return false;
            char top = st.top(); st.pop();
            if (c==')' && top!='(') return false;
            if (c==']' && top!='[') return false;
            if (c=='}' && top!='{') return false;
        }
    }
    return st.empty();
}

int main() {
    int T; cin &gt;&gt; T;
    while (T--) {
        string s; cin &gt;&gt; s;
        cout &lt;&lt; (isBalanced(s) ? "YES" : "NO") &lt;&lt; "\n";   // đề yêu cầu in "YES"/"NO", không phải 1/0
    }
    return 0;
}</code></pre>
<blockquote><p>📎 Đề yêu cầu in chữ "YES"/"NO" (không phải <code>true</code>/<code>false</code> hay 1/0), và có nhiều bộ test T.</p></blockquote>

<div class="widget">
  <div class="widget-label">Kiểm tra "([)]" — phải ra KHÔNG cân xứng</div>
  <div style="display:flex; gap:2rem; justify-content:center; align-items:flex-end; margin: 1rem 0;">
    <div>
      <div style="text-align:center; font-size:0.8rem; color:#888; margin-bottom:4px;">Xâu đang đọc</div>
      <div id="d9BalInput" style="font-family:monospace; font-size:1.4rem; text-align:center; letter-spacing:6px;"></div>
    </div>
    <div>
      <div style="text-align:center; font-size:0.8rem; color:#888; margin-bottom:4px;">Ngăn xếp</div>
      <div id="d9BalStack" style="display:flex; flex-direction:column-reverse; gap:2px; min-height:100px; min-width:50px; border:1px dashed var(--border); padding:4px; align-items:center; justify-content:flex-start;"></div>
    </div>
  </div>
  <div class="caption" id="d9BalCaption">Bấm "Bước tiếp theo" để bắt đầu.</div>
  <div class="controls">
    <button class="secondary" id="d9BalPrev">← Lùi lại</button>
    <button id="d9BalNext">Bước tiếp theo →</button>
    <button class="secondary" id="d9BalReset">Chạy lại từ đầu</button>
  </div>
  <div class="step-info"><span id="d9BalStepNum">0</span> / <span id="d9BalStepTotal">0</span> bước</div>
</div>

<h4 id="auto-bai-toan-2-tinh-bieu-thuc-hau-to-postfix-evaluatio">Bài toán 2 — Tính biểu thức hậu tố (Postfix Evaluation)</h4>

<p class="idea-label">🗣️ Bước 0 — "Hậu tố" là gì (nếu bạn chưa quen khái niệm này)</p>
<p>Bình thường bạn viết phép tính theo kiểu <strong>trung tố (infix)</strong>: toán tử đứng GIỮA 2 toán hạng, ví dụ <code>3 + 4 * 2</code>. Kiểu viết này buộc máy tính phải "nhớ luật ưu tiên" (nhân chia trước, cộng trừ sau) và xử lý dấu ngoặc — khá rắc rối để lập trình.</p>
<p><strong>Hậu tố (postfix)</strong> viết toán tử NGAY SAU 2 toán hạng của nó: <code>3 4 2 * +</code> nghĩa là "lấy 4 và 2 nhân trước (vì <code>*</code> đứng ngay sau chúng), rồi lấy kết quả đó cộng với 3". Đọc thẳng từ trái qua phải, không cần biết luật ưu tiên hay dấu ngoặc gì cả — đây là lý do máy tính/trình biên dịch thường chuyển biểu thức sang dạng hậu tố trước khi tính.</p>

<p class="idea-label">🗣️ Bước 1 — Vì sao cần Stack để tính hậu tố</p>
<p>Khi đọc <code>3 4 2 * +</code> từ trái sang phải: gặp số thì "để dành" đó, gặp toán tử thì cần <strong>lấy lại đúng 2 số gần nhất vừa để dành</strong> để tính. "2 số gần nhất vừa để dành" — đây lại đúng là tính chất LIFO của Stack.</p>

<p class="idea-label">🪜 Bước 2 — Chạy tay trước khi xem code</p>
<table class="formula-table">
  <tr><th>Token đọc</th><th>Hành động</th><th>Stack sau bước (đáy→đỉnh)</th></tr>
  <tr><td>3</td><td>Là số → đẩy vào Stack</td><td>3</td></tr>
  <tr><td>4</td><td>Là số → đẩy vào Stack</td><td>3, 4</td></tr>
  <tr><td>2</td><td>Là số → đẩy vào Stack</td><td>3, 4, 2</td></tr>
  <tr><td>*</td><td>Là toán tử → lấy 2 phần tử ĐỈNH ra (4 và 2), tính 4*2=8, đẩy kết quả vào lại</td><td>3, 8</td></tr>
  <tr><td>+</td><td>Là toán tử → lấy 2 phần tử ĐỈNH ra (3 và 8), tính 3+8=11, đẩy kết quả vào lại</td><td>11</td></tr>
</table>
<p>Duyệt hết token, Stack còn đúng 1 phần tử — đó chính là kết quả cuối: <strong>11</strong>.</p>
<blockquote><p>⚠️ <strong>Bẫy về thứ tự phép trừ/chia</strong>: khi lấy 2 phần tử ra để tính <code>a - b</code> hoặc <code>a / b</code>, phần tử lấy ra <strong>sau</strong> (nằm dưới) phải là <code>a</code>, phần tử lấy ra <strong>trước</strong> (nằm trên đỉnh) là <code>b</code> — thứ tự ngược lại sẽ ra kết quả sai (ví dụ 4-2 khác 2-4).</p></blockquote>

<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int evalPostfix(vector&lt;string&gt;& tok) {
    stack&lt;int&gt; st;
    for (auto& t : tok) {
        if (t=="+"||t=="-"||t=="*"||t=="/") {
            int b=st.top(); st.pop();
            int a=st.top(); st.pop();
            if (t=="+") st.push(a+b);
            else if (t=="-") st.push(a-b);
            else if (t=="*") st.push(a*b);
            else st.push(a/b);
        } else st.push(stoi(t));
    }
    return st.top();
}

int main() {
    vector&lt;string&gt; tokens = {"3", "4", "2", "*", "+"};
    cout &lt;&lt; evalPostfix(tokens);   // in ra: 11
    return 0;
}</code></pre>

<div class="widget">
  <div class="widget-label">Tính "3 4 2 * +"</div>
  <div style="display:flex; gap:2rem; justify-content:center; align-items:flex-end; margin: 1rem 0;">
    <div>
      <div style="text-align:center; font-size:0.8rem; color:#888; margin-bottom:4px;">Token đang đọc</div>
      <div id="d9PostInput" style="font-family:monospace; font-size:1.4rem; text-align:center; letter-spacing:6px;"></div>
    </div>
    <div>
      <div style="text-align:center; font-size:0.8rem; color:#888; margin-bottom:4px;">Ngăn xếp</div>
      <div id="d9PostStack" style="display:flex; flex-direction:column-reverse; gap:2px; min-height:100px; min-width:60px; border:1px dashed var(--border); padding:4px; align-items:center; justify-content:flex-start;"></div>
    </div>
  </div>
  <div class="caption" id="d9PostCaption">Bấm "Bước tiếp theo" để bắt đầu.</div>
  <div class="controls">
    <button class="secondary" id="d9PostPrev">← Lùi lại</button>
    <button id="d9PostNext">Bước tiếp theo →</button>
    <button class="secondary" id="d9PostReset">Chạy lại từ đầu</button>
  </div>
  <div class="step-info"><span id="d9PostStepNum">0</span> / <span id="d9PostStepTotal">0</span> bước</div>
</div>

<h4 id="auto-bai-toan-3-phan-tu-ben-phai-dau-tien-lon-hon-next-">Bài toán 3 — Phần tử bên phải đầu tiên lớn hơn (Next Greater Element)</h4>

<p class="idea-label">🗣️ Bước 0 — Đề thực sự hỏi gì</p>
<p>Cho mảng số, với <strong>mỗi phần tử</strong>, tìm phần tử <strong>đầu tiên đứng bên phải nó mà lớn hơn nó</strong>. Nếu không có, ghi -1. Ví dụ <code>{4, 5, 2, 10, 8}</code>: với số 4, phần tử đầu tiên bên phải lớn hơn 4 là 5. Với số 2, đó là 10. Với số 10, không có ai bên phải lớn hơn 10 → -1.</p>

<p class="idea-label">🗣️ Bước 1 — Thử cách "hiển nhiên" trước (và thấy nó chậm)</p>
<p>Cách nghĩ đầu tiên: với <strong>mỗi</strong> phần tử, quét tiếp sang phải tới khi gặp số lớn hơn. Cách này đúng, nhưng với n phần tử, mỗi phần tử có thể phải quét tới n bước → tổng cộng tốn tới <strong>O(n²)</strong> phép so sánh. Với n lớn (hàng trăm nghìn), cách này sẽ quá chậm.</p>

<p class="idea-label">🗣️ Bước 2 — Trực giác nhanh hơn: duyệt ngược, giữ lại "các ứng viên còn cơ hội"</p>
<p>Hãy duyệt từ <strong>phải sang trái</strong>, và giữ trong Stack các số đã duyệt qua — nhưng với 1 quy tắc dọn dẹp quan trọng: <strong>bất kỳ số nào trong Stack mà ≤ số hiện tại đều "hết cơ hội"</strong> trở thành đáp án cho các số đứng trước số hiện tại (vì số hiện tại lớn hơn và đứng gần hơn) — nên loại (pop) hết chúng ra trước khi xử lý tiếp. Sau khi dọn dẹp, đỉnh Stack còn lại (nếu có) chính là đáp án cho số hiện tại — vì nó là số gần nhất bên phải mà còn lớn hơn mọi số nhỏ hơn nó.</p>

<p class="idea-label">🪜 Bước 3 — Chạy tay trước khi xem code</p>
<p>Mảng <code>{4, 5, 2, 10, 8}</code>, duyệt từ phải sang trái (chỉ số 4→0):</p>
<table class="formula-table">
  <tr><th>Đang xét</th><th>Dọn Stack (loại số ≤ hiện tại)</th><th>Đáp án của số này</th><th>Stack sau khi push</th></tr>
  <tr><td>8 (chỉ số 4)</td><td>Stack rỗng, không cần dọn</td><td>-1 (Stack rỗng)</td><td>8</td></tr>
  <tr><td>10 (chỉ số 3)</td><td>Loại 8 (vì 8 ≤ 10)</td><td>-1 (Stack rỗng sau khi dọn)</td><td>10</td></tr>
  <tr><td>2 (chỉ số 2)</td><td>10 &gt; 2 → không loại gì</td><td>10 (đỉnh Stack)</td><td>10, 2</td></tr>
  <tr><td>5 (chỉ số 1)</td><td>Loại 2 (vì 2 ≤ 5)</td><td>10 (đỉnh Stack sau khi dọn)</td><td>10, 5</td></tr>
  <tr><td>4 (chỉ số 0)</td><td>5 &gt; 4 → không loại gì</td><td>5 (đỉnh Stack)</td><td>10, 5, 4</td></tr>
</table>
<p>Kết quả theo đúng thứ tự chỉ số 0→4: <strong>5, 10, 10, -1, -1</strong> ✓ khớp với code.</p>

<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

vector&lt;int&gt; nextGreaterElement(vector&lt;int&gt;& a) {
    int n = a.size();
    vector&lt;int&gt; result(n, -1);
    stack&lt;int&gt; st;
    for (int i = n - 1; i &gt;= 0; i--) {
        while (!st.empty() && st.top() &lt;= a[i]) st.pop();   // dọn các số "hết cơ hội"
        if (!st.empty()) result[i] = st.top();               // đỉnh còn lại chính là đáp án
        st.push(a[i]);
    }
    return result;
}

int main() {
    vector&lt;int&gt; a = {4, 5, 2, 10, 8};
    vector&lt;int&gt; result = nextGreaterElement(a);
    for (int v : result) cout &lt;&lt; v &lt;&lt; " ";   // in ra: 5 10 10 -1 -1
    return 0;
}</code></pre>

<div class="widget">
  <div class="widget-label">a = {4, 5, 2, 10, 8} — duyệt phải sang trái</div>
  <div id="d9NgeArr" style="display:flex; justify-content:center; gap: 8px; margin: 1rem 0;"></div>
  <div style="text-align:center; font-size:0.85rem; color:#888; margin-bottom:0.5rem;">Ngăn xếp (dưới → trên): <span id="d9NgeStack" style="font-family:monospace;"></span></div>
  <div class="caption" id="d9NgeCaption">Bấm "Bước tiếp theo" để bắt đầu.</div>
  <div class="controls">
    <button class="secondary" id="d9NgePrev">← Lùi lại</button>
    <button id="d9NgeNext">Bước tiếp theo →</button>
    <button class="secondary" id="d9NgeReset">Chạy lại từ đầu</button>
  </div>
  <div class="step-info"><span id="d9NgeStepNum">0</span> / <span id="d9NgeStepTotal">0</span> bước</div>
</div>

<blockquote><p>🎯 Đây gọi là kỹ thuật <strong>"monotonic stack"</strong> (ngăn xếp đơn điệu) — Stack luôn được giữ theo thứ tự giảm dần từ đáy lên đỉnh nhờ bước "dọn dẹp". Nhờ vậy tổng số lần push+pop suốt cả thuật toán chỉ tối đa <code>2n</code> lần (mỗi phần tử push đúng 1 lần, pop tối đa 1 lần) → độ phức tạp O(n) thay vì O(n²) như cách quét lại từng cặp.</p></blockquote>

<h3 id="auto-hang-doi-queue-fifo">Hàng đợi (Queue) — FIFO</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Giống hàng người xếp hàng mua vé: ai đến <strong>trước</strong> được phục vụ <strong>trước</strong>. Đó là nguyên tắc <strong>FIFO — First In, First Out</strong> — ngược hẳn với Stack (LIFO). Chỉ đổi 1 chữ trong tên gọi (First↔Last) nhưng hành vi hoàn toàn khác nhau: Stack lấy ra phần tử <strong>mới nhất</strong>, Queue lấy ra phần tử <strong>cũ nhất</strong>.</p>
<p>Vì Queue cần biết cả "ai vào đầu tiên" (để lấy ra) lẫn "ai vào sau cùng" (để biết chỗ thêm phần tử mới), nó cần <strong>2 con trỏ</strong> (<code>front</code>, <code>rear</code>) — trong khi Stack chỉ cần 1 con trỏ (<code>top</code>), vì Stack chỉ thao tác ở đúng 1 đầu.</p>

<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int queueArr[100], front = -1, rear = -1;
const int CAP = 100;

void enqueue(int v) {
    if ((rear+1)%CAP == front) return;   // đầy
    if (front == -1) front = 0;
    rear = (rear+1) % CAP;
    queueArr[rear] = v;
}

int dequeue() {
    int v = queueArr[front];
    if (front == rear) front = rear = -1;
    else front = (front+1) % CAP;
    return v;
}

int main() {
    enqueue(10); enqueue(20); enqueue(30);
    cout &lt;&lt; dequeue() &lt;&lt; "\n";   // in ra: 10 (vào trước, ra trước)
    enqueue(40);
    cout &lt;&lt; queueArr[front];     // in ra: 20 (phần tử đầu hàng đợi hiện tại)
    return 0;
}</code></pre>

<div class="widget">
  <div class="widget-label">Enqueue 10, 20, 30 → Dequeue → Enqueue 40</div>
  <div id="d9QueueView" style="display:flex; justify-content:center; gap: 6px; margin: 1rem 0; min-height:56px;"></div>
  <div class="caption" id="d9QueueCaption">Bấm "Bước tiếp theo" để bắt đầu.</div>
  <div class="controls">
    <button class="secondary" id="d9QueuePrev">← Lùi lại</button>
    <button id="d9QueueNext">Bước tiếp theo →</button>
    <button class="secondary" id="d9QueueReset">Chạy lại từ đầu</button>
  </div>
  <div class="step-info"><span id="d9QueueStepNum">0</span> / <span id="d9QueueStepTotal">0</span> bước</div>
</div>

<p>STL: <code>queue&lt;int&gt; q; q.push(); q.pop(); q.front();</code> — dùng trực tiếp cho BFS ở phần sau.</p>

<h3 id="bai5-reverse-words">★ Bài chính thức trong Đề ôn tập — Bài 5: Đảo ngược từng từ trong xâu</h3>

<div class="problem-box">
<span class="pb-title">📋 Nguyên văn đề bài</span>
<p>Cho một xâu ký tự str bao gồm nhiều từ trong xâu. Hãy đảo ngược từng từ trong xâu?</p>
<p><strong>Input:</strong> Dòng đầu tiên đưa vào số lượng bộ test T. Những dòng tiếp theo mỗi dòng đưa vào một bộ test. Mỗi bộ test là một dòng ghi lại nhiều từ trong xâu str. Ràng buộc: 1≤T≤100; 2≤length(str)≤10⁶.</p>
<p><strong>Output:</strong> Đưa ra kết quả mỗi test theo từng dòng.</p>
<table class="formula-table"><tr><th>Input</th><th>Output</th></tr>
<tr><td>2<br>ABC DEF<br>123 456</td><td>CBA FED<br>321 654</td></tr></table>
</div>

<p class="idea-label">🗣️ Bước 0 — Đề thực sự hỏi gì (đọc kỹ, đây là bẫy hay nhầm nhất)</p>
<p><strong>"Đảo ngược TỪNG TỪ"</strong> — nghĩa là mỗi từ tự lộn ngược ký tự của chính nó, nhưng thứ tự CÁC TỪ trong câu vẫn giữ nguyên. Đây <strong>không phải</strong> đảo ngược thứ tự từ (kiểu "Hello World" → "World Hello"), mà là "Hello World" → <strong>"olleH dlroW"</strong> — mỗi từ tự "quay đầu" tại chỗ.</p>

<p class="idea-label">🗣️ Bước 1 — Vì sao bài này KHÔNG cần Stack, dù đang học chung ngày với Stack/Queue</p>
<p>Đừng cố ép bài này dùng Stack chỉ vì nó nằm chung ngày — bản chất bài này chỉ là <strong>lặp lại kỹ thuật "2 con trỏ đảo ngược 1 đoạn"</strong> mà bạn đã biết (dùng để đảo ngược 1 mảng số), áp dụng riêng cho từng từ một. Việc "tìm ranh giới từng từ" chỉ cần nhận biết khoảng trắng, không cần cấu trúc dữ liệu đặc biệt nào.</p>

<p class="idea-label">🪜 Bước 2 — Chạy tay trước khi xem code</p>
<p>Với <code>str = "Hoc thuat toan"</code>:</p>
<table class="formula-table">
  <tr><th>Bước</th><th>Việc làm</th><th>Kết quả</th></tr>
  <tr><td>Tìm từ 1</td><td>Từ vị trí 0 tới trước khoảng trắng đầu tiên: "Hoc" → đảo ngược riêng nó</td><td>"coH"</td></tr>
  <tr><td>Tìm từ 2</td><td>Bỏ qua khoảng trắng, tìm từ tiếp: "thuat" → đảo ngược riêng nó</td><td>"tauht"</td></tr>
  <tr><td>Tìm từ 3</td><td>Bỏ qua khoảng trắng, tìm từ cuối: "toan" → đảo ngược riêng nó</td><td>"naot"</td></tr>
  <tr><td>Ghép lại</td><td>Giữ nguyên thứ tự 3 từ, chỉ thay nội dung từng từ</td><td><strong>"coH tauht naot"</strong></td></tr>
</table>

<p class="idea-label">🪜 Bước 3 — Từ chạy tay ra quy tắc thuật toán</p>
<ol>
  <li>Làm sao biết đâu là ranh giới 1 từ? → Một từ là đoạn ký tự liên tục KHÔNG chứa khoảng trắng, nằm giữa 2 khoảng trắng (hoặc đầu/cuối xâu).</li>
  <li>Tìm ra 1 từ (biết vị trí bắt đầu <code>start</code> và kết thúc <code>i-1</code>) → đặt 2 con trỏ <code>l=start, r=i-1</code>, đổi chỗ dần vào giữa cho tới khi <code>l≥r</code> (giống hệt kỹ thuật đảo ngược mảng).</li>
  <li>Đảo xong 1 từ → nhảy qua khoảng trắng, tìm từ tiếp theo, lặp lại bước 2 — KHÔNG động vào thứ tự các từ.</li>
</ol>

<pre v-pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

string reverseEachWord(string str) {
    int n = str.size();
    int i = 0;
    while (i &lt; n) {
        // bỏ qua khoảng trắng
        if (str[i] == ' ') { i++; continue; }
        int start = i;
        while (i &lt; n && str[i] != ' ') i++;   // tìm hết 1 từ: [start, i-1]
        int l = start, r = i - 1;
        while (l &lt; r) { swap(str[l], str[r]); l++; r--; }   // đảo ngược riêng từ này
    }
    return str;
}

int main() {
    int T; cin &gt;&gt; T; cin.ignore();
    while (T--) {
        string str;
        getline(cin, str);
        cout &lt;&lt; reverseEachWord(str) &lt;&lt; "\n";
    }
    return 0;
}</code></pre>

<blockquote><p>📎 <strong>Lưu ý đọc dữ liệu vào (input)</strong>: vì mỗi test là 1 dòng CÓ chứa khoảng trắng (nhiều từ), phải dùng <code>getline()</code> thay vì <code>cin &gt;&gt;</code> (chỉ đọc tới khoảng trắng đầu tiên) — và nhớ <code>cin.ignore()</code> 1 lần sau khi đọc T bằng <code>cin &gt;&gt;</code> để "nuốt" ký tự xuống dòng còn sót lại, nếu không <code>getline()</code> đầu tiên sẽ đọc phải dòng rỗng.</p></blockquote>

<div class="realworld">
  <span class="rw-title">🌐 Ứng dụng thực tế</span>
  <dl>
    <dt>Dùng ở đâu</dt>
    <dd>Stack: nút Undo/Redo trong trình soạn thảo; điều hướng Back/Forward trình duyệt; gọi hàm đệ quy trong mọi ngôn ngữ lập trình (call stack); kiểm tra cú pháp trong trình biên dịch. Queue: hàng đợi in ấn (print spooler); xử lý tác vụ nền theo thứ tự (message queue như RabbitMQ/Kafka); BFS trong tìm đường đi ngắn nhất.</dd>
    <dt>Giải quyết vấn đề gì</dt>
    <dd>Quản lý thứ tự xử lý dữ liệu theo đúng 1 trong 2 nguyên tắc: "gần nhất xử lý trước" (Stack) hoặc "công bằng theo thứ tự đến" (Queue).</dd>
    <dt class="good">Khi nào NÊN dùng</dt>
    <dd class="good">Stack: cần hoàn tác thao tác gần nhất, kiểm tra lồng nhau (ngoặc, thẻ HTML). Queue: xử lý công bằng theo thứ tự, lan truyền theo từng lớp (BFS).</dd>
    <dt class="bad">Khi nào KHÔNG NÊN dùng</dt>
    <dd class="bad">Cần truy cập ngẫu nhiên vào giữa dãy dữ liệu thường xuyên — dùng mảng/vector hoặc cấu trúc khác thay vì Stack/Queue thuần túy.</dd>
  </dl>
</div>

<h4 id="auto-luyen-tap">Luyện tập</h4>
<ol class="practice">
  <li>Code lại Stack và Queue bằng mảng không nhìn tài liệu.
    <div class="idea"><em>Ý tưởng:</em> Stack chỉ cần nhớ "ai vào sau cùng" (1 con trỏ top); Queue cần nhớ cả "ai vào đầu tiên" lẫn "ai vào sau cùng" (2 con trỏ front/rear) — đó là lý do Queue cần nhiều biến hơn Stack.</div>
  </li>
  <li>Kiểm tra "([)]" — đối chiếu với widget ở trên.
    <div class="idea"><em>Ý tưởng:</em> đừng đếm số ngoặc mở/đóng — hãy hỏi "dấu đóng vừa gặp có khớp với dấu mở GẦN NHẤT còn đang chờ không?" — đó chính xác là câu hỏi mà ngăn xếp trả lời được.</div>
  </li>
  <li>Next Greater Element với {4,5,2,10,8} — đối chiếu kết quả {5,10,10,-1,-1}.
    <div class="idea"><em>Ý tưởng:</em> khi đi từ phải sang trái, mọi số ≤ số hiện tại trong ngăn xếp đều "hết cơ hội" trở thành đáp án cho ai đứng trước nó — cứ loại chúng đi trước khi push số mới vào.</div>
  </li>
  <li>Chuyển "3+4*2" sang hậu tố bằng tay (đáp án: "3 4 2 * +").
    <div class="idea"><em>Ý tưởng:</em> phép toán ưu tiên cao hơn (nhân/chia) phải được "gói lại" và đặt gần toán hạng của nó hơn — vì trong hậu tố, toán tử luôn đứng ngay sau 2 toán hạng nó tác động.</div>
  </li>
</ol>

<h3 id="guide-baiBS1-full">★ Bài chính thức trong Đề bổ sung — Dãy ngoặc đúng dài nhất</h3>

<div class="problem-box">
<span class="pb-title">📋 Nguyên văn đề bài — Dãy ngoặc đúng dài nhất</span>
<p>Cho một xâu chỉ gồm các kí tự '(' và ')'. Một dãy ngoặc đúng được định nghĩa: xâu rỗng là dãy ngoặc đúng; nếu A đúng thì (A) đúng; nếu A, B đúng thì AB đúng. Tìm dãy ngoặc đúng dài nhất xuất hiện trong xâu S.</p>
<p><strong>Input:</strong> Số bộ test T (T≤20). Mỗi test 1 xâu S dài không quá 10⁵.</p>
<p><strong>Output:</strong> Độ dài dãy ngoặc đúng dài nhất mỗi test.</p>
<table class="formula-table"><tr><th>Input</th><th>Output</th></tr>
<tr><td>3<br>((()<br>)()())<br>()(()))))</td><td>2<br>4<br>6</td></tr></table>
</div>

<p class="idea-label">🗣️ Đề thực sự hỏi gì</p>
<p>Tìm đoạn con LIÊN TIẾP dài nhất trong xâu chỉ gồm '(' và ')' mà tự nó là 1 dãy ngoặc đúng hoàn chỉnh.</p>
<p class="idea-label">🔎 Nhận diện dạng bài → thuật toán</p>
<p>Vẫn là <strong>stack</strong> như Bài 6, nhưng lần này stack lưu <strong>chỉ số (index)</strong> thay vì ký tự — vì cần tính độ dài đoạn khớp, không chỉ biết "có khớp hay không".</p>
<p class="idea-label">🪜 Quy trình suy nghĩ từng bước</p>
<ol>
  <li>Vì sao cần đẩy sẵn -1 vào đáy stack trước khi bắt đầu? <em>→ Đóng vai trò "mốc biên trái ảo" — khi 1 dấu ')' khớp hết mọi dấu '(' trước nó, ta cần 1 điểm tham chiếu để tính độ dài đoạn khớp từ đầu xâu.</em></li>
  <li>Gặp '(' thì làm gì? <em>→ Đẩy chỉ số i vào stack (đánh dấu "đang chờ khớp").</em></li>
  <li>Gặp ')' thì làm gì? <em>→ Pop 1 phần tử ra trước (giả định vừa khớp được 1 cặp). Nếu stack sau khi pop KHÔNG rỗng → đoạn khớp hiện tại kéo dài từ <code>stack.top()+1</code> đến i, độ dài = <code>i - stack.top()</code>, cập nhật max. Nếu rỗng → dấu ')' này KHÔNG có gì để khớp → đẩy chính chỉ số i vào làm "mốc biên trái mới".</em></li>
</ol>
<blockquote><p>⚠️ Bẫy: nhầm lẫn giữa "pop rồi kiểm tra rỗng" và "kiểm tra rỗng rồi mới pop" — thứ tự đúng là pop trước, vì phần tử vừa pop ra chính là dấu '(' vừa được khớp bởi dấu ')' hiện tại; phần tử còn lại trên đỉnh SAU KHI pop mới là mốc biên trái cần dùng để tính độ dài.</p></blockquote>
<pre v-pre><code>// Đayngoacdungdainhat.cpp
int tinh(string s){
    int n = s.length(), kq = 0;
    stack&lt;int&gt; st;
    st.push(-1);                    // mốc biên trái ảo
    for(int i = 0; i &lt; n; i++){
        if(s[i] == '(') st.push(i);
        else{
            st.pop();                          // giả định vừa khớp 1 cặp
            if(!st.empty()){
                int j = st.top();
                kq = max(kq, i - j);            // đoạn khớp: từ j+1 đến i
            } else st.push(i);                  // không khớp được gì → mốc mới
        }
    }
    return kq;
}</code></pre>
<p><strong>Chạy tay ví dụ "()(()))))"</strong>: stack=[-1]. i=0 '(' → [-1,0]. i=1 ')' → pop còn [-1], top=-1, kq=max(0,1-(-1))=2. i=2 '(' → [-1,2]. i=3 '(' → [-1,2,3]. i=4 ')' → pop còn [-1,2], top=2, kq=max(2,4-2)=2. i=5 ')' → pop còn [-1], top=-1, kq=max(2,5-(-1))=6. i=6 ')' → pop, stack rỗng → push(6) → [6]. i=7 ')' → pop, rỗng → push(7). i=8 ')' → pop, rỗng → push(8). Kết quả cuối: <strong>6</strong> — khớp đề.</p>

<h3 id="guide-baiBS2">Bài D03003 — Kiểm tra biểu thức số học dư thừa ngoặc</h3>

<div class="problem-box">
<span class="pb-title">📋 Nguyên văn đề bài D03003 — Kiểm tra biểu thức số học dư thừa ngoặc</span>
<p>Cho biểu thức số học, kiểm tra biểu thức có dư thừa cặp ngoặc '(', ')' hay không.</p>
<p><strong>Input:</strong> Số bộ test T (1≤T≤100). Mỗi dòng tiếp theo là 1 biểu thức (2≤length≤20).</p>
<p><strong>Output:</strong> "Yes" nếu dư thừa, "No" nếu không, mỗi test 1 dòng.</p>
<table class="formula-table"><tr><th>Input</th><th>Output</th></tr>
<tr><td>3<br>((a+b))<br>(a + (b)/c)<br>(a + b*(c-d))</td><td>Yes<br>Yes<br>No</td></tr></table>
</div>

<p>Bài này thầy không kèm code giải, nhưng dùng lại đúng công cụ bạn đã có: dùng stack đúng như Bài 6 (kiểm tra ngoặc hợp lệ) đã học, nhưng thêm điều kiện: nếu gặp ')' mà ngay bên trong cặp ngoặc đó KHÔNG có bất kỳ toán tử nào (+,-,*,/) hoặc chỉ có đúng 1 biến/số bên trong → cặp ngoặc đó là thừa.</p>

<h3 id="guide-baiBS3-full">Bài D03014 — Biến đổi S thành T (lời giải BFS chính thức)</h3>

<div class="problem-box">
<span class="pb-title">📋 Nguyên văn đề bài D03014 — Biến đổi S thành T</span>
<p>Cho 2 số nguyên dương S, T (&lt;10000) và 2 thao tác: (a) S = S-1; (b) S = S*2. Tìm số thao tác ít nhất để biến S thành T.</p>
<p><strong>Input:</strong> Số bộ test T; mỗi dòng tiếp theo là cặp S, T.</p>
<p><strong>Output:</strong> Số bước ít nhất mỗi test, 1 dòng.</p>
<table class="formula-table"><tr><th>Input</th><th>Output</th></tr>
<tr><td>3<br>2 5<br>3 7<br>7 4</td><td>4<br>4<br>3</td></tr></table>
</div>

<p class="idea-label">🗣️ Ý tưởng cốt lõi</p>
<p>Cách làm đơn giản và trực quan nhất: <strong>BFS xuôi từ S</strong>, coi mỗi số nguyên là 1 "đỉnh", với 2 cạnh đi ra từ đỉnh x: sang <code>x-1</code> và sang <code>x*2</code> — đúng bằng 2 phép toán (a),(b) trong đề. Bài toán trở thành: tìm đường đi ngắn nhất từ đỉnh S đến đỉnh T trên đồ thị vô hạn này.</p>
<p class="idea-label">🪜 Quy trình suy nghĩ từng bước</p>
<ol>
  <li>Vì sao BFS (không phải DFS) là lựa chọn đúng ở đây? <em>→ Đề hỏi "số thao tác ÍT NHẤT" — đúng là bài toán đường đi ngắn nhất trên đồ thị không trọng số, BFS luôn cho lời giải tối ưu.</em></li>
  <li>Mảng <code>a[]</code> đóng vai trò gì? <em>→ Vừa là "đã thăm" (khác 0 nghĩa là đã tới), vừa lưu luôn số bước để tới đó — 2 trong 1, đỡ cần thêm mảng riêng.</em></li>
  <li>Vì sao vòng lặp là <code>while(a[t]==0)</code> thay vì <code>while(!Q.empty())</code> như BFS thông thường? <em>→ Tối ưu nhỏ: dừng NGAY khi tới đích T thay vì quét hết toàn bộ đồ thị — nhưng cách viết này giả định chắc chắn sẽ tới được T (không xử lý trường hợp T không tới được), cần cẩn thận nếu đề có ràng buộc khác.</em></li>
</ol>
<pre v-pre><code>// BiendoiST.cpp
int biendoi(int s, int t){
    int a[20001] = {0};
    queue&lt;int&gt; Q;
    Q.push(s);
    while(a[t] == 0){
        int x = Q.front(); Q.pop();
        if(x - 1 &gt; 0 &amp;&amp; a[x-1] == 0){
            a[x-1] = a[x] + 1;   Q.push(x-1);      // cạnh: x → x-1
        }
        if(x * 2 &lt; 20000 &amp;&amp; a[x*2] == 0){
            a[x*2] = a[x] + 1;   Q.push(x*2);       // cạnh: x → x*2
        }
    }
    return a[t];
}</code></pre>
<p><strong>Chạy tay ví dụ S=2, T=5</strong>: BFS lan từ 2: thăm 1 (a[1]=1), thăm 4 (a[4]=1). Từ 1: thăm 0 bị chặn (x-1&gt;0 sai), thăm 2 đã thăm. Từ 4: thăm 3 (a[3]=2), thăm 8 (a[8]=2). Từ 3: thăm 6 (a[6]=3). Từ 6: thăm 5 (a[5]=4) → dừng, trả về 4 — khớp đề (2→4→3→6→5, đúng 4 bước).</p>
<blockquote><p>⚠️ Bẫy: mảng kích thước <code>20001</code> giả định T &lt; 20000 — nếu đề cho T lớn hơn phải tăng kích thước mảng tương ứng, nếu không sẽ tràn mảng (undefined behavior) mà không báo lỗi rõ ràng.</p></blockquote>

<h3 id="guide-baiD03">★ Bài chính thức trong Đề bổ sung — Nhóm D03 (Ngăn xếp/Hàng đợi)</h3>
<p class="idea-label">🔎 Nhận diện nhanh: bài nào dùng Stack, bài nào dùng Queue?</p>
<table class="formula-table">
  <tr><th>Bài</th><th>Cấu trúc</th><th>Vì sao</th></tr>
  <tr><td>Sinh số nhị phân</td><td>Queue</td><td>Sinh theo đúng thứ tự "cũ trước, mới sau" (FIFO) — giống hệt BFS theo từng lớp</td></tr>
  <tr><td>Tính hậu tố</td><td>Stack</td><td>Toán hạng gần nhất luôn được dùng trước (LIFO) khi gặp toán tử</td></tr>
  <tr><td>Đánh số ngoặc</td><td>Stack</td><td>Dấu ngoặc đóng luôn khớp với dấu mở GẦN NHẤT chưa khớp</td></tr>
  <tr><td>Di chuyển ma trận</td><td>Queue</td><td>Tìm đường đi NGẮN NHẤT trên lưới ô — bản chất là BFS</td></tr>
  <tr><td>Nhịp chứng khoán</td><td>Stack</td><td>Cần biết nhanh "ngày gần nhất có giá cao hơn" — Stack duy trì dãy giảm dần</td></tr>
  <tr><td>Số gồm 0,9</td><td>Queue</td><td>Sinh số theo thứ tự tăng dần độ dài — giống hệt bài sinh số nhị phân, BFS theo từng lớp chữ số</td></tr>
</table>

<h4 id="bs15-sinh-nhi-phan">Sinh dãy số nhị phân bằng hàng đợi</h4>
<div class="problem-box">
<span class="pb-title">📋 Nguyên văn đề bài</span>
<p>Cho số nguyên dương n. In ra n số đầu tiên trong dãy biểu diễn nhị phân của 1, 2, 3, ..., n — sinh bằng kỹ thuật hàng đợi (không đổi cơ số trực tiếp từng số).</p>
<table class="formula-table"><tr><th>Input</th><th>Output</th></tr>
<tr><td>1<br>5</td><td>1 10 11 100 101</td></tr></table>
</div>
<p>Câu hỏi mấu chốt: làm sao sinh ra đúng thứ tự 1, 10, 11, 100, 101,... mà không cần đổi cơ số? <em>→ Nhận ra rằng số nhị phân của (2k) chính là số nhị phân của k nối thêm "0", và số nhị phân của (2k+1) là nối thêm "1" — quan hệ cha-con này CHÍNH LÀ cấu trúc cây nhị phân, và duyệt theo mức (BFS) trên cây đó cho ra đúng thứ tự tăng dần.</em></p>
<pre v-pre><code>// SoNhiPhan.cpp
void nhiphan(int n){
    queue&lt;string&gt; Q;
    Q.push("1");                 // gốc của "cây nhị phân" là số 1
    while(n--){
        string s = Q.front();
        cout &lt;&lt; s &lt;&lt; " ";  Q.pop();
        Q.push(s + "0");          // con trái: nối thêm "0"
        Q.push(s + "1");          // con phải: nối thêm "1"
    }
}</code></pre>
<p><strong>Chạy tay n=5</strong>: Q=[1]. Lấy "1" in ra, đẩy "10","11" → Q=[10,11]. Lấy "10" in ra, đẩy "100","101" → Q=[11,100,101]. Lấy "11" in ra → Q=[100,101,110,111]. Lấy "100" in ra. Lấy "101" in ra. Kết quả: <strong>1 10 11 100 101</strong> — khớp đề, và đúng là biểu diễn nhị phân của 1,2,3,4,5.</p>

<h4 id="bs16-tinh-hauto">Tính giá trị biểu thức hậu tố</h4>
<div class="problem-box">
<span class="pb-title">📋 Nguyên văn đề bài</span>
<p>Cho 1 xâu biểu thức hậu tố (Reverse Polish Notation) chỉ gồm các chữ số đơn (0-9) và các phép toán +, -, *, /. Tính giá trị của biểu thức.</p>
<table class="formula-table"><tr><th>Input</th><th>Output</th></tr>
<tr><td>2<br>23+<br>52-3*</td><td>5<br>9</td></tr></table>
</div>
<p>Hậu tố (postfix) đặt toán tử SAU 2 toán hạng — nên khi gặp toán tử, 2 toán hạng cần dùng chính là 2 giá trị GẦN NHẤT vừa tính/đọc được, tức đỉnh stack.</p>
<pre v-pre><code>// Tinhhauto.cpp
int tinhhauto(string s){
    stack&lt;int&gt; st;
    for(int i = 0; i &lt; s.length(); i++){
        if(isdigit(s[i])) st.push(s[i] - '0');
        else{
            int a = st.top(); st.pop();     // toán hạng bên PHẢI (đọc sau)
            int b = st.top(); st.pop();     // toán hạng bên TRÁI (đọc trước)
            st.push(tinhgiatri(b, a, s[i]));  // chú ý thứ tự b rồi mới a
        }
    }
    return st.top();
}</code></pre>
<p><strong>Chạy tay "52-3*"</strong>: đẩy 5, đẩy 2 → stack=[5,2]. Gặp '-': a=2 (pop trước), b=5 (pop sau) → tính 5-2=3 → đẩy vào: stack=[3]. Đẩy 3 → stack=[3,3]. Gặp '*': a=3, b=3 → 3*3=9 → stack=[9]. Kết quả <strong>9</strong> — khớp đề.</p>
<blockquote><p>⚠️ Bẫy quan trọng nhất: thứ tự tham số khi trừ/chia — <code>a</code> (pop ra trước) là toán hạng NẰM SAU trong biểu thức, <code>b</code> (pop ra sau) là toán hạng NẰM TRƯỚC — phải gọi <code>tinhgiatri(b, a, c)</code> chứ không phải <code>tinhgiatri(a, b, c)</code>, nếu đảo ngược thì phép cộng/nhân vẫn đúng (giao hoán) nhưng trừ/chia sẽ SAI mà không báo lỗi.</p></blockquote>
<blockquote><p>📎 Code này chỉ đọc được toán hạng là <strong>1 chữ số</strong> (do <code>s[i]-'0'</code>) — nếu đề cho số nhiều chữ số, phải đổi cách đọc token (dùng <code>stringstream</code> tách theo khoảng trắng) trước khi áp dụng cùng ý tưởng stack này.</p></blockquote>

<h4 id="bs17-danh-so-ngoac">Đánh số dấu ngoặc</h4>
<div class="problem-box">
<span class="pb-title">📋 Nguyên văn đề bài</span>
<p>Cho 1 xâu ký tự có chứa các dấu ngoặc tròn hợp lệ. Đánh số thứ tự cho từng cặp ngoặc tương ứng (dấu mở và dấu đóng cùng 1 cặp mang cùng 1 số, các cặp được đánh số tăng dần theo thứ tự dấu mở xuất hiện). In ra dãy số ứng với từng dấu ngoặc theo đúng thứ tự chúng xuất hiện trong xâu.</p>
<table class="formula-table"><tr><th>Input</th><th>Output</th></tr>
<tr><td>1<br>(a(b)(c(d)))</td><td>1 2 2 3 4 4 3 1</td></tr></table>
</div>
<p>Ý tưởng giống hệt việc "khớp cặp" ở Bài 6, chỉ khác: thay vì chỉ kiểm tra khớp/không khớp, ta CẤP PHÁT SỐ THỨ TỰ tăng dần mỗi khi gặp dấu mở, rồi "trả lại" đúng số đó cho dấu đóng tương ứng.</p>
<pre v-pre><code>// Danhsodaungoac.cpp
int dem = 1;
stack&lt;int&gt; st;
for(int i = 0; i &lt; s.length(); i++){
    if(s[i] == '('){
        st.push(dem);
        cout &lt;&lt; st.top() &lt;&lt; " ";
        dem++;                      // số thứ tự tiếp theo sẽ lớn hơn 1
    }
    else if(s[i] == ')'){
        cout &lt;&lt; st.top() &lt;&lt; " ";    // in ra đúng số của dấu mở đang khớp
        st.pop();
    }
}</code></pre>
<p><strong>Chạy tay "(a(b)(c(d)))"</strong>: '(' số 1 → in 1, dem=2. 'a' bỏ qua. '(' số 2 → in 2, dem=3. 'b'. ')' → in top=2, pop. '(' số 3 → in 3, dem=4. 'c'. '(' số 4 → in 4, dem=5. 'd'. ')' → in top=4, pop. ')' → in top=3, pop. ')' → in top=1, pop. Kết quả: <strong>1 2 2 3 4 4 3 1</strong> — khớp đề.</p>

<h4 id="bs18-di-chuyen-matran">Di chuyển trên ma trận (BFS trên lưới với bước nhảy)</h4>
<div class="problem-box">
<span class="pb-title">📋 Nguyên văn đề bài</span>
<p>Cho ma trận A kích thước N×M, ô (i,j) ghi số bước nhảy <code>A[i][j]</code>. Từ ô (1,1), mỗi bước được nhảy sang phải <code>A[i][j]</code> cột hoặc xuống dưới <code>A[i][j]</code> hàng. Tìm số bước di chuyển ít nhất để tới ô (N,M).</p>
<p><strong>Input:</strong> T bộ test. Mỗi test: N, M rồi ma trận N×M. <strong>Output:</strong> Số bước ít nhất, mỗi test 1 dòng.</p>
</div>
<p>Khác với BFS lưới ô thông thường (mỗi bước chỉ đi sang 1 ô liền kề), ở đây <strong>độ dài bước nhảy do chính giá trị ô hiện tại quyết định</strong> — nhưng bản chất vẫn là BFS: mỗi ô là 1 đỉnh, có tối đa 2 cạnh đi ra.</p>
<pre v-pre><code>// DichuyenMatran.cpp
void xuly(){
    memset(C, -1, sizeof(C));            // C[i][j] = số bước tới ô (i,j), -1 = chưa tới
    queue&lt;pair&lt;int,int&gt;&gt; Q;
    Q.push({1,1});  C[1][1] = 0;
    while(!Q.empty()){
        auto [i,j] = Q.front();  int x = A[i][j];  Q.pop();
        if(C[i][j+x] == -1){ Q.push({i,j+x}); C[i][j+x] = C[i][j]+1; }   // nhảy sang phải x cột
        if(C[i+x][j] == -1){ Q.push({i+x,j}); C[i+x][j] = C[i][j]+1; }   // nhảy xuống dưới x hàng
        if(C[N][M] != -1) break;          // tới đích rồi thì dừng sớm
    }
    cout &lt;&lt; C[N][M] &lt;&lt; endl;
}</code></pre>
<blockquote><p>⚠️ Bẫy: nếu <code>A[i][j] = 0</code> tại 1 ô nào đó, ô đó sẽ tự "nhảy vào chính nó" vô nghĩa (<code>j+0=j</code>) — code trên không lọc riêng trường hợp này nhưng vẫn chạy đúng vì điều kiện <code>C[i][j+x]==-1</code> đã là false (ô đó đã có giá trị C từ trước) nên không đẩy lại vào hàng đợi; chỉ cần lưu ý mảng phải đủ lớn để <code>j+x</code>, <code>i+x</code> không vượt biên gây truy cập ngoài mảng.</p></blockquote>

<h4 id="bs19-nhip-chung-khoan">Nhịp chứng khoán (Stock Span)</h4>
<div class="problem-box">
<span class="pb-title">📋 Nguyên văn đề bài</span>
<p>Cho dãy giá cổ phiếu n ngày. Với mỗi ngày i, tính "nhịp" là số ngày liên tiếp tính đến ngày i (kể cả ngày i) mà giá &lt;= giá ngày i.</p>
<table class="formula-table"><tr><th>Input</th><th>Output</th></tr>
<tr><td>1<br>7<br>100 80 60 70 60 75 85</td><td>1 1 1 2 1 4 6</td></tr></table>
</div>
<p>Câu hỏi mấu chốt: với ngày i, "nhịp" chính là khoảng cách tới <strong>ngày gần nhất TRƯỚC đó có giá LỚN HƠN</strong> giá hôm nay (Previous Greater Element) — nếu biết vị trí đó là <code>p</code>, nhịp = <code>i - p</code>.</p>
<pre v-pre><code>// Nhipchungkhoan.cpp
stack&lt;int&gt; st;
st.push(0);                          // mốc biên trái ảo (ngày 0, giá coi như +∞)
for(int i = 1; i &lt;= n; i++){
    cin &gt;&gt; a[i];
    while(st.size() &gt; 1 &amp;&amp; a[st.top()] &lt;= a[i]) st.pop();   // loại hết các ngày giá <= hôm nay
    cout &lt;&lt; i - st.top() &lt;&lt; " ";      // khoảng cách tới ngày gần nhất giá LỚN HƠN còn lại
    st.push(i);
}</code></pre>
<p><strong>Chạy tay "100 80 60 70 60 75 85"</strong>: st=[0]. i=1,giá100: st=[0,1], nhịp=1-0=1. i=2,giá80: 100&gt;80 giữ nguyên, st=[0,1,2], nhịp=2-1=1. i=3,giá60: 80&gt;60 giữ, st=[0,1,2,3], nhịp=3-2=1. i=4,giá70: pop 3(giá60≤70), còn top=2(giá80&gt;70) dừng, nhịp=4-2=2, push 4. i=5,giá60: top=4(giá70&gt;60) dừng, nhịp=5-4=1, push 5. i=6,giá75: pop 5(60≤75), pop 4(70≤75), top=2(giá80&gt;75) dừng, nhịp=6-2=4, push 6. i=7,giá85: pop 6(75≤85), pop 2(80≤85), top=1(giá100&gt;85) dừng, nhịp=7-1=6. Kết quả: <strong>1 1 1 2 1 4 6</strong> — khớp đề.</p>
<blockquote><p>💡 Đây chính là ứng dụng thực tế của kỹ thuật <a href="#d9NgeCaption">Next Greater Element</a> đã học — chỉ đổi chiều tìm kiếm (tìm phần tử lớn hơn GẦN NHẤT ở BÊN TRÁI thay vì bên phải).</p></blockquote>

<h4 id="bs20-so-0-9">Số nhỏ nhất chỉ gồm chữ số 0, 9 chia hết cho n</h4>
<div class="problem-box">
<span class="pb-title">📋 Nguyên văn đề bài</span>
<p>Cho số nguyên dương n. Tìm số nguyên dương nhỏ nhất chỉ gồm các chữ số 0 và 9 mà chia hết cho n.</p>
<table class="formula-table"><tr><th>Input</th><th>Output</th></tr>
<tr><td>1<br>5</td><td>90</td></tr></table>
</div>
<p>Ý tưởng giống hệt bài sinh dãy số nhị phân ở trên (sinh nhị phân bằng hàng đợi): thay vì nối thêm "0"/"1", ta nối thêm "0"/"9", và luôn <strong>bắt đầu từ 9</strong> (không thể bắt đầu bằng 0 vì đó không phải số hợp lệ). BFS đảm bảo số ĐẦU TIÊN tìm được chia hết cho n cũng là số NHỎ NHẤT (vì BFS luyện theo đúng thứ tự độ dài tăng dần, số ít chữ số hơn luôn được xét trước).</p>
<pre v-pre><code>// So09.cpp
void xuly(int n){
    queue&lt;int&gt; Q;
    Q.push(9);
    while(!Q.empty()){
        int x = Q.front(); Q.pop();
        if(x % n == 0){ cout &lt;&lt; x &lt;&lt; endl; break; }   // tìm thấy, dừng ngay vì đây là số nhỏ nhất
        Q.push(x*10);      // nối thêm chữ số 0
        Q.push(x*10 + 9);  // nối thêm chữ số 9
    }
}</code></pre>
<p><strong>Chạy tay n=5</strong>: Q=[9]. x=9, 9%5≠0, đẩy 90, 99 → Q=[90,99]. x=90, 90%5=0 → in <strong>90</strong>, dừng — khớp đề.</p>
<blockquote><p>⚠️ Bẫy: vì sao phải dùng <strong>Queue (BFS)</strong> mà không phải đệ quy/DFS thử tăng dần số chữ số? <em>→ DFS đi sâu theo 1 nhánh trước (ví dụ luôn thêm "0" trước) sẽ không đảm bảo tìm thấy số nhỏ nhất trước — chỉ có BFS mới đảm bảo mọi số ít chữ số hơn được xét hết trước khi xét số nhiều chữ số hơn.</em></p></blockquote>



</section>
</template>

<script setup>
import { onMounted } from 'vue'
import { initNganXepHangDoiWidgets } from '../widgets/ngan-xep-hang-doi.js'

defineProps({ active: Boolean })

onMounted(() => {
  initNganXepHangDoiWidgets()
})
</script>
