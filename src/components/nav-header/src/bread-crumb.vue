<template>
  <div class="bread-crumb">
    <el-breadcrumb separator="/">
      <template v-for="item of breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path }">{{
          item.name
        }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IBreadCrumb } from "./../type/type";
export default defineComponent({
  props: {
    breadcrumbs: {
      type: Array as PropType<IBreadCrumb[]>,
      default: () => [],
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.bread-crumb {
  padding: 20px;
}
</style>
