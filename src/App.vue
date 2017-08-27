<template>
      <div>
        <mt-header title="信息管理系统" ref="n1"></mt-header>
        <transition name="main" mode="out-in">
          <router-view></router-view>
        </transition>
        <nav class="mui-bar mui-bar-tab" ref="n2">
          <router-link :to="{name:'home'}" class="mui-tab-item" href="#tabbar">
            <span class="mui-icon icon-home"></span>
            <span class="mui-tab-label">首页</span>
          </router-link>
          <router-link :to="{name:'vip'}" class="mui-tab-item" href="#tabbar-with-chat">
            <span class="mui-icon icon-vip"></span>
            <span class="mui-tab-label">VIP</span>
          </router-link>
          <router-link :to="{name:'shopcart'}"class="mui-tab-item" href="#tabbar-with-contact">
            <span class="mui-icon icon-gouwuche-copy"><span class="mui-badge">{{num}}</span></span>
            <span class="mui-tab-label">购物车</span>
          </router-link>
          <router-link :to="{name:'search'}" class="mui-tab-item" href="#tabbar-with-map">
            <span class="mui-icon icon-16pxsousuo"></span>
            <span class="mui-tab-label">搜索</span>
          </router-link>
        </nav>
      </div>
</template>
<script>
  import Connector from './components/common/Connector.js';
  import GoodsTools from './components/common/GoodsTools.js';

  export default{
      data(){
          return{
              num: GoodsTools.getProdCount(),
          }
      },
      created(){
          Connector.$on('changeShopcart',(num)=>{
              this.num += num;
          })
          Connector.$on('changeShopcart2',(num)=>{
              this.num = num;
          });
      }
  }
</script>
<style scoped>
  .main-enter-active, .main-leave-active {
    transition: opacity .5s
  }
  .main-enter, .main-leave-to  {
    opacity: 0
  }
</style>