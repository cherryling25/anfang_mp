// pages/resigter/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    array: [],
    addressIds: [],
    info:{
      name: "",
      sex:"",
      phone: "",
      idNumber: '',
      number: "",
      carNumber:"",
      companyName: "",
      person: '',
      cause:"",
      time: "",
      moblie: '',
      address: '',
      addressid: ''
    }
  },
  // 区域选择
  bindPickerChange: function(e) {
    let info = this.data.info;
    info.address = this.data.array[e.detail.value];
    info.addressid = this.data.addressIds[e.detail.value];
    this.setData({
      info: info
    });
  },
  // 时间选择
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let info = this.data.info;
    info.time =  e.detail.value;
    this.setData({
      info: info
    })
  },
  inputInfo: function (e) {
    let dataset = e.currentTarget.dataset;
    let value = e.detail.value;
    this.data[dataset.obj][dataset.item] = value;
    this.setData({
      info: this.data[dataset.obj]
    })
  },
  // 区域列表
  option(){
    let url = getApp().globalData.postUrl + 'index//Region/region_list_all';
    wx.request({
      url: url,
      method: 'post',
      header: {
        // "Content-Type": "application/x-www-form-urlencoded"
        "Content-Type": "application/json"
      },
      success : (obj) => {
        console.log(obj);
          let array = [];
          let addressIds = [];
          const list = obj.data.cetons;
          for (let i = 0; i < list.length; i++) {
            array.push(list[i].region_name);
            addressIds.push(list[i].id);
          }
        this.setData({
          array: array,
          addressIds
        })
      }
    })
  },
  // 验证规则
    verify(){
    if(!this.data.info.name){
      wx.showToast({
        title: '请填写姓名',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    if(!this.data.info.sex){
          wx.showToast({
            title: '请填写性别',
            icon: 'none',
            duration: 1500
          })
          return false;
        }
    if(!this.data.info.phone){
          wx.showToast({
            title: '请填写联系电话',
            icon: 'none',
            duration: 1500
          })
    return false;
        }
    if(!this.data.info.idNumber){
          wx.showToast({
            title: '请填写证件号',
            icon: 'none',
            duration: 1500
          })
    return false;
        }
    if(!this.data.info.number){
          wx.showToast({
            title: '请填写随行人数',
            icon: 'none',
            duration: 1500
          })
    return false;
        }
    if(!this.data.info.carNumber){
          wx.showToast({
            title: '请填写车牌号',
            icon: 'none',
            duration: 1500
          })
    return false;
        }
    if(!this.data.info.companyName){
          wx.showToast({
            title: '请填写单位名称',
            icon: 'none',
            duration: 1500
          })
    return false;
        }
    if(!this.data.info.person){
          wx.showToast({
            title: '请填写被访人',
            icon: 'none',
            duration: 1500
          })
    return false;
        }
    if(!this.data.info.cause){
          wx.showToast({
            title: '请填写来访事由',
            icon: 'none',
            duration: 1500
          })
    return false;
        }
    if(!this.data.info.time){
          wx.showToast({
            title: '请填写来访时间',
            icon: 'none',
            duration: 1500
          })
    return false;
        }
    if(!this.data.info.moblie){
          wx.showToast({
            title: '请填写联系电话',
            icon: 'none',
            duration: 1500
          })
    return false;
        }
    if(!this.data.info.address){
        wx.showToast({
          title: '请填写地址',
          icon: 'none',
          duration: 1500
        })
      return false;
      }
      return true;
      },
  // 提交
  submit(){
    if(!this.verify()){
      return;
    }
    
    let time = new Date(this.data.info.time).getTime();
    time = time / 1000;
    console.log(time);
    wx.request({
      url: getApp().globalData.postUrl + 'index//Recording/recording_add',
      header: {
      },
      method: 'post',
      data: {
        'name': this.data.info.name,
        'sex':this.data.info.sex,
        'phone':this.data.info.phone,
        'card_number': this.data.info.idNumber,
        'accompanying': this.data.info.number,
        'car_number':this.data.info.carNumber,
        'unit': this.data.info.companyName,
        'user_name': this.data.info.person,
        'centons': this.data.info.cause,
        'user_phone': this.data.info.moblie,
        'quyu_id': this.data.info.addressid,
        'quyu_name': this.data.info.address,
        'reservation_time': time,
        'user_id': getApp().globalData.id
      },
      success(obj){
        console.log(obj);
        wx.showToast({
          title: '登记成功',
          icon: 'success',
          duration: 1500
        })
        setTimeout(()=>{
          wx.reLaunch({
            url: '../index/index'
          })
        },2000)
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.option();
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