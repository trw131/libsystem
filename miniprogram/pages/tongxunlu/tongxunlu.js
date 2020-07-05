// miniprogram/pages/tongxunlu/tongxunlu.js
const db = wx.cloud.database()



Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  copy:function(e){
    var $phone = e.currentTarget.dataset.phone
    console.log($phone)
    wx.setClipboardData({
      data:$phone,
      success: res=>{
        wx.showToast({
          icon:'success',
          title:'复制成功'
        })
      }
    })
  },


  onLoad: function (options) {
    db.collection('user').limit(200).orderBy('name', 'asc').get({
      success: res=>{
        console.log(res)
        this.setData({
          list:res.data
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