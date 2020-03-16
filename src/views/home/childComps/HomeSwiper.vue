<template>
  <swiper>
      <swiper-item v-for="item in this.banners" :key="item.title">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index.js'
export default {
  name:'HomeSwiper',
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  data(){
    return{
      isImgLoad:false
    }
  },
  methods:{
    //这样就能只发送一次监听给Home.vue
    imgLoad(){
      if(!this.isImgLoad){
        this.$emit('swiperImgLoad')
        this.isImgLoad=true
      }
    }
  }
  
}
</script>

<style>

</style>