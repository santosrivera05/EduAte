import { Hamburger } from './Icons'

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'play', label: 'Play' },
  { id: 'learn', label: 'Learn' },
  { id: 'menu', label: 'My Menu' },
]
export const INFO_LINKS = [
  { id: 'help', label: 'Help' },
  { id: 'parents', label: 'Parents' },
  { id: 'settings', label: 'Settings' },
]

/** Menu links styled like the home-screen sidebar. */
export function SideLinks({ onInfo, onNavigate, showNav = false }) {
  return (
    <nav className="flex flex-col gap-[1.2cqw] font-spartan text-[3cqw] text-white">
      {showNav &&
        NAV.map((l) => (
          <button
            key={l.id}
            onClick={() => onNavigate(l.id)}
            className="text-left transition hover:font-bold"
          >
            {l.label}
          </button>
        ))}
      {showNav && <hr className="my-[0.4cqw] border-white/60" />}
      {INFO_LINKS.map((l) => (
        <button key={l.id} onClick={() => onInfo(l.id)} className="text-left transition hover:font-bold">
          {l.label}
        </button>
      ))}
    </nav>
  )
}

/** Slide-out drawer opened from the hamburger on every screen except Home. */
export function Drawer({ open, onClose, onInfo, onNavigate }) {
  return (
    <div className={`absolute inset-0 z-40 ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div
        className={`absolute inset-0 bg-black/25 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-[20cqw] bg-sidebar px-[1.6cqw] py-[1.4cqw] shadow-xl transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button onClick={onClose} aria-label="Close menu" className="mb-[4cqw] block">
          <Hamburger className="w-[4cqw]" />
        </button>
        <SideLinks
          showNav
          onNavigate={(id) => {
            onClose()
            onNavigate(id)
          }}
          onInfo={(id) => {
            onClose()
            onInfo(id)
          }}
        />
      </aside>
    </div>
  )
}

export function MenuButton({ onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      aria-label="Open menu"
      className={`absolute right-[2.2cqw] top-[2.2cqw] z-30 transition hover:scale-105 ${className}`}
    >
      <Hamburger className="w-[4cqw] drop-shadow-sm" />
    </button>
  )
}
