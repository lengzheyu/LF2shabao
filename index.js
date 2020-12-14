var app = getApp();
 
Page({
    data: {
      noWclData: 0,
      tabBarList: [],
      date: [],
      weeks: ['日', '一', '二', '三', '四', '五', '六'],
      days: [],
      year: 0,
      mouth: 0,
      nowDate: '',
      sts: -1,
      flag:0,
    },
 
  /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function(t) {
      var that = this
      let deviceid = "644335375"
      let apikey = "WJnZ9VwbljYUdcOTo3=6c1mNJSY="

      wx.request({
        url: "https://api.heclouds.com/devices/" + deviceid + "/datastreams",
      method:'GET',
      header:{
        "content-type": 'application/json',
        "api-key": apikey
      },
      success(res){
        console.log(res)
          that.setData({
            noWclData: res.data.data[1].current_value,
          })
      },
      fail: function(res){
        wx.showToast({ title: '系统错误' })
      },
      complete:function(res){
        wx.hideLoading()
      },
      })

      that.dateData();
      var myDate = new Date(); //获取系统当前时间
      var nowDate = myDate.getDate();
      that.setData({
        nowDate: nowDate
      })
      console.log(myDate);   //系统当前时间
      console.log(nowDate);  //当前是本月几日
      
      // 课表数据
      var courselist=[
        {
          id:1,
          img:null,
          time:'08:00-08:45',
          week: '1',
          didian:'N319',
          title:'高数',
        },{
          id: 2,
          img: null,
          time: '08:50-09:35',
          week: '1',
          didian:'N319',
          title: '线代',
 
        },{
          id: 3,
          img: null,
          time: '19:00-20:00',
          week: '1',
          week: '1',
          didian: 'N319',
          title: '英语',
        },{
          id: 4,
          img: null,
          time: '19:00-20:00',
          week: '1',
          didian:'N319',
          title: 'C++',
        },{
          id: 5,
          img: null,
          time: '19:00-20:00',
          week: '1',
          didian:'N319',
          title: '思修',
        }
      ]
      that.setData({
        courselist: courselist,
      });
      console.log(courselist);
 
      //底部导航
      this.setData({
            tabBarList: app.globalData.tabbar4
      });
      var a = this;
      /*app.util.request({
          url: "entry/wxapp/url",
          cachetime: "0",
          success: function(t) {
              wx.setStorageSync("url", t.data), a.setData({
                  url: t.data
              });
          }
      }),
      wx.setNavigationBarColor({
          frontColor: wx.getStorageSync("fontcolor"),
          backgroundColor: wx.getStorageSync("color"),
          animation: {
              duration: 0,
              timingFunc: "easeIn"
          }
      });
      */
    },
 
 
  // 点击日期事件
  selDate: function (e) {
    var that = this
    console.log('点击日期：',e.currentTarget.dataset.date);
    var index = e.currentTarget.dataset.index;    //获取下标
    that.setData({
       sts:index,
    });
    console.log('当前点击日期的下标:',index);
    console.log('当月数组：',this.data.days);  //当月数组
  },
 
  //用户点击增加月份
  plusMouth: function () {
    console.log("点击增加月份");
    var that = this;
    var date = new Date();
    var sysmouth = date.getMonth() + 1;  //系统当前月份
    console.log("系统当前月份：",sysmouth);
    var mouth;
    var year;
    mouth = this.data.mouth + 1
    console.log("点击后的月份：", mouth);
    year = this.data.year
    that.setData({
      flag: mouth - sysmouth
    })
    if (mouth > 12) {
      mouth = 1
      year++
    }
    this.updateDays(year, mouth)
  },
 
  //用户点击减少月份
  minusMouth: function () {
    console.log("点击减少月份");
    var date = new Date();
    var sysmouth = date.getMonth() + 1;
    console.log("系统当前月份：", sysmouth);
    var that = this;
    var mouth;
    var year;
    mouth = this.data.mouth - 1
    console.log("点击后的月份：", mouth);
    year = this.data.year
    console.log(mouth)
 
    
    that.setData({
      flag: mouth - sysmouth
    })
    if (mouth < 1) {
      mouth = 12
      year--
    }
    ;
    this.updateDays(year, mouth)
  },
 
 
  dateData: function () {
    var date = new Date();
    var days = [];
    var year = date.getFullYear();
    var mouth = date.getMonth() + 1;
    this.updateDays(year, mouth)
  },
 
  updateDays: function (year, mouth) {
    var days = [];
    var dateDay, dateWeek;
 
    // 根据日期获取每个月有多少天
    var getDateDay = function (year, mouth) {
      return new Date(year, mouth, 0).getDate();
    }
 
    //根据日期获取这天是周几
    var getDateWeek = function (year, mouth) {
      return new Date(year, mouth - 1, 1).getDay();
    }
 
    dateDay = getDateDay(year, mouth)
    dateWeek = getDateWeek(year, mouth)
 
    console.log('当前月份总天数：',dateDay);
    // console.log('当前月份总周数：',dateWeek);
 
    //向数组中添加天 
    for (var index = 1; index <= dateDay; index++) {
      days.push(index)
    }
    //向数组中添加，一号之前应该空出的空格
    for (var index = 1; index <= dateWeek; index++) {
      days.unshift(0)
    }
    this.setData({
      days: days,
      year: year,
      mouth: mouth,
      yue:mouth,
    })
    console.log('当前月份日期：',days);
  },
 
  
  changePage:function(){
    wx.navigateTo({
      url: "/pages/setting/setting"
    })
  }
});
