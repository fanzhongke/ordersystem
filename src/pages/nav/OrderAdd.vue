<template>
  <div class="container">
    <div class="title">
      <span>商品添加</span>
    </div>
    <div class="content">
      <div class="form">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="商品名称">
            <el-input v-model="form.name" placeholder="商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select v-model="form.region" placeholder="请选择商品分类">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品价格">
             <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
          </el-form-item>
          <el-form-item label="商品图片">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </el-form-item>
          <el-form-item label="商品描述">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">添加商品</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: true,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      // 图片上传
      dialogImageUrl: "",
      dialogVisible: false,
      // 商品数量
      num: 1
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    // 图片上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 商品数量
    handleChange(value) {
        console.log(value);
      }
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
    .form {
      width: 40%;
    }
  }
}
</style>