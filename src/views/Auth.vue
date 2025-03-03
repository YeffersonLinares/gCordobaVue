<template>
    <div class="container d-flex justify-content-center mt-5">
        <div class="row w-50 border p-3">
            <div class="d-flex justify-content-center">
                <img src="../assets/logo.png" alt="logo" width="200">
            </div>
            <div class="col-md-12 mb-3">
                <label for="email">Email</label>
                <InputText type="email" id="email" fluid v-model="user.Email"></InputText>
            </div>
            <div class="col-md-12 mb-3">
                <label for="password">Contraseña</label>
                <InputText type="password" id="password" fluid v-model="user.Password"></InputText>
            </div>
            <div class="d-flex justify-content-center">
                <Button @click="login">Entrar</Button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import environments from '@/environments/api.js'

const user = ref({
    Name: '111',
    LastName: '111',
    Email: '',
    Password: '',
})

const login = async() => {
    const response = await axios.post(`${environments.baseUrl}api/auth/login`, user.value).then(response => {
        if(response.data.token) {
        localStorage.removeItem('token')
        localStorage.setItem('token', response.data.token)
        window.location.href = '/home'
    }
    }).catch(error => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Usuario o contraseña incorrectos'
        })
    })
}
</script>