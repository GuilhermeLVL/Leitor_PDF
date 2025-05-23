import React, { useState } from 'react';

// Componente para upload de arquivos PDF
function UploadPDF({ onArquivoSelecionado }) {
  // Estado para armazenar o arquivo PDF selecionado
  const [arquivoPDF, setArquivoPDF] = useState(null);

  // Manipulador de evento quando um arquivo é selecionado
  const handleFileChange = (event) => {
    const arquivo = event.target.files[0];
    if (arquivo && arquivo.type === 'application/pdf') {
      setArquivoPDF(arquivo);
      // Chama a função passada por propriedade (prop) para notificar o componente pai
      if (onArquivoSelecionado) {
        onArquivoSelecionado(arquivo);
      }
    } else {
      setArquivoPDF(null);
      // Notifica o componente pai que nenhum arquivo válido foi selecionado
      if (onArquivoSelecionado) {
        onArquivoSelecionado(null);
      }
      alert('Por favor, selecione um arquivo PDF válido.');
    }
  };

  // Só renderiza o uploader se nenhum arquivo foi selecionado
  if (arquivoPDF) {
    return <p>Arquivo carregado: {arquivoPDF.name}</p>;
  }

  return (
    <div>
      {/* Usar um label estilizado para o input de arquivo */}
      <label htmlFor="pdf-upload" className="upload-pdf-label">
        Selecionar Arquivo PDF
      </label>
      <input
        id="pdf-upload"
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
      />
      {/* A mensagem de arquivo selecionado será exibida pelo return acima */}
      {/* {arquivoPDF && (
        <p>Arquivo selecionado: {arquivoPDF.name}</p>
      )} */}
    </div>
  );
}

export default UploadPDF; 