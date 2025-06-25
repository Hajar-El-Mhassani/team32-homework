"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const API_KEY = "qh44auThxpkRsM62z0iIvg1VZKt1RKf3xeQri9t7";

export default function EpicImagePage() {
  const searchParams = useSearchParams();
  const date = searchParams.get("date"); // e.g., "2024-06-01"

  const [imageData, setImageData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!date) return;

    const fetchEpic = async () => {
      try {
        const response = await fetch(
          `https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=${API_KEY}`
        );
        const data = await response.json();

        if (data.length === 0) {
          setError("No images available for this date.");
          return;
        }

        const image = data[0];
        const imageDate = new Date(image.date);
        const year = imageDate.getFullYear();
        const month = String(imageDate.getMonth() + 1).padStart(2, "0");
        const day = String(imageDate.getDate()).padStart(2, "0");

        const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/jpg/${image.image}.jpg`;

        setImageData({ title: image.caption, url: imageUrl });
      } catch (err) {
        setError("Failed to fetch EPIC data.");
      }
    };

    fetchEpic();
  }, [date]);

  if (!date)
    return (
      <p>
        Please provide a date in the URL like <code>?date=2024-06-01</code>.
      </p>
    );
  if (error) return <p>{error}</p>;
  if (!imageData) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>NASA EPIC Image for {date}</h1>
      <img src={imageData.url} alt="EPIC" style={{ maxWidth: "100%" }} />
      <p>{imageData.title}</p>
    </div>
  );
}
