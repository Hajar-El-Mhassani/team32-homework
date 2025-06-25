"use client";
import React from "react";
import { usePathname } from "next/navigation";

const BlogsPost = () => {
  const pathName = usePathname();
  const title = pathName.split("/").pop();
  const titleWords = title
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return (
    <div>
      <h1>{titleWords}</h1>
    </div>
  );
};
export default BlogsPost;
