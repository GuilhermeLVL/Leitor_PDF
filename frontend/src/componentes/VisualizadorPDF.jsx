import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Configura o worker do PDF.js para que o react-pdf funcione corretamente
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

// Componente para visualizar arquivos PDF
function VisualizadorPDF({ arquivo }) {
  // Estado para armazenar o número total de páginas do PDF
  const [numPaginas, setNumPaginas] = useState(null);
  // Estado para armazenar o número da página atual sendo exibida
  const [paginaAtual, setPaginaAtual] = useState(1);

  // Função chamada quando o PDF é carregado com sucesso
  function onDocumentLoadSuccess({ numPages }) {
    setNumPaginas(numPages);
    setPaginaAtual(1); // Volta para a primeira página ao carregar um novo PDF
  }

  // Funções para navegar entre as páginas
  const irParaPaginaAnterior = () => {
    setPaginaAtual(prevPagina => Math.max(prevPagina - 1, 1));
  };

  const irParaProximaPagina = () => {
    setPaginaAtual(prevPagina => Math.min(prevPagina + 1, numPaginas));
  };

  return (
    <div>
      <h2>Visualizador de PDF</h2>
      {arquivo ? (
        <div>
          <Document
            file={arquivo}
            onLoadSuccess={onDocumentLoadSuccess}
            // Adicione onLoading, onError, etc. para melhor UX em um projeto real
          >
            <Page pageNumber={paginaAtual} />
          </Document>
          <div>
            <p>
              Página {paginaAtual} de {numPaginas}
            </p>
            <button
              onClick={irParaPaginaAnterior}
              disabled={paginaAtual <= 1}
            >
              Anterior
            </button>
            <button
              onClick={irParaProximaPagina}
              disabled={paginaAtual >= numPaginas}
            >
              Próxima
            </button>
          </div>
        </div>
      ) : (
        <p>Selecione um arquivo PDF para visualizar.</p>
      )}
    </div>
  );
}

export default VisualizadorPDF; 