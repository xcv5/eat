//logs.js
const util = require('../../utils/util.js');
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
var dataArray = new Array()
Page({
  data: {
    latitude: 23.099994,
    longitude: 113.324520,
    scale: 16,
    markers: [],
    food:" "
  },
  onLoad: function (options) {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: '7H6BZ-LL36O-357WI-SLUJT-2BSDE-2DFM4'
    });
    console.log(options.str);
    var _this = this;
    this.setData({
      food:options.str
    })
   
    wx.getSystemInfo({
      success: function (res) {
        //设置map高度，根据当前设备宽高满屏显示
        _this.setData({
          view: {
            Height: res.windowHeight
          }
        })
      }
    })

    wx.getLocation({
      success: function (res) {
        type: 'wgs84',
          _this.setData(
            {
              latitude: res.latitude,
              longitude: res.longitude
            }
          )
      },
    })
  },
  
  onShow: function () {
    // 调用接口
    var that = this;
   
   
    qqmapsdk.search({
      keyword: that.data.food,
      success: function (res) {
        console.log(res);
        
        dataArray=res.data;
        console.log(dataArray);
        var markers_new = new Array()
        /*var info =
          {
            iconPath: "../../img/ding.png",
            id: 0,
            latitude: 31.237524,
            longitude: 121.5128895,
            width: 20,
            height: 30,
            name: ""
          };
          */
        var sum=res.count;
        if(sum>10) sum=10;
        for (var i = 0; i < sum; i++) {
          var dic = dataArray[i];
          //console.log(dic);
          var info =
            {
              //iconPath: "../../img/ding.png",
              id: 0,
              latitude: 31.237524,
              longitude: 121.5128895,
              //width: 20,
              //height: 30,
              title: ""
            };
          info.id = i;
          //info.width = 20;
          //info.height = 30;
          info.latitude = dic.location.lat;
          info.longitude = dic.location.lng;
          info.title = dic.title;
          // 添加对象到数组
          //console.log(info);
          markers_new.push(info);
          //console.log(markers_new);
        }
        console.log(markers_new);
        // 执行setData, 对markers进行赋值, 之后在 .wxml中引用
        that.setData(
          { 
            markers: markers_new 
          }
        )
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  }
})