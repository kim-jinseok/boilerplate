export default {
  install(Vue) {

    Vue.filter('readMore', function (text, length, suffix) {
      return text.substring(0, length) + suffix;
    });

  }



}
