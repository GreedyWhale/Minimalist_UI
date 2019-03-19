interface Toast {
  <T>(message: Vue.VNode | string, toastOptions?: any): Vue.Component;
}

interface CallBack {
  <T> (vueCompontent: Vue.Component, ...rest: any[]): any;
}

export { Toast, CallBack };
