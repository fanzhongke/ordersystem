<template>
  <div class="container">
    <div class="title">
      <span>修改密码</span>
    </div>
    <div class="content">
      <el-form
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm form"
      >
        <el-form-item label="旧密码">
          <el-input
            v-model="oldPwd"
            type="password"
            show-password
            @blur="checkoldpwd"
          ></el-input>
          <span v-show="isError">密码未输入或错误</span>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="newPwd" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认新密码">
          <el-input v-model="againPwd" type="password" show-password></el-input>
          <span v-show="isPwd">两次密码不一致</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updatePwd">提交</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { oldPwd_api, updatePwd_api } from "../../apis/apis";
export default {
  data() {
    return {
      oldPwd: "",
      newPwd: "",
      againPwd: "",
      isError: false,
      isPwd: false,
      id: localStorage.id,
    };
  },
  methods: {
    // 验证旧密码函数
    checkoldpwd() {
      // 旧密码为空
      if (this.oldPwd == "") {
        this.isError = true;
        return false;
      }
      let { oldPwd, id } = this;
      oldPwd_api({ params: { oldPwd, id } }).then((res) => {
        if (res.data.code == 0) {
          this.isError = false;
        } else {
          this.isError = true;
          return false;
        }
      });
    },
    // 修改密码函数
    updatePwd() {
      if (this.newPwd == this.againPwd) {
        if (this.againPwd == "" && this.newPwd == "") {
          this.$message({
            message: "未填写修改的",
            type: "warning",
          });
          return false;
        }
        this.isPwd = false;
        let { newPwd, id } = this;
        updatePwd_api({ newPwd, id }).then(() => {
          this.$message({
            message: "小米粥提示:密码修改成功,请重新登录",
            type: "success",
          });
          this.$router.push("/");
        });
      } else {
        this.isPwd = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ebeef5;
    background-color: #fff;
    padding: 20px;
    color: #606266;
    font-weight: bold;
  }
  .content {
    width: 100%;
    padding: 10px 0px;
    box-sizing: border-box;
    background-color: #fff;
    .form {
      width: 30%;
      span {
        color: red;
      }
    }
  }
}
</style>