import RatingStars from "./rating-stars.vue";

function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component("RatingStars", RatingStars);
}

const plugin = {
  install
};

let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

RatingStars.install = install;

export default RatingStars;