
# GreenWorks Reclamation Process

This is a full-stack web application for managing the data of appliances recycled and shredded at GreenWorks. Includes ability to check-in appliances, check-out is in process.
---

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: MySQL
- **ORM**: Prisma
- **Architecture**: Model-View-Controlle-Service


---


## Getting Started

- Node.js installed
- MySQL running locally
- `.env` file in `/server` with:

```env
DATABASE_URL="mysql://root:<yourpassword>@localhost:3306/greenworks_app"
PORT=5000
```

---

## Setup Instructions

### 1. Backend 

```bash
cd server
npm install
npx prisma migrate dev --name init  # or reset if needed
node server.js
```

### 2. Frontend 

```bash
cd client
npm install
npm run dev
```

Access the app at: `http://localhost:5173`


---


