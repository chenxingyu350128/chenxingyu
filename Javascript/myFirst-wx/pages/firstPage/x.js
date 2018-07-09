Page({
  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    userData: [
      {
        "optID": 0,
        "type": "学 历",
        "arrayObject": [
          {score: [-1000, 10, -50, -50, -100, -50, 30, 50, 50, -1000, -1000, 30],name:'初中以下'},
          {score: [-1000, 20, 0, 0, -50, 10, 30, 50, 50, -1000, -1000, 30],name:'高中'},
          {score: [-1000, 30, 30, 30, 30, 30, 30, 30, 50, -1000, -1000, 30],name:'大专'},
          {score: [-1000, 30, 40, 40, 40, 40, 40, 40, 30, -1000, -1000, 40],name:'本科'},
          {score: [-1000, 30, 50, 40, 50, 30, 50, 30, -30, -1000, -1000, 50],name:'硕士'},
          {score: [-1000, 30, 50, 40, 50, 30, 50, 30, -30, -1000, -1000, 50],name:'博士'}
        ],
        "IndexSelf": 0
      },
      {
        "optID": 1,
        "type": "性 别",
        "arrayObject": [
          {score: [ -1000, 50, 50, 50, 50, 50, 50, 30, 30, -1000, -1000, 30],name:'男' },
          {score: [-1000, 50, 30, 30, 10, -30, 50, 50, 50, -1000, -1000, 50],name:'女' }
        ],
        "IndexSelf": 0
      },
      {
        "optID": 2,
        "type": "年 龄",
        "arrayObject": [
          {score: [ -1000, 5, 0, 0, -50, 15, 20, 30, 50, -1000, -1000, 20],name:'18岁以下' },
          {score: [ -1000, 20, 20, 20, 20, 20, 20, 20, 20, -1000, -1000, 20],name:'18~24岁' },
          {score: [-1000, 20, 20, 20, 20, 20, 20, 20, 20, -1000, -1000, 20],name:'25~30岁'},
          {score: [-1000, -30, -30, -30, -30, -30, 50, 0, 0, -1000, -1000, 50],name:'30岁以上' }
        ],
        "IndexSelf": 0
      },
      {
        "optID": 3,
        "type": "基 础",
        "arrayObject": [
          {score: [-1000, 50, 0, 0, 0, 0, 10, 20, 50, -1000, -1000, 10],name:'无特长'},
          {score: [-1000, 0, 0, 0, 0, 0, 0, 50, 0, -1000, -1000, 30],name:'绘画基础'},
          {score: [-1000, 10, 10, 10, 10, 50, 0, 0, 10, -1000, -1000, 0],name:'网络相关'},
          {score: [-1000, 0, 0, 0, 0, 0, 50, 30, 10, -1000, -1000, 30],name:'原型设计'},
          {score: [-1000, 0, 0, 0, 0, 0, 30, 0, 0, -1000, -1000, 50],name:'文字功底'}
        ],
        "IndexSelf": 0
      },
      {
        "optID": 4,
        "type": "专 业",
        "arrayObject": [
          {score: [-1000, 30, 0, 0, 0, 0, 30, 50, 50, -1000, -1000, 30],name:'无专业'},
          {score: [-1000, 35, 35, 35, 50, 40, 40, 40, 30, -1000, -1000, 40],name:'计算机相关' },
          {score: [-1000, 30, 35, 35, 40, 30, 30, 30, 30, 30, -1000, -1000],name:'理工科'},
          {score: [-1000, 10, 10, 10, 10, 10, 50, 50, 30, -1000, -1000, 50],name:'文科'}
        ],
        "IndexSelf": 0
      },
      {
        "optID": 5,
        "type": "逻 辑",
        "arrayObject": [
          {score: [-1000, 40, 10, 10, 10, 10, 20, 50, 50, -1000, -1000, 20],name:'渣渣' },
          {score: [-1000, 30, 30, 30, 30, 30, 30, 30, 30, -1000, -1000, 30],name:'普通'},
          {score: [-1000, 40, 40, 40, 50, 40, 30, 0, 0, -1000, -1000, 30],name:'卓越'}
        ],
        "IndexSelf": 0
      }
    ]
  },   
  //picker选择函数
  newChoice: function(e){
    var that = this;
    var userData = that.data.userData;
    var a = e.currentTarget.dataset.id;
    for(var i=0;i<userData.length;i++){
      if(i===a){
        var aa = userData[a].IndexSelf = parseInt(e.detail.value);
        console.log(userData);
        console.log("a的值为：" + a);
        console.log("aa="+aa);
        console.log(typeof a);
        that.setData({
          userData:userData
        })
      }
      
    }  
  },
  careerSelect: function(e){
    var score = [-1000, 0, 0, 0, 0, 0, 0, 0, 0, -1000, -1000, 1 ];
          //初始值
    //获取的值
    for( var i=0;i<this.data.userData.length;i++){
      var x=this.data.userData[i].IndexSelf;
      var y=this.data.userData[i].arrayObject[x].score;
      console.log("第"+i+"个所选项的score值:"+y);
      //再次通过for循环将各项相加
      for (var z in score){
        score[z] += y[z];
      }
      console.log("第" + i + "个相加后的score:  " + score);
    };
    console.log(typeof score[3]);
    //转化为JSON格式
    var Value = JSON.stringify((Object.keys(score).sort(function (a, b) {
      return score[b] - score[a];
    }).map(Number)));
    console.log("Value的值为："+Value);
    wx.navigateTo({
      url: '../nextPage/x?params='+Value,
      success: function(e){
        console.log(e);
      }
    })
  }
})