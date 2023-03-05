import { ref } from 'vue'
import type pageModal from '@/components/page-modal/page-modal.vue'

interface IEditFn {
  isPre?: boolean
  (row: any): void
}
interface IAddFn {
  isPre?: boolean
  (): void
}

const usePageModal = function (addCB?: IAddFn, editCB?: IEditFn) {
  const pageModalRef = ref<InstanceType<typeof pageModal>>()

  const addClick = () => {
    if (!addCB) {
      pageModalRef.value?.showDialog()
      return
    }
    if (addCB && addCB.isPre) {
      Promise.resolve()
        .then(() => {
          addCB()
        })
        .then(() => {
          pageModalRef.value?.showDialog()
        })
    } else {
      Promise.resolve()
        .then(() => {
          pageModalRef.value?.showDialog()
        })
        .then(() => {
          addCB()
        })
    }
  }
  const editClick = (row: any) => {
    if (!editCB) {
      pageModalRef.value?.showDialog(true, row)
      return
    }
    if (editCB && editCB.isPre) {
      Promise.resolve()
        .then(() => {
          editCB(row)
        })
        .then(() => {
          pageModalRef.value?.showDialog(true, row)
        })
    } else {
      Promise.resolve()
        .then(() => {
          pageModalRef.value?.showDialog(true, row)
        })
        .then(() => {
          editCB(row)
        })
    }
  }

  return { pageModalRef, addClick, editClick }
}

export default usePageModal
