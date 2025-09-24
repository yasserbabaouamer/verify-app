import math
from pprint import pprint
import torch
import torch.nn.functional as F
from camel_tools.sentiment import SentimentAnalyzer
# Load tokenizer & model from Hugging Face
MODEL_NAME = "./sentiments_model"

# sa = SentimentAnalyzer(model_path=MODEL_NAME)
# sa.predict()
# Polarity labels (from model card)
labels = ['positive', 'negative', 'neutral']

def get_sentiments(text: str):
    from app import sa_tokenizer, sa_model
    
    # Encode text
    inputs = sa_tokenizer(text, return_tensors="pt", truncation=True, padding=True)

    # Get raw model outputs
    with torch.no_grad():
        outputs = sa_model(**inputs)
        logits = outputs.logits

    # Convert logits -> probabilities
    probs = F.softmax(logits, dim=-1).squeeze().tolist()

    # Get predicted polarity
    max_idx = int(torch.argmax(logits, dim=-1))
    polarity_label = labels[max_idx]
    polarity_score = round(probs[max_idx], 2)
    if polarity_label == 'negative':
        polarity_score = -polarity_score
    if polarity_label == 'neutral':
        polarity_score = 1 - polarity_score
    # Estimate objectivity (scale 0–10)
    # Take neutral probability as proxy
    objectivity_score = math.ceil(probs[2] * 10)

    return polarity_score, objectivity_score  # 0 = subjective, 10 = objective
    