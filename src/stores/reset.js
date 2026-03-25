import { defineStore } from 'pinia'
import Storage from '@/utils/storage'
// import { useLayoutStore } from './layout'

export const useResetStore = defineStore('reset', () => {
  /**
   * 重置状态值和缓存值
   */
  async function resetStoreAndStorage() {
    // TODO 后续评审到的模块才取消注释
    // useLayoutStore().$reset()
    // const username = Storage.get(Storage.keys.REMEMBER_USERNAME)
    Storage.clear()
    // if (username != null) Storage.set(Storage.keys.REMEMBER_USERNAME, username)
  }

  return {
    resetStoreAndStorage
  }
})
