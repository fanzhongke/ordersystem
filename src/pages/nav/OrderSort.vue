<template>
  <div class="container">
    <div class="title">
      <span>商品分类</span>
      <el-button type="primary">添加分类</el-button>
    </div>
    <div class="content">
      <div class="list">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="序号" width="200">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="分类名称" width="400">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否启用" width="400">
            <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: true,
      tableData: [
        {
          date: 1,
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: 2,
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: 3,
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: 4,
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
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
    .page {
      background-color: #fff;
      height: 60px;
    }
  }
}
</style>