// miniprogram/pages/qiandao/qiandao.js

var util = require('../../util/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
     latitude:"",
     longitude:"",
     thisDate:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  qiandao: function(){
    var that = this;
   var thisDate = util.formatDate(new Date())
    console.log(thisDate)
    that.setData({
      thisDate:thisDate,
      name:app.globalData.name,
      class:app.globalData.class,
      phoneNumber:app.globalData.phoneNumber
    })


    const db = wx.cloud.database()
    db.collection('qiandao').add({
      data:that.data,
      success: res =>{
        console.log("success")
        wx.showToast({
          icon: 'success',
          title: '签到成功'
        })
        
      },
      fail: err =>{
        console.log(2+err)
      }
    })

  },
  onLoad: function (options) {
    var that=this
 wx.getLocation({
  type: 'wgs84',
  success: function (res) {
    var latitude= res.latitude
    var longitude= res.longitude
    console.log(latitude,longitude)
    that.setData({
      latitude: res.latitude,
      longitude: res.longitude,
    })
  },
})

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
      var  that = this;
      setInterval(function () {
      var time = util.formatTime(new Date())
      that.setData({
        time:time
      })
   }, 1000);  
  
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

  },
  getTime:function(){
    var that = this;
    var time = util.formatTime(new Date())
    this.setData({
      time:time
    })
  }





})
