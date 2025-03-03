import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Auth from "../views/Auth.vue";

const routes = [
    { path: "/home", component: Home, meta: { requiresAuth: true }},
    { path: "/login", component: Auth }// Marcar como protegida }
];

const router = createRouter({
    history: createWebHistory(), // Usa el modo de historial HTML5
    routes
});

// Middleware: verificar si el usuario tiene un token válido
router.beforeEach((to, from, next) => {
    console.log('heere');

    const token = localStorage.getItem("token"); // O cualquier otro método de almacenamiento

    if (to.meta.requiresAuth && !token) {
        next("/login"); // Si no hay token, redirigir a login
    } else {
        next(); // Si hay token o la ruta no requiere autenticación, continuar
    }
});

export default router;