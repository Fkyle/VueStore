<template>
  <tab-bar>
    <!-- content是存放业务相关的文件夹 -->
      <tab-bar-item link='/home' fontStyle='pink'> 
        <img slot="item-icon" src="@/assets/img/tabbar/index.png" alt="主页" />
        <img slot="item-icon-active" src="@/assets/img/tabbar/index2.png" alt="主页" />
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item link='/fenlei' fontStyle='pink'>
        <img slot="item-icon" src="@/assets/img/tabbar/fenlei.png" alt="分类" />
        <img slot="item-icon-active" src="@/assets/img/tabbar/fenlei2.png" alt="分类" />
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item link='/shop' fontStyle='pink'> 
        <img slot="item-icon" src="@/assets/img/tabbar/shop.png" alt="购物车" />
        <img slot="item-icon-active" src="@/assets/img/tabbar/shop2.png" alt="购物车" />
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item link='/me'>
        <img slot="item-icon" src="@/assets/img/tabbar/me.png" alt="我的" />
        <img slot="item-icon-active" src="@/assets/img/tabbar/me2.png" alt="我的" />
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar"
import TabBarItem from "components/common/tabbar/TabBarItem"

export default {
  name:'MainTabBar',
  components:{
    TabBar,TabBarItem
  }
}
</script>

<style>

</style>