<template>
<!-- ref&children 获取指定的子组件&获取所有的子组件 => this.$refs.x-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name:"BTscroll",
  data(){
    return{
      BTscroll:null 
    }
  },
  props:{
    probeNum:{
      type:Number,
      default(){
        return 1
      }
    },
    pullUpLoad:{
      type:Boolean,
      default(){
        return false
      }
    }
  },
  mounted(){
    // 这里不推荐使用document.querySelector('.wrapper')，因为.wrapper不一定只有一个且只在这个组件里
    this.BTscroll = new BScroll(this.$refs.wrapper,{
      probeType:this.probeNum,
      pullUpLoad:this.pullUpLoad,
      click:true
    })
    //返回顶部 
    this.BTscroll.scrollTo(0,0)
    // 监听滚动
    this.BTscroll.on('scroll',(position)=>{
      // console.log(position);
      // 把position调出去给有需要的人用
      this.$emit('scrollPosition',position)
    })
    // 上拉加载更多
    this.BTscroll.on('pullingUp',()=>{
      // console.log('上拉加载更多');
      this.$emit('pullingUp')
      // this.BTscroll.finishPullUp()
    })
  },
  methods:{
    BackTop(x=0,y=0,time=500){
      this.BTscroll && this.BTscroll.scrollTo && this.BTscroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.BTscroll && this.BTscroll.finishPullUp && this.BTscroll.finishPullUp()
    },
    refresh(){
      // console.log('优化后的加载情况');
      this.BTscroll && this.BTscroll.refresh && this.BTscroll.refresh()
    },
    getScrollY(){
      return this.BTscroll ? this.BTscroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>