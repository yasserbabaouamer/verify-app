
# BAYANN: Fake News Detection App

**BAYANN** is an Arabic fake news detection application that leverages AI to help users identify and analyze the credibility of news articles.
BAYANN provides deep insights into news content, source authenticity, and cross-verification with trusted sources.

## Features

- **News Content Analysis**
  - Shows the overall prediction for the news article.
  - Highlights sentences' predictions.
  - Provides sensational analysis and lexical/stylistic analysis.

- **Source Verification**
  - Checks the source's reputation, transparency, factual reporting history, and editorial standards.

- **Cross-Checking**
  - Verifies the news against well-known trustful media sources.
  - Checks the news over famous fact-check databases.

## Tech Stack

**Frontend**
- React
- TypeScript
- Tailwind CSS
- Vite

**Backend**
- Python
- FastAPI

**AI & NLP**
- AraBERT (fine-tuned for Arabic news)
- CAMel tools for text preprocessing
- PyTorch
- Transformers (Hugging Face)
- Gemini agent for source validation and cross-checking



## Project Structure

- `/` — React app (UI, components, styles)
- `backend/` — FastAPI app (API, model inference, source verification, cross-checking)

## Screenshots
![Home page](https://drive.usercontent.google.com/download?id=1wNDq4lgAW2hCOlMTvEYRIsnQLWLugZRo)
:--:
*Figure 1: Home page*

![Analysis Dashboard](https://drive.usercontent.google.com/download?id=1e6yvQ51IegebELlRue_A5GhcLtIlwHRt)
:--:
*Figure 2: Analysis Result Dashboard*

![Content Analysis](https://drive.usercontent.google.com/download?id=1-rv13NMy7Axu1lwbkwLu4xTEs1ETQXBj)
:--:
*Figure 3: News Content Analysis*


![Source Verification](https://drive.usercontent.google.com/download?id=1BWd6R-PDyui3ZRmFJ0F6Q74WdW38qR2a)
:--:
*Figure 4: Source Verification*


![Cross-Check](https://drive.usercontent.google.com/download?id=1WC-vKLJAq3qFz3UMS3tcW_8mbxcHN-f1)
:--:
*Figure 5: Cross-Check over Trustful Media and Fact-Check Databases*

## General Workflow

1. **User Input:** Enter the news article, its URL, and the date.
2. **Content Analysis:** The app predicts the overall credibility, highlights sentence-level predictions, and provides lexical, stylistic, and sensational analysis.
3. **Source Verification:** The app checks the source's reputation, transparency, factual reporting history, and editorial standards.
4. **Cross-Checking:** The app verifies the news against trusted media sources and fact-check databases.



## Reflection

**BAYANN** was developed as a capstone project for an NLP class, with the goal of building a practical solution for fake news detection in Arabic media. The project combines modern AI techniques, robust engineering, and thoughtful user experience design to address the challenge of news verification.


#### Highlights

- **Data Collection:**
  - Gathered diverse Arabic news resources to ensure a robust and representative dataset.

- **Preprocessing:**
  - Applied NLP steps including tag removal, cleaning special characters, handling Arabic syntax, and tokenization for high-quality input.

- **Model Training:**
  - Fine-tuned AraBERT on the processed data, achieving:
    - **92% Accuracy**
    - **92% Precision**
    - **92% Recall**
    - **92% F1-score**

- **Prompt Engineering:**
  - Designed effective prompts for the Gemini agent to enhance cross-validation capabilities and improve source verification.

- **Backend Development:**
  - Built a FastAPI backend for model inference, source verification, cross-checking, and generating meaningful statistics.

- **Frontend Development:**
  - Developed a user-friendly interface using React and Tailwind CSS for seamless user experience.



#### Challenges Faced


#### 1. Building a Pre-processing Pipeline Aligned with Model Requirements
AraBERT requires inputs in a very specific tokenized and normalized format. To ensure compatibility, we developed a preprocessing pipeline that:
- Normalizes Arabic text while handling languages-specific features.
- Removes irrelevant noise while preserving key linguistic cues essential for detecting misinformation.
- Segments the text properly to match the model's expected input format.

#### 2. Designing Effective Prompts for the Agent
For source verification and cross-checking, the app integrates Gemini agent with web access tools. The challenge was ensuring **accuracy and consistency** in the outputs. To address this, we experimented with advanced prompting strategies such as:
- **Chain-of-Thought (CoT)** for structured reasoning.
- **Role-based prompting** to guide the model’s perspective.
- **Decoding techniques** (e.g., temperature control) to balance creativity with reliability.

#### 3. Delivering User-Friendly Analytical Results
Raw metric values are not always meaningful to end users. The challenge was to **translate complex model outputs into clear, actionable insights**. We solved this by:
- Designing formulas and threshold ranges for each metric based on research and empirical testing.
- Categorizing outcomes (e.g., _Normal_, _Suspicious_, _High-Risk_).
- Incorporating both headline and body contributions to reflect realistic news structures.


## Acknowledgements

- [AraBERT](https://huggingface.co/aubmindlab/bert-base-arabertv2)
- [Gemini](https://ai.google.dev/gemini-api/docs)

## License
This code is provided solely for educational and reference purposes. Any reproduction, modification, distribution, or other use requires prior permission from the author.

## Contact
For inquiries or support, please contact me at [yasser.babaouamer@gmail.com](mailto:yasser.babaouamer@gmail.com).