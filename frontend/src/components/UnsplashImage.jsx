import React, { useState, useEffect } from 'react';

const UnsplashImage = ({ query, alt }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
      if (!accessKey) {
        setErrorMsg('Missing API Key. Restart Server!');
        return;
      }

      try {
        const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${accessKey}&per_page=1`);
        
        if (!res.ok) {
           setErrorMsg(`API Error: ${res.status}`);
           return;
        }
        
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          setImageUrl(data.results[0].urls.small);
        } else {
          setErrorMsg('No Image Found for query');
        }
      } catch (err) {
        console.error("Error fetching Unsplash image:", err);
        setErrorMsg('Network Error');
      }
    };
    
    fetchImage();
  }, [query]);

  if (errorMsg) {
    return (
      <div style={{ width: '100%', height: '100%', background: '#2c3e50', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '10px' }}>
        <span style={{ fontSize: '24px', marginBottom: '8px' }}>⚠️</span>
        <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{errorMsg}</span>
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div style={{ width: '100%', height: '100%', background: '#e1e1e1', color: '#666', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
        Loading...
      </div>
    );
  }

  return <img src={imageUrl} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />;
};

export default UnsplashImage;
