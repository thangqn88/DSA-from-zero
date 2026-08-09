# DSA from Zero — Học Cấu trúc dữ liệu & Giải thuật để qua môn

**👉 Học ngay tại: https://thangqn88.github.io/DSA-from-zero/**

Một trang web tiếng Việt dạy Cấu trúc dữ liệu & Giải thuật cho sinh viên đại học đang
chuẩn bị thi. Không cần cài gì, không cần đăng ký, mở link là học được — kể cả trên điện thoại.

Điểm khác biệt so với slide và giáo trình: mỗi thuật toán đều có một **widget mô phỏng
chạy từng bước**. Bạn bấm "Bước tiếp theo" và nhìn thấy mảng đổi giá trị, cây được duyệt,
hàng đợi được nạp — thay vì phải tự tưởng tượng trong đầu.

## Học được những gì

| Nhóm | Chủ đề |
|---|---|
| 1 — Vét cạn | Quay lui & sinh xâu nhị phân · Sinh tổ hợp, chỉnh hợp |
| 2 — Bài toán tối ưu | Tham lam (Activity Selection, Đổi tiền) · QHĐ nền tảng (Fibonacci, Bậc thang) · QHĐ (Knapsack, LIS, LCS, Xâu đối xứng) |
| 3 — Cấu trúc dữ liệu | Ngăn xếp & Hàng đợi |
| 4 — Duyệt đồ thị | BFS & DFS · DSU (Disjoint Set Union) |
| 5 — Cây nhị phân | 3 phép duyệt, cây cha-con, BST · BST nâng cao (kiểm tra, cân bằng, LCA) |

Kèm theo là mục **Cẩm nang giải đề** — hướng dẫn nhận dạng đề bài thuộc dạng nào và nên
dùng thuật toán gì.

## Cách học hiệu quả nhất

1. Đọc phần giải thích bằng ví dụ đời thường trước, đừng vội nhảy vào code.
2. Chạy widget mô phỏng ít nhất một lượt, dừng lại ở mỗi bước và tự đoán bước kế tiếp.
3. Đọc code mẫu C++, tự gõ lại từ đầu chứ không copy.
4. Làm bài tập ở menu bên phải. Mục có dấu ★ là dạng hay ra trong đề.

Nếu một chỗ nào đó bạn đọc mãi không hiểu, khả năng cao là do bài viết chưa đủ rõ chứ
không phải do bạn — hãy [mở issue](https://github.com/thangqn88/DSA-from-zero/issues)
báo lại, đó là góp ý có giá trị nhất cho dự án này.

## Đặc điểm kỹ thuật

- **Không backend, không database, không tracking.** Toàn bộ là file tĩnh, chạy hoàn toàn
  trong trình duyệt.
- **17 widget mô phỏng tương tác**, dùng chung một engine chạy-từng-bước
  ([src/utils/stepper.js](src/utils/stepper.js)).
- **Code mẫu bằng C++**, ngôn ngữ phổ biến nhất trong các môn DSA ở đại học Việt Nam.
- Giải thích theo lối Feynman: ví dụ đời thường trước, thuật ngữ sau.
- URL có `#id` nên bạn bookmark hoặc gửi link thẳng tới một mục cụ thể được.

## Chạy trên máy của bạn

Cần [Node.js](https://nodejs.org/) 20 trở lên.

```bash
git clone https://github.com/thangqn88/DSA-from-zero.git
cd DSA-from-zero
npm install
npm run dev
```

Mở địa chỉ hiện ra trong terminal (mặc định http://localhost:5173).

Build bản tĩnh:

```bash
npm run build     # tạo thư mục dist/
npm run preview   # xem thử bản build
```

Đừng mở trực tiếp `dist/index.html` bằng double-click — giao thức `file://` bị trình duyệt
chặn nhiều tính năng. Hãy chạy qua một server tĩnh, ví dụ `npx serve dist`.

## Cấu trúc mã nguồn

```
src/
  App.vue              layout chính: menu trái + nội dung + menu phải
  style.css            toàn bộ CSS
  data/
    nav.js             menu trái — 5 nhóm kiến thức
    menus.json         menu phải — mục con của từng nhóm
  sections/            12 component Vue, mỗi component là 1 nhóm kiến thức
  widgets/             logic của các widget tương tác
  utils/stepper.js     engine chạy-từng-bước dùng chung
```

Chuyển nhóm kiến thức bằng `v-show` trên state trong `App.vue`, không dùng router. Mỗi
widget khởi tạo trong `onMounted()` của component tương ứng và thao tác DOM trực tiếp qua
`getElementById` — nên khi sửa nội dung, **không được đổi các `id` mà widget đang query**.

Thêm một nhóm kiến thức mới: tạo file trong `src/sections/`, thêm entry vào
[src/data/nav.js](src/data/nav.js), thêm dữ liệu vào [src/data/menus.json](src/data/menus.json),
rồi import và gắn `<TenComponent :active="..."/>` vào [src/App.vue](src/App.vue).

Xây dựng bằng [Vue 3](https://vuejs.org/) + [Vite](https://vite.dev/). Mỗi lần push vào
`main` sẽ tự động build và deploy lên GitHub Pages qua
[GitHub Actions](.github/workflows/deploy.yml).

## Góp ý và đóng góp

Dự án đang trong quá trình viết lại toàn bộ nội dung, nên chắc chắn còn chỗ sai và chỗ khó hiểu.

- Thấy lỗi kiến thức, lỗi chính tả, hoặc đoạn nào đọc không hiểu → mở issue.
- Muốn thêm bài, thêm widget, sửa nội dung → gửi pull request.

Quy ước khi viết nội dung: tiếng Việt xưng "bạn", giọng thân thiện, code mẫu C++, và
**không dùng chữ nghiêng** ở bất kỳ đâu (CSS đã ép `font-style: normal`).

## Giấy phép

[MIT](LICENSE) — bạn được tự do dùng, sửa, và chia sẻ, kể cả cho lớp học của mình.
Nếu tài liệu này giúp bạn qua môn, một ngôi sao ⭐ trên repo là lời cảm ơn đủ rồi.
