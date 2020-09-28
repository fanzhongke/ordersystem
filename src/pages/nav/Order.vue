<template>
  <el-card class="container">
    <div class="top">
      <el-form :inline="true" :model="search" class="demo-form-inline">
        <el-form-item label="订单号">
          <el-input
            v-model="search.orderNo"
            placeholder="查询的订单号"
          ></el-input>
        </el-form-item>
        <el-form-item label="收货人">
          <el-input
            v-model="search.consignee"
            placeholder="收货人姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input
            v-model="search.phone"
            placeholder="输入查询手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="search.orderState" placeholder="请选择订单状态">
            <el-option label="全部" value="全部"></el-option>
            <el-option label="受理中" value="受理中"></el-option>
            <el-option label="已受理" value="已受理"></el-option>
            <el-option label="派送中" value="派送中"></el-option>
            <el-option label="已完成" value="已完成"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择时间">
          <el-date-picker
            v-model="search.value1"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
          >
          </el-date-picker>
        </el-form-item>
        <el-button type="primary" @click="searchBtn">查询</el-button>
      </el-form>
    </div>
    <!-- 表格 -->
    <div class="middle">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          fixed
          prop="orderNo"
          label="订单号"
          width="90"
        ></el-table-column>
        <el-table-column
          prop="orderTime"
          label="下单时间"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="consignee"
          label="收货人"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="deliverAddress"
          label="配送地址"
          width="210"
        ></el-table-column>
        <el-table-column
          prop="deliveryTime"
          label="送达时间"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="remarks"
          label="用户备注"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="orderAmount"
          label="订单金额"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="orderState"
          label="订单状态"
          width="100"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button type="text" size="small" @click="update(scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <el-pagination
      class="bottom"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[4, 6, 8, 10]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 订单详情弹框 -->
    <el-dialog
      class="details"
      title="订单详情"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form :model="form" label-width="80px">
        <div>
          <span>收货人:</span><span> {{ form.consignee }}</span>
        </div>
        <div>
          <span>联系电话:</span><span> {{ form.phone }}</span>
        </div>
        <div>
          <span>订单号:</span><span> {{ form.orderNo }}</span>
        </div>
        <div>
          <span>下单时间:</span><span> {{ form.orderTime }}</span>
        </div>
        <div>
          <span>送货地址:</span><span> {{ form.deliverAddress }}</span>
        </div>
        <div>
          <span>送达时间:</span><span> {{ form.deliveryTime }}</span>
        </div>
        <div>
          <span>备注:</span><span> {{ form.remarks }}</span>
        </div>
        <div>
          <span>订单金额:</span><span> {{ form.orderAmount }}</span>
        </div>
        <div>
          <span>订单状态:</span><span> {{ form.orderState }}</span>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 修改当前订单弹框 -->
    <el-dialog
      class="update"
      title="修改信息"
      :visible.sync="dialogFormVisible"
      width="600px"
    >
      <el-form :model="form" label-width="80px">
        <el-form-item label="收货人:">
          <el-input v-model="form.consignee" clearable></el-input>
        </el-form-item>
        <el-form-item label="电话:">
          <el-input v-model="form.phone" clearable></el-input>
        </el-form-item>
        <el-form-item label="送货地址:">
          <el-input v-model="form.deliverAddress" clearable></el-input>
        </el-form-item>
        <el-form-item label="送达时间:">
          <el-date-picker
            v-model="form.deliveryTime"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input v-model="form.remarks" clearable></el-input>
        </el-form-item>
        <el-form-item label="订单金额:">
          <el-input v-model="form.orderAmount" clearable></el-input>
        </el-form-item>
        <el-form-item label="订单状态:">
          <el-input v-model="form.orderState" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateOrder">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { orderList_api, detail_api, edit_api } from "../../apis/apis";
import { ChinaTime } from "../../utils/utils";
export default {
  data() {
    return {
      search: {
        orderNo: "", //订单号
        consignee: "", //收货人
        phone: "", //联系电话
        orderState: "", //订单状态
        value1: [new Date(), new Date()],
      },
      currentPage: 1, //当前页数
      pageSize: 4, //页条数
      tableData: [], //总数据
      total: 1, //总条数
      // 修改时发送的数据
      form: {
        id: 0, //订单id
        orderNo: "", //订单号
        orderTime: "", //下单时间
        phone: "", //联系电话
        consignee: "", //收货人
        deliverAddress: "", //送货地址
        deliveryTime: "", //送达时间
        remarks: "", //备注
        orderAmount: "", //订单金额
        orderState: "", //订单状态
      },
      dialogVisible: false, //订单详情弹框状态
      dialogFormVisible: false, //修改当前订单弹框状态
    };
  },
  methods: {
    // 获取列表数据
    changeDate() {
      let { currentPage, pageSize  } = this;
      // this.search.value1 = JSON.stringify(this.search.value1)
      orderList_api({ params: { currentPage, pageSize,orderNo:this.search.orderNo,consignee:this.search.consignee,phone:this.search.phone,orderState:this.search.orderState,value1: this.search.value1} }).then((res) => {
        //  时间转化
        for (const item of res.data.data) {
          item.orderTime = ChinaTime(item.orderTime);
        }
        for (const item of res.data.data) {
          item.deliveryTime = ChinaTime(item.deliveryTime);
        }
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    // 点击弹出修改弹框
    update(row) {
      console.log(row);
      // 拷贝
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogFormVisible = true;
    },
    // 确定更改当前订单
    updateOrder() {
      this.form.deliveryTime = ChinaTime(this.form.deliveryTime);
      // 发送请求
      edit_api(this.form).then((res) => {
        if (res.status == 200) {
          this.$message({
            type: "success",
            message: "订单修改成功!",
          });
          this.dialogFormVisible = false;
          this.changeDate();
        }
      });
    },
    // 查看详情
    handleClick(row) {
      console.log(row.id);
      // 显示弹框
      this.dialogVisible = true;
      // 发送请求
      detail_api({ params: { id: row.id } }).then((res) => {
        //  时间转化
        res.data.data.orderTime = ChinaTime(res.data.data.orderTime);
        res.data.data.deliveryTime = ChinaTime(res.data.data.deliveryTime);
        this.form = res.data.data;
      });
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
    // 查询功能按钮
    searchBtn() {
      // 弹出模态框
      // console.log(this.search);
      this.form=this.search
      this.changeDate()
    },
  },
  created() {
    this.changeDate();
  },
};
</script>

<style lang="less" scoped>
.container {
  background-color: #fff;
  .top {
    margin-left: 10px;
    margin-bottom: 10px;
  }
  .bottom {
    margin: 10px 0;
  }
  .details {
    div {
      margin-bottom: 10px;
      span:first-child {
        text-align: right;
        display: inline-block;
        width: 80px;
        margin-right: 20px;
      }
    }
  }
}
</style>