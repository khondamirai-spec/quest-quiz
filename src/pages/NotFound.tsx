import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-cyan-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 p-4">
      <div className="text-center space-y-6 max-w-md w-full">
        <div className="flex justify-center">
          <AlertCircle className="w-20 h-20 sm:w-24 sm:h-24 text-orange-500 animate-pulse" />
        </div>
        <div className="space-y-2">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-zinc-800 dark:text-white">404</h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-zinc-700 dark:text-zinc-300">Oops! Page not found</p>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 px-4">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <Button 
          asChild 
          size="lg" 
          className="min-h-[44px] gap-2 text-base sm:text-lg font-bold"
        >
          <a href="/">
            <Home className="w-5 h-5" />
            Return to Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
