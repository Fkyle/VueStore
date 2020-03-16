#### better-scroll 1.x 

- 安装  

- ``````
  npm install better-scroll --save
  ``````

- 使用

- ```
  import BScroll from 'better-scroll'
  ```

- ```javascript
  data(){
      return {
  		scroll:null
      }
  }
  mounted(){
      //不推荐使用query获取，使用ref
  	this.scroll = new BScroll(document.querySelector('.wrapper'),{
          probeType:3,
          pullUpLoad:true,
          click:true
      })
  }
  ```

- *ref如果是绑定在组件中的，那么通过this.$refs.refname获取到的是一个组件对象*

- *ref如果是绑定在普通的元素中，那么通过this.$refs.refname获取到的是一个元素对象即query到的*

- 

1. 默认情况下BScroll是不可以实时的监听滚动位置的

   + **probeType** 侦测滚动

     > ​	默认值为0，且0和1都是不侦测 实时的位置

     > ​	2：在手指滚动的过程侦测，离开后的 弹性移动不侦测
     >
     > ​	3：只要是滚动，都侦测
     >
     > ```javascript
     > bscroll.on('scroll',(position)=>{
     > 	console.log(position)
     > 	// probeType:3 这样就能实现这个监听
     > })
     > ```

   + **pullUpLoad**  上拉加载更多

     > ​	pullUpLoad:true 实现上拉加载
     >
     > ````JavaScript
     > bscroll.on('pullingUp',()=>{
     > 	console.log('上拉加载更多')
     >     // 发送网络请求，请求更多页的数据
     >     // 等数据请   求完成，并且将新的数据展示出来后
     >     bscroll.finishPullUp()
     >     // 调用上面这个函数，是用来告诉它这次的上拉加载已经实现了，否则只能上拉加载一次
     > })
     > ````
     >
     > 

   + scrollTo(x,y,time) 到达指定位置

   +   

   + 修饰符**.native**什么时候使用

     > ​	在我们需要监听一个组件的原生事件时，必须给对应的事件加上.native


   #### 解决滚动的BUG

   > ​	![image-20200312140350652](C:\Users\kyle\AppData\Roaming\Typora\typora-user-images\image-20200312140350652.png)

   > ​	调用bscroll的refresh=>事件总线的使用
   >
   > ```javascript
   > Vue.prototype.$bus = new Vue()		main.js  
   > this.$bus.$on('事件名称',fn('参数'){
   > 	this.$refs.btscroll.refresh()
   > })									Home.vue
   > this.$bus.$emit('事件名称','参数')			 GoodListItem.vue
   > 
   > ```
   >
   > - 也可以使用Vuex存储状态，Home.vue根据状态的改变进行refresh
   >
   >   - 优化=>对refresh非常频繁的问题，进行防抖操作
   >
   >   - 防抖debounce、节流throttle
   >
   >     ```javascript
   >     debounce(fn,delay){
   >     	let timer = null  //定时器timer
   >     	if (timer) clearTimeout(timer)
   >     	return function(...args){
   >     		timer = setTimeout(()=>{
   >     			fn.apply(this,args)
   >     		},delay)
   >     	}
   >     }
   >     // 其中fn是BTscroll里的refresh函数
   >     //debounce 返回出去一个函数 用一个变量进行存储再调用该变量
   >     const refresh = debounce(this.$refs.btscroll.refresh,100)
   >     this.$bus.$on('事件名称',()=>{
   >         refresh()
   >     })
   >     ```
   >
   >     - **防抖函数起作用的过程**
   >     - 如果我们直接执行refrsh函数，那么refresh函数会被执行30次
   >     - 可以将refresh函数传入到debounce函数中，生成一个新的函数
   >     - 之后在调用非常频繁的时候，就使用新生成的函数
   >     - 而新生成的函数，并不会非常频繁的调用，如果下一次执行来的非常快，那么会将上一次取消掉。

### 吸顶效果

##### 一.获取状态栏（新款，流行，精选）的offsetTop属性

``````JavaScript
this.$refs.tabControl.$el.offsetTop
// 组件没有offsetTop属性，所以要获取到组件内的元素
// 通过$el能过获取到组件内的根元素（所有的组件都具有$el属性）
``````

但是这有个弊端，首页的图片没有加载完成，他就获取完高度，这是有误差的

所以通过监听轮播图、推荐等图片的加载完成后进行获取高度

```javascript
HomeSwiper.vue
<img @load="imgLoad">
methods:{
	imgLoad(){
		this.$emit("swiperImgLoad")
	}
}
//-----------------------优化----------------------
data(){
    return {
		isLoad:false
    }
}
methods:{
	imgLoad(){
        if(!isLoad){
			this.$emit("swiperImgLoad")
            this.isLoad=true
        }
    }
}
```

思路：在homeswiper.vue中监听图片的加载情况，然后传递给home.vue，home获取tab-control的offsetTop值，再新增一个tab-control组件，通过v-show显示隐藏

- 注意：两个tab-control有bug，点击选择后两个组件不同步，可以通过设置currentIndex解决