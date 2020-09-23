<template>
  <div class="container">
    <div class="content">
      <h3>系统登录</h3>
      <el-input placeholder="请输入用户名" v-model="name" clearable></el-input>
      <el-input placeholder="请输入密码" v-model="pwd" type="password" show-password></el-input>
      <p v-show="isError">用户名或者密码错误</p>
      <el-button class="loginBtn" type="primary" @click="loginClick">登录</el-button>
    </div>
    <p class="info">Copyright © 2004 - 2020 小米粥餐饮连锁 版权所有</p>
  </div>
</template>

<script>
import { login_api } from "../apis/apis";
export default {
  data() {
    return {
      name: "",
      pwd: "",
      isError: false,
    };
  },
  methods: {
    loginClick() {
      login_api({ account: this.name, password: this.pwd }).then((res) => {
        if (res.data.code == 0) {
          sessionStorage.setItem('id',res.data.id)
          sessionStorage.setItem('name',this.name)
          
          this.$router.push("/nav/main");
          this.$message({
            message: "小米粥提示:登录成功",
            type: "success",
          });
        } else {
          this.isError = true;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  background-color: #2d3a4b;
  // background: url('../assets/images/bg.jpg') no-repeat;
  // background-size: 100%;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  .content {
    width: 300px;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h3 {
      margin-bottom: 20px;
    }
    .el-input {
      margin-bottom: 10px;
    }
    .loginBtn {
      width: 100%;
    }
    p {
      color: red;
      margin-bottom: 10px;
    }
  }
  .info {
    position: fixed;
    bottom: 10px;
  }
}
</style>