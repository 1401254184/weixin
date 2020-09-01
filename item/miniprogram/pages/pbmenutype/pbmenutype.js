const db = wx.cloud.database()
import {
  get,
  getById,
  add,
  upload,
  del
} from '../../utils/db'
Page({
  data: {
    isAdd: false,
    typelist: [],
    isUpload: false,
    typeName: '',
    typeid: ''
  },
  //刚进页面渲染
  async onLoad() {
    var result = await get('menuType')
    this.setData({
      typelist: result.data,
    })
  },
  fladd() {
    this.setData({
      isAdd: true
    })
  },
  // 添加
  async add(e) {

    var typeName = e.detail.value.typeName
    await add('menuType', {
      typeName: typeName
    })
    var result = await get('menuType')
    // console.log(result)
    this.setData({
      typelist: result.data,
      isAdd: false
    })

  },

  async upload(e) {
    console.log(e)
    var id = e.currentTarget.id
    var result = await getById('menuType', id)
    console.log(result)
    //  return
    this.data.typeid = id;
    this.setData({
      typeName: result.data.typeName,
      isUpload: true
    })


  },
  // 修改
  async uploadtp(e) {
    var typeName = e.detail.value.typeName
    await upload('menuType', this.data.typeid, {
      typeName
    })
    //  修改完成重新渲染
    var result = await get('menuType')
    wx.showToast({
      title: '修改成功',
    })
    this.setData({
      typelist: result.data,
      isUpload: false
    })

  },
  // 删除
   del(e) {
    var id = e.currentTarget.id

    wx.showModal({
      title: '提示',
      content: '你确定要删除吗',
      success:async res =>{
        if (res.confirm) {
            await del('menuType', id)
         var result = await get('menuType') 
         console.log(result)
         this.setData({
            typelist: result.data,
           })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

   

    //  删除完成重新渲染
    

   

  }

})