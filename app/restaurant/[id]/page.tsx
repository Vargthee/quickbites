"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { foodItems } from "@/lib/data"
import FoodCard from "@/components/food-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Star, Clock, MapPin, Phone, Heart, Share2, Info, Truck, CreditCard } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock restaurant data
const restaurants = {
  "quick-bites-main": {
    id: "quick-bites-main",
    name: "Quick Bites Kitchen",
    description: "Authentic Nigerian cuisine made with love and traditional recipes",
    image: "/images/restaurant-hero.png",
    rating: 4.8,
    reviewCount: 1250,
    deliveryTime: "25-35 min",
    deliveryFee: 500,
    minimumOrder: 2000,
    categories: ["Nigerian", "Fast Food", "Snacks"],
    address: "123 Rayfield Road, Jos",
    phone: "+234 803 456 7890",
    isOpen: true,
    features: ["Free delivery over ₦5,000", "Accepts cash & card", "Halal certified"],
  },
}

const menuCategories = [
  { id: "popular", name: "Popular", count: 8 },
  { id: "nigerian", name: "Nigerian Dishes", count: 6 },
  { id: "fastfood", name: "Fast Food", count: 5 },
  { id: "snacks", name: "Snacks", count: 6 },
]

export default function RestaurantPage() {
  const { id } = useParams()
  const [selectedCategory, setSelectedCategory] = useState("popular")
  const [isLiked, setIsLiked] = useState(false)

  const restaurant = restaurants[id as keyof typeof restaurants]

  if (!restaurant) {
    return <div>Restaurant not found</div>
  }

  const getFilteredItems = () => {
    if (selectedCategory === "popular") {
      return foodItems.slice(0, 8)
    }
    return foodItems.filter((item) => item.category === selectedCategory)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-16 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="font-bold text-lg text-gray-900 truncate">{restaurant.name}</h1>
          </div>
        </div>
      </div>

      {/* Restaurant Hero */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="relative">
            <Image
              src={restaurant.image || "/placeholder.svg?height=200&width=800&text=Restaurant+Image"}
              alt={restaurant.name}
              width={800}
              height={200}
              className="w-full h-48 md:h-64 object-cover rounded-xl"
            />
            <div className="absolute top-4 right-4 flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="bg-white/90 hover:bg-white text-gray-700 rounded-full w-10 h-10 p-0 shadow-lg"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="bg-white/90 hover:bg-white text-gray-700 rounded-full w-10 h-10 p-0 shadow-lg"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
                <p className="text-gray-600 mb-3">{restaurant.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{restaurant.rating}</span>
                    <span className="text-gray-500">({restaurant.reviewCount}+ reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>2.5 km away</span>
                  </div>
                </div>
              </div>
              <Badge className={`${restaurant.isOpen ? "bg-green-500" : "bg-red-500"} text-white`}>
                {restaurant.isOpen ? "Open" : "Closed"}
              </Badge>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {restaurant.categories.map((category) => (
                <Badge key={category} variant="secondary" className="bg-gray-100 text-gray-700">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Info */}
      <section className="bg-white border-t">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border border-gray-200">
              <CardContent className="p-4 flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Truck className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Delivery</p>
                  <p className="text-sm text-gray-600">
                    {formatPrice(restaurant.deliveryFee)} • {restaurant.deliveryTime}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardContent className="p-4 flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <CreditCard className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Minimum order</p>
                  <p className="text-sm text-gray-600">{formatPrice(restaurant.minimumOrder)}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardContent className="p-4 flex items-center space-x-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Info className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Info</p>
                  <p className="text-sm text-gray-600">Halal • Cash & Card</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="bg-white border-t sticky top-32 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex space-x-1 overflow-x-auto">
            {menuCategories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "default" : "ghost"}
                className={`flex-shrink-0 ${
                  selectedCategory === category.id ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {menuCategories.find((c) => c.id === selectedCategory)?.name}
            </h2>
            <p className="text-gray-600">{getFilteredItems().length} items available</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredItems().map((item) => (
              <FoodCard key={item.id} item={item} showBadge={selectedCategory === "popular" ? "popular" : undefined} />
            ))}
          </div>
        </div>
      </section>

      {/* Restaurant Info */}
      <section className="py-8 bg-white border-t">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Restaurant Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Contact & Location</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">{restaurant.address}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">{restaurant.phone}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
              <div className="space-y-2">
                {restaurant.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
