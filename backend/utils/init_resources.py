import os
from dotenv import load_dotenv
from nltk.corpus import stopwords
from google import genai
from transformers import BertForSequenceClassification, AutoTokenizer, AutoModelForSequenceClassification

def initialize_resources():
    load_dotenv()
    # Main model
    tokenizer = AutoTokenizer.from_pretrained(os.getenv("MODEL_PATH"))
    model = BertForSequenceClassification.from_pretrained(os.getenv("MODEL_PATH"))
    model.eval()
    # Sentiment analysis model
    sa_tokenizer = AutoTokenizer.from_pretrained(os.getenv("SA_MODEL_PATH"))
    sa_model = AutoModelForSequenceClassification.from_pretrained(os.getenv("SA_MODEL_PATH"))
    # Stopwords
    arabic_stopwords = set(stopwords.words("arabic"))
    # Gemini client
    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
    return {
        "tokenizer": tokenizer,
        "model": model,
        "sa_tokenizer": sa_tokenizer,
        "sa_model": sa_model,
        "arabic_stopwords": arabic_stopwords,
        "client": client,
    }
