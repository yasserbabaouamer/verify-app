import re
import pyarabic.araby as araby

# Remove URLs from text
def remove_urls(text: str) -> str:
    url_pattern = r'https?://\S+'
    return re.sub(url_pattern, '', text)


def remove_white_spaces(text: str):
    # Replace multiple whitespace (spaces, tabs, newlines) with a single space
    text = re.sub(r'\s+', ' ', text)
    # Strip leading and trailing whitespace
    return text.strip()


def remove_empty_lines(text: str):
    empty_line_re = "^\s*\n"
    text = re.sub(empty_line_re, '', text, flags=re.MULTILINE)
    return text.replace('\n', ' ')


# Remove HTML tags and empty lines from text
def remove_html_tags(text: str) -> str:
    tags_re = "<[^>]+>"
    return re.sub(tags_re, '', text)
    

def preprocess_text(text: str):
    # Normalization
    text = remove_urls(text)
    text = remove_html_tags(text)
    text = remove_white_spaces(text)
    text = remove_empty_lines(text)
    text = araby.strip_tashkeel(text)
    text = araby.strip_tatweel(text)
    return text


def main():
    print(preprocess_text(
        """
            فتنفست الصعداء  
            ثم قالت للطبيب: لم آكل منذ يومين !!!!!!!
        """))


if __name__ == '__main__':
    main()