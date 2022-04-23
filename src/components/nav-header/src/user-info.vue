<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-icon color="green"><bell-filled /></el-icon>
        {{ userInfo.name }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExitClick">退出登录</el-dropdown-item>
          <el-dropdown-item>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { ArrowDown, BellFilled } from "@element-plus/icons-vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
import localCache from "@/utils/cache";
export default defineComponent({
  components: {
    ArrowDown,
    BellFilled,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const userInfo = computed(() => store.state.login.userInfo);
    const handleExitClick = () => {
      const token = localCache.getCache("token");
      if (token) {
        localCache.deleteCache("token");
        router.push("/main");
      }
    };
    return {
      userInfo,
      handleExitClick,
    };
  },
});
</script>

<style lang="less" scoped>
.user-info {
  .example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
    vertical-align: middle;
  }
}
</style>
