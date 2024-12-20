import { BrowserRouter as Router, Routes, Route } from 'react-router'
import { AuthProvider } from './context/AuthContext'
import Header from './components/header/Header'
import Login from './components/header/login/Login'
import Register from './components/header/register/Register'
import TodosPage from './components/main/TodosPage'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="*" element={<div>404 - Page Not Found</div>} />
          <Route path="/" element={<TodosPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
