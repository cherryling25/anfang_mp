// pages/audit/visitorDetail/visitorDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    visitor : { 
      name : '', 
      sex: '',
      phone: '',
      IdNumber: '',
      number: '',
      carNumber: '',
      companyName: '',
      cause: '',
      time: ''
    }
  },
  mockedData: function() {
    let visitor = {
      id: '1',
      name: 'lemon',
      sex: '女',
      phone: '15226371822',
      IdNumber: '43123998871628',
      number: '2',
      carNumber: 'b123456',
      companyName: 'xun',
      cause: 'comefor',
      time: '2020-06-18'
    };
    this.setData({ visitor});
    return visitor;
  },
  // 加载
  list(){
    //this.mockedData();

    let that = this;
    wx.request({
      url: getApp().globalData.postUrl + 'index//Recording/recording_shen_find',
      header: {
      },
      method: 'post',
      data: {
        'id': this.data.id
      },
      success(res){
        if(res.data.code == '1'){
          console.log(res);
          const data = res.data.cetons;
          const visitor = {
            name: data.user_name,
            number: data.accompanying,
            phone: data.user_phone,
            sex: data.sex,
            IdNumber: data.card_number,
            number: data.accompanying,
            carNumber: data.car_number,
            companyName: data.unit,
            cause: data.centons,
            // time: data.reservation_time
            time: data.date_time
          }
          that.setData({
            visitor: visitor
          });
        }
      }
    })
  },
  // 拒绝
  refuseTab(){
    wx.request({
      url: getApp().globalData.postUrl + 'index//Recording/shen',
      header: {
      },
      method: 'post',
      data: {
        'id': this.data.id,
        'type': 3,
        'centons': ''
      },
      success(res) {
        if (res.data.code == 1 || res.data.code == '1') {
          console.log('拒绝')
          wx.switchTab({
            url: '../index/index',
          })
        }
      }
    })
  },
  // 通过
  passTab(){
    wx.request({
      url: getApp().globalData.postUrl + 'index//Recording/shen',
      header: {
      },
      method: 'post',
      data: {
        'id': this.data.id,
        'type': 2,
        'centons': ''
      },
      success(res) {
        if (res.data.code == 1 || res.data.code == '1') {
          console.log('通过')
          wx.switchTab({
            url: '../index/index',
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    });
    this.list();
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