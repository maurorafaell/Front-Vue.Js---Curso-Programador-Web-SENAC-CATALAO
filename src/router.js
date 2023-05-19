import { createRouter, createWebHistory } from 'vue-router';
import Inicio from './components/Inicio.vue';
import Cursos from './components/Cursos.vue';
import Matriculas from './components/Matriculas.vue';
import Alunos from './components/Alunos.vue';
import AlunosAdd from './components/AlunosAdd.vue';
import CursosAdd from './components/CursosAdd.vue';
import AlunosVisualizar from './components/AlunosVisualizar.vue';
import CursosVisualizar from './components/CursosVisualizar.vue';
import CursosEditar from './components/CursosEditar.vue';
import AlunosEditar from './components/AlunosEditar.vue';
import Login from './components/Login.vue';

const routes = [
  { path: '/', name: 'inicio', component: Inicio },
  { path: '/cursos', name: 'cursos', component: Cursos },
  { path: '/alunos', name: 'alunos', component: Alunos },
  { path: '/matriculas', name: 'matriculas', component: Matriculas },
  { path: '/alunos/add', name: 'alunosadd', component: AlunosAdd },
  { path: '/cursos/add', name: 'cursosadd', component: CursosAdd },
  { path: '/alunosvisualizar/:codigoaluno', name: 'alunosvisualizar', component: AlunosVisualizar },
  { path: '/cursosvisualizar/:codigocurso', name: 'cursosvisualizar', component: CursosVisualizar },
  { path: '/cursoseditar/:codigocurso', name: 'cursoseditar', component: CursosEditar },
  { path: '/alunoseditar/:codigoaluno', name: 'alunoseditar', component: AlunosEditar },
  { path: '/login', name: 'login', component: Login }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  const isLoginPage = to.name === 'login';

  if (!isAuthenticated && !isLoginPage) {
    router.push({ name: 'login' });
  } else {
    next();
  }
});

export default router