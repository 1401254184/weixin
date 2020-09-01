import{get,add}from '../../utils/db'
import{multiUpload}from'../../utils/tools'
  var app=getApp()
Page({
    data:{
         typeList:[],
         files:[]
    },
async  onLoad(){
  var openid=app.globalData.openid
  var result=await get('menuType')
  console.log(result)
  this.setData({
  typeList:result.data
  }
  )
},
   bindselect(e){
     console.log(e)
     var tempFilePaths=e.detail.tempFilePaths
     var files=tempFilePaths.map(item=>{
       return{
         url:item
       }
     })
     this.setData({
      files
     })
   },
async  fbcd(e){
   console.log(e)
   wx.showLoading({
    title: '添加中',
  })
   var arr=[]
   var fileIds=[]
      this.data.files.forEach(item=>{
          var nowTime=new Date().getTime()
          var ext=item.url.split('.').pop() 
         
     var promise= wx.cloud.uploadFile({
             cloudPath:nowTime+'.'+ext ,
              filePath:item.url
          })
          arr.push(promise)
      })
      var result=await Promise.all(arr)
      // console.log(result)
      result.forEach(item=>{
        fileIds.push(item.fileID)
      })
      // console.log(fileIds)
      var views=parseInt(Math.random()*100)
  var data={
    menuName:e.detail.value.menuName,
     typeId:e.detail.value.typeId,
     desc:e.detail.value.desc,
     fileIds,
     nickName:app.globalData.userInfo.nickName,
     avatarUrl:app.globalData.userInfo.avatarUrl,
     follows:0,
       views,
      addTime:new Date().getTime()
   }
   await  add('menu',data)
   wx.hideLoading()
   wx.reLaunch({
     url: '../personal/personal',
   })
  // 
   }
})