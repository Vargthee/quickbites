"use client"

import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleCheckout = () => {
    if (!user) {
      router.push("/login?redirect=/checkout")
      return
    }
    router.push("/checkout")
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Add some delicious items to get started!</p>
            <Button asChild className="bg-orange-600 hover:bg-orange-700">
              <Link href="/">Browse Menu</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const deliveryFee = total >= 10000 ? 0 : 1000 // Free delivery for orders above ₦10,000

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Your Cart ({items.length} items)</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 bg-transparent"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Cart
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-1">{item.description}</p>
                      <p className="font-semibold text-orange-600">{formatPrice(item.price)}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee {total >= 10000 && <span className="text-green-600">(Free!)</span>}</span>
                    <span className={total >= 10000 ? "line-through text-gray-400" : ""}>{formatPrice(1000)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-2 mt-2">
                    <span>Total</span>
                    <span>{formatPrice(total + deliveryFee)}</span>
                  </div>
                </div>

                <Button onClick={handleCheckout} className="w-full bg-orange-600 hover:bg-orange-700" size="lg">
                  Proceed to Checkout
                </Button>

                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/">Continue Shopping</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
