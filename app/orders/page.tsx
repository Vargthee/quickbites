"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import type { Order } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Clock, MapPin, CreditCard } from "lucide-react"

export default function OrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    if (user) {
      const storedOrders = JSON.parse(localStorage.getItem("quickbites_orders") || "[]")
      const userOrders = storedOrders.filter((order: Order) => order.userId === user.id)
      setOrders(userOrders)
    }
  }, [user])

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
      month: "short",
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

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <p className="text-gray-600 mb-4">Please log in to view your orders</p>
            <Button asChild className="bg-orange-600 hover:bg-orange-700">
              <Link href="/login?redirect=/orders">Login</Link>
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
          <h1 className="text-3xl font-bold mb-8">My Orders</h1>

          {orders.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-gray-600 mb-4">You haven't placed any orders yet</p>
                <Button asChild className="bg-orange-600 hover:bg-orange-700">
                  <Link href="/">Start Ordering</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                        <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
                      </div>
                      <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                        <Badge className={`${getStatusColor(order.status)} text-white`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                        <span className="font-semibold">{formatPrice(order.total)}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{order.orderType === "delivery" ? "Delivery" : "Pickup"}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-4 w-4 text-gray-500" />
                        <span className="text-sm capitalize">{order.paymentMethod}</span>
                      </div>
                      {order.estimatedDelivery && (
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">Est: {formatDate(order.estimatedDelivery)}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <p className="font-medium text-sm">Items:</p>
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <span>{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/orders/${order.id}`}>View Details</Link>
                      </Button>
                      {order.status === "delivered" && (
                        <Button variant="outline" size="sm">
                          Reorder
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
