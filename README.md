# AI Concierge for ET

A modern, highly interactive financial assistant web application prototype. The app intelligently profiles users through dynamic branching questionnaires and provides personalized financial recommendations using Google's Gemini AI API.

## 🚀 Features
- **Dynamic Onboarding Flow:** The AI dynamically adapts its introductory questions based on your persona (Student, Professional, or Business Owner).
- **Continuous Conversation Loop:** AI-generated suggestions are rendered as clickable action buttons allowing seamless chat integration.
- **Modern UI/UX:** Built with a minimal interface featuring smooth CSS staggered fade-ins, user bubble slide-ins, and dynamic "typing" text loaders.
- **AI Integration:** Native support for the free Google Gemini Generative AI model (`gemini-1.5-flash`).

## 🛠 Tech Stack
- **Frontend:** React, Vite, Vanilla CSS3 
- **Icons:** Lucide-React
- **Backend:** Node.js, Express.js
- **AI Model:** Google Generative AI (`@google/generative-ai`)

## 💻 How to Run Locally

### Backend Setup
1. Open a terminal and navigate to the `backend` directory.
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and add your free Google AI Studio key:
   ```env
   GEMINI_API_KEY=your_real_key_here
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Open a new terminal and navigate to the `frontend` directory.
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open the localhost URL (typically `http://localhost:5173/`) in your browser to interact with your Concierge!
