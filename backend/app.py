import asyncio
from concurrent.futures import ProcessPoolExecutor
import os
from dotenv import load_dotenv
from fastapi import FastAPI
from utils.mocks import mock_news_analysis
from services import analysis_service, verification_service, crosscheck_service
from schemas import NewsAnalysisResponse, NewsSchema, SourceVerificationResponse
from fastapi.middleware.cors import CORSMiddleware
from nltk.corpus import stopwords
from google import genai
from transformers import AutoTokenizer, AutoModelForSequenceClassification

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


# Global variables for resource loading
tokenizer = None
model = None
client = None
arabic_stopwords = set()
sa_tokenizer = None
sa_model = None


# @app.on_event("startup")
def initialze():
    from transformers import BertForSequenceClassification, AutoTokenizer
    global tokenizer, model, client, arabic_stopwords, sa_tokenizer, sa_model
    
    # Load environment variables
    load_dotenv()
    
    # Load model and tokenizer
    tokenizer = AutoTokenizer.from_pretrained(os.getenv("MODEL_PATH"))
    model = BertForSequenceClassification.from_pretrained(os.getenv("MODEL_PATH"))
    model.eval()

    # Load sentiment analysis model and tokenizer
    sa_tokenizer = AutoTokenizer.from_pretrained(os.getenv("SA_MODEL_PATH"))
    sa_model = AutoModelForSequenceClassification.from_pretrained(os.getenv("SA_MODEL_PATH"))

    # Load Arabic stopwords
    arabic_stopwords = set(stopwords.words("arabic"))
    
    # Init the gemini client
    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

initialze()


@app.post(path=f"{BASE_URL}/analyse", response_model=NewsAnalysisResponse)
async def analyse_news(news: NewsSchema):
    if os.getenv("USE_MOCKS") == "True":
        return mock_news_analysis()
    loop = asyncio.get_running_loop()
    with ProcessPoolExecutor() as executor:
        analysis_task = loop.run_in_executor(executor, analysis_service.analyse_news, news)
        verification_task = asyncio.create_task(verification_service.verify_source(news.url))
        crosscheck_task = asyncio.create_task(crosscheck_service.crosscheck_news(news))
        analysis, verification, crosscheck = await asyncio.gather(
            analysis_task, verification_task, crosscheck_task
        )
    return NewsAnalysisResponse(
        content_analysis=analysis,
        source_verification=verification,
        cross_check=crosscheck
    )


@app.post(path=f"{BASE_URL}/verify-source", response_model=SourceVerificationResponse)
async def verify_source(url: str):
    result = verification_service.verify_source(url)
    return result
