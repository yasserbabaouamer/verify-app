
from fastapi import FastAPI
from schemas import TextSchema, TextAnalysis, TextValidation
import services
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],            # <-- allow all, or use origins list
    allow_credentials=True,         # allow cookies, Authorization headers, etc.
    allow_methods=["*"],            # allow GET, POST, PUT, DELETE, OPTIONS…
    allow_headers=["*"],            # allow all headers
    expose_headers=["*"],           # optional, if you need to expose any custom headers
)

BASE_URL = "/api/v1"



@app.post(path=f"{BASE_URL}/verify", response_model=TextAnalysis)
async def verify(text: TextSchema):
    text_analysis = services.analyse_text(text.text)
    print(text_analysis.model_dump())
    return text_analysis


@app.post(path=f"{BASE_URL}/cross-validate", response_model=TextValidation)
async def cross_validate(text: TextSchema):
    result = services.cross_validate_news(text.text)
    return result
