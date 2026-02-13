import { useState, useRef, useEffect } from "react";
import photo from "./assets/img_pg1.jpg";
import finalGif from "./assets/gif.mp4";
import music from "./assets/analua.mp3";

export default function App() {
  const [step, setStep] = useState(1);
  const [visible, setVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const changeStep = (nextStep: number) => {
    setVisible(false);

    setTimeout(() => {
      setStep(nextStep);
      setVisible(true);
    }, 400);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);

const autoNextStep = (
  currentStep: number,
  nextStep: number,
  delay: number
) => {
  if (step !== currentStep) return;

  const timer = setTimeout(() => {
    changeStep(nextStep);
  }, delay);

  return () => clearTimeout(timer);
};

useEffect(() => {
  if (step === 1) return autoNextStep(1, 2, 4000);
  if (step === 2) return autoNextStep(2, 3, 4000);
}, [step]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 flex items-center justify-center px-6">
      <audio ref={audioRef} src={music} loop />

      <div
        className={`max-w-xl text-center space-y-6 transition-opacity duration-500 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        {step === 1 && (
            <div className="flex flex-col items-center space-y-6">
              <p className="text-xl text-neutral-300 leading-relaxed">
                Se amar é cuidar...
              </p>
            </div>
        )}

        {step === 2 && (
          <>
            <div className="flex flex-col items-center space-y-6">
              <img
                src={photo}
                alt="Nós"
                className="w-52 md:w-64 rounded-lg opacity-70"
              />

              <p className="text-xl text-neutral-300 leading-relaxed">
                Então eu quero cuidar de você
                por toda a vida.
              </p>
            </div>
          </>
        )}

        {step === 3 && (
          <div className="space-y-8 flex flex-col items-center h-screen overflow-y-auto scroll-smooth mx-auto m-16">
            <video
              src={finalGif}
              autoPlay
              loop
              muted
              playsInline
              className="w-56 md:w-72 rounded-lg mx-auto opacity-80"
            />

            <p className="text-2xl text-neutral-200 leading-relaxed">
              Porque amar você
              é a escolha mais bonita
              que eu faço todos os dias.
            </p>

            <p className="text-neutral-500">
              Hoje. Amanhã. Sempre.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
