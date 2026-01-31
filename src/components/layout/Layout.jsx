// src/components/layout/Layout.jsx
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import BottomNav from './BottomNav'

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      <Navbar />
      <main className="pb-16">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}