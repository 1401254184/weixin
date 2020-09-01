import {get}from '../../utils/db'
const db=wx.cloud.database()
Page({
    data:{
        menu:[],
        value:'',
        page:0,
        pageSize:10
    },
 onLoad(){
    let{page,pageSize}=this.data
    this.getPage(page,pageSize)
    },
// onShow(){
//   let{page,pageSize}=this.data
//   this.getPage(page,pageSize)
//     },
onReachBottom(){
 
          this.data.page+=1
          var pageSize=this.data.pageSize
          this.getPage(this.data.page,pageSize)  
          
},

async getPage(page,pageSize){
  wx.showLoading({
    title: '加载中',
  })
    var result=await  db.collection('menu').skip(page*pageSize).limit(pageSize).get()
    wx.hideLoading()
     this.setData({
      menu: this.data.menu.concat(result.data)  
  })
},
    goDetail(e){
        console.log(e)
        var id=e.currentTarget.id
        wx.navigateTo({
          url: '../recipeDetail/recipeDetail?id='+id,
        })
    },
    goRecipeList(){
        var value=this.data.value
          wx.navigateTo({
            url: '../recipelist/recipelist?value='+value,
          })
    },
    goTypeList(){
      wx.navigateTo({
        url: '../typelist/typelist',
      })
    }
})