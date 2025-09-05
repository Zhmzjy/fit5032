import { ref } from 'vue'

const isAuthenticated = ref(false)
const registeredUsers = ref([])

export function useAuth() {
  const login = () => {
    isAuthenticated.value = true
  }

  const logout = () => {
    isAuthenticated.value = false
  }

  const addUser = (userData) => {
    registeredUsers.value.push(userData)
  }

  const validateUser = (username, password) => {
    return registeredUsers.value.find(user =>
      user.username === username && user.password === password
    )
  }

  const authenticated = isAuthenticated

  return {
    login,
    logout,
    addUser,
    validateUser,
    authenticated,
    registeredUsers
  }
}
