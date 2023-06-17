<template>
    <div>
      <router-link to="/cursos/add" style="float: left; margin-right: 10px;">
        <button class="btn btn-primary">Adicionar</button>
      </router-link>
      
      <table class="table table-striped">
        
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="curso in cursos" :key="curso.codigocurso">
            <td>{{ curso.codigocurso }}</td>
            <td>{{ curso.nome }}</td>
            <td>
                <button class="btn btn-dark" @click="visualizarCurso(curso.codigocurso)">Ver</button>
                <button  class="btn btn-secondary" @click="editarCurso(curso.codigocurso)">Editar</button>
                <button class="btn btn-warning" @click="$event => deleteCurso(curso.codigocurso)">Excluir</button>
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
        cursos: []
      };
    },
    created() {
      axios.get('apiwebsenac21.azurewebsites.net/cursos').then(response => {
        console.log(response.data);
        this.cursos = response.data;
      });
    },
    methods: {     
      deleteCurso(codigocurso) {
        axios.get('apiwebsenac21.azurewebsites.net/alunosPorCurso/'+codigocurso).then(response => {
          if ( response.data.length == 0 ) {
            axios.delete('apiwebsenac21.azurewebsites.net/cursos/'+codigocurso).then(() => {
              // Atualiza a lista de cursos
              this.cursos = this.cursos.filter(curso => curso.codigocurso !== codigocurso);
            });  
          } else {
            alert('Não é possível excluir pois o curso possui aluno matrículado');
          }
        });                      
      },
      visualizarCurso(codigocurso) {
      this.$router.push({ name: 'cursosvisualizar', params: { codigocurso } });
      },
      editarCurso(codigocurso) {
        this.$router.push({ name: 'cursoseditar', params: { codigocurso } });
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
