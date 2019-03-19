import MToast from "@/components/toast/index.vue";

let currentToast: any;
export default {
  install(Vue: Vue.VueConstructor, options?: any) {
    Vue.prototype.$toast = function(message: Vue.VNode, toastOptions?: any) {
      if (currentToast) {
        currentToast.close()
      }
      currentToast = createToast(Vue, message, toastOptions);
    };
  }
};

function createToast(
  Vue: Vue.VueConstructor,
  message: Vue.VNode,
  propsData?: any
) {
  const Constructor = Vue.extend(MToast);
  const toast = new Constructor({ propsData });
  toast.$slots.default = [message];
  toast.$mount();
  toast.$on('close', () => { currentToast = null})
  document.body.appendChild(toast.$el);
  return toast;
}
