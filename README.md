#  Sale Insights

A RESTful API Analyzes sales data and returns actionable insights using AI-generated human-readable summary via OpenAI's GPT API.

---

## Features

- POST endpoint to receive sales data and compute analytics
- Calculates total sales, average sale, category totals, and best-performing category
- Integrates with OpenAI API for smart summary generation
- Containerized with Docker

---

## Tech Stack

- Node.js + Express
- Axios for HTTP requests
- dotenv for environment variables
- OpenAI (GPT 3.5-turbo)
- Docker

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone gh repo clone xZeroMCPE/sales-insight.git
cd sales-insight
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

Create a `.env` file in the root of the project:

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
```

### 4. Start the server

```bash
npm start
```

Server will be running on `http://localhost:3000`.

---

## Docker Support

### 1. Build the image

```bash
docker build -t sales-insight .
```

### 2. Run the container

```bash
docker run -p 3000:3000 --env-file .env sales-insight
```

---

## API Usage

### Endpoint

`POST /sales/insights`

### Request Body

Send a JSON array of sales records like so:

```json
[
  {
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "product": "Widget A",
    "category": "Widgets",
    "amount": 120.50,
    "date": "2023-03-01",
    "state": "California"
  }
]
```

### Response Example

```json
{
  "analytics": {
    "totalSales": "120.50",
    "averageSale": "120.50",
    "totalByCategory": {
      "Widgets": 120.5
    },
    "bestCategory": "Widgets"
  },
  "summary": "The total sales amounted to $120.50 with an average transaction of $120.50. The top-performing category was Widgets."
}
```

---