# Number Classification API

## 📌 Project Overview
The **Number Classification API** is a RESTful service that accepts a number and returns interesting mathematical properties about it, along with a fun fact from the Numbers API.

## 🚀 Features
- Check if a number is **prime**.
- Check if a number is **perfect**.
- Check if a number is an **Armstrong number**.
- Determine if a number is **even or odd**.
- Calculate the **sum of its digits**.
- Fetch a **fun fact** about the number.
- Returns structured JSON responses.
- Handles **error validation** and incorrect input.
- Fully deployed on **Render**.

## 🛠️ Tech Stack
- **Node.js** (Express.js)
- **TypeScript**
- **Prisma ORM**
- **Axios** (for external API requests)
- **Helmet & CORS** (for security)
- **Render** (for deployment)

---

## 📂 Folder Structure
```
number-classification-api/
│── src/
│   ├── config/
│   │   ├── db.config.ts       # Prisma database connection
│   ├── constants/
│   │   ├── env.ts             # Environment variables
│   │   ├── routes.ts          # API route constants
│   ├── core/
│   │   ├── number/
│   │   │   ├── number.controller.ts   # Number classification logic
│   │   │   ├── number.routes.ts       # API routes
│   ├── utils/
│   │   ├── logger.utils.ts     # Logger utility
│── index.ts                    # Main Express server file
│── tsconfig.json                # TypeScript configuration
│── package.json                 # Project dependencies & scripts
│── .env                         # Environment variables
```

---

## 🏃‍♂️ Getting Started
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/number-classification-api.git
cd number-classification-api
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file and add:
```env
PORT=5001
DATABASE_URL=your_database_url
```

### 4️⃣ Start the Server (Development Mode)
```sh
npm run dev
```

### 5️⃣ Test the API Locally
Open your browser or use `curl`:
```sh
curl http://localhost:5001/api/classify-number?number=371
```

Expected Response:
```json
{
  "number": 371,
  "is_prime": false,
  "is_perfect": false,
  "properties": ["armstrong", "odd"],
  "digit_sum": 11,
  "fun_fact": "371 is a narcissistic number."
}
```

---

## 🛠️ API Endpoints
### **GET /api/classify-number**
#### Request:
```sh
GET /api/classify-number?number=28
```

#### Success Response (200 OK):
```json
{
  "number": 28,
  "is_prime": false,
  "is_perfect": true,
  "properties": ["even"],
  "digit_sum": 10,
  "fun_fact": "28 is the 2^{nd} perfect number."
}
```

#### Error Response (400 Bad Request):
```json
{
  "number": "abc",
  "error": true
}
```
