import React from 'react';
import PaginaPrincipal from './paginas/PaginaPrincipal';

// Componente principal da aplicação.
// Será responsável por rotear entre as páginas e talvez gerenciar estado global.

function App() {
  return (
    <div>
      {/* Aqui serão carregadas as páginas/componentes principais */}
      <PaginaPrincipal />
    </div>
  );
}

export default App;
