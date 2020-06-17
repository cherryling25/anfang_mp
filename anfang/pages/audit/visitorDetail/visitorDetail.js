// pages/audit/visitorDetail/visitorDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visitor : { 
      id:'',
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
  // 加载
  list(){
    let that = this;
    wx.request({
      url: getApp().globalData.postUrl + 'index//Recording/recording_shen_find',
      header: {
      },
      method: 'post',
      data: {
        'id': '1'
      },
      success(res){
      if(res.data.code == 1 ||res.data.code == '1'){
        console.log(res);
        const listData = [];
        const list = res.data.cetons;
        for(let i = 0; i < list.length; i++){
          const data = {
            // id: list[i].id,
            name: list[i].user_name,
            number: list[i].accompanying,
            phone: list[i].user_phone,
            sex: list[i].sex,
            IdNumber: list[i].card_number,
            number: list[i].accompanying,
            carNumber: list[i].car_number,
            companyName: list[i].unit,
            cause: list[i].centons,
            time: list[i].reservation_time
          }
          listData.push(data);
        }
        that.setData({
          visitor : listData
          });
      }
      }
    })
  },
  // 拒绝
  refuseTab(){

  },
  // 通过
  passTab(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
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