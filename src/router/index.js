import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { notEmpty, hasText } from '@/utils/common'

export const useRouterStore = defineStore('router', () => {
  const routes = ref([])
  const router = ref(null)

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
    clearRouter,
    getRouter
  }
})
