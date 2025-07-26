"use client"

import Image from "next/image"
import type { FoodItem } from "@/lib/types"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Plus, Star, Heart, Zap } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useState } from "react"

interface FoodCardProps {
  item: FoodItem
  showBadge?: "popular" | "fast" | "deal"
}

export default function FoodCard({ item, showBadge }: FoodCardProps) {
  const { addItem } = useCart()
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
    addItem(item)
    toast({
      title: "Added to cart! 🎉",
      description: `${item.name} has been added to your cart.`,
    })
    setIsLoading(false)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getBadgeContent = () => {
    switch (showBadge) {
      case "popular":
        return { text: "Popular", color: "bg-orange-500", icon: "🔥" }
      case "fast":
        return { text: "Fast", color: "bg-green-500", icon: "⚡" }
      case "deal":
        return { text: "Deal", color: "bg-red-500", icon: "%" }
      default:
        return null
    }
  }

  const badge = getBadgeContent()

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 border border-gray-200 hover:border-blue-200 bg-white cursor-pointer">
      <div className="relative overflow-hidden">
        <Image
          src={item.image || "/placeholder.svg?height=200&width=300&text=Delicious+Food"}
          alt={item.name}
          width={300}
          height={200}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {badge && (
            <Badge className={`${badge.color} text-white border-0 px-2 py-1 text-xs font-bold shadow-lg`}>
              <span className="mr-1">{badge.icon}</span>
              {badge.text}
            </Badge>
          )}
          {item.preparationTime <= 20 && !badge && (
            <Badge className="bg-green-500 text-white border-0 px-2 py-1 text-xs font-bold shadow-lg">
              <Zap className="h-3 w-3 mr-1" />
              Fast
            </Badge>
          )}
        </div>

        {/* Like Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-700 rounded-full w-9 h-9 p-0 shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
          onClick={(e) => {
            e.stopPropagation()
            setIsLiked(!isLiked)
          }}
        >
          <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""} transition-colors duration-200`} />
        </Button>

        {/* Delivery Time */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center space-x-1 shadow-lg">
          <Clock className="h-3 w-3 text-gray-600" />
          <span className="text-xs font-semibold text-gray-800">{item.preparationTime} min</span>
        </div>

        {!item.available && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
            <Badge variant="destructive" className="text-sm px-4 py-2 font-bold">
              Currently Unavailable
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="mb-3">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-lg text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
              {item.name}
            </h3>
            <div className="flex items-center space-x-1 ml-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-gray-700">4.8</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed mb-3">{item.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-900">{formatPrice(item.price)}</span>
            <span className="text-xs text-gray-500">+ delivery fee</span>
          </div>
          <Button
            onClick={(e) => {
              e.stopPropagation()
              handleAddToCart()
            }}
            disabled={!item.available || isLoading}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-1"></div>
                <span className="text-xs">Adding...</span>
              </div>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-1" />
                Add
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
