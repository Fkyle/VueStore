<template>
  <div class="good-list">
    <!-- {{goods}} -->
    <good-list-item v-for="item in goods" :key="item.acm" :good-item='item'/>
  </div>
</template>

<script>
import GoodListItem from './GoodListItem'

export default {
  name:"GoodList",
  components:{
    GoodListItem
  },
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.good-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

</style>