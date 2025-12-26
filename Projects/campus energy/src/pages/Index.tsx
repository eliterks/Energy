import { Navigate } from 'react-router-dom';

const Index = () => {
  // Redirect to the Landing page for the main application entry
  return <Navigate to="/" replace />;
};

export default Index;
