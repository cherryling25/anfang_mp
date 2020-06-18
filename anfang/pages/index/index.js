// pages/add/add.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  
  data: {

  },

  //人员注册
  addTap() {
    wx.navigateTo({
      url: '../add/add',
    })
  },
  //访客登记
  registerTap(){
    wx.navigateTo({
      url: '../resigter/index',
    })
  },
  //访客审核
  auditTap(){
    wx.navigateTo({
      url: '../audit/audit',
    })
  },
  unlocking() {
    // var value = wx.getStorageSync('userId');
    // if (value) { 
    //   console.log('授权')
    //   return;
    // } 
    if(getApp().globalData.id =='' || getApp().globalData.id =='null'){
      wx.showModal({
        title: '你还没有授权登入',
        content: '请先授权登入',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../logs/logs',
            })
          } else if (res.cancel) {
  
          }
        }
      });
    }else{
      wx.request({
        url: getApp().globalData.postUrl + 'wechat/Unlock/unlock_index',
        header: {
        },
        method: 'post',
        data: {
          'user_id': getApp().globalData.id
        },
        success(res){
        if(res.data.code == 1 ||res.data.code == '1'){
          wx.showToast({
            title: res.data.cetons,
            icon: 'none',
            duration: 1000
          })
        }else{
          wx.showToast({
            title: res.data.cetons,
            icon: 'none',
            duration: 1000
          })
        }
        }
      })
    }

  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onLoad: function () {
  //   console.log(this.data.windowHeight)
  //   this.setData({
  //     windowHeight: wx.getSystemInfoSync().windowHeight
  //   })
  //   wx.login({
  //     success: res => {
  //       // 发送 res.code 到后台换取 openId, sessionKey, unionId
  //       //获取登录临时凭证
  //       var code = res.code;
  //       console.log(res)

  //       // 获取用户信息
  //       wx.getSetting({
  //         success: res => {
  //           if (res.authSetting['scope.userInfo']) {
  //             // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  //             wx.getUserInfo({
  //               success: res => {
  //                 getApp().globalData.userInfo = res.userInfo;
  //                 console.log(res.userInfo)
  //                 //调用后端接口 获取微信的session_key 和 openID
  //                 wx.request({
  //                   url: getApp().globalData.dataUrl + '/app/login/wxXCXLogin',
  //                   method: "post",
  //                   data: {
  //                     'code': code,
  //                     'userName':res.userInfo.nickName
  //                   },
  //                   success(obj) {
  //                     console.log(obj);
  //                     if (obj.data.code == 200 || obj.data.code == '200') {
  //                       //把token 存为全局
  //                       getApp().globalData.token = obj.data.data.TOKENA;
  //                       getApp().globalData.openid = obj.data.data.openId;
  //                       //授权完 返回 我的页面
  //                     } else {}
  //                   }
  //                 });

  //                 // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //                 // 所以此处加入 callback 以防止这种情况
  //                 if (this.userInfoReadyCallback) {
  //                   this.userInfoReadyCallback(res)
  //                 }
  //               }
  //             })
  //           }
  //         }
  //       })
  //     }
  //   });
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse) {
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   };
  },
  
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.login({
      success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      //获取登录临时凭证
      var code = res.code;
      console.log(res)
      // setTimeout(function() {
      // wx.hideLoading()
      // }, 1000)
      // 获取用户信息
      wx.getSetting({
      success: res => {
        console.log(res)
      if (res.authSetting['scope.userInfo']) {
      // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
      wx.getUserInfo({
      success: res => {
        console.log(res)
      getApp().globalData.userInfo = res.userInfo;
      console.log(res.userInfo)
      
      //调用后端接口 获取微信的session_key 和 openID
      wx.request({
        url: getApp().globalData.postUrl + 'wechat/Login/index',
        method: "post",
        data: {
          'code': code
        },
        success(obj) {
          console.log(obj);
          if (obj.data.code == 1 || obj.data.code == '1') {
            getApp().globalData.id = obj.data.cetons;
            wx.setStorageSync('userId', obj.data.cetons);
            // setTimeout(() => {
            //   wx.reLaunch({
            //     url: '../index/index',
            //   })
            // }, 2000);
          } else {
            // getApp().globalData.id = '1';
            // wx.setStorageSync('userId', '1');
          }
        }
      });
      
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      if (this.userInfoReadyCallback) {
      this.userInfoReadyCallback(res)
      }
      }
      })
      }
      }
      })
      
      }
      });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})