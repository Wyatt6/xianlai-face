/**
 * 参数使用方法：
 * const Config = useConfigStore()
 * Config.data.xxx.xxx 或 Config.getValue(key)
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { hasText } from '@/utils/common'

export const useConfigStore = defineStore('config', () => {
  const systemConfigUpdateTime = ref(null)
  const tenantConfigUpdateTime = ref(null)
  const data = ref({})

  /**
   * 参数赋值函数
   */
  async function evalData(configs) {
    Object.entries(configs).forEach(([key, valueObj]) => {
      if (hasText(valueObj.type) && hasText(valueObj.value)) {
        const keys = key.split('.')
        let now = data.value
        for (let i = 0; i < keys.length; i++) {
          if (i == keys.length - 1) {
            if (valueObj.type === 'BOOLEAN') {
              const boolExp = new RegExp('^true$', 'i')
              now[keys[i]] = boolExp.test(valueObj.value)
            } else if (valueObj.type === 'INTEGER' || valueObj.type === 'LONG') {
              now[keys[i]] = Number(valueObj.value)
            } else if (valueObj.type === 'JSON') {
              now[keys[i]] = JSON.parse(valueObj.value)
            } else {
              // 最后当作STRING类型兜底
              now[keys[i]] = valueObj.value
            }
          } else {
            if (now[keys[i]] == null) now[keys[i]] = {}
            now = now[keys[i]]
          }
        }
      }
    })
  }

  /**
   * 获取参数值
   */
  function getValue(key) {
    const keys = key.split('.')
    let now = data.value
    for (let i = 0; i < keys.length; i++) {
      if (i == keys.length - 1) {
        return now[keys[i]]
      } else {
        if (now[keys[i]] == null) return
        now = now[keys[i]]
      }
    }
  }

  return {
    data,
    evalData,
    getValue
  }
})
