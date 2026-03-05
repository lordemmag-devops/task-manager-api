import React, { useContext } from 'react';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import TaskList from './components/TaskList';

const AppContent = () => {
  const { token } = useContext(AuthContext);
  return token ? <TaskList /> : <Login />;
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
