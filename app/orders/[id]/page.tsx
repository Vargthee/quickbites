"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import type { Order } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { ArrowLeft, MapPin, CreditCard, Clock, Phone, User } from "lucide-react"

export default function OrderDetailsPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    if (user && id) {
      const storedOrders = JSON.parse(localStorage.getItem("quickbites_orders") || "[]")
      const foundOrder = storedOrders.find((order: Order) => order.id === id && order.userId === user.id)
      setOrder(foundOrder || null)
    }
  }, [user, id])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "confirmed":
        return "bg-blue-500"
      case "preparing":
        return "bg-orange-500"
      case "ready":
        return "bg-green-500"
      case "delivered":
        return "bg-green-600"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getOrderProgress = (status: Order["status"]) => {
    const steps = ["confirmed", "preparing", "ready", "delivered"]
    const currentIndex = steps.indexOf(status)
    return currentIndex >= 0 ? ((currentIndex + 1) / steps.length) * 100 : 0
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <p className="text-gray-600 mb-4">Please log in to view order details</p>
            <Button asChild className="bg-orange-600 hover:bg-orange-700">
              <Link href="/login">Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <p className="text-gray-600 mb-4">Order not found</p>
            <Button asChild variant="outline">
              <Link href="/orders">Back to Orders</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Button asChild variant="ghost" size="sm">
              <Link href="/orders">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Orders
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Status */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <CardTitle>Order #{order.id}</CardTitle>
                      <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
                    </div>
                    <Badge className={`${getStatusColor(order.status)} text-white mt-2 sm:mt-0`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {order.status !== "cancelled" && order.status !== "delivered" && (
                    <div className="mb-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Order Progress</span>
                        <span>{Math.round(getOrderProgress(order.status))}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getOrderProgress(order.status)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">{order.orderType === "delivery" ? "Delivery" : "Pickup"}</p>
                        {order.deliveryAddress && <p className="text-xs text-gray-600">{order.deliveryAddress}</p>}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium capitalize">{order.paymentMethod}</p>
                        <p className="text-xs text-gray-600">Payment method</p>
                      </div>
                    </div>

                    {order.estimatedDelivery && (
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">{formatDate(order.estimatedDelivery)}</p>
                          <p className="text-xs text-gray-600">Estimated delivery</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600 line-clamp-1">{item.description}</p>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                          <p className="text-sm text-gray-500">{formatPrice(item.price)} each</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary & Contact */}
            <div className="space-y-6">
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}

                  <Separator />

                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(order.total - (order.orderType === "delivery" ? 1000 : 0))}</span>
                  </div>

                  {order.orderType === "delivery" && (
                    <div className="flex justify-between text-sm">
                      <span>Delivery Fee</span>
                      <span>{formatPrice(1000)}</span>
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(order.total)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Call us</p>
                      <p className="text-sm text-gray-600">+234 803 456 7890</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Customer Support</p>
                      <p className="text-sm text-gray-600">Available 24/7 in Jos</p>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
