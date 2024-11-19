import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/layout/PrivateRoute';
import Navigation from './components/layout/Navigation';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CarList from './components/cars/CarList';
import CarForm from './components/cars/CarForm';
import CarDetail from './components/cars/CarDetail';
import ErrorBoundary from './components/shared/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}
                <Route
                  path="/cars"
                  element={
                    <PrivateRoute>
                      <CarList />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/cars/new"
                  element={
                    <PrivateRoute>
                      <CarForm />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/cars/:id"
                  element={
                    <PrivateRoute>
                      <CarDetail />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/cars/edit/:id"
                  element={
                    <PrivateRoute>
                      <CarForm />
                    </PrivateRoute>
                  }
                />

                {/* Redirect root to cars list if authenticated, otherwise to login */}
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Navigate to="/cars" replace />
                    </PrivateRoute>
                  }
                />

                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;