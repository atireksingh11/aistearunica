"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  phone?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<void>
  signUp: (userData: Omit<User, "id"> & { password: string }) => Promise<void>
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const checkSession = async () => {
      try {
        const savedUser = localStorage.getItem("aistear_user")
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (error) {
        console.error("Error checking session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  const signIn = async (email: string, password: string, rememberMe = false) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const mockUser: User = {
        id: "1",
        email,
        firstName: "Jane",
        lastName: "Doe",
        avatar: "/placeholder.svg",
      }

      setUser(mockUser)

      if (rememberMe) {
        localStorage.setItem("aistear_user", JSON.stringify(mockUser))
      } else {
        sessionStorage.setItem("aistear_user", JSON.stringify(mockUser))
      }
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (userData: Omit<User, "id"> & { password: string }) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockUser: User = {
        id: "1",
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
      }

      setUser(mockUser)
      localStorage.setItem("aistear_user", JSON.stringify(mockUser))
    } finally {
      setIsLoading(false)
    }
  }

  const signInWithGoogle = async () => {
    setIsLoading(true)
    try {
      // Simulate Google OAuth
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockUser: User = {
        id: "1",
        email: "user@gmail.com",
        firstName: "Google",
        lastName: "User",
        avatar: "/placeholder.svg",
      }

      setUser(mockUser)
      localStorage.setItem("aistear_user", JSON.stringify(mockUser))
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    setUser(null)
    localStorage.removeItem("aistear_user")
    sessionStorage.removeItem("aistear_user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
