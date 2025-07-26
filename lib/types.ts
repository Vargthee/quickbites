export interface User {
  id: string
  name: string
  email: string
  phone: string
  address?: string
}

export interface FoodItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: "nigerian" | "fastfood" | "snacks"
  available: boolean
  preparationTime: number // in minutes
}

export interface CartItem extends FoodItem {
  quantity: number
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: "pending" | "confirmed" | "preparing" | "ready" | "delivered" | "cancelled"
  orderType: "delivery" | "pickup"
  deliveryAddress?: string
  paymentMethod: "card" | "cash" | "transfer"
  createdAt: string
  estimatedDelivery?: string
}

export interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: Omit<User, "id"> & { password: string }) => Promise<boolean>
  logout: () => void
  loading: boolean
}
