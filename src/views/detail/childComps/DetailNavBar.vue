<template>
  <div>
    <nav-bar class="detail-nav">
      <div class="back" slot="left">
        <img src="~assets/img/common/back.svg" alt @click="backClick" />
      </div>
      <div class="titles" slot="center">
        <div
          class="title-item"
          v-for="(item,index) in titles"
          :key="item.index"
          @click="titleClick(index)"
          :class="{'active' : currentIndex === index}"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  props:{
    currentIndex:{
      type:Number,
      default:0
    }
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit('themeClick',index)
    },
    backClick() {
      this.$router.back();
      // this.$router.go(-1)
    }
  }
};
</script>

<style scoped>
.detail-nav {
  background-color: #fff;
  font-weight: normal;
  position: relative;
  z-index: 9;
}
.titles {
  display: flex;
  font-size: 13px;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.back img {
  margin-top: 12px;
}
</style>