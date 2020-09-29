<template>
  <div class="container">
    <!-- 表格数据 -->
    <div class="title">
      <div class="title-c">
        <img :src="imgs.allOrderImg" alt />
        <div class="right">
          <span>{{ orderAllName }}</span>
          <span>{{ totalOrder }}</span>
        </div>
      </div>
      <div class="title-c">
        <img :src="imgs.allSalesImg" alt />
        <div class="right">
          <span>{{ saleAllName }}</span>
          <span>{{ totalAmount }}</span>
        </div>
      </div>
      <div class="title-c">
        <img :src="imgs.orderImg" alt />
        <div class="right">
          <span>{{ todayOrderName }}</span>
          <span>{{ todayOrder }}</span>
        </div>
      </div>
      <div class="title-c">
        <img :src="imgs.salesImg" alt />
        <div class="right">
          <span>{{ todaySaleName }}</span>
          <span>{{ totayAmount }}</span>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <el-card id="content"></el-card>
  </div>
</template>

<script>
import { main_api } from "../../apis/apis";
import echarts from "echarts";
export default {
  data() {
    return {
      orderAllName: "总订单",
      saleAllName: "总销售额",
      todayOrderName: "今日订单数",
      todaySaleName: "今日销售额",
      totalOrder:0,//总订单
      totalAmount:0,//总销售额
      todayOrder:0,//今日订单数
      totayAmount:0,//今日销售额
      // 图片
      imgs : {
        allOrderImg:require('../../assets/images/allOrder.png'),
        allSalesImg:require('../../assets/images/allSales.png'),
        orderImg:require('../../assets/images/order.png'),
        salesImg:require('../../assets/images/sales.png'),
      }
    };
  },
  mounted() {
    main_api().then((res) => {
      this.totalOrder=res.data.totalOrder
      this.totalAmount=res.data.totalAmount
      this.todayOrder=res.data.todayOrder
      this.totayAmount=res.data.totayAmount
      var myChart = echarts.init(document.querySelector("#content"));
      var option = {
        title: {
          text: "金额订单报表",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["金额数据", "订单数据"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: res.data.xData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "金额数据",
            type: "line",
            stack: "总量",
            data: res.data.amountData,
          },
          {
            name: "订单数据",
            type: "line",
            stack: "总量",
            data: res.data.orderData,
          },
        ],
      };
      myChart.setOption(option);
    });
  },
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  display: flex;
  padding-bottom: 30px;
  box-sizing: border-box;
  flex-direction: column;
  .title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: #606266;
    margin-bottom: 20px;
    .title-c {
      display: flex;
      padding: 10px;
      align-items: center;
      justify-content: center;
      width: 20%;
      background-color: #fff;
      font-weight: bold;
      .right{
        display: flex;
        flex-direction: column;
        align-items: center;
        span:last-child{
          color: #000;
        }
      }
      img{
        width: 60px;
      }
    }
  }
  #content {
    padding: 20px;
    box-sizing: border-box;
    width: 100%;
    height: 400px;
    flex: 1;
  }
}
</style>