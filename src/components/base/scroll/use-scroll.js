import BScroll from "@better-scroll/core";
import ObserveDom from "@better-scroll/observe-dom";
import { ref, onMounted, onUnmounted } from "vue";

BScroll.use(ObserveDom);

export default function useScroll(wrapperRef, options, emit) {
  const scroll = ref(null);
  onMounted(() => {
    const scrollVal = (scroll.value = new BScroll(wrapperRef.value, {
      observeDOM: true,
      ...options,
    }));
    if (options.probeType > 0) {
      scrollVal.on("scroll", (pos) => {
        // 对外派发事件
        emit("scroll", pos);
      });
    }
  });
  onUnmounted(() => {
    scroll.value.destroy();
  });

  return scroll;
}
