<template>
  <el-card class="container">
    <div class="title">
      <span>添加账号</span>
    </div>
    <div class="content">
      <el-form label-width="80px">
        <el-form-item label="用户名:">
          <el-input v-model="name" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="pwd" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="用户组">
          <el-select v-model="select" placeholder="请选择">
            <el-option v-for="item in options" :key="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addUser">添加</el-button>
          <el-button @click="resetUser">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import { addUser_api } from "../../apis/apis";
export default {
  data() {
    return {
      name: "",
      pwd: "",
      select: "超级管理员",
      options: ["超级管理员", "普通管理员"],
    };
  },
  methods: {
    // 添加账号
    addUser() {
      addUser_api({
        account: this.name,
        password: this.pwd,
        userGroup: this.select,
      }).then((res) => {
        if (res.data.code == 0) {
          this.name = "";
          this.pwd = "";
          this.select = "超级管理员";
          this.$message({
            message: "小米粥提示:账号添加成功",
            type: "success",
          });
        } else {
          this.$message.error("小米粥提示:账号添加失败");
        }
      });
    },
    // 重置账号
    resetUser() {
      this.name = "";
      this.pwd = "";
      this.select = "超级管理员";
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
    width: 30%;
    padding: 10px 0px;
    box-sizing: border-box;
    background-color: #fff;
    .el-input {
      margin-bottom: 10px;
    }
    .el-button {
      margin-top: 10px;
    }
  }
}
</style>