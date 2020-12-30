import React, { Component } from 'react';
import { Table } from 'reactstrap';
import api from './api';
import './app.css'
import Headers from './Headers';
import {Doughnut} from 'react-chartjs-2';

class App extends Component{

  state = {
    lists: [],
    names: [],
    lastNames: [],
    participations: [],
    colores: [],
    data: [],
    options: []
  }

  async peticion(){
    var peticion = await fetch('http://localhost:8080');
    var response = await peticion.json();
    this.setState({response: response});
    var names = [], participations = [], lastNames = [];
    this.state.response.map((element) => {
      names.push(element.name);
      participations.push(element.participation);
      lastNames.push(element.lastName);
    });
    this.setState({names: names, participations: participations, lastNames: lastNames});
    console.log(this.state.names);
    console.log(this.state.participations);
    console.log(this.state.lastNames);
  }

  // retorna um desses caracteres aleatoriamente
  generateCaracter(){
    var caracter = ["a", "b", "c","d","e","f","0","1","2","3","4","5","6","7","8","9"];
    var number = (Math.random()*15).toFixed(0);
    return caracter[number];
  }

  // concatena os 6 caracteres e converte em um formato de cores hexadecimal
  colorHex(){
    var color = "";
    for(var i=0; i<6; i++){
      color = color + this.generateCaracter();
    }
    return "#" + color;
  }

  gerarColors(){
    var colores = []
    for(var i=0; i<this.state.response.length; i++){
      colores.push(this.colorHex());
    }
    this.setState({colores: colores});
    console.log(this.state.colores);
  }

  // configura a forma que mostraremos o grafico 
  configGrafic(){
    const data = {
      labels: this.state.names,
      datasets:[{
        data: this.state.participations,
        backgroundColor: this.state.colores
      }]
    }
    const options = {
      responsive: true,
      mainAspectRatio: false
    }
    this.setState({data: data, options: options});
  };

  async componentDidMount() {
    
    const response = await api.get('/');
  
    this.setState({lists: response.data});
    await this.peticion();
    await this.gerarColors();
    await this.configGrafic();
  }

  render(){

    const {lists} = this.state;

    return(
      <div className="conteudo">
        <Headers />
        
        <h2 className="title">Data</h2>
        <p className="title">Lorem ipsum dolor sit amet, consectetur adispiscing elit</p>
        
        {/* Criando a tabela dinamica */}
        <div className="tab">
        { <Table bordered id="table" className="table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th className="center">Paticipation</th>
            </tr>
          </thead>
          <tbody>
          { lists.map(list => (
            <tr key={list._id}>
            
                <th scope="row"></th>
                <td>{list.name}</td>
                <td>{list.lastName}</td>
                <td className="center">{list.participation}%</td>
            
            </tr>
            ))}
          </tbody>
        </Table> }
        </div>

        <div className="app" style={{width: '40%', display: 'flex', float: 'left'}}>
          <Doughnut data = {this.state.data} options = {this.state.options} />
        </div>
      </div>
    );
  };
};


export default App;
