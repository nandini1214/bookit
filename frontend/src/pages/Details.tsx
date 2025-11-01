import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import Loader from "../components/Loader";
import { IndianRupee, ArrowLeft } from "lucide-react";

interface Experience {
  _id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  price: number;
  availableDates: string[];
  slots: string[];
}

export default function Details() {
  const { id } = useParams();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/experiences/${id}`).then((res) => setExperience(res.data)).catch((error)=>console.log(error));
  }, [id]);
  console.log(experience)
  if (!experience) return <Loader />;

  const subtotal = experience.price * quantity;
  const taxes = Math.round(subtotal * 0.06);
  const total = subtotal + taxes;

  const handleBook = () => {
    if (!selectedDate) return alert("Please select a date");
    if (!selectedSlot) return alert("Please select a slot");
    navigate("/checkout", { state: { experience, selectedDate, quantity, total , selectedSlot} });
  };

  return (
    <div className="">
      {/* Back Button */}
      <div className="flex items-center gap-2 mb-6 cursor-pointer" >
        <ArrowLeft className="w-4 h-4 text-gray-600" onClick={()=>navigate(-1)}/>
        <span className="text-gray-700 text-[14px]">Details</span>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-[48px]">
        {/* LEFT SECTION */}
        <div className="flex-1">
          <img
            src={experience.image}
            alt={experience.title}
            className="w-full h-[340px] object-cover rounded-[12px] mb-4"
          />

          <h1 className="text-[24px] font-semibold text-[#161616] mb-2">
            {experience.title}
          </h1>
          <p className="text-[#5E5E5E] text-[14px] mb-6">
            {experience.description}
          </p>

          {/* Date Selection */}
          <h2 className="text-[14px] font-semibold mb-2">Choose date</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {experience?.availableDates?.map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`px-[16px] py-[8px] rounded-[6px] border text-[13px] ${
                  selectedDate === date
                    ? "bg-[#FFD643] border-[#FFD643] text-[#161616]"
                    : "bg-white border-[#E0E0E0] text-[#5E5E5E]"
                }`}
              >
                {date}
              </button>
            ))}
          </div>

          {/* Time Slots (Static Example) */}
          <h2 className="text-[14px] font-semibold mb-2">Choose time</h2>
          <div className="flex flex-wrap gap-2 mb-2">
          {experience?.slots?.map((slot)=>(

            <button key={slot} onClick={()=>setSelectedSlot(slot)}  className={`px-[16px] py-[8px] rounded-[6px] border text-[13px] ${
                  selectedSlot === slot
                    ? "bg-[#FFD643] border-[#FFD643] text-[#161616]"
                    : "bg-white border-[#E0E0E0] text-[#5E5E5E]"
                }`}>
              {slot}
            </button>
          ))}
            
          </div>

          <p className="text-[#A0A0A0] text-[12px] mt-2">
            All times are in IST (GMT +5:30)
          </p>

          {/* About Section */}
          <h2 className="text-[14px] font-semibold mt-8 mb-2">About</h2>
          <p className="bg-[#F5F5F5] text-[#A0A0A0] text-[12px] p-2 rounded-[6px]">
            Scenic routes, trained guides, and safety briefing. Minimum age 10.
          </p>
        </div>

        {/* RIGHT SECTION — Price Summary */}
        <div className="w-full lg:w-[300px] h-fit bg-[#F9F9F9] rounded-[8px] p-[16px] shadow-sm">
          <div className="flex justify-between mb-2 text-[14px] text-[#5E5E5E]">
            <span>Starts at</span>
            <span className="flex items-center font-medium text-[#161616]">
              <IndianRupee className="w-4 h-4" />
              {experience.price}
            </span>
          </div>

          {/* Quantity */}
          <div className="flex justify-between items-center text-[14px] text-[#5E5E5E] mb-2">
            <span>Quantity</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="border px-2 rounded"
              >
                –
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="border px-2 rounded"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex justify-between text-[14px] mb-1 text-[#5E5E5E]">
            <span>Subtotal</span>
            <span>
              <IndianRupee className="inline-block w-3 h-3" />
              {subtotal}
            </span>
          </div>

          <div className="flex justify-between text-[14px] mb-2 text-[#5E5E5E]">
            <span>Taxes</span>
            <span>
              <IndianRupee className="inline-block w-3 h-3" />
              {taxes}
            </span>
          </div>

          <hr className="my-2 border-[#E0E0E0]" />

          <div className="flex justify-between font-semibold text-[16px] text-[#161616] mb-4">
            <span>Total</span>
            <span>
              <IndianRupee className="inline-block w-4 h-4" />
              {total}
            </span>
          </div>

          <button
            onClick={handleBook}
            className="bg-[#FFD643] w-full py-[10px] rounded-[6px] text-[#161616] font-medium text-[14px] hover:bg-[#fcd535]"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
