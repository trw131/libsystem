// miniprogram/pages/cangku/cangku.js
  
const db = wx.cloud.database()
const app = getApp()
var util = require('../../util/util.js');
var thisDate = util.formatDate(new Date());
Page({

/**
 * 页面的初始数据
 */
data: {
  checked:0
},
addsort:function(e){
  wx.showToast({
    title:"敬请期待"
  })
},
HuBscore:function(){
wx.navigateTo({

    url: '/pages/HUBscore/HUBscore',    

})
},
sliderchange:function(e){
  var that= this;
  var $remain=e.currentTarget.dataset.remain;
  var slider = e.detail.value;
  var $device1 = e.currentTarget.dataset.device;
  var $doc=e.currentTarget.dataset.doc
  console.log($doc)
  if(this.data.checked==0){
  if($remain-slider>=0){
    wx.showModal({
      title:'提示',
      content:$device1+"*"+slider+"个是否提交？",
      success: res =>{
        wx.cloud.callFunction({
          // 云函数名称
          name: 'changeremain',
          // 传给云函数的参数
          data: {
            id:$doc,
            remain:$remain+slider
          },
          success: function (res) {
            wx.showToast({
              icon:'success',
              title:'提交成功！'
              
            })
            db.collection('HUBscore').add({
              data:{
                name:app.globalData.name,
                class:app.globalData.class,
                phoneNumber:app.globalData.phoneNumber,
                device:$device1+"*"+slider,
                time:thisDate,
                
              },
              success: res =>{
                that.setData({
                  checked:1
                })
               
              }
            })
          },
          fail: console.error
        })
    //     db.collection('HUB').doc($doc).update({
    //       data:{
    //         remain:$remain-slider
    //       },
    //       success: res=>{
    //         console.log("提交成功")
    //         console.log(res)
    //       }
    //   }
    // )
    }
  })
}else{
  wx.showModal({
    title:'fail',
    content:'剩余不足，请联系管理员'
  })
}
}else{
wx.showToast({
  title:'请勿重复提交'
})
that.onLoad()
}
},
getDevice:function(e){
  var $device = e.currentTarget.dataset.sort
  console.log($device)
  db.collection('HUB').limit(200).where({"sort":$device}).orderBy('device', 'asc').get({
    success: res=>{
      console.log(res)
      this.setData({
        device:res.data
      })
    }
  })
}

,
/**
 * 生命周期函数--监听页面加载
 */
onLoad: function (options) {
  db.collection('HUB').limit(200).where({"project":"sort"}).orderBy('id', 'asc').get({
    success: res=>{
      console.log(res)
      this.setData({
        sort:res.data
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