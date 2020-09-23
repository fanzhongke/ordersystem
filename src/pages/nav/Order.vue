<template>
  <div class="container">
    <div class="top">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="订单号">
            <el-input v-model="formInline.user" placeholder="订单号"></el-input>
          </el-form-item>
          <el-form-item label="收货人">
            <el-input v-model="formInline.user" placeholder="收货人"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="formInline.user" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item label="订单状态">
            <el-input v-model="formInline.user" placeholder="订单状态"></el-input>
          </el-form-item>
        <div class="block">
          <span class="demonstration">选择时间</span>
          <el-date-picker
            class="dateSelection"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
          <el-button type="primary">查询</el-button>
        </div>
      </el-form>
    </div>
    <div class="middle">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="date" label="订单号" width="120"></el-table-column>
        <el-table-column prop="name" label="下单时间" width="120"></el-table-column>
        <el-table-column prop="province" label="手机号" width="120"></el-table-column>
        <el-table-column prop="city" label="收货人" width="100"></el-table-column>
        <el-table-column prop="address" label="配送地址" width="300"></el-table-column>
        <el-table-column prop="zip" label="送达时间" width="100"></el-table-column>
        <el-table-column prop="zip" label="用户备注" width="120"></el-table-column>
        <el-table-column prop="zip" label="订单金额" width="100"></el-table-column>
        <el-table-column prop="zip" label="订单状态" width="100"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bottom">
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
      ],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    // 表格
    handleClick(row) {
      console.log(row);
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  background-color: #fff;
  padding-top: 10px;
  box-sizing: border-box;
  height: 100%;
  .top {
    margin-left: 10px;
    margin-bottom: 50px;
    .block {
      .demonstration {
        color: #606266;
      }
      .dateSelection {
        margin: 0 10px !important;
        width: 300px;
      }
    }
  }
  .bottom {
    margin-top: 30px;
  }
}
</style>