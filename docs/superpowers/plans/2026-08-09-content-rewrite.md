# Kế hoạch triển khai: Viết lại toàn bộ nội dung bài học DSA

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Trước khi bắt đầu bất kỳ task nào, đọc mục "Chiến lược chi phí" ngay bên dưới
> Global Constraints** — nó quy định model và cách chạy cho từng dải task, kèm luật
> bắt buộc nhắc người dùng khi model đang dùng không khớp.

**Goal:** Chuyển 10 nhóm kiến thức DSA từ dạng "ghi chú thuật toán" sang lộ trình học 6 phần chuẩn (Mục tiêu → Lý thuyết → Vì sao quan trọng → Quiz → Ví dụ điển hình → Bài tập + LeetCode), giải thích theo phương pháp Feynman, với cấu trúc và giọng văn nhất quán trên toàn app.

**Architecture:** Tách nội dung thành 2 lớp. Lớp **cấu trúc** là các component Vue dùng chung (`LessonPart`, `QuizBlock`, `WorkedExample`, `PracticeSet`, `LeetCodeList`) + dữ liệu có schema (`src/data/lessons/<sid>.js`) — phần này được test tự động. Lớp **văn xuôi** vẫn nằm trong template của từng `src/sections/*.vue`, đặt trong slot của các component chuẩn. Menu bài tập bên phải chuyển từ `menus.json` viết tay sang sinh tự động từ cấu trúc chuẩn, nên không bao giờ lệch với nội dung. Toàn bộ 17 widget tương tác hiện có giữ nguyên, chỉ được đặt vào đúng phần trong khung mới.

**Tech Stack:** Vue 3 (`<script setup>`), Vite 8, Vitest + @vue/test-utils + jsdom (thêm mới), C++ cho code mẫu trong bài học.

## Global Constraints

- Ngôn ngữ nội dung: **tiếng Việt**, xưng hô "bạn", giọng thân thiện, không đổi tone giữa các section.
- **Không dùng chữ nghiêng** ở bất kỳ đâu (`src/style.css` đã ép `font-style: normal` cho `em, i, cite, q, dfn, var, address` — không được gỡ luật này).
- Code mẫu trong bài: **C++**, đặt trong `<pre v-pre><code>`, escape `<` thành `&lt;` và `&` thành `&amp;`.
- Mỗi section giữ nguyên `id`, `class="day-section"`, `data-sid`, `v-show="active"` và prop `active: Boolean` — App.vue phụ thuộc vào đúng các thuộc tính này.
- Mỗi section giữ nguyên toàn bộ widget tương tác hiện có (đúng các `id` DOM cũ) — các file `src/widgets/*.js` query theo id, đổi id sẽ vỡ widget.
- 10 nhóm kiến thức phải viết lại: `quay-lui-xau-nhi-phan`, `to-hop`, `tham-lam`, `qhd-nen-tang`, `qhd-lis-lcs-doixung`, `ngan-xep-hang-doi`, `dfs-bfs`, `dsu`, `cay-nhi-phan-bst`, `bst-nang-cao`. Section `trang-chu` **không** theo khung 6 phần (chỉ chỉnh ở Task 18). Section `cam-nang` đã bị xóa khỏi dự án ngày 2026-08-09.
- Số lượng bắt buộc mỗi nhóm: quiz **3–5** câu, bài tập kiểm tra **đúng 3** bài, LeetCode **8–12** bài xếp từ Easy → Medium → Hard.
- Mỗi ví dụ điển hình phải đủ 6 khối: đề bài → ý tưởng cốt lõi → thuật toán → chạy tay → code mẫu → cách tối ưu hơn.
- Mọi task kết thúc bằng: `npm run test -- --run` xanh **và** `npm run build` sạch, rồi commit.

---

## Chiến lược chi phí: dùng model nào, chạy kiểu gì

> **BẮT BUỘC ĐỌC Ở ĐẦU MỖI PHIÊN LÀM VIỆC.**
> Dự án dự kiến chạy trên gói Claude $20 (Pro) — giới hạn theo cửa sổ 5 giờ trượt
> và hạn mức tuần. Kế hoạch được chia 21 task độc lập, mỗi task kết thúc bằng
> test xanh + commit, nên **dừng giữa chừng không mất gì**. Không cần cố làm một mạch.

### Bảng model theo giai đoạn

| Task | Việc | Model nên dùng | Cách chạy |
|---|---|---|---|
| 0–7 | Dựng hạ tầng, thiết kế component + schema | **Opus** | Inline (file nhỏ, phụ thuộc chặt, tái dùng context) |
| 8 | Section mẫu — định hình khuôn mẫu và giọng văn | **Opus** | Inline (bài này quyết định chất lượng 9 bài sau) |
| 9–17 | 9 nhóm kiến thức còn lại | **Sonnet** | Subagent, **mỗi lần đúng 1 agent, tuần tự** |
| 18 | Trang chủ, dọn `menus.json` | **Sonnet** | Inline |
| 19–20 | Rà soát người mới, giọng văn, responsive, README | **Opus** | Inline (cần nhìn tổng thể xuyên suốt) |

**Vì sao Task 9–17 dùng Sonnet:** tới lúc đó đã có bài mẫu (Task 8), đặc tả nội dung
chi tiết sẵn trong kế hoạch, và test tự động ép đúng cấu trúc + số lượng. Đây là
công việc lặp khuôn có rào chắn — không cần Opus. Đổi model bằng `/model`.

**Vì sao chạy subagent tuần tự, không song song:** tổng token của subagent thấp hơn
inline (context mỗi task nhỏ và không phình dần), nhưng chạy song song sẽ dồn tiêu thụ
vào cùng một cửa sổ 5 giờ và chạm trần sớm. Tuần tự giữ nguyên lợi ích token mà không
đốt hạn mức theo cụm.

**Không dùng** workflow / multi-agent orchestration cho dự án này — sinh hàng chục agent
cùng lúc, không phù hợp gói Pro và cũng không cần thiết.

### Luật nhắc nhở (Claude phải tự kiểm)

Đầu mỗi phiên và **mỗi khi chuyển sang một task thuộc dải khác trong bảng trên**,
Claude phải:

1. Đối chiếu model đang chạy với cột "Model nên dùng" của task sắp làm.
2. Nếu lệch — đặc biệt là **đang chạy Opus mà sắp làm Task 9–18** — phải **dừng lại và
   nhắc người dùng đổi model trước khi bắt đầu**, không được lặng lẽ làm tiếp.
3. Nếu người dùng vẫn muốn giữ nguyên model sau khi được nhắc, thì làm theo ý người dùng
   và không nhắc lại về task đó nữa.
4. Nếu người dùng yêu cầu fan-out nhiều subagent song song, nêu rõ tác động tới hạn mức
   một lần, rồi làm theo quyết định của người dùng.

### Nhật ký phiên làm việc

Điền sau mỗi phiên. Cột "Hạn mức" lấy từ lệnh `/status` lúc kết thúc phiên.

| Ngày | Task đã xong | Model đã dùng | Cách chạy | Hạn mức còn / ghi chú |
|---|---|---|---|---|
| 2026-08-09 | Task 0–7 (trọn PHASE 0) | Opus | Inline | Hạ tầng xong: Vitest 3 + jsdom, 6 component dùng chung, schema dữ liệu, menu sinh tự động. `tests/lesson-structure.spec.js` đỏ 3 test cho `quay-lui-xau-nhi-phan` — đúng thiết kế Task 6, Task 8 sẽ làm xanh. |
| 2026-08-09 | Task 8 (section pilot Quay lui) | Opus | Inline | Toàn bộ 35 test xanh, build sạch. Widget kiểm chứng bằng test tạm mount section trong jsdom (đã xóa sau khi chạy) — đủ 18 id DOM còn nguyên, stepper phản hồi đúng. **Phiên sau bắt đầu Task 9, phải đổi sang Sonnet bằng `/model` và chạy subagent tuần tự.** |

---

## Cấu trúc file

**Tạo mới — lớp cấu trúc:**

| File | Trách nhiệm |
|---|---|
| `src/lesson/parts.js` | Nguồn sự thật duy nhất: danh sách 6 phần chuẩn, hàm sinh id, danh sách 10 section (sid ↔ file ↔ tên hiển thị) |
| `src/components/LessonGoal.vue` | Khối "Sau bài này, bạn có thể…" ở đầu mỗi section |
| `src/components/LessonPart.vue` | Bọc 1 phần chuẩn: sinh đúng `<h3 id>` + tiêu đề chuẩn + slot nội dung |
| `src/components/QuizBlock.vue` | Quiz trắc nghiệm tương tác (chọn đáp án → hiện đúng/sai + giải thích + điểm) |
| `src/components/WorkedExample.vue` | Ví dụ điển hình 6 khối, mỗi khối là 1 slot |
| `src/components/PracticeSet.vue` | 3 bài tập kiểm tra, mỗi bài có gợi ý ẩn trong `<details>` |
| `src/components/LeetCodeList.vue` | Bảng LeetCode nhóm theo Easy/Medium/Hard, có link ngoài |
| `src/data/lessons/<sid>.js` | Dữ liệu 1 nhóm: `goal`, `examples`, `quiz`, `practice`, `leetcode` (10 file) |
| `src/data/lessons/index.js` | Gom 10 file trên thành map `lessons[sid]` |
| `src/data/menu.js` | `buildMenu(sid)` — sinh menu phải từ cấu trúc chuẩn, fallback `menus.json` |
| `tests/lesson-data.spec.js` | Test schema cho toàn bộ dữ liệu 10 nhóm |
| `tests/lesson-structure.spec.js` | Test 10 file `.vue` có đủ 6 phần chuẩn + đúng id ví dụ |
| `tests/components/*.spec.js` | Test hành vi từng component dùng chung |

**Sửa:**

| File | Thay đổi |
|---|---|
| `vite.config.js` | Thêm cấu hình `test` cho Vitest |
| `package.json` | Thêm devDeps + script `test` |
| `src/style.css` | Thêm CSS cho các block mới (quiz, example, leetcode) |
| `src/App.vue:132` | `currentMenu` dùng `buildMenu(sid)` |
| `src/sections/*.vue` (10 file) | Viết lại nội dung theo khung 6 phần |
| `src/data/menus.json` | Xóa 10 key của các nhóm kiến thức, chỉ giữ `trang-chu` |

---

## PHASE 0 — Hạ tầng

### Task 0: Khởi tạo git + bộ test

**Files:**
- Create: `.gitignore` (đã có — chỉ kiểm tra), `tests/smoke.spec.js`
- Modify: `package.json`, `vite.config.js`

**Interfaces:**
- Consumes: không có
- Produces: lệnh `npm run test -- --run` chạy được Vitest với môi trường jsdom; repo git có commit gốc

- [x] **Step 1: Kiểm tra repo git và khởi tạo nếu chưa có**

```bash
cd e:/Repos/dsa-app
git rev-parse --is-inside-work-tree || git init
```

- [x] **Step 2: Kiểm tra `.gitignore` có `node_modules` và `dist`**

Mở `.gitignore`. Nếu thiếu, thêm 2 dòng:

```
node_modules
dist
```

- [x] **Step 3: Commit toàn bộ trạng thái hiện tại làm mốc gốc**

```bash
git add -A
git commit -m "chore: baseline before content rewrite"
```

- [x] **Step 4: Cài bộ test**

```bash
npm i -D vitest@^3 @vue/test-utils@^2 jsdom@^25
```

- [x] **Step 5: Thêm script `test` vào `package.json`**

Trong khối `"scripts"`, thêm dòng:

```json
"test": "vitest"
```

- [x] **Step 6: Cấu hình Vitest trong `vite.config.js`**

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.spec.js'],
  },
})
```

- [x] **Step 7: Viết test khói để chứng minh bộ test chạy**

Tạo `tests/smoke.spec.js`:

```js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'

describe('bộ test', () => {
  it('mount được component Vue trong jsdom', () => {
    const C = defineComponent({ render: () => h('p', 'xin chào') })
    expect(mount(C).text()).toBe('xin chào')
  })
})
```

- [x] **Step 8: Chạy test**

Run: `npm run test -- --run`
Expected: PASS, 1 test.

- [x] **Step 9: Commit**

```bash
git add package.json package-lock.json vite.config.js tests/smoke.spec.js .gitignore
git commit -m "chore: add vitest + vue test utils harness"
```

---

### Task 1: Nguồn sự thật về cấu trúc bài học (`src/lesson/parts.js`)

**Files:**
- Create: `src/lesson/parts.js`, `tests/parts.spec.js`

**Interfaces:**
- Consumes: không có
- Produces:
  - `LESSON_PARTS: Array<{ key, num, title }>` — 6 phần, `key` ∈ `'muc-tieu' | 'ly-thuyet' | 'vi-sao' | 'quiz' | 'vi-du' | 'bai-tap' | 'leetcode'` (7 mục: 1 mở đầu + 6 phần đánh số)
  - `partId(sid: string, key: string): string` — trả `` `${sid}--${key}` ``
  - `partTitle(key: string): string`
  - `LESSON_SECTIONS: Array<{ sid, file, title }>` — 10 nhóm kiến thức, `file` là đường dẫn tương đối từ gốc repo

- [x] **Step 1: Viết test thất bại**

Tạo `tests/parts.spec.js`:

```js
import { describe, it, expect } from 'vitest'
import { LESSON_PARTS, LESSON_SECTIONS, partId, partTitle } from '../src/lesson/parts.js'

describe('parts', () => {
  it('có đúng 7 mục theo thứ tự chuẩn', () => {
    expect(LESSON_PARTS.map(p => p.key)).toEqual([
      'muc-tieu', 'ly-thuyet', 'vi-sao', 'quiz', 'vi-du', 'bai-tap', 'leetcode',
    ])
  })

  it('đánh số 1..6 cho 6 phần sau phần mở đầu', () => {
    expect(LESSON_PARTS[0].num).toBe(0)
    expect(LESSON_PARTS.slice(1).map(p => p.num)).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('partId ghép sid với key bằng hai gạch ngang', () => {
    expect(partId('to-hop', 'quiz')).toBe('to-hop--quiz')
  })

  it('partTitle trả tiêu đề có tiền tố số cho phần đánh số', () => {
    expect(partTitle('quiz')).toBe('3. Quiz kiểm tra lý thuyết')
    expect(partTitle('muc-tieu')).toBe('Mục tiêu bài học')
  })

  it('liệt kê đúng 10 nhóm kiến thức cần viết lại', () => {
    expect(LESSON_SECTIONS).toHaveLength(10)
    expect(LESSON_SECTIONS.map(s => s.sid)).toContain('dsu')
    for (const s of LESSON_SECTIONS) {
      expect(s.file).toMatch(/^src\/sections\/\w+\.vue$/)
    }
  })
})
```

- [x] **Step 2: Chạy test để chắc chắn nó fail**

Run: `npm run test -- --run tests/parts.spec.js`
Expected: FAIL — "Failed to resolve import ../src/lesson/parts.js".

- [x] **Step 3: Viết implementation**

Tạo `src/lesson/parts.js`:

```js
// Nguồn sự thật duy nhất về cấu trúc 1 bài học. Mọi component, menu và test
// đều đọc từ đây — muốn đổi khung bài học thì sửa đúng 1 chỗ này.
export const LESSON_PARTS = [
  { key: 'muc-tieu', num: 0, title: 'Mục tiêu bài học' },
  { key: 'ly-thuyet', num: 1, title: 'Lý thuyết cơ bản' },
  { key: 'vi-sao', num: 2, title: 'Vì sao kiến thức này quan trọng' },
  { key: 'quiz', num: 3, title: 'Quiz kiểm tra lý thuyết' },
  { key: 'vi-du', num: 4, title: 'Ví dụ điển hình' },
  { key: 'bai-tap', num: 5, title: 'Bài tập kiểm tra' },
  { key: 'leetcode', num: 6, title: 'Tài nguyên tự luyện LeetCode' },
]

const BY_KEY = Object.fromEntries(LESSON_PARTS.map(p => [p.key, p]))

export function partId(sid, key) {
  return `${sid}--${key}`
}

export function partTitle(key) {
  const p = BY_KEY[key]
  if (!p) throw new Error(`Không có phần bài học tên "${key}"`)
  return p.num === 0 ? p.title : `${p.num}. ${p.title}`
}

// 10 nhóm kiến thức theo khung 6 phần. "trang-chu" và "cam-nang" không nằm ở đây
// vì chúng là trang giới thiệu/ôn đề, không phải bài học.
export const LESSON_SECTIONS = [
  { sid: 'quay-lui-xau-nhi-phan', file: 'src/sections/QuayLuiXauNhiPhan.vue', title: 'Quay lui & Xâu nhị phân' },
  { sid: 'to-hop', file: 'src/sections/ToHop.vue', title: 'Tổ hợp' },
  { sid: 'tham-lam', file: 'src/sections/ThamLam.vue', title: 'Tham lam' },
  { sid: 'qhd-nen-tang', file: 'src/sections/QhdNenTang.vue', title: 'Quy hoạch động nền tảng' },
  { sid: 'qhd-lis-lcs-doixung', file: 'src/sections/QhdLisLcsDoixung.vue', title: 'QHĐ nâng cao: Knapsack, LIS, LCS, Xâu đối xứng' },
  { sid: 'ngan-xep-hang-doi', file: 'src/sections/NganXepHangDoi.vue', title: 'Ngăn xếp & Hàng đợi' },
  { sid: 'dfs-bfs', file: 'src/sections/DfsBfs.vue', title: 'DFS & BFS' },
  { sid: 'dsu', file: 'src/sections/Dsu.vue', title: 'DSU — Disjoint Set Union' },
  { sid: 'cay-nhi-phan-bst', file: 'src/sections/CayNhiPhanBst.vue', title: 'Cây nhị phân & BST' },
  { sid: 'bst-nang-cao', file: 'src/sections/BstNangCao.vue', title: 'BST nâng cao' },
]
```

- [x] **Step 4: Chạy lại test**

Run: `npm run test -- --run tests/parts.spec.js`
Expected: PASS, 5 tests.

- [x] **Step 5: Commit**

```bash
git add src/lesson/parts.js tests/parts.spec.js
git commit -m "feat: add canonical lesson structure definition"
```

---

### Task 2: Component khung bài học (`LessonGoal`, `LessonPart`)

**Files:**
- Create: `src/components/LessonGoal.vue`, `src/components/LessonPart.vue`, `tests/components/lesson-part.spec.js`
- Modify: `src/style.css` (thêm `.lesson-goal`, `.lesson-part`)

**Interfaces:**
- Consumes: `partId`, `partTitle` từ `src/lesson/parts.js`
- Produces:
  - `<LessonGoal :sid="String">` — slot mặc định là nội dung "Sau bài này, bạn có thể…"; render `<div class="lesson-goal" :id="partId(sid,'muc-tieu')">`
  - `<LessonPart :sid="String" part="String">` — render `<section class="lesson-part">` chứa `<h3 :id="partId(sid,part)">{{ partTitle(part) }}</h3>` + slot mặc định

- [x] **Step 1: Viết test thất bại**

Tạo `tests/components/lesson-part.spec.js`:

```js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LessonPart from '../../src/components/LessonPart.vue'
import LessonGoal from '../../src/components/LessonGoal.vue'

describe('LessonPart', () => {
  it('render heading có id chuẩn và tiêu đề chuẩn', () => {
    const w = mount(LessonPart, { props: { sid: 'to-hop', part: 'quiz' } })
    const h3 = w.get('h3')
    expect(h3.attributes('id')).toBe('to-hop--quiz')
    expect(h3.text()).toBe('3. Quiz kiểm tra lý thuyết')
  })

  it('render nội dung trong slot mặc định', () => {
    const w = mount(LessonPart, {
      props: { sid: 'dsu', part: 'ly-thuyet' },
      slots: { default: '<p>nội dung lý thuyết</p>' },
    })
    expect(w.html()).toContain('nội dung lý thuyết')
  })
})

describe('LessonGoal', () => {
  it('render id mục tiêu và nhãn cố định', () => {
    const w = mount(LessonGoal, {
      props: { sid: 'dsu' },
      slots: { default: 'gộp 2 nhóm trong O(1)' },
    })
    expect(w.get('.lesson-goal').attributes('id')).toBe('dsu--muc-tieu')
    expect(w.text()).toContain('Sau bài này, bạn có thể')
    expect(w.text()).toContain('gộp 2 nhóm trong O(1)')
  })
})
```

- [x] **Step 2: Chạy test để chắc chắn nó fail**

Run: `npm run test -- --run tests/components/lesson-part.spec.js`
Expected: FAIL — không resolve được `LessonPart.vue`.

- [x] **Step 3: Viết `src/components/LessonPart.vue`**

```vue
<template>
  <section class="lesson-part">
    <h3 :id="partId(sid, part)">{{ partTitle(part) }}</h3>
    <slot />
  </section>
</template>

<script setup>
import { partId, partTitle } from '../lesson/parts.js'

defineProps({
  sid: { type: String, required: true },
  part: { type: String, required: true },
})
</script>
```

- [x] **Step 4: Viết `src/components/LessonGoal.vue`**

```vue
<template>
  <div class="lesson-goal" :id="partId(sid, 'muc-tieu')">
    <span class="lg-title">🎯 Sau bài này, bạn có thể…</span>
    <slot />
  </div>
</template>

<script setup>
import { partId } from '../lesson/parts.js'

defineProps({
  sid: { type: String, required: true },
})
</script>
```

- [x] **Step 5: Thêm CSS vào cuối `src/style.css`**

```css
  /* ===== Khung 6 phần chuẩn của 1 bài học ===== */
  .lesson-goal {
    background: var(--success-bg);
    border-left: 4px solid var(--success);
    border-radius: 0 10px 10px 0;
    padding: 1rem 1.3rem;
    margin: 1.4rem 0 2rem;
    scroll-margin-top: 20px;
  }
  .lesson-goal .lg-title {
    display: block;
    font-weight: 700;
    color: #17694B;
    margin-bottom: 0.4rem;
  }
  .lesson-goal ul { margin: 0.3rem 0 0; padding-left: 1.2rem; }
  .lesson-part { margin-bottom: 1rem; }
  .lesson-part > h3 {
    border-bottom: 1px dashed var(--border);
    padding-bottom: 0.4rem;
  }
```

- [x] **Step 6: Chạy lại test**

Run: `npm run test -- --run tests/components/lesson-part.spec.js`
Expected: PASS, 3 tests.

- [x] **Step 7: Commit**

```bash
git add src/components/LessonPart.vue src/components/LessonGoal.vue src/style.css tests/components/lesson-part.spec.js
git commit -m "feat: add lesson skeleton components"
```

---

### Task 3: Component Quiz tương tác

**Files:**
- Create: `src/components/QuizBlock.vue`, `tests/components/quiz-block.spec.js`
- Modify: `src/style.css`

**Interfaces:**
- Consumes: không có (không phụ thuộc task khác)
- Produces: `<QuizBlock :questions="Array">` với mỗi phần tử là
  `{ q: String, options: String[], answer: Number /* chỉ số 0-based */, why: String }`.
  Hành vi: click 1 option → khóa câu đó, tô xanh đáp án đúng, tô đỏ lựa chọn sai, hiện `why`, tăng bộ đếm `Đã trả lời x/N — đúng y`.

- [x] **Step 1: Viết test thất bại**

Tạo `tests/components/quiz-block.spec.js`:

```js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import QuizBlock from '../../src/components/QuizBlock.vue'

const questions = [
  { q: 'Quay lui là gì?', options: ['Thử và quay lại', 'Sắp xếp'], answer: 0, why: 'Thử từng lựa chọn, sai thì hoàn tác.' },
  { q: 'DSU dùng để làm gì?', options: ['Duyệt cây', 'Gộp nhóm'], answer: 1, why: 'DSU quản lý các tập rời nhau.' },
]

describe('QuizBlock', () => {
  it('hiện tất cả câu hỏi và lựa chọn, chưa lộ đáp án', () => {
    const w = mount(QuizBlock, { props: { questions } })
    expect(w.findAll('.quiz-q')).toHaveLength(2)
    expect(w.findAll('.quiz-opt')).toHaveLength(4)
    expect(w.text()).not.toContain('Thử từng lựa chọn')
  })

  it('chọn đúng thì đánh dấu correct và hiện giải thích', async () => {
    const w = mount(QuizBlock, { props: { questions } })
    await w.findAll('.quiz-q')[0].findAll('.quiz-opt')[0].trigger('click')
    expect(w.findAll('.quiz-q')[0].findAll('.quiz-opt')[0].classes()).toContain('correct')
    expect(w.text()).toContain('Thử từng lựa chọn')
  })

  it('chọn sai thì đánh dấu wrong nhưng vẫn chỉ ra đáp án đúng', async () => {
    const w = mount(QuizBlock, { props: { questions } })
    const opts = w.findAll('.quiz-q')[1].findAll('.quiz-opt')
    await opts[0].trigger('click')
    expect(opts[0].classes()).toContain('wrong')
    expect(opts[1].classes()).toContain('correct')
  })

  it('không cho đổi đáp án sau khi đã chọn', async () => {
    const w = mount(QuizBlock, { props: { questions } })
    const opts = w.findAll('.quiz-q')[0].findAll('.quiz-opt')
    await opts[1].trigger('click')
    await opts[0].trigger('click')
    expect(opts[1].classes()).toContain('wrong')
    expect(opts[0].classes()).not.toContain('correct-picked')
  })

  it('đếm số câu đã trả lời và số câu đúng', async () => {
    const w = mount(QuizBlock, { props: { questions } })
    await w.findAll('.quiz-q')[0].findAll('.quiz-opt')[0].trigger('click')
    expect(w.get('.quiz-score').text()).toContain('1/2')
    expect(w.get('.quiz-score').text()).toContain('đúng 1')
  })
})
```

- [x] **Step 2: Chạy test để chắc chắn nó fail**

Run: `npm run test -- --run tests/components/quiz-block.spec.js`
Expected: FAIL — không resolve được `QuizBlock.vue`.

- [x] **Step 3: Viết implementation**

Tạo `src/components/QuizBlock.vue`:

```vue
<template>
  <div class="quiz">
    <div class="quiz-score">
      Đã trả lời {{ answeredCount }}/{{ questions.length }} — đúng {{ correctCount }}
    </div>

    <div v-for="(item, qi) in questions" :key="qi" class="quiz-q">
      <p class="quiz-prompt">
        <strong>Câu {{ qi + 1 }}.</strong> {{ item.q }}
      </p>
      <button
        v-for="(opt, oi) in item.options"
        :key="oi"
        type="button"
        class="quiz-opt"
        :class="optClass(qi, oi)"
        :disabled="picked[qi] !== null"
        @click="pick(qi, oi)"
      >
        {{ opt }}
      </button>
      <p v-if="picked[qi] !== null" class="quiz-why">
        <strong>{{ picked[qi] === item.answer ? '✅ Chính xác.' : '❌ Chưa đúng.' }}</strong>
        {{ item.why }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  questions: { type: Array, required: true },
})

const picked = ref(props.questions.map(() => null))

function pick(qi, oi) {
  if (picked.value[qi] !== null) return
  picked.value[qi] = oi
}

// Chỉ tô màu sau khi người học đã chọn — trước đó không được lộ đáp án.
function optClass(qi, oi) {
  const p = picked.value[qi]
  if (p === null) return ''
  if (oi === props.questions[qi].answer) return 'correct'
  return oi === p ? 'wrong' : ''
}

const answeredCount = computed(() => picked.value.filter(p => p !== null).length)
const correctCount = computed(
  () => picked.value.filter((p, i) => p !== null && p === props.questions[i].answer).length,
)
</script>
```

- [x] **Step 4: Thêm CSS vào cuối `src/style.css`**

```css
  /* ===== Quiz ===== */
  .quiz {
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1.2rem 1.3rem;
    background: var(--surface);
    margin: 1.2rem 0;
  }
  .quiz-score {
    font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.05em;
    color: var(--muted-2); font-weight: 700; margin-bottom: 0.8rem;
  }
  .quiz-q { padding: 0.8rem 0; border-top: 1px dashed var(--border); }
  .quiz-q:first-of-type { border-top: none; padding-top: 0; }
  .quiz-prompt { margin: 0 0 0.6rem; }
  .quiz-opt {
    display: block; width: 100%; text-align: left;
    background: var(--card-bg); color: var(--ink);
    border: 1px solid var(--border); margin: 0 0 0.4rem;
    font-weight: 500; min-height: 44px;
  }
  .quiz-opt:disabled { cursor: default; opacity: 1; }
  .quiz-opt.correct { background: var(--success-bg); border-color: var(--success); color: #17694B; font-weight: 700; }
  .quiz-opt.wrong { background: var(--danger-bg); border-color: var(--danger); color: #A13A2E; }
  .quiz-why { font-size: 0.92rem; color: var(--muted); margin: 0.5rem 0 0; }
```

- [x] **Step 5: Chạy lại test**

Run: `npm run test -- --run tests/components/quiz-block.spec.js`
Expected: PASS, 5 tests.

- [x] **Step 6: Commit**

```bash
git add src/components/QuizBlock.vue src/style.css tests/components/quiz-block.spec.js
git commit -m "feat: add interactive quiz block component"
```

---

### Task 4: Component ví dụ điển hình, bài tập và danh sách LeetCode

**Files:**
- Create: `src/components/WorkedExample.vue`, `src/components/PracticeSet.vue`, `src/components/LeetCodeList.vue`, `tests/components/example-practice-leetcode.spec.js`
- Modify: `src/style.css`

**Interfaces:**
- Consumes: không có
- Produces:
  - `<WorkedExample :id="String" :title="String" :official="Boolean">` với 6 slot bắt buộc theo tên: `de-bai`, `y-tuong`, `thuat-toan`, `chay-tay`, `code`, `toi-uu`. Render `<h4 :id="id">`.
  - `<PracticeSet :items="Array">`, item = `{ title: String, idea: String, hint: String }`
  - `<LeetCodeList :items="Array">`, item = `{ no: Number, name: String, slug: String, level: 'Easy'|'Medium'|'Hard', note: String }`; link tới `https://leetcode.com/problems/<slug>/`

- [x] **Step 1: Viết test thất bại**

Tạo `tests/components/example-practice-leetcode.spec.js`:

```js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WorkedExample from '../../src/components/WorkedExample.vue'
import PracticeSet from '../../src/components/PracticeSet.vue'
import LeetCodeList from '../../src/components/LeetCodeList.vue'

describe('WorkedExample', () => {
  it('render đủ 6 khối theo đúng thứ tự và có id neo', () => {
    const w = mount(WorkedExample, {
      props: { id: 'vd-to-hop', title: 'Tổ hợp chập k' },
      slots: {
        'de-bai': '<p>ĐỀ</p>', 'y-tuong': '<p>Ý</p>', 'thuat-toan': '<p>TT</p>',
        'chay-tay': '<p>CT</p>', code: '<pre>CODE</pre>', 'toi-uu': '<p>TU</p>',
      },
    })
    expect(w.get('h4').attributes('id')).toBe('vd-to-hop')
    const labels = w.findAll('.we-label').map(e => e.text())
    expect(labels).toEqual([
      '📋 Đề bài', '🧩 Ý tưởng cốt lõi', '⚙️ Thuật toán',
      '✍️ Chạy tay', '💻 Code mẫu', '🚀 Cách tối ưu hơn',
    ])
  })

  it('gắn nhãn đề chính thức khi official = true', () => {
    const w = mount(WorkedExample, { props: { id: 'x', title: 'Y', official: true } })
    expect(w.get('h4').text()).toContain('★')
  })
})

describe('PracticeSet', () => {
  const items = [
    { title: 'Bài A', idea: 'ý A', hint: 'gợi ý A' },
    { title: 'Bài B', idea: 'ý B', hint: 'gợi ý B' },
    { title: 'Bài C', idea: 'ý C', hint: 'gợi ý C' },
  ]
  it('render đủ 3 bài, gợi ý nằm trong details đóng sẵn', () => {
    const w = mount(PracticeSet, { props: { items } })
    expect(w.findAll('.practice-item')).toHaveLength(3)
    const d = w.findAll('.practice-item details')
    expect(d).toHaveLength(3)
    expect(d[0].attributes('open')).toBeUndefined()
    expect(d[0].text()).toContain('gợi ý A')
  })
})

describe('LeetCodeList', () => {
  const items = [
    { no: 20, name: 'Valid Parentheses', slug: 'valid-parentheses', level: 'Easy', note: 'khởi động' },
    { no: 150, name: 'Evaluate RPN', slug: 'evaluate-reverse-polish-notation', level: 'Medium', note: 'hậu tố' },
  ]
  it('render link đúng chuẩn leetcode và nhãn độ khó', () => {
    const w = mount(LeetCodeList, { props: { items } })
    const a = w.findAll('a.lc-link')
    expect(a[0].attributes('href')).toBe('https://leetcode.com/problems/valid-parentheses/')
    expect(a[0].attributes('target')).toBe('_blank')
    expect(a[0].attributes('rel')).toContain('noopener')
    expect(w.findAll('.lc-level')[0].classes()).toContain('lc-easy')
    expect(w.findAll('.lc-level')[1].classes()).toContain('lc-medium')
  })
})
```

- [x] **Step 2: Chạy test để chắc chắn nó fail**

Run: `npm run test -- --run tests/components/example-practice-leetcode.spec.js`
Expected: FAIL — không resolve được `WorkedExample.vue`.

- [x] **Step 3: Viết `src/components/WorkedExample.vue`**

```vue
<template>
  <div class="worked-example">
    <h4 :id="id">{{ official ? '★ ' : '' }}{{ title }}</h4>

    <p class="we-label">📋 Đề bài</p>
    <slot name="de-bai" />

    <p class="we-label">🧩 Ý tưởng cốt lõi</p>
    <slot name="y-tuong" />

    <p class="we-label">⚙️ Thuật toán</p>
    <slot name="thuat-toan" />

    <p class="we-label">✍️ Chạy tay</p>
    <slot name="chay-tay" />

    <p class="we-label">💻 Code mẫu</p>
    <slot name="code" />

    <p class="we-label">🚀 Cách tối ưu hơn</p>
    <slot name="toi-uu" />
  </div>
</template>

<script setup>
defineProps({
  id: { type: String, required: true },
  title: { type: String, required: true },
  official: { type: Boolean, default: false },
})
</script>
```

- [x] **Step 4: Viết `src/components/PracticeSet.vue`**

```vue
<template>
  <ol class="practice">
    <li v-for="(it, i) in items" :key="i" class="practice-item">
      <strong>{{ it.title }}</strong>
      <div class="idea"><em>Ý tưởng:</em> {{ it.idea }}</div>
      <details>
        <summary>Xem gợi ý</summary>
        <div class="hint"><em>Hướng dẫn:</em> {{ it.hint }}</div>
      </details>
    </li>
  </ol>
</template>

<script setup>
defineProps({
  items: { type: Array, required: true },
})
</script>
```

- [x] **Step 5: Viết `src/components/LeetCodeList.vue`**

```vue
<template>
  <table class="formula-table lc-table">
    <tr><th>#</th><th>Bài</th><th>Mức</th><th>Vì sao nên làm</th></tr>
    <tr v-for="it in items" :key="it.slug">
      <td>{{ it.no }}</td>
      <td>
        <a
          class="lc-link"
          :href="`https://leetcode.com/problems/${it.slug}/`"
          target="_blank"
          rel="noopener noreferrer"
          >{{ it.name }}</a
        >
      </td>
      <td><span class="lc-level" :class="levelClass(it.level)">{{ it.level }}</span></td>
      <td>{{ it.note }}</td>
    </tr>
  </table>
</template>

<script setup>
defineProps({
  items: { type: Array, required: true },
})

function levelClass(level) {
  return { Easy: 'lc-easy', Medium: 'lc-medium', Hard: 'lc-hard' }[level]
}
</script>
```

- [x] **Step 6: Thêm CSS vào cuối `src/style.css`**

```css
  /* ===== Ví dụ điển hình / bài tập / LeetCode ===== */
  .worked-example {
    border: 1px solid var(--border);
    border-left: 4px solid var(--amber);
    border-radius: 0 12px 12px 0;
    padding: 1rem 1.3rem 1.2rem;
    margin: 1.4rem 0 1.8rem;
    background: var(--surface);
  }
  .worked-example > h4 { margin-top: 0.2rem; }
  .we-label {
    color: var(--navy); font-weight: 700; font-size: 0.8rem;
    text-transform: uppercase; letter-spacing: 0.05em; margin: 1.3rem 0 0.35rem;
  }
  .practice-item { margin-bottom: 1rem; }
  .practice-item details { padding: 0.5rem 0.9rem; margin: 0.4rem 0 0; }
  .practice-item details summary { font-size: 0.88rem; }
  .lc-table td:first-child { width: 3.5rem; color: var(--muted-2); }
  .lc-level {
    display: inline-block; font-size: 0.72rem; font-weight: 700;
    padding: 0.15rem 0.55rem; border-radius: 999px; white-space: nowrap;
  }
  .lc-easy { background: var(--success-bg); color: var(--success); }
  .lc-medium { background: var(--warning-bg); color: var(--warning); }
  .lc-hard { background: var(--danger-bg); color: var(--danger); }
```

- [x] **Step 7: Chạy lại test**

Run: `npm run test -- --run tests/components/example-practice-leetcode.spec.js`
Expected: PASS, 4 tests.

- [x] **Step 8: Commit**

```bash
git add src/components/WorkedExample.vue src/components/PracticeSet.vue src/components/LeetCodeList.vue src/style.css tests/components/example-practice-leetcode.spec.js
git commit -m "feat: add worked example, practice set and leetcode list components"
```

---

### Task 5: Schema dữ liệu bài học + test kiểm tra toàn bộ 10 nhóm

**Files:**
- Create: `src/data/lessons/index.js`, `src/data/lessons/quay-lui-xau-nhi-phan.js` (file mẫu, dữ liệu thật viết ở Task 8), `tests/lesson-data.spec.js`

**Interfaces:**
- Consumes: `LESSON_SECTIONS` từ `src/lesson/parts.js`
- Produces:
  - Mỗi `src/data/lessons/<sid>.js` export default một object:
    ```js
    { goal: String[], examples: [{ id, title, official }], quiz: [...], practice: [...], leetcode: [...] }
    ```
  - `src/data/lessons/index.js` export `lessons: Record<sid, LessonData>`
- Ghi chú: test này **cố tình fail** cho 9 nhóm chưa có dữ liệu. Đó là danh sách việc còn lại của Phase 2. Ở Task 5 chỉ cần nhóm đầu tiên xanh, nên test dùng `LESSON_SECTIONS.filter(s => s.sid in lessons)` để chỉ kiểm dữ liệu đã tồn tại, và có 1 test riêng in ra các nhóm còn thiếu (không fail).

- [x] **Step 1: Viết test thất bại**

Tạo `tests/lesson-data.spec.js`:

```js
import { describe, it, expect } from 'vitest'
import { lessons } from '../src/data/lessons/index.js'
import { LESSON_SECTIONS } from '../src/lesson/parts.js'

const LEVELS = ['Easy', 'Medium', 'Hard']
const present = LESSON_SECTIONS.filter(s => lessons[s.sid])

describe.each(present)('dữ liệu bài học: $sid', ({ sid }) => {
  const data = lessons[sid]

  it('có mục tiêu học từ 2 đến 4 gạch đầu dòng', () => {
    expect(Array.isArray(data.goal)).toBe(true)
    expect(data.goal.length).toBeGreaterThanOrEqual(2)
    expect(data.goal.length).toBeLessThanOrEqual(4)
  })

  it('có 1 đến 2 ví dụ điển hình, id không trùng', () => {
    expect(data.examples.length).toBeGreaterThanOrEqual(1)
    expect(data.examples.length).toBeLessThanOrEqual(2)
    const ids = data.examples.map(e => e.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const e of data.examples) expect(e.title.length).toBeGreaterThan(3)
  })

  it('có 3 đến 5 câu quiz hợp lệ', () => {
    expect(data.quiz.length).toBeGreaterThanOrEqual(3)
    expect(data.quiz.length).toBeLessThanOrEqual(5)
    for (const q of data.quiz) {
      expect(q.options.length).toBeGreaterThanOrEqual(2)
      expect(q.answer).toBeGreaterThanOrEqual(0)
      expect(q.answer).toBeLessThan(q.options.length)
      expect(q.why.length).toBeGreaterThan(10)
    }
  })

  it('có đúng 3 bài tập kiểm tra, mỗi bài có ý tưởng và gợi ý', () => {
    expect(data.practice).toHaveLength(3)
    for (const p of data.practice) {
      expect(p.title.length).toBeGreaterThan(3)
      expect(p.idea.length).toBeGreaterThan(10)
      expect(p.hint.length).toBeGreaterThan(10)
    }
  })

  it('có 8 đến 12 bài LeetCode, slug không trùng, mức hợp lệ', () => {
    expect(data.leetcode.length).toBeGreaterThanOrEqual(8)
    expect(data.leetcode.length).toBeLessThanOrEqual(12)
    const slugs = data.leetcode.map(x => x.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const x of data.leetcode) {
      expect(LEVELS).toContain(x.level)
      expect(x.slug).toMatch(/^[a-z0-9-]+$/)
      expect(Number.isInteger(x.no)).toBe(true)
      expect(x.note.length).toBeGreaterThan(5)
    }
  })

  it('danh sách LeetCode xếp từ dễ tới khó', () => {
    const rank = data.leetcode.map(x => LEVELS.indexOf(x.level))
    expect(rank).toEqual([...rank].sort((a, b) => a - b))
  })
})

describe('tiến độ', () => {
  it('liệt kê các nhóm chưa có dữ liệu (không fail)', () => {
    const missing = LESSON_SECTIONS.filter(s => !lessons[s.sid]).map(s => s.sid)
    console.log('Còn thiếu dữ liệu:', missing.join(', ') || '(không còn)')
    expect(present.length).toBeGreaterThan(0)
  })
})
```

- [x] **Step 2: Chạy test để chắc chắn nó fail**

Run: `npm run test -- --run tests/lesson-data.spec.js`
Expected: FAIL — không resolve được `src/data/lessons/index.js`.

- [x] **Step 3: Tạo file dữ liệu mẫu cho nhóm Quay lui**

Tạo `src/data/lessons/quay-lui-xau-nhi-phan.js` với nội dung tạm đủ hợp lệ (nội dung thật sẽ hoàn thiện ở Task 8):

```js
export default {
  goal: [
    'Giải thích được quay lui bằng hình ảnh "đi trong mê cung, cụt đường thì lùi lại".',
    'Tự viết được khung đệ quy sinh mọi xâu nhị phân độ dài n.',
  ],
  examples: [
    { id: 'vd-sinh-xau-nhi-phan', title: 'Sinh mọi xâu nhị phân độ dài n', official: true },
  ],
  quiz: [
    {
      q: 'Quay lui khác vét cạn thường ở điểm nào?',
      options: ['Không khác gì', 'Có bước hoàn tác lựa chọn để thử nhánh khác', 'Luôn nhanh hơn'],
      answer: 1,
      why: 'Quay lui đi sâu theo 1 lựa chọn, khi hết đường thì hoàn tác đúng bước vừa làm rồi thử lựa chọn kế tiếp.',
    },
    {
      q: 'Điều kiện dừng của đệ quy sinh xâu nhị phân độ dài n là gì?',
      options: ['Khi i > n', 'Khi đã đặt đủ n vị trí', 'Khi gặp số 1'],
      answer: 1,
      why: 'Đặt đủ n vị trí nghĩa là đã có 1 xâu hoàn chỉnh, in ra rồi quay lui.',
    },
    {
      q: 'Có bao nhiêu xâu nhị phân độ dài n?',
      options: ['n²', '2ⁿ', 'n!'],
      answer: 1,
      why: 'Mỗi vị trí có 2 lựa chọn độc lập, n vị trí cho 2ⁿ xâu.',
    },
  ],
  practice: [
    {
      title: 'Sinh mọi xâu nhị phân độ dài n không có hai số 1 đứng cạnh nhau.',
      idea: 'Thêm 1 điều kiện trước khi đặt số 1: vị trí ngay trước phải khác 1.',
      hint: 'Trong vòng lặp thử giá trị v, bỏ qua v = 1 nếu x[i-1] == 1.',
    },
    {
      title: 'Sinh mọi tập con của {1..n} bằng quay lui.',
      idea: 'Mỗi phần tử có 2 lựa chọn: lấy hoặc không lấy — đúng khung xâu nhị phân, chỉ đổi cách in.',
      hint: 'Khi đặt x[i] = 1 nghĩa là chọn phần tử i; lúc in thì in các chỉ số có x[i] == 1.',
    },
    {
      title: 'Đếm số cách xếp 4 quân hậu trên bàn cờ 4×4 sao cho không quân nào ăn nhau.',
      idea: 'Mỗi hàng đặt đúng 1 quân, kiểm tra cột và 2 đường chéo trước khi đặt.',
      hint: 'Dùng 3 mảng đánh dấu: cột, đường chéo chính (i - j + n), đường chéo phụ (i + j).',
    },
  ],
  leetcode: [
    { no: 1863, name: 'Sum of All Subset XOR Totals', slug: 'sum-of-all-subset-xor-totals', level: 'Easy', note: 'Khung sinh tập con ở mức dễ nhất.' },
    { no: 401, name: 'Binary Watch', slug: 'binary-watch', level: 'Easy', note: 'Sinh xâu nhị phân có ràng buộc số bit 1.' },
    { no: 78, name: 'Subsets', slug: 'subsets', level: 'Medium', note: 'Bài chuẩn mực nhất của khung chọn/không chọn.' },
    { no: 46, name: 'Permutations', slug: 'permutations', level: 'Medium', note: 'Quay lui có mảng used[].' },
    { no: 784, name: 'Letter Case Permutation', slug: 'letter-case-permutation', level: 'Medium', note: 'Giống sinh xâu nhị phân, chỉ đổi bảng chữ cái.' },
    { no: 22, name: 'Generate Parentheses', slug: 'generate-parentheses', level: 'Medium', note: 'Quay lui có cắt nhánh bằng điều kiện hợp lệ.' },
    { no: 39, name: 'Combination Sum', slug: 'combination-sum', level: 'Medium', note: 'Quay lui cho phép chọn lại phần tử.' },
    { no: 79, name: 'Word Search', slug: 'word-search', level: 'Medium', note: 'Quay lui trên lưới, có đánh dấu và hoàn tác.' },
    { no: 51, name: 'N-Queens', slug: 'n-queens', level: 'Hard', note: 'Chính là ví dụ điển hình thứ hai của bài này.' },
    { no: 37, name: 'Sudoku Solver', slug: 'sudoku-solver', level: 'Hard', note: 'Quay lui với 3 ràng buộc cùng lúc.' },
  ],
}
```

- [x] **Step 4: Tạo `src/data/lessons/index.js`**

```js
// Gom dữ liệu 10 nhóm kiến thức. Mỗi lần thêm 1 nhóm mới, thêm đúng 2 dòng ở đây.
import quayLuiXauNhiPhan from './quay-lui-xau-nhi-phan.js'

export const lessons = {
  'quay-lui-xau-nhi-phan': quayLuiXauNhiPhan,
}
```

- [x] **Step 5: Chạy lại test**

Run: `npm run test -- --run tests/lesson-data.spec.js`
Expected: PASS — 6 test của nhóm `quay-lui-xau-nhi-phan` + test tiến độ in ra 9 nhóm còn thiếu.

- [x] **Step 6: Commit**

```bash
git add src/data/lessons tests/lesson-data.spec.js
git commit -m "feat: add lesson data schema with validation tests"
```

---

### Task 6: Test hợp đồng cấu trúc cho 10 section

**Files:**
- Create: `tests/lesson-structure.spec.js`

**Interfaces:**
- Consumes: `LESSON_SECTIONS`, `partId` từ `src/lesson/parts.js`; `lessons` từ `src/data/lessons/index.js`
- Produces: test chạy trên các section **đã có dữ liệu**, đọc file `.vue` dạng text và khẳng định: có đủ 7 neo id chuẩn, có id của mọi ví dụ khai báo trong data, giữ nguyên `data-sid` và `v-show="active"`.

- [x] **Step 1: Viết test thất bại**

Tạo `tests/lesson-structure.spec.js`:

```js
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { LESSON_SECTIONS, LESSON_PARTS, partId } from '../src/lesson/parts.js'
import { lessons } from '../src/data/lessons/index.js'

const root = resolve(__dirname, '..')
const done = LESSON_SECTIONS.filter(s => lessons[s.sid])

describe.each(done)('cấu trúc section: $sid', ({ sid, file }) => {
  const src = readFileSync(resolve(root, file), 'utf8')

  it('giữ nguyên hợp đồng với App.vue', () => {
    expect(src).toContain(`data-sid="${sid}"`)
    expect(src).toContain('class="day-section"')
    expect(src).toContain('v-show="active"')
    expect(src).toContain('defineProps({ active: Boolean })')
  })

  it('dùng đủ 7 mục chuẩn của khung bài học', () => {
    for (const p of LESSON_PARTS) {
      if (p.key === 'muc-tieu') {
        expect(src).toContain('<LessonGoal')
      } else {
        expect(src).toContain(`part="${p.key}"`)
      }
    }
    expect(src).toContain(`:sid="'${sid}'"`)
  })

  it('có đúng id neo cho mọi ví dụ điển hình khai báo trong dữ liệu', () => {
    for (const e of lessons[sid].examples) {
      expect(src).toContain(`id="${e.id}"`)
    }
  })

  it('không còn chữ nghiêng viết tay bằng thẻ <em> rỗng nghĩa', () => {
    expect(src).not.toMatch(/<i>/)
  })

  it('không tự viết lại quiz/leetcode bằng HTML thủ công', () => {
    expect(src).toContain('<QuizBlock')
    expect(src).toContain('<PracticeSet')
    expect(src).toContain('<LeetCodeList')
  })

  it('id các mục chuẩn được sinh đúng định dạng', () => {
    expect(partId(sid, 'quiz')).toBe(`${sid}--quiz`)
  })
})
```

- [x] **Step 2: Chạy test để xem nó fail đúng chỗ**

Run: `npm run test -- --run tests/lesson-structure.spec.js`
Expected: FAIL — `QuayLuiXauNhiPhan.vue` chưa dùng `LessonGoal`/`QuizBlock` (đây chính là việc của Task 8).

- [x] **Step 3: Ghi nhận đây là test dẫn đường, không sửa test để nó xanh**

Không sửa gì thêm. Test này sẽ xanh dần khi từng section được viết lại ở Phase 2.

- [x] **Step 4: Commit**

```bash
git add tests/lesson-structure.spec.js
git commit -m "test: add lesson structure contract (currently red for pending sections)"
```

---

### Task 7: Sinh menu bài tập bên phải từ cấu trúc chuẩn

**Files:**
- Create: `src/data/menu.js`, `tests/menu.spec.js`
- Modify: `src/App.vue:114` (import), `src/App.vue:132` (`currentMenu`)

**Interfaces:**
- Consumes: `LESSON_PARTS`, `partId` từ `src/lesson/parts.js`; `lessons` từ `src/data/lessons/index.js`; `menusData` từ `src/data/menus.json`
- Produces: `buildMenu(sid): Array<{ id, label, official, level }>` — với section có dữ liệu bài học thì sinh 7 mục chuẩn, chèn các ví dụ (level 4) ngay sau mục "4. Ví dụ điển hình"; với section khác thì trả nguyên `menus.json[sid] || []`

- [x] **Step 1: Viết test thất bại**

Tạo `tests/menu.spec.js`:

```js
import { describe, it, expect } from 'vitest'
import { buildMenu } from '../src/data/menu.js'
import { lessons } from '../src/data/lessons/index.js'

describe('buildMenu', () => {
  it('sinh 7 mục chuẩn cho section có dữ liệu bài học', () => {
    const menu = buildMenu('quay-lui-xau-nhi-phan')
    const ids = menu.map(m => m.id)
    expect(ids).toContain('quay-lui-xau-nhi-phan--muc-tieu')
    expect(ids).toContain('quay-lui-xau-nhi-phan--leetcode')
    expect(menu.find(m => m.id.endsWith('--quiz')).label).toBe('3. Quiz kiểm tra lý thuyết')
  })

  it('chèn ví dụ ngay sau mục Ví dụ điển hình, ở level 4', () => {
    const menu = buildMenu('quay-lui-xau-nhi-phan')
    const at = menu.findIndex(m => m.id.endsWith('--vi-du'))
    const first = lessons['quay-lui-xau-nhi-phan'].examples[0]
    expect(menu[at + 1].id).toBe(first.id)
    expect(menu[at + 1].level).toBe(4)
    expect(menu[at + 1].official).toBe(first.official)
  })

  it('trả về menu từ menus.json cho section không phải bài học', () => {
    const menu = buildMenu('cam-nang')
    expect(menu.length).toBeGreaterThan(0)
    expect(menu[0]).toHaveProperty('label')
  })

  it('trả mảng rỗng cho id lạ', () => {
    expect(buildMenu('khong-ton-tai')).toEqual([])
  })
})
```

- [x] **Step 2: Chạy test để chắc chắn nó fail**

Run: `npm run test -- --run tests/menu.spec.js`
Expected: FAIL — không resolve được `src/data/menu.js`.

- [x] **Step 3: Viết `src/data/menu.js`**

```js
import { LESSON_PARTS, partId, partTitle } from '../lesson/parts.js'
import { lessons } from './lessons/index.js'
import menusData from './menus.json'

// Menu phải của 1 nhóm kiến thức được SINH RA từ khung 6 phần, không viết tay,
// nên không bao giờ lệch với nội dung thật của section.
export function buildMenu(sid) {
  const data = lessons[sid]
  if (!data) return menusData[sid] || []

  const out = []
  for (const p of LESSON_PARTS) {
    out.push({ id: partId(sid, p.key), label: partTitle(p.key), official: false, level: 3 })
    if (p.key === 'vi-du') {
      for (const e of data.examples) {
        out.push({ id: e.id, label: e.title, official: !!e.official, level: 4 })
      }
    }
  }
  return out
}
```

- [x] **Step 4: Nối vào `src/App.vue`**

Thay dòng import `menusData` (dòng 114) bằng:

```js
import { buildMenu } from "./data/menu.js";
```

Thay `currentMenu` (dòng 132) bằng:

```js
const currentMenu = computed(() => buildMenu(activeSection.value));
```

- [x] **Step 5: Chạy test và build**

Run: `npm run test -- --run tests/menu.spec.js`
Expected: PASS, 4 tests.

Run: `npm run build`
Expected: build thành công, không lỗi.

- [x] **Step 6: Commit**

```bash
git add src/data/menu.js src/App.vue tests/menu.spec.js
git commit -m "feat: generate right-hand menu from lesson structure"
```

---

## PHASE 2 — Viết lại nội dung 10 nhóm kiến thức

Thứ tự triển khai theo mục 6 của spec: Quay lui → Tổ hợp → Tham lam → QHĐ nền tảng
→ Ngăn xếp/Hàng đợi → DFS/BFS → DSU → Cây nhị phân/BST → QHĐ nâng cao → BST nâng cao.

> **Chi phí:** Task 8 chạy Opus inline (định hình khuôn mẫu). Từ **Task 9 trở đi đổi
> sang Sonnet** (`/model`) và chạy subagent tuần tự — xem mục "Chiến lược chi phí" ở đầu
> file. Nếu đang chạy Opus mà chuẩn bị vào Task 9, phải nhắc người dùng trước khi làm.

**Quy trình chuẩn áp dụng cho mọi task trong Phase 2** (mỗi task đều liệt kê lại
đầy đủ, không được bỏ bước):

1. Viết/hoàn thiện `src/data/lessons/<sid>.js` theo đặc tả nội dung của task.
2. Đăng ký nhóm vào `src/data/lessons/index.js`.
3. Chạy `npm run test -- --run tests/lesson-data.spec.js` → phải PASS.
4. Viết lại template của section theo khung 6 phần (giữ nguyên mọi widget cũ).
5. Chạy `npm run test -- --run tests/lesson-structure.spec.js` → phải PASS.
6. Chạy `npm run build` → phải sạch.
7. Commit.

**Yêu cầu Feynman áp dụng cho phần văn xuôi của mọi task Phase 2:**
mỗi khái niệm phải mở đầu bằng 1 ví dụ đời thường trước khi có thuật ngữ;
mỗi phần "Lý thuyết" phải trả lời đủ 3 câu "Đây là gì?" → "Vì sao quan trọng?"
→ "Làm sao dùng?"; không dùng thuật ngữ mới mà chưa giải thích ngay tại chỗ.

---

### Task 8: Nhóm Quay lui & Xâu nhị phân (section pilot — định hình khuôn mẫu)

**Files:**
- Modify: `src/sections/QuayLuiXauNhiPhan.vue` (viết lại toàn bộ template), `src/data/lessons/quay-lui-xau-nhi-phan.js`
- Giữ nguyên: `src/widgets/quay-lui-xau-nhi-phan.js` và mọi id DOM mà file này truy cập

**Interfaces:**
- Consumes: `LessonGoal`, `LessonPart`, `QuizBlock`, `WorkedExample`, `PracticeSet`, `LeetCodeList`; dữ liệu từ `src/data/lessons/quay-lui-xau-nhi-phan.js`
- Produces: khuôn mẫu template mà 9 task còn lại sao chép y hệt về cấu trúc

**Đặc tả nội dung:**

- **Mục tiêu:** giải thích quay lui bằng hình ảnh đi trong mê cung; tự viết khung đệ quy sinh xâu nhị phân; nhận ra khi nào một bài là bài quay lui.
- **Lý thuyết:** khái niệm "thử — sai — hoàn tác"; 4 câu hỏi khung của mọi bài quay lui (đặt gì ở bước i / vòng lặp chạy từ đâu tới đâu / điều kiện chấp nhận / khi nào là 1 nghiệm hoàn chỉnh); cây lựa chọn và ý nghĩa của bước hoàn tác.
- **Vì sao quan trọng:** đây là nền của Tổ hợp, N-Queens, Sudoku, sinh test; liên hệ ngược tới đệ quy đã học; nêu rõ giới hạn 2ⁿ và vì sao phải cắt nhánh.
- **Ví dụ 1 (`vd-sinh-xau-nhi-phan`, official):** sinh mọi xâu nhị phân độ dài n — đủ 6 khối, chạy tay với n = 3.
- **Ví dụ 2 (`vd-n-queens`):** N-Queens — đủ 6 khối, chạy tay bàn 4×4 tới nghiệm đầu tiên, phần tối ưu nói về 3 mảng đánh dấu thay cho quét lại bàn cờ.
- **Quiz, bài tập, LeetCode:** đã viết ở Task 5 — rà lại và giữ nguyên nếu vẫn đúng.

- [x] **Step 1: Rà lại dữ liệu và thêm ví dụ thứ hai**

Trong `src/data/lessons/quay-lui-xau-nhi-phan.js`, đổi mảng `examples` thành:

```js
  examples: [
    { id: 'vd-sinh-xau-nhi-phan', title: 'Sinh mọi xâu nhị phân độ dài n', official: true },
    { id: 'vd-n-queens', title: 'Xếp n quân hậu (N-Queens)', official: false },
  ],
```

- [x] **Step 2: Chạy test dữ liệu**

Run: `npm run test -- --run tests/lesson-data.spec.js`
Expected: PASS.

- [x] **Step 3: Ghi lại danh sách id widget đang dùng trong section**

```bash
grep -o "getElementById('[^']*'" src/widgets/quay-lui-xau-nhi-phan.js | sort -u
```

Mọi id in ra ở bước này **phải còn nguyên** trong template sau khi viết lại.

- [x] **Step 4: Viết lại `src/sections/QuayLuiXauNhiPhan.vue` theo khuôn mẫu**

Khung template chuẩn (phần văn xuôi tự viết theo đặc tả nội dung ở trên,
các widget cũ dán nguyên vào đúng phần "Ví dụ điển hình"):

```vue
<template>
<section id="quay-lui-xau-nhi-phan" class="day-section" data-sid="quay-lui-xau-nhi-phan" v-show="active">

<h2>Quay Lui &amp; Xâu Nhị Phân <span class="exam-tag">★ Đề ôn tập</span></h2>

<LessonGoal :sid="'quay-lui-xau-nhi-phan'">
  <ul>
    <li v-for="(g, i) in data.goal" :key="i">{{ g }}</li>
  </ul>
</LessonGoal>

<LessonPart :sid="'quay-lui-xau-nhi-phan'" part="ly-thuyet">
  <!-- văn xuôi Feynman: mê cung → thử/sai/hoàn tác → 4 câu hỏi khung -->
</LessonPart>

<LessonPart :sid="'quay-lui-xau-nhi-phan'" part="vi-sao">
  <!-- ứng dụng thực tế + liên hệ đệ quy đã học + giới hạn 2ⁿ -->
</LessonPart>

<LessonPart :sid="'quay-lui-xau-nhi-phan'" part="quiz">
  <QuizBlock :questions="data.quiz" />
</LessonPart>

<LessonPart :sid="'quay-lui-xau-nhi-phan'" part="vi-du">
  <WorkedExample id="vd-sinh-xau-nhi-phan" title="Sinh mọi xâu nhị phân độ dài n" :official="true">
    <template #de-bai><!-- nguyên văn đề --></template>
    <template #y-tuong><!-- ý tưởng cốt lõi --></template>
    <template #thuat-toan><!-- các bước --></template>
    <template #chay-tay><!-- bảng chạy tay n = 3 --></template>
    <template #code><pre v-pre><code><!-- code C++ --></code></pre></template>
    <template #toi-uu><!-- cắt nhánh / khử đệ quy --></template>
  </WorkedExample>

  <!-- widget tương tác cũ dán nguyên vào đây, giữ đúng mọi id DOM -->

  <WorkedExample id="vd-n-queens" title="Xếp n quân hậu (N-Queens)">
    <template #de-bai><!-- ... --></template>
    <template #y-tuong><!-- ... --></template>
    <template #thuat-toan><!-- ... --></template>
    <template #chay-tay><!-- ... --></template>
    <template #code><pre v-pre><code><!-- ... --></code></pre></template>
    <template #toi-uu><!-- 3 mảng đánh dấu thay vì quét lại bàn cờ --></template>
  </WorkedExample>
</LessonPart>

<LessonPart :sid="'quay-lui-xau-nhi-phan'" part="bai-tap">
  <PracticeSet :items="data.practice" />
</LessonPart>

<LessonPart :sid="'quay-lui-xau-nhi-phan'" part="leetcode">
  <LeetCodeList :items="data.leetcode" />
</LessonPart>

</section>
</template>

<script setup>
import { onMounted } from 'vue'
import LessonGoal from '../components/LessonGoal.vue'
import LessonPart from '../components/LessonPart.vue'
import QuizBlock from '../components/QuizBlock.vue'
import WorkedExample from '../components/WorkedExample.vue'
import PracticeSet from '../components/PracticeSet.vue'
import LeetCodeList from '../components/LeetCodeList.vue'
import data from '../data/lessons/quay-lui-xau-nhi-phan.js'
import { initQuayLuiXauNhiPhanWidgets } from '../widgets/quay-lui-xau-nhi-phan.js'

defineProps({ active: Boolean })

onMounted(() => {
  initQuayLuiXauNhiPhanWidgets()
})
</script>
```

Tên hàm khởi tạo widget của từng nhóm (đã tra sẵn, dùng đúng tên này):
`initQuayLuiXauNhiPhanWidgets`, `initToHopWidgets`, `initThamLamWidgets`,
`initQhdNenTangWidgets`, `initQhdLisLcsDoixungWidgets`, `initNganXepHangDoiWidgets`,
`initDfsBfsWidgets`, `initDsuWidgets`, `initCayNhiPhanBstWidgets`, `initBstNangCaoWidgets`.

- [x] **Step 5: Chạy test cấu trúc**

Run: `npm run test -- --run tests/lesson-structure.spec.js`
Expected: PASS cho `quay-lui-xau-nhi-phan`.

- [x] **Step 6: Chạy toàn bộ test và build**

Run: `npm run test -- --run`
Expected: PASS toàn bộ.

Run: `npm run build`
Expected: build sạch.

- [x] **Step 7: Kiểm tra widget còn sống**

Run: `npm run dev`, mở nhóm "Quay lui, Xâu nhị phân", bấm "Bước tiếp theo" trên
từng widget trong section. Expected: không có lỗi trong console, widget chạy đúng
như trước.

- [x] **Step 8: Commit**

```bash
git add src/sections/QuayLuiXauNhiPhan.vue src/data/lessons/quay-lui-xau-nhi-phan.js
git commit -m "content: rewrite backtracking lesson in 6-part format"
```

---

### Task 9: Nhóm Tổ hợp

**Files:**
- Create: `src/data/lessons/to-hop.js`
- Modify: `src/data/lessons/index.js`, `src/sections/ToHop.vue`
- Giữ nguyên: `src/widgets/to-hop.js` và mọi id DOM nó truy cập (`d2Comb*`)

**Interfaces:**
- Consumes: `LessonGoal`, `LessonPart`, `QuizBlock`, `WorkedExample`, `PracticeSet`, `LeetCodeList`
- Produces: `lessons['to-hop']` với `examples = [{ id: 'vd-to-hop-chap-k' }, { id: 'vd-hoan-vi-ke-tiep', official: true }]`

**Đặc tả nội dung:**

- **Mục tiêu:** phân biệt được tổ hợp và hoán vị bằng ví dụ đời thường; viết được khung quay lui "chọn k trong n"; giải được bài Hoán vị kế tiếp trong đề.
- **Lý thuyết:** "chọn 2 người trong 4 người bạn" — thứ tự không quan trọng; quy tắc "phần tử sau luôn lớn hơn phần tử trước" để không sinh trùng; so sánh tổ hợp ↔ hoán vị ↔ tập con bằng 1 bảng.
- **Vì sao quan trọng:** liên hệ trực tiếp tới quay lui vừa học (cùng khung, chỉ khác điều kiện); ứng dụng xác suất, gợi ý combo sản phẩm, sinh test.
- **Ví dụ 1 (`vd-to-hop-chap-k`):** tổ hợp chập k của n — đủ 6 khối, chạy tay n=4, k=2; phần tối ưu nói về cắt nhánh khi số phần tử còn lại không đủ.
- **Ví dụ 2 (`vd-hoan-vi-ke-tiep`, official):** Hoán vị kế tiếp — giữ lại toàn bộ nội dung chất lượng đang có trong file cũ (giải thích 3 bước pivot → người thay thế → đảo đuôi, 2 bảng chạy tay, 2 bản code mảng/vector), sắp lại đúng 6 khối; khối "tối ưu" dùng phần so sánh `reverse()` với `sort()`.
- **Quiz (4 câu):** (1) tổ hợp và hoán vị khác nhau ở đâu — đáp án "thứ tự có tính hay không"; (2) vì sao tổ hợp không cần mảng `used[]` — đáp án "vì luôn đi tiến, chỉ số sau lớn hơn chỉ số trước"; (3) đổi `backtrack(v+1, ...)` thành `backtrack(v, ...)` thì sinh ra gì — đáp án "tổ hợp có lặp"; (4) hoán vị kế tiếp của {5,4,3,2,1} là gì — đáp án "{1,2,3,4,5} do quay vòng".
- **Bài tập (3):** tổ hợp có lặp; hoán vị của mảng có phần tử trùng nhau; sinh mọi tập con bằng bitmask thay cho đệ quy.

- [x] **Step 1: Tạo `src/data/lessons/to-hop.js`**

```js
export default {
  goal: [
    'Nói được sự khác nhau giữa tổ hợp và hoán vị bằng một ví dụ đời thường.',
    'Viết được khung quay lui sinh mọi tổ hợp chập k của n.',
    'Giải đúng bài Hoán vị kế tiếp trong đề, kể cả trường hợp quay vòng.',
  ],
  examples: [
    { id: 'vd-to-hop-chap-k', title: 'Tổ hợp chập k của n', official: false },
    { id: 'vd-hoan-vi-ke-tiep', title: 'Hoán vị kế tiếp (Next Permutation)', official: true },
  ],
  quiz: [ /* 4 câu theo đặc tả nội dung ở trên, mỗi câu đủ q/options/answer/why */ ],
  practice: [ /* 3 bài theo đặc tả nội dung ở trên, mỗi bài đủ title/idea/hint */ ],
  leetcode: [
    { no: 118, name: 'Pascal Triangle', slug: 'pascals-triangle', level: 'Easy', note: 'Thấy công thức C(n,k) hình thành theo từng hàng.' },
    { no: 119, name: 'Pascal Triangle II', slug: 'pascals-triangle-ii', level: 'Easy', note: 'Tính 1 hàng bằng O(k) bộ nhớ.' },
    { no: 77, name: 'Combinations', slug: 'combinations', level: 'Medium', note: 'Đúng bài ví dụ 1, không đổi gì.' },
    { no: 216, name: 'Combination Sum III', slug: 'combination-sum-iii', level: 'Medium', note: 'Tổ hợp có thêm ràng buộc tổng.' },
    { no: 40, name: 'Combination Sum II', slug: 'combination-sum-ii', level: 'Medium', note: 'Học cách bỏ nghiệm trùng khi đầu vào có số lặp.' },
    { no: 46, name: 'Permutations', slug: 'permutations', level: 'Medium', note: 'Chuyển từ tổ hợp sang hoán vị bằng mảng used[].' },
    { no: 47, name: 'Permutations II', slug: 'permutations-ii', level: 'Medium', note: 'Hoán vị khi mảng có phần tử trùng — đúng bài tập 2.' },
    { no: 31, name: 'Next Permutation', slug: 'next-permutation', level: 'Medium', note: 'Chính là bài trong đề ôn tập.' },
    { no: 60, name: 'Permutation Sequence', slug: 'permutation-sequence', level: 'Hard', note: 'Tìm hoán vị thứ k mà không sinh hết.' },
    { no: 1830, name: 'Make String Sorted', slug: 'minimum-number-of-operations-to-make-string-sorted', level: 'Hard', note: 'Đếm thứ hạng của một hoán vị.' },
  ],
}
```

- [x] **Step 2: Đăng ký vào `src/data/lessons/index.js`**

```js
import toHop from './to-hop.js'
// ... thêm vào object lessons:
  'to-hop': toHop,
```

- [x] **Step 3: Chạy test dữ liệu**

Run: `npm run test -- --run tests/lesson-data.spec.js`
Expected: PASS. Nếu FAIL nghĩa là `quiz`/`practice` chưa điền đủ — điền tiếp tới khi xanh.

- [x] **Step 4: Ghi lại id widget đang dùng**

```bash
grep -o "getElementById('[^']*'" src/widgets/to-hop.js | sort -u
```

Mọi id in ra phải còn nguyên trong template sau khi viết lại.

- [x] **Step 5: Viết lại `src/sections/ToHop.vue`**

```vue
<template>
<section id="to-hop" class="day-section" data-sid="to-hop" v-show="active">

<h2>Tổ Hợp <span class="exam-tag">★ Đề ôn tập — Bài 1</span></h2>

<LessonGoal :sid="'to-hop'">
  <ul><li v-for="(g, i) in data.goal" :key="i">{{ g }}</li></ul>
</LessonGoal>

<LessonPart :sid="'to-hop'" part="ly-thuyet">
  <!-- chọn 2 trong 4 người bạn, quy tắc "sau lớn hơn trước", bảng so sánh tổ hợp/hoán vị/tập con -->
</LessonPart>

<LessonPart :sid="'to-hop'" part="vi-sao">
  <!-- liên hệ quay lui vừa học + giữ lại khối .realworld đang có trong file cũ -->
</LessonPart>

<LessonPart :sid="'to-hop'" part="quiz">
  <QuizBlock :questions="data.quiz" />
</LessonPart>

<LessonPart :sid="'to-hop'" part="vi-du">
  <WorkedExample id="vd-to-hop-chap-k" title="Tổ hợp chập k của n">
    <template #de-bai><!-- đề bài --></template>
    <template #y-tuong><!-- ý tưởng cốt lõi --></template>
    <template #thuat-toan><!-- các bước --></template>
    <template #chay-tay><!-- bảng chạy tay n=4, k=2 --></template>
    <template #code><pre v-pre><code><!-- code C++ --></code></pre></template>
    <template #toi-uu><!-- cắt nhánh khi phần còn lại không đủ k phần tử --></template>
  </WorkedExample>

  <!-- widget d2Comb* dán nguyên vào đây, giữ đúng mọi id DOM -->

  <WorkedExample id="vd-hoan-vi-ke-tiep" title="Hoán vị kế tiếp (Next Permutation)" :official="true">
    <template #de-bai><!-- nguyên văn đề + bảng input/output cũ --></template>
    <template #y-tuong><!-- danh sách hoán vị theo thứ tự từ điển, sửa ít nhất có thể --></template>
    <template #thuat-toan><!-- 3 bước: pivot, người thay thế, đảo đuôi --></template>
    <template #chay-tay><!-- 2 bảng chạy tay cũ: {1,2,3,4,5} và {5,4,3,2,1} --></template>
    <template #code><pre v-pre><code><!-- bản mảng thường + bản vector --></code></pre></template>
    <template #toi-uu><!-- vì sao reverse() O(k) thay vì sort() O(k log k) --></template>
  </WorkedExample>
</LessonPart>

<LessonPart :sid="'to-hop'" part="bai-tap">
  <PracticeSet :items="data.practice" />
</LessonPart>

<LessonPart :sid="'to-hop'" part="leetcode">
  <LeetCodeList :items="data.leetcode" />
</LessonPart>

</section>
</template>

<script setup>
import { onMounted } from 'vue'
import LessonGoal from '../components/LessonGoal.vue'
import LessonPart from '../components/LessonPart.vue'
import QuizBlock from '../components/QuizBlock.vue'
import WorkedExample from '../components/WorkedExample.vue'
import PracticeSet from '../components/PracticeSet.vue'
import LeetCodeList from '../components/LeetCodeList.vue'
import data from '../data/lessons/to-hop.js'
import { initToHopWidgets } from '../widgets/to-hop.js'

defineProps({ active: Boolean })

onMounted(() => {
  initToHopWidgets()
})
</script>
```

- [x] **Step 6: Chạy toàn bộ test và build**

Run: `npm run test -- --run`
Expected: PASS toàn bộ, gồm cả `to-hop` trong `tests/lesson-structure.spec.js`.

Run: `npm run build`
Expected: build sạch, không lỗi.

Kết quả thực tế: 47/47 test xanh, build sạch.

- [ ] **Step 7: Kiểm tra widget trên trình duyệt** — CHƯA kiểm chứng bằng mắt (chưa chạy `npm run dev` và xem qua trình duyệt trong phiên này). Cần người review mở nhóm "Tổ hợp" và bấm thử "Bước tiếp theo"/"Lùi lại"/"Chạy lại từ đầu" trước khi coi bước này là xong.

- [x] **Step 8: Commit**

```bash
git add src/sections/ToHop.vue src/data/lessons/to-hop.js src/data/lessons/index.js
git commit -m "content: rewrite combinations lesson in 6-part format"
```

---

### Task 10: Nhóm Tham lam

**Files:**
- Create: `src/data/lessons/tham-lam.js`
- Modify: `src/data/lessons/index.js`, `src/sections/ThamLam.vue`
- Giữ nguyên: `src/widgets/tham-lam.js` và mọi id DOM nó truy cập

**Interfaces:**
- Consumes: `LessonGoal`, `LessonPart`, `QuizBlock`, `WorkedExample`, `PracticeSet`, `LeetCodeList`
- Produces: `lessons['tham-lam']` với `examples = [{ id: 'vd-activity-selection', official: true }, { id: 'vd-doi-tien', official: true }]`

**Đặc tả nội dung:**

- **Mục tiêu:** nói được tham lam là gì bằng ví dụ chọn lịch làm việc; kiểm tra được khi nào tham lam cho kết quả tối ưu; giải đúng 2 bài trong đề.
- **Lý thuyết:** "luôn chọn thứ tốt nhất ngay lúc này, không nhìn lại"; 2 điều kiện để tham lam đúng (lựa chọn tham lam an toàn + bài toán con tối ưu); phản ví dụ đổi tiền với bộ mệnh giá {1, 3, 4} và số tiền 6 để thấy tham lam sai.
- **Vì sao quan trọng:** nhanh hơn hẳn vét cạn và QHĐ khi áp dụng được; là cầu nối sang QHĐ — bài học kế tiếp sẽ giải đúng chính bài đổi tiền mà tham lam làm sai.
- **Ví dụ 1 (`vd-activity-selection`, official):** chọn nhiều việc nhất không chồng giờ — đủ 6 khối, chạy tay 5 hoạt động; phần tối ưu giải thích vì sao sắp theo thời điểm kết thúc là an toàn.
- **Ví dụ 2 (`vd-doi-tien`, official):** đổi tiền với hệ mệnh giá chuẩn — đủ 6 khối; phần tối ưu chỉ rõ khi hệ mệnh giá không chuẩn thì phải dùng QHĐ.
- **Quiz (4 câu):** (1) tham lam khác vét cạn ở đâu — "không thử lại lựa chọn đã bỏ"; (2) Activity Selection sắp xếp theo tiêu chí nào — "thời điểm kết thúc tăng dần"; (3) tham lam đổi tiền sai với bộ nào — "{1,3,4} với số tiền 6"; (4) làm sao biết tham lam đúng — "chứng minh lựa chọn tham lam an toàn, không chỉ thử vài ví dụ".
- **Bài tập (3):** nối dây với chi phí nhỏ nhất; phân phát kẹo theo mức đòi hỏi; xếp nhiều cuộc họp nhất vào 1 phòng khi dữ liệu chưa được sắp xếp.

- [x] **Step 1: Tạo `src/data/lessons/tham-lam.js`**

```js
export default {
  goal: [
    'Giải thích được tham lam bằng ví dụ chọn lịch làm việc trong ngày.',
    'Chỉ ra được một trường hợp tham lam cho kết quả sai và nói được vì sao.',
    'Giải đúng bài Activity Selection và bài Đổi tiền trong đề.',
  ],
  examples: [
    { id: 'vd-activity-selection', title: 'Activity Selection — chọn nhiều việc nhất', official: true },
    { id: 'vd-doi-tien', title: 'Đổi tiền với số tờ ít nhất', official: true },
  ],
  quiz: [ /* 4 câu theo đặc tả nội dung ở trên */ ],
  practice: [ /* 3 bài theo đặc tả nội dung ở trên */ ],
  leetcode: [
    { no: 455, name: 'Assign Cookies', slug: 'assign-cookies', level: 'Easy', note: 'Tham lam sau khi sắp xếp, dễ nhất để bắt đầu.' },
    { no: 860, name: 'Lemonade Change', slug: 'lemonade-change', level: 'Easy', note: 'Đổi tiền phiên bản rút gọn.' },
    { no: 121, name: 'Best Time to Buy and Sell Stock', slug: 'best-time-to-buy-and-sell-stock', level: 'Easy', note: 'Giữ giá nhỏ nhất đã gặp, tham lam 1 vòng lặp.' },
    { no: 122, name: 'Best Time to Buy and Sell Stock II', slug: 'best-time-to-buy-and-sell-stock-ii', level: 'Medium', note: 'Gom mọi đoạn tăng, lựa chọn tham lam an toàn.' },
    { no: 55, name: 'Jump Game', slug: 'jump-game', level: 'Medium', note: 'Duy trì tầm với xa nhất.' },
    { no: 45, name: 'Jump Game II', slug: 'jump-game-ii', level: 'Medium', note: 'Tham lam theo tầng, họ hàng gần với BFS.' },
    { no: 435, name: 'Non-overlapping Intervals', slug: 'non-overlapping-intervals', level: 'Medium', note: 'Đúng Activity Selection, phát biểu ngược lại.' },
    { no: 452, name: 'Minimum Arrows to Burst Balloons', slug: 'minimum-number-of-arrows-to-burst-balloons', level: 'Medium', note: 'Cùng khuôn sắp theo điểm kết thúc.' },
    { no: 621, name: 'Task Scheduler', slug: 'task-scheduler', level: 'Medium', note: 'Tham lam theo tần suất lớn nhất.' },
    { no: 135, name: 'Candy', slug: 'candy', level: 'Hard', note: 'Tham lam hai lượt trái và phải.' },
  ],
}
```

- [x] **Step 2: Đăng ký vào `src/data/lessons/index.js`**

```js
import thamLam from './tham-lam.js'
// ... thêm vào object lessons:
  'tham-lam': thamLam,
```

- [x] **Step 3: Chạy test dữ liệu**

Run: `npm run test -- --run tests/lesson-data.spec.js`
Expected: PASS.

- [x] **Step 4: Ghi lại id widget đang dùng**

```bash
grep -o "getElementById('[^']*'" src/widgets/tham-lam.js | sort -u
```

- [x] **Step 5: Viết lại `src/sections/ThamLam.vue`**

```vue
<template>
<section id="tham-lam" class="day-section" data-sid="tham-lam" v-show="active">

<h2>Tham Lam <span class="exam-tag">★ Đề ôn tập</span></h2>

<LessonGoal :sid="'tham-lam'">
  <ul><li v-for="(g, i) in data.goal" :key="i">{{ g }}</li></ul>
</LessonGoal>

<LessonPart :sid="'tham-lam'" part="ly-thuyet">
  <!-- chọn lịch trong ngày, 2 điều kiện để tham lam đúng, phản ví dụ {1,3,4} với số 6 -->
</LessonPart>

<LessonPart :sid="'tham-lam'" part="vi-sao">
  <!-- nhanh hơn vét cạn và QHĐ; cầu nối sang bài QHĐ nền tảng -->
</LessonPart>

<LessonPart :sid="'tham-lam'" part="quiz">
  <QuizBlock :questions="data.quiz" />
</LessonPart>

<LessonPart :sid="'tham-lam'" part="vi-du">
  <WorkedExample id="vd-activity-selection" title="Activity Selection — chọn nhiều việc nhất" :official="true">
    <template #de-bai><!-- đề bài --></template>
    <template #y-tuong><!-- ý tưởng cốt lõi --></template>
    <template #thuat-toan><!-- các bước --></template>
    <template #chay-tay><!-- bảng chạy tay 5 hoạt động --></template>
    <template #code><pre v-pre><code><!-- code C++ --></code></pre></template>
    <template #toi-uu><!-- vì sao sắp theo thời điểm kết thúc là an toàn --></template>
  </WorkedExample>

  <!-- widget tham lam dán nguyên vào đây, giữ đúng mọi id DOM -->

  <WorkedExample id="vd-doi-tien" title="Đổi tiền với số tờ ít nhất" :official="true">
    <template #de-bai><!-- đề bài --></template>
    <template #y-tuong><!-- ý tưởng cốt lõi --></template>
    <template #thuat-toan><!-- các bước --></template>
    <template #chay-tay><!-- bảng chạy tay --></template>
    <template #code><pre v-pre><code><!-- code C++ --></code></pre></template>
    <template #toi-uu><!-- hệ mệnh giá không chuẩn thì phải dùng QHĐ --></template>
  </WorkedExample>
</LessonPart>

<LessonPart :sid="'tham-lam'" part="bai-tap">
  <PracticeSet :items="data.practice" />
</LessonPart>

<LessonPart :sid="'tham-lam'" part="leetcode">
  <LeetCodeList :items="data.leetcode" />
</LessonPart>

</section>
</template>

<script setup>
import { onMounted } from 'vue'
import LessonGoal from '../components/LessonGoal.vue'
import LessonPart from '../components/LessonPart.vue'
import QuizBlock from '../components/QuizBlock.vue'
import WorkedExample from '../components/WorkedExample.vue'
import PracticeSet from '../components/PracticeSet.vue'
import LeetCodeList from '../components/LeetCodeList.vue'
import data from '../data/lessons/tham-lam.js'
import { initThamLamWidgets } from '../widgets/tham-lam.js'

defineProps({ active: Boolean })

onMounted(() => {
  initThamLamWidgets()
})
</script>
```

- [x] **Step 6: Chạy toàn bộ test và build**

Run: `npm run test -- --run`
Expected: PASS toàn bộ.

Run: `npm run build`
Expected: build sạch.

- [ ] **Step 7: Kiểm tra widget trên trình duyệt** — CHƯA kiểm chứng bằng mắt (agent
  không mở được trình duyệt); mọi id DOM widget cần đã được rà lại đủ và test/build
  đều xanh, nhưng cần người mở `npm run dev` xác nhận layout và 3 widget chạy được
  trước khi coi Step này là xong.

Run: `npm run dev`, mở nhóm "Tham lam", chạy hết các nút của widget.
Expected: không lỗi console.

- [x] **Step 8: Commit**

```bash
git add src/sections/ThamLam.vue src/data/lessons/tham-lam.js src/data/lessons/index.js
git commit -m "content: rewrite greedy lesson in 6-part format"
```

---

### Task 11: Nhóm Quy hoạch động nền tảng

**Files:**
- Create: `src/data/lessons/qhd-nen-tang.js`
- Modify: `src/data/lessons/index.js`, `src/sections/QhdNenTang.vue`
- Giữ nguyên: `src/widgets/qhd-nen-tang.js` và mọi id DOM nó truy cập

**Interfaces:**
- Consumes: các component dùng chung ở Task 2–4
- Produces: `lessons['qhd-nen-tang']` với `examples = [{ id: 'vd-fibonacci' }, { id: 'vd-bac-thang' }]`; hàm khởi tạo widget `initQhdNenTangWidgets`

**Đặc tả nội dung:**

- **Mục tiêu:** giải thích được vì sao đệ quy thuần bị chậm; chuyển được 1 công thức đệ quy sang bảng; nhận ra dấu hiệu của bài QHĐ.
- **Lý thuyết:** hình ảnh "làm bài tập rồi ghi đáp án ra giấy nháp để lần sau khỏi tính lại"; 3 khái niệm: bài toán con gối nhau, lời giải tối ưu ghép từ bài toán con, bảng lưu kết quả; 3 cách viết cùng một bài (đệ quy thuần → đệ quy có nhớ → lặp dựng bảng) và bảng so sánh độ phức tạp.
- **Vì sao quan trọng:** trả lời trực tiếp bài đổi tiền mà tham lam làm sai ở bài trước; là nền cho toàn bộ nhóm QHĐ nâng cao; so sánh tham lam ↔ QHĐ bằng 1 bảng ngắn.
- **Ví dụ 1 (`vd-fibonacci`):** Fibonacci — đủ 6 khối, chạy tay n=6, vẽ cây gọi đệ quy để thấy tính lại trùng lặp; phần tối ưu: bỏ bảng, chỉ giữ 2 biến, bộ nhớ O(1).
- **Ví dụ 2 (`vd-bac-thang`):** leo bậc thang (mỗi bước 1 hoặc 2 bậc) — đủ 6 khối, chạy tay n=5; phần tối ưu: biến thể có chi phí mỗi bậc và cách đọc đề để nhận ra vẫn là cùng công thức.
- **Quiz (4 câu):** (1) vì sao Fibonacci đệ quy thuần chậm — "tính lại cùng một bài toán con rất nhiều lần"; (2) đệ quy có nhớ và dựng bảng khác nhau ở đâu — "thứ tự tính, kết quả như nhau"; (3) dấu hiệu nhận biết bài QHĐ — "bài toán con gối nhau và cấu trúc con tối ưu"; (4) số cách leo 5 bậc là bao nhiêu — "8".
- **Bài tập (3):** đếm số đường đi trên lưới m×n chỉ đi phải/xuống; House Robber (không lấy 2 nhà liền kề); đổi tiền với số tờ ít nhất bằng QHĐ cho bộ mệnh giá bất kỳ.

- [x] **Step 1: Tạo `src/data/lessons/qhd-nen-tang.js`**

```js
export default {
  goal: [
    'Nói được vì sao đệ quy thuần tính lại cùng một việc rất nhiều lần.',
    'Chuyển được một công thức đệ quy thành bảng lặp từ dưới lên.',
    'Nhận ra dấu hiệu của một bài quy hoạch động khi đọc đề.',
  ],
  examples: [
    { id: 'vd-fibonacci', title: 'Fibonacci — từ đệ quy chậm tới bảng nhanh', official: false },
    { id: 'vd-bac-thang', title: 'Leo bậc thang', official: false },
  ],
  quiz: [ /* 4 câu theo đặc tả nội dung ở trên */ ],
  practice: [ /* 3 bài theo đặc tả nội dung ở trên */ ],
  leetcode: [
    { no: 509, name: 'Fibonacci Number', slug: 'fibonacci-number', level: 'Easy', note: 'Đúng ví dụ 1, làm cả 3 cách viết.' },
    { no: 70, name: 'Climbing Stairs', slug: 'climbing-stairs', level: 'Easy', note: 'Đúng ví dụ 2.' },
    { no: 746, name: 'Min Cost Climbing Stairs', slug: 'min-cost-climbing-stairs', level: 'Easy', note: 'Biến thể có chi phí mỗi bậc.' },
    { no: 1137, name: 'N-th Tribonacci Number', slug: 'n-th-tribonacci-number', level: 'Easy', note: 'Mở rộng công thức sang 3 số hạng.' },
    { no: 198, name: 'House Robber', slug: 'house-robber', level: 'Medium', note: 'Đúng bài tập 2, có ràng buộc không lấy liền kề.' },
    { no: 213, name: 'House Robber II', slug: 'house-robber-ii', level: 'Medium', note: 'Cùng bài nhưng dãy vòng tròn.' },
    { no: 62, name: 'Unique Paths', slug: 'unique-paths', level: 'Medium', note: 'Đúng bài tập 1, bảng 2 chiều đầu tiên.' },
    { no: 63, name: 'Unique Paths II', slug: 'unique-paths-ii', level: 'Medium', note: 'Thêm vật cản, học cách xử lý ô cấm.' },
    { no: 64, name: 'Minimum Path Sum', slug: 'minimum-path-sum', level: 'Medium', note: 'Đổi từ đếm sang tối ưu trên cùng một bảng.' },
    { no: 322, name: 'Coin Change', slug: 'coin-change', level: 'Medium', note: 'Đúng bài tập 3, chính là bài tham lam làm sai.' },
  ],
}
```

- [x] **Step 2: Đăng ký vào `src/data/lessons/index.js`**

```js
import qhdNenTang from './qhd-nen-tang.js'
// ... thêm vào object lessons:
  'qhd-nen-tang': qhdNenTang,
```

- [x] **Step 3: Chạy test dữ liệu**

Run: `npm run test -- --run tests/lesson-data.spec.js`
Expected: PASS.

- [x] **Step 4: Ghi lại id widget đang dùng**

```bash
grep -o "getElementById('[^']*'" src/widgets/qhd-nen-tang.js | sort -u
```

Mọi id in ra phải còn nguyên trong template sau khi viết lại.

- [x] **Step 5: Viết lại `src/sections/QhdNenTang.vue`**

```vue
<template>
<section id="qhd-nen-tang" class="day-section" data-sid="qhd-nen-tang" v-show="active">

<h2>Quy Hoạch Động — Nền Tảng</h2>

<LessonGoal :sid="'qhd-nen-tang'">
  <ul><li v-for="(g, i) in data.goal" :key="i">{{ g }}</li></ul>
</LessonGoal>

<LessonPart :sid="'qhd-nen-tang'" part="ly-thuyet">
  <!-- ghi đáp án ra giấy nháp; 3 khái niệm; bảng so sánh 3 cách viết -->
</LessonPart>

<LessonPart :sid="'qhd-nen-tang'" part="vi-sao">
  <!-- trả lời bài đổi tiền mà tham lam làm sai; bảng so sánh tham lam với QHĐ -->
</LessonPart>

<LessonPart :sid="'qhd-nen-tang'" part="quiz">
  <QuizBlock :questions="data.quiz" />
</LessonPart>

<LessonPart :sid="'qhd-nen-tang'" part="vi-du">
  <WorkedExample id="vd-fibonacci" title="Fibonacci — từ đệ quy chậm tới bảng nhanh">
    <template #de-bai><!-- đề bài --></template>
    <template #y-tuong><!-- cây gọi đệ quy và phần tính lại trùng lặp --></template>
    <template #thuat-toan><!-- đệ quy có nhớ và dựng bảng --></template>
    <template #chay-tay><!-- bảng dp cho n=6 --></template>
    <template #code><pre v-pre><code><!-- code C++ cả 3 cách --></code></pre></template>
    <template #toi-uu><!-- giữ 2 biến, bộ nhớ O(1) --></template>
  </WorkedExample>

  <!-- widget QHĐ nền tảng dán nguyên vào đây, giữ đúng mọi id DOM -->

  <WorkedExample id="vd-bac-thang" title="Leo bậc thang">
    <template #de-bai><!-- đề bài --></template>
    <template #y-tuong><!-- bậc n tới từ bậc n-1 hoặc n-2 --></template>
    <template #thuat-toan><!-- công thức truy hồi và điều kiện biên --></template>
    <template #chay-tay><!-- bảng dp cho n=5 --></template>
    <template #code><pre v-pre><code><!-- code C++ --></code></pre></template>
    <template #toi-uu><!-- biến thể có chi phí mỗi bậc --></template>
  </WorkedExample>
</LessonPart>

<LessonPart :sid="'qhd-nen-tang'" part="bai-tap">
  <PracticeSet :items="data.practice" />
</LessonPart>

<LessonPart :sid="'qhd-nen-tang'" part="leetcode">
  <LeetCodeList :items="data.leetcode" />
</LessonPart>

</section>
</template>

<script setup>
import { onMounted } from 'vue'
import LessonGoal from '../components/LessonGoal.vue'
import LessonPart from '../components/LessonPart.vue'
import QuizBlock from '../components/QuizBlock.vue'
import WorkedExample from '../components/WorkedExample.vue'
import PracticeSet from '../components/PracticeSet.vue'
import LeetCodeList from '../components/LeetCodeList.vue'
import data from '../data/lessons/qhd-nen-tang.js'
import { initQhdNenTangWidgets } from '../widgets/qhd-nen-tang.js'

defineProps({ active: Boolean })

onMounted(() => {
  initQhdNenTangWidgets()
})
</script>
```

- [x] **Step 6: Chạy toàn bộ test và build**

Run: `npm run test -- --run`
Expected: PASS toàn bộ.

Run: `npm run build`
Expected: build sạch.

- [ ] **Step 7: Kiểm tra widget trên trình duyệt** — CHƯA kiểm chứng bằng mắt (agent
  không mở được trình duyệt); id DOM widget `d6FibView`/`d6FibCaption`/`d6FibPrev`/
  `d6FibNext`/`d6FibReset`/`d6FibStepNum`/`d6FibStepTotal` đã rà lại đủ và test/build
  đều xanh, nhưng cần người mở `npm run dev` xác nhận layout và widget Fibonacci chạy
  được trước khi coi Step này là xong.

Run: `npm run dev`, mở nhóm "QHĐ nền tảng", chạy hết các nút của widget.
Expected: không lỗi console.

- [x] **Step 8: Commit**

```bash
git add src/sections/QhdNenTang.vue src/data/lessons/qhd-nen-tang.js src/data/lessons/index.js
git commit -m "content: rewrite foundational DP lesson in 6-part format"
```

---

### Task 12: Nhóm Ngăn xếp & Hàng đợi

**Files:**
- Create: `src/data/lessons/ngan-xep-hang-doi.js`
- Modify: `src/data/lessons/index.js`, `src/sections/NganXepHangDoi.vue` (file lớn nhất — 642 dòng)
- Giữ nguyên: `src/widgets/ngan-xep-hang-doi.js` và mọi id DOM nó truy cập

**Interfaces:**
- Consumes: các component dùng chung ở Task 2–4
- Produces: `lessons['ngan-xep-hang-doi']` với `examples = [{ id: 'vd-day-ngoac', official: true }, { id: 'vd-dao-tu-trong-xau', official: true }]`; hàm khởi tạo widget `initNganXepHangDoiWidgets`

**Đặc tả nội dung:**

- **Mục tiêu:** phân biệt LIFO và FIFO bằng ví dụ đời thường; chọn đúng cấu trúc cho một bài toán khi đọc đề; giải đúng 2 bài trong đề.
- **Lý thuyết:** ngăn xếp là chồng đĩa (lấy đĩa trên cùng), hàng đợi là xếp hàng mua vé (ai tới trước ra trước); 4 thao tác cơ bản của mỗi cấu trúc và chi phí O(1); cách cài bằng mảng thường (chỉ số `top`, `front`/`rear`) song song với `stack`/`queue` của C++.
- **Vì sao quan trọng:** ngăn xếp là cách máy tính chạy đệ quy (liên hệ ngược tới quay lui đã học); hàng đợi là nền của BFS (dẫn tới bài DFS/BFS sắp học); ứng dụng nút Undo, lịch sử trình duyệt, hàng chờ in.
- **Ví dụ 1 (`vd-day-ngoac`, official):** kiểm tra dãy ngoặc hợp lệ — đủ 6 khối, chạy tay `([)]` và `([])`; phần tối ưu: thoát sớm khi số ngoặc lẻ, và trường hợp chỉ có 1 loại ngoặc thì chỉ cần 1 biến đếm.
- **Ví dụ 2 (`vd-dao-tu-trong-xau`, official):** đảo ngược từng từ trong xâu — đủ 6 khối; phần tối ưu: cách làm tại chỗ bằng 2 con trỏ, bộ nhớ O(1), và nêu liên hệ tới bước đảo đuôi trong bài Hoán vị kế tiếp.
- **Quiz (4 câu):** (1) LIFO và FIFO khác nhau ra sao — "thứ tự lấy phần tử ra"; (2) bài kiểm tra dãy ngoặc dùng cấu trúc nào và vì sao — "ngăn xếp, vì ngoặc mở gần nhất phải đóng trước"; (3) BFS dùng cấu trúc nào — "hàng đợi"; (4) đẩy 1,2,3 vào ngăn xếp rồi lấy ra 2 lần thì được gì — "3 rồi 2".
- **Bài tập (3):** tính giá trị biểu thức hậu tố; cài Min Stack lấy giá trị nhỏ nhất trong O(1); cài hàng đợi bằng 2 ngăn xếp.

- [ ] **Step 1: Tạo `src/data/lessons/ngan-xep-hang-doi.js`**

```js
export default {
  goal: [
    'Nói được LIFO và FIFO bằng ví dụ chồng đĩa và hàng mua vé.',
    'Chọn đúng ngăn xếp hay hàng đợi ngay khi đọc đề.',
    'Giải đúng bài Dãy ngoặc hợp lệ và bài Đảo ngược từng từ trong đề.',
  ],
  examples: [
    { id: 'vd-day-ngoac', title: 'Kiểm tra dãy ngoặc hợp lệ', official: true },
    { id: 'vd-dao-tu-trong-xau', title: 'Đảo ngược từng từ trong xâu', official: true },
  ],
  quiz: [ /* 4 câu theo đặc tả nội dung ở trên */ ],
  practice: [ /* 3 bài theo đặc tả nội dung ở trên */ ],
  leetcode: [
    { no: 20, name: 'Valid Parentheses', slug: 'valid-parentheses', level: 'Easy', note: 'Đúng ví dụ 1.' },
    { no: 155, name: 'Min Stack', slug: 'min-stack', level: 'Easy', note: 'Đúng bài tập 2.' },
    { no: 232, name: 'Implement Queue using Stacks', slug: 'implement-queue-using-stacks', level: 'Easy', note: 'Đúng bài tập 3.' },
    { no: 1047, name: 'Remove All Adjacent Duplicates In String', slug: 'remove-all-adjacent-duplicates-in-string', level: 'Easy', note: 'Ngăn xếp trên xâu, rất dễ hình dung.' },
    { no: 844, name: 'Backspace String Compare', slug: 'backspace-string-compare', level: 'Easy', note: 'Ngăn xếp mô phỏng phím xóa.' },
    { no: 496, name: 'Next Greater Element I', slug: 'next-greater-element-i', level: 'Easy', note: 'Làm quen ngăn xếp đơn điệu.' },
    { no: 150, name: 'Evaluate Reverse Polish Notation', slug: 'evaluate-reverse-polish-notation', level: 'Medium', note: 'Đúng bài tập 1, biểu thức hậu tố.' },
    { no: 151, name: 'Reverse Words in a String', slug: 'reverse-words-in-a-string', level: 'Medium', note: 'Đúng ví dụ 2.' },
    { no: 739, name: 'Daily Temperatures', slug: 'daily-temperatures', level: 'Medium', note: 'Ngăn xếp đơn điệu ở dạng kinh điển.' },
    { no: 394, name: 'Decode String', slug: 'decode-string', level: 'Medium', note: 'Ngăn xếp lồng nhau, luyện tư duy đệ quy.' },
    { no: 239, name: 'Sliding Window Maximum', slug: 'sliding-window-maximum', level: 'Hard', note: 'Hàng đợi hai đầu.' },
    { no: 84, name: 'Largest Rectangle in Histogram', slug: 'largest-rectangle-in-histogram', level: 'Hard', note: 'Đỉnh cao của ngăn xếp đơn điệu.' },
  ],
}
```

- [ ] **Step 2: Đăng ký vào `src/data/lessons/index.js`**

```js
import nganXepHangDoi from './ngan-xep-hang-doi.js'
// ... thêm vào object lessons:
  'ngan-xep-hang-doi': nganXepHangDoi,
```

- [ ] **Step 3: Chạy test dữ liệu**

Run: `npm run test -- --run tests/lesson-data.spec.js`
Expected: PASS.

- [ ] **Step 4: Ghi lại id widget đang dùng**

```bash
grep -o "getElementById('[^']*'" src/widgets/ngan-xep-hang-doi.js | sort -u
```

Section này có nhiều widget nhất — kiểm tra kỹ, mọi id in ra phải còn nguyên.

- [ ] **Step 5: Viết lại `src/sections/NganXepHangDoi.vue`**

```vue
<template>
<section id="ngan-xep-hang-doi" class="day-section" data-sid="ngan-xep-hang-doi" v-show="active">

<h2>Ngăn Xếp &amp; Hàng Đợi <span class="exam-tag">★ Đề ôn tập</span></h2>

<LessonGoal :sid="'ngan-xep-hang-doi'">
  <ul><li v-for="(g, i) in data.goal" :key="i">{{ g }}</li></ul>
</LessonGoal>

<LessonPart :sid="'ngan-xep-hang-doi'" part="ly-thuyet">
  <!-- chồng đĩa và hàng mua vé; 4 thao tác; cài bằng mảng thường song song với stack/queue -->
</LessonPart>

<LessonPart :sid="'ngan-xep-hang-doi'" part="vi-sao">
  <!-- ngăn xếp là cách máy chạy đệ quy; hàng đợi là nền của BFS; Undo, lịch sử trình duyệt -->
</LessonPart>

<LessonPart :sid="'ngan-xep-hang-doi'" part="quiz">
  <QuizBlock :questions="data.quiz" />
</LessonPart>

<LessonPart :sid="'ngan-xep-hang-doi'" part="vi-du">
  <WorkedExample id="vd-day-ngoac" title="Kiểm tra dãy ngoặc hợp lệ" :official="true">
    <template #de-bai><!-- nguyên văn đề --></template>
    <template #y-tuong><!-- ngoặc mở gần nhất phải được đóng trước --></template>
    <template #thuat-toan><!-- các bước --></template>
    <template #chay-tay><!-- bảng chạy tay cho ([)] và ([]) --></template>
    <template #code><pre v-pre><code><!-- code C++ --></code></pre></template>
    <template #toi-uu><!-- thoát sớm khi độ dài lẻ; 1 loại ngoặc thì chỉ cần biến đếm --></template>
  </WorkedExample>

  <!-- các widget ngăn xếp/hàng đợi dán nguyên vào đây, giữ đúng mọi id DOM -->

  <WorkedExample id="vd-dao-tu-trong-xau" title="Đảo ngược từng từ trong xâu" :official="true">
    <template #de-bai><!-- nguyên văn đề --></template>
    <template #y-tuong><!-- tách từ rồi lấy ra theo thứ tự ngược --></template>
    <template #thuat-toan><!-- các bước --></template>
    <template #chay-tay><!-- bảng chạy tay 1 câu ví dụ --></template>
    <template #code><pre v-pre><code><!-- code C++ --></code></pre></template>
    <template #toi-uu><!-- làm tại chỗ bằng 2 con trỏ, liên hệ bước đảo đuôi ở Hoán vị kế tiếp --></template>
  </WorkedExample>
</LessonPart>

<LessonPart :sid="'ngan-xep-hang-doi'" part="bai-tap">
  <PracticeSet :items="data.practice" />
</LessonPart>

<LessonPart :sid="'ngan-xep-hang-doi'" part="leetcode">
  <LeetCodeList :items="data.leetcode" />
</LessonPart>

</section>
</template>

<script setup>
import { onMounted } from 'vue'
import LessonGoal from '../components/LessonGoal.vue'
import LessonPart from '../components/LessonPart.vue'
import QuizBlock from '../components/QuizBlock.vue'
import WorkedExample from '../components/WorkedExample.vue'
import PracticeSet from '../components/PracticeSet.vue'
import LeetCodeList from '../components/LeetCodeList.vue'
import data from '../data/lessons/ngan-xep-hang-doi.js'
import { initNganXepHangDoiWidgets } from '../widgets/ngan-xep-hang-doi.js'

defineProps({ active: Boolean })

onMounted(() => {
  initNganXepHangDoiWidgets()
})
</script>
```

- [ ] **Step 6: Chạy toàn bộ test và build**

Run: `npm run test -- --run`
Expected: PASS toàn bộ.

Run: `npm run build`
Expected: build sạch.

- [ ] **Step 7: Kiểm tra widget trên trình duyệt**

Run: `npm run dev`, mở nhóm "Ngăn xếp & Hàng đợi", chạy hết các nút của **mọi** widget trong section.
Expected: không lỗi console.

- [ ] **Step 8: Commit**

```bash
git add src/sections/NganXepHangDoi.vue src/data/lessons/ngan-xep-hang-doi.js src/data/lessons/index.js
git commit -m "content: rewrite stack and queue lesson in 6-part format"
```

---

### Task 13: Nhóm DFS & BFS

**Files:**
- Create: `src/data/lessons/dfs-bfs.js`
- Modify: `src/data/lessons/index.js`, `src/sections/DfsBfs.vue`
- Giữ nguyên: `src/widgets/dfs-bfs.js` và mọi id DOM nó truy cập

**Interfaces:**
- Consumes: các component dùng chung ở Task 2–4
- Produces: `lessons['dfs-bfs']` với `examples = [{ id: 'vd-lien-thong', official: true }, { id: 'vd-duong-di-bfs', official: true }]`; hàm khởi tạo widget `initDfsBfsWidgets`

**Đặc tả nội dung:**

- **Mục tiêu:** đọc được ma trận kề; nói được khác biệt giữa DFS và BFS và khi nào dùng cái nào; giải đúng bài đồ thị 7 điểm trong đề.
- **Lý thuyết:** đồ thị là "bản đồ các điểm và đường nối"; 2 cách lưu (ma trận kề, danh sách kề) kèm bảng so sánh bộ nhớ; DFS là "đi hết một hướng rồi mới quay lại" (dùng ngăn xếp/đệ quy), BFS là "loang đều theo từng vòng" (dùng hàng đợi); vai trò của mảng `visited[]`.
- **Vì sao quan trọng:** liên hệ ngược tới ngăn xếp/hàng đợi vừa học (DFS ↔ ngăn xếp, BFS ↔ hàng đợi) và tới quay lui (DFS chính là quay lui trên đồ thị); ứng dụng mạng xã hội, định tuyến, tìm đường trong game.
- **Ví dụ 1 (`vd-lien-thong`, official):** đếm số thành phần liên thông từ ma trận kề — đủ 6 khối, chạy tay đồ thị 6 đỉnh; phần tối ưu: chuyển sang danh sách kề khi đồ thị thưa, so sánh O(n²) với O(n+m).
- **Ví dụ 2 (`vd-duong-di-bfs`, official):** tìm đường đi ngắn nhất theo số cạnh bằng BFS và truy vết đường đi — đủ 6 khối, chạy tay theo từng vòng loang; phần tối ưu: BFS 2 đầu, và lưu ý BFS chỉ đúng khi cạnh không trọng số.
- **Quiz (4 câu):** (1) DFS dùng cấu trúc nào, BFS dùng cấu trúc nào — "ngăn xếp/đệ quy và hàng đợi"; (2) muốn tìm đường ít cạnh nhất thì dùng gì — "BFS"; (3) bỏ mảng visited[] thì chuyện gì xảy ra — "lặp vô hạn khi đồ thị có chu trình"; (4) ma trận kề tốn bao nhiêu bộ nhớ — "O(n²) bất kể số cạnh".
- **Bài tập (3):** đếm số đảo trên lưới ký tự; loang từ nhiều nguồn cùng lúc (cam thối); kiểm tra đồ thị có chu trình bằng DFS.

- [ ] **Step 1: Tạo `src/data/lessons/dfs-bfs.js`**

```js
export default {
  goal: [
    'Đọc được ma trận kề và vẽ lại đồ thị tương ứng.',
    'Nói được khi nào dùng DFS, khi nào dùng BFS và vì sao.',
    'Giải đúng bài đồ thị trong đề: kiểm tra liên thông và tìm đường đi bằng BFS.',
  ],
  examples: [
    { id: 'vd-lien-thong', title: 'Đếm số thành phần liên thông', official: true },
    { id: 'vd-duong-di-bfs', title: 'Tìm đường đi ngắn nhất bằng BFS', official: true },
  ],
  quiz: [ /* 4 câu theo đặc tả nội dung ở trên */ ],
  practice: [ /* 3 bài theo đặc tả nội dung ở trên */ ],
  leetcode: [
    { no: 733, name: 'Flood Fill', slug: 'flood-fill', level: 'Easy', note: 'Loang trên lưới ở mức dễ nhất.' },
    { no: 200, name: 'Number of Islands', slug: 'number-of-islands', level: 'Medium', note: 'Đúng bài tập 1, đếm thành phần liên thông trên lưới.' },
    { no: 695, name: 'Max Area of Island', slug: 'max-area-of-island', level: 'Medium', note: 'Cùng khuôn, thêm việc đếm kích thước.' },
    { no: 547, name: 'Number of Provinces', slug: 'number-of-provinces', level: 'Medium', note: 'Đúng ví dụ 1, đầu vào là ma trận kề.' },
    { no: 994, name: 'Rotting Oranges', slug: 'rotting-oranges', level: 'Medium', note: 'Đúng bài tập 2, BFS nhiều nguồn.' },
    { no: 1091, name: 'Shortest Path in Binary Matrix', slug: 'shortest-path-in-binary-matrix', level: 'Medium', note: 'BFS tìm đường ngắn nhất trên lưới.' },
    { no: 133, name: 'Clone Graph', slug: 'clone-graph', level: 'Medium', note: 'Duyệt đồ thị kèm ánh xạ đỉnh.' },
    { no: 207, name: 'Course Schedule', slug: 'course-schedule', level: 'Medium', note: 'Đúng bài tập 3, phát hiện chu trình.' },
    { no: 210, name: 'Course Schedule II', slug: 'course-schedule-ii', level: 'Medium', note: 'Sắp xếp tô-pô bằng BFS.' },
    { no: 785, name: 'Is Graph Bipartite', slug: 'is-graph-bipartite', level: 'Medium', note: 'Tô màu 2 màu khi duyệt.' },
    { no: 127, name: 'Word Ladder', slug: 'word-ladder', level: 'Hard', note: 'BFS trên đồ thị ngầm, không cho sẵn cạnh.' },
  ],
}
```

- [ ] **Step 2: Đăng ký vào `src/data/lessons/index.js`**

```js
import dfsBfs from './dfs-bfs.js'
// ... thêm vào object lessons:
  'dfs-bfs': dfsBfs,
```

- [ ] **Step 3: Chạy test dữ liệu**

Run: `npm run test -- --run tests/lesson-data.spec.js`
Expected: PASS.

- [ ] **Step 4: Ghi lại id widget đang dùng**

```bash
grep -o "getElementById('[^']*'" src/widgets/dfs-bfs.js | sort -u
```

- [ ] **Step 5: Viết lại `src/sections/DfsBfs.vue`**

```vue
<template>
<section id="dfs-bfs" class="day-section" data-sid="dfs-bfs" v-show="active">

<h2>BFS &amp; DFS <span class="exam-tag">★ Đề ôn tập</span></h2>

<LessonGoal :sid="'dfs-bfs'">
  <ul><li v-for="(g, i) in data.goal" :key="i">{{ g }}</li></ul>
</LessonGoal>

<LessonPart :sid="'dfs-bfs'" part="ly-thuyet">
  <!-- đồ thị là bản đồ điểm và đường nối; ma trận kề và danh sách kề; DFS/BFS; vai trò visited[] -->
</LessonPart>

<LessonPart :sid="'dfs-bfs'" part="vi-sao">
  <!-- liên hệ ngăn xếp/hàng đợi và quay lui; mạng xã hội, định tuyến, tìm đường trong game -->
</LessonPart>

<LessonPart :sid="'dfs-bfs'" part="quiz">
  <QuizBlock :questions="data.quiz" />
</LessonPart>

<LessonPart :sid="'dfs-bfs'" part="vi-du">
  <WorkedExample id="vd-lien-thong" title="Đếm số thành phần liên thông" :official="true">
    <template #de-bai><!-- nguyên văn đề --></template>
    <template #y-tuong><!-- mỗi lần bắt đầu duyệt từ 1 đỉnh chưa thăm là thêm 1 thành phần --></template>
    <template #thuat-toan><!-- các bước --></template>
    <template #chay-tay><!-- bảng chạy tay đồ thị 6 đỉnh --></template>
    <template #code><pre v-pre><code><!-- code C++ với ma trận kề --></code></pre></template>
    <template #toi-uu><!-- danh sách kề khi đồ thị thưa, O(n²) so với O(n+m) --></template>
  </WorkedExample>

  <!-- widget đồ thị dán nguyên vào đây, giữ đúng mọi id DOM -->

  <WorkedExample id="vd-duong-di-bfs" title="Tìm đường đi ngắn nhất bằng BFS" :official="true">
    <template #de-bai><!-- nguyên văn đề --></template>
    <template #y-tuong><!-- loang đều theo từng vòng nên chạm đích ở số cạnh nhỏ nhất --></template>
    <template #thuat-toan><!-- hàng đợi, mảng visited[], mảng parent[] để truy vết --></template>
    <template #chay-tay><!-- bảng chạy tay theo từng vòng loang --></template>
    <template #code><pre v-pre><code><!-- code C++ --></code></pre></template>
    <template #toi-uu><!-- BFS 2 đầu; lưu ý BFS chỉ đúng khi cạnh không trọng số --></template>
  </WorkedExample>
</LessonPart>

<LessonPart :sid="'dfs-bfs'" part="bai-tap">
  <PracticeSet :items="data.practice" />
</LessonPart>

<LessonPart :sid="'dfs-bfs'" part="leetcode">
  <LeetCodeList :items="data.leetcode" />
</LessonPart>

</section>
</template>

<script setup>
import { onMounted } from 'vue'
import LessonGoal from '../components/LessonGoal.vue'
import LessonPart from '../components/LessonPart.vue'
import QuizBlock from '../components/QuizBlock.vue'
import WorkedExample from '../components/WorkedExample.vue'
import PracticeSet from '../components/PracticeSet.vue'
import LeetCodeList from '../components/LeetCodeList.vue'
import data from '../data/lessons/dfs-bfs.js'
import { initDfsBfsWidgets } from '../widgets/dfs-bfs.js'

defineProps({ active: Boolean })

onMounted(() => {
  initDfsBfsWidgets()
})
</script>
```

- [ ] **Step 6: Chạy toàn bộ test và build**

Run: `npm run test -- --run`
Expected: PASS toàn bộ.

Run: `npm run build`
Expected: build sạch.

- [ ] **Step 7: Kiểm tra widget trên trình duyệt**

Run: `npm run dev`, mở nhóm "BFS & DFS", chạy hết các nút của widget.
Expected: không lỗi console.

- [ ] **Step 8: Commit**

```bash
git add src/sections/DfsBfs.vue src/data/lessons/dfs-bfs.js src/data/lessons/index.js
git commit -m "content: rewrite graph traversal lesson in 6-part format"
```

---

### Task 14: Nhóm DSU (Disjoint Set Union)

**Files:**
- Create: `src/data/lessons/dsu.js`
- Modify: `src/data/lessons/index.js`, `src/sections/Dsu.vue`
- Giữ nguyên: `src/widgets/dsu.js` và mọi id DOM nó truy cập

**Interfaces:**
- Consumes: các component dùng chung ở Task 2–4
- Produces: `lessons['dsu']` với `examples = [{ id: 'vd-dsu-lien-thong' }, { id: 'vd-dsu-chu-trinh' }]`; hàm khởi tạo widget `initDsuWidgets`

**Đặc tả nội dung:**

- **Mục tiêu:** giải thích DSU bằng ví dụ "gộp các nhóm bạn"; cài được `find` và `union`; nhận ra bài nào nên dùng DSU thay vì DFS.
- **Lý thuyết:** mỗi nhóm có 1 "nhóm trưởng" (đại diện); `find(x)` là "hỏi lên trên cho tới khi gặp nhóm trưởng", `union(a,b)` là "cho nhóm trưởng này trỏ vào nhóm trưởng kia"; 2 tối ưu: nén đường (path compression) và gộp theo hạng (union by rank), giải thích bằng hình ảnh "kéo mọi người trỏ thẳng lên nhóm trưởng".
- **Vì sao quan trọng:** so sánh với DFS đã học ở bài trước — DFS trả lời "liên thông không" khi đồ thị cố định, DSU trả lời được ngay cả khi cạnh được thêm dần; ứng dụng gợi ý bạn bè, gom cụm, thuật toán Kruskal.
- **Ví dụ 1 (`vd-dsu-lien-thong`):** đếm số nhóm sau khi thêm dần các cạnh — đủ 6 khối, chạy tay 6 phần tử và 4 phép gộp, vẽ bảng `parent[]` sau mỗi bước; phần tối ưu: nén đường rút chi phí về gần O(1).
- **Ví dụ 2 (`vd-dsu-chu-trinh`):** phát hiện chu trình trong đồ thị vô hướng — đủ 6 khối; phần tối ưu: so sánh với cách dùng DFS và khi nào mỗi cách tiện hơn.
- **Quiz (4 câu):** (1) `find(x)` trả về cái gì — "đại diện của nhóm chứa x"; (2) khi nào biết 2 cạnh tạo thành chu trình — "khi 2 đầu mút đã cùng một đại diện"; (3) nén đường làm gì — "rút ngắn đường đi lên đại diện cho các lần hỏi sau"; (4) DSU có xóa được liên kết đã gộp không — "không, DSU chỉ gộp thêm".
- **Bài tập (3):** đếm số tỉnh từ ma trận kề bằng DSU; tìm cạnh dư thừa làm xuất hiện chu trình; cài Kruskal tìm cây khung nhỏ nhất cho đồ thị nhỏ.

- [ ] **Step 1: Tạo `src/data/lessons/dsu.js`**

```js
export default {
  goal: [
    'Giải thích DSU bằng ví dụ gộp các nhóm bạn có chung một nhóm trưởng.',
    'Cài được find và union, kèm nén đường.',
    'Biết khi nào nên dùng DSU thay cho DFS.',
  ],
  examples: [
    { id: 'vd-dsu-lien-thong', title: 'Đếm số nhóm khi thêm dần các liên kết', official: false },
    { id: 'vd-dsu-chu-trinh', title: 'Phát hiện chu trình trong đồ thị vô hướng', official: false },
  ],
  quiz: [ /* 4 câu theo đặc tả nội dung ở trên */ ],
  practice: [ /* 3 bài theo đặc tả nội dung ở trên */ ],
  leetcode: [
    { no: 547, name: 'Number of Provinces', slug: 'number-of-provinces', level: 'Medium', note: 'Đúng bài tập 1, đầu vào ma trận kề.' },
    { no: 200, name: 'Number of Islands', slug: 'number-of-islands', level: 'Medium', note: 'Làm lại bằng DSU để so với cách DFS đã học.' },
    { no: 684, name: 'Redundant Connection', slug: 'redundant-connection', level: 'Medium', note: 'Đúng bài tập 2, cạnh gây chu trình.' },
    { no: 990, name: 'Satisfiability of Equality Equations', slug: 'satisfiability-of-equality-equations', level: 'Medium', note: 'DSU trên quan hệ bằng nhau.' },
    { no: 1319, name: 'Number of Operations to Make Network Connected', slug: 'number-of-operations-to-make-network-connected', level: 'Medium', note: 'Đếm nhóm và đếm cạnh thừa.' },
    { no: 947, name: 'Most Stones Removed with Same Row or Column', slug: 'most-stones-removed-with-same-row-or-column', level: 'Medium', note: 'Gộp theo hàng và cột.' },
    { no: 721, name: 'Accounts Merge', slug: 'accounts-merge', level: 'Medium', note: 'DSU trên chuỗi, cần ánh xạ tên sang chỉ số.' },
    { no: 128, name: 'Longest Consecutive Sequence', slug: 'longest-consecutive-sequence', level: 'Medium', note: 'Gộp các số liền nhau thành đoạn.' },
    { no: 1584, name: 'Min Cost to Connect All Points', slug: 'min-cost-to-connect-all-points', level: 'Medium', note: 'Đúng bài tập 3, Kruskal.' },
    { no: 839, name: 'Similar String Groups', slug: 'similar-string-groups', level: 'Hard', note: 'Gộp nhóm với hàm so sánh tự định nghĩa.' },
  ],
}
```

- [ ] **Step 2: Đăng ký vào `src/data/lessons/index.js`**

```js
import dsu from './dsu.js'
// ... thêm vào object lessons:
  'dsu': dsu,
```

- [ ] **Step 3: Chạy test dữ liệu**

Run: `npm run test -- --run tests/lesson-data.spec.js`
Expected: PASS.

- [ ] **Step 4: Ghi lại id widget đang dùng**

```bash
grep -o "getElementById('[^']*'" src/widgets/dsu.js | sort -u
```

- [ ] **Step 5: Viết lại `src/sections/Dsu.vue`**

```vue
<template>
<section id="dsu" class="day-section" data-sid="dsu" v-show="active">

<h2>DSU — Disjoint Set Union</h2>

<LessonGoal :sid="'dsu'">
  <ul><li v-for="(g, i) in data.goal" :key="i">{{ g }}</li></ul>
</LessonGoal>

<LessonPart :sid="'dsu'" part="ly-thuyet">
  <!-- nhóm trưởng đại diện; find và union; nén đường và gộp theo hạng -->
</LessonPart>

<LessonPart :sid="'dsu'" part="vi-sao">
  <!-- so sánh với DFS ở bài trước; gợi ý bạn bè, gom cụm, Kruskal -->
</LessonPart>

<LessonPart :sid="'dsu'" part="quiz">
  <QuizBlock :questions="data.quiz" />
</LessonPart>

<LessonPart :sid="'dsu'" part="vi-du">
  <WorkedExample id="vd-dsu-lien-thong" title="Đếm số nhóm khi thêm dần các liên kết">
    <template #de-bai><!-- đề bài --></template>
    <template #y-tuong><!-- mỗi lần gộp 2 nhóm khác nhau thì số nhóm giảm 1 --></template>
    <template #thuat-toan><!-- các bước --></template>
    <template #chay-tay><!-- bảng parent[] sau từng phép gộp, 6 phần tử, 4 cạnh --></template>
    <template #code><pre v-pre><code><!-- code C++ --></code></pre></template>
    <template #toi-uu><!-- nén đường đưa chi phí về gần O(1) --></template>
  </WorkedExample>

  <!-- widget DSU dán nguyên vào đây, giữ đúng mọi id DOM -->

  <WorkedExample id="vd-dsu-chu-trinh" title="Phát hiện chu trình trong đồ thị vô hướng">
    <template #de-bai><!-- đề bài --></template>
    <template #y-tuong><!-- 2 đầu mút đã cùng đại diện nghĩa là thêm cạnh sẽ tạo chu trình --></template>
    <template #thuat-toan><!-- các bước --></template>
    <template #chay-tay><!-- bảng chạy tay --></template>
    <template #code><pre v-pre><code><!-- code C++ --></code></pre></template>
    <template #toi-uu><!-- so sánh với cách dùng DFS --></template>
  </WorkedExample>
</LessonPart>

<LessonPart :sid="'dsu'" part="bai-tap">
  <PracticeSet :items="data.practice" />
</LessonPart>

<LessonPart :sid="'dsu'" part="leetcode">
  <LeetCodeList :items="data.leetcode" />
</LessonPart>

</section>
</template>

<script setup>
import { onMounted } from 'vue'
import LessonGoal from '../components/LessonGoal.vue'
import LessonPart from '../components/LessonPart.vue'
import QuizBlock from '../components/QuizBlock.vue'
import WorkedExample from '../components/WorkedExample.vue'
import PracticeSet from '../components/PracticeSet.vue'
import LeetCodeList from '../components/LeetCodeList.vue'
import data from '../data/lessons/dsu.js'
import { initDsuWidgets } from '../widgets/dsu.js'

defineProps({ active: Boolean })

onMounted(() => {
  initDsuWidgets()
})
</script>
```

- [ ] **Step 6: Chạy toàn bộ test và build**

Run: `npm run test -- --run`
Expected: PASS toàn bộ.

Run: `npm run build`
Expected: build sạch.

- [ ] **Step 7: Kiểm tra widget trên trình duyệt**

Run: `npm run dev`, mở nhóm "DSU", chạy hết các nút của widget.
Expected: không lỗi console.

- [ ] **Step 8: Commit**

```bash
git add src/sections/Dsu.vue src/data/lessons/dsu.js src/data/lessons/index.js
git commit -m "content: rewrite DSU lesson in 6-part format"
```

---

### Task 15: Nhóm Cây nhị phân & BST

**Files:**
- Create: `src/data/lessons/cay-nhi-phan-bst.js`
- Modify: `src/data/lessons/index.js`, `src/sections/CayNhiPhanBst.vue`
- Giữ nguyên: `src/widgets/cay-nhi-phan-bst.js` và mọi id DOM nó truy cập

**Interfaces:**
- Consumes: các component dùng chung ở Task 2–4
- Produces: `lessons['cay-nhi-phan-bst']` với `examples = [{ id: 'vd-ba-phep-duyet', official: true }, { id: 'vd-bst-chen-xoa', official: true }]`; hàm khởi tạo widget `initCayNhiPhanBstWidgets`

**Đặc tả nội dung:**

- **Mục tiêu:** vẽ được cây từ dữ liệu cha–con; viết được 3 phép duyệt; dựng, chèn và xóa được node trên BST.
- **Lý thuyết:** cây là "sơ đồ gia phả" — gốc, node, con trái, con phải, lá, chiều cao; 3 phép duyệt và cách nhớ theo vị trí thăm gốc (trước / giữa / sau); BST là cây có luật "trái nhỏ hơn gốc, phải lớn hơn gốc" và hệ quả quan trọng: duyệt giữa cho ra dãy tăng dần.
- **Vì sao quan trọng:** duyệt cây chính là DFS trên cấu trúc không có chu trình (liên hệ bài DFS/BFS); BST cho tìm kiếm O(chiều cao) thay vì O(n); ứng dụng chỉ mục cơ sở dữ liệu, cây thư mục, cây DOM.
- **Ví dụ 1 (`vd-ba-phep-duyet`, official):** 3 phép duyệt trên cây cho trước — đủ 6 khối, chạy tay đủ 3 thứ tự trên cùng 1 cây 7 node; phần tối ưu: bản khử đệ quy dùng ngăn xếp (liên hệ bài Ngăn xếp) và duyệt theo mức bằng hàng đợi.
- **Ví dụ 2 (`vd-bst-chen-xoa`, official):** dựng BST từ dãy số, chèn và xóa node — đủ 6 khối, chạy tay 3 trường hợp xóa (lá / 1 con / 2 con); phần tối ưu: vì sao cây lệch làm chi phí về O(n), dẫn sang bài BST nâng cao.
- **Quiz (4 câu):** (1) duyệt giữa của BST cho ra dãy gì — "dãy tăng dần"; (2) tìm số nhỏ nhất trong BST ở đâu — "đi hết về bên trái"; (3) xóa node có 2 con thì thay bằng ai — "node nhỏ nhất của cây con phải hoặc lớn nhất của cây con trái"; (4) cây 7 node cân bằng có chiều cao bao nhiêu — "3 mức, chiều cao 2 nếu tính từ 0".
- **Bài tập (3):** tính chiều cao cây; đếm số lá; tìm 1 giá trị trong BST và trả về số phép so sánh đã dùng.

- [ ] **Step 1: Tạo `src/data/lessons/cay-nhi-phan-bst.js`**

```js
export default {
  goal: [
    'Vẽ được cây nhị phân từ dữ liệu cha con cho trước.',
    'Viết được cả 3 phép duyệt và nói được kết quả trước khi chạy.',
    'Dựng, chèn và xóa được node trên BST, kể cả trường hợp node có 2 con.',
  ],
  examples: [
    { id: 'vd-ba-phep-duyet', title: 'Ba phép duyệt cây nhị phân', official: true },
    { id: 'vd-bst-chen-xoa', title: 'Dựng, chèn và xóa trên BST', official: true },
  ],
  quiz: [ /* 4 câu theo đặc tả nội dung ở trên */ ],
  practice: [ /* 3 bài theo đặc tả nội dung ở trên */ ],
  leetcode: [
    { no: 94, name: 'Binary Tree Inorder Traversal', slug: 'binary-tree-inorder-traversal', level: 'Easy', note: 'Đúng ví dụ 1, làm cả bản đệ quy và bản ngăn xếp.' },
    { no: 104, name: 'Maximum Depth of Binary Tree', slug: 'maximum-depth-of-binary-tree', level: 'Easy', note: 'Đúng bài tập 1.' },
    { no: 226, name: 'Invert Binary Tree', slug: 'invert-binary-tree', level: 'Easy', note: 'Đệ quy trên cây ở mức dễ nhất.' },
    { no: 100, name: 'Same Tree', slug: 'same-tree', level: 'Easy', note: 'Duyệt song song 2 cây.' },
    { no: 700, name: 'Search in a Binary Search Tree', slug: 'search-in-a-binary-search-tree', level: 'Easy', note: 'Đúng bài tập 3.' },
    { no: 701, name: 'Insert into a Binary Search Tree', slug: 'insert-into-a-binary-search-tree', level: 'Medium', note: 'Phần chèn của ví dụ 2.' },
    { no: 450, name: 'Delete Node in a BST', slug: 'delete-node-in-a-bst', level: 'Medium', note: 'Phần xóa của ví dụ 2, đủ 3 trường hợp.' },
    { no: 102, name: 'Binary Tree Level Order Traversal', slug: 'binary-tree-level-order-traversal', level: 'Medium', note: 'Duyệt theo mức bằng hàng đợi.' },
    { no: 230, name: 'Kth Smallest Element in a BST', slug: 'kth-smallest-element-in-a-bst', level: 'Medium', note: 'Dùng tính chất duyệt giữa cho dãy tăng.' },
    { no: 105, name: 'Construct Binary Tree from Preorder and Inorder Traversal', slug: 'construct-binary-tree-from-preorder-and-inorder-traversal', level: 'Medium', note: 'Dựng lại cây từ 2 thứ tự duyệt.' },
  ],
}
```

- [ ] **Step 2: Đăng ký vào `src/data/lessons/index.js`**

```js
import cayNhiPhanBst from './cay-nhi-phan-bst.js'
// ... thêm vào object lessons:
  'cay-nhi-phan-bst': cayNhiPhanBst,
```

- [ ] **Step 3: Chạy test dữ liệu**

Run: `npm run test -- --run tests/lesson-data.spec.js`
Expected: PASS.

- [ ] **Step 4: Ghi lại id widget đang dùng**

```bash
grep -o "getElementById('[^']*'" src/widgets/cay-nhi-phan-bst.js | sort -u
```

- [ ] **Step 5: Viết lại `src/sections/CayNhiPhanBst.vue`**

```vue
<template>
<section id="cay-nhi-phan-bst" class="day-section" data-sid="cay-nhi-phan-bst" v-show="active">

<h2>Cây Nhị Phân &amp; BST <span class="exam-tag">★ Đề ôn tập</span></h2>

<LessonGoal :sid="'cay-nhi-phan-bst'">
  <ul><li v-for="(g, i) in data.goal" :key="i">{{ g }}</li></ul>
</LessonGoal>

<LessonPart :sid="'cay-nhi-phan-bst'" part="ly-thuyet">
  <!-- sơ đồ gia phả; gốc/lá/chiều cao; 3 phép duyệt; luật của BST và hệ quả duyệt giữa -->
</LessonPart>

<LessonPart :sid="'cay-nhi-phan-bst'" part="vi-sao">
  <!-- duyệt cây là DFS không có chu trình; tìm kiếm O(chiều cao); chỉ mục CSDL, cây thư mục, DOM -->
</LessonPart>

<LessonPart :sid="'cay-nhi-phan-bst'" part="quiz">
  <QuizBlock :questions="data.quiz" />
</LessonPart>

<LessonPart :sid="'cay-nhi-phan-bst'" part="vi-du">
  <WorkedExample id="vd-ba-phep-duyet" title="Ba phép duyệt cây nhị phân" :official="true">
    <template #de-bai><!-- nguyên văn đề --></template>
    <template #y-tuong><!-- vị trí thăm gốc quyết định tên phép duyệt --></template>
    <template #thuat-toan><!-- 3 công thức đệ quy --></template>
    <template #chay-tay><!-- bảng 3 thứ tự trên cùng 1 cây 7 node --></template>
    <template #code><pre v-pre><code><!-- code C++ --></code></pre></template>
    <template #toi-uu><!-- bản khử đệ quy bằng ngăn xếp; duyệt theo mức bằng hàng đợi --></template>
  </WorkedExample>

  <!-- widget cây dán nguyên vào đây, giữ đúng mọi id DOM -->

  <WorkedExample id="vd-bst-chen-xoa" title="Dựng, chèn và xóa trên BST" :official="true">
    <template #de-bai><!-- nguyên văn đề --></template>
    <template #y-tuong><!-- luật trái nhỏ phải lớn dẫn đường cho mọi thao tác --></template>
    <template #thuat-toan><!-- chèn; xóa với 3 trường hợp --></template>
    <template #chay-tay><!-- chạy tay đủ 3 trường hợp xóa --></template>
    <template #code><pre v-pre><code><!-- code C++ --></code></pre></template>
    <template #toi-uu><!-- cây lệch làm chi phí về O(n), dẫn sang bài BST nâng cao --></template>
  </WorkedExample>
</LessonPart>

<LessonPart :sid="'cay-nhi-phan-bst'" part="bai-tap">
  <PracticeSet :items="data.practice" />
</LessonPart>

<LessonPart :sid="'cay-nhi-phan-bst'" part="leetcode">
  <LeetCodeList :items="data.leetcode" />
</LessonPart>

</section>
</template>

<script setup>
import { onMounted } from 'vue'
import LessonGoal from '../components/LessonGoal.vue'
import LessonPart from '../components/LessonPart.vue'
import QuizBlock from '../components/QuizBlock.vue'
import WorkedExample from '../components/WorkedExample.vue'
import PracticeSet from '../components/PracticeSet.vue'
import LeetCodeList from '../components/LeetCodeList.vue'
import data from '../data/lessons/cay-nhi-phan-bst.js'
import { initCayNhiPhanBstWidgets } from '../widgets/cay-nhi-phan-bst.js'

defineProps({ active: Boolean })

onMounted(() => {
  initCayNhiPhanBstWidgets()
})
</script>
```

- [ ] **Step 6: Chạy toàn bộ test và build**

Run: `npm run test -- --run`
Expected: PASS toàn bộ.

Run: `npm run build`
Expected: build sạch.

- [ ] **Step 7: Kiểm tra widget trên trình duyệt**

Run: `npm run dev`, mở nhóm "3 phép duyệt, Cây cha-con, BST", chạy hết các nút của widget.
Expected: không lỗi console.

- [ ] **Step 8: Commit**

```bash
git add src/sections/CayNhiPhanBst.vue src/data/lessons/cay-nhi-phan-bst.js src/data/lessons/index.js
git commit -m "content: rewrite binary tree and BST lesson in 6-part format"
```

---

### Task 16: Nhóm Quy hoạch động nâng cao (Knapsack, LIS, LCS, Xâu đối xứng)

**Files:**
- Create: `src/data/lessons/qhd-lis-lcs-doixung.js`
- Modify: `src/data/lessons/index.js`, `src/sections/QhdLisLcsDoixung.vue`
- Giữ nguyên: `src/widgets/qhd-lis-lcs-doixung.js` và mọi id DOM nó truy cập

**Interfaces:**
- Consumes: các component dùng chung ở Task 2–4
- Produces: `lessons['qhd-lis-lcs-doixung']` với `examples = [{ id: 'vd-knapsack', official: true }, { id: 'vd-lis', official: true }]`; hàm khởi tạo widget `initQhdLisLcsDoixungWidgets`

**Đặc tả nội dung:**

- **Mục tiêu:** đặt được trạng thái và công thức truy hồi cho 4 bài kinh điển; đọc được bảng dp 2 chiều; truy vết ra lời giải chứ không chỉ ra con số.
- **Lý thuyết:** quy trình 4 bước đặt bài QHĐ (trạng thái là gì → lựa chọn ở mỗi bước → công thức truy hồi → điều kiện biên và thứ tự tính); phân biệt "dãy con" (không cần liền nhau) với "đoạn con" (phải liền nhau) — đây là chỗ người mới nhầm nhiều nhất; giải thích bảng dp bằng hình ảnh "điền bảng tính từ trái sang phải, từ trên xuống dưới".
- **Vì sao quan trọng:** nối tiếp trực tiếp QHĐ nền tảng (từ bảng 1 chiều lên bảng 2 chiều); 4 bài này là khung của rất nhiều bài biến thể trong đề và trên LeetCode.
- **Ví dụ 1 (`vd-knapsack`, official):** cái túi 0/1 — đủ 6 khối, chạy tay bảng dp cho 4 món và sức chứa 5, có truy vết chọn món nào; phần tối ưu: rút bảng 2 chiều xuống mảng 1 chiều và vì sao phải duyệt sức chứa từ lớn về nhỏ.
- **Ví dụ 2 (`vd-lis`, official):** dãy con tăng dài nhất — đủ 6 khối, chạy tay O(n²) trên dãy 8 phần tử, có truy vết dãy kết quả; phần tối ưu: bản O(n log n) dùng mảng đuôi nhỏ nhất, giải thích trực giác chứ không chỉ đưa code.
- **Phần bổ sung bắt buộc trong khối lý thuyết:** LCS và Xâu đối xứng dài nhất được trình bày ngắn gọn dưới dạng 2 bảng "trạng thái — công thức truy hồi — kết quả nằm ở ô nào", vì đề có hỏi, kèm code mẫu cho mỗi bài.
- **Quiz (5 câu):** (1) dãy con và đoạn con khác nhau ở đâu — "dãy con không cần liền nhau"; (2) trạng thái của knapsack 0/1 là gì — "dp[i][w] là giá trị tốt nhất khi xét i món đầu với sức chứa w"; (3) vì sao bản 1 chiều của knapsack phải duyệt w giảm dần — "để mỗi món chỉ được lấy 1 lần"; (4) LCS của `abcde` và `ace` dài bao nhiêu — "3"; (5) xâu đối xứng dài nhất trong `babad` là gì — "`bab` hoặc `aba`".
- **Bài tập (3):** đếm số cách chọn ra tổng đúng bằng S (biến thể knapsack đếm); tìm độ dài xâu con chung dài nhất và truy vết ra xâu; đếm số xâu con đối xứng trong 1 xâu.

- [ ] **Step 1: Tạo `src/data/lessons/qhd-lis-lcs-doixung.js`**

```js
export default {
  goal: [
    'Đặt được trạng thái và công thức truy hồi cho Knapsack, LIS, LCS và Xâu đối xứng.',
    'Đọc và điền được bảng dp 2 chiều bằng tay.',
    'Truy vết ngược từ bảng dp để lấy ra lời giải, không chỉ lấy con số.',
  ],
  examples: [
    { id: 'vd-knapsack', title: 'Cái túi 0/1 (Knapsack)', official: true },
    { id: 'vd-lis', title: 'Dãy con tăng dài nhất (LIS)', official: true },
  ],
  quiz: [ /* 5 câu theo đặc tả nội dung ở trên */ ],
  practice: [ /* 3 bài theo đặc tả nội dung ở trên */ ],
  leetcode: [
    { no: 392, name: 'Is Subsequence', slug: 'is-subsequence', level: 'Easy', note: 'Làm rõ khái niệm dãy con trước khi vào LCS.' },
    { no: 1143, name: 'Longest Common Subsequence', slug: 'longest-common-subsequence', level: 'Medium', note: 'Đúng bài tập 2.' },
    { no: 300, name: 'Longest Increasing Subsequence', slug: 'longest-increasing-subsequence', level: 'Medium', note: 'Đúng ví dụ 2, làm cả 2 bản O(n²) và O(n log n).' },
    { no: 416, name: 'Partition Equal Subset Sum', slug: 'partition-equal-subset-sum', level: 'Medium', note: 'Knapsack dạng có hay không.' },
    { no: 494, name: 'Target Sum', slug: 'target-sum', level: 'Medium', note: 'Đúng bài tập 1, knapsack đếm số cách.' },
    { no: 1049, name: 'Last Stone Weight II', slug: 'last-stone-weight-ii', level: 'Medium', note: 'Knapsack ẩn sau một đề bài lạ.' },
    { no: 5, name: 'Longest Palindromic Substring', slug: 'longest-palindromic-substring', level: 'Medium', note: 'Xâu đối xứng dạng đoạn con.' },
    { no: 516, name: 'Longest Palindromic Subsequence', slug: 'longest-palindromic-subsequence', level: 'Medium', note: 'Cùng chủ đề nhưng là dãy con, so sánh với bài trên.' },
    { no: 647, name: 'Palindromic Substrings', slug: 'palindromic-substrings', level: 'Medium', note: 'Đúng bài tập 3.' },
    { no: 72, name: 'Edit Distance', slug: 'edit-distance', level: 'Medium', note: 'Bảng 2 chiều họ hàng gần với LCS.' },
    { no: 354, name: 'Russian Doll Envelopes', slug: 'russian-doll-envelopes', level: 'Hard', note: 'LIS sau khi sắp xếp khéo.' },
  ],
}
```

- [ ] **Step 2: Đăng ký vào `src/data/lessons/index.js`**

```js
import qhdLisLcsDoixung from './qhd-lis-lcs-doixung.js'
// ... thêm vào object lessons:
  'qhd-lis-lcs-doixung': qhdLisLcsDoixung,
```

- [ ] **Step 3: Chạy test dữ liệu**

Run: `npm run test -- --run tests/lesson-data.spec.js`
Expected: PASS.

- [ ] **Step 4: Ghi lại id widget đang dùng**

```bash
grep -o "getElementById('[^']*'" src/widgets/qhd-lis-lcs-doixung.js | sort -u
```

- [ ] **Step 5: Viết lại `src/sections/QhdLisLcsDoixung.vue`**

```vue
<template>
<section id="qhd-lis-lcs-doixung" class="day-section" data-sid="qhd-lis-lcs-doixung" v-show="active">

<h2>QHĐ Nâng Cao — Knapsack, LIS, LCS, Xâu Đối Xứng <span class="exam-tag">★ Đề ôn tập</span></h2>

<LessonGoal :sid="'qhd-lis-lcs-doixung'">
  <ul><li v-for="(g, i) in data.goal" :key="i">{{ g }}</li></ul>
</LessonGoal>

<LessonPart :sid="'qhd-lis-lcs-doixung'" part="ly-thuyet">
  <!-- quy trình 4 bước đặt bài QHĐ; phân biệt dãy con với đoạn con;
       2 bảng tóm tắt LCS và Xâu đối xứng kèm code mẫu -->
</LessonPart>

<LessonPart :sid="'qhd-lis-lcs-doixung'" part="vi-sao">
  <!-- nối tiếp QHĐ nền tảng: từ bảng 1 chiều lên bảng 2 chiều; 4 bài này là khung của nhiều biến thể -->
</LessonPart>

<LessonPart :sid="'qhd-lis-lcs-doixung'" part="quiz">
  <QuizBlock :questions="data.quiz" />
</LessonPart>

<LessonPart :sid="'qhd-lis-lcs-doixung'" part="vi-du">
  <WorkedExample id="vd-knapsack" title="Cái túi 0/1 (Knapsack)" :official="true">
    <template #de-bai><!-- nguyên văn đề --></template>
    <template #y-tuong><!-- mỗi món chỉ có 2 lựa chọn: lấy hoặc không --></template>
    <template #thuat-toan><!-- trạng thái, truy hồi, biên, thứ tự tính --></template>
    <template #chay-tay><!-- bảng dp 4 món, sức chứa 5, kèm truy vết --></template>
    <template #code><pre v-pre><code><!-- code C++ --></code></pre></template>
    <template #toi-uu><!-- rút xuống mảng 1 chiều, duyệt w từ lớn về nhỏ --></template>
  </WorkedExample>

  <!-- widget QHĐ dán nguyên vào đây, giữ đúng mọi id DOM -->

  <WorkedExample id="vd-lis" title="Dãy con tăng dài nhất (LIS)" :official="true">
    <template #de-bai><!-- nguyên văn đề --></template>
    <template #y-tuong><!-- dp[i] là độ dài dãy tăng dài nhất kết thúc tại i --></template>
    <template #thuat-toan><!-- truy hồi và truy vết --></template>
    <template #chay-tay><!-- bảng dp trên dãy 8 phần tử --></template>
    <template #code><pre v-pre><code><!-- code C++ O(n^2) --></code></pre></template>
    <template #toi-uu><!-- bản O(n log n) với mảng đuôi nhỏ nhất, giải thích trực giác --></template>
  </WorkedExample>
</LessonPart>

<LessonPart :sid="'qhd-lis-lcs-doixung'" part="bai-tap">
  <PracticeSet :items="data.practice" />
</LessonPart>

<LessonPart :sid="'qhd-lis-lcs-doixung'" part="leetcode">
  <LeetCodeList :items="data.leetcode" />
</LessonPart>

</section>
</template>

<script setup>
import { onMounted } from 'vue'
import LessonGoal from '../components/LessonGoal.vue'
import LessonPart from '../components/LessonPart.vue'
import QuizBlock from '../components/QuizBlock.vue'
import WorkedExample from '../components/WorkedExample.vue'
import PracticeSet from '../components/PracticeSet.vue'
import LeetCodeList from '../components/LeetCodeList.vue'
import data from '../data/lessons/qhd-lis-lcs-doixung.js'
import { initQhdLisLcsDoixungWidgets } from '../widgets/qhd-lis-lcs-doixung.js'

defineProps({ active: Boolean })

onMounted(() => {
  initQhdLisLcsDoixungWidgets()
})
</script>
```

- [ ] **Step 6: Chạy toàn bộ test và build**

Run: `npm run test -- --run`
Expected: PASS toàn bộ.

Run: `npm run build`
Expected: build sạch.

- [ ] **Step 7: Kiểm tra widget trên trình duyệt**

Run: `npm run dev`, mở nhóm "QHĐ: Knapsack, LIS, LCS, Xâu đối xứng", chạy hết các nút của widget.
Expected: không lỗi console.

- [ ] **Step 8: Commit**

```bash
git add src/sections/QhdLisLcsDoixung.vue src/data/lessons/qhd-lis-lcs-doixung.js src/data/lessons/index.js
git commit -m "content: rewrite advanced DP lesson in 6-part format"
```

---

### Task 17: Nhóm BST nâng cao (Kiểm tra, Cân bằng, LCA)

**Files:**
- Create: `src/data/lessons/bst-nang-cao.js`
- Modify: `src/data/lessons/index.js`, `src/sections/BstNangCao.vue`
- Giữ nguyên: `src/widgets/bst-nang-cao.js` và mọi id DOM nó truy cập

**Interfaces:**
- Consumes: các component dùng chung ở Task 2–4
- Produces: `lessons['bst-nang-cao']` với `examples = [{ id: 'vd-kiem-tra-bst' }, { id: 'vd-lca' }]`; hàm khởi tạo widget `initBstNangCaoWidgets`

**Đặc tả nội dung:**

- **Mục tiêu:** kiểm tra được một cây có phải BST không mà không bị bẫy so sánh cục bộ; hiểu vì sao cần cân bằng; tìm được tổ tiên chung gần nhất.
- **Lý thuyết:** cái bẫy kinh điển — chỉ so sánh node với 2 con là **sai**, phải truyền khoảng giá trị hợp lệ (min, max) xuống; khái niệm cây cân bằng và chiều cao O(log n), giải thích bằng hình ảnh "cây lệch biến thành danh sách liên kết"; LCA là "đi ngược lên gia phả tới người thân chung gần nhất", và trên BST thì tìm được nhanh nhờ so sánh giá trị.
- **Vì sao quan trọng:** nối tiếp trực tiếp bài trước (BST lệch làm mọi thao tác về O(n)); LCA là nền cho các bài về quan hệ cha con trong cây; giải thích vì sao thư viện thật dùng cây tự cân bằng.
- **Ví dụ 1 (`vd-kiem-tra-bst`):** kiểm tra một cây có phải BST — đủ 6 khối, chạy tay 1 cây bị lỗi mà cách so sánh cục bộ không phát hiện được; phần tối ưu: cách kiểm tra bằng duyệt giữa và so sánh với giá trị trước đó.
- **Ví dụ 2 (`vd-lca`):** tìm tổ tiên chung gần nhất — đủ 6 khối, trình bày cả bản cho BST (dùng so sánh giá trị, O(chiều cao)) và bản cho cây nhị phân thường (đệ quy trả về node tìm được); phần tối ưu: khi phải trả lời nhiều truy vấn thì tiền xử lý bằng nhảy tổ tiên.
- **Quiz (4 câu):** (1) vì sao chỉ so sánh node với 2 con là sai — "một node ở sâu bên trái vẫn có thể lớn hơn gốc"; (2) chiều cao BST xấu nhất là bao nhiêu — "n, khi cây lệch thành danh sách"; (3) trên BST, tìm LCA của 2 giá trị bằng cách nào — "đi xuống tới khi 2 giá trị nằm về 2 phía của node hiện tại"; (4) duyệt giữa của cây có đúng là BST khi nào — "khi dãy thu được tăng nghiêm ngặt".
- **Bài tập (3):** kiểm tra cây có cân bằng chiều cao không; chuyển mảng đã sắp xếp thành BST cân bằng; khôi phục BST khi 2 node bị hoán đổi nhầm.

- [ ] **Step 1: Tạo `src/data/lessons/bst-nang-cao.js`**

```js
export default {
  goal: [
    'Kiểm tra đúng một cây có phải BST hay không, không mắc bẫy so sánh cục bộ.',
    'Nói được vì sao BST lệch làm mọi thao tác chậm về O(n).',
    'Tìm được tổ tiên chung gần nhất trên BST và trên cây nhị phân thường.',
  ],
  examples: [
    { id: 'vd-kiem-tra-bst', title: 'Kiểm tra một cây có phải BST', official: false },
    { id: 'vd-lca', title: 'Tổ tiên chung gần nhất (LCA)', official: false },
  ],
  quiz: [ /* 4 câu theo đặc tả nội dung ở trên */ ],
  practice: [ /* 3 bài theo đặc tả nội dung ở trên */ ],
  leetcode: [
    { no: 110, name: 'Balanced Binary Tree', slug: 'balanced-binary-tree', level: 'Easy', note: 'Đúng bài tập 1.' },
    { no: 108, name: 'Convert Sorted Array to Binary Search Tree', slug: 'convert-sorted-array-to-binary-search-tree', level: 'Easy', note: 'Đúng bài tập 2.' },
    { no: 653, name: 'Two Sum IV - Input is a BST', slug: 'two-sum-iv-input-is-a-bst', level: 'Easy', note: 'Tận dụng duyệt giữa cho dãy tăng.' },
    { no: 98, name: 'Validate Binary Search Tree', slug: 'validate-binary-search-tree', level: 'Medium', note: 'Đúng ví dụ 1, chính là cái bẫy so sánh cục bộ.' },
    { no: 235, name: 'Lowest Common Ancestor of a Binary Search Tree', slug: 'lowest-common-ancestor-of-a-binary-search-tree', level: 'Medium', note: 'Bản LCA cho BST của ví dụ 2.' },
    { no: 236, name: 'Lowest Common Ancestor of a Binary Tree', slug: 'lowest-common-ancestor-of-a-binary-tree', level: 'Medium', note: 'Bản LCA cho cây thường của ví dụ 2.' },
    { no: 173, name: 'Binary Search Tree Iterator', slug: 'binary-search-tree-iterator', level: 'Medium', note: 'Duyệt giữa từng bước bằng ngăn xếp.' },
    { no: 538, name: 'Convert BST to Greater Tree', slug: 'convert-bst-to-greater-tree', level: 'Medium', note: 'Duyệt giữa theo chiều ngược.' },
    { no: 1382, name: 'Balance a Binary Search Tree', slug: 'balance-a-binary-search-tree', level: 'Medium', note: 'Cân bằng lại cây lệch.' },
    { no: 99, name: 'Recover Binary Search Tree', slug: 'recover-binary-search-tree', level: 'Medium', note: 'Đúng bài tập 3.' },
    { no: 297, name: 'Serialize and Deserialize Binary Tree', slug: 'serialize-and-deserialize-binary-tree', level: 'Hard', note: 'Tổng hợp mọi kỹ thuật duyệt cây.' },
  ],
}
```

- [ ] **Step 2: Đăng ký vào `src/data/lessons/index.js`**

```js
import bstNangCao from './bst-nang-cao.js'
// ... thêm vào object lessons:
  'bst-nang-cao': bstNangCao,
```

- [ ] **Step 3: Chạy test dữ liệu**

Run: `npm run test -- --run tests/lesson-data.spec.js`
Expected: PASS, và test tiến độ in ra "Còn thiếu dữ liệu: (không còn)".

- [ ] **Step 4: Ghi lại id widget đang dùng**

```bash
grep -o "getElementById('[^']*'" src/widgets/bst-nang-cao.js | sort -u
```

- [ ] **Step 5: Viết lại `src/sections/BstNangCao.vue`**

```vue
<template>
<section id="bst-nang-cao" class="day-section" data-sid="bst-nang-cao" v-show="active">

<h2>BST Nâng Cao — Kiểm Tra, Cân Bằng, LCA</h2>

<LessonGoal :sid="'bst-nang-cao'">
  <ul><li v-for="(g, i) in data.goal" :key="i">{{ g }}</li></ul>
</LessonGoal>

<LessonPart :sid="'bst-nang-cao'" part="ly-thuyet">
  <!-- bẫy so sánh cục bộ và cách truyền khoảng (min, max); cây lệch thành danh sách; LCA là gì -->
</LessonPart>

<LessonPart :sid="'bst-nang-cao'" part="vi-sao">
  <!-- nối tiếp bài BST cơ bản; LCA là nền cho các bài quan hệ cha con; vì sao thư viện dùng cây tự cân bằng -->
</LessonPart>

<LessonPart :sid="'bst-nang-cao'" part="quiz">
  <QuizBlock :questions="data.quiz" />
</LessonPart>

<LessonPart :sid="'bst-nang-cao'" part="vi-du">
  <WorkedExample id="vd-kiem-tra-bst" title="Kiểm tra một cây có phải BST">
    <template #de-bai><!-- đề bài --></template>
    <template #y-tuong><!-- mỗi node phải nằm trong một khoảng giá trị được kế thừa từ tổ tiên --></template>
    <template #thuat-toan><!-- đệ quy truyền (min, max) --></template>
    <template #chay-tay><!-- cây bị lỗi mà so sánh cục bộ không phát hiện được --></template>
    <template #code><pre v-pre><code><!-- code C++ --></code></pre></template>
    <template #toi-uu><!-- kiểm tra bằng duyệt giữa và so với giá trị trước đó --></template>
  </WorkedExample>

  <!-- widget BST nâng cao dán nguyên vào đây, giữ đúng mọi id DOM -->

  <WorkedExample id="vd-lca" title="Tổ tiên chung gần nhất (LCA)">
    <template #de-bai><!-- đề bài --></template>
    <template #y-tuong><!-- đi ngược gia phả tới người thân chung gần nhất --></template>
    <template #thuat-toan><!-- bản cho BST và bản cho cây nhị phân thường --></template>
    <template #chay-tay><!-- chạy tay trên 1 cây ví dụ --></template>
    <template #code><pre v-pre><code><!-- code C++ cả 2 bản --></code></pre></template>
    <template #toi-uu><!-- nhiều truy vấn thì tiền xử lý bằng nhảy tổ tiên --></template>
  </WorkedExample>
</LessonPart>

<LessonPart :sid="'bst-nang-cao'" part="bai-tap">
  <PracticeSet :items="data.practice" />
</LessonPart>

<LessonPart :sid="'bst-nang-cao'" part="leetcode">
  <LeetCodeList :items="data.leetcode" />
</LessonPart>

</section>
</template>

<script setup>
import { onMounted } from 'vue'
import LessonGoal from '../components/LessonGoal.vue'
import LessonPart from '../components/LessonPart.vue'
import QuizBlock from '../components/QuizBlock.vue'
import WorkedExample from '../components/WorkedExample.vue'
import PracticeSet from '../components/PracticeSet.vue'
import LeetCodeList from '../components/LeetCodeList.vue'
import data from '../data/lessons/bst-nang-cao.js'
import { initBstNangCaoWidgets } from '../widgets/bst-nang-cao.js'

defineProps({ active: Boolean })

onMounted(() => {
  initBstNangCaoWidgets()
})
</script>
```

- [ ] **Step 6: Chạy toàn bộ test và build**

Run: `npm run test -- --run`
Expected: PASS toàn bộ — lúc này `tests/lesson-structure.spec.js` chạy đủ cả 10 section.

Run: `npm run build`
Expected: build sạch.

- [ ] **Step 7: Kiểm tra widget trên trình duyệt**

Run: `npm run dev`, mở nhóm "BST nâng cao", chạy hết các nút của widget.
Expected: không lỗi console.

- [ ] **Step 8: Commit**

```bash
git add src/sections/BstNangCao.vue src/data/lessons/bst-nang-cao.js src/data/lessons/index.js
git commit -m "content: rewrite advanced BST lesson in 6-part format"
```

---

## PHASE 3 — Hoàn thiện và duyệt chất lượng

### Task 18: Cập nhật Trang chủ và dọn `menus.json`

> **Cập nhật 2026-08-09:** section `cam-nang` (Cẩm nang giải đề) **đã bị xóa khỏi dự án**
> theo yêu cầu của người dùng — nội dung của nó gắn với một kỳ thi 5 ngày cụ thể, không
> liên quan tới lộ trình dạy học. `menus.json` hiện chỉ còn đúng 1 key `trang-chu`, và
> `CamNang.vue` không còn tồn tại. Bỏ qua mọi bước liên quan tới Cẩm nang bên dưới.

**Files:**
- Modify: `src/sections/TrangChu.vue`, `src/data/menus.json`, `src/App.vue:39-73` (phần header)
- Create: `tests/menus-json.spec.js`

**Interfaces:**
- Consumes: `LESSON_SECTIONS` từ `src/lesson/parts.js`; `buildMenu` từ `src/data/menu.js`
- Produces: `menus.json` chỉ còn 1 key `trang-chu`; Trang chủ mô tả đúng khung 6 phần mới

**Đặc tả nội dung:**

- **Trang chủ:** thay phần giới thiệu cũ bằng: (a) lộ trình học 10 nhóm theo đúng thứ tự Phase 2, mỗi nhóm 1 dòng "bạn sẽ học được gì"; (b) giải thích khung 6 phần để người học biết mỗi bài sẽ diễn ra thế nào; (c) gợi ý cách dùng: đọc lý thuyết → làm quiz → xem ví dụ → làm 3 bài tập → luyện LeetCode.
- **Cẩm nang:** giữ nguyên vai trò "giải nhanh từng bài trong đề", nhưng mỗi mục thêm 1 dòng liên kết tới phần lý thuyết tương ứng trong nhóm kiến thức (dùng id chuẩn, ví dụ `#dfs-bfs--ly-thuyet`).
- **Header trong `App.vue`:** 3 thẻ `.step-card` đổi nội dung thành đúng 3 bước của khung mới: "Hiểu bản chất" → "Tự kiểm tra bằng quiz" → "Luyện tập với bài tập và LeetCode".

- [ ] **Step 1: Viết test thất bại**

Tạo `tests/menus-json.spec.js`:

```js
import { describe, it, expect } from 'vitest'
import menusData from '../src/data/menus.json'
import { LESSON_SECTIONS } from '../src/lesson/parts.js'

describe('menus.json', () => {
  it('không còn giữ menu viết tay cho 10 nhóm kiến thức', () => {
    for (const s of LESSON_SECTIONS) {
      expect(menusData[s.sid]).toBeUndefined()
    }
  })

  it('vẫn giữ key cho trang chủ', () => {
    expect(menusData['trang-chu']).toBeDefined()
  })
})
```

- [ ] **Step 2: Chạy test để chắc chắn nó fail**

Run: `npm run test -- --run tests/menus-json.spec.js`
Expected: FAIL — `menus.json` vẫn còn key của 10 nhóm.

- [ ] **Step 3: Xóa 10 key nhóm kiến thức khỏi `src/data/menus.json`**

Giữ lại đúng 1 key: `"trang-chu"`. (Đã làm xong ngày 2026-08-09 khi xóa Cẩm nang.)

- [ ] **Step 4: Chạy lại test**

Run: `npm run test -- --run tests/menus-json.spec.js`
Expected: PASS, 2 tests.

- [ ] **Step 5: Viết lại nội dung `src/sections/TrangChu.vue` theo đặc tả nội dung ở trên**

Giữ nguyên `id="trang-chu"`, `class="day-section"`, `data-sid="trang-chu"`, `v-show="active"`.
Bảng lộ trình dùng `<table class="formula-table">` với 3 cột: Thứ tự học — Nhóm kiến thức — Sau bài này bạn làm được gì.
Mỗi tên nhóm là 1 link `<a href="#<sid>">` để bấm sang thẳng nhóm đó.

- [x] **Step 6: ~~Thêm liên kết chéo trong `src/sections/CamNang.vue`~~ — BỎ, section đã bị xóa**

- [x] **Step 7: Cập nhật 3 thẻ bước học trong `src/App.vue`** — đã làm ngày 2026-08-09 (kèm sửa tiêu đề phụ và 2 pill của page-header cho hợp web học tập public)

```html
        <div class="learner-steps" aria-label="Lộ trình học gợi ý">
          <div class="step-card">
            <strong>1. Hiểu bản chất</strong>
            <span>Đọc lý thuyết và phần "vì sao quan trọng" trước khi mở code.</span>
          </div>
          <div class="step-card">
            <strong>2. Tự kiểm tra</strong>
            <span>Làm quiz ngay trong bài để biết mình đã hiểu tới đâu.</span>
          </div>
          <div class="step-card">
            <strong>3. Luyện tập</strong>
            <span>Làm 3 bài tập của nhóm, rồi luyện tiếp danh sách LeetCode.</span>
          </div>
        </div>
```

- [ ] **Step 8: Chạy toàn bộ test và build**

Run: `npm run test -- --run`
Expected: PASS toàn bộ.

Run: `npm run build`
Expected: build sạch.

- [ ] **Step 9: Commit**

```bash
git add src/sections/TrangChu.vue src/data/menus.json src/App.vue tests/menus-json.spec.js
git commit -m "content: update home and drop hand-written menus"
```

---

### Task 19: Duyệt theo góc nhìn người mới bắt đầu và chuẩn hóa giọng văn

**Files:**
- Modify: bất kỳ file nào trong `src/sections/` và `src/data/lessons/` cần sửa sau khi rà

**Interfaces:**
- Consumes: toàn bộ nội dung đã viết ở Phase 2
- Produces: một lượt rà soát có bằng chứng, mọi chỗ vi phạm được sửa tại chỗ

- [ ] **Step 1: Lập bảng kiểm cho từng nhóm**

Với **mỗi** section trong 10 nhóm, trả lời 5 câu và ghi vào file tạm `docs/superpowers/plans/review-notes.md`:
1. Phần lý thuyết có mở đầu bằng ví dụ đời thường trước khi có thuật ngữ không?
2. Có thuật ngữ nào xuất hiện mà không được giải thích ngay tại chỗ không? (liệt kê)
3. Ví dụ điển hình có đủ 6 khối và khối "chạy tay" có số liệu cụ thể không?
4. Phần "vì sao quan trọng" có liên hệ tới ít nhất 1 kiến thức đã học trước đó không?
5. Có đoạn nào dài quá 6 câu liên tục mà không có ví dụ, bảng, hay code không?

- [ ] **Step 2: Kiểm tra giọng văn nhất quán bằng máy**

```bash
grep -rn "chúng ta\|ta sẽ\|các bạn" src/sections/ | head -50
```

Chuẩn thống nhất: xưng "bạn" với người học, không dùng "các bạn"/"chúng ta" lẫn lộn. Sửa mọi dòng lệch.

- [ ] **Step 3: Kiểm tra không còn chữ nghiêng viết tay**

```bash
grep -rn "<i>\|font-style: *italic" src/ | grep -v "font-style: normal"
```

Expected: không có kết quả nào.

- [ ] **Step 4: Sửa mọi vi phạm tìm được ở Step 1–3**

Sửa trực tiếp trong file section hoặc file dữ liệu tương ứng.

- [ ] **Step 5: Chạy toàn bộ test và build**

Run: `npm run test -- --run`
Expected: PASS toàn bộ.

Run: `npm run build`
Expected: build sạch.

- [ ] **Step 6: Xóa file ghi chú tạm và commit**

```bash
rm docs/superpowers/plans/review-notes.md
git add -A
git commit -m "content: beginner-perspective review and tone normalization"
```

---

### Task 20: Duyệt kỹ thuật, giao diện mobile và chốt tài liệu

**Files:**
- Modify: `src/style.css` (nếu cần sửa responsive), `README.md`

**Interfaces:**
- Consumes: toàn bộ app sau Task 19
- Produces: app chạy đúng trên màn hình hẹp, README mô tả đúng kiến trúc mới

- [ ] **Step 1: Kiểm tra toàn bộ điều hướng**

Run: `npm run dev`. Với **mỗi** nhóm trong 12 mục ở menu trái: bấm vào nhóm, rồi bấm lần lượt **mọi** mục trong menu phải.
Expected: mỗi lần bấm đều cuộn đúng tới phần tương ứng, URL đổi thành `#<sid>--<phan>`, không lỗi console.

- [ ] **Step 2: Kiểm tra nút Back/Forward của trình duyệt**

Bấm qua 5 mục khác nhau rồi bấm Back 5 lần, Forward 5 lần.
Expected: nội dung hiển thị luôn khớp với URL, không trang trắng.

- [ ] **Step 3: Kiểm tra giao diện ở 3 bề rộng**

Dùng DevTools đặt bề rộng 1440px, 980px, 390px. Với mỗi bề rộng, mở 3 nhóm bất kỳ và kiểm tra:
- bảng LeetCode không tràn ngang (nếu tràn, thêm khối bọc `overflow-x: auto`);
- nút quiz đủ rộng và cao tối thiểu 44px để bấm được trên điện thoại;
- menu phải chuyển lên trên nội dung ở bề rộng ≤ 980px.

- [ ] **Step 4: Sửa CSS nếu Step 3 phát hiện vấn đề**

Nếu bảng LeetCode tràn ngang, thêm vào `src/style.css`:

```css
  .lc-table { display: block; overflow-x: auto; white-space: normal; }
  @media (max-width: 520px) {
    .lc-table td:nth-child(4), .lc-table th:nth-child(4) { display: none; }
  }
```

- [ ] **Step 5: Kiểm tra bản build tĩnh**

Run: `npm run build && npm run preview`
Mở địa chỉ hiện ra, thử lại 3 nhóm bất kỳ và 3 widget bất kỳ.
Expected: giống hệt bản dev, không lỗi console.

- [ ] **Step 6: Cập nhật `README.md`**

Thay mục "Cấu trúc thư mục" và "Cách hoạt động" để mô tả kiến trúc mới:
`src/lesson/parts.js` là nguồn sự thật về khung 6 phần; `src/components/` chứa component dùng chung;
`src/data/lessons/` chứa dữ liệu quiz/bài tập/LeetCode có test kiểm; menu phải được sinh tự động;
thêm mục "Chạy test" với lệnh `npm run test`.

- [ ] **Step 7: Chạy toàn bộ test lần cuối**

Run: `npm run test -- --run`
Expected: PASS toàn bộ, không có test nào bị bỏ qua.

Run: `npm run build`
Expected: build sạch.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: responsive fixes and README update for new lesson architecture"
```

---

## Kiểm tra cuối cùng trước khi coi là xong

- [ ] `npm run test -- --run` xanh toàn bộ, trong đó `tests/lesson-data.spec.js` và `tests/lesson-structure.spec.js` chạy đủ **10** nhóm.
- [ ] `npm run build` sạch.
- [ ] Mỗi nhóm có đủ: mục tiêu, lý thuyết, vì sao quan trọng, quiz 3–5 câu, 1–2 ví dụ đủ 6 khối, đúng 3 bài tập, 8–12 bài LeetCode.
- [ ] Toàn bộ 17 widget tương tác cũ vẫn chạy, console không lỗi.
- [ ] Không còn chữ nghiêng ở bất kỳ đâu.
- [ ] Menu phải của cả 10 nhóm được sinh tự động, khớp đúng với nội dung.

---

## Ghi chú tự rà soát kế hoạch

**Phủ kín spec:** Mục 2 và 4 của spec → khung `LESSON_PARTS` (Task 1) và các component (Task 2–4).
Mục 3 (Feynman) → yêu cầu bắt buộc ghi ở đầu Phase 2 và được kiểm ở Task 19.
Task 1.1/1.2/1.3 của spec → Task 1 + Task 5 (danh sách nội dung và ví dụ kinh điển đã chốt sẵn trong đặc tả nội dung của từng task Phase 2).
Task 2.1–2.10 → Task 8–17 (đủ 10 nhóm).
Task 3.1/3.2/3.3 → được làm ngay trong từng task Phase 2 (dữ liệu quiz/bài tập/LeetCode) thay vì gom thành 1 lượt riêng, để mỗi nhóm hoàn chỉnh là dùng được ngay.
Task 4.1/4.2/4.3 → Task 19 và Task 20.
Mục 6 (thứ tự ưu tiên) → thứ tự Task 8 đến Task 17.

**Điểm cần lưu ý khi thực thi:**
- Tên hàm khởi tạo widget đã được tra sẵn và ghi trong Task 8 — dùng đúng tên đó, đừng đoán.
- Trước khi viết lại bất kỳ section nào, luôn chạy lệnh `grep` ở Step 4 của task để lấy danh sách id DOM mà widget phụ thuộc.
- `tests/lesson-structure.spec.js` cố ý đỏ từ Task 6 tới khi section tương ứng được viết lại — đó là bản đồ công việc còn lại, không phải lỗi cần vá bằng cách sửa test.
