# Thiết kế: Mở rộng dsa-app từ 10 lên 30 nhóm kiến thức, kèm 7 dự án MVP

Ngày: 2026-08-09
Trạng thái: đã duyệt thiết kế, chờ lập kế hoạch triển khai

## 1. Bối cảnh

App hiện có 10 nhóm kiến thức, viết theo khung 6 phần (thực tế là 7 mục kể cả Mục tiêu).
Nội dung đã hoàn chỉnh sau đợt viết lại tháng 8/2026.

Rà soát trên chính mã nguồn cho thấy chương trình đang thiếu phần đầu của một giáo trình
DSA. Bằng chứng:

- `hash` / `bảng băm`: 0 lần xuất hiện trong toàn bộ `src/sections/` và `src/data/lessons/`.
- `hai con trỏ` / `cửa sổ trượt`: 0 lần.
- Big-O xuất hiện rải rác ở 10 file nhưng không có bài nào dạy nó — mọi bài giả định
  người học đã hiểu `O(n log n)`.
- Sắp xếp chỉ được dùng (`sort()` trong Tham lam, DSU) chứ chưa được dạy.
- Danh sách liên kết chỉ nhắc thoáng 2–3 lần trong bài BST.
- Hoán vị thì đã phủ đủ trong nhóm Tổ hợp, không thiếu.

Nói ngắn gọn: app dạy quay lui trước khi dạy đệ quy, dạy DSU trước khi dạy mảng, dạy
tham lam trước khi dạy sắp xếp.

## 2. Mục tiêu

Người dùng học để vận dụng vào việc thật, không học để thi. Vì vậy thiết kế này có hai
mục tiêu ngang nhau:

1. Bổ sung 20 nhóm kiến thức còn thiếu, sắp lại thứ tự học từ nền lên.
2. Thêm phần dự án thực hành, trong đó mỗi chương kết thúc bằng một MVP chạy được độc
   lập, dùng dữ liệu thật, và bắt buộc kế thừa module đã viết ở chương trước.

## 3. Phạm vi

Trong phạm vi:

- 20 nhóm kiến thức mới, tổng thành 30.
- Gom 30 nhóm thành 7 chương, sắp lại thứ tự học.
- Thêm Phần 7 "Dự án thực hành" vào khung bài học.
- 30 bài luyện tay (mỗi nhóm một bài) và 7 MVP (mỗi chương một cái).
- Sidebar trái gom theo chương.
- Bổ sung cho 10 bài cũ: Phần 7, câu quiz ôn tập, các công cụ phân tích nhét thêm.
- Mở rộng bộ test để ép cấu trúc mới.

Ngoài phạm vi:

- Không viết sẵn mã nguồn của 7 MVP. App chỉ mô tả yêu cầu; người học tự viết.
- Không nhúng bộ dữ liệu lớn vào repo. Chỉ mô tả định dạng, 20 dòng mẫu, và link tải.
- Không đổi bảng màu, không đổi hai mốc responsive `1023px` / `900px`.
- Không đổi `sid` của 10 bài cũ.

## 4. Ba mươi nhóm, bảy chương

Con số cuối là 30 nhóm: 10 nhóm cũ giữ nguyên `sid`, cộng 20 nhóm mới.

### Chương 1 — Nền móng

| sid | Tiêu đề | Mới/Cũ |
|---|---|---|
| `do-phuc-tap` | Độ phức tạp thuật toán và mô hình chi phí | Mới |
| `mang-chuoi` | Mảng, chuỗi và mảng động | Mới |
| `de-quy` | Đệ quy và hệ thức truy hồi | Mới |
| `danh-sach-lien-ket` | Danh sách liên kết | Mới |

### Chương 2 — Xử lý dãy

| sid | Tiêu đề | Mới/Cũ |
|---|---|---|
| `sap-xep` | Sắp xếp: merge, quick, counting | Mới |
| `tim-kiem-nhi-phan` | Tìm kiếm nhị phân và tìm nhị phân trên đáp án | Mới |
| `hai-con-tro-cua-so-truot` | Hai con trỏ và cửa sổ trượt | Mới |
| `tong-tien-to` | Tổng tiền tố và mảng hiệu | Mới |

### Chương 3 — Tra cứu

| sid | Tiêu đề | Mới/Cũ |
|---|---|---|
| `ngan-xep-hang-doi` | Ngăn xếp và hàng đợi | Cũ |
| `bang-bam` | Bảng băm | Mới |
| `heap-hang-doi-uu-tien` | Heap và hàng đợi ưu tiên | Mới |
| `trie` | Trie — cây tiền tố | Mới |

### Chương 4 — Cây

| sid | Tiêu đề | Mới/Cũ |
|---|---|---|
| `cay-nhi-phan-bst` | Cây nhị phân và BST | Cũ |
| `bst-nang-cao` | BST nâng cao | Cũ |
| `fenwick-segment-tree` | Fenwick và Segment Tree | Mới |

### Chương 5 — Đồ thị

| sid | Tiêu đề | Mới/Cũ |
|---|---|---|
| `dfs-bfs` | DFS và BFS | Cũ |
| `dsu` | DSU — Disjoint Set Union | Cũ |
| `sap-xep-to-po` | Sắp xếp tô-pô | Mới |
| `duong-di-ngan-nhat` | Đường đi ngắn nhất có trọng số | Mới |
| `cay-khung-nho-nhat` | Cây khung nhỏ nhất | Mới |

### Chương 6 — Thiết kế thuật toán

| sid | Tiêu đề | Mới/Cũ |
|---|---|---|
| `quay-lui-xau-nhi-phan` | Quay lui và xâu nhị phân | Cũ |
| `to-hop` | Tổ hợp | Cũ |
| `tham-lam` | Tham lam | Cũ |
| `qhd-nen-tang` | Quy hoạch động nền tảng | Cũ |
| `qhd-lis-lcs-doixung` | QHĐ nâng cao: Knapsack, LIS, LCS, xâu đối xứng | Cũ |

### Chương 7 — Chuyên đề và giới hạn

| sid | Tiêu đề | Mới/Cũ |
|---|---|---|
| `thao-tac-bit` | Thao tác bit | Mới |
| `toan-so-hoc` | Toán và số học: GCD, modulo, sàng, luỹ thừa nhanh | Mới |
| `chuoi-nang-cao` | Chuỗi nâng cao: KMP và hash chuỗi | Mới |
| `work-span` | Work/Span và tư duy song song | Mới |
| `do-kho-bai-toan` | Độ khó bài toán: NP-đầy đủ và khi nào nên dùng xấp xỉ | Mới |

## 5. Công cụ phân tích, nhét vào đâu

So với CMU 15-210 và MIT 6.006, danh sách trên vẫn thiếu phần "làm sao biết một thuật
toán tốt hay không". Sáu công cụ dưới đây không thành nhóm riêng — dạy tách rời sẽ khô
và người học không thấy để làm gì. Chúng được nhét vào đúng chỗ chúng phát huy tác dụng:

| Công cụ | Nhét vào nhóm |
|---|---|
| Phân tích khấu trừ (amortized) | `mang-chuoi`, nhắc lại ở `dsu` |
| Hệ thức truy hồi và chia để trị | `de-quy` và `sap-xep` |
| Thuật toán ngẫu nhiên, xác suất | `sap-xep` (quicksort) và `bst-nang-cao` (treap) |
| Bất biến vòng lặp, chứng minh quy nạp | `tim-kiem-nhi-phan` |
| ADT tách khỏi cài đặt | `bang-bam` (Map là ADT, hash table là một cách cài) |
| Mô hình tính toán, bộ nhớ và cache | `do-phuc-tap` |

Hai công cụ còn lại đủ lớn để thành nhóm riêng, đã nằm ở Chương 7: `work-span` và
`do-kho-bai-toan`.

## 6. Dự án thực hành

### 6.1. Hai cỡ dự án

- `project` — bài luyện tay, bắt buộc ở cả 30 bài, quy mô 1–2 giờ, sản phẩm là một
  module có test.
- `capstone` — MVP, đúng 7 cái, nằm ở bài cuối mỗi chương, quy mô một cuối tuần, sản
  phẩm là một chương trình chạy được độc lập.

Cả hai dùng chung một component hiển thị, khác nhau ở nhãn và độ dài nội dung.

### 6.2. Bảy MVP là một dòng sản phẩm, không phải bảy thứ rời rạc

Đây là quyết định quan trọng nhất của thiết kế này. Bảy MVP hợp thành một bộ công cụ
phân tích dữ liệu lớn dần qua từng chương. Mỗi MVP bắt buộc liên kết với module của
chương trước — không phải "nhớ lại" mà là biên dịch không nổi nếu code cũ sai.

| Ch | MVP | Mô tả | Bắt buộc dùng lại |
|---|---|---|---|
| 1 | `core` + `bench` | Thư viện nền (vector tự cài, chuỗi, danh sách liên kết) và công cụ CLI đo thời gian chạy, vẽ biểu đồ ASCII | — |
| 2 | Bộ phân tích log máy chủ | Đọc file log Nginx thật; trả lời top 10 IP, khung 5 phút tải cao nhất, số request giữa hai mốc giờ | `core`, `bench` |
| 3 | Máy gợi ý tìm kiếm | Gõ tới đâu gợi ý tới đó, xếp hạng theo tần suất, có LRU cache | `core`; `sort` của Ch2 để dựng từ điển; `bench` để so hash với tìm nhị phân Ch2 |
| 4 | Mini database có index | Nạp CSV, tạo index, chạy `WHERE tuoi BETWEEN 20 AND 30` | Chạy lại đúng truy vấn log của Ch2, đo bằng `bench`, so index với quét bảng |
| 5 | Trình lập lộ trình giao hàng | Dijkstra tìm đường; tô-pô xử lý ràng buộc lấy hàng trước khi giao; DSU kiểm tra điểm ngoài vùng phục vụ | `heap` Ch3, `hash` Ch3, `core` Ch1 |
| 6 | Công cụ xếp lịch và tối ưu ngân sách | Xếp ca làm không chồng nhau (tham lam); chọn gói quảng cáo tối ưu ngân sách (knapsack); xếp bàn tiệc theo ràng buộc (quay lui) | `sort` Ch2, `heap` Ch3; so tham lam với QHĐ bằng `bench` |
| 7 | Công cụ phát hiện tài liệu trùng lặp | So khớp gần đúng giữa hàng nghìn văn bản bằng hash chuỗi và bitset | `trie` + `hash` Ch3, chạy trên chính kho văn bản của Ch2 |

Điểm mấu chốt là Chương 4: người học chạy lại truy vấn mình đã viết từ Chương 2, bằng
cấu trúc mới, rồi nhìn con số. Đó là khoảnh khắc hiểu ra vì sao database cần index.

### 6.3. Bốn nguyên tắc cho MVP

1. Mỗi MVP là phần mềm có người thật trả tiền để dùng. Không có bài toán 8 quân hậu
   đội lốt dự án.
2. Đầu vào là dữ liệu thật: log Nginx, file CSV, toạ độ bản đồ — không phải mảng
   `[3,1,4,1,5]`.
3. `bench` của Chương 1 là xương sống. Mọi chương sau đo lại bằng nó, nên người học
   nhìn thấy Big-O chứ không chỉ tin lời sách.
4. Chạy độc lập, có test. Mỗi MVP là một thư mục biên dịch được, không phụ thuộc app này.

Ràng buộc "tự cài thay vì dùng STL" chỉ áp ở nơi bài học yêu cầu. Chỗ khác cho dùng thư
viện chuẩn thoải mái, tránh biến khoá học thành khổ hình.

### 6.4. Ba cơ chế chống quên, ép bằng test

1. Trường `reuses` bắt buộc: mỗi `capstone` khai báo tối thiểu 2 module từ chương trước.
   Test kiểm module được nhắc có thật ở chương trước đó — khai bừa là test đỏ.
2. Quiz có câu ôn: mỗi bài, ít nhất 1 trong 4 câu quiz hỏi về nhóm đã học trước đó.
   Đánh dấu bằng cờ `recall: true`, test đếm.
3. Bài luyện tay bắc cầu: yêu cầu cuối cùng của mỗi `project` luôn nối về nhóm cũ. Ví
   dụ ở bài Trie: "so tốc độ tra cứu của trie với hash table bạn đã viết ở bài trước,
   giải thích chênh lệch."

Cái giá phải trả: ai làm hỏng module Chương 2 sẽ vướng ở Chương 4. Đổi lại, đó chính
xác là cảm giác của phần mềm thật, và là lý do người ta nhớ.

## 7. Thay đổi kỹ thuật

### 7.1. Khung bài học lên 8 mục

Thêm đúng một dòng vào `src/lesson/parts.js`:

```js
{ key: 'du-an', num: 7, title: 'Dự án thực hành' },
```

Menu bài tập bên phải sinh tự động từ `LESSON_PARTS` (`src/data/menu.js`) nên không phải
sửa tay.

### 7.2. Nguồn sự thật về chương

Thêm `CHAPTERS` vào chính `parts.js`, rồi suy ra `LESSON_SECTIONS` từ nó. Không được để
hai nơi cùng định nghĩa thứ tự bài học — đây đúng kiểu lỗi mà CLAUDE.md đã cảnh báo từng
xảy ra với `.content-row`.

```js
export const CHAPTERS = [
  {
    key: 'nen-mong', num: 1, title: 'Nền móng',
    lessons: [
      { sid: 'do-phuc-tap', title: '...', ready: false },
      ...
    ],
  },
  ...
]

export const LESSON_SECTIONS = CHAPTERS.flatMap(c =>
  c.lessons.map(l => ({ ...l, chapter: c.key }))
)
```

Cờ `ready` giải bài toán "test đỏ suốt nhiều tuần": test chỉ ép với bài `ready: true`;
sidebar hiển thị bài chưa viết dạng mờ, không bấm được. Gỡ cờ khi bài xong. Nhờ vậy test
luôn có ý nghĩa và người dùng nhìn thấy lộ trình ngay trên giao diện.

### 7.3. Schema dữ liệu bài học

Thêm vào mỗi file `src/data/lessons/*.js`:

```js
project: {
  title: 'Bộ đếm tần suất từ cho một file văn bản',
  why: 'Bối cảnh thực tế: ai dùng, giải quyết vấn đề gì',
  input: 'File .txt bất kỳ, ví dụ một chương truyện tải từ Gutenberg',
  must: ['Đọc file, tách từ, đếm', 'Tự cài hash table, không dùng unordered_map'],
  done: ['Chạy đúng trên file 1MB dưới 1 giây', 'Test so kết quả với unordered_map'],
  traps: ['Quên xử lý va chạm', 'Không resize khi hệ số tải vượt 0.75'],
},
```

Riêng bài cuối chương có thêm:

```js
capstone: {
  // ...các trường như project, cộng:
  uses: ['bang-bam', 'heap-hang-doi-uu-tien'],   // nhóm kiến thức được ghép
  reuses: [{ chapter: 2, module: 'sort' }, ...], // module bắt buộc dùng lại
  stretch: ['Mở rộng nếu còn hứng'],
  data: { format: '...', sample: '20 dòng mẫu', url: 'link tải bộ dữ liệu công khai' },
},
```

### 7.4. Component

Thêm `src/components/ProjectBrief.vue`, một component hai chế độ (`project` và
`capstone`), theo đúng khuôn các component đã có (`PracticeSet.vue`, `LeetCodeList.vue`).

### 7.5. Sidebar trái

Danh sách phẳng 10 mục hiện tại lên 30 mục thì không dùng được. Sidebar gom theo 7
chương, mỗi chương một tiêu đề, bài học nằm dưới. Giữ nguyên hai mốc responsive `1023px`
và `900px`, không thêm mốc mới. Mục menu tối thiểu 44px chiều cao. Mọi cặp màu chữ/nền
đạt AA 4.5:1, kể cả trạng thái mờ của bài `ready: false`.

### 7.6. Test

Mở rộng `tests/lesson-structure.spec.js`:

- Mọi bài `ready: true` phải có `project` đủ trường.
- Đúng 7 bài có `capstone`, và chúng phải là bài cuối của 7 chương.
- Mỗi `sid` trong `CHAPTERS` có file section và file dữ liệu tương ứng (chỉ với
  `ready: true`).
- Không `sid` nào nằm ngoài mọi chương; không `sid` trùng.
- Mỗi `capstone.reuses` khai báo tối thiểu 2 module, và module đó thuộc chương có số
  nhỏ hơn. Miễn trừ duy nhất là Chương 1 — nó là gốc, không có chương trước để kế thừa,
  nên `reuses` của nó là mảng rỗng.
- Mỗi bài có tối thiểu 1 câu quiz `recall: true`.

## 8. Giai đoạn triển khai

Nguyên tắc: mỗi chương là một lát cắt giao được. Xong Chương 1, app đã học được ngay,
không phải chờ đủ 7 chương.

| GĐ | Nội dung | Model | Cách chạy |
|---|---|---|---|
| 0 | Hạ tầng: `CHAPTERS`, Phần 7, `ProjectBrief.vue`, schema, test, sidebar theo chương | Opus | Inline |
| 1 | Đặc tả đầy đủ 7 MVP: dữ liệu vào, yêu cầu bắt buộc, tiêu chí xong, module kế thừa | Opus | Inline |
| 2 | Hai bài mẫu: `do-phuc-tap` (bài dị biệt, toàn khái niệm) và `bang-bam` (đại diện số đông), cộng MVP `bench` | Opus | Inline |
| 3 | 18 bài mới còn lại | Sonnet | Subagent, đúng 1 agent mỗi lần, tuần tự |
| 4 | Bổ sung 10 bài cũ: Phần 7, quiz ôn, công cụ phân tích nhét thêm | Sonnet | Subagent, tuần tự |
| 5 | Rà soát cuối: mạch xuyên suốt 30 bài, giọng văn, kiểm chứng giao diện bằng mắt, README | Opus | Inline |

Thứ tự chạy:

```
GĐ0 → GĐ1 → GĐ2 → Ch1 → Ch2 → Ch3 → Ch4 → Ch5 → Ch6 → Ch7 → GĐ4 → GĐ5
                    ↑ đã dùng được rồi
```

Mỗi chương kết thúc bằng test xanh và một commit.

Giai đoạn 1 cố ý đầu tư Opus ngay từ đầu vì ràng buộc kế thừa chéo chương (Ch4 gọi lại
truy vấn Ch2, Ch5 dùng heap Ch3) đòi hỏi nhìn toàn cảnh — thứ mà subagent viết từng bài
lẻ không có. Có đặc tả rồi thì Sonnet ở GĐ3 chỉ việc điền.

### Mốc chuyển model bắt buộc

Kết thúc Giai đoạn 2, trước khi bước vào Giai đoạn 3: dừng lại, nhắc người dùng đổi sang
Sonnet bằng `/model`. Không lặng lẽ chạy tiếp bằng Opus.

Khối lượng đợt này lớn hơn đợt viết lại 10 bài khoảng ba lần. Trên gói Pro $20, đây là
công việc của nhiều phiên; chia theo chương chính là để mỗi phiên kết thúc bằng một thứ
dùng được.

## 9. Quyết định đã chốt

| Câu hỏi | Chốt |
|---|---|
| Bài tập lớn phục vụ ai | Thành nội dung trong app, không phải danh sách gợi ý riêng |
| Nằm ở đâu | Phần 7 của khung bài học, mọi bài đều có |
| Phủ tới đâu | Cả 4 tầng, tổng 30 nhóm |
| Bao nhiêu dự án | Hai lớp: 30 bài luyện tay nhỏ + 7 MVP cuối chương |
| MVP rời hay liên tục | Một dòng sản phẩm lớn dần, ép kế thừa bằng test |

## 10. Rủi ro

| Rủi ro | Xử lý |
|---|---|
| Test đỏ suốt nhiều tuần vì `CHAPTERS` trỏ tới bài chưa viết | Cờ `ready`, test chỉ ép bài đã xong |
| Sidebar 30 mục khó dùng | Gom theo 7 chương; giữ nguyên hai mốc responsive |
| Sonnet viết bài lẻ không giữ được ràng buộc kế thừa chéo chương | Đặc tả 7 MVP viết bằng Opus ở GĐ1, trước khi viết bài nào |
| Khối lượng quá lớn cho gói Pro | Chia theo chương, mỗi chương giao được độc lập |
| 10 bài cũ lệch tone so với 20 bài mới | GĐ5 rà soát toàn bộ 30 bài bằng Opus |
| Đổi thứ tự bài phá link đã lưu | Giữ nguyên `sid` của 10 bài cũ, chỉ đổi vị trí |
