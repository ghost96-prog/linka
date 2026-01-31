
// src/pages/CreateServicePage.jsx
import { useState } from 'react'
import { Upload, X, Image as ImageIcon, Video, Tag, DollarSign, Clock, MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function CreateServicePage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [mediaFiles, setMediaFiles] = useState([])
  const [mediaPreviews, setMediaPreviews] = useState([])

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    duration: '',
    locationType: 'provider', // 'provider' or 'client'
    address: '',
    tags: [],
    tagInput: ''
  })

  const categories = [
    'Beauty & Spa',
    'Home Services',
    'Fitness',
    'Tutoring',
    'Tech Support',
    'Events',
    'Photography',
    'Consulting',
    'Repair',
    'Delivery'
  ]

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files)
    
    files.forEach(file => {
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        toast.error('Please upload only images or videos')
        return
      }

      if (file.size > 50 * 1024 * 1024) { // 50MB limit
        toast.error('File size too large (max 50MB)')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setMediaFiles(prev => [...prev, file])
        setMediaPreviews(prev => [...prev, {
          url: reader.result,
          type: file.type.startsWith('video/') ? 'video' : 'image'
        }])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeMedia = (index) => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index))
    setMediaPreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleTagAdd = () => {
    if (formData.tagInput.trim() && !formData.tags.includes(formData.tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.tagInput.trim()],
        tagInput: ''
      }))
    }
  }

  const handleTagRemove = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (mediaFiles.length === 0) {
      toast.error('Please upload at least one media file')
      return
    }

    if (!formData.title || !formData.category || !formData.price) {
      toast.error('Please fill in all required fields')
      return
    }

    // Simulate API call
    toast.success('Service created successfully!')
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Create Service</h1>
          <p className="text-neutral-600">Showcase your skills and attract clients</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8 relative">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= stepNumber ? 'bg-primary-500 text-white' : 'bg-white border-2 border-neutral-300 text-neutral-400'}`}>
                {stepNumber}
              </div>
              <span className={`text-sm font-medium ${step >= stepNumber ? 'text-primary-600' : 'text-neutral-500'}`}>
                {stepNumber === 1 ? 'Media' : stepNumber === 2 ? 'Details' : 'Pricing'}
              </span>
            </div>
          ))}
          <div className="absolute top-5 left-1/4 right-1/4 h-0.5 bg-neutral-300 -z-10">
            <div className={`h-full bg-primary-500 transition-all duration-300 ${step >= 2 ? 'w-1/2' : 'w-0'}`}></div>
            <div className={`h-full bg-primary-500 transition-all duration-300 ${step >= 3 ? 'w-full' : 'w-0'}`}></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold mb-4">
                  Upload Media (Images/Videos)
                </label>
                <p className="text-neutral-600 mb-4">
                  Upload photos or videos showcasing your work. First media will be featured.
                </p>
                
                {mediaPreviews.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {mediaPreviews.map((media, index) => (
                      <div key={index} className="relative group">
                        {media.type === 'video' ? (
                          <div className="aspect-square rounded-xl overflow-hidden bg-black">
                            <video
                              src={media.url}
                              className="w-full h-full object-cover"
                              muted
                              playsInline
                            />
                            <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                              VIDEO
                            </div>
                          </div>
                        ) : (
                          <div className="aspect-square rounded-xl overflow-hidden">
                            <img
                              src={media.url}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => removeMedia(index)}
                          className="absolute top-2 left-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-neutral-300 rounded-2xl p-12 text-center mb-6">
                    <Upload className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                    <p className="text-neutral-600 mb-2">Drag & drop images or videos here</p>
                    <p className="text-sm text-neutral-500 mb-4">or</p>
                  </div>
                )}

                <input
                  type="file"
                  id="media-upload"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleMediaUpload}
                  className="hidden"
                />
                <label
                  htmlFor="media-upload"
                  className="btn-primary cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Upload className="w-5 h-5" />
                  <span>Upload Media</span>
                </label>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-blue-700 font-medium">Tips for great media:</p>
                <ul className="text-sm text-blue-600 mt-2 space-y-1">
                  <li>• Upload high-quality photos/videos</li>
                  <li>• Show before/after comparisons</li>
                  <li>• Keep videos under 60 seconds</li>
                  <li>• Highlight your best work</li>
                </ul>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 bg-neutral-50 rounded-xl border border-neutral-300 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  placeholder="e.g., Professional Hair Styling & Coloring"
                  maxLength={100}
                />
                <p className="text-xs text-neutral-500 mt-1">
                  {formData.title.length}/100 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Description *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 bg-neutral-50 rounded-xl border border-neutral-300 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  placeholder="Describe your service in detail..."
                  maxLength={500}
                />
                <p className="text-xs text-neutral-500 mt-1">
                  {formData.description.length}/500 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  <Tag className="w-4 h-4 inline mr-2" />
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 bg-neutral-50 rounded-xl border border-neutral-300 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Service Tags
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={formData.tagInput}
                    onChange={(e) => setFormData(prev => ({ ...prev, tagInput: e.target.value }))}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleTagAdd())}
                    className="flex-1 px-4 py-2 bg-neutral-50 rounded-xl border border-neutral-300 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                    placeholder="Add tags (e.g., hair, coloring, style)"
                  />
                  <button
                    type="button"
                    onClick={handleTagAdd}
                    className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-xl font-medium"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleTagRemove(tag)}
                        className="hover:text-primary-900"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Service Location
                </label>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border border-neutral-300 rounded-xl cursor-pointer hover:border-primary-300">
                    <input
                      type="radio"
                      name="locationType"
                      value="provider"
                      checked={formData.locationType === 'provider'}
                      onChange={(e) => setFormData(prev => ({ ...prev, locationType: e.target.value }))}
                      className="mr-3"
                    />
                    <div>
                      <p className="font-medium">I go to client</p>
                      <p className="text-sm text-neutral-600">Travel to client's location</p>
                    </div>
                  </label>
                  <label className="flex items-center p-4 border border-neutral-300 rounded-xl cursor-pointer hover:border-primary-300">
                    <input
                      type="radio"
                      name="locationType"
                      value="client"
                      checked={formData.locationType === 'client'}
                      onChange={(e) => setFormData(prev => ({ ...prev, locationType: e.target.value }))}
                      className="mr-3"
                    />
                    <div>
                      <p className="font-medium">Client comes to me</p>
                      <p className="text-sm text-neutral-600">Provide address below</p>
                    </div>
                  </label>
                </div>
                {formData.locationType === 'client' && (
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full mt-3 px-4 py-3 bg-neutral-50 rounded-xl border border-neutral-300 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                    placeholder="Enter your business address"
                  />
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
             <div>
  <label className="block text-sm font-medium text-neutral-700 mb-2">
    <DollarSign className="w-4 h-4 inline mr-2" />
    Price *
  </label>
  <div className="flex items-center">
    <span className="text-lg sm:text-xl font-bold mr-2">$</span>
    <input
      type="number"
      required
      min="1"
      step="0.01"
      value={formData.price}
      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
      className="flex-1 text-lg sm:text-2xl font-bold px-3 sm:px-4 py-2 sm:py-3 bg-neutral-50 rounded-xl border border-neutral-300 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
      placeholder="0.00"
    />
  </div>
  <div className="flex items-center mt-2 text-neutral-600">
    <span className="text-sm">per</span>
    <select
      className="ml-2 bg-transparent font-medium focus:outline-none text-sm sm:text-base"
      defaultValue="hour"
    >
      <option value="hour">hour</option>
      <option value="service">service</option>
      <option value="day">day</option>
      <option value="session">session</option>
    </select>
  </div>
</div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Duration *
                </label>
                <input
                  type="text"
                  required
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  className="w-full px-4 py-3 bg-neutral-50 rounded-xl border border-neutral-300 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  placeholder="e.g., 2 hours, 30 minutes, 1 day"
                />
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-green-700 font-medium">Ready to publish!</p>
                <p className="text-sm text-green-600 mt-1">
                  Your service will be visible to clients immediately. You can edit it anytime from your dashboard.
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
            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className={`${step > 1 ? 'ml-auto' : 'w-full'} btn-primary`}
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl transition-colors"
              >
                Publish Service
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
