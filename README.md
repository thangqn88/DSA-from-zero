# Giáo Án Ôn Thi CTDL & GT — Bản Vue + Vite (SPA)

Bản chuyển đổi từ file HTML tĩnh sang Single Page Application dùng **Vue 3 + Vite**.

## Chạy thử (development)

```bash
npm install
npm run dev
```

Mở địa chỉ hiện ra trong terminal (mặc định `http://localhost:5173`).

## Build bản tĩnh để deploy / mở offline

```bash
npm run build
npm run preview
```

`npm run build` tạo thư mục `dist/` — có thể deploy lên Vercel/Netlify/GitHub Pages,
hoặc mở offline bằng cách chạy 1 server tĩnh bất kỳ trong thư mục `dist/`
(ví dụ `npx serve dist`). **Không nên mở trực tiếp `dist/index.html` bằng
double-click** — trình duyệt sẽ chặn một số tính năng do giới hạn bảo mật của
`file://`, y hệt vấn đề gặp phải ở bản HTML tĩnh cũ.

## Cấu trúc thư mục

```
src/
  App.vue              -> layout chính: menu trái + nội dung + menu phải
  style.css            -> toàn bộ CSS (đã bỏ chữ nghiêng — font-style: italic)
  data/
    nav.js             -> dữ liệu menu trái (5 nhóm kiến thức)
    menus.json         -> dữ liệu menu phải (bài tập/mục con theo từng nhóm)
  sections/            -> 12 component, mỗi component = 1 nhóm kiến thức
  widgets/             -> logic JS cho từng widget tương tác (stepper, đồ thị, cây...)
  utils/stepper.js     -> engine dùng chung cho mọi widget bước-từng-bước
```

## Cách hoạt động

- Click vào menu trái → đổi `activeSection` (reactive state trong `App.vue`) →
  Vue tự động ẩn/hiện đúng component tương ứng bằng `v-show`.
- Menu phải tự động đổi theo `activeSection`, lấy dữ liệu từ `data/menus.json`
  (đã tự trích xuất toàn bộ tiêu đề `<h3>`/`<h4>` trong mỗi nhóm, mục nào có
  dấu ★ là bài chính thức trong đề).
- Toàn bộ 17 widget tương tác (backtracking, N-Queens, tổ hợp, DFS/BFS, DSU,
  duyệt cây, v.v.) giữ nguyên logic cũ, chỉ bọc lại trong `onMounted()` của
  từng Vue component.
- URL có `#id` để chia sẻ/bookmark trực tiếp tới 1 mục cụ thể, dùng
  `history.pushState` — hoạt động bình thường khi chạy qua server thật
  (không còn lỗi "Unsafe attempt to load URL" như khi mở file `file://` cũ).

## Đã kiểm tra

- `npm run build` chạy sạch, không lỗi.
- Đã test bằng trình duyệt headless: click qua toàn bộ 12 nhóm kiến thức và
  bấm "Bước tiếp theo" trên cả 17 widget — không phát sinh lỗi console nào.
- Đã xác nhận **không còn chữ nghiêng** ở bất kỳ đâu trong toàn trang.

## Ghi chú

- Đã sửa 1 lỗi thẻ `<em>` chưa đóng trong nội dung gốc (phần Cẩm nang — DSU),
  Vue's compiler nghiêm ngặt hơn trình duyệt nên bắt được lỗi này mà bản HTML
  tĩnh cũ không phát hiện ra.
- Nếu muốn thêm 1 nhóm kiến thức mới: tạo file `.vue` mới trong `src/sections/`,
  thêm entry vào `src/data/nav.js`, thêm dữ liệu menu phải vào
  `src/data/menus.json`, rồi import + thêm dòng `<TenComponent :active="..."/>`
  vào `App.vue`.
