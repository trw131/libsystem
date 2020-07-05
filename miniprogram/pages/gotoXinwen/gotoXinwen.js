// miniprogram/pages/gotoXinwen/gotoXinwen.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getxinwen:function(e){
    app.globalData.newsid=e.currentTarget.dataset.newsid;
    console.log(app.globalData.newsid)
    wx.navigateTo({
      url: '/pages/getXinwen/getXinwen'
    })
  },
  onPullDownRefresh: function () {
    this.clearCache();
    this.getXinwen();//第一次加载数据
  },
  addNews: function(){
    wx.navigateTo({
      url: '/pages/addNews/addNews',    
      })
  },
  getXinwen:function(){
    db.collection('Xinwen').limit(20).orderBy('time', 'desc').get({
      success: res=>{
        console.log(res)
        this.setData({
          news:res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('Xinwen').limit(20).orderBy('time', 'desc').get({
      success: res=>{
        console.log(res)
        this.setData({
          news:res.data
        })
      }
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