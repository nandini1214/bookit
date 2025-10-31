import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";
import { ArrowLeft, IndianRupee } from "lucide-react";

export default function Checkout() {
  const { state } = useLocation();
  const { experience, selectedDate } = state || {};
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", promo: "", agreed: false });
  const [price, setPrice] = useState(experience?.price || 0);
  const [taxes] = useState(Math.round((experience?.price || 0) * 0.06));
  const total = price + taxes;

  const handlePromo = async () => {
    try {
      const res = await API.post("/promo/validate", { code: form.promo });
      if (res.data.discountType === "percent") {
        setPrice(price - (price * res.data.value) / 100);
      } else {
        setPrice(price - res.data.value);
      }
      alert("Promo applied!");
    } catch {
      alert("Invalid promo code");
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email) return alert("Please fill all fields");
    if (!form.agreed) return alert("Please accept the terms");

    try {
      await API.post("/bookings", {
        experienceId: experience._id,
        name: form.name,
        email: form.email,
        date: selectedDate,
        totalPrice: total,
      });
      navigate("/result", { state: { success: true } });
    } catch {
      navigate("/result", { state: { success: false } });
    }
  };

  if (!experience) return <p className="p-10 text-center">No experience selected</p>;

  return (
    <div className="">
      {/* Back Button */}
      <div className="flex items-center gap-2 mb-8 cursor-pointer" onClick={() => navigate(-1)}>
        <ArrowLeft className="w-4 h-4 text-gray-600" />
        <span className="text-gray-700 text-[14px]">Checkout</span>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-[48px]">
        {/* LEFT SIDE — FORM */}
        <div className="flex-1 bg-[#EFEFEF] p-[24px] rounded-[8px]">
          <div className="flex gap-[16px] mb-[16px]">
            <div className="flex-1">
              <label className="block text-[13px] text-[#5E5E5E] mb-[4px]">Full name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-[6px] border border-[#E0E0E0] bg-white px-[12px] py-[10px] text-[14px] focus:outline-none focus:ring-2 focus:ring-yellow-400"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="flex-1">
              <label className="block text-[13px] text-[#5E5E5E] mb-[4px]">Email</label>
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-[6px] border border-[#E0E0E0] bg-white px-[12px] py-[10px] text-[14px] focus:outline-none focus:ring-2 focus:ring-yellow-400"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          {/* Promo Code */}
          <div className="flex gap-[8px] mb-[16px]">
            <input
              type="text"
              placeholder="Promo code"
              className="flex-1 rounded-[6px] border border-[#E0E0E0] bg-white px-[12px] py-[10px] text-[14px] focus:outline-none focus:ring-2 focus:ring-yellow-400"
              onChange={(e) => setForm({ ...form, promo: e.target.value })}
            />
            <button
              onClick={handlePromo}
              className="bg-[#161616] text-white text-[14px] rounded-[6px] px-[20px] py-[10px] hover:bg-[#333]"
            >
              Apply
            </button>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center gap-2 mt-[8px]">
            <input
              type="checkbox"
              checked={form.agreed}
              onChange={(e) => setForm({ ...form, agreed: e.target.checked })}
              className="w-[16px] h-[16px] border-[#E0E0E0] accent-[#FFD643]"
            />
            <span className="text-[13px] text-[#5E5E5E]">
              I agree to the terms and safety policy
            </span>
          </div>
        </div>

        {/* RIGHT SIDE — SUMMARY CARD */}
        <div className="w-full lg:w-[300px] h-fit bg-[#F9F9F9] rounded-[8px] p-[20px] shadow-sm">
          <div className="flex justify-between text-[14px] text-[#5E5E5E] mb-1">
            <span>Experience</span>
            <span className="text-[#161616] font-medium">{experience.title}</span>
          </div>
          <div className="flex justify-between text-[14px] text-[#5E5E5E] mb-1">
            <span>Date</span>
            <span>{selectedDate}</span>
          </div>
          <div className="flex justify-between text-[14px] text-[#5E5E5E] mb-1">
            <span>Time</span>
            <span>09:00 am</span>
          </div>
          <div className="flex justify-between text-[14px] text-[#5E5E5E] mb-1">
            <span>Qty</span>
            <span>1</span>
          </div>

          <div className="flex justify-between text-[14px] text-[#5E5E5E] mb-1">
            <span>Subtotal</span>
            <span>
              <IndianRupee className="inline-block w-3 h-3" />
              {price}
            </span>
          </div>

          <div className="flex justify-between text-[14px] text-[#5E5E5E] mb-2">
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
            onClick={handleSubmit}
            className="bg-[#FFD643] w-full py-[10px] rounded-[6px] text-[#161616] font-medium text-[14px] hover:bg-[#fcd535]"
          >
            Pay and Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
