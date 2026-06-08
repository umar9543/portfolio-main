'use client'

import { useState, useEffect, useCallback } from 'react'
import { Mail, MailOpen, ChevronDown, ChevronUp } from 'lucide-react'

interface Message {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt: string
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const fetchMessages = useCallback(async () => {
    const url = filter === 'unread' ? '/api/messages?unread=true' : '/api/messages'
    const res = await fetch(url)
    const data = await res.json()
    setMessages(data)
    setLoading(false)
  }, [filter])

  useEffect(() => { fetchMessages() }, [fetchMessages])

  const toggleRead = async (id: string, currentRead: boolean) => {
    const res = await fetch(`/api/messages/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read: !currentRead }),
    })
    if (res.ok) {
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, read: !currentRead } : m))
      )
    }
  }

  const unreadCount = messages.filter((m) => !m.read).length

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-space font-bold text-white">Messages</h1>
          <p className="text-white/40 font-inter text-sm mt-1">
            {unreadCount > 0 ? (
              <span className="text-cyan">{unreadCount} unread</span>
            ) : (
              'All caught up!'
            )}
          </p>
        </div>
        <div className="flex gap-2">
          {(['all', 'unread'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-space text-sm transition-all ${
                filter === f
                  ? 'bg-cyan text-space'
                  : 'border border-white/10 text-white/50 hover:bg-white/5'
              }`}
            >
              {f === 'all' ? 'All' : 'Unread'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="glass-card p-4 h-20 animate-pulse" />)}
        </div>
      ) : messages.length === 0 ? (
        <div className="glass-card p-16 text-center text-white/30 font-inter">
          No messages found.
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`glass-card overflow-hidden transition-all duration-300 ${
                !msg.read ? 'border-l-2 border-l-cyan' : ''
              }`}
            >
              {/* Header row */}
              <div
                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-white/2"
                onClick={() => setExpanded(expanded === msg._id ? null : msg._id)}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  !msg.read ? 'bg-cyan/10 text-cyan' : 'bg-white/5 text-white/40'
                }`}>
                  {msg.read ? <MailOpen className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-space font-medium text-white text-sm">{msg.name}</span>
                    {!msg.read && (
                      <span className="text-[10px] font-dm-mono text-cyan border border-cyan/30 bg-cyan/5 px-1.5 py-0.5 rounded shrink-0">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="font-inter text-white/50 text-xs truncate">{msg.subject}</p>
                </div>

                <div className="hidden sm:flex flex-col items-end gap-1 shrink-0">
                  <p className="font-dm-mono text-white/30 text-xs">
                    {new Date(msg.createdAt).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric',
                    })}
                  </p>
                  <p className="font-inter text-white/25 text-xs">{msg.email}</p>
                </div>

                <div className="text-white/30">
                  {expanded === msg._id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {/* Expanded content */}
              {expanded === msg._id && (
                <div className="border-t border-white/5 px-4 pb-4 pt-3">
                  <div className="bg-white/3 rounded-xl p-4 mb-4">
                    <p className="font-inter text-white/70 text-sm leading-relaxed whitespace-pre-wrap">
                      {msg.message}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                      className="flex items-center gap-1.5 text-cyan font-space text-sm hover:text-cyan/80 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Reply via email
                    </a>
                    <button
                      onClick={() => toggleRead(msg._id, msg.read)}
                      className="flex items-center gap-1.5 text-white/40 hover:text-white font-space text-sm transition-colors"
                    >
                      {msg.read ? (
                        <><Mail className="w-3.5 h-3.5" /> Mark unread</>
                      ) : (
                        <><MailOpen className="w-3.5 h-3.5" /> Mark as read</>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
