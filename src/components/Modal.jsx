import { useEffect } from 'react'

export default function Modal({ onClose, children, className = '', label }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="absolute inset-0 z-50 flex animate-fade items-center justify-center bg-black/35 p-[3cqw]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      <div
        className={`relative max-h-full animate-rise overflow-hidden rounded-[2.5cqw] bg-cream shadow-2xl ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export function CloseButton({ onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      aria-label="Close"
      className={`absolute right-[1.4cqw] top-[1.4cqw] z-10 flex h-[4cqw] w-[4cqw] items-center justify-center rounded-full bg-black/10 text-[2.2cqw] font-bold text-ink/70 transition hover:bg-black/20 ${className}`}
    >
      ✕
    </button>
  )
}

export function BackButton({ onClick, children = 'Back', className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-[0.6cqw] rounded-full bg-black/10 px-[1.6cqw] py-[0.6cqw] font-spartan text-[1.6cqw] font-semibold text-ink/80 transition hover:bg-black/20 ${className}`}
    >
      <span aria-hidden="true">←</span> {children}
    </button>
  )
}
