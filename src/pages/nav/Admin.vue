<template>
  <div class="container">
    <div>管理员信息</div>
    <div>
      <span>用户ID:</span><span> {{ id }}</span>
    </div>
    <div>
      <span>账号:</span><span> {{ account }}</span>
    </div>
    <div>
      <span>用户组:</span><span> {{ userGroup }}</span>
    </div>
    <div>
      <span>创建时间:</span><span> {{ ctime }}</span>
    </div>
    <div>
      <span>管理员头像:</span>
      <el-upload
        action="http://127.0.0.1:5000/users/avatar_upload"
        list-type="picture-card"
        :on-success="handleAvatarSuccess"
        :data="params"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog>
        <img width="100%" :src="imageUrl" alt="" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { ChinaTime } from "../../utils/utils";
export default {
  data() {
    return {
      id: localStorage.id,
      account: localStorage.account,
      userGroup: localStorage.userGroup,
      ctime: localStorage.ctime,
      imageUrl: "",
      params: { id: localStorage.id },
    };
  },
  methods: {
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        this.$message({
          type: "success",
          message: "修改成功!",
        });
        this.$bus.emit("updateImg", res.imgUrl);
      }
    },
  },
  created() {
    // 转化时间
    this.ctime = ChinaTime(this.ctime);
  },
};
</script>

<style lang="less" scoped>
.container {
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
  div {
    line-height: 50px;
    margin-left: 10px;
    border-bottom: 1px solid #ebeef5;
    color: #606266;
  }
  div:last-child {
    border: 0;
    display: flex;
    img {
      width: 80px;
    }
  }
}
</style>