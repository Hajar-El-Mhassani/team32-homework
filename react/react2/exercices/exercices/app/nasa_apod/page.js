//1. Create a page that renders the NASA Astronomy Picture of the Day (with caption) using Server Side Rendering
const Page = async () => {
  const data = await fetch(
    "https://api.nasa.gov/planetary/apod?api_key=qh44auThxpkRsM62z0iIvg1VZKt1RKf3xeQri9t7"
  );
  const json = await data.json();
  return (
    <div>
      <h1>{json.title}</h1>
      <img
        src={json.url}
        alt={json.title}
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <p>{json.explanation}</p>
    </div>
  );
};

export default Page;
