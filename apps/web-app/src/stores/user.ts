import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref({
    id: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}').id : '',
    name: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}').name : '',
    email: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') || '{}').email
      : '',
    accesToken: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') || '{}').accesToken
      : ''
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
