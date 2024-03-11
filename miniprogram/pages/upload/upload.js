//index.js
// display-screen.js



function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({
  data: {
    isRandomColor: true,//默认随机
    src: '',
    numberColor: "#ff0000",//默认黑色
    dataStream:[{
      id:"words",
      datapoints:[{
        at:"",
        value:""
      }]
    }],
    inputValue: '',
    properties: {
        displayText: {
          type: String,
          value: ''
        }
      }

  },
  onLoad: function () {

  },
  onReady: function (res) {

  },
  onShow: function () {
    var _this = this;

    wx.getStorage({
      key: 'numberColor',
      success: function (res) {
        console.log(res.data + "numberColor----")
        _this.setData({
          numberColor: res.data,
        })
      }
    })
  },

  bindInputBlur: function (e) {
    this.data.dataStream[0].datapoints[0].value= e.detail.value
    console.log(this.data.dataStream[0].datapoints[0].value)
  },

  send(){
    let data={
      "datastreams":this.data.dataStream
    }
    wx.request({
      url: 'http://api.heclouds.com/devices/1051693554/datapoints',
      data:JSON.stringify(data),
      method:"POST",
      header:{
        "content-type":'application/json',
        "api-key":"cijiFHdRzPyvd1G1HVeMTGMSf=A="

      },
      success(res){
        console.log(res)
      }
    })
    wx.showToast({
      title: '上传成功',
      icon: 'success'
    });
  
  }

})