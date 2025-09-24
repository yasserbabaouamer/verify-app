from datetime import date as _date
from typing import Optional
from pydantic import BaseModel

# Requests
class NewsSchema(BaseModel):
    headline: str
    body: str
    url: Optional[str] = None
    date: Optional[_date] = None

# Responses
class SentenceAnalysisItem(BaseModel):
    sentence: str
    prediction: str
    confidence: float



class SentenceAnalysis(BaseModel):
    headline_sentences: list[SentenceAnalysisItem]
    body_sentences: list[SentenceAnalysisItem]



class Metric(BaseModel):
    rate: float
    label: str


class SensationalAnalysis(BaseModel):
    polarity: float
    objectivity: float


class FormatAnalysis(BaseModel):
    exclamation: Metric
    alarmist: Metric
    all_caps: Metric


class Word(BaseModel):
    keyword: str
    repetitions_count: int


class StyleAnalysis(BaseModel):
    words_count: int
    sents_count: int
    spelling_accuracy: float
    keyword_repetition_rate: float
    most_repeated_words: list[Word]


class NewsContentAnalysis(BaseModel):
    prediction: str
    confidence: float
    description: str
    headline_contribution: float
    body_contribution: float
    sentence_analysis: SentenceAnalysis
    sensation_analysis: SensationalAnalysis
    format_analysis: FormatAnalysis
    style_analysis: StyleAnalysis



class TextValidation(BaseModel):
    check: str
    reason: str



class EvaluationMetric(BaseModel):
    score: int
    reason: str

## Source Verification
class SourceVerificationResponse(BaseModel):
    url: Optional[str] = None
    reputation: EvaluationMetric
    transparency: EvaluationMetric
    factual_reporting_history:EvaluationMetric
    editorial_standards: EvaluationMetric


class MediaCheckResponse(BaseModel):
    name: str
    check: str
    url: str | None


class FactCheckResponse(BaseModel):
    name: str
    check: str
    url: str | None


class CrossCheckResponse(BaseModel):
    media: list[MediaCheckResponse]
    fact_check_dbs: list[FactCheckResponse]


class NewsAnalysisResponse(BaseModel):
    content_analysis: NewsContentAnalysis
    source_verification: Optional[SourceVerificationResponse] = None
    cross_check: Optional[CrossCheckResponse] = None