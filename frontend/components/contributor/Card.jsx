import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const Card = ({ contributor, index }) => {
  return (
    <div className="rounded-2xl bg-gray-800 px-8 py-10">
      <div className="overflow-hidden">
        <Image
          src={contributor.avatar_url }
          alt={`${contributor.name } profile`}
          width={224}
          height={224}
          className="mx-auto size-48 rounded-full object-cover md:size-56"
        />
      </div>
      <h3 className="mt-6 text-base/7 font-semibold tracking-tight text-white">
        {contributor.name || contributor.login}
      </h3>
      <p className="text-sm/6 text-gray-400">{contributor.role || `${contributor.contributions} contributions`} </p>
      <ul role="list" className="mt-6 flex justify-center gap-x-6">
       
          <div>
             {contributor.html_url && (
          <li>
            <Link href={contributor.html_url} passHref legacyBehavior>
              <div className="text-gray-400 hover:text-gray-300" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">GitHub</span>
                <FaGithub className="size-5 text-gray-400 hover:text-gray-300" />
              </div>
            </Link>
          </li>
        )}
          </div>
        

       
      </ul>
    </div>
  );
};

export default Card;