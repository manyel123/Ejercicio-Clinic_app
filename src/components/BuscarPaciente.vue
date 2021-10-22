<template>
  <div class="buscarPaciente_paciente">
    <div class="container_buscarPaciente_paciente">
      <h2>Buscar Historia Clínica</h2>
      <form v-on:submit.prevent="searchUser">
        <input
          type="number"
          v-model='id'
          placeholder="Ingrese número de historia"
        />
        <br />
        <button type="submit">Buscar Historia</button>
      </form>
    </div>
    <div v-if="loaded" class="information">
      <h1>Información de Historia Clínica</h1>
      <h2>
        Nombre: <span>{{ name }}</span>
      </h2>
      <h2>
        Documento: <span>{{ document }}</span>
      </h2>
      <h2>
        Correo electrónico: <span>{{ email }}</span>
      </h2>
      <h2>
        Fecha de nacimiento: <span>{{ fechaNacim }}</span>
      </h2>
      <h2>
        Teléfono: <span>{{ telefono }}</span>
      </h2>
      <h2>
        Dirección: <span>{{ direccion }}</span>
      </h2>
      <h2>
        Ciudad: <span>{{ ciudad }}</span>
      </h2>
      <h2>
        Último médico tratante: <span>{{ ultMedTrat }}</span>
      </h2>
      <h2>
        Antecedentes Quirurgicos: <span>{{ antQuirurgicos }}</span>
      </h2>
      <h2>
        Antecedentes Médicos: <span>{{ antMedicos }}</span>
      </h2>
      <h2>
        Antecedentes Farmacológicos: <span>{{ antFarmacologicos }}</span>
      </h2>
      <h2>
        Tratamiento Farmacológico Actual: <span>{{ tratamientoFarmacol }}</span>
      </h2>
      <h2>
        Diagnóstico Previo: <span>{{ diagPrevio }}</span>
      </h2>
      <h2>
        Diagnóstico Actual: <span>{{ diagActual }}</span>
      </h2>
      <h2>
        Observaciones: <span>{{ observacion }}</span>
      </h2>
    </div>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import axios from "axios";
export default {
  name: "Paciente",
  data: function () {
    return {
      id : "",
      document: "",
      name: "",
      email: "",
      fechaNacim: "",
      telefono: "",
      direccion: "",
      ciudad: "",
      ultMedTrat: "",
      antQuirurgicos: "",
      antMedicos: "",
      antFarmacologicos: "",
      tratamientoFarmacol: "",
      diagPrevio: "",
      diagActual: "",
      observacion: "",
      loaded: false,
    };
  },
  methods: {

    searchUser: async function () {

      if(!this.id){alert("Ingrese primero el id del paciente")
        return;
      }
      if (
        
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logOut");
        return;
      }

      await this.verifyToken();
      await this.axios;
      let token = localStorage.getItem("token_access");
      

      axios
        .get(
          `https://historias-clinicas-app-be.herokuapp.com/paciente/${this.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((result) => {
          this.document = result.data.document;
          this.name = result.data.name;
          this.email = result.data.email;
          this.fechaNacim = result.data.fechaNacim;
          this.telefono = result.data.telefono;
          this.direccion = result.data.direccion;
          this.ciudad = result.data.ciudad;
          this.ultMedTrat = result.data.historia.ultMedTrat;
          this.antQuirurgicos = result.data.historia.antQuirurgicos;
          this.antMedicos = result.data.historia.antMedicos;
          this.antFarmacologicos = result.data.historia.antFarmacologicos;
          this.tratamientoFarmacol = result.data.historia.tratamientoFarmacol;
          this.diagPrevio = result.data.historia.diagPrevio;
          this.diagActual = result.data.historia.diagActual;
          this.observacion = result.data.historia.observacion;
          this.loaded = true;
        })
        .catch(() => {
          alert("No existe historia clínica para este ID");
          this.id='';
        });
    },

    verifyToken: function () {
      return axios
        .post(
          "https://historias-clinicas-app-be.herokuapp.com/refresh/",
          { refresh: localStorage.getItem("token_refresh") },
          { headers: {} }
        )
        .then((result) => {
          localStorage.setItem("token_access", result.data.access);
        })
        .catch(() => {
          this.$emit("logOut");
        });
    },
  },

  /*created: async function () {
    this.getData();
  },*/
};
</script>

<style>
.buscarPaciente_paciente {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.container_buscarPaciente_paciente {
  border: 3px solid #2d649e;
  border-radius: 10px;
  width: 95%;
  height: 98%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: scroll;
}
.buscarPaciente_paciente h2 {
  color: #2d649e;
}
.buscarPaciente_paciente h2 span{
  color: #0a0c0e;
}
.buscarPaciente_paciente form {
  width: 80%;
}
.buscarPaciente_paciente input {
  height: 26px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;
  border: 1px solid #2d649e;
}
.buscarPaciente_paciente button {
  width: 100%;
  height: 40px;
  color: #e5e7e9;
  background: #2d649e;
  border: 1px solid #e5e7e9;
  border-radius: 5px;
  padding: 10px 25px;
  margin: 5px 0 25px 0;
}
.buscarPaciente_paciente button:hover {
  color: #e5e7e9;
  background: rgb(23, 116, 54);
  border: 1px solid #283747;
  cursor: pointer;
}
</style>