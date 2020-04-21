<template>
  <div class="params-info">
    <table v-for="(table,index) in paramsInfo.tables" 
           class="info-size" :key='index'>
      <tr v-for="(tr,indey) in table" :key="indey">
        <td v-for="(td,indez) in tr" :key="indez">
          {{td}}
        </td>
      </tr>
    </table>
    <table class="info-param">
      <tr v-for="(info,index) in paramsInfo.infos" :key="index">
        <td class="info-param-key">{{info.key}}</td>
        <td class="info-param-value">{{info.value}}</td>
      </tr>
    </table>
    <div class="info-img" v-if="paramsInfo.image !==''">
      <img alt="" v-lazy="paramsInfo.image">
    </div>
  </div>
</template>

<script>
export default {
  name:"DetailGoodsParams",
  props:{
    paramsInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return{

    }
  }
}
</script>

<style scoped>
  .params-info{
    padding: 20px 15px;
    font-size: 15px;
  }
  .params-info table{
    width: 100%;
    border-collapse: collapse;
  }
  .params-info table tr{
    line-height:42px;
  }
  .params-info table tr td{
    border-bottom: 2px solid rgba(100, 100, 100, 0.1);
  }
  .info-param{
     border-top: 1px solid rgba(0,0,0,.1);
  }
  .info-param-key{
    width: 95px;
  }
  .info-param-value{
    color: #eb4868;
  }
  .info-img{
    width:100%;
  }
</style>