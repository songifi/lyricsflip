"use client";

import React, { useState, useEffect } from "react";
import Card from "@/components/contributor/Card";
import { getContributors } from "@/hooks/contributors";

const Page = () => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        setLoading(true);
        const data = await getContributors({
          owner: "songifi",
          repo: "lyricsflip",
        });
        
        const sortedContributors = data.sort(
          (a, b) => b.contributions - a.contributions
        );
        
        setContributors(sortedContributors);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching contributors:", err);
        setError("Failed to load contributors");
        setLoading(false);
      }
    };

    fetchContributors();
  }, []); 

  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Meet our team
          </h2>
          <p className="mt-6 text-lg/8 text-gray-400">
            We're a dynamic group of individuals who are passionate about what we do and dedicated to delivering the
            best  results for our clients.
          </p>
        </div>
        
        {loading ? (
          <div className="mt-20 text-white">Loading contributors...</div>
        ) : error ? (
          <div className="mt-20 text-red-500">{error}</div>
        ) : (
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
          >
            {contributors.map((contributor, index) => (
              <Card
                key={contributor.id || contributor.login || index}
                contributor={contributor}
                index={index}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Page;