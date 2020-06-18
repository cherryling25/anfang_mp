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
    departmentIds: [],
    files : [], 
    imgUrl: '',
    info:{
      number: '',
      name: "",
      sex: '',
      phone: '',
      department: '',
      departmentId: '',
      idNumber:"",
      address: "",
      daoqiTime: '',
      startTime: '',
      endTime: ''
    },
  },
  radioChange: function (e) {
    console.log(e.detail.value);
    let info = this.data.info;
    info.sex = e.detail.value;
    this.setData({
      info: info
    });
  },
  bindPickerChange: function(e) {
    let info = this.data.info;
    info.department = this.data.array[e.detail.value];
    info.departmentId = this.data.departmentIds[e.detail.value];
    this.setData({
      info: info
    });
  },
  // 部门列表
  option(){
    let url = getApp().globalData.postUrl + 'index//Department/department_list_all';
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
          let departmentIds = [];
          const list = obj.data.cetons;
          for (let i = 0; i < list.length; i++) {
            array.push(list[i].name);
            departmentIds.push(list[i].id);
          }
        this.setData({
          array: array,
          departmentIds
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
  // 日期选择
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let info = this.data.info;
    info.daoqiTime =  e.detail.value;
    this.setData({
      info: info
    })
  },
  // 验证规则
    verify(){
        if(!this.data.info.number){
          wx.showToast({
            title: '请填写编号',
            icon: 'none',
            duration: 1500
          })
    return false;
        }
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
            title: '请填写手机号',
            icon: 'none',
            duration: 1500
          })
    return false;
        }
    if(!this.data.info.department){
          wx.showToast({
            title: '请填写部门名称',
            icon: 'none',
            duration: 1500
          })
    return false;
        }
    if(!this.data.info.idNumber){
          wx.showToast({
            title: '请填写正确的身份证号',
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
    if(!this.data.info.daoqiTime){
          wx.showToast({
            title: '请填写到期时间',
            icon: 'none',
            duration: 1500
          })
    return false;
        }
    // if(!this.data.info.startTime){
    //       wx.showToast({
    //         title: '请填写开始时间',
    //         icon: 'none',
    //         duration: 1500
    //       })
    // return false;
    //     }
    // if(!this.data.info.endTime){
    //       wx.showToast({
    //         title: '请填写结束时间',
    //         icon: 'none',
    //         duration: 1500
    //       })
    // return false;
    //     }
    if(this.data.files.length == 0){
          wx.showToast({
            title: '请上传图片',
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
    wx.request({
      url: getApp().globalData.postUrl + 'index//Pass/add_user',
      header: {

      },
      method: 'post',
      data: {
        'user_id': getApp().globalData.id,
        'user_number': this.data.info.number,
        'user_name': this.data.info.name,
        'sex':this.data.info.sex,
        'phone':this.data.info.phone,
        'card_number': this.data.info.idNumber,
        'card_address':this.data.info.address,
        'department_id':this.data.info.departmentId,
        'end_time':this.data.info.daoqiTime,
        // 'pass_start_time':this.data.info.startTime,
        // 'pass_end_time':this.data.info.endTime,
        // 'img':this.data.files[0].url
        'img' : this.data.imgUrl
      },
      success(obj){
        console.log(obj);
        wx.showToast({
          title: '添加成功',
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
    this.setData({
      selectFile: this.selectFile.bind(this),
      uplaodFile: this.uplaodFile.bind(this)
  })
    this.option();
  },
chooseImage: function (e) {
  var that = this;
  wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          let file = {
            url: res.tempFilePaths[0],
            loading: false
          };
          let files = [];
          files.push(file);
          that.setData({
              files: files
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
  let that = this;
  let filePath = files.tempFilePaths[0];
  console.log(files);
  wx.uploadFile({
      url: getApp().globalData.postUrl + 'index/Index/updloads_all',
      filePath: filePath,
      name: 'imagefile',
      header: {
      'content-type': 'multipart/form-data'
      }, 
      formData: {  }, // HTTP 请求中其他额外的 form data
      success: function (res) {
        console.log(res);
        // if(res.data.code == 1 ||res.data.code == '1'){
          let data = JSON.parse(res.data);
          let file = {
              url: filePath,
              loading: false
            };
            let files = [];
            files.push(file);
            that.setData({
                files: files,
                imgUrl: data.cetons.img
            });
        // }
        
      },
      fail: function (res) {
        console.log(res);
      }
  });
  return new Promise((resolve, reject) => {
      resolve({urls:that.data.files});
  });
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