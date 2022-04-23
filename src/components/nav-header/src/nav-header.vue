<template>
  <div class="nav-header">
    <div class="left-header">
      <div>
        <el-icon :size="30" @click="handleCallops">
          <template v-if="showCollapse"><fold /></template>
          <template v-else><expand /></template>
        </el-icon>
      </div>
      <bread-crumb :breadcrumbs="breadcrumbs"></bread-crumb>
    </div>
    <div><user-info></user-info></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { pathMapBreadcrumbs } from "@/utils/map-menus";
import { Fold, Expand } from "@element-plus/icons-vue";
import UserInfo from "./user-info.vue";
import { useStore } from "@/store";
import { useRoute } from "vue-router";
import BreadCrumb from "./bread-crumb.vue";
export default defineComponent({
  components: {
    Fold,
    Expand,
    UserInfo,
    BreadCrumb,
  },
  emits: ["showCollapse"],
  setup(props, { emit }) {
    const showCollapse = ref(false);
    const handleCallops = () => {
      showCollapse.value = !showCollapse.value;
      emit("showCollapse", showCollapse.value);
    };
    const store = useStore();
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenu;
      const route = useRoute();
      const currentPath = route.path;
      console.log(
        pathMapBreadcrumbs(userMenus, currentPath),
        "pathMapBreadcrumbs(userMenus, currentPath)",
      );
      return pathMapBreadcrumbs(userMenus, currentPath);
    });
    return { handleCallops, showCollapse, breadcrumbs };
  },
});
</script>

<style lang="less" scoped>
.nav-header {
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left-header {
    display: flex;
    align-items: center;
  }
}
</style>
