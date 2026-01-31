
// src/pages/MessagesPage.jsx
import { Search, Send, Check, CheckCheck, Image as ImageIcon, Paperclip } from 'lucide-react'
import { useState } from 'react'

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState(1)
  const [message, setMessage] = useState('')

  const conversations = [
    {
      id: 1,
      user: {
        name: 'Alex Beauty Studio',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        isOnline: true
      },
      lastMessage: 'Looking forward to seeing you tomorrow!',
      time: '10:30 AM',
      unread: 2,
      service: 'Hair Styling Booking'
    },
    {
      id: 2,
      user: {
        name: 'Sparkle Cleaners',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sparkle',
        isOnline: false
      },
      lastMessage: 'Your cleaning is scheduled for Friday',
      time: 'Yesterday',
      unread: 0,
      service: 'Home Cleaning'
    },
    {
      id: 3,
      user: {
        name: 'FitPro Training',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FitPro',
        isOnline: true
      },
      lastMessage: 'Great session today! See you next week?',
      time: '2 days ago',
      unread: 1,
      service: 'Personal Training'
    }
  ]

  const messages = [
    { id: 1, text: 'Hi! I\'m interested in booking a hair styling session', time: '10:15 AM', sender: 'me' },
    { id: 2, text: 'Hi there! I\'d love to help. When were you thinking?', time: '10:20 AM', sender: 'them' },
    { id: 3, text: 'How about tomorrow afternoon?', time: '10:25 AM', sender: 'me' },
    { id: 4, text: '2 PM works perfectly! I have an opening then', time: '10:28 AM', sender: 'them' },
    { id: 5, text: 'Looking forward to seeing you tomorrow!', time: '10:30 AM', sender: 'them' },
  ]

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim()) {
      console.log('Sending:', message)
      setMessage('')
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-neutral-600">Chat with service providers</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex h-[600px]">
            {/* Conversations List */}
            <div className="w-full md:w-1/3 border-r border-neutral-200">
              <div className="p-4 border-b border-neutral-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full pl-10 pr-4 py-2 bg-neutral-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-100"
                  />
                </div>
              </div>

              <div className="overflow-y-auto h-[calc(600px-73px)]">
                {conversations.map(conv => (
                  <button
                    key={conv.id}
                    onClick={() => setActiveChat(conv.id)}
                    className={`w-full text-left p-4 border-b border-neutral-100 hover:bg-neutral-50 transition-colors ${activeChat === conv.id ? 'bg-primary-50' : ''}`}
                  >
                    <div className="flex items-center">
                      <div className="relative">
                        <img
                          src={conv.user.avatar}
                          alt={conv.user.name}
                          className="w-12 h-12 rounded-full"
                        />
                        {conv.user.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-neutral-900">{conv.user.name}</h4>
                          <span className="text-xs text-neutral-500">{conv.time}</span>
                        </div>
                        <p className="text-sm text-neutral-600 truncate">{conv.lastMessage}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-primary-600 font-medium">{conv.service}</span>
                          {conv.unread > 0 && (
                            <span className="bg-primary-500 text-white text-xs px-2 py-0.5 rounded-full">
                              {conv.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="hidden md:flex md:w-2/3 flex-col">
              {activeChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={conversations.find(c => c.id === activeChat)?.user.avatar}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="ml-3">
                        <h3 className="font-bold">
                          {conversations.find(c => c.id === activeChat)?.user.name}
                        </h3>
                        <p className="text-sm text-neutral-600">
                          {conversations.find(c => c.id === activeChat)?.user.isOnline ? 'Online' : 'Offline'}
                        </p>
                      </div>
                    </div>
                    <button className="text-primary-600 font-medium">
                      View Booking
                    </button>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map(msg => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.sender === 'me' ? 'bg-primary-500 text-white rounded-br-none' : 'bg-neutral-100 text-neutral-900 rounded-bl-none'}`}>
                          <p>{msg.text}</p>
                          <div className={`text-xs mt-1 flex items-center ${msg.sender === 'me' ? 'text-primary-200' : 'text-neutral-500'}`}>
                            <span>{msg.time}</span>
                            {msg.sender === 'me' && (
                              <CheckCheck className="w-3 h-3 ml-1" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <form onSubmit={handleSendMessage} className="p-4 border-t border-neutral-200">
                    <div className="flex items-center space-x-2">
                      <button type="button" className="p-2 text-neutral-500 hover:text-neutral-700">
                        <Paperclip className="w-5 h-5" />
                      </button>
                      <button type="button" className="p-2 text-neutral-500 hover:text-neutral-700">
                        <ImageIcon className="w-5 h-5" />
                      </button>
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 bg-neutral-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-100"
                      />
                      <button
                        type="submit"
                        className="p-2 bg-primary-500 text-white rounded-full hover:bg-primary-600"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-center">
                  <div>
                    <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-neutral-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Select a conversation</h3>
                    <p className="text-neutral-600">Choose a chat to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Chat View */}
          <div className="md:hidden">
            {activeChat ? (
              <div>
                <div className="p-4 border-b border-neutral-200 flex items-center">
                  <button onClick={() => setActiveChat(null)} className="mr-3">
                    ←
                  </button>
                  <div className="flex items-center">
                    <img
                      src={conversations.find(c => c.id === activeChat)?.user.avatar}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="ml-3">
                      <h3 className="font-bold">
                        {conversations.find(c => c.id === activeChat)?.user.name}
                      </h3>
                      <p className="text-sm text-neutral-600">
                        {conversations.find(c => c.id === activeChat)?.user.isOnline ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-4 h-96 overflow-y-auto">
                  {messages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs px-4 py-2 rounded-2xl ${msg.sender === 'me' ? 'bg-primary-500 text-white rounded-br-none' : 'bg-neutral-100 text-neutral-900 rounded-bl-none'}`}>
                        <p>{msg.text}</p>
                        <div className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-primary-200' : 'text-neutral-500'}`}>
                          {msg.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="p-4 border-t border-neutral-200">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type message..."
                      className="flex-1 px-4 py-2 bg-neutral-100 rounded-full focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="p-2 bg-primary-500 text-white rounded-full"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">No conversation selected</h3>
                <p className="text-neutral-600">Choose a chat from the list above</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
