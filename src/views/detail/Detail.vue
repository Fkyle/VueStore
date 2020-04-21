<template>
  <div id="detail">
    <detail-nav-bar @themeClick='themeClick' :current-index="currentIndex"/>
    <btscroll class="content" ref="btscroll" :probe-num="3" @scrollPosition="scrollPosition">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info='detailInfo' />
      <detail-goods-params :params-info='paramsInfo' ref="params"/>
      <detail-comment-info :comment-info='commentInfo' ref="comment"/>
      <detail-recommend :recommend-info='recommendInfo' ref="recommend"/>
    </btscroll>
    <back-top @click.native='backtop' v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from './childComps/DetailGoodsInfo';
import DetailGoodsParams from './childComps/DetailGoodsParams';
import DetailCommentInfo from './childComps/DetailCommentInfo';
import DetailRecommend from './childComps/DetailRecommend';

import btscroll from "components/common/btscroll/BTscroll";
import BackTop from "components/content/backtop/BackTop"

import { getDetail, Goods, Shop, GoodsParams ,getRecommend} from "network/detail";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo:{},
      paramsInfo:{},
      commentInfo:{},
      recommendInfo:[],
      isShowBackTop:false,
      themeTopys:[],
      currentIndex:0
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailGoodsParams,
    DetailCommentInfo,
    DetailRecommend,
    btscroll,
    BackTop
  },
  created() {
    // 保存iid
    this.iid = this.$route.query.iid;
    // console.log(this.iid);
    // 根据iid请求数据=>detail.js
    this.getDetailData();
    this.getDetailRecommend();
  },
  methods: {
    getDetailData() {
      getDetail(this.iid).then(res => {
        // console.log(res);
        const data = res.result;
        this.topImages = data.itemInfo.topImages;
        // console.log(this.topImages);
        // 获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        //获取店铺信息
        this.shop = new Shop(data.shopInfo)
        //获取商品图片信息
        this.detailInfo = data.detailInfo
        //获取商品尺码数据
        this.paramsInfo = new GoodsParams(data.itemParams.info,data.itemParams.rule)
        // 获取评论信息
        this.commentInfo = data.rate
      });
    },
    getDetailRecommend(){
      getRecommend().then(res=>{
        console.log(res);
        this.recommendInfo = res.data.list
      })
    },
    scrollPosition(position){
      this.isShowBackTop = position.y < -500
      const positionY = -position.y
      this._listenScrollTheme(positionY)
    },
    backtop() {
      // 获取到btscroll组件后调用其BackTop函数
      this.$refs.btscroll.BackTop(0, 0, 1000)
    },
    _listenScrollTheme(position){
      let length = this.themeTopys.length
      for(let i = 0; i < length; i++){
        let iPosition = this.themeTopys[i]
        if(position >= iPosition && position < this.themeTopys[i+1]){
          if(this.currentIndex !== i){
            this.currentIndex = i
          }
          break;
        }
      }
    },
    themeClick(index){
      this.$refs.btscroll.BackTop(0,(-this.themeTopys[index])-15,1000)
    },
    _getoffsetTops(){
      this.themeTopys=[]
      this.themeTopys.push(0)
      this.themeTopys.push(this.$refs.params.$el.offsetTop)
      this.themeTopys.push(this.$refs.comment.$el.offsetTop)
      this.themeTopys.push(this.$refs.recommend.$el.offsetTop)
      // 给主题添加一个巨大的值来解决循环问题
      this.themeTopys.push(Number.MAX_VALUE)
    }
  },
  updated(){
    this._getoffsetTops()
  }
};
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 1;
  background-color: #fff;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 60px;
}

.back-top {
  position: fixed;
  right: 10px;
  bottom: 65px;
}
</style>