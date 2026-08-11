// Gom dữ liệu các nhóm kiến thức đã viết. Mỗi lần thêm 1 nhóm mới, thêm đúng 2
// dòng ở đây, và bật cờ ready trong CHAPTERS ở src/lesson/parts.js.
import doPhucTap from './do-phuc-tap.js'
import mangChuoi from './mang-chuoi.js'
import deQuy from './de-quy.js'
import danhSachLienKet from './danh-sach-lien-ket.js'
import bangBam from './bang-bam.js'
import quayLuiXauNhiPhan from './quay-lui-xau-nhi-phan.js'
import toHop from './to-hop.js'
import thamLam from './tham-lam.js'
import qhdNenTang from './qhd-nen-tang.js'
import qhdLisLcsDoixung from './qhd-lis-lcs-doixung.js'
import nganXepHangDoi from './ngan-xep-hang-doi.js'
import dfsBfs from './dfs-bfs.js'
import dsu from './dsu.js'
import cayNhiPhanBst from './cay-nhi-phan-bst.js'
import bstNangCao from './bst-nang-cao.js'
import { mdLessons } from '../../lesson/mdLessons.js'

const coCauTruc = {
  'do-phuc-tap': doPhucTap,
  'mang-chuoi': mangChuoi,
  'de-quy': deQuy,
  'danh-sach-lien-ket': danhSachLienKet,
  'bang-bam': bangBam,
  'quay-lui-xau-nhi-phan': quayLuiXauNhiPhan,
  'to-hop': toHop,
  'tham-lam': thamLam,
  'qhd-nen-tang': qhdNenTang,
  'qhd-lis-lcs-doixung': qhdLisLcsDoixung,
  'ngan-xep-hang-doi': nganXepHangDoi,
  'dfs-bfs': dfsBfs,
  'dsu': dsu,
  'cay-nhi-phan-bst': cayNhiPhanBst,
  'bst-nang-cao': bstNangCao,
}

// Bài viết bằng Markdown khai báo ví dụ điển hình ngay tại chỗ, bằng chỉ thị
// @vidu trong file .md. Danh sách examples được rút ra từ đó chứ KHÔNG chép lại
// vào file dữ liệu — chép lại là có hai nơi cùng nói về một danh sách, và menu
// phải sẽ lệch với nội dung thật ngay lần đầu ai đó sửa một chỗ mà quên chỗ kia.
export const lessons = { ...coCauTruc }
for (const [sid, md] of Object.entries(mdLessons)) {
  lessons[sid] = {
    ...lessons[sid],
    examples: md.examples.map(({ id, title, official }) => ({ id, title, official })),
  }
}
