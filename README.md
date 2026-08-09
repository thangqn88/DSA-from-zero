# DSA from Zero — Học Cấu trúc dữ liệu & Giải thuật để qua môn

**👉 Học ngay tại: https://thangqn88.github.io/DSA-from-zero/**

Một trang web tiếng Việt dạy Cấu trúc dữ liệu & Giải thuật cho sinh viên đại học đang
chuẩn bị thi. Không cần cài gì, không cần đăng ký, mở link là học được — kể cả trên điện thoại.

Điểm khác biệt so với slide và giáo trình: mỗi thuật toán đều có một **widget mô phỏng
chạy từng bước**. Bạn bấm "Bước tiếp theo" và nhìn thấy mảng đổi giá trị, cây được duyệt,
hàng đợi được nạp — thay vì phải tự tưởng tượng trong đầu.

## Học được những gì

Chương trình gồm 30 nhóm kiến thức chia 7 chương, đi từ nền móng lên. Những nhóm chưa
viết xong hiện mờ trên menu kèm nhãn "sắp có", để bạn nhìn thấy trước lộ trình.

| Chương | Nhóm kiến thức |
|---|---|
| 1 — Nền móng | Độ phức tạp thuật toán · Mảng, chuỗi và mảng động · Đệ quy · Danh sách liên kết |
| 2 — Xử lý dãy | Sắp xếp · Tìm kiếm nhị phân · Hai con trỏ và cửa sổ trượt · Tổng tiền tố |
| 3 — Tra cứu | Ngăn xếp và hàng đợi · Bảng băm · Heap và hàng đợi ưu tiên · Trie |
| 4 — Cây | Cây nhị phân và BST · BST nâng cao · Fenwick và Segment Tree |
| 5 — Đồ thị | DFS và BFS · DSU · Sắp xếp tô-pô · Đường đi ngắn nhất · Cây khung nhỏ nhất |
| 6 — Thiết kế thuật toán | Quay lui · Tổ hợp · Tham lam · QHĐ nền tảng · QHĐ nâng cao |
| 7 — Chuyên đề và giới hạn | Thao tác bit · Toán và số học · Chuỗi nâng cao · Work/Span · Độ khó bài toán |

Mỗi nhóm đi theo cùng một khung 8 mục: mục tiêu bài học → lý thuyết cơ bản → vì sao
kiến thức này quan trọng → quiz kiểm tra → ví dụ điển hình → bài tập → danh sách LeetCode
để tự luyện → **dự án thực hành**.

## Dự án thực hành

Học để vận dụng thì phải dựng ra thứ gì đó chạy được. Mỗi nhóm kiến thức có một bài
luyện tay khoảng một tới hai giờ, và mỗi chương kết thúc bằng một dự án MVP quy mô một
cuối tuần:

| Chương | Dự án MVP |
|---|---|
| 1 | `core` + `bench` — thư viện nền tự cài và công cụ đo hiệu năng |
| 2 | Bộ phân tích log máy chủ, chạy trên log Nginx thật |
| 3 | Máy gợi ý tìm kiếm có xếp hạng và bộ nhớ đệm LRU |
| 4 | Mini database có index, chạy lại truy vấn của Chương 2 để so tốc độ |
| 5 | Trình lập lộ trình giao hàng trên dữ liệu bản đồ thật |
| 6 | Công cụ xếp lịch và tối ưu ngân sách |
| 7 | Công cụ phát hiện tài liệu trùng lặp |

Bảy dự án này không rời rạc: chúng là **một bộ công cụ lớn dần**, và mỗi dự án bắt buộc
liên kết với module bạn đã viết ở chương trước. Nhờ vậy bạn không thể quên chương cũ —
biên dịch sẽ không chạy nếu code cũ sai.

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
  lesson/parts.js      nguồn sự thật duy nhất về khung 6 phần của mọi bài học
  components/          6 component dùng chung cho mọi bài học
                       LessonGoal, LessonPart, QuizBlock,
                       WorkedExample, PracticeSet, LeetCodeList
  data/
    nav.js             menu trái — 5 nhóm, 10 bài học
    lessons/           dữ liệu từng bài: mục tiêu, quiz, bài tập, danh sách LeetCode
    menu.js            sinh menu phải từ khung 6 phần + dữ liệu bài học
    menus.json         chỉ còn phần menu của Trang chủ
  sections/            11 component Vue: Trang chủ + 10 nhóm kiến thức
  widgets/             logic của các widget tương tác
  utils/stepper.js     engine chạy-từng-bước dùng chung
tests/                 bộ test Vitest, xem mục "Chạy test" bên dưới
```

## Cách hoạt động

**Khung 6 phần là bắt buộc, không phải quy ước lỏng lẻo.** Mọi bài học đều gồm đúng 6 phần
theo thứ tự cố định: lý thuyết → vì sao quan trọng → quiz → ví dụ điển hình → bài tập →
LeetCode. Danh sách đó khai báo ở [src/lesson/parts.js](src/lesson/parts.js) và chỉ ở đó.
Sửa khung thì sửa đúng một chỗ này, không rải rác trong các section.

**Nội dung tách làm hai lớp.** Phần văn xuôi, bảng, code mẫu và widget nằm trong
`src/sections/*.vue`. Phần dữ liệu có cấu trúc — mục tiêu bài học, câu quiz, bài tập, danh
sách LeetCode — nằm trong `src/data/lessons/*.js` và được test kiểm tra: đủ số câu, đúng
trường, đáp án hợp lệ, danh sách LeetCode xếp từ Easy tới Hard.

**Menu phải được sinh tự động, không viết tay.** [src/data/menu.js](src/data/menu.js) ghép
khung 6 phần với danh sách ví dụ điển hình của bài để dựng menu, nên menu không bao giờ
lệch với nội dung thật. `menus.json` giờ chỉ còn lại phần của Trang chủ.

**Chuyển nhóm bằng `v-show`, không dùng router.** Mỗi widget khởi tạo trong `onMounted()`
của component tương ứng và thao tác DOM trực tiếp qua `getElementById` — nên khi sửa nội
dung, **không được đổi các `id` mà widget đang query**.

Thêm một nhóm kiến thức mới: tạo file dữ liệu trong `src/data/lessons/` và đăng ký vào
`src/data/lessons/index.js`, tạo component trong `src/sections/` dùng 6 component chung,
thêm entry vào [src/data/nav.js](src/data/nav.js), rồi import và gắn
`<TenComponent :active="..."/>` vào [src/App.vue](src/App.vue). Test sẽ báo ngay nếu thiếu
phần nào của khung.

## Chạy test

```bash
npm run test -- --run    # chạy một lượt rồi thoát
npm run test             # chế độ theo dõi, tự chạy lại khi sửa file
```

Bộ test ([Vitest](https://vitest.dev/) + jsdom) kiểm 4 nhóm việc:

- `tests/parts.spec.js` — khung 6 phần đúng thứ tự, id sinh ra ổn định.
- `tests/lesson-data.spec.js` — dữ liệu 10 bài đủ trường và hợp lệ.
- `tests/lesson-structure.spec.js` — mỗi section giữ đúng `id`, `data-sid`, đủ 6 phần, mỗi
  ví dụ điển hình đủ 6 khối.
- `tests/menu.spec.js`, `tests/menus-json.spec.js`, `tests/components/` — menu sinh đúng và
  component dùng chung hoạt động.

Test xanh **không** chứng minh được giao diện. Sửa layout hay CSS thì vẫn phải mở
`npm run dev` nhìn bằng mắt.

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
