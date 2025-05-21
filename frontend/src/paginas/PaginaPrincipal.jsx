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
  // Novo estado para indicar se a extração está em andamento
  const [carregandoTexto, setCarregandoTexto] = useState(false);

  // Função para extrair texto do PDF enviando para o backend
  const extrairTextoDoPDF = async (arquivo) => {
    if (!arquivo) return;

    setCarregandoTexto(true); // Define carregando como true ao iniciar
    setTextoExtraido(''); // Limpa qualquer texto anterior

    const formData = new FormData();
    formData.append('arquivo_pdf', arquivo);

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
      setTextoExtraido(dados.texto_extraido); // Atualiza o estado com o texto extraído
    } catch (erro) {
      console.error('Erro ao extrair texto:', erro);
      setTextoExtraido(`Erro ao extrair texto: ${erro.message}`); // Exibe mensagem de erro
    } finally {
      setCarregandoTexto(false); // Define carregando como false ao finalizar (sucesso ou erro)
    }
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
          {carregandoTexto ? (
            <p>Extraindo texto...</p>
          ) : (
            <ExibidorTexto texto={textoExtraido} />
          )}

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