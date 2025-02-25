import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import cn from "classnames";

// Reusable contributor prop shape
const contributorShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  img2: PropTypes.string.isRequired, // Ensure it's img2 as per your code
  badge: PropTypes.oneOf(["gold", "silver", "bronze"]),
  type: PropTypes.string
});

const Card = ({ contributor, index, className, ...props }) => {
  return (
    <div
    className={cn(
      "flex flex-col items-center w-[105px] h-[135px] sm:w-[305px] sm:h-[367px] p-4 border rounded-2xl shadow-lg bg-white relative hover:bg-[#70E3C7]",
      className
    )}
    {...props}
  >

      <div className="relative sm:mt-8">
        <Image
          src={contributor.img2}
          alt={contributor.name}
          width={168}
          height={168}
          className="w-[54px] h-[54px] sm:w-[168px] sm:h-[168px] rounded-full"
        />

        {contributor.badge && (
          <div className="absolute bottom-0 right-0 flex items-center justify-center">
            <Image
              src={
                contributor.badge === "gold"
                  ? "/Star.png"
                  : contributor.badge === "silver"
                  ? "/Star2.png"
                  : "/Star3.png"
              }
              alt={`${contributor.badge} Star`}
              width={48}
              height={48}
              className="w-5 h-5 sm:w-12 sm:h-12"
            />
            <span className="absolute text-white text-sm font-bold w-8 h-8 flex items-center justify-center rounded-full">
              {index + 1}
            </span>
          </div>
        )}
      </div>

      <h2 className="mt-2 sm:mt-8 text-xs sm:text-base text-black font-normal">
        {contributor.name}
      </h2>

      <p className={cn("mt-2 bg-green-100 text-green-600 text-xs sm:text-sm px-4 py-1 sm:py-2 rounded-full", { "hidden sm:block": contributor.type })}>
        {contributor.type || "Lyrics"}
      </p>
    </div>
  );
};

// Define PropTypes for validation
Card.propTypes = {
  contributor: contributorShape.isRequired,
  index: PropTypes.number.isRequired,
  className: PropTypes.string
};

// Set default props
Card.defaultProps = {
  className: ""
};

export default Card;
