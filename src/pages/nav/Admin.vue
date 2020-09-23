<template>
  <div class="container">
    <div>管理员信息</div>
    <div><span>用户 ID:</span><span>{{ user.id }}</span></div>
    <div><span>账号:</span><span>{{ user.account }}</span></div>
    <div><span>用户组:</span><span>{{ user.group }}</span></div>
    <div><span>创建时间:</span><span>{{ user.time }}</span></div>
    <div><span>管理员头像:</span><span>{{ user.head }}</span></div>  
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        id: 12,
        account: 1234,
        group: "超级管理员",
        time: "2020-02-12",
        head: "abc",
      }
    };
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.container {
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
  div{
    line-height: 50px;
    margin-left: 10px;
    border-bottom: 1px solid #EBEEF5;
    color: #606266;
  }
  div:last-child{
    border: 0;
  }
}
</style>