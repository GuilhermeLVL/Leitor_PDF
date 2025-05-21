from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
import os
import shutil
import fitz  # PyMuPDF

app = FastAPI()

# Configurar CORS para permitir requisições do frontend (que estará em outra porta/origem)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Substitua pela origem do seu frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Diretório para salvar arquivos temporariamente
UPLOAD_DIR = "./uploaded_pdfs"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.post("/upload-pdf/")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        # Salva o arquivo recebido
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        return {"filename": file.filename, "message": "Arquivo recebido com sucesso!", "file_path": file_path}
    except Exception as e:
        # Adicionar log de erro para depuração
        print(f"Erro no upload: {e}")
        raise HTTPException(status_code=500, detail=f"Erro ao receber o arquivo: {e}")

@app.post("/extract-text/")
async def extract_text(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Arquivo não encontrado.")

    try:
        text = ""
        with fitz.open(file_path) as doc:
            for page_num in range(doc.page_count):
                page = doc.load_page(page_num)
                text += page.get_text()
        return {"filename": filename, "text": text}
    except Exception as e:
        # Adicionar log de erro para depuração
        print(f"Erro na extração de texto: {e}")
        raise HTTPException(status_code=500, detail=f"Erro ao extrair texto: {e}")

@app.post("/summarize-text/")
async def summarize_text(text: str):
    # TODO: Implementar lógica de sumarização com Hugging Face
    return {"original_text": text, "summary": "Resumo do texto..."} 