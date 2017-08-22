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
//结束

import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI);

import MUI from './static/libs/mui-master/dist/css/mui.css';

import VueRouter from 'vue-router';
Vue.use(VueRouter);
let router = new VueRouter({
    routes: [
        {path:'/',redirect:{name:'home'}},
        {name:'home', path: '/home',component: Home},
        {name:'vip', path: '/vip',component: Vip},
        {name:'shopcart', path: '/shopcart',component: Shopcart},
        {name:'search', path: '/search',component: Search}
    ]
})

import Axios from 'axios';
Vue.prototype.$ajax = Axios;
Axios.defaults.baseURL = 'http://182.254.146.100:8899/api/';

new Vue({
    el: '#app',
    router,
    render : c => c(App)
})