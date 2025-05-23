import React, { useState, useEffect, useRef } from 'react';
import UploadPDF from '../componentes/UploadPDF';
import VisualizadorPDF from '../componentes/VisualizadorPDF';
import ExibidorTexto from '../componentes/ExibidorTexto';

// Página principal da aplicação
function PaginaPrincipal() {
  // Estado para armazenar o arquivo PDF selecionado pelo usuário
  const [arquivoPDF, setArquivoPDF] = useState(null);
  // Estado para armazenar o texto extraído do PDF por página
  const [textosPorPagina, setTextosPorPagina] = useState([]);
  // Estado para indicar se a extração está em andamento
  const [carregandoTexto, setCarregandoTexto] = useState(false);

  // Novo estado para rastrear a página atual exibida
  const [paginaAtual, setPaginaAtual] = useState(0); // Índice baseado em zero

  // URL base do backend (ajuste se necessário)
  const API_BASE_URL = 'http://127.0.0.1:8000';

  // Função para extrair texto do PDF enviando para o backend
  const extrairTextoDoPDF = async (arquivo) => {
    if (!arquivo) return;

    setCarregandoTexto(true); // Define carregando como true ao iniciar
    // Limpa qualquer texto anterior e reseta a página atual
    setTextosPorPagina([]);
    setPaginaAtual(0); // Reseta para a primeira página

    const formData = new FormData();
    formData.append('arquivo', arquivo);

    try {
      const resposta = await fetch('http://localhost:8000/extrair-texto/', {
        method: 'POST',
        body: formData,
      });

      if (!resposta.ok) {
        // Se a resposta não for bem-sucedida (status 4xx ou 5xx)
        const erro = await resposta.json();
        throw new Error(erro.erro || 'Erro ao extrair texto do PDF');
      }

      const dados = await resposta.json();
      // Atualiza o estado com a lista de textos por página
      setTextosPorPagina(dados.textos_paginas); 
      // Define a página atual para 0 (primeira página) se houver texto
      if(dados.textos_paginas && dados.textos_paginas.length > 0) {
          setPaginaAtual(0);
      }

    } catch (erro) {
      console.error('Erro ao extrair texto:', erro);
       alert(`Erro ao extrair texto: ${erro.message}`);
    } finally {
      setCarregandoTexto(false); // Define carregando como false ao finalizar (sucesso ou erro)
    }
  };

  // Função para manipular a seleção de arquivo
  const handleArquivoSelecionado = (arquivo) => {
    setArquivoPDF(arquivo); // Armazena o arquivo PDF no estado
    extrairTextoDoPDF(arquivo); // Chama a função para extrair texto
  };

  // Funções de navegação entre páginas
  const proximaPagina = () => {
    if (paginaAtual < textosPorPagina.length - 1) {
      setPaginaAtual(paginaAtual + 1);
    }
  };

  const paginaAnterior = () => {
    if (paginaAtual > 0) {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  // Renderização da interface
  return (
    <div className="app-container"> {/* Container principal */}
      <header className="app-header"> {/* Cabeçalho */}
        <h1>Leitor e Extrator de PDF</h1>
        <UploadPDF onArquivoSelecionado={handleArquivoSelecionado} />
      </header>

      {arquivoPDF && (
        <main className="app-main-content"> {/* Conteúdo principal */}
          <div className="pdf-viewer-container"> {/* Container do Visualizador */}
            <VisualizadorPDF arquivo={arquivoPDF} />
          </div>

          {carregandoTexto && <p>Extraindo texto...</p>}

          {textosPorPagina.length > 0 && (
            <div className="text-content-container"> {/* Container do Texto */}
              <h2>Texto Extraído (Página {paginaAtual + 1}/{textosPorPagina.length})</h2>
              <ExibidorTexto texto={textosPorPagina[paginaAtual]} />

              {/* Controles de navegação entre páginas */}
              <div className="pagination-controls">
                <button onClick={paginaAnterior} disabled={paginaAtual === 0}>
                  Página Anterior
                </button>
                <button onClick={proximaPagina} disabled={paginaAtual === textosPorPagina.length - 1}>
                  Próxima Página
                </button>
              </div>
            </div>
          )}
        </main>
      )}

    </div>
  );
}

export default PaginaPrincipal; 