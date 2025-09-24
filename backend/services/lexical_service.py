
# Detect misspelled words in Arabic text and return spelling accuracy and misspelled words
import nltk
from spellchecker import SpellChecker


def get_spelling_analysis(text: str):
    spell = SpellChecker(language='ar')
    words = nltk.word_tokenize(text)
    misspelled = list(spell.unknown(words))
    total_words = len(words)
    correct_words = total_words - len(misspelled)
    accuracy = correct_words / total_words if total_words > 0 else 0
    return round(accuracy, 2), misspelled



def exclamation_analysis(headline: str, body: str) -> dict[str, dict[str, float | str]]:
    """
    Analyze exclamation usage in headline and body.
    Returns a dictionary with rates and categories.
    """

    # --- Headline ---
    headline_exclams = headline.count("!")
    headline_words = max(len(headline.split()), 1)  # avoid division by zero
    headline_rate = (headline_exclams / headline_words) * 100  # per 100 words
    
    if "!!" in headline:
        headline_category = "Alarmist"
    elif headline_exclams == 0:
        headline_category = "Normal"
    elif headline_exclams == 1:
        headline_category = "Noticeable"
    else:
        headline_category = "Alarmist"

    # --- Body ---
    body_exclams = body.count("!")
    body_words = max(len(body.split()), 1)
    body_rate = (body_exclams / body_words) * 100  # per 100 words

    if "!!" in body:
        body_category = "Alarmist"
    elif body_rate <= 1:  # 0–1 per 100 words
        body_category = "Normal"
    elif body_rate <= 4:  # 2–4 per 100 words
        body_category = "Noticeable"
    else:  # ≥5 per 100 words
        body_category = "Alarmist"

    return {
        "headline": {"rate": round(headline_rate, 2), "category": headline_category},
        "body": {"rate": round(body_rate, 2), "category": body_category},
    }


# Get the top 3 most frequent keywords and their repetition ratio in the text
def get_keywords_repetition(text: str):
    from app import arabic_stopwords
    words = [word for word in nltk.word_tokenize(text.lower()) if word.isalnum() and word not in arabic_stopwords]
    word_freq = {}
    for word in words:
        word_freq[word] = word_freq.get(word, 0) + 1
    if not words:
        return []
    sorted_words = sorted(word_freq.items(), key=lambda x: x[1], reverse=True)[:3]
    result = []
    total_words = len(words)
    for word, count in sorted_words:
        result.append({
            "keyword": word,
            "repetitions_count": count
        })
    # Overall word repetition (not returned, but can be used for further analysis)
    unique_words = len(set(words))
    overall_repetition = unique_words / total_words if total_words > 0 else 0
    return round(overall_repetition, 2), result


# Count the number of words and sentences in the text
def get_word_and_sentence_count(text: str) -> tuple[int, int]:
    sentences = nltk.sent_tokenize(text)
    words = nltk.word_tokenize(text)
    return len(words), len(sentences)
