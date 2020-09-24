<template>
  <div class="container">
    <div class="title">
      <span>商品分类</span>
      <el-button type="primary">添加分类</el-button>
    </div>
    <div class="content">
      <el-table class="list" :data="tableData" style="width: 100%">
        <el-table-column label="序号" width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分类名称" width="300">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.cateName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否启用" width="200">
          <el-switch
            v-model="value"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 6, 8, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { catelist_api } from "../../apis/apis";
export default {
  data() {
    return {
      value: true,
      total: 0, //总条数
      currentPage: 1, //当前页数
      pageSize: 3, //一页显示条数
      tableData: [],
    };
  },
  methods: {
    // 商品函数
    changeDate() {
      let {currentPage,pageSize}=this
      catelist_api({ params: { currentPage,pageSize} }).then((res) => {
        this.total = res.data.total;
        let arr = [];
        for (const item of res.data.data) {
          arr.push(item);
        }
        this.tableData = arr;
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      this.pageSize=val
      this.changeDate();
    },
    handleCurrentChange(val) {
      this.currentPage=val
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