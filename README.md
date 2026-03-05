# Task Manager - MongoDB + React

## Setup

### Backend
```bash
npm install
npm run dev
```

### Frontend
```bash
cd client
npm install
npm start
```

### Docker
```bash
docker-compose up
```

## Environment Variables
Create `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/task_manager
JWT_SECRET=supersecretkey
```

## API Endpoints
- POST /api/users/register
- POST /api/users/login
- GET /api/tasks
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id
