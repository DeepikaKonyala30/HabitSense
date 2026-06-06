/**
 * Reusable Input component with premium styling
 */
export default function PremiumInput({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  error,
  className = '',
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-neutral-700 mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full px-4 py-3 rounded-xl border-2 transition-all duration-200
          bg-white font-sans text-base
          border-neutral-200 focus:border-primary-500 focus:outline-none
          focus:shadow-lg focus:ring-2 focus:ring-primary-200
          disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed
          placeholder-neutral-400
          ${error ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-200' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-danger-600 font-medium mt-2">{error}</p>
      )}
    </div>
  );
}
