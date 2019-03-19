import Vue from "vue";
import { Toast } from "@/components/toast/toast.d.ts";

declare module "vue/types/vue" {
  interface Vue {
    $toast: Toast;
  }
}
