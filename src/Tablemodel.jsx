import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { Link } from 'react-router-dom';

function Tablemodel() {
  // Fetch animal data using the same API as AnimalList
  const fetchAnimals = async ({ pageParam = 1 }) => {
    const res = await fetch(`https://catfact.ninja/breeds?page=${pageParam}`);
    if (!res.ok) throw new Error('Failed to fetch animals');
    return res.json();
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['animals-table'],
    queryFn: fetchAnimals,
    getNextPageParam: (lastPage) => {
      if (lastPage.current_page < lastPage.last_page) {
        return lastPage.current_page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  // Prepare table data
  const breeds = data?.pages.flatMap(page => page.data) || [];

  const columns = React.useMemo(() => [
    { accessorKey: 'breed', header: 'Breed' },
    { accessorKey: 'country', header: 'Country' },
    { accessorKey: 'origin', header: 'Origin' },
    { accessorKey: 'coat', header: 'Coat' },
    { accessorKey: 'pattern', header: 'Pattern' },
  ], []);

  const table = useReactTable({
    data: breeds,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Cat Breeds Table (TanStack Table)</h2>
      {status === 'pending' && <p>Loading...</p>}
      {error && <p className="text-red-500">{error.message}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="px-4 py-2 border-b font-semibold text-left">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-purple-50">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-2 border-b">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className="p-2 bg-purple-600 text-white rounded-2xl "
        >
          {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More' : 'No More'}
        </button>
         <Link to="/" className="bg-purple-600 text-white p-2 m-2 rounded-2xl">Template model</Link> 
      </div>
      
    </div>
  );
}

export default Tablemodel;