<template>
  <div class="container">
    <div class="content" v-show="content">
      <h3>系统登录</h3>
      <el-input placeholder="请输入用户名" v-model="name" clearable></el-input>
      <el-input
        placeholder="请输入密码"
        v-model="pwd"
        type="password"
        show-password
      ></el-input>
      <p v-show="isError">用户名或者密码错误</p>

      <el-button class="loginBtn" type="primary" @click="loginClick"
        >登录</el-button
      >
    </div>
    <p class="info">Copyright © 2004 - 2020 小米粥餐饮连锁 版权所有</p>
    <!-- 验证滑动 -->
    <slide-verify
      class="slideBox"
      v-show="isSlide"
      :l="42"
      :r="10"
      :w="310"
      :h="155"
      slider-text="向右滑动"
      @success="onSuccess"
      @fail="onFail"
    ></slide-verify>
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
      isSlide: false, //验证滑块显示状态
      content: true, //登录框显示状态
    };
  },
  methods: {
    loginClick() {
      this.isSlide = true; // 显示验证滑块
      this.content = false;// 隐藏登录框
    },
    // 验证成功
    onSuccess() {
      this.isSlide = false; // 隐藏验证滑块
      this.content = true; // 显示登录
      this.send()
    },
    // 验证失败
    onFail() {},
    // 发送请求
    send() {
      login_api({ account: this.name, password: this.pwd }).then((res) => {
        if (res.data.code == 0) {
          localStorage.token = res.data.token; // 保存token
          localStorage.name = this.name;
          localStorage.id = res.data.id; // 当前id
          localStorage.role = res.data.role; // 当前用户角色
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
  .slideBox {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>