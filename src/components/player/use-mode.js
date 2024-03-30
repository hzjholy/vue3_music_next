import { computed } from "vue";
import { useStore } from "vuex";
import { PLAY_MODE } from "@/assets/js/constant";

export default function useMode() {
  const store = useStore();
  const playMode = computed(() => store.state.playMode);
  const modeIcon = computed(() => {
    const playModeVal = playMode.value;
    return playModeVal === PLAY_MODE.sequence
      ? "icon-sequence"
      : playModeVal === PLAY_MODE.random
      ? "icon-random"
      : "icon-loop";
  });

  function changeMode() {
    const mode = (playMode.value + 1) % 3; // value在0,1,2之间
    store.dispatch("changeMode", mode);
  }

  return {
    modeIcon,
    changeMode
  };
}
