import { useState, useRef, useEffect } from "react";
import { IoLanguage } from "react-icons/io5";

export default function LanguageDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const languages = ["English", "Arabic"];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="hover:text-primary flex items-center gap-2 cursor-pointer"
      >
        English <IoLanguage />
      </button>

      {open && (
        <ul className="absolute right-0 mt-2 w-32 bg-white shadow-xl rounded-md z-20">
          {languages.map((lang) => (
            <li
              key={lang}
              className="px-3 py-2 hover:bg-gray-100 border-b border-gray-200 cursor-pointer"
              onClick={() => {
                console.log("Selected:", lang);
                setOpen(false);
              }}
            >
              {lang}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
