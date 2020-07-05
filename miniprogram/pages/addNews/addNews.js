// miniprogram/pages/addNews/addNews.js
const app = getApp()
const db = wx.cloud.database()
var util = require('../../util/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  formSubmit:function(e){
    var that = this;
    
    var formData = e.detail.value;
    if(formData.name==""||formData.context==""){
      Wx.showToast({
        icon:"fail",
        title:'请检查防止漏填'
      })
    }else{
      db.collection('Xinwen').add({
        data:{
          title:formData.title,
          context:formData.context,
          name:app.globalData.name,
          time:util.formatDate(new Date())
        },
        success: res=>{
          console.log("success")
          wx.showToast({
            title: '提交成功',
          })
          wx.navigateBack()
        }
      })
    }
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