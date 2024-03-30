/*
 * @Description:
 * @Version: 1.0
 * @Author:
 * @Date: 2024-03-14 05:09:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-25 22:59:45
 */
import { ref } from "vue";

export default function useMiddleInteractive() {
  const currentShow = ref("cd");
  const middleLStyle = ref(null);
  const middleRStyle = ref(null);

  const touch = {};
  let currentView = "cd";

  function onMiddleTouchStart(e) {
    touch.startX = e.touches[0].pageX;
    touch.startY = e.touches[0].pageY;
    touch.directionLocker = "";
  }
  function onMiddleTouchMove(e) {
    const dataX = e.touches[0].pageX - touch.startX;
    const dataY = e.touches[0].pageY - touch.startY;
    // 解决拖动时候会偏移
    const absDeltaX = Math.abs(dataX);
    const absDeltaY = Math.abs(dataY);
    if (!touch.directionLocker) {
      touch.directionLocker = absDeltaX >= absDeltaY ? "h" : "v";
    }
    if (touch.directionLocker === "v") {
      return;
    }

    const left = currentView === "cd" ? 0 : -window.innerWidth;
    const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + dataX));
    touch.percent = Math.abs(offsetWidth / window.innerWidth);

    if (currentView === "cd") {
      if (touch.percent > 0.2) {
        currentShow.value = "lyric";
      } else {
        currentShow.value = "cd";
      }
    } else {
      if (touch.percent < 0.8) {
        currentShow.value = "cd";
      } else {
        currentShow.value = "lyric";
      }
    }

    middleLStyle.value = {
      opacity: 1 - touch.percent,
    };

    middleRStyle.value = {
      transform: `translate3d(${offsetWidth}px,0,0)`,
    };
  }

  function onMiddleTouchEnd(e) {
    let offsetWidth;
    let opacity;
    if (currentShow.value === "cd") {
      currentView = "cd";
      offsetWidth = 0;
      opacity = 1;
    } else {
      currentView = "lyric";
      offsetWidth = -window.innerWidth;
      opacity = 0;
    }

    const duration = 300;

    middleLStyle.value = {
      opacity,
      transitionDuration: `${duration}ms`,
    };

    middleRStyle.value = {
      transform: `translate3d(${offsetWidth}px,0,0)`,
      transitionDuration: `${duration}ms`,
    };
  }

  return {
    currentShow,
    middleLStyle,
    middleRStyle,
    onMiddleTouchStart,
    onMiddleTouchMove,
    onMiddleTouchEnd,
  };
}
