import { Bell, ChevronDown, User, Search, Home, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { NotificationDropdown } from "./NotificationDropdown";

interface NavbarProps {
  selectedTab?: string;
  setSelectedTab?: (tab: string) => void;
}

export const Navbar = ({ selectedTab, setSelectedTab }: NavbarProps) => {
  // Get user data from localStorage or use default
  const getUserData = () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      return JSON.parse(savedUser);
    }
    return { name: "John Doe", email: "john@example.com" };
  };

  const user = getUserData();
  const isLoggedIn = localStorage.getItem('user') !== null;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Left section - Profile and Tabs */}
        <div className="flex items-center space-x-4">
          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 hover:bg-accent">
                {isLoggedIn ? (
                  <>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
                      <AvatarFallback>
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium hidden md:block">{user.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </>
                ) : (
                  <LogIn className="w-6 h-6" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-popover border-border">
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="text-primary">Jelajahi Premium</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {!isLoggedIn && (
                <DropdownMenuItem asChild>
                  <Link to="/auth/login" className="cursor-pointer">
                    <span>Login</span>
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => {
                  localStorage.removeItem('user');
                  window.location.reload();
                }}
              >
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Tabs - Only show on mobile */}
          {setSelectedTab && (
            <div className="md:hidden flex space-x-2">
              <button
                onClick={() => setSelectedTab("all")}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedTab === "all"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setSelectedTab("music")}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedTab === "music"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                Musik
              </button>
              <button
                onClick={() => setSelectedTab("podcast")}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedTab === "podcast"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                Podcast
              </button>
            </div>
          )}
        </div>

        {/* Right section - Notifications */}
        <div className="flex items-center">
          <NotificationDropdown />
        </div>
      </div>
    </nav>
  );
};
