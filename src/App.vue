<template>
  <div class="layout">
    <nav class="sidebar" aria-label="Điều hướng chủ đề học">
      <!-- Khối thương hiệu, đồng thời là đường về trang chủ. Nằm NGOÀI .sb-list
           nên ở màn hẹp nó vẫn hiện khi danh sách nhóm đã gấp lại — trang chủ
           luôn với tới được mà không cần một mục menu riêng. -->
      <a
        class="sb-brand"
        href="#"
        :class="{ active: activeSection === DEFAULT_ID }"
        :aria-current="activeSection === DEFAULT_ID ? 'page' : undefined"
        @click.prevent="goToId(DEFAULT_ID)"
      >
        <svg class="sb-brand-mark" viewBox="0 0 24 24" aria-hidden="true">
          <line x1="12" y1="7" x2="6" y2="17" />
          <line x1="12" y1="7" x2="18" y2="17" />
          <circle cx="12" cy="5" r="2.6" />
          <circle cx="6" cy="19" r="2.6" />
          <circle cx="18" cy="19" r="2.6" />
        </svg>
        <span class="sb-brand-text">
          <span class="sb-brand-name">DSA from Zero</span>
          <span class="sb-brand-tag">Cấu trúc dữ liệu &amp; Giải thuật</span>
        </span>
      </a>

      <!-- Nút này chỉ hiện ở màn hẹp: gấp danh sách nhóm lại để nội dung bài học
           bắt đầu ngay đầu màn hình thay vì sau một bức tường menu. -->
      <button
        class="sb-toggle"
        type="button"
        :aria-expanded="navOpen ? 'true' : 'false'"
        aria-controls="sb-list"
        @click="navOpen = !navOpen"
      >
        <svg class="sb-toggle-icon" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M3 5h14M3 10h14M3 15h14" />
        </svg>
        <span class="sb-toggle-text">{{ activeLabel }}</span>
        <span class="sb-toggle-hint">{{ navOpen ? "Đóng" : "Đổi nhóm" }}</span>
      </button>

      <div class="sb-list" id="sb-list" :class="{ open: navOpen }">
        <template v-for="group in navGroups" :key="group.label">
          <div class="sb-group">{{ group.label }}</div>
          <template v-for="item in group.items" :key="item.id">
            <a
              v-if="item.ready"
              href="#"
              :class="{ active: activeSection === item.id }"
              :aria-current="activeSection === item.id ? 'page' : undefined"
              @click.prevent="goToId(item.id)"
              >{{ item.label }}</a
            >
            <!-- Bài chưa viết vẫn hiện để người học thấy lộ trình, nhưng không
                 phải là link — bấm vào sẽ không đi đâu cả. -->
            <span v-else class="sb-soon"
              >{{ item.label }}<span class="sb-soon-tag">sắp có</span></span
            >
          </template>
        </template>
      </div>
    </nav>

    <div class="page">
      <!-- Trang không còn khối tiêu đề nhìn thấy được, nhưng vẫn cần đúng 1 thẻ
           h1 để trình đọc màn hình biết trang này là gì. -->
      <h1 class="sr-only">Học Cấu trúc dữ liệu và Giải thuật từ con số 0</h1>

      <div class="content-row">
        <div class="content-main" ref="contentMainEl">
          <TrangChu :active="activeSection === 'trang-chu'" />
          <DoPhucTap :active="activeSection === 'do-phuc-tap'" />
          <MangChuoi :active="activeSection === 'mang-chuoi'" />
          <DeQuy :active="activeSection === 'de-quy'" />
          <QuayLuiXauNhiPhan
            :active="activeSection === 'quay-lui-xau-nhi-phan'"
          />
          <ToHop :active="activeSection === 'to-hop'" />
          <ThamLam :active="activeSection === 'tham-lam'" />
          <QhdNenTang :active="activeSection === 'qhd-nen-tang'" />
          <QhdLisLcsDoixung :active="activeSection === 'qhd-lis-lcs-doixung'" />
          <NganXepHangDoi :active="activeSection === 'ngan-xep-hang-doi'" />
          <BangBam :active="activeSection === 'bang-bam'" />
          <DfsBfs :active="activeSection === 'dfs-bfs'" />
          <Dsu :active="activeSection === 'dsu'" />
          <CayNhiPhanBst :active="activeSection === 'cay-nhi-phan-bst'" />
          <BstNangCao :active="activeSection === 'bst-nang-cao'" />
        </div>

        <aside class="exercise-menu" v-if="currentMenu.length">
          <!-- Ở màn rộng đây là nhãn tĩnh; ở màn hẹp nó thành nút gấp/mở, vì khi
               menu nằm trên nội dung thì để mở sẵn sẽ đẩy bài học xuống quá xa. -->
          <component
            :is="compactMenu ? 'button' : 'div'"
            class="em-label"
            :type="compactMenu ? 'button' : undefined"
            :aria-expanded="compactMenu ? String(menuOpen) : undefined"
            :aria-controls="compactMenu ? 'em-list' : undefined"
            @click="compactMenu && (menuOpen = !menuOpen)"
          >
            <span>Bài tập &amp; mục trong nhóm này</span>
            <svg
              v-if="compactMenu"
              class="em-chevron"
              :class="{ up: menuOpen }"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M5 8l5 5 5-5" />
            </svg>
          </component>
          <div class="em-list" id="em-list" :class="{ open: menuOpen }">
            <a
              v-for="it in currentMenu"
              :key="it.id"
              href="#"
              class="em-link"
              :class="{
                'em-official': it.official,
                'em-level4': it.level === 4,
              }"
              @click.prevent="goToId(it.id)"
              >{{ it.official ? "★ " : "" }}{{ it.label }}</a
            >
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import {
  navTop,
  navGroups,
  allSectionIds,
  DEFAULT_ID,
} from "./lesson/parts.js";
import { buildMenu } from "./data/menu.js";

import TrangChu from "./sections/TrangChu.vue";
import DoPhucTap from "./sections/DoPhucTap.vue";
import MangChuoi from "./sections/MangChuoi.vue";
import DeQuy from "./sections/DeQuy.vue";
import BangBam from "./sections/BangBam.vue";
import QuayLuiXauNhiPhan from "./sections/QuayLuiXauNhiPhan.vue";
import ToHop from "./sections/ToHop.vue";
import ThamLam from "./sections/ThamLam.vue";
import QhdNenTang from "./sections/QhdNenTang.vue";
import QhdLisLcsDoixung from "./sections/QhdLisLcsDoixung.vue";
import NganXepHangDoi from "./sections/NganXepHangDoi.vue";
import DfsBfs from "./sections/DfsBfs.vue";
import Dsu from "./sections/Dsu.vue";
import CayNhiPhanBst from "./sections/CayNhiPhanBst.vue";
import BstNangCao from "./sections/BstNangCao.vue";

const activeSection = ref(DEFAULT_ID);
const contentMainEl = ref(null);

// Hai menu này chỉ gấp lại ở màn hẹp. Ở màn rộng CSS luôn hiện danh sách,
// nên giá trị ở đây không ảnh hưởng gì tới bố cục desktop.
const navOpen = ref(false);
const menuOpen = ref(false);

// Hai mốc responsive duy nhất của dự án, khai báo đúng bằng số với style.css.
// Cần biết ở JS chứ không chỉ ở CSS, vì nhãn menu bài tập chỉ được là <button>
// khi nó thật sự gấp/mở được — nếu không, aria-expanded sẽ nói dối.
const compactMenu = ref(false);

function watchBreakpoint(query, target) {
  if (typeof window === "undefined" || !window.matchMedia) return;
  const mq = window.matchMedia(query);
  target.value = mq.matches;
  const onChange = (e) => {
    target.value = e.matches;
  };
  if (mq.addEventListener) mq.addEventListener("change", onChange);
  else mq.addListener(onChange);
}

const currentMenu = computed(() => buildMenu(activeSection.value));

const allNavItems = computed(() => {
  const out = [...navTop];
  for (const g of navGroups) out.push(...g.items);
  return out;
});

// Nhãn trên nút gấp/mở phải cho biết đang đứng ở nhóm nào, nếu không người
// dùng mở menu ra chỉ để kiểm tra xem mình đang ở đâu.
const activeLabel = computed(() => {
  const item = allNavItems.value.find((i) => i.id === activeSection.value);
  return item ? item.label : "Nhóm kiến thức";
});

function closestSectionId(el) {
  const sectionEl = el.closest ? el.closest(".day-section") : null;
  return sectionEl ? sectionEl.getAttribute("data-sid") : null;
}

// Điều hướng tới 1 id bất kỳ: có thể là id của cả 1 nhóm (section), hoặc
// id của 1 mục con bên trong 1 section (ví dụ 1 bài tập cụ thể).
function goToId(id, opts) {
  opts = opts || {};
  const updateUrl = opts.updateUrl !== false;
  const smooth = opts.smooth !== false;

  let sectionId = id;
  if (!allSectionIds.includes(id)) {
    // id là 1 mục con — cần tìm section cha chứa nó
    const target = document.getElementById(id);
    sectionId = target ? closestSectionId(target) : null;
    if (!sectionId) sectionId = DEFAULT_ID;
  }
  activeSection.value = sectionId;

  // Đã chọn xong thì gấp menu lại, nhường màn hình cho nội dung.
  navOpen.value = false;
  menuOpen.value = false;

  if (updateUrl) {
    try {
      history.pushState({ navId: id }, "", "#" + id);
    } catch (e) {
      /* bỏ qua nếu bị chặn */
    }
  }

  nextTick(() => {
    requestAnimationFrame(() => {
      const target = document.getElementById(id);
      if (target && id !== sectionId) {
        target.scrollIntoView({
          behavior: smooth ? "smooth" : "auto",
          block: "start",
        });
      } else {
        window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
      }
    });
  });
}

// Chặn hành vi điều hướng mặc định của MỌI liên kết nội bộ "#id" trong toàn trang
// (các link nằm trong nội dung section, ví dụ link chéo giữa các nhóm kiến thức)
function onDocumentClick(e) {
  const a =
    e.target && e.target.closest ? e.target.closest('a[href^="#"]') : null;
  if (!a) return;
  const href = a.getAttribute("href");
  if (!href || href === "#") return;
  const id = href.slice(1);
  if (!document.getElementById(id) && !allSectionIds.includes(id)) return;
  e.preventDefault();
  goToId(id, { smooth: true, updateUrl: true });
}

function onPopState(e) {
  const id =
    (e.state && e.state.navId) ||
    (location.hash || "").replace("#", "") ||
    DEFAULT_ID;
  goToId(id, { smooth: false, updateUrl: false });
}

onMounted(() => {
  watchBreakpoint("(max-width: 1023px)", compactMenu);

  document.addEventListener("click", onDocumentClick, true);
  window.addEventListener("popstate", onPopState);

  const hashId = (location.hash || "").replace("#", "");
  const initialId =
    hashId && document.getElementById(hashId) ? hashId : DEFAULT_ID;
  goToId(initialId, { smooth: false, updateUrl: false });
});
</script>
