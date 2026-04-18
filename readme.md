# 🛒 Costco Retail API

A production-ready REST API simulating a retail e-commerce platform with product catalog and shopping cart functionality. Built with Node.js and Express, containerized with Docker, and deployed via GitHub Actions CI/CD pipeline.

---

## 🚀 Tech Stack

| Technology | Purpose |
|-----------|---------|
| Node.js | Backend runtime |
| Express | REST API framework |
| Jest & Supertest | Automated testing |
| Docker | Containerization |
| GitHub Actions | CI/CD Pipeline |
| Docker Hub | Container registry |

---

## 📋 API Endpoints

### Health Check
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/` | API health check |

### Products
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/products` | Get all products |
| GET | `/products/:id` | Get product by ID |
| GET | `/products/category/:category` | Get by category |

### Shopping Cart
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/cart` | View cart |
| POST | `/cart` | Add item to cart |
| DELETE | `/cart/:productId` | Remove item |
| DELETE | `/cart` | Clear cart |

---

## 🔧 Local Setup

### Prerequisites
- Node.js 18+
- Docker Desktop

### Run Locally
```bash
# Install dependencies
npm install

# Start the server
npm start

# Visit http://localhost:4000
```

### Run Tests
```bash
# Run tests with coverage
npm test
```

### Run with Docker
```bash
# Build image
docker build -t costco-retail-api .

# Run container
docker run -p 4000:4000 costco-retail-api
```

---

## ⚙️ CI/CD Pipeline

Every push to main triggers the GitHub Actions pipeline: