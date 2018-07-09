Page({

  /**
   * 页面的初始数据
   */
  data: {
    opt:['职业门槛','难易程度','成长周期','求贤企业','入学基础','薪资待遇','人在学'],
    currentNavbar: 0
  },
  navbarGet: function(e){
    console.log(this);
    console.log(e);
    var currentNavbar=this.data.currentNavbar;
    this.setData({
      currentNavbar: e.currentTarget.dataset.id
    })
    console.log("zhiweizhiwei:"+currentNavbar);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //将上个页面传入的数据转为数组形式
    var that=this;
    var valueGet = JSON.parse(options.params);
    console.log(valueGet);
    var nameGet=[];
    var majorData=[];
    var salaryGet=[];
    wx.request({
      url: 'http://www.jnshu.com/a/occupation/list/',
      data: '',
      header: {'content-type': 'application/json'},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res);
        var rightOPT = res.data.data.occupations;
        console.log(rightOPT);
        if(res.data.code===0){
          for(let i=0;i<3;i++){
            majorData.push(rightOPT[valueGet[i]]);//获取整个子数组
            nameGet.push(rightOPT[valueGet[i]].name);
            salaryGet.push(JSON.parse(rightOPT[valueGet[i]].salary));
          }

        };
        JSON.stringify(salaryGet);
        that.setData({
          nameGet: nameGet,
          majorData: majorData,
          salaryGet: salaryGet
        });
        console.log(salaryGet);
        console.log(nameGet);
      },
      fail: function(res) {},
      complete: function(res) {},
    })

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