# 📱 Fraud Detection App - Frontend (Ionic/Angular)

Cross-platform frontend application built with **Ionic** and **Angular**. It provides the user interface to securely capture payment data and visualize the history of transactions evaluated by the anti-fraud system.

## 🚀 Features
- Reactive form for secure credit card data capture (includes length and format validations).
- Asynchronous communication with the Django backend using `HttpClient`.
- Modern, user-friendly, and responsive interface for both mobile and web devices.

## 🛠️ Prerequisites
- [Node.js](https://nodejs.org/) (version 18+ recommended)
- [Ionic CLI](https://ionicframework.com/docs/cli) installed globally:
  \`\`\`bash
  npm install -g @ionic/cli
  \`\`\`

## 📦 Setup and Execution

1. **Install dependencies:**
   Clone the repository and, inside the project folder, install the Node packages:
   \`\`\`bash
   npm install
   \`\`\`

2. **API Configuration:**
   By default, the app points to `http://127.0.0.1:3000/api` (or the port you are using). You can check and modify this URL in `src/app/services/api.ts`.

3. **Run in development mode:**
   Start the local server with live reload:
   \`\`\`bash
   ionic serve
   \`\`\`
   The project will automatically open in your default web browser (usually at `http://localhost:8100`).

4. **Build for production (Optional):**
   \`\`\`bash
   ionic build --prod
   \`\`\`