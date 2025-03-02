const Display = ({ text, value, usd = false, th = false, className }) => {
  return (
    <div
      className={`flex flex-col p-3 items-center lg:items-start justify-center gap-2  ${className} `}
    >
      <div className="md:text-[24px] text-lg font-inter font-semibold leading-9 text-[#090909] text-nowrap">
        {usd ? `${value} USD` : th ? `${value}th` : value}
      </div>
      <div className="md:text-[14px] text-xs font-inter font-normal leading-[22px] text-[#666] text-nowrap">
        {text}
      </div>
    </div>
  );
};
export default Display;
