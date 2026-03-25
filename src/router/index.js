import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { usePathStore } from '@/stores/path'
import { notEmpty, hasText } from '@/utils/common'

const viewComponents = import.meta.glob('@/views/**/*.vue')

export const useRouterStore = defineStore('router', () => {
  const routes = ref([])
  const checksum = ref(null)
  const router = ref(null)

  function dfsRoute(nowRoute) {
    if (hasText(nowRoute.pathName)) {
      nowRoute.path = usePathStore().data[nowRoute.pathName]
    }
    if (hasText(nowRoute.redirectPathName)) {
      nowRoute.redirect = usePathStore().data[nowRoute.redirectPathName]
    }
    if (hasText(nowRoute.componentPath)) {
      nowRoute.component = viewComponents[`/src/views/${nowRoute.componentPath}`]
    }
    nowRoute.meta = {
      needLogin: nowRoute.needLogin,
      needPermission: nowRoute.needPermission,
      permission: nowRoute.permission,
      showTag: nowRoute.showTag,
      tagTitle: nowRoute.tagTitle,
      keepAlive: nowRoute.keepAlive
    }
    if (notEmpty(nowRoute.children)) {
      nowRoute.children.forEach(item => {
        dfsRoute(item)
      })
    }
  }

  /**
   * 系统路由赋值函数
   */
  async function evalData(routeData, checksumData) {
    checksum.value = checksumData
    if (notEmpty(routeData)) {
      routeData.forEach(item => {
        dfsRoute(item)
      })
      routes.value = routeData
    }
  }

  /**
   * 清除旧的路由实例
   */
  async function clearRouter() {
    router.value = null
  }


  /**
   * 获取router实例
   */
  function getRouter() {
    if (notEmpty(router.value)) {
      return router.value
    } else {
      router.value = createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes: routes.value
      })
      /**
       * 路由前置守卫：每次路由切换时先执行的操作
       * @param {*} to   要到哪里去
       * @param {*} from 从哪里来
       * @param {*} next 是否要去？
       */
      router.value.beforeEach(async (to, from, next) => {
        console.log('路由前置守卫程序 ' + from.path + ' ---> ' + to.path, '')
      })
      return router.value
    }
  }

  return {
    routes,
    checksum,
    evalData,
    clearRouter,
    getRouter
  }
})
