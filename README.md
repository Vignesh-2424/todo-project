# Full-Stack Todo List Application

A beautiful and efficient todo list application built with React frontend and Express.js backend, connected to MongoDB.

## Features

### Frontend
- 🎨 **Beautiful UI** - Modern design with glass-morphism effects and smooth animations
- 📱 **Responsive Design** - Works perfectly on all devices
- 🔍 **Advanced Filtering** - Filter by status, priority, and sort options
- 📊 **Statistics Dashboard** - Visual progress tracking and completion rates
- ⚡ **Real-time Updates** - Instant feedback for all operations
- 🎯 **Priority Management** - Color-coded priority levels
- 📅 **Due Date Tracking** - Never miss a deadline with overdue indicators

### Backend
- 🚀 **RESTful API** - Complete CRUD operations
- 🔒 **Data Validation** - Comprehensive input validation and error handling
- 📈 **Statistics Endpoint** - Real-time todo statistics
- 🗄️ **MongoDB Integration** - Robust data persistence
- 🔄 **Advanced Filtering** - Server-side filtering and sorting
- 📝 **Comprehensive Logging** - Detailed error tracking

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Hot Toast** for notifications
- **Axios** for API communication

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **Express Validator** for input validation
- **CORS** for cross-origin requests
- **dotenv** for environment management

## Project Structure

```
fullstack-todo-app/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── services/        # API service layer
│   │   ├── App.tsx          # Main application component
│   │   └── main.tsx         # Application entry point
│   ├── public/              # Static assets
│   └── package.json         # Frontend dependencies
├── backend/                 # Express.js backend API
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API route handlers
│   ├── server.js            # Server entry point
│   └── package.json         # Backend dependencies
└── README.md               # Project documentation
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (connection string provided)
- npm or yarn package manager

### Quick Start

1. **Clone and install dependencies:**
   ```bash
   npm install
   npm run install-all
   ```

2. **Environment Setup:**
   The MongoDB connection is pre-configured in `backend/.env`

3. **Start the application:**
   ```bash
   npm run dev
   ```

   This will start both frontend (http://localhost:3000) and backend (http://localhost:5000) concurrently.

### Individual Setup

#### Backend Setup
```bash
cd backend
npm install
npm run dev
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

### Todos
- `GET /api/todos` - Get all todos (with filtering)
- `GET /api/todos/:id` - Get specific todo
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `PATCH /api/todos/:id/toggle` - Toggle completion status
- `DELETE /api/todos/:id` - Delete todo

### Statistics
- `GET /api/todos/stats/summary` - Get todo statistics

### Query Parameters
- `status` - Filter by completion status (completed/pending)
- `priority` - Filter by priority level (low/medium/high)
- `sortBy` - Sort field (createdAt/title/dueDate/priority)
- `order` - Sort direction (asc/desc)

## Data Model

### Todo Schema
```javascript
{
  title: String (required, max 100 chars),
  description: String (optional, max 500 chars),
  completed: Boolean (default: false),
  priority: String (low/medium/high, default: medium),
  dueDate: Date (optional),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-updated)
}
```

## Development

### Available Scripts
- `npm run dev` - Start both frontend and backend
- `npm run server` - Start backend only
- `npm run client` - Start frontend only
- `npm run install-all` - Install all dependencies

### Database Connection
The application connects to MongoDB Atlas using the provided connection string. The database name is `todolist`.

## Features in Detail

### Frontend Components
- **TodoList** - Main list view with completion tracking
- **TodoForm** - Modal form for creating/editing todos
- **StatsCard** - Statistics dashboard with progress visualization
- **FilterBar** - Advanced filtering and sorting controls

### Backend Features
- **Validation** - Comprehensive input validation using express-validator
- **Error Handling** - Proper error responses and logging
- **Filtering** - Server-side filtering by status and priority
- **Sorting** - Multiple sort options with ascending/descending order
- **Statistics** - Real-time calculation of todo metrics

## Production Deployment

### Frontend
The frontend can be deployed to any static hosting service:
```bash
cd frontend
npm run build
```

### Backend
The backend can be deployed to services like Heroku, Railway, or Vercel:
- Ensure environment variables are set
- MongoDB connection string is configured
- CORS is properly configured for your domain

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.