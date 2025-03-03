<template>

  <div class="d-flex justify-content-end w-100 mb-4">
    <Button class="m-2" @click="logout">Logout</Button>
  </div>
  <router-view />

</template>

<script setup>
import { ref } from 'vue'
const logout = () => {
  localStorage.removeItem('token')
  window.location.href = '/login'
}
</script>