<template>
  <div class="container">
    <div>管理员信息</div>
    <div><span>用户ID:</span><span>{{ id }}</span></div>
    <div><span>账号:</span><span>{{ account }}</span></div>
    <div><span>用户组:</span><span>{{ userGroup }}</span></div>
    <div><span>创建时间:</span><span>{{ ctime }}</span></div>
    <div><span>管理员头像:</span><img :src="imgUrl"></div>  
  </div>
</template>

<script>
import { accountinfo_api } from '../../apis/apis'
export default {
  data() {
    return {
        id: sessionStorage.getItem('id'),
        account: 0,
        userGroup: "",
        ctime: "",
        imgUrl: "",
    };
  },
  methods: {

  },
  created(){
    let {id}=this
    accountinfo_api({params:{id}}).then(res=>{
      let {ctime,account,userGroup,imgUrl}=res.data.accountInfo
      let date = new Date(ctime)
      this.ctime=date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate();
      this.account=account
      this.userGroup=userGroup
      this.imgUrl=imgUrl
    })
  }
};
</script>

<style lang="less" scoped>
.container {
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
  div{
    line-height: 50px;
    margin-left: 10px;
    border-bottom: 1px solid #EBEEF5;
    color: #606266;
  }
  div:last-child{
    border: 0;
    display: flex;
    img{
      width: 80px;
    }
  }
}
</style>