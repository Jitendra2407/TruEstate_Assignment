import React, { useState, useRef, useEffect } from 'react';

const MultiSelect = ({ label, options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Parse comma-separated string into array
  const selectedValues = selected ? selected.split(',').filter(Boolean) : [];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (value) => {
    let newSelected;
    if (selectedValues.includes(value)) {
      newSelected = selectedValues.filter(v => v !== value);
    } else {
      newSelected = [...selectedValues, value];
    }
    onChange(newSelected.join(','));
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
          className={`inline-flex items-center justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${selectedValues.length > 0 ? 'border-indigo-500 ring-1 ring-indigo-500' : ''}`}
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          <span className="truncate max-w-[150px]">
            {selectedValues.length === 0 
                ? label 
                : `${label} (${selectedValues.length})`}
          </span>
          <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div 
            className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 max-h-60 overflow-y-auto" 
            role="menu" 
            aria-orientation="vertical" 
            aria-labelledby="menu-button" 
            tabIndex="-1"
        >
          <div className="py-1" role="none">
            {options && options.map((option) => (
              <label key={option} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mr-3"
                  checked={selectedValues.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                />
                {option}
              </label>
            ))}
            {(!options || options.length === 0) && (
              <div className="px-4 py-2 text-sm text-gray-500">No options available</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
