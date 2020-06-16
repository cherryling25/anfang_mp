// pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{
      name: "",
      cardNumber:"",
      phone: "",
      address: ''
    }
  },
  inputInfo: function (e) {
    let dataset = e.currentTarget.dataset;
    let value = e.detail.value;
    this.data[dataset.obj][dataset.item] = value;
    this.setData({
      info: this.data[dataset.obj]
    })
  },
  // 验证规则
  verify(){
    if(!this.data.info.name){
      wx.showToast({
        title: '请填写姓名',
        icon: 'none',
        duration: 1500
      })
    }else if(!this.data.info.cardNumber){
      wx.showToast({
        title: '请填写正确的身份证号',
        icon: 'none',
        duration: 1500
      })
    }else if(!this.data.info.phone){
      wx.showToast({
        title: '请填写正确的手机号',
        icon: 'none',
        duration: 1500
      })
    }else if(!this.data.info.address){
      wx.showToast({
        title: '请填写地址',
        icon: 'none',
        duration: 1500
      })
    }
  },
  // 提交
  submit(){
    this.verify();
    // wx.request({
    //   url: getApp().globalData.postUrl + ' ',
    //   header: {

    //   },
    //   method: 'post',
    //   data: {

    //   },
    //   success(obj){
    //     console.log(obj);
    //   }
    // })
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