const db=wx.cloud.database()
Page({

  data: {
    value: '',
    valueList: [],
    menuList:[]
  },
 async onLoad(){
       var result= await db.collection('menu').orderBy('views','desc').limit(3).get()
       console.log(result)
       this.setData({
         menuList:result.data
       })
  },
  onShow() {
    var m = wx.getStorageSync('value')
  console.log(m)
            this.setData({
              valueList:m
            })
  },
  goRecipeList() {
    var value = this.data.value
     var valueList=wx.getStorageSync('value')||[]
    var index= valueList.findIndex(item=>{
       return item==value
     })
     if(index!=-1){
               valueList.splice(index,1)
               valueList.unshift(value)
     }else{
     valueList.unshift(value)
     }
    console.log(valueList)
    wx.setStorageSync('value',valueList)
    wx.navigateTo({
      url: '../recipelist/recipelist?value=' + value,
    })
  },
  gosp(e) {
    console.log(e)
    var value = e.currentTarget.id
    wx.navigateTo({
      url: '../recipelist/recipelist?value=' + value,
    })
  },
  gosp2(e){
    console.log(e)
    var value = e.currentTarget.id
    wx.navigateTo({
      url: '../recipelist/recipelist?value=' + value,
    })
  }
})