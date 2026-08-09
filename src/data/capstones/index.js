import nenMong from './nen-mong.js'

// Khoá đúng bằng CHAPTERS[].key. Chương chưa có MVP thì vắng mặt ở đây và cờ
// capstoneReady của nó phải là false — tests/capstone.spec.js ép đúng luật này.
//
// MVP thuộc về cả chương chứ không thuộc về một bài, nên nó nằm ở đây thay vì
// trong dữ liệu bài cuối chương. Nhờ vậy MVP viết được trước khi bài cuối
// chương có nội dung.
export const capstones = {
  'nen-mong': nenMong,
}

export function capstoneCuaChuong(chapterKey) {
  return capstones[chapterKey] || null
}
