// pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // info:{
    //   name: "",
    //   cardNumber:"",
    //   phone: "",
    //   address: ''
    // }
    index: 0,
    array: [],
    info:{
      number: '',
      name: "",
      sex: '',
      phone: '',
      department: '',
      idNumber:"",
      address: "",
      daoqiTime: '',
      startTime: '',
      endTime: '',
      files: [{
        url: ''
        }]
    },
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    let info = this.data.info;
    info.department = e.detail.value;
    this.setData({
      info: info
    });
  },
  options(){
    wx.request({
      url: getApp().globalData.postUrl + 'index//Department/department_list_all',
      method: 'post',
      success(obj){
        console.log(obj);
        let array = [];
          const list = obj.data.cetons;
          for (let i = 0; i < list.length; i++) {
            array.push(list[i].name);
          }
        this.setData({
          array: array
        })
      }
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
    wx.request({
      url: getApp().globalData.postUrl + 'index//Pass/add_user',
      header: {

      },
      method: 'post',
      data: {
        'user_number': this.data.info.number,
        'user_name': this.data.info.name,
        'sex':this.data.info.sex,
        'phone':this.data.info.phone,
        'card_number': this.data.info.idNumber,
        'card_address':this.data.info.address,
        'department_id':this.data.info.array,
        'end_time':this.data.info.number,
        'pass_start_time':this.data.info.number,
        'pass_end_time':this.data.info.number,
        'img':this.data.info.number,

      },
      success(obj){
        console.log(obj);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      selectFile: this.selectFile.bind(this),
      uplaodFile: this.uplaodFile.bind(this)
  })
  
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            that.setData({
                files: that.data.files.concat(res.tempFilePaths)
            });
        }
    })
},
previewImage: function(e){
    wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.data.files // 需要预览的图片http链接列表
    })
},
selectFile(files) {
    console.log('files', files)
    // 返回false可以阻止某次文件上传
},
uplaodFile(files) {
    console.log('upload files', files)
    // 文件上传的函数，返回一个promise
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('some error')
        }, 1000)
    })
},
uploadError(e) {
    console.log('upload error', e.detail)
},
uploadSuccess(e) {
    console.log('upload success', e.detail)
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