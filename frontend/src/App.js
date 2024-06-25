import React from 'react';
import { Route, Routes, Navigate, BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import './styles.css';
import './index.css';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { user } = React.useContext(AuthContext);
  return user ? <Element {...rest} /> : <Navigate to="/login" />;
};

const App = () => {
  return (
    
    <AuthProvider>
      <TaskProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Signup />} />
            <Route
              path="/dashboard"
              element={<PrivateRoute element={Dashboard} />}
            />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Router>
      </TaskProvider>
    </AuthProvider>
    
  );
};

export default App;