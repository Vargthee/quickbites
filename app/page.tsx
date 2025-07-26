"use client"

import { useState, useMemo } from "react"
import { foodItems } from "@/lib/data"
import FoodCard from "@/components/food-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, MapPin, Clock, Star, Filter, Zap, Percent, ChevronRight, TrendingUp, Heart, Gift } from "lucide-react"
import { useRouter } from "next/navigation"

const categories = [
  { id: "all", name: "All", icon: "🍽️", color: "from-blue-500 to-blue-600" },
  { id: "nigerian", name: "Nigerian", icon: "🇳🇬", color: "from-green-500 to-green-600" },
  { id: "fastfood", name: "Fast Food", icon: "🍔", color: "from-red-500 to-red-600" },
  { id: "snacks", name: "Snacks", icon: "🥨", color: "from-yellow-500 to-yellow-600" },
]

const promotions = [
  {
    id: 1,
    title: "Free Delivery",
    subtitle: "On orders above ₦5,000",
    code: "FREEDEL",
    color: "from-green-500 to-emerald-500",
    icon: "🚚",
  },
  {
    id: 2,
    title: "20% Off",
    subtitle: "Nigerian dishes only",
    code: "NAIJA20",
    color: "from-orange-500 to-red-500",
    icon: "🇳🇬",
  },
  {
    id: 3,
    title: "Buy 2 Get 1",
    subtitle: "On selected snacks",
    code: "SNACK3",
    color: "from-purple-500 to-pink-500",
    icon: "🥨",
  },
]

const quickFilters = [
  { id: "popular", name: "Popular", icon: TrendingUp },
  { id: "fast", name: "Under 20min", icon: Zap },
  { id: "deals", name: "Deals", icon: Percent },
  { id: "favorites", name: "Favorites", icon: Heart },
]

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const router = useRouter()

  const filteredItems = useMemo(() => {
    let items = foodItems

    if (selectedCategory !== "all") {
      items = items.filter((item) => item.category === selectedCategory)
    }

    if (selectedFilter === "fast") {
      items = items.filter((item) => item.preparationTime <= 20)
    }

    if (selectedFilter === "popular") {
      items = items.slice(0, 8) // Show first 8 as popular
    }

    if (searchQuery) {
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    return items
  }, [selectedCategory, searchQuery, selectedFilter])

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const menuSection = document.getElementById("menu-section")
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Location Header */}
      <section className="bg-white shadow-sm border-b sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Delivering to</p>
                <p className="font-semibold text-gray-900">Jos, Plateau State</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>25-35 min</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-white py-6">
        <div className="container mx-auto px-4">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for dishes, restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="pl-12 pr-16 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0"
            />
            <Button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 rounded-lg px-6"
            >
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Promotions Banner */}
      <section className="py-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Special Offers</h2>
            <Button variant="ghost" size="sm" className="text-blue-600">
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {promotions.map((promo) => (
              <Card
                key={promo.id}
                className="border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <CardContent className="p-4">
                  <div className={`bg-gradient-to-r ${promo.color} rounded-lg p-4 text-white`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{promo.icon}</span>
                      <Badge variant="secondary" className="bg-white/20 text-white border-0">
                        {promo.code}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-lg mb-1">{promo.title}</h3>
                    <p className="text-sm opacity-90">{promo.subtitle}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 bg-white border-t">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`${
                  selectedCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white border-0 shadow-lg`
                    : "border-2 border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
                } p-6 h-auto flex-col space-y-2 rounded-xl transition-all duration-300 hover:scale-105`}
              >
                <span className="text-3xl">{category.icon}</span>
                <span className="font-semibold">{category.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Filters */}
      <section className="py-4 bg-gray-50 border-t">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-3 overflow-x-auto pb-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex-shrink-0 border-gray-300"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            {quickFilters.map((filter) => (
              <Button
                key={filter.id}
                onClick={() => setSelectedFilter(selectedFilter === filter.id ? "" : filter.id)}
                variant={selectedFilter === filter.id ? "default" : "outline"}
                size="sm"
                className={`flex-shrink-0 ${
                  selectedFilter === filter.id ? "bg-blue-600 text-white" : "border-gray-300 bg-white hover:bg-gray-50"
                }`}
              >
                <filter.icon className="h-4 w-4 mr-2" />
                {filter.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Food Items */}
      <section id="menu-section" className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-4">No dishes found</h3>
              <p className="text-gray-500">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedCategory === "all"
                      ? "All Restaurants"
                      : categories.find((c) => c.id === selectedCategory)?.name}
                  </h2>
                  <p className="text-gray-600">
                    {filteredItems.length} option{filteredItems.length !== 1 ? "s" : ""} available
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span>4.8+ rated</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
                  <FoodCard key={item.id} item={item} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Popular Near You */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Popular in Jos</h2>
            <Button variant="ghost" className="text-blue-600">
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {foodItems.slice(0, 4).map((item) => (
              <FoodCard key={item.id} item={item} showBadge="popular" />
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How Quick Bites Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Choose your food",
                description: "Browse through our selection of authentic Nigerian dishes",
                icon: "🍽️",
                color: "from-blue-500 to-blue-600",
              },
              {
                step: "2",
                title: "Quick delivery",
                description: "We prepare and deliver your order in 25-35 minutes",
                icon: "🚚",
                color: "from-green-500 to-green-600",
              },
              {
                step: "3",
                title: "Enjoy your meal",
                description: "Sit back and enjoy authentic Nigerian flavors at home",
                icon: "😋",
                color: "from-orange-500 to-red-500",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div
                  className={`bg-gradient-to-r ${step.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                >
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download App CTA */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <Gift className="h-16 w-16 mx-auto mb-4 opacity-80" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get the Quick Bites App</h2>
            <p className="text-xl mb-8 opacity-90">
              Download our app for faster ordering, exclusive deals, and real-time tracking
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-xl">
                📱 Download App
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold px-8 py-4 rounded-xl bg-transparent"
              >
                🌐 Continue on Web
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
