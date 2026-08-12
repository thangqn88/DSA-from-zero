# DSA from Zero — Học Cấu trúc dữ liệu & Giải thuật để qua môn

**👉 Học ngay tại: https://thangqn88.github.io/DSA-from-zero/**

Một trang web tiếng Việt dạy Cấu trúc dữ liệu & Giải thuật cho sinh viên đại học đang
chuẩn bị thi. Không cần cài gì, không cần đăng ký, mở link là học được — kể cả trên điện thoại.

Điểm khác biệt so với slide và giáo trình: mỗi thuật toán đều có một **widget mô phỏng
chạy từng bước**. Bạn bấm "Bước tiếp theo" và nhìn thấy mảng đổi giá trị, cây được duyệt,
hàng đợi được nạp — thay vì phải tự tưởng tượng trong đầu.

## Học được những gì

Chương trình gồm 30 nhóm kiến thức chia 7 chương, đi từ nền móng lên, mỗi chương kết
thúc bằng một dự án thực hành. Phần chưa viết xong hiện mờ trên menu kèm nhãn "sắp có",
để bạn nhìn thấy trước lộ trình.

| Chương | Nhóm kiến thức |
|---|---|
| 1 — Nền móng | Độ phức tạp thuật toán · Mảng, chuỗi và mảng động · Đệ quy · Danh sách liên kết |
| 2 — Xử lý dãy | Sắp xếp · Tìm kiếm nhị phân · Hai con trỏ và cửa sổ trượt · Tổng tiền tố |
| 3 — Tra cứu | Ngăn xếp và hàng đợi · Bảng băm · Heap và hàng đợi ưu tiên · Trie |
| 4 — Cây | Cây nhị phân và BST · BST nâng cao · Fenwick và Segment Tree |
| 5 — Đồ thị | DFS và BFS · DSU · Sắp xếp tô-pô · Đường đi ngắn nhất · Cây khung nhỏ nhất |
| 6 — Thiết kế thuật toán | Quay lui · Tổ hợp · Tham lam · QHĐ nền tảng · QHĐ nâng cao |
| 7 — Chuyên đề và giới hạn | Thao tác bit · Toán và số học · Chuỗi nâng cao · Work/Span · Độ khó bài toán |

Mỗi nhóm đi theo cùng một khung 7 mục: mục tiêu bài học → lý thuyết cơ bản → vì sao
kiến thức này quan trọng → quiz kiểm tra → ví dụ điển hình → bài tập → danh sách LeetCode
để tự luyện.

## Dự án thực hành

Học để vận dụng thì phải dựng ra thứ gì đó chạy được. **Mỗi chương kết thúc bằng đúng một
dự án của cả chương**, quy mô một cuối tuần, đứng thành một trang riêng ở cuối nhóm trên
menu trái:

| Chương | Dự án thực hành |
|---|---|
| 1 | Sổ chi tiêu cá nhân — đọc file CSV sao kê ngân hàng, phân loại giao dịch, in báo cáo tháng |
| 2 | Bộ phân tích log máy chủ, chạy trên log Nginx thật |
| 3 | Máy gợi ý tìm kiếm có xếp hạng và bộ nhớ đệm LRU |
| 4 | Sổ quản lý kho hàng tra cứu nhanh |
| 5 | Trình lập lộ trình giao hàng trên dữ liệu bản đồ thật |
| 6 | Công cụ xếp lịch và tối ưu ngân sách |
| 7 | Công cụ phát hiện tài liệu trùng lặp |

Hai luật đứng sau bảng này:

- **Đề bài là vấn đề có thật trong cuộc sống**, thứ người ta trả tiền để làm — không phải
  trò chơi, bài toán đố, hay thư viện cho lập trình viên. Cấu trúc dữ liệu là phương tiện,
  không phải sản phẩm.
- **Bảy dự án độc lập với nhau.** Bạn nhảy thẳng vào chương nào cũng làm được dự án của
  chương đó. Dùng lại code đã viết ở chương trước là gợi ý, không phải điều kiện.

Mỗi dự án nói rõ: cần biết trước những gì (và cả những gì **chưa** cần biết), đầu vào đầu
ra là gì kèm mẫu in ra terminal, **bắt đầu từ bước nào**, yêu cầu bắt buộc, tiêu chí
nghiệm thu — mỗi tiêu chí kèm một lệnh hoặc ngưỡng số để bạn tự chấm — và các chỗ dễ sai.

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
  lesson/
    parts.js           nguồn sự thật duy nhất: khung 7 mục, cấu trúc 7 chương,
                       dữ liệu menu trái
    md.js              parser Markdown của bài học, chạy lúc build
    widgets.js         nạp widget của một bài theo quy ước tên file
  content/             văn xuôi từng bài, mỗi bài một file .md
  components/          component dùng chung cho mọi bài học
                       LessonRenderer (dựng khung 7 mục), LessonGoal, LessonPart,
                       QuizBlock, WorkedExample, PracticeSet, LeetCodeList,
                       ProjectBrief, ChapterProject
  data/
    lessons/           dữ liệu từng bài: mục tiêu, quiz, bài tập, danh sách LeetCode
    capstones/         dự án thực hành, mỗi chương một file
    menu.js            sinh menu phải từ khung 7 mục + dữ liệu bài học
    menus.json         chỉ còn phần menu của Trang chủ
  sections/            các bài còn viết bằng .vue, cộng Trang chủ — đang chuyển
                       dần hết sang src/content/
  widgets/             logic của các widget tương tác
  utils/stepper.js     engine chạy-từng-bước dùng chung
tests/                 bộ test Vitest, xem mục "Chạy test" bên dưới
```

## Cách hoạt động

**Khung 7 mục là bắt buộc, không phải quy ước lỏng lẻo.** Mọi bài học đều gồm đúng 7 mục
theo thứ tự cố định: mục tiêu → lý thuyết → vì sao quan trọng → quiz → ví dụ điển hình →
bài tập → LeetCode. Danh sách đó khai báo ở [src/lesson/parts.js](src/lesson/parts.js) và
chỉ ở đó — file này đồng thời là nguồn sự thật cho cấu trúc 7 chương và cho menu trái.

**Một bài học gồm đúng hai file nội dung.** Văn xuôi, bảng và code mẫu nằm ở
`src/content/<sid>.md`; dữ liệu có cấu trúc — mục tiêu, quiz, bài tập, danh sách LeetCode —
nằm ở `src/data/lessons/<sid>.js` và được test kiểm tra: đủ số câu, đúng trường, đáp án
hợp lệ, danh sách LeetCode xếp từ Easy tới Hard.
[src/components/LessonRenderer.vue](src/components/LessonRenderer.vue) dựng khung cho mọi
bài, nên không còn mỗi bài một file `.vue` nữa. Vài bài viết từ trước còn nằm ở
`src/sections/` và đang được chuyển dần.

**Dự án thực hành thuộc về chương, không thuộc về bài.** Dữ liệu ở
`src/data/capstones/<chapter-key>.js`, hiển thị bằng
[ChapterProject.vue](src/components/ChapterProject.vue) thành một section riêng. Bài học
không có trường `project`, và test đỏ ngay nếu ai đó thêm lại.

**Menu phải được sinh tự động, không viết tay.** [src/data/menu.js](src/data/menu.js) ghép
khung 7 mục với danh sách ví dụ điển hình của bài để dựng menu, nên menu không bao giờ
lệch với nội dung thật. Trang dự án không có menu này. `menus.json` chỉ còn phần của
Trang chủ.

**Chuyển trang bằng `v-show`, không dùng router.** Widget của bài `<sid>` nằm ở
`src/widgets/<sid>.js` và thao tác DOM trực tiếp qua `getElementById` — nên khi sửa nội
dung, **không được đổi các `id` mà widget đang query**.

Thêm một bài mới cần đúng ba việc: tạo `src/content/<sid>.md`, tạo
`src/data/lessons/<sid>.js`, rồi bật cờ `ready` của bài đó trong `CHAPTERS`. Không phải
sửa `App.vue`, không phải đăng ký ở đâu khác — cả hai danh sách đều suy ra bằng
`import.meta.glob`. Test sẽ báo ngay nếu thiếu phần nào của khung.

## Chạy test

```bash
npm run test -- --run    # chạy một lượt rồi thoát
npm run test             # chế độ theo dõi, tự chạy lại khi sửa file
```

Bộ test ([Vitest](https://vitest.dev/) + jsdom) kiểm năm nhóm việc:

- `tests/parts.spec.js`, `tests/nav.spec.js` — khung 7 mục đúng thứ tự, cấu trúc 7 chương,
  menu trái suy đúng từ đó, id sinh ra ổn định.
- `tests/lesson-data.spec.js` — dữ liệu từng bài đủ trường và hợp lệ, và không bài nào có
  trường `project`.
- `tests/lesson-structure.spec.js`, `tests/lesson-md.spec.js` — mỗi bài giữ đúng `id`,
  `data-sid`, đủ 7 mục, mỗi ví dụ điển hình đủ 6 khối; bài Markdown được mount thật rồi
  bấm thật để kiểm widget.
- `tests/capstone.spec.js` — dự án của chương đủ mười ba trường, mỗi tiêu chí nghiệm thu
  kèm cách kiểm, và `uses` phủ hết các bài của chương.
- `tests/menu.spec.js`, `tests/menus-json.spec.js`, `tests/app-shell.spec.js`,
  `tests/components/` — menu sinh đúng, khung ngoài và component dùng chung hoạt động.

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
