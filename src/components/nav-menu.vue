<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/image/img/logo.svg" alt="logo" />
      <span class="title" v-show="!isCollapse">vue+ts</span>
    </div>
    <el-menu
      :default-active="defaultValue"
      background-color="#001529"
      class="el-menu-vertical"
      text-color="rgb(183, 189, 195)"
      active-text-color="rgb(183, 189, 195)"
      :collapse="isCollapse"
    >
      <template v-for="item of userMenu" :key="item.id">
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon><document /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subItem of item.children" :key="subItem.id">
              <el-menu-item
                :index="subItem.id + ''"
                @click="handleMenuItemClick(subItem)"
              >
                <span>{{ subItem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else-if="item.type === 2">
          <el-menu-item
            :index="item.id + ''"
            @click="handleMenuItemClick(item)"
          >
            <el-icon><document /></el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
import { Document } from "@element-plus/icons-vue";
import { useRouter, useRoute } from "vue-router";
import { pathMapToMenu } from "@/utils/map-menus";
export default defineComponent({
  components: {
    Document,
  },
  props: {
    isCollapse: Boolean,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const userMenu = computed(() => store.state.login.userMenu);
    const currentPath = route.path;
    const menu = pathMapToMenu(userMenu.value, currentPath);
    const defaultValue = ref(menu.id + "");
    const handleMenuItemClick = (menu: any) => {
      router.push({
        path: menu.url ?? "/not-found",
      });
    };
    return {
      userMenu,
      handleMenuItemClick,
      defaultValue,
    };
  },
});
</script>

<style lang="less" scoped>
.nav-menu {
  background: #001529;
  height: 100%;
  .logo {
    display: flex;
    padding: 12px 10px 8px 10px;
    align-items: center;
    flex-direction: row;
    justify-content: flex-start;
    .img {
      margin: 0 10px;
      height: 28px;
      width: 28px;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
  .el-sub-menu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-sub-menu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
