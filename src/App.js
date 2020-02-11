import React , { Fragment , useState , useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';


function App() {

  //state del formulario
  const [ busqueda , guardarBusqueda ] = useState({
    ciudad:' ',
    pais:' '
  });
  
  const [ consultar , guardarConsulta ] = useState(false);
  const [ resultado , guardarResultado ] = useState({});
  const [ error, guardarError ] = useState(false);
  //extraemos
  const { ciudad , pais } = busqueda;

  //hace que se vaya actualizando lo que escriba el usuario pidiendo como ciudad y pais , osea lo buscando en tiempo real digamos
  useEffect(() => {
    const consultarAPI = async () => {
      if(consultar){
        const appId = '4db62cc61c3fca0772bf88c12818eab9';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        guardarResultado(resultado);
        guardarConsulta(false); 

        // Detecta si hubo resultados correctos en la consulta
        if(resultado.cod === "404"){
          guardarError(true);
        }
        else{
          guardarError(false);
        }
      }
    }
    consultarAPI();
    //desactiva las dependencias de ciudad y pais
    // eslint-disable-next-line
  },[consultar]);

  //si no encuentra la ciudad va a mostrar que no hay resultados, si encuentra muestra el clima normalmente
  let componente;
  if(error){
    componente = <Error mensaje = "No hay resultados"/>
  }
  else{
    componente = <Clima
                  resultado={resultado}
                 />
  }

  return (
    <Fragment>
      <Header
        titulo = 'Clima React App'
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
                <Formulario 
                  busqueda = {busqueda}
                  guardarBusqueda = {guardarBusqueda}
                  guardarConsulta = {guardarConsulta}              
                />
            </div>
            <div className="col m6 s12">
                {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
