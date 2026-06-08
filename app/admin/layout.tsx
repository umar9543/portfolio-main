import type { Metadata } from 'next'
import AdminShell from './AdminShell'

export const metadata: Metadata = {
  title: 'Admin Panel — Muhammad Umar Portfolio',
  robots: 'noindex, nofollow',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Force cursor visible on all admin pages — overrides global cursor:none from portfolio CSS */}
      <style>{`
        html, body, *, *::before, *::after {
          cursor: auto !important;
        }
      `}</style>
      <AdminShell>{children}</AdminShell>
    </>
  )
}
