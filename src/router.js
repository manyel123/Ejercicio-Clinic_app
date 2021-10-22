import { createRouter, createWebHistory } from "vue-router";
import App from './App.vue';

import LogIn from './components/LogIn.vue'
import SignUp from './components/SignUp.vue'
import Home from './components/Home.vue'
import CrearPaciente from './components/CrearPaciente.vue'
import BuscarPaciente from './components/BuscarPaciente.vue'

const routes = [{
        path: '/',
        name: 'root',
        component: App
      },
      {
        path: '/user/logIn',
        name: "logIn",
        component: LogIn
      },
      {
        path: '/user/signUp',
        name: "signUp",
        component: SignUp
      },
      {
        path: '/user/home',
        name: "home",
        component: Home
      },
      {
        path: '/user/crearPaciente',
        name: "crearPaciente",
        component: CrearPaciente
      },
      {
        path: '/user/buscarPaciente',
        name: "buscarPaciente",
        component: BuscarPaciente
      }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
