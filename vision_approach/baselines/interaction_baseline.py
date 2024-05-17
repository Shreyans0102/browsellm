from openai import OpenAI
client = OpenAI(api_key="")
import base64
import sys
import json
import os

def encode_image(image_path):
  with open(image_path, "rb") as image_file:
    return base64.b64encode(image_file.read()).decode('utf-8')

current_directory = os.path.dirname(__file__)
image_folder = os.path.join(current_directory, "multipage_images")

# Path to your image
image_name = "image_raw.png"
image_path = os.path.join(image_folder, image_name)


task_prompt = ""

# Getting the base64 string
base64_image = encode_image(image_path)

response3 = client.chat.completions.create(
  model="gpt-4o",
  response_format={ "type": "json_object" },
  messages=[
    {
      "role": "system",
      "content": [
        {
          "type": "text",
          "text": "You are an assistant that creates a list of actions and JavaScript code for each action to complete a task on a webpage."
        }
      ]
    },
    {
      "role": "user",
      "content": [
        { 
          "type": "text",
          "text": ("You will receive two inputs. The first one is a task (starting with 'Task: '), "
                   "the second is an image of the webpage. "
                   "Based on these determine what steps need to be taken to complete the task. "
                   "If you think an output is requested, for instance, summarizing the page or answering "
                    "some questions, you should return a JSON in this format:\\n"
                    "{{\\n"
                    '  "type": "output",\\n'
                    '  "content": "<content>"\\n'
                    "}}\\n"
                    "If you think you need to perform an action, for instance, filling out an input field "
                    "or clicking on a button or link, you should return a JSON in this format:\\n"
                    "{{\\n"
                    '  "type": "action",\\n'
                    '  "content": [\\n'
                    '    {{\\n'
                    '      "type": "input",\\n'
                    '      "text": "<text to be put inside the input>",\\n'
                    '      "field": "<a few words that describe the input field>"\\n'
                    '      "code": "<javascript code that can be injected to the console to complete this action>"\\n'
                    '    }},\\n'
                    '    {{\\n'
                    '      "type": "click",\\n'
                    '      "field": "<a few words that describe the clickable field>"\\n'
                    '      "code": "<javascript code that can be injected to the console to complete this action>"\\n'
                    '    }},\\n'
                    '    ...\\n'
                    '  ]\\n'
                    "}}\\n"
                    "You can have as many actions in one step as you want, as long as you can be sure it's the correct action. "
                    "Every single interaction with the webpage needs to be its own action, don't skip over anything. "
                    "Even if you are not confident in the code, do your best to generate something. "
                   f"Task: {task_prompt} \n")
        },
        {
          "type": "image_url",
          "image_url": {
                "url": f"data:image/jpeg;base64,{base64_image}"
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

out = response3.choices[0].message.content
print(out)