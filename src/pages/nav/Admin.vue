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
      <span>管理员头像:</span
      ><el-upload
        action="http://127.0.0.1:5000/users/avatar_upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :data="params"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
  </div>
</template>

<script>
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
        this.$bus.emit("updateImg", res.imgUrl);
      }
    },
  },
  created() {
    // 转化时间
    let date = new Date(this.ctime);
    this.ctime =
      date.getFullYear() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getDate();
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