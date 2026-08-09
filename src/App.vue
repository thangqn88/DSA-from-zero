<template>
  <div class="layout">
    <nav class="sidebar" aria-label="Điều hướng chủ đề học">
      <a class="sb-top sb-start" href="#" @click.prevent="goToId('quay-lui-xau-nhi-phan')"
        >▶ Bắt đầu học</a
      >
      <a
        v-for="item in navTop"
        :key="item.id"
        class="sb-top"
        href="#"
        :class="{ active: activeSection === item.id }"
        :aria-current="activeSection === item.id ? 'page' : undefined"
        @click.prevent="goToId(item.id)"
        >{{ item.label }}</a
      >

      <template v-for="group in navGroups" :key="group.label">
        <div class="sb-group">{{ group.label }}</div>
        <a
          v-for="item in group.items"
          :key="item.id"
          href="#"
          :class="[
            item.exam ? 'sb-exam' : '',
            { active: activeSection === item.id },
          ]"
          :aria-current="activeSection === item.id ? 'page' : undefined"
          @click.prevent="goToId(item.id)"
          >{{ item.label }}</a
        >
      </template>
    </nav>

    <div class="page">
      <div class="page-header">
        <div class="page-header-top">
          <div>
            <h1 id="top">Học DSA từ con số 0</h1>
            <p class="subtitle">
              Cấu trúc dữ liệu và giải thuật cho người mới bắt đầu: mỗi khái
              niệm mở đầu bằng một ví dụ đời thường, có widget chạy tay từng
              bước, code mẫu C++ và bài tập để tự luyện.
            </p>
          </div>
          <div class="header-badges">
            <span class="header-pill">10 nhóm kiến thức</span>
            <span class="header-pill secondary">Miễn phí, tiếng Việt</span>
          </div>
        </div>

        <div class="learner-steps" aria-label="Lộ trình học gợi ý">
          <div class="step-card">
            <strong>1. Hiểu bản chất</strong>
            <span
              >Đọc lý thuyết và phần "vì sao quan trọng" trước khi mở code.</span
            >
          </div>
          <div class="step-card">
            <strong>2. Tự kiểm tra</strong>
            <span
              >Làm quiz ngay trong bài để biết mình đã hiểu tới đâu.</span
            >
          </div>
          <div class="step-card">
            <strong>3. Luyện tập</strong>
            <span
              >Làm 3 bài tập của nhóm, rồi luyện tiếp danh sách LeetCode.</span
            >
          </div>
        </div>
      </div>

      <div class="content-row">
        <div class="content-main" ref="contentMainEl">
          <TrangChu :active="activeSection === 'trang-chu'" />
          <QuayLuiXauNhiPhan
            :active="activeSection === 'quay-lui-xau-nhi-phan'"
          />
          <ToHop :active="activeSection === 'to-hop'" />
          <ThamLam :active="activeSection === 'tham-lam'" />
          <QhdNenTang :active="activeSection === 'qhd-nen-tang'" />
          <QhdLisLcsDoixung :active="activeSection === 'qhd-lis-lcs-doixung'" />
          <NganXepHangDoi :active="activeSection === 'ngan-xep-hang-doi'" />
          <DfsBfs :active="activeSection === 'dfs-bfs'" />
          <Dsu :active="activeSection === 'dsu'" />
          <CayNhiPhanBst :active="activeSection === 'cay-nhi-phan-bst'" />
          <BstNangCao :active="activeSection === 'bst-nang-cao'" />
        </div>

        <aside class="exercise-menu" v-if="currentMenu.length">
          <div class="em-label">Bài tập &amp; mục trong nhóm này</div>
          <a
            v-for="it in currentMenu"
            :key="it.id"
            href="#"
            class="em-link"
            :class="{ 'em-official': it.official, 'em-level4': it.level === 4 }"
            @click.prevent="goToId(it.id)"
            >{{ it.official ? "★ " : "" }}{{ it.label }}</a
          >
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import { navTop, navGroups, allSectionIds, DEFAULT_ID } from "./data/nav.js";
import { buildMenu } from "./data/menu.js";

import TrangChu from "./sections/TrangChu.vue";
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

const currentMenu = computed(() => buildMenu(activeSection.value));

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
  document.addEventListener("click", onDocumentClick, true);
  window.addEventListener("popstate", onPopState);

  const hashId = (location.hash || "").replace("#", "");
  const initialId =
    hashId && document.getElementById(hashId) ? hashId : DEFAULT_ID;
  goToId(initialId, { smooth: false, updateUrl: false });
});
</script>
