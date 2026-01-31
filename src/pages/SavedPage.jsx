
// src/pages/SavedPage.jsx
import { Heart, Star, MapPin, Clock, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SavedPage() {
  const [savedItems, setSavedItems] = useState([
    {
      id: 1,
      title: 'Professional Hair Styling',
      provider: 'Alex Beauty Studio',
      rating: 4.9,
      reviews: 127,
      price: 65,
      duration: '2 hours',
      distance: '1.2km',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
      savedDate: '2 days ago'
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
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
      savedDate: '1 week ago'
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
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      savedDate: '3 days ago'
    },
  ])

  const handleRemove = (id) => {
    setSavedItems(prev => prev.filter(item => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Saved Services</h1>
          <p className="text-neutral-600">Your favorite services saved for later</p>
        </div>

        {savedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-rose-500" />
                  </button>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-black/60 text-white text-xs px-2 py-1 rounded">
                      Saved {item.savedDate}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg text-neutral-900 line-clamp-1">{item.title}</h3>
                    <div className="text-xl font-bold text-primary-600">${item.price}</div>
                  </div>

                  <p className="text-neutral-600 text-sm mb-4">{item.provider}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="flex items-center mr-4">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-medium">{item.rating}</span>
                        <span className="text-neutral-500 text-sm ml-1">({item.reviews})</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-neutral-400 mr-1" />
                        <span className="text-sm text-neutral-600">{item.distance}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-neutral-600 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {item.duration}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Link
                      to={`/provider/${item.id}`}
                      className="flex-1 btn-primary text-center"
                    >
                      View Details
                    </Link>
                    <Link
                      to={`/book/${item.id}`}
                      className="flex-1 bg-white border border-primary-500 text-primary-600 hover:bg-primary-50 font-medium py-3 rounded-xl transition-colors text-center"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <Heart className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No saved services yet</h3>
            <p className="text-neutral-600 mb-6">
              When you find services you like, click the heart icon to save them here.
            </p>
            <Link
              to="/feed"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Explore Services</span>
            </Link>
          </div>
        )}

        {savedItems.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-neutral-600">
              {savedItems.length} saved {savedItems.length === 1 ? 'service' : 'services'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
