<template>
  <el-card class="container">
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
            <el-button
              @click="handleClick(scope.row), (dialogVisible = true)"
              type="text"
              size="small"
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
      <div>
        <span>收货人:</span><span> {{ consignee }}</span>
      </div>
      <div>
        <span>联系电话:</span><span> {{ phone }}</span>
      </div>
      <div>
        <span>订单号:</span><span> {{ orderNo }}</span>
      </div>
      <div>
        <span>下单时间:</span><span> {{ orderTime }}</span>
      </div>
      <div>
        <span>送货地址:</span><span> {{ deliverAddress }}</span>
      </div>
      <div>
        <span>送达时间:</span><span> {{ deliveryTime }}</span>
      </div>
      <div>
        <span>备注:</span><span> {{ remarks }}</span>
      </div>
      <div>
        <span>订单金额:</span><span> {{ orderAmount }}</span>
      </div>
      <div>
        <span>订单状态:</span><span> {{ orderState }}</span>
      </div>
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
      width="500px"
    >
      <el-form label-width="80px">
        <el-form-item label="收货人:">
          <el-input v-model="consignee" clearable></el-input>
        </el-form-item>
        <el-form-item label="电话:">
          <el-input v-model="phone" clearable></el-input>
        </el-form-item>
        <el-form-item label="送货地址:">
          <el-input v-model="deliverAddress" clearable></el-input>
        </el-form-item>
        <el-form-item label="送达时间:">
          <el-input v-model="deliveryTime" clearable></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input v-model="remarks" clearable></el-input>
        </el-form-item>
        <el-form-item label="订单状态:">
          <el-input v-model="orderState" clearable></el-input>
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
import { orderList_api, detail_api } from "../../apis/apis";
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      currentPage: 1,
      pageSize: 4,
      tableData: [],
      total: 1, //总条数
      id: 0,
      orderNo: "",
      orderTime: "",
      phone: "",
      consignee: "",
      deliverAddress: "",
      deliveryTime: "",
      remarks: "",
      orderAmount: "",
      orderState: "",
      dialogVisible: false,
      dialogFormVisible: false,
    };
  },
  methods: {
    changeDate() {
      let { currentPage, pageSize } = this;
      orderList_api({ params: { currentPage, pageSize } }).then((res) => {
        //  时间转化
        for (const item of res.data.data) {
          let date = new Date(item.orderTime);
          item.orderTime =
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
        for (const item of res.data.data) {
          let date = new Date(item.deliveryTime);
          item.deliveryTime =
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
        this.total = res.data.total;
      });
    },
    repairZero(time) {
      return time < 10 ? "0" + time : time;
    },
    // 点击弹出修改弹框
    update(row) {
      console.log(row);
      this.dialogFormVisible = true;
    },
    // 确定更改当前订单
    updateOrder() {},
    // 查看
    handleClick(row) {
      // console.log(row);
      this.id = row.id;
      detail_api({ params: { id: this.id } }).then((res) => {
        //  时间转化
        let date = new Date(res.data.data.orderTime);
        res.data.data.orderTime =
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
        //  时间转化
        let delivery = new Date(res.data.data.deliveryTime);
        res.data.data.deliveryTime =
          delivery.getFullYear() +
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
        let {
          orderNo,
          orderTime,
          phone,
          consignee,
          deliverAddress,
          deliveryTime,
          remarks,
          orderAmount,
          orderState,
        } = res.data.data;
        (this.orderNo = orderNo),
          (this.orderTime = orderTime),
          (this.phone = phone),
          (this.consignee = consignee),
          (this.deliverAddress = deliverAddress),
          (this.deliveryTime = deliveryTime),
          (this.remarks = remarks),
          (this.orderAmount = orderAmount),
          (this.orderState = orderState);
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
    margin: 10px 0;
  }
  .details {
    div {
      margin-bottom: 10px;
      span:first-child {
        text-align: right;
        display: inline-block;
        width: 100px;
        margin-right: 20px;
      }
    }
  }
}
</style>