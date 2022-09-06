import Vue from 'vue'
import Router from 'vue-router'
//数据总览index↓
import index from '../components/index/index'
//用户管理user↓
//普通用户
import ordinary from '../components/user/ordinary/ordinary'
import ordinarya from '../components/user/ordinarya/ordinarya'
import ordinaryb from '../components/user/ordinaryb/ordinaryb'
import ordinaryawei from '../components/user/ordinaryawei/ordinaryawei'
import ordinarybwei from '../components/user/ordinarybwei/ordinarybwei'
//合伙用户
import cooperation from '../components/user/cooperation/cooperation'
import cooperationa from '../components/user/cooperationa/cooperationa'
import cooperationb from '../components/user/cooperationb/cooperationb'
import cooperationawei from '../components/user/cooperationawei/cooperationawei'
import cooperationbwei from '../components/user/cooperationbwei/cooperationbwei'
//渠道列表
import channel from '../components/user/channel/channel'
import channelbj from '../components/user/channelbj/channelbj'
import channela from '../components/user/channela/channela'
//产品管理product↓
//银行产品
import product from '../components/product/product/product'
import producttj from '../components/product/producttj/producttj'
import productbj from '../components/product/productbj/productbj'
//银行标签
import bankbq from '../components/product/bankbq/bankbq'
import bankbqtj from '../components/product/bankbqtj/bankbqtj'
import bankbqbj from '../components/product/bankbqbj/bankbqbj'
//信用卡
import card from '../components/product/card/card'
import cardbj from '../components/product/cardbj/cardbj'
import cardtj from '../components/product/cardtj/cardtj'
//信用卡标签
import label from '../components/product/label/label'
import labeltj from '../components/product/labeltj/labeltj'
import labelbj from '../components/product/labelbj/labelbj'
//财务管理earnings↓
//收益报表
import earnings from '../components/earnings/earnings/earnings'
//提现管理
import mention from '../components/earnings/mention/mention'
//提现记录
import record from '../components/earnings/record/record'
//订单管理order↓
//办卡订单
import order from '../components/order/order/order'
//结算审核
import settlement from '../components/order/settlement/settlement'
//运营管理operating↓
//bannaer
import bannaer from '../components/operating/bannaer/bannaer'
import bannaertj from '../components/operating/bannaertj/bannaertj'
import bannaerbj from '../components/operating/bannaerbj/bannaerbj'
//活动弹框
import bounced from '../components/operating/bounced/bounced'
import bouncedtj from '../components/operating/bouncedtj/bouncedtj'
import bouncedbj from '../components/operating/bouncedbj/bouncedbj'
//文章管理article↓
//文章管理
import article from '../components/article/article/article'
import articletj from '../components/article/articletj/articletj'
import articlebj from '../components/article/articlebj/articlebj'
//常见问题
import problem from '../components/article/problem/problem'
import problemtj from '../components/article/problemtj/problemtj'
import problembj from '../components/article/problembj/problembj'
//通知管理
import notice from '../components/article/notice/notice'
import noticetj from '../components/article/noticetj/noticetj'
import noticebj from '../components/article/noticebj/noticebj'
//系统管理system↓
//后台账号
import system from '../components/system/system/system'
import systemtj from '../components/system/systemtj/systemtj'
import systembj from '../components/system/systembj/systembj'
//短信接口
import duanx from '../components/system/duanx/duanx'
//公总号配置
import gonzh from '../components/system/gonzh/gonzh'
//OSS配置
import osspz from '../components/system/osspz/osspz'
//网站配置
import appsez from '../components/system/appsez/appsez'
//APP配置
import wzpztm from '../components/system/wzpztm/wzpztm'
//云账号配置
import cloud from '../components/system/cloud/cloud'
//模板消息配置
import mobxi from '../components/system/mobxi/mobxi'
//淘宝客配置
import tbktm from '../components/system/tbktm/tbktm'
//渠道商规则设置
import rules from '../components/system/rules/rules'
import rulestj from '../components/system/rulestj/rulestj'
import rulesbj from '../components/system/rulesbj/rulesbj'
//积分管理integral↓
//商品管理
import integral from '../components/integral/integral/integral'
import integraltj from '../components/integral/integraltj/integraltj'
//兑换列表
import integralin from '../components/integral/integralin/integralin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      //重定向
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: '数据总览',
      component: index
    },
    {
      path: '/channel',
      name: '渠道列表',
      component: channel
    },
    {
      path: '/channelbj',
      name: '用户编辑',
      component: channelbj
    },
    {
      path: '/channela',
      name: '用户详情',
      component: channela
    },
    {
      path: '/cooperation',
      name: '合伙用户',
      component: cooperation
    },
    {
      path: '/ordinary',
      name: '普通用户',
      component: ordinary
      // meta:{keepAlive:true}
    },
    {
      path: '/ordinarya',
      name: '申卡详情',
      component: ordinarya
    },
    {
      path: '/ordinaryb',
      name: '申卡编辑',
      component: ordinaryb
    },
    {
      path: '/ordinaryawei',
      name: '未申卡详情',
      component: ordinaryawei
    },
    {
      path: '/ordinarybwei',
      name: '未申卡编辑',
      component: ordinarybwei
    },
    {
      path: '/cooperationa',
      name: '推广详情',
      component: cooperationa
    },
    {
      path: '/cooperationb',
      name: '推广编辑',
      component: cooperationb
    },
    {
      path: '/cooperationawei',
      name: '未推广详情',
      component: cooperationawei
    },
    {
      path: '/cooperationbwei',
      name: '未推广编辑',
      component: cooperationbwei
    },
    {
      path: '/bankbq',
      name: '银行标签',
      component: bankbq
    },
    {
      path: '/bankbqtj',
      name: '银行标签添加',
      component: bankbqtj
    },
    {
      path: '/bankbqbj',
      name: '银行标签编辑',
      component: bankbqbj
    },
    {
      path: '/product',
      name: '银行卡产品',
      component: product
    },
    {
      path: '/producttj',
      name: '银行卡添加',
      component: producttj
    },
    {
      path: '/productbj',
      name: '银行卡编辑',
      component: productbj
    },
    {
      path: '/card',
      name: '信用卡',
      component: card
    },
    {
      path: '/cardbj',
      name: '信用卡编辑',
      component: cardbj
    },
    {
      path: '/cardtj',
      name: '信用卡添加',
      component: cardtj
    },
    {
      path: '/label',
      name: '信用卡标签',
      component: label
    },
    {
      path: '/labeltj',
      name: '信用卡标签添加',
      component: labeltj
    },
    {
      path: '/labelbj',
      name: '信用卡标签编辑',
      component: labelbj
    },
    {
      path: '/earnings',
      name: '收益报表',
      component: earnings
    },
    {
      path: '/mention',
      name: '提现管理',
      component: mention
    },
    {
      path: '/record',
      name: '提现记录',
      component: record
    },
    {
      path: '/order',
      name: '办卡订单',
      component: order
    },
    {
      path: '/settlement',
      name: '结算审核',
      component: settlement
    },
    {
      path: '/bannaer',
      name: 'bannaer',
      component: bannaer
    },
    {
      path: '/bannaertj',
      name: 'bannaer添加',
      component: bannaertj
    },
    {
      path: '/bannaerbj',
      name: 'bannaer编辑',
      component: bannaerbj
    },
    {
      path: '/bounced',
      name: '活动弹框',
      component: bounced
    },
    {
      path: '/bouncedtj',
      name: '活动弹框添加',
      component: bouncedtj
    },
    {
      path: '/bouncedbj',
      name: '活动弹框编辑',
      component: bouncedbj
    },
    {
      path: '/article',
      name: '文章管理',
      component: article
    },
    {
      path: '/articletj',
      name: '文章管理添加',
      component: articletj
    },
    {
      path: '/articlebj',
      name: '文章管理编辑',
      component: articlebj
    },
    {
      path: '/problem',
      name: '常见问题',
      component: problem
    },
    {
      path: '/problemtj',
      name: '常见问题添加',
      component: problemtj
    },
    {
      path: '/problembj',
      name: '常见问题编辑',
      component: problembj
    },
    {
      path: '/notice',
      name: '通知管理',
      component: notice
    },
    {
      path: '/noticetj',
      name: '通知管理添加',
      component: noticetj
    },
    {
      path: '/noticebj',
      name: '通知管理编辑',
      component: noticebj
    },
    {
      path: '/system',
      name: '系统管理',
      component: system
    },
    {
      path: '/systemtj',
      name: '系统管理添加',
      component: systemtj
    },
    {
      path: '/systembj',
      name: '系统管理编辑',
      component: systembj
    },
    {
      path: '/duanx',
      name: '短信接口',
      component: duanx
    },
    {
      path: '/gonzh',
      name: '公众号配置',
      component: gonzh
    },
    {
      path: '/osspz',
      name: 'OSS配置',
      component: osspz
    },
    {
      path: '/appsez',
      name: 'APP配置',
      component: appsez
    },
    {
      path: '/wzpztm',
      name: '网站配置',
      component: wzpztm
    },
    {
      path: '/rules',
      name: '渠道商规则设置',
      component: rules
    },
    {
      path: '/rulestj',
      name: '渠道商规则添加',
      component: rulestj
    },
    {
      path: '/rulesbj',
      name: '渠道商规则编辑',
      component: rulesbj
    },
    {
      path: '/integral',
      name: '商品管理',
      component: integral
    },
    {
      path: '/integraltj',
      name: '商品管理添加',
      component: integraltj
    },
    {
      path: '/integralin',
      name: '兑换列表',
      component: integralin
    },
    {
      path: '/cloud',
      name: '云账号配置',
      component: cloud
    },
    {
      path: '/mobxi',
      name: '模板消息配置',
      component: mobxi
    },
    {
      path: '/tbktm',
      name: '淘宝客配置',
      component: tbktm
    }

  ]
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
// router.beforeEach((to, from, next) => {
//   if (to.path == '/home') {
//       next();
//   } else {
//       let token = localStorage.getItem("landing");
//       if (token === null || token === '') {
//           alert('您还没有登录，请先登录');
//           next('/home');
//       } else {
//           next();
//       }
//   }
// });