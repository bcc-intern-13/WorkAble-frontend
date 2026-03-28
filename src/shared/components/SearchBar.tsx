"use client"

import { Search, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchBar } from '../hooks/useSearchBar'
import { Input } from '@/components/ui/atoms/input'

interface SearchBarProps {
  onClose?: () => void
}

export default function SearchBar({ onClose }: SearchBarProps) {
  const {
    query,
    setQuery,
    loading,
    showResults,
    setShowResults,
    handleClear,
    searchRef,
  } = useSearchBar()

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />

        <Input
          id='input-job'
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari posisi, perusahaan...."
          className="w-full pl-12 pr-24 py-3 rounded-full border-2 border-[#B2B2B2] shadow-2xl
                     focus:outline-none focus:ring-2"
        />

        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  )
}
