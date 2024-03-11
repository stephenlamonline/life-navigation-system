// index.js
// 获取应用实例
const app = getApp()
import formatTime from '../../utils/util'
Page({
  data: {
    isEmpty:false,
    id:"",
    imgpath:"/pages/asset/importance/",
    png:".png",
    num:1,
    planlist:[],
    date:{
      month:new Date().getMonth()+1,
      day:new Date().getDate()
    },
    navList:[
     
      {
        title:'开始规划',
        icon:'/pages/asset/plan.png',
        path:'/pages/plan/plan'
      }
    ]
  },
  onReady: function() {
    // 生命周期函数 onReady 中获取自定义的 popover 组件，根据id获取
    this.popover = this.selectComponent('#popover');
  },
  onLoad() {
    
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    
  },
  onShow(){
    this.setData({planlist:app.globalData.planlist})
    this.urgentFirst()
   

  },
 nav(e){
  console.log(e)
  if(e.currentTarget.dataset.index==0){
    wx.navigateTo({
      url: '/pages/guide/guide',
    })
  }
  else if (e.currentTarget.dataset.index==1){
    wx.navigateTo({
      url: '/pages/plan/plan',
    })
 }
},
importanceFirst(){
  var list=this.data.planlist.sort((a,b)=>a.importance-b.importance)
  this.setData({num:2,planlist:list})
  app.globalData.planlist=list
},

urgentFirst(){
  var list=this.data.planlist.sort((a,b)=>{
    if(a.ddl.month<b.ddl.month){
      return -1;
    }
    else if(a.ddl.month>b.ddl.month){
      return 1;
    }
    if(a.ddl.day<b.ddl.day){
      return -1;
    }
    else if(a.ddl.day>b.ddl.day){
      return 1;
    }
    return 0;
    })
    this.setData({num:1,planlist:list})
    app.globalData.planlist=list
  },

  Click(e){
    console.log(e)
    if(e.target.id==2){
      this.importanceFirst()
    }
    else if(e.target.id==1){
      this.urgentFirst()
    }
  },
  onTap: function (e) {
    // 获取元素的坐标信息
    wx.createSelectorQuery().select('#' + e.target.id).boundingClientRect(res => {
      this.popover.onDisplay(res);
      this.data.id=e.target.id
    }).exec();
    var x=this.data.id.split("_")[1]
    console.log(x)
  },
  complete(e) {
    var x=this.data.id.split("_")[1]
    var list=this.data.planlist
    list[parseInt(x)].complete=1
    console.log(list)
    this.setData({planlist:list})
    app.globalData.planlist=list
    this.popover.onHide();
    var x=0
    for (let i=0;i<this.data.planlist.length;i++){
      if(this.data.planlist[i].complete!=1){
        x++
      }
    }
    if(x==0){
      this.setData({isEmpty:true})
    }
  },

  delete: function (e) {
    var x=this.data.id.split("_")[1]
    var list=this.data.planlist
    list.splice(parseInt(x),1)
    console.log(list)
    this.setData({planlist:list})
    app.globalData.planlist=list
    this.popover.onHide();
    var x=0
    for (let i=0;i<this.data.planlist.length;i++){
      if(this.data.planlist[i].complete!=1){
        x++
      }
    }
    if(x==0){
      this.setData({isEmpty:true})
    }
  },

})
