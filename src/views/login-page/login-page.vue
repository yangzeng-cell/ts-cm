<template>
  <div class="login">
    <login-panel></login-panel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import loginPanel from "./components/login-panel.vue";
export default defineComponent({
  components: {
    loginPanel,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: url("@/assets/image/img/login-bg.svg");
}
</style>
