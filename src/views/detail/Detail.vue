<template>
  <div id="detail">
    <detail-nav-bar />
    <btscroll class="content" ref="btscroll">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo='detailInfo' @imageLoad='imageLoad'/>
    </btscroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from './childComps/DetailGoodsInfo';

import btscroll from "components/common/btscroll/BTscroll";

import { getDetail, Goods, Shop } from "network/detail";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo:{}
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    btscroll
  },
  created() {
    // 保存iid
    this.iid = this.$route.query.iid;
    // console.log(this.iid);
    // 根据iid请求数据=>detail.js
    this.getDetailData();
  },
  methods: {
    getDetailData() {
      getDetail(this.iid).then(res => {
        console.log(res);
        const data = res.result;
        this.topImages = data.itemInfo.topImages;
        // console.log(this.topImages);
        // 获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        //获取店铺信息
        this.shop = new Shop(data.shopInfo)
        //获取商品图片信息
        this.detailInfo = data.detailInfo
      });
    },
    imageLoad(){
      this.$refs.btscroll.refresh()
    }
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