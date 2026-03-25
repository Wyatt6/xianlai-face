/**
 * 参数使用方法：
 * const Option = useOptionStore()
 * Option.data.xxx.xxx
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { hasText } from '@/utils/common'

export const useOptionStore = defineStore('option', () => {
  const data = ref({
    // 系统参数
    system: {},
    // 租户参数
    tenant: {},
    // 用户参数
    user: {}
  })
  const checksum = ref({
    system: null,
    tenant: null,
    user: null
  })

  /**
   * 参数赋值函数
   */
  async function evalData(scope, optionData, checksumData) {
    switch (scope) {
      case 'SYSTEM':
        checksum.value.system = checksumData
        break
      case 'TENANT':
        checksum.value.tenant = checksumData
        break
      case 'USER':
        checksum.value.user = checksumData
        break
    }
    Object.entries(optionData).forEach(([key, valueObj]) => {
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

  return {
    data,
    checksum,
    evalData
  }
})
