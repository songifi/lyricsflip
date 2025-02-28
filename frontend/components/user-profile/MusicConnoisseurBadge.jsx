import Image from "next/image";
const MusicConnoisseurBadge = ({
  showMultiplier = false,
  multiplier = "3X",
}) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        {/* Circle badge with music symbol */}
        <div className="rounded-full aspect-square w-10 h-10 sm:w-16 sm:h-16">
          {/* Music symbol - treble clef and notes */}
          <Image
            src="/userprofile-img/music.svg"
            width={64}
            height={64}
            alt="Profile"
            className=" object-cover aspect-square"
          />
        </div>

        {/* Optional multiplier badge */}
        {showMultiplier && (
          <div className="absolute bottom-0 right-0 bg-white text-black text-xs font-bold px-1 rounded-md">
            {multiplier}
          </div>
        )}
      </div>

      {/* Label text below the badge */}
      <p className="xl:text-[12px] text-[9px] font-p22 font-medium text-nowrap text-center text-[#090909]">
        Music Connoisseur
      </p>
    </div>
  );
};
export default MusicConnoisseurBadge;
