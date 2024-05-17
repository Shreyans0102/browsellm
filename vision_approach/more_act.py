"""
  Determines if a task involving webpage interaction is complete.

  Args:
    task_prompt (str): The task prompt.
    action_str (str): The string representation of the completed actions.
    image_path (str): The path to the image file.

  Returns:
    dict: A dictionary containing the result of the task completion determination.
      The dictionary has the following format:
      {
        "more_actions": "1 for further actions are needed 0 for completed task",
        "reasoning": "one sentence on your reasoning for why/why not the task was completed."
      }
  """


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


def encode_image(image_path):
  """
  Encodes the image file to base64 string.

  Args:
    image_path (str): The path to the image file.

  Returns:
    str: The base64 encoded image string.
  """
  with open(image_path, "rb") as image_file:
    return base64.b64encode(image_file.read()).decode('utf-8')

current_directory = os.path.dirname(__file__)
image_folder = os.path.join(current_directory, "images")

# Path to your image
image_name = "env_next.png"
image_path = os.path.join(image_folder, image_name)


json_object = {}


action_str = "Actions:\n" + "\n".join([f"- {action['type']} on field '{action['field']}'" for action in json_object["content"]]) + "\n\n"

def determine_task_completion(task_prompt, action_str, image_path):
  
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
            "text": "You are an assistant that determines if a task involving webpage interaction is complete."
          }
        ]
      },
      {
        "role": "user",
        "content": [
          { 
            "type": "text",
            "text": ("You will receive three inputs. The first one is a task (starting with 'Task: '), "
                "the second is a list of actions (starting  with 'Actions: ') that have been completed, "
                "and the third is an image of the resulting webpage. "
                "Based on these determine if further actions need to be taken. "
                "When making this decision take the following steps "
                "1. Consider the goal: Think about what the webpage when the task is completed would look like. What are key elements it would have. \n"
                "2. Compare: Compare what the goal webpage would look like to the image of the webpage given. \n"
                "3. Consider the steps: Would the list of actions provided allow a user to reach the goal. The actions can take the form of \"click\", \"input\", or \"output\" \n"
                "2. Make a decision: Based on all the information from the previous three steps, determine if the goal has been completed or if more steps are required. \n"
                "You should return a JSON in this format:\\n"
                "{{\\n"
                '  "more_actions": "1 for further actions are needed 0 for completed task",\\n'
                '  "reasoning": "one sentence on your reasoning for why/why not the task was completed."\\n'
                "}}\\n"
                f"Task: {task_prompt} \n"
                f"Actions: {action_str}")
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
  return out

result = determine_task_completion(task_prompt, action_str, image_path)
print(result)
