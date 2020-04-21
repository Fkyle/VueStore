<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>

    <!-- 复用tab-control，当到达一定位置的时候显示 -->
    <tab-control :titles="['流行', '新款', '精选']" 
    @tabClick="tabClick" ref="tabControl1" 
    v-show="isTabFixed" :class="{isFix:isTabFixed}"/>

    <btscroll
      class="content"
      ref="btscroll"
      :probe-num="3"
      :pull-up-load="true"
      @scrollPosition="scrollPosition"
      @pullingUp="pullingUp"
    >
      <!-- 轮播图 -->
      <!-- props传值（父->子） 第二个banners是这个父组件的所要给子组件传递的信息。-->
      <!-- 子向父传值是子组件调用$emit() -->
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"/>
      <!-- 推荐 -->
      <recomment-view :recommends="recommends" />
      <!-- 近期热销 -->
      <feature-view />
      <!-- TabControl(流行、新款、精选) -->
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2"/>
      <!-- 商品展示 -->
      <good-list :goods="goods[currentType].list" />
    </btscroll>

    <!-- 在我们需要监听一个组件的原生事件时，必须给对应的事件加上.native -->
    <back-top @click.native="backtop" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommentView from "./childComps/RecommentView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import btscroll from "components/common/btscroll/BTscroll";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodList from "components/content/goodlist/GoodList";
import BackTop from "components/content/backtop/BackTop";

//这里+了｛｝是因为home.js没有使用export default导出,而是具名的
import { getHomeMultidata, getHomeMultiGoods } from "network/home.js";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false,
      taboffsetTop:0,
      isTabFixed:false,
      saveY:0
    };
  },
  components: {
    HomeSwiper,
    RecommentView,
    FeatureView,
    NavBar,
    TabControl,
    GoodList,
    btscroll,
    BackTop
  },
  methods: {
    //请求多个数据,数据结构赋值
    //这个函数是一个promise对象在home.js中
    getHomeData() {
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeMultiGoods(type, page).then(res => {
        // console.log(res);
        // 注意，不能直接赋值this.goods[type].list = res.data.list！这么做会覆盖获取到的数据
        this.goods[type].list.push(...res.data.list);
        //将外部data里的page+1
        this.goods[type].page += 1;
      });
    },
    /**
     * 事件监听相关的方法👇
     */
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl2.currentIndex=index
      this.$refs.tabControl1.currentIndex=index
    },
    backtop() {
      // 获取到btscroll组件后调用其BackTop函数
      this.$refs.btscroll.BackTop(0, 0, 1000);
    },
    scrollPosition(position) {
      // console.log(position);
      //监听backtop
      this.isShowBackTop = position.y < -1000;
      // 监听tab-control是否显示
      this.isTabFixed = this.taboffsetTop < (-position.y)
    },
    pullingUp() {
      // console.log('上拉加载更多');
      this.getHomeGoods(this.currentType);
      this.$refs.btscroll.finishPullUp();
    },
    swiperImgLoad(){
      // 吸顶效果
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    //防抖函数
    debounce(func,delay){
      let timer = null  //定时器timer
      // 这里形成闭包(timer)
      return function(...args){
        if(timer) clearTimeout(timer)
        timer = setTimeout(()=>{
          func.apply(this,args)
        },delay)
      }
    }
  },
  created() {
    // 请求多个数据
    this.getHomeData(),
      // 请求商品数据
    this.getHomeGoods("pop"),
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    const refresh = this.debounce(this.$refs.btscroll.refresh,100)
    // 监听goodListItem中图片加载完成，因为图片有时候加载过慢，导致btscroll计算到的高度偏低需重新计算可滚动大小
    this.$bus.$on("imgItemLoad", () => {
    // console.log('Home中监听每一张图片的加载进度');
    // this.$refs.btscroll && this.$refs.btscroll.refresh();
    refresh()
    });
  },
  //保存离开时的url地址。相关的api有keep-alive/activated/deactivated(只有组件使用了keep-alive后activated才有效)
  // beforeRouteLeave(to, from, next) {
  //   // console.log(this.$route.path);
  //   this.path = this.$route.path;
  //   next();
  // },
  destroyed() {
      console.log('home destory');
    },
  activated(){
      // console.log('活跃状态');
      this.$refs.btscroll.refresh()
      this.$refs.btscroll.BackTop(0,this.saveY,0)
      
    },
  deactivated() {
      // console.log('不活跃状态')
      this.saveY = this.$refs.btscroll.getScrollY()
      // console.log(this.saveY);

    }
};
</script>

<style scoped>
#home {
  /* 因为fixed脱离文档流后，swiper顶上来后被z-index遮挡。 */
  padding-top: 44px;
  /* vh->viewpoint 视图高度 */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: #ff8189;
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.isFix{
  position: relative;
  z-index: 9;
}
.content {
  /* 思路：上下高度已知,通过使用绝对定位（相对于父元素home），然后距离上边距44px，下边距49px */
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

</style>
