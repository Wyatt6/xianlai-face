import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { notEmpty, getCurrMilliTimestamp, hasText } from '@/utils/common'
import { useTenantStore } from './tenant'
import { useConfigStore } from './config'
import { useRouterStore } from '@/router'
import { usePathStore } from './path'
import { useMenuStore } from './menu'
import { useApiStore } from '@/apis'

export const useSystemStore = defineStore('system', () => {
  const initing = ref(false)

  const logoutLock = ref(false)
  function setLogoutLock() {
    logoutLock.value = true
  }
  function releaseLogoutLock() {
    logoutLock.value = false
  }

  function initFail(message) {
    if (hasText(message)) {
      document.getElementById('initHint').innerHTML = message
    }
    document.getElementById('init').style.display = 'none'
    document.getElementById('initFail').style.display = 'flex'
  }

  async function initialize(app) {
    // 获取初始化数据
    if (!initing.value) {
      initing.value = true
      console.log('开始初始化:', getCurrMilliTimestamp())
      await axios
        .get('/api/system/core/init/getInitData', {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'X-Request-Time': getCurrMilliTimestamp()
          },
          params: { domain: window.location.hostname },
          timeout: 60000
        })
        .then(async response => {
          const headers = response.headers
          const result = response.data
          if (result.success) {
            // 清除旧的路由实例
            await useRouterStore().clearRouter()
            // 租户信息
            if (notEmpty(result.data) && notEmpty(result.data.tenant)) {
              await useTenantStore().evalData(result.data.tenant)
              console.log('租户信息加载完成')
            }
            // 配置数据
            if (notEmpty(result.data) && notEmpty(result.data.configs)) {
              const systemCUT = headers['x-system-config-update-time']
              const tenantCUT = headers['x-tenant-config-update-time']
              await useConfigStore().evalData(result.data.configs, systemCUT, tenantCUT)
              console.log('配置数据加载完成')
            }
            // 路径数据
            if (notEmpty(result.data) && notEmpty(result.data.paths)) {
              const pathUpdateTime = headers['x-path-update-time']
              await usePathStore().evalData(result.data.paths, pathUpdateTime)
              console.log('路径数据加载完成')
            }
            // 路由数据
            if (notEmpty(result.data) && notEmpty(result.data.routes)) {
              const routeUpdateTime = headers['x-route-update-time']
              await useRouterStore().evalData(result.data.routes, routeUpdateTime)
              console.log('路由数据加载完成')
            }
            // 菜单数据
            if (notEmpty(result.data) && notEmpty(result.data.menus)) {
              const menuUpdateTime = headers['x-menu-update-time']
              await useMenuStore().evalData(result.data.menus, menuUpdateTime)
              console.log('菜单数据加载完成')
            }
            // 注册router插件
            if (app != null) {
              app.use(useRouterStore().getRouter())
              console.log('router插件注册完成')
            }
            // 系统接口（要用到router插件）
            if (notEmpty(result.data) && notEmpty(result.data.apis)) {
              const apiUpdateTime = headers['x-api-update-time']
              await useApiStore().evalData(result.data.apis, apiUpdateTime)
              console.log('接口数据加载完成')
            }
            // 挂载页面到Vue应用
            console.log('系统初始化完成:', getCurrMilliTimestamp())
            if (app != null) {
              app.mount('#app')
              console.log('#app已挂载')
            }
          } else {
            console.log(result)
            initFail(result.message)
            console.error('获取初始数据失败:', getCurrMilliTimestamp())
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

  return {
    setLogoutLock,
    releaseLogoutLock,
    initialize
  }
})
