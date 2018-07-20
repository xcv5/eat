Page({
  data: {
    cateItems: [
      {
        cate_id: 1,
        cate_name: "中餐"
      },
      {
        cate_id: 2,
        cate_name: "西餐",
      },
      {
        cate_id: 3,
        cate_name: "休闲餐"
      },
    ],
    curNav: 1,
    curIndex: 0
  },

  //事件处理函数  
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
  },

  radioChange: function (event) {
    var config = event.detail.value;
    try {
      wx.setStorageSync('config', config);
    } catch (e) {
      console.log(e);
    }
  }
})  