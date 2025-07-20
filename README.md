<div align="center">
  <img src="https://i.imgur.com/3Z6Xq2Y.png" alt="Prepwise Logo" width="120"/>
  <h1>Prepwise</h1>
  <p>Your Personal AI Interview Coach, Powered by Vapi & Google Gemini.</p>
  
  <p>
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js">
    <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase">
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
    <img src="https://img.shields.io/badge/Vapi_AI-1A1A1A?style=for-the-badge" alt="Vapi AI">
    <img src="https://img.shields.io/badge/Gemini-8E77D3?style=for-the-badge&logo=google-gemini&logoColor=white" alt="Gemini">
  </p>
</div>

<details>
  <summary><strong>Table of Contents</strong></summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#key-features">Key Features</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#architectural-highlights">Architectural Highlights</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

---

## About The Project

**Prepwise** is a revolutionary job interview preparation platform that leverages cutting-edge AI to provide a realistic and insightful practice experience. Gone are the days of practicing in front of a mirror. With Prepwise, you engage in dynamic, AI-powered voice conversations that simulate real job interviews.

The platform uses **Vapi AI** for lifelike voice interactions and **Google Gemini** to generate relevant questions and provide instant, actionable feedback on your performance. Whether you're a recent graduate or a seasoned professional, Prepwise is your personal coach to help you build confidence and ace your next interview.

---

## Key Features

-   **🤖 AI-Powered Interviews:** Engage in realistic voice interviews with an AI agent that adapts to your responses.
-   **📈 Instant, Actionable Feedback:** Receive a detailed analysis of your answers, covering clarity, relevance, and confidence.
-   **🗣️ Voice & Transcript Analysis:** Review your full interview transcript alongside AI-generated feedback to pinpoint areas for improvement.
-   **🔐 Secure Authentication:** User accounts are securely managed with Firebase email/password authentication.
-   **✨ Modern UI/UX:** A sleek, user-friendly interface built with Next.js, Tailwind CSS, and shadcn/ui for a premium experience.
-   **📊 Centralized Dashboard:** Easily create, manage, and review all your past and upcoming practice interviews from a single dashboard.
-   **📱 Fully Responsive:** Practice anytime, anywhere. Prepwise is designed to work seamlessly across all devices.

---

## Built With

Prepwise is built on a modern, powerful, and scalable technology stack:

* **Framework:** Next.js
* **Styling:** Tailwind CSS
* **UI Components:** shadcn/ui
* **Backend & Auth:** Firebase
* **AI Voice Agent:** Vapi AI
* **AI Language Model:** Google Gemini
* **Schema Validation:** Zod

---

## Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

Make sure you have the following installed on your machine:
* Git
* Node.js
* npm (Node Package Manager)

### Installation & Setup

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/saiguggilla2004/prepwise.git](https://github.com/saiguggilla2004/prepwise.git)
    cd prepwise
    ```
    *(Note: Please replace `prepwise` with the actual repository name if different.)*

2.  **Install Project Dependencies:**
    ```bash
    npm install
    ```

3.  **Set Up Environment Variables:**
    Create a new file named `.env.local` in the root of your project. Add the following environment variables and replace the placeholder values with your actual credentials.

    ```env
    # Vapi Credentials
    NEXT_PUBLIC_VAPI_WEB_TOKEN=
    NEXT_PUBLIC_VAPI_WORKFLOW_ID=

    # Google Gemini API Key
    GOOGLE_GENERATIVE_AI_API_KEY=

    # Firebase Configuration (Client-side)
    NEXT_PUBLIC_FIREBASE_API_KEY=
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
    NEXT_PUBLIC_FIREBASE_APP_ID=

    # Firebase Admin SDK (Server-side)
    FIREBASE_PROJECT_ID=
    FIREBASE_CLIENT_EMAIL=
    FIREBASE_PRIVATE_KEY=

    # Base URL
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
    ```

4.  **Running the Project:**
    ```bash
    npm run dev
    ```

    Open `http://localhost:3000` in your browser to view the project.

---

## Architectural Highlights

The project follows a modern, reusable code architecture. Here are some key areas to explore:

* **AI Prompt Engineering:**
    * **Question Generation:** See how Gemini is prompted to create interview questions in `/app/api/vapi/generate/route.tsx`.
    * **Feedback Generation:** Explore the prompt used to generate user feedback in `lib/actions/general.action.ts`.
* **UI & Styling:**
    * **Global Styles:** Check out `globals.css` for base styling.
    * **Utility Functions:** Reusable utility functions are located in `lib/utils.ts`.
* **Data Display:**
    * **Feedback Page:** The component for displaying AI feedback can be found at `app/(root)/interview/[id]/feedback/page.tsx`.

---

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## Contact

Sai Guggila - guggillaprakash161@gmail.com

Project Link: [https://github.com/saiguggilla2004/prepwise](https://github.com/saiguggilla2004/prepwise)
