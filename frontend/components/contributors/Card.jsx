import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

const Card = ({ contributor, index, className, ...props }) => {
  return (
    <div
      className={`flex flex-col items-center w-[105px] h-[135px] sm:w-[305px] sm:h-[367px] p-4 border rounded-2xl shadow-lg bg-background-default relative hover:bg-primary-light ${className}`}
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

        {["gold", "silver", "bronze"].includes(contributor.badge) && (
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
            <span className="absolute text-text-primary text-sm font-bold w-8 h-8 flex items-center justify-center rounded-full">
              {index + 1}
            </span>
          </div>
        )}
      </div>

      <h2 className="mt-2 sm:mt-8 text-xs sm:text-base text-text-primary font-normal">
        {contributor.name}
      </h2>

      <p className="hidden sm:block mt-2 bg-status-success text-white text-xs sm:text-sm px-4 py-1 sm:py-2 rounded-full">
        {contributor.type}
      </p>

      <p className="sm:hidden mt-2 bg-status-success text-white text-xs sm:text-sm px-4 py-1 sm:py-2 rounded-full">
        Lyrics
      </p>
    </div>
  );
};

Card.propTypes = {
  contributor: PropTypes.shape({
    name: PropTypes.string.isRequired,
    img2: PropTypes.string.isRequired,
    badge: PropTypes.oneOf(["gold", "silver", "bronze"]),
    type: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  className: PropTypes.string,
};

Card.defaultProps = {
  className: "",
};

export default Card;
