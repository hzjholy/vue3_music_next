/*
 * @Description:
 * @Version: 1.0
 * @Author:
 * @Date: 2024-03-13 05:49:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-27 05:50:07
 */
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";
import { getLyric } from "@/service/song";
import Lyric from "lyric-parser";

export default function useLyric({ songReady, currentTime }) {
  const currentLyric = ref(null);
  const currentLineNum = ref(0);
  const pureMusicLyric = ref(0);
  const playingLyric = ref("");
  const lyricScrollRef = ref(null);
  const lyricListRef = ref(null);

  const store = useStore();
  const currentSong = computed(() => store.getters.currentSong);

  watch(currentSong, async (newSong) => {
    console.log("currentSong--------------", currentSong);
    if (!newSong.url || !newSong.id) {
      return;
    }
    stopLyric();
    currentLyric.value = null; // 多次切歌需要等歌词加载后执行
    currentLineNum.value = 0;
    pureMusicLyric.value = "";
    playingLyric.value = "";

    // 检查链接是否匹配模式
    function isMatching(url) {
      // 正则表达式模式
      const pattern = /^https?:\/\//;
      return pattern.test(url);
    }
    // const lyric = await getLyric(newSong);
    let lyric;
    if (isMatching(newSong.lyric)) {
      lyric = await getLyric2(newSong.lyric);
    } else {
      lyric = newSong.lyric;
    }

    store.commit("addSongLyric", {
      song: newSong,
      lyric,
    });
    // 异步处理，如果还是不是当前的歌曲就没必要再继续执行
    if (currentSong.value.lyric !== lyric) {
      return;
    }

    currentLyric.value = new Lyric(lyric, handleLyric);
    const hasLyric = currentLyric.value.lines.length;

    if (hasLyric) {
      if (songReady.value) {
        playLyric();
      }
    } else {
      playingLyric.value = pureMusicLyric.value = lyric.replace(
        /\[(\d{2}):(\d{2}):(\d{2})\]/g,
        ""
      );
    }
  });

  async function getLyric2(url) {
    console.log("url===========", url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch lyric");
    }
    const result = await response.text();
    return result;
  }

  function playLyric() {
    const currentLyricVal = currentLyric.value;
    if (currentLyricVal) {
      currentLyricVal.seek(currentTime.value * 1000);
    }
  }

  function stopLyric() {
    const currentLyricVal = currentLyric.value;
    if (currentLyricVal) {
      currentLyricVal.stop();
    }
  }

  function handleLyric({ lineNum, txt }) {
    currentLineNum.value = lineNum;
    playingLyric.value = txt;
    const scrollComp = lyricScrollRef.value;
    const listEl = lyricListRef.value;
    if (!listEl) {
      return;
    }
    // 处于居中位置
    if (lineNum > 5) {
      const lineEl = listEl.children[lineNum - 5];
      scrollComp.scroll.scrollToElement(lineEl, 1000);
    } else {
      scrollComp.scroll.scrollTo(0, 0, 1000);
    }
  }

  return {
    currentLyric,
    currentLineNum,
    playLyric,
    stopLyric,
    lyricScrollRef,
    lyricListRef,
    pureMusicLyric,
    playingLyric,
  };
}
