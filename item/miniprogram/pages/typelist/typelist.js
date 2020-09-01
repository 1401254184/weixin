import{get}from '../../utils/db'
Page({
  data:{
    typeList:[]
  },
 async onLoad(){
  
  var result=await get('menuType')
  this.setData({
    typeList:result.data
  })
  },
  goRecipelist(e){
    console.log(e)
    var id=e.currentTarget.id
    wx.navigateTo({
      url: '../recipelist/recipelist?id='+id,
    })

  }
})