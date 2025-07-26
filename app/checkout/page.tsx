"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Truck, MapPin } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  const [orderType, setOrderType] = useState<"delivery" | "pickup">("delivery")
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash" | "transfer">("card")
  const [deliveryAddress, setDeliveryAddress] = useState(user?.address || "")
  const [loading, setLoading] = useState(false)

  const deliveryFee = orderType === "delivery" ? (total >= 10000 ? 0 : 1000) : 0
  const finalTotal = total + deliveryFee

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handlePlaceOrder = async () => {
    if (orderType === "delivery" && !deliveryAddress.trim()) {
      toast({
        title: "Address Required",
        description: "Please enter a delivery address.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const orderId = `QB${Date.now()}`

    // Store order in localStorage (in real app, this would be sent to backend)
    const order = {
      id: orderId,
      userId: user?.id,
      items,
      total: finalTotal,
      status: "confirmed",
      orderType,
      deliveryAddress: orderType === "delivery" ? deliveryAddress : undefined,
      paymentMethod,
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes from now
    }

    const existingOrders = JSON.parse(localStorage.getItem("quickbites_orders") || "[]")
    localStorage.setItem("quickbites_orders", JSON.stringify([order, ...existingOrders]))

    clearCart()
    setLoading(false)

    toast({
      title: "Order Placed Successfully!",
      description: `Your order #${orderId} has been confirmed.`,
    })

    router.push(`/orders/${orderId}`)
  }

  if (!user) {
    router.push("/login?redirect=/checkout")
    return null
  }

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Details */}
            <div className="space-y-6">
              {/* Order Type */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="h-5 w-5 mr-2" />
                    Order Type
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={orderType} onValueChange={(value: "delivery" | "pickup") => setOrderType(value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <Label htmlFor="delivery">Delivery (+{formatPrice(deliveryFee)})</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label htmlFor="pickup">Pickup (Free)</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Delivery Address */}
              {orderType === "delivery" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      Delivery Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="Enter your delivery address"
                        required
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={(value: "card" | "cash" | "transfer") => setPaymentMethod(value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card">Credit/Debit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="transfer" id="transfer" />
                      <Label htmlFor="transfer">Bank Transfer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash">Cash on {orderType === "delivery" ? "Delivery" : "Pickup"}</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    {orderType === "delivery" && (
                      <div className="flex justify-between">
                        <span>Delivery Fee</span>
                        <span>{formatPrice(deliveryFee)}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>{formatPrice(finalTotal)}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    size="lg"
                  >
                    {loading ? "Processing..." : `Place Order - ${formatPrice(finalTotal)}`}
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
