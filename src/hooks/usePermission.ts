import useLoginStore from '@/store/login/login'
import { storeToRefs } from 'pinia'

const usePermission = (permissionId: string) => {
  const loginStore = useLoginStore()
  const { permissions } = storeToRefs(loginStore)
  return !!permissions.value.find((item) => item.includes(permissionId))
}

export default usePermission
