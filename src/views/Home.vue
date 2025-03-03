<template>
  <Dialog v-model:visible="visible" modal header="Editar usuario" :style="{ width: '50rem' }">
    <div class="row">
      <div class="col-md-6 mb-3">
        <label for="name">Nombre</label>
        <InputText type="text" id="name" fluid v-model="user.name"></InputText>
      </div>
      <div class="col-md-6 mb-3">
        <label for="lastName">Apellido</label>
        <InputText type="text" id="lastName" fluid v-model="user.lastName"></InputText>
      </div>
      <div class="col-md-6 mb-3">
        <label for="email">Email</label>
        <InputText type="email" id="email" fluid v-model="user.email"></InputText>
      </div>
      <!-- <div class="col-md-6 mb-3">
          <label for="password">Contraseña</label>
          <InputText type="password" id="password" fluid v-model="user.password"></InputText>
        </div> -->
    </div>
    <div class="d-flex w-100 justify-content-center">
      <Button @click="store">Guardar</Button>
    </div>
  </Dialog>

  <div class="container mt-5">
    <div class="d-flex justify-content-center">
      <img src="../assets/logo.png" alt="logo" width="200">
    </div>
    <div class="d-flex justify-content-end w-100 mb-4">
      <Button @click="visible = true; cleanForm()">Crear usuario</Button>
    </div>
    <div class="table-responsive">
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Último Login</th>
            <th>Puntaje</th>
            <th>Clasificación</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td>{{ user.name }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.lastLogin }}</td>
            <td>{{ user.score }}</td>
            <td>{{ calculateScore(user.lastLogin) }}</td>
            <td>
              <Button @click="editUser(user)" class="me-3">Actualizar</Button>
              <Button severity="danger" label="danger" @click="destroy(user.id)">Eliminar</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'

const users = ref([])
const baseUrl = "http://localhost:5075/"
const visible = ref(false)
const user = ref({})

onMounted(async () => {
  datatable()
})

const datatable = async () => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${baseUrl}api/user`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  users.value = response.data
}

const destroy = async (id) => {
  Swal.fire({
    title: "¿Estás seguro que deseas eliminar este usuario?",
    showDenyButton: true,
    confirmButtonText: "Eliminar",
    confirmButtonColor: "#d33",
    denyButtonColor: "#3085d6",
    denyButtonText: `No Eliminar`
  }).then(async (result) => {
    if (result.isConfirmed) {
      const response = await axios.delete(`${baseUrl}api/user/${id}`)
      if (response.status === 204) {
        Swal.fire('Usuario eliminado', '', 'success')
        datatable()
      }
    }
  });
}

const editUser = (userEdit) => {
  user.value = { ...userEdit }
  visible.value = true
}

const cleanForm = () => {
  user.value = { name: '', lastName: '', email: '', password: '' }
}

const store = async () => {
  if (user.value.id) {
    const response = await axios.put(`${baseUrl}api/user/${user.value.id}`, user.value)
    if (response.status === 204) {
      Swal.fire('Usuario actualizado', '', 'success')
      datatable()
      visible.value = false
    } else {
      Swal.fire('Error', 'No se pudo actualizar el usuario', 'error')
    }
  } else {
    const response = await axios.post(`${baseUrl}api/user`, user.value)
    if (response.status === 201) {
      Swal.fire('Usuario creado', '', 'success')
      datatable()
      visible.value = false
    } else {
      Swal.fire('Error', 'No se pudo crear el usuario', 'error')
    }
  }
}

const calculateScore = (lastLogin) => {
  const lastLoginDate = new Date(lastLogin)
  const now = new Date()
  const diffHours = Math.abs(now - lastLoginDate) / 36e5

  if (diffHours <= 12) {
    return 'Hechicero'
  } else if (diffHours <= 48) {
    return 'Luchador'
  } else if (diffHours <= 168) {
    return 'Explorador'
  } else {
    return 'Olvidado'
  }
}

</script>