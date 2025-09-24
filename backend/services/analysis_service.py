import cProfile

from line_profiler import profile
from .formatting_service import get_formatting_features
from .lexical_service import get_word_and_sentence_count, get_keywords_repetition, get_spelling_analysis
from .prediction_service import get_prediction_label, predict_text
from .sentence_service import analyze_sentences
from .sentiment_service import get_sentiments
from .preprocessing_service import preprocess_text


from schemas import FormatAnalysis, Metric, NewsSchema, NewsContentAnalysis, SensationalAnalysis, SentenceAnalysis, StyleAnalysis


# Main analysis pipeline for a news article: runs all NLP and ML steps and returns a summary

def analyse_news(news: NewsSchema) -> NewsContentAnalysis:

    # Clean and preprocess headline and body
    clean_headline = preprocess_text(news.headline)
    clean_body = preprocess_text(news.body)
    
    # Predict credibility for headline and body
    prediction_news, news_confidence = predict_text(f"{clean_headline} {clean_body}")
    
    # Analyze news parts contributions
    headline_sentence_results = analyze_sentences(news.headline)
    headline_conf = predict_text(clean_headline)[1]
    body_sentence_results = analyze_sentences(news.body)
    body_conf = predict_text(clean_body)[1]
    
    # Compute contributions
    total_conf = headline_conf + body_conf
    headline_contrib = headline_conf / total_conf
    body_contrib = body_conf / total_conf
    
    # Sentiment and sensationality analysis
    polarity, objectivity = get_sentiments(f"{clean_headline} {clean_body}")
    
    # Formatting analysis (exclamation, alarmist, all-caps)
    format_features, formatting_score = get_formatting_features(news.headline, news.body)
    
    # Stylistic and lexical analysis (misspelling, repetition, uniqueness)
    words_count, sents_count = get_word_and_sentence_count(f"{news.headline} {news.body}")
    spelling_accuracy, misspelled_words = get_spelling_analysis(f"{news.headline} {news.body}") 
    keyword_repetition_ratio, most_frequent_words = get_keywords_repetition(f"{news.headline} {news.body}")    
    # stylistic_score = ((1 - keyword_repetition_ratio) + spelling_accuracy) / 2
    
    # Calculate overall confidence
    # confidence = round((news_confidence * 0.7 + sensationality_score * 0.15 
    #               + formatting_score * 0.1 + stylistic_score * 0.05), 2)
    prediction_label, prediction_desc = get_prediction_label(prediction_news, news_confidence) 
    
    # Return all computed features in a TextAnalysis object
    return NewsContentAnalysis(
        prediction=prediction_label,
        confidence=round(news_confidence * 100, 2), # convert to percentage
        description=prediction_desc,
        headline_contribution=round(headline_contrib * 100, 2),
        body_contribution=round(body_contrib * 100, 2),
        sentence_analysis=SentenceAnalysis(
            headline_sentences=headline_sentence_results,
            body_sentences=body_sentence_results,
        ),
        sensation_analysis=SensationalAnalysis(
            polarity=polarity,
            objectivity=objectivity),
        format_analysis=FormatAnalysis(
            exclamation=Metric(rate=format_features['exclamation']['rate'], label=format_features['exclamation']['label']),
            alarmist=Metric(rate=format_features['alarmist']['rate'], label=format_features['alarmist']['label']),
            all_caps=Metric(rate=format_features['all_caps']['rate'], label=format_features['all_caps']['label']),
        ),
        style_analysis=StyleAnalysis(
            words_count=words_count,
            sents_count=sents_count,
            spelling_accuracy=spelling_accuracy,
            keyword_repetition_rate=keyword_repetition_ratio,
            most_repeated_words=most_frequent_words
        )
    )