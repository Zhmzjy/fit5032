<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="text-center">Library Member Login</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="email"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="password"
                  required
                />
              </div>
              <div v-if="errorMessage" class="alert alert-danger">
                {{ errorMessage }}
              </div>
              <div v-if="loading" class="text-center">
                <span>Logging in...</span>
              </div>
              <div class="d-grid">
                <button type="submit" class="btn btn-primary" :disabled="loading">Login</button>
              </div>
            </form>
            <div class="mt-3 text-center">
              <small class="text-muted">
                Please register first if you don't have an account
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import db from '../firebase/init'
import { collection, query, where, getDocs } from 'firebase/firestore'

const router = useRouter()
const { login } = useAuth()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)

const handleLogin = async () => {
  errorMessage.value = ''
  loading.value = true

  try {
    const q = query(
      collection(db, 'users'),
      where('email', '==', email.value),
      where('password', '==', password.value)
    )

    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      login()
      router.push('/')
    } else {
      errorMessage.value = 'Invalid email or password. Please check your credentials or register first.'
    }
  } catch (error) {
    console.error('Login error:', error)
    errorMessage.value = 'Login failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
