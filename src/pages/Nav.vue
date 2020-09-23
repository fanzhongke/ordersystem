<template>
  <el-container>
    <el-aside width="200px">
      <div class="head">
        <img :src="head.src" alt />
        <span>{{head.name}}</span>
      </div>
      <el-menu
        router
        unique-opened
        :default-active="this.$route.path"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <!-- 导航菜单 -->
        <div v-for="(item,index) in nav" :key="index">
          <!-- 折叠菜单 -->
          <el-submenu :index="item.index" v-if="item.children">
            <!-- 大标题及图标 -->
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="child.index" v-for="child in item.children" :key="child.index">
                <i :class="child.icon"></i>
                <span slot="title">{{child.name}}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 一级菜单 -->
          <el-menu-item :index="item.index" v-else>
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="header-r">
          <div>{{username}}</div>
          <router-link to='/nav/admin'><img :src="headerR.src"></router-link>
        </div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 头像姓名
      head: { name: "美团外卖", src: require("../assets/images/head.png") },
      // 右边姓名头像
      headerR:{src:require('../assets/images/head.png')},
      username:'',
      // 导航列表
      nav: [
        { index: "/nav/main", name: "后台首页", icon: "el-icon-setting" },
        { index: "/nav/order", name: "订单管理", icon: "el-icon-setting" },
        {
          index: "1",
          name: "商品管理",
          icon: "el-icon-setting",
          children: [
            {
              index: "/nav/orderlist",
              name: "商品列表",
              icon: "el-icon-setting",
            },
            {
              index: "/nav/orderadd",
              name: "商品添加",
              icon: "el-icon-setting",
            },
            {
              index: "/nav/ordersort",
              name: "商品分类",
              icon: "el-icon-setting",
            },
          ],
        },
        { index: "/nav/store", name: "店铺管理", icon: "el-icon-setting" },
        {
          index: "2",
          name: "账号管理",
          icon: "el-icon-setting",
          children: [
            {
              index: "/nav/accountlist",
              name: "账号列表",
              icon: "el-icon-setting",
            },
            {
              index: "/nav/accountadd",
              name: "添加账号",
              icon: "el-icon-setting",
            },
            {
              index: "/nav/changepassword",
              name: "修改密码",
              icon: "el-icon-setting",
            },
          ],
        },
        {
          index: "3",
          name: "销售统计",
          icon: "el-icon-setting",
          children: [
            {
              index: "/nav/productstatistics",
              name: "商品统计",
              icon: "el-icon-setting",
            },
            {
              index: "/nav/orderstatistics",
              name: "订单统计",
              icon: "el-icon-setting",
            },
          ],
        },
      ],
    };
  },
  created(){
    let username = sessionStorage.getItem('name');
    this.username=username;
  }
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
  .header-r{
    display: flex;
    align-items: center;
    img{
      width: 40px;
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
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #fff;
    img {
      width: 50px;
    }
  }
}

.el-main {
  background-color: #e9eef3;
}
</style>