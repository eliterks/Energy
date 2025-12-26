import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Activity, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="text-center space-y-6">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Activity className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-foreground">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
          <p className="text-muted-foreground max-w-md">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-3">
          <Link to="/">
            <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div>
            <Link to="/app/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Go to Dashboard →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
