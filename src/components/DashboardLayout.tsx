import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/enhanced-button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LogOut, User, Settings, Heart, Stethoscope, Shield } from 'lucide-react';
import trisvaraLogo from '@/assets/trisvara-logo.png';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  title, 
  subtitle 
}) => {
  const { user, logout } = useAuth();

  const roleIcons = {
    patient: Heart,
    doctor: Stethoscope,
    insurance: Shield
  };

  const roleColors = {
    patient: 'text-saffron',
    doctor: 'text-green-herbal', 
    insurance: 'text-teal-deep'
  };

  const RoleIcon = user ? roleIcons[user.role] : Heart;
  const roleColor = user ? roleColors[user.role] : 'text-saffron';

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gradient-subtle font-source">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 shadow-neumorphic sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img 
                  src={trisvaraLogo} 
                  alt="TRISVARA" 
                  className="w-8 h-8"
                />
                <div>
                  <h1 className="font-inter font-bold text-lg text-teal-deep">
                    TRISVARA
                  </h1>
                  <p className="text-xs text-muted-foreground leading-none">
                    Healthcare Platform
                  </p>
                </div>
              </div>
              
              {/* Role Badge */}
              <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border/30">
                <RoleIcon className={`w-4 h-4 ${roleColor}`} />
                <span className="text-sm font-medium text-foreground capitalize">
                  {user?.role} Portal
                </span>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                      <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                        {user?.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-56 bg-popover border border-border shadow-elevated" 
                  align="end"
                  forceMount
                >
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium text-sm text-foreground">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer text-destructive focus:text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-inter font-bold text-teal-deep mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-muted-foreground text-lg">
              {subtitle}
            </p>
          )}
        </div>

        {/* Page Content */}
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;