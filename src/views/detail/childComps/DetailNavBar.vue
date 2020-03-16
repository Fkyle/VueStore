<template>
  <div>
    <nav-bar>
      <div class="back" slot='left'>
        <img src="~assets/img/common/back.svg" alt="" @click="backClick">
      </div>
      <div class="titles" slot='center'>
        <div class="title-item" 
            v-for="(item,index) in titles" 
            :key="item.index" @click="titleClick(index)"
            :class="{active : currentIndex === index}">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name:'DetailNavBar',
  components:{
    NavBar
  },
  data(){
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods:{
    titleClick(index){
      this.currentIndex = index
    },
    backClick(){
      this.$router.back();
      // this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.titles{
  display: flex;
  font-size: 13px;
}
.title-item{
  flex:1
}
.active{
  color: var(--color-high-text);
}
.back img{
  margin-top: 12px;
}

</style>