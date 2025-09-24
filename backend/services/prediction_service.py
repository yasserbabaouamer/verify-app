import torch
import torch.nn.functional as F

def predict_text(text: str) -> tuple[int, float]:
    from app import tokenizer, model
    """Run fine-tuned AraBERT model to predict credibility."""
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        probabilities = F.softmax(logits, dim=-1)
        predicted_class = int(probabilities.argmax(dim=1).item())
        credible_proba, non_credible_proba = probabilities[0].tolist()
        returned_proba = credible_proba if predicted_class == 0 else non_credible_proba
        return predicted_class, returned_proba


def get_prediction_label(prediction: int, confidence: float) -> tuple[str, str]:
    """Map prediction + confidence to descriptive label."""
    if confidence >= 0.75:
        label = "Likely Real" if prediction == 0 else "Likely Fake"
        description = f"Our analysis indicates the news is highly likely to be {'credible' if prediction == 0 else 'fake'}."
    elif confidence >= 0.55:
        label = "Uncertain (Lean Real)" if prediction == 0 else "Uncertain (Lean Fake)"
        description = f"The news leans towards being {'credible' if prediction == 0 else 'fake'}, but uncertainty remains."
    else:
        label, description = "Uncertain", "The analysis is inconclusive; more verification needed."
    return label, description
