import { useState } from 'react';
import { useRouter } from 'next/router';

type Filters = {
  status: string[];
  location: string[];
  organizer: string[];
};

const FilterSidebar = () => {
  const router = useRouter();
  const [filters, setFilters] = useState<Filters>({
    status: ['berlangsung'],
    location: [],
    organizer: [],
  });

  const locations = ['Jakarta', 'Bandung', 'Surabaya', 'Medan', 'Bali'];
  const organizers = ['Organisasi A', 'Organisasi B', 'Organisasi C', 'Lembaga Zakat', 'Yayasan Sosial'];

  const handleFilterChange = (filterType: string, value: string, checked: boolean) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      if (checked) {
        newFilters[filterType as keyof typeof newFilters] = [
          ...(newFilters[filterType as keyof typeof newFilters] || []),
          value,
        ];
      } else {
        newFilters[filterType as keyof typeof newFilters] = (
          newFilters[filterType as keyof typeof newFilters] as string[]
        ).filter((item) => item !== value);
      }
      return newFilters;
    });
  };

  const applyFilters = () => {
    // In a real app, update the URL with the selected filters
    // and trigger a data refetch
    console.log('Applying filters:', filters);
  };

  const resetFilters = () => {
    setFilters({
      status: ['berlangsung'],
      location: [],
      organizer: [],
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-gray-900">Filter</h2>
        <button
          onClick={resetFilters}
          className="text-sm text-teal-600 hover:text-teal-800"
        >
          Reset
        </button>
      </div>

      {/* Status Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Status</h3>
        <div className="space-y-2">
          {[
            { value: 'berlangsung', label: 'Sedang Berlangsung' },
            { value: 'hampir-tercapai', label: 'Hampir Tercapai' },
            { value: 'baru', label: 'Baru' },
          ].map((status) => (
            <div key={status.value} className="flex items-center">
              <input
                id={`status-${status.value}`}
                type="checkbox"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                checked={filters.status.includes(status.value)}
                onChange={(e) =>
                  handleFilterChange('status', status.value, e.target.checked)
                }
              />
              <label
                htmlFor={`status-${status.value}`}
                className="ml-3 text-sm text-gray-700"
              >
                {status.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Lokasi</h3>
        <div className="space-y-2">
          {locations.map((location) => (
            <div key={location} className="flex items-center">
              <button
                onClick={() => handleFilterChange('location', location, !filters.location.includes(location))}
                className={`px-3 py-1 text-sm rounded-full mr-2 mb-2 ${
                  filters.location.includes(location)
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {location}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Organizer Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Penyelenggara</h3>
        <div className="space-y-2">
          {organizers.map((org) => (
            <div key={org} className="flex items-center">
              <button
                onClick={() => handleFilterChange('organizer', org, !filters.organizer.includes(org))}
                className={`px-3 py-1 text-sm rounded-full mr-2 mb-2 ${
                  filters.organizer.includes(org)
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {org}
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={applyFilters}
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-sm font-medium transition-colors"
      >
        Terapkan Filter
      </button>
    </div>
  );
};

export default FilterSidebar;
