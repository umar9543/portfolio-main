import { connectDB } from '@/lib/db'
import { Project } from '@/models/Project'
import { Message } from '@/models/Message'
import Link from 'next/link'
import { FolderKanban, MessageSquare, Star, Mail } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  await connectDB()

  const [totalProjects, unreadMessages, featuredProjects, recentMessages] = await Promise.all([
    Project.countDocuments(),
    Message.countDocuments({ read: false }),
    Project.countDocuments({ featured: true }),
    Message.find().sort({ createdAt: -1 }).limit(3).lean(),
  ])

  const stats = [
    {
      label: 'Total Projects',
      value: totalProjects,
      icon: FolderKanban,
      href: '/admin/projects',
      color: 'cyan',
    },
    {
      label: 'Unread Messages',
      value: unreadMessages,
      icon: MessageSquare,
      href: '/admin/messages',
      color: 'violet',
    },
    {
      label: 'Featured Projects',
      value: featuredProjects,
      icon: Star,
      href: '/admin/projects',
      color: 'cyan',
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-space font-bold text-white">Dashboard</h1>
        <p className="text-white/40 font-inter text-sm mt-1">Portfolio overview</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        {stats.map(({ label, value, icon: Icon, href, color }) => (
          <Link
            key={label}
            href={href}
            className="glass-card p-6 flex items-center gap-4 hover:border-cyan/20 transition-all group"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              color === 'cyan' ? 'bg-cyan/10 text-cyan' : 'bg-violet/10 text-violet'
            } group-hover:scale-110 transition-transform`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-3xl font-space font-bold text-white">{value}</div>
              <div className="text-white/40 font-inter text-xs">{label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Messages */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-space font-semibold text-white">Recent Messages</h2>
          <Link href="/admin/messages" className="text-cyan text-sm font-space hover:text-cyan/80">
            View all →
          </Link>
        </div>

        <div className="space-y-3">
          {recentMessages.length === 0 ? (
            <div className="glass-card p-8 text-center text-white/30 font-inter text-sm">
              No messages yet.
            </div>
          ) : (
            recentMessages.map((msg) => (
              <div
                key={msg._id.toString()}
                className={`glass-card p-4 flex items-start gap-4 ${!msg.read ? 'border-l-2 border-l-cyan' : ''}`}
              >
                <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white/40 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-space font-medium text-white text-sm truncate">{msg.name}</span>
                    {!msg.read && (
                      <span className="text-[10px] font-dm-mono text-cyan border border-cyan/30 bg-cyan/5 px-1.5 py-0.5 rounded shrink-0">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="font-inter text-xs text-white/40 truncate">{msg.subject}</p>
                  <p className="font-inter text-xs text-white/30 mt-0.5">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
