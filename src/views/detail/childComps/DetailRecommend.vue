<template>
  <div class="recommend">
    <div class="recommend-header">
      热门推荐
    </div>
    <div class="recommend-list">
      <good-list-item v-for="(item,index) in recommendInfo" :key="item.acm" :good-item='item'/>
    </div>
  </div>
</template>

<script>
import GoodListItem from "components/content/goodlist/GoodListItem";

export default {
  name:"DetailRecommend",
  components:{
    GoodListItem,
  },
  props:{
    recommendInfo:{
      type:Array,
      default(){
        return []
      }
    }
  }

}
</script>

<style scoped>
 .recommend{
   padding:5px;
 }
 .recommend-header{
   line-height: 40px;
   padding-left: 8px;
   font-size: 15px;
   color: #333;
 }
 .recommend-list{
   display: flex;
   justify-content: space-around;
   flex-wrap: wrap;
 }
</style>