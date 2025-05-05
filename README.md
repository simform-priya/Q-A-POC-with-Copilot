# Question Answer App

This is a simple Question Answer application built using Node.js, Express, and the Gemini API for generating answers. The app allows users to ask questions through a web interface and receive AI-generated answers.

## Features
- Accepts user questions via a web form.
- Fetches AI-generated answers using the Gemini API.
- Displays answers in real-time.
- Includes a loader to indicate processing.
- Caches responses to optimize performance.

## Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)
- A valid Gemini API key

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/simform-priya/Q-A-POC-with-Copilot.git
   cd Q-A-POC-with-Copilot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Gemini API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. Ensure the `node_modules` directory is ignored by Git:
   ```bash
   echo "node_modules/" >> .gitignore
   ```

## Usage
1. Start the server:
   ```bash
   node server.js
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

3. Enter your question in the input field and click "Ask" to get an answer.

## Project Structure
```
Q-A-POC-with-Copilot/
├── public/
│   ├── index.html       # Frontend HTML file
├── server.js            # Backend server code
├── .gitignore           # Git ignore file
├── package.json         # Project dependencies
└── README.md            # Project documentation
```

## API Details
- **Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`
- **Method**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "contents": [
      {
        "parts": [
          { "text": "Your question here" }
        ]
      }
    ]
  }
  ```

## Contributing
Feel free to fork this repository and submit pull requests for improvements or bug fixes.

## License
This project is licensed under the MIT License.
