/**
 * Created by meeddy on 17/8/22.
 */
//引包
import Vue from 'vue';
//引组件 开始
import App from './App.vue';
import Home from './components/home/Home.vue';
import Vip from './components/vip/Vip.vue';
import Shopcart from './components/shopcart/Shopcart.vue';
import Search from './components/search/Search.vue';
import News from './components/news/NewsList.vue';
import Newsdetail from './components/news/NewsDetail.vue';
import Photolist from './components/photo/PhotoList.vue';
import Photodetail from './components/photo/PhotoDetail.vue';
import Goodslist from './components/goods/GoodsList.vue';
import GoodsDetails from './components/goods/GoodsDetails.vue';
import NotFound from './components/common/NotFound.vue';
import GoodsComment from './components/goods/GoodsComment.vue';


//结束

//全局组件
import NavBar from './components/common/NavBar.vue';
import Comment from './components/common/Comment.vue';
import MySwipe from './components/common/MySwipe.vue';

Vue.component('NavBar',NavBar);
Vue.component('Comment',Comment);
Vue.component('MySwipe',MySwipe);

//过滤器
import Moment from 'moment'
Vue.filter('convertDate',function (value) {
    return Moment(value).format('YYYY-MM-DD');
})

import VuePreview from 'vue-preview';
Vue.use(VuePreview);

import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI);

import MUI from './static/libs/mui-master/dist/css/mui.css';

import './static/css/global.css';

import VueRouter from 'vue-router';
Vue.use(VueRouter);
let router = new VueRouter({
    linkActiveClass:'mui-active',
    routes: [
        {path:'/',redirect:{name:'home'}},
        {name:'home', path: '/home',component: Home},
        {name:'vip', path: '/vip',component: Vip},
        {name:'shopcart', path: '/shopcart',component: Shopcart},
        {name:'search', path: '/search',component: Search},
        {name:'news.list', path:'/news/list',component: News},
        {name:'news.detail',path:'/news/detail',component:Newsdetail},
        {name:'photo.list',path:'/photo/list',component:Photolist},
        {name:'photo.detail',path:'/photo/detail',component:Photodetail},
        {name:'goods.list',path:'/goods/list',component:Goodslist},
        {name:'goods.detail',path:'/goods/detail/:goodsId',component:GoodsDetails},
        {name:'goods.comment',path:'/goods/comment',component:GoodsComment},
        {name:'goods.photodetail',path:'/goods/photo/detail',component:Newsdetail},


        {path:'*',component:NotFound},


    ]
})

import Axios from 'axios';
Vue.prototype.$ajax = Axios;
Axios.defaults.baseURL = 'http://182.254.146.100:8899/api/';

//设置拦截器
Axios.interceptors.request.use(config=>{
    MintUI.Indicator.open({
        text:'加载中...',
        spinnerType:'fading-circle'
    });
    return config;
});

Axios.interceptors.response.use(response=>{
    MintUI.Indicator.close();
    return response;

})

new Vue({
    el: '#app',
    router,
    render : c => c(App)
})