import { ref } from 'vue'
import type pageContent from '@/components/page-content/page-content.vue'

const usePageContent = function () {
  // page-content
  const pageContentRef = ref<InstanceType<typeof pageContent>>()

  const searchClick = (formData = {}) => {
    pageContentRef.value?.fetchPageDataList(formData)
  }

  const resetClick = () => {
    pageContentRef.value?.fetchPageDataList()
  }

  return {
    pageContentRef,
    searchClick,
    resetClick
  }
}

export default usePageContent
