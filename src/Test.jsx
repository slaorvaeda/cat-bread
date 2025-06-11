import React, { useEffect, useState } from 'react'

function Test() {
  const [breeds, setBreeds] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimals = (pageParam = 1) => {
      fetch(`https://catfact.ninja/breeds?page=${pageParam}`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch animals');
          return res.json();
        })
        .then(data => setBreeds(data.data || []))
        .catch(err => setError(err.message));
    };
    fetchAnimals(1);
  }, []);

  return (
    <>
      {error && <div>Error: {error}</div>}
      <ul>
        {breeds.map((breed, idx) => (
          <li key={idx}>{breed.breed}</li>
        ))}
      </ul>
    </>
  )
}

export default Test