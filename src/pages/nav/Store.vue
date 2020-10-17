<template>
  <el-card class="container">
    <div class="title">店铺管理</div>
    <div class="content">
      <el-form class="form" ref="form" :model="listData" label-width="80px">
        <!-- 店铺名称 -->
        <el-form-item label="店铺名称">
          <el-input v-model="listData.name"></el-input>
        </el-form-item>
        <!-- 店铺公告 -->
        <el-form-item label="店铺公告">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 5 }"
            v-model="listData.bulletin"
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
              v-if="listData.avatar"
              :src="'http://127.0.0.1:5000/upload/shop/' + listData.avatar"
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
          <el-input v-model="listData.deliveryPrice"></el-input>
        </el-form-item>
        <!-- 配送时间 -->
        <el-form-item label="配送时间">
          <el-input v-model="listData.deliveryTime"></el-input>
        </el-form-item>
        <!-- 描述 -->
        <el-form-item label="配送描述">
          <el-input v-model="listData.description"></el-input>
        </el-form-item>
        <!-- 评分 -->
        <el-form-item label="店铺评分">
          <el-input v-model="listData.score"></el-input>
        </el-form-item>
        <!-- 销量 -->
        <el-form-item label="销量">
          <el-input v-model="listData.sellCount"></el-input>
        </el-form-item>
        <!-- 活动 -->
        <el-form-item label="活动">
          <el-checkbox-group v-model="supportsVal">
            <el-checkbox
              v-for="(item, index) in supportsList"
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
            v-model="listData.date"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          >
          </el-time-picker>
        </el-form-item>
        <el-form-item
          ><el-button type="primary" @click="saveBtn"
            >保存</el-button
          ></el-form-item
        >
      </el-form>
    </div>
  </el-card>
</template>

<script>
import { shopInfo_api, updateShop_api } from "../../apis/apis";
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
      listData: {
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
        this.listData = res.data.data;
        // 照片墙的数据回填
        this.oldPictures = this.listData.pics.map((name) => {
          return { name, url: "http://127.0.0.1:5000/upload/shop/" + name };
        });
        this.shopPictures.push(...this.listData.pics);
        // 合并活动选项
        this.supportsList = [...this.listData.supports, ...this.supportsList];
      });
    },
    // 上传店铺头像
    storeHead(res) {
      // 回填头像
      this.listData.avatar = res.imgUrl;
    },
    // 上传店铺图片
    storePicture(res) {
      // 向数组里面添加
      this.shopPictures.push(res.imgUrl);
    },
    // 删除店铺图片
    handleRemove(file) {
      console.log(file);
      let imgUrl = file.response ? file.response.imgUrl : file.name;
      for (let i = 0; i < this.shopPictures.length; i++) {
        if (this.shopPictures[i] == imgUrl) this.shopPictures.splice(i, 1);
      }
    },
    // 添加活动
    supportsAdd() {
      // 为空不添加、提示信息
      if (this.support == "") {
        this.$message.error("未填写活动名称");
        return;
      }
      // 添加元素
      this.supportsList.push(this.support);
      
    },
    // 移除活动
    removeActive() {
      if (this.supportsVal == "") {
        return this.$message.error("未选择删除的活动");
      }
      let newArr = this.supportsList.filter((item)=>{
        return !this.supportsVal.includes(item)
      })
      this.supportsList=newArr
      this.listData.supports=this.supportsList
    },
    // 保存发送请求
    saveBtn() {
      let { date } = this.listData;
      // 拷贝一次
      let obj = JSON.parse(JSON.stringify(this.listData));
      // 换成字符串
      obj.supports = JSON.stringify(this.supportsVal);
      obj.date = JSON.stringify([ChinaTime(date[0]), ChinaTime(date[1])]);
      obj.pics = JSON.stringify(this.shopPictures);
      console.log(obj);
      if (obj.supports=='[]') {
        this.$message({
          message: '请选择商品进行的活动',
          type: 'warning'
        });
        return false
      }
      updateShop_api(obj).then(() => {
        this.$message({
          type: "success",
          message: "修改成功!",
        });
        this.changeDate();
        history.go()
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