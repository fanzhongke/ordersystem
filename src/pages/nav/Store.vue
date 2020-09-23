<template>
  <div class="container">
    <div class="title">
      <span>店铺管理</span>
      <el-button type="primary">保存</el-button>
    </div>
    <div class="content">
      <el-form class="form" ref="form" :model="form" label-width="80px">
        <el-form-item label="店铺名称">
          <el-input v-model="form.name" placeholder="好粥道"></el-input>
        </el-form-item>
        <el-form-item label="店铺公告">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item class="head" label="店铺头像">
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
        <el-form-item class="storePhone" label="店铺图片">
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
        <el-form-item label="配送费">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="配送时间">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="配送描述">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="店铺评分">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="销量">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="在线支付满28减5" name="type"></el-checkbox>
            <el-checkbox label="VC无限橙果汁全场8折" name="type"></el-checkbox>
            <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
            <el-checkbox label="特价饮品8折抢购" name="type"></el-checkbox>
            <el-checkbox label="单人特色套餐" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="营业时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 图片上传
      dialogImageUrl: "",
      dialogVisible: false,
      // 表单
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
    };
  },
  methods: {
    // 图片上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 表单
    onSubmit() {
      console.log("submit!");
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
    padding: 10px;
    color: #606266;
    font-weight: bold;
  }
  .content {
    padding-top: 10px;
    box-sizing: border-box;
    background-color: #fff;
    .form {
      width: 40%;
      padding: 10px 0;
      box-sizing: border-box;
      .storePhone {
        // display: flex;
        // flex-wrap: nowrap;
      }
    }
  }
}
</style>