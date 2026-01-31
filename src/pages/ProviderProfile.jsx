import { Star, MapPin, Clock, Calendar, Phone, MessageCircle, Shield, Check, MessageCircle as WhatsAppIcon } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'

export default function ProviderProfile() {
  const { id } = useParams()
  const { user, triggerLogin } = useAuth()

  const provider = {
    id: 1,
    name: 'Alex Beauty Studio',
    rating: 4.9,
    reviews: 127,
    services: ['Hair Styling', 'Hair Coloring', 'Haircuts'],
    description: 'Professional hairstylist with 10+ years experience specializing in modern cuts and colors.',
    distance: '1.2km away',
    hourlyRate: '$65/hour',
    availability: 'Available Today',
    whatsapp: '+263783556354', // WhatsApp number
    phone: '+263783556354', // Regular phone number
    images: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop',
    ]
  }

  const reviews = [
    { id: 1, user: 'Sarah M.', rating: 5, comment: 'Amazing work! Highly recommended.', date: '2 days ago' },
    { id: 2, user: 'John D.', rating: 5, comment: 'Best haircut I\'ve ever had.', date: '1 week ago' },
    { id: 3, user: 'Lisa T.', rating: 4, comment: 'Great service, will come back.', date: '2 weeks ago' },
  ]

  const handleWhatsAppContact = () => {
    if (!user) {
      triggerLogin()
      toast.error('Please login to contact providers')
      return
    }

    // Normalize WhatsApp number
    const normalizeWhatsAppNumber = (number) => {
      if (!number) return null;
      
      // Remove all non-digit characters except +
      let cleaned = number.replace(/[^\d+]/g, '');
      
      // If starts with +, keep it
      if (cleaned.startsWith('+')) {
        cleaned = cleaned.substring(1).replace(/^0+/, '');
        return cleaned;
      }
      
      // If starts with 0
      if (cleaned.startsWith('0')) {
        const defaultCountryCode = '263';
        cleaned = defaultCountryCode + cleaned.substring(1);
      }
      
      cleaned = cleaned.replace(/^0+/, '');
      return cleaned;
    }
    
    const normalizedNumber = normalizeWhatsAppNumber(provider.whatsapp);
    
    if (!normalizedNumber) {
      toast.error('WhatsApp number not available');
      return;
    }
    
    // Construct the enquiry message
    const message = `👋 Hi *${provider.name}*!
    
I'm interested in your service: *Hair Styling* 🎯
💰 Price: ${provider.hourlyRate}
⏱️ Duration: 2 hours

Can you please share more details about:
📅 Availability
📋 Requirements
📝 Booking process

My name is: 👤 ${user.name || user.email}
Looking forward to your response! 😊`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${normalizedNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    toast.success('Opening WhatsApp to contact provider');
  }

  const handleCall = () => {
    if (!user) {
      triggerLogin()
      toast.error('Please login to call providers')
      return
    }

    // Format phone number for tel: link
    const phoneNumber = provider.phone.replace(/[^\d+]/g, '');
    window.open(`tel:${phoneNumber}`, '_self');
    toast.success('Opening phone dialer');
  }

  const handleDirectMessage = () => {
    if (!user) {
      triggerLogin()
      toast.error('Please login to message providers')
      return
    }

    // In a real app, this would open your internal messaging system
    // For now, we'll simulate opening messages
    toast.success('Opening messages with provider');
    // In reality: navigate to `/messages?provider=${provider.id}`
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={provider.images[0]}
          alt={provider.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">{provider.name}</h1>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center text-white">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-bold">{provider.rating}</span>
                  <span className="ml-1">({provider.reviews} reviews)</span>
                </div>
                <div className="flex items-center text-white">
                  <MapPin className="w-5 h-5 mr-1" />
                  <span>{provider.distance}</span>
                </div>
              </div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold text-primary-600">{provider.hourlyRate}</div>
              <div className="text-sm text-neutral-600">per hour</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* About */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">About</h2>
              <p className="text-neutral-600 mb-6">{provider.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {provider.services.map((service, index) => (
                  <span
                    key={index}
                    className="bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {service}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Verified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Background Checked</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-primary-500" />
                  <span className="text-sm">5 Years Experience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-primary-500" />
                  <span className="text-sm">On-time Guarantee</span>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Reviews ({reviews.length})</h2>
                <button className="text-primary-600 font-medium">Write a Review</button>
              </div>

              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="pb-6 border-b border-neutral-100 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                          <span className="font-bold text-primary-600">
                            {review.user.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold">{review.user}</h4>
                          <div className="flex items-center">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-neutral-500 ml-2">{review.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-neutral-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-6">Contact Provider</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Service</span>
                  <span className="font-medium">Hair Styling</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Duration</span>
                  <span className="font-medium">2 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Rate</span>
                  <span className="font-bold text-primary-600">{provider.hourlyRate}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Estimated Total</span>
                    <span>$130</span>
                  </div>
                  <p className="text-sm text-neutral-500 mt-1">For 2 hours of service</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* WhatsApp Book Now Button */}
                <button
                  onClick={handleWhatsAppContact}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center"
                >
                  <WhatsAppIcon className="w-6 h-6 mr-2" />
                  Book via WhatsApp
                </button>
                
                <div className="flex space-x-3">
                  {/* Call Button */}
                  <button
                    onClick={handleCall}
                    className="flex-1 bg-white border border-primary-500 text-primary-600 hover:bg-primary-50 font-medium py-3 rounded-xl transition-colors flex items-center justify-center"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call
                  </button>
                  
                  {/* Direct Message Button */}
                  <button
                    onClick={handleDirectMessage}
                    className="flex-1 bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-50 font-medium py-3 rounded-xl transition-colors flex items-center justify-center"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Message
                  </button>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-green-700 font-medium">Direct Contact</p>
                <p className="text-sm text-green-600 mt-1">
                  Contact provider directly to discuss availability and arrange service
                </p>
              </div>

              <div className="mt-4 p-3 bg-neutral-50 rounded-xl">
                <p className="text-sm text-neutral-600 text-center">
                  Provider typically responds within 15 minutes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}