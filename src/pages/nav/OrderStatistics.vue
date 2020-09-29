<template>
  <div class="container">
    <div class="title">
      <span class="demonstration">时间范围</span>
      <el-date-picker
        v-model="date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <el-button type="primary" @click="searchBtn">查询</el-button>
    </div>
    <el-card id="content"></el-card>
  </div>
</template>

<script>
import { orderReport_api } from "../../apis/apis";
import { ChinaDate } from "../../utils/utils";
import echarts from "echarts";
export default {
  data() {
    return {
      date: [new Date("2020-05-01"), new Date()],
      time: [],
      amount: [],
    };
  },
  mounted() {
    
  },
  methods: {
    changeDate() {
      let { date } = this.date;
      date = JSON.stringify([ChinaDate(this.date[0]), ChinaDate(this.date[1])]);
      orderReport_api({ params: { date } }).then((res) => {
        let amount = res.data.data.map((item) => {
          return item.orderAmount;
        });
        let time = res.data.data.map((item) => {
          return ChinaDate(item.orderTime);
        });
        this.time = time;
        this.amount = amount;
        var myChart = echarts.init(document.querySelector("#content"));
        var option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              crossStyle: {
                color: "#999",
              },
            },
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ["line", "bar"] },
              restore: { show: true },
              saveAsImage: { show: true },
            },
          },
          legend: {
            data: ["订单金额"],
          },
          xAxis: [
            {
              type: "category",
              data: this.time,
              axisPointer: {
                type: "shadow",
              },
            },
          ],
          yAxis: [
            {
              type: "value",
              name: "订单金额",
              min: 0,
              max: 200,
              interval: 50,
              axisLabel: {
                formatter: "{value} 元",
              },
            },
          ],
          series: [
            {
              name: "订单金额",
              type: "bar",
              data: this.amount,
            },
          ],
        };
        myChart.setOption(option);
      });
    },
    // 搜索
    searchBtn() {
      this.changeDate();
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
    color: #606266;
    margin-bottom: 20px;
    .range {
      margin: 0 10px;
    }
  }
  #content {
    padding: 10px;
    box-sizing: border-box;
    background-color: #fff;
    width: 100%;
    height: 500px;
  }
}
</style>