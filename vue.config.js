// 用来配置内部config文件,暂时用来修改别名
module.exports = {
  configureWebpack: {
    resolve: {
      // extension:[],
      alias: {
        // "@": "src",
        'assets':'@/assets',
        'common': "@/common",
        'components': "@/components",
        'network': "@/network",
        'views': "@/views"
      }
    }
  }
};
