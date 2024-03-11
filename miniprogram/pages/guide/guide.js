const app=getApp()
Page({
  data: {
      content: '',
      myList:[],
      myPlan:{
        name:"",
        ddl:{
          month:0,
          day:0
        },
        importance:0,
        complete:0
        },
      user:  '',
      avatar:'',
      // 当前登录者信息
      login: {
          id: '2023',
          user:"",
          avatar:""
      },
      // 聊天信息
      chatList: [
          {
              msgId: '2022',
              nickname: '小航',
              avatar: '../asset/sys.jpg',
              message: '你好，我是小航，你的人生导航助手。接下来我将和你一起明确、设立、实现目标。现在我将引导你一步步设定目标，让我们开始吧！请您跟随以下步骤：',
              type: 'text'
          },
         
        {
          msgId: '2022',
          nickname: '小航',
          avatar: '../asset/sys.jpg',
          message: '1. 请以严谨的语言清晰的定义你的目标',
          type: 'text'
      },
      {
        msgId: '2022',
        nickname: '小航',
        avatar: '../asset/sys.jpg',
        message: '2.你要如何衡量目标的进展或完成程度',
        type: 'text'
    },
    {
      msgId: '2022',
      nickname: '小航',
      avatar: '../asset/sys.jpg',
      message: '3.你是否有足够的时间、金钱和技能去实现这个目标',
      type: 'text'
  },
  {
    msgId: '2022',
    nickname: '小航',
    avatar: '../asset/sys.jpg',
    message: '4. 这个目标对你而言有什么意义，做了会怎么样，不做又会怎么样。你愿意为此付出多少？',
    type: 'text'
},
 {
     msgId: '2022',
     nickname: '小航',
     avatar: '../asset/sys.jpg',
     message: '思考完这些问题后，请输入目标名称',
     type: 'text'      
 },
      
      ],
  },
  onLoad:function (options){
      this.setData({
        user: app.globalData.userInfo.nickName,
        avatar: app.globalData.userInfo.avatarUrl
      })
  },
  // 输入监听
  inputClick(e) {
      this.setData({
          content: e.detail.value
      })
  },
  // 发送监听
  sendClick() {
      var that = this;
      var list = this.data.chatList;
      // 获取当前时间
      var date = new Date();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hour = date.getHours();
      var minu = date.getMinutes();
      var now1 = month < 10 ? '0' + month : month;
      var now2 = day < 10 ? '0' + day : day;
      // 组装数据
      var msg = {
          msgId: this.data.login.id,
          nickname:  this.data.user,
          avatar: this.data.avatar,
          message: this.data.content,
          type: 'text',
          date: now1 + '-' + now2 + ' ' + hour + ':' + minu
      }
      console.log(this.data.content)
      const newItem = this.data.content; // 你要添加的新项目
      this.data.myList.push(newItem);
      this.setData({
          chatList: list.concat(msg)
      }, () => {
          that.scrollToBottom();
          that.setData({
              content: ''
          })
      })
      if(this.data.myList.length==1){
        var list=this.data.chatList
        var msg={
          msgId: '2022',
          nickname: '小航',
          avatar: '../asset/sys.jpg',
          message: '输入目标的截止时间（月）',
            type: 'text'  
          }
        this.setData({chatList:list.concat(msg)})
      }
      if(this.data.myList.length==2){
      var list=this.data.chatList
       var msg={
          msgId: '2022',
          nickname: '小航',
          avatar: '../asset/sys.jpg',
          message: '输入目标的截止时间（日）',
          type: 'text'  
          }
          this.setData({chatList:list.concat(msg)})
      }
      if(this.data.myList.length==3){
        var list=this.data.chatList
        var msg={
          msgId: '2022',
          nickname: '小航',
          avatar: '../asset/sys.jpg',
          message: '输入目标的紧急程度（0-2紧急度由高到低）',
            type: 'text'  
          }
          this.setData({chatList:list.concat(msg)})
      }
      if (this.data.myList.length === 4) {
        this.data.myPlan.ddl.month =parseInt (this.data.myList[1])
        this.data.myPlan.ddl.day = parseInt (this.data.myList[2])
        this.data.myPlan.name = this.data.myList[0]
        this.data.myPlan.importance = parseInt (this.data.myList[3])
        console.log(this.data.myPlan)
        app.globalData.planlist.push(this.data.myPlan);
        console.log(app.globalData.planlist)
        wx.navigateBack()
        wx.showToast({
          title: '添加成功',
          icon: 'success'
        });
      }
      this.scrollToBottom()
  },
  // 滑动到最底部
  scrollToBottom() {
      setTimeout(() => {
          wx.pageScrollTo({
              scrollTop: 200000,
              duration: 3
          });
      }, 600)
  },
})
