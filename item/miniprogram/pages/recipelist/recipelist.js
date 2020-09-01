import{get}from '../../utils/db'
Page({
data:{
  recipeList:[]
},
async onLoad(e){
//  判断传的是id还是value
 if(e.value){
   var result=await  get('menu')
 var newList= result.data.filter(item=>{
    return  item.menuName.indexOf(e.value)!=-1
  })
this.setData({
  recipeList:newList
})}else{
var id=e.id
var result=await  get('menu',{typeId:id})
console.log(result)
   this.setData({
     recipeList:result.data
   })
}
},
// 跳转详情页面
goDetail(e){
  console.log(e)
  var id=e.currentTarget.id
  wx.navigateTo({
    url: '../recipeDetail/recipeDetail?id='+id,
  })
}


})