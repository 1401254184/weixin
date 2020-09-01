 import {
   getById,
   get,
   add,
   del,
   upload
 } from '../../utils/db'
 const app = getApp()  
 const db=wx.cloud.database()
 const _ = db.command
 Page({
   data: {
     menuDetail: {},
     showFollow: false,
     followId:''
   },
   async onLoad(e) {
    var openid = app.globalData.openid
     console.log(e)
     var id = e.id
     var result = await getById('menu', id)
     console.log(result)
        var follow=await get('follow',{_openid:openid})
    
          var flag=follow.data.filter(item=>{
            return  item.menuId==id
          })
          console.log(flag)
          if(flag.length!=0){
           
            this.setData({
              followId:flag[0]._id,
              menuDetail: result.data,
              showFollow: true
            })
          }else{
            this.setData({
              menuDetail: result.data,
              showFollow: false
            })
          }
    
       
   },
  //  添加关注
   async getFollow(e) {
    var openid = app.globalData.openid
  var id = e.currentTarget.id
   var m=   await add('follow',{menuId:id})
   console.log(m)

    await  db.collection('menu').doc(id).update({
      data:{
        follows:_.inc(1)
      }
    })

   var result = await getById('menu', id)
    
    var follow=await get('follow',{_openid:openid})
    var flag=follow.data.filter(item=>{
      return  item.menuId==id
    })
    wx.showToast({
      title: '已关注',
    })
      this.setData({
        followId:flag[0]._id,
        menuDetail: result.data,
        showFollow: true
      })
    
   },
async delFollow(e){
  var eid=e.currentTarget.id

    await del('follow',this.data.followId)
  
     await  db.collection('menu').doc(eid).update({
      data:{
        follows:_.inc(-1)
      }
    })   
    var result = await getById('menu', eid)
     wx.showToast({
      title: '已取消关注',
    })
      this.setData({
       menuDetail: result.data,
        showFollow: false
      })
   }
 })