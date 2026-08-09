<template>
  <section
    id="trang-chu"
    class="day-section"
    data-sid="trang-chu"
    v-show="active"
  >
    <h2>Tổng quan &amp; phạm vi ôn thi</h2>

    <div class="learner-card">
      <div class="learner-card-heading">
        Nếu bạn mới bắt đầu, hãy làm theo 3 bước này
      </div>
      <p style="margin: 0.25rem 0 0">
        Đừng cố đọc hết ngay. Chọn một nhóm, xem ví dụ trước, rồi làm bài tập để
        củng cố. Mỗi bài học được thiết kế để bạn hiểu được “tại sao” trước khi
        nhìn vào “cách viết code”.
      </p>
    </div>

    <div class="demo-banner">
      Mỗi bài học đi theo mạch:
      <strong
        >ví dụ đời thường → code → chạy tay (tĩnh nếu đơn giản, tương tác nếu
        luồng chạy phức tạp) → ứng dụng thực tế → luyện tập</strong
      >. Dùng menu bên trái để chọn nhóm kiến thức cần học — nội dung bên phải
      sẽ đổi theo.
    </div>

    <div
      class="realworld"
      style="background: var(--success-bg); border-left-color: var(--success)"
    >
      <span class="rw-title" style="color: #1d6e4f"
        >🎯 Phạm vi thi chính thức — theo đúng đề cương thầy gửi
        (Trao_doi_chung)</span
      >
      <p style="margin: 0 0 0.6rem">
        Cập nhật theo đề cương chính thức mới nhất của thầy. Đã cắt bỏ phần
        không nằm trong đề cương (Số K chữ số, Số lộc phát, Knapsack nâng cao,
        Job Sequencing, Kadane, Subset Sum, C(n,k), Dijkstra, Floyd, AVL,
        Euler/Hamilton, cây khung nhỏ nhất).
        <strong>3 chủ đề mới được thêm vì đề cương thầy có nêu rõ</strong>: Dãy
        con tăng dài nhất (LIS), Xâu con đối xứng dài nhất, Cây nhị phân dựng từ
        cặp cha-con.
      </p>
      <table class="formula-table scope-table" style="margin: 0.5rem 0 0">
        <tr>
          <th>Nhóm kiến thức chính thức (theo đề cương thầy)</th>
          <th>Trong sách</th>
        </tr>
        <tr>
          <td>
            Quay lui vét cạn: <strong>Xâu nhị phân</strong>,
            <strong>Tổ hợp</strong>
            <span class="badge-bonus"
              >+ N-Queens, Hoán vị kế tiếp (đề ôn tập)</span
            >
          </td>
          <td class="yes">✓ Có đầy đủ</td>
        </tr>
        <tr>
          <td>Bài toán tối ưu: <strong>Tham lam cơ bản</strong></td>
          <td class="yes">✓ Có đầy đủ</td>
        </tr>
        <tr>
          <td>
            Bài toán tối ưu — QHĐ: <strong>Dãy con tăng dài nhất (LIS)</strong>,
            <strong>Xâu con chung dài nhất (LCS)</strong>,
            <strong>Xâu con đối xứng dài nhất</strong>
          </td>
          <td class="yes">
            ✓ Có đầy đủ (Fibonacci, Bậc thang, Knapsack, LIS, LCS, Xâu đối xứng)
          </td>
        </tr>
        <tr>
          <td>
            Cấu trúc dữ liệu cơ bản:
            <strong>Ngăn xếp — kiểm soát dấu ngoặc</strong>
            <span class="badge-bonus">(Hàng đợi vẫn dạy vì BFS cần dùng)</span>
          </td>
          <td class="yes">✓ Có đầy đủ</td>
        </tr>
        <tr>
          <td>Duyệt đồ thị cơ bản: <strong>DFS, BFS, DSU</strong></td>
          <td class="yes">✓ Có đầy đủ</td>
        </tr>
        <tr>
          <td>
            Cây nhị phân – BST:
            <strong>Duyệt cây thường (input cặp cha-con)</strong>,
            <strong>Dựng BST từ dãy số</strong>
          </td>
          <td class="yes">✓ Có đầy đủ</td>
        </tr>
      </table>
      <p style="margin: 0.6rem 0 0; font-size: 0.85rem; color: #555">
        📎 Code DFS/BFS/DSU trong sách đã đồng bộ đúng tên biến và thuật toán
        trong file mẫu thầy gửi (<code>List[]</code>, <code>chuaxet[]</code>,
        union theo <code>num()</code>/kích thước) — xem chi tiết kèm lưu ý ở
        phần BFS/DFS và DSU.
      </p>
    </div>

    <div
      class="realworld"
      style="background: var(--blue-bg); border-left-color: var(--blue)"
    >
      <span class="rw-title"
        >📋 Đối chiếu trực tiếp với Đề bài ôn tập thực hành (9 bài) — bấm để
        nhảy tới phần lý thuyết tương ứng</span
      >
      <table class="formula-table" style="margin: 0.3rem 0 0">
        <tr>
          <th>Bài</th>
          <th>Đề bài</th>
          <th>Thuộc nhóm kiến thức</th>
          <th>Lý thuyết + code</th>
        </tr>
        <tr>
          <td>1</td>
          <td>Hoán vị kế tiếp (Next Permutation)</td>
          <td>Quay lui / Tổ hợp</td>
          <td><a href="#bai1-hoanvi-ke-tiep">Tổ hợp</a></td>
        </tr>
        <tr>
          <td>2</td>
          <td>Đếm cách đặt N quân hậu (N-Queens)</td>
          <td>Quay lui</td>
          <td><a href="#vd-n-queens">Quay lui</a></td>
        </tr>
        <tr>
          <td>3</td>
          <td>Activity Selection</td>
          <td>Tham lam</td>
          <td><a href="#tham-lam">Tham lam</a></td>
        </tr>
        <tr>
          <td>4</td>
          <td>Xâu con chung dài nhất (LCS)</td>
          <td>Quy hoạch động</td>
          <td><a href="#bai4-lcs">QHĐ</a></td>
        </tr>
        <tr>
          <td>5</td>
          <td>Đảo ngược từng từ trong xâu</td>
          <td>Xử lý xâu cơ bản</td>
          <td><a href="#bai5-reverse-words">Ngăn xếp</a></td>
        </tr>
        <tr>
          <td>6</td>
          <td>Kiểm tra dãy ngoặc hợp lệ (3 loại ngoặc)</td>
          <td>Ngăn xếp</td>
          <td><a href="#bai6-ngoac-hop-le">Ngăn xếp</a></td>
        </tr>
        <tr>
          <td>7</td>
          <td>Xây BST rồi in Post Order</td>
          <td>Cây nhị phân / BST</td>
          <td><a href="#bai7-8-bst-build-delete">Cây nhị phân</a></td>
        </tr>
        <tr>
          <td>8</td>
          <td>BST đầy đủ: chèn, xóa (copy), duyệt <strong>(7đ)</strong></td>
          <td>Cây nhị phân / BST</td>
          <td><a href="#bai7-8-bst-build-delete">Cây nhị phân</a></td>
        </tr>
        <tr>
          <td>9</td>
          <td>
            Đồ thị ma trận kề, liên thông, đường đi BFS <strong>(7đ)</strong>
          </td>
          <td>Duyệt đồ thị</td>
          <td><a href="#bai9-graph-matrix">Duyệt đồ thị</a></td>
        </tr>
      </table>
    </div>

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

    <div
      class="realworld"
      style="background: var(--warning-bg); border-left-color: var(--warning)"
    >
      <span class="rw-title" style="color: var(--amber)">⚠️ Lưu ý khác</span>
      <p style="margin: 0">
        Không ôn: Nhánh cận, AVL Tree. Code viết bằng tiếng Anh — nếu thầy chữa
        bài bằng ký hiệu slide, <code>Try(i)</code>=<code>backtrack(i)</code>,
        <code>Result()</code>=<code>printResult()</code>,
        <code>chuaxet[]</code>=<code>used[]</code> (đảo dấu).
      </p>
    </div>
  </section>
</template>

<script setup>
defineProps({ active: Boolean });
</script>
