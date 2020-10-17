<template scope="scope">
  <el-card class="container">
    <div class="title">
      <span>商品列表</span>
    </div>
    <div class="content">
      <!-- 表格 -->
      <el-table class="list" :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div>
              <span>商品 ID:</span>
              <span>{{ scope.row.id }}</span>
            </div>
            <div>
              <span>商品名称:</span>
              <span>{{ scope.row.name }}</span>
            </div>
            <div>
              <span>所属分类:</span>
              <span>{{ scope.row.category }}</span>
            </div>
            <div>
              <span>商品价格:</span>
              <span>{{ scope.row.price }}</span>
            </div>
            <div>
              <span>创建时间:</span>
              <span>{{ scope.row.ctime }}</span>
            </div>
            <div>
              <span>商品评价:</span>
              <span>{{ scope.row.rating }}</span>
            </div>
            <div>
              <span>商品销量:</span>
              <span>{{ scope.row.sellCount }}</span>
            </div>
            <div>
              <span>商品描述:</span>
              <span>{{ scope.row.goodsDesc }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="name"> </el-table-column>
        <el-table-column label="所属分类" prop="category"> </el-table-column>
        <el-table-column label="商品价格" prop="price"> </el-table-column>
        <el-table-column label="商品图片">
          <template slot-scope="scope">
            <img
              :src="
                'http://127.0.0.1:5000/upload/imgs/goods_img/' +
                scope.row.imgUrl
              "
            />
          </template>
        </el-table-column>
        <el-table-column label="描述" prop="goodsDesc"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
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
        :page-sizes="[5, 7, 8, 10]"
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
        <el-form :model="form">
          <el-form-item label="商品名称:">
            <el-input v-model="form.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select v-model="form.category" placeholder="请选择分类">
              <el-option
                v-for="(item, index) in categories"
                :key="index"
                :label="item.cateName"
                :value="item.cateName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品价格:">
            <el-input-number
              v-model="form.price"
              :min="1"
              :precision="2"
              :step="1.0"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="商品图片:">
            <el-upload
              class="goods-uploader"
              action="http://127.0.0.1:5000/goods/goods_img_upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="form.imgUrl" :src="form.imgUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品描述:">
            <el-input type="textarea" v-model="form.goodsDesc"></el-input>
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
import {
  goodsList_api,
  goodsDel_api,
  goodsUpdate_api,
  categories_api,
} from "../../apis/apis";
import { ChinaTime } from "../../utils/utils";
export default {
  data() {
    return {
      tableData: [],
      total: 0, //总条数
      currentPage: 1, //当前的页数
      pageSize: 5, //每页显示的条数
      dialogFormVisible: false,
      formLabelWidth: "100px",
      imageUrl: "",
      // 修改时的参数
      form: {
        name: "",
        category: "",
        price: "",
        imgUrl: "",
        goodsDesc: "",
        id: 0,
      },
      categories: [],
      issend:true,//防抖节流
    };
  },
  methods: {
    // 请求商品列表函数
    changGoodsList() {
      let { currentPage, pageSize } = this;
      goodsList_api({ params: { currentPage, pageSize } }).then((res) => {
        if (res.status == 200) {
          // 处理时间操作
          for (const obj of res.data.data) {
            obj.ctime = ChinaTime(obj.ctime);
          }
          this.tableData = res.data.data;
          this.total = res.data.total;
        }
      });
    },
    // 修改当前商品弹出模态框函数
    handleEdit(index, row) {
      this.form.id = row.id;
      this.dialogFormVisible = true;
      // 获取商品分类
      categories_api().then((res) => {
        // console.log(res.data.categories);
        this.categories = res.data.categories;
      });
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
      if (!this.issend) {
        this.$message({
          message: '你操作的太频繁了,请稍后再试',
          type: 'warning'
        });
        return
      }
      this.issend=false
      setTimeout(()=>{
        this.issend=true
      },500)
      this.changGoodsList();
    },
    // 切换当前页函数
    handleCurrentChange(val) {
      this.currentPage = val;
      if (!this.issend) {
        this.$message({
          message: '你操作的太频繁了,请稍后再试',
          type: 'warning'
        });
        return
      }
      this.issend=false
      setTimeout(()=>{
        this.issend=true
      },500)
      this.changGoodsList();
    },
    // 图片上传
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        this.form.imgUrl = res.imgUrl;
      }
    },
    // 确定更改当前商品函数
    updateGoods() {
      goodsUpdate_api(this.form).then((res) => {
        console.log(res);
        if (res.data.code == 0) {
          this.dialogFormVisible = false;
          this.changGoodsList();
          this.$message({
            type: "success",
            message: "商品修改成功!",
          });
          this.form = {};
          console.log(res);
        }
      });
    },
  },
  created() {
    // 重新渲染
    this.changGoodsList();
  },
};
</script>

<style lang="less" scoped>
// 标题
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
  // 表格
  .list {
    img {
      width: 60px;
    }
  }
  // 分页
  .page {
    margin-top: 10px;
    background-color: #fff;
    display: flex;
    align-items: center;
  }
  // 上传图片
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
  // 修改弹框
  .dialog {
    .el-form-item {
      display: flex;
      margin-bottom: 10px;
    }
  }
}
</style>