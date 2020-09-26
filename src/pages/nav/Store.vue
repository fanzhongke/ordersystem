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
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 5}" v-model="form.bulletin"></el-input>
        </el-form-item>
        <el-form-item class="head" label="店铺头像">
          <el-upload
            action="http://127.0.0.1:5000/shop/upload"
            list-type="picture-card"
            :on-success="handlePictureCardPreview"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog>
            <img width="100%" :src="form.avatar" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item class="storePhone" label="店铺图片">
          <el-upload
            action="http://127.0.0.1:5000/shop/upload"
            list-type="picture-card"
            :on-success="handlePictureCardPreview"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog>
            <img width="100%" :src="form.pics" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item label="配送费">
          <el-input v-model="form.deliveryPrice"></el-input>
        </el-form-item>
        <el-form-item label="配送时间">
          <el-input v-model="form.deliveryTime"></el-input>
        </el-form-item>
        <el-form-item label="配送描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="店铺评分">
          <el-input v-model="form.score"></el-input>
        </el-form-item>
        <el-form-item label="销量">
          <el-input v-model="form.sellCount"></el-input>
        </el-form-item>
        <el-form-item label="活动">
          <el-checkbox-group v-model="form.supports">
            <el-checkbox label="在线支付满28减5" name="type"></el-checkbox>
            <el-checkbox label="VC无限橙果汁全场8折" name="type"></el-checkbox>
            <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
            <el-checkbox label="特价饮品8折抢购" name="type"></el-checkbox>
            <el-checkbox label="单人特色套餐" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="营业时间">
          <el-date-picker
            v-model="form.date"
            type="datetimerange"
            :start-placeholder="form.date[0]"
            :end-placeholder="form.date[1]"
            :default-time="[form.date[0], form.date[1]]"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="起送价格">
          <el-input v-model="form.minPrice"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { shopInfo_api } from "../../apis/apis";
export default {
  data() {
    return {
      // 图片上传
      dialogImageUrl: "",
      dialogVisible: false,
      // 表单
      form: {
        id: 0,
        name: "",
        bulletin: "",
        avatar: "",
        deliveryPrice: 0,
        deliveryTime: 0,
        description: "",
        score: "",
        sellCount: 0,
        supports: [],
        pics: [],
        date: [],
        minPrice: "",
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
  created() {
    shopInfo_api().then((res) => {
      console.log(res.data.data);
      this.form = res.data.data;
    });
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
    }
  }
}
</style>