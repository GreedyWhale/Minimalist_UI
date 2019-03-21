interface Toast {
  (message: Vue.VNode | string, toastOptions?: any): Vue.Component;
}

interface CallBack {
  (vueCompontent: Vue.Component, ...rest: any[]): any;
}

export { Toast, CallBack };
