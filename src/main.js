import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./routes/router";

import 'bootstrap/dist/css/bootstrap.min.css' // Import the styles of Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js' // Import the scripts of Bootstrap

// import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura';
import Button from "primevue/button"
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';

const app = createApp(App)
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.component('Button', Button);
app.component('InputText', InputText);
app.component('Dialog', Dialog);
app.mount('#app');
