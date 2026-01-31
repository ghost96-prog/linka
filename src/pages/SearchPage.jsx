// src/pages/SearchPage.jsx
import { useState, useEffect } from 'react'
import { Filter, Star, MapPin, Clock, ChevronDown } from 'lucide-react'
import ServiceCard from '../components/features/ServiceCard'

export default function SearchPage() {
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 500])
  const [ratingFilter, setRatingFilter] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('distance')
  const [filteredServices, setFilteredServices] = useState([])

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'beauty', name: 'Beauty & Spa' },
    { id: 'home', name: 'Home Services' },
    { id: 'fitness', name: 'Fitness' },
    { id: 'tutoring', name: 'Tutoring' },
    { id: 'tech', name: 'Tech Support' },
    { id: 'events', name: 'Events' },
  ]

  const mockServices = [
    {
      id: 1,
      title: 'Professional Hair Styling',
      provider: 'Alex Beauty Studio',
      rating: 4.9,
      reviews: 127,
      price: 65,
      duration: '2 hours',
      distance: '1.2km',
      category: 'beauty',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
      featured: true
    },
    {
      id: 2,
      title: 'Deep Home Cleaning',
      provider: 'Sparkle Cleaners',
      rating: 4.7,
      reviews: 89,
      price: 120,
      duration: '3 hours',
      distance: '2.5km',
      category: 'home',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Personal Training Session',
      provider: 'FitPro Training',
      rating: 4.8,
      reviews: 203,
      price: 45,
      duration: '1 hour',
      distance: '0.8km',
      category: 'fitness',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w-400&h=300&fit=crop'
    },
    {
      id: 4,
      title: 'Math Tutoring',
      provider: 'EduMentor',
      rating: 4.6,
      reviews: 156,
      price: 30,
      duration: '1.5 hours',
      distance: '3.1km',
      category: 'tutoring',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w-400&h=300&fit=crop'
    },
    {
      id: 5,
      title: 'Basic Haircut',
      provider: 'Quick Cuts',
      rating: 4.3,
      reviews: 78,
      price: 25,
      duration: '30 minutes',
      distance: '0.5km',
      category: 'beauty',
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop'
    },
    {
      id: 6,
      title: 'Event Photography',
      provider: 'Capture Moments',
      rating: 4.9,
      reviews: 210,
      price: 200,
      duration: '4 hours',
      distance: '4.2km',
      category: 'events',
      image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&h=300&fit=crop'
    }
  ]

  // Filter and sort services
  useEffect(() => {
    let results = [...mockServices]

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      results = results.filter(service => 
        service.title.toLowerCase().includes(query) ||
        service.provider.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query)
      )
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      results = results.filter(service => service.category === selectedCategory)
    }

    // Apply price filter
    results = results.filter(service => 
      service.price >= priceRange[0] && service.price <= priceRange[1]
    )

    // Apply rating filter
    if (ratingFilter > 0) {
      results = results.filter(service => service.rating >= ratingFilter)
    }

    // Apply sorting
    results.sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          // Extract numeric distance (remove 'km')
          const distA = parseFloat(a.distance)
          const distB = parseFloat(b.distance)
          return distA - distB
        
        case 'rating':
          return b.rating - a.rating
        
        case 'price_low':
          return a.price - b.price
        
        case 'price_high':
          return b.price - a.price
        
        default:
          return 0
      }
    })

    setFilteredServices(results)
  }, [searchQuery, selectedCategory, priceRange, ratingFilter, sortBy])

  // Handle search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  // Handle price range change
  const handlePriceRangeChange = (e) => {
    const newValue = parseInt(e.target.value)
    setPriceRange([0, newValue]) // Assuming min is always 0 for simplicity
  }

  // Handle sort change
  const handleSortChange = (e) => {
    const value = e.target.value
    const sortMap = {
      'Distance': 'distance',
      'Rating': 'rating',
      'Price: Low to High': 'price_low',
      'Price: High to Low': 'price_high'
    }
    setSortBy(sortMap[value] || 'distance')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Services Near You</h1>
        <p className="text-neutral-600">Discover and contact trusted local professionals</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </h2>
              <button 
                onClick={() => setShowFilters(false)}
                className="lg:hidden"
              >
                ✕
              </button>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="font-semibold mb-4 text-neutral-700">Category</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${selectedCategory === category.id ? 'bg-primary-50 text-primary-600 border border-primary-200' : 'hover:bg-neutral-50'}`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-8">
              <h3 className="font-semibold mb-4 text-neutral-700">Price Range</h3>
              <div className="px-2">
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[1]}
                  onChange={handlePriceRangeChange}
                  className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-neutral-600">${priceRange[0]}</span>
                  <span className="text-sm text-neutral-600">${priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="mb-8">
              <h3 className="font-semibold mb-4 text-neutral-700">Minimum Rating</h3>
              <div className="space-y-2">
                {[4.5, 4.0, 3.5, 3.0].map(rating => (
                  <button
                    key={rating}
                    onClick={() => setRatingFilter(ratingFilter === rating ? 0 : rating)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${ratingFilter === rating ? 'bg-primary-50 text-primary-600 border border-primary-200' : 'hover:bg-neutral-50'}`}
                  >
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-2" />
                      <span>{rating}+</span>
                    </div>
                    {ratingFilter === rating && <ChevronDown className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button 
                onClick={() => {
                  setSelectedCategory('all')
                  setPriceRange([0, 500])
                  setRatingFilter(0)
                  setSearchQuery('')
                }}
                className="w-full btn-secondary"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search Bar and Toggle */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for specific services..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-neutral-300 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all"
                />
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              </div>
            </div>
            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden ml-4 p-3 bg-white border border-neutral-300 rounded-xl"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {/* Results Info */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-neutral-600">
              Showing <span className="font-semibold text-neutral-900">{filteredServices.length}</span> services near you
              {searchQuery && ` for "${searchQuery}"`}
              {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-neutral-600">Sort by:</span>
              <select 
                className="bg-transparent font-medium focus:outline-none"
                onChange={handleSortChange}
                value={Object.entries({
                  'Distance': 'distance',
                  'Rating': 'rating',
                  'Price: Low to High': 'price_low',
                  'Price: High to Low': 'price_high'
                }).find(([_, value]) => value === sortBy)?.[0] || 'Distance'}
              >
                <option>Distance</option>
                <option>Rating</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {/* Active Filters Summary */}
          {(selectedCategory !== 'all' || ratingFilter > 0 || priceRange[1] < 500 || searchQuery) && (
            <div className="mt-6 p-4 bg-primary-50 rounded-xl border border-primary-200">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-primary-700">Active filters:</span>
                
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
                    {categories.find(c => c.id === selectedCategory)?.name}
                    <button 
                      onClick={() => setSelectedCategory('all')}
                      className="text-primary-600 hover:text-primary-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                
                {ratingFilter > 0 && (
                  <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                    Rating: {ratingFilter}+
                    <button 
                      onClick={() => setRatingFilter(0)}
                      className="text-yellow-600 hover:text-yellow-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                
                {priceRange[1] < 500 && (
                  <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Price: up to ${priceRange[1]}
                    <button 
                      onClick={() => setPriceRange([0, 500])}
                      className="text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Search: "{searchQuery}"
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                
                <button 
                  onClick={() => {
                    setSelectedCategory('all')
                    setPriceRange([0, 500])
                    setRatingFilter(0)
                    setSearchQuery('')
                  }}
                  className="ml-auto text-sm text-primary-600 font-medium hover:text-primary-700"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredServices.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Filter className="w-12 h-12 text-neutral-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">No services found</h3>
              <p className="text-neutral-600 mb-6">Try adjusting your filters or search terms</p>
              <button 
                onClick={() => {
                  setSelectedCategory('all')
                  setPriceRange([0, 500])
                  setRatingFilter(0)
                  setSearchQuery('')
                }}
                className="btn-primary"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}