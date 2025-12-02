const TextInput = ({ isDarkMode, value, handleInputChange, textarea, label }) => {
  const InputComponent = textarea ? "textarea" : "input";

  const floatingLabel =
    value && value.length > 0
      ? "top-1 text-xs opacity-90"
      : "top-4 text-sm opacity-70";

  return (
    <div className="relative w-full">
      <InputComponent
        type="text"
        className={`
          w-full px-4 pt-6 pb-2 border rounded-xl resize-none outline-none transition-all duration-300
          ${isDarkMode
            ? "bg-gray-800/50 border-gray-700 text-white focus:bg-gray-800/70 focus:border-blue-500"
            : "bg-white/80 border-gray-300 text-gray-900 focus:bg-white focus:border-blue-500"
          }
        `}
        value={value}
        onChange={({ target }) => handleInputChange(target.value)}
      />

      {/* FLOATING LABEL */}
      <label
        className={`
          absolute left-4 pointer-events-none transition-all duration-300 
          ${isDarkMode ? "text-gray-400" : "text-gray-500"}
          ${floatingLabel}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default TextInput;
