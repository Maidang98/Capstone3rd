import { useState, useEffect } from "react";

export default function SearchBar({ onSearch }) { 
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchTerm); 
    }, 300); 

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="position-relative w-100" style={{ maxWidth: "400px" }}>
      <div className="position-absolute top-50 start-0 ps-3 translate-middle-y pointer-events-none">
        <i className="fa-solid fa-magnifying-glass text-secondary"></i>
      </div>
      <input
        type="text"
        className="form-control ps-5 pe-3 py-2 bg-dark text-light border border-secondary rounded-3 shadow-sm"
        placeholder="Search account or full name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
