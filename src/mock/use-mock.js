/*
 * @Description:
 * @Version: 1.0
 * @Author:
 * @Date: 2024-03-23 08:40:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-27 05:59:08
 */
import MockMusic from "@/../public/data/music.json";

export default function useMock() {
  console.log("MockMusic", MockMusic);

  let resultMusic = MockMusic;

  function getData() {
    return resultMusic;
  }
  return {
    getData,
  };
}
