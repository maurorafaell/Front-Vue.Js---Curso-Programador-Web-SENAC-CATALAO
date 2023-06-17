<template>
    <div class="container mt-3">
      <h2>Cadastrar Curso</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="nome">Nome: </label>
          <input type="text" class="form-control" id="nome" v-model="curso.nome" required>
        </div>
        <div class="form-group">
          <label for="cargahoraria">Carga horária: </label>
          <input type="number" id="cargahoraria" v-model="curso.cargahoraria" class="form-control">
        </div>
        <div class="form-group">
          <label for="inicio">Início: </label>
          <input type="date" id="inicio" v-model="curso.inicio" required class="form-control">
        </div>
        <div class="form-group">
          <label for="termino">Término: </label>
          <input type="date" id="termino" v-model="curso.termino" required class="form-control">
        </div>
        <div class="form-group">
          <label for="turno">Turno: </label>
          <input type="text" id="turno" v-model="curso.turno" required class="form-control">
        </div>
        <div class="form-group">
          <label for="valor">Valor: </label>
          <input type="text" id="valor" v-model="curso.valor" required class="form-control">
        </div>        
        <br>
        <button type="submit" class="btn btn-primary">Salvar</button>
      </form>
    </div>
  </template>
 
  <script>
  import axios from 'axios';
 
  export default {
    data() {
      return {
        curso: {
          nome: '',
          cargahoraria: '',
          inicio: '',
          termino: '',
          turno: '',
          valor: '',
        },
      };
    },
    mounted() {
    },
    computed: {      
    },
    methods: {      
      handleSubmit() {
        const curso = {
          nome: this.curso.nome,
          cargahoraria: this.curso.cargahoraria,
          inicio: this.curso.inicio,
          termino: this.curso.termino,
          turno: this.curso.turno,
          valor: this.curso.valor,
        };
         axios.post('apiwebsenac21.azurewebsites.net/cursos', curso).then(() => {
          // Redireciona para a página de listagem de cursos
          this.$router.push({ name: 'cursos' });
        });
       
      },
    },
  };
  </script>
