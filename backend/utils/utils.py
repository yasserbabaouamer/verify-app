from google.genai.types import Tool, GoogleSearch
import json
import re



google_search_tool = Tool(
    google_search=GoogleSearch()
)
model_id = "gemini-2.5-flash"


def extract_json_from_markdown(text) -> dict:
    """
    Extracts and parses a JSON object from a markdown-formatted string.
    Args:
        text (str): The input string containing the markdown with a JSON code block.
    Returns:
        dict: The parsed JSON object as a Python dictionary, or None if not found.
    """
    # Regex to find the JSON code block.
    # The `re.DOTALL` flag is used to make '.' match newlines.
    # The `?` makes the match non-greedy, so it stops at the first closing triple backtick.
    json_pattern = re.compile(r'```json\s*(.*?)\s*```', re.DOTALL)
    match = json_pattern.search(text)
    if match:
        json_string = match.group(1)
        try:
            # Parse the extracted JSON string into a Python dictionary.
            json_object = json.loads(json_string)
            return json_object
        except json.JSONDecodeError as e:
            raise Exception(f"Failed to parse JSON: {e}")
    else:
        print("Response text:", text)
        raise Exception("No JSON code block found.")
