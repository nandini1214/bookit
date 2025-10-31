import { IndianRupee } from "lucide-react";

interface Experience {
  title: string;
  description: string;
  image: string;
  location: string;
  price: number;
}

interface Props {
  readonly experience: Experience;
}

export default function ExperienceCard({ experience }: Props) {
  return (
    <div className="top-[135px] left-[124px] w-[280px] h-[312px] rounded-[12px] bg-[#F0F0F0]">
      {/* Image */}
      <img
        src={experience.image}
        alt={experience.title}
        className="rounded-t-[12px] w-full h-[170px] object-cover"
      />

      {/* Content */}
      <div className="px-[16px] py-[12px] ">
        {/* Title & Location */}
        <div className="flex items-center justify-between mb-[8px]">
          <p className="text-[#161616] font-[500] text-[16px] leading-[20px]">
            {experience.title}
          </p>
          <p className="bg-[#D6D6D6] text-[#161616] text-[11px] font-medium px-[8px] py-[4px] rounded-[4px]">
            {experience.location}
          </p>
        </div>

        {/* Description */}
        <p className=" text-[#6B6B6B] text-[12px] leading-[18px] mb-[12px] ">
          {experience.description}
        </p>

        {/* Price + Button */}
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-[2px] text-[#161616] text-[14px] font-medium">
            From{" "}
            <span className="text-[#161616] font-semibold flex items-center gap-[2px]">
              ₹ {experience.price}
            </span>
          </p>
          <button
            className="bg-[#FFD643] text-[#161616] text-[14px] font-medium px-[12px] py-[6px] 
                       rounded-[6px] hover:bg-[#fcd535] transition"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
