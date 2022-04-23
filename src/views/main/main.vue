<template>
  <div class="main">
    <el-container class="main-container">
      <el-aside
        style="transition: width 0.5s ease-out"
        :width="isCollapse ? '64px' : '200px'"
      >
        <nav-menu :isCollapse="isCollapse"></nav-menu>
      </el-aside>
      <el-container class="page">
        <el-header class="header">
          <nav-header @showCollapse="showCollapse"></nav-header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import NavMenu from "../../components/nav-menu.vue";
import NavHeader from "../../components/nav-header";
export default defineComponent({
  components: {
    NavMenu,
    NavHeader,
  },
  setup() {
    const isCollapse = ref(false);
    const showCollapse = (data: boolean) => {
      isCollapse.value = data;
    };
    return {
      isCollapse,
      showCollapse,
    };
  },
});
</script>

<style lang="less" scoped>
.main {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  .main-container,
  .page {
    height: 100%;
    box-sizing: border-box;
    background: #f0f2f5;
    .header {
      height: 48px;
      background: white;
    }
  }

  /deep/.el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  /deep/.el-menu {
    border-right: 0;
  }
}
</style>
