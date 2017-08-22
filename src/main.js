/**
 * Created by meeddy on 17/8/22.
 */
//引包
import Vue from 'vue';
//引组件 开始
import App from './App.vue';
import Home from './components/home/Home.vue';
//结束

import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI);

import MUI from './static/libs/mui-master/dist/css/mui.css';

import VueRouter from 'vue-router';
Vue.use(VueRouter);
let router = new VueRouter({
    routes: [
        {name:'home', path: '/home',component: Home}
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