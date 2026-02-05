import { useState, useEffect, useRef } from 'react'
import { Play, Pause, Volume2, VolumeX, MessageCircle, Heart, Share2, MoreVertical, ChevronRight, Filter, MapPin, Clock, Star, Search, X, Send, Download, Copy, Facebook, Twitter, Instagram, Link, User, ThumbsUp, ChevronDown, MoreHorizontal, Flag, EyeOff, Trash2, Reply, ChevronUp, Smartphone, Mail } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import video1 from '../assets/videos/hair-styling.mp4'
import video2 from '../assets/videos/cleaning-service.mp4'
import video3 from '../assets/videos/personal-training.mp4'
import video4 from '../assets/videos/plumbing.mp4'
import video5 from '../assets/videos/electrical-work.mp4'
import video6 from '../assets/videos/photography.mp4'

// Add this helper function to check Web Share API support
const canUseWebShare = () => {
  return typeof navigator !== 'undefined' && navigator.share && navigator.canShare;
};

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

export default function FeedPage() {
  const { user, triggerLogin } = useAuth()
  const [likedPosts, setLikedPosts] = useState([])
  const containerRef = useRef(null)
  const mediaRefs = useRef({})
  const [currentMediaIndex, setCurrentMediaIndex] = useState({})
  const [videoStates, setVideoStates] = useState({})
  const [mutedStates, setMutedStates] = useState({})
  const [globalMuted, setGlobalMuted] = useState(true)
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [filteredItems, setFilteredItems] = useState([])
  const [isManualPause, setIsManualPause] = useState({})

  const [showCenterButtons, setShowCenterButtons] = useState(true)
  const [hideButtonsTimeout, setHideButtonsTimeout] = useState(null)
  
  // NEW STATES
  const [showComments, setShowComments] = useState(false)
  const [currentPostId, setCurrentPostId] = useState(null)
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState({})
  const [showShareSheet, setShowShareSheet] = useState(false)
  const [sharePostId, setSharePostId] = useState(null)
  const [isClosingComments, setIsClosingComments] = useState(false)
  const commentsRef = useRef(null)
  const [startY, setStartY] = useState(0)
  const [replyingTo, setReplyingTo] = useState(null)
  const [showReplyCommentInput, setShowReplyCommentInput] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [showCommentOptions, setShowCommentOptions] = useState(null)
  const [expandedReplies, setExpandedReplies] = useState({})
  const [loadingComments, setLoadingComments] = useState(false)
  const [hasMoreComments, setHasMoreComments] = useState({})

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowCenterButtons(false)
    }, 3000)
    
    setHideButtonsTimeout(timeout)
    
    return () => {
      if (hideButtonsTimeout) clearTimeout(hideButtonsTimeout)
    }
  }, [])

  // Initialize comments from localStorage
  useEffect(() => {
    const savedComments = localStorage.getItem('service-comments')
    if (savedComments) {
      const parsed = JSON.parse(savedComments)
      setComments(parsed)
      
      // Initialize hasMoreComments based on comment count
      const hasMore = {}
      Object.keys(parsed).forEach(postId => {
        hasMore[postId] = parsed[postId].length > 5
      })
      setHasMoreComments(hasMore)
    } else {
      // Initialize with sample comments
      const initialComments = {}
      const hasMore = {}
      feedItems.forEach(item => {
        initialComments[item.id] = [
          {
            id: 1,
            user: 'John Doe',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
            text: 'Great service! Highly recommended!',
            timestamp: '2 hours ago',
            likes: 12,
            isLiked: false,
            replies: [
              {
                id: 11,
                user: 'Service Provider',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Provider',
                text: 'Thank you John! We appreciate your feedback!',
                timestamp: '1 hour ago',
                likes: 3,
                isLiked: false
              },
              {
                id: 12,
                user: 'Mike Johnson',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
                text: 'Agreed! Best service in town!',
                timestamp: '45 mins ago',
                likes: 2,
                isLiked: true
              }
            ]
          },
          {
            id: 2,
            user: 'Sarah Smith',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
            text: 'How much does this service cost?',
            timestamp: '5 hours ago',
            likes: 3,
            isLiked: true,
            replies: [
              {
                id: 21,
                user: 'Service Provider',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Provider',
                text: 'Prices start at $50, depends on the scope. DM for details!',
                timestamp: '4 hours ago',
                likes: 1,
                isLiked: false
              }
            ]
          },
          {
            id: 3,
            user: 'Mike Johnson',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
            text: 'Professional work, will book again!',
            timestamp: '1 day ago',
            likes: 8,
            isLiked: false,
            replies: []
          },
          {
            id: 4,
            user: 'Emily Chen',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
            text: 'The quality is amazing! Worth every penny.',
            timestamp: '2 days ago',
            likes: 15,
            isLiked: true,
            replies: []
          },
          {
            id: 5,
            user: 'David Wilson',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
            text: 'Quick response and excellent service!',
            timestamp: '3 days ago',
            likes: 7,
            isLiked: false,
            replies: []
          },
          {
            id: 6,
            user: 'Lisa Brown',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
            text: 'Highly professional team!',
            timestamp: '4 days ago',
            likes: 9,
            isLiked: false,
            replies: []
          }
        ]
        hasMore[item.id] = true // Always has more for demo
      })
      setComments(initialComments)
      setHasMoreComments(hasMore)
      localStorage.setItem('service-comments', JSON.stringify(initialComments))
    }
  }, [])

  // Save comments to localStorage
  useEffect(() => {
    if (Object.keys(comments).length > 0) {
      localStorage.setItem('service-comments', JSON.stringify(comments))
    }
  }, [comments])



  const handleScreenClick = () => {
    toggleGlobalMute()
    setShowCenterButtons(true)
    if (hideButtonsTimeout) clearTimeout(hideButtonsTimeout)
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
      initialVideoStates[item.id] = false
      initialMutedStates[item.id] = true
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
    
    const newMutedStates = {}
    Object.keys(mutedStates).forEach(itemId => {
      newMutedStates[itemId] = globalMuted
    })
    setMutedStates(newMutedStates)
  }, [globalMuted])

  // Handle media play/pause based on visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const media = entry.target
          const itemId = parseInt(media.closest('[data-item-id]').dataset.itemId)
          
          if (media.tagName === 'VIDEO') {
            if (isManualPause[itemId] && !entry.isIntersecting) {
              return
            }
            
            if (entry.isIntersecting) {
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

  const toggleGlobalMute = () => {
    setGlobalMuted(prev => !prev)
    setShowCenterButtons(true)
    
    if (hideButtonsTimeout) clearTimeout(hideButtonsTimeout)
    const timeout = setTimeout(() => {
      setShowCenterButtons(false)
    }, 3000)
    setHideButtonsTimeout(timeout)
  }

  const togglePlayPause = (itemId, e) => {
    if (e) e.stopPropagation()
    
    const currentIdx = currentMediaIndex[itemId] || 0
    const videoRefs = mediaRefs.current[itemId]
    
    if (videoRefs && videoRefs[currentIdx]) {
      const video = videoRefs[currentIdx]
      if (video.tagName === 'VIDEO') {
        if (video.paused) {
          video.play().then(() => {
            setVideoStates(prev => ({ ...prev, [itemId]: true }))
            setIsManualPause(prev => ({ ...prev, [itemId]: false }))
          }).catch(err => {
            console.log('Play failed:', err)
          })
        } else {
          video.pause()
          setVideoStates(prev => ({ ...prev, [itemId]: false }))
          setIsManualPause(prev => ({ ...prev, [itemId]: true }))
        }
      }
    }
    
    setShowCenterButtons(true)
    
    if (hideButtonsTimeout) clearTimeout(hideButtonsTimeout)
    const timeout = setTimeout(() => {
      setShowCenterButtons(false)
    }, 3000)
    setHideButtonsTimeout(timeout)
  }

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

  // COMMENT FUNCTIONS - TIKTOK STYLE
// COMMENT FUNCTIONS - TIKTOK STYLE
const handleLikeComment = (postId, commentId, isReply = false, parentCommentId = null) => {
  if (!user) {
    triggerLogin()
    toast.error('Please login to like comments')
    return
  }
  
  setComments(prev => {
    const postComments = [...(prev[postId] || [])]
    
    if (isReply && parentCommentId) {
      // Find and update a reply
      const commentIndex = postComments.findIndex(c => c.id === parentCommentId)
      if (commentIndex !== -1) {
        const updatedComment = { ...postComments[commentIndex] }
        const replies = [...(updatedComment.replies || [])]
        const replyIndex = replies.findIndex(r => r.id === commentId)
        
        if (replyIndex !== -1) {
          const reply = replies[replyIndex]
          const wasLiked = reply.isLiked
          replies[replyIndex] = {
            ...reply,
            likes: wasLiked ? reply.likes - 1 : reply.likes + 1,
            isLiked: !wasLiked
          }
          
          updatedComment.replies = replies
          postComments[commentIndex] = updatedComment
        }
      }
    } else {
      // Find and update a main comment
      const commentIndex = postComments.findIndex(c => c.id === commentId)
      if (commentIndex !== -1) {
        const comment = postComments[commentIndex]
        const wasLiked = comment.isLiked
        postComments[commentIndex] = {
          ...comment,
          likes: wasLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !wasLiked
        }
      }
    }
    
    return { ...prev, [postId]: postComments }
  })
}
  const handleAddComment = (postId) => {
    if (!user) {
      triggerLogin()
      toast.error('Please login to comment')
      return
    }

    if (!commentText.trim()) return

    const newComment = {
      id: Date.now(),
      user: user.name || 'You',
      avatar: user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name || 'User'}`,
      text: commentText.trim(),
      timestamp: 'Just now',
      likes: 0,
      isLiked: false,
      replies: []
    }

    setComments(prev => ({
      ...prev,
      [postId]: [newComment, ...(prev[postId] || [])]
    }))

    setCommentText('')
    toast.success('Comment added!')
    setReplyingTo(null)
  }

 const handleAddReply = (postId, parentCommentId) => {
  if (!user) {
    triggerLogin()
    toast.error('Please login to reply')
    return
  }

  if (!replyText.trim()) return

  const newReply = {
    id: Date.now(),
    user: user.name || 'You',
    avatar: user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name || 'User'}`,
    text: replyText.trim(),
    timestamp: 'Just now',
    likes: 0,
    isLiked: false
  }

  setComments(prev => {
    const postComments = [...prev[postId]]
    const commentIndex = postComments.findIndex(c => c.id === parentCommentId)
    if (commentIndex !== -1) {
      const updatedComment = {
        ...postComments[commentIndex],
        replies: [...(postComments[commentIndex].replies || []), newReply] // FIXED: Check if replies exists
      }
      postComments[commentIndex] = updatedComment
    }
    return { ...prev, [postId]: postComments }
  })

  setReplyText('')
  setShowReplyCommentInput(null)
  setExpandedReplies(prev => ({ ...prev, [parentCommentId]: true }))
  toast.success('Reply added!')
}

  const openComments = (postId) => {
    if (!user) {
      triggerLogin()
      toast.error('Please login to view comments')
      return
    }
    
    setCurrentPostId(postId)
    setShowComments(true)
    setReplyingTo(null)
    setShowReplyCommentInput(null)
  }

  const closeComments = () => {
    setIsClosingComments(true)
    setTimeout(() => {
      setShowComments(false)
      setIsClosingComments(false)
      setReplyingTo(null)
      setShowReplyCommentInput(null)
      setShowCommentOptions(null)
    }, 300)
  }

  // Handle swipe down to close comments
  const handleTouchStart = (e) => {
    if (!commentsRef.current) return
    const rect = commentsRef.current.getBoundingClientRect()
    if (e.touches[0].clientY < rect.top + 50) { // Only on the top draggable area
      setStartY(e.touches[0].clientY)
    }
  }

  const handleTouchMove = (e) => {
    if (!startY || !commentsRef.current) return
    
    const currentY = e.touches[0].clientY
    const diff = currentY - startY
    
    if (diff > 0) { // Swiping down
      commentsRef.current.style.transform = `translateY(${diff}px)`
    }
  }

  const handleTouchEnd = (e) => {
    if (!startY || !commentsRef.current) return
    
    const currentY = e.changedTouches[0].clientY
    const diff = currentY - startY
    
    if (diff > 100) { // Swiped down enough
      closeComments()
    } else {
      commentsRef.current.style.transform = 'translateY(0)'
    }
    
    setStartY(0)
  }

  const toggleReplies = (commentId) => {
    setExpandedReplies(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }))
  }

  const loadMoreComments = () => {
    if (!currentPostId || loadingComments) return
    
    setLoadingComments(true)
    
    // Simulate loading more comments
    setTimeout(() => {
      setComments(prev => {
        const currentComments = prev[currentPostId] || []
        const newComments = [
          ...currentComments,
          {
            id: Date.now() + 1,
            user: 'New User',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=New',
            text: 'Just discovered this amazing service!',
            timestamp: 'Just now',
            likes: 0,
            isLiked: false,
            replies: []
          },
          {
            id: Date.now() + 2,
            user: 'Another User',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Another',
            text: 'The quality is outstanding!',
            timestamp: 'Just now',
            likes: 0,
            isLiked: false,
            replies: []
          }
        ]
        
        return { ...prev, [currentPostId]: newComments }
      })
      
      setLoadingComments(false)
    }, 1000)
  }

  const handleCommentOptions = (commentId) => {
    setShowCommentOptions(prev => prev === commentId ? null : commentId)
  }

  const handleReportComment = (commentId) => {
    toast.success('Comment reported successfully')
    setShowCommentOptions(null)
  }

  const handleHideComment = (commentId) => {
    toast.success('Comment hidden')
    setShowCommentOptions(null)
  }

  const handleDeleteComment = (postId, commentId) => {
    if (!user) {
      triggerLogin()
      return
    }
    
    setComments(prev => {
      const postComments = prev[postId].filter(c => c.id !== commentId)
      return { ...prev, [postId]: postComments }
    })
    
    toast.success('Comment deleted')
    setShowCommentOptions(null)
  }

  const openShareSheet = (postId) => {
    setSharePostId(postId)
    
    // If Web Share API is supported, use native share dialog
    if (canUseWebShare()) {
      handleNativeShare(postId)
    } else {
      // Fallback to custom share sheet
      setShowShareSheet(true)
    }
  }

  const handleNativeShare = async (postId) => {
    const item = feedItems.find(i => i.id === postId)
    if (!item) return
    
    const shareUrl = `${window.location.origin}/provider/${postId}`
    const shareText = `Check out this service: ${item.service} by ${item.provider.name}`
    
    try {
      // Check if we can share files (for download/save functionality)
      const shareData = {
        title: item.service,
        text: shareText,
        url: shareUrl,
      }
      
      // Try to share with Web Share API
      if (navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData)
        toast.success('Shared successfully!')
      } else {
        // Fallback to custom share sheet
        setShowShareSheet(true)
      }
    } catch (error) {
      // User cancelled share or error occurred
      if (error.name !== 'AbortError') {
        console.error('Error sharing:', error)
        toast.error('Failed to share')
      }
    }
  }

  const handleShareAction = async (action) => {
    if (!sharePostId) return
    
    const item = feedItems.find(i => i.id === sharePostId)
    if (!item) return
    
    const shareUrl = `${window.location.origin}/provider/${sharePostId}`
    const shareText = `Check out this service: ${item.service} by ${item.provider.name}`
    
    switch(action) {
      case 'copy':
        navigator.clipboard.writeText(shareUrl)
        toast.success('Link copied to clipboard!')
        break
        
      case 'download':
        // For media download - you'll need to implement actual download logic
        toast.success('Download started!')
        // Example: For video/image download
        // const mediaUrl = item.media[0].url
        // const link = document.createElement('a')
        // link.href = mediaUrl
        // link.download = `${item.service.replace(/\s+/g, '-')}.${mediaUrl.split('.').pop()}`
        // document.body.appendChild(link)
        // link.click()
        // document.body.removeChild(link)
        break
        
      case 'native-share':
        // This would be the default for mobile
        if (canUseWebShare()) {
          try {
            await navigator.share({
              title: item.service,
              text: shareText,
              url: shareUrl,
            })
          } catch (error) {
            if (error.name !== 'AbortError') {
              console.error('Error sharing:', error)
            }
          }
        } else {
          toast.error('Sharing not supported on this device')
        }
        break
        
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`, '_blank')
        break
        
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank')
        break
        
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`, '_blank')
        break
        
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(item.service)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`, '_blank')
        break
        
      case 'sms':
        window.open(`sms:?body=${encodeURIComponent(`${shareText} ${shareUrl}`)}`, '_blank')
        break
    }
    
    setShowShareSheet(false)
  }

  // Update your Share Sheet UI to be dynamic
  const getShareOptions = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    
    if (isMobile && canUseWebShare()) {
      // Mobile with Web Share API support
      return [
        { id: 'native-share', label: 'Share', icon: Share2, color: 'bg-blue-100 dark:bg-blue-900/30' },
        { id: 'copy', label: 'Copy Link', icon: Copy, color: 'bg-purple-100 dark:bg-purple-900/30' },
        { id: 'download', label: 'Save', icon: Download, color: 'bg-green-100 dark:bg-green-900/30' },
      ]
    } else {
      // Desktop or mobile without Web Share API
      return [
        { id: 'copy', label: 'Copy Link', icon: Copy, color: 'bg-blue-100 dark:bg-blue-900/30' },
        { id: 'download', label: 'Save', icon: Download, color: 'bg-green-100 dark:bg-green-900/30' },
        { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, color: 'bg-green-50 dark:bg-green-900/20' },
        { id: 'facebook', label: 'Facebook', icon: Facebook, color: 'bg-blue-50 dark:bg-blue-900/20' },
        { id: 'twitter', label: 'Twitter', icon: Twitter, color: 'bg-sky-50 dark:bg-sky-900/20' },
        { id: 'email', label: 'Email', icon: Mail, color: 'bg-red-50 dark:bg-red-900/20' },
        { id: 'sms', label: 'SMS', icon: Smartphone, color: 'bg-gray-100 dark:bg-gray-800' },
      ]
    }
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setShowSearch(false)
  }

  // Render comment with replies
  const renderComment = (comment, postId, isReply = false, parentCommentId = null) => (
    <div key={comment.id} className={`${isReply ? 'ml-10 mt-3' : ''}`}>
      <div className="flex space-x-3 group">
        <img src={comment.avatar} alt={comment.user} className="w-8 h-8 rounded-full flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold dark:text-white text-sm">{comment.user}</h4>
                <span className="text-xs text-gray-500 dark:text-gray-400">{comment.timestamp}</span>
              </div>
              <p className="mt-1 dark:text-gray-300 text-sm">{comment.text}</p>
              
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={() => handleLikeComment(postId, comment.id, isReply, parentCommentId)}
                  className="flex items-center space-x-1 text-gray-500 hover:text-rose-500 dark:text-gray-400"
                >
                  <ThumbsUp className={`w-4 h-4 ${comment.isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span className="text-xs">{comment.likes}</span>
                </button>
                
                {!isReply && (
                  <button
                    onClick={() => {
                      setReplyingTo(comment)
                      setShowReplyCommentInput(comment.id)
                      setCommentText(`@${comment.user} `)
                    }}
                    className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 dark:text-gray-400 text-xs"
                  >
                    <Reply className="w-3 h-3" />
                    <span>Reply</span>
                  </button>
                )}
                
                {!isReply && (
                  <button
                    onClick={() => handleCommentOptions(comment.id)}
                    className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              {/* Comment Options Dropdown */}
              {showCommentOptions === comment.id && (
                <div className="absolute bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 mt-2 z-10 w-48">
                  <button
                    onClick={() => handleReportComment(comment.id)}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
                  >
                    <Flag className="w-4 h-4" />
                    <span>Report</span>
                  </button>
                  <button
                    onClick={() => handleHideComment(comment.id)}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
                  >
                    <EyeOff className="w-4 h-4" />
                    <span>Hide</span>
                  </button>
                  {comment.user === user?.name && (
                    <button
                      onClick={() => handleDeleteComment(postId, comment.id)}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  )}
                </div>
              )}
              
              {/* Reply Input */}
              {showReplyCommentInput === comment.id && !isReply && (
                <div className="mt-3 ml-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddReply(postId, comment.id)}
                      placeholder="Write a reply..."
                      className="flex-1 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 dark:text-white rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                      autoFocus
                    />
                    <button
                      onClick={() => handleAddReply(postId, comment.id)}
                      disabled={!replyText.trim()}
                      className={`p-1.5 rounded-full ${replyText.trim() ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'}`}
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
              
              {/* Replies */}
           {!isReply && (comment.replies || []).length > 0 && (  // FIXED: Add fallback to empty array
  <div className="mt-3">
    {!expandedReplies[comment.id] ? (
      <button
        onClick={() => toggleReplies(comment.id)}
        className="flex items-center text-xs text-gray-500 dark:text-gray-400 hover:text-blue-500"
      >
        <ChevronDown className="w-3 h-3 mr-1" />
        <span>View {(comment.replies || []).length} {(comment.replies || []).length === 1 ? 'reply' : 'replies'}</span> 
      </button>
    ) : (
      <>
        <button
          onClick={() => toggleReplies(comment.id)}
          className="flex items-center text-xs text-gray-500 dark:text-gray-400 hover:text-blue-500 mb-2"
        >
          <ChevronUp className="w-3 h-3 mr-1" />
          <span>Hide replies</span>
        </button>
        <div className="space-y-3 border-l-2 border-gray-200 dark:border-gray-700 pl-3">
          {(comment.replies || []).map(reply => renderComment(reply, postId, true, comment.id))}  
        </div>
      </>
    )}
  </div>
)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div 
      ref={containerRef}
      className="h-[100vh] sm:h-screen overflow-y-auto snap-y snap-mandatory scrollbar-hide relative"
      onClick={handleScreenClick}
    >
      {/* Comments Modal (Mobile: bottom sheet, Desktop: side panel) */}
      {showComments && currentPostId && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className={`absolute inset-0 bg-black transition-opacity duration-300 ${
              isClosingComments ? 'opacity-0' : 'opacity-80'
            }`}
            onClick={closeComments}
          />
          
          {/* Comments Panel */}
          <div
            ref={commentsRef}
            className={`absolute bg-white dark:bg-gray-900 flex flex-col transition-all duration-300 ${
              isClosingComments 
                ? 'translate-y-full sm:translate-x-full' 
                : 'translate-y-0 sm:translate-x-0'
            } ${
              window.innerWidth < 640 
                ? 'bottom-0 left-0 right-0 h-[80vh] max-h-[80vh] rounded-t-3xl' 
                : 'right-0 top-0 h-full w-full max-w-md'
            }`}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Mobile: Draggable header */}
            {window.innerWidth < 640 && (
              <div className="pt-3 pb-2 flex justify-center">
                <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              </div>
            )}
            
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
              <h2 className="text-xl font-bold dark:text-white">Comments</h2>
              <button
                onClick={closeComments}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              >
                {window.innerWidth < 640 ? (
                  <ChevronDown className="w-5 h-5 dark:text-white" />
                ) : (
                  <X className="w-5 h-5 dark:text-white" />
                )}
              </button>
            </div>
            
         {/* In the comments modal - around line 680+ */}
<div className="px-4 py-3 border-b dark:border-gray-700">
  <p className="font-semibold dark:text-white">
    {(comments[currentPostId] || []).reduce((total, comment) => 
      total + 1 + (comment.replies || []).length, 0
    )} comments
  </p>
</div>
            
            {/* Comments List - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {comments[currentPostId]?.map(comment => renderComment(comment, currentPostId))}
              
              {/* Load More Comments Button */}
              {hasMoreComments[currentPostId] && (
                <div className="text-center pt-4">
                  <button
                    onClick={loadMoreComments}
                    disabled={loadingComments}
                    className="px-4 py-2 text-sm text-blue-500 hover:text-blue-600 disabled:opacity-50"
                  >
                    {loadingComments ? 'Loading...' : 'View more comments'}
                  </button>
                </div>
              )}
            </div>
            
            {/* Replying To Indicator */}
            {replyingTo && (
              <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border-t dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Reply className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Replying to <span className="font-semibold dark:text-white">{replyingTo.user}</span>
                  </span>
                </div>
                <button
                  onClick={() => setReplyingTo(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            
            {/* Comment Input */}
            <div className="p-4 border-t dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <img
                  src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'User'}`}
                  alt="Your avatar"
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment(currentPostId)}
                    placeholder={replyingTo ? `Reply to ${replyingTo.user}...` : "Add a comment..."}
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                  />
                  <button
                    onClick={() => handleAddComment(currentPostId)}
                    disabled={!commentText.trim()}
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full ${
                      commentText.trim() 
                        ? 'bg-blue-500 text-white hover:bg-blue-600' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Updated Share Sheet */}
      {showShareSheet && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/80"
            onClick={() => setShowShareSheet(false)}
          />
          <div 
            className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-6 dark:text-white text-center">Share</h3>
            
            <div className="grid grid-cols-4 gap-4 mb-6">
              {getShareOptions().map((option) => (
                <button 
                  key={option.id}
                  onClick={() => handleShareAction(option.id)}
                  className="flex flex-col items-center space-y-2"
                >
                  <div className={`w-16 h-16 rounded-full ${option.color} flex items-center justify-center transition-transform hover:scale-105`}>
                    <option.icon className={`w-8 h-8 ${
                      option.id === 'native-share' ? 'text-blue-600 dark:text-blue-400' :
                      option.id === 'copy' ? 'text-purple-600 dark:text-purple-400' :
                      option.id === 'download' ? 'text-green-600 dark:text-green-400' :
                      option.id === 'facebook' ? 'text-blue-600 dark:text-blue-400' :
                      option.id === 'twitter' ? 'text-sky-500 dark:text-sky-400' :
                      option.id === 'whatsapp' ? 'text-green-600 dark:text-green-400' :
                      option.id === 'email' ? 'text-red-600 dark:text-red-400' :
                      'text-gray-600 dark:text-gray-400'
                    }`} />
                  </div>
                  <span className="text-sm dark:text-white text-center px-1">{option.label}</span>
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => setShowShareSheet(false)}
              className="w-full py-3 mt-4 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-full font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {showSearch && (
        <div className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-sm p-4">
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
                  <button onClick={(e) => togglePlayPause(item.id, e)} className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                    {videoStates[item.id] ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white" />}
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); toggleGlobalMute(); }} className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                    {globalMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
                  </button>
                </div>
              )}
              
              {/* Media Container */}
              <div className="absolute inset-0 flex transition-transform duration-300" style={{ transform: `translateX(-${currentIdx * 100}%)` }}>
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
                      />
                    ) : (
                      <img src={media.url} alt={`${item.service} - ${mediaIndex + 1}`} className="absolute inset-0 w-full h-full object-contain" onClick={(e) => e.stopPropagation()} />
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
                        setCurrentMediaIndex(prev => ({ ...prev, [item.id]: index }))
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIdx ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/60'}`}
                    />
                  ))}
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/0 to-transparent pointer-events-none z-0" />
              <div className="relative h-full flex justify-between items-end sm:pb-20 px-4">
                <div className="max-w-[55%] sm:max-w-[75%] mb-6">
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <img src={item.provider.avatar} alt={item.provider.name} className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border-2 border-white/80" onClick={(e) => e.stopPropagation()} />
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
                          <div className="top-4 left-4 z-30">
                            <button onClick={(e) => { e.stopPropagation(); handleBook(item.id); }} className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-1 px-2 sm:py-2 sm:px-3 rounded-full transition-all duration-300 hover:shadow-lg active:scale-95 flex items-center justify-center shadow-md">
                              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                              <span className="text-xs sm:text-sm">Book Now</span>
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
                        {item.price && <div className="text-base sm:text-2xl font-bold text-white">{item.price}</div>}
                      </div>
                    )}
                    <p className="text-white/80 mb-4 text-xs sm:text-sm leading-relaxed max-w-full">Professional service with guaranteed satisfaction. Book now for an amazing experience!</p>
                  </div>
                </div>
                
                {/* Right Side Actions */}
                <div className="flex flex-col items-center space-y-5 mb-6">
                  <button onClick={(e) => { e.stopPropagation(); handleLike(item.id); }} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${likedPosts.includes(item.id) ? 'bg-rose-500/20' : 'bg-white/10'} backdrop-blur-sm transition-all hover:scale-110`}>
                      <Heart className={`w-5 h-5 ${likedPosts.includes(item.id) ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
                    </div>
                    <span className="text-white text-xs font-medium">{item.likes + (likedPosts.includes(item.id) ? 1 : 0)}</span>
                  </button>
                  
               {/* In the feed items map - around line 1250+ */}
<button className="flex flex-col items-center" onClick={(e) => { e.stopPropagation(); openComments(item.id); }}>
  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-1 transition-all hover:scale-110">
    <MessageCircle className="w-5 h-5 text-white" />
  </div>
  <span className="text-white text-xs font-medium">
    {(comments[item.id] || []).reduce((total, comment) => 
      total + 1 + (comment.replies || []).length, 0
    )}
  </span>
</button>
                  
                  <button onClick={(e) => { e.stopPropagation(); openShareSheet(item.id); }} className="flex flex-col items-center">
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