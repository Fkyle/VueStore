<template>
<!-- Object.keys(obj).length ===0 判断是否为空对象 -->
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other line">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for = "index in goods.services.length-1" :key='index'>
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name:"DetailBaseInfo",
  props:{
    goods:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
.base-info{
  margin-top: 15px;
  padding:0 8px;
  color:#999;
  border-bottom:5px solid #f2f5f8;
}
.info-title{
  color:#000;
  font-size: 16px;
  margin:10px;
  font-weight:bold
}
.info-price{
  margin:8px 8px 20px;
}
.info-price .n-price{
  font-size: 26px;
  color:var(--color-high-text);
  font-weight: bold;
  padding-right: 5px;
}
.info-price .o-price{
  font-size: 14px;
  font-weight: bold;
  text-decoration: line-through;
  padding-right: 5px;
}
.discount{
  color:white;
  border-radius: 45px;
  background-color: var(--color-high-text);
  font-size: 13px;
  padding:4px;
  position: relative;
  top:-8px
}
.info-other{
  margin-top: 15px;
  line-height: 30px;
  display: flex;
  font-size: 14px;
  border-bottom:1px solid #ccc;
  justify-content: space-between;
}
.info-service{
  display: flex;
  justify-content: space-between;
  line-height: 60px;
}
.info-service-item img{
  width: 14px;
  height: 14px;
  position: relative;
  top: 2px;
}
.info-service-item span{
  font-size: 14px;
  color: #333;
}

</style>