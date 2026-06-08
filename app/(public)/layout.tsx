import Navbar from '@/components/ui/Navbar'
import CustomCursor from '@/components/ui/CustomCursor'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Grain texture overlay */}
      <div className="grain-overlay" aria-hidden="true" />
      <CustomCursor />
      <Navbar />
      {children}
    </>
  )
}
