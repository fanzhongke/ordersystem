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
    <div class="content">商品统计echarts</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.container {
  .title {
    color: #606266;
    margin-bottom: 20px;
    .range{
      margin: 0 10px;
    }
  }
  .content {
    padding: 10px;
    box-sizing: border-box;
    background-color: #fff;
  }
}
</style>