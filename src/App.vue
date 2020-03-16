<template>
  <div id="app">
    <!-- 把Detail排除在外，让他每次进入都能进行生命周期函数create\destroy... -->
    <keep-alive exclude="Detail">
    <router-view/>
    </keep-alive>
    <MainTabBar/>
  </div>
</template>

<script>
import MainTabBar from 'components/content/maintabbar/MainTabBar'
export default {
  name: 'app',
  components: {
    MainTabBar
  }
}
</script>

<style scoped>
 @import "assets/css/base.css";
</style>
