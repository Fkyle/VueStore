<template>
  <div class="detail">
    <detail-nav-bar/>
    <detail-swiper :topImages='topImages'/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'

import {getDetail} from 'network/detail'
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages:[]
    };
  },
  components:{
    DetailNavBar,
    DetailSwiper
  },
  created() {
    // 保存iid
    this.iid = this.$route.query.iid;
    // console.log(this.iid);
    // 根据iid请求数据=>detail.js
    this.getDetailData()
  },
  methods:{
    getDetailData(){
      getDetail(this.iid).then(res=>{
        console.log(res);
        this.topImages = res.result.itemInfo.topImages
        console.log(this.topImages);
      })
    }
  }
};
</script>

<style scoped>
</style>