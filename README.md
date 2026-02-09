# 🤖 Ask Jiji — AI Resource Assistant

Ask Jiji is an AI-powered assistant that helps users discover learning resources like presentations, videos, and documents related to AI and technical topics.

The system allows users to search topics and instantly get relevant resources stored in a database.

---

## 🚀 Features

- 🔍 Search learning resources by topic
- 📚 Returns presentations, videos, and documents
- ⚡ Fast backend search using Supabase database
- 🎨 Modern chat-style UI
- 🔗 Direct resource opening (PDF, video, etc.)
- 📦 Full-stack implementation (Frontend + Backend)

---

## 🏗 Tech Stack

### Frontend
- React.js
- CSS
- Fetch API

### Backend
- Node.js
- Express.js
- Supabase client

### Database
- Supabase PostgreSQL

---

## 📁 Project Structure

Learn-With-Jiji
│
├── jiji frontend → React frontend app
├── jiji backend → Node.js backend server
└── README.md


---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/<your-username>/Learn-With-Jiji.git
cd Learn-With-Jiji

2️⃣ Backend Setup
cd "jiji backend"
npm install
node server.js

3️⃣ Frontend Setup
cd "jiji frontend"
npm install
npm run dev

App runs at : http://localhost:5173

🔐 Environment Variables
Backend requires a .env file:
SUPABASE_URL=your_url
SUPABASE_KEY=your_key
PORT=3000

📌 Current Functionality

Ask Jiji currently:
=>Accepts topic queries
=>Searches database resources
=>Returns matching learning materials
Example queries:
--> RAG
--> AI
--> Machine Learning

🚀 Future Improvements

Planned upgrades:
->AI-generated answers
->Chat-style conversation
->Topic suggestions
->Resource ranking
->User search history
->Authentication system

👨‍💻 Author
Satyam Shinde
Computer Science Engineer — AI & Analytics
