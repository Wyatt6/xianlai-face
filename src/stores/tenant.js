import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTenantStore = defineStore('tenant', () => {
  const data = ref(null)
  const TENANT_ID = ref(null)
  const TENANT_CODE = ref(null)

  async function evalData(tenant) {
    data.value = tenant
    TENANT_ID.value = tenant.id
    TENANT_CODE.value = tenant.code
  }

  return {
    data,
    TENANT_ID,
    TENANT_CODE,
    evalData
  }
})
