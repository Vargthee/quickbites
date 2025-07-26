"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Phone, MapPin, Edit2, Save, X } from "lucide-react"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSave = () => {
    // In a real app, this would update the user data on the server
    const updatedUser = { ...user!, ...formData }
    localStorage.setItem("quickbites_user", JSON.stringify(updatedUser))

    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    })

    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
    })
    setIsEditing(false)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <p className="text-gray-600 mb-4">Please log in to view your profile</p>
            <Button asChild className="bg-orange-600 hover:bg-orange-700">
              <Link href="/login?redirect=/profile">Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Profile</h1>

          <div className="space-y-6">
            {/* Profile Information */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Personal Information</CardTitle>
                {!isEditing ? (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={handleCancel}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSave} className="bg-orange-600 hover:bg-orange-700">
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                    ) : (
                      <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        <User className="h-4 w-4 text-gray-500" />
                        <span>{user.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    {isEditing ? (
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
                    ) : (
                      <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{user.email}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    {isEditing ? (
                      <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                    ) : (
                      <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{user.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    {isEditing ? (
                      <Input id="address" name="address" value={formData.address} onChange={handleChange} />
                    ) : (
                      <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{user.address || "No address provided"}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                  <Link href="/orders">
                    <User className="h-4 w-4 mr-2" />
                    View Order History
                  </Link>
                </Button>

                <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                  <Link href="/">
                    <User className="h-4 w-4 mr-2" />
                    Browse Menu
                  </Link>
                </Button>

                <Separator />

                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent"
                  onClick={logout}
                >
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
