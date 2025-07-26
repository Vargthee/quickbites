"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Users, Clock, Award, Heart, MapPin, Phone, Mail, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

const values = [
  {
    icon: Heart,
    title: "Authentic Flavors",
    description:
      "We preserve traditional Nigerian recipes passed down through generations, ensuring every dish tastes like home.",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: Clock,
    title: "Fresh & Fast",
    description: "Our ingredients are sourced fresh daily, and we guarantee delivery within 30-45 minutes across Jos.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "We're proud to serve the Jos community, supporting local suppliers and creating jobs for our neighbors.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Award,
    title: "Quality Promise",
    description: "Every meal is prepared with care by experienced chefs who understand the art of Nigerian cuisine.",
    color: "from-yellow-500 to-orange-500",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-pink-400/30 to-red-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xl rounded-full px-6 py-3 mb-8 border border-white/20 animate-fade-in">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-semibold">Our Story</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-black mb-8 leading-tight animate-slide-up">
              Bringing Authentic
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                Nigerian Flavors
              </span>
              <br />
              to Jos
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 leading-relaxed max-w-4xl mx-auto animate-fade-in-delay">
              Since 2019, Quick Bites has been Jos's premier destination for authentic Nigerian cuisine. We're more than
              just a food delivery service – we're your connection to home.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/80 backdrop-blur-xl border-y border-slate-200/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Users, label: "Happy Customers", value: "25,000+", color: "from-emerald-500 to-teal-500" },
              { icon: Star, label: "Average Rating", value: "4.9/5", color: "from-yellow-500 to-orange-500" },
              { icon: Clock, label: "Orders Delivered", value: "100K+", color: "from-blue-500 to-indigo-500" },
              { icon: Award, label: "Years of Service", value: "5+", color: "from-pink-500 to-rose-500" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center group animate-fade-in-stagger"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`bg-gradient-to-br ${stat.color} w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-500 shadow-xl group-hover:shadow-2xl`}
                >
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-slate-800 mb-2">{stat.value}</h3>
                <p className="text-slate-600 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-display font-black text-slate-800 mb-8 animate-slide-up">
              Our Journey
            </h2>
            <div className="space-y-8 text-slate-600 leading-relaxed text-lg animate-fade-in-delay">
              <p>
                Quick Bites was born from a simple desire: to bring the authentic taste of Nigerian home cooking to
                every doorstep in Jos. Our founder, Ibrahim Musa, noticed that while Jos had many restaurants, few truly
                captured the essence of traditional Nigerian flavors.
              </p>
              <p>
                Starting with just three dishes and a single delivery bike, we've grown into Jos's most trusted food
                delivery service. Our success comes from our unwavering commitment to authenticity, quality, and the
                warmth of Nigerian hospitality.
              </p>
              <p>
                Today, we serve over 25,000 satisfied customers across Jos, from Rayfield to Bukuru, bringing the taste
                of home to families, students, and professionals who crave authentic Nigerian cuisine.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-bold px-12 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110 animate-slide-up-delay"
            >
              <Link href="/">
                Order Now
                <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-slide-up">
            <h2 className="text-5xl md:text-6xl font-display font-black text-slate-800 mb-6">What We Stand For</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our values guide everything we do, from sourcing ingredients to delivering your meal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-0 shadow-xl hover:shadow-2xl transition-all duration-700 group hover:-translate-y-3 bg-white animate-fade-in-stagger"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`bg-gradient-to-br ${value.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-500 shadow-lg`}
                  >
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-display font-black text-xl text-slate-800 mb-4">{value.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20 animate-slide-up">
              <h2 className="text-5xl md:text-6xl font-display font-black text-slate-800 mb-6">Get in Touch</h2>
              <p className="text-xl text-slate-600">Have questions or feedback? We'd love to hear from you</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: MapPin,
                  title: "Location",
                  content: "123 Rayfield Road\nJos, Plateau State",
                  color: "from-emerald-500 to-teal-500",
                },
                {
                  icon: Phone,
                  title: "Phone",
                  content: "+234 803 456 7890\nAvailable 24/7",
                  color: "from-blue-500 to-indigo-500",
                },
                {
                  icon: Mail,
                  title: "Email",
                  content: "hello@quickbites.ng\nsupport@quickbites.ng",
                  color: "from-pink-500 to-rose-500",
                },
              ].map((contact, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-xl hover:shadow-2xl transition-all duration-700 text-center group hover:-translate-y-2 animate-fade-in-stagger"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-8">
                    <div
                      className={`bg-gradient-to-br ${contact.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-500 shadow-lg`}
                    >
                      <contact.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-black text-slate-800 mb-4 text-xl">{contact.title}</h3>
                    <p className="text-slate-600 whitespace-pre-line leading-relaxed">{contact.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto animate-slide-up">
            <h2 className="text-5xl md:text-7xl font-display font-black mb-8 leading-tight">
              Ready to Taste
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Authentic Nigeria?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-200 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join our family of satisfied customers and experience the best of Nigerian flavors delivered to your door.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 font-black px-16 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 group"
            >
              <Link href="/">
                Order Now
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
