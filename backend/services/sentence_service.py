# Analyze each sentence in the text and predict its credibility and confidence
import nltk
from .preprocessing_service import preprocess_text
from .prediction_service import get_prediction_label, predict_text


def analyze_sentences(text: str):
    """
    Analyze each sentence in the text and return predictions with confidence scores.
    """
    sentences = nltk.sent_tokenize(text)
    results = []
    for sent in sentences:
        clean_sent = preprocess_text(sent)
        pred, conf = predict_text(clean_sent)
        pred_label, _ = get_prediction_label(pred, conf)
        results.append({
            "sentence": sent,
            "prediction": pred_label,
            "confidence": round(conf, 2)
        })
    return results

