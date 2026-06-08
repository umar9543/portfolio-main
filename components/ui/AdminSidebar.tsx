'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, FolderKanban, MessageSquare, LogOut, X } from 'lucide-react'

const NAV_ITEMS = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
]

interface AdminSidebarProps {
  onClose?: () => void
}

export default function AdminSidebar({ onClose }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <aside className="flex flex-col h-full bg-space border-r border-white/5 w-64 py-6 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 px-2">
        <Link href="/admin/dashboard" className="font-space font-bold text-lg text-white">
          M<span className="text-cyan">.</span>Admin
        </Link>
        {onClose && (
          <button onClick={onClose} className="text-white/40 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-space text-sm transition-all duration-200 ${
                active
                  ? 'bg-cyan/10 text-cyan border border-cyan/20'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="pt-4 border-t border-white/5">
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 text-white/40 hover:text-cyan text-sm font-space transition-colors mb-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          View Portfolio
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-red-400/70 hover:text-red-400 hover:bg-red-400/5 rounded-xl text-sm font-space transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  )
}
