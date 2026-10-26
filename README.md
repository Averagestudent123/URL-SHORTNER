# 🔗 URL Shortener & QR Code Generator

A clean, full-stack URL shortener built with **React**, **Node.js**, **Express**, and **MongoDB**. Converts long URLs into compact links with real-time QR codes and click tracking.

---

## ✨ Features

- ⚡ **Fast Shortening:** Unique 8-character short links using `nanoid`.
- 📱 **QR Code Generator:** Live preview with one-click PNG download.
- 📋 **Quick Copy:** One-click clipboard copy with visual confirmation.
- 📊 **Click Analytics:** Automatically counts visits and redirects visitors.
- 🎨 **Modern Dark UI:** Responsive design with Tailwind CSS and DaisyUI.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS, DaisyUI, Axios, `react-qr-code`
- **Backend:** Node.js, Express, MongoDB, Mongoose, `nanoid`, `cors`

---

## 🚀 Quick Start

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
```

**`backend/.env`:**
```env
PORT=3000
MONGO_URI=your_mongodb_atlas_connection_string
BASE_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

**`frontend/.env`:**
```env
VITE_BACKEND_URL=http://localhost:3000
```

Frontend runs on `http://localhost:5173` and backend on `http://localhost:3000`.

---

## 🔌 API Endpoints

- **`POST /shorten`** — Body: `{ "url": "https://example.com" }` → Returns: `{ "shortURL": "..." }`
- **`GET /:shortURL`** — Redirects to the original URL and tracks click count.
