<template>
  <el-container>
    <el-aside width="200px">
      <div class="head">
        <img :src="avatar" alt />
        <span>{{ name }}</span>
      </div>
      <el-menu
        router
        unique-opened
        :default-active="defaultPath"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
      >
        <!-- 导航菜单 -->
        <div v-for="(item, index) in nav" :key="index">
          <!-- 折叠菜单 -->
          <el-submenu :index="item.index" v-if="item.children">
            <!-- 大标题及图标 -->
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="child.index"
                v-for="child in item.children"
                :key="child.index"
              >
                <i :class="child.icon"></i>
                <span slot="title">{{ child.name }}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 一级菜单 -->
          <el-menu-item :index="item.index" v-else>
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="item in breadList" :key="item">{{
            item
          }}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="header-r">
          <div @click="loginBtn">{{ title }}</div>
          <img class="userImg" @click="header" :src="headerR" />
        </div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { token_api, accountinfo_api, shopInfo_api } from "../apis/apis";
export default {
  data() {
    return {
      defaultPath: "/nav/main", //默认hash
      breadList: [], //面包屑数组
      // 头像姓名
      name: "",
      avatar: "", //店铺头像
      // 右边姓名头像
      headerR: "",
      title: "您好,请登录",
      // 导航列表
      nav: [
        {
          index: "/nav/main",
          name: "后台首页",
          icon: "el-icon-setting",
          role: ["super", "normal"],
          bread: ["后台首页"],
        },
        {
          index: "/nav/order",
          name: "订单管理",
          icon: "el-icon-setting",
          role: ["super", "normal"],
          bread: ["订单管理"],
        },
        {
          index: "1",
          name: "商品管理",
          icon: "el-icon-setting",
          role: ["super"],
          children: [
            {
              index: "/nav/orderlist",
              name: "商品列表",
              icon: "el-icon-setting",
              bread: ["商品管理", "商品列表"],
            },
            {
              index: "/nav/orderadd",
              name: "商品添加",
              icon: "el-icon-setting",
              bread: ["商品管理", "商品添加"],
            },
            {
              index: "/nav/ordersort",
              name: "商品分类",
              icon: "el-icon-setting",
              bread: ["商品管理", "商品分类"],
            },
          ],
        },
        {
          index: "/nav/store",
          name: "店铺管理",
          icon: "el-icon-setting",
          role: ["super", "normal"],
          bread: ["首页"],
        },
        {
          index: "2",
          name: "账号管理",
          icon: "el-icon-setting",
          role: ["super"],
          children: [
            {
              index: "/nav/accountlist",
              name: "账号列表",
              icon: "el-icon-setting",
              bread: ["账号管理", "账号列表"],
            },
            {
              index: "/nav/accountadd",
              name: "添加账号",
              icon: "el-icon-setting",
              bread: ["账号管理", "添加账号"],
            },
            {
              index: "/nav/changepassword",
              name: "修改密码",
              icon: "el-icon-setting",
              bread: ["账号管理", "修改密码"],
            },
          ],
        },
        {
          index: "3",
          name: "销售统计",
          icon: "el-icon-setting",
          role: ["super"],
          children: [
            {
              index: "/nav/productstatistics",
              name: "商品统计",
              icon: "el-icon-setting",
              bread: ["销售统计", "商品统计"],
            },
            {
              index: "/nav/orderstatistics",
              name: "订单统计",
              icon: "el-icon-setting",
              bread: ["销售统计", "订单统计"],
            },
          ],
        },
      ],
    };
  },
  methods: {
    // 头像点击
    header() {
      this.$router.push("/nav/admin");
    },
    // 登录点击
    loginBtn() {
      if (this.title == "您好,请登录") {
        this.$router.push("/");
      }
    },
    // 菜单激活回调
    handleSelect(index) {
      for (let item of this.nav) {
        // 判断是否有二级
        if (item.children) {
          // 二级循环
          for (let child of item.children) {
            if (child.index == index) this.breadList = child.bread;
          }
        } else {
          // 一级
          if (item.index == index) this.breadList = item.bread;
        }
      }
    },
  },
  created() {
    this.defaultPath = this.$route.path;//默认路由
    this.handleSelect(this.defaultPath);//默认面包屑
    // 用户权限
    this.nav = this.nav.filter((obj) => obj.role.includes(localStorage.role));
    // 验证token是否过期
    token_api({ params: { token: localStorage.token } }).then((res) => {
      if (res.data.code == 0) {
        this.title = localStorage.name;
      } else {
        this.title = "您好,请登录";
      }
      // 获取店铺头像及名称
      shopInfo_api().then((res) => {
        this.avatar =
          "http://127.0.0.1:5000/upload/shop/" + res.data.data.avatar;
        this.name = res.data.data.name;
        console.log(this.avatar);
      });
    });
    // 获取用户信息
    accountinfo_api({ params: { id: localStorage.id } }).then((res) => {
      // 存到本地
      this.headerR = res.data.accountInfo.imgUrl;
      localStorage.account = res.data.accountInfo.account;
      localStorage.ctime = res.data.accountInfo.ctime;
      localStorage.userGroup = res.data.accountInfo.userGroup;
    });
    // 重新渲染用户头像
    this.$bus.on("updateImg", (newImg) => {
      let newUrl = this.headerR.substring(0, this.headerR.lastIndexOf("/") + 1);
      this.headerR = newUrl + newImg;
    });
  },
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header-r {
    display: flex;
    align-items: center;
    .userImg {
      width: 50px;
      border-radius: 50%;
    }
  }
}

.el-aside {
  background-color: #545c64;
  .el-menu {
    border: 0;
  }
  .head {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #fff;
    img {
      width: 50px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}

.el-main {
  background-color: #e9eef3;
}
</style>