//logs.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    show:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    //隐藏 转发按钮 
    wx.hideShareMenu();
  },
  close:function(){
    this.setData({
      show:0
    })
    wx.switchTab({
      url: '../index/index',
    })
  },

  // bindphone:function(e){
  //   wx.request({
  //     url: getApp().globalData.dataUrl + '/app/login/wxPhone',
  //     method: "post",
  //     header: {
  //       "TOKENA": getApp().globalData.token,
  //     },
  //     data: {
  //       'encryptedData': e.detail.encryptedData,
  //       'iv': e.detail.iv
  //     },
  //     success(obj) {
  //       console.log(obj);
  //       if (obj.data.code == 200 || obj.data.code == '200') {
  //         wx.switchTab({
  //           url: '../index/index',
  //         })
  //       } else {}
  //     }
  //   });
  // },

  //用户授权
  bindGetUserInfo: function (e) {
    var that = this;
    if (e.detail.userInfo) {
      //用户按了允许授权按钮

      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          //获取登录临时凭证
          var code = res.code;
          getApp().globalData.userCode = res.code;
          console.log(res)
          // 获取用户信息
          wx.getSetting({
            success: res => {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                wx.getUserInfo({
                  success: res => {
                  console.log(res);
                    // 可以将 res 发送给后台解码出 unionId
                    getApp().globalData.userInfo = res.userInfo;
                    console.log(res.userInfo)

                    wx.showToast({
                      title: '授权登录成功',
                      icon: 'success',
                      duration: 2000
                    })
                    //调用后端接口 获取微信的session_key 和 openID
                    wx.request({
                      url: getApp().globalData.postUrl + 'wechat/Login/index',
                      method: "post",
                      data: {
                        'code': code
                      },
                      success(obj) {
                        console.log(obj);
                        console.log(obj.data);
                        if (obj.data.code == 1 || obj.data.code == '1') {
                          getApp().globalData.id = obj.data.cetons;
                          wx.setStorageSync('userId', obj.data.cetons);
                          setTimeout(() => {
                            wx.reLaunch({
                              url: '../index/index',
                            })
                          }, 2000);
                        } else {
                          getApp().globalData.id = '1';
                          wx.setStorageSync('userId', '1');
                          setTimeout(() => {
                            wx.reLaunch({
                              url: '../index/index',
                            })
                          }, 2000);
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
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            //console.log('用户点击了“返回授权”')

            //拒绝授权  返回 我的页面
            wx.switchTab({
              url: '/pages/index/index'
            });
          }
        }
      })
    }
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
