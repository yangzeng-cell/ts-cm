<template>
  <div class="login-phone">
    <el-form ref="phoneRef" :model="phoneform" label-width="60px" size="large">
      <el-form-item label="手机号">
        <el-input v-model="phoneform.phone"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <div class="get-code">
          <el-input type="password" v-model="phoneform.messege"></el-input>
          <el-button style="margin-left: 8px" type="primary"
            >获取验证码</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import type { ElForm } from "element-plus";
export default defineComponent({
  setup() {
    const phoneRef = ref<InstanceType<typeof ElForm>>();
    const phoneform = reactive({
      phone: "",
      messege: "",
    });
    return {
      phoneRef,
      phoneform,
    };
  },
});
</script>

<style lang="less" scoped>
.login-phone {
  .get-code {
    display: flex;
  }
}
</style>
