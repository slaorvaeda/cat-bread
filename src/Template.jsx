import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Template(props) {
    const { data, error, status, isFetchingNextPage, hasNextPage } = props
    const [search, setSearch] = useState('');
    const [country, setCountry] = useState('');

    // Collect all unique countries for filter dropdown
    const allBreeds = data?.pages.flatMap(page => page.data) || [];
    const countries = Array.from(new Set(allBreeds.map(b => b.country).filter(Boolean)));

    // Filter breeds by search and country
    const filteredBreeds = allBreeds.filter(breed => {
        const matchesSearch = breed.breed.toLowerCase().includes(search.toLowerCase());
        const matchesCountry = country ? breed.country === country : true;
        return matchesSearch && matchesCountry;
    });

    return (
        <>

            <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center py-10">
                <Link to="/table" className="absolute top-4 left-4 text-purple-600 hover:underline">Table</Link>
                <section className="w-full max-w-3xl bg-white/80 rounded-2xl shadow-xl p-8">
                    <header className="flex items-center gap-4 mb-8">
                        <img src="https://cdn-icons-png.flaticon.com/512/616/616408.png" alt="Cat" className="w-12 h-12" />
                        <div>
                            <h1 className="text-3xl font-extrabold text-purple-700 tracking-tight">Cat Breeds</h1>
                            <p className="text-gray-500 text-sm">Powered by TanStack Query & CatFact API</p>
                        </div>
                    </header>
                    {/* Filter UI */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <input
                            type="text"
                            placeholder="Search breed..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="border rounded px-3 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-purple-300"
                        />
                        <select
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                            className="border rounded px-3 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-purple-300"
                        >
                            <option value="">All Countries</option>
                            {countries.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                    {status === 'pending' && <p className="text-lg text-gray-400">Loading...</p>}
                    {error && <p className="text-red-500 font-semibold">{error.message}</p>}
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredBreeds.map((breed) => (
                            <li key={breed.breed} className="rounded-xl border border-purple-100 bg-white shadow-md p-5 flex flex-col gap-2 hover:shadow-lg transition">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold text-purple-800">{breed.breed}</span>
                                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">{breed.country}</span>
                                </div>
                                <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                                    <span className="bg-blue-50 px-2 py-0.5 rounded">Origin: {breed.origin}</span>
                                    <span className="bg-green-50 px-2 py-0.5 rounded">Coat: {breed.coat}</span>
                                    <span className="bg-yellow-50 px-2 py-0.5 rounded">Pattern: {breed.pattern}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-col items-center mt-8">
                        {isFetchingNextPage && <p className="text-purple-500">Loading more...</p>}
                        {!hasNextPage && <p className="mt-2 text-gray-400">No more animals to load.</p>}
                    </div>
                </section>
               
            </main>
        </>
    )
}

export default Template