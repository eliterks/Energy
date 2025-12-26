import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Activity, 
  Sparkles, 
  FileText, 
  User, 
  LogOut,
  Menu,
  X,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigation = [
    { name: 'Dashboard', href: '/app/dashboard', icon: Home },
    { name: 'Live Monitoring', href: '/app/monitoring', icon: Activity },
    { name: 'AI Strategy Center', href: '/app/strategy', icon: Sparkles },
    { name: 'Reporting', href: '/app/reports', icon: FileText },
  ];

  const NavItem = ({ item }: { item: typeof navigation[0] }) => (
    <NavLink
      to={item.href}
      className={({ isActive }) =>
        cn(
          'flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group',
          isActive
            ? 'bg-gradient-to-r from-primary to-primary-light text-primary-foreground shadow-lg shadow-primary/25'
            : 'text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/70'
        )
      }
      onClick={() => setSidebarOpen(false)}
    >
      <item.icon className="mr-3 h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-110" />
      {item.name}
    </NavLink>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-sidebar-background to-sidebar-background/95 border-r border-sidebar-border transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 shadow-lg',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}>
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center justify-between h-20 px-6 border-b border-sidebar-border/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-md">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold text-sidebar-foreground">CampusEnergy</span>
                  <p className="text-xs text-sidebar-foreground/70 font-medium">AI Platform</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden hover:bg-sidebar-accent"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5 text-sidebar-foreground" />
              </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-8 space-y-3">
              <div className="mb-6">
                <p className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-4">Main Menu</p>
                <div className="space-y-2">
                  {navigation.map((item) => (
                    <NavItem key={item.name} item={item} />
                  ))}
                </div>
              </div>
            </nav>

            {/* User section */}
            <div className="border-t border-sidebar-border/50 p-4">
              <div className="flex items-center mb-4 p-3 rounded-lg bg-sidebar-accent/30">
                <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-semibold text-sidebar-foreground">{user?.name}</p>
                  <p className="text-xs text-sidebar-foreground/70">{user?.email}</p>
                </div>
                <Button variant="ghost" size="sm" className="p-1 hover:bg-sidebar-accent">
                  <Settings className="h-4 w-4 text-sidebar-foreground/70" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                onClick={handleLogout}
              >
                <LogOut className="mr-3 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col lg:ml-0">
          {/* Top header */}
          <header className="h-16 bg-background border-b border-border flex items-center justify-between px-4 lg:px-8 shadow-sm">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Energy Management Dashboard</h1>
                <p className="text-sm text-muted-foreground">Real-time campus energy monitoring and optimization</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>System Online</span>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-6 lg:p-8 bg-muted/20">
            <Outlet />
          </main>

          {/* Footer */}
          <footer className="bg-background border-t border-border px-6 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>© 2024 CampusEnergy AI. All rights reserved.</span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">Version 2.1.0</span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>Last updated: 2 minutes ago</span>
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></div>
                  <span>Live</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;