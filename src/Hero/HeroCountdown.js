import Countdown from "react-countdown";

export default function HeroCountdown({ startTime, onComplete }) {
  return (
    <div className="flex justify-center">
      <div className="p-8 px-16 bg-slate-200 rounded-2xl">
        <div className="flex items-center justify-center flex-col">
          <div className="font-bold uppercase text-slate-400 tracking-wide">
            Countdown
          </div>
          <div className="text-2xl tracking-wide">
            &nbsp;
            <Countdown date={startTime * 1000} onComplete={onComplete} />
          </div>
        </div>
      </div>
    </div>
  );
}
