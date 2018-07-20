//logs.js
const util = require('../../utils/util.js')


var end; 
var ssd;
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    logs: [],
    button:"开始",
    endButton:"停止",
    sty:"神马",
    dateText:'早上',
    datas:[],
    food:"面包",
    switchs:false,
    content:"火锅 卤肉饭 拉面 饺子 烤鱼 干锅 麻辣烫 汉堡 烤鸭 肯德基 麦当劳 寿司 大盘鸡 炒饭 肘子饭 煲仔饭 咖喱 手抓饼 煎饼果子 烧烤 蛋糕 粥 面包 吉野家 必胜客 烤肉饭 永和豆浆 米线 沙拉 抄手 馄饨 钵钵鸡 炒面 河粉 涮羊肉 手抓羊肉 烤羊排 华莱士",
    content1: "火锅 卤肉饭 烤鱼 干锅 烤鸭 炒饭 肘子饭 煲仔饭 烤肉饭 钵钵鸡 涮羊肉 麻辣烫 吉野家",
    content2: "拉面 饺子 煎饼果子 粥 面包 永和豆浆 米线 抄手 馄饨 炒面 河粉 过桥米线 担担面 豌杂面",
    content3: "大盘鸡 手抓羊肉 烤羊排 牛肉拉面 炒面 拌面 烤羊肉 烤全羊 烤羊腿",
    content4: "麻辣烫 炒饭 烧烤 炒河粉 馄饨 饺子 烤冷面 臭豆腐 粽子 元宵 汤圆 火腿",
    content5: "必胜客 肯德基 麦当劳 咖喱 豪客来 牛排 披萨 意大利面 芝士焗饭 汉堡王 吉野家",
    content6: "必胜客 肯德基 麦当劳 华莱士 汉堡王 汉堡 披萨",
    content7: "蛋糕 寿司 沙拉 冰淇凌 冰雪皇后 华夫饼",
    content8: "咖啡 漫咖啡 星巴克 太平洋 Costa",
    content9: "茶 coco 一点点 快乐柠檬 鲜果时光 贡茶" 
  },

  map: function () {
    wx.navigateTo({
      url: '../map/map?str='+this.data.sty
    })
  },
  onLoad: function () {
    // this.setData({
    //   logs: (wx.getStorageSync('logs') || []).map(log => {
    //     return util.formatTime(new Date(log))
    //   })
    // })
    wx.showShareMenu({
      withShareTicket: true
    })
    this.Date()
  },
  Date:function(){
    // 调用函数时，传入new Date()参数，返回值是日期和时间 
    var time = new Date().getHours();
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    //console.log(time)
    if (0 <= time && time<11 )
    {
      console.log(111)
      this.setData({
        dateText: "早饭"
      }); 
    }
    if (11 <= time && time < 17) {
      this.setData({
        dateText: "午饭"
      });
    }
    if (17 <= time && time < 21) {
      this.setData({
        dateText: "晚饭"
      });
    }
    if (21 <= time && time < 23) {
      console.log(111)
      this.setData({
        dateText: "夜宵"
      });
    } 
  },
  
  // 自定义的开始按钮
  startBtn: function () {
    var config=1;
    try {
      config = wx.getStorageSync('config');
      wx.clearStorage('config');
      console.log('config:'+config);
    } catch (e) {
      console.log(e);
    }
    var con = this.data.content;
    switch(config)
    {
      case "11":
        con=this.data.content1;
        break;
      case "12":
        con=this.data.content2;
        break;
      case "13":
        con=this.data.content3;
        break;
      case "14":
        con=this.data.content4;
        break;
      case "21":
        con=this.data.content5;
        break;
      case "22":
        con=this.data.content6;
        break;
      case "23":
        con=this.data.content7;
        break;
      case "31":
        con=this.data.content8;
        break;
      case "32":
        con=this.data.content9;
        break;
      default:
        break;
    }
    var content = con.split(" ");
    this.setData({
      switchs: true
    })
    this.startn(content);
    //隐藏消失
    this.endDatas();
  },
  startn:function(content)
  {
    var that = this;
    end = setTimeout(function () {
      var s = content[Math.floor(Math.random() * content.length)]
      // console.log(that.data.datas)
      var datas = that.data.datas
      datas.push({
        "name":s,
        "x":Math.floor(Math.random() * 350),
        "y": Math.floor(Math.random() * 600),
        "size": Math.floor(Math.random() * 40),
        "opacity": Math.floor(Math.random()*2)
      })
      that.setData({
        sty: s
      })
      wx.setStorage({
        key: 'food',
        data: s,
      })
      that.startn(content);
    }, 40)

  
  },
  // 自定义的暂停按钮  
  endBtn: function () {
    var that=this
    this.setData({
      switchs: false,
    })
    console.log("暂停按钮");
    clearTimeout(end);
    //20秒后关闭
    setTimeout(function () {
      clearTimeout(ssd);
    }, 2000)
    
  },
  //定时清除数组
  endDatas:function(){
    var that = this
    ssd = setTimeout(function () {
      var datas = that.data.datas
      var cdata = []
      for (var sd = 0; sd < datas.length; sd++) {
        var opacity = datas[sd].opacity - 0.01
        if(opacity<0){
          //console.log(opacity)
        }else{
          cdata.unshift({
            "name": datas[sd].name,
            "x": datas[sd].x,
            "y": datas[sd].y,
            "size": datas[sd].size,
            "opacity": opacity
          })
        } 
      }
      that.setData({
        datas: cdata
      })
      that.endDatas();
    }, 10)
  }

})


