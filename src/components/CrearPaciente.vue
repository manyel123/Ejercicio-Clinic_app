<template>
  <div class="crearPaciente_paciente">
    <div class="container_crearPaciente_paciente">
        <h2>Registrar nuevo paciente</h2>
      <form v-on:submit.prevent="processSignUp"> 
        <input type="integer" v-model="paciente.document" placeholder="N° Documento del paciente" />
        <br />
        <input type="text" v-model="paciente.name" placeholder="Nombre" />
        <br />
        <input type="email" v-model="paciente.email" placeholder="Email" />
        <br />
        <input type="text" v-model="paciente.fechaNacim" placeholder="Fecha de Nacimiento" />
        <br />
        <input type="integer" v-model="paciente.telefono" placeholder="Telefono" />
        <br />
        <input type="text" v-model="paciente.direccion" placeholder="Direccion" />
        <br />
        <input type="text" v-model="paciente.ciudad" placeholder="Ciudad" />
        <br />
        <input type="text" v-model="paciente.historia.ultMedTrat" placeholder="Ultimo medico tratante" />
        <br />
        <input type="text" v-model="paciente.historia.antQuirurgicos" placeholder="Antecedentes quirurgicos" />
        <br />
        <input type="text" v-model="paciente.historia.antMedicos" placeholder="Antecedentes medicos" />
        <br />
        <input type="text" v-model="paciente.historia.antFarmacologicos" placeholder="Antecedentes farmacologicos" />
        <br />
        <input type="text" v-model="paciente.historia.tratamientoFarmacol" placeholder="Tratamiento farmacologico actual" />
        <br />
        <input type="text" v-model="paciente.historia.diagPrevio" placeholder="Diagnostico previo" />
        <br />
        <input type="text" v-model="paciente.historia.diagActual" placeholder="Diagnostico actual" />
        <br />
        <input type="text" v-model="paciente.historia.observacion" placeholder="Observaciones" />
        <br />
        <button type="submit">Registrar nuevo paciente</button>
        </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CrearPaciente",
  data: function () {
    return {
      paciente: {
        document: "",
        name: "",
        email: "",
        fechaNacim: "",
        telefono: "",
        direccion: "",
        ciudad: "",
        historia: {
          ultMedTrat: "",
          antQuirurgicos: "",
          antMedicos: "",
          antFarmacologicos: "",
          tratamientoFarmacol: "",
          diagPrevio: "",
          diagActual: "",
          observacion: "",
        }, 
      },
    };
  },
  methods: {
    processSignUp: function () {
      axios
        .post("https://historias-clinicas-app-be.herokuapp.com/paciente/", this.paciente, {
          headers: {},
        })
        .then(() => {
          alert("Registro exitoso.");
          Object.keys(this.paciente).forEach(key => { 
            if(key!='historia'){
              this.paciente[key] = ""
            }
            else{
              Object.keys(this.paciente.historia).forEach(key => {
                this.paciente.historia[key] = "";
              })
            }
          }) 
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: Fallo en el registro.");
        });
    },
  },
};
</script>
<style>
.crearPaciente_paciente {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container_crearPaciente_paciente{
  border: 3px solid #2d649e;
  border-radius: 10px;
  width: 95%;
  height: 98%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.crearPaciente_paciente h2 {
  color: #2d649e;
}
.crearPaciente_paciente form {
  width: 80%;
}
.crearPaciente_paciente input {
  height: 26px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;
  border: 1px solid #2d649e;
}
.crearPaciente_paciente button {
  width: 100%;
  height: 40px;
  color: #e5e7e9;
  background: #2d649e;
  border: 1px solid #e5e7e9;
  border-radius: 5px;
  padding: 10px 25px;
  margin: 5px 0 25px 0;
}
.crearPaciente_paciente button:hover {
  color: #e5e7e9;
  background: rgb(23, 116, 54);
  border: 1px solid #283747;
  cursor: pointer;
}
</style>