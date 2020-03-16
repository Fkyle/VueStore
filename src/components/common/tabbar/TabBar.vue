<template>
  <div id="tab-bar">
    <!-- 插槽，把tab-bar-item里的内容差进来 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
};
</script>

<style scoped>

#tab-bar{
  /* flex 弹性布局  =》flex：1 等距离 */
  display: flex;
  background-color: #f6f6f6;

/* 生成固定定位的元素，相对于浏览器窗口进行定位。 */
  position: fixed;
  left:0;
  right:0;
  bottom: 0;

/* 边框阴影x y 深度 透明的 */
  box-shadow: 0 -3px 1px rgba(201, 200, 200, 0.2)
}

</style>
