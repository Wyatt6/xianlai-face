<template>
  <div class="w-full min-h-screen flex flex-col bg-white md:bg-[var(--el-bg-color-page)]">
    <!-- 移动端的头部title -->
    <div class="flex flex-col items-center md:hidden mt-[6rem]">
      <div class="text-[4rem] text-blue-500 font-extrabold">XianLai</div>
      <div class="mt-[0.8rem] text-[2.5rem] text-gray-500 font-semibold">多功能后台管理系统</div>
    </div>
    <!-- 主内容 -->
    <div class="w-full flex-1 flex md:items-center md:justify-center">
      <div class="w-full md:w-[90rem] md:h-[54rem] flex bg-white">
        <!-- 封面图片 -->
        <div class="hidden md:block w-1/2 h-full shadow-lg">
          <div class="w-full h-full px-[4rem] flex flex-col bg-[url('/images/pc-portal-default-cover.jpg')] bg-cover bg-center">
            <div class="text-white text-[4.5rem] font-[1000] mt-[7rem]">XianLai</div>
            <div class="text-white text-[2rem] font-[500]">开源、轻量的多功能后台管理系统</div>
          </div>
        </div>
        <!-- 输入表单 -->
        <div class="w-full md:w-1/2 h-full flex flex-col items-center md:shadow-lg">
          <!-- 租户logo和名称 -->
          <div class="max-w-[80%] flex items-center gap-[1rem] mt-[8rem] mb-[2rem] md:mt-[5rem]">
            <el-avatar class="flex-shrink-0" shape="square" :size="30" src="/images/logo-small.png"></el-avatar>
            <span class="text-[1.8rem] font-[500] leading-normal flex-1 line-clamp-1 text-ellipsis whitespace-nowrap break-all">默认租户</span>
          </div>
          <div class="w-full flex-1">
            <RouterView />
          </div>
        </div>
      </div>
    </div>
    <!-- 页脚 -->
    <div class="w-full py-6 text-center text-xl text-gray-600">
      <!-- 移动端：2行 -->
      <div class="flex flex-col md:hidden justify-center items-center gap-y-3">
        <div>
          <span>© 2026 xianlai.fun</span>
          <span class="mx-3" />
          <el-link underline="never" class="fixed-link !text-xl !font-normal">使用条款</el-link>
          <span class="mx-3" />
          <el-link underline="never" class="fixed-link !text-xl !font-normal">隐私政策</el-link>
        </div>
        <div>
          <el-link underline="never" class="fixed-link !text-xl !font-normal" href="https://beian.miit.gov.cn/" target="_blank">粤ICP备XXXXXXXXXX号-X</el-link>
          <span class="text-gray-600 mx-3"></span>
          <el-link underline="never" class="fixed-link !text-xl !font-normal" href="https://beian.mps.gov.cn/" target="_blank">粤公网安备XXXXXXXXXXXXXX号</el-link>
        </div>
      </div>
      <!-- PC端：1行 -->
      <div class="hidden md:flex flex-wrap justify-center items-center gap-y-1">
        <span class="text-xl">© 2026 xianlai.fun</span>
        <div>
          <span class="text-gray-600 mx-3">·</span>
          <el-link underline="never" class="fixed-link !text-xl !font-normal">使用条款</el-link>
        </div>
        <div>
          <span class="text-gray-600 mx-3">·</span>
          <el-link underline="never" class="fixed-link !text-xl !font-normal">隐私政策</el-link>
        </div>
        <div>
          <span class="text-gray-600 mx-3">·</span>
          <el-link underline="never" class="fixed-link !text-xl !font-normal" href="https://beian.miit.gov.cn/" target="_blank">粤ICP备XXXXXXXXXX号-X</el-link>
        </div>
        <div>
          <span class="text-gray-600 mx-3">·</span>
          <el-link underline="never" class="fixed-link !text-xl !font-normal" href="https://beian.mps.gov.cn/" target="_blank">粤公网安备XXXXXXXXXXXXXX号</el-link>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- 
<script setup>
import { useOptionStore } from '@/stores/option'
import { hasText } from '@/utils/common'
import { ref } from 'vue'

const Option = useOptionStore()

const coverImage = ref()
function initCoverImage() {
  const type = Option.data.portal.coverImageType
  let coverUrl
  if (type === 'web') {
    coverImage.value = `url(${Option.data.portal.coverImagePath})`
  } else if (type === 'upload') {
    // TODO 用上传的图片做门户封面
  } else if (type === 'local') {
    coverUrl = new URL('/', import.meta.url)
    coverUrl.pathname = Option.data.portal.coverImagePath
    coverImage.value = `url(${coverUrl})`
  }
}
initCoverImage()

const coverTitle = ref(Option.data.portal.coverTitle)
const coverTitleSize = ref(`${Option.data.portal.coverTitleSize}rem`)
const coverTitleColor = ref(Option.data.portal.coverTitleColor)
const coverSubTitle = ref(Option.data.portal.coverSubTitle)
const coverSubTitleSize = ref(`${Option.data.portal.coverSubTitleSize}rem`)
const coverSubTitleColor = ref(Option.data.portal.coverSubTitleColor)
</script> -->

<style scoped>
/* 修复 el-link 文字位置相比普通文字偏下的问题 */
.fixed-link {
  display: inline !important;
  line-height: 1 !important;
  vertical-align: baseline !important;
}
.fixed-link :deep(*) {
  display: inline !important;
  line-height: 1 !important;
  vertical-align: baseline !important;
}
</style>
