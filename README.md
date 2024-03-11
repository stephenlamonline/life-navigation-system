# Course Project -- Life Navigation System



#### 介绍
社团、学生组织、学业、考证书、考研、保研、出国——迷茫却忙碌，这是对大学生活的真实写照。不确定当下的决定会在未来产生什么样的结果，也不知道这对自己是否有用。盲目的跟随大流，别人考的证书自己也不能落下。在充满各种各样选择的世界中，再次选择了和高中无异的生活态度。

你，真的想这样吗？

不要害怕迷茫。我们知道，你可能觉得自己的人生难题从有标准回答的「选择题」变成了没有答案的「开放式命题」，但其实，你并不是无路可走，只是路太多，导致不知道如何选。

本系统为你提供专业的职业规划服务，帮助你明确自己的目标和价值观，并调整你的生活方式，使之与你的价值观相符。帮助你摆脱迷茫无方的困境，获得人生的方向感。

来吧，开启“导航”，let’s go!


**目标用户：**

1. 人生目标尚未清晰的大学生
2. 无法掌握自己生活节奏、财务状况的在职人士、大学生
3. 有抱负却因缺少规划无法坚持的在职人士、大学生


**痛点——需求点:** 根据用户特点的分析，归纳一下目标用户的痛点和相对应的需求。

| 痛点                                                         | 需求点                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 人生中多不胜数的选择和外界的价值观的裹挟令人迷失自我，随波飘荡。缺少了一份对自身价值的探寻，一个简单的方式去找到自己真正在意之物。 | 想要达成马斯洛需求层次中的自我实现，却被现实、外界的压力导致个体逃避。想要一个动机，一个推力逃离舒适圈，进入实现理想的道路。 |
| 空有一腔抱负、制定了远大的目标。却缺少一个将目标落实的途径。做着无效的每日打卡、列下长长的任务清单，做着成效甚微且无法看到进度的努力。最后热情被消磨，直至放弃。 | 想要切实的达到目标，能真正看到目标的可行性，而非一个虚幻的信念、激励。希望看到进度的推进，知道自己距离目标还有多远，努力被量化，能确实的看到变化。 |
| 缺少一个统一化且功能足够强大媒介。任务分散在不同的平台软件上，有打卡形式、每日清单形式。 却没有将任务简洁统一的按照时间排列，具备提醒功能的界面；亦缺少人性化修改、反思时间安排的空间。 | 提供计划和安排任务的功能，帮助用户管理时间和完成任务。  提供任务分类和标记的功能，帮助用户区分不同类型的任务并给予优先级。  提供时间跟踪和统计的功能，帮助用户了解自己的时间利用情况，且延伸出每日反思、根据数据提供建议模块。 |




#### 功能实现

**1.   主页**

 

首页的功能有规划总览、排列功能、完成和删除。以下是实现的代码和解释：

首先是规划总览和下面的日期显示，下面是wxml 的代码，

``` html
   <view class="option-title">规划总览</view>

   <view class="option-time">{{date.month}}月{{date.day}}日</view>

   </view>
```

其中date是在js 界面定义的了date 的变量储存当前日期。

``` javascript
  date:{

   month:new Date().getMonth()+1,

   day:new Date().getDate()

},
```

在介绍排序的功能前，先介绍每个任务信息的储存。每项任务的信息都以planlist列表里面一个元素的形式储存。而planlist是放在全局变量globalData里的一个对象。而globalData位处app.js。

``` javascript
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
```

接下来是排序的部分，先是按重要性排序，其工作原理是按照用户自己输入的重要性评级（0，1，2），再用sort进行排列后输出。

``` javascript
importanceFirst(){

 var list=this.data.planlist.sort((a,b)=>a.importance-b.importance)

 this.setData({num:2,planlist:list})

 app.globalData.planlist=list

},
```


下面是紧急度排序，与上面类似。但主体使用if构成的条件判断。先判断月份，再考虑日期。

``` javascript


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
```

最后是完成和删除的函数，点击完成/删除后。首先会把任务从首页（前端）的列表中移除（使用onHide），然后同步清空后台里的planlist资讯。但是为了计算任务完成度，我们在list中定义了complete，所以总任务数在点击完成后不会改变。

``` javascript


 complete(e) {

  var x=this.data.id.split("_")[1]

  var list=this.data.planlist

  list[parseInt(x)].complete=1

  console.log(list)

  this.setData({planlist:list})

  app.globalData.planlist= list

  this.popover.onHide();

 },
```
Delete中则是直接把元素从planList 移除
``` js

 delete: function (e) {

//类似，略。

 },
```

接着是上方《开始规划》的按钮，点击后将跳转到另一个核心页面，互动式目标规划。



**2.   开始规划**

   

这个页面的功能包括根据SMART原理设定的文字指引，交互式引导，和智能生成任务。图一显示的是文字指引。小航的信息预先储存在chatlist的列表里，每个item都包括了msgId、nickname、avatar、message等参数。其中msgId是固定的两个编号，2022为左边，2023为右边即用户自己；在chatlist 中存放着所有预设好的指引信息。

 

 ``` js

   // 聊天信息

   chatList: [

     {

       msgId: '2022',

       nickname: '小航',

       avatar: '../asset/sys.jpg',

       message: '你好，我是小航…(略)',

       type: 'text'},
 ```

而wxml部分使用了scroll组件封装，在wxss中定义了不同的row，根据不同的使用者ID决定对话框的位置。用类似的方式分别封装好用户名、头像、发送信息等参数。

 ``` html

<view class="scroll-list">

  <block wx:for="{{chatList}}" wx:for-index="index" wx:for-item="item" wx:key="item">
<view wx:if="{{item.date}}" class="show-date">{{item.date}}</view>

<view wx:if="{{item.type=='custom'}}" class="row tips-text">

  <text>{{login.id==item.msgId?'你':item.nickname}}撤回了一条消息</text>

        </view>

        <view class="{{login.id==item.msgId?'row row-self':'row'}}" wx:else>

          <view class="{{login.id==item.msgId?'head-self':'head-friend'}}">

            <image class="avatar" src="{{item.avatar}}"></image>

          </view>

          <view>

            <view wx:if="{{login.id!=item.msgId}}" class="nick">{{item.nickname}}</view>

            <view class="{{login.id==item.msgId?'message msg-self':'message msg-friend'}}">

              <text>{{item.message}}</text>

            </view>

          </view>

        </view>

  </block>

</view>
 ```
图二是交互式引导和智能生成任务的具体展现，这两个核心功能都放在了js的一个函数sendClick 中。

``` javascript
 sendClick() {…

 },
```

首先是智能生成任务。按照提示发送信息后，目标名、截止日期、重要性的信息就会同步到globalData 中，然后同步出现在首页，自此，目标设定完成。具体的发送信息请看下面sendclick 函数，首先是定义部分，定义了msg变量，其结构和上方chatList列表内的item一样。后面也是使用了往chatList 后面添加元素的方法来添加聊天信息。

 ``` javascript
 sendClick() {
 
    var that = this;
 
    var list = this.data.chatList;
 
    // 获取当前时间（略）
 
    // 组装数据
 
    var msg = {
 
          msgId: this.data.login.id,
 
          nickname: this.data.user,
 
          avatar: this.data.avatar,
 
          message: this.data.content,
 
          type: 'text',
 
          date: now1 + '-' + now2 + ' ' + hour + ':' + minu
 
    }
 ```



下面这两行代码的目的是从content里获取信息然后储存。因为content是输入框里的内容，将会在每一次点击发送后清空，这一点接下来展示。

``` javascript
   const newItem = this.data.content; // 添加的新项目

   this.data.myList.push(newItem);
```



但是content是怎么来的呢？就是下方的监听函数，在wxml页面中设置的输入框内的内容将被inputClick事件绑定到content中。

``` javascript
 // 输入监听

 inputClick(e) {

   this.setData({

    content: e.detail.value

   })

 },
```



回到sendClick 函数，随后就是content 的清空操作，使用setdata 将content清空。同时，发送后模拟真实的聊天界面，构造了scrollToBottom 函数，滑到最底部。

``` javascript
 this.setData({

   chatList: list.concat(msg)

 }, () => {

   that.scrollToBottom();

   that.setData({

     content: ''

   })

 })
```



然后是同步的部分，在上面提到过，content每次都会被清空，于是我们在data中建了名为myList 的列表储存每轮的content值，随后，当myList的列表接受完源自content的目标名、截止日期和重要程度后，就会将这些信息封装进一个myPlan对象，随后执行上传global的操作。然后退回主页。回到主页后就能看到新增的任务了。下面是具体代码。

``` javascript
 if (this.data.myList.length === 4) {

  this.data.myPlan.ddl.month =parseInt (this.data.myList[0])

  this.data.myPlan.ddl.day = parseInt (this.data.myList[1])

  this.data.myPlan.name = this.data.myList[2]

  this.data.myPlan.importance = parseInt (this.data.myList[3])

  console.log(this.data.myPlan)

  app.globalData.planlist.push(this.data.myPlan);

  console.log(app.globalData.planlist)

  wx.navigateBack()

 }

},
```



而另一个核心功能，交互式引导，以第一句为例。当myList长度为一，即用户输入了目标名称后，系统就会构建一个预设的msg往chatList里面添加。后面几句交互结构上基本一样。

``` javascript
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
```



 

**3.   OLED同步**

接下来是OLED 同步，也就是端到端的部分。最重要的就是input框里的部分。用户可以在input框内输入想要在oled屏上看到的激励句子，点击上传后，就会上传至oneNet，然后oneNet作为中转透过wifi模块把句子传输到arduino上，然后oled屏就能显示出来。下面是小程序端的上传代码，主要是调用oneNet 的api，把用户输入的句子datestreams传输上去。

 ``` javascript
 
 
   let data={
 
    "datastreams":this.data.dataStream
 
   }
 
   wx.request({
 
    url: 'http://api.heclouds.com/devices/1051693554/datapoints',
 
    data:JSON.stringify(data),
 
    method:"POST",
 
    header:{
 
     "content-type":'application/json',
 
     "api-key":"这里是一个api-key"
 
  
 
    },
 
    success(res){
 
     console.log(res)
 
    }
 
 }) 
 
 }
 ```

后面是oneNet 上的设置和arduino端的代码和实现。



**4.  個人頁**

前面开始规划聊天界面也能看见用户自己的头像信息，是因为在一开始登录小程序就有取得用户授权，而这一点也会在个人资料页上显示。个人资料页主要实现的功能是任务完成信息监控。使用了环形进度条展示，而具体数据是从首页中获取，任务点击完成后，数字就会加一，总目标数和完成目标数也会刷新。下面将展示环形条的实现和目标数目的百分比显示、刷新。

``` javascript
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
```

环形主要是利用了两个canva，一白、一灰呈现的。drawProgressbg函数是环形主体的设置。而下面就是画出百分比和进度条显示的函数drawProgressCircle。//略部分与上方类似，是设定画的路径（圆）、颜色等。

 ``` javascript
 drawProgressCircle: function (step) {
 
 let ctx = null;
 
 var that=this
 
 // 略
 ```

后面就是百分比实现的部分，首先是条件语句，当total，即从首页中获取的从任务数目，不为0时就执行画的操作。把已完成任务数目count 除以 总任务数total，带入环形的换算公式即可。

``` javascript
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
```

