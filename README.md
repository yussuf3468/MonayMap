# 💰 MoneyMap

MoneyMap is a personal finance management application that helps users **track income, expenses, goals, and transactions** with ease. Designed for simplicity and clarity, it provides insightful dashboards, charts, and statistics to help users understand their financial habits and make smarter decisions.

## 🚀 Features

* 📊 **Dashboard Overview**: Total balance, income, and expenses at a glance
* ➕ **Add Transactions**: Log incomes or expenses with category and date
* 🧾 **Recent Activity Feed**: View your most recent financial actions
* 🎯 **Financial Goals** *(optional)*: Set and monitor personal savings targets
* 📈 **Spending Overview**: Pie charts and visual breakdown by category
* 🔒 **Authentication & Security**: Token-based authentication with protected routes

## 🛠️ Tech Stack

### Frontend (Not included in this repo):

* React (Vite)
* Tailwind CSS + Lucide Icons

### Backend:

* **Node.js + Express.js** – RESTful API
* **MongoDB + Mongoose** – For storing:

  * Transactions (income/expense)
  * Categories
  * Financial goals
  * User profiles

## 🛆 API Endpoints (Summary)

* `POST /api/auth/register` – Create account
* `POST /api/auth/login` – Login and receive token
* `GET /api/expenses` – Fetch all transactions
* `POST /api/expenses` – Add new transaction
* `PUT /api/expenses/:id` – Update transaction
* `DELETE /api/expenses/:id` – Delete transaction
* (More endpoints for goals, categories, users)

## 🧪 Setup & Run Locally

### Prerequisites

* Node.js
* MongoDB (local or Atlas)

### Installation

```bash
git clone https://github.com/yourusername/moneymap.git
cd moneymap
npm install
```

### Environment Variables

Create a `.env` file and add:

```
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Start the Server

```bash
npm run dev
```

Server will run at: `http://localhost:5000`

## 🔐 Authentication

All protected routes require a Bearer token passed in headers:

```http
Authorization: Bearer your_jwt_token
```

## 🧱 Folder Structure

```
/backend
🔻️ controllers/
🔻️ models/
🔻️ routes/
🔻️ middleware/
🔻️ server.js
```

## 📌 TODO / Roadmap

* [ ] Add charts with category filters
* [ ] Budget planning module
* [ ] Currency selection and localization
* [ ] Mobile responsiveness (frontend)
* [ ] Dark mode (frontend)

## 👤 Author

**Yussuf Muse**
💼 Full-stack Developer
📍 Nairobi, Kenya
📧 [Contact me](mailto:your-email@example.com)

---

## 📃 License

This project is open-source and available under the [MIT License](LICENSE).
