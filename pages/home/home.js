// pages/home/home.js
import {
  getMultiData,
  getGoodsData
} from '../../service/home.js'
const TOP_DISTANCE =300;
const types=['pop','new','sell']

Page({
  data:{
    banners:[],
    recommends:[],
    titles:['流行','新款','精选'],
    goods:{
      'pop':{page:0,list:[]},
      'new':{page:0,list:[]},
      'sell':{page:0,list:[]}
    },
    currentType:'pop',
    showBackTop:false,
    isTabFixed:false
  },
  onLoad:function(options){
    getMultiData().then(res=>{
      const banners = res.data.data.banner.list;
      const recommends = res.data.data.recommend.list;
      this.setData({
        banners,
        recommends
      })
    }),
   this._getGoodsidata('pop')
   this._getGoodsidata('new')
   this._getGoodsidata('sell')

  },
  onShow(){

  },
  _getGoodsidata(type){
    // 获取页码
    const page=this.data.goods[type].page+1
    getGoodsData(type,page).then(res=>{
      const list = res.data.data.list;
      const oldList=this.data.goods[type].list;
      oldList.push(...list);
      const typeKey = `goods.${type}.list`;
      const pageKey = `goods.${type}.page`;
      this.setData({
       [typeKey]:oldList,
       [pageKey]:page
      })
      // this.data.goods[type].list.push(...list)
    })
  },
  handleTabClick(event){
    // 取出index
    const index = event.detail.index;
    // 设置currentType
    this.setData({
      currentType:types[index]
    })
    
  },
  handleImageLoad(){
   wx.createSelectorQuery()().select('#tab-control').boundingClientRect(rect =>{
     console.log(rect);
     
   }).exec()
    
  },
  onReachBottom(){
    // 上拉加载更多
   this._getGoodsidata(this.data.currentType)
 
  },
  onPageScroll(options){
    // 取出scrolltop
    
    const scrollTop = options.scrollTop;
     //  修改backtop
     const flag=scrollTop >=TOP_DISTANCE;
     if(flag !=this.data.showBackTop){
      this.setData({
        showBackTop: flag
      })
     }
 
  }
})

