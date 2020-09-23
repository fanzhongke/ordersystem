<template>
  <el-card class="container">
    <div class="title">
      <span>账号列表</span>
    </div>
    <div class="content">
      <div class="list">
        <el-table :data="tableData" style="width: 100%" @selection-change="selectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="account" label="账号" width="180"></el-table-column>
          <el-table-column prop="userGroup" label="用户组" width="180"></el-table-column>
          <el-table-column prop="ctime" label="创建时间" width="180"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row),dialogFormVisible = true"
              >编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[4, 6, 8, 12]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
      <div>
        <el-button type="danger" @click="removeAll" plain>批量删除</el-button>
        <el-button type="success" plain>取消选择</el-button>
      </div>
    </div>
    <el-dialog class="dialog" title="修改信息" :visible.sync="dialogFormVisible" width="500px">
      <el-form>
        <el-form-item label="用户名:">
          <el-input v-model="account" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户组:">
          <el-select v-model="userGroup" placeholder="请选择">
            <el-option v-for="item in options" :key="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUser">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import {
  accountList_api,
  removeUser_api,
  removeAll_api,
  updateUser_api,
} from "../../apis/apis";
export default {
  data() {
    return {
      value: true,
      tableData: [],
      total: 0, //总条数
      currentPage: 1, //当前的页数
      pageSize: 4, //每页显示的条数
      arrId: [], //当前所有选中的管理员id
      id: 0, //当前管理员的id
      account: "",
      userGroup: "超级管理员",
      options: ["超级管理员", "普通管理员"],
      dialogFormVisible: false,
      formLabelWidth: "100px",
    };
  },
  methods: {
    // 请求管理员列表函数
    changeDate() {
      let { currentPage, pageSize } = this;
      accountList_api({ params: { currentPage, pageSize } }).then((res) => {
        let old = res.data.data;
        // 时间转化
        for (const obj of old) {
          let date = new Date(obj.ctime);
          obj.ctime =
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getDate() +
            " " +
            date.getHours() +
            ":" +
            date.getMinutes() +
            ":" +
            date.getSeconds();
        }
        this.tableData = old;
        this.total = res.data.total;
        if (res.status == 200) {
          this.tableData = res.data.data;
        }
      });
    },
    // 选中用户函数
    selectionChange(val) {
      // 获取当前所有选中的管理员id
      let newArr = val.map((item) => item.id);
      this.arrId = newArr;
    },
    // 点击每页显示数据切换函数
    handleSizeChange(val) {
      this.pageSize = val;
      this.changeDate();
    },
    // 点击跳转页面触发的函数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.changeDate();
    },
    // 修改管理函数
    handleEdit(index, row) {
      this.id = row.id;
    },
    // 删除管理员函数
    handleDelete(index, row) {
      this.$confirm("确定删除该管理员吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          removeUser_api({ params: { id: row.id } }).then((res) => {
            console.log(res);
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
    // 批量删除管理员函数
    removeAll() {
      if (this.arrId.length == 0) return false;
      this.$confirm("确定批量删除吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 转字符串
          let str = JSON.stringify(this.arrId);
          removeAll_api({ params: { ids: str } }).then((res) => {
            console.log(res);
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
    // 修改管理员函数
    updateUser() {
      let { id, account, userGroup } = this;
      updateUser_api({ id, account, userGroup }).then(() => {
        this.dialogFormVisible = false;
        this.changeDate();
      });
    },
  },
  created() {
    // 重新请求,渲染页面
    this.changeDate();
  },
};
</script>

<style lang="less" scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  height: 60px;
  padding: 10px;
  color: #606266;
  font-weight: bold;
  box-sizing: border-box;
  border-bottom: 1px solid #ebeef5;
}
.content {
  .page {
    background-color: #fff;
    height: 60px;
    display: flex;
    align-items: center;
  }
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.dialog {
  .el-form-item {
    display: flex;
  }
}
</style>