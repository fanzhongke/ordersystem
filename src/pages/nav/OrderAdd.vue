<template>
  <div class="container">
    <div class="title">
      <span>商品添加</span>
    </div>
    <div class="content">
      <el-form label-width="80px">
        <el-form-item label="商品名称:">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="商品分类:">
          <el-input v-model="category"></el-input>
        </el-form-item>
        <el-form-item label="价格:">
          <el-input-number
            v-model="price"
            :precision="2"
            :step="1"
            :min="0.1"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="商品图片:">
          <el-upload
            class="avatar-uploader"
            action=" http://127.0.0.1:5000/goods/goods_img_upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述:">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="goodsDesc"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="goodsAdd">添加商品</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { addGoods_api } from "../../apis/apis";
export default {
  data() {
    return {
      name: "",
      category: "",
      goodsDesc: "",
      price: "1",
      imgUrl: "",
    };
  },
  methods: {
    // 商品数量
    handleChange(value) {
      console.log(value);
    },
    // 商品图片上传
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        console.log(res.imgUrl);
        this.imgUrl = res.imgUrl;
      }
    },
    // 商品添加按钮
    goodsAdd() {
      let { name, category, price, imgUrl, goodsDesc } = this;
      addGoods_api({ name, category, price, imgUrl, goodsDesc }).then((res) => {
        this.$message({
          type: "success",
          message: "商品添加成功!",
        });
        console.log(res);
        this.name = "";
        this.category = "";
        this.price = "1";
        this.imgUrl = "";
        this.goodsDesc = "";
        this.$router.push('/nav/orderlist')
      });
    },
  },
  created() {},
};
</script>

<style lang="less" scoped>
.container {
  background-color: #fff;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    height: 60px;
    padding: 10px;
    color: #606266;
    font-weight: bold;
    box-sizing: border-box;
    border-bottom: 1px solid #ebeef5;
  }
  .content {
    padding: 10px;
    box-sizing: border-box;
    .el-form {
      width: 400px;
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>