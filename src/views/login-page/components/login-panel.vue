<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs class="tabs" stretch type="border-card" v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span>
            <el-icon><avatar /></el-icon>
            账号登陆
          </span>
        </template>
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span>
            <el-icon><phone-filled /></el-icon>
            手机登录
          </span>
        </template>
        <login-phone></login-phone>
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox
        v-model="isKeepPassword"
        label="记住密码"
        size="large"
      ></el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <div>
      <el-button
        type="primary"
        size="large"
        class="login-btn"
        @click="handleLoginClick"
        >立即登录</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Avatar, PhoneFilled } from "@element-plus/icons-vue";
import loginAccount from "./login-account.vue";
import loginPhone from "./login-phone.vue";
export default defineComponent({
  components: {
    Avatar,
    PhoneFilled,
    loginAccount,
    loginPhone,
  },
  setup() {
    const accountRef = ref<InstanceType<typeof loginAccount>>();
    const currentTab = ref("account");
    const isKeepPassword = ref(true);
    const handleLoginClick = function () {
      if (currentTab.value === "account") {
        console.log(accountRef.value);
        accountRef.value?.loginAction(isKeepPassword.value);
      }
    };
    return {
      currentTab,
      isKeepPassword,
      handleLoginClick,
      accountRef,
    };
  },
});
</script>

<style lang="less" scoped>
.login-panel {
  width: 320px;
  .title {
    text-align: center;
  }
  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
  .account-control {
    display: flex;
    justify-content: space-between;
  }
}
</style>
