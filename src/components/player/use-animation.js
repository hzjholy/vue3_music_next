/*
 * @Description:
 * @Version: 1.0
 * @Author:
 * @Date: 2024-03-16 07:12:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-25 23:04:50
 */
import { ref } from "vue";
import animations from "create-keyframe-animation";

export default function useAnimation() {
  const cdWrapperRef = ref(null);
  let entering = false;
  let leaving = false;

  function enter(el, done) {
    if (leaving) afterLeave();
    entering = true;
    const { x, y, scale } = getPosAndScale();

    console.log("x", x);
    console.log("y", y);
    const animation = {
      0: {
        transform: `translate3d(${x}px,${y}px,0) scale(${scale})`,
      },
      100: {
        transform: "translate3d(0,0,0) scale(1)",
      },
    };

    animations.registerAnimation({
      name: "move",
      animation,
      presets: {
        duration: 600,
        easing: "cubic-bezier(0.45, 0, 0.55, 1)",
      },
    });

    animations.runAnimation(cdWrapperRef.value, "move", done);
  }

  function afterEnter() {
    entering = false;
    animations.unregisterAnimation("move");
    cdWrapperRef.value.animation = "";
  }

  function leave(el, done) {
    console.log("leave");
    if (entering) afterEnter();
    leaving = true;
    const { x, y, scale } = getPosAndScale();
    const cdWrapperEl = cdWrapperRef.value;
    cdWrapperEl.style.transition = "all .6s cubic-bezier(0.45, 0, 0.55, 1)";
    cdWrapperEl.style.transform = `translate3d(${x}px,${y}px,0) scale(${scale})`;
    cdWrapperEl.addEventListener("transitioned", next);

    function next() {
      cdWrapperEl.removeEventListener("transitioned", next);
      done();
    }
  }

  function afterLeave() {
    leaving = false;
    const cdWrapperEl = cdWrapperRef.value;
    cdWrapperEl.style.transition = "";
    cdWrapperEl.style.transform = "";
  }

  function getPosAndScale() {
    const targetWidth = 40;
    const paddingLeft = 40;
    const paddingBottom = 30;
    const paddingTop = 80;
    const width = window.innerWidth * 0.8;
    const x = -(window.innerWidth / 2 - paddingLeft);
    const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
    const scale = targetWidth / width;
    return {
      x,
      y,
      scale,
    };
  }

  return {
    cdWrapperRef,
    enter,
    afterEnter,
    leave,
    afterLeave,
  };
}
