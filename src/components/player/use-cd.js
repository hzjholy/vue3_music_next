import { useStore } from "vuex";
import { computed, ref, watch } from "vue";

export default function useCd() {
  const cdRef = ref();
  const cdImageRef = ref();

  const store = useStore();
  const playing = computed(() => store.state.playing);

  const cdCls = computed(() => {
    return playing.value ? "playing" : "";
  });

  // 同步旋转角度
  watch(playing, (newPlaying) => {
    if (!newPlaying) {
      syncTransform(cdRef.value, cdImageRef.value);
    }
  });

  function syncTransform(wrapper, inner) {
    const wrapperTransform = getComputedStyle(wrapper).transform;
    const innerTransform = getComputedStyle(inner).transform; // 相对角度
    // 需要同步之前的旋转角度
    wrapper.style.transform =
      wrapperTransform === "none"
        ? innerTransform
        : innerTransform.concat("", wrapperTransform);
  }

  return {
    cdRef,
    cdImageRef,
    cdCls,
  };
}
