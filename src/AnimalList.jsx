import React, { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import Template from './Template';
import Tablemodel from './Tablemodel';

function AnimalList() {
    const [page, setPage] = React.useState(1);

    const fetchAnimals = async ({ pageParam = page }) => {
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
        queryKey: ['animals', page],
        queryFn: fetchAnimals,
        getNextPageParam: (lastPage) => {
            if (lastPage.current_page < lastPage.last_page) {
                return lastPage.current_page + 1;
            }
            return undefined;
        },
        initialPageParam: page,
    });

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop + 100 >=
                document.documentElement.offsetHeight &&
                hasNextPage &&
                !isFetchingNextPage
            ) {
                fetchNextPage();
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <>
        <div>
            {/* <Tablemodel /> */}
        </div>
            <div className="flex justify-center gap-2 mb-4">
                {[1,2,3,4].map(num => (
                    <button
                        key={num}
                        onClick={() => setPage(num)}
                        className={`px-3 py-1 rounded border ${page === num ? 'bg-purple-500 text-white' : 'bg-white text-purple-700 border-purple-300'} transition`}
                    >
                        {num}
                    </button>
                ))}
            </div>
            <Template data={data} error={error} status={status} isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage} />
        </>
    );
}

export default AnimalList;
