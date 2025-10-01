# BAYANN: Arabic Fake News Detection App

**BAYANN** is an Arabic fake news detection application that leverages AI to help users identify and analyze the credibility of news articles. 
BAYANN provides deep insights into news content, source authenticity, and cross-verification with trusted sources.

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
- **AI & NLP:**
  - AraBERT for Arabic language understanding
  - Custom fine-tuning on a large, diverse dataset
- **Web Search Integration:**
  - Gemini web search agent for real-time source validation


## Project Structure

- `frontend/` — React app (UI, components, styles)
- `backend/` — FastAPI app (API, model inference, web search)


## Screenshots
![home-page](https://drive.usercontent.google.com/download?id=1wNDq4lgAW2hCOlMTvEYRIsnQLWLugZRo)
 :--:
 Figure 1: Home page


![analysis-dashboard](https://drive.usercontent.google.com/download?id=14e65rvePa0Y_FDNgyTF9SPdZwM0i3yxc)
:--:
 Figure 2: Analysis Result Dashboard


![content-analysis](https://drive.usercontent.google.com/download?id=14e65rvePa0Y_FDNgyTF9SPdZwM0i3yxc)
:--:
 Figure 3: News Content Analysis


![source-verification](https://drive.usercontent.google.com/download?id=14e65rvePa0Y_FDNgyTF9SPdZwM0i3yxc)
:--:
 Figure 4: Source Verification


![cross-check](https://drive.usercontent.google.com/download?id=14e65rvePa0Y_FDNgyTF9SPdZwM0i3yxc)
:--:
 Figure 5: Cross Check over Trustful Medias and Fact-check databases.



## Reflection

This project was developed as a final project for the NLP class, with the objective of designing a solution to detect fake news in Arabic.

- **Data Collection:** Started by gathering diverse Arabic news resources.
- **Preprocessing Pipeline:** News articles were processed through several NLP steps: removing tags, tokenization, handling Arabic-specific syntax, performing Named Entity Recognition (NER), and lemmatization.
- **Model Training:** Prepared the AraBERT model, passed the processed data, and trained the model.
- **Results:** The model achieved 92% accuracy, with 92% precision, 92% recall, and 92% F1-score.
- **Web Search Integration:** Integrated the Gemini web search agent for cross-validating news articles against trusted sources.


## Credits

- **AraBERT:** [https://github.com/aub-mind/arabert](https://github.com/aub-mind/arabert)
- **Sentence Transformers:** [https://www.sbert.net/](https://www.sbert.net/)
- **Gemini Web Search**

## License

This project is licensed under the MIT License.
