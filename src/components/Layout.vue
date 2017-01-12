<template>
  <el-row class="panel">
    <el-col :span="24" class="panel-top">
      <el-col :span="20" style="font-size:26px;">
        <span style="padding-left:20px;">XXX<i style="color:#20a0ff">管理后台</i></span>
      </el-col>
      <el-col :span="4">
        <el-tooltip class="item tip-logout" effect="dark" content="退出" placement="bottom" style="padding:0px;">
          admin <i class="fa fa-sign-out" aria-hidden="true" v-on:click="logout"></i>
        </el-tooltip>
      </el-col>
    </el-col>
    <el-col :span="24" class="panel-center">
      <!--<el-col :span="4">-->
      <aside style="width:180px;">
        <el-menu theme="dark" :router="true" :unique-opened="true" :default-active="currentRoute">
          <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
            <el-submenu :index="index+''" v-if="!item.leaf">
              <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
              <el-menu-item v-for="child in item.children" :index="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
          </template>
        </el-menu>
      </aside>
      <!--</el-col>-->
      <!--<el-col :span="20" class="panel-c-c">-->
      <section class="panel-c-c">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" style="margin-bottom:15px;">
            <strong style="width:200px;float:left;color: #475669;">{{currentPathName}}</strong>
            <el-breadcrumb separator="/" style="float:right;" v-if="currentRoute!='/'">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item v-if="currentPathName!=''">{{currentPathName}}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="24" style="background-color:#fff;box-sizing: border-box; padding: 20px 10px;">
            <!--<transition name="fade">-->
            <slot></slot>
            <!--</transition>-->
          </el-col>
        </div>
      </section>
      <!--</el-col>-->
    </el-col>
  </el-row>
</template>
<script>
  export default {
    name: 'p-layout',

    data() {
      return {
        currentPathName: this.$router.history.current.name,
        currentRoute: this.$router.history.current.fullPath,
      }
    },
    watch: {
      '$route' (to, from) { //监听路由改变
        this.currentPathName = to.name;
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleopen() {
        //console.log('handleopen');
      },
      handleclose() {
        //console.log('handleclose');
      },
      handleselect: function (a, b) {},
      //退出登录
      logout: function () {
        var _this = this;
        this.$confirm('确认退出吗?', '提示', {
          //type: 'warning'
        }).then(() => {
          _this.$router.replace('/Login');
        }).catch(() => {

        });

      }
    }
  }

</script>
<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s
  }
  
  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
  
  .panel {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
  }
  
  .panel-top {
    height: 60px;
    line-height: 60px;
    background: #1F2D3D;
    color: #c0ccda;
  }
  
  .panel-center {
    background: #324057;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
  }
  
  .panel-c-c {
    background: #f1f2f7;
    position: absolute;
    right: 0px;
    top: 0px;
    bottom: 0px;
    left: 180px;
    overflow-y: scroll;
    padding: 20px;
  }
  
  .logout {
    background-size: contain;
    width: 20px;
    height: 20px;
    float: left;
  }
  
  .logo {
    width: 40px;
    float: left;
    margin: 10px 10px 10px 18px;
  }
  
  .tip-logout {
    float: right;
    margin-right: 20px;
    padding-top: 5px;
  }
  
  .tip-logout i {
    cursor: pointer;
  }
  
  .admin {
    color: #c0ccda;
    text-align: center;
  }

</style>
