import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';

// Mock data for suggestions
const MOCK_SUGGESTIONS = [
  'Pendidikan Anak Yatim',
  'Bencana Alam',
  'Kesehatan',
  'Beasiswa',
  'Bantuan Makanan',
  'Panti Jompo',
  'Bencana Alam',
  'Bantuan Medis'
];

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch suggestions when search query changes
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      // Simulate API call with debounce
      const timer = setTimeout(() => {
        const filtered = MOCK_SUGGESTIONS.filter(suggestion =>
          suggestion.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSuggestions(filtered);
        setShowSuggestions(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/cari?q=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    router.push(`/cari?q=${encodeURIComponent(suggestion)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Arrow down
    if (e.key === 'ArrowDown') {
      setActiveSuggestion(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    }
    // Arrow up
    else if (e.key === 'ArrowUp') {
      setActiveSuggestion(prev => (prev > 0 ? prev - 1 : -1));
    }
    // Enter
    else if (e.key === 'Enter' && activeSuggestion >= 0) {
      e.preventDefault();
      const selectedSuggestion = suggestions[activeSuggestion];
      setSearchQuery(selectedSuggestion);
      setShowSuggestions(false);
      router.push(`/cari?q=${encodeURIComponent(selectedSuggestion)}`);
    }
  }

  return (
    <div ref={searchRef} className="w-full max-w-2xl mx-auto mt-8 relative">
      <form onSubmit={handleSearch}>
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-4 border border-transparent rounded-md leading-5 bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-violet-700 text-base"
            placeholder="Cari donasi atau galang dana..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setActiveSuggestion(-1);
            }}
            onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="submit"
            className="ml-3 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-violet-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
          >
            Cari
          </button>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg">
          <ul className="py-1 max-h-60 overflow-auto">
            {suggestions.map((suggestion, index) => (
              <li
                key={suggestion}
                className={`px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-violet-50 ${
                  index === activeSuggestion ? 'bg-violet-100' : ''
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
                onMouseEnter={() => setActiveSuggestion(index)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* No results message */}
      {showSuggestions && searchQuery.length > 1 && suggestions.length === 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg">
          <div className="px-4 py-2 text-sm text-gray-500">
            Tidak ada hasil untuk "{searchQuery}"
          </div>
        </div>
      )}
    </div>
  );
}
