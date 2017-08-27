<template>
  <div class="tmpl">
    <nav-bar title="购物车"></nav-bar>
    <div class="pay-detail">
      <ul>
        <li v-for="(goods,index) in goodsList" :key="goods.id" class="p-list">
          <mt-switch v-model="goods.isChecked"></mt-switch>
          <img :src="goods.thumb_path">
          <div class="pay-calc">
            <p v-text="goods.title"></p>
            <div class="calc">
              <span>￥{{goods.sell_price}}</span>
              <span @click="sub(goods)">-</span>
              <span>{{goods.num}}</span>
              <span @click="add(goods)">+</span>
              <a href="javascript:;" @click="del(index)">删除</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="show-price">
      <div class="show-1">
        <p>总计(不含运费):</p>
        <span>已经选择商品{{payment.count}}件，总价￥{{payment.totalPrice}}元</span>
      </div>
      <div class="show-2">
        <mt-button type="danger" size="large">去结算</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
    import GoodsTools from '../common/GoodsTools.js';
    //引入通知对象
    import Connector from '../common/Connector.js';
    export default {
        data(){
            return{
              goodsList:[],

            }
        },
        created(){
            let prods = GoodsTools.getProds();// {88:1,89:2}
            let ids = Object.keys(prods).join(',');
            let url = 'goods/getshopcarlist/'+ ids;

            if (ids == "") {
                return;
            }
            this.$ajax.get(url)
                .then(res=>{
                    this.goodsList = res.data.message;

                    //给元素添加属性，是否选中，true ，商品数量，通过prods赋值
                    this.goodsList.forEach(ele => {
                        //非法操作，vue不做双向数据绑定(该对象不是响应式)
                        // ele.isChecked = true;
                        // ele.num = prods[ele.id]; //数量
                        //vue中直接添加属性，不能响应式的,需要特定的函数
                        this.$set(ele,'isChecked',true);
                        this.$set(ele,'num',prods[ele.id]);
                    });


                })
                .catch(err=>{
                    console.log('购物车数据获取失败',err);
                })
        },
        methods:{
            add(obj){
                obj.num ++; //内存发生了改变，没有影响页面
            },
            sub(obj){
                obj.num --;
            },
            del(index){
                if(confirm('亲，您确定要删除吗？')){
                    this.goodsList.splice(index,1);
                }

            }
        },
        computed:{
            payment(){//不要使用箭头函数
                let count = 0;
                let totalPrice = 0;

                this.goodsList.forEach( ele => {
                    //判断是否选中
                    if(ele.isChecked){
                        //累加件数和总价
                        count += ele.num;
                        totalPrice += ele.sell_price * ele.num;
                    }
                });

                return {
                    count,totalPrice
                }
            }
        },
        beforeRouteLeave (to, from, next) {
            if(confirm('亲，确定要离开吗，这么好的商品')){
                let obj = {};
                //转换数据
                this.goodsList.forEach(ele=> obj[ele.id] = ele.num);

                //先保存数据
                GoodsTools.save(obj);

                //获取商品总数
                let sum = GoodsTools.getProdCount();

                //通知App.vue更改小球显示数量
                Connector.$emit('changeShopcart2',sum);

                //当前组件被App.vue使用,建议未来尽量少A组件改B组件
                // this.$parent.$data.num = sum;
                //放行
                next();

            }else{
                next(false);//取消导航行为
            }
        }
    }
</script>
<style></style>