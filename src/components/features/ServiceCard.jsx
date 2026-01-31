// src/components/features/ServiceCard.jsx
import { Star, MapPin, Clock, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function ServiceCard({ service }) {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <Link to={`/provider/${service.id}`}>
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-xl transition-all duration-300 card-hover">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          {service.featured && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              FEATURED
            </div>
          )}
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsLiked(!isLiked)
            }}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-neutral-400'}`} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-bold text-lg text-neutral-900 line-clamp-1">{service.title}</h3>
            <div className="text-xl font-bold text-primary-600">${service.price}</div>
          </div>

          <p className="text-neutral-600 text-sm mb-4">{service.provider}</p>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-medium">{service.rating}</span>
                <span className="text-neutral-500 text-sm ml-1">({service.reviews})</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 text-neutral-400 mr-1" />
                <span className="text-sm text-neutral-600">{service.distance}</span>
              </div>
            </div>
            <div className="flex items-center text-neutral-600 text-sm">
              <Clock className="w-4 h-4 mr-1" />
              {service.duration}
            </div>
          </div>

          <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 rounded-xl transition-colors">
            Book Now
          </button>
        </div>
      </div>
    </Link>
  )
}