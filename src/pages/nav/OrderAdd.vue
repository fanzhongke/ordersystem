<template>
  <el-card class="container">
    <div class="title">
      <span>商品添加</span>
    </div>
    <el-form class="content" :model="form" label-width="80px">
      <el-form-item label="商品名称:">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="商品分类">
        <el-select v-model="form.category.cateName">
          <el-option
            v-for="(item, index) in categories"
            :key="index"
            :label="item.cateName"
            :value="item.cateName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格:">
        <el-input-number
          v-model="form.price"
          :precision="2"
          :step="1"
          :min="0.1"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="商品图片:">
        <el-upload
          action="http://127.0.0.1:5000/goods/goods_img_upload"
          list-type="picture-card"
          :on-success="handleAvatarSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog>
          <img width="100%" :src="uploadImgUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="商品描述:">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="form.goodsDesc"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="goodsAdd">添加商品</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>

import { addGoods_api, categories_api } from "../../apis/apis";
export default {
  data() {
    return {
      form: {
        name: "",//商品名称
        category: "",//商品分类
        goodsDesc: "",//商品描述
        price: 1,//商品描述
        imgUrl: "",//商品图片
      },
      categories: [],//商品分类列表
      uploadImgUrl:'',//商品图片上传
    };
  },
  methods: {
    // 商品图片上传
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        // 保存上传的图片
        this.form.imgUrl = res.imgUrl;
      }
    },
    // 商品添加按钮
    goodsAdd() {
      this.form.category=this.form.category.cateName
      // console.log(this.form);
      addGoods_api(this.form).then((res) => {
        this.$message({
          type: "success",
          message: "商品添加成功!",
        });
        console.log(res);
        this.$router.push("/nav/orderlist");
      });
    },
  },
  created() {
    categories_api().then((res) => {
      // 保存商品分类
      this.categories = res.data.categories;
      // 设置一个显示分类
      this.form.category=res.data.categories[0]
    });
  },
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
    height: 50px;
    color: #606266;
    font-weight: bold;
    border-bottom: 1px solid #ebeef5;
  }
  .content {
    margin-top: 10px;
    width: 400px;
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