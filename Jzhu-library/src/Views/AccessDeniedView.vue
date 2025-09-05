<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8 text-center">
        <div class="alert alert-warning">
          <h2>Access Denied</h2>
          <p>You need to be logged in to access this page.</p>
          <router-link to="/login" class="btn btn-primary">
            Go to Login
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
</style>
