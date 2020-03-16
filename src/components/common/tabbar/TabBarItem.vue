<template>
  <div class="tab-bar-item" @click="activeLink()">
    <!-- 分别使用template模板进行slot插槽包装
        ==》因为slot是要被替换成另一个标签的，防止替换后的v-if这些操作不实现
        ==>但是像需要绑定样式的插槽里面就不能直接<slor :class="active"></slot>。因为插槽是直接被替换的，即这条代码已经消失了，所以使用template-->
    <template v-if="!isActive">
      <slot name="item-icon"></slot>
    </template>
    <template v-else>
      <slot name="item-icon-active"></slot>
    </template>
    <!-- 两个slot的原因是，业务中只需要动态改变图片和文字 -->
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  // props传值（父传子）：由maintabbar传递过来
  props: {
    link: String,
    fontStyle:{
      type:String,
      default:'red'
    }
  },
  data() {
    return {
      // isActive: false
    };
  },
  methods: {
    activeLink() {
      // this.$route.path 是$route里面的一个方法 还有meta，query等
      // $route==》哪一个路由处于活跃，那么他就哪一个对象
      // 所有下面判断语句为活跃路由的url !== 当前的url（通过props里拿的）
      if (this.$route.path != this.link) {
        // $router所有组件都具备这个对象。注:如果没有返回功能则使用.push()方法
        this.$router.replace(this.link);
      }
    }
  },
  computed: {
    //  this.$route.path (/fenlei),那么就能实现当前活跃的url地址跟四个按钮组件获取来的link的比较
    isActive(){
      // return this.$route.path == this.link
      return this.$route.path.indexOf(this.link) !== -1
    },
    activeStyle(){
      // 当这个为活跃url时，添加style属性
      //动态绑定class\style ==> :class=“{active:isActive}”
      return this.isActive ? {color:this.fontStyle} : {}
    }
  },
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
}

</style>
