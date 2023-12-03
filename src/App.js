/* Author: Juan Sebastian Peña Angarita esion
   UAM CUAJIMALPA - CDMX  */
   
import React from 'react';
/* importando el elemento Contenedor creado con styled Components */
import Contenedor from './elementos/Contenedor';
import { Route, Routes } from 'react-router-dom';
/* importando mis componentes */
import EditarGasto from './componentes/EditarGasto';
import ListaGastos from './componentes/ListaGastos';
import RegistroUsuario from './componentes/RegistroUsuario';
import InicioSesion from './componentes/InicioSesion';
import GastosCategoria from './componentes/GastosCategoria';
import Inicio from './componentes/Inicio';
//import Fondo from './elementos/Fondo';
import Footter from './componentes/Footer';
import RutaPrivada from './componentes/RutaPrivada';

function App() {
  return (
    <>
    <Contenedor>

        <Routes>
          <Route path='/iniciar-sesion' element={<InicioSesion/>}/>
          <Route path='/crear-cuenta' element={<RegistroUsuario/>}/>

          <Route path='/categorias' element={
            <RutaPrivada>
              <GastosCategoria/>
            </RutaPrivada>
            }
          />

          <Route path='/lista' element={
            <RutaPrivada >
              <ListaGastos/>
            </RutaPrivada>
            }
          />

          <Route path='/editar/:id' element={
            <RutaPrivada>
              <EditarGasto/>
            </RutaPrivada>
          }
          /> 

          <Route path="/" element={
            <RutaPrivada>
              <Inicio/>
            </RutaPrivada>
          }
          />

        </Routes>
       

    </Contenedor>
    <Footter/>
      </>
  );
}

export default App;
