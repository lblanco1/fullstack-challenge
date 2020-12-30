
import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import api from './api';

const Headers = (props) => {
  
   const [campos, setCampos] = useState({
      name: '',
      lastName: '',
      participation: 0
   });

   // A function handleInputChange é disparada toda vez que um campo do formulário for alterado
   function handleInputChange(event){
      campos[event.target.name] = event.target.value;
      setCampos(campos);
   }
   
   // Essa function pega os campos e executa um POST via Axios na nossa API de cadastro.
   function handleFormSubmit(event) {
      event.preventDefault(); // para evitar o comportamento padrao do formulario
      api.post('/user', campos).then((response) => {
         //<Alert color="secondary"> Cadastro realizado com sucesso!</Alert>
         alert("Cadastro realizado com sucesso!");
      }).catch((error) => {
         console.log("Erro: Houve um erro ao se conectar ao MongoDB: " + error);
      });
      console.log(campos);
   }
    
   return(
      // Formulario
      <div className="navbar">
         <div className="form" >
               <Form inline onSubmit={handleFormSubmit}>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                     <Label for="exampleEmail" className="mr-sm-2"></Label>
                     <Input type="text" name="name" id="name" placeholder="First name" required onChange={handleInputChange}/>
                  </FormGroup>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                     <Label for="examplePassword" className="mr-sm-2"></Label>
                     <Input type="text" name="lastName" id="lastName" placeholder="Last name" required onChange={handleInputChange}/>
                  </FormGroup>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                     <Label for="examplePassword" className="mr-sm-2"></Label>
                     <Input type="number" name="participation" id="participation" placeholder="Participation" required onChange={handleInputChange}/>
                  </FormGroup>
                  <Button className="btn" >Send</Button>
               </Form>
         </div>
      </div>
   );  
}

export default Headers;