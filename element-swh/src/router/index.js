import Vue from 'vue'
import VueRouter from 'vue-router'

//组件
import home from '../components/home.vue';
import collection from '../components/collection/index.vue';
import message from '../components/message/index.vue';
import center from '../components/center/index.vue';
import xttz from '../components/xttz/xttz.vue';

Vue.use(VueRouter)

var router = new VueRouter({
    routes: [{
            //重定向
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: '首页',
            component: home
        },
        {
            path: '/collection',
            name: '图册收藏',
            component: collection
        },
        {
            path: '/message',
            name: '消息留言',
            component: message
        },
        {
            path: '/center',
            name: '数据中心',
            component: center
        },
        {
            path: '/xttz',
            name: '测试1',
            component: xttz
        }

    ]
});


// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
    if (to.path == '/home') {
        next();
    } else {
        let token = localStorage.getItem("landing");
        if (token === null || token === '') {
            alert('您还没有登录，请先登录');
            next('/home');
        } else {
            next();
        }
    }
});

export default router;