<template>
  <div id="app">
    <keep-alive>
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
