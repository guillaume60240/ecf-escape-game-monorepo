import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref({
    id: '',
    name: '',
    email: '',
    accesToken: ''
  })

  function setUser(newUser: any) {
    user.value = newUser
  }

  function resetUser() {
    user.value = {
      id: '',
      name: '',
      email: '',
      accesToken: ''
    }
  }

  function getUser() {
    return user.value
  }

  return { user, setUser, resetUser, getUser }
})
