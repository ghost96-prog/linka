import { useState, useEffect, useRef } from 'react'
import { Play, Pause, Volume2, VolumeX, MessageCircle, Heart, Share2, MoreVertical, ChevronRight, Filter, MapPin, Clock, Star, Search, X } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import video1 from '../assets/videos/hair-styling.mp4'
import video2 from '../assets/videos/cleaning-service.mp4'
import video3 from '../assets/videos/personal-training.mp4'
import video4 from '../assets/videos/plumbing.mp4'
import video5 from '../assets/videos/electrical-work.mp4'
import video6 from '../assets/videos/photography.mp4'

export default function FeedPage() {
  const { user, triggerLogin } = useAuth()
  const [likedPosts, setLikedPosts] = useState([])
  const containerRef = useRef(null)
  const mediaRefs = useRef({})
  const [currentMediaIndex, setCurrentMediaIndex] = useState({})
  const [videoStates, setVideoStates] = useState({}) // Track play/pause per video
  const [mutedStates, setMutedStates] = useState({}) // Track mute/unmute per video
  const [globalMuted, setGlobalMuted] = useState(true) // Global mute state like TikTok
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [filteredItems, setFilteredItems] = useState([])
  const [isManualPause, setIsManualPause] = useState({}) // Track manual pauses

const [showCenterButtons, setShowCenterButtons] = useState(true)
const [hideButtonsTimeout, setHideButtonsTimeout] = useState(null)
useEffect(() => {
  // Start the timeout when component mounts
  const timeout = setTimeout(() => {
    setShowCenterButtons(false)
  }, 3000)
  
  setHideButtonsTimeout(timeout)
  
  return () => {
    if (hideButtonsTimeout) clearTimeout(hideButtonsTimeout)
  }
}, [])

  // NEW DATA WITH LOCAL VIDEOS
 const feedItems = [
    {
      id: 1,
      media: [
        {
          type: 'video',
          url: video1,
          thumbnail: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=1000&fit=crop'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=1000&fit=crop'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=1000&fit=crop'
        }
      ],
      provider: {
        name: 'Alex Beauty Studio',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        rating: 4.9,
        reviews: 127,
        distance: '1.2km'
      },
      service: 'Hair Styling & Coloring',
      price: '',
      duration: '',
      likes: 234,
      comments: 42,
      isLiked: false
    },
    {
      id: 2,
      media: [
        {
          type: 'video',
          url: video2,
          thumbnail: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=1000&fit=crop'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=1000&fit=crop'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=1000&fit=crop'
        }
      ],
      provider: {
        name: 'Sparkle Cleaners',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sparkle',
        rating: 4.7,
        reviews: 89,
        distance: '2.5km'
      },
      service: 'Deep Home Cleaning',
      price: '',
      duration: '',
      likes: 189,
      comments: 31,
      isLiked: true
    },
    {
      id: 3,
      media: [
        {
          type: 'video',
          url: video3,
          thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=1000&fit=crop'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=1000&fit=crop'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1571019614245-e3c8b4c8f5c6?w=800&h=1000&fit=crop'
        }
      ],
      provider: {
        name: 'FitPro Training',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FitPro',
        rating: 4.8,
        reviews: 203,
        distance: '0.8km'
      },
      service: 'Personal Training Session',
      price: '$45',
      duration: '1 hour',
      likes: 312,
      comments: 56,
      isLiked: false
    },
    {
      id: 4,
      media: [
        {
          type: 'video',
          url: video4,
          thumbnail: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&h=1000&fit=crop'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&h=1000&fit=crop'
        }
      ],
      provider: {
        name: 'ZimPlumbers',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZimPlumbers',
        rating: 4.6,
        reviews: 156,
        distance: '3.2km'
      },
      service: 'Plumbing & Pipe Installation',
      price: '',
      duration: '',
      likes: 156,
      comments: 28,
      isLiked: false
    },
    {
      id: 5,
      media: [
        {
          type: 'video',
          url: video5,
          thumbnail: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=1000&fit=crop'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=1000&fit=crop'
        }
      ],
      provider: {
        name: 'ElectroFix Zimbabwe',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ElectroFix',
        rating: 4.8,
        reviews: 89,
        distance: '1.5km'
      },
      service: 'Electrical Wiring & Repairs',
      price: '',
      duration: '',
      likes: 198,
      comments: 34,
      isLiked: true
    },
    {
      id: 6,
      media: [
        {
          type: 'video',
          url: video6,
          thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=1000&fit=crop'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=1000&fit=crop'
        }
      ],
      provider: {
        name: 'Capture Zimbabwe',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Capture',
        rating: 4.9,
        reviews: 234,
        distance: '2.1km'
      },
      service: 'Event Photography',
      price: '$200',
      duration: 'Full day',
      likes: 421,
      comments: 67,
      isLiked: false
    }
  ]
  const handleScreenClick = () => {
  // Toggle global mute
  toggleGlobalMute()
  
  // Show center buttons
  setShowCenterButtons(true)
  
  // Clear existing timeout
  if (hideButtonsTimeout) clearTimeout(hideButtonsTimeout)
  
  // Set new timeout to hide after 3 seconds
  const timeout = setTimeout(() => {
    setShowCenterButtons(false)
  }, 3000)
  
  setHideButtonsTimeout(timeout)
}
  // Filter items based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredItems(feedItems)
      return
    }

    const query = searchQuery.toLowerCase().trim()
    const results = feedItems.filter(item => 
      item.service.toLowerCase().includes(query) ||
      item.provider.name.toLowerCase().includes(query) ||
      (item.price && item.price.toLowerCase().includes(query)) ||
      (item.duration && item.duration.toLowerCase().includes(query))
    )
    
    setFilteredItems(results)
  }, [searchQuery])

  // Initialize filtered items
  useEffect(() => {
    setFilteredItems(feedItems)
  }, [])

  // Initialize current media index for each feed item
  useEffect(() => {
    const initialIndexes = {}
    const initialVideoStates = {}
    const initialMutedStates = {}
    const initialManualPause = {}
    
    filteredItems.forEach(item => {
      initialIndexes[item.id] = 0
      initialVideoStates[item.id] = false // Start paused
      initialMutedStates[item.id] = true // Start muted
      initialManualPause[item.id] = false
    })
    
    setCurrentMediaIndex(initialIndexes)
    setVideoStates(initialVideoStates)
    setMutedStates(initialMutedStates)
    setIsManualPause(initialManualPause)
  }, [filteredItems])

  // Apply global mute to all videos
  useEffect(() => {
    Object.keys(mediaRefs.current).forEach(itemId => {
      const refs = mediaRefs.current[itemId]
      if (refs) {
        refs.forEach(video => {
          if (video && video.tagName === 'VIDEO') {
            video.muted = globalMuted
          }
        })
      }
    })
    
    // Update all muted states
    const newMutedStates = {}
    Object.keys(mutedStates).forEach(itemId => {
      newMutedStates[itemId] = globalMuted
    })
    setMutedStates(newMutedStates)
  }, [globalMuted])

  // Handle media play/pause based on visibility - FIXED VERSION
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const media = entry.target
          const itemId = parseInt(media.closest('[data-item-id]').dataset.itemId)
          
          if (media.tagName === 'VIDEO') {
            // Skip if user manually paused this video
            if (isManualPause[itemId] && !entry.isIntersecting) {
              return
            }
            
            if (entry.isIntersecting) {
              // Only play if not manually paused
              if (!videoStates[itemId] && !isManualPause[itemId]) {
                media.play().catch(e => {
                  console.log('Autoplay prevented')
                })
              }
            } else {
              media.pause()
            }
          }
        })
      },
      {
        threshold: 0.7,
        root: containerRef.current
      }
    )

    // Observe all video elements
    Object.values(mediaRefs.current).forEach(mediaArray => {
      mediaArray?.forEach(media => {
        if (media && media.tagName === 'VIDEO') {
          observer.observe(media)
        }
      })
    })

    return () => {
      observer.disconnect()
    }
  }, [filteredItems, videoStates, isManualPause])

  // Play/Pause toggle for videos - FIXED
// Update your toggleGlobalMute function to show buttons when clicked
const toggleGlobalMute = () => {
  setGlobalMuted(prev => !prev);
  
  // Show buttons when screen is tapped
  setShowCenterButtons(true);
  
  // Clear existing timeout and set new one
  if (hideButtonsTimeout) clearTimeout(hideButtonsTimeout);
  const timeout = setTimeout(() => {
    setShowCenterButtons(false);
  }, 3000);
  setHideButtonsTimeout(timeout);
};

// Update your togglePlayPause function to also show buttons
const togglePlayPause = (itemId, e) => {
  if (e) e.stopPropagation();
  
  const currentIdx = currentMediaIndex[itemId] || 0;
  const videoRefs = mediaRefs.current[itemId];
  
  if (videoRefs && videoRefs[currentIdx]) {
    const video = videoRefs[currentIdx];
    if (video.tagName === 'VIDEO') {
      if (video.paused) {
        video.play().then(() => {
          setVideoStates(prev => ({ ...prev, [itemId]: true }));
          setIsManualPause(prev => ({ ...prev, [itemId]: false }));
        }).catch(err => {
          console.log('Play failed:', err);
        });
      } else {
        video.pause();
        setVideoStates(prev => ({ ...prev, [itemId]: false }));
        setIsManualPause(prev => ({ ...prev, [itemId]: true }));
      }
    }
  }
  
  // Show buttons when play/pause is clicked
  setShowCenterButtons(true);
  
  // Reset the hide timeout
  if (hideButtonsTimeout) clearTimeout(hideButtonsTimeout);
  const timeout = setTimeout(() => {
    setShowCenterButtons(false);
  }, 3000);
  setHideButtonsTimeout(timeout);
};

  // Reset manual pause when switching media
  useEffect(() => {
    filteredItems.forEach(item => {
      const itemId = item.id
      const currentIdx = currentMediaIndex[itemId] || 0
      const videoRefs = mediaRefs.current[itemId]
      
      if (videoRefs && videoRefs[currentIdx]) {
        const video = videoRefs[currentIdx]
        if (video && video.tagName === 'VIDEO') {
          setIsManualPause(prev => ({ ...prev, [itemId]: false }))
        }
      }
    })
  }, [currentMediaIndex])

  // Handle horizontal swipe within a feed item
  const handleHorizontalSwipe = (itemId, direction) => {
    const currentIdx = currentMediaIndex[itemId] || 0
    const item = filteredItems.find(item => item.id === itemId)
    
    if (direction === 'left' && currentIdx < item.media.length - 1) {
      setCurrentMediaIndex(prev => ({
        ...prev,
        [itemId]: currentIdx + 1
      }))
    } else if (direction === 'right' && currentIdx > 0) {
      setCurrentMediaIndex(prev => ({
        ...prev,
        [itemId]: currentIdx - 1
      }))
    }
  }

  // Handle touch for horizontal swipe
  useEffect(() => {
    let startX = 0
    let currentItemId = null

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX
      const element = e.target.closest('[data-item-id]')
      if (element) {
        currentItemId = parseInt(element.dataset.itemId)
      }
    }

    const handleTouchEnd = (e) => {
      if (!currentItemId) return
      
      const endX = e.changedTouches[0].clientX
      const diff = startX - endX
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          handleHorizontalSwipe(currentItemId, 'left')
        } else {
          handleHorizontalSwipe(currentItemId, 'right')
        }
      }
      
      currentItemId = null
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [currentMediaIndex, filteredItems])

  const handleLike = (postId) => {
    if (!user) {
      triggerLogin()
      toast.error('Please login to like services')
      return
    }
    
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    )
  }

  const handleBook = (postId) => {
    if (!user) {
      triggerLogin()
      toast.error('Please login to view provider details')
      return
    }
    
    navigate(`/provider/${postId}`)
  }

  const handleShare = (postId) => {
    navigator.clipboard.writeText(`${window.location.origin}/provider/${postId}`)
    toast.success('Link copied to clipboard!')
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setShowSearch(false)
  }

  return (
    <div 
      ref={containerRef}
      className="h-[100vh] sm:h-screen overflow-y-auto snap-y snap-mandatory scrollbar-hide relative"
      onClick={toggleGlobalMute} // Single tap anywhere toggles global mute
    >
      {/* Search Overlay */}
      {showSearch && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm p-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search services..."
              className="w-full pl-12 pr-12 py-3 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => setShowSearch(false)}
              className="absolute right-14 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            >
              Cancel
            </button>
          </div>
          
          {/* Search Results Info */}
          {searchQuery && (
            <div className="mt-3 text-white text-sm">
              <p>Found {filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''} for "{searchQuery}"</p>
            </div>
          )}
        </div>
      )}

      {/* Search Button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          setShowSearch(true)
        }}
        className="fixed top-4 right-4 z-30 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold py-2 px-3 rounded-full transition-all duration-300 hover:shadow-lg active:scale-95 flex items-center justify-center shadow-md"
      >
        <Search className="w-5 h-5" />
      </button>

      {filteredItems.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-white p-8">
          <Search className="w-16 h-16 text-white/50 mb-4" />
          <h3 className="text-xl font-bold mb-2">No services found</h3>
          <p className="text-white/70 text-center mb-6">
            No services match "{searchQuery}"<br />
            Try a different search term
          </p>
          <button
            onClick={clearSearch}
            className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-full font-medium"
          >
            Clear Search
          </button>
        </div>
      ) : (
        filteredItems.map((item) => {
          const currentIdx = currentMediaIndex[item.id] || 0
          const currentMedia = item.media[currentIdx]
          const isVideo = currentMedia?.type === 'video'
          
          return (
            <div
              key={item.id}
              data-item-id={item.id}
              className="h-[85%] sm:h-screen snap-start relative bg-black overflow-hidden"
              onDoubleClick={(e) => {
                e.stopPropagation()
                togglePlayPause(item.id, e)
              }}
            >
          

              {/* Video Controls Overlay */}
           {isVideo && showCenterButtons && (
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex items-center space-x-4">
    <button
      onClick={(e) => togglePlayPause(item.id, e)}
      className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
    >
      {videoStates[item.id] ? (
        <Pause className="w-6 h-6 text-white" />
      ) : (
        <Play className="w-6 h-6 text-white" />
      )}
    </button>
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleGlobalMute();
      }}
      className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
    >
      {globalMuted ? (
        <VolumeX className="w-5 h-5 text-white" />
      ) : (
        <Volume2 className="w-5 h-5 text-white" />
      )}
    </button>
  </div>
)}
              {/* Media Container */}
              <div className="absolute inset-0 flex transition-transform duration-300"
                style={{ transform: `translateX(-${currentIdx * 100}%)` }}
              >
                {item.media.map((media, mediaIndex) => (
                  <div key={mediaIndex} className="w-full h-full flex-shrink-0 relative">
                    {media.type === 'video' ? (
                      <video
                        ref={el => {
                          if (!mediaRefs.current[item.id]) mediaRefs.current[item.id] = []
                          mediaRefs.current[item.id][mediaIndex] = el
                        }}
                        autoPlay={mediaIndex === 0}
                        muted={globalMuted}
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-contain"
                        src={media.url}
                        poster={media.thumbnail}
                        onClick={(e) => {
                          e.stopPropagation()
                          togglePlayPause(item.id, e)
                        }}
                        onPlay={() => {
                          setVideoStates(prev => ({ ...prev, [item.id]: true }))
                          setIsManualPause(prev => ({ ...prev, [item.id]: false }))
                        }}
                        onPause={() => {
                          setVideoStates(prev => ({ ...prev, [item.id]: false }))
                        }}
                        onError={(e) => {
                          console.log('Video failed, showing thumbnail')
                          e.target.style.display = 'none'
                          const fallback = document.createElement('div')
                          fallback.style.backgroundImage = `url(${media.thumbnail})`
                          fallback.className = 'absolute inset-0 bg-contain bg-center'
                          e.target.parentElement.appendChild(fallback)
                        }}
                      />
                    ) : (
                      <img
                        src={media.url}
                        alt={`${item.service} - ${mediaIndex + 1}`}
                        className="absolute inset-0 w-full h-full object-contain"
                        onClick={(e) => e.stopPropagation()}
                        onError={(e) => {
                          e.target.style.display = 'none'
                          const container = e.target.parentElement
                          container.style.background = 'linear-gradient(135deg, #0ea5e9, #d946ef)'
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
              
              {/* Media Navigation Dots */}
              {item.media.length > 1 && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                  {item.media.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation()
                        setCurrentMediaIndex(prev => ({
                          ...prev,
                          [item.id]: index
                        }))
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === currentIdx 
                          ? 'w-6 bg-white' 
                          : 'w-1.5 bg-white/40 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              )}
              
              {/* Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/0 to-transparent pointer-events-none z-0" />
              <div className="relative h-full flex justify-between items-end sm:pb-20 px-4">
                <div className="max-w-[55%] sm:max-w-[75%] mb-6">
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <img
                        src={item.provider.avatar}
                        alt={item.provider.name}
                        className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border-2 border-white/80"
                        onClick={(e) => e.stopPropagation()}
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${item.provider.name}&background=0ea5e9&color=fff`
                        }}
                      />
                      <div className="ml-2 sm:ml-3">
                        <h3 className="text-white text-xs sm:text-base font-bold">{item.provider.name}</h3>
                        <div className="flex items-center space-x-1 sm:space-x-3 mt-0.5">
                          <div className="flex items-center text-white/90">
                            <Star className="w-2 h-2 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400 mr-0.5" />
                            <span className="font-medium text-[10px] sm:text-sm">{item.provider.rating}</span>
                            <span className="text-white/70 text-[10px] ml-0.5">({item.provider.reviews})</span>
                          </div>
                          <div className="flex items-center text-white/90">
                            <MapPin className="w-2 h-2 sm:w-4 sm:h-4 mr-0.5" />
                            <span className="text-[10px] sm:text-sm">{item.provider.distance} away</span>
                          </div>
                          <div className=" top-4 left-4 z-30">
             <button
  onClick={(e) => {
    e.stopPropagation()
    handleBook(item.id)
  }}
  className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-1 px-2 sm:py-2 sm:px-3 rounded-full transition-all duration-300 hover:shadow-lg active:scale-95 flex items-center justify-center shadow-md"
>
  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
  <span className="text-xs sm:text-sm">
    <span className="sm:hidden">Book Now</span>
    <span className="hidden sm:inline">Book Now</span>
  </span>
</button>
              </div>
                        </div>
                      </div>
                    </div>
                    
                    <h2 className="text-white text-sm sm:text-xl font-bold mb-2">{item.service}</h2>
                    
                    {(item.duration || item.price) && (
                      <div className="flex items-center justify-between mb-3">
                        {item.duration && (
                          <div className="flex items-center text-white/90">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            <span className="text-xs sm:text-base">{item.duration}</span>
                          </div>
                        )}
                        {item.price && (
                          <div className="text-base sm:text-2xl font-bold text-white">{item.price}</div>
                        )}
                      </div>
                    )}
                    
                    <p className="text-white/80 mb-4 text-xs sm:text-sm leading-relaxed max-w-full">
                      Professional service with guaranteed satisfaction. Book now for an amazing experience!
                    </p>
                  </div>
                  
                </div>
                
                {/* Right Side Actions */}
                <div className="flex flex-col items-center space-y-5 mb-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleLike(item.id)
                    }}
                    className="flex flex-col items-center"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${likedPosts.includes(item.id) ? 'bg-rose-500/20' : 'bg-white/10'} backdrop-blur-sm transition-all hover:scale-110`}>
                      <Heart className={`w-5 h-5 ${likedPosts.includes(item.id) ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
                    </div>
                    <span className="text-white text-xs font-medium">{item.likes + (likedPosts.includes(item.id) ? 1 : 0)}</span>
                  </button>
                  
                  {item.comments !== undefined && item.comments !== null && (
                    <button 
                      className="flex flex-col items-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-1 transition-all hover:scale-110">
                        <MessageCircle className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-white text-xs font-medium">{item.comments}</span>
                    </button>
                  )}
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleShare(item.id)
                    }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110">
                      <Share2 className="w-5 h-5 text-white" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}