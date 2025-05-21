# Importa a classe FastAPI do módulo fastapi
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PyPDF2 import PdfReader  

import io

# Importações para sumarização com sumy
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer
from sumy.nlp.stemmers import Stemmer
from sumy.utils import get_stop_words

# Define o idioma para a sumarização
IDIOMA = "portuguese"

# Cria uma instância da aplicação FastAPI
# O 'app' é o objeto principal que interage com a API.
app = FastAPI()

# Configuração do CORS para permitir requisições do frontend (ajustar origin em produção)
origins = [
    "http://localhost:5173", # O endereço padrão do frontend Vite
    # Adicione outros origens conforme necessário
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Permite todos os métodos (GET, POST, etc.)
    allow_headers=["*"], # Permite todos os cabeçalhos
)

# Define um endpoint de rota GET para a raiz ('/')
@app.get('/')
async def root():
  # Esta função assíncrona será executada quando uma requisição GET for feita para a raiz
  return {"mensagem": "Bem-vindo ao backend do Leitor de PDF com IA Local!"}

# Novo endpoint para extrair texto de um arquivo PDF
@app.post("/extrair-texto/") # Define um endpoint POST para /extrair-texto
async def extrair_texto_pdf(arquivo_pdf: UploadFile = File(...)):
  # Função assíncrona para lidar com o upload do arquivo PDF
  # O parâmetro 'arquivo_pdf' é do tipo UploadFile e é obrigatório ('File(...)')

  try:
    # Lê o conteúdo binário do arquivo enviado
    conteudo = await arquivo_pdf.read()
    # Cria um objeto BytesIO para que o PyPDF2 possa ler o conteúdo da memória
    buffer = io.BytesIO(conteudo)
    
    # Cria um objeto PdfReader com o buffer
    leitor_pdf = PdfReader(buffer)
    
    # Inicializa uma string vazia para armazenar todo o texto
    texto_completo = ""
    
    # Itera sobre todas as páginas do PDF e extrai o texto de cada uma
    for numero_pagina in range(len(leitor_pdf.pages)):
      pagina = leitor_pdf.pages[numero_pagina]
      texto_completo += pagina.extract_text() or "" # Extrai texto, usa string vazia se a página não tiver texto
    
    # Retorna o texto extraído em um dicionário JSON
    return {"texto_extraido": texto_completo}
    
  except Exception as e:
    # Em caso de erro, retorna uma mensagem de erro
    return {"erro": str(e)}

# Novo endpoint para gerar resumo de texto
@app.post("/gerar-resumo/") # Define um endpoint POST para /gerar-resumo
async def gerar_resumo(texto: str):
  # Função assíncrona para gerar resumo de texto
  # Recebe o texto a ser resumido como uma string no corpo da requisição.
  
  if not texto:
      raise HTTPException(status_code=400, detail="Texto não pode ser vazio para gerar resumo")

  try:
      # Cria um parser para o texto plano com tokenizador no idioma especificado
      parser = PlaintextParser.from_string(texto, Tokenizer(IDIOMA))
      
      # Cria um stemmer para o idioma especificado
      stemmer = Stemmer(IDIOMA)

      # Inicializa o sumariador (usando LSA como exemplo)
      sumariador = LsaSummarizer(stemmer)

      # Opcional: Configura stop words para o sumariador
      sumariador.stop_words = get_stop_words(IDIOMA)

      # Gera o resumo, especificando o número de frases (ex: 5 frases)
      # O número de frases pode ser ajustado conforme a necessidade
      num_frases = 5
      resumo_sentences = sumariador(parser.document, num_frases)
      
      # Junta as frases do resumo em uma única string
      resumo_texto = " ".join([str(sentence) for sentence in resumo_sentences])
      
      # Retorna o resumo em um dicionário JSON
      return {"resumo": resumo_texto}
      
  except Exception as e:
      # Em caso de erro, retorna uma mensagem de erro
      raise HTTPException(status_code=500, detail=f"Erro interno ao gerar resumo: {e}")

# Para rodar este backend localmente, salve o arquivo como main.py e execute no terminal (dentro da pasta backend):
# uvicorn main:app --reload
# O '--reload' permite que o servidor reinicie automaticamente ao detectar mudanças no código. 