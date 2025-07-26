"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ShoppingCart, User, Menu, X, MapPin } from "lucide-react"

export default function Header() {
  const { user, logout } = useAuth()
  const { itemCount } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors duration-200">
              <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">QB</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Quick Bites</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Food Delivery • Jos</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              href="/orders"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 relative group"
            >
              Orders
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {/* Location (Desktop only) */}
            <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
              <MapPin className="h-4 w-4" />
              <span>Jos, Plateau</span>
            </div>

            {/* Cart */}
            <Link href="/cart">
              <Button
                variant="ghost"
                size="sm"
                className="relative text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-blue-600 text-white font-bold min-w-[18px] h-5 flex items-center justify-center text-xs">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
                  >
                    <User className="h-5 w-5 mr-2" />
                    <span className="hidden sm:inline font-medium">{user.name.split(" ")[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="font-medium">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders" className="font-medium">
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="font-medium text-red-600">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex space-x-2">
                <Button asChild variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                className="py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/orders"
                className="py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Orders
              </Link>
              <Link
                href="/about"
                className="py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              {!user && (
                <div className="flex flex-col space-y-2 pt-3 border-t border-gray-200">
                  <Button asChild variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 justify-start">
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                      Login
                    </Link>
                  </Button>
                  <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white justify-start">
                    <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
