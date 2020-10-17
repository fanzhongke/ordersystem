<template>
  <div class="container">
    <div class="title">
      <span>时间范围</span>
      <el-date-picker
        type="datetimerange"
        picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
        class="range"
      ></el-date-picker>
      <el-button type="primary">查询</el-button>
    </div>
    <el-card id="content"></el-card>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {};
  },
  mounted() {
    var myChart = echarts.init(document.querySelector("#content"));
    var option = {
    legend: {},
    tooltip: {},
    dataset: {
        dimensions: ['product', '2015', '2016', '2017'],
        source: [
            {product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7},
            {product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1},
            {product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5},
            {product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1}
        ]
    },
    xAxis: {type: 'category'},
    yAxis: {},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [
        {type: 'bar'},
        {type: 'bar'},
        {type: 'bar'}
    ]
};
    myChart.setOption(option);
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