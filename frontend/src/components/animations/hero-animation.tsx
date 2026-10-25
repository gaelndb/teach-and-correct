import './hero-animation.css'

type CopyIllustrationProps = {
  corrected?: boolean
}

function CopyLines({ corrected = false }: CopyIllustrationProps) {
  return (
    <g>
      <rect x="21" y="27" width="57" height="4" rx="2" fill="#28342E" opacity=".82" />
      <rect x="21" y="38" width="87" height="3" rx="1.5" fill="#526159" opacity=".55" />
      <rect x="21" y="47" width="72" height="3" rx="1.5" fill="#526159" opacity=".55" />
      <rect x="21" y="56" width="91" height="3" rx="1.5" fill="#526159" opacity=".55" />
      <rect x="21" y="72" width="78" height="3" rx="1.5" fill="#526159" opacity=".55" />
      <rect x="21" y="81" width="91" height="3" rx="1.5" fill="#526159" opacity=".55" />
      <rect x="21" y="90" width="64" height="3" rx="1.5" fill="#526159" opacity=".55" />
      <rect x="21" y="106" width="89" height="3" rx="1.5" fill="#526159" opacity=".55" />
      <rect x="21" y="115" width="68" height="3" rx="1.5" fill="#526159" opacity=".55" />

      {corrected ? (
        <g className="hero-animation__correction-marks">
          <rect x="39" y="44" width="55" height="8" rx="2" fill="#B8FF5C" opacity=".42" />
          <rect x="62" y="78" width="48" height="8" rx="2" fill="#B8FF5C" opacity=".42" />
          <path d="M26 64c12 5 22 4 34 0" fill="none" stroke="#9FF63C" strokeLinecap="round" strokeWidth="3" />
          <path d="M91 96l4 4 9-11" fill="none" stroke="#8FEA30" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          <path d="M24 123c18 6 37 6 58 0" fill="none" stroke="#9FF63C" strokeLinecap="round" strokeWidth="3" />
          <g transform="translate(102 20)">
            <circle r="14" fill="#A8F34A" />
            <path d="m-6 0 4.2 4L6-5" fill="none" stroke="#244733" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" />
          </g>
        </g>
      ) : null}
    </g>
  )
}

function Paper({ corrected = false }: CopyIllustrationProps) {
  return (
    <g>
      <rect x="8" y="8" width="120" height="138" rx="5" fill="#FCFCF7" />
      <path d="M110 8h18v18z" fill="#E3E8E2" />
      <CopyLines corrected={corrected} />
    </g>
  )
}

export function HeroAnimation() {
  return (
    <div
      className="hero-animation"
      role="img"
      aria-label="Une copie d'élève est photographiée, analysée puis corrigée automatiquement"
    >
      <svg viewBox="0 0 420 190" aria-hidden="true">
        <defs>
          <mask id="hero-phone-frame-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="96" height="164">
            <rect width="96" height="164" fill="white" />
            <rect x="10" y="23" width="76" height="112" rx="3" fill="black" />
          </mask>
        </defs>

        <g className="hero-animation__raw-copy" transform="translate(142 20) rotate(-4 68 77)">
          <Paper />
        </g>

        <g className="hero-animation__phone-scan">
          <g transform="translate(277 109) rotate(-8)">
            <path d="M8 17c7-2 12 1 15 7l6 12 9-3c11-4 19 3 17 14l-5 30c-1 8-8 14-16 14H9c-8 0-14-7-13-15z" fill="#E8B790" />
            <path d="M2 53c9-2 18 1 23 8" fill="none" stroke="#C98C68" strokeLinecap="round" strokeWidth="3" opacity=".65" />
          </g>
          <g transform="translate(221 12) rotate(7 48 80)">
            <rect
              x="3"
              y="3"
              width="90"
              height="158"
              rx="14"
              fill="#101613"
              stroke="#050806"
              strokeWidth="6"
              mask="url(#hero-phone-frame-mask)"
            />
            <rect x="10" y="23" width="76" height="112" rx="3" fill="#385F49" fillOpacity=".04" />
            <path d="M38 14h20" stroke="#68716C" strokeLinecap="round" strokeWidth="3" />
            <circle cx="48" cy="148" r="8" fill="none" stroke="#68716C" strokeWidth="2.5" />
            <path
              d="M16 35v-7h7M73 28h7v7M80 122v7h-7M23 129h-7v-7"
              fill="none"
              stroke="#B8FF5C"
              strokeLinecap="round"
              strokeWidth="2"
              opacity=".75"
            />
          </g>
        </g>

        <g className="hero-animation__capture-flash" transform="translate(208 92)">
          <circle r="40" fill="#F8FFF2" opacity=".82" stroke="#F8FFF2" strokeWidth="2" />
          <circle r="29" fill="none" stroke="#F8FFF2" strokeWidth="2" opacity=".8" />
          <path
            d="M0-54v17M0 37v17M-54 0h17M37 0h17M-38-38l12 12M26 26l12 12M38-38 26-26M-26 26l-12 12"
            stroke="#F8FFF2"
            strokeLinecap="round"
            strokeWidth="4"
          />
        </g>

        <g className="hero-animation__processing" transform="translate(210 96)">
          <path
            d="M8-43 15-31c4 1 8 3 11 6l14-3 8 14-10 10c1 4 1 8 0 12l10 10-8 14-14-3c-3 3-7 5-11 6L8 47H-8l-7-12c-4-1-8-3-11-6l-14 3-8-14 10-10a34 34 0 0 1 0-12l-10-10 8-14 14 3c3-3 7-5 11-6l7-12z"
            fill="#AAB3AE"
          />
          <circle r="19" fill="#385F49" />
          <circle r="8" fill="#7E8A84" />
        </g>

        <g className="hero-animation__corrected-copy" transform="translate(142 20) rotate(3 68 77)">
          <Paper corrected />
        </g>
      </svg>
    </div>
  )
}
