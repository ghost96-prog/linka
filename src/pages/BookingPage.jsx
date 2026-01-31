import { Calendar, Clock, MapPin, User, CreditCard } from 'lucide-react'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'  // Add this import
export default function BookingPage() {
  const { serviceId } = useParams()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const service = {
    id: serviceId,
    title: 'Professional Hair Styling',
    provider: 'Alex Beauty Studio',
    price: 65,
    duration: '2 hours',
    location: '123 Beauty St, New York'
  }

  const timeSlots = ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM', '6:00 PM']

  const handleSubmit = (e) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Handle booking submission
      alert('Booking confirmed!')
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Progress Steps */}
        <div className="flex justify-between mb-12 relative">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center z-10">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${step >= stepNumber ? 'bg-primary-500 text-white' : 'bg-white border-2 border-neutral-300 text-neutral-400'}`}>
                {stepNumber}
              </div>
              <span className={`text-sm font-medium ${step >= stepNumber ? 'text-primary-600' : 'text-neutral-500'}`}>
                {stepNumber === 1 ? 'Details' : stepNumber === 2 ? 'Time' : 'Payment'}
              </span>
            </div>
          ))}
          <div className="absolute top-6 left-1/4 right-1/4 h-0.5 bg-neutral-300 -z-10">
            <div className={`h-full bg-primary-500 transition-all duration-300 ${step >= 2 ? 'w-1/2' : 'w-0'}`}></div>
            <div className={`h-full bg-primary-500 transition-all duration-300 ${step >= 3 ? 'w-full' : 'w-0'}`}></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Left Side - Form */}
            <div className="md:w-2/3 p-8">
              <h1 className="text-2xl font-bold mb-2">Book {service.title}</h1>
              <p className="text-neutral-600 mb-8">with {service.provider}</p>

              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Your Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                        <input
                          type="text"
                          required
                          className="w-full pl-11 pr-4 py-3 bg-neutral-50 rounded-xl border border-neutral-300 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 bg-neutral-50 rounded-xl border border-neutral-300 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                        placeholder="hello@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-3 bg-neutral-50 rounded-xl border border-neutral-300 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Special Requests (Optional)
                      </label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-3 bg-neutral-50 rounded-xl border border-neutral-300 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                        placeholder="Any special requirements or notes for the provider..."
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        <Calendar className="w-5 h-5 inline mr-2" />
                        Select Date
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-3 bg-neutral-50 rounded-xl border border-neutral-300 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        <Clock className="w-5 h-5 inline mr-2" />
                        Select Time
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setTime(slot)}
                            className={`py-3 rounded-xl border ${time === slot ? 'border-primary-500 bg-primary-50 text-primary-600' : 'border-neutral-300 hover:border-primary-300'}`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        <MapPin className="w-5 h-5 inline mr-2" />
                        Location
                      </label>
                      <div className="p-4 bg-neutral-50 rounded-xl">
                        <p className="font-medium">{service.location}</p>
                        <p className="text-sm text-neutral-600 mt-1">
                          Provider will come to your location
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        <CreditCard className="w-5 h-5 inline mr-2" />
                        Payment Method
                      </label>
                      <div className="space-y-3">
                        <label className="flex items-center p-4 border border-neutral-300 rounded-xl cursor-pointer hover:border-primary-300">
                          <input type="radio" name="payment" className="mr-3" defaultChecked />
                          <div>
                            <p className="font-medium">Credit/Debit Card</p>
                            <p className="text-sm text-neutral-600">Pay securely with your card</p>
                          </div>
                        </label>
                        <label className="flex items-center p-4 border border-neutral-300 rounded-xl cursor-pointer hover:border-primary-300">
                          <input type="radio" name="payment" className="mr-3" />
                          <div>
                            <p className="font-medium">PayPal</p>
                            <p className="text-sm text-neutral-600">Pay with your PayPal account</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                      <p className="text-green-700 font-medium">Your booking is protected by Linka's Guarantee</p>
                      <p className="text-sm text-green-600 mt-1">
                        Full refund if provider cancels or doesn't show up
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-8 flex justify-between">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="px-8 py-3 border border-neutral-300 rounded-xl font-medium hover:bg-neutral-50"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="submit"
                    className={`${step > 1 ? 'ml-auto' : 'w-full'} bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-8 rounded-xl transition-colors`}
                  >
                    {step === 3 ? 'Confirm Booking' : 'Continue'}
                  </button>
                </div>
              </form>
            </div>

            {/* Right Side - Summary */}
            <div className="md:w-1/3 bg-neutral-50 p-8 border-l border-neutral-200">
              <h3 className="font-bold text-lg mb-6">Booking Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Service</span>
                  <span className="font-medium">{service.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Provider</span>
                  <span className="font-medium">{service.provider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Duration</span>
                  <span className="font-medium">{service.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Hourly Rate</span>
                  <span className="font-medium">${service.price}/hr</span>
                </div>
                {date && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Date</span>
                    <span className="font-medium">{date}</span>
                  </div>
                )}
                {time && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Time</span>
                    <span className="font-medium">{time}</span>
                  </div>
                )}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${service.price * 2}</span>
                </div>
                <p className="text-sm text-neutral-500 mt-2">For {service.duration} of service</p>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                    <Check className="w-4 h-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium">Secure Payment</p>
                    <p className="text-sm text-neutral-600">Your payment is encrypted and secure</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                    <Check className="w-4 h-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium">24/7 Support</p>
                    <p className="text-sm text-neutral-600">Get help anytime from our support team</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}