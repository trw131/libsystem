const app = getApp()
Page({
  data: {
    status:'none',
    avatarUrl:'../index/user-unlogin.png',
    nickname:'undifined'
  },
onGetUserInfo: function(e) {
      if (!this.data.logged && e.detail.userInfo) {
  
        this.setData({
          logged: true,
          avatarUrl: e.detail.userInfo.avatarUrl,
          userInfo: e.detail.userInfo
        })
      }
    },
   
    gotoGeren:function(){
      wx.navigateTo({
        url:'/pages/geren/geren',
      })
    },
    gotoLuntan:function(){
      wx.navigateTo({
        url:'/pages/gotoLuntan/gotoLuntan',
      })
    },
    gotoGuanli:function(){
      wx.navigateTo({
        url:'/pages/gotoGuanli/gotoGuanli',
      })
    },
    gotoYijian:function(){
      wx.navigateTo({
        url:'/pages/gotoYijian/gotoYijian',
      })
    },
    gotoXinwen:function(){
      wx.navigateTo({
        url:'/pages/gotoXinwen/gotoXinwen',
      })
    },
    gotoJiancha:function(){
      wx.navigateTo({
        url:'/pages/gotoJiancha/gotoJiancha',
      })
    },
  onLoad: function (options) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log("aaa")
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
                nickname:res.userInfo.nickName
              })
            }
          })
        }
        if(app.globalData.identity=="teacher"){
          this.setData({
            status:'block'
          })
        }
      }
    })
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // if (app.globalData.openid) {
    //   this.setData({
    //     openid: app.globalData.openid
    //   })
    // }

    // console.group('数据库"实时数据推送"文档')
    // console.log('https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database/realtime.html')
    // console.groupEnd()
  },
})
