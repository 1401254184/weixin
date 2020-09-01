const app = getApp()
const db=wx.cloud.database()

import {
  get,
  del,
  delF
} from '../../utils/db'
Page({
  data: {
    isLogin: false,
    userInfo: {},
    list: ['菜单', '分类', '关注'],
    active: 0,
    openid: '',
    typeList: [],
    menu: [],
    followList: []
  },
  async onLoad() {
    console.log(app)
    if (app.globalData.userInfo != null) {
      this.setData({
        userInfo: app.globalData.userInfo,
        isLogin: true
      })
    } else {
      app.userInfoReadyCallback = res => {
        // console.log(res)
        this.setData({
          userInfo: res.userInfo,
          isLogin: true
        })
      }
    }
    if (app.globalData.openid != null) {
      this.data.openid = app.globalData.openid
    } else {
      app.openidReadyCallback = res => {

        this.data.openid = res.result

      }
    }
  // // 获取菜谱分类
  //   var result1 = await get('menuType', {
  //     _openid: this.data.openid
  //   })
  //   // 获取菜谱列表
  //   var result2 = await get('menu', {
  //     _openid: this.data.openid
  //   })
  //   var result3 = await get('follow', {
  //     _openid: this.data.openid
  //   })

  //   this.setData({
  //     typeList: result1.data,
  //     menu: result2.data,
  //     followList:result3.data
  //   })
  },
  // 
  async onShow() {
    var result1 = await get('menuType')
    var result2 = await get('menu', {
      _openid: this.data.openid
    })
    var result3 = await get('follow', {
      _openid: this.data.openid
    }) 
    var arr=result3.data.map(item=>{
         return item.menuId
    })
  var followList=await db.collection('menu').where({
    _id:db.command.in(arr)
  }).get()
  console.log(followList)
    this.setData({
      typeList: result1.data,
      menu: result2.data,
      followList:followList.data

    })
  },
  active(e) {
    // console.log(e)
    this.setData({
      active: e.currentTarget.id
    })
  },
  // 跳转菜谱添加
  pbmenu() {
    wx.navigateTo({
      url: '/pages/pbmenu/pbmenu',
    })
  },
  // 跳转分类添加
  fbcpfl() {
    wx.navigateTo({
      url: '/pages/pbmenutype/pbmenutype',
    })
  },
  getUser(e) {
    //   console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      isLogin: true
    })
  },
  // 删除菜谱
  async delCdlb(e) {
    console.log(e)
    var id = e.currentTarget.id
    wx.showModal({
      title: '提示',
      content: '你确定要删除吗',
      success: async res => {
        if (res.confirm) {
          await del('menu', id)
          var result = await get('menu')
          await delF('follow',{menuId:id})

          var arr=result3.data.map(item=>{
            return item.menuId
       })
     var followList=await db.collection('menu').where({
       _id:db.command.in(arr)
     }).get()


          console.log(result)
          this.setData({
            menu: result.data,
            followList:followList.data
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 跳转详情
  goDetail(e){
    console.log(e)
    var id=e.currentTarget.id
    console.log(id)
    wx.navigateTo({
      url: '../recipeDetail/recipeDetail?id='+id,
    })
  }
})