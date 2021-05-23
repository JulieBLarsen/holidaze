import { ChevronDownIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

function SearchBar({ places, filteredPlaces, setFilteredPlaces }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState('');
  const [listHover, setListHover] = useState(false);
  const [inputActive, setInputActive] = useState(false);
  const router = useRouter();

  const handleSearch = async (search) => {
    setSearch(search);
    const filtered = places.filter((places) =>
      places.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPlaces(filtered);
  };
  function clearSearch() {
    setSearch('');
    setFilteredPlaces(places);
  }
  function handleHover() {
    if (!listHover) {
      setListHover(true);
    }
  }
  function inputFocus() {
    setInputActive(true);
    setShowDropdown(true);
  }
  function inputBlur() {
    setInputActive(false);
    if (listHover === false) {
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
    }
  }
  return (
    <div className="flex flex-col pt-6">
      <div className="flex flex-row ">
        <label htmlFor="searchplace" className="sr-only">
          Password
        </label>
        <div className="relative w-full">
          <input
            type="text"
            name="searchplace"
            id="searchplace"
            autoComplete="off"
            value={search}
            placeholder="Search for a place to stay..."
            className="py-3 px-4 border w-full outline-none border-gray-300 border-r-0  focus:border-primary rounded-l-md"
            onChange={(e) => handleSearch(e.target.value)}
            onClick={() => inputFocus()}
            onBlur={() => inputBlur()}></input>
          <div
            className="absolute inset-y-0 right-0 cursor-pointer  text-gray-500 hover:text-gray-700   px-3 flex justify-center"
            onClick={() => clearSearch()}>
            <XIcon className="w-5" />
          </div>
        </div>

        <button
          className="text-white transition text-sm bg-primary hover:bg-primary-light rounded-r-md py-2 px-3 m-0 flex items-center outline-none focus:outline-none"
          onClick={() => setShowDropdown(!showDropdown)}
          onBlur={() => !listHover && setShowDropdown(false)}>
          <ChevronDownIcon className="w-5" />
        </button>
      </div>
      <ul
        onMouseOver={() => handleHover()}
        className={`
          ${showDropdown ? 'block' : 'hidden'}
            z-50 overflow-hidden overflow-y-auto  max-h-80 rounded-md shadow border mt-2 border-gray-300`}>
        {filteredPlaces.map((place) => (
          <li key={place.id} className="z-50 cursor-pointer">
            <Link href="/places/[slug]" as={`/places/${place.slug}`}>
              <a className="block  bg-white px-4 py-2 hover:text-white hover:bg-primary">
                {place.title}
              </a>
            </Link>
          </li>
        ))}

        {filteredPlaces.length === 0 && (
          <li className="font-medium bg-white px-4 py-4">
            No results found...
          </li>
        )}
      </ul>
    </div>
  );
}

export default SearchBar;
