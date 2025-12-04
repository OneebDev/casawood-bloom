import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { categories } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const { user, logout } = useAuth();
  const cartCount = getCartCount();
  const wishlistCount = getWishlistCount();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchOpen(false);
      setIsMenuOpen(false);
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products", hasDropdown: true },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur-md border-b border-border">
      {/* Top Bar */}
      <div className="bg-casawood-green text-accent-foreground">
        <div className="container mx-auto px-4 py-2 text-center text-sm">
          <span>Free delivery on orders over Rs. 50,000 | 30-Day Returns</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center">
              <span className="text-2xl lg:text-3xl font-display font-bold text-casawood-charcoal">
                Casa
              </span>
              <span className="text-2xl lg:text-3xl font-display font-bold text-casawood-green">
                Wood
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() =>
                  link.hasDropdown && setIsCategoryOpen(true)
                }
                onMouseLeave={() =>
                  link.hasDropdown && setIsCategoryOpen(false)
                }
              >
                <Link
                  to={link.path}
                  className={cn(
                    "flex items-center gap-1 py-2 font-medium transition-colors",
                    isActive(link.path)
                      ? "text-casawood-green"
                      : "text-foreground hover:text-casawood-green"
                  )}
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown size={16} />}
                </Link>

                {/* Category Dropdown */}
                {link.hasDropdown && (
                  <AnimatePresence>
                    {isCategoryOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 top-full pt-2 w-64"
                      >
                        <div className="bg-card rounded-lg shadow-casawood-lg border border-border p-4">
                          <div className="grid gap-2">
                            {categories.map((category) => (
                              <Link
                                key={category.id}
                                to={`/products?category=${category.id}`}
                                className="flex items-center gap-3 p-2 rounded-md hover:bg-secondary transition-colors"
                              >
                                <img
                                  src={category.image}
                                  alt={category.name}
                                  className="w-10 h-10 rounded object-cover"
                                />
                                <span className="font-medium">
                                  {category.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "200px", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <Input
                      placeholder="Search furniture..."
                      className="h-9"
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleSearchKeyDown}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <Button
                variant="ghost"
                size="icon"
                type={isSearchOpen && searchQuery.trim() ? "submit" : "button"}
                onClick={() => {
                  if (!isSearchOpen) {
                    setIsSearchOpen(true);
                  } else if (!searchQuery.trim()) {
                    setIsSearchOpen(false);
                  }
                }}
                aria-label="Search"
              >
                <Search size={20} />
              </Button>
            </form>

            {/* Search - Mobile (navigates to search page) */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => navigate("/search")}
              aria-label="Search"
            >
              <Search size={20} />
            </Button>

            {/* Wishlist */}
            <Link to="/wishlist">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label="Wishlist"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Account */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative hidden sm:flex"
                    aria-label="Account"
                  >
                    {user.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt={user.displayName || "User"} 
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
                        {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium truncate">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/wishlist" className="cursor-pointer">
                      <Heart className="mr-2 h-4 w-4" />
                      Wishlist
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/track-order" className="cursor-pointer">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Track Order
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login" className="hidden sm:block">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Account"
                >
                  <User size={20} />
                </Button>
              </Link>
            )}

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative" aria-label="Cart">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-border overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4">
              <div className="flex flex-col gap-2">
                {/* User Info - Mobile */}
                {user && (
                  <div className="flex items-center gap-3 p-3 rounded-md bg-secondary mb-2">
                    {user.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt={user.displayName || "User"} 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-semibold">
                        {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{user.displayName || "User"}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </div>
                )}

                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "py-3 px-4 rounded-md font-medium transition-colors",
                      isActive(link.path)
                        ? "bg-secondary text-casawood-green"
                        : "hover:bg-muted"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Login/Logout - Mobile */}
                {user ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="py-3 px-4 rounded-md font-medium transition-colors hover:bg-muted text-left flex items-center gap-2 text-destructive"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="py-3 px-4 rounded-md font-medium transition-colors hover:bg-muted flex items-center gap-2"
                  >
                    <User size={18} />
                    Login / Sign Up
                  </Link>
                )}

                {/* Mobile Categories */}
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm font-medium text-muted-foreground mb-3">
                    Categories
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        to={`/products?category=${category.id}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="p-3 rounded-md bg-muted hover:bg-secondary transition-colors text-sm font-medium"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Mobile Search */}
                <div className="mt-4 pt-4 border-t border-border">
                  <form onSubmit={handleSearch}>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Search furniture..."
                        className="flex-1"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Button type="submit" size="icon">
                        <Search size={18} />
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
