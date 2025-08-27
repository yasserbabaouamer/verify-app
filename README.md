# VERIFY: Arabic Fake News Detection App

**VERIFY** is an Arabic fake news detection application that leverages AI to help users identify and analyze the credibility of news articles. Built with a custom fine-tuned AraBERT model, VERIFY provides deep insights into news authenticity, lexical statistics, and cross-verification with trusted sources.

## Features

- **Fake News Detection:**
  - Utilizes a fine-tuned AraBERT model trained on 10,000+ labeled news articles (real and fake) for high-accuracy predictions.
- **Lexical Analysis:**
  - Provides detailed statistics such as counts of nouns, verbs, adjectives, adverbs, unique words, and total words in the news text.
- **Accuracy & Confidence Scores:**
  - Displays the model's confidence in its predictions, helping users understand the reliability of the result.
- **Source Validation:**
  - Uses the Gemini web search agent to validate news content against trusted sources, offering an extra layer of verification.
- **Modern UI:**
  - Built with React and Tailwind CSS for a clean, responsive, and user-friendly experience.

## Tech Stack

- **Frontend:**
  - React
  - Tailwind CSS
- **Backend:**
  - Python
  - FastAPI
  - PyTorch
  - AraBERT (fine-tuned)
  - Sentence Transformers
- **AI & NLP:**
  - AraBERT for Arabic language understanding
  - Custom fine-tuning on a large, diverse dataset
- **Web Search Integration:**
  - Gemini web search agent for real-time source validation


## Project Structure

- `frontend/` — React app (UI, components, styles)
- `backend/` — FastAPI app (API, model inference, web search)


## Screenshots
![home-page](https://drive.usercontent.google.com/download?id=1vSnS6MPeFCT5Bu3gOjPN24WvE359jPU8)
 :--:
 figure 1: Home page

![news-analysis-page](https://drive.usercontent.google.com/download?id=1Q23_Pr_Vc19pW-5kOgknC4AVRatEqeyT)
:--:
 figure 2: News Analysis page


## Reflection

This project was developed as a final project for the NLP class, with the objective of designing a solution to detect fake news in Arabic.

- **Data Collection:** Started by gathering diverse Arabic news resources.
- **Preprocessing Pipeline:** News articles were processed through several NLP steps: removing tags, tokenization, handling Arabic-specific syntax, performing Named Entity Recognition (NER), and lemmatization.
- **Model Training:** Prepared the AraBERT model, passed the processed data, and trained the model.
- **Results:** The model achieved 82% accuracy, with 81% precision, 81% recall, and 81% F1-score.
- **Web Search Integration:** Integrated the Gemini web search agent for cross-validating news articles against trusted sources.


## Credits

- **AraBERT:** [https://github.com/aub-mind/arabert](https://github.com/aub-mind/arabert)
- **Sentence Transformers:** [https://www.sbert.net/](https://www.sbert.net/)
- **Gemini Web Search**

## License

This project is licensed under the MIT License.
