import { useLocation, Link } from "react-router-dom";
import { Check, CircleAlertIcon, } from "lucide-react";

export default function Result() {
  const { state } = useLocation();
  const success = state?.success;
  const refId = "HUF56&SO"; // you can generate this dynamically later

  return (
    <div className="flex flex-col items-center justify-center  text-cente">
      {success ? (
        <>
          <div><Check className="w-[70px] h-[70px] bg-[#24AC39] rounded-full text-white p-2 top-[5px] Left-[5px]" /></div>
          <h2 className="text-[24px] font-semibold text-[#161616] mb-[8px]">
            Booking Confirmed
          </h2>
          <p className="text-[14px] text-[#5E5E5E] mb-[24px]">
            Ref ID: <span className="font-mono">{refId}</span>
          </p>
          <Link
            to="/"
            className="bg-[#E0E0E0] text-[#161616] text-[14px] rounded-[6px] px-[16px] py-[8px] hover:bg-[#d6d6d6]"
          >
            Back to Home
          </Link>
        </>
      ) : (
        <>
          <CircleAlertIcon className="w-[64px] h-[64px] text-[#E74C3C] mb-6" />
          <h2 className="text-[24px] font-semibold text-[#161616] mb-[8px]">
            Booking Failed
          </h2>
          <p className="text-[14px] text-[#5E5E5E] mb-[24px]">
            Something went wrong. Please try again later.
          </p>
          <Link
            to="/"
            className="bg-[#E0E0E0] text-[#161616] text-[14px] rounded-[6px] px-[16px] py-[8px] hover:bg-[#d6d6d6]"
          >
            Back to Home
          </Link>
        </>
      )}
    </div>
  );
}
