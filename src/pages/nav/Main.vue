<template>
  <div class="container">
    <!-- 表格数据 -->
    <div class="title">
      <el-card class="title-c" v-for="item in tableList" :key="item.id">
        <img :src="item.src" alt />
        <div class="right">
          <span>{{item.name}}</span>
          <span>{{item.number}}</span>
        </div>
      </el-card>
    </div>
    <!-- 内容 -->
    <el-card class="content">
      <h1>数据统计echarts</h1>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableList: [
        {
          id: 0,
          src: require("../../assets/images/allOrder.png"),
          name: "总订单",
          number: 100.243,
        },
        {
          id: 1,
          src: require("../../assets/images/order.png"),
          name: "今日订单",
          number: 101.1,
        },
        {
          id: 2,
          src: require("../../assets/images/allSales.png"),
          name: "总销售额",
          number: 182.043,
        },
        {
          id: 3,
          src: require("../../assets/images/sales.png"),
          name: "今日销售额",
          number: 101.3,
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: #606266;
    .title-c {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 22.5%;
      padding: 20px 0;
      box-sizing: border-box;
      background-color: #fff;
      img {
        width: 60px;
      }
      .right {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 18px;
        color: #606266;
        span:last-child {
          font-weight: bold;
          color: #000;
        }
      }
    }
  }
  .content {
    margin-top: 40px;
    width: 100%;
    flex: 1;
  }
}
</style>