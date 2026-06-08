'use client'

import { useState, useEffect, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { projectSchema, ProjectInput } from '@/lib/validations'
import { Pencil, Trash2, Plus, X, Star, StarOff } from 'lucide-react'
import Image from 'next/image'

interface Project {
  _id: string
  title: string
  shortDesc: string
  fullDesc?: string
  techStack: string[]
  category: string
  githubUrl?: string
  liveUrl?: string
  thumbnail?: string
  cloudinaryId?: string
  featured: boolean
  order: number
}

const CATEGORIES = ['Frontend', 'Backend', 'Full-Stack'] as const

function TagInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [input, setInput] = useState('')

  const addTag = () => {
    const tag = input.trim()
    if (tag && !value.includes(tag)) {
      onChange([...value, tag])
    }
    setInput('')
  }

  const removeTag = (tag: string) => onChange(value.filter((t) => t !== tag))

  return (
    <div className="flex flex-wrap gap-2 p-3 bg-white/5 border border-white/10 rounded-xl min-h-[52px]">
      {value.map((tag) => (
        <span key={tag} className="flex items-center gap-1 px-2.5 py-1 text-xs font-dm-mono text-cyan border border-cyan/20 bg-cyan/5 rounded-lg">
          {tag}
          <button type="button" onClick={() => removeTag(tag)} className="text-white/40 hover:text-red-400">
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') { e.preventDefault(); addTag() }
          if (e.key === ',' ) { e.preventDefault(); addTag() }
        }}
        placeholder="Add tag, press Enter"
        className="flex-1 min-w-[120px] bg-transparent text-white text-sm placeholder-white/20 focus:outline-none"
      />
    </div>
  )
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [previewUrl, setPreviewUrl] = useState('')

  const { register, handleSubmit, reset, control, setValue, watch, formState: { errors } } = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: { techStack: [], featured: false, order: 0, category: 'Full-Stack' },
  })

  const fetchProjects = useCallback(async () => {
    const res = await fetch('/api/projects')
    const data = await res.json()
    setProjects(data)
    setLoading(false)
  }, [])

  useEffect(() => { fetchProjects() }, [fetchProjects])

  const openAdd = () => {
    setEditingProject(null)
    reset({ techStack: [], featured: false, order: projects.length + 1, category: 'Full-Stack' })
    setPreviewUrl('')
    setModalOpen(true)
  }

  const openEdit = (p: Project) => {
    setEditingProject(p)
    reset({
      title: p.title,
      shortDesc: p.shortDesc,
      fullDesc: p.fullDesc ?? '',
      techStack: p.techStack,
      category: p.category as 'Frontend' | 'Backend' | 'Full-Stack',
      githubUrl: p.githubUrl ?? '',
      liveUrl: p.liveUrl ?? '',
      thumbnail: p.thumbnail ?? '',
      cloudinaryId: p.cloudinaryId ?? '',
      featured: p.featured,
      order: p.order,
    })
    setPreviewUrl(p.thumbnail ?? '')
    setModalOpen(true)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingImage(true)
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const { url, publicId } = await res.json()
      setValue('thumbnail', url)
      setValue('cloudinaryId', publicId)
      setPreviewUrl(url)
    } catch {
      alert('Image upload failed')
    } finally {
      setUploadingImage(false)
    }
  }

  const onSubmit = async (data: ProjectInput) => {
    setSaving(true)
    const url = editingProject ? `/api/projects/${editingProject._id}` : '/api/projects'
    const method = editingProject ? 'PUT' : 'POST'
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        await fetchProjects()
        setModalOpen(false)
      } else {
        alert('Failed to save project')
      }
    } catch {
      alert('Network error')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setProjects((prev) => prev.filter((p) => p._id !== id))
      setDeleteConfirm(null)
    } else {
      alert('Delete failed')
    }
  }

  const techStack = watch('techStack') ?? []

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-space font-bold text-white">Projects</h1>
          <p className="text-white/40 font-inter text-sm mt-1">{projects.length} total</p>
        </div>
        <button
          id="add-project-btn"
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-cyan text-space font-space text-sm font-medium rounded-xl hover:shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {/* Projects Table */}
      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="glass-card p-4 h-16 animate-pulse" />)}
        </div>
      ) : projects.length === 0 ? (
        <div className="glass-card p-16 text-center text-white/30 font-inter">
          No projects yet. Add your first one!
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-4 py-3 text-white/40 font-dm-mono text-xs">Project</th>
                  <th className="text-left px-4 py-3 text-white/40 font-dm-mono text-xs hidden md:table-cell">Category</th>
                  <th className="text-left px-4 py-3 text-white/40 font-dm-mono text-xs hidden lg:table-cell">Tech Stack</th>
                  <th className="text-left px-4 py-3 text-white/40 font-dm-mono text-xs">Featured</th>
                  <th className="text-right px-4 py-3 text-white/40 font-dm-mono text-xs">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p._id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {p.thumbnail ? (
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/5 shrink-0 relative">
                            <Image src={p.thumbnail} alt={p.title} fill className="object-cover" sizes="40px" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center text-cyan text-sm font-space font-bold shrink-0">
                            {p.title.charAt(0)}
                          </div>
                        )}
                        <div>
                          <p className="font-space text-white text-sm">{p.title}</p>
                          <p className="font-inter text-white/30 text-xs truncate max-w-[200px]">{p.shortDesc}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className={`text-xs font-dm-mono px-2 py-1 rounded-lg border ${
                        p.category === 'Full-Stack' ? 'text-cyan border-cyan/20 bg-cyan/5' :
                        p.category === 'Frontend' ? 'text-violet border-violet/20 bg-violet/5' :
                        'text-amber-400 border-amber-400/20 bg-amber-400/5'
                      }`}>{p.category}</span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {p.techStack.slice(0, 3).map(t => (
                          <span key={t} className="text-[10px] font-dm-mono text-white/40 border border-white/10 px-1.5 py-0.5 rounded">{t}</span>
                        ))}
                        {p.techStack.length > 3 && <span className="text-[10px] text-white/25">+{p.techStack.length - 3}</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {p.featured ? (
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ) : (
                        <StarOff className="w-4 h-4 text-white/20" />
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(p)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-cyan hover:bg-cyan/10 transition-all"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(p._id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0c1020] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h2 className="font-space font-bold text-white text-lg">
                {editingProject ? 'Edit Project' : 'Add Project'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-white/40 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-white/50 font-dm-mono text-xs mb-1.5">Title *</label>
                  <input {...register('title')} className="admin-input" placeholder="Project title" />
                  {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-white/50 font-dm-mono text-xs mb-1.5">Short Description * (max 120 chars)</label>
                  <input {...register('shortDesc')} maxLength={120} className="admin-input" placeholder="Brief description for card" />
                  {errors.shortDesc && <p className="text-red-400 text-xs mt-1">{errors.shortDesc.message}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-white/50 font-dm-mono text-xs mb-1.5">Full Description</label>
                  <textarea {...register('fullDesc')} rows={3} className="admin-input resize-none" placeholder="Detailed description..." />
                </div>

                <div>
                  <label className="block text-white/50 font-dm-mono text-xs mb-1.5">Category *</label>
                  <select {...register('category')} className="admin-input">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category.message}</p>}
                </div>

                <div>
                  <label className="block text-white/50 font-dm-mono text-xs mb-1.5">Order</label>
                  <input {...register('order', { valueAsNumber: true })} type="number" className="admin-input" placeholder="0" />
                </div>

                <div>
                  <label className="block text-white/50 font-dm-mono text-xs mb-1.5">GitHub URL</label>
                  <input {...register('githubUrl')} className="admin-input" placeholder="https://github.com/..." />
                </div>

                <div>
                  <label className="block text-white/50 font-dm-mono text-xs mb-1.5">Live URL</label>
                  <input {...register('liveUrl')} className="admin-input" placeholder="https://..." />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-white/50 font-dm-mono text-xs mb-1.5">Tech Stack (press Enter to add)</label>
                  <Controller
                    name="techStack"
                    control={control}
                    render={({ field }) => (
                      <TagInput value={field.value ?? []} onChange={field.onChange} />
                    )}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-white/50 font-dm-mono text-xs mb-1.5">Project Image</label>
                  <div className="flex gap-3 items-start">
                    <label className="flex-1 flex flex-col items-center justify-center h-32 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-cyan/30 transition-colors bg-white/3">
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      {uploadingImage ? (
                        <p className="text-white/40 text-sm">Uploading...</p>
                      ) : previewUrl ? (
                        <p className="text-cyan text-xs">Click to change image</p>
                      ) : (
                        <>
                          <Plus className="w-6 h-6 text-white/30 mb-1" />
                          <p className="text-white/30 text-xs">Upload image</p>
                        </>
                      )}
                    </label>
                    {previewUrl && (
                      <div className="w-32 h-32 rounded-xl overflow-hidden border border-white/10 shrink-0 relative">
                        <Image src={previewUrl} alt="Preview" fill className="object-cover" sizes="128px" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2 flex items-center gap-3">
                  <input
                    {...register('featured')}
                    id="featured-toggle"
                    type="checkbox"
                    className="w-4 h-4 accent-[#00F5FF]"
                  />
                  <label htmlFor="featured-toggle" className="text-white/70 font-space text-sm cursor-pointer">
                    Featured Project
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-3 rounded-xl font-space text-sm text-white/50 border border-white/10 hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-3 rounded-xl font-space text-sm text-space bg-cyan disabled:opacity-60 hover:shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all"
                >
                  {saving ? 'Saving...' : editingProject ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0c1020] border border-white/10 rounded-2xl p-6 max-w-sm w-full">
            <h3 className="font-space font-bold text-white text-lg mb-2">Delete Project?</h3>
            <p className="text-white/50 font-inter text-sm mb-6">
              This will permanently delete the project and its image from Cloudinary.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 rounded-xl font-space text-sm text-white/50 border border-white/10 hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-2.5 rounded-xl font-space text-sm text-white bg-red-500/80 hover:bg-red-500 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .admin-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 12px;
          padding: 10px 14px;
          color: white;
          font-size: 0.875rem;
          transition: all 0.2s;
        }
        .admin-input:focus {
          outline: none;
          border-color: rgba(0,245,255,0.4);
          background: rgba(0,245,255,0.03);
        }
        .admin-input::placeholder { color: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  )
}
