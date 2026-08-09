<template>
  <section
    id="trang-chu"
    class="day-section"
    data-sid="trang-chu"
    v-show="active"
  >
    <h2>Tổng quan</h2>

    <div class="learner-card">
      <div class="learner-card-heading">
        Nếu bạn mới bắt đầu, hãy làm theo 3 bước này
      </div>
      <p style="margin: 0.25rem 0 0">
        Đừng cố đọc hết ngay. Chọn một nhóm, xem ví dụ trước, rồi làm bài tập để
        củng cố. Mỗi bài học được thiết kế để bạn hiểu được "tại sao" trước khi
        nhìn vào "cách viết code".
      </p>
    </div>

    <div class="demo-banner">
      Mọi khái niệm đều bắt đầu bằng
      <strong>một ví dụ đời thường</strong> trước khi có thuật ngữ và code, kèm
      widget để bạn chạy tay từng bước. Dùng menu bên trái để chọn nhóm kiến
      thức cần học — nội dung bên phải sẽ đổi theo.
    </div>

    <h3>Lộ trình học 10 nhóm kiến thức</h3>
    <p>
      Các nhóm được sắp theo thứ tự gợi ý: nhóm sau thường dùng lại ý tưởng của
      nhóm trước, nên học đúng thứ tự sẽ dễ hiểu hơn học nhảy cóc. Bấm vào tên
      nhóm để đi thẳng tới bài đó.
    </p>

    <table class="formula-table">
      <thead>
        <tr>
          <th>Thứ tự học</th>
          <th>Nhóm kiến thức</th>
          <th>Sau bài này bạn làm được gì</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td><a href="#quay-lui-xau-nhi-phan">Quay lui &amp; Xâu nhị phân</a></td>
          <td>Tự viết được khung đệ quy sinh mọi xâu nhị phân độ dài n, và biết quay lui khi nào cần "lùi lại".</td>
        </tr>
        <tr>
          <td>2</td>
          <td><a href="#to-hop">Tổ hợp</a></td>
          <td>Phân biệt được tổ hợp và hoán vị, viết được khung quay lui sinh mọi tổ hợp chập k của n.</td>
        </tr>
        <tr>
          <td>3</td>
          <td><a href="#tham-lam">Tham lam</a></td>
          <td>Nhận ra khi nào chọn cái tốt nhất trước mắt là đủ, và khi nào cách đó cho kết quả sai.</td>
        </tr>
        <tr>
          <td>4</td>
          <td><a href="#qhd-nen-tang">Quy hoạch động nền tảng</a></td>
          <td>Chuyển được một công thức đệ quy hay tính lại thành bảng lặp từ dưới lên, nhận ra dấu hiệu bài QHĐ.</td>
        </tr>
        <tr>
          <td>5</td>
          <td>
            <a href="#qhd-lis-lcs-doixung">QHĐ nâng cao: Knapsack, LIS, LCS, Xâu đối xứng</a>
          </td>
          <td>Đặt được trạng thái và công thức truy hồi cho 4 bài toán QHĐ kinh điển, truy vết ngược ra lời giải.</td>
        </tr>
        <tr>
          <td>6</td>
          <td><a href="#ngan-xep-hang-doi">Ngăn xếp &amp; Hàng đợi</a></td>
          <td>Phân biệt LIFO và FIFO bằng ví dụ chồng đĩa và hàng mua vé, chọn đúng cấu trúc khi đọc đề.</td>
        </tr>
        <tr>
          <td>7</td>
          <td><a href="#dfs-bfs">DFS &amp; BFS</a></td>
          <td>Đọc được ma trận kề, vẽ lại đồ thị, và biết khi nào dùng DFS, khi nào dùng BFS.</td>
        </tr>
        <tr>
          <td>8</td>
          <td><a href="#dsu">DSU — Disjoint Set Union</a></td>
          <td>Cài đúng find và union kèm nén đường, nhận ra bài nào nên dùng DSU thay vì DFS.</td>
        </tr>
        <tr>
          <td>9</td>
          <td><a href="#cay-nhi-phan-bst">Cây nhị phân &amp; BST</a></td>
          <td>Vẽ được cây từ dữ liệu cha con, viết được 3 phép duyệt, dựng/chèn/xóa được node trên BST.</td>
        </tr>
        <tr>
          <td>10</td>
          <td><a href="#bst-nang-cao">BST nâng cao</a></td>
          <td>Kiểm tra đúng một cây có phải BST, và tìm được tổ tiên chung gần nhất trên cây.</td>
        </tr>
      </tbody>
    </table>

    <div
      class="realworld"
      style="background: var(--success-bg); border-left-color: var(--success)"
    >
      <span class="rw-title">🎯 Mỗi nhóm kiến thức học theo đúng 6 phần</span>
      <p style="margin: 0">
        Mọi nhóm kiến thức đều đi theo cùng một khung: mục tiêu bài học → lý
        thuyết cơ bản → vì sao kiến thức này quan trọng → quiz kiểm tra → ví dụ
        điển hình giải đủ 6 bước → bài tập kiểm tra → danh sách LeetCode để tự
        luyện. Bạn chỉ cần quen khung này một lần là học được cả 10 nhóm.
      </p>
    </div>

    <h3>Cách dùng một bài học</h3>
    <p>
      Với mỗi nhóm kiến thức, thứ tự học hiệu quả nhất là: đọc lý thuyết → làm
      quiz để tự kiểm tra → xem ví dụ điển hình để thấy lý thuyết áp dụng vào
      bài toán cụ thể ra sao → làm 3 bài tập của nhóm để tự tay viết code → cuối
      cùng luyện thêm với danh sách bài trên LeetCode. Menu bên phải màn hình
      luôn hiện đủ 7 mục của bài đang mở, để bạn nhảy nhanh giữa các phần.
    </p>
  </section>
</template>

<script setup>
defineProps({ active: Boolean });
</script>
