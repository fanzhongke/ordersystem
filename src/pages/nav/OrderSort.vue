<template>
  <el-card class="container">
    <div class="title">
      <span>商品分类</span>
      <div>
        <el-button type="primary" @click="cateList((dialogVisible = true))"
          >查看所有分类</el-button
        >
        <el-button
          type="primary"
          @click="showAddModal((dialogFormVisible = true))"
          >添加分类</el-button
        >
      </div>
    </div>
    <div class="content">
      <!-- 商品分类列表 -->
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
          <template scope="scope">
            <el-switch
              v-model="scope.row.state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
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
        :visible.sync="dialogFormVisible"
        width="400px"
      >
        <el-form>
          <el-form-item label="商品分类:">
            <el-input v-model="cateName" clearable></el-input>
          </el-form-item>
          <el-form-item label="是否启用:">
            <el-radio v-model="state" :label="true">是</el-radio>
            <el-radio v-model="state" :label="false">否</el-radio>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCate">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 修改商品分类弹框 -->
      <el-dialog
        class="dialog"
        title="修改分类"
        :visible.sync="updateVisible"
        width="400px"
      >
        <el-form>
          <el-form-item label="商品分类:">
            <el-input v-model="updateCateName" clearable></el-input>
          </el-form-item>
          <el-form-item label="是否启用:">
            <el-radio v-model="updateState" :label="1">是</el-radio>
            <el-radio v-model="updateState" :label="0">否</el-radio>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateVisible = false">取 消</el-button>
          <el-button type="primary" @click="update">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 所有分类弹框 -->
      <el-dialog title="商品分类" :visible.sync="dialogVisible" width="30%">
        <p v-for="(item, index) in categories" :key="index">
          {{ item.cateName }}
        </p>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
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
      tableData: [],
      dialogFormVisible: false, //编辑弹框状态
      formLabelWidth: "100px",
      id: "", //商品分类id
      cateName: "", // 商品分类上传字段
      state: true, //添加商品是否启用
      updateVisible: false, //编辑弹框状态
      updateCateName: "", //商品修改后的字段
      updateState: 1, //修改后商品是否启用
      dialogVisible: false, //所有分类弹框状态
      categories: [], //所有分类
    };
  },
  methods: {
    // 渲染商品分类
    changeDate() {
      let { currentPage, pageSize } = this;
      catelist_api({ params: { currentPage, pageSize } }).then((res) => {
        // console.log(res.data.data);
        this.total = res.data.total;
        let arr = [];
        for (const item of res.data.data) {
          item.state = item.state == 1;
          arr.push(item);
        }
        this.tableData = arr;
      });
    },
    // 添加分类按钮弹出添加框
    showAddModal() {
      this.dialogFormVisible = true;
    },
    // 确定添加分类
    addCate() {
      let { cateName, state } = this;
      addcate_api({ cateName, state }).then(() => {
        this.dialogFormVisible = false; //隐藏弹框
        this.cateName = ""; // 商品分类上传字段清空
        this.$message({
          message: "添加成功",
          type: "success",
        });
      });
    },
    // 编辑分类按钮弹出编辑框
    handleEdit(index, row) {
      this.id = row.id;
      this.updateVisible = true;
    },
    // 确认修改分类
    update() {
      this.updateState = this.updateState == 1 ? true : false;
      editcate_api({
        id: this.id,
        cateName: this.updateCateName,
        state: this.updateState,
      }).then((res) => {
        this.$message({
          message: "恭喜你，这是一条成功消息",
          type: "success",
        });
        console.log(res);
        this.updateCateName = "";
        this.updateState = 1;
        this.changeDate();
      });
      this.updateVisible = false;
    },
    // 删除分类
    handleDelete(index, row) {
      // console.log(index,row.id);
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
    .dialog {
      .el-form-item {
        display: flex;
      }
    }
  }
}
</style>