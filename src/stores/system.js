import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { notEmpty, hasText } from '@/utils/common'
import { useRouterStore } from '@/router'
import { useOptionStore } from './option'

export const useSystemStore = defineStore('system', () => {
  const initing = ref(false)
  const initData = ref({})

  function initFail() {
    document.getElementById('init').style.display = 'none'
    document.getElementById('initFail').style.display = 'flex'
  }

  async function initialize(app) {
    // 获取初始化数据
    if (!initing.value) {
      initing.value = true
      await axios
        .get('/api/system/launch/init/getInitData', {
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          timeout: 60000
        })
        .then(async response => {
          const result = response.data
          if (result.success) {
            if (notEmpty(result.data) && notEmpty(result.data.checksum)) {
              initData.value = result.data
              // 清除旧的路由实例
              // 系统参数
              if (notEmpty(result.data.systemOptions) && hasText(result.data.checksum.systemOptionsChecksum)) {
                await useOptionStore().evalData('SYSTEM', result.data.systemOptions, result.data.checksum.systemOptionsChecksum)
                console.log('系统参数数据加载完成')
              }
              // 注册router插件
              if (app != null) {
                app.use(useRouterStore().getRouter())
                console.log('router插件注册完成')
              }
              // 挂载页面到Vue应用
              console.log('系统初始化完成')
              if (app != null) {
                app.mount('#app')
                console.log('#app已挂载')
              }
            }
          } else {
            initFail()
            console.error('获取初始数据失败')
          }
        })
        .catch(error => {
          initFail()
          console.error(error)
        })
        .finally(() => {
          initing.value = false
        })
    }
  }

  function getChecksums() {
    return initData.value.checksum
  }

  function isChecksumChange(newChecksum) {
    const oldChecksum = getChecksums()
    const newKeys = Object.keys(newChecksum)
    for (let i = 0; i < newKeys.length; i++) {
      const k = newKeys[i]
      if (!hasText(oldChecksum[k]) || oldChecksum[k] !== newChecksum[k]) {
        return true
      }
    }
    const oldKeys = Object.keys(oldChecksum)
    for (let i = 0; i < oldKeys.length; i++) {
      const k = oldKeys[i]
      if (!hasText(newChecksum[k]) || newChecksum[k] !== oldChecksum[k]) {
        return true
      }
    }
    return false
  }

  return {
    initData,
    initialize,
    isChecksumChange
  }
})
