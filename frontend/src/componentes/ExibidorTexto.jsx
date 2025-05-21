import React from 'react';

// Componente para exibir texto extraído
function ExibidorTexto({ texto }) {
  // Se não houver texto, não renderiza nada ou exibe uma mensagem
  if (!texto) {
    return null; // Ou <p>Nenhum texto para exibir.</p>;
  }

  return (
    <div>
      <h2>Texto Extraído</h2>
      {/* Exibe o texto. Pré-formatado para manter quebras de linha, se houver. */}
      <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {texto}
      </pre>
    </div>
  );
}

export default ExibidorTexto; 