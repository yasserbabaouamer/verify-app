from schemas import CrossCheckResponse, EvaluationMetric, FactCheckResponse, MediaCheckResponse, NewsAnalysisResponse, SourceVerificationResponse
from schemas import FormatAnalysis, Metric, NewsAnalysisResponse, NewsContentAnalysis, SensationalAnalysis, SentenceAnalysis, SentenceAnalysisItem, StyleAnalysis, Word


def mock_news_analysis() -> NewsAnalysisResponse:
    return NewsAnalysisResponse(
            content_analysis=NewsContentAnalysis(
                prediction="Likely Real",
                confidence=80,
                description="Our analysis indicates the news is highly likely to be credible, based on a comprehensive evaluation of the content, source, and cross-references.",
                headline_contribution=0.4,
                body_contribution=0.6,
                sentence_analysis=SentenceAnalysis(
                    headline_sentences=[
                        SentenceAnalysisItem(
                            sentence="هذا عنوان عظيم للتجربة",
                            prediction="Uncertain (Lean Fake)",
                            confidence=0.69
                        )
                    ],
                    body_sentences=[
                        SentenceAnalysisItem(
                            sentence="طور الباحثون العديد من التقنيات  التي ستسهاهم في تطور الذكاء الإصكناعي كما طور طور للتجربة",
                            prediction="Uncertain (Lean Fake)",
                            confidence=0.99
                        )
                    ]
                ),
                sensation_analysis=SensationalAnalysis(
                    polarity=0.35,
                    objectivity=4.4
                ),
                format_analysis=FormatAnalysis(
                    exclamation=Metric(
                        rate=8,
                        label='Normal'
                    ),
                    alarmist=Metric(
                        rate=15,
                        label='Alarmist'
                    ),
                ),
                style_analysis=StyleAnalysis(
                    words_count=15,
                    sents_count=2,
                    spelling_accuracy=91,
                    keyword_repetition_rate=79,
                    most_repeated_words=[
                        Word(keyword="طور", repetitions_count=5),
                        Word(keyword="للتجربة", repetitions_count=3),
                        Word(keyword="عنوان", repetitions_count=2),
                    ]
                )
            ),
            source_verification=SourceVerificationResponse(
                url="http://example.com/news/123",
                overall=75,
                reputation=EvaluationMetric(score=78, reason="Generally positive reputation with some mixed reviews"),
                transparency=EvaluationMetric(score=65, reason="Moderate"),
                factual_reporting_history=EvaluationMetric(score=80, reason="High"),
                editorial_standards=EvaluationMetric(score=70, reason="Moderate"),
            ),
            cross_check=CrossCheckResponse(
                fact_check_dbs=[
                    FactCheckResponse(
                        name="Snopes",
                        check="Not Mentioned",
                        url=None,
                    ),
                    FactCheckResponse(
                        name="FactCheck.org",
                        check="Not Mentioned",
                        url=None,
                    ),
                    FactCheckResponse(
                        name="PolitiFact",
                        check="Not Mentioned",
                        url=None,
                    )
                ],
                media=[
                    MediaCheckResponse(
                        name="Al Jazeera",
                        check="Mentioned",
                        url="http://aljazeera.com/article/xyz",
                    ),
                    MediaCheckResponse(
                        name="BBC",
                        check="Not Mentioned",
                        url=None,
                    ),
                    MediaCheckResponse(
                        name="Reuters",
                        check="Mentioned",
                        url="http://reuters.com/article/abc",
                    )
                ],
            )
    )