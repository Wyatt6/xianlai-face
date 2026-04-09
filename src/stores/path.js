/**
 * 系统路径使用方法：
 * const Path = usePathStore()
 * Path.data.xxx.xxx
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePathStore = defineStore('path', () => {
  const pathUpdateTime = ref(null)
  const data = ref({})

  /**
   * 系统路径赋值函数
   */
  async function evalData(pathList, pathUT) {
    if (pathUT != null) pathUpdateTime.value = pathUT
    pathList.forEach(item => {
      data.value[item.name] = item.path
    })
  }

  return {
    data,
    evalData
  }
})
