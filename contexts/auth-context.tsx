"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User, AuthContextType } from "@/lib/types"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem("quickbites_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication - in real app, this would be an API call
    if (email === "user@example.com" && password === "password") {
      const userData: User = {
        id: "1",
        name: "John Doe",
        email: email,
        phone: "+234 803 456 7890",
        address: "123 Rayfield Road, Jos, Plateau State",
      }
      setUser(userData)
      localStorage.setItem("quickbites_user", JSON.stringify(userData))
      setLoading(false)
      return true
    }
    setLoading(false)
    return false
  }

  const register = async (userData: Omit<User, "id"> & { password: string }): Promise<boolean> => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
    }

    setUser(newUser)
    localStorage.setItem("quickbites_user", JSON.stringify(newUser))
    setLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("quickbites_user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
