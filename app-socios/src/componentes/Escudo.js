import PropTypes from 'prop-types';

// Escudo del club dibujado en SVG (no necesita archivos de imagen).
function Escudo({ className }) {
  return (
    <svg className={className} viewBox="0 0 40 48" aria-hidden="true">
      <path d="M20 1.5 38 7.5V24c0 11.5-7.8 19.2-18 22.5C9.8 43.2 2 35.5 2 24V7.5Z" fill="#fffdf8" />
      <path d="M20 5.5 34.5 10.4V24c0 9.2-6.1 15.6-14.5 18.6C11.6 39.6 5.5 33.2 5.5 24V10.4Z" fill="#1f5d3a" />
      <path d="M5.5 17h29v6h-29z" fill="#e0a93b" />
      <text
        x="20"
        y="36"
        textAnchor="middle"
        fontFamily="'Barlow Condensed', sans-serif"
        fontWeight="700"
        fontSize="12"
        fill="#fffdf8"
      >
        LA
      </text>
    </svg>
  );
}

Escudo.propTypes = {
  className: PropTypes.string,
};

export default Escudo;
