# Leitor e Analisador de PDF com IA Local

Este projeto é uma aplicação web full-stack para carregar, visualizar e analisar arquivos PDF localmente utilizando inteligência artificial gratuita e local.

## Estrutura do Projeto

- `frontend/`: Contém o código da aplicação web em React.
- `backend/`: Contém o código da API em FastAPI.

## Requisitos

- Node.js e npm (ou yarn)
- Python 3.x
- Git

## Configuração e Execução

### Backend

1. Navegue até a pasta `backend/`:
   ```bash
   cd backend
   ```
2. Ative o ambiente virtual:
   ```bash
   ./venv/Scripts/Activate  # No Windows
   # source venv/bin/activate  # No Linux/macOS
   ```
3. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```
4. Inicie o servidor FastAPI:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend

1. Navegue até a pasta `frontend/`:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie a aplicação React:
   ```bash
   npm start
   ```

A aplicação frontend estará disponível em `http://localhost:3000` (ou outra porta disponível) e o backend em `http://localhost:8000` (porta padrão do Uvicorn).

## Funcionalidades Futuras

- Integração completa com PyMuPDF para extração de texto.
- Integração com modelos Hugging Face para sumarização e outras análises.
- Implementação de reconhecimento de voz com Web Speech API.
- Implementação de leitura em voz alta com SpeechSynthesis API.
- Melhoria da interface do usuário e responsividade. 