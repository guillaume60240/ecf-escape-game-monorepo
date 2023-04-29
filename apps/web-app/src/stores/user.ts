import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref({
    id: '',
    name: '',
    email: ''
  })

  function setUser(newUser: any) {
    user.value = newUser
  }

  function resetUser() {
    user.value = {
      id: '',
      name: '',
      email: ''
    }
  }

  function getUser() {
    return user.value
  }

  return { user, setUser, resetUser, getUser }
})
