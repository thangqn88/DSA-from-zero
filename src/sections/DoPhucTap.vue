<template>
<section id="do-phuc-tap" class="day-section" data-sid="do-phuc-tap" v-show="active">

<h2>Độ phức tạp thuật toán và mô hình chi phí</h2>

<LessonGoal :sid="'do-phuc-tap'">
  <ul><li v-for="(g, i) in data.goal" :key="i">{{ g }}</li></ul>
</LessonGoal>

<LessonPart :sid="'do-phuc-tap'" part="ly-thuyet">

<h3 id="auto-dpt-tim-ten-trong-danh-ba">Tìm một cái tên trong danh bạ</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Bạn cầm một quyển danh bạ dày và cần tìm số của người tên "Sơn". Có hai cách. Cách thứ nhất: lật từng trang từ đầu tới cuối. Cách thứ hai: mở giữa quyển, thấy chữ "M", biết "S" nằm ở nửa sau, rồi lại mở giữa nửa sau, cứ thế. Với quyển mỏng thì hai cách chênh nhau không đáng kể. Nhưng nếu quyển danh bạ dày gấp một nghìn lần, cách thứ nhất tốn gấp một nghìn lần thời gian, còn cách thứ hai chỉ tốn thêm khoảng mười bước. Đó chính là toàn bộ nội dung của bài này: <strong>không phải hôm nay chạy mất bao lâu, mà là khi dữ liệu lớn lên thì thời gian lớn lên theo kiểu nào</strong>.</p>

<p><strong>Đây là gì?</strong> Độ phức tạp thuật toán là cách mô tả tốc độ tăng của khối lượng công việc theo kích thước đầu vào. Ta ký hiệu kích thước đầu vào là <code>n</code>, rồi đếm xem chương trình phải làm khoảng bao nhiêu phép toán. Không đếm bằng giây, vì giây phụ thuộc vào máy của bạn, vào trình biên dịch, vào việc lúc đó máy có đang mở trình duyệt hay không. Đếm bằng số phép toán thì con số ấy đúng trên mọi máy.</p>

<p><strong>Vì sao quan trọng?</strong> Vì nó cho bạn biết trước một thuật toán có dùng được hay không, mà không cần viết ra rồi chạy thử. Đề bài nói <code>n</code> tối đa 200000 — chỉ nhìn con số đó thôi là bạn đã loại được mọi ý tưởng có hai vòng lặp lồng nhau, tiết kiệm cả buổi ngồi gõ một lời giải chắc chắn quá hạn giờ. Trong công việc thật, đó là khác biệt giữa một truy vấn trả về sau 50 mili giây và một truy vấn treo máy chủ.</p>

<h3 id="auto-dpt-o-lon">Ký hiệu O lớn, tiếng Anh là Big O — cách viết gọn của "tăng theo kiểu nào"</h3>

<p>Giả sử bạn đếm được một đoạn code làm <code>3n + 7</code> phép toán. Khi <code>n</code> bằng một triệu, số 7 kia hoàn toàn không đáng kể, và con số 3 chỉ làm mọi thứ nhanh hay chậm đúng ba lần chứ không đổi hình dạng của đường cong. Thứ duy nhất thật sự quyết định là chữ <code>n</code>. Vậy nên ta viết gọn thành <code>O(n)</code>, đọc là "ô lớn của n".</p>

<p><strong>Một chú thích về tên gọi, đọc kỹ chỗ này.</strong> Tài liệu tiếng Việt gọi ký hiệu này là <strong>O lớn</strong>, nhưng gần như toàn bộ tài liệu, khoá học, video và câu hỏi phỏng vấn ngoài kia dùng tên tiếng Anh: <strong>Big O</strong> — viết đầy đủ là <strong>Big O notation</strong>, tức "ký hiệu O lớn". Hai cái tên đó chỉ cùng một thứ, không có khác biệt nào cả. Bạn sẽ còn gặp thêm vài cách viết nữa và tất cả đều là nó: <code>Big-O</code>, <code>big O</code>, hay đọc thành lời là "big oh of n" cho <code>O(n)</code>. Từ đây trở đi trong khoá này, chỗ nào cần nhắc tới ký hiệu, mình sẽ viết là <strong>O lớn (Big O)</strong> để bạn quen dần với cả hai — vì khi đi phỏng vấn hay tra Google, cái tên có ích cho bạn là cái tên tiếng Anh.</p>

<p>Nhân tiện, hai người bà con của Big O mà bạn sẽ gặp trong sách: <strong>Big Omega</strong> viết là <code>Ω(n)</code> nói về cận dưới — "nhanh nhất cũng phải tốn chừng này", và <strong>Big Theta</strong> viết là <code>Θ(n)</code> nói về cả hai phía — "đúng bằng chừng này, không hơn không kém về mặt bậc". Trong thực tế lập trình, người ta hầu như chỉ dùng Big O, và thường dùng nó với ý nghĩa của Big Theta. Bạn chỉ cần biết ba cái tên đó tồn tại là đủ cho lúc này.</p>

<p><strong>Hai quy tắc rút gọn, chỉ có hai thôi:</strong></p>
<ol>
  <li>Bỏ mọi hằng số nhân. <code>5n</code> và <code>100n</code> đều là <code>O(n)</code>.</li>
  <li>Chỉ giữ số hạng lớn nhất. <code>n² + 1000n</code> là <code>O(n²)</code>, vì khi <code>n</code> đủ lớn thì <code>n²</code> nuốt chửng phần còn lại.</li>
</ol>

<p><strong>Và hai quy tắc ghép:</strong> hai vòng lặp <strong>lồng nhau</strong> thì nhân độ phức tạp với nhau; hai đoạn code <strong>nối tiếp</strong> nhau thì lấy cái lớn hơn. Chỉ với bốn quy tắc này bạn đã phân tích được phần lớn code mình gặp.</p>

<h3 id="auto-dpt-bang-so-sanh">Bảng so sánh — nhìn bằng con số thật</h3>

<p>Lý thuyết nói <code>O(n²)</code> tệ hơn <code>O(n log n)</code>. Nhưng tệ hơn bao nhiêu? Bảng dưới đây là số phép toán thực tế, và nó thuyết phục hơn mọi lời giải thích:</p>

<table class="formula-table">
  <tr><th>Độ phức tạp</th><th>n = 10</th><th>n = 1000</th><th>n = 1000000</th><th>Ví dụ điển hình</th></tr>
  <tr><td><code>O(1)</code></td><td>1</td><td>1</td><td>1</td><td>Lấy phần tử thứ i của mảng</td></tr>
  <tr><td><code>O(log n)</code></td><td>3</td><td>10</td><td>20</td><td>Tìm kiếm nhị phân</td></tr>
  <tr><td><code>O(n)</code></td><td>10</td><td>1000</td><td>1000000</td><td>Duyệt một lượt qua mảng</td></tr>
  <tr><td><code>O(n log n)</code></td><td>33</td><td>10000</td><td>20000000</td><td>Sắp xếp tốt</td></tr>
  <tr><td><code>O(n²)</code></td><td>100</td><td>1000000</td><td>10¹²</td><td>So mọi cặp phần tử</td></tr>
  <tr><td><code>O(2ⁿ)</code></td><td>1024</td><td>không tưởng</td><td>không tưởng</td><td>Duyệt mọi tập con</td></tr>
</table>

<p>Hãy để ý cột <code>n = 10</code>: ở đó mọi dòng đều nhỏ và chênh lệch chẳng đáng gì. Đó là lý do một thuật toán tồi vẫn chạy tốt trên dữ liệu ví dụ trong sách. Rồi nhìn cột cuối: <code>O(n²)</code> nhảy lên <code>10¹²</code>, tức khoảng ba giờ chạy máy, trong khi <code>O(n log n)</code> chỉ mất khoảng hai phần mười giây. Cùng một bài toán, cùng một chiếc máy.</p>

<p><strong>Mốc phản xạ cần thuộc:</strong> một máy tính phổ thông làm được khoảng <code>10⁸</code> phép toán đơn giản trong một giây. Lấy con số đó chia cho công thức độ phức tạp là ra ngay giới hạn <code>n</code> mà thuật toán của bạn còn chịu được.</p>

<table class="formula-table">
  <tr><th>Giới hạn n trong đề</th><th>Độ phức tạp còn dùng được</th></tr>
  <tr><td>n ≤ 20</td><td><code>O(2ⁿ)</code> — vét cạn mọi tập con vẫn kịp</td></tr>
  <tr><td>n ≤ 500</td><td><code>O(n³)</code></td></tr>
  <tr><td>n ≤ 5000</td><td><code>O(n²)</code></td></tr>
  <tr><td>n ≤ 10⁶</td><td><code>O(n log n)</code></td></tr>
  <tr><td>n ≥ 10⁸</td><td>gần như bắt buộc <code>O(n)</code> hoặc <code>O(log n)</code></td></tr>
</table>

<h3 id="auto-dpt-bo-nho-cache">Chỗ O lớn (Big O) nói dối bạn — bộ nhớ và cache</h3>

<p>O lớn (Big O) đếm <strong>số</strong> phép toán, nhưng nó ngầm giả định mọi phép toán tốn như nhau. Ngoài đời thì không.</p>

<p>Hãy tưởng tượng bạn ngồi bàn làm việc. Giấy tờ cần dùng có thể nằm ngay trên mặt bàn, trong ngăn kéo, hoặc dưới tầng hầm lưu trữ. Lấy từ mặt bàn mất một giây, mở ngăn kéo mất mười giây, xuống hầm mất mười phút. Bộ nhớ máy tính cũng xếp tầng đúng như vậy: thanh ghi, cache L1, L2, L3, rồi RAM. Đọc từ cache L1 nhanh hơn đọc từ RAM khoảng một trăm lần.</p>

<p>Bộ xử lý có một thói quen rất hữu ích: mỗi lần bạn đọc một ô nhớ, nó bê luôn cả khối 64 byte xung quanh ô đó lên cache, vì đoán rằng bạn sắp cần những ô kế bên. Với mảng, dự đoán đó gần như luôn đúng — các phần tử nằm sát nhau. Với danh sách liên kết, mỗi nút được cấp phát ở một chỗ ngẫu nhiên trong bộ nhớ, nên dự đoán đó gần như luôn sai.</p>

<p>Kết quả: duyệt một mảng một triệu phần tử và duyệt một danh sách liên kết một triệu nút <strong>cùng là <code>O(n)</code></strong>, nhưng bản mảng thường nhanh hơn nhiều lần. Đây không phải lỗi của O lớn (Big O) — nó chưa bao giờ hứa hẹn về hằng số. Đây là lời nhắc rằng phân tích trên giấy cho bạn bậc, còn đo đạc thật cho bạn con số. Phần Dự án thực hành cuối bài chính là để bạn tự dựng công cụ đo đó.</p>

<pre v-pre><code>// Cùng O(n), khác chi phí mỗi bước
long long tongMang(const vector&lt;int&gt;&amp; a) {
    long long s = 0;
    for (int x : a) s += x;      // các phần tử nằm liền nhau -> trúng cache
    return s;
}

struct Nut { int giaTri; Nut* tiep; };

long long tongDanhSach(Nut* dau) {
    long long s = 0;
    for (Nut* p = dau; p != nullptr; p = p-&gt;tiep)
        s += p-&gt;giaTri;          // mỗi bước nhảy tới một chỗ ngẫu nhiên -> trượt cache
    return s;
}</code></pre>

</LessonPart>

<LessonPart :sid="'do-phuc-tap'" part="vi-sao">

<h3 id="auto-dpt-vi-sao">Vì sao phải học thứ này trước mọi thứ khác</h3>

<p><strong>Nó là ngôn ngữ chung của tất cả các bài còn lại.</strong> Mọi bài học sau đây đều kết thúc bằng một câu dạng "cách này là O(n log n), cách kia là O(n²)". Nếu chưa đọc được câu đó thì bạn chỉ đang học thuộc lòng chứ chưa hiểu vì sao người ta chọn cấu trúc này thay vì cấu trúc kia.</p>

<p><strong>Nó tiết kiệm thời gian ngay lập tức.</strong> Đọc đề, nhìn giới hạn <code>n</code>, tra bảng mốc phản xạ ở trên, và bạn biết ngay hướng nào không cần thử. Người chưa quen sẽ viết xong một lời giải rồi mới phát hiện nó quá chậm và phải bỏ đi.</p>

<p><strong>Nó là câu hỏi bạn sẽ bị hỏi ở mọi buổi phỏng vấn.</strong> Không phải vì công ty cần bạn tính toán trên giấy, mà vì trả lời được câu đó chứng tỏ bạn hiểu code mình vừa viết sẽ hành xử ra sao khi lượng người dùng tăng gấp trăm lần.</p>

<p><strong>Nó là thứ phân biệt một web app chạy được với một web app chịu tải được.</strong> Trang tra cứu mười nghìn bản ghi thì viết kiểu gì cũng chạy. Trang tra cứu mười triệu bản ghi trong 50 mili giây thì chỉ người hiểu chương này mới làm nổi — và bạn sẽ dựng đúng thứ đó ở Chương 4.</p>

</LessonPart>

<LessonPart :sid="'do-phuc-tap'" part="quiz">
  <QuizBlock :questions="data.quiz" />
</LessonPart>

<LessonPart :sid="'do-phuc-tap'" part="vi-du">

<WorkedExample id="vd-dpt-dem-phep-toan" title="Đếm phép toán của ba đoạn code lồng vòng lặp">

  <template #de-bai>
    <p>Ba đoạn dưới đây trông na ná nhau. Hãy đếm số lần dòng <code>dem++</code> được thực hiện, rồi rút gọn về O lớn (Big O).</p>

    <pre v-pre><code>// Đoạn A
int dem = 0;
for (int i = 0; i &lt; n; i++)
    for (int j = 0; j &lt; n; j++)
        dem++;

// Đoạn B
int dem = 0;
for (int i = 0; i &lt; n; i++)
    dem++;
for (int j = 0; j &lt; n; j++)
    dem++;

// Đoạn C
int dem = 0;
for (int i = 0; i &lt; n; i++)
    for (int j = i; j &lt; n; j++)
        dem++;</code></pre>
  </template>

  <template #y-tuong>
    <p>Đừng nhìn code rồi đoán. Hãy hỏi đúng một câu cho mỗi vòng lặp: <strong>vòng này chạy bao nhiêu lần, và mỗi lần nó kéo theo bao nhiêu việc bên trong?</strong> Nhân hai con số đó lại là ra chi phí của cả khối.</p>

    <p>Toàn bộ khác biệt giữa ba đoạn nằm ở quan hệ giữa các vòng lặp, không nằm ở số dòng code. Đoạn A và C có vòng lồng nhau nên phải <strong>nhân</strong>; đoạn B có hai vòng nối tiếp nên chỉ <strong>cộng</strong>. Riêng đoạn C thêm một chi tiết đánh lừa: vòng trong bắt đầu từ <code>i</code> chứ không từ 0, nên nó chạy ngắn dần. Ngắn dần không có nghĩa là bậc thấp hơn — đó là điều ví dụ này muốn bạn thấy tận mắt.</p>
  </template>

  <template #thuat-toan>
    <p>Quy trình phân tích, ba bước, dùng được cho mọi đoạn code có vòng lặp:</p>

    <ol>
      <li><strong>Đếm thành công thức chính xác</strong> theo <code>n</code>, chưa vội rút gọn gì cả. Ở bước này bạn được phép giữ hằng số và cả những số hạng nhỏ.</li>
      <li><strong>Bỏ mọi hằng số nhân.</strong> <code>n²/2</code> thành <code>n²</code>, <code>2n</code> thành <code>n</code>.</li>
      <li><strong>Chỉ giữ số hạng lớn nhất.</strong> <code>n²/2 + n/2</code> còn lại <code>n²</code>.</li>
    </ol>

    <p>Riêng với đoạn C, bước 1 cần một mẹo nhỏ: khi <code>i = 0</code> vòng trong chạy <code>n</code> lần, khi <code>i = 1</code> chạy <code>n − 1</code> lần, cứ thế tới khi <code>i = n − 1</code> thì chạy 1 lần. Cộng dãy <code>n + (n−1) + ... + 1</code> lại được <code>n(n+1)/2</code>. Đây là tổng cấp số cộng, và bạn sẽ gặp lại nó ở rất nhiều bài sau.</p>
  </template>

  <template #chay-tay>
    <p>Đặt <code>n = 4</code> rồi đếm bằng tay để đối chiếu với công thức:</p>

    <table class="formula-table">
      <tr><th>Đoạn</th><th>Đếm tay với n = 4</th><th>Công thức</th><th>Rút gọn</th></tr>
      <tr><td>A</td><td>16</td><td>n × n = n²</td><td><code>O(n²)</code></td></tr>
      <tr><td>B</td><td>8</td><td>n + n = 2n</td><td><code>O(n)</code></td></tr>
      <tr><td>C</td><td>10</td><td>4 + 3 + 2 + 1 = n(n+1)/2</td><td><code>O(n²)</code></td></tr>
    </table>

    <p>Riêng đoạn C, tách rõ từng giá trị của <code>i</code> để thấy vì sao ra 10:</p>

    <table class="formula-table">
      <tr><th>i</th><th>j chạy từ i tới 3</th><th>Số lần dem++</th><th>Tích luỹ</th></tr>
      <tr><td>0</td><td>0, 1, 2, 3</td><td>4</td><td>4</td></tr>
      <tr><td>1</td><td>1, 2, 3</td><td>3</td><td>7</td></tr>
      <tr><td>2</td><td>2, 3</td><td>2</td><td>9</td></tr>
      <tr><td>3</td><td>3</td><td>1</td><td>10</td></tr>
    </table>

    <p>Đúng 10, khớp với <code>n(n+1)/2 = 4×5/2 = 10</code>. Và đúng bằng một nửa của 16 — nhiều người dừng lại ở đây rồi kết luận đoạn C thuộc bậc thấp hơn đoạn A. Phần cuối sẽ cho thấy vì sao kết luận đó sai.</p>
  </template>

  <template #code>
    <p>Đừng tin vào phép đếm tay. Hãy chạy đúng ba đoạn đó và bắt chương trình khai ra con số:</p>

    <pre v-pre><code>#include &lt;cstdio&gt;

int main() {
    for (int n : {4, 10, 100, 1000}) {
        long long a = 0, b = 0, c = 0;

        for (int i = 0; i &lt; n; i++)
            for (int j = 0; j &lt; n; j++) a++;

        for (int i = 0; i &lt; n; i++) b++;
        for (int j = 0; j &lt; n; j++) b++;

        for (int i = 0; i &lt; n; i++)
            for (int j = i; j &lt; n; j++) c++;

        printf("n=%-5d A=%-10lld B=%-6lld C=%-10lld  C/A=%.2f\n",
               n, a, b, c, (double)c / a);
    }
}</code></pre>

    <p>Cột <code>C/A</code> in ra <code>0.62</code>, <code>0.55</code>, <code>0.50</code>, <code>0.50</code> — tỉ lệ giữa đoạn C và đoạn A tiến dần về đúng một nửa và <strong>dừng ở đó</strong>, không hề nhỏ đi tiếp khi <code>n</code> lớn lên. Một tỉ lệ hằng số như vậy chính là dấu hiệu hai đoạn cùng bậc.</p>
  </template>

  <template #toi-uu>
    <p><strong>Đoạn A và B khác nhau ở đúng một chữ:</strong> lồng nhau hay nối tiếp. Lồng thì nhân, nối tiếp thì cộng. Với n = 1000, A làm một triệu bước còn B làm hai nghìn bước — chênh nhau năm trăm lần chỉ vì một dấu thụt lề.</p>

    <p><strong>Đoạn C là cái bẫy hay gặp nhất.</strong> Nhìn thì thấy vòng trong "chạy ít hơn hẳn", nên nhiều người kết luận nó nhanh hơn hẳn. Đúng là nó làm ít việc hơn — đúng một nửa. Nhưng <code>n(n+1)/2 = n²/2 + n/2</code>, và sau khi bỏ hằng số 1/2 cùng số hạng nhỏ hơn, ta vẫn còn lại <code>n²</code>. Nhanh hơn hai lần không cứu được bạn khi <code>n</code> tăng lên một nghìn lần.</p>

    <p><strong>Vậy tối ưu thật sự là gì?</strong> Không phải cắt vòng trong cho ngắn lại — đó chính là điều đoạn C đã làm, và nó chỉ mua được hệ số 2. Muốn xuống bậc thì phải bỏ hẳn một vòng lặp, nghĩa là đổi cách nghĩ chứ không sửa code. Ví dụ tiếp theo cho bạn thấy một trường hợp cụ thể: một bài toán bỏ được hai vòng lặp, đi từ <code>O(n³)</code> xuống thẳng <code>O(n)</code>.</p>

    <p><strong>Rút ra:</strong> "làm ít việc hơn" và "có bậc thấp hơn" là hai chuyện hoàn toàn khác nhau. Chỉ có bậc mới quyết định thuật toán sống hay chết khi dữ liệu lớn lên.</p>
  </template>

</WorkedExample>

<WorkedExample id="vd-dpt-so-sanh-hai-cach" title="Cùng một bài, hai cách giải, chênh nhau bao nhiêu lần">

  <template #de-bai>
    <p>Cho một mảng <code>n</code> số nguyên, có thể âm, hãy tìm tổng lớn nhất của một đoạn con <strong>liên tiếp</strong> — nghĩa là một dãy các phần tử nằm sát nhau, không được bỏ cách. Mảng luôn có ít nhất một phần tử, nên đáp án luôn tồn tại.</p>

    <p>Ví dụ với mảng <code>[-2, 1, -3, 4, -1, 2, 1, -5, 4]</code>, đáp án là <code>6</code>, ứng với đoạn <code>[4, -1, 2, 1]</code>.</p>

    <p>Đây đúng là bài LeetCode 53 trong danh sách tự luyện phía dưới, nên giải xong ở đây thì bạn nộp được luôn.</p>
  </template>

  <template #y-tuong>
    <p>Cách nghĩ đầu tiên ai cũng có: đoạn con thì có hữu hạn, vậy cứ thử hết mọi đoạn rồi lấy cái tổng lớn nhất. Cách đó chạy đúng, và nó tốn <code>O(n³)</code>.</p>

    <p>Ý tưởng cứu được mọi thứ nằm ở một câu hỏi đổi góc nhìn: thay vì hỏi "đoạn nào tốt nhất trong cả mảng", hãy đi từ trái sang phải và ở mỗi vị trí <code>i</code> chỉ hỏi <strong>"đoạn tốt nhất kết thúc đúng tại i là đoạn nào?"</strong>. Câu hỏi nhỏ này có một tính chất quý: trả lời nó ở vị trí <code>i</code> chỉ cần biết câu trả lời ở vị trí <code>i − 1</code>, không cần nhìn lại toàn bộ mảng.</p>

    <p>Cụ thể, đoạn tốt nhất kết thúc tại <code>i</code> chỉ có đúng hai khả năng: hoặc nó nối tiếp đoạn tốt nhất kết thúc tại <code>i − 1</code>, hoặc nó vứt bỏ quá khứ và bắt đầu lại từ chính <code>a[i]</code>. Vứt bỏ quá khứ là lựa chọn đúng khi tổng đang tích luỹ đã âm — một cái đuôi âm chỉ kéo mọi đoạn nối vào nó xuống thấp hơn, giữ lại chẳng ích gì.</p>
  </template>

  <template #thuat-toan>
    <p><strong>Cách ngây thơ:</strong> hai vòng lặp chọn điểm đầu <code>i</code> và điểm cuối <code>j</code> của đoạn, vòng thứ ba cộng lại các phần tử từ <code>i</code> tới <code>j</code>. Ba vòng lồng nhau, mỗi vòng cỡ <code>n</code> bước, nên tổng là <code>O(n³)</code>.</p>

    <p><strong>Cách một lượt,</strong> tên gọi chính thức là thuật toán Kadane. Giữ đúng hai biến trong suốt cả quá trình:</p>

    <ul>
      <li><code>dangCo</code> — tổng của đoạn tốt nhất kết thúc tại vị trí đang xét.</li>
      <li><code>tot</code> — tổng lớn nhất từng thấy tính tới lúc này.</li>
    </ul>

    <p>Khởi tạo cả hai bằng <code>a[0]</code>. Với mỗi <code>i</code> từ 1 tới <code>n − 1</code>, làm đúng hai phép gán: <code>dangCo = max(a[i], dangCo + a[i])</code> rồi <code>tot = max(tot, dangCo)</code>. Hết vòng lặp, <code>tot</code> chính là đáp án. Một vòng lặp, mỗi bước làm lượng việc cố định, nên đây là <code>O(n)</code>.</p>
  </template>

  <template #chay-tay>
    <p>Chạy cách một lượt trên mảng <code>[-2, 1, -3, 4, -1, 2, 1, -5, 4]</code>:</p>

    <table class="formula-table">
      <tr><th>i</th><th>a[i]</th><th>dangCo + a[i]</th><th>dangCo mới</th><th>Chọn gì</th><th>tot</th></tr>
      <tr><td>0</td><td>-2</td><td>—</td><td>-2</td><td>Khởi tạo</td><td>-2</td></tr>
      <tr><td>1</td><td>1</td><td>-1</td><td>1</td><td>Bỏ quá khứ, bắt đầu lại</td><td>1</td></tr>
      <tr><td>2</td><td>-3</td><td>-2</td><td>-2</td><td>Nối tiếp</td><td>1</td></tr>
      <tr><td>3</td><td>4</td><td>2</td><td>4</td><td>Bỏ quá khứ, bắt đầu lại</td><td>4</td></tr>
      <tr><td>4</td><td>-1</td><td>3</td><td>3</td><td>Nối tiếp</td><td>4</td></tr>
      <tr><td>5</td><td>2</td><td>5</td><td>5</td><td>Nối tiếp</td><td>5</td></tr>
      <tr><td>6</td><td>1</td><td>6</td><td>6</td><td>Nối tiếp</td><td><strong>6</strong></td></tr>
      <tr><td>7</td><td>-5</td><td>1</td><td>1</td><td>Nối tiếp</td><td>6</td></tr>
      <tr><td>8</td><td>4</td><td>5</td><td>5</td><td>Nối tiếp</td><td>6</td></tr>
    </table>

    <p><strong>Hãy để ý hai dòng "bỏ quá khứ".</strong> Ở bước 1, tổng đang tích luỹ là <code>-2</code>, nên nối vào chỉ làm số 1 tệ đi. Ở bước 3, tổng đang tích luỹ là <code>-2</code>, nối vào số 4 sẽ ra 2 thay vì 4. Cả hai lần, thuật toán vứt bỏ toàn bộ đoạn phía sau mà không hề tiếc — và đó chính là chỗ nó tiết kiệm được hai vòng lặp.</p>

    <p>Chú ý thêm bước 7: <code>dangCo</code> tụt từ 6 xuống 1 nhưng <code>tot</code> vẫn giữ nguyên 6. Đây là lý do phải có hai biến chứ không phải một — một biến để theo dõi hiện tại, một biến để nhớ kỷ lục.</p>
  </template>

  <template #code>
    <pre v-pre><code>int cachNgayTho(const vector&lt;int&gt;&amp; a) {
    int n = a.size(), tot = a[0];
    for (int i = 0; i &lt; n; i++)
        for (int j = i; j &lt; n; j++) {
            int s = 0;
            for (int k = i; k &lt;= j; k++) s += a[k];   // cộng lại từ đầu
            tot = max(tot, s);
        }
    return tot;
}

int cachMotLuot(const vector&lt;int&gt;&amp; a) {
    int tot = a[0], dangCo = a[0];
    for (size_t i = 1; i &lt; a.size(); i++) {
        dangCo = max(a[i], dangCo + a[i]);   // bỏ đoạn cũ, hay nối tiếp?
        tot = max(tot, dangCo);
    }
    return tot;
}</code></pre>

    <p>Hai hàm, cùng một đáp án, cùng một ngôn ngữ. Hàm dưới ngắn hơn hàm trên. Toàn bộ khác biệt về tốc độ nằm trong bảng ở phần kế tiếp.</p>
  </template>

  <template #toi-uu>
    <table class="formula-table">
      <tr><th>n</th><th>Cách ngây thơ <code>O(n³)</code></th><th>Cách một lượt <code>O(n)</code></th><th>Chênh</th></tr>
      <tr><td>100</td><td>≈ 10⁶ bước</td><td>100 bước</td><td>10 nghìn lần</td></tr>
      <tr><td>1000</td><td>≈ 10⁹ bước, khoảng 10 giây</td><td>1000 bước, tức thì</td><td>1 triệu lần</td></tr>
      <tr><td>100000</td><td>≈ 10¹⁵ bước, khoảng 4 tháng</td><td>10⁵ bước, tức thì</td><td>10 tỉ lần</td></tr>
    </table>

    <p><strong>Còn một bậc trung gian đáng biết.</strong> Nếu bạn giữ nguyên hai vòng chọn <code>i</code> và <code>j</code> nhưng bỏ vòng cộng lại từ đầu — thay bằng cộng dồn <code>s += a[j]</code> ngay trong vòng <code>j</code> — bạn được <code>O(n²)</code> mà gần như không phải nghĩ gì thêm. Đây là kiểu tối ưu đáng làm đầu tiên khi bí: tìm phần công việc đang bị tính lại và nhớ nó lại. Nhưng <code>O(n²)</code> với <code>n = 10⁵</code> vẫn là <code>10¹⁰</code> bước, tức vẫn quá hạn giờ. Chỉ có cách một lượt mới về đích.</p>

    <p><strong>Điều đáng nói nhất:</strong> hai đoạn code trên dài xấp xỉ nhau, cùng viết bằng C++, cùng chạy trên cùng một máy. Không có thủ thuật tối ưu nào ở đây cả, không đổi ngôn ngữ, không mua máy mạnh hơn. Toàn bộ khoảng cách mười tỉ lần đến từ việc chọn đúng cách nghĩ. Đó là lý do người ta học thuật toán.</p>

    <p>Ở phần Dự án thực hành, bạn sẽ đo chính hai hàm này bằng công cụ mình tự viết và nhìn thấy bảng trên hiện ra bằng số đo thật chứ không phải số ước lượng.</p>
  </template>

</WorkedExample>

</LessonPart>

<LessonPart :sid="'do-phuc-tap'" part="bai-tap">
  <PracticeSet :items="data.practice" />
</LessonPart>

<LessonPart :sid="'do-phuc-tap'" part="leetcode">
  <LeetCodeList :items="data.leetcode" />
</LessonPart>

<LessonPart :sid="'do-phuc-tap'" part="du-an">
  <ProjectBrief :brief="data.project" />
</LessonPart>

</section>
</template>

<script setup>
import LessonGoal from '../components/LessonGoal.vue'
import LessonPart from '../components/LessonPart.vue'
import QuizBlock from '../components/QuizBlock.vue'
import WorkedExample from '../components/WorkedExample.vue'
import PracticeSet from '../components/PracticeSet.vue'
import LeetCodeList from '../components/LeetCodeList.vue'
import ProjectBrief from '../components/ProjectBrief.vue'
import data from '../data/lessons/do-phuc-tap.js'

defineProps({ active: Boolean })
</script>
