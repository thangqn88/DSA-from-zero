# dsa-app

SPA tĩnh dạy Cấu trúc dữ liệu & Giải thuật cho người mới, tiếng Việt. Vue 3 + Vite,
không backend, không DB. Nội dung bài học nằm trong mã nguồn (`src/sections/*.vue`,
`src/data/lessons/*.js`), không nằm ở runtime store nào.

Lệnh: `npm run dev` | `npm run build` | `npm run test -- --run`

## Công việc đang chạy

Mở rộng chương trình từ 10 lên **30 nhóm kiến thức, chia 7 chương**, mỗi chương kết thúc
bằng **đúng một dự án thực hành của cả chương**.

- **Kế hoạch — file duy nhất:** `docs/superpowers/plans/KE-HOACH.md`
- Thiết kế: `docs/superpowers/specs/2026-08-09-mo-rong-30-nhom-design.md`
- Đặc tả 7 MVP: `docs/superpowers/specs/2026-08-09-dac-ta-7-mvp.md`

**Đọc spec và kế hoạch trước khi làm bất kỳ task nào.**

Ba file kế hoạch cũ (`content-rewrite`, `mo-rong-30-nhom-gd0-2`, `gd3-18-bai-moi`) đã
gộp hết vào `KE-HOACH.md` ngày 2026-08-11 và xoá khỏi cây thư mục — bản đầy đủ còn
trong lịch sử git. **Đừng dựng lại chúng.** Mọi cập nhật kế hoạch sửa vào `KE-HOACH.md`.

### Trạng thái

Giai đoạn 0–2 xong. **Giai đoạn 2.6 xong 2026-08-12**: dự án thực hành lên cấp chương.
Chương 1 trọn vẹn (4 bài + dự án chương). Còn 18 bài mới, 6 dự án chương, Giai đoạn 2.5
(9 bài `.vue` còn lại) và Giai đoạn 4–5.

### Một bài học có 7 mục, và KHÔNG có dự án

Dự án thực hành thuộc về **cả chương**, không thuộc về bài: mỗi chương đúng một dự án,
đứng thành **section riêng** trên sidebar (`ChapterProject.vue`), dữ liệu ở
`src/data/capstones/<chapter-key>.js`. Bài học kết ở mục 6 LeetCode.

- **Cờ `duAn` đã bị xoá.** Đừng dựng lại nó dưới bất kỳ tên nào. Test đỏ ngay nếu có.
- **File dữ liệu bài không được có trường `project`.** Test cũng đỏ ngay.
- Id trang dự án sinh bằng `chapterProjectId(key)`, không viết tay chuỗi `du-an-...`.
- **Đề bài mọi dự án phải là vấn đề có thật trong cuộc sống** — đọc sao kê chi tiêu, phân
  tích log, lập lộ trình giao hàng. Không trò chơi, không bài toán đố, không thư viện hay
  công cụ cho lập trình viên. Bảy dự án độc lập với nhau; dùng lại code chương trước chỉ
  là gợi ý.

### Hai cờ trạng thái trong `CHAPTERS`

- `ready` — cờ của **bài**: đã có file nội dung. Bài chưa `ready` hiện mờ trên sidebar,
  không bấm được.
- `capstoneReady` — cờ của **chương**: đã có dữ liệu dự án. Chương chưa bật thì mục "Dự án
  thực hành" hiện mờ y như một bài chưa viết.

Test schema chỉ ép với bài hoặc chương đã bật cờ, nên chúng không bao giờ đỏ oan trong lúc
chờ nội dung. Viết xong thì bật cờ, đừng để quên.

## Quy tắc chi phí — BẮT BUỘC

Dự án chạy trên gói Claude $20 (Pro), giới hạn theo cửa sổ 5 giờ trượt + hạn mức tuần.

| Giai đoạn | Nội dung | Model | Cách chạy |
|---|---|---|---|
| 0–2 | Hạ tầng, đặc tả MVP, 2 bài mẫu — **đã xong** | Opus | Inline |
| 3 | 18 bài mới còn lại | **Sonnet** | Subagent, **mỗi lần đúng 1 agent, tuần tự** |
| 4 | Bổ sung quiz `recall` và `note` LeetCode cho 10 bài cũ | **Sonnet** | Subagent, tuần tự |
| 5 | Rà soát 30 bài, giọng văn, giao diện, README | Opus | Inline |

Giai đoạn 3 và 4 là công việc lặp khuôn: đã có hai bài mẫu, đặc tả MVP đầy đủ và test ép
đúng cấu trúc, nên Sonnet là đủ.

**Luật tự kiểm, áp dụng đầu mỗi phiên và mỗi khi chuyển sang dải task khác:**

1. Đối chiếu model đang chạy với bảng trên.
2. Nếu lệch — nhất là **đang chạy Opus mà sắp làm Giai đoạn 3 hoặc 4** — **dừng lại,
   nhắc người dùng đổi model bằng `/model` trước khi bắt đầu**. Không lặng lẽ làm tiếp.
3. Người dùng đã được nhắc mà vẫn muốn giữ model hiện tại thì làm theo, và không nhắc
   lại về task đó nữa.
4. Không dùng workflow / multi-agent orchestration. Không fan-out subagent song song —
   nếu người dùng yêu cầu, nêu tác động tới hạn mức đúng một lần rồi làm theo quyết định
   của họ.

Sau mỗi phiên, ghi một dòng vào bảng "Nhật ký phiên làm việc" ở cuối mục "Chiến lược
chi phí" trong `docs/superpowers/plans/KE-HOACH.md`.

## Quy ước nội dung

- Tiếng Việt, xưng "bạn", giọng thân thiện, không đổi tone giữa các bài.
- **Không dùng chữ nghiêng** ở bất kỳ đâu — `src/style.css` ép `font-style: normal`,
  không được gỡ luật này.
- Code mẫu là C++, đặt trong `<pre v-pre><code>`, escape `<` thành `&lt;`, `&` thành `&amp;`.
- Giải thích theo Feynman: ví dụ đời thường trước, thuật ngữ sau; mỗi khái niệm trả lời
  đủ "Đây là gì? / Vì sao quan trọng? / Làm sao dùng?".

## Nguyên tắc thiết kế giao diện

Đây là trang **đọc lâu**, không phải landing page. Mọi quyết định giao diện lấy dễ đọc
làm chuẩn, không lấy bắt mắt làm chuẩn. Nếu dùng skill `ui-ux-pro-max`, chỉ lấy phần
quy tắc đọc và checklist — bỏ qua gợi ý style kiểu startup/giải trí và đừng đổi bảng
màu navy/amber hiện có.

**Bề ngang khung trang — chỗ đã từng vỡ, đọc kỹ:**

- `--shell` trong `:root` là bề ngang duy nhất của khung trang. `.page-header` và
  `.content-row` phải rộng bằng nhau. Trước đây `.content-row` bị định nghĩa **hai lần**
  (một bản grid, một bản flex `max-width: 1120px`) trong khi `.page` rộng tới 1400px —
  hậu quả là hở một mảng trống bên phải suốt nhiều tháng.
- **Không đặt `max-width` riêng cho `.content-row`.** Muốn đổi bề ngang thì sửa `--shell`.
- Trước khi thêm luật layout, kiểm tra selector đó đã tồn tại chưa:
  `grep -n "^\s*\.<ten-class>\s*[,{]" src/style.css`. File này đủ dài để dễ định nghĩa trùng.

**Chữ và khoảng cách:**

- Độ dài dòng văn xuôi tối đa `--measure` (70ch). Chỉ áp cho `p` và `li` ở cấp ngoài cùng —
  code, bảng, widget và hộp có nền vẫn dùng trọn bề ngang cột, đừng bó chúng lại.
- Body 16.5px, `line-height: 1.7`. Không hạ chữ thân bài xuống dưới 16px.

**Tương phản và khả năng tiếp cận:**

- Mọi cặp màu chữ/nền phải đạt AA 4.5:1. Nhãn nhỏ hay bị trượt nhất — `--muted-2` từng
  chỉ đạt 2.9:1. Không dùng màu viền làm màu chữ trên nền nhạt cùng tông (lỗi cũ của
  nhãn Easy/Medium/Hard).
- Giữ `:focus-visible` và khối `prefers-reduced-motion` — không gỡ.
- Nút bấm và mục menu tối thiểu 44px chiều cao.

**Responsive:** đúng hai mốc, không thêm mốc lẻ — `1023px` (menu bài tập xuống dưới nội
dung) và `900px` (sidebar thành thanh ngang trên đầu).

**Kiểm chứng:** test và build xanh **không** chứng minh được layout. Sửa giao diện thì
phải nhìn bằng mắt qua `npm run dev`; nếu không nhìn được thì nói rõ là chưa kiểm chứng,
đừng khẳng định đã sửa xong.

## Ràng buộc kỹ thuật

- Mỗi section phải giữ nguyên `id`, `class="day-section"`, `data-sid`, `v-show="active"`
  và `defineProps({ active: Boolean })` — `App.vue` phụ thuộc vào đúng các thuộc tính này.
- **Không đổi id DOM mà widget đang query.** Trước khi sửa một section, chạy
  `grep -o "getElementById('[^']*'" src/widgets/<ten>.js | sort -u` và giữ nguyên mọi id
  in ra. 17 widget tương tác hiện có phải chạy được sau mỗi thay đổi.
- `src/lesson/parts.js` là nguồn sự thật duy nhất cho **cả ba thứ**: khung 7 mục
  (`LESSON_PARTS`), cấu trúc 7 chương (`CHAPTERS`), và dữ liệu menu trái (`navGroups`,
  `allSectionIds`, `FIRST_LESSON_ID`). Sửa thì sửa ở đúng đó, không rải rác.
- **`src/data/nav.js` đã bị xoá.** Nó từng viết tay lại danh sách bài học với cách gom
  nhóm khác hẳn `parts.js` — đúng kiểu lỗi hai-nguồn-sự-thật mà file này cảnh báo. Đừng
  dựng lại nó dưới bất kỳ tên nào.
- Đường dẫn file section suy ra từ `sid` bằng `sidToFile()`, không viết tay.
- Menu bài tập bên phải được **sinh tự động** từ khung chuẩn (`src/data/menu.js`), không
  viết tay.
- MVP cuối chương nằm ở `src/data/capstones/<chapter-key>.js`, không nằm trong dữ liệu
  bài học — nó thuộc về cả chương chứ không thuộc về một bài.
