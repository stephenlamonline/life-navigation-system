// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    planlist:[
      {
      name:"导论",
      ddl:{
        month:6,
        day:21
      },
      importance:2,
      completed:0
      },
      {
      name:"模电",
      ddl:{
        month:6,
        day:24
      },
      importance:0,
      completed:0
      }
    
    ]
  }
})
