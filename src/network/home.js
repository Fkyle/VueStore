import {request} from './request'
export function getHomeMultidata(){
  return request({
    url:'/home/multidata'
  })
}
// type，page参数是url地址中？后面紧接的参数
export function getHomeMultiGoods(type,page){
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}
//把所有和Home组件相关的请求都到这边做，且返回的依旧是一个promise对象