# 📧 Email Automation CLI — Human-in-the-Loop (HITL) Edition

A Node.js-based **Email Automation CLI** that uses the **Human-in-the-Loop (HITL)** concept to automate email handling while keeping human oversight.  
This tool enables automated email classification, drafting, and response generation — with the human able to approve, edit, or reject before sending.

---

## 🚀 Features

- 🔄 Fetch emails from Gmail (or local JSON)
- 🧠 Classify emails using LLM (refunds, promotions, announcements, etc.)
- ✍️ Auto-generate smart replies
- 👨‍💻 Human-in-the-Loop — you decide whether to send, edit, or skip
- ⚙️ Interactive CLI built with Node.js
- 🧩 Built using LangChain + OpenAI API

---

## 🛠️ Tech Stack

- **Node.js**
- **LangChain**
- **OpenAI API**
- **Zod** (for schema validation)
- **Readline** (for CLI interactions)

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/email-automation-cli.git
cd email-automation-cli

# Install dependencies
npm install

# Add environment variables
cp .env.example .env
``` 

``` bash
OPENAI_API_KEY = your_openai_api_key
EMAIL_SOURCE = ./data/emails.json
```

## 📂 Project Structure
```
email-automation-cli/
├── src/
│   ├── main.js             # Entry point
│   ├── data.js             # Email data (mock or fetched)
│   ├── agent.js            # LLM + HITL logic
│   ├── utils/
│   │   ├── classify.js     # Email classification logic
│   │   ├── generateReply.js# Generate smart replies
│   │   └── hitl.js         # Human-in-the-loop flow
├── package.json
├── .env
├── README.md
└── data/
    └── emails.json
```

# 🧱 Future Improvements

✅ Connect to Gmail API for live emails

✅ Store approval/rejection logs

✅ Add multiple LLM support

✅ Integrate with Notion or Slack notifications

# 📜 License

MIT License © 2025 — Dipanjan Roy