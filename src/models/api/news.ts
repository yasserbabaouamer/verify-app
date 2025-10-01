// Requests
export interface NewsData {
  headline: string;
  body: string;
  url?: string | null;
  date?: string | null;
}

// Responses
export interface Metric {
  rate: number;
  label: string;
}

export interface FormatAnalysis {
  exclamation: Metric;
  alarmist: Metric;
}

export interface SentenceAnalysisItem {
  sentence: string;
  prediction: string;
  confidence: number;
}

export interface SentenceAnalysis {
  headline_sentences: SentenceAnalysisItem[];
  body_sentences: SentenceAnalysisItem[];
}

export interface SensationalAnalysis {
  polarity: number;
  objectivity: number;
}

export interface Word {
  keyword: string;
  repetitions_count: number;
}

export interface StyleAnalysis {
  words_count: number;
  sents_count: number;
  spelling_accuracy: number;
  keyword_repetition_rate: number;
  most_repeated_words: Word[];
}

export interface NewsContentAnalysis {
  prediction: string;
  confidence: number;
  description: string;
  headline_contribution: number;
  body_contribution: number;
  sentence_analysis: SentenceAnalysis;
  sensation_analysis: SensationalAnalysis;
  format_analysis: FormatAnalysis;
  style_analysis: StyleAnalysis;
}

export interface EvaluationMetric {
  score: number;
  reason: string;
}

export interface SourceVerificationResponse {
  url?: string | null;
  overall?: number | null;
  reputation: EvaluationMetric;
  transparency: EvaluationMetric;
  factual_reporting_history: EvaluationMetric;
  editorial_standards: EvaluationMetric;
}

export interface FactCheckResponse {
  name: string;
  check: string;
  url?: string | null;
}

export interface MediaCheckResponse {
  name: string;
  check: string;
  url?: string | null;
}

export interface CrossCheckResponse {
  media: MediaCheckResponse[];
  fact_check_dbs: FactCheckResponse[];
}

export interface NewsAnalysisResponse {
  content_analysis: NewsContentAnalysis;
  source_verification: SourceVerificationResponse;
  cross_check: CrossCheckResponse;
}

export interface TextValidation {
  check: string;
  reason: string;
}
