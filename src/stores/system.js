import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { notEmpty, getCurrMilliTimestamp } from '@/utils/common'
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

  function initFail() {
    document.getElementById('init').style.display = 'none'
    document.getElementById('initFail').style.display = 'flex'
  }

  async function initialize(app) {
    // 获取初始化数据
    if (!initing.value) {
      initing.value = true
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
            if (notEmpty(result.data)) {
              console.log(result)
              // 租户信息
              if (notEmpty(result.data.tenant)) {
                await useTenantStore().evalData(result.data.tenant)
                console.log('租户信息加载完成')
              }
              // 配置数据
              if (notEmpty(result.data.configs)) {
                const systemCUT = headers['x-system-config-update-time']
                const tenantCUT = headers['x-tenant-config-update-time']
                await useConfigStore().evalData(result.data.configs, systemCUT, tenantCUT)
                console.log('配置数据加载完成')
              }
              // 路径路径
              if (notEmpty(result.data.paths)) {
                const pathUpdateTime = headers['x-path-update-time']
                await usePathStore().evalData(result.data.paths, pathUpdateTime)
                console.log('路径数据加载完成')
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

      //         initData.value = result.data
      //         // 清除旧的路由实例
      //         await useRouterStore().clearRouter()

      //         // 系统路由
      //         if (notEmpty(result.data.routes) && hasText(result.data.checksum.routesChecksum)) {
      //           await useRouterStore().evalData(result.data.routes, result.data.checksum.routesChecksum)
      //           console.log('路由数据加载完成')
      //           console.log(useRouterStore().routes)
      //         }
      //         // 系统菜单
      //         if (notEmpty(result.data.menus) && hasText(result.data.checksum.menusChecksum)) {
      //           await useMenuStore().evalData(result.data.menus, result.data.checksum.menusChecksum)
      //           console.log('菜单数据加载完成')
      //         }
      //         // 注册router插件
      //         if (app != null) {
      //           app.use(useRouterStore().getRouter())
      //           console.log('router插件注册完成')
      //         }
      //         // 系统接口（要用到router插件）
      //         if (notEmpty(result.data.apis) && hasText(result.data.checksum.apisChecksum)) {
      //           await useApiStore().evalData(result.data.apis, result.data.checksum.apisChecksum)
      //           console.log('接口数据加载完成')
      //         }
      //         // 挂载页面到Vue应用
      //         console.log('系统初始化完成')
      //         if (app != null) {
      //           app.mount('#app')
      //           console.log('#app已挂载')
      //         }
    }
  }

  return {
    initData,
    setLogoutLock,
    releaseLogoutLock,
    initialize
  }
})
