import React, { useState } from 'react';
import UploadPDF from '../componentes/UploadPDF';
import VisualizadorPDF from '../componentes/VisualizadorPDF';
import ExibidorTexto from '../componentes/ExibidorTexto';

// Página principal da aplicação
function PaginaPrincipal() {
  // Estado para armazenar o arquivo PDF selecionado pelo usuário
  const [arquivoPDF, setArquivoPDF] = useState(null);
  // Novo estado para armazenar o texto extraído do PDF
  const [textoExtraido, setTextoExtraido] = useState('');

  // Função para simular a extração de texto do PDF (placeholder)
  const extrairTextoDoPDF = async (arquivo) => {
    // TODO: Implementar a lógica real de extração de texto (usando pdfjs-dist diretamente ou enviando para o backend)
    // Por enquanto, apenas um placeholder
    console.log('Simulando extração de texto...', arquivo.name);
    // Simula um atraso e um texto de exemplo
    await new Promise(resolve => setTimeout(resolve, 1000));
    const textoSimulado = `Este é um texto de exemplo extraído do arquivo ${arquivo.name}.\n\nAqui virá o texto real do PDF após a implementação da lógica de extração.`;
    setTextoExtraido(textoSimulado);
  };

  // Função chamada quando um arquivo PDF é selecionado no componente UploadPDF
  const handleArquivoSelecionado = (arquivo) => {
    setArquivoPDF(arquivo);
    setTextoExtraido(''); // Limpa o texto extraído anterior
    if (arquivo) {
      // Inicia o processo de extração de texto (atualmente placeholder)
      extrairTextoDoPDF(arquivo);
    }
    console.log('Arquivo PDF selecionado:', arquivo ? arquivo.name : 'Nenhum arquivo');
  };

  return (
    <div>
      <h1>Leitor de PDF com IA Local</h1>
      {/* Renderiza o componente de upload de PDF, passando a função de callback */}
      <UploadPDF onArquivoSelecionado={handleArquivoSelecionado} />

      {/* Área para visualizar o PDF ou exibir o texto extraído */}
      {arquivoPDF ? (
        <div>
          {/* Renderiza o visualizador de PDF se um arquivo foi selecionado */}
          <VisualizadorPDF arquivo={arquivoPDF} />

          {/* Renderiza o componente para exibir o texto extraído */}
          <ExibidorTexto texto={textoExtraido} />

          {/* Botões para funcionalidades futuras (resumo, TTS) */}
          <div>
            <h2>Ferramentas de IA (Futuro)</h2>
            <button onClick={() => alert('Gerar Resumo Clicado')}>Gerar Resumo (Futuro)</button>
            <button onClick={() => alert('Ler em Voz Alta Clicado')}>Ler em Voz Alta (Futuro)</button>
          </div>
        </div>
      ) : (
        <p>Por favor, carregue um arquivo PDF para começar.</p>
      )}
    </div>
  );
}

export default PaginaPrincipal; 