# dsa-app — Kế hoạch toàn dự án

> **File duy nhất.** Trước đây kế hoạch nằm rải ở ba file (`content-rewrite`,
> `mo-rong-30-nhom-gd0-2`, `gd3-18-bai-moi`). Ba file đó đã được gộp vào đây ngày
> 2026-08-11 và xoá khỏi cây thư mục — bản đầy đủ vẫn nằm trong lịch sử git nếu cần
> tra lại. Từ nay chỉ sửa file này.
>
> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development
> (recommended) or superpowers:executing-plans to implement this plan task-by-task.
> Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Trước khi bắt đầu bất kỳ task nào, đọc mục "Chiến lược chi phí"** — nó quy định
> model và cách chạy cho từng giai đoạn, kèm luật bắt buộc nhắc người dùng khi model
> đang dùng không khớp.

**Goal:** Đưa dsa-app thành lộ trình học Cấu trúc dữ liệu & Giải thuật hoàn chỉnh cho
người mới: **30 nhóm kiến thức chia 7 chương**, mỗi bài theo khung 7 mục chuẩn, và
**mỗi chương kết thúc bằng đúng một dự án thực hành của cả chương** — một trang riêng
trên sidebar, không phải một mục nằm trong bài.

**Luật dự án thực hành (chốt 2026-08-12, đọc trước khi viết bất kỳ dự án nào):**

1. **Một chương một dự án, không bài nào có dự án riêng.** Dự án dùng kiến thức của cả
   chương, nên nó thuộc về chương. Bài học chỉ còn 7 mục, kết thúc ở mục 6 LeetCode.
2. **Đề bài phải là một vấn đề có thật trong cuộc sống** — thứ người ta thật sự cần làm
   và trả tiền để làm: đọc sao kê chi tiêu, phân tích log, gợi ý tìm kiếm, lập lộ trình
   giao hàng, xếp lịch nhân sự, phát hiện tài liệu trùng. **Không viết trò chơi, không
   giải bài toán đố, không làm thư viện hay công cụ cho lập trình viên.** Cấu trúc dữ
   liệu là phương tiện, không phải sản phẩm.
3. **Bảy dự án độc lập với nhau.** Mỗi dự án làm được ngay cả khi người học bỏ qua chương
   trước. Dùng lại module cũ là **gợi ý**, không phải điều kiện.

**Tech Stack:** Vue 3 (`<script setup>`) + Vite, Vitest 3 + @vue/test-utils + jsdom,
C++ cho code mẫu trong bài. Không backend, không DB.

**Spec:** `docs/superpowers/specs/2026-08-09-mo-rong-30-nhom-design.md` và
`docs/superpowers/specs/2026-08-09-dac-ta-7-mvp.md` — hai file này **không** gộp vào
đây, chúng là đặc tả chứ không phải kế hoạch.

---

## Trạng thái tổng quan

| Giai đoạn | Nội dung | Model | Trạng thái |
|---|---|---|---|
| Viết lại 10 nhóm cũ | Khung 6 phần, component dùng chung, schema, menu tự sinh | Opus + Sonnet | ✅ Xong 2026-08-09 |
| 0–2 | Hạ tầng 7 chương, Phần 7, `ProjectBrief`, MVP Chương 1, 2 bài mẫu | Opus | ✅ Xong 2026-08-10 |
| 2.4 | Kiến trúc bài học Markdown — bỏ file `.vue` mỗi bài | Opus | ✅ Xong 2026-08-11 |
| **2.5** | **Chuyển 13 bài `.vue` còn lại sang Markdown bằng script** | **Opus** | 🟨 **Xong 4 bài Chương 1, còn 9 bài** |
| 2.6 | Dự án thực hành lên cấp chương — bỏ Phần 7 khỏi từng bài | Opus | ✅ Xong 2026-08-12 |
| 3 | 18 bài mới còn lại và 6 dự án chương — 26 task | Sonnet | 🟨 Task 1–4 xong (Chương 1 trọn vẹn), còn Task 5–26 |
| 4 | Quiz `recall` và `note` LeetCode cho 10 bài cũ | Sonnet | ⬜ Chưa viết kế hoạch chi tiết |
| 5 | Rà soát 30 bài, giọng văn, giao diện, README | Opus | ⬜ Chưa bắt đầu |

**Đang có 15/30 bài** đã viết (`ready: true`) và **1/7 chương có dự án**
(`capstoneReady: true`). Sáu bài đã dùng kiến trúc Markdown: `bang-bam`, `tham-lam`, và
trọn 4 bài Chương 1.

Năm bài còn giữ trường `project` của riêng bài (`do-phuc-tap`, `mang-chuoi`, `de-quy`,
`danh-sach-lien-ket`, `bang-bam`) — Giai đoạn 2.6 sẽ xoá cả năm.

### Kiến trúc bài học: Markdown, không còn file `.vue` mỗi bài

Từ 2026-08-11, một bài học gồm **đúng hai file nội dung**:

| File | Chứa gì |
|---|---|
| `src/content/<sid>.md` | Toàn bộ văn xuôi: lý thuyết, vì sao, các ví dụ điển hình |
| `src/data/lessons/<sid>.js` | Dữ liệu có cấu trúc: `goal`, `quiz`, `practice`, `leetcode` |

`src/components/LessonRenderer.vue` dựng khung 7 mục cho mọi bài. **Không tạo file trong
`src/sections/` nữa.** `src/App.vue` không phải sửa: danh sách bài Markdown suy ra từ
`src/content/` bằng `import.meta.glob`.

Vì sao đổi: mỗi bài `.vue` tốn khoảng 48 dòng dây nối lặp lại y hệt, cộng thuế thẻ HTML
bọc quanh từng đoạn văn và từng ô bảng. Hai bài đã chuyển cho thấy **604 dòng `.vue`
biến mất**, đổi lại 98 dòng renderer dùng chung. Chi phí sinh một bài mới giảm khoảng
**30–40% token đầu ra**.

Cú pháp đầy đủ nằm ở đầu `src/lesson/md.js`. Tóm tắt: bốn chỉ thị đầu dòng — `@part`,
`@vidu`, `@slot`, `@ngoai` — phần còn lại là Markdown thường.

### Hai cờ trạng thái trong `CHAPTERS`

- `ready` — cờ của **bài**: đã có file nội dung. Bài chưa `ready` hiện mờ trên sidebar,
  không bấm được.
- `capstoneReady` — cờ của **chương**: đã có dữ liệu dự án thực hành ở
  `src/data/capstones/<chapter-key>.js`. Chương chưa bật thì mục "Dự án thực hành" của nó
  hiện mờ trên sidebar y như một bài chưa viết.

**Cờ `duAn` đã bị xoá ở Giai đoạn 2.6** — nó là cờ của bài, mà bài không còn dự án riêng.
Đừng dựng lại nó.

Test schema chỉ ép với bài hoặc chương đã bật cờ, nên chúng không bao giờ đỏ oan trong
lúc chờ nội dung. Viết xong thì bật cờ, đừng để quên — `tests/lesson-md.spec.js` có luật
đỏ ngay nếu có file `.md` mà quên bật `ready`, nên đây là chỗ duy nhất còn phải nhớ bằng
tay.

**Đã cân nhắc và quyết định KHÔNG suy ra hai cờ này tự động** từ sự tồn tại file nội
dung: `parts.js` hiện không import gì cả, và bắt nó phụ thuộc vào dữ liệu bài học chỉ để
tiết kiệm một dòng mỗi bài là đổi một rủi ro thật lấy một khoản lợi nhỏ. Test đã chặn
được lỗi quên bật cờ rồi.

---

## Chiến lược chi phí: dùng model nào, chạy kiểu gì

> **BẮT BUỘC ĐỌC Ở ĐẦU MỖI PHIÊN LÀM VIỆC.**
> Dự án chạy trên gói Claude $20 (Pro) — giới hạn theo cửa sổ 5 giờ trượt và hạn mức
> tuần. Kế hoạch chia thành các task độc lập, mỗi task kết thúc bằng test xanh +
> commit, nên **dừng giữa chừng không mất gì**. Không cần cố làm một mạch.

### Bảng model theo giai đoạn

| Giai đoạn | Việc | Model | Cách chạy |
|---|---|---|---|
| Viết lại 10 nhóm cũ | Hạ tầng + bài mẫu | Opus | Inline — **đã xong** |
| Viết lại 10 nhóm cũ | 9 nhóm còn lại | Sonnet | Subagent tuần tự — **đã xong** |
| 0–2 | Hạ tầng 7 chương, đặc tả MVP, 2 bài mẫu | Opus | Inline — **đã xong** |
| 2.4 | Kiến trúc bài học Markdown | Opus | Inline — **đã xong** |
| **2.5** | **Script chuyển 13 bài `.vue` còn lại sang `.md`** | **Opus** | **Inline — viết script, KHÔNG dùng agent** |
| **2.6** | **Dự án lên cấp chương: hạ tầng + viết lại dự án Chương 1** | **Opus** | **Inline — đụng khung, test và schema** |
| **3** | **18 bài mới còn lại + 6 dự án chương** | **Sonnet** | **Subagent, đúng 1 agent mỗi lần, tuần tự** |
| 4 | Quiz ôn và `note` LeetCode cho 10 bài cũ | **Sonnet** | Subagent, tuần tự |
| 5 | Rà soát 30 bài, giọng văn, giao diện, README | Opus | Inline |

**Vì sao Giai đoạn 2.5 dùng script chứ không dùng agent:** chuyển 13 file `.vue` bằng
LLM tốn khoảng 270k token (đọc ~5300 dòng rồi viết lại từng đó), trong khi khoản tiết
kiệm trên 18 bài mới chỉ khoảng 70k. **Lỗ nặng.** HTML → Markdown là việc cơ học, một
script Node làm được gần hết với chi phí token bằng không; người chỉ soát lại chỗ lệch.

**Vì sao Giai đoạn 2.6 dùng Opus, inline:** nó đụng vào `parts.js`, `App.vue`,
`LessonRenderer.vue`, `menu.js`, một component mới và bốn file test — tức là khung của cả
app, đúng loại việc mà một lỗi im lặng sẽ đi theo suốt 30 bài. Đây là hạ tầng, không phải
việc lặp khuôn.

**Vì sao Giai đoạn 3–4 dùng Sonnet:** đã có hai bài mẫu (`do-phuc-tap`, `bang-bam`),
đặc tả MVP đầy đủ, khuôn chuẩn viết bài ngay trong file này, và test tự động ép đúng
cấu trúc + số lượng. Đây là công việc lặp khuôn có rào chắn — không cần Opus.

**Vì sao chạy subagent tuần tự, không song song:** tổng token của subagent thấp hơn
inline (context mỗi task nhỏ và không phình dần), nhưng chạy song song sẽ dồn tiêu thụ
vào cùng một cửa sổ 5 giờ và chạm trần sớm. Tuần tự giữ nguyên lợi ích token mà không
đốt hạn mức theo cụm.

**Không dùng** workflow / multi-agent orchestration cho dự án này.

### Luật nhắc nhở (Claude phải tự kiểm)

Đầu mỗi phiên và **mỗi khi chuyển sang một dải task thuộc giai đoạn khác**, Claude phải:

1. Đối chiếu model đang chạy với cột "Model" của giai đoạn sắp làm.
2. Nếu lệch — đặc biệt là **đang chạy Opus mà sắp làm Giai đoạn 3 hoặc 4** — phải
   **dừng lại và nhắc người dùng đổi model bằng `/model` trước khi bắt đầu**, không
   được lặng lẽ làm tiếp.
3. Nếu người dùng vẫn muốn giữ nguyên model sau khi được nhắc, thì làm theo ý người
   dùng và không nhắc lại về task đó nữa.
4. Nếu người dùng yêu cầu fan-out nhiều subagent song song, nêu rõ tác động tới hạn mức
   một lần, rồi làm theo quyết định của người dùng.

### Nhật ký phiên làm việc

Điền sau mỗi phiên. Cột "Hạn mức" lấy từ lệnh `/status` lúc kết thúc phiên.

| Ngày | Task đã xong | Model đã dùng | Cách chạy | Hạn mức còn / ghi chú |
|---|---|---|---|---|
| 2026-08-09 | Task 0–7 (trọn PHASE 0) | Opus | Inline | Hạ tầng xong: Vitest 3 + jsdom, 6 component dùng chung, schema dữ liệu, menu sinh tự động. `tests/lesson-structure.spec.js` đỏ 3 test cho `quay-lui-xau-nhi-phan` — đúng thiết kế Task 6, Task 8 sẽ làm xanh. |
| 2026-08-09 | Task 8 (section pilot Quay lui) | Opus | Inline | Toàn bộ 35 test xanh, build sạch. Widget kiểm chứng bằng test tạm mount section trong jsdom (đã xóa sau khi chạy) — đủ 18 id DOM còn nguyên, stepper phản hồi đúng. **Phiên sau bắt đầu Task 9, phải đổi sang Sonnet bằng `/model` và chạy subagent tuần tự.** |
| 2026-08-09 | Task 9–18 | Sonnet | Subagent, đúng 1 agent mỗi lần, tuần tự | Trọn 10 nhóm kiến thức đã viết lại theo khung 6 phần. Vòng chính vẫn là Opus nhưng chỉ điều phối; toàn bộ việc viết nội dung do subagent Sonnet làm, đúng tinh thần bảng chi phí. 145 test xanh sau Task 18. |
| 2026-08-09 | Task 19–20 | Opus | Inline | Rà góc nhìn người mới: 9/10 nhóm đạt, sửa nhóm QHĐ nâng cao thiếu ví dụ đời thường mở đầu; gỡ 8 thẻ `<em>` sót lại. Task 20 sửa lỗi HTML `<tr>` trong `LeetCodeList.vue` (build hết cảnh báo) và bọc bảng LeetCode cho cuộn ngang. **Còn nợ Step 1, 2, 3, 5 của Task 20** — phiên này không có công cụ trình duyệt nên chưa kiểm chứng giao diện bằng mắt. |
| 2026-08-10 | Đợt mới, Giai đoạn 0–2 | Opus | Inline | **Kế hoạch này đã kết thúc.** Đợt mở rộng 10 → 30 nhóm bắt đầu, xem `docs/superpowers/plans/2026-08-09-mo-rong-30-nhom-gd0-2.md` và spec kèm theo. 225 test xanh, build sạch. Chưa kiểm chứng giao diện bằng mắt. |
| 2026-08-10 | Viết kế hoạch Giai đoạn 3 | Opus | Inline | Không đụng mã nguồn. Tạo `docs/superpowers/plans/2026-08-09-gd3-18-bai-moi.md`: 26 task cho 18 bài mới và 6 MVP còn lại, kèm khuôn chuẩn viết một bài và khuôn chuẩn viết một MVP để mỗi subagent Sonnet tự đủ ngữ cảnh. **Phiên sau bắt đầu Task 1, phải đổi sang Sonnet bằng `/model` và chạy subagent tuần tự.** |
| 2026-08-11 | Sửa 3 lỗi người dùng báo | Opus | Inline | (1) Bổ sung thuật ngữ Big O vào bài Độ phức tạp, thống nhất cách viết "O lớn (Big O)" toàn khoá. (2) `QuizBlock.vue` giờ xáo thứ tự lựa chọn bằng PRNG có hạt giống lấy từ nội dung câu hỏi — trước đó 44/65 đáp án nằm ở vị trí 0, sau khi xáo là 22/20/23. (3) **Lỗi Phần 4 rỗng:** 5 bài viết ở Giai đoạn 0–2 đổ nội dung vào slot mặc định của `WorkedExample`, vốn chỉ render 6 slot có tên, nên Vue vứt hết mà không báo lỗi. Đã cấu trúc lại 10 ví dụ vào đúng 6 slot và thêm test đếm slot ở `lesson-structure.spec.js` để chặn tái diễn. 302 test xanh, build sạch. Chưa kiểm chứng bằng mắt qua trình duyệt. |
| 2026-08-11 | Đường viết bài bằng Markdown (bước 1 của việc giảm chi phí sinh nội dung) | Opus | Inline | Mục tiêu: bỏ hẳn file `.vue` cho mỗi bài, vì mỗi bài đang tốn ~48 dòng dây nối lặp lại y hệt cộng thuế thẻ HTML quanh từng đoạn và từng ô bảng. Thêm `src/lesson/md.js` (parser 3 chỉ thị `@part` / `@vidu` / `@slot`, chạy lúc build nên markdown-it không vào bundle), plugin `lessonMarkdown` trong `vite.config.js`, `src/lesson/mdLessons.js`, và `src/components/LessonRenderer.vue` dựng khung 8 mục cho mọi bài Markdown. Chuyển bài `bang-bam` sang `src/content/bang-bam.md` và xoá `src/sections/BangBam.vue` — **file `.vue` giảm 322 dòng, đổi lại 0 dòng khung**. Hai đường render chạy song song: có `src/content/<sid>.md` thì dùng renderer, không thì dùng `.vue` cũ; không thêm cờ nào trong `CHAPTERS`. `examples` của bài Markdown rút từ `@vidu` chứ không chép lại vào file dữ liệu. Thêm `tests/lesson-md.spec.js` (12 luật, gồm luật bắt thiếu slot ngay lúc build). 314 test xanh, build sạch. **Chưa kiểm chứng bằng mắt qua trình duyệt** — có sửa `style.css` để `.md-body` không làm mất giới hạn `--measure`. |
| 2026-08-11 | Bài Markdown đầu tiên có widget (bước 2) | Opus | Inline | Người dùng xác nhận bước 1 chạy tốt trên máy. Chọn `tham-lam` (282 dòng) thay vì `dfs-bfs` (667 dòng) làm bài kiểm chứng widget — cùng chứng minh được một điều với hơn một nửa chi phí. Bài này lộ ra thiếu sót của parser: mục Ví dụ điển hình của nó có văn xuôi và **hai widget xen giữa** các `WorkedExample`, trong khi parser cũ cấm văn xuôi trong `vi-du`. Đã thêm chỉ thị `@ngoai` và đổi mục này thành một **dãy khối giữ nguyên thứ tự tác giả viết**. Thêm `src/lesson/widgets.js`: quy ước widget của bài `<sid>` nằm ở `src/widgets/<sid>.js` và xuất một hàm tên bắt đầu bằng `init`; `LessonRenderer` gọi trong `onMounted`, thay cho chỗ mỗi file `.vue` tự import. **Điểm neo widget nằm trong v-html vẫn hoạt động** — test mount thật rồi bấm thật: đủ 13 id, ba stepper `d3Rope`/`d4`/`d4Coin` tiến lùi đúng, các khung vẽ được JS đổ nội dung vào. Xoá `src/sections/ThamLam.vue` (282 dòng). 315 test xanh, build sạch, gzip 207.54 kB (trước 208.09). Một thay đổi hình thức cố ý: tiêu đề mở đầu phần Lý thuyết từ `<h4>` thành `h3` cho khớp bài `bang-bam`. |
| 2026-08-11 | Cập nhật kế hoạch theo kiến trúc Markdown | Opus | Inline | Không đụng mã nguồn. Viết lại mục "Khuôn chuẩn viết một bài" (B/C/D/E) sang định dạng `.md`; thêm mục "Kỷ luật token cho subagent" — ba luật quyết định phần lớn chi phí Giai đoạn 3, quan trọng nhất là **cấm subagent mở file kế hoạch 2500 dòng này** và chỉ cho đọc đúng một bài mẫu `src/content/bang-bam.md` thay vì cặp `.vue` + `.js`. Sửa bằng script 81 dòng tham chiếu `src/sections/*.vue` trong 26 task (giữ nguyên các dòng nhật ký vì chúng ghi lịch sử). Thêm **Giai đoạn 2.5**: chuyển 13 bài `.vue` còn lại bằng script, chạy **trước** Giai đoạn 3 — vì nó biến Giai đoạn 4 thành việc thuần dữ liệu, để mã nguồn chỉ còn một kiến trúc, và để lộ thiếu sót định dạng trên bài thật trước khi viết 18 bài mới. Số chỗ khai báo thủ công khi thêm một bài: **4 → 1**. |
| 2026-08-11 | Sửa Phần 7: người mới không biết bắt đầu từ đâu | Opus | Inline | Người dùng báo Phần 7 bài `do-phuc-tap` đọc xong vẫn không biết làm kiểu gì, bắt đầu từ đâu, cần kiến thức gì, đầu ra là gì. Kiểm lại thì đây là **lỗ hổng của schema**, không phải của riêng bài đó: `project` có `input` mà **không có `output`**, và không có chỗ nào nói bước đầu tiên. Thêm bốn trường: `needs` (cần biết trước, ≥3 mục, nói rõ cả cái CHƯA cần biết), `output`, `outputSample` (dán đúng những gì terminal in ra), `start` (4–6 bước theo thứ tự, bước 1 phải nhỏ và chạy được ngay). Cập nhật `ProjectBrief.vue` và thứ tự đọc: vì sao → cần biết trước → đầu vào → đầu ra → bắt đầu từ đâu → yêu cầu → coi như xong → chỗ dễ sai. Điền đủ cho **cả 5 bài có Phần 7 và MVP Chương 1**, không vá riêng bài Big O. Thêm luật test ép ba trường mới. 320 test xanh, build sạch. |
| 2026-08-11 | Chuẩn hoá Phần 7 và thêm tiêu chí nghiệm thu | Opus | Inline | Chốt **một format chuẩn chung cho Phần 7 của cả 30 bài**, gồm 9 trường theo đúng mạch người mới đọc. Đổi `done` từ mảng chuỗi thành mảng object `{ dat, kiem }` — mỗi tiêu chí phải kèm **cách kiểm chạy được hoặc quan sát được kèm ngưỡng bằng số**, vì một tiêu chí không nói cách kiểm thì chỉ là lời chúc. Giao diện tự đánh số AC1..ACn. Nâng số tiêu chí tối thiểu từ 1 lên 3 cho bài lẻ và 4 cho MVP. Viết lại toàn bộ tiêu chí cho 5 bài và MVP Chương 1 — tổng 39 AC, mỗi cái đều có lệnh hoặc ngưỡng cụ thể. Thêm luật test ở cả `lesson-data.spec.js` lẫn `capstone.spec.js` chặn kiểu viết `done` bằng chuỗi hoặc `kiem` sơ sài. Ghi luật viết AC vào khuôn chuẩn để 18 bài mới sinh ra là có sẵn. 330 test xanh, build sạch. |
| 2026-08-11 | Giai đoạn 2.5 cho 4 bài Chương 1 | Opus | Inline, script | Người dùng yêu cầu "làm tiếp task còn lại của Chương 1"; đối chiếu mã nguồn thì **Task 1–4 của Giai đoạn 3 đã xong từ trước** (4 bài đều `ready` + `duAn`, chương có `capstoneReady`, luật test Task 1 đã có) — bảng trạng thái ghi "chưa chạy task nào" là đã cũ, nay sửa lại. Việc còn đụng tới Chương 1 là Giai đoạn 2.5, và người dùng chọn phạm vi hẹp: chỉ 4 bài của chương này. Viết `scripts/vue-sang-md.mjs` (≈250 dòng), chuyển 4 bài, xoá 4 file `.vue` — **1245 dòng `.vue` biến mất**, đổi lại 4 file `.md` tổng 1120 dòng và 0 dòng khung. Phát sinh ngoài kế hoạch: `LessonRenderer` chưa biết dựng MVP cuối chương, phải bổ sung trước khi chuyển `danh-sach-lien-ket` (xem Task 2.5.2b). 318 test xanh, build sạch, gzip 214.77 kB. **Chưa kiểm chứng bằng mắt qua trình duyệt.** Chưa làm Task 2.5.1 (`index.js` bằng `import.meta.glob`) vì nằm ngoài phạm vi người dùng chọn. |
| 2026-08-12 | Đổi phạm vi dự án thực hành, viết Giai đoạn 2.6 | Opus | Inline | Không đụng mã nguồn — chỉ sửa kế hoạch. Người dùng chốt: **dự án thực hành thuộc về chương, không thuộc về bài**, và đề bài phải là **vấn đề có thật trong cuộc sống**, không phải trò chơi, bài toán đố hay công cụ cho lập trình viên. Bốn quyết định qua hỏi đáp: dự án có **section riêng trên sidebar** (không chôn ở cuối bài cuối chương); **dự án Chương 1 đổi hẳn** từ `core` + `bench` sang sổ chi tiêu cá nhân đọc từ file sao kê; **bảy dự án độc lập**, dùng lại code cũ chỉ là gợi ý; **xoá hẳn** 5 trường `project` đã viết. Thêm Giai đoạn 2.6 (4 task, Opus inline) và sửa lan ra cả file: khung bài 8 → **7 mục**, bỏ cờ `duAn`, Task 1 của Giai đoạn 3 bị bỏ vì ép một kiến trúc không còn tồn tại, xoá 18 khối `project` trong các task bài, 6 task bài cuối chương thôi dựng dự án, Task 19 bật cờ luôn thay vì chờ Giai đoạn 4, và Giai đoạn 4 nhẹ hẳn — mất phần việc lớn nhất của nó. **Chưa thực thi task nào đụng mã nguồn.** Sau đó người dùng yêu cầu sửa luôn đặc tả, nên **Step 2 và 3 của Task 2.6.3 đã xong ngay trong phiên này**: viết lại trọn dự án Chương 1 trong `2026-08-09-dac-ta-7-mvp.md` (sao kê, bảy yêu cầu, bảng báo cáo mẫu), đổi vỏ Chương 4 thành sổ quản lý kho hàng với đầu vào `KHO` tự sinh, hạ mọi ràng buộc kế thừa xuống thành gợi ý, gỡ đầu vào Chương 6 khỏi công cụ Chương 2, và thêm bảng đối chiếu bài-với-yêu-cầu để kiểm luật "phủ hết chương". Bảng đó lộ ra hai điểm yếu đã ghi rõ thay vì giấu: Work/Span chỉ nằm ở mục Mở rộng, Ngăn xếp hàng đợi chỉ vào gián tiếp qua LRU. |
| 2026-08-12 | Thực thi trọn Giai đoạn 2.6 (Task 2.6.1 → 2.6.4) | Opus | Inline | Người dùng yêu cầu tập trung Chương 1 và Chương 2 để verify. Chương 1 = Giai đoạn 2.6, đúng model theo bảng nên làm ngay. `LESSON_PARTS` còn **7 mục**; cờ `duAn` xoá khỏi cả 30 dòng `CHAPTERS`; thêm `chapterProjectId()` và `ChapterProject.vue` — mỗi chương một section dự án riêng, mục cuối trong nhóm sidebar của chương, sáng/mờ theo `capstoneReady`. Xoá trọn trường `project` ở 5 file dữ liệu bài (script Node, `project` vốn là trường cuối nên cắt đuôi là đủ); `LessonRenderer` không còn import `ProjectBrief` lẫn `capstoneCuaChuong`. `buildMenu` trả mảng rỗng cho id dự án, nên trang đó không có menu bài tập bên phải. Viết lại `nen-mong.js` từ `core`+`bench` thành **Sổ chi tiêu cá nhân đọc file sao kê**, chép từ đặc tả chứ không sáng tác: 7 `must`, 6 AC đều có lệnh kiểm, 7 `traps`, `outputSample` là đúng bảng báo cáo tháng, `data.sample` là 20 dòng CSV thật. Sửa luật ở **8 file spec**; luật `recall` giờ ép với mọi bài `ready` và 10 bài cũ nằm trong `MIEN_TRU_RECALL` kể tên từng bài, trỏ về Giai đoạn 4. Hai test `app-shell` phải cộng thêm số mục dự án vào phép đếm sidebar. **305 test xanh, build sạch, gzip 208.67 kB.** **Chưa kiểm chứng bằng mắt qua trình duyệt** — phiên này không mở được trình duyệt, nên Step 5 của Task 2.6.2 còn nợ: sidebar Chương 1 có mục "Dự án thực hành" bấm được, sáu chương kia hiện mờ, trang dự án không có khung menu bên phải và không tràn ngang. |

---

# Giai đoạn 2.5: chuyển 13 bài `.vue` còn lại sang Markdown

**Model: Opus, inline. Viết script, KHÔNG dùng agent.** Chạy **trước** Giai đoạn 3.

13 bài còn viết bằng `.vue`: `do-phuc-tap`, `mang-chuoi`, `de-quy`, `danh-sach-lien-ket`,
`quay-lui-xau-nhi-phan`, `to-hop`, `qhd-nen-tang`, `qhd-lis-lcs-doixung`,
`ngan-xep-hang-doi`, `dfs-bfs`, `dsu`, `cay-nhi-phan-bst`, `bst-nang-cao`.

**Vì sao chạy trước Giai đoạn 3, không phải sau:**

1. Giai đoạn 4 trở thành việc thuần dữ liệu — bài học chỉ còn hai file nội dung, không
   file trình bày nào phải sửa. Làm ngược thì sửa `.vue` xong lại bị script ghi đè.
2. Toàn bộ mã nguồn chỉ còn **một** kiến trúc, nên prompt gửi subagent ở Giai đoạn 3
   không phải giải thích "có hai loại bài".
3. Nếu định dạng `.md` còn thiếu gì, 13 bài thật sẽ lộ ra ngay — đúng như bài `tham-lam`
   đã lộ ra chuyện văn xuôi và widget xen giữa các ví dụ, thứ mà bài `bang-bam` không có.
   Phát hiện chuyện đó **sau khi** đã viết 18 bài mới thì đắt hơn nhiều.

- [ ] **Task 2.5.1: `src/data/lessons/index.js` gom bằng `import.meta.glob`**

Thay 15 dòng `import` viết tay bằng một lần glob `./*.js`, suy `sid` từ tên file, giữ
nguyên bước hợp nhất `examples` từ `mdLessons`. Sau task này, thêm một bài mới **không
phải sửa `index.js`** — đó là một trong ba chỗ khai báo thủ công bị xoá bỏ.

Expected: test xanh, không đổi hành vi.

- [x] **Task 2.5.2: Viết `scripts/vue-sang-md.mjs`** — xong 2026-08-11

Dùng: `node scripts/vue-sang-md.mjs <file.vue> [...] [--ghi]`. Không có `--ghi` thì chỉ in
ra màn hình. Nó tự đếm ký tự hai bên và báo tên file khi lệch quá 2%.

**Hai chỗ phép đếm đó từng báo sai, đừng sửa lại thành như cũ:** phải gỡ thẻ **trước** khi
giải mã thực thể (nếu không, `i &lt; n ... p-&gt;tiep` trong khối code C++ thành một cặp
`<...>` và bị coi là thẻ), và phải đếm code tách khỏi văn xuôi (trong `.vue` code escape
thành `&lt;`, trong `.md` nó là `vector<int>` thật). Đếm gộp thì mọi bài đều báo lệch 40%
ở chỗ chẳng mất gì.

- [x] **Task 2.5.2b: Cho `LessonRenderer` dựng luôn MVP cuối chương** — xong 2026-08-11,
      **Giai đoạn 2.6 gỡ bỏ.** Đọc mục dưới đây để hiểu vì sao code từng như vậy, đừng
      dựng lại: dự án giờ có section riêng, `LessonRenderer` không biết gì về nó nữa.

Việc này không có trong kế hoạch ban đầu và **bắt buộc phải làm trước khi chuyển bài cuối
của bất kỳ chương nào**: `LessonRenderer` cũ chỉ render `data.project`, trong khi bài cuối
chương viết bằng `.vue` còn render thêm `<ProjectBrief :brief="capstone" mode="capstone" />`.
Chuyển mà không làm chỗ này thì MVP của chương biến mất lặng lẽ.

Chỗ hiển thị **suy ra từ `CHAPTERS`**, không thêm cờ: bài nào là phần tử cuối của một chương
có `capstoneReady` thì hiện MVP chương đó. Câu dẫn trước khối MVP (trước kia là một thẻ `<p>`
viết tay trong file `.vue` của bài cuối) chuyển thành trường `ketChuong` của file capstone —
nó thuộc về chương, không thuộc về bài.

`tests/capstone.spec.js` đổi theo: bài cuối viết bằng `.md` thì **mount thật rồi nhìn DOM**
(đúng một khối `.pb-capstone`, tiêu đề khớp capstone của chương, và vẫn còn đúng một khối
`.pb` của riêng bài) thay vì đọc chuỗi trong file section — bài Markdown không có file section
để đọc.

Đọc một file `src/sections/<Pascal>.vue`, xuất `src/content/<sid>.md`. Việc phải làm:

- Bỏ khung: `<template>`, `<section>`, `<h2>`, `<script setup>`, các thẻ `<LessonGoal>`,
  `<QuizBlock>`, `<PracticeSet>`, `<LeetCodeList>`, `<ProjectBrief>`.
- `<LessonPart part="X">` → `@part X`, chỉ giữ ba mục `ly-thuyet`, `vi-sao`, `vi-du`.
- `<WorkedExample id title :official>` → `@vidu` hoặc `@vidu*`; `<template #slot>` → `@slot`.
- Nội dung nằm trong `vi-du` mà **ngoài** mọi `WorkedExample` → `@ngoai`.
- `<pre v-pre><code>` → khối ```` ```cpp ````, gỡ escape `&lt;` `&amp;` `&gt;`.
- `<table class="formula-table">` chỉ chứa văn bản đơn giản → bảng Markdown. **Bảng có
  `<br>`, `<code>` lồng nhau hoặc ô gộp thì giữ nguyên HTML thô** — cố chuyển sẽ hỏng.
- `<p>` → đoạn văn; `<strong>` → `**`; `<code>` → backtick; `<ol>`/`<ul>` → danh sách;
  `<blockquote>` → `>`. Thẻ có `class` hoặc `style` riêng (`.idea-label`, `.realworld`,
  `.problem-box`, `.widget`) **giữ nguyên HTML thô**.

Script không cần hoàn hảo. Nó cần đúng ở phần chiếm 95% khối lượng và **không được im
lặng làm mất nội dung** — cho nó đối chiếu số ký tự văn bản trước và sau, lệch quá 2% thì
báo tên file ra để người soát tay.

- [ ] **Task 2.5.3: Chạy script cho 13 bài, soát từng bài** — xong 4/13

Đã chuyển: `do-phuc-tap`, `mang-chuoi`, `de-quy`, `danh-sach-lien-ket` (trọn Chương 1, không
bài nào có widget). Còn 9 bài: `quay-lui-xau-nhi-phan`, `to-hop`, `qhd-nen-tang`,
`qhd-lis-lcs-doixung`, `ngan-xep-hang-doi`, `dfs-bfs`, `dsu`, `cay-nhi-phan-bst`,
`bst-nang-cao` — **cả 9 đều có widget**, nên chúng là phép thử thật cho hai luật widget của
`tests/lesson-md.spec.js`.

Bốn bài đầu chỉ cần soát tay đúng một chỗ: bảng có `colspan` ở ví dụ rùa-thỏ của
`danh-sach-lien-ket` được giữ nguyên HTML thô, đúng như thiết kế.

Với mỗi bài: chạy script, xoá `src/sections/<Pascal>.vue`, gỡ import và thẻ trong
`src/App.vue`, gỡ `examples` khỏi `src/data/lessons/<sid>.js`, chạy test.

`tests/lesson-md.spec.js` tự phủ lên bài mới chuyển: đủ 6 slot mỗi ví dụ, `examples` khớp
`@vidu`, và với bài có widget thì đủ điểm neo cộng stepper bấm được. Bài nào có widget
(`ngan-xep-hang-doi`, `dfs-bfs`, `dsu`, `cay-nhi-phan-bst`, `bst-nang-cao`,
`quay-lui-xau-nhi-phan`, `to-hop`, `qhd-nen-tang`, `qhd-lis-lcs-doixung`) phải xanh cả
hai luật widget đó mới tính là xong.

**Kiểm chứng bằng mắt là bắt buộc ở task này**, không được bỏ qua: script đụng vào 13 bài
cùng lúc, test không chứng minh được layout.

- [ ] **Task 2.5.4: Chốt**

`src/sections/` chỉ còn `TrangChu.vue`. Cập nhật `CLAUDE.md`: mô tả kiến trúc mới, bỏ
luật "đường dẫn file section suy ra từ `sid` bằng `sidToFile()`", thêm luật về
`src/content/` và bốn chỉ thị. Ghi một dòng vào nhật ký phiên làm việc.

---

# Giai đoạn 2.6: dự án thực hành lên cấp chương

**Model: Opus, inline.** Chạy **trước Giai đoạn 3**, và **không phụ thuộc Giai đoạn 2.5** —
hai giai đoạn này đụng vào những chỗ khác nhau, chạy cái nào trước cũng được. Nhưng cả hai
phải xong trước khi viết bài mới đầu tiên, nếu không 18 bài sẽ sinh ra theo khuôn cũ rồi
phải sửa lại từng bài.

## Vấn đề

Khung bài học hiện có 8 mục, mục 7 là "Dự án thực hành" của **riêng từng bài**. Song song
đó lại có **dự án MVP của cả chương**, và nó đang được nhét vào bên trong mục 7 của bài
cuối chương. Hậu quả:

- Bài cuối chương hiện **hai hộp dự án** chồng nhau, người học không biết phải làm cái nào.
- Dự án của cả chương bị chôn dưới đáy một bài, không có chỗ đứng riêng, khó tìm lại.
- 30 bài × một dự án nhỏ = 30 đề bài phải sáng tác, phần lớn chỉ là bài tập cài đặt một
  cấu trúc dữ liệu — trùng vai với mục 5 Bài tập và mục 6 LeetCode vốn đã có.
- Vài dự án nhỏ đã viết là **công cụ cho lập trình viên** (`core::Vec`, `bench`), không
  phải vấn đề đời sống, nên chúng vi phạm luật đã chốt ở đầu file này.

## Quyết định

| Điều | Trước | Sau |
|---|---|---|
| Số mục của một bài | 8, mục 7 là dự án | **7**, kết ở mục 6 LeetCode |
| Dự án | mỗi bài một cái, cộng một cái cho chương | **đúng một cái cho mỗi chương** |
| Chỗ hiện | trong Phần 7 của bài cuối chương | **section riêng, có mục riêng trên sidebar** |
| Đề bài | thư viện, công cụ đo, bài tập cài đặt | **vấn đề có thật trong cuộc sống** |
| Liên kết giữa 7 dự án | chương sau **bắt buộc** dùng lại code chương trước | **độc lập**, dùng lại chỉ là gợi ý |
| Cờ `duAn` | có, mỗi bài một cờ | **xoá** |
| Trường `project` trong dữ liệu bài | có ở 5 bài | **xoá cả 5**, và test cấm dựng lại |

## Task 2.6.1: Hạ tầng — section dự án riêng cho mỗi chương

**Files:**
- Modify: `src/lesson/parts.js`
- Create: `src/components/ChapterProject.vue`
- Modify: `src/App.vue`
- Modify: `src/data/menu.js`

**Interfaces:**
- Produces: `chapterProjectId(chapterKey)` → `'du-an-<chapter-key>'`; mục dự án trong
  `navGroups`; id dự án trong `allSectionIds`.

- [x] **Step 1: `src/lesson/parts.js`**

  - Bỏ phần tử `du-an` khỏi `LESSON_PARTS`. Còn **7 mục, num 0–6**. Không đánh số lại
    sáu mục kia — chúng vốn đã đúng.
  - Bỏ cờ `duAn` khỏi cả 30 dòng bài trong `CHAPTERS`.
  - Thêm `export function chapterProjectId(key) { return \`du-an-${key}\` }`. Không viết
    tay chuỗi `du-an-...` ở bất cứ chỗ nào khác.
  - `navGroups`: mỗi chương thêm **một item cuối cùng** sau danh sách bài:
    `{ id: chapterProjectId(c.key), label: 'Dự án thực hành', ready: c.capstoneReady, laDuAn: true }`.
    Đặt tên `laDuAn` chứ **không** đặt lại tên `duAn` — cờ cũ vừa bị xoá, dùng lại đúng cái
    tên đó chỉ khiến người sau tưởng nó chưa chết.
  - `allSectionIds`: thêm id dự án của mọi chương có `capstoneReady: true`.

- [x] **Step 2: `src/components/ChapterProject.vue`**

Section thật, nên phải giữ **đúng** bốn thứ mà `App.vue` phụ thuộc vào: `id`,
`class="day-section"`, `data-sid`, `v-show="active"`, cộng `defineProps({ active: Boolean })`.

Nội dung: `<h2>Chương N — Dự án thực hành</h2>`, rồi đoạn `ketChuong` của capstone, rồi
`<ProjectBrief :brief="capstone" mode="capstone" />`. Nhận prop `chapterKey`, tự tra
`capstoneCuaChuong`. Không nhận `brief` từ ngoài — một nguồn sự thật.

- [x] **Step 3: `src/App.vue`**

Thêm đúng một khối, đặt **sau** vòng `LessonRenderer`:

```vue
<ChapterProject
  v-for="key in chapterProjectKeys"
  :key="key"
  :chapter-key="key"
  :active="activeSection === chapterProjectId(key)"
/>
```

`chapterProjectKeys` là `CHAPTERS.filter(c => c.capstoneReady).map(c => c.key)`. Đây là
lần **duy nhất** được thêm khai báo tay vào `App.vue` trong cả kế hoạch này.

- [x] **Step 4: `src/data/menu.js`**

Bỏ nhánh `if (p.key === 'du-an' && !data.project) continue` — mục đó không còn tồn tại.
Trang dự án **không có menu bài tập bên phải**: `buildMenu` trả mảng rỗng cho id dự án, và
`App.vue` đã có `v-if="currentMenu.length"` nên khung menu tự biến mất. Đừng sinh menu cho
trang này chỉ vì các trang khác có.

- [x] **Step 5: Test và build**

`npm run test -- --run` rồi `npm run build`. Test sẽ đỏ ở luật cũ — đó là việc của Task
2.6.2, đừng vá vội ở đây.

## Task 2.6.2: Dọn dữ liệu và viết lại luật test

**Files:**
- Modify: `src/data/lessons/{do-phuc-tap,mang-chuoi,de-quy,danh-sach-lien-ket,bang-bam}.js`
- Modify: `src/components/LessonRenderer.vue`, `src/components/ProjectBrief.vue`
- Modify: `tests/capstone.spec.js`, `tests/lesson-data.spec.js`, `tests/parts.spec.js`,
  `tests/menu.spec.js`, `tests/components/project-brief.spec.js`

- [x] **Step 1: Xoá 5 trường `project`**

Xoá trọn trường `project` khỏi năm file dữ liệu bài. **Không giữ lại làm comment.** Nội
dung cũ còn nguyên trong lịch sử git; giữ một bản chết trong mã nguồn chỉ tạo ra chỗ để
người sau chép nhầm.

- [x] **Step 2: `LessonRenderer.vue`**

Xoá trọn khối `<LessonPart part="du-an">`, biến `capstone`, import `ProjectBrief` và import
`capstoneCuaChuong`. Sau bước này renderer **không biết gì** về dự án — đó là điểm chính:
dự án thuộc về chương, và chương có component riêng của nó.

- [x] **Step 3: `ProjectBrief.vue`**

Một chỗ duy nhất: nhãn `Bắt buộc dùng lại code cũ của bạn` → **`Gợi ý dùng lại code cũ của
bạn`**, và khối đó chỉ hiện khi `reuses` không rỗng (đã đúng sẵn). Bảy dự án giờ độc lập,
nên nhãn cũ nói dối người học.

- [x] **Step 4: Viết lại luật test**

| File | Bỏ | Thêm |
|---|---|---|
| `tests/lesson-data.spec.js` | toàn bộ khối kiểm schema `project` | luật **cấm** mọi file dữ liệu bài có trường `project` |
| `tests/capstone.spec.js` | luật "bài cuối chương render `ProjectBrief` chế độ capstone" | luật: chương `capstoneReady` phải có id dự án trong `allSectionIds`, và mount `ChapterProject` của chương đó phải cho đúng **một** khối `.pb-capstone` có tiêu đề khớp capstone |
| `tests/capstone.spec.js` | `reuses` bắt buộc ≥ 2 mục | `reuses` **không bắt buộc**; nếu có thì mọi `chapter` phải nhỏ hơn số chương hiện tại |
| `tests/capstone.spec.js` | — | capstone phải đủ **mười ba** trường: `title`, `ketChuong`, `why`, `needs`, `input`, `output`, `outputSample`, `start`, `must`, `done`, `traps`, `uses`, `data` |
| `tests/parts.spec.js` | kỳ vọng 8 mục | kỳ vọng **7** mục, và không có key `du-an` |
| `tests/menu.spec.js` | kỳ vọng menu có mục dự án | menu bài đúng 7 mục gốc; `buildMenu` của id dự án trả mảng rỗng |
| `tests/components/project-brief.spec.js` | nhãn "Bắt buộc dùng lại" | nhãn "Gợi ý dùng lại" |

Luật `recall` giữ nguyên nội dung nhưng **đổi điều kiện áp dụng**: trước đây chỉ ép với bài
`duAn: true`, giờ ép với **mọi bài `ready: true`**. Việc này làm 10 bài cũ đỏ ngay — đó
chính là danh sách việc của Giai đoạn 4, và để nó đỏ là cố ý. Nếu không muốn đỏ suốt lúc
chờ, thêm danh sách miễn trừ **có tên từng bài và có ghi chú trỏ về Giai đoạn 4**, không
dùng điều kiện chung chung.

- [x] **Step 5: Test, build** — xong; kiểm chứng bằng mắt còn nợ

Ba thứ phải nhìn tận mắt qua `npm run dev`, test không chứng minh được: sidebar Chương 1
có mục "Dự án thực hành" ở cuối và bấm được; sáu chương kia hiện mục đó ở dạng mờ "sắp có";
trang dự án không có khung menu bên phải và nội dung không tràn ngang.

## Task 2.6.3: Viết lại dự án Chương 1 thành bài toán đời sống

**Files:**
- Modify: `src/data/capstones/nen-mong.js`
- Modify: `docs/superpowers/specs/2026-08-09-dac-ta-7-mvp.md`

Dự án Chương 1 hiện là `core` + `bench` — một thư viện và một công cụ đo hiệu năng. Đó là
việc thật của lập trình viên, nhưng **không phải vấn đề đời sống**, nên nó vi phạm luật đã
chốt. Nó cũng là mắt xích đầu của chuỗi "chương sau dùng lại code chương trước", chuỗi mà
Giai đoạn 2.6 vừa gỡ bỏ.

- [x] **Step 1: Viết lại `nen-mong.js` theo đề mới**

**Sổ chi tiêu cá nhân đọc từ file sao kê.** Người dùng tải file CSV sao kê từ ngân hàng
hoặc ví điện tử, chương trình đọc vào, tự phân loại từng giao dịch vào danh mục (ăn uống,
đi lại, hoá đơn, mua sắm), rồi in báo cáo tháng: tiêu bao nhiêu, danh mục nào tăng so với
tháng trước, năm khoản lớn nhất.

Bốn kiến thức của chương vào đúng bốn chỗ, không chỗ nào gượng ép:

| Kiến thức | Dùng vào việc gì trong dự án |
|---|---|
| Mảng động | chứa danh sách giao dịch, số dòng không biết trước |
| Chuỗi | tách dòng CSV, chuẩn hoá tên nơi bán để khớp luật phân loại |
| Đệ quy | danh mục nhiều cấp (Ăn uống → Cà phê, Đi chợ), cộng tổng theo cây |
| Danh sách liên kết | lịch sử sửa phân loại, hoàn tác được nhiều bước |
| Độ phức tạp | đo thời gian khi số giao dịch tăng từ 1 nghìn lên 1 triệu dòng |

Đầu vào là CSV bốn cột `ngay,mo_ta,so_tien,loai`. `outputSample` phải là **đúng cái bảng
báo cáo tháng in ra terminal**, không phải mô tả về nó.

`reuses: []` — đây là chương đầu, không có gì để dùng lại.

- [x] **Step 2: Cập nhật đặc tả** — xong 2026-08-12, làm trước cùng phiên viết kế hoạch

`docs/superpowers/specs/2026-08-09-dac-ta-7-mvp.md` đã sửa xong và **là nguồn để chép**
cho Step 1: mục "Dự án Chương 1" (dòng 62) có đủ đề bài, dữ liệu vào mẫu, bảng báo cáo
mẫu để dán vào `outputSample`, bảy yêu cầu bắt buộc, bốn tiêu chí xong và bảy chỗ dễ sai.
Step 1 chỉ là chuyển đặc tả đó thành dữ liệu, **không sáng tác thêm**.

Đã sửa trong cùng đợt: ba luật dự án ở đầu file; "Bảng kế thừa toàn cục" thành "Bảng gợi
ý dùng lại toàn cục" và không ô nào còn bắt buộc; mọi yêu cầu kiểu "dùng `core::Str` của
Chương 1" hay "dùng heap tự cài ở Chương 3" hạ xuống thành gợi ý; Chương 4 đổi vỏ; thêm
bảng đối chiếu bài-với-yêu-cầu ở cuối file để kiểm luật "phủ hết chương".

- [x] **Step 3: Rà sáu đặc tả còn lại theo luật "vấn đề đời sống"** — xong 2026-08-12

| Chương | Đề | Phán quyết |
|---|---|---|
| 2 | Bộ phân tích log máy chủ | **Giữ.** Việc thật của người vận hành hệ thống. |
| 3 | Máy gợi ý tìm kiếm | **Giữ.** Ai cũng dùng thứ này mỗi ngày. |
| 4 | Mini database có index → **Sổ quản lý kho hàng tra cứu nhanh** | **Đã đổi vỏ.** Yêu cầu kỹ thuật giữ nguyên — vẫn BST cân bằng, Fenwick và Segment Tree — nhưng sản phẩm giao cho người quản lý kho, không giao cho lập trình viên. Đầu vào đổi từ CSV suy ra từ log Chương 2 sang `KHO`, sổ xuất nhập tự sinh, để dự án đứng một mình được. |
| 5 | Trình lập lộ trình giao hàng | **Giữ.** |
| 6 | Công cụ xếp lịch và tối ưu ngân sách | **Giữ.** Đầu vào thôi phụ thuộc công cụ Chương 2: đếm request theo giờ bằng vài dòng `awk` cũng ra. |
| 7 | Công cụ phát hiện tài liệu trùng lặp | **Giữ.** |

**Hai điểm yếu đã ghi vào cuối spec, đừng để rơi:** bài Work/Span của Chương 7 mới chỉ
nằm ở mục Mở rộng, và bài Ngăn xếp hàng đợi của Chương 3 chỉ vào gián tiếp qua LRU cache.
Task viết dự án hai chương đó nên kéo chúng vào phần bắt buộc nếu tìm được chỗ tự nhiên.

- [x] **Step 4: Test, build, commit**

## Task 2.6.4: Chốt Giai đoạn 2.6

- [x] Cập nhật `CLAUDE.md`: khung bài còn 7 mục; dự án thuộc chương và có section riêng;
      cờ `duAn` đã xoá, cấm dựng lại; luật "vấn đề đời sống" cho mọi dự án.
- [x] Ghi một dòng vào bảng "Nhật ký phiên làm việc".
- [ ] **DỪNG LẠI.** Giai đoạn 3 chạy bằng Sonnet — nhắc người dùng đổi model bằng `/model`
      trước khi bắt đầu.

---

# Giai đoạn 3: 18 bài mới còn lại và 6 dự án chương

**Trạng thái: Task 1–4 đã xong (trọn Chương 1), còn Task 5–26.** Chạy tuần tự.

**Điều kiện tiên quyết: Giai đoạn 2.6 đã xong.** Nếu chưa, mọi bài viết ra sẽ theo khuôn 8
mục cũ và phải sửa lại từng bài.

**Architecture:** Mỗi bài là hai file nội dung — dữ liệu ở `src/data/lessons/<sid>.js`, văn xuôi ở `src/content/<sid>.md` — cộng đúng **một** chỗ khai báo: cờ `ready` trong `CHAPTERS` của `src/lesson/parts.js`. Khung 7 mục do `src/components/LessonRenderer.vue` dựng; `src/App.vue` và `src/data/lessons/index.js` không phải sửa vì cả hai đều suy ra danh sách bằng `import.meta.glob`. **Bài học không có dự án.** Dự án của chương nằm ở `src/data/capstones/<chapter-key>.js` và hiện ở một section riêng do `ChapterProject.vue` dựng, bật bằng cờ `capstoneReady`. Không bài nào cần widget tương tác mới.

**Bài mẫu bắt buộc đọc trước khi viết bài đầu tiên:** `src/data/lessons/bang-bam.js` và `src/content/bang-bam.md`. Đó là bài đại diện số đông; `do-phuc-tap` là bài dị biệt toàn khái niệm, chỉ tham khảo khi viết `work-span` và `do-kho-bai-toan`.

## Model và cách chạy

Toàn bộ kế hoạch này chạy bằng **Sonnet**, dispatch **subagent, đúng một agent mỗi lần, tuần tự**. Không fan-out song song, không workflow. Nếu phiên đang chạy Opus thì dừng lại nhắc người dùng đổi model bằng `/model` trước khi bắt đầu.

**Khi dispatch mỗi task, prompt gửi cho subagent phải chứa nguyên văn ba thứ:** mục "Global Constraints" bên dưới, mục "Khuôn chuẩn viết một bài" bên dưới, và đúng task của nó. Subagent không đọc được các task khác, nên đừng để nó phải suy đoán.

### Kỷ luật token cho subagent — nêu rõ trong prompt

Ba luật này quyết định phần lớn chi phí của cả Giai đoạn 3. Chép vào prompt mỗi task:

1. **TUYỆT ĐỐI KHÔNG mở `docs/superpowers/plans/KE-HOACH.md`.** File này dài hơn 2400
   dòng. Mọi thứ subagent cần đã nằm trong prompt rồi. Đọc nhầm nó một lần là đốt bằng
   cả một task.
2. **Chỉ đọc đúng MỘT file làm mẫu: `src/content/bang-bam.md`.** Không đọc
   `src/data/lessons/bang-bam.js` — schema đã có đủ ở mục A của khuôn chuẩn. Không đọc
   file `.vue` nào trong `src/sections/`; kiến trúc đó đã bỏ.
3. **Không đọc `src/App.vue`, `src/style.css`, `src/lesson/parts.js` quá phần cần sửa.**
   Với `parts.js` chỉ cần sửa đúng một dòng cờ của bài mình — dùng Edit trực tiếp, đừng
   đọc cả file 140 dòng.

## Global Constraints

- Tiếng Việt, xưng "bạn", giọng thân thiện, giống hệt `bang-bam`. Không đổi tone giữa các bài.
- **Không dùng chữ nghiêng** ở bất kỳ đâu. Không thẻ `<i>`. `src/style.css` ép `font-style: normal`, không được gỡ.
- Code mẫu là C++, đặt trong khối ```` ```cpp ````. **Không escape `<` và `&` nữa** — khối code Markdown tự xử lý. Cũng không dùng `<pre v-pre>`.
- Giải thích theo Feynman: ví dụ đời thường trước, thuật ngữ sau. Mỗi khái niệm trả lời đủ "Đây là gì? / Vì sao quan trọng? / Làm sao dùng?".
- **Không tạo file trong `src/sections/`, không sửa `src/App.vue`.** Khung section (`id`, `class="day-section"`, `data-sid`, `v-show`) do `LessonRenderer.vue` dựng sẵn cho mọi bài.
- Không đổi `sid` của bất kỳ bài nào. Không sửa 12 bài đã có.
- Không sửa `src/style.css`, không thêm CSS mới. 18 bài này dùng hết các lớp đã có: `idea-label`, `formula-table`, và các component sẵn có.
- Không thêm widget tương tác. Không tạo file trong `src/widgets/`.
- Không đặt `max-width` riêng cho `.content-row`. Không thêm mốc responsive.
- Ràng buộc số lượng do test ép, không được lệch: `goal` 2–4 dòng; `examples` 1–2 mục, id không trùng; `quiz` 3–5 câu, mỗi câu ≥ 2 lựa chọn và `why` dài hơn 10 ký tự; `practice` **đúng 3** mục, mỗi mục có `title`/`idea`/`hint`; `leetcode` 8–12 bài, `slug` không trùng, `level` thuộc `Easy|Medium|Hard` và **xếp từ dễ tới khó**.
- **Bài học KHÔNG có trường `project`.** Dự án thuộc về chương, viết ở task riêng theo "Khuôn chuẩn viết một dự án chương". Test đỏ ngay nếu file dữ liệu bài có trường này.
- Mỗi bài phải có **tối thiểu 1 câu quiz `recall: true`** hỏi về bài đã học trước đó.
- Lệnh test: `npm run test -- --run`. Lệnh build: `npm run build`. Cả hai phải xanh trước khi commit.
- Mỗi task một commit. Thông báo commit không dấu, theo mẫu đã dùng: `content: bai <ten bai>`.

---

## Khuôn chuẩn viết một bài

Chín bước dưới đây giống nhau cho cả 18 bài. Task của từng bài chỉ nói nội dung riêng của bài đó.

### A. File dữ liệu `src/data/lessons/<sid>.js`

```js
export default {
  goal: [
    // 2–4 câu, mỗi câu là một việc người học làm được sau bài, bắt đầu bằng
    // động từ: 'Giải thích được...', 'Tự cài được...', 'Nói được vì sao...'
  ],
  examples: [
    { id: '<id-vi-du-1>', title: '<tiêu đề ví dụ 1>', official: false },
    { id: '<id-vi-du-2>', title: '<tiêu đề ví dụ 2>', official: false },
  ],
  quiz: [
    // 4 câu là con số nên nhắm tới. Mỗi câu 3 lựa chọn, đáp án đúng ở vị trí
    // bất kỳ (đừng để answer: 0 ở mọi câu). Trường why là một đoạn giải thích
    // thật sự, dài 3–6 câu: nói vì sao đáp án đúng đúng, VÀ vì sao hai đáp án
    // sai sai. Xem why trong bang-bam.js làm mốc độ dài.
    { q: '...', options: ['...', '...', '...'], answer: 0, why: '...' },
    // Câu cuối là câu ôn tập, bắt buộc:
    { q: 'Ôn lại bài trước: ...', options: ['...', '...', '...'], answer: 0, recall: true, why: '...' },
  ],
  practice: [
    // ĐÚNG 3 mục. title là đề bài viết thành câu hoàn chỉnh; idea là hướng
    // giải bằng lời, không phải code; hint là một mẹo hoặc cái bẫy cụ thể.
    { title: '...', idea: '...', hint: '...' },
    { title: '...', idea: '...', hint: '...' },
    { title: '...', idea: '...', hint: '...' },
  ],
  leetcode: [
    // 8–12 bài, XẾP TỪ DỄ TỚI KHÓ (mọi Easy trước, rồi Medium, rồi Hard).
    // note là một câu nói rõ bài này luyện điều gì của bài học, hoặc nối về
    // bài cũ / bài sắp tới.
    { no: 1, name: 'Two Sum', slug: 'two-sum', level: 'Easy', note: '...' },
  ],
  // KHÔNG có trường project. Dự án thuộc về chương, không thuộc về bài.
}
```

### B. File nội dung `src/content/<sid>.md`

Khung đầy đủ của một bài. Không có thẻ Vue nào, không `<section>`, không `import` —
`LessonRenderer.vue` dựng hết. Bốn chỉ thị `@part` / `@vidu` / `@slot` / `@ngoai` phải
nằm ở **đầu dòng**; mọi thứ còn lại là Markdown thường.

~~~markdown
@part ly-thuyet

### <Tiêu đề khái niệm 1: ẩn dụ đời thường>

<p class="idea-label">🧩 Ý tưởng cốt lõi</p>

<Đoạn kể ẩn dụ đời thường, 3–5 câu, chưa dùng thuật ngữ nào.>

**Đây là gì?** ...

**Vì sao quan trọng?** ...

### <Tiêu đề khái niệm 2>

| Cột A | Cột B |
|---|---|
| ... | ... |

```cpp
// Code C++ viết thẳng, KHÔNG escape < và & nữa.
vector<pair<int,int>> a;
```

@part vi-sao

### Vì sao <kiến thức này> đáng học

**<Luận điểm 1 in đậm.>** ...

**<Luận điểm 2 in đậm.>** ...

**<Luận điểm 3 in đậm.>** ...

@part vi-du

@vidu <id-vi-du-1> | <tiêu đề ví dụ 1, khớp từng chữ với examples[0].title>

@slot de-bai
<Đề bài.>

@slot y-tuong
<Ý tưởng cốt lõi.>

@slot thuat-toan
<Các bước, thường là danh sách đánh số.>

@slot chay-tay
<Bảng Markdown chạy tay từng bước bằng số.>

@slot code
```cpp
...
```

@slot toi-uu
<Chỗ then chốt, chi phí, cách tối ưu hơn.>

@vidu <id-vi-du-2> | <tiêu đề ví dụ 2>
<sáu @slot y hệt như trên>
~~~

Bốn điều dễ sai nhất với định dạng này:

- **Đủ cả 6 `@slot` cho mỗi `@vidu`.** Thiếu một cái là **build đỏ**, không phải lỗi âm thầm như thời viết bằng `.vue`.
- **Bảng viết bằng Markdown**, không viết `<table>`. Class `formula-table` được gắn tự động. Hàng đầu là hàng tiêu đề.
- **Tiêu đề trong thân bài dùng `###`.** Id neo `auto-...` sinh tự động từ chữ trong tiêu đề, **không tự viết id nữa**.
- **HTML thô vẫn dùng được** khi cần, ví dụ `<p class="idea-label">`. Nhưng một khối HTML kết thúc ở dòng trống đầu tiên — đừng chèn dòng trống vào giữa một khối `<div>`.

Nếu cần chèn văn xuôi hoặc widget **xen giữa** các ví dụ, đóng ví dụ đang mở bằng `@ngoai`
rồi viết tiếp. 18 bài mới không có widget nên hầu như không cần tới.

Yêu cầu về nội dung phần Lý thuyết và Ví dụ:

- Phần `ly-thuyet` có 3–5 tiêu đề `###`, mỗi tiêu đề một khái niệm. Tiêu đề đầu tiên bao giờ cũng là ẩn dụ đời thường kèm `<p class="idea-label">🧩 Ý tưởng cốt lõi</p>`. Chỉ đúng một `idea-label` trong cả bài.
- Phần `vi-sao` là văn xuôi thuyết phục, 3–4 đoạn, mỗi đoạn mở bằng một câu luận điểm in đậm. Không bảng, không code.
- Mỗi `@vidu` phải **chạy tay bằng số**: một bảng từng bước, rồi một đoạn `**Chỗ then chốt:**` chỉ ra điều dễ bỏ sót, rồi một đoạn `**Chi phí:**` nói độ phức tạp. Không được chỉ mô tả suông.
- Tiêu đề sau dấu `|` của `@vidu` phải khớp **từng chữ** với `examples[i].title` mà task chỉ định — test đối chiếu hai chỗ này với nhau.

### C. Khai báo dữ liệu

**Không cần làm gì.** `src/data/lessons/index.js` gom mọi file trong thư mục bằng
`import.meta.glob` (Task 2.5.1). Đặt file đúng tên `<sid>.js` là xong.

### D. Khai báo section trong `src/App.vue`

**Không cần làm gì, và không được sửa `src/App.vue`.** Bài Markdown được nhận ra từ sự
tồn tại của `src/content/<sid>.md`.

### E. Bật cờ trong `src/lesson/parts.js`

Trong `CHAPTERS`, đổi `ready: false` của bài vừa viết thành `ready: true`. Đừng sửa bài
khác, đừng đụng `capstoneReady`, và đừng đọc cả file — dùng Edit đúng dòng đó.

Đây là **thao tác thủ công duy nhất còn lại** ngoài hai file nội dung.

### F. Chạy test

`npm run test -- --run`. Bật cờ xong là hàng loạt luật tự động phủ lên bài mới: cấu trúc section, schema dữ liệu, quiz `recall`, neo ví dụ, và luật cấm trường `project`. Test đỏ ở đây gần như luôn là nội dung thiếu chứ không phải test sai — sửa nội dung, đừng nới test.

### G. Chạy build

`npm run build`. Không được có cảnh báo mới.

### H. Kiểm chứng bằng mắt

`npm run dev`, mở bài vừa viết. Kiểm: bài đã bấm được trên sidebar và không còn nhãn "sắp có"; menu bên phải hiện đủ 7 mục, kết ở "6. Tài nguyên tự luyện LeetCode", cộng hai mục ví dụ ở cấp 4; bấm từng mục menu nhảy đúng chỗ; bảng không tràn ngang; khối code không tràn ngang. Nếu không mở được trình duyệt thì nói rõ là chưa kiểm chứng bằng mắt, đừng khẳng định đã xong.

### I. Commit

```bash
git add src/data/lessons src/content src/lesson/parts.js
git commit -m "content: bai <ten bai khong dau>"
```

---

## Thứ tự chạy và bản đồ task

Chạy đúng theo thứ tự này. Dự án của một chương **không còn phụ thuộc bài cuối chương** —
nó có section riêng — nhưng vẫn viết sau khi các bài của chương đã xong, vì `uses` phải trỏ
tới sid có thật và người viết cần biết chương đã dạy đúng những gì.

| # | Task | Chương | Ghi chú |
|---|---|---|---|
| 1 | ~~Test ép bài cuối chương hiển thị MVP~~ | — | **Đã bỏ.** Gộp vào Giai đoạn 2.6 — luật này nói về một kiến trúc không còn tồn tại |
| 2 | `mang-chuoi` | 1 | |
| 3 | `de-quy` | 1 | |
| 4 | `danh-sach-lien-ket` | 1 | Bài cuối Ch1 |
| 5 | `sap-xep` | 2 | |
| 6 | `tim-kiem-nhi-phan` | 2 | |
| 7 | `hai-con-tro-cua-so-truot` | 2 | |
| 8 | Dự án Chương 2 | 2 | Có thể chạy sau task 9 nếu tiện |
| 9 | `tong-tien-to` | 2 | Bài cuối Ch2 |
| 10 | `heap-hang-doi-uu-tien` | 3 | |
| 11 | Dự án Chương 3 | 3 | |
| 12 | `trie` | 3 | Bài cuối Ch3 |
| 13 | Dự án Chương 4 | 4 | |
| 14 | `fenwick-segment-tree` | 4 | Bài cuối Ch4 |
| 15 | `sap-xep-to-po` | 5 | |
| 16 | `duong-di-ngan-nhat` | 5 | |
| 17 | Dự án Chương 5 | 5 | |
| 18 | `cay-khung-nho-nhat` | 5 | Bài cuối Ch5 |
| 19 | Dự án Chương 6 | 6 | Ch6 không có bài mới. Bật `capstoneReady` **ngay tại task này** — không còn phải chờ Giai đoạn 4 gắn chỗ hiển thị |
| 20 | `thao-tac-bit` | 7 | |
| 21 | `toan-so-hoc` | 7 | |
| 22 | `chuoi-nang-cao` | 7 | |
| 23 | `work-span` | 7 | |
| 24 | Dự án Chương 7 | 7 | |
| 25 | `do-kho-bai-toan` | 7 | Bài cuối Ch7 |
| 26 | Chốt Giai đoạn 3 | — | Cập nhật CLAUDE.md, README, nhật ký |

Hai điểm dừng giao được: sau task 4 (Chương 1 học được trọn vẹn) và sau task 9 (Chương 2 xong). Người dùng có thể kết thúc phiên ở đó mà app vẫn dùng được.

---

## Cấu trúc file

| File | Trách nhiệm | Task |
|---|---|---|
| `src/data/lessons/<sid>.js` × 18 | Dữ liệu 18 bài mới | 2–7, 9, 10, 12, 14–16, 18, 20–23, 25 |
| `src/content/<sid>.md` × 18 | Văn xuôi 18 bài mới | như trên |
| `src/lesson/parts.js` | Bật cờ `ready` và `capstoneReady` | mọi task nội dung |
| `src/data/capstones/xu-ly-day.js` | Dự án Chương 2 | 8 |
| `src/data/capstones/tra-cuu.js` | Dự án Chương 3 | 11 |
| `src/data/capstones/cay.js` | Dự án Chương 4 | 13 |
| `src/data/capstones/do-thi.js` | Dự án Chương 5 | 17 |
| `src/data/capstones/thiet-ke-thuat-toan.js` | Dự án Chương 6 | 19 |
| `src/data/capstones/chuyen-de.js` | Dự án Chương 7 | 24 |
| `src/data/capstones/index.js` | Gom 7 dự án | 8, 11, 13, 17, 19, 24 |
| `CLAUDE.md`, `README.md` | Cập nhật trạng thái | 26 |

---

## Khuôn chuẩn viết một dự án chương

Sáu task dự án (8, 11, 13, 17, 19, 24) đều làm đúng năm việc dưới đây. Nội dung không phải sáng tác từ đầu: nó đã được viết trong `docs/superpowers/specs/2026-08-09-dac-ta-7-mvp.md`. Việc của task là chuyển đặc tả đó thành dữ liệu, không thêm không bớt yêu cầu.

**Ba luật của một dự án chương, kiểm trước khi viết dòng dữ liệu đầu tiên:**

1. **Đề bài là một vấn đề có thật trong cuộc sống.** Người học phải nói được "cái này giải quyết việc gì cho ai". Không trò chơi, không bài toán đố, không thư viện hay công cụ cho lập trình viên.
2. **Dùng kiến thức của cả chương**, không phải của một bài. `uses` phải kể tên **mọi** bài trong chương, và mỗi bài phải có ít nhất một `must` cần tới nó. Nếu một bài không nhét được vào dự án một cách tự nhiên thì đề bài sai, không phải bài học sai.
3. **Đứng một mình được.** Người bỏ qua các chương trước vẫn làm được. `reuses` chỉ là gợi ý dùng lại code cũ cho người học tuần tự.

### A. Tạo `src/data/capstones/<chapter-key>.js`

Mười ba trường, cùng schema với `project` cũ cộng bốn trường của riêng cấp chương
(`ketChuong`, `uses`, `reuses`, `data`). Bản mẫu đầy đủ đã có ở `src/data/capstones/nen-mong.js` — đọc nó thay vì suy từ mô tả.

```js
export default {
  title: '<tên sản phẩm> — <một câu nói nó làm gì cho người dùng>',
  ketChuong: '<Câu dẫn: chương này kết thúc ở đây, và những gì vừa học ghép lại thành cái gì. 1–2 câu.>',
  why: '<Bối cảnh thật: ai dùng, giải quyết vấn đề gì, phần mềm thật nào đang làm việc này. 3–5 câu liền mạch.>',
  needs: [ /* ≥ 3 mục: kiến thức nào của chương, công cụ C++ nào. Nói rõ cả cái
              CHƯA cần biết — người mới sợ nhất là tưởng mình thiếu nền. */ ],
  input: '<Định dạng dữ liệu vào, kèm link nguồn công khai.>',
  output: '<Đầu ra là cái gì, ở dạng nào, xem ở đâu.>',
  outputSample: `<Dán ĐÚNG những gì terminal in ra khi làm xong.>`,
  start: [ /* 4–6 bước THEO THỨ TỰ. Bước 1 phải nhỏ nhất mà chạy được ngay và cho
              thấy kết quả — không phải "thiết kế kiến trúc". Mỗi bước sau thêm
              đúng một thứ. Phần đo đạc luôn để cuối cùng. */ ],
  must: [ /* ≥ 3 mục, phủ hết các bài của chương */ ],
  done: [ /* ≥ 4 tiêu chí nghiệm thu, mỗi cái là object { dat, kiem } */ ],
  traps: [ /* mục "Chỗ dễ sai" của đặc tả, 3–5 mục */ ],
  uses: [ /* sid của MỌI bài trong chương này */ ],
  reuses: [ /* GỢI Ý dùng lại: { chapter: <số>, module: '<tên>' }. Được phép rỗng.
              Nếu có thì chapter phải nhỏ hơn số chương này. */ ],
  stretch: [ /* mục "Mở rộng" */ ],
  data: {
    format: '<mô tả định dạng một dòng dữ liệu>',
    sample: `<khoảng 20 dòng mẫu, dán nguyên từ đặc tả>`,
    url: 'https://<link tải công khai>',
  },
}
```

**Luật viết tiêu chí nghiệm thu** — đây là chỗ dễ viết dối nhất:

- Mỗi `must` quan trọng phải có ít nhất một AC chấm được nó. AC không phải bản tóm tắt của `must`, nó là **cách chứng minh** `must` đã xong.
- `kiem` phải chạy được hoặc nhìn được. "Chạy nhanh" là sai; "time ./baocao sao-ke.csv, cột real dưới 1s" là đúng.
- Có ngưỡng thì ghi bằng số. "Nhanh hơn ít nhất 100 lần", "lệch dưới 20%", "0 byte rò rỉ".
- Ưu tiên AC bắt đúng cái bẫy trong `traps`.
- AC đầu tiên nên là thứ dễ nhất, thường là "chạy ra đúng mẫu đầu ra ở trên". Người học cần một mốc đạt được sớm.

Lưu ý về `data.sample`: đây là chuỗi JavaScript nhiều dòng, không phải HTML. Dùng dấu backtick cho dễ đọc. `ProjectBrief.vue` nội suy nó vào `<pre><code>` nên không cần escape `<` hay `&`, và **không** dùng `v-pre` ở đó.

### B. Khai báo trong `src/data/capstones/index.js`

Thêm một dòng `import` và một dòng trong object `capstones`, theo đúng khuôn của `nen-mong`.

### C. Bật cờ `capstoneReady: true` cho chương đó trong `CHAPTERS`

Đây cũng chính là thứ làm mục "Dự án thực hành" của chương hết mờ trên sidebar và trở thành
một trang bấm được. Không phải sửa `App.vue` — nó suy ra danh sách từ `CHAPTERS`.

### D. Chạy test

`npm run test -- --run tests/capstone.spec.js` rồi cả bộ. Bật cờ xong là `tests/capstone.spec.js` tự phủ lên dự án mới: đủ 13 trường, `must` ≥ 3, `done` ≥ 4 và mỗi cái là object `{ dat, kiem }`, `uses` trỏ tới sid có thật và phủ hết bài của chương, `reuses` nếu có thì chỉ trỏ chương số nhỏ hơn, và section dự án của chương mount ra đúng một khối `.pb-capstone`.

### E. Kiểm chứng bằng mắt

`npm run dev`, bấm mục "Dự án thực hành" của chương vừa viết trên sidebar. Kiểm: trang mở
được, tiêu đề đúng tên chương, khối dữ liệu mẫu và `outputSample` không tràn ngang, không
có khung menu bài tập bên phải.

### F. Commit

```bash
git add src/data/capstones src/lesson/parts.js
git commit -m "content: du an Chuong <so>"
```

---

## Task 1: ~~Test ép bài cuối chương hiển thị MVP~~ — ĐÃ BỎ

Task này ép một kiến trúc không còn tồn tại: nó kiểm rằng file của bài cuối chương render
`ProjectBrief` ở chế độ capstone. Từ Giai đoạn 2.6, dự án của chương có section riêng và
bài học không dựng dự án nữa, nên luật đúng phải nói về `ChapterProject`, không nói về bài
cuối chương.

**Luật thay thế đã nằm ở Task 2.6.2, Step 4.** Đừng viết lại luật cũ ở đây.

---
## Task 2: Bài `mang-chuoi` — Mảng, chuỗi và mảng động

**Files:**
- Create: `src/data/lessons/mang-chuoi.js`
- Create: `src/content/mang-chuoi.md`
- Modify: `src/lesson/parts.js` (chỉ dòng cờ của bài này)

**Interfaces:**
- Consumes: khung ở mục "Khuôn chuẩn viết một bài"; bài `do-phuc-tap` đã có, được nhắc lại ở câu quiz `recall`.
- Produces: module `core::Vec` và `core::Str` — hai phần đầu của thư viện `core` mà MVP Chương 1 và cả sáu chương sau đều dùng lại.

Tiền tố id cho `h3` và ví dụ: `mc`.

**Ẩn dụ mở bài:** dãy ghế đánh số liền nhau trong rạp chiếu phim. Biết số ghế là đi thẳng tới đó, không phải đếm từ đầu hàng. Nhưng muốn chèn một ghế vào giữa hàng thì phải dịch mọi ghế phía sau sang một chỗ; và khi hết ghế thì không nới hàng ra được, phải chuyển cả rạp sang phòng lớn hơn.

**Khái niệm bắt buộc phủ, theo đúng thứ tự này:**

1. Bộ nhớ liên tục và vì sao truy cập theo chỉ số là `O(1)`: địa chỉ phần tử thứ `i` bằng địa chỉ đầu cộng `i` nhân kích thước phần tử. Một phép nhân một phép cộng, không phụ thuộc `n`.
2. Bảng chi phí các thao tác: đọc theo chỉ số `O(1)`, thêm cuối `O(1)`, chèn hoặc xoá giữa `O(n)`, tìm trong mảng chưa sắp `O(n)`. Dùng `formula-table`.
3. Mảng động: sức chứa khác số phần tử; khi đầy thì cấp mảng mới **gấp đôi**, copy sang, giải phóng mảng cũ.
4. **Phân tích khấu trừ** — công cụ chính của bài. Một lần `push_back` gặp lúc nở tốn `O(n)`, nhưng cộng dồn `n` lần thêm thì tổng số phép copy là `1+2+4+...+n < 2n`, nên bình quân mỗi lần là `O(1)`. Phải nói rõ: nhân đôi cho khấu trừ `O(1)`, còn tăng theo cấp cộng (`+10` mỗi lần) cho khấu trừ `O(n)`. Đây là chỗ nhiều người cài sai mà không biết.
5. Chuỗi là mảng ký tự: nối chuỗi trong vòng lặp tạo bản sao mới mỗi lần nên thành `O(n²)`; cắt chuỗi cần biết là tạo bản sao hay chỉ trỏ vào vùng cũ.
6. Locality và cache — nhắc lại mô hình chi phí ở bài Độ phức tạp: duyệt mảng theo thứ tự nhanh hơn nhảy lung tung dù cùng số phép toán, vì bộ nhớ đọc theo khối.

**Hai ví dụ điển hình:**

- `vd-mc-nhan-doi-suc-chua` — "Xem mảng động nở ra và đếm tổng số lần copy". Bảng chạy tay: thêm lần lượt 9 phần tử vào mảng sức chứa ban đầu 1, mỗi hàng ghi số phần tử, sức chứa, có nở không, số phép copy của lần đó, tổng copy tích luỹ. Chỗ then chốt: tổng copy sau 9 lần thêm là 1+2+4+8 = 15, nhỏ hơn 2×9. Chi phí: `O(1)` khấu trừ.
- `vd-mc-chen-giua-vs-cuoi` — "So chèn vào giữa với chèn vào cuối trên mảng một triệu phần tử". Bảng: mỗi cách, số phần tử phải dịch, số phép toán với `n = 10⁶`, thời gian ước lượng theo mốc `10⁸` phép toán mỗi giây. Chỗ then chốt: chèn đầu mảng một triệu lần là `10¹²` phép dịch — nhiều giờ; đúng lý do người ta cần danh sách liên kết, bài kế tiếp của chương.

**Câu quiz `recall: true`:** hỏi về bài Độ phức tạp — cho `n = 10⁶`, chương trình chèn vào đầu mảng `n` lần là `O(n²)` nên khoảng `10¹²` phép toán; hỏi ước lượng thời gian dựa trên mốc `10⁸` phép toán mỗi giây. Đáp án đúng: cỡ hàng giờ, không phải hàng giây.

**Ba bài tập kiểm tra:**

1. Cài `Vec<T>` có `push_back`, `operator[]`, `size`, `capacity`, nhân đôi sức chứa khi đầy. Không dùng `std::vector` bên trong.
2. Đo thời gian trung bình mỗi `push_back` khi `n` tăng từ 1000 lên 1000000, với hai chiến lược nở: nhân đôi và cộng thêm 10. Vẽ hai đường lên cùng biểu đồ.
3. Cài `Str::split` tách chuỗi theo dấu phân cách, rồi so hai cách xây kết quả: nối chuỗi bằng `+=` trong vòng lặp so với cấp sẵn đủ chỗ một lần.

**Danh sách LeetCode (10 bài, đã xếp dễ tới khó):**

| no | name | slug | level |
|---|---|---|---|
| 27 | Remove Element | `remove-element` | Easy |
| 26 | Remove Duplicates from Sorted Array | `remove-duplicates-from-sorted-array` | Easy |
| 88 | Merge Sorted Array | `merge-sorted-array` | Easy |
| 283 | Move Zeroes | `move-zeroes` | Easy |
| 66 | Plus One | `plus-one` | Easy |
| 344 | Reverse String | `reverse-string` | Easy |
| 14 | Longest Common Prefix | `longest-common-prefix` | Easy |
| 189 | Rotate Array | `rotate-array` | Medium |
| 238 | Product of Array Except Self | `product-of-array-except-self` | Medium |
| 54 | Spiral Matrix | `spiral-matrix` | Medium |

- [ ] **Step 1: Đọc bài mẫu** — `src/content/bang-bam.md` trọn vẹn, lấy làm mốc độ dài, giọng văn và cách dùng bốn chỉ thị. KHÔNG đọc file nào khác.

Đọc `src/data/lessons/bang-bam.js` và `src/content/bang-bam.md` trọn vẹn. Đây là mốc về độ dài, giọng văn và cách trình bày. Đừng viết ngắn hơn đáng kể.

- [ ] **Step 2: Viết `src/data/lessons/mang-chuoi.js`**

Theo mục A của khuôn chuẩn, dùng nội dung đã chỉ định ở trên.

- [ ] **Step 3: Viết `src/content/mang-chuoi.md`**

Theo mục B của khuôn chuẩn. Sáu khái niệm ở trên gom thành 4 tiêu đề `h3` trong phần `ly-thuyet`: ẩn dụ và truy cập `O(1)`; bảng chi phí thao tác; mảng động và phân tích khấu trừ; chuỗi, locality và cache.

- [ ] **Step 4: Bật cờ `ready`** theo mục E. Không sửa `src/App.vue`.

Theo mục C, D, E của khuôn chuẩn. Tên component là `MangChuoi`, đặt ngay sau `DoPhucTap` trong cả hai chỗ của `App.vue`.

- [ ] **Step 5: Chạy test**

Run: `npm run test -- --run`
Expected: PASS toàn bộ.

- [ ] **Step 6: Chạy build**

Run: `npm run build`
Expected: không cảnh báo mới.

- [ ] **Step 7: Kiểm chứng bằng mắt**

Theo mục H của khuôn chuẩn.

- [ ] **Step 8: Commit**

```bash
git add src/data/lessons src/content src/lesson/parts.js
git commit -m "content: bai Mang, chuoi va mang dong"
```

---
## Task 3: Bài `de-quy` — Đệ quy và hệ thức truy hồi

**Files:**
- Create: `src/data/lessons/de-quy.js`
- Create: `src/content/de-quy.md`
- Modify: `src/lesson/parts.js` (chỉ dòng cờ của bài này)

**Interfaces:**
- Consumes: khung ở mục "Khuôn chuẩn viết một bài"; `do-phuc-tap` để nhắc lại ở câu `recall`; `mang-chuoi` vừa xong, được nhắc khi nói về ngăn xếp lời gọi tốn bộ nhớ.
- Produces: cách đọc hệ thức truy hồi `T(n) = 2T(n/2) + O(n)` — bài `sap-xep` ở Chương 2 dựa hẳn vào nó và không giải thích lại.

Tiền tố id cho `h3` và ví dụ: `dq`.

**Ẩn dụ mở bài:** bạn đứng trong hàng dài, muốn biết mình đứng thứ mấy nhưng không thấy đầu hàng. Bạn hỏi người phía trước "anh đứng thứ mấy?". Người đó cũng không biết, nên hỏi tiếp người phía trước nữa. Cứ thế tới người đầu hàng — người này biết ngay, mình thứ nhất. Câu trả lời rồi truyền ngược lại, mỗi người cộng thêm một. Toàn bộ đệ quy nằm trong câu chuyện đó: một câu hỏi tự hỏi lại chính nó trên bài toán nhỏ hơn, cộng một người biết câu trả lời mà không cần hỏi ai.

**Khái niệm bắt buộc phủ, theo đúng thứ tự này:**

1. Ba thành phần của một hàm đệ quy đúng: trường hợp cơ sở, bước thu nhỏ bài toán, và ghép kết quả. Thiếu trường hợp cơ sở thì hàm chạy mãi; bước thu nhỏ không thật sự nhỏ đi thì cũng vậy. Nêu cả hai lỗi bằng ví dụ code ngắn.
2. Ngăn xếp lời gọi: mỗi lời gọi chưa xong chiếm một khung trên ngăn xếp, giữ biến cục bộ và chỗ quay về. Độ sâu đệ quy chính là bộ nhớ tiêu tốn, và vượt giới hạn là tràn ngăn xếp. Nói rõ đây là cùng một cấu trúc ngăn xếp bài `ngan-xep-hang-doi` đã dạy, chỉ là do máy quản lý hộ.
3. Cây đệ quy và cách đếm chi phí: vẽ cây lời gọi của `fib(5)` bằng bảng hoặc khối `pre`, đếm số nút để thấy `fib` đệ quy trần là `O(2ⁿ)`.
4. Hệ thức truy hồi: viết chi phí thành `T(n) = a·T(n/b) + f(n)`. Ba trường hợp cần nhớ, trình bày bằng `formula-table`: `T(n) = T(n/2) + O(1)` cho `O(log n)` (tìm nhị phân); `T(n) = 2T(n/2) + O(n)` cho `O(n log n)` (merge sort); `T(n) = 2T(n-1) + O(1)` cho `O(2ⁿ)` (liệt kê tập con). Không cần phát biểu định lý Master đầy đủ, chỉ cần ba mốc này cùng cách nhận ra chúng.
5. Chia để trị là khuôn mẫu, không phải mẹo: chia bài toán thành các phần rời nhau, giải từng phần bằng chính nó, ghép lại. Nói trước rằng `sap-xep` và `tim-kiem-nhi-phan` ở Chương 2 là hai ứng dụng trực tiếp.
6. Ghi nhớ kết quả để thoát khỏi mũ luỹ: `fib` với một bảng lưu kết quả đã tính tụt từ `O(2ⁿ)` xuống `O(n)`. Nói rõ đây chính là cửa vào của Quy hoạch động ở Chương 6, và người học đã có công cụ để hiểu nó khi tới đó.

**Hai ví dụ điển hình:**

- `vd-dq-cay-fibonacci` — "Đếm số lời gọi của `fib` đệ quy trần rồi so với bản có ghi nhớ". Vẽ cây gọi `fib(5)`, bảng liệt kê từng giá trị `n` với số lần nó được tính lại. Chỗ then chốt: `fib(2)` bị tính lại 5 lần trong `fib(5)`, và số lần tính lại tăng theo cấp luỹ — đó là toàn bộ vấn đề. Chi phí: `O(2ⁿ)` xuống `O(n)`, và với `n = 50` là khác biệt giữa vài ngày và tức thì.
- `vd-dq-giai-truy-hoi-merge` — "Giải `T(n) = 2T(n/2) + O(n)` bằng cách đếm theo tầng". Bảng: mỗi tầng ghi số bài toán con, kích thước mỗi bài, tổng chi phí của tầng. Chỗ then chốt: mỗi tầng đều tốn đúng `O(n)`, và có `log₂n` tầng, nên tổng là `O(n log n)`. Chi phí: cách đếm theo tầng này dùng lại được cho mọi hệ thức dạng chia để trị, kể cả những cái không có trong ba mốc đã nhớ.

**Câu quiz `recall: true`:** hỏi về bài Độ phức tạp — với `n = 40`, một thuật toán `O(2ⁿ)` và một thuật toán `O(n²)` chênh nhau cỡ nào. Đáp án đúng: `2⁴⁰` khoảng `10¹²` còn `40²` là 1600, chênh khoảng một tỉ lần, tức khác biệt giữa nhiều giờ và tức thì.

**Ba bài tập kiểm tra:**

1. Cài `fib` ba cách — đệ quy trần, đệ quy có ghi nhớ, vòng lặp — rồi đếm số lời gọi của từng cách với `n` từ 10 tới 40.
2. Viết hàm đệ quy tính tổng một mảng bằng cách chia đôi, rồi viết hệ thức truy hồi của nó và giải bằng cách đếm theo tầng. So độ sâu ngăn xếp với cách đệ quy tuyến tính (mỗi lần bớt một phần tử).
3. Tìm độ sâu đệ quy tối đa mà máy bạn chịu được trước khi tràn ngăn xếp: viết hàm đệ quy tuyến tính chỉ cộng một, tăng dần `n` cho tới khi chương trình chết. Rồi thêm một mảng cục bộ 1000 số vào mỗi lời gọi và đo lại.

**Danh sách LeetCode (10 bài, đã xếp dễ tới khó):**

| no | name | slug | level |
|---|---|---|---|
| 509 | Fibonacci Number | `fibonacci-number` | Easy |
| 70 | Climbing Stairs | `climbing-stairs` | Easy |
| 206 | Reverse Linked List | `reverse-linked-list` | Easy |
| 21 | Merge Two Sorted Lists | `merge-two-sorted-lists` | Easy |
| 104 | Maximum Depth of Binary Tree | `maximum-depth-of-binary-tree` | Easy |
| 226 | Invert Binary Tree | `invert-binary-tree` | Easy |
| 50 | Pow(x, n) | `powx-n` | Medium |
| 241 | Different Ways to Add Parentheses | `different-ways-to-add-parentheses` | Medium |
| 395 | Longest Substring with At Least K Repeating Characters | `longest-substring-with-at-least-k-repeating-characters` | Medium |
| 4 | Median of Two Sorted Arrays | `median-of-two-sorted-arrays` | Hard |

- [ ] **Step 1: Đọc bài mẫu** — `src/content/bang-bam.md` trọn vẹn, lấy làm mốc độ dài, giọng văn và cách dùng bốn chỉ thị. KHÔNG đọc file nào khác.
- [ ] **Step 2: Viết `src/data/lessons/de-quy.js`** theo mục A của khuôn chuẩn, dùng nội dung đã chỉ định ở trên.
- [ ] **Step 3: Viết `src/content/de-quy.md`** theo mục B. Sáu khái niệm gom thành 4 tiêu đề `h3`: ẩn dụ hàng người và ba thành phần; ngăn xếp lời gọi; cây đệ quy và hệ thức truy hồi; chia để trị và ghi nhớ.
- [ ] **Step 4: Bật cờ `ready`** theo mục E. Không sửa `src/App.vue`.
- [ ] **Step 5: Chạy test** — `npm run test -- --run`, PASS toàn bộ.
- [ ] **Step 6: Chạy build** — `npm run build`, không cảnh báo mới.
- [ ] **Step 7: Kiểm chứng bằng mắt** theo mục H.
- [ ] **Step 8: Commit**

```bash
git add src/data/lessons src/content src/lesson/parts.js
git commit -m "content: bai De quy va he thuc truy hoi"
```

---
## Task 4: Bài `danh-sach-lien-ket` — Danh sách liên kết

Bài cuối Chương 1. Dự án của chương nằm ở section riêng và đã có dữ liệu sẵn ở `src/data/capstones/nen-mong.js` — bài này không dựng nó, và cũng không có dự án của riêng mình.

**Files:**
- Create: `src/data/lessons/danh-sach-lien-ket.js`
- Create: `src/content/danh-sach-lien-ket.md`
- Modify: `src/lesson/parts.js` (chỉ dòng cờ của bài này)

**Interfaces:**
- Consumes: khung ở mục "Khuôn chuẩn viết một bài"; `capstoneCuaChuong` từ `src/data/capstones/index.js`; `mang-chuoi` để so sánh và để nhắc ở câu `recall`.
- Produces: `core::List<T>` — mảnh cuối của thư viện `core`. MVP Chương 3 dùng nó làm xương sống LRU cache.

Tiền tố id cho `h3` và ví dụ: `dsll`.

**Ẩn dụ mở bài:** trò truy tìm kho báu. Bạn nhận một mẩu giấy, trên đó ghi một manh mối và chỗ giấu mẩu giấy tiếp theo. Bạn không biết có bao nhiêu mẩu, cũng không nhảy thẳng tới mẩu thứ bảy được — phải đi lần lượt. Đổi lại, muốn chèn một mẩu mới vào giữa thì chỉ cần sửa đúng một dòng địa chỉ trên mẩu trước nó, không phải viết lại cả trò chơi.

**Khái niệm bắt buộc phủ, theo đúng thứ tự này:**

1. Nút và con trỏ: một nút giữ dữ liệu cộng địa chỉ nút sau. Danh sách chính là con trỏ tới nút đầu. Vẽ bằng khối `pre` hoặc bảng, không cần hình.
2. Bảng đánh đổi so với mảng, dùng `formula-table` với các dòng: đọc phần tử thứ `i`, thêm vào đầu, thêm vào cuối, chèn khi đã cầm con trỏ tới chỗ chèn, tìm theo giá trị, bộ nhớ phụ, tính thân thiện với cache. Phải nói rõ điểm mấu chốt: danh sách liên kết chèn xoá `O(1)` **chỉ khi đã cầm con trỏ**; nếu phải tìm chỗ trước thì vẫn là `O(n)` và mảng không hề thua.
3. Vì sao mảng thường thắng trong thực tế dù bảng chi phí có vẻ xấu hơn: các nút nằm rải rác nên mỗi bước nhảy là một lần trượt cache, còn mảng đọc theo khối. Nối lại mô hình bộ nhớ ở bài Độ phức tạp và phần locality ở bài Mảng.
4. Đơn, đôi và vòng: mỗi loại thêm được gì, tốn thêm gì. Danh sách đôi cho xoá `O(1)` khi cầm chính nút cần xoá — đúng điều LRU cache cần.
5. Nút giả ở đầu: vì sao thêm một nút rỗng làm biến mất toàn bộ nhóm lỗi "danh sách đang trống" và "xoá đúng nút đầu". Kèm code C++ ngắn cho `push_front` và `erase_after`.
6. Hai con trỏ nhanh chậm: tìm nút giữa trong một lượt đi, và phát hiện chu trình kiểu rùa và thỏ. Nói trước rằng khuôn mẫu hai con trỏ này sẽ thành một nhóm kiến thức riêng ở Chương 2.
7. Bộ nhớ: mỗi nút cấp phát riêng nên phải giải phóng riêng. Xoá nửa vời để lại rò rỉ, và rò rỉ trong vòng lặp thì chương trình chạy lâu sẽ chết.

**Hai ví dụ điển hình:**

- `vd-dsll-dao-danh-sach` — "Đảo ngược danh sách liên kết bằng ba con trỏ, chạy tay từng bước". Bảng chạy tay trên danh sách `1 → 2 → 3 → 4`, mỗi hàng ghi giá trị của `truoc`, `hien_tai`, `sau` và trạng thái danh sách sau bước đó. Chỗ then chốt: phải lưu `sau` trước khi sửa con trỏ của `hien_tai`, nếu không là mất phần còn lại của danh sách và không có cách nào tìm lại. Chi phí: `O(n)` thời gian, `O(1)` bộ nhớ phụ — đây là lý do bài này được hỏi nhiều, nó phân biệt người hiểu con trỏ với người thuộc lòng.
- `vd-dsll-rua-tho-phat-hien-chu-trinh` — "Rùa và thỏ: phát hiện danh sách có chu trình". Bảng: mỗi bước ghi vị trí rùa (đi 1 nhịp) và thỏ (đi 2 nhịp) trên một danh sách 6 nút có chu trình từ nút 6 về nút 3, cho tới khi hai con trùng nhau. Chỗ then chốt: nếu có chu trình thì khoảng cách giữa thỏ và rùa giảm đúng 1 mỗi bước, nên chúng chắc chắn gặp nhau; nếu không có chu trình thì thỏ ra khỏi danh sách trước. Chi phí: `O(n)` thời gian, `O(1)` bộ nhớ — hơn hẳn cách dùng bảng băm ghi lại các nút đã thăm, vốn tốn `O(n)` bộ nhớ.

**Câu quiz `recall: true`:** hỏi về bài Mảng — chèn một phần tử vào giữa mảng một triệu phần tử phải dịch bao nhiêu phần tử, và cùng việc đó trên danh sách liên kết khi đã cầm con trỏ tới chỗ chèn thì tốn bao nhiêu bước. Đáp án đúng: khoảng nửa triệu phép dịch so với đúng hai phép gán con trỏ.

**Ba bài tập kiểm tra:**

1. Cài `List<T>` đơn có nút giả, hỗ trợ `push_front`, `push_back`, `erase_after`, và duyệt bằng vòng lặp. Không rò rỉ bộ nhớ khi huỷ danh sách.
2. Cài hàm tìm nút giữa và hàm phát hiện chu trình bằng hai con trỏ, mỗi hàm chỉ đi qua danh sách đúng một lượt và không dùng thêm bộ nhớ phụ theo `n`.
3. Nạp một triệu số vào cả `Vec` bài trước và `List` bài này, rồi đo hai việc: cộng tổng toàn bộ phần tử, và chèn vào đầu một trăm nghìn lần. Giải thích vì sao mỗi cấu trúc thắng ở một việc, và vì sao khoảng cách ở việc cộng tổng lớn hơn con số Big-O gợi ý.

**Danh sách LeetCode (11 bài, đã xếp dễ tới khó):**

| no | name | slug | level |
|---|---|---|---|
| 206 | Reverse Linked List | `reverse-linked-list` | Easy |
| 21 | Merge Two Sorted Lists | `merge-two-sorted-lists` | Easy |
| 141 | Linked List Cycle | `linked-list-cycle` | Easy |
| 83 | Remove Duplicates from Sorted List | `remove-duplicates-from-sorted-list` | Easy |
| 876 | Middle of the Linked List | `middle-of-the-linked-list` | Easy |
| 160 | Intersection of Two Linked Lists | `intersection-of-two-linked-lists` | Easy |
| 234 | Palindrome Linked List | `palindrome-linked-list` | Easy |
| 92 | Reverse Linked List II | `reverse-linked-list-ii` | Medium |
| 19 | Remove Nth Node From End of List | `remove-nth-node-from-end-of-list` | Medium |
| 146 | LRU Cache | `lru-cache` | Medium |
| 23 | Merge k Sorted Lists | `merge-k-sorted-lists` | Hard |

- [ ] **Step 1: Đọc bài mẫu** — `src/content/bang-bam.md` và `src/data/lessons/bang-bam.js`. KHÔNG đọc file capstone nào: bài học không dựng dự án.
- [ ] **Step 2: Viết `src/data/lessons/danh-sach-lien-ket.js`** theo mục A của khuôn chuẩn.
- [ ] **Step 3: Viết `src/content/danh-sach-lien-ket.md`** theo mục B. Bảy khái niệm gom thành 5 tiêu đề `h3`: ẩn dụ và cấu tạo nút; bảng đánh đổi với mảng; vì sao mảng thường thắng trong thực tế; đơn đôi vòng và nút giả; hai con trỏ nhanh chậm và chuyện bộ nhớ.
- [ ] **Step 4: Bật cờ `ready`** theo mục E. Không sửa `src/App.vue`.
- [ ] **Step 5: Chạy test** — `npm run test -- --run`.
- [ ] **Step 6: Chạy build** — `npm run build`, không cảnh báo mới.
- [ ] **Step 7: Kiểm chứng bằng mắt** theo mục H, cộng thêm: Chương 1 giờ đủ 4 bài không còn nhãn "sắp có", và mục "Dự án thực hành" của chương vẫn bấm được như trước.
- [ ] **Step 8: Commit**

```bash
git add src/data/lessons src/content src/lesson/parts.js
git commit -m "content: bai Danh sach lien ket"
```

**Điểm dừng giao được.** Sau task này Chương 1 học được trọn vẹn: bốn bài liền mạch, kết bằng dự án thực hành của chương. Phiên có thể kết thúc ở đây.

---
## Task 5: Bài `sap-xep` — Sắp xếp: merge, quick, counting

**Files:**
- Create: `src/data/lessons/sap-xep.js`
- Create: `src/content/sap-xep.md`
- Modify: `src/lesson/parts.js` (chỉ dòng cờ của bài này)

**Interfaces:**
- Consumes: khung ở mục "Khuôn chuẩn viết một bài"; hệ thức truy hồi `T(n) = 2T(n/2) + O(n)` đã dạy ở `de-quy`, bài này dùng lại chứ không giải thích lại từ đầu; `core::Vec` của `mang-chuoi`.
- Produces: module `sorting` — MVP Chương 3 dùng nó để dựng từ điển, MVP Chương 6 dùng nó để sắp ca theo giờ kết thúc.

Tiền tố id cho `h3` và ví dụ: `sx`.

**Ẩn dụ mở bài:** chia đôi cọc bài. Bạn có một cọc trăm lá lộn xộn. Chia thành hai nửa, nhờ hai người bạn mỗi người sắp một nửa, rồi bạn chỉ việc lật hai lá trên cùng của hai cọc đã sắp và lấy lá nhỏ hơn. Việc của bạn nhẹ đi hẳn, và hai người bạn kia cũng làm đúng cách đó với nửa của mình.

**Khái niệm bắt buộc phủ, theo đúng thứ tự này:**

1. Merge sort: chia đôi, sắp mỗi nửa, trộn hai nửa đã sắp. Chi phí viết thành `T(n) = 2T(n/2) + O(n)` — nhắc lại rằng bài Đệ quy đã giải hệ thức này ra `O(n log n)`, và chỉ tóm lại một câu. Cần `O(n)` bộ nhớ phụ.
2. Quicksort: chọn chốt, phân hoạch quanh chốt, đệ quy hai bên. Không cần bộ nhớ phụ, hằng số nhỏ nên thực tế nhanh hơn merge sort. Nhưng xấu nhất là `O(n²)` khi chốt luôn rơi vào cực trị — và mảng đã sắp sẵn chính là ca xấu nhất nếu lấy phần tử đầu làm chốt.
3. **Thuật toán ngẫu nhiên** — công cụ chính của bài. Chọn chốt ngẫu nhiên không làm ca xấu nhất biến mất, nó làm ca xấu nhất không còn phụ thuộc dữ liệu vào. Xác suất gặp `O(n²)` nhỏ đến mức bỏ qua được, và không đối thủ nào dựng được dữ liệu hại bạn. Phải nói rõ phân biệt: kỳ vọng `O(n log n)` khác với chắc chắn `O(n log n)`.
4. Tính ổn định: hai phần tử bằng nhau có giữ nguyên thứ tự tương đối không. Nêu bối cảnh thật để thấy nó không phải chuyện hàn lâm — sắp danh sách nhân viên theo phòng sau khi đã sắp theo tên, nếu thuật toán không ổn định thì thứ tự tên trong mỗi phòng bị phá. Merge sort ổn định, quicksort thì không.
5. Cận dưới `Ω(n log n)` cho mọi thuật toán dựa trên so sánh, giải thích bằng cây quyết định: `n!` kết quả có thể, mỗi phép so sánh chia đôi số khả năng, nên cần tối thiểu `log₂(n!) ≈ n log n` phép so sánh. Đây là một cận dưới thật sự, không phải "chưa ai tìm ra cách nhanh hơn".
6. Counting sort và radix sort phá được cận đó vì chúng **không so sánh** phần tử với nhau, chúng dùng giá trị làm chỉ số. Counting sort là `O(n + k)` với `k` là miền giá trị — tuyệt vời khi `k` nhỏ, vô dụng khi `k` khổng lồ.
7. Bảng chọn thuật toán bằng `formula-table`: cột thuật toán, trung bình, xấu nhất, bộ nhớ phụ, ổn định, khi nào chọn. Đủ merge, quick, counting, và thêm dòng `std::sort` để nói rằng thư viện chuẩn thực tế dùng thuật toán lai.

**Hai ví dụ điển hình:**

- `vd-sx-tron-hai-nua` — "Trộn hai nửa đã sắp, chạy tay từng bước". Bảng chạy tay trộn `[1, 4, 7]` với `[2, 3, 9]`: mỗi hàng ghi phần tử đang so ở mỗi nửa, phần tử được lấy, và mảng kết quả tới lúc đó. Chỗ then chốt: mỗi phần tử được nhìn đúng một lần, đó là lý do bước trộn tốn `O(n)` chứ không phải `O(n²)`, và cũng là lý do phải giữ hai chỉ số riêng thay vì tìm lại từ đầu. Chi phí: `O(n)` cho một tầng trộn, `log₂n` tầng, tổng `O(n log n)`.
- `vd-sx-phan-hoach-quick` — "Phân hoạch quanh chốt và ca xấu nhất". Phần một: bảng chạy tay phân hoạch `[5, 2, 8, 1, 9, 3]` với chốt là phần tử cuối, mỗi hàng ghi chỉ số đang xét, so với chốt, có đổi chỗ không, trạng thái mảng. Phần hai: bảng cho thấy nếu mảng đã sắp `[1, 2, 3, 4, 5]` và lấy phần tử cuối làm chốt thì mỗi lần phân hoạch chỉ bớt được đúng một phần tử, thành `n` tầng thay vì `log n` tầng. Chỗ then chốt: ca xấu nhất của quicksort không phải dữ liệu kỳ dị, nó là dữ liệu đã sắp — thứ gặp suốt trong thực tế. Chi phí: `O(n log n)` kỳ vọng khi chốt ngẫu nhiên, `O(n²)` khi chốt cố định gặp dữ liệu đã sắp.

**Câu quiz `recall: true`:** hỏi về bài Đệ quy — cho hệ thức `T(n) = 2T(n/2) + O(n)`, giải bằng cách đếm theo tầng thì mỗi tầng tốn bao nhiêu và có bao nhiêu tầng. Đáp án đúng: mỗi tầng `O(n)`, có `log₂n` tầng, tổng `O(n log n)`.

**Ba bài tập kiểm tra:**

1. Cài merge sort và quicksort trên `Vec` của bạn, rồi kiểm cả hai bằng cùng một bộ ca: mảng rỗng, một phần tử, đã sắp, sắp ngược, toàn phần tử giống nhau, một triệu số ngẫu nhiên.
2. Cài quicksort hai bản — chốt là phần tử cuối, và chốt ngẫu nhiên — rồi chạy cả hai trên mảng đã sắp sẵn 100000 phần tử. Đo và giải thích khoảng cách.
3. Cài counting sort cho mảng số nguyên trong khoảng 0 tới 1000, rồi đo với `std::sort` trên một triệu phần tử. Sau đó đổi miền giá trị lên 0 tới 10⁹ và đo lại — giải thích vì sao counting sort không còn dùng được.

**Danh sách LeetCode (11 bài, đã xếp dễ tới khó):**

| no | name | slug | level |
|---|---|---|---|
| 88 | Merge Sorted Array | `merge-sorted-array` | Easy |
| 268 | Missing Number | `missing-number` | Easy |
| 1122 | Relative Sort Array | `relative-sort-array` | Easy |
| 561 | Array Partition | `array-partition` | Easy |
| 75 | Sort Colors | `sort-colors` | Medium |
| 912 | Sort an Array | `sort-an-array` | Medium |
| 148 | Sort List | `sort-list` | Medium |
| 179 | Largest Number | `largest-number` | Medium |
| 56 | Merge Intervals | `merge-intervals` | Medium |
| 215 | Kth Largest Element in an Array | `kth-largest-element-in-an-array` | Medium |
| 493 | Reverse Pairs | `reverse-pairs` | Hard |

- [ ] **Step 1: Đọc bài mẫu** — `src/content/bang-bam.md` trọn vẹn, lấy làm mốc độ dài, giọng văn và cách dùng bốn chỉ thị. KHÔNG đọc file nào khác.
- [ ] **Step 2: Viết `src/data/lessons/sap-xep.js`** theo mục A của khuôn chuẩn.
- [ ] **Step 3: Viết `src/content/sap-xep.md`** theo mục B. Bảy khái niệm gom thành 5 tiêu đề `h3`: ẩn dụ cọc bài và merge sort; quicksort và chốt ngẫu nhiên; tính ổn định; cận dưới `n log n` và cách phá nó; bảng chọn thuật toán.
- [ ] **Step 4: Bật cờ `ready`** theo mục E. Không sửa `src/App.vue`.
- [ ] **Step 5: Chạy test** — `npm run test -- --run`, PASS toàn bộ.
- [ ] **Step 6: Chạy build** — `npm run build`, không cảnh báo mới.
- [ ] **Step 7: Kiểm chứng bằng mắt** theo mục H.
- [ ] **Step 8: Commit**

```bash
git add src/data/lessons src/content src/lesson/parts.js
git commit -m "content: bai Sap xep merge quick counting"
```

---

## Task 6: Bài `tim-kiem-nhi-phan` — Tìm kiếm nhị phân và tìm nhị phân trên đáp án

**Files:**
- Create: `src/data/lessons/tim-kiem-nhi-phan.js`
- Create: `src/content/tim-kiem-nhi-phan.md`
- Modify: `src/lesson/parts.js` (chỉ dòng cờ của bài này)

**Interfaces:**
- Consumes: khung ở mục "Khuôn chuẩn viết một bài"; module `sorting` của `sap-xep` — mảng phải sắp trước mới tìm nhị phân được.
- Produces: module `search` gồm `lower_bound`, `upper_bound` và truy vấn khoảng. MVP Chương 4 dùng nó làm mốc so sánh cho index cây.

Tiền tố id cho `h3` và ví dụ: `tknp`.

**Ẩn dụ mở bài:** tra từ điển giấy. Bạn tìm từ "muối" trong quyển từ điển dày hai nghìn trang. Không ai bắt đầu từ trang 1. Bạn mở giữa quyển, thấy chữ "n", biết "muối" ở phía trước, và cả nửa sau của quyển sách vừa biến mất khỏi bài toán. Mở giữa nửa còn lại, lại bỏ đi một nửa. Hai nghìn trang chỉ cần chừng mười một lần mở.

**Khái niệm bắt buộc phủ, theo đúng thứ tự này:**

1. Điều kiện dùng được: dãy phải đơn điệu theo tiêu chí đang xét. Không sắp thì không dùng được — nên chi phí thật của "tìm nhị phân một lần" là `O(n log n)` để sắp cộng `O(log n)` để tìm. Chỉ đáng khi tìm nhiều lần trên cùng dữ liệu.
2. Số lần chia đôi là `log₂n`: bảng nhỏ cho thấy `n = 10⁶` cần 20 lần, `n = 10⁹` cần 30 lần. Nối lại bảng mốc phản xạ ở bài Độ phức tạp.
3. **Bất biến vòng lặp và chứng minh bằng quy nạp** — công cụ chính của bài. Phát biểu bất biến rõ ràng, ví dụ "nếu đáp án tồn tại thì nó nằm trong nửa khoảng `[lo, hi)`", rồi chỉ ra ba việc: bất biến đúng trước vòng lặp, mỗi bước lặp giữ nó đúng, và khi vòng lặp dừng thì bất biến cộng điều kiện dừng cho ra kết quả. Đây là cách chứng minh một vòng lặp đúng, không riêng gì tìm nhị phân — nói rõ điều đó.
4. Ba cái bẫy cài đặt, mỗi cái một câu và một dòng code: `mid = (lo + hi) / 2` tràn số với chỉ số lớn, phải viết `lo + (hi - lo) / 2`; nhầm khoảng đóng với nửa mở làm vòng lặp chạy mãi hoặc bỏ sót phần tử; cập nhật `lo = mid` thay vì `lo = mid + 1` làm khoảng không co lại.
5. `lower_bound` và `upper_bound`: thay vì hỏi "có phần tử này không", hỏi "phần tử đầu tiên không nhỏ hơn `x` nằm ở đâu". Đây là dạng dùng được nhiều nhất, vì nó trả lời cả câu hỏi tồn tại, câu hỏi đếm số lần xuất hiện, và câu hỏi truy vấn khoảng.
6. Tìm nhị phân trên đáp án: khi bài toán không cho một mảng nào cả. Điều kiện là có một hàm kiểm `duoc(x)` đơn điệu — `duoc(x)` đúng thì mọi giá trị lớn hơn `x` cũng đúng. Khi đó tìm nhị phân trên miền đáp án. Đây là kỹ thuật mạnh nhất của bài và là chỗ người học thấy tìm nhị phân không phải chuyện tra mảng.

**Hai ví dụ điển hình:**

- `vd-tknp-bat-bien-lo-hi` — "Tìm 7 trong mảng đã sắp, theo dõi bất biến từng bước". Bảng chạy tay trên `[1, 3, 5, 7, 9, 11, 13]`: mỗi hàng ghi `lo`, `hi`, `mid`, giá trị tại `mid`, so với 7, khoảng còn lại, và bất biến còn đúng không. Chỗ then chốt: khoảng luôn co lại thật sự ở mỗi bước — nếu có một bước nào khoảng không nhỏ đi thì vòng lặp chạy mãi, và đó chính là lỗi phổ biến nhất. Chi phí: `O(log n)`, với `n = 7` là ba bước.
- `vd-tknp-tim-tren-dap-an-chia-keo` — "Chia `n` gói kẹo cho `k` đứa trẻ, tối đa hoá số kẹo đứa ít nhất nhận được". Nêu đề rõ ràng bằng số cụ thể. Bảng: mỗi hàng là một giá trị `x` đang thử, kết quả `duoc(x)` (chia được cho `k` đứa mỗi đứa ít nhất `x` kẹo hay không), và khoảng đáp án còn lại. Chỗ then chốt: không có mảng nào để tìm cả — thứ đang được chia đôi là **miền đáp án**, và điều làm việc đó hợp lệ là tính đơn điệu của `duoc`. Nếu `duoc` không đơn điệu thì kỹ thuật này sai hoàn toàn, nên bước đầu tiên bao giờ cũng là chứng minh nó đơn điệu. Chi phí: `O(n log(giá trị lớn nhất))`.

**Câu quiz `recall: true`:** hỏi về bài Sắp xếp — muốn tìm nhị phân trên một mảng chưa sắp thì tổng chi phí là bao nhiêu, và khi nào việc sắp trước mới đáng. Đáp án đúng: `O(n log n)` để sắp cộng `O(log n)` mỗi lần tìm, chỉ đáng khi số lần tìm đủ lớn; tìm đúng một lần thì quét tuyến tính `O(n)` còn nhanh hơn.

**Ba bài tập kiểm tra:**

1. Cài `lower_bound` và `upper_bound` bằng nửa khoảng `[lo, hi)`, rồi dùng chúng để đếm số lần xuất hiện của một giá trị và để trả lời truy vấn "có bao nhiêu phần tử trong khoảng từ `a` tới `b`". Kiểm với mảng có phần tử trùng lặp, mảng rỗng, và giá trị nằm ngoài hai đầu.
2. Viết bài chia kẹo ở ví dụ hai thành chương trình chạy được, và bắt buộc viết ra bằng lời chứng minh hàm kiểm của bạn đơn điệu trước khi cài.
3. Cài tìm nhị phân bằng đệ quy rồi bằng vòng lặp, so độ sâu ngăn xếp và thời gian trên mảng mười triệu phần tử. Rồi cố tình viết `mid = (lo + hi) / 2` với chỉ số kiểu `int` và mảng đủ lớn để thấy tràn số xảy ra.

**Danh sách LeetCode (11 bài, đã xếp dễ tới khó):**

| no | name | slug | level |
|---|---|---|---|
| 704 | Binary Search | `binary-search` | Easy |
| 35 | Search Insert Position | `search-insert-position` | Easy |
| 278 | First Bad Version | `first-bad-version` | Easy |
| 374 | Guess Number Higher or Lower | `guess-number-higher-or-lower` | Easy |
| 69 | Sqrt(x) | `sqrtx` | Easy |
| 33 | Search in Rotated Sorted Array | `search-in-rotated-sorted-array` | Medium |
| 153 | Find Minimum in Rotated Sorted Array | `find-minimum-in-rotated-sorted-array` | Medium |
| 34 | Find First and Last Position of Element in Sorted Array | `find-first-and-last-position-of-element-in-sorted-array` | Medium |
| 875 | Koko Eating Bananas | `koko-eating-bananas` | Medium |
| 1011 | Capacity To Ship Packages Within D Days | `capacity-to-ship-packages-within-d-days` | Medium |
| 4 | Median of Two Sorted Arrays | `median-of-two-sorted-arrays` | Hard |

- [ ] **Step 1: Đọc bài mẫu** — `src/content/bang-bam.md` trọn vẹn, lấy làm mốc độ dài, giọng văn và cách dùng bốn chỉ thị. KHÔNG đọc file nào khác.
- [ ] **Step 2: Viết `src/data/lessons/tim-kiem-nhi-phan.js`** theo mục A của khuôn chuẩn.
- [ ] **Step 3: Viết `src/content/tim-kiem-nhi-phan.md`** theo mục B. Sáu khái niệm gom thành 5 tiêu đề `h3`: ẩn dụ từ điển và điều kiện đơn điệu; bất biến vòng lặp và chứng minh quy nạp; ba cái bẫy cài đặt; `lower_bound` và `upper_bound`; tìm nhị phân trên đáp án.
- [ ] **Step 4: Bật cờ `ready`** theo mục E. Không sửa `src/App.vue`.
- [ ] **Step 5: Chạy test** — `npm run test -- --run`, PASS toàn bộ.
- [ ] **Step 6: Chạy build** — `npm run build`, không cảnh báo mới.
- [ ] **Step 7: Kiểm chứng bằng mắt** theo mục H.
- [ ] **Step 8: Commit**

```bash
git add src/data/lessons src/content src/lesson/parts.js
git commit -m "content: bai Tim kiem nhi phan va tim tren dap an"
```

---
## Task 7: Bài `hai-con-tro-cua-so-truot` — Hai con trỏ và cửa sổ trượt

**Files:**
- Create: `src/data/lessons/hai-con-tro-cua-so-truot.js`
- Create: `src/content/hai-con-tro-cua-so-truot.md`
- Modify: `src/lesson/parts.js` (chỉ dòng cờ của bài này)

**Interfaces:**
- Consumes: khung ở mục "Khuôn chuẩn viết một bài"; `bang-bam` cho phần đếm trong cửa sổ và cho câu `recall`; `core::Str::split` của `mang-chuoi`.
- Produces: module `window` — quét dữ liệu theo khung thời gian. MVP Chương 2 dùng nó để trả lời câu hỏi "khung 5 phút nào tải cao nhất".

Tiền tố id cho `h3` và ví dụ: `hct`.

**Ẩn dụ mở bài:** khung ngắm di chuyển dọc một dãy ảnh. Bạn cần tìm đoạn năm ảnh liền nhau sáng nhất trong một dải nghìn ảnh. Cách ngây thơ là với mỗi vị trí, cộng lại độ sáng của năm ảnh. Nhưng khi khung trượt sang phải một bước, bốn ảnh ở giữa vẫn nằm trong khung — chỉ có một ảnh rời ra bên trái và một ảnh vào thêm bên phải. Vậy chỉ cần trừ một, cộng một, chứ không phải cộng lại từ đầu.

**Khái niệm bắt buộc phủ, theo đúng thứ tự này:**

1. Hai con trỏ ngược chiều trên mảng đã sắp: một con ở đầu, một con ở cuối, so tổng với đích rồi quyết định co bên nào. Vì sao đúng: khi tổng lớn quá thì mọi cặp có con trỏ phải hiện tại đều lớn quá, nên bỏ hẳn được một cột. Đây lại là một bất biến vòng lặp, nối lại bài trước.
2. Hai con trỏ cùng chiều nhanh và chậm: con chậm giữ chỗ ghi, con nhanh đi đọc. Khuôn mẫu lọc bỏ phần tử tại chỗ mà không cần mảng phụ.
3. Cửa sổ cố định: trượt và cập nhật tổng bằng trừ một cộng một. Chi phí từ `O(n·k)` xuống `O(n)`.
4. Cửa sổ co giãn: mở rộng bên phải khi còn hợp lệ, co bên trái khi vi phạm điều kiện. Cần nêu rõ khi nào dùng được: điều kiện phải có tính đơn điệu theo bề rộng cửa sổ — mở rộng thì chỉ có thể vi phạm thêm, co lại thì chỉ có thể hợp lệ hơn. Nếu không có tính chất đó thì cửa sổ trượt sai.
5. **Vì sao tổng chi phí là `O(n)` dù code có hai vòng lặp lồng nhau** — đây là ý dễ hiểu sai nhất của bài. Đừng đếm vòng lặp, hãy đếm bước đi của từng con trỏ: mỗi con trỏ chỉ đi tiến, và mỗi con đi nhiều nhất `n` bước, nên tổng số bước nhiều nhất là `2n`. Đây là lối phân tích khấu trừ, cùng lối bạn dùng cho mảng động ở Chương 1, chỉ áp cho một chỗ khác.
6. Kết hợp bảng băm trong cửa sổ: khi điều kiện là "không có ký tự lặp" hay "chứa đủ các ký tự cần thiết" thì cửa sổ phải giữ một bảng đếm. Nối lại bài Bảng băm.
7. Bảng nhận dạng bằng `formula-table`: cột dấu hiệu của đề bài, cột khuôn mẫu nên dùng. Các dòng: "mảng đã sắp, tìm cặp có tổng bằng x" → hai con trỏ ngược chiều; "đoạn liền nhau độ dài đúng k" → cửa sổ cố định; "đoạn liền nhau dài nhất thoả điều kiện" → cửa sổ co giãn; "lọc bỏ tại chỗ" → nhanh chậm; "đoạn có tổng bằng k, có số âm" → không dùng được cửa sổ trượt, phải chờ tổng tiền tố ở bài sau.

**Hai ví dụ điển hình:**

- `vd-hct-tong-hai-so-mang-da-sap` — "Tìm hai số có tổng bằng 12 trong mảng đã sắp, chạy tay". Bảng chạy tay trên `[1, 3, 5, 7, 9, 11]` với đích 12: mỗi hàng ghi chỉ số trái, chỉ số phải, hai giá trị, tổng, so với đích, và hành động. Chỗ then chốt: khi tổng lớn hơn đích, ta bỏ con trỏ phải đi một bước và **bỏ luôn mọi cặp chứa phần tử đó** — đó là lý do thuật toán chỉ mất `O(n)` thay vì `O(n²)`, và cũng là lý do nó đòi mảng phải sắp trước. Chi phí: `O(n)` sau khi đã sắp, `O(1)` bộ nhớ phụ.
- `vd-cst-cua-so-co-gian-khong-lap-ky-tu` — "Đoạn con dài nhất không có ký tự lặp trong chuỗi `abcabcbb`". Bảng chạy tay: mỗi hàng ghi ký tự vừa vào, cửa sổ hiện tại, bảng đếm ký tự trong cửa sổ, có vi phạm không, hành động co trái, độ dài tốt nhất tới lúc đó. Chỗ then chốt: khi gặp ký tự lặp, cửa sổ co trái **cho tới khi hết vi phạm** rồi mới đi tiếp — con trỏ trái không bao giờ quay lui, và chính điều đó giữ tổng chi phí ở `O(n)` dù vòng lặp co nằm trong vòng lặp mở. Chi phí: `O(n)` thời gian, `O(số ký tự khác nhau)` bộ nhớ.

**Câu quiz `recall: true`:** hỏi về bài Bảng băm — trong cửa sổ co giãn cần biết ký tự nào đang có mặt bao nhiêu lần, dùng cấu trúc gì và mỗi lần cập nhật tốn bao nhiêu. Đáp án đúng: một bảng băm hoặc mảng đếm, cập nhật `O(1)` trung bình, nên nó không làm hỏng tổng chi phí `O(n)` của cửa sổ.

**Ba bài tập kiểm tra:**

1. Cài ba khuôn mẫu cơ bản thành ba hàm riêng: hai con trỏ ngược chiều tìm cặp có tổng cho trước; nhanh chậm lọc bỏ phần tử bằng một giá trị tại chỗ; cửa sổ cố định tìm đoạn `k` phần tử có tổng lớn nhất.
2. Cài cửa sổ co giãn tìm đoạn ngắn nhất có tổng không nhỏ hơn `S` với mảng toàn số dương. Rồi thử lại trên mảng có số âm và giải thích bằng một phản ví dụ cụ thể vì sao kết quả sai.
3. Đếm số bước đi của từng con trỏ trong bài cửa sổ co giãn không lặp ký tự, in ra tổng số bước với chuỗi 100000 ký tự, và đối chiếu với cận `2n` bạn dự đoán.

**Danh sách LeetCode (11 bài, đã xếp dễ tới khó):**

| no | name | slug | level |
|---|---|---|---|
| 167 | Two Sum II - Input Array Is Sorted | `two-sum-ii-input-array-is-sorted` | Easy |
| 125 | Valid Palindrome | `valid-palindrome` | Easy |
| 283 | Move Zeroes | `move-zeroes` | Easy |
| 26 | Remove Duplicates from Sorted Array | `remove-duplicates-from-sorted-array` | Easy |
| 643 | Maximum Average Subarray I | `maximum-average-subarray-i` | Easy |
| 3 | Longest Substring Without Repeating Characters | `longest-substring-without-repeating-characters` | Medium |
| 209 | Minimum Size Subarray Sum | `minimum-size-subarray-sum` | Medium |
| 424 | Longest Repeating Character Replacement | `longest-repeating-character-replacement` | Medium |
| 15 | 3Sum | `3sum` | Medium |
| 11 | Container With Most Water | `container-with-most-water` | Medium |
| 76 | Minimum Window Substring | `minimum-window-substring` | Hard |

- [ ] **Step 1: Đọc bài mẫu** — `src/content/bang-bam.md` trọn vẹn, lấy làm mốc độ dài, giọng văn và cách dùng bốn chỉ thị. KHÔNG đọc file nào khác.
- [ ] **Step 2: Viết `src/data/lessons/hai-con-tro-cua-so-truot.js`** theo mục A của khuôn chuẩn.
- [ ] **Step 3: Viết `src/content/hai-con-tro-cua-so-truot.md`** theo mục B. Bảy khái niệm gom thành 5 tiêu đề `h3`: ẩn dụ khung ngắm và hai con trỏ ngược chiều; nhanh chậm; cửa sổ cố định và co giãn; vì sao tổng chi phí là `O(n)`; bảng nhận dạng khuôn mẫu.
- [ ] **Step 4: Bật cờ `ready`** theo mục E. Không sửa `src/App.vue`.
- [ ] **Step 5: Chạy test** — `npm run test -- --run`, PASS toàn bộ.
- [ ] **Step 6: Chạy build** — `npm run build`, không cảnh báo mới.
- [ ] **Step 7: Kiểm chứng bằng mắt** theo mục H.
- [ ] **Step 8: Commit**

```bash
git add src/data/lessons src/content src/lesson/parts.js
git commit -m "content: bai Hai con tro va cua so truot"
```

---

## Task 8: Dự án Chương 2 — Bộ phân tích log máy chủ

Làm theo mục "Khuôn chuẩn viết một dự án chương", sáu bước A tới F. Đọc lại ba luật ở đầu mục đó trước khi viết dòng dữ liệu đầu tiên.

**Files:**
- Create: `src/data/capstones/xu-ly-day.js`
- Modify: `src/data/capstones/index.js`, `src/lesson/parts.js`

**Interfaces:**
- Consumes: mục "Dự án Chương 2 — Bộ phân tích log máy chủ" trong `docs/superpowers/specs/2026-08-09-dac-ta-7-mvp.md` (từ dòng 211). Đọc trọn mục đó trước khi viết.
- Produces: `capstones['xu-ly-day']`. Bài `tong-tien-to` ở Task 9 hiển thị nó.

**Giá trị bắt buộc, không được suy diễn khác:**

- `uses`: `['sap-xep', 'tim-kiem-nhi-phan', 'hai-con-tro-cua-so-truot', 'tong-tien-to']`
- `reuses`: `[{ chapter: 1, module: 'core' }, { chapter: 1, module: 'bench' }]` — đúng hai dòng của bảng kế thừa trong đặc tả: `core` dùng `Str::split` để tách dòng log và `Vec` để chứa bản ghi; `bench` để đo cả ba câu hỏi và so hai thuật toán sắp xếp.
- `data.url`: `https://ita.ee.lbl.gov/html/contrib/NASA-HTTP.html`
- `data.format` và `data.sample`: lấy đúng phần mô tả định dạng và khối 20 dòng mẫu trong đặc tả. Nếu đặc tả ghi ít hơn 20 dòng thì giữ đúng số dòng đặc tả có, không tự bịa thêm dòng.

- [ ] **Step 1: Đọc đặc tả** — mục Dự án Chương 2 trong `docs/superpowers/specs/2026-08-09-dac-ta-7-mvp.md`, trọn mục, và `src/data/capstones/nen-mong.js` để lấy khuôn.
- [ ] **Step 2: Viết `src/data/capstones/xu-ly-day.js`** theo mục A của khuôn chuẩn dự án chương.
- [ ] **Step 3: Khai báo trong `src/data/capstones/index.js`** theo mục B.
- [ ] **Step 4: Bật `capstoneReady: true`** cho chương `xu-ly-day` trong `CHAPTERS`.
- [ ] **Step 5: Chạy test** — `npm run test -- --run`. Bật cờ xong là luật schema `capstone` ép ngay, và section dự án của chương phải mount ra được.
- [ ] **Step 6: Chạy build** — `npm run build`, không cảnh báo mới.
- [ ] **Step 7: Commit**

```bash
git add src/data/capstones src/lesson/parts.js
git commit -m "content: du an Chuong 2 bo phan tich log may chu"
```

---

## Task 9: Bài `tong-tien-to` — Tổng tiền tố và mảng hiệu

Bài cuối Chương 2. Dự án của chương nằm ở section riêng, bài này không dựng nó — xem Task 8.

**Files:**
- Create: `src/data/lessons/tong-tien-to.js`
- Create: `src/content/tong-tien-to.md`
- Modify: `src/lesson/parts.js` (chỉ dòng cờ của bài này)

**Interfaces:**
- Consumes: khung ở mục "Khuôn chuẩn viết một bài"; `capstoneCuaChuong('xu-ly-day')` từ Task 8; `hai-con-tro-cua-so-truot` cho câu `recall`; `bang-bam` cho phần đếm đoạn con có tổng bằng `k`.
- Produces: module `prefix` và trình đọc log `parser` — MVP Chương 4 dùng lại cả hai để sinh CSV đầu vào và làm mốc so sánh cho index cây.

Tiền tố id cho `h3` và ví dụ: `ttt`.

**Ẩn dụ mở bài:** cột mốc ki-lô-mét trên đường quốc lộ. Không cột nào ghi "từ đây tới Đà Nẵng còn bao xa", chúng chỉ ghi khoảng cách tính từ điểm khởi đầu. Nhưng nhờ vậy bạn tính được quãng đường giữa hai điểm bất kỳ bằng đúng một phép trừ. Tốn công dựng mốc một lần, đổi lấy trả lời tức thì mãi mãi về sau.

**Khái niệm bắt buộc phủ, theo đúng thứ tự này:**

1. Đánh đổi tiền xử lý và truy vấn: bỏ `O(n)` một lần để mỗi truy vấn tụt từ `O(n)` xuống `O(1)`. Nêu rõ điểm hoà vốn: chỉ đáng khi số truy vấn đủ lớn — cùng lối lập luận của tìm nhị phân ở bài trước.
2. Tổng tiền tố một chiều: `S[0] = 0`, `S[i] = S[i-1] + a[i-1]`. Tổng đoạn `[l, r]` là `S[r+1] - S[l]`. Nói rõ vì sao nên có ô `S[0] = 0` và đánh chỉ số lệch một: nó xoá hẳn nhóm lỗi "đoạn bắt đầu từ phần tử đầu tiên".
3. Mảng hiệu, là bài toán ngược: cần cộng thêm `v` cho mọi phần tử trong đoạn `[l, r]`, nhiều lần, rồi mới đọc kết quả. Ghi `d[l] += v` và `d[r+1] -= v`, cuối cùng lấy tổng tiền tố của `d`. Mỗi cập nhật `O(1)` thay vì `O(độ dài đoạn)`.
4. Tổng tiền tố hai chiều: `S[i][j]` là tổng hình chữ nhật từ góc trên trái tới `(i, j)`. Công thức tổng một hình chữ nhật con dùng bốn ô, với dấu cộng trừ theo lối bù trừ. Phải giải thích vì sao có bốn số hạng chứ đừng chỉ đưa công thức.
5. Kết hợp bảng băm để đếm đoạn con có tổng bằng `k`: nếu `S[j] - S[i] = k` thì với mỗi `j` ta cần biết đã gặp bao nhiêu `S[i]` bằng `S[j] - k`. Đây là chỗ tổng tiền tố làm được điều cửa sổ trượt không làm được, vì dữ liệu có số âm. Nối thẳng vào bài Hai con trỏ vừa học và bài Bảng băm.
6. Giới hạn: tổng tiền tố hỏng khi dữ liệu bị cập nhật giữa các truy vấn, vì một lần sửa một phần tử làm sai toàn bộ hậu tố của `S`. Nói rõ đây chính là bài toán mà Chương 4 giải bằng Fenwick và Segment Tree, và người học sẽ gặp lại đúng câu này ở đó.

**Hai ví dụ điển hình:**

- `vd-ttt-truy-van-tong-doan` — "Dựng tổng tiền tố rồi trả lời năm truy vấn tổng đoạn". Bảng một: mảng `[3, 1, 4, 1, 5, 9, 2]` và dãy `S` dựng từng bước, kèm ô `S[0] = 0`. Bảng hai: năm truy vấn `[l, r]`, phép trừ cụ thể, kết quả, và số phép toán. Chỗ then chốt: nhờ ô `S[0] = 0`, truy vấn `[0, 3]` không cần trường hợp riêng nào cả — cứ `S[4] - S[0]`. Chi phí: `O(n)` dựng một lần, `O(1)` mỗi truy vấn; với một triệu truy vấn thì đây là khác biệt giữa `10¹²` và `10⁶` phép toán.
- `vd-mh-cong-doan-bang-mang-hieu` — "Ba lần cộng dải trên mảng 8 phần tử bằng mảng hiệu". Bảng: ba thao tác cộng đoạn, mỗi hàng ghi hai ô của `d` bị sửa; rồi một bảng lấy tổng tiền tố của `d` để ra kết quả cuối. Chỗ then chốt: `d[r+1] -= v` là chỗ dễ quên nhất, và quên nó thì phần đuôi mảng bị cộng thừa — lỗi này không báo gì, chỉ ra số sai. Chi phí: `O(1)` mỗi cập nhật cộng `O(n)` một lần ở cuối, so với `O(n)` mỗi cập nhật của cách ngây thơ.

**Câu quiz `recall: true`:** hỏi về bài Hai con trỏ và cửa sổ trượt — tìm đoạn con có tổng bằng `k` trên mảng **có số âm**, vì sao cửa sổ trượt sai và cách nào đúng. Đáp án đúng: cửa sổ trượt cần tính đơn điệu, mà thêm một số âm có thể làm tổng giảm, nên co hay mở đều không kết luận được; cách đúng là tổng tiền tố cộng bảng băm.

**Ba bài tập kiểm tra:**

1. Cài tổng tiền tố một chiều với ô `S[0] = 0`, trả lời truy vấn tổng đoạn `O(1)`, và kiểm với các ca biên: đoạn một phần tử, đoạn trọn mảng, `l = r`, mảng một phần tử.
2. Cài mảng hiệu cho bài toán đặt vé máy bay: cho danh sách các chuyến `(từ chuyến l tới chuyến r, thêm v khách)`, in ra số khách của từng chuyến. So với cách cộng thẳng từng đoạn, trên 100000 thao tác và 100000 chuyến.
3. Cài đếm số đoạn con có tổng bằng `k` bằng tổng tiền tố cộng bảng băm, trên mảng có cả số âm. Rồi cài lại bằng vét cạn hai vòng lặp và so kết quả trên 200 mảng ngẫu nhiên nhỏ để chắc chắn hai bản khớp nhau.

**Danh sách LeetCode (11 bài, đã xếp dễ tới khó):**

| no | name | slug | level |
|---|---|---|---|
| 1480 | Running Sum of 1d Array | `running-sum-of-1d-array` | Easy |
| 303 | Range Sum Query - Immutable | `range-sum-query-immutable` | Easy |
| 724 | Find Pivot Index | `find-pivot-index` | Easy |
| 1732 | Find the Highest Altitude | `find-the-highest-altitude` | Easy |
| 560 | Subarray Sum Equals K | `subarray-sum-equals-k` | Medium |
| 304 | Range Sum Query 2D - Immutable | `range-sum-query-2d-immutable` | Medium |
| 523 | Continuous Subarray Sum | `continuous-subarray-sum` | Medium |
| 1109 | Corporate Flight Bookings | `corporate-flight-bookings` | Medium |
| 974 | Subarray Sums Divisible by K | `subarray-sums-divisible-by-k` | Medium |
| 238 | Product of Array Except Self | `product-of-array-except-self` | Medium |
| 862 | Shortest Subarray with Sum at Least K | `shortest-subarray-with-sum-at-least-k` | Hard |

- [ ] **Step 1: Đọc bài mẫu** — `src/content/bang-bam.md` và `src/data/lessons/bang-bam.js`.
- [ ] **Step 2: Viết `src/data/lessons/tong-tien-to.js`** theo mục A của khuôn chuẩn.
- [ ] **Step 3: Viết `src/content/tong-tien-to.md`** theo mục B. Sáu khái niệm gom thành 5 tiêu đề `h3`: ẩn dụ cột mốc và đánh đổi tiền xử lý; tổng tiền tố một chiều; mảng hiệu; tổng tiền tố hai chiều; ghép bảng băm và giới hạn khi dữ liệu bị sửa.
- [ ] **Step 4: Bật cờ `ready`** theo mục E. Không sửa `src/App.vue`.
- [ ] **Step 5: Chạy test** — `npm run test -- --run`.
- [ ] **Step 6: Chạy build** — `npm run build`, không cảnh báo mới.
- [ ] **Step 7: Kiểm chứng bằng mắt** theo mục H, cộng thêm: Chương 2 đủ 4 bài không còn nhãn "sắp có".
- [ ] **Step 8: Commit**

```bash
git add src/data/lessons src/content src/lesson/parts.js
git commit -m "content: bai Tong tien to va mang hieu"
```

**Điểm dừng giao được.** Sau task này Chương 1 và Chương 2 xong trọn, 8 bài liền mạch và hai MVP. Phiên có thể kết thúc ở đây.

---
## Task 10: Bài `heap-hang-doi-uu-tien` — Heap và hàng đợi ưu tiên

**Files:**
- Create: `src/data/lessons/heap-hang-doi-uu-tien.js`
- Create: `src/content/heap-hang-doi-uu-tien.md`
- Modify: `src/lesson/parts.js` (chỉ dòng cờ của bài này)

**Interfaces:**
- Consumes: khung ở mục "Khuôn chuẩn viết một bài"; `ngan-xep-hang-doi` để đối chiếu ba kiểu hàng đợi; `bang-bam` cho câu `recall` và cho bài top-K; `sap-xep` để so heapsort.
- Produces: module `heap` — MVP Chương 5 dùng nó cho hàng đợi ưu tiên của Dijkstra và Prim, MVP Chương 6 dùng nó để lấy ca rẻ nhất trong tập khả thi.

Tiền tố id cho `h3` và ví dụ: `heap`.

**Ẩn dụ mở bài:** phòng cấp cứu bệnh viện. Người đến trước không được vào trước; ai nặng nhất vào trước. Nhưng phòng cấp cứu cũng không xếp toàn bộ bệnh nhân thành một danh sách theo thứ tự nặng nhẹ — làm vậy quá tốn công mỗi lần có người mới đến. Họ chỉ cần biết chắc một điều: ai đang nặng nhất. Heap là đúng cấu trúc cho yêu cầu đó — nó không sắp mọi thứ, nó chỉ luôn biết cái đầu bảng.

**Khái niệm bắt buộc phủ, theo đúng thứ tự này:**

1. Hàng đợi ưu tiên là hợp đồng, heap là một cách thực hiện. Nhắc lại đúng lối phân biệt ADT và cài đặt đã học ở bài Bảng băm, và cho một bảng `formula-table` các cách cài hợp đồng này: mảng chưa sắp (thêm `O(1)`, lấy nhỏ nhất `O(n)`), mảng đã sắp (thêm `O(n)`, lấy `O(1)`), cây tìm kiếm cân bằng (`O(log n)` cả hai, nhưng nặng), heap (`O(log n)` thêm, `O(1)` xem đỉnh, `O(log n)` lấy ra — nhẹ và nằm gọn trong một mảng).
2. Tính chất heap và cây nhị phân hoàn chỉnh: mọi nút không lớn hơn hai con của nó (heap nhỏ nhất). Nhấn mạnh nó **yếu hơn** sắp xếp rất nhiều — anh em cùng tầng không có quan hệ gì. Chính sự yếu đó là lý do heap rẻ.
3. Nhét cây vào mảng, không cần con trỏ nào: nút `i` có con là `2i+1` và `2i+2`, cha là `(i-1)/2`. Vì cây hoàn chỉnh nên mảng không có lỗ. Nói rõ lợi ích: dữ liệu nằm liền nhau nên rất thân thiện với cache, khác hẳn cây dựng bằng con trỏ — nối lại bài Danh sách liên kết.
4. Hai phép cơ bản: đẩy lên khi thêm phần tử vào cuối, kéo xuống khi lấy phần tử đỉnh ra và đưa phần tử cuối lên thay. Cả hai đi nhiều nhất theo chiều cao cây, mà chiều cao là `log₂n`. Kèm code C++ ngắn cho cả hai.
5. Dựng heap từ một mảng có sẵn tốn `O(n)`, không phải `O(n log n)`. Giải thích bằng cách đếm: nửa số nút là lá không phải làm gì, nút càng gần gốc càng ít, nên tổng công là `O(n)`. Đây là chi tiết đẹp và hay bị nói sai.
6. Ba ứng dụng, mỗi cái một đoạn ngắn: heapsort (`O(n log n)` tại chỗ, không cần bộ nhớ phụ, nhưng thực tế chậm hơn quicksort vì nhảy trong mảng nhiều); lấy top `K` phần tử lớn nhất bằng heap nhỏ nhất `K` phần tử, chi phí `O(n log K)` thay vì `O(n log n)`; hai heap úp mặt vào nhau để luôn biết trung vị của một dòng số đang chảy.
7. Giới hạn: heap không tìm được một phần tử bất kỳ nhanh, không duyệt theo thứ tự, và không đổi độ ưu tiên của một phần tử đang ở giữa nếu không giữ thêm bảng tra vị trí. Nói rõ chỗ cuối này, vì Dijkstra ở Chương 5 gặp đúng nó.

**Hai ví dụ điển hình:**

- `vd-heap-day-len-keo-xuong` — "Thêm bốn phần tử rồi lấy hai phần tử ra khỏi heap nhỏ nhất, chạy tay". Bảng chạy tay: khởi đầu heap `[2, 5, 8]`, lần lượt thêm `1`, rồi lấy đỉnh hai lần. Mỗi hàng ghi mảng trước, phép so sánh nào xảy ra, đổi chỗ nào, mảng sau. Chỗ then chốt: khi thêm `1` vào cuối, nó đi lên tận gốc qua hai lần đổi chỗ, đúng bằng chiều cao cây — chứ không phải quét cả mảng. Chi phí: `O(log n)` mỗi phép, với `n = 10⁶` là 20 bước.
- `vd-heap-top-k-tan-suat` — "Tìm 3 từ xuất hiện nhiều nhất trong một đoạn văn, dùng bảng băm cộng heap". Bảng một: đếm tần suất bằng bảng băm bạn đã viết ở bài Bảng băm. Bảng hai: duy trì một heap nhỏ nhất đúng 3 phần tử, mỗi hàng ghi từ đang xét, tần suất, so với đỉnh heap, có thay không, nội dung heap sau đó. Chỗ then chốt: dùng heap **nhỏ nhất** để tìm các phần tử **lớn nhất** — nghe ngược nhưng đúng, vì đỉnh của heap nhỏ nhất chính là ngưỡng để loại: cái gì không vượt được nó thì không vào top K. Chi phí: `O(n log K)` so với `O(n log n)` của cách sắp toàn bộ; với `n = 10⁶` và `K = 10` thì đó là khác biệt vài chục lần.

**Câu quiz `recall: true`:** hỏi về bài Bảng băm — muốn tìm 10 từ xuất hiện nhiều nhất trong một quyển sách nửa triệu từ, dùng bảng băm để làm gì và heap để làm gì, và tổng chi phí là bao nhiêu. Đáp án đúng: bảng băm đếm tần suất `O(n)`, heap `K` phần tử lọc top `O(n log K)`; tổng `O(n log K)`, không cần sắp toàn bộ.

**Ba bài tập kiểm tra:**

1. Cài heap nhỏ nhất trên `Vec` của bạn, có `push`, `top`, `pop`, và `build` từ một mảng có sẵn. Kiểm rằng `build` chỉ tốn `O(n)` bằng cách đếm số phép so sánh và đối chiếu với `n log n`.
2. Cài heapsort dùng heap của bạn, rồi đo với merge sort và quicksort của bài Sắp xếp trên một triệu số. Giải thích vì sao heapsort cùng `O(n log n)` mà chậm hơn quicksort trong thực tế.
3. Cài lớp theo dõi trung vị của một dòng số bằng hai heap, hỗ trợ thêm một số và hỏi trung vị hiện tại. Kiểm bằng cách so với việc sắp lại toàn bộ dãy sau mỗi lần thêm, trên 10000 số ngẫu nhiên.

**Danh sách LeetCode (10 bài, đã xếp dễ tới khó):**

| no | name | slug | level |
|---|---|---|---|
| 703 | Kth Largest Element in a Stream | `kth-largest-element-in-a-stream` | Easy |
| 1046 | Last Stone Weight | `last-stone-weight` | Easy |
| 215 | Kth Largest Element in an Array | `kth-largest-element-in-an-array` | Medium |
| 347 | Top K Frequent Elements | `top-k-frequent-elements` | Medium |
| 973 | K Closest Points to Origin | `k-closest-points-to-origin` | Medium |
| 621 | Task Scheduler | `task-scheduler` | Medium |
| 767 | Reorganize String | `reorganize-string` | Medium |
| 355 | Design Twitter | `design-twitter` | Medium |
| 23 | Merge k Sorted Lists | `merge-k-sorted-lists` | Hard |
| 295 | Find Median from Data Stream | `find-median-from-data-stream` | Hard |

- [ ] **Step 1: Đọc bài mẫu** — `src/content/bang-bam.md` trọn vẹn, lấy làm mốc độ dài, giọng văn và cách dùng bốn chỉ thị. KHÔNG đọc file nào khác.
- [ ] **Step 2: Viết `src/data/lessons/heap-hang-doi-uu-tien.js`** theo mục A của khuôn chuẩn.
- [ ] **Step 3: Viết `src/content/heap-hang-doi-uu-tien.md`** theo mục B. Bảy khái niệm gom thành 5 tiêu đề `h3`: ẩn dụ phòng cấp cứu, hợp đồng và bảng các cách cài; tính chất heap và cây hoàn chỉnh; nhét cây vào mảng; đẩy lên, kéo xuống và dựng heap `O(n)`; ba ứng dụng và giới hạn.
- [ ] **Step 4: Bật cờ `ready`** theo mục E. Không sửa `src/App.vue`.
- [ ] **Step 5: Chạy test** — `npm run test -- --run`, PASS toàn bộ.
- [ ] **Step 6: Chạy build** — `npm run build`, không cảnh báo mới.
- [ ] **Step 7: Kiểm chứng bằng mắt** theo mục H.
- [ ] **Step 8: Commit**

```bash
git add src/data/lessons src/content src/lesson/parts.js
git commit -m "content: bai Heap va hang doi uu tien"
```

---

## Task 11: Dự án Chương 3 — Máy gợi ý tìm kiếm

Làm theo mục "Khuôn chuẩn viết một dự án chương", sáu bước A tới F. Đọc lại ba luật ở đầu mục đó trước khi viết dòng dữ liệu đầu tiên.

**Files:**
- Create: `src/data/capstones/tra-cuu.js`
- Modify: `src/data/capstones/index.js`, `src/lesson/parts.js`

**Interfaces:**
- Consumes: mục "Dự án Chương 3 — Máy gợi ý tìm kiếm" trong `docs/superpowers/specs/2026-08-09-dac-ta-7-mvp.md` (từ dòng 294). Đọc trọn mục đó trước khi viết.
- Produces: `capstones['tra-cuu']`. Bài `trie` ở Task 12 hiển thị nó.

**Giá trị bắt buộc, không được suy diễn khác:**

- `uses`: `['ngan-xep-hang-doi', 'bang-bam', 'heap-hang-doi-uu-tien', 'trie']`
- `reuses`: `[{ chapter: 1, module: 'core' }, { chapter: 1, module: 'bench' }, { chapter: 2, module: 'sorting' }]` — đúng ba dòng của bảng kế thừa trong đặc tả: `core` cho `List` làm xương sống LRU và `Str` để chuẩn hoá từ; `bench` để đo và so trie với tìm nhị phân; `sorting` để sắp danh sách từ dựng nhánh so sánh bằng tìm nhị phân.
- `data.url`: dùng nguồn `WORDLIST` của đặc tả, `https://github.com/first20hours/google-10000-english`. Nếu đặc tả cũng nhắc `GUTENBERG` cho phần văn bản thì ghi nguồn đó vào `input`, còn `data.url` giữ một link duy nhất.
- `data.format` và `data.sample`: lấy đúng phần mô tả định dạng và khối dòng mẫu trong đặc tả.

- [ ] **Step 1: Đọc đặc tả** — mục Dự án Chương 3 trong spec, trọn mục, và `src/data/capstones/xu-ly-day.js` để lấy khuôn gần nhất.
- [ ] **Step 2: Viết `src/data/capstones/tra-cuu.js`** theo mục A của khuôn chuẩn dự án chương.
- [ ] **Step 3: Khai báo trong `src/data/capstones/index.js`** theo mục B.
- [ ] **Step 4: Bật `capstoneReady: true`** cho chương `tra-cuu`.
- [ ] **Step 5: Chạy test** — `npm run test -- --run`.
- [ ] **Step 6: Chạy build** — `npm run build`, không cảnh báo mới.
- [ ] **Step 7: Commit**

```bash
git add src/data/capstones src/lesson/parts.js
git commit -m "content: du an Chuong 3 may goi y tim kiem"
```

---

## Task 12: Bài `trie` — Trie, cây tiền tố

Bài cuối Chương 3. Dự án của chương nằm ở section riêng, bài này không dựng nó — xem Task 11.

**Files:**
- Create: `src/data/lessons/trie.js`
- Create: `src/content/trie.md`
- Modify: `src/lesson/parts.js` (chỉ dòng cờ của bài này)

**Interfaces:**
- Consumes: khung ở mục "Khuôn chuẩn viết một bài"; `capstoneCuaChuong('tra-cuu')` từ Task 11; `bang-bam` để so sánh và cho câu `recall`.
- Produces: module `trie` — MVP Chương 7 dùng nó làm chỉ mục đoạn văn bản để định vị nhanh.

Tiền tố id cho `h3` và ví dụ: `trie`.

**Ẩn dụ mở bài:** hộc tủ hồ sơ chia theo vần. Muốn tìm hồ sơ "Nguyễn Văn An", bạn không lật từng tờ trong hai mươi nghìn hồ sơ. Bạn mở hộc chữ N, rồi vách ngăn "Ng", rồi "Ngu"... Mỗi bước chỉ nhìn một chữ cái, và số bước bằng độ dài cái tên, không phụ thuộc trong tủ có hai mươi nghìn hay hai triệu hồ sơ. Và có một việc tủ hồ sơ làm được mà bảng băm không: mở hộc "Ng" ra là thấy ngay **toàn bộ** những người có tên bắt đầu bằng "Ng".

**Khái niệm bắt buộc phủ, theo đúng thứ tự này:**

1. Cấu tạo: mỗi nút giữ một bảng con theo ký tự, cộng một cờ đánh dấu "có một từ kết thúc tại đây". Ký tự không nằm trong nút, nó nằm trên cạnh — nói rõ điều này, đây là chỗ hay hiểu sai. Vẽ một trie chứa `to`, `toi`, `ton`, `tra` bằng khối `pre`.
2. Tra cứu tốn `O(m)` với `m` là độ dài khoá, hoàn toàn không phụ thuộc số từ trong trie. So với bảng băm cũng `O(m)` để băm chuỗi — nói thẳng ra rằng về tra cứu một khoá đầy đủ thì trie **không** nhanh hơn bảng băm, và ai bảo ngược lại là nói sai.
3. Vì sao vẫn cần trie: cờ kết thúc từ và việc tra tiền tố. Bảng `formula-table` so trie với bảng băm theo các dòng: tra một khoá đầy đủ, tra "có từ nào bắt đầu bằng `p` không", liệt kê mọi từ bắt đầu bằng `p`, liệt kê theo thứ tự từ điển, bộ nhớ, và tính thân thiện với cache. Bảng băm thua ở ba dòng giữa vì nó phá thứ tự và không có khái niệm tiền tố — đúng điều bài Bảng băm đã cảnh báo.
4. Tự động hoàn thành: tìm nút của tiền tố rồi duyệt cây con đó, thu mọi nút có cờ kết thúc. Nếu muốn xếp hạng gợi ý theo tần suất thì lưu thêm tần suất ở nút kết thúc và dùng heap `K` phần tử của bài trước.
5. Cái giá: bộ nhớ. Một nút với bảng 26 con trỏ tốn hơn 200 byte dù chỉ dùng một con. Ba cách giảm: dùng bảng băm nhỏ ở mỗi nút thay cho mảng cố định, nén chuỗi nút chỉ có một con thành một cạnh (radix tree), hoặc chấp nhận tốn nếu bộ từ điển nhỏ. Nói rõ trie là cấu trúc đánh đổi bộ nhớ lấy khả năng tra tiền tố.
6. Duyệt trie theo thứ tự ký tự cho ra danh sách từ đã sắp theo thứ tự từ điển, miễn phí. Đây là điều bảng băm không bao giờ làm được và là một lý do thật để chọn trie.

**Hai ví dụ điển hình:**

- `vd-trie-chen-va-tra-tien-to` — "Chèn `to`, `toi`, `ton`, `tra` rồi tra ba câu hỏi khác nhau". Bảng một: bốn lần chèn, mỗi hàng ghi từ, đường đi qua các nút, nút nào được tạo mới, nút nào đặt cờ kết thúc. Bảng hai: ba truy vấn — `to` có phải một từ không, `ton` có phải một từ không, có từ nào bắt đầu bằng `tr` không — mỗi hàng ghi đường đi và kết luận. Chỗ then chốt: `to` và `ton` đi qua cùng hai nút đầu, nên phân biệt "đây là một từ" với "đây chỉ là đường đi tới từ khác" hoàn toàn dựa vào cờ kết thúc; bỏ cờ đó là trie trả lời sai mà không báo gì. Chi phí: `O(m)` cho cả chèn và tra, `m` là độ dài từ.
- `vd-trie-goi-y-hoan-thanh` — "Gợi ý 2 từ phổ biến nhất bắt đầu bằng `to`". Trie chứa sáu từ kèm tần suất. Bảng: bước một đi tới nút của tiền tố `to`; bước hai duyệt cây con và liệt kê mọi từ kết thúc trong đó cùng tần suất; bước ba đưa qua heap nhỏ nhất 2 phần tử. Chỗ then chốt: chi phí bước hai tỉ lệ với số từ **trong nhánh đó**, không phải toàn bộ từ điển — nên gợi ý cho tiền tố dài thì rất nhanh, còn tiền tố một ký tự có thể phải duyệt gần cả cây, và đó là lý do máy gợi ý thật lưu sẵn top K ở mỗi nút. Chi phí: `O(m + số từ trong nhánh × log K)`.

**Câu quiz `recall: true`:** hỏi về bài Bảng băm — cần trả lời "liệt kê mọi từ bắt đầu bằng `pro`", bảng băm làm được không và vì sao. Đáp án đúng: không, vì hàm băm phá hoàn toàn thứ tự và quan hệ tiền tố giữa các khoá, nên cách duy nhất với bảng băm là quét hết mọi khoá `O(n)`; trie trả lời trong `O(độ dài tiền tố)` cộng công liệt kê nhánh.

**Ba bài tập kiểm tra:**

1. Cài trie có `chen`, `tra_tu` (có phải một từ hoàn chỉnh không), `tra_tien_to` (có từ nào bắt đầu bằng chuỗi này không), và huỷ trie không rò rỉ bộ nhớ. Kiểm rõ ca `to` và `ton`, và ca chèn cùng một từ hai lần.
2. Cài `liet_ke(tien_to)` trả về mọi từ trong nhánh, rồi thêm bản có xếp hạng theo tần suất bằng heap `K` phần tử của bài trước. Nạp 10000 từ tiếng Anh thông dụng và thử với các tiền tố dài ngắn khác nhau.
3. Nạp cùng 10000 từ vào cả trie và bảng băm bạn đã viết, rồi đo hai việc: tra một từ đầy đủ 100000 lần, và trả lời 100000 truy vấn tiền tố. In cả bộ nhớ mỗi cấu trúc chiếm. Giải thích vì sao ở việc đầu hai cấu trúc gần bằng nhau còn ở việc sau thì cách biệt.

**Danh sách LeetCode (10 bài, đã xếp dễ tới khó):**

| no | name | slug | level |
|---|---|---|---|
| 14 | Longest Common Prefix | `longest-common-prefix` | Easy |
| 1408 | String Matching in an Array | `string-matching-in-an-array` | Easy |
| 208 | Implement Trie (Prefix Tree) | `implement-trie-prefix-tree` | Medium |
| 648 | Replace Words | `replace-words` | Medium |
| 677 | Map Sum Pairs | `map-sum-pairs` | Medium |
| 211 | Design Add and Search Words Data Structure | `design-add-and-search-words-data-structure` | Medium |
| 720 | Longest Word in Dictionary | `longest-word-in-dictionary` | Medium |
| 421 | Maximum XOR of Two Numbers in an Array | `maximum-xor-of-two-numbers-in-an-array` | Medium |
| 212 | Word Search II | `word-search-ii` | Hard |
| 745 | Prefix and Suffix Search | `prefix-and-suffix-search` | Hard |

- [ ] **Step 1: Đọc bài mẫu và dữ liệu MVP** — `src/content/tong-tien-to.md` (bài cuối chương gần nhất), `src/data/lessons/bang-bam.js`, `src/data/capstones/tra-cuu.js`.
- [ ] **Step 2: Viết `src/data/lessons/trie.js`** theo mục A của khuôn chuẩn.
- [ ] **Step 3: Viết `src/content/trie.md`** theo mục B. Sáu khái niệm gom thành 5 tiêu đề `h3`: ẩn dụ hộc tủ và cấu tạo; chi phí tra cứu và sự thật về "trie nhanh hơn hash"; bảng so trie với bảng băm; tự động hoàn thành và xếp hạng; cái giá bộ nhớ và món quà thứ tự từ điển.
- [ ] **Step 4: Bật cờ `ready`** theo mục E. Không sửa `src/App.vue`.
- [ ] **Step 5: Chạy test** — `npm run test -- --run`.
- [ ] **Step 6: Chạy build** — `npm run build`, không cảnh báo mới.
- [ ] **Step 7: Kiểm chứng bằng mắt** theo mục H, cộng thêm: Chương 3 đủ 4 bài không còn nhãn "sắp có".
- [ ] **Step 8: Commit**

```bash
git add src/data/lessons src/content src/lesson/parts.js
git commit -m "content: bai Trie cay tien to"
```

**Điểm dừng giao được.** Ba chương đầu xong trọn: 12 bài, ba MVP nối nhau.

---
## Task 13: Dự án Chương 4 — Sổ quản lý kho hàng tra cứu nhanh

Làm theo mục "Khuôn chuẩn viết một dự án chương", sáu bước A tới F. Đọc lại ba luật ở đầu mục đó trước khi viết dòng dữ liệu đầu tiên.

Đây là MVP quan trọng nhất của cả bộ theo đúng lời spec thiết kế: người học chạy lại truy vấn mình đã viết từ Chương 2, bằng cấu trúc mới, rồi nhìn con số. Khi viết `why`, phải nói được khoảnh khắc đó.

**Files:**
- Create: `src/data/capstones/cay.js`
- Modify: `src/data/capstones/index.js`, `src/lesson/parts.js`

**Interfaces:**
- Consumes: mục "Dự án Chương 4 — Sổ quản lý kho hàng tra cứu nhanh" trong `docs/superpowers/specs/2026-08-09-dac-ta-7-mvp.md` (từ dòng 379). Đọc trọn mục đó trước khi viết.
- Produces: `capstones['cay']`. Bài `fenwick-segment-tree` ở Task 14 hiển thị nó.

**Giá trị bắt buộc, không được suy diễn khác:**

- `uses`: `['cay-nhi-phan-bst', 'bst-nang-cao', 'fenwick-segment-tree']`
- `reuses`: `[{ chapter: 1, module: 'bench' }, { chapter: 2, module: 'parser' }, { chapter: 3, module: 'hashmap' }]` — đúng ba dòng của bảng kế thừa trong đặc tả: `bench` để đo ba cách và dựng bảng so sánh; `parser` cùng truy vấn khoảng của Chương 2 để sinh CSV đầu vào và làm mốc so sánh cho câu hỏi 3; `hashmap` làm index băm cho truy vấn bằng đúng một giá trị, để so với index cây cho truy vấn khoảng.
- `data.url`: nguồn `NASA-LOG`, `https://ita.ee.lbl.gov/html/contrib/NASA-HTTP.html`.
- `data.format` và `data.sample`: lấy đúng phần mô tả định dạng CSV và khối dòng mẫu trong đặc tả.

- [ ] **Step 1: Đọc đặc tả** — mục Dự án Chương 4 trong spec, trọn mục, và `src/data/capstones/tra-cuu.js` để lấy khuôn gần nhất.
- [ ] **Step 2: Viết `src/data/capstones/cay.js`** theo mục A của khuôn chuẩn dự án chương.
- [ ] **Step 3: Khai báo trong `src/data/capstones/index.js`** theo mục B.
- [ ] **Step 4: Bật `capstoneReady: true`** cho chương `cay`.
- [ ] **Step 5: Chạy test** — `npm run test -- --run`.
- [ ] **Step 6: Chạy build** — `npm run build`, không cảnh báo mới.
- [ ] **Step 7: Commit**

```bash
git add src/data/capstones src/lesson/parts.js
git commit -m "content: du an Chuong 4 so quan ly kho hang"
```

---

## Task 14: Bài `fenwick-segment-tree` — Fenwick và Segment Tree

Bài cuối Chương 4. Dự án của chương nằm ở section riêng, bài này không dựng nó — xem Task 13.

**Files:**
- Create: `src/data/lessons/fenwick-segment-tree.js`
- Create: `src/content/fenwick-segment-tree.md`
- Modify: `src/lesson/parts.js` (chỉ dòng cờ của bài này)

**Interfaces:**
- Consumes: khung ở mục "Khuôn chuẩn viết một bài"; `capstoneCuaChuong('cay')` từ Task 13; `tong-tien-to` cho câu `recall` và cho toàn bộ phần đặt vấn đề; `cay-nhi-phan-bst` cho khái niệm cây và chiều cao.
- Produces: index cây cho truy vấn khoảng — MVP Chương 4 dùng trực tiếp.

Tiền tố id cho `h3` và ví dụ: `fen`.

**Ẩn dụ mở bài:** báo cáo doanh số theo tầng quản lý. Công ty có nghìn nhân viên. Giám đốc muốn biết tổng doanh số của một nhóm bất kỳ. Nếu hỏi từng người thì mất nghìn câu hỏi. Nếu bắt mỗi người báo cáo tổng tích luỹ từ đầu danh sách thì trả lời nhanh, nhưng một người đổi số là toàn bộ người sau phải sửa báo cáo. Cách của các công ty thật là chia tầng: tổ trưởng giữ tổng của tổ, trưởng phòng giữ tổng của phòng. Một người đổi số thì chỉ chuỗi cấp trên của người đó phải sửa — đúng bằng số tầng, không phải cả công ty.

**Khái niệm bắt buộc phủ, theo đúng thứ tự này:**

1. Đặt vấn đề bằng chính giới hạn của bài Tổng tiền tố. Bảng `formula-table` ba dòng: mảng thô (cập nhật `O(1)`, truy vấn khoảng `O(n)`), tổng tiền tố (cập nhật `O(n)`, truy vấn `O(1)`), cây (cập nhật `O(log n)`, truy vấn `O(log n)`). Nói rõ ý: cây không thắng ở cột nào cả, nó thắng ở **tổng** khi cả hai loại thao tác đều nhiều. Nếu chỉ đọc mà không sửa thì tổng tiền tố vẫn tốt hơn — đừng dùng cây cho oai.
2. Segment tree trước Fenwick, vì nó dễ hiểu hơn: mỗi nút giữ kết quả của một đoạn, gốc giữ cả mảng, mỗi nút chia đôi cho hai con, lá là một phần tử. Truy vấn đoạn `[l, r]` là cắt đoạn đó thành `O(log n)` nút đã có sẵn. Cập nhật một phần tử là sửa lá rồi đi lên gốc, đúng `log₂n` bước. Kèm code C++ cho `build`, `query`, `update`.
3. Segment tree không chỉ làm tổng: đổi phép gộp thành `min`, `max`, `gcd` là dùng được ngay, miễn phép gộp có tính kết hợp. Đây là điều Fenwick làm khó, và là lý do chính để chọn segment tree.
4. Fenwick tree: cùng bài toán, ít code hơn, nhanh hơn về hằng số, nhưng chỉ tiện cho các phép có nghịch đảo như cộng. Ý tưởng: ô `i` giữ tổng của một đoạn có độ dài bằng `i & -i`. Giải thích `i & -i` là gì — nó lấy ra bit 1 thấp nhất của `i` — kèm bảng vài giá trị `i` với dạng nhị phân và `i & -i`. Nói trước rằng bài Thao tác bit ở Chương 7 sẽ mổ kỹ mẹo này.
5. Bảng chọn giữa hai cấu trúc bằng `formula-table`: cột Fenwick, cột Segment tree; các dòng là lượng code, hằng số tốc độ, bộ nhớ, phép gộp hỗ trợ, cập nhật cả một đoạn, và tìm kiếm nhị phân trên cây.
6. Lazy propagation, chỉ nhắc chứ không dạy sâu: khi cần cộng một giá trị cho cả đoạn thay vì một phần tử, ta ghi nợ ở nút và chỉ đẩy nợ xuống khi thật sự cần đi qua. Nói rõ đây là mức nâng cao, và người học hoàn thành MVP không bắt buộc phải cài nó.

**Hai ví dụ điển hình:**

- `vd-fen-i-and-minus-i` — "Vì sao `i & -i` cho ra độ dài đoạn mà ô `i` phụ trách". Bảng: các giá trị `i` từ 1 tới 8, mỗi hàng ghi `i` ở dạng nhị phân, `-i` ở dạng bù hai, `i & -i`, và đoạn mảng mà ô đó phụ trách. Rồi một bảng thứ hai: truy vấn tổng tiền tố tới vị trí 7, đi qua các ô nào, cộng những đoạn nào, tổng cộng mấy bước. Chỗ then chốt: các đoạn được cộng vào không chồng nhau và ghép lại vừa đúng `[1, 7]` — đó không phải may mắn, nó là hệ quả trực tiếp của việc bỏ dần bit 1 thấp nhất. Chi phí: số bước bằng số bit 1 trong `i`, nhiều nhất `log₂n`.
- `vd-seg-truy-van-doan-tren-cay` — "Truy vấn tổng đoạn `[2, 6]` trên segment tree của mảng 8 phần tử". Vẽ cây bằng khối `pre` với giá trị từng nút. Bảng: quá trình đệ quy, mỗi hàng ghi nút đang xét, đoạn của nút, quan hệ với `[2, 6]` (nằm trọn trong, rời hẳn, hay giao một phần), và hành động (trả giá trị nút, trả 0, hay đi xuống hai con). Chỗ then chốt: đoạn `[2, 6]` được ghép từ đúng ba nút có sẵn, và số nút cần dùng không bao giờ vượt `2·log₂n` — đó là toàn bộ lý do truy vấn là `O(log n)`. Chi phí: `O(log n)` truy vấn, `O(log n)` cập nhật, `O(n)` bộ nhớ với mảng cỡ `4n`.

**Câu quiz `recall: true`:** hỏi về bài Tổng tiền tố — có mảng một triệu phần tử, cần xen kẽ 100000 lần sửa một phần tử và 100000 lần hỏi tổng một đoạn; dùng tổng tiền tố thì tốn bao nhiêu. Đáp án đúng: mỗi lần sửa buộc dựng lại hậu tố của dãy tiền tố, cỡ `O(n)`, nên tổng cỡ `10¹¹` phép toán — không chạy nổi; cây hạ xuống cỡ `2·10⁵·20 = 4·10⁶`.

**Ba bài tập kiểm tra:**

1. Cài Fenwick tree hỗ trợ cộng vào một vị trí và hỏi tổng tiền tố, rồi suy ra tổng đoạn `[l, r]` từ hai truy vấn tiền tố. Kiểm bằng cách so với một mảng thô trên 10000 thao tác ngẫu nhiên trộn lẫn sửa và hỏi.
2. Cài segment tree cho tổng, rồi đổi phép gộp thành `min` mà chỉ sửa đúng một chỗ trong code. Nếu phải sửa nhiều hơn một chỗ thì thiết kế của bạn chưa tách phép gộp ra khỏi cấu trúc — sửa lại.
3. Đo ba cách trên cùng dữ liệu: mảng thô, tổng tiền tố dựng lại sau mỗi lần sửa, và Fenwick. Chạy ba tỉ lệ khác nhau giữa số lần sửa và số lần hỏi: nhiều sửa ít hỏi, cân bằng, ít sửa nhiều hỏi. Tìm ranh giới mà mỗi cách thắng và giải thích bằng công thức chi phí.

**Danh sách LeetCode (10 bài, đã xếp dễ tới khó):**

| no | name | slug | level |
|---|---|---|---|
| 1480 | Running Sum of 1d Array | `running-sum-of-1d-array` | Easy |
| 303 | Range Sum Query - Immutable | `range-sum-query-immutable` | Easy |
| 1732 | Find the Highest Altitude | `find-the-highest-altitude` | Easy |
| 307 | Range Sum Query - Mutable | `range-sum-query-mutable` | Medium |
| 1109 | Corporate Flight Bookings | `corporate-flight-bookings` | Medium |
| 731 | My Calendar II | `my-calendar-ii` | Medium |
| 315 | Count of Smaller Numbers After Self | `count-of-smaller-numbers-after-self` | Hard |
| 493 | Reverse Pairs | `reverse-pairs` | Hard |
| 327 | Count of Range Sum | `count-of-range-sum` | Hard |
| 218 | The Skyline Problem | `the-skyline-problem` | Hard |

- [ ] **Step 1: Đọc bài mẫu và dữ liệu MVP** — `src/content/trie.md` (bài cuối chương gần nhất), `src/data/lessons/bang-bam.js`, `src/data/capstones/cay.js`, và `src/data/lessons/cay-nhi-phan-bst.js` để giữ thống nhất thuật ngữ về cây với hai bài cũ cùng chương.
- [ ] **Step 2: Viết `src/data/lessons/fenwick-segment-tree.js`** theo mục A của khuôn chuẩn.
- [ ] **Step 3: Viết `src/content/fenwick-segment-tree.md`** theo mục B. Sáu khái niệm gom thành 5 tiêu đề `h3`: ẩn dụ báo cáo theo tầng và bảng đặt vấn đề; segment tree; phép gộp tổng quát; Fenwick tree và `i & -i`; bảng chọn cấu trúc, kèm một câu về lazy propagation.
- [ ] **Step 4: Bật cờ `ready`** theo mục E. Không sửa `src/App.vue`.
- [ ] **Step 5: Chạy test** — `npm run test -- --run`.
- [ ] **Step 6: Chạy build** — `npm run build`, không cảnh báo mới.
- [ ] **Step 7: Kiểm chứng bằng mắt** theo mục H, cộng thêm: Chương 4 đủ 3 bài không còn nhãn "sắp có".
- [ ] **Step 8: Commit**

```bash
git add src/data/lessons src/content src/lesson/parts.js
git commit -m "content: bai Fenwick va Segment Tree"
```

**Điểm dừng giao được.** Bốn chương đầu xong trọn: 15 bài, bốn MVP.

---
## Task 15: Bài `sap-xep-to-po` — Sắp xếp tô-pô

**Files:**
- Create: `src/data/lessons/sap-xep-to-po.js`
- Create: `src/content/sap-xep-to-po.md`
- Modify: `src/lesson/parts.js` (chỉ dòng cờ của bài này)

**Interfaces:**
- Consumes: khung ở mục "Khuôn chuẩn viết một bài"; `dfs-bfs` cho câu `recall` và cho cả hai thuật toán; `ngan-xep-hang-doi` cho hàng đợi của Kahn.
- Produces: module `topo` — MVP Chương 5 dùng nó xử lý ràng buộc "phải lấy hàng trước khi giao".

Tiền tố id cho `h3` và ví dụ: `topo`.

**Ẩn dụ mở bài:** thứ tự mặc quần áo. Tất trước giày, áo trước áo khoác, nhưng tất và áo thì mặc cái nào trước cũng được. Không có một thứ tự đúng duy nhất — có nhiều thứ tự hợp lệ, và điều duy nhất phải giữ là mọi ràng buộc "cái này trước cái kia" đều được tôn trọng. Còn nếu có ai bảo "giày trước tất, mà tất cũng phải trước giày" thì không thứ tự nào tồn tại cả, và đó là thông tin quan trọng chứ không phải lỗi vặt.

**Khái niệm bắt buộc phủ, theo đúng thứ tự này:**

1. Đồ thị có hướng không chu trình, gọi tắt là DAG, và vì sao "không chu trình" là điều kiện sống còn: có chu trình thì không tồn tại thứ tự tô-pô nào. Nêu ba bối cảnh thật: môn học tiên quyết, các bước biên dịch phụ thuộc nhau trong `make`, và thứ tự cài gói phần mềm.
2. Thuật toán Kahn bằng bậc vào: đếm số cạnh đi vào mỗi đỉnh, đẩy mọi đỉnh bậc vào bằng 0 vào hàng đợi, lấy ra một đỉnh thì giảm bậc vào của các đỉnh kề, đỉnh nào tụt về 0 thì đẩy vào hàng đợi. Kèm code C++. Nói rõ hàng đợi ở đây chính là hàng đợi bài Ngăn xếp và hàng đợi đã dạy.
3. Phát hiện chu trình bằng chính Kahn, miễn phí: nếu số đỉnh lấy ra được ít hơn tổng số đỉnh thì phần còn lại nằm trong chu trình. Đây là cách phát hiện chu trình gọn nhất, và nó cho luôn cả tập đỉnh có vấn đề để báo lỗi cho người dùng.
4. Cách thứ hai bằng DFS: duyệt sâu, khi một đỉnh xong hết con cháu thì đẩy vào ngăn xếp; đảo ngược ngăn xếp là ra thứ tự tô-pô. Phát hiện chu trình bằng ba màu — trắng chưa thăm, xám đang trong ngăn xếp đệ quy, đen đã xong; gặp cạnh trỏ về đỉnh xám là có chu trình. Bảng `formula-table` so hai cách: lượng code, phát hiện chu trình, thứ tự cho ra, dùng đệ quy hay không, hợp với việc gì.
5. Thứ tự tô-pô không duy nhất. Nói rõ hệ quả thực tế: test không được so kết quả với một chuỗi cố định, nó phải kiểm mọi cạnh `u → v` đều có `u` đứng trước `v`. Đây là chỗ người mới viết test sai và cứ tưởng chương trình hỏng.
6. Ứng dụng đắt giá: đường đi dài nhất trên DAG giải được trong `O(V + E)` bằng cách xử lý các đỉnh theo thứ tự tô-pô, trong khi trên đồ thị có chu trình thì bài toán này là NP-khó. Nói trước rằng bài Độ khó bài toán ở Chương 7 sẽ giải thích chữ NP-khó đó. Đây cũng chính là bài toán đường găng trong quản lý dự án.

**Hai ví dụ điển hình:**

- `vd-topo-kahn-bac-vao` — "Xếp thứ tự sáu môn học có tiên quyết bằng Kahn". Cho một DAG sáu đỉnh cụ thể với danh sách cạnh viết rõ. Bảng chạy tay: mỗi hàng ghi hàng đợi hiện tại, đỉnh lấy ra, các đỉnh bị giảm bậc vào cùng giá trị mới, đỉnh nào được đẩy vào, và kết quả tới lúc đó. Chỗ then chốt: thứ tự trong hàng đợi quyết định kết quả cụ thể, nên đổi hàng đợi thành ngăn xếp sẽ ra một thứ tự khác — cả hai đều đúng. Chi phí: `O(V + E)`, mỗi cạnh được xét đúng một lần.
- `vd-topo-phat-hien-chu-trinh` — "Thêm một cạnh tạo chu trình rồi xem Kahn phát hiện thế nào". Lấy đúng đồ thị ví dụ trên, thêm một cạnh đóng vòng. Bảng: chạy lại Kahn, cho tới lúc hàng đợi rỗng mà mới lấy ra được ít đỉnh hơn tổng số. Bảng thứ hai liệt kê các đỉnh còn lại và bậc vào của chúng. Chỗ then chốt: hàng đợi rỗng không có nghĩa là xong — phải đếm. Và các đỉnh còn sót lại chính là chu trình, nên có thể in ra cho người dùng biết chính xác chỗ nào sai, thay vì chỉ báo "có chu trình". Chi phí: vẫn `O(V + E)`, việc phát hiện không tốn thêm gì.

**Câu quiz `recall: true`:** hỏi về bài DFS và BFS — Kahn dùng hàng đợi và duyệt mỗi cạnh đúng một lần, vậy chi phí là bao nhiêu và nó giống thuật toán nào đã học. Đáp án đúng: `O(V + E)`, cùng dạng với BFS; điểm khác là BFS quyết định thăm đỉnh dựa trên khoảng cách còn Kahn dựa trên bậc vào tụt về 0.

**Ba bài tập kiểm tra:**

1. Cài Kahn trả về một thứ tự tô-pô hoặc báo có chu trình kèm danh sách đỉnh trong chu trình. Viết hàm kiểm tính hợp lệ của kết quả bằng cách duyệt mọi cạnh, và dùng nó làm test thay vì so với chuỗi cố định.
2. Cài bản DFS ba màu cho cùng bài toán, rồi chạy cả hai bản trên một trăm DAG ngẫu nhiên và kiểm cả hai kết quả đều hợp lệ dù chúng khác nhau.
3. Dùng thứ tự tô-pô để tính đường đi dài nhất trên một DAG mô phỏng lịch dự án: mỗi đỉnh là một công việc có thời lượng, mỗi cạnh là ràng buộc trước sau. In ra tổng thời gian ngắn nhất hoàn thành dự án và chuỗi công việc nằm trên đường găng.

**Danh sách LeetCode (9 bài, đã xếp dễ tới khó):**

| no | name | slug | level |
|---|---|---|---|
| 997 | Find the Town Judge | `find-the-town-judge` | Easy |
| 1791 | Find Center of Star Graph | `find-center-of-star-graph` | Easy |
| 207 | Course Schedule | `course-schedule` | Medium |
| 210 | Course Schedule II | `course-schedule-ii` | Medium |
| 802 | Find Eventual Safe States | `find-eventual-safe-states` | Medium |
| 310 | Minimum Height Trees | `minimum-height-trees` | Medium |
| 2115 | Find All Possible Recipes from Given Supplies | `find-all-possible-recipes-from-given-supplies` | Medium |
| 329 | Longest Increasing Path in a Matrix | `longest-increasing-path-in-a-matrix` | Hard |
| 1857 | Largest Color Value in a Directed Graph | `largest-color-value-in-a-directed-graph` | Hard |

- [ ] **Step 1: Đọc bài mẫu** — `src/content/bang-bam.md` trọn vẹn, lấy làm mốc độ dài, giọng văn và cách dùng bốn chỉ thị. KHÔNG đọc file nào khác.
- [ ] **Step 2: Viết `src/data/lessons/sap-xep-to-po.js`** theo mục A của khuôn chuẩn.
- [ ] **Step 3: Viết `src/content/sap-xep-to-po.md`** theo mục B. Sáu khái niệm gom thành 5 tiêu đề `h3`: ẩn dụ mặc quần áo và DAG; Kahn bằng bậc vào; phát hiện chu trình; cách DFS ba màu và bảng so hai cách; thứ tự không duy nhất, và đường đi dài nhất trên DAG.
- [ ] **Step 4: Bật cờ `ready`** theo mục E. Không sửa `src/App.vue`.
- [ ] **Step 5: Chạy test** — `npm run test -- --run`, PASS toàn bộ.
- [ ] **Step 6: Chạy build** — `npm run build`, không cảnh báo mới.
- [ ] **Step 7: Kiểm chứng bằng mắt** theo mục H.
- [ ] **Step 8: Commit**

```bash
git add src/data/lessons src/content src/lesson/parts.js
git commit -m "content: bai Sap xep to po"
```

---

## Task 16: Bài `duong-di-ngan-nhat` — Đường đi ngắn nhất có trọng số

**Files:**
- Create: `src/data/lessons/duong-di-ngan-nhat.js`
- Create: `src/content/duong-di-ngan-nhat.md`
- Modify: `src/lesson/parts.js` (chỉ dòng cờ của bài này)

**Interfaces:**
- Consumes: khung ở mục "Khuôn chuẩn viết một bài"; `heap-hang-doi-uu-tien` cho câu `recall` và cho hàng đợi ưu tiên của Dijkstra; `dfs-bfs` để đối chiếu BFS với Dijkstra.
- Produces: module `router` — trái tim của MVP Chương 5.

Tiền tố id cho `h3` và ví dụ: `ddnn`.

**Ẩn dụ mở bài:** ứng dụng chỉ đường lúc tan tầm. Con đường ngắn nhất theo ki-lô-mét không phải con đường nhanh nhất, vì có đoạn tắc cứng. Ứng dụng gán cho mỗi đoạn đường một con số là thời gian đi hết đoạn đó, rồi tìm chuỗi đoạn có tổng nhỏ nhất. Đếm số ngã tư không còn ý nghĩa; thứ phải cộng lại là trọng số trên từng cạnh.

**Khái niệm bắt buộc phủ, theo đúng thứ tự này:**

1. Vì sao BFS không còn dùng được: BFS coi mọi cạnh dài như nhau, nên nó tìm đường ít cạnh nhất chứ không phải đường tổng trọng số nhỏ nhất. Đưa một đồ thị nhỏ ba đỉnh làm phản ví dụ: đường một cạnh nặng 10 so với đường hai cạnh mỗi cạnh nặng 1. Nói rõ hệ quả ngược lại: nếu mọi cạnh cùng trọng số thì BFS vẫn là câu trả lời đúng và rẻ hơn Dijkstra, đừng dùng Dijkstra cho oai.
2. Dijkstra: giữ mảng khoảng cách tạm, mỗi bước lấy ra đỉnh chưa chốt có khoảng cách nhỏ nhất, chốt nó, rồi nới lỏng các cạnh đi ra. Kèm code C++ dùng hàng đợi ưu tiên.
3. Vì sao Dijkstra đúng, và điều kiện của nó: khi lấy đỉnh có khoảng cách tạm nhỏ nhất ra, không đường nào khác có thể tới nó rẻ hơn, vì mọi đường khác phải đi qua một đỉnh chưa chốt có khoảng cách lớn hơn hoặc bằng, rồi còn cộng thêm cạnh không âm nữa. Toàn bộ lập luận đó sụp nếu có cạnh âm — nói rõ chỗ này chứ đừng chỉ dặn "không dùng với cạnh âm".
4. Vai trò của heap: không có heap thì mỗi bước phải quét cả mảng để tìm nhỏ nhất, thành `O(V²)`; với heap là `O((V + E) log V)`. Bảng `formula-table` so hai cách và nói rõ khi đồ thị dày thì `O(V²)` lại thắng. Nhắc lại giới hạn của heap ở bài Heap: không đổi được độ ưu tiên của phần tử giữa heap, nên cách thực dụng là đẩy bản ghi mới vào và bỏ qua bản cũ khi lấy ra — giải thích rõ mẹo này.
5. Bellman-Ford: nới lỏng mọi cạnh `V - 1` lần, `O(V·E)`, chậm hơn nhưng chịu được cạnh âm. Và lần lặp thứ `V` mà còn nới lỏng được thì đồ thị có chu trình âm — bài toán khi đó vô nghĩa vì cứ đi vòng mãi là khoảng cách giảm mãi.
6. Floyd-Warshall cho mọi cặp đỉnh, `O(V³)`, ba vòng lặp lồng nhau với vòng ngoài cùng là đỉnh trung gian. Chỉ dùng khi số đỉnh nhỏ, cỡ vài trăm.
7. Bảng chọn thuật toán bằng `formula-table`: cột thuật toán, chi phí, chịu cạnh âm không, dùng khi nào. Đủ BFS, Dijkstra, Bellman-Ford, Floyd-Warshall.

**Hai ví dụ điển hình:**

- `vd-ddnn-dijkstra-chay-tay` — "Chạy tay Dijkstra trên đồ thị năm đỉnh". Cho đồ thị cụ thể với danh sách cạnh và trọng số. Bảng chạy tay: mỗi hàng ghi nội dung hàng đợi ưu tiên, đỉnh được lấy ra và chốt, các cạnh được nới lỏng cùng khoảng cách mới, và mảng khoảng cách sau bước đó. Chỗ then chốt: có một đỉnh bị đẩy vào hàng đợi hai lần với hai khoảng cách khác nhau, và lần lấy ra thứ hai bị bỏ qua vì đỉnh đã chốt — phải chỉ rõ hàng nào trong bảng, vì đây là chi tiết cài đặt hay bị bỏ sót. Chi phí: `O((V + E) log V)`.
- `vd-ddnn-vi-sao-hong-voi-canh-am` — "Một đồ thị ba đỉnh làm Dijkstra trả lời sai". Cho đồ thị nhỏ nhất có thể với một cạnh âm. Bảng: Dijkstra chạy từng bước và chốt sai một đỉnh; rồi bảng thứ hai chạy Bellman-Ford trên cùng đồ thị và ra kết quả đúng. Chỗ then chốt: Dijkstra không hề báo lỗi, nó trả về một con số trông rất hợp lý — đó mới là điều nguy hiểm. Chi phí: `O(V·E)` cho Bellman-Ford, đắt hơn nhiều, và đó là cái giá của việc chịu được cạnh âm.

**Câu quiz `recall: true`:** hỏi về bài Heap và hàng đợi ưu tiên — Dijkstra cần thao tác gì ở mỗi bước, heap cho thao tác đó chi phí bao nhiêu, và nếu thay heap bằng quét mảng thì tổng chi phí đổi thế nào. Đáp án đúng: cần lấy ra đỉnh có khoảng cách tạm nhỏ nhất, heap cho `O(log V)`, thay bằng quét mảng thì mỗi bước `O(V)` và tổng thành `O(V²)`.

**Ba bài tập kiểm tra:**

1. Cài Dijkstra bằng hàng đợi ưu tiên của bài Heap, trả về cả khoảng cách lẫn đường đi thật bằng mảng đỉnh cha. Kiểm trên đồ thị có nhiều đường cùng độ dài và đồ thị không liên thông.
2. Cài Bellman-Ford có phát hiện chu trình âm, rồi tạo một đồ thị mà Dijkstra trả lời sai còn Bellman-Ford trả lời đúng, và một đồ thị có chu trình âm để thấy chương trình báo đúng.
3. Sinh đồ thị lưới 500 nhân 500 đỉnh với trọng số ngẫu nhiên, chạy cả Dijkstra dùng heap lẫn Dijkstra quét mảng, đo và giải thích khoảng cách. Rồi tăng độ dày cạnh lên để tìm ngưỡng mà bản quét mảng bắt đầu thắng.

**Danh sách LeetCode (9 bài, đã xếp dễ tới khó):**

| no | name | slug | level |
|---|---|---|---|
| 1971 | Find if Path Exists in Graph | `find-if-path-exists-in-graph` | Easy |
| 743 | Network Delay Time | `network-delay-time` | Medium |
| 1091 | Shortest Path in Binary Matrix | `shortest-path-in-binary-matrix` | Medium |
| 787 | Cheapest Flights Within K Stops | `cheapest-flights-within-k-stops` | Medium |
| 1514 | Path with Maximum Probability | `path-with-maximum-probability` | Medium |
| 1631 | Path With Minimum Effort | `path-with-minimum-effort` | Medium |
| 778 | Swim in Rising Water | `swim-in-rising-water` | Hard |
| 1368 | Minimum Cost to Make at Least One Valid Path in a Grid | `minimum-cost-to-make-at-least-one-valid-path-in-a-grid` | Hard |
| 1928 | Minimum Cost to Reach Destination in Time | `minimum-cost-to-reach-destination-in-time` | Hard |

- [ ] **Step 1: Đọc bài mẫu** — `src/content/bang-bam.md` trọn vẹn, lấy làm mốc độ dài, giọng văn và cách dùng bốn chỉ thị. KHÔNG đọc file nào khác.
- [ ] **Step 2: Viết `src/data/lessons/duong-di-ngan-nhat.js`** theo mục A của khuôn chuẩn.
- [ ] **Step 3: Viết `src/content/duong-di-ngan-nhat.md`** theo mục B. Bảy khái niệm gom thành 5 tiêu đề `h3`: ẩn dụ chỉ đường và vì sao BFS không đủ; Dijkstra và lập luận đúng đắn; vai trò của heap; Bellman-Ford và chu trình âm; Floyd-Warshall và bảng chọn thuật toán.
- [ ] **Step 4: Bật cờ `ready`** theo mục E. Không sửa `src/App.vue`.
- [ ] **Step 5: Chạy test** — `npm run test -- --run`, PASS toàn bộ.
- [ ] **Step 6: Chạy build** — `npm run build`, không cảnh báo mới.
- [ ] **Step 7: Kiểm chứng bằng mắt** theo mục H.
- [ ] **Step 8: Commit**

```bash
git add src/data/lessons src/content src/lesson/parts.js
git commit -m "content: bai Duong di ngan nhat co trong so"
```

---
## Task 17: Dự án Chương 5 — Trình lập lộ trình giao hàng

Làm theo mục "Khuôn chuẩn viết một dự án chương", sáu bước A tới F. Đọc lại ba luật ở đầu mục đó trước khi viết dòng dữ liệu đầu tiên.

**Files:**
- Create: `src/data/capstones/do-thi.js`
- Modify: `src/data/capstones/index.js`, `src/lesson/parts.js`

**Interfaces:**
- Consumes: mục "Dự án Chương 5 — Trình lập lộ trình giao hàng" trong `docs/superpowers/specs/2026-08-09-dac-ta-7-mvp.md` (từ dòng 500). Đọc trọn mục đó trước khi viết.
- Produces: `capstones['do-thi']`. Bài `cay-khung-nho-nhat` ở Task 18 hiển thị nó.

**Giá trị bắt buộc, không được suy diễn khác:**

- `uses`: `['dfs-bfs', 'dsu', 'sap-xep-to-po', 'duong-di-ngan-nhat', 'cay-khung-nho-nhat']`
- `reuses`: `[{ chapter: 1, module: 'core' }, { chapter: 3, module: 'heap' }, { chapter: 3, module: 'hashmap' }]` — đúng ba dòng của bảng kế thừa trong đặc tả: `core` cho danh sách kề và `Vec` chứa mảng khoảng cách; `heap` cho hàng đợi ưu tiên của Dijkstra và của Prim; `hashmap` để ánh xạ mã đơn và tên nút sang chỉ số.
- `data.url`: nguồn `OSM-VN`, `https://download.geofabrik.de/asia/vietnam.html`.
- `data.format` và `data.sample`: lấy đúng phần mô tả định dạng và khối dòng mẫu trong đặc tả.

- [ ] **Step 1: Đọc đặc tả** — mục Dự án Chương 5 trong spec, trọn mục, và `src/data/capstones/cay.js` để lấy khuôn gần nhất.
- [ ] **Step 2: Viết `src/data/capstones/do-thi.js`** theo mục A của khuôn chuẩn dự án chương.
- [ ] **Step 3: Khai báo trong `src/data/capstones/index.js`** theo mục B.
- [ ] **Step 4: Bật `capstoneReady: true`** cho chương `do-thi`.
- [ ] **Step 5: Chạy test** — `npm run test -- --run`.
- [ ] **Step 6: Chạy build** — `npm run build`, không cảnh báo mới.
- [ ] **Step 7: Commit**

```bash
git add src/data/capstones src/lesson/parts.js
git commit -m "content: du an Chuong 5 trinh lap lo trinh giao hang"
```

---

## Task 18: Bài `cay-khung-nho-nhat` — Cây khung nhỏ nhất

Bài cuối Chương 5. Dự án của chương nằm ở section riêng, bài này không dựng nó — xem Task 17.

**Files:**
- Create: `src/data/lessons/cay-khung-nho-nhat.js`
- Create: `src/content/cay-khung-nho-nhat.md`
- Modify: `src/lesson/parts.js` (chỉ dòng cờ của bài này)

**Interfaces:**
- Consumes: khung ở mục "Khuôn chuẩn viết một bài"; `capstoneCuaChuong('do-thi')` từ Task 17; `dsu` cho câu `recall` và cho Kruskal; `heap-hang-doi-uu-tien` cho Prim; `sap-xep` để sắp cạnh.
- Produces: kiểm tra vùng phục vụ và dựng mạng lưới cho MVP Chương 5.

Tiền tố id cho `h3` và ví dụ: `mst`.

**Ẩn dụ mở bài:** kéo cáp mạng cho một khu công nghiệp. Mười toà nhà, và bạn có bảng giá kéo cáp giữa từng cặp. Yêu cầu chỉ có hai: mọi toà nhà phải thông với nhau, và tổng tiền cáp phải nhỏ nhất. Không ai đòi cáp giữa hai toà bất kỳ phải là ngắn nhất — chỉ cần có đường đi tới nhau. Đó là khác biệt cốt lõi giữa bài này và bài trước, và nó đổi hoàn toàn thuật toán.

**Khái niệm bắt buộc phủ, theo đúng thứ tự này:**

1. Định nghĩa cây khung: một tập con các cạnh nối mọi đỉnh và không có chu trình. Từ đó suy ra ngay hai điều: nó có đúng `V - 1` cạnh, và thêm bất kỳ cạnh nào vào là tạo chu trình. Nếu đồ thị không liên thông thì không có cây khung, chỉ có rừng khung.
2. Phân biệt dứt khoát với đường đi ngắn nhất, bằng một phản ví dụ cụ thể: đưa một đồ thị nhỏ trong đó đường đi từ `A` tới `C` trên cây khung nhỏ nhất dài hơn đường đi ngắn nhất từ `A` tới `C`. Đây là hiểu nhầm phổ biến nhất của bài, phải dập ngay từ đầu.
3. Tính chất cắt, là lý do cả hai thuật toán đều đúng: chia đỉnh thành hai nhóm bất kỳ, thì cạnh nhẹ nhất bắc qua hai nhóm chắc chắn nằm trong một cây khung nhỏ nhất. Giải thích bằng lập luận đổi cạnh: nếu cây khung không chứa cạnh đó, thêm nó vào sẽ tạo chu trình, và trong chu trình đó có một cạnh khác cũng bắc qua vết cắt, nặng hơn hoặc bằng — bỏ cạnh nặng đi thì cây không tệ hơn.
4. Kruskal: sắp mọi cạnh theo trọng số tăng dần bằng module `sorting` của Chương 2, rồi lần lượt nhận cạnh nào không tạo chu trình. Câu hỏi "có tạo chu trình không" chính là câu hỏi "hai đầu cạnh đã cùng một nhóm chưa" — đúng việc DSU làm, nối thẳng vào bài DSU. Chi phí `O(E log E)` mà phần nặng là bước sắp xếp.
5. Prim: bắt đầu từ một đỉnh, mỗi bước lấy cạnh nhẹ nhất nối tập đã có với phần còn lại, bằng hàng đợi ưu tiên. Chi phí `O((V + E) log V)`. Nêu rõ nó giống Dijkstra tới mức nào và khác ở đâu: Dijkstra so tổng khoảng cách từ nguồn, Prim chỉ so trọng số của một cạnh. Chỉ một dòng code khác nhau, nhưng ý nghĩa khác hẳn.
6. Bảng chọn bằng `formula-table`: cột Kruskal, cột Prim; các dòng là chi phí, cấu trúc phụ cần có, hợp với đồ thị thưa hay dày, có xử lý được đồ thị không liên thông không, và lượng code.
7. Ứng dụng thật, mỗi cái một câu: quy hoạch mạng cáp và mạng điện, gom cụm dữ liệu bằng cách bỏ các cạnh nặng nhất khỏi cây khung, và xấp xỉ bài toán người bán hàng rong. Cái cuối nối tới bài Độ khó bài toán ở Chương 7.

**Hai ví dụ điển hình:**

- `vd-mst-kruskal-chay-tay` — "Kruskal trên đồ thị sáu đỉnh, theo dõi cả DSU". Cho đồ thị cụ thể với danh sách cạnh và trọng số. Bảng chạy tay: mỗi hàng ghi cạnh đang xét theo thứ tự trọng số tăng, gốc DSU của hai đầu, nhận hay bỏ, tổng trọng số tích luỹ, và số cạnh đã nhận. Chỗ then chốt: cạnh bị bỏ không phải vì nó nặng, mà vì hai đầu của nó đã thông nhau rồi — chỉ ra đúng hàng đó trong bảng. Và thuật toán dừng khi đã nhận đủ `V - 1` cạnh, không cần xét nốt các cạnh còn lại. Chi phí: `O(E log E)` do bước sắp xếp, phần DSU gần như miễn phí.
- `vd-mst-prim-vs-kruskal` — "Chạy Prim trên cùng đồ thị và so kết quả với Kruskal". Bảng chạy tay Prim: mỗi hàng ghi tập đỉnh đã có, nội dung hàng đợi ưu tiên, cạnh nhẹ nhất được lấy, đỉnh mới thêm vào. Rồi một bảng so hai kết quả cạnh với cạnh. Chỗ then chốt: hai thuật toán có thể chọn ra hai tập cạnh khác nhau khi có nhiều cạnh cùng trọng số, nhưng tổng trọng số bao giờ cũng bằng nhau — vì cây khung nhỏ nhất không duy nhất, còn giá trị nhỏ nhất thì duy nhất. Test phải kiểm tổng, không kiểm tập cạnh. Chi phí: `O((V + E) log V)` cho Prim, hợp với đồ thị dày hơn Kruskal.

**Câu quiz `recall: true`:** hỏi về bài DSU — trong Kruskal, DSU trả lời câu hỏi gì, và nếu bỏ tối ưu nén đường đi cùng gộp theo hạng thì chi phí đổi thế nào. Đáp án đúng: trả lời "hai đỉnh đã cùng một thành phần chưa", tức "nhận cạnh này có tạo chu trình không"; bỏ hai tối ưu thì mỗi thao tác có thể tụt về `O(V)` và bước lọc cạnh thành `O(E·V)` thay vì gần như tuyến tính.

**Ba bài tập kiểm tra:**

1. Cài Kruskal dùng DSU bạn đã viết ở bài DSU và module `sorting` của Chương 2. Trả về tổng trọng số và danh sách cạnh. Xử lý cả đồ thị không liên thông bằng cách trả về rừng khung kèm số thành phần.
2. Cài Prim dùng hàng đợi ưu tiên bạn viết ở bài Heap, rồi kiểm hai thuật toán cho cùng tổng trọng số trên 200 đồ thị ngẫu nhiên, kể cả các đồ thị cố tình có nhiều cạnh trùng trọng số.
3. Sinh hai loại đồ thị 2000 đỉnh — một thưa với `E` cỡ `V`, một dày với `E` cỡ `V²/4` — rồi đo cả Kruskal lẫn Prim trên từng loại. Tìm và giải thích chỗ mỗi thuật toán thắng.

**Danh sách LeetCode (8 bài, đã xếp dễ tới khó):**

| no | name | slug | level |
|---|---|---|---|
| 1971 | Find if Path Exists in Graph | `find-if-path-exists-in-graph` | Easy |
| 547 | Number of Provinces | `number-of-provinces` | Medium |
| 684 | Redundant Connection | `redundant-connection` | Medium |
| 1319 | Number of Operations to Make Network Connected | `number-of-operations-to-make-network-connected` | Medium |
| 721 | Accounts Merge | `accounts-merge` | Medium |
| 1584 | Min Cost to Connect All Points | `min-cost-to-connect-all-points` | Medium |
| 778 | Swim in Rising Water | `swim-in-rising-water` | Hard |
| 1489 | Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree | `find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree` | Hard |

- [ ] **Step 1: Đọc bài mẫu và dữ liệu MVP** — `src/content/fenwick-segment-tree.md` (bài cuối chương gần nhất), `src/data/lessons/dsu.js` để giữ thống nhất thuật ngữ DSU, và `src/data/capstones/do-thi.js`.
- [ ] **Step 2: Viết `src/data/lessons/cay-khung-nho-nhat.js`** theo mục A của khuôn chuẩn.
- [ ] **Step 3: Viết `src/content/cay-khung-nho-nhat.md`** theo mục B. Bảy khái niệm gom thành 5 tiêu đề `h3`: ẩn dụ kéo cáp và định nghĩa cây khung; khác biệt với đường đi ngắn nhất; tính chất cắt; Kruskal với DSU; Prim với heap, bảng chọn và ứng dụng thật.
- [ ] **Step 4: Bật cờ `ready`** theo mục E. Không sửa `src/App.vue`.
- [ ] **Step 5: Chạy test** — `npm run test -- --run`.
- [ ] **Step 6: Chạy build** — `npm run build`, không cảnh báo mới.
- [ ] **Step 7: Kiểm chứng bằng mắt** theo mục H, cộng thêm: Chương 5 đủ 5 bài không còn nhãn "sắp có".
- [ ] **Step 8: Commit**

```bash
git add src/data/lessons src/content src/lesson/parts.js
git commit -m "content: bai Cay khung nho nhat"
```

**Điểm dừng giao được.** Năm chương xong trọn: 18 bài, năm MVP.

---

## Task 19: Dự án Chương 6 — Công cụ xếp lịch và tối ưu ngân sách

Làm theo mục "Khuôn chuẩn viết một dự án chương", sáu bước A tới F. Đọc lại ba luật ở đầu mục đó trước khi viết dòng dữ liệu đầu tiên.

Chương 6 không có bài mới nào — cả năm bài của nó là bài cũ, đã viết từ đợt trước. Task này vẫn **bật cờ `capstoneReady` như mọi task dự án khác**: từ Giai đoạn 2.6, dự án của chương có section riêng, nên nó không còn phải chờ bài nào làm chỗ hiển thị. Đừng sửa bài cũ ở task này.

**Files:**
- Create: `src/data/capstones/thiet-ke-thuat-toan.js`
- Modify: `src/data/capstones/index.js`, `src/lesson/parts.js`

**Interfaces:**
- Consumes: mục "Dự án Chương 6 — Công cụ xếp lịch và tối ưu ngân sách" trong `docs/superpowers/specs/2026-08-09-dac-ta-7-mvp.md` (từ dòng 581). Đọc trọn mục đó trước khi viết.
- Produces: `capstones['thiet-ke-thuat-toan']` và mục "Dự án thực hành" bấm được ở Chương 6 trên sidebar.

**Giá trị bắt buộc, không được suy diễn khác:**

- `uses`: `['quay-lui-xau-nhi-phan', 'to-hop', 'tham-lam', 'qhd-nen-tang', 'qhd-lis-lcs-doixung']`
- `reuses`: `[{ chapter: 2, module: 'sorting' }, { chapter: 3, module: 'heap' }]` — **gợi ý** dùng lại, không bắt buộc: `sorting` để sắp ca theo giờ kết thúc cho thuật toán tham lam, `heap` để lấy ca rẻ nhất trong tập khả thi. Bỏ dòng `bench` của Chương 1 — chương đó không còn sinh ra thư viện nào.
- `data.url`: nếu đặc tả mô tả dữ liệu ca làm tự sinh thì **bỏ hẳn** trường `url` — nó là tuỳ chọn, và bịa ra một link là sai. Đọc đặc tả rồi làm theo đúng đó.
- `data.format` và `data.sample`: lấy đúng phần mô tả định dạng và khối dòng mẫu trong đặc tả.

- [ ] **Step 1: Đọc đặc tả** — mục Dự án Chương 6 trong spec, trọn mục, và `src/data/capstones/do-thi.js` để lấy khuôn gần nhất.
- [ ] **Step 2: Viết `src/data/capstones/thiet-ke-thuat-toan.js`** theo mục A của khuôn chuẩn dự án chương.
- [ ] **Step 3: Khai báo trong `src/data/capstones/index.js`** theo mục B.
- [ ] **Step 4: Bật `capstoneReady: true`** cho chương `thiet-ke-thuat-toan` theo mục C.
- [ ] **Step 5: Chạy test và build** — `npm run test -- --run` rồi `npm run build`, cả hai xanh.
- [ ] **Step 6: Kiểm chứng bằng mắt** theo mục E.
- [ ] **Step 7: Commit**

```bash
git add src/data/capstones src/lesson/parts.js
git commit -m "content: du an Chuong 6 xep lich va toi uu ngan sach"
```

---
## Task 20: Bài `thao-tac-bit` — Thao tác bit

**Files:**
- Create: `src/data/lessons/thao-tac-bit.js`
- Create: `src/content/thao-tac-bit.md`
- Modify: `src/lesson/parts.js` (chỉ dòng cờ của bài này)

**Interfaces:**
- Consumes: khung ở mục "Khuôn chuẩn viết một bài"; `fenwick-segment-tree` cho câu `recall` — mẹo `i & -i` đã xuất hiện ở đó và bài này mổ kỹ; `to-hop` cho phần liệt kê tập con.
- Produces: module `bitset` — MVP Chương 7 dùng nó để so khớp gần đúng giữa các văn bản.

Tiền tố id cho `h3` và ví dụ: `bit`.

**Ẩn dụ mở bài:** bảng công tắc đèn trong nhà. Mỗi phòng một công tắc, và trạng thái cả căn nhà chỉ là một dãy bật tắt. Muốn biết phòng ngủ có sáng không, bạn nhìn đúng một công tắc chứ không đi khắp nhà. Muốn tắt hết đèn tầng một, bạn gạt một loạt cùng lúc. Máy tính lưu số nguyên đúng như bảng công tắc đó, và các phép toán bit là cách gạt nhiều công tắc trong một nhịp.

**Khái niệm bắt buộc phủ, theo đúng thứ tự này:**

1. Sáu phép cơ bản với bảng chân trị bằng `formula-table`: `&`, `|`, `^`, `~`, `<<`, `>>`. Với mỗi phép, một dòng nói nó dùng để làm gì trong thực tế — `&` để lọc, `|` để bật, `^` để đảo, dịch trái để nhân đôi.
2. Ba thao tác trên một bit cụ thể, viết thành ba dòng code và giải thích từng dòng: kiểm bit thứ `k` bằng `(x >> k) & 1`, bật bit bằng `x |= (1 << k)`, tắt bit bằng `x &= ~(1 << k)`, đảo bit bằng `x ^= (1 << k)`.
3. Mặt nạ bit để biểu diễn một tập con: mỗi bit là một phần tử có mặt hay không. Với `n` phần tử thì mọi tập con là các số từ `0` tới `2ⁿ - 1`, nên duyệt hết mọi tập con chỉ là một vòng `for`. Nối lại bài Tổ hợp, và nói rõ giới hạn: `n` quá 20 là `2²⁰` cỡ một triệu, quá 25 là bắt đầu không chạy nổi.
4. Hai mẹo phải nhớ, mỗi mẹo kèm giải thích vì sao đúng chứ không chỉ đưa công thức: `x & (x - 1)` xoá bit 1 thấp nhất, dùng để đếm số bit 1 trong đúng số vòng bằng số bit 1; `x & -x` giữ lại đúng bit 1 thấp nhất, và đây chính là mẹo Fenwick tree ở Chương 4 dùng.
5. Số âm và bù hai: `-x` chính là `~x + 1`, đó là lý do `x & -x` hoạt động. Giải thích bằng một bảng nhị phân vài giá trị. Cảnh báo dịch phải số âm và dịch quá số bit của kiểu là hành vi không xác định.
6. XOR và ba tính chất làm nên sức mạnh của nó: `a ^ a = 0`, `a ^ 0 = a`, và tính giao hoán kết hợp. Từ ba tính chất đó suy ra ngay bài toán tìm phần tử lẻ loi trong dãy mà mọi phần tử khác xuất hiện đúng hai lần: XOR tất cả lại là xong, `O(n)` thời gian và `O(1)` bộ nhớ.
7. Bitset trong thực tế: một mảng `bool` một triệu phần tử tốn một triệu byte, còn bitset tốn 125 KB. Đó là khác biệt giữa vừa và không vừa bộ nhớ đệm của bộ xử lý, nên bitset không chỉ tiết kiệm mà còn nhanh hơn hẳn. Nêu ứng dụng thật: sàng số nguyên tố ở bài sau, bộ lọc Bloom, và so khớp văn bản của MVP Chương 7.

**Hai ví dụ điển hình:**

- `vd-bit-mat-na-va-tap-con` — "Liệt kê mọi tập con của bốn món đồ bằng mặt nạ bit". Bảng: 16 hàng, mỗi hàng ghi số từ 0 tới 15, dạng nhị phân bốn bit, và tập con tương ứng theo tên món đồ. Rồi một bảng nhỏ thứ hai cho bài toán chọn tập con có tổng cân nặng không vượt giới hạn, chỉ ra vài hàng bị loại. Chỗ then chốt: thứ tự các bit phải cố định và nhất quán suốt chương trình — bit 0 luôn là món đầu tiên; đảo quy ước giữa chừng là lỗi rất khó tìm vì chương trình vẫn chạy. Chi phí: `O(2ⁿ · n)` để duyệt và đọc từng tập con, chỉ dùng được khi `n` nhỏ hơn khoảng 20.
- `vd-bit-xor-tim-so-le-loi` — "Tìm số xuất hiện lẻ lần trong dãy bằng XOR". Bảng chạy tay trên dãy `[4, 1, 2, 1, 2]`: mỗi hàng ghi phần tử vào, giá trị tích luỹ dạng thập phân và dạng nhị phân. Chỗ then chốt: các cặp giống nhau triệt tiêu nhau bất kể chúng nằm cạnh nhau hay cách xa nhau, vì XOR giao hoán — đó là lý do không cần sắp xếp trước, và cũng là lý do cách này không cần thêm bộ nhớ nào. Chi phí: `O(n)` thời gian, `O(1)` bộ nhớ, so với `O(n)` bộ nhớ nếu dùng bảng băm đếm tần suất.

**Câu quiz `recall: true`:** hỏi về bài Fenwick và Segment Tree — biểu thức `i & -i` trong Fenwick tree cho ra cái gì, và vì sao. Đáp án đúng: nó giữ lại đúng bit 1 thấp nhất của `i`, cho ra độ dài đoạn mà ô `i` phụ trách; lý do là `-i` trong biểu diễn bù hai bằng `~i + 1`, nên mọi bit trên bit 1 thấp nhất bị đảo còn phần dưới giữ nguyên, và phép `&` chỉ còn lại đúng bit đó.

**Ba bài tập kiểm tra:**

1. Cài bốn hàm thao tác một bit — kiểm, bật, tắt, đảo — và hàm đếm số bit 1 bằng `x & (x - 1)`. So số vòng lặp của nó với cách duyệt đủ 32 bit, trên các số có ít bit 1 và nhiều bit 1.
2. Cài bài toán chọn nhóm: cho 18 món đồ có cân nặng và giá trị, duyệt mọi tập con bằng mặt nạ bit để tìm tập có giá trị lớn nhất mà tổng cân không vượt giới hạn. Đo thời gian, rồi thử tăng lên 25 món và ghi lại con số để thấy giới hạn của cách vét cạn.
3. Cài bitset tự viết trên mảng `uint64_t`, hỗ trợ đặt bit, đọc bit, đếm số bit 1 toàn mảng, và phép AND hai bitset. So bộ nhớ và tốc độ với mảng `bool` cùng kích thước một triệu phần tử.

**Danh sách LeetCode (11 bài, đã xếp dễ tới khó):**

| no | name | slug | level |
|---|---|---|---|
| 191 | Number of 1 Bits | `number-of-1-bits` | Easy |
| 136 | Single Number | `single-number` | Easy |
| 231 | Power of Two | `power-of-two` | Easy |
| 268 | Missing Number | `missing-number` | Easy |
| 338 | Counting Bits | `counting-bits` | Easy |
| 190 | Reverse Bits | `reverse-bits` | Easy |
| 137 | Single Number II | `single-number-ii` | Medium |
| 260 | Single Number III | `single-number-iii` | Medium |
| 78 | Subsets | `subsets` | Medium |
| 201 | Bitwise AND of Numbers Range | `bitwise-and-of-numbers-range` | Medium |
| 1707 | Maximum XOR With an Element From Array | `maximum-xor-with-an-element-from-array` | Hard |

- [ ] **Step 1: Đọc bài mẫu** — `src/content/bang-bam.md` trọn vẹn, lấy làm mốc độ dài, giọng văn và cách dùng bốn chỉ thị. KHÔNG đọc file nào khác.
- [ ] **Step 2: Viết `src/data/lessons/thao-tac-bit.js`** theo mục A của khuôn chuẩn.
- [ ] **Step 3: Viết `src/content/thao-tac-bit.md`** theo mục B. Bảy khái niệm gom thành 5 tiêu đề `h3`: ẩn dụ bảng công tắc và sáu phép cơ bản; thao tác một bit cụ thể; mặt nạ bit cho tập con; hai mẹo và số âm bù hai; XOR và bitset trong thực tế.
- [ ] **Step 4: Bật cờ `ready`** theo mục E. Không sửa `src/App.vue`.
- [ ] **Step 5: Chạy test** — `npm run test -- --run`, PASS toàn bộ.
- [ ] **Step 6: Chạy build** — `npm run build`, không cảnh báo mới.
- [ ] **Step 7: Kiểm chứng bằng mắt** theo mục H.
- [ ] **Step 8: Commit**

```bash
git add src/data/lessons src/content src/lesson/parts.js
git commit -m "content: bai Thao tac bit"
```

---

## Task 21: Bài `toan-so-hoc` — Toán và số học: GCD, modulo, sàng, luỹ thừa nhanh

**Files:**
- Create: `src/data/lessons/toan-so-hoc.js`
- Create: `src/content/toan-so-hoc.md`
- Modify: `src/lesson/parts.js` (chỉ dòng cờ của bài này)

**Interfaces:**
- Consumes: khung ở mục "Khuôn chuẩn viết một bài"; `de-quy` cho câu `recall` và cho luỹ thừa nhanh; `thao-tac-bit` cho phần dùng bitset trong sàng.
- Produces: module `modmath` — MVP Chương 7 dùng nó cho hash chuỗi đa thức trong công cụ phát hiện tài liệu trùng lặp.

Tiền tố id cho `h3` và ví dụ: `sh`.

**Ẩn dụ mở bài:** mặt đồng hồ mười hai giờ. Bây giờ là 10 giờ, năm tiếng nữa là mấy giờ? Không phải 15, mà là 3 — kim quay hết một vòng rồi đi tiếp. Cả một thế giới số học nằm trong chuyện đó: cộng, trừ, nhân đều làm được bình thường, chỉ là mọi kết quả đều quay về trong khoảng từ 0 tới 11. Số học modulo chính là mặt đồng hồ đó với số vạch tuỳ ý.

**Khái niệm bắt buộc phủ, theo đúng thứ tự này:**

1. Ước chung lớn nhất và thuật toán Euclid: `gcd(a, b) = gcd(b, a % b)`, dừng khi `b = 0`. Chứng minh ngắn vì sao đúng: mọi ước chung của `a` và `b` cũng là ước chung của `b` và `a % b`, và ngược lại, nên hai cặp có cùng tập ước chung. Chi phí `O(log min(a, b))` — phần dư ít nhất giảm một nửa sau mỗi hai bước. Bội chung nhỏ nhất tính từ gcd, và phải chia trước khi nhân để tránh tràn số.
2. Số học modulo: cộng, trừ, nhân đều "đi qua được" phép lấy dư, nên có thể lấy dư ở mọi bước trung gian. Cảnh báo hai chỗ: phép trừ có thể ra số âm nên phải cộng thêm `m` rồi lấy dư lại; và phép nhân hai số cỡ `10⁹` tràn `int` nên phải dùng `long long`.
3. Phép chia trong modulo không tồn tại theo nghĩa thông thường — phải nhân với nghịch đảo. Với `m` nguyên tố, nghịch đảo của `a` là `a^(m-2) mod m` theo định lý Fermat nhỏ. Nói rõ điều kiện `m` nguyên tố, đừng đưa công thức trần.
4. Luỹ thừa nhanh: tính `a^n` bằng `log₂n` phép nhân thay vì `n` phép, dựa trên `a^n = (a^(n/2))²` khi `n` chẵn. Nối thẳng vào bài Đệ quy: đây là chia để trị áp cho một bài toán không phải mảng. Kèm cả bản đệ quy lẫn bản vòng lặp theo bit của `n`, và chỉ ra bản vòng lặp chính là đọc `n` theo nhị phân — nối vào bài Thao tác bit vừa học.
5. Sàng Eratosthenes: đánh dấu bội của từng số nguyên tố. Ba chi tiết phải nói: chỉ cần duyệt tới căn bậc hai của `n`, bắt đầu đánh dấu từ `p*p` chứ không phải `2p`, và dùng bitset của bài trước để nhét sàng `n = 10⁸` vừa bộ nhớ. Chi phí `O(n log log n)` — không cần chứng minh, chỉ cần nói nó gần như tuyến tính.
6. Phân tích thừa số nguyên tố bằng cách thử chia tới căn bậc hai, `O(√n)`; và mẹo dựng sẵn ước nguyên tố nhỏ nhất trong sàng để phân tích mọi số dưới `n` trong `O(log n)` mỗi số.
7. Tràn số, phần cảnh báo cuối bài: bảng nhỏ ghi giới hạn của `int` và `long long`, và ba tình huống tràn thường gặp — nhân hai số modulo, tính giai thừa, và cộng dồn tổng trên dãy dài. Nói rõ tràn số có dấu trong C++ là hành vi không xác định, chương trình có thể làm bất cứ điều gì chứ không chỉ ra số sai.

**Hai ví dụ điển hình:**

- `vd-sh-euclid-chay-tay` — "Tính `gcd(1071, 462)` bằng Euclid, từng bước". Bảng: mỗi hàng ghi `a`, `b`, `a % b`, và cặp mới. Rồi một bảng thứ hai so số bước của Euclid với cách thử mọi số từ nhỏ hơn `min(a, b)` xuống. Chỗ then chốt: chỉ sau bốn bước là xong, trong khi cách thử lần lượt cần tới 462 bước — và khoảng cách đó nới ra rất nhanh theo độ lớn của số. Chi phí: `O(log min(a, b))`.
- `vd-sh-luy-thua-nhanh-nhi-phan` — "Tính `3^13 mod 1000000007` bằng luỹ thừa nhanh". Bảng: viết 13 thành nhị phân `1101`, mỗi hàng ghi bit đang xét, giá trị cơ số bình phương tới lúc đó, kết quả tích luỹ, và số phép nhân đã dùng. Chỗ then chốt: chỉ tốn 4 phép nhân cho số mũ 13, và tốn 30 phép cho số mũ một tỉ — số phép nhân bằng số bit của số mũ, không phải giá trị của nó. Chi phí: `O(log n)` phép nhân, mỗi phép trên `long long` để khỏi tràn.

**Câu quiz `recall: true`:** hỏi về bài Đệ quy — luỹ thừa nhanh viết dưới dạng đệ quy có hệ thức truy hồi nào, và giải ra bao nhiêu. Đáp án đúng: `T(n) = T(n/2) + O(1)`, giải ra `O(log n)`; cùng dạng hệ thức với tìm kiếm nhị phân, vì cả hai đều vứt bỏ một nửa bài toán ở mỗi bước.

**Ba bài tập kiểm tra:**

1. Cài `gcd` bản đệ quy và bản vòng lặp, cùng `lcm` không tràn số với hai số cỡ `10⁹`. Kiểm các ca biên: một trong hai số bằng 0, hai số bằng nhau, hai số nguyên tố cùng nhau.
2. Cài luỹ thừa nhanh modulo và dùng nó tính nghịch đảo theo Fermat, rồi cài các phép cộng trừ nhân chia modulo thành một module nhỏ. Kiểm bằng cách so `(a / b) * b` với `a` trên 10000 cặp ngẫu nhiên với `m = 1000000007`.
3. Cài sàng Eratosthenes hai bản — mảng `bool` và bitset của bài trước — rồi chạy với `n = 10⁷` và `n = 10⁸`. Ghi lại bộ nhớ và thời gian của cả hai, và ghi rõ bản nào không chạy nổi ở mốc nào.

**Danh sách LeetCode (10 bài, đã xếp dễ tới khó):**

| no | name | slug | level |
|---|---|---|---|
| 1979 | Find Greatest Common Divisor of Array | `find-greatest-common-divisor-of-array` | Easy |
| 263 | Ugly Number | `ugly-number` | Easy |
| 326 | Power of Three | `power-of-three` | Easy |
| 168 | Excel Sheet Column Title | `excel-sheet-column-title` | Easy |
| 204 | Count Primes | `count-primes` | Medium |
| 50 | Pow(x, n) | `powx-n` | Medium |
| 372 | Super Pow | `super-pow` | Medium |
| 279 | Perfect Squares | `perfect-squares` | Medium |
| 1015 | Smallest Integer Divisible by K | `smallest-integer-divisible-by-k` | Medium |
| 149 | Max Points on a Line | `max-points-on-a-line` | Hard |

- [ ] **Step 1: Đọc bài mẫu** — `src/content/bang-bam.md` trọn vẹn, lấy làm mốc độ dài, giọng văn và cách dùng bốn chỉ thị. KHÔNG đọc file nào khác.
- [ ] **Step 2: Viết `src/data/lessons/toan-so-hoc.js`** theo mục A của khuôn chuẩn.
- [ ] **Step 3: Viết `src/content/toan-so-hoc.md`** theo mục B. Bảy khái niệm gom thành 5 tiêu đề `h3`: ẩn dụ mặt đồng hồ và số học modulo; Euclid và bội chung nhỏ nhất; nghịch đảo modulo; luỹ thừa nhanh; sàng, phân tích thừa số và cảnh báo tràn số.
- [ ] **Step 4: Bật cờ `ready`** theo mục E. Không sửa `src/App.vue`.
- [ ] **Step 5: Chạy test** — `npm run test -- --run`, PASS toàn bộ.
- [ ] **Step 6: Chạy build** — `npm run build`, không cảnh báo mới.
- [ ] **Step 7: Kiểm chứng bằng mắt** theo mục H.
- [ ] **Step 8: Commit**

```bash
git add src/data/lessons src/content src/lesson/parts.js
git commit -m "content: bai Toan va so hoc"
```

---
## Task 22: Bài `chuoi-nang-cao` — Chuỗi nâng cao: KMP và hash chuỗi

**Files:**
- Create: `src/data/lessons/chuoi-nang-cao.js`
- Create: `src/content/chuoi-nang-cao.md`
- Modify: `src/lesson/parts.js` (chỉ dòng cờ của bài này)

**Interfaces:**
- Consumes: khung ở mục "Khuôn chuẩn viết một bài"; `bang-bam` cho câu `recall` và cho phần va chạm hash; `toan-so-hoc` cho hash đa thức modulo; `hai-con-tro-cua-so-truot` cho rolling hash.
- Produces: module `fingerprint` — MVP Chương 7 dùng nó để tính vân tay từng đoạn văn bản.

Tiền tố id cho `h3` và ví dụ: `chuoi`.

**Ẩn dụ mở bài:** tìm một câu trong quyển sách dày. Cách ngây thơ là đặt câu cần tìm lên đầu trang 1, so từng chữ, lệch thì dịch sang đúng một chữ và so lại từ đầu. Nhưng nếu bạn vừa so trùng được mười chữ rồi mới lệch, bạn đã biết rất nhiều về đoạn văn đó — vứt hết thông tin ấy đi để bắt đầu lại là lãng phí. Cả hai thuật toán của bài này đều là hai cách khác nhau để không vứt đi thông tin đã có.

**Khái niệm bắt buộc phủ, theo đúng thứ tự này:**

1. So khớp ngây thơ và chi phí thật của nó: `O(n·m)` xấu nhất. Đưa cặp dữ liệu làm nó tệ nhất — mẫu `aaaab` trên văn bản toàn chữ `a` — và nói rõ dạng dữ liệu này không hề hiếm trong thực tế, ví dụ chuỗi ADN hay file log lặp lại.
2. KMP và mảng tiền tố: `pi[i]` là độ dài tiền tố dài nhất của mẫu vừa là hậu tố của đoạn mẫu tính tới `i`. Giải thích ý nghĩa bằng lời trước khi đưa công thức: nó trả lời câu hỏi "vừa lệch ở đây, tôi được phép nhảy tới đâu mà không bỏ sót". Kèm code C++ cho cả bước dựng `pi` lẫn bước so khớp.
3. Vì sao KMP là `O(n + m)`: con trỏ trên văn bản không bao giờ lùi, còn con trỏ trên mẫu chỉ lùi bằng tổng số lần nó từng tiến — đúng lối phân tích khấu trừ ở bài Hai con trỏ và bài Mảng động. Nói rõ đây là cùng một kiểu lập luận lần thứ ba trong chương trình, để người học thấy nó là công cụ chứ không phải mẹo lẻ.
4. Hash chuỗi đa thức: coi chuỗi là một số trong hệ cơ số nào đó, lấy dư cho một số nguyên tố lớn. So sánh hai chuỗi dài giờ chỉ là so hai số. Nối thẳng vào module `modmath` của bài trước.
5. Rolling hash và Rabin-Karp: khi cửa sổ trượt sang một ký tự, hash mới tính được từ hash cũ trong `O(1)` — bỏ ký tự trái bằng cách trừ đi phần đóng góp của nó, thêm ký tự phải. Đây chính là khuôn mẫu cửa sổ trượt ở Chương 2 áp cho chuỗi. Chi phí `O(n + m)` trung bình.
6. Va chạm hash, và đây là phần không được lướt qua: hai chuỗi khác nhau có thể cùng hash, nên Rabin-Karp là thuật toán **có xác suất sai**. Ba cách xử lý: so lại chuỗi thật khi hash trùng (đúng chắc chắn, xấu nhất trở về `O(n·m)`); dùng hai hash với hai modulo khác nhau (xác suất sai nhỏ tới mức bỏ qua được); chọn cơ số ngẫu nhiên để không ai dựng được dữ liệu hại bạn. Nối lại đúng lối lập luận về thuật toán ngẫu nhiên ở bài Sắp xếp.
7. Bảng chọn bằng `formula-table`: cột KMP, cột Rabin-Karp; các dòng là chi phí xấu nhất, luôn đúng hay có xác suất sai, tìm nhiều mẫu cùng lúc, so hai đoạn bất kỳ trong `O(1)` sau tiền xử lý, và lượng code. Nói rõ điều làm hash thắng hẳn: sau khi dựng mảng hash tiền tố, so **hai đoạn bất kỳ** của văn bản chỉ tốn `O(1)` — đó là thứ KMP không làm được, và là thứ MVP Chương 7 cần.

**Hai ví dụ điển hình:**

- `vd-kmp-mang-tien-to` — "Dựng mảng tiền tố cho mẫu `ababaca` rồi so khớp". Bảng một: từng vị trí của mẫu, ký tự, giá trị `pi`, và giải thích ngắn tiền tố nào đang lặp lại. Bảng hai: so khớp mẫu đó trên văn bản `abababacaba`, mỗi hàng ghi vị trí trên văn bản, vị trí trên mẫu, khớp hay lệch, và nhảy tới đâu khi lệch. Chỗ then chốt: khi lệch ở vị trí thứ năm của mẫu, con trỏ mẫu nhảy về vị trí 3 chứ không về 0, và con trỏ văn bản đứng yên — chỉ ra đúng hàng đó. So khớp ngây thơ ở tình huống này sẽ lùi con trỏ văn bản lại bốn ô và so lại từ đầu. Chi phí: `O(m)` dựng mảng tiền tố cộng `O(n)` so khớp.
- `vd-hash-rolling-cua-so` — "Tính hash trượt cho mọi đoạn ba ký tự của `abcabc`". Bảng: mỗi hàng ghi cửa sổ, hash tính theo công thức đầy đủ, hash tính theo cách trượt từ hàng trên, và hai giá trị đó có khớp nhau không. Chỗ then chốt: hai đoạn `abc` ở vị trí 0 và vị trí 3 cho cùng hash — đúng như mong đợi; nhưng phải nói rõ ngay rằng cùng hash **chưa chắc** là cùng chuỗi, nên bước so lại chuỗi thật là bắt buộc nếu muốn kết quả chắc chắn. Chi phí: `O(1)` mỗi bước trượt, `O(n)` cho toàn văn bản, so với `O(n·m)` nếu tính lại hash từ đầu mỗi cửa sổ.

**Câu quiz `recall: true`:** hỏi về bài Bảng băm — vì sao hai chuỗi khác nhau lại có thể cho cùng một giá trị hash, và trong Rabin-Karp thì điều đó dẫn tới hậu quả gì. Đáp án đúng: số chuỗi có thể có là vô hạn còn miền giá trị hash là hữu hạn nên va chạm là tất yếu, đúng lập luận đã dùng cho bảng băm; hậu quả là Rabin-Karp có thể báo khớp nhầm, nên phải so lại chuỗi thật hoặc dùng hai modulo.

**Ba bài tập kiểm tra:**

1. Cài KMP đầy đủ gồm dựng mảng tiền tố và so khớp, trả về mọi vị trí xuất hiện. Kiểm với mẫu dài hơn văn bản, mẫu rỗng, mẫu trùng toàn bộ văn bản, và cặp dữ liệu xấu nhất `aaaab` trên chuỗi toàn `a`.
2. Cài Rabin-Karp dùng module `modmath` của bài trước, có so lại chuỗi thật khi hash trùng. Rồi cố tình chọn modulo nhỏ, cỡ 101, chạy trên văn bản một triệu ký tự và đếm số lần va chạm giả để thấy tận mắt vì sao phải chọn số nguyên tố lớn.
3. Dựng mảng hash tiền tố cho một văn bản một triệu ký tự, rồi trả lời 100000 truy vấn dạng "hai đoạn `[a, b]` và `[c, d]` có giống nhau không" trong `O(1)` mỗi truy vấn. So với cách so từng ký tự.

**Danh sách LeetCode (10 bài, đã xếp dễ tới khó):**

| no | name | slug | level |
|---|---|---|---|
| 28 | Find the Index of the First Occurrence in a String | `find-the-index-of-the-first-occurrence-in-a-string` | Easy |
| 459 | Repeated Substring Pattern | `repeated-substring-pattern` | Easy |
| 1408 | String Matching in an Array | `string-matching-in-an-array` | Easy |
| 187 | Repeated DNA Sequences | `repeated-dna-sequences` | Medium |
| 5 | Longest Palindromic Substring | `longest-palindromic-substring` | Medium |
| 686 | Repeated String Match | `repeated-string-match` | Medium |
| 214 | Shortest Palindrome | `shortest-palindrome` | Hard |
| 1044 | Longest Duplicate Substring | `longest-duplicate-substring` | Hard |
| 1392 | Longest Happy Prefix | `longest-happy-prefix` | Hard |
| 1147 | Longest Chunked Palindrome Decomposition | `longest-chunked-palindrome-decomposition` | Hard |

- [ ] **Step 1: Đọc bài mẫu** — `src/content/bang-bam.md` trọn vẹn, lấy làm mốc độ dài, giọng văn và cách dùng bốn chỉ thị. KHÔNG đọc file nào khác.
- [ ] **Step 2: Viết `src/data/lessons/chuoi-nang-cao.js`** theo mục A của khuôn chuẩn.
- [ ] **Step 3: Viết `src/content/chuoi-nang-cao.md`** theo mục B. Bảy khái niệm gom thành 5 tiêu đề `h3`: ẩn dụ tìm câu trong sách và so khớp ngây thơ; KMP với mảng tiền tố; vì sao KMP tuyến tính; hash chuỗi và rolling hash; va chạm, xác suất sai, và bảng chọn thuật toán.
- [ ] **Step 4: Bật cờ `ready`** theo mục E. Không sửa `src/App.vue`.
- [ ] **Step 5: Chạy test** — `npm run test -- --run`, PASS toàn bộ.
- [ ] **Step 6: Chạy build** — `npm run build`, không cảnh báo mới.
- [ ] **Step 7: Kiểm chứng bằng mắt** theo mục H.
- [ ] **Step 8: Commit**

```bash
git add src/data/lessons src/content src/lesson/parts.js
git commit -m "content: bai Chuoi nang cao KMP va hash chuoi"
```

---

## Task 23: Bài `work-span` — Work/Span và tư duy song song

Đây là bài dị biệt: toàn khái niệm, không có cấu trúc dữ liệu nào để cài. Bài mẫu gần nhất là `do-phuc-tap`, không phải `bang-bam` — đọc `src/content/do-phuc-tap.md` trước.

**Files:**
- Create: `src/data/lessons/work-span.js`
- Create: `src/content/work-span.md`
- Modify: `src/lesson/parts.js` (chỉ dòng cờ của bài này)

**Interfaces:**
- Consumes: khung ở mục "Khuôn chuẩn viết một bài"; `sap-xep` cho câu `recall` và cho ví dụ merge sort song song; `de-quy` cho chia để trị; `tong-tien-to` cho phép quét song song.
- Produces: module `par` — MVP Chương 7 dùng nó để quét song song khi so mọi cặp tài liệu.

Tiền tố id cho `h3` và ví dụ: `ws`.

**Ẩn dụ mở bài:** nấu một bữa tiệc với nhiều đầu bếp. Tổng công việc là số giờ người phải bỏ ra, và nó không đổi dù có bao nhiêu đầu bếp. Nhưng có những việc bắt buộc phải xếp hàng: ướp thịt rồi mới nướng được, và không đầu bếp thứ hai nào rút ngắn được chuỗi đó. Thuê thêm người giúp tới một mức nào đó thì hết tác dụng, và cái mức đó không do bạn quyết định — nó do chuỗi phụ thuộc dài nhất trong công thức nấu ăn quyết định.

**Khái niệm bắt buộc phủ, theo đúng thứ tự này:**

1. Hai đại lượng, định nghĩa rõ ràng: work là tổng số phép toán, ký hiệu `T₁`, chính là thời gian chạy trên một bộ xử lý; span là độ dài chuỗi phụ thuộc dài nhất, ký hiệu `T∞`, chính là thời gian chạy nếu có vô hạn bộ xử lý. Nói rõ độ song song là tỉ số `T₁ / T∞`, và nó là một con số của thuật toán chứ không phải của máy.
2. Vì sao đo hai đại lượng thay vì một: một thuật toán có work nhỏ nhưng span lớn thì không tận dụng được máy nhiều lõi, còn thuật toán work lớn hơn một chút mà span nhỏ có thể chạy nhanh hơn hẳn trong thực tế. Đây là lý do Big-O một chiều không đủ để nói về máy hiện đại.
3. Luật Brent, phát biểu bằng lời và bằng công thức: với `p` bộ xử lý, thời gian nằm giữa `T₁/p` và `T₁/p + T∞`. Hệ quả thực tế: khi `p` còn nhỏ hơn nhiều so với độ song song thì tăng lõi gần như tăng tốc tương ứng; vượt ngưỡng đó thì thêm lõi gần như vô ích.
4. Luật Amdahl: nếu một phần `s` của chương trình bắt buộc chạy tuần tự thì dù có vô hạn lõi, tăng tốc cũng không vượt `1/s`. Bảng `formula-table` với vài giá trị `s` — 1%, 5%, 20% — và trần tăng tốc tương ứng. Đây là con số làm nhiều người ngã ngửa và nó đáng được đặt ngay chính giữa bài.
5. Chia để trị là nguồn song song tự nhiên: hai nhánh đệ quy độc lập nhau thì chạy song song được. Tính work và span cho merge sort: work `O(n log n)` như đã biết, span `O(log²n)` nếu bước trộn cũng song song, hoặc `O(n)` nếu bước trộn tuần tự. Chỉ rõ bước trộn tuần tự chính là chỗ nghẽn, và đó là ví dụ sống của luật Amdahl.
6. Reduce và scan: cộng tổng một mảng theo cây nhị phân có work `O(n)` và span `O(log n)`, so với vòng lặp tuần tự có work `O(n)` và span `O(n)`. Cùng work, khác hẳn span. Và tổng tiền tố ở Chương 2, nhìn thì có vẻ bắt buộc tuần tự vì mỗi ô phụ thuộc ô trước, thực ra có bản song song span `O(log n)` — nói rõ điều này, vì nó là ví dụ đẹp nhất cho thấy "trông như tuần tự" không có nghĩa là "bắt buộc tuần tự".
7. Cái giá của song song: chi phí tạo và điều phối luồng, tranh chấp dữ liệu khi nhiều luồng ghi cùng chỗ, và tính không xác định của thứ tự thực thi làm việc gỡ lỗi khó hơn hẳn. Nêu ngưỡng thực dụng: dưới một mức kích thước nào đó thì bản tuần tự luôn nhanh hơn, nên mọi cài đặt song song thật đều có một ngưỡng cắt về tuần tự.

**Hai ví dụ điển hình:**

- `vd-ws-tong-mang-tuan-tu-vs-cay` — "Cộng tổng tám số: vòng lặp tuần tự so với cây nhị phân". Bảng một: vòng lặp tuần tự, mỗi hàng một bước cộng, tổng cộng 7 bước xếp hàng. Bảng hai: cộng theo cây, mỗi hàng là một tầng với các phép cộng chạy song song trong tầng đó, tổng cộng 3 tầng. Chỗ then chốt: cả hai cách đều làm đúng 7 phép cộng, work y hệt nhau — thứ khác nhau là bao nhiêu phép trong số đó bắt buộc phải xếp hàng. Chi phí: work `O(n)` cả hai, span `O(n)` so với `O(log n)`, độ song song `n / log n`.
- `vd-ws-tinh-do-song-song-cua-merge-sort` — "Tính work và span cho merge sort ở hai cách cài". Bảng: hai dòng, một cho bản trộn tuần tự và một cho bản trộn song song, mỗi dòng ghi hệ thức work, hệ thức span, kết quả giải, và độ song song. Rồi một bảng nhỏ áp con số `n = 10⁶` vào để ra độ song song cụ thể của từng bản. Chỗ then chốt: đưa bước trộn thành song song không đổi work chút nào, nhưng đổi span từ `O(n)` xuống `O(log²n)` — tức là đổi độ song song từ `log n` lên `n / log n`, khoảng cách hàng chục nghìn lần ở `n = 10⁶`. Chi phí: work `O(n log n)` không đổi ở cả hai bản.

**Câu quiz `recall: true`:** hỏi về bài Sắp xếp — merge sort chia đôi rồi sắp hai nửa; hai nửa đó có phụ thuộc nhau không, và điều đó nói gì về khả năng song song. Đáp án đúng: hai nửa hoàn toàn độc lập nên chạy song song được ngay; chỗ bắt buộc xếp hàng là bước trộn, vì nó cần cả hai nửa đã sắp xong.

**Ba bài tập kiểm tra:**

1. Cài cộng tổng mảng hai cách — vòng lặp tuần tự và cây nhị phân đệ quy — rồi đếm số phép cộng của cả hai để tự xác nhận work bằng nhau, và đo độ sâu đệ quy để xác nhận span khác nhau. Chưa cần dùng luồng thật.
2. Cài merge sort song song bằng thư viện luồng của C++, với một ngưỡng cắt về bản tuần tự khi đoạn ngắn hơn một kích thước cho trước. Đo với ngưỡng 100, 1000, 10000, 100000 phần tử và tìm ngưỡng tốt nhất trên máy bạn.
3. Lấy một chương trình bạn đã viết ở chương trước — ví dụ bộ đếm tần suất từ hoặc bộ phân tích log — ước lượng phần bắt buộc tuần tự của nó bằng cách đo riêng thời gian đọc file, rồi áp luật Amdahl để dự đoán trần tăng tốc. Sau đó song song hoá phần tính toán và so kết quả đo được với dự đoán.

**Danh sách LeetCode (10 bài, đã xếp dễ tới khó).** Ghi rõ trong `note` của bài đầu tiên rằng LeetCode không chấm chương trình song song, nên các bài dưới đây được chọn vì lời giải của chúng có dạng chia để trị hoặc reduce — hãy giải xong rồi tính work và span cho chính lời giải của mình.

| no | name | slug | level |
|---|---|---|---|
| 1480 | Running Sum of 1d Array | `running-sum-of-1d-array` | Easy |
| 169 | Majority Element | `majority-element` | Easy |
| 53 | Maximum Subarray | `maximum-subarray` | Medium |
| 238 | Product of Array Except Self | `product-of-array-except-self` | Medium |
| 912 | Sort an Array | `sort-an-array` | Medium |
| 240 | Search a 2D Matrix II | `search-a-2d-matrix-ii` | Medium |
| 23 | Merge k Sorted Lists | `merge-k-sorted-lists` | Hard |
| 315 | Count of Smaller Numbers After Self | `count-of-smaller-numbers-after-self` | Hard |
| 493 | Reverse Pairs | `reverse-pairs` | Hard |
| 4 | Median of Two Sorted Arrays | `median-of-two-sorted-arrays` | Hard |

- [ ] **Step 1: Đọc bài mẫu** — `src/content/bang-bam.md` trọn vẹn, lấy làm mốc độ dài, giọng văn và cách dùng bốn chỉ thị. KHÔNG đọc file nào khác.
- [ ] **Step 2: Viết `src/data/lessons/work-span.js`** theo mục A của khuôn chuẩn.
- [ ] **Step 3: Viết `src/content/work-span.md`** theo mục B. Bảy khái niệm gom thành 5 tiêu đề `h3`: ẩn dụ bếp nhiều đầu bếp và hai đại lượng; luật Brent; luật Amdahl; chia để trị, reduce và scan; cái giá của song song.
- [ ] **Step 4: Bật cờ `ready`** theo mục E. Không sửa `src/App.vue`.
- [ ] **Step 5: Chạy test** — `npm run test -- --run`, PASS toàn bộ.
- [ ] **Step 6: Chạy build** — `npm run build`, không cảnh báo mới.
- [ ] **Step 7: Kiểm chứng bằng mắt** theo mục H.
- [ ] **Step 8: Commit**

```bash
git add src/data/lessons src/content src/lesson/parts.js
git commit -m "content: bai Work Span va tu duy song song"
```

---
## Task 24: Dự án Chương 7 — Công cụ phát hiện tài liệu trùng lặp

Làm theo mục "Khuôn chuẩn viết một dự án chương", sáu bước A tới F. Đọc lại ba luật ở đầu mục đó trước khi viết dòng dữ liệu đầu tiên.

**Files:**
- Create: `src/data/capstones/chuyen-de.js`
- Modify: `src/data/capstones/index.js`, `src/lesson/parts.js`

**Interfaces:**
- Consumes: mục "Dự án Chương 7 — Công cụ phát hiện tài liệu trùng lặp" trong `docs/superpowers/specs/2026-08-09-dac-ta-7-mvp.md` (từ dòng 669). Đọc trọn mục đó trước khi viết.
- Produces: `capstones['chuyen-de']`. Bài `do-kho-bai-toan` ở Task 25 hiển thị nó.

**Giá trị bắt buộc, không được suy diễn khác:**

- `uses`: `['thao-tac-bit', 'toan-so-hoc', 'chuoi-nang-cao', 'work-span', 'do-kho-bai-toan']`
- `reuses`: `[{ chapter: 1, module: 'bench' }, { chapter: 3, module: 'hashmap' }, { chapter: 3, module: 'trie' }]` — đúng ba dòng của bảng kế thừa trong đặc tả: `hashmap` để tra vân tay ngược về tài liệu; `trie` làm chỉ mục đoạn văn bản để định vị nhanh; `bench` để đo chi phí so mọi cặp và chi phí sau khi cắt tỉa.
- `data.url`: nguồn `GUTENBERG`, `https://www.gutenberg.org/ebooks/2701`.
- `data.format` và `data.sample`: lấy đúng phần mô tả định dạng và khối dòng mẫu trong đặc tả.

- [ ] **Step 1: Đọc đặc tả** — mục Dự án Chương 7 trong spec, trọn mục, và `src/data/capstones/do-thi.js` để lấy khuôn.
- [ ] **Step 2: Viết `src/data/capstones/chuyen-de.js`** theo mục A của khuôn chuẩn dự án chương.
- [ ] **Step 3: Khai báo trong `src/data/capstones/index.js`** theo mục B.
- [ ] **Step 4: Bật `capstoneReady: true`** cho chương `chuyen-de` theo mục C. Mục "Dự án thực hành" của Chương 7 bấm được ngay, không phải chờ Task 25.
- [ ] **Step 5: Chạy test** — `npm run test -- --run`.
- [ ] **Step 6: Chạy build** — `npm run build`, không cảnh báo mới.
- [ ] **Step 7: Commit**

```bash
git add src/data/capstones src/lesson/parts.js
git commit -m "content: du an Chuong 7 phat hien tai lieu trung lap"
```

---

## Task 25: Bài `do-kho-bai-toan` — NP-đầy đủ và khi nào dùng xấp xỉ

Bài cuối Chương 7 và cũng là bài cuối cùng của cả chương trình 30 nhóm. Dự án của chương nằm ở section riêng, bài này không dựng nó — xem Task 24. Đây lại là một bài dị biệt toàn khái niệm — bài mẫu gần nhất là `do-phuc-tap`.

**Files:**
- Create: `src/data/lessons/do-kho-bai-toan.js`
- Create: `src/content/do-kho-bai-toan.md`
- Modify: `src/lesson/parts.js` (chỉ dòng cờ của bài này)

**Interfaces:**
- Consumes: khung ở mục "Khuôn chuẩn viết một bài"; `capstoneCuaChuong('chuyen-de')` từ Task 24; `qhd-lis-lcs-doixung` cho câu `recall` — knapsack; `quay-lui-xau-nhi-phan` cho phần quay lui có cắt tỉa; `tham-lam` cho phần thuật toán xấp xỉ.
- Produces: phần cắt tỉa so cặp của MVP Chương 7.

Tiền tố id cho `h3` và ví dụ: `dk`.

**Ẩn dụ mở bài:** có hai loại bài toán khó. Loại thứ nhất khó vì bạn chưa nghĩ ra cách — như một câu đố mà lời giải nằm ngay đó, chỉ là bạn chưa thấy. Loại thứ hai khó vì bản thân nó khó: cả loài người đã thử suốt năm mươi năm, hàng nghìn người thông minh nhất, và không ai tìm ra cách nhanh. Biết mình đang đứng trước loại nào là kỹ năng quyết định — vì với loại thứ hai, việc đúng đắn không phải là cố nghĩ tiếp, mà là đổi câu hỏi.

**Khái niệm bắt buộc phủ, theo đúng thứ tự này:**

1. Phân biệt giải nhanh với kiểm nhanh, bằng ví dụ đời thường trước khi dùng thuật ngữ: tìm lời giải một trò xếp hình khó, nhưng kiểm một lời giải có đúng không thì dễ. Từ đó định nghĩa P là lớp bài toán giải được trong thời gian đa thức, NP là lớp bài toán kiểm được lời giải trong thời gian đa thức. Nói rõ NP **không** có nghĩa là "không đa thức" — đây là hiểu nhầm phổ biến nhất.
2. Quy dẫn, và vì sao nó là công cụ chứ không phải trò hình thức: nếu biến bài toán A thành bài toán B một cách hiệu quả, thì giải được B nhanh là giải được A nhanh. Từ đó suy ra chiều ngược lại thường dùng hơn: nếu A đã được biết là khó, và A quy dẫn được về B, thì B cũng khó.
3. NP-đầy đủ: các bài khó nhất trong NP, giải nhanh được một cái là giải nhanh được tất cả. Liệt kê bằng `formula-table` bốn bài kinh điển kèm phát biểu một dòng cho mỗi bài: SAT, knapsack dạng quyết định, người bán hàng rong, tô màu đồ thị. Thêm cột "bạn đã gặp ở bài nào" để nối về các bài cũ.
4. Câu hỏi P và NP, phát biểu cho đúng: chưa ai chứng minh được chúng bằng nhau, cũng chưa ai chứng minh được chúng khác nhau. Nói rõ sự khác biệt giữa "chưa ai làm được" và "đã chứng minh là không làm được" — đây là điểm mà rất nhiều tài liệu phổ thông nói sai.
5. Nghịch lý knapsack, và đây là chỗ phải cẩn thận nhất của cả bài: knapsack là NP-khó, nhưng ở bài Quy hoạch động bạn đã giải nó bằng bảng `O(n·W)`. Không mâu thuẫn — `W` là **giá trị** của sức chứa, còn kích thước đầu vào là số **chữ số** của `W`. Thuật toán đó gọi là giả đa thức: nhanh khi `W` nhỏ, và bùng nổ khi `W` cỡ `10¹⁸`. Phải giải thích cho hết chỗ này bằng một bảng nhỏ so `W` với số chữ số của nó.
6. Bốn cách sống chung với bài toán khó, mỗi cách một đoạn: chấp nhận vét cạn khi `n` nhỏ, có cắt tỉa — nối về bài Quay lui; giải đúng cho trường hợp riêng có cấu trúc đặc biệt — ví dụ đường đi dài nhất là NP-khó trên đồ thị chung nhưng dễ trên DAG, đúng bài Sắp xếp tô-pô; thuật toán xấp xỉ có bảo đảm tỉ số — ví dụ tham lam cho bài phủ đỉnh cho ra kết quả không quá hai lần tối ưu; và heuristic không có bảo đảm nhưng chạy tốt trong thực tế.
7. Tỉ số xấp xỉ, định nghĩa rõ: kết quả của thuật toán chia cho kết quả tối ưu, trong trường hợp xấu nhất. Nói rõ giá trị của một bảo đảm: "không bao giờ tệ quá hai lần" là lời hứa dùng được trong hợp đồng phần mềm, còn "thường thì tốt" thì không.

**Hai ví dụ điển hình:**

- `vd-dk-quy-dan-balo-ve-tap-con` — "Quy dẫn bài toán tổng tập con về knapsack, từng bước". Nêu hai bài toán bằng phát biểu rõ ràng. Bảng: mỗi hàng là một thành phần của bài gốc và thành phần tương ứng được dựng ra ở bài đích — món đồ, cân nặng, giá trị, sức chứa. Rồi một bảng nhỏ chạy trên một bộ dữ liệu cụ thể ba phần tử, cho thấy lời giải của bài này chuyển thành lời giải của bài kia. Chỗ then chốt: phép quy dẫn phải chạy trong thời gian đa thức, nếu không thì nó chẳng chứng minh được gì — và điều đó phải kiểm, không được coi là hiển nhiên. Chi phí: phép dựng ở đây là `O(n)`, nên nó là quy dẫn hợp lệ.
- `vd-dk-xap-xi-tham-lam-phu-dinh` — "Xấp xỉ 2 cho bài phủ đỉnh, và vì sao con số 2 là một lời hứa". Nêu bài phủ đỉnh. Bảng chạy tay trên một đồ thị sáu đỉnh: mỗi hàng ghi cạnh chưa bị phủ được chọn, hai đỉnh được nhận vào kết quả, và các cạnh bị loại. Rồi so kết quả với lời giải tối ưu tìm bằng vét cạn. Chỗ then chốt: thuật toán chọn **cả hai** đỉnh của mỗi cạnh, nghe có vẻ lãng phí, nhưng chính điều đó cho ra bảo đảm — lời giải tối ưu buộc phải chứa ít nhất một trong hai đỉnh ấy, nên kết quả của ta không quá gấp đôi. Chỗ này là lý do một thuật toán "ngốc" lại có bảo đảm mạnh hơn một heuristic tinh vi mà không chứng minh được gì. Chi phí: `O(E)`, so với vét cạn `O(2^V)`.

**Câu quiz `recall: true`:** hỏi về bài Quy hoạch động nâng cao — knapsack được nói là NP-khó, nhưng bảng quy hoạch động giải nó trong `O(n·W)`; giải thích chỗ này. Đáp án đúng: `O(n·W)` là giả đa thức vì `W` là giá trị chứ không phải kích thước đầu vào; kích thước đầu vào là số chữ số của `W`, nên `W` cỡ `10¹⁸` làm bảng bùng nổ dù chỉ có 19 chữ số.

**Ba bài tập kiểm tra:**

1. Cài vét cạn có cắt tỉa cho bài knapsack dạng quyết định, rồi đo thời gian với `n` tăng từ 10 tới 30 và ghi lại mốc `n` mà máy bạn không chạy nổi trong một phút. So với bảng quy hoạch động ở cùng bộ dữ liệu, và tìm bộ dữ liệu mà bảng quy hoạch động lại là bên thua.
2. Cài thuật toán xấp xỉ 2 cho bài phủ đỉnh, và cài vét cạn tìm lời giải tối ưu cho đồ thị nhỏ. Chạy cả hai trên 500 đồ thị ngẫu nhiên dưới 15 đỉnh, ghi lại tỉ số thực tế mỗi lần, và kiểm rằng không lần nào tỉ số vượt 2.
3. Chọn một bài toán trong công việc hoặc sở thích của bạn, phát biểu nó cho chính xác, rồi quyết định xem nó thuộc loại nào: giải đúng được trong thời gian đa thức, hay có mùi NP-khó. Nếu là loại thứ hai, viết ra bằng chữ cách bạn sẽ sống chung với nó trong bốn cách đã học, và vì sao chọn cách đó.

**Danh sách LeetCode (10 bài, đã xếp dễ tới khó):**

| no | name | slug | level |
|---|---|---|---|
| 1863 | Sum of All Subset XOR Totals | `sum-of-all-subset-xor-totals` | Easy |
| 78 | Subsets | `subsets` | Medium |
| 46 | Permutations | `permutations` | Medium |
| 39 | Combination Sum | `combination-sum` | Medium |
| 416 | Partition Equal Subset Sum | `partition-equal-subset-sum` | Medium |
| 698 | Partition to K Equal Sum Subsets | `partition-to-k-equal-sum-subsets` | Medium |
| 847 | Shortest Path Visiting All Nodes | `shortest-path-visiting-all-nodes` | Hard |
| 943 | Find the Shortest Superstring | `find-the-shortest-superstring` | Hard |
| 1723 | Find Minimum Time to Finish All Jobs | `find-minimum-time-to-finish-all-jobs` | Hard |
| 1799 | Maximize Score After N Operations | `maximize-score-after-n-operations` | Hard |

- [ ] **Step 1: Đọc bài mẫu và dữ liệu MVP** — `src/content/do-phuc-tap.md` (bài dị biệt cùng dạng), `src/content/cay-khung-nho-nhat.md` (bài cuối chương gần nhất), `src/data/capstones/chuyen-de.js`.
- [ ] **Step 2: Viết `src/data/lessons/do-kho-bai-toan.js`** theo mục A của khuôn chuẩn.
- [ ] **Step 3: Viết `src/content/do-kho-bai-toan.md`** theo mục B. Bảy khái niệm gom thành 5 tiêu đề `h3`: ẩn dụ hai loại khó, P và NP; quy dẫn; NP-đầy đủ và câu hỏi P–NP; nghịch lý knapsack và giả đa thức; bốn cách sống chung, và tỉ số xấp xỉ.
- [ ] **Step 4: Bật cờ `ready`** theo mục E. Không sửa `src/App.vue`.
- [ ] **Step 5: Chạy test** — `npm run test -- --run`.
- [ ] **Step 6: Chạy build** — `npm run build`, không cảnh báo mới.
- [ ] **Step 7: Kiểm chứng bằng mắt** theo mục H, cộng thêm: **toàn bộ sidebar không còn một nhãn "sắp có" nào** — 30 bài đều bấm được. Cuộn hết Chương 7 để chắc chắn không bài nào lỗi hiển thị.
- [ ] **Step 8: Commit**

```bash
git add src/data/lessons src/content src/lesson/parts.js
git commit -m "content: bai Do kho bai toan"
```

---

## Task 26: Chốt Giai đoạn 3

**Files:**
- Modify: `CLAUDE.md`, `README.md`
- Modify: `docs/superpowers/plans/KE-HOACH.md` (nhật ký phiên làm việc + bảng trạng thái tổng quan)

**Interfaces:**
- Consumes: trạng thái sau Task 25 — 30 bài `ready`, 7 chương `capstoneReady`.

- [ ] **Step 1: Kiểm trạng thái thật, không tin trí nhớ**

Run:

```bash
npm run test -- --run
npm run build
grep -c " ready: true" src/lesson/parts.js
grep -c "capstoneReady: true" src/lesson/parts.js
grep -c "duAn" src/lesson/parts.js
grep -rc "project:" src/data/lessons/
ls src/content/*.md | wc -l
ls src/sections/*.vue | wc -l
ls src/data/lessons/*.js | wc -l
ls src/data/capstones/*.js | wc -l
```

Expected: test và build xanh; `ready: true` đếm được 30; `capstoneReady: true` đếm được **7** — cả bảy chương, kể cả Chương 6, vì từ Giai đoạn 2.6 dự án không còn phải chờ bài cuối chương làm chỗ hiển thị; `duAn` đếm được **0**; không file dữ liệu bài nào có `project:`; `src/content` có 30 file `.md`; `src/sections` chỉ còn **1** file là `TrangChu.vue` (trang giới thiệu, không phải bài học); `src/data/lessons` có 31 file (30 bài cộng `index.js`); `src/data/capstones` có 8 file (7 dự án cộng `index.js`).

Con số nào lệch thì tìm ra bài bị bỏ sót và làm nốt trước khi đi tiếp. Đừng sửa con số kỳ vọng cho khớp thực tế.

- [ ] **Step 2: Cập nhật mục "Trạng thái" trong `CLAUDE.md`**

Thay đoạn trạng thái hiện có bằng nội dung mới: Giai đoạn 0–3 xong; 30 bài đã viết, đủ 7 dự án chương; còn lại là Giai đoạn 4 (quiz ôn và `note` LeetCode cho 10 bài cũ) và Giai đoạn 5 (rà soát). Thêm một dòng trỏ tới kế hoạch này.

Trong bảng "Quy tắc chi phí", đổi dòng Giai đoạn 3 thành **đã xong**.

- [ ] **Step 3: Cập nhật `README.md`**

Đọc `README.md` trước. Cập nhật mọi chỗ còn nói app có 10 nhóm kiến thức: đổi thành 30 nhóm, 7 chương, mỗi bài 7 mục, và **7 dự án thực hành, mỗi chương một cái, mỗi cái là một bài toán có thật trong cuộc sống**. Không đổi phần hướng dẫn chạy.

- [ ] **Step 4: Ghi nhật ký phiên làm việc**

Thêm một dòng vào bảng "Nhật ký phiên làm việc" ở đầu file này, ghi rõ Giai đoạn 3 đã xong và số bài đã viết.

- [ ] **Step 5: Đánh dấu kế hoạch này đã hoàn thành**

Đổi dòng trạng thái ngay dưới tiêu đề "Giai đoạn 3" thành "**Trạng thái: đã hoàn thành <ngày>.**", và cập nhật ô Giai đoạn 3 trong bảng "Trạng thái tổng quan" ở đầu file sang ✅.

- [ ] **Step 6: Chạy lại test và build**

Run: `npm run test -- --run` rồi `npm run build`
Expected: cả hai xanh.

- [ ] **Step 7: Commit**

```bash
git add CLAUDE.md README.md docs/superpowers/plans/KE-HOACH.md
git commit -m "docs: chot Giai doan 3, 30 bai va 7 du an chuong"
```

- [ ] **Step 8: DỪNG LẠI — báo cáo và nhắc bước tiếp theo**

Không tự ý bước sang Giai đoạn 4. Báo với người dùng: Giai đoạn 3 xong, còn Giai đoạn 4 (Sonnet, subagent tuần tự) và Giai đoạn 5 (Opus, inline), và Giai đoạn 4 cần một kế hoạch riêng chưa được viết.

---

## Giai đoạn 4: quiz ôn và `note` LeetCode cho 10 bài cũ

**Model: Sonnet, subagent tuần tự.** Kế hoạch chi tiết chưa viết — viết trước khi chạy.

**Giai đoạn này đã nhẹ đi hẳn sau Giai đoạn 2.6.** Phần việc lớn nhất của nó trước đây là
viết Phần 7 cho 10 bài cũ; giờ bài học không có dự án nữa, nên phần đó biến mất. Còn lại
đúng hai món.

10 bài viết ở đợt đầu (`quay-lui-xau-nhi-phan`, `to-hop`, `tham-lam`, `qhd-nen-tang`,
`qhd-lis-lcs-doixung`, `ngan-xep-hang-doi`, `dfs-bfs`, `dsu`, `cay-nhi-phan-bst`,
`bst-nang-cao`) ra đời trước khi khung có cờ `recall`. Số liệu đo ngày 2026-08-11 bằng
cách render thật từng bài trong jsdom:

| Hạng mục | 5 bài mới (GĐ 0–2) | 10 bài cũ | Ghi chú |
|---|---|---|---|
| Câu quiz `recall: true` | 1 câu mỗi bài | **0 câu cả 10** | Sau Giai đoạn 2.6, luật `recall` ép với mọi bài `ready` nên 10 bài này đang đỏ có chủ ý |
| Số câu quiz | 5 câu | 3–5 câu, `quay-lui-xau-nhi-phan` chỉ có **3** | Đủ luật nhưng mỏng nhất khoá |
| Tổng độ dài `note` LeetCode | 737–938 ký tự | 289–390 ký tự | Bài cũ ghi chú ngắn hơn ~2,5 lần |
| Phần 4 Ví dụ điển hình | 5.100–12.300 ký tự | 5.100–12.300 ký tự | **Đã đồng đều, không bài nào rỗng** |

Việc phải làm, mỗi bài một task, mỗi task một commit. Đây là **việc thuần dữ liệu** —
không đụng vào file trình bày của bài nào:

- [ ] Thêm tối thiểu 1 câu quiz `recall: true` hỏi về **bài đã học trước đó**, không
      phải hỏi lại chính bài đang đọc (trừ bài đầu khoá). Xong bài nào thì gỡ tên bài đó
      khỏi danh sách miễn trừ trong test (xem Task 2.6.2, Step 4).
- [ ] Nâng `quay-lui-xau-nhi-phan` từ 3 lên 5 câu quiz, và dày thêm `note` LeetCode
      cho 10 bài cũ về mức 700+ ký tự tổng.
- [ ] **Không viết `project` cho bài nào.** Trường đó đã bị xoá khỏi schema và test cấm
      dựng lại.

---

## Giai đoạn 5: rà soát toàn khoá

**Model: Opus, inline.** Kế hoạch chi tiết chưa viết.

- [ ] Đọc liền mạch 30 bài, kiểm tra mạch bắc cầu giữa các chương không đứt đoạn.
- [ ] Chuẩn hoá giọng văn và thuật ngữ. Đặc biệt: cặp thuật ngữ Việt–Anh phải nhất
      quán ("O lớn (Big O)" là mẫu đã chốt ngày 2026-08-11).
- [ ] **Kiểm chứng giao diện bằng mắt qua `npm run dev`** — món nợ tồn từ nhiều phiên,
      test và build xanh không chứng minh được layout.
- [ ] Kiểm lại cảnh báo `<tr> cannot be child of <table>`: bảng Markdown sinh ra
      `<thead>`/`<tbody>` đúng chuẩn, nên Giai đoạn 2.5 lẽ ra đã dọn sạch cảnh báo này.
      Nếu còn thì tìm chỗ còn viết `<table>` thô trong file `.md`.
- [ ] Sửa lỗi có sẵn ở `src/style.css`: một comment mở bằng `\*` thay vì `/*` làm luật
      `.widget { overflow-x: auto; }` ngay dưới nó bị nuốt, nên widget không cuộn ngang
      được ở màn hẹp. Sửa một ký tự, nhưng đổi hành vi layout nên phải nhìn bằng mắt.
- [ ] Viết lại README.

---

## Phụ lục: lưu trữ hai kế hoạch đã hoàn thành

Bản đầy đủ của hai kế hoạch dưới đây nằm trong lịch sử git (`git log --all --  docs/superpowers/plans/`).
Tóm tắt giữ ở đây để không mất mạch, vì các quyết định thiết kế của chúng vẫn đang ràng
buộc mọi việc còn lại.

### A. Viết lại 10 nhóm kiến thức — `2026-08-09-content-rewrite.md`, xong 2026-08-09

21 task, 3 phase. Kết quả để lại và vẫn còn hiệu lực:

- **Tách hai lớp.** Lớp cấu trúc là component Vue dùng chung (`LessonGoal`, `LessonPart`,
  `QuizBlock`, `WorkedExample`, `PracticeSet`, `LeetCodeList`) cộng dữ liệu có schema ở
  `src/data/lessons/<sid>.js` — phần này được test tự động. Lớp văn xuôi nằm trong
  template của từng `src/sections/*.vue`, đặt trong **slot** của các component chuẩn.
- **`src/lesson/parts.js` là nguồn sự thật duy nhất** cho khung mục, thứ tự bài học và
  dữ liệu menu trái. Không định nghĩa lại ở chỗ khác.
- **Menu bài tập bên phải sinh tự động** từ khung chuẩn (`src/data/menu.js`), thay cho
  `menus.json` viết tay.
- **17 widget tương tác giữ nguyên** toàn bộ id DOM cũ.
- Bộ test dựng ở giai đoạn này (Vitest 3 + jsdom) là rào chắn cho mọi giai đoạn sau.

**Bài học rút ra, phải nhớ:** `WorkedExample` render **6 slot có tên** (`de-bai`,
`y-tuong`, `thuat-toan`, `chay-tay`, `code`, `toi-uu`). Đổ nội dung vào slot mặc định
thì Vue vứt đi im lặng — không lỗi build, không lỗi test, Phần 4 chỉ còn 6 cái nhãn
trống. Lỗi này đã sống sót qua 5 bài trước khi bị phát hiện ngày 2026-08-11. Test
`lesson-structure.spec.js` giờ đếm slot nên chặn được, nhưng khi viết bài mới vẫn phải
tự nhớ.

### B. Mở rộng 30 nhóm, Giai đoạn 0–2 — `2026-08-09-mo-rong-30-nhom-gd0-2.md`, xong 2026-08-10

12 task. Kết quả để lại và vẫn còn hiệu lực:

- **`CHAPTERS` trong `parts.js`** mô tả 7 chương × 30 bài, kèm hai cờ `ready` và `duAn`.
  (Cờ `duAn` đã bị xoá ở Giai đoạn 2.6 — dòng này ghi lại lịch sử, không phải trạng thái.)
- **`src/data/nav.js` đã bị xoá.** Nó từng viết tay lại danh sách bài học với cách gom
  nhóm khác hẳn `parts.js` — đúng kiểu lỗi hai-nguồn-sự-thật. **Đừng dựng lại nó dưới
  bất kỳ tên nào.**
- **Sidebar hiện bài chưa viết dạng mờ**, không bấm được, để người học thấy lộ trình.
- **Phần 7 Dự án thực hành** vào khung bài học, cùng component `ProjectBrief.vue` và
  schema `project` 6 trường. (`ProjectBrief.vue` còn sống và vẫn là chỗ trình bày một dự
  án; **Phần 7 cấp bài và schema `project` đã bị xoá ở Giai đoạn 2.6.**)
- **Cờ `recall`** cho câu quiz ôn tập.
- **Dự án của chương nằm ở `src/data/capstones/<chapter-key>.js`**, không nằm trong dữ
  liệu bài học — nó thuộc về cả chương chứ không thuộc về một bài. Đây là quyết định
  **vẫn còn nguyên hiệu lực**, và Giai đoạn 2.6 đi tiếp theo đúng hướng đó: cho nó luôn
  một section riêng thay vì gửi nhờ trong bài cuối chương.
- **Hai bài mẫu** `do-phuc-tap` và `bang-bam` — đây là hai bài mọi task Giai đoạn 3 phải
  đọc trước khi viết.
