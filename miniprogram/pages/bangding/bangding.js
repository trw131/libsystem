// miniprogram/pages/bangding/bangding.js
const app = getApp()



Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    phoneNumber:'',
    class:'',
    classId:'',
    lab:'',
    buttonclick:false,
  },
  formSubmit:function(e){
    var that = this;
    
    var formData = e.detail.value;
    if(formData.name==""||formData.phoneNumber==""||formData.class==""||formData.classId==""||formData.lab==""){
       wx.showToast({
         icon:"none",
        title: '请检查表单防止漏填',
      })
    } else{
      if(that.data.buttonclick==false){
        const db = wx.cloud.database()
     db.collection('user').add({
       data:formData,
       success: res => {
          that.setData({
          counterId: res._id,
          count: 1,
          buttonclick:true
        }) 
            console.log(formData)
            app.globalData.name = formData.name;
            app.globalData.class = formData.class;
            app.globalData.classId = formData.classId;
            app.globalData.lab = formData.lab;
            app.globalData.phoneNumber = formData.phoneNumber;
         console.log("success")      
         wx.showToast({
           title: '新增记录成功',
         })
         console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
         
         
       },
       fail: err => {
         wx.showToast({
           icon: 'none',
           title: '请联系管理员'
         })
         console.error('[数据库] [新增记录] 失败：', err)
       }
     })
     }else{
       wx.showToast({
         title: '请勿重复添加',
       })
     }
    }
    
  
  },
  onAdd: function () {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})