// Gom dữ liệu các nhóm kiến thức đã viết. Mỗi lần thêm 1 nhóm mới, thêm đúng 2
// dòng ở đây, và bật cờ ready trong CHAPTERS ở src/lesson/parts.js.
import doPhucTap from './do-phuc-tap.js'
import mangChuoi from './mang-chuoi.js'
import deQuy from './de-quy.js'
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

export const lessons = {
  'do-phuc-tap': doPhucTap,
  'mang-chuoi': mangChuoi,
  'de-quy': deQuy,
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
