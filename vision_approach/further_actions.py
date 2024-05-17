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
image_folder = os.path.join(current_directory, "images")

# Path to your image
image_name = "env_next.png"
image_path = os.path.join(image_folder, image_name)

task_prompt = ""

# Getting the base64 string
base64_image = encode_image(image_path)

json_object = {
  "type": "action",
  "content": [
    {
      "type": "click",
      "field": "Menu"
    },
    {
      "type": "click",
      "field": "Top Rated Movies"
    },
    {
      "type": "click",
      "field": "Top 250 Movies"
    },
    {
      "type": "click",
      "field": "The Good, the Bad and the Ugly"
    }
  ]
}

action_str = "Actions:\n" + "\n".join([f"- {action['type']} on field '{action['field']}'" for action in json_object["content"]]) + "\n\n"


response1 = client.chat.completions.create(
  model="gpt-4o",
  response_format={ "type": "json_object" },
  messages=[
    {
      "role": "system",
      "content": [
        {
          "type": "text",
          "text": "You are an assistant that helps solve tasks by performing actions on a webpage \"\r\n                \"or providing necessary outputs.\""
        }
      ]
    },
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": (
    f"You will receive three inputs. The first one is a task (starting with 'Task: '), "
    f"the second is a list of actions (starting  with 'Actions Previously Taken: ') that have been completed, "
    f"and the third is an image, with all the inputs and clickable elements highlighted "
    f"by a yellow box near them. \\n\\n"
    f"Your ultimate goal is to solve the task. The task either requires you to output "
    f"something or perform some actions on the webpage.\\n\\n"
    f"If you think an output is requested, for instance, summarizing the page or answering "
    f"some questions, you should return a JSON in this format:\\n"
    f"{{\\n"
    f'  "type": "output",\\n'
    f'  "field": "<content>"\\n'
    f"}}\\n"
    f"If you think you need to perform an action, for instance, filling out an input field "
    f"or clicking on a button or link, you should return a JSON in this format:\\n"
    f"{{\\n"
    f'  "type": "action",\\n'
    f'  "content": [\\n'
    f'    {{\\n'
    f'      "type": "input",\\n'
    f'      "text": "<text to be put inside the input>",\\n'
    f'      "field": "<a few words that describe the input field>"\\n'
    f'    }},\\n'
    f'    {{\\n'
    f'      "type": "click",\\n'
    f'      "field": "<a few words that describe the clickable field>"\\n'
    f'    }},\\n'
    f'    ...\\n'
    f'  ]\\n'
    f"}}\\n"
    f"You can have as many actions in one step as you want, as long as you can be sure it's the correct action. "
    f"Only return actions that can be done on the current webpage, any further actions will be determined at a later stage. "
    f"Some actions have already been completed, but they may have been incorrect. "
    f'Actions are either "click" or "input" and will be run in the order you provide.\\n\\n'
    f"Make sure you return the result in the required format. You should only return a JSON object, nothing else.\\n\\n"
    f"Task: {task_prompt} \n"
    f"Actions Previously Taken: {action_str}"
)
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

out = response1.choices[0].message.content
print(out)
json_object = json.loads(out)

# json_object = {}
# json_object["content"] = [{'type': 'click', 'field': 'Log in button'}]

# try:
#     if json_object["type"] == "output":
#         print(json_object["field"])
#         print("Exiting the program...")
#         sys.exit(0)
# except Exception as error:
#     print("An exception occurred:", error)

# print(json_object["content"])

# action_str = "Actions:\n" + "\n".join([f"- {action['type']} on field '{action['field']}'" for action in json_object["content"]]) + "\n\n"
# print(action_str)

# chain_of_thought_prompt = (
#     "You will receive a list of actions and an image of a webpage with numbered yellow boxes next to each field. "
#     "Your goal is to find the numbers corresponding to the fields necessary for each action. Follow these steps:\n\n"
#     "1. Understand the Objective: The goal is to find the numbers corresponding to the fields for a list of actions on a webpage.\n"
#     "2. Locate the Target Fields: For each action, identify the target field on the webpage.\n"
#     "3. Identify the Numbers: Check the numbers in the yellow box that are closest to or directly label each target field.\n"
#     "4. Verification: Ensure the numbers identified indeed correspond to the target fields by considering their positions and the associated yellow labels on the webpage.\n\n"
#     "Use these steps to determine the numbers corresponding to specific fields on a webpage and verify their accuracy.\n\n"
#     f"Actions: {action_str}"  
#     "If there is any field that cannot be found return \"-1\" for that action and all the actions after it."
#     "Return the numbers in the order of the actions as a JSON list. "
# )

# response2 = client.chat.completions.create(
#   model="gpt-4o",
#   response_format={ "type": "json_object" },
#   messages=[
#     {
#       "role": "system",
#       "content": [
#         {
#           "type": "text",
#           "text": "You are an assistant that helps identify specific fields on webpages using visual indicators."
#         }
#       ]
#     },
#     {
#       "role": "user",
#       "content": [
#         {
#           "type": "text",
#           "text":chain_of_thought_prompt
#         },
#         {
#           "type": "image_url",
#           "image_url": {
#                 "url": f"data:image/jpeg;base64,{base64_image}"
#             }
#         }
#       ]
#     },
#   ],
#   temperature=1,
#   max_tokens=1602,
#   top_p=1,
#   frequency_penalty=0,
#   presence_penalty=0
# )

# out = response2.choices[0].message.content

# print(out)
