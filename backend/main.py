# Importa a classe FastAPI do módulo fastapi
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel # Manter BaseModel caso necessário para futuras requisições, senão remover
from PyPDF2 import PdfReader

import io

# --- Removendo importações e carregamento de modelo QA ---
# from transformers import AutoTokenizer, AutoModelForQuestionAnswering
# import torch

# Cria uma instância da aplicação FastAPI
app = FastAPI()

# --- Configuração CORS ---
origins = [
    "http://localhost:5173",  # URL do frontend React com Vite
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Permitir todos os métodos (GET, POST, etc.)
    allow_headers=["*"], # Permitir todos os cabeçalhos
)

# --- Endpoints da API ---

@app.get("/")
async def read_root():
    return {"Olá": "Bem-vindo à API de Leitura e Análise de PDF!"}

@app.post("/extrair-texto/")
async def extrair_texto_pdf(arquivo: UploadFile = File(...)):
    """Endpoint para receber um arquivo PDF, extrair o texto por página e retorná-lo como uma lista."""
    conteudo_pdf = await arquivo.read()
    textos_paginas = [] # Lista para armazenar o texto de cada página

    try:
        leitor_pdf = PdfReader(io.BytesIO(conteudo_pdf))
        num_paginas = len(leitor_pdf.pages)
        print(f"Total de páginas encontradas: {num_paginas}")

        for pagina in range(num_paginas):
            texto_pagina = leitor_pdf.pages[pagina].extract_text() or ""
            textos_paginas.append(texto_pagina.strip()) # Adiciona o texto da página
            print(f"Texto extraído da página {pagina + 1} (primeiros 50 chars): '{textos_paginas[-1][:50]}'")

    except Exception as e:
        print(f"Erro ao extrair texto do PDF: {e}")
        raise HTTPException(status_code=500, detail=f"Erro ao processar o arquivo PDF: {e}")

    # Retorna a lista de textos por página em formato JSON
    return JSONResponse(content={"textos_paginas": textos_paginas})

# Para rodar este backend localmente, salve o arquivo como main.py e execute no terminal (dentro da pasta backend):
# uvicorn main:app --reload
# O '--reload' permite que o servidor reinicie automaticamente ao detectar mudanças no código.

# Considerações:
# - O carregamento dos modelos QA pode consumir memória RAM e VRAM.
# - A funcionalidade de QA utiliza o texto completo do PDF.
# - A extração de texto é feita por página.
# - A funcionalidade de TTS foi removida. 