import { createApp } from "vue";
import Loading from "./loading";
import { addClass, removeClass } from "@/assets/js/dom";

const relativeClass = "g-relative";

const loadingDirective = {
  mounted(el, binding) {
    const app = createApp(Loading); // loading组件实例
    const instance = app.mount(document.createElement("div"));
    el.instance = instance;

    const title = binding.arg;
    if (typeof title !== "undefined") {
      instance.setTitle(title);
    }

    if (binding.value) {
      append(el);
    }
  },
  updated(el, binding) {
    const title = binding.arg;
    if (typeof title !== "undefined") {
      el.instance.setTitle(title);
    }
    if (binding.value !== binding.oldValue) {
      binding.value ? append(el) : remove(el);
    }
  },
};

function append(el) {
  const style = getComputedStyle(el);
  if (["absolute", "fixed", "relative"].indexOf(style.position) === -1) {
    addClass(el, relativeClass);
  }
  el.appendChild(el.instance.$el);
}

function remove(el) {
  removeClass(el, relativeClass);
  el.removeChild(el.instance.$el);
}

export default loadingDirective;
