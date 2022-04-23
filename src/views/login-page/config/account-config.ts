export const rules = {
  name: [
    {
      required: true,
      message: "请输入账号",
      trigger: "blur",
    },
    {
      pattern: /^[a-zA-Z0-9]{5,10}$/,
      message: "用户名必须是5-10个数字或者字母",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
    {
      pattern: /^[a-zA-Z0-9]{3,}$/,
      message: "密码必须是3个以上数字或者字母",
      trigger: "blur",
    },
  ],
};
