# dsa-app

SPA tĩnh dạy Cấu trúc dữ liệu & Giải thuật cho người mới, tiếng Việt. Vue 3 + Vite,
không backend, không DB. Nội dung bài học nằm trong mã nguồn (`src/sections/*.vue`,
`src/data/lessons/*.js`), không nằm ở runtime store nào.

Lệnh: `npm run dev` | `npm run build` | `npm run test -- --run`

## Công việc đang chạy

Viết lại toàn bộ nội dung 10 nhóm kiến thức theo khung 6 phần.
Kế hoạch đầy đủ: `docs/superpowers/plans/2026-08-09-content-rewrite.md` — 21 task,
mỗi task kết thúc bằng test xanh + commit. **Đọc file kế hoạch trước khi làm bất kỳ
task nào**; đặc tả nội dung, khuôn mẫu template và danh sách LeetCode đều nằm ở đó.

## Quy tắc chi phí — BẮT BUỘC

Dự án chạy trên gói Claude $20 (Pro), giới hạn theo cửa sổ 5 giờ trượt + hạn mức tuần.

| Task | Model | Cách chạy |
|---|---|---|
| 0–8 | Opus | Inline |
| 9–18 | **Sonnet** | Subagent, **mỗi lần đúng 1 agent, tuần tự** |
| 19–20 | Opus | Inline |

Task 9–17 là công việc lặp khuôn, đã có bài mẫu (Task 8) + đặc tả chi tiết + test ép
đúng cấu trúc, nên Sonnet là đủ.

**Luật tự kiểm, áp dụng đầu mỗi phiên và mỗi khi chuyển sang dải task khác:**

1. Đối chiếu model đang chạy với bảng trên.
2. Nếu lệch — nhất là **đang chạy Opus mà sắp làm Task 9–18** — **dừng lại, nhắc người
   dùng đổi model bằng `/model` trước khi bắt đầu**. Không lặng lẽ làm tiếp.
3. Người dùng đã được nhắc mà vẫn muốn giữ model hiện tại thì làm theo, và không nhắc
   lại về task đó nữa.
4. Không dùng workflow / multi-agent orchestration. Không fan-out subagent song song —
   nếu người dùng yêu cầu, nêu tác động tới hạn mức đúng một lần rồi làm theo quyết định
   của họ.

Sau mỗi phiên, ghi một dòng vào bảng "Nhật ký phiên làm việc" ở cuối mục "Chiến lược
chi phí" trong file kế hoạch.

## Quy ước nội dung

- Tiếng Việt, xưng "bạn", giọng thân thiện, không đổi tone giữa các bài.
- **Không dùng chữ nghiêng** ở bất kỳ đâu — `src/style.css` ép `font-style: normal`,
  không được gỡ luật này.
- Code mẫu là C++, đặt trong `<pre v-pre><code>`, escape `<` thành `&lt;`, `&` thành `&amp;`.
- Giải thích theo Feynman: ví dụ đời thường trước, thuật ngữ sau; mỗi khái niệm trả lời
  đủ "Đây là gì? / Vì sao quan trọng? / Làm sao dùng?".

## Ràng buộc kỹ thuật

- Mỗi section phải giữ nguyên `id`, `class="day-section"`, `data-sid`, `v-show="active"`
  và `defineProps({ active: Boolean })` — `App.vue` phụ thuộc vào đúng các thuộc tính này.
- **Không đổi id DOM mà widget đang query.** Trước khi sửa một section, chạy
  `grep -o "getElementById('[^']*'" src/widgets/<ten>.js | sort -u` và giữ nguyên mọi id
  in ra. 17 widget tương tác hiện có phải chạy được sau mỗi thay đổi.
- `src/lesson/parts.js` là nguồn sự thật duy nhất về khung 6 phần — sửa khung thì sửa ở
  đúng đó, không rải rác.
- Menu bài tập bên phải được **sinh tự động** từ khung chuẩn (`src/data/menu.js`), không
  viết tay.
