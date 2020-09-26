<template>
  <el-card class="container">
    <div class="title">
      <span>商品分类</span>
      <el-button type="primary" @click="showAddModal">添加分类</el-button>
    </div>
    <div class="content">
      <!-- 商品分类列表 -->
      <el-table class="list" :data="tableData" style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="100"
        ></el-table-column>
        <el-table-column label="分类名称" width="300">
          <template slot-scope="scope">
            <el-input v-model="scope.row.cateName" v-show="scope.row.edit" />
            <p v-show="!scope.row.edit">{{ scope.row.cateName }}</p>
          </template>
        </el-table-column>
        <el-table-column label="是否启用" width="200">
          <template slot-scope="scope">
            <el-switch
              :disabled="!scope.row.edit"
              v-model="scope.row.state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              :type="scope.row.edit == true ? 'success' : ''"
              size="mini"
              @click="handleEdit(scope.row)"
              >{{ scope.row.edit == true ? "完成" : "编辑" }}</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
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
      <!-- 添加商品分类弹框 -->
      <el-dialog
        class="dialog"
        title="添加分类"
        :visible.sync="showMoDal"
        width="30%"
      >
        <div class="cate">
          <span class="isStart">商品分类:</span
          ><el-input v-model="cateName"></el-input>
        </div>
        <div>
          <span class="isStart">是否启用:</span>
          <el-switch
            v-model="state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showMoDal = false">取 消</el-button>
          <el-button type="primary" @click="addCate">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
import {
  catelist_api,
  addcate_api,
  delcate_api,
  editcate_api,
  categories_api,
} from "../../apis/apis";
export default {
  data() {
    return {
      total: 0, //总条数
      currentPage: 1, //当前页数
      pageSize: 3, //一页显示条数
      tableData: [],//分类数据
      showMoDal: false, //添加分类弹框状态
      cateName: "",//添加分类名称
      state: true,//添加分类启用状态
    };
  },
  methods: {
    // 渲染商品分类
    changeDate() {
      let { currentPage, pageSize } = this;
      catelist_api({ params: { currentPage, pageSize } }).then((res) => {
        for (const item of res.data.data) {
          item.state = item.state == 1;
          item.edit = false;
        }
        this.total = res.data.total;
        this.tableData = res.data.data;
      });
    },
    // 添加分类按钮弹出添加框
    showAddModal() {
      this.showMoDal = true;
    },
    // 确定添加分类
    addCate() {
      // 字段为空提示
      if(this.cateName==''){
        this.$message.error('没有填写分类名称');
      }
      // 字段不为空发送请求
      if (!this.cateName == "") {
        let { cateName, state } = this;
        // 发送请求
        addcate_api({ cateName, state }).then((res) => {
          if (res.data.code == 0) {
            this.cateName = ""; // 商品分类上传字段清空
            this.$message({
              message: "添加成功",
              type: "success",
            });
          }
        });
        this.showMoDal = false; //隐藏弹框
      }
    },
    // 编辑分类
    handleEdit(date) {
      if (date.edit) {
        // 发送请求
        editcate_api(date).then((res) => {
          if (res.data.code == 0) {
            this.$message({
              type: "success",
              message: "修改成功!",
            });
          }
          date.edit = false;
        });
      } else {
        // 可编辑状态
        date.edit = true;
      }
    },
    // 删除分类
    handleDelete(row) {
      this.$confirm("确定删除该分类吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delcate_api({ params: { id: row.id } }).then(() => {
            this.changeDate();
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 页面条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.changeDate();
    },
    // 当前页面
    handleCurrentChange(val) {
      this.currentPage = val;
      this.changeDate();
    },
    // 获取所有分类
    cateList() {
      categories_api().then((res) => {
        this.categories = res.data.categories;
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
      margin-top: 10px;
    }
    .cate {
      display: flex;
      align-items: center;
      margin-bottom: 30px;
    }
    .isStart {
      display: inline-block;
      width: 80px;
    }
  }
}
</style>