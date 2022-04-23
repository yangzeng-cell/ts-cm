<template>
  <div class="login-account">
    <el-form
      ref="accountRef"
      :model="accountform"
      :rules="rules"
      label-width="60px"
      size="large"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="accountform.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="accountform.password"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import type { ElForm } from "element-plus";
import { rules } from "./../config/account-config";
import localCache from "./../../../utils/cache";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const store = useStore();
    const accountRef = ref<InstanceType<typeof ElForm>>();
    const accountform = reactive({
      name: localCache.getCache("name") ?? "",
      password: localCache.getCache("password") ?? "",
    });
    const loginAction = function (isKeepPassword: boolean) {
      accountRef.value?.validate((valid) => {
        if (valid) {
          if (isKeepPassword) {
            localCache.setCache("name", accountform.name);
            localCache.setCache("password", accountform.password);
          } else {
            localCache.deleteCache("name");
            localCache.deleteCache("password");
          }
          console.log("login/accountLoginAction");
          store.dispatch("login/accountLoginAction", { ...accountform });
        }
      });
    };
    return {
      accountRef,
      accountform,
      rules,
      loginAction,
    };
  },
});
</script>

<style lang="less" scoped></style>
