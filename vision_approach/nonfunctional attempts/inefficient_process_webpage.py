import base64
import requests

# OpenAI API Key
api_key = ""

# Function to encode the image
def encode_image(image_path):
  with open(image_path, "rb") as image_file:
    return base64.b64encode(image_file.read()).decode('utf-8')

# Path to your image
image_path = ""

# Getting the base64 string
base64_image = encode_image(image_path)

headers = {
  "Content-Type": "application/json",
  "Authorization": f"Bearer {api_key}"
}

task_prompt = ""

payload1 = {
  "model": "gpt-4o-2024-05-13",
  "response_format": { "type": "json_object" },
  "messages": [
        {
            "role": "system",
            "content": "You are an assistant that helps solve tasks by performing actions on a webpage or providing necessary outputs."

        },
        {
            "role": "user",
            "content": task_prompt
        },
        {
            "role": "user",
            "content": f"![image](data:image/jpeg;base64,{base64_image})"
        }
    ],
#   "max_tokens": 300
}

import tiktoken

# Initialize the tokenizer
encoding = tiktoken.get_encoding("o200k_base") 

# Function to count tokens
def count_tokens(messages):
    return sum(len(encoding.encode(msg["content"])) for msg in messages)

# Calculate token count
total_tokens = count_tokens(payload1["messages"])
print(f"Total tokens: {total_tokens}")

# response1 = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload1)
# print(response1.json())
field_name = "sign in"


payload2 = {
  "model": "gpt-4o-2024-05-13",
  "messages": [
    {
      "role": "system",
      "content": "You are an assistant that helps identify specific fields on webpages using visual indicators."
    },
    {
      "role": "user",
      "content": f"Determine the letters corresponding to the '{field_name}' field on a webpage. Follow these steps:\n\n1. Understand the Objective: The goal is to find the letters corresponding to the '{field_name}' field on a given webpage.\n2. Locate the Target Field: Look for the '{field_name}' option or something representing that on the webpage. Consider where it would be typically located.\n3. Identify the numbers: Check the numbers in the yellow box that are closest to or directly label the '{field_name}' field.\n4. Verification: Ensure the numbers identified indeed correspond to the '{field_name}' field by considering its position and the associated yellow label on the webpage.\n\nUse these steps to determine the numbers corresponding to specific fields on a webpage and verify their accuracy."
    },
    {
          "type": "image_url",
          "image_url": {
            "url": f"data:image/jpeg;base64,{base64_image}"
          }
    }
  ],
  "max_tokens": 300
}

# response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)

# print(response.json())