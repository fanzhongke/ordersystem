<template scope="scope">
  <el-card class="container">
    <div class="title">
      <span>商品列表</span>
    </div>
    <div class="content">
      <!-- 表格 -->
      <el-table class="list" :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="商品价格">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="商品图片">
                <img alt="" />
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.ctime }}</span>
              </el-form-item>
              <el-form-item label="商品评价">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="商品销量">
                <span>{{ props.row.sellCount }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.goodsDesc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="name"> </el-table-column>
        <el-table-column label="所属分类" prop="category"> </el-table-column>
        <el-table-column label="商品价格" prop="price"> </el-table-column>
        <el-table-column label="商品图片" prop="imgUrl"
          ><img src="imgUrls" alt=""
        /></el-table-column>
        <el-table-column label="描述" prop="goodsDesc"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="
                handleEdit(scope.$index, scope.row), (dialogFormVisible = true)
              "
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
        :page-sizes="[6, 8, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <!-- 修改当前商品弹框 -->
      <el-dialog
        class="dialog"
        title="修改信息"
        :visible.sync="dialogFormVisible"
        width="500px"
      >
        <el-form>
          <el-form-item label="商品名称:">
            <el-input v-model="name" clearable></el-input>
          </el-form-item>
          <el-form-item label="商品分类:">
            <el-input v-model="category" clearable></el-input>
          </el-form-item>
          <el-form-item label="商品价格:">
            <el-input v-model="price" clearable></el-input>
          </el-form-item>
          <el-form-item label="商品图片:">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:5000/goods/goods_img_upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="imgUrl" :src="imgUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品描述:">
            <el-input v-model="goodsDesc" clearable></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateGoods">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
import { goodsList_api, goodsDel_api, goodsUpdate_api } from "../../apis/apis";
export default {
  data() {
    return {
      value: true,
      tableData: [],
      total: 0, //总条数
      currentPage: 1, //当前的页数
      pageSize: 6, //每页显示的条数
      dialogFormVisible: false,
      formLabelWidth: "100px",
      // 修改时的参数
      name: "",
      category: "",
      price: "",
      imgUrl: "",
      goodsDesc: "",
      id: "",
    };
  },
  methods: {
    // 不满10补零函数
    repairZero(time) {
      return time < 10 ? "0" + time : time;
    },
    // 请求商品列表函数
    changGoodsList() {
      let { currentPage, pageSize } = this;
      goodsList_api({ params: { currentPage, pageSize } }).then((res) => {
        if (res.status == 200) {
          this.total = res.data.total;
          /* let arr = [];
          for (const item of res.data.data) {
            arr.push(item.imgUrl);
          }
          this.imgUrls = arr;
          console.log(this.imgUrls); */
          // 处理时间操作
          for (const obj of res.data.data) {
            let date = new Date(obj.ctime);
            obj.ctime =
              date.getFullYear() +
              "-" +
              this.repairZero(date.getMonth() + 1) +
              "-" +
              this.repairZero(date.getDate()) +
              " " +
              this.repairZero(date.getHours()) +
              ":" +
              this.repairZero(date.getMinutes()) +
              ":" +
              this.repairZero(date.getSeconds());
          }
          this.tableData = res.data.data;
        }
      });
    },
    // 修改当前商品弹出模态框函数
    handleEdit(index, row) {
      this.id = row.id;
    console.log(this.id);
      this.dialogFormVisible = false;
    },
    // 删除当前商品函数
    handleDelete(index, row) {
      this.$confirm("确定删除商品吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          goodsDel_api({ params: { id: row.id } }).then(() => {
            this.changGoodsList();
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
    // 切换页面条数函数
    handleSizeChange(val) {
      this.pageSize = val;
      this.changGoodsList();
    },
    // 切换当前页函数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.changGoodsList();
    },
    // 图片上传
    handleAvatarSuccess(res){
      if(res.code==0){
         this.imgUrl = res.imgUrl;
      }
    },
    // 确定更改当前商品函数
    updateGoods() {
      let { name, category, price, imgUrl, goodsDesc, id } = this;
      goodsUpdate_api({ name, category, price, imgUrl, goodsDesc, id }).then(
        (res) => {
          this.$message({
            type: "success",
            message: "商品修改成功!",
          });
          this.name='', this.category='', this.price='', this.imgUrl='', this.goodsDesc=''
          this.changGoodsList();
          this.dialogFormVisible=false
          console.log(res);
        }
      );
    },
  },
  created() {
    // 重新渲染
    this.changGoodsList();
  },
};
</script>

<style lang="less" scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  color: #606266;
  font-weight: bold;
  box-sizing: border-box;
  border-bottom: 1px solid #ebeef5;
}
.content {
  .page {
    margin-top: 10px;
    background-color: #fff;
    display: flex;
    align-items: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
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
    margin-bottom: 10px;
  }
}
</style>