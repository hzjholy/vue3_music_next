<!--
 * @Description:
 * @Version: 1.0
 * @Author:
 * @Date: 2024-03-10 20:47:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-25 23:06:21
-->
<template>
  <div class="singer-detail">
    <music-list
      :songs="songs"
      :title="title"
      :pic="pic"
      :loading="loading"
    ></music-list>
  </div>
</template>

<script>
import { getSingerDetail } from "@/service/singer";
import { processSongs } from "@/service/song";
import MusicList from "@/components/music-list/music-list.vue";
import useMock from "@/mock/use-mock";

export default {
  name: "singer-detail",
  components: {
    MusicList,
  },
  props: {
    singer: Object,
  },
  data() {
    return {
      songs: [],
      loading: true,
    };
  },
  computed: {
    pic() {
      return this.singer && this.singer.pic;
    },
    title() {
      return this.singer && this.singer.name;
    },
  },
  async created() {
    const result = await getSingerDetail(this.singer);
    const { getData } = useMock();
    // const songs = await processSongs(result.songs);
    const songs = getData();
    this.songs = songs;
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>
