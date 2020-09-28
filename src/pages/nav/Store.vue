<template>
  <el-card class="container">
    <div class="title">
      店铺管理
    </div>
    <div class="content">
      <el-form class="form" ref="form" :model="form" label-width="80px">
        <!-- 店铺名称 -->
        <el-form-item label="店铺名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <!-- 店铺公告 -->
        <el-form-item label="店铺公告">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 5 }"
            v-model="form.bulletin"
          ></el-input>
        </el-form-item>
        <!-- 店铺头像 -->
        <el-form-item class="head" label="店铺头像">
          <el-upload
            action="http://127.0.0.1:5000/shop/upload"
            :show-file-list="false"
            :on-success="storeHead"
          >
            <img
              style="width: 120px"
              v-if="form.avatar"
              :src="'http://127.0.0.1:5000/upload/shop/' + form.avatar"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 店铺图片 -->
        <el-form-item class="storePhone" label="店铺图片">
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/shop/upload"
            list-type="picture-card"
            :file-list="oldPictures"
            :on-success="storePicture"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <!-- 配送费 -->
        <el-form-item label="配送费">
          <el-input v-model="form.deliveryPrice"></el-input>
        </el-form-item>
        <!-- 配送时间 -->
        <el-form-item label="配送时间">
          <el-input v-model="form.deliveryTime"></el-input>
        </el-form-item>
        <!-- 描述 -->
        <el-form-item label="配送描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <!-- 评分 -->
        <el-form-item label="店铺评分">
          <el-input v-model="form.score"></el-input>
        </el-form-item>
        <!-- 销量 -->
        <el-form-item label="销量">
          <el-input v-model="form.sellCount"></el-input>
        </el-form-item>
        <!-- 活动 -->
        <el-form-item label="活动">
          <el-checkbox-group v-model="supportsVal">
            <el-checkbox
              v-for="(item,index) in supportsList"
              :key="index"
              :label="item"
              name="type"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="添加活动">
          <el-input v-model="support"></el-input>
          <el-button
            style="margin-top: 10px"
            type="primary"
            @click="supportsAdd"
            >添加活动</el-button
          >
          <el-button
            style="margin-top: 10px"
            type="danger"
            @click="removeActive"
            >删除活动</el-button
          >
        </el-form-item>
        <!-- 营业时间 -->
        <el-form-item label="营业时间">
          <el-time-picker
            is-range
            v-model="form.date"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          >
          </el-time-picker>
        </el-form-item>
         <el-form-item><el-button type="primary" @click="saveBtn">保存</el-button></el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import { shopInfo_api,updateShop_api } from "../../apis/apis";
import { ChinaTime } from "../../utils/utils.js";
export default {
  data() {
    return {
      support: "", // 添加活动
      supportsVal: [], //取值的数组
      supportsList: [], //循环的数组
      shopPictures: [], //照片墙所有照片
      oldPictures: [], //上传成功所有照片/原来店铺照片
      // 店铺数据
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
        supports: "[]",
        pics: "[]",
        date: "[]",
      },
    };
  },
  methods: {
    changeDate() {
      shopInfo_api().then((res) => {
        this.form = res.data.data;
        this.oldPictures = this.form.pics.map((name) => {
          return { name, url: "http://127.0.0.1:5000/upload/shop/" + name };
        });
        // 合并活动选项
        this.supportsList = this.form.supports  
      });
    },
    // 上传店铺头像
    storeHead(res) {
      // 回填头像
      this.form.avatar = res.imgUrl;
    },
    // 上传店铺图片
    storePicture(res) {
      // 向数组里面添加
      this.shopPictures.push(res.imgUrl);
    },
    // 删除店铺图片
    handleRemove(file) {
      console.log(file);
      for (let i = 0; i < this.shopPictures.length; i++) {
        if (this.shopPictures[i] == file.response.imgUrl) {
          this.shopPictures.splice(i, 1);
        }
      }
    },
    // 添加活动
    supportsAdd() {
      // 为空不添加、提示信息
      if (this.support == "") {
        this.$message.error("未填写活动名称");
        return
      }
      // 添加元素
      this.supportsList.push(this.support);
    },
    // 移除活动
    removeActive() {
      
      if (this.supportsVal == "") {
        return this.$message.error("未选择删除的活动");
      }
      this.supportsVal.splice(0);
      console.log(this.supportsVal);
      console.log(this.supportsList);

    },
    // 保存发送请求
    saveBtn() {
      let { date } = this.form;
      if (typeof this.form.date[0] == "string") {
        console.log(date);
      }
      // 换成字符串
      this.form.supports = JSON.stringify(this.supportsVal);
      console.log(ChinaTime(date[0]));
      this.form.date = JSON.stringify([ChinaTime(date[0]), ChinaTime(date[1])]);
      this.form.pics = JSON.stringify([...this.form.pics, ...this.shopPictures]);
      console.log(this.form);
      updateShop_api(this.form).then(() => {
        
        this.$message({
          type: "success",
          message: "修改成功!",
        });
        this.changeDate();
        // console.log(res);
      });
    },
  },
  created() {
    this.changeDate();
  },
};
</script>

<style lang="less" scoped>
.container {
  .title {
    border-bottom: 1px solid #ebeef5;
    background-color: #fff;
    line-height: 50px;
    color: #606266;
    font-weight: bold;
  }
  .content {
    padding-top: 10px;
    box-sizing: border-box;
    background-color: #fff;
    .form {
      width: 70%;
      padding: 10px 0;
      box-sizing: border-box;
    }
  }
}
</style>