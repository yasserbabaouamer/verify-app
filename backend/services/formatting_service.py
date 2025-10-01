
from .sentiment_service import get_sentiments
from camel_tools.tokenizers.word import simple_word_tokenize
from camel_tools.utils.charmap import CharMapper


# Exclamation rate: proportion of exclamation marks in the text
def get_exclamation_analysis(headline: str, body: str) -> tuple[float, float | str]:
    """
    Analyze exclamation usage in headline and body,
    and return a single weighted exclamation score + category.
    """

    # --- Headline ---
    headline_exclams = headline.count("!")
    headline_words = max(len(headline.split()), 1)
    headline_rate = (headline_exclams / headline_words) * 100

    # --- Body ---
    body_exclams = body.count("!")
    body_words = max(len(body.split()), 1)
    body_rate = (body_exclams / body_words) * 100

    # --- Weighted Score ---
    # Headline has higher influence → weight 0.7
    # Body has lower influence → weight 0.3
    weighted_score = round((0.7 * headline_rate) + (0.3 * body_rate), 2)

    # --- Categorization ---
    if "!!" in headline or "!!" in body or weighted_score > 4:
        category = "Alarmist"
    elif weighted_score >= 2:
        category = "Noticeable"
    else:
        category = "Normal"

    return weighted_score, category


# Alarmist words rate: proportion of words with high polarity
def get_alarmist_words_analysis(headline: str, body: str) -> tuple[float, float | str]:
    """
    Calculate alarmist words rate using TextBlob polarity.
    Words with |polarity| > 0.5 are considered alarmist.
    Returns weighted alarmist rate and category.
    """

    def get_alarmist_score(text: str) -> float:
        # Normalize and dediacritize Arabic text
        # mapper = CharMapper.builtin_mapper('arclean')
        # clean_text = dediac_ar(mapper.map_string(text))
        words = simple_word_tokenize(text)
        alarmist_count = 0
        for word in words:
            polarity,_ = get_sentiments(word)
            if abs(polarity) > 0.5:
                print(f"Alarmist word detected: {word} (polarity: {polarity})")
                alarmist_count += 1
        return alarmist_count / len(words) if words else 0

    # Headline
    headline_rate = get_alarmist_score(headline)

    # Body
    body_rate = get_alarmist_score(body)

    # Weighted score (headline weighs more)
    weighted_rate = round((0.7 * headline_rate) + (0.3 * body_rate), 2) * 100  # convert to percentage
    print(f"Alarmist - Headline: {headline_rate}, Body: {body_rate}, Weighted: {weighted_rate}")
    # Categorization
    if weighted_rate > 5:
        category = "Alarmist"
    elif weighted_rate > 1:
        category = "Noticeable"
    else:
        category = "Normal"
    return weighted_rate, category


# All caps words ratio: proportion of words in all uppercase
# def get_all_caps_analysis(headline: str, body: str) -> tuple[float, float | str]:
#     """
#     Calculate the rate of ALL CAPS words in headline and body text.
#     Formula:
#         weighted_rate = 0.7 * headline_rate + 0.3 * body_rate
#     Categories:
#         - < 2%  → Normal
#         - 2–5%  → Noticeable
#         - > 5%  → Alarmist
#     """

#     def caps_rate(text: str) -> float:
#         words = text.split()
#         if not words:
#             return 0.0
#         all_caps_words = [w for w in words if w.isupper() and len(w) > 1]
#         return (len(all_caps_words) / len(words)) * 100

#     # Calculate section rates
#     headline_rate = caps_rate(headline)
#     body_rate = caps_rate(body)

#     # Weighted score
#     weighted_rate = 0.7 * headline_rate + 0.3 * body_rate

#     # Categorization
#     if weighted_rate < 2:
#         category = "Normal"
#     elif weighted_rate <= 5:
#         category = "Noticeable"
#     else:
#         category = "Alarmist"

#     return weighted_rate, category


# Extract formatting features such as exclamation usage, alarmist words, and all-caps words
def get_formatting_features(headline: str, body: str) -> tuple[dict, float]:
    exclamation_rate, exclamation_label = get_exclamation_analysis(headline, body)
    alarmist_rate, alarmist_label = get_alarmist_words_analysis(headline, body)
    # all_caps_rate, all_caps_label = get_all_caps_analysis(headline, body)
    features = {
        'exclamation': {
            'rate': exclamation_rate,
            'label': exclamation_label
        },
        'alarmist': {
            'rate': alarmist_rate,
            'label': alarmist_label
        }
    }
    # Average of the three formatting features
    formatting_score = round(((100 - exclamation_rate) + (100 - alarmist_rate)) / 2, 2)
    return features, formatting_score
