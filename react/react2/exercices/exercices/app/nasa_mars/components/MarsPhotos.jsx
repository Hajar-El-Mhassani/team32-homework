//2. Dynamic Rendering with useEffect
"use client";
import React, { useState, useEffect } from "react";
const MarsPhotos = () => {
  const [marsPhotos, setMarsPhotos] = useState([]);
  useEffect(() => {
    const fetchMarsPhotos = async () => {
      try {
        const response = await fetch(
          "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=qh44auThxpkRsM62z0iIvg1VZKt1RKf3xeQri9t7"
        );
        const data = await response.json();
        setMarsPhotos(data.photos);
      } catch (error) {
        console.error("Error fetching Mars photos:", error);
      }
    };
    fetchMarsPhotos();
  }, []);
  return (
    <div>
      <h2>Mars Photos</h2>
      <ul>
        {marsPhotos.slice(0, 5).map((photo) => (
          <li key={photo.id}>
            <img
              src={photo.img_src}
              alt={photo.camera.full_name}
              style={{ width: 250, height: 180 }}
            />
            <p>{photo.camera.full_name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarsPhotos;
