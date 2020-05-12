//index.js
const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    movies:[
      {url:'cloud://sdjzlab-7hurq.7364-sdjzlab-7hurq-1302091807/1.jpg'} ,
      {url:'cloud://sdjzlab-7hurq.7364-sdjzlab-7hurq-1302091807/2.jpg'} ,
      {url:'cloud://sdjzlab-7hurq.7364-sdjzlab-7hurq-1302091807/3.jpg'} ,
      {url:'cloud://sdjzlab-7hurq.7364-sdjzlab-7hurq-1302091807/4.jpg'} ,
    ]
  },
  gotoqiandao:function(){
    
    wx.navigateTo({
      url: '/pages/qiandao/qiandao',    
      })
    },
    gotoxinwen:function(){
      wx.navigateTo({
        url: '/pages/xinwen/xinwen',    
        })
      },
      gotocangku:function(){
        wx.navigateTo({
          url: '/pages/cangku/cangku',    
          })
        },
        gotoluntan:function(){
          wx.navigateTo({
            url: '/pages/luntan/luntan',    
            })
          },
          gotoxiaoli:function(){
            wx.navigateTo({
              url: '/pages/xiaoli/xiaoli',    
              })
            },
            gotoliaotianshi:function(){
              wx.navigateTo({
                url: '/pages/im/room/room',    
                })
              },
  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },
  onReady:function (){
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {       
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
    db.collection('user').where({
      _openid:app.globalData.openid}).get({
        success: res=>{
          if(res.data.length=='0'){
            console.log(3)
            wx.navigateTo({
            url: '/pages/bangding/bangding',
          })
        }else{
            app.globalData.name = res.data[0].name;
            app.globalData.class = res.data[0].class;
            app.globalData.classId = res.data[0].classId;
            app.globalData.lab = res.data[0].lab;
            app.globalData.phoneNumber = res.data[0].phoneNumber;
            app.globalData.identity = res.data[0].identity;
            this.setData({
              name:app.globalData.name
            })
            console.log("登陆成功")
              wx.showToast({
              icon:"success",
              title:"登陆成功"
         })
        }
         
        },
        fail: err=>{
         console.log(err)
        }
        }
      )

    
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

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {       
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })  
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

})
