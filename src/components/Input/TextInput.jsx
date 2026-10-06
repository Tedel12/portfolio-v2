import React from 'react';

const TextInput = ({ isDarkMode, value, handleInputChange, textarea, label, type = "text", required = false }) => {
  const InputComponent = textarea ? "textarea" : "input";

  const floatingLabel =
    value && value.length > 0
      ? "top-1 text-xs opacity-90"
      : "top-4 text-xs opacity-70";

  return (
    <div className="relative w-full">
      <InputComponent
        type={textarea ? undefined : type}
        required={required}
        rows={textarea ? 4 : undefined}
        className={`
          w-full px-4 pt-6 pb-2.5 border rounded-xl resize-none outline-none transition-all duration-300 font-sans text-xs md:text-sm
          ${isDarkMode
            ? "bg-[#03150d] border-emerald-950 text-white placeholder-slate-600 focus:border-emerald-500 focus:bg-[#052215]"
            : "bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-emerald-600 focus:bg-slate-50"
          }
        `}
        value={value}
        onChange={({ target }) => handleInputChange(target.value)}
      />

      {/* FLOATING LABEL */}
      <label
        className={`
          absolute left-4 pointer-events-none transition-all duration-300 font-subtitle
          ${isDarkMode ? "text-slate-400" : "text-slate-500"}
          ${floatingLabel}
        `}
      >
        {label} {required && <span className="text-emerald-500">*</span>}
      </label>
    </div>
  );
};

export default TextInput;
