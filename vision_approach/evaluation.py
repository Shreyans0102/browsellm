
"""
This script is used to evaluate the successful completion of a task involving webpage interactions.
It takes two images as input: the first image corresponds to the initial state of the webpage, and the second image corresponds to the state of the webpage after some actions have been taken.
The script uses the OpenAI GPT-4o model to generate a response indicating whether the task has been successfully completed or not, along with a reasoning for the decision.

Usage:
  - Set the environment variables OPENAI_API_KEY and USER_TASK to your OpenAI API key and the task prompt, respectively.
  - Ensure that the images are located in the "images" folder in the same directory as this script.
  - Run the script.

"""

import os
from dotenv import load_dotenv
load_dotenv()

# Rest of the code...
import os
from dotenv import load_dotenv
load_dotenv()

openai_api_key = os.environ.get('OPENAI_API_KEY')
task_prompt = os.environ.get('USER_TASK')


from openai import OpenAI
client = OpenAI(api_key=openai_api_key)
import base64
import sys
import json


import base64

def encode_image(image_path):
  """
  Encodes the image located at the given image_path into base64 format.

  Args:
    image_path (str): The path to the image file.

  Returns:
    str: The base64 encoded representation of the image.
  """
  with open(image_path, "rb") as image_file:
    return base64.b64encode(image_file.read()).decode('utf-8')

current_directory = os.path.dirname(__file__)
image_folder = os.path.join(current_directory, "images")


# Path to your image


start_image_path = os.path.join(image_folder, "env_start.png")
end_image_path = os.path.join(image_folder, "env_next.png")

# Getting the base64 string
base64_image1 = encode_image(start_image_path)
base64_image2 = encode_image(end_image_path)

response1 = client.chat.completions.create(
  model="gpt-4o",
  response_format={ "type": "json_object" },
  messages=[
    {
      "role": "system",
      "content": [
        {
          "type": "text",
          "text": "You are an assistant that determines if a task involving webpage interactions has been completed succesfuly.\""
        }
      ]
    },
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": (
    f"You will receive a task and two images. The task (starting with 'Task: '), "
    f"was meant to be completed on the webpage the first image corresponds to."
    f"Think about how the webpage would change and how it would look after all steps are taken to complete this task. \\n\\n"
    f"The second image shows the same webpage after some actions have been taken. "
    f"Do you believe this second image shows that task has been succesfully completed?"
    f"You should return a JSON in this format:\\n"
    f"{{\\n"
    f'  "completed": "1 for succesful completion 0 for unsuccesful",\\n'
    f'  "reasoning": "one sentence on your reasoning for why/why not the task was completed."\\n'
    f"}}\\n"
    f"Task: {task_prompt}"
)
        },
        {
          "type": "image_url",
          "image_url": {
                "url": f"data:image/jpeg;base64,{base64_image1}",
                "detail": "low"
            }
        },
        {
          "type": "image_url",
          "image_url": {
                "url": f"data:image/jpeg;base64,{base64_image2}",
                "detail": "low"
            }
        }
      ]
    },
  ],
  temperature=1,
  max_tokens=1602,
  top_p=1,
  frequency_penalty=0,
  presence_penalty=0
)

out = response1.choices[0].message.content
json_object = json.loads(out)
print(out)
