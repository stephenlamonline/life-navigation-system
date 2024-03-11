// pages/personinfo/personinfo.js
const app=getApp()

Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    nickName : "",
    avatarUrl : "",
    count:0, 
    total:0,
    progress_txt:""

  },
  adding: function () {

        this.setData({
          progress_txt: "完成目标数："+this.data.count +"/" +this.data.total
        });
      },


  drawProgressbg: function () {
    // 使用 wx.createContext 获取绘图上下文 context
    var ctx = null;
    wx.createSelectorQuery()
      .select("#canvasProgressbg")
      .context(function (res) {
        console.log("节点实例：", res);
        // 节点对应的 Canvas 实例。
        ctx = res.context;
        ctx.setLineWidth(4); // 设置圆环的宽度
        ctx.setStrokeStyle('#EEEEEE'); // 设置圆环的颜色
        ctx.setLineCap('round') // 设置圆环端点的形状
        ctx.beginPath(); //开始一个新的路径
        ctx.arc(110, 110, 100, 0, 2 * Math.PI, false);
        //设置一个原点(110,110)，半径为100的圆的路径到当前路径
        ctx.stroke(); //对当前路径进行描边
        ctx.draw();
      })
      .exec();
  },

  drawProgressCircle: function (step) {
    let ctx = null;
    var that=this
    wx.createSelectorQuery()
      .select("#canvasProgress")
      .context(function (res) {
        console.log("节点实例：", res); // 节点对应的 Canvas 实例。
        ctx = res.context;
        // 设置渐变
        var gradient = ctx.createLinearGradient(200, 100, 100, 200);
        gradient.addColorStop("0", "#2661DD");
        gradient.addColorStop("0.5", "#40ED94");
        gradient.addColorStop("1.0", "#5956CC");

        ctx.setLineWidth(10);
        ctx.setStrokeStyle(gradient);
        ctx.setLineCap('round')
        ctx.beginPath();
        if(that.data.total!=0){
        ctx.arc(110, 110, 100, -Math.PI / 2, (that.data.count)/(that.data.total) *2* Math.PI - Math.PI / 2, false);
        }
        else{
          ctx.arc(110, 110, 100, -Math.PI / 2, - Math.PI / 2, false);
        }
        ctx.stroke();
        ctx.draw()
      })
      .exec();

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
    this.setData({
      nickName:app.globalData.userInfo.nickName,
      avatarUrl:app.globalData.userInfo.avatarUrl,  
      
    })
    console.log(this.data.total)
  },
  onShow:function(){
    console.log(app.globalData.planlist)
    var x=0
    for (let index = 0; index < app.globalData.planlist.length ; index++) {
      if(app.globalData.planlist[index].complete==1){
        x++
      }
    }
    console.log(x)
    this.setData({total:app.globalData.planlist.length,count:x})
    this.drawProgressbg();
    this.adding();
    this.drawProgressCircle();
  },
 
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
 
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