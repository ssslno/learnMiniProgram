// pages/home/childCpns/w-commend/w-Recommend.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
     recommends:{
       type:Array,
       value:[]
     }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isLoad:false

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleImage(){
    if(!this.data.isLoad){
      this.triggerEvent('imageload')
      this.data,isLoad = true
      console.log('图片')

      
    }
      
    }

  }
})
