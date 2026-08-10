<template>
<section id="danh-sach-lien-ket" class="day-section" data-sid="danh-sach-lien-ket" v-show="active">

<h2>Danh sách liên kết</h2>

<LessonGoal :sid="'danh-sach-lien-ket'">
  <ul><li v-for="(g, i) in data.goal" :key="i">{{ g }}</li></ul>
</LessonGoal>

<LessonPart :sid="'danh-sach-lien-ket'" part="ly-thuyet">

<h3 id="auto-dsll-mau-giay-va-nut">Mẩu giấy dẫn đường, và cấu tạo một nút</h3>
<p class="idea-label">🧩 Ý tưởng cốt lõi</p>
<p>Bạn đang chơi trò truy tìm kho báu. Bạn nhận một mẩu giấy, trên đó ghi một manh mối và chỗ giấu mẩu giấy tiếp theo. Bạn không biết trò chơi có bao nhiêu mẩu giấy, và bạn cũng không nhảy thẳng tới mẩu thứ bảy được — muốn tới đó phải đi qua đúng sáu mẩu trước nó. Nhưng đổi lại, muốn chèn một mẩu mới vào giữa trò chơi thì chỉ cần sửa đúng một dòng địa chỉ trên mẩu trước nó, không phải viết lại cả trò chơi từ đầu.</p>

<p><strong>Đây là gì?</strong> Một danh sách liên kết là một chuỗi các nút, mỗi nút giữ dữ liệu của mình cộng thêm địa chỉ của nút kế tiếp. Bản thân danh sách chỉ cần giữ một thứ duy nhất: con trỏ tới nút đầu. Từ đó, muốn tới nút thứ i thì đi lần lượt qua i nút, không có cách nào nhảy thẳng tới.</p>

<pre v-pre><code>struct Nut {
    int giaTri;
    Nut* sau;   // địa chỉ nút kế tiếp, hoặc nullptr nếu đây là nút cuối
};
// Danh sách chỉ là một con trỏ tới nút đầu tiên:
Nut* dauDanhSach;</code></pre>

<p><strong>Vì sao quan trọng?</strong> Đây là cấu trúc dữ liệu đầu tiên bạn gặp mà bộ nhớ của nó không nằm liên tục. Mảng ở bài trước dồn mọi phần tử sát nhau nên tính được địa chỉ bằng một phép nhân; danh sách liên kết thì mỗi nút có thể nằm ở bất kỳ đâu trong bộ nhớ, và thứ duy nhất nối chúng lại là các con trỏ. Đánh đổi đó — mất khả năng nhảy thẳng, đổi lại khả năng chèn xoá không cần dịch chuyển gì — là chủ đề chính của cả bài.</p>

<h3 id="auto-dsll-bang-danh-doi">Bảng đánh đổi với mảng</h3>

<p>So sánh trực diện các thao tác thường dùng:</p>

<table class="formula-table">
  <tr><th>Thao tác</th><th>Mảng</th><th>Danh sách liên kết</th></tr>
  <tr><td>Đọc phần tử thứ i</td><td>O(1)</td><td>O(n) — phải đi từ đầu</td></tr>
  <tr><td>Thêm vào đầu</td><td>O(n) — phải dịch cả mảng</td><td>O(1)</td></tr>
  <tr><td>Thêm vào cuối</td><td>O(1) khấu trừ</td><td>O(1) nếu giữ con trỏ đuôi</td></tr>
  <tr><td>Chèn khi đã cầm con trỏ tới chỗ chèn</td><td>O(n) — vẫn phải dịch</td><td>O(1) — chỉ sửa liên kết</td></tr>
  <tr><td>Tìm theo giá trị</td><td>O(n)</td><td>O(n)</td></tr>
  <tr><td>Bộ nhớ phụ cho mỗi phần tử</td><td>0</td><td>Một con trỏ (hoặc hai, nếu là danh sách đôi)</td></tr>
  <tr><td>Thân thiện với cache</td><td>Rất tốt, đọc liên tục</td><td>Kém, các nút rải rác</td></tr>
</table>

<p><strong>Điểm mấu chốt cần nói rõ:</strong> danh sách liên kết chèn xoá O(1) <strong>chỉ khi đã cầm sẵn con trỏ</strong> tới đúng chỗ cần chèn hoặc xoá. Nếu bạn chỉ có một giá trị và phải tìm ra chỗ đó trước, việc tìm vẫn tốn O(n), và khi đó danh sách liên kết không hề thắng mảng — cả hai cùng O(n) cho toàn bộ thao tác.</p>

<h3 id="auto-dsll-vi-sao-mang-thang">Vì sao mảng thường thắng trong thực tế</h3>

<p>Nhìn bảng trên, danh sách liên kết có vẻ ngang ngửa hoặc hơn mảng ở nhiều dòng. Nhưng trong thực tế, mảng vẫn thường được chọn hơn — vì bảng chi phí chỉ đếm số phép toán, không đếm chi phí đi tới bộ nhớ.</p>

<p>Mảng nằm liên tục nên khi bạn đọc phần tử thứ i, máy tính đã tự động nạp sẵn cả một khối các phần tử lân cận vào bộ nhớ đệm nhanh (cache) — đây là locality đã nói ở bài Độ phức tạp thuật toán và nhắc lại ở phần cuối bài Mảng. Đọc phần tử kế tiếp gần như miễn phí vì nó đã có sẵn trong cache.</p>

<p>Các nút của danh sách liên kết thì nằm rải rác khắp bộ nhớ, tuỳ nơi bộ nhớ cấp cho mỗi lần tạo nút mới. Mỗi lần đi sang nút kế tiếp là một lần máy tính phải nhảy tới một vùng nhớ hoàn toàn khác — gọi là trượt cache — và việc đó chậm hơn đọc liên tục rất nhiều lần, dù cả hai đều "chỉ một bước" theo cách đếm Big-O. Đây là lý do bạn sẽ thấy ở bài tập cuối bài: dù cộng tổng một triệu phần tử là O(n) trên cả hai cấu trúc, thời gian thật trên danh sách liên kết có thể chậm hơn hẳn con số O(n) gợi ý.</p>

<h3 id="auto-dsll-don-doi-vong">Đơn, đôi, vòng, và nút giả</h3>

<p>Có ba biến thể thường gặp:</p>

<table class="formula-table">
  <tr><th>Loại</th><th>Thêm được gì</th><th>Tốn thêm gì</th></tr>
  <tr><td>Đơn</td><td>Cấu trúc đơn giản nhất, duyệt một chiều</td><td>Không tốn gì thêm ngoài con trỏ sau</td></tr>
  <tr><td>Đôi</td><td>Duyệt hai chiều, xoá O(1) khi đã cầm chính nút cần xoá</td><td>Thêm một con trỏ trước cho mỗi nút</td></tr>
  <tr><td>Vòng</td><td>Từ nút cuối quay lại được nút đầu, hữu ích cho lịch quay vòng</td><td>Dễ lặp vô hạn nếu điều kiện dừng viết sai</td></tr>
</table>

<p>Danh sách đôi cho xoá O(1) khi cầm chính nút cần xoá — vì có con trỏ trước, ta nối trực tiếp nút trước và nút sau với nhau, không cần tìm nút trước. Đây đúng là điều một bộ nhớ đệm kiểu LRU cần: nó luôn cầm sẵn con trỏ tới nút vừa dùng và phải xoá nút cũ nhất với chi phí O(1).</p>

<p>Một mẹo nhỏ nhưng quan trọng: thêm một <strong>nút giả</strong> rỗng đứng trước nút đầu tiên. Không có nút giả, code phải xử lý riêng hai trường hợp: danh sách đang trống, và đang xoá đúng nút đầu. Có nút giả, mọi nút thật — kể cả nút đầu — luôn có một nút phía trước, nên hai trường hợp đặc biệt đó biến mất, code chạy chung một đường xử lý.</p>

<pre v-pre><code>void push_front(Nut* giaDauDanhSach, int giaTri) {
    Nut* moi = new Nut{giaTri, giaDauDanhSach-&gt;sau};
    giaDauDanhSach-&gt;sau = moi;   // luôn đúng, kể cả khi danh sách đang trống
}

void erase_after(Nut* truoc) {
    Nut* canXoa = truoc-&gt;sau;
    truoc-&gt;sau = canXoa-&gt;sau;   // gỡ liên kết trước khi giải phóng
    delete canXoa;
}</code></pre>

<h3 id="auto-dsll-hai-con-tro-va-bo-nho">Hai con trỏ nhanh chậm, và chuyện bộ nhớ</h3>

<p>Một khuôn mẫu dùng đúng đặc điểm của danh sách liên kết: hai con trỏ đi với tốc độ khác nhau trên cùng một danh sách, một đi một nhịp, một đi hai nhịp mỗi bước. Khi con trỏ nhanh chạm cuối, con trỏ chậm đang đứng đúng ở giữa danh sách — tìm nút giữa xong trong một lượt duyệt. Cũng đúng khuôn mẫu này, nếu danh sách có chu trình, hai con trỏ sẽ gặp nhau tại một điểm nào đó trong chu trình — cách phát hiện chu trình kiểu rùa và thỏ. Khuôn mẫu hai con trỏ này sẽ quay lại thành một nhóm kiến thức riêng ở Chương 2, dùng cho cả mảng.</p>

<p>Còn một chuyện không liên quan tới thời gian chạy nhưng dễ gây lỗi nặng: mỗi nút của danh sách liên kết được cấp phát riêng, nên phải giải phóng riêng từng nút, không thể giải phóng "cả danh sách" bằng một lệnh như mảng. Xoá nửa vời — ví dụ giải phóng nút nhưng quên gỡ liên kết trỏ tới nó từ nút trước — để lại con trỏ treo hoặc rò rỉ bộ nhớ. Và nếu việc rò rỉ đó nằm trong một vòng lặp chạy nhiều lần, chương trình chạy càng lâu sẽ ăn bộ nhớ càng nhiều rồi chết.</p>

</LessonPart>

<LessonPart :sid="'danh-sach-lien-ket'" part="vi-sao">

<h3 id="auto-dsll-vi-sao">Vì sao danh sách liên kết đáng học</h3>

<p><strong>Nó là bài học đầu tiên về con trỏ và cấu trúc tự trỏ tới nhau.</strong> Cây, đồ thị, hàng đợi kiểu LRU — mọi cấu trúc phức tạp hơn ở các chương sau đều là biến thể của ý tưởng "một nút giữ dữ liệu cộng địa chỉ nút khác". Hiểu chắc danh sách liên kết đơn là nền để hiểu mọi thứ dựa trên con trỏ về sau.</p>

<p><strong>Nó dạy bạn phân biệt chi phí lý thuyết với chi phí thật.</strong> Bảng đánh đổi cho danh sách liên kết những dòng O(1) đẹp mắt, nhưng thực tế mảng vẫn thắng ở nhiều việc vì locality và cache — điều Big-O không đếm. Đây là bài học về việc đọc bảng độ phức tạp một cách tỉnh táo, không phải chọn cấu trúc dữ liệu chỉ vì cột O nhỏ hơn.</p>

<p><strong>Khuôn mẫu hai con trỏ nhanh chậm xuất hiện khắp nơi.</strong> Từ tìm nút giữa, phát hiện chu trình, tới các bài toán trên mảng ở Chương 2 — một khi đã hiểu bản chất "khoảng cách giảm đều mỗi bước" thì nhận ra dạng bài này rất nhanh, dù đề bài diễn đạt khác nhau đến đâu.</p>

<p><strong>Và nó khép lại đủ ba mảnh của một thư viện dùng được thật.</strong> Sau bài này bạn có Vec, Str, List do chính bạn viết — không phải bài tập rời rạc, mà là những module MVP cuối chương ghép lại thành sản phẩm chạy được đầu tiên.</p>

</LessonPart>

<LessonPart :sid="'danh-sach-lien-ket'" part="quiz">
  <QuizBlock :questions="data.quiz" />
</LessonPart>

<LessonPart :sid="'danh-sach-lien-ket'" part="vi-du">

<WorkedExample id="vd-dsll-dao-danh-sach" title="Đảo ngược danh sách liên kết bằng ba con trỏ, chạy tay từng bước">

<p>Đảo ngược danh sách <code>1 &#8594; 2 &#8594; 3 &#8594; 4</code> bằng ba con trỏ: <code>truoc</code> (ban đầu <code>nullptr</code>), <code>hien_tai</code> (ban đầu trỏ vào nút 1), và <code>sau</code> dùng để lưu tạm.</p>

<table class="formula-table">
  <tr><th>Bước</th><th>truoc</th><th>hien_tai</th><th>sau</th><th>Trạng thái danh sách</th></tr>
  <tr><td>0 (khởi đầu)</td><td>nullptr</td><td>1</td><td>—</td><td>1 &#8594; 2 &#8594; 3 &#8594; 4</td></tr>
  <tr><td>1</td><td>nullptr</td><td>1</td><td>2</td><td>lưu sau = 2 trước khi sửa gì</td></tr>
  <tr><td>2</td><td>1</td><td>2</td><td>2</td><td>1 &#8592; đã quay đầu, hien_tai chuyển sang 2</td></tr>
  <tr><td>3</td><td>1</td><td>2</td><td>3</td><td>lưu sau = 3</td></tr>
  <tr><td>4</td><td>2</td><td>3</td><td>3</td><td>2 &#8592; 1, hien_tai chuyển sang 3</td></tr>
  <tr><td>5</td><td>2</td><td>3</td><td>4</td><td>lưu sau = 4</td></tr>
  <tr><td>6</td><td>3</td><td>4</td><td>4</td><td>3 &#8592; 2 &#8592; 1, hien_tai chuyển sang 4</td></tr>
  <tr><td>7</td><td>3</td><td>4</td><td>nullptr</td><td>lưu sau = nullptr</td></tr>
  <tr><td>8 (kết thúc)</td><td>4</td><td>nullptr</td><td>nullptr</td><td>4 &#8594; 3 &#8594; 2 &#8594; 1</td></tr>
</table>

<pre v-pre><code>Nut* dao(Nut* dau) {
    Nut* truoc = nullptr;
    Nut* hien_tai = dau;
    while (hien_tai != nullptr) {
        Nut* sau = hien_tai-&gt;sau;   // lưu trước khi sửa
        hien_tai-&gt;sau = truoc;      // đảo hướng con trỏ
        truoc = hien_tai;
        hien_tai = sau;
    }
    return truoc;   // nút đầu mới
}</code></pre>

<p><strong>Chỗ then chốt:</strong> phải lưu <code>sau</code> trước khi sửa con trỏ của <code>hien_tai</code>. Nếu sửa <code>hien_tai-&gt;sau = truoc</code> trước, bạn đã ghi đè mất địa chỉ của phần còn lại danh sách, và không có cách nào tìm lại — phần đó bị mất vĩnh viễn khỏi chương trình, không phải lỗi có thể debug bằng cách in ra thêm, vì dữ liệu đã thật sự biến mất.</p>

<p><strong>Chi phí:</strong> O(n) thời gian — đi qua mỗi nút đúng một lần. O(1) bộ nhớ phụ — chỉ ba con trỏ, không phụ thuộc độ dài danh sách. Đây là lý do bài này được hỏi nhiều khi phỏng vấn: nó phân biệt rõ người hiểu con trỏ đang làm gì với người chỉ thuộc lòng đoạn code.</p>

</WorkedExample>

<WorkedExample id="vd-dsll-rua-tho-phat-hien-chu-trinh" title="Rùa và thỏ: phát hiện danh sách có chu trình">

<p>Danh sách 6 nút <code>1 &#8594; 2 &#8594; 3 &#8594; 4 &#8594; 5 &#8594; 6</code>, nhưng nút 6 không trỏ ra ngoài mà trỏ ngược về nút 3, tạo thành chu trình <code>3 &#8594; 4 &#8594; 5 &#8594; 6 &#8594; 3 &#8594; ...</code>. Rùa đi 1 nhịp mỗi bước, thỏ đi 2 nhịp mỗi bước, cả hai bắt đầu từ nút 1.</p>

<table class="formula-table">
  <tr><th>Bước</th><th>Rùa (vị trí)</th><th>Thỏ (vị trí)</th><th>Nhận xét</th></tr>
  <tr><td>0</td><td>1</td><td>1</td><td>Cùng xuất phát</td></tr>
  <tr><td>1</td><td>2</td><td>3</td><td>Thỏ đi 2 nhịp: 1 &#8594; 2 &#8594; 3</td></tr>
  <tr><td>2</td><td>3</td><td>5</td><td>Thỏ đã vào chu trình</td></tr>
  <tr><td>3</td><td>4</td><td>3</td><td>Thỏ đi hết vòng 6&#8594;3, quay lại nút 3</td></tr>
  <tr><td>4</td><td>5</td><td>5</td><td>Rùa và thỏ trùng nhau tại nút 5</td></tr>
</table>

<p><strong>Chỗ then chốt:</strong> một khi cả hai con trỏ đã vào trong chu trình, mỗi bước khoảng cách giữa thỏ và rùa — tính theo số nút trong chu trình — giảm đúng 1, vì thỏ đi nhanh hơn rùa đúng 1 nhịp mỗi bước. Một khoảng cách nguyên không âm giảm đều mỗi bước chắc chắn về 0, nên rùa và thỏ chắc chắn gặp nhau. Nếu danh sách không có chu trình, thỏ sẽ ra khỏi danh sách (gặp <code>nullptr</code>) trước khi hai con trỏ có cơ hội gặp nhau — đó là dấu hiệu để kết luận không có chu trình.</p>

<p><strong>Chi phí:</strong> O(n) thời gian, O(1) bộ nhớ phụ — hơn hẳn cách dùng bảng băm ghi lại các nút đã thăm, vốn cũng O(n) thời gian nhưng tốn thêm O(n) bộ nhớ để lưu tập nút đã thăm.</p>

</WorkedExample>

</LessonPart>

<LessonPart :sid="'danh-sach-lien-ket'" part="bai-tap">
  <PracticeSet :items="data.practice" />
</LessonPart>

<LessonPart :sid="'danh-sach-lien-ket'" part="leetcode">
  <LeetCodeList :items="data.leetcode" />
</LessonPart>

<LessonPart :sid="'danh-sach-lien-ket'" part="du-an">

<ProjectBrief :brief="data.project" />

<p>Chương 1 kết thúc ở đây. Bạn đã có đủ ba mảnh của thư viện nền và một công cụ đo, giờ là lúc ghép chúng thành sản phẩm chạy được đầu tiên.</p>

<!-- Bài cuối chương là chỗ MVP của cả chương xuất hiện. Dữ liệu nằm ở
     src/data/capstones/, không nằm trong dữ liệu bài, vì nó thuộc về cả chương. -->
<ProjectBrief :brief="capstone" mode="capstone" />

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
import data from '../data/lessons/danh-sach-lien-ket.js'
import { capstoneCuaChuong } from '../data/capstones/index.js'

const capstone = capstoneCuaChuong('nen-mong')

defineProps({ active: Boolean })
</script>
