<template>
    <div>
      <router-link to="/alunos/add" style="float: left; margin-right: 10px;">
        <button class="btn btn-primary">Adicionar</button>
      </router-link>
      
      <table class="table table-striped">
        
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="aluno in alunos" :key="aluno.codigoaluno">
            <td>{{ aluno.codigoaluno }}</td>
            <td>{{ aluno.nome }}</td>
            <td>
                <button class="btn btn-dark" @click="visualizarAluno(aluno.codigoaluno)">Ver</button>
                <button class="btn btn-secondary" @click="editarAluno(aluno.codigoaluno)">Editar</button>
                <button class="btn btn-warning" @click="$event => deleteAluno(aluno.codigoaluno)">Excluir</button>
            </td>
          </tr>
        </tbody>

      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        alunos: []
      };
    },
    created() {
      axios.get('http://localhost:3000/alunos').then(response => {
        console.log(response.data);
        this.alunos = response.data;
      });
    },
    methods: {  
      deleteAluno(codigoaluno) {
        axios.get('http://localhost:3000/matriculasPorAluno/'+codigoaluno).then(response => {
          if ( response.data.length == 0 ) {
            axios.delete('http://localhost:3000/alunos/'+codigoaluno).then(() => {
              // Atualiza a lista de alunos
              this.alunos = this.alunos.filter(aluno => aluno.codigoaluno !== codigoaluno);
            });  
          } else {
            alert('Não é possível excluir pois o aluno está matrículado em algum curso');
          }
        });                      
      },
      visualizarAluno(codigoaluno) {
      this.$router.push({ name: 'alunosvisualizar', params: { codigoaluno } });
      },
      editarAluno(codigoaluno) {
        this.$router.push({ name: 'alunoseditar', params: { codigoaluno } });
      }
    }
  };
  </script>

<style>
.btn-success {
  font-size: 14px;
}
.btn-info {
  font-size: 14px;
}
.btn-danger {
  font-size: 14px;
}

</style>