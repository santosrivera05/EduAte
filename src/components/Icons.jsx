// Hand-drawn style SVG artwork used across the app.

export function Hamburger({ className = '', color = '#fff' }) {
  return (
    <svg viewBox="0 0 60 50" className={className} aria-hidden="true">
      {[6, 25, 44].map((y) => (
        <rect key={y} x="2" y={y - 3} width="56" height="6" rx="1.5" fill={color} />
      ))}
    </svg>
  )
}

export function Controller({ className = '', accent = '#4381a0', color = '#fbf6e6' }) {
  return (
    <svg viewBox="0 0 100 68" className={className} aria-hidden="true">
      <path
        d="M24 4 H76 C92 4 100 28 99 48 C98 64 86 70 76 60 L68 50 H32 L24 60 C14 70 2 64 1 48 C0 28 8 4 24 4 Z"
        fill={color}
      />
      <rect x="18" y="22" width="20" height="7" rx="3" fill={accent} />
      <rect x="24.5" y="15.5" width="7" height="20" rx="3" fill={accent} />
      <circle cx="68" cy="30" r="5" fill={accent} />
      <circle cx="79" cy="21" r="5" fill={accent} />
    </svg>
  )
}

export function Book({ className = '' }) {
  return (
    <svg viewBox="0 0 120 70" className={className} aria-hidden="true">
      <path d="M4 22 L8 60 Q34 54 60 64 Q86 54 112 60 L116 22 Z" fill="#a597d6" />
      <ellipse cx="60" cy="64" rx="6" ry="4" fill="#9184c9" />
      <path
        d="M10 10 Q34 0 58 10 L58 60 Q34 50 12 56 Z"
        fill="#faf0e2"
        stroke="#d9cbb5"
        strokeWidth="1.5"
      />
      <path
        d="M110 10 Q86 0 62 10 L62 60 Q86 50 108 56 Z"
        fill="#faf0e2"
        stroke="#d9cbb5"
        strokeWidth="1.5"
      />
      <path d="M58 10 Q60 6 62 10 L62 60 Q60 62 58 60 Z" fill="#e7d9c3" />
    </svg>
  )
}

export function MenuCard({ className = '' }) {
  return (
    <svg viewBox="0 0 90 110" className={className} aria-hidden="true">
      <g transform="rotate(-3 45 55)">
        <rect x="8" y="6" width="74" height="98" fill="#f8f0dc" stroke="#6f7fcf" strokeWidth="1.6" />
        <circle cx="45" cy="38" r="22" fill="#fbf5e8" stroke="#3f55b8" strokeWidth="1.8" />
        <path d="M27 52 Q30 44 45 44 Q60 44 63 52 Q56 59 45 59 Q34 59 27 52 Z" fill="#4a64c8" />
        <circle cx="45" cy="34" r="9" fill="#fbf5e8" stroke="#3f55b8" strokeWidth="1.6" />
        <path
          d="M36 31 Q37 22 45 22 Q54 22 54 31 Q50 26 45 28 Q40 25 36 31 Z"
          fill="#3f55b8"
        />
        <circle cx="42" cy="34" r="0.9" fill="#3f55b8" />
        <circle cx="48" cy="34" r="0.9" fill="#3f55b8" />
        <path d="M43 38 q2 1.5 4 0" stroke="#3f55b8" strokeWidth="1" fill="none" strokeLinecap="round" />
        <path d="M22 78 L68 76 M22 85 L68 83" stroke="#4a64c8" strokeWidth="1.8" strokeLinecap="round" />
      </g>
    </svg>
  )
}

export function PizzaLogo({ className = '' }) {
  return (
    <svg viewBox="0 0 100 120" className={className} aria-hidden="true">
      <g stroke="#222" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
        <path
          d="M22 52 Q52 28 84 30 L82 90 Q82 100 76 100 Q72 100 72 94 L72 106 Q72 113 66 113 Q60 113 60 106 L60 88 Z"
          fill="#f6c35b"
        />
        <path d="M14 44 Q44 16 82 20 Q91 22 86 31 Q52 28 22 52 Q12 52 14 44 Z" fill="#d9846a" />
        <path d="M54 66 q-12 -12 0 -20 q10 10 0 20 z" fill="#4caf50" strokeWidth="3" />
        <path d="M56 66 q2 -16 16 -12 q-2 14 -16 12 z" fill="#3e9a43" strokeWidth="3" />
        <path d="M36 54 l4 -2 M70 40 l4 1 M66 78 l2 4 M44 66 l3 3 M76 60 l0 4" strokeWidth="2.5" />
      </g>
    </svg>
  )
}

export function Star({ filled = true, className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 2.5l2.9 6 6.6.8-4.9 4.6 1.3 6.5L12 17.2l-5.9 3.2 1.3-6.5L2.5 9.3l6.6-.8z"
        fill={filled ? '#f6c33b' : 'rgba(0,0,0,0.12)'}
        stroke={filled ? '#d69b16' : 'rgba(0,0,0,0.15)'}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Stars({ count, className = '', starClass = '' }) {
  return (
    <div className={`flex items-center ${className}`} aria-label={`${count} out of 3 stars`}>
      {[1, 2, 3].map((n) => (
        <Star key={n} filled={n <= count} className={starClass} />
      ))}
    </div>
  )
}

/** The "NEW!" starburst sticker from My Menu. */
export function NewBadge({ className = '' }) {
  const pts = []
  for (let i = 0; i < 28; i++) {
    const a = (i / 28) * Math.PI * 2
    const r = i % 2 ? 40 : 48
    pts.push(`${60 + Math.cos(a) * r * 1.25},${50 + Math.sin(a) * r * 0.8}`)
  }
  return (
    <svg viewBox="0 0 120 100" className={className} aria-label="New">
      <polygon points={pts.join(' ')} fill="#f8e46a" stroke="#f3c93a" strokeWidth="2" />
      <text
        x="60"
        y="63"
        textAnchor="middle"
        fontFamily="League Spartan, sans-serif"
        fontWeight="800"
        fontSize="36"
        fill="#e0262b"
        stroke="#9e1a1d"
        strokeWidth="1"
        transform="rotate(-8 60 50)"
      >
        NEW
      </text>
    </svg>
  )
}

/** Speech bubble with a hand-drawn outline; children are drawn on top. */
export function SpeechBubble({ children, className = '' }) {
  return (
    <div className={className || 'relative'}>
      <svg viewBox="0 0 240 200" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        <path
          d="M130 162.6 L184 197 L160 157.3 A112 78 0 1 0 130 162.6 Z"
          fill="#fff"
          stroke="#111"
          strokeWidth="6"
          strokeLinejoin="round"
        />
        <path
          d="M28 60 Q40 22 96 12"
          stroke="#111"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.25"
        />
      </svg>
      <div className="absolute inset-x-[8%] top-[10%] bottom-[22%] flex items-center justify-center text-center">
        {children}
      </div>
    </div>
  )
}

/** The friendly guide kid on the gameplay screen. */
export function GuideKid({ mood = 'happy', className = '' }) {
  const mouth = {
    happy: <path d="M100 79 q10 10 20 0" />,
    think: <path d="M102 82 q8 -3 16 1" />,
    cheer: <path d="M99 77 q11 16 22 0 z" fill="#c0392b" />,
  }[mood]
  const armL = mood === 'cheer' ? 'M80 118 Q58 88 40 58' : 'M80 120 Q56 150 26 160'
  const armR = mood === 'cheer' ? 'M140 118 Q162 88 180 58' : 'M140 120 Q166 146 196 150'
  const handL = mood === 'cheer' ? [40, 58] : [24, 161]
  const handR = mood === 'cheer' ? [180, 58] : [198, 150]
  return (
    <svg viewBox="0 0 220 380" className={className} aria-hidden="true">
      <g strokeLinecap="round" strokeLinejoin="round">
        {/* soft sketch shadow */}
        <ellipse cx="110" cy="356" rx="70" ry="8" fill="#000" opacity="0.08" />
        {/* arms */}
        {[armL, armR].map((d, i) => (
          <g key={i}>
            <path d={d} stroke="#1d1d1d" strokeWidth="13" fill="none" />
            <path d={d} stroke="#fff8ec" strokeWidth="7" fill="none" />
          </g>
        ))}
        {[handL, handR].map(([x, y], i) => (
          <g key={i} stroke="#1d1d1d" strokeWidth="3" fill="#fff8ec">
            <circle cx={x} cy={y} r="8" />
            <path d={`M${x - 6} ${y - 6} l-6 -6 M${x} ${y - 8} l0 -8 M${x + 6} ${y - 6} l6 -6`} fill="none" />
          </g>
        ))}
        {/* legs / pants */}
        <path
          d="M82 200 L74 338 L98 340 L109 238 L120 340 L144 338 L136 200 Z"
          fill="#c9d6cd"
          stroke="#1d1d1d"
          strokeWidth="3"
        />
        <path d="M109 238 L109 214" stroke="#1d1d1d" strokeWidth="2" />
        {/* shoes */}
        <path d="M74 338 q-26 2 -22 14 q28 6 48 -2 l-2 -12 z" fill="#fff" stroke="#1d1d1d" strokeWidth="3" />
        <path d="M144 338 q26 2 22 14 q-28 6 -48 -2 l2 -12 z" fill="#fff" stroke="#1d1d1d" strokeWidth="3" />
        {/* shirt */}
        <path
          d="M80 110 L60 138 L77 150 L85 136 L82 206 L138 206 L135 136 L143 150 L160 138 L140 110 Q110 100 80 110 Z"
          fill="#c5d3c3"
          stroke="#1d1d1d"
          strokeWidth="3"
        />
        <path d="M98 108 q12 10 24 0" stroke="#1d1d1d" strokeWidth="2.5" fill="none" />
        <path d="M100 150 l4 6 M118 172 l3 5" stroke="#1d1d1d" strokeWidth="1.5" opacity="0.4" />
        {/* neck */}
        <path d="M103 92 L103 106 M117 92 L117 106" stroke="#1d1d1d" strokeWidth="3" />
        {/* head */}
        <circle cx="80" cy="64" r="7" fill="#fff8ec" stroke="#1d1d1d" strokeWidth="3" />
        <circle cx="140" cy="64" r="7" fill="#fff8ec" stroke="#1d1d1d" strokeWidth="3" />
        <circle cx="110" cy="62" r="31" fill="#fff8ec" stroke="#1d1d1d" strokeWidth="3" />
        {/* hair scribbles */}
        <path
          d="M80 52 Q86 26 110 26 Q134 26 140 50 M84 42 q2 -14 14 -18 M96 30 l2 -12 M106 28 l2 -14 M116 28 l6 -12 M126 32 l10 -8 M132 40 l12 -4 M90 34 l-8 -8"
          stroke="#1d1d1d"
          strokeWidth="3"
          fill="none"
        />
        {/* face */}
        <circle cx="100" cy="62" r="3" fill="#1d1d1d" />
        <circle cx="120" cy="62" r="3" fill="#1d1d1d" />
        <path d="M110 66 q-3 6 1 7" stroke="#1d1d1d" strokeWidth="2" fill="none" />
        <g stroke="#1d1d1d" strokeWidth="2.5" fill="none">
          {mouth}
        </g>
      </g>
    </svg>
  )
}
