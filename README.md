# BrowseLLM

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/browsellm/browsellm)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/browsellm/browsellm)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/browsellm/browsellm?devcontainer_path=.devcontainer/minimal/devcontainer.json)

## Table of Contents
1. [Description](#desription)
    * [Document Object Model (DOM) based approach](#document-object-model-dom-based-approach)
    * [Vision Based Approach](#vision-based-approach)
1. [Setup Instructions](#setup-instructions)
    * [Chrome Extention](#chrome-extension)
    * [Vision](#vision)
1. [Execution](#execution)
    * [Chrome Extention](#chrome-extention)
    * [Vision](#vision-1)

1. [Acknowledgments](#acknowledgments)

## Desription

BrowseLLM is a Chrome extension that integrates a large language model (LLM) to automate web interactions. The extension allows users to provide tasks, which the LLM then understands, analyzes the current web environment, devises a strategy, and executes a plan to complete the requested task.

Below, we introduce two main approaches used to analyze our environments : 

### Document Object Model (DOM) based approach 
    
**Methodology** : 

1. Retrive DOM of the webpage the user currently lies in.
1. Ask the user for the task it wants to agent to perform.
1. Use the task and the raw DOM to get a filtered DOM using compression .techniques that we developed (Mentioned in the report).
1. Feed the relevent environment information with the task to the agent to retrive decomposed tasks and retrive steps to perfrom those tasks.
1. Call the predefined methods to perform the action.


### Vision Based Approach 

**Methodology** : 

1. **Initial Action List:**
   - The AI is given an image of the current webpage and the user's task prompt.
   - It determines if the task is about understanding the page content (like providing a summary or answering questions) or if it needs to take actions on the page.
   - If it's about understanding content, it returns a JSON object with `"type": "output"` and the requested content.
   - If it needs to take actions, it returns a JSON object with `"type": "action"` and a list of actions (`click`, `input text`, etc.) required to complete the task.

2. **Find Elements:**
   - The AI is given the action list from step 1 and the webpage image.
   - It finds the numbered tag corresponding to each page element needed for the actions.
   - It returns a list of those numbers, one for each action element.

3. **Interact:**
   - Using the action-element pairings from step 2, the AI interacts with the webpage by calling pre-generated JavaScript functions for `click`, `input text`, etc.

4. **Determine Further Actions:**
   - The AI is given the original task, the list of completed actions, and the new webpage image after those actions.
   - It determines if more actions are needed to fully complete the task.
   - If more actions are required, it goes back to step 1 with the updated information.

5. **Evaluation:**
   - The AI evaluates if the original task was successfully completed by comparing the start and end webpage images.
   - It returns a JSON object with a boolean (`true` if task completed) and reasoning for its decision.

```json
{
  "completed": 1,
  "reasoning": "The second image shows the login page, which means the task to go to the login page was successfully completed."
}
```


## Setup Instructions

1. Clone this Repository


### Chrome Extension



To get started , install the dependencies:
```sh
bun install
```

To build and bundle the extension, run the following commands:

```sh
bun run build
bun run bundle
```



### Vision 

To get started : 

1. Run ``` cd vision``` in terminal

1. Create .env file with a format like 

```
OPENAI_API_KEY=...
USER_TASK=..... 
```

3. Run ```pip install -r openai``` in terminal


## Execution



<!-- Copy code from preprocess_focusable.js and run it in the chrome console
also Copy code from interaction_functions.js and run it in the console
Take a screenshot of this procesed page
Put the image in the vision folder and name it 'env_start.png'
Run initial_actions.py
output will be list of actions and their corresponding tag ids per action
manually how to make function calls, Tag number will be in the output
for 'click' actions : run clickElementAtIndex(index = tagnumber)
for 'input' actions : run enterTextAtIndex(index= tagnumber, text_from_last_output)
in console,

repeat the preprocessing step
take the screenshot of this page and save it in vision folder, name it 'env_next.png'
edit the json_object variable in more_act.py to the action list output from initial_actions.py
now run more_act.py
if more steps need to be taken then go to further_action.py 
change the variable json_object with list of actions upto this point
the output of this will be same format as initial_actions, based on the acions, call the same js files as described above based on action. 
Loop between steps more_act and further_action, until more_act returns that taask is complete
At this point you can run 

now run evaluation.py, output will tell if the task was successfuly completed or not and why. -->

### Chrome Extention

1. Download Extention

You can find the output in the root folder, named as `browse-llm.zip`.

You should then download and extract the file in your local machine. You can then find the extension in the `dist` folder.

To install the extension, you can see this link:
[How to Install a Chrome Extension in Developer Mode

### Vision

Here are the steps to run the vision agent as a markdown list:

1. **Preprocess the Webpage**
   - Copy the code from `preprocess_focusable.js` and run it in the Chrome console.
   - Copy the code from `interaction_functions.js` and run it in the Chrome console.
   - Take a screenshot of the processed page.
   - Save the screenshot in the `vision` folder and name it `env_start.png`.

2. **Initial Actions**
   - Run `initial_actions.py`.
   - The output will be a list of actions and their corresponding tag IDs per action.
   - For `click` actions, manually run `clickElementAtIndex(index=tagNumber)` in the console, where `tagNumber` is the tag number from the output.
   - For `input` actions, manually run `enterTextAtIndex(index=tagNumber, text_from_last_output)` in the console, where `tagNumber` is the tag number from the output, and `text_from_last_output` is the text to be entered.
   - Repeat the preprocessing step.
   - Take a screenshot of the updated page and save it in the `vision` folder, naming it `env_next.png`.

3. **Determine Further Actions**
   - Edit the `json_object` variable in `more_act.py` with the action list output from `initial_actions.py`.
   - Run `more_act.py`.
   - If more steps need to be taken, go to the next step. Otherwise, proceed to the evaluation step.

4. **Further Actions**
   - Change the `json_object` variable in `further_action.py` with the list of actions up to this point.
   - The output of `further_action.py` will have the same format as `initial_actions.py`.
   - Based on the actions, call the same JavaScript files as described in step 2.
   - Loop between steps 3 and 4, until `more_act.py` returns that the task is complete.

5. **Evaluation**
   - Run `evaluation.py`.
   - The output will tell if the task was successfully completed or not, and provide reasoning.


## Acknowledgments

- **The project team**: Mehrdad Khanzadeh, Shreyans Babel, Rishab Mehta, and Jayesh Ramana

- This course is final project for Advanced Natural Language processing CS 685 @ UMass Amherst. 






