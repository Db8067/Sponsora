export default function GlocalViewInternshipPage() {
  return (
    <>
      {/* Force dark theme styles specifically for this page */}
      <style dangerouslySetInnerHTML={{__html: `
        body {
          background-color: #050505 !important;
          color: #ffffff !important;
        }
        /* Custom Snow effect for dark background */
        @keyframes snow {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
        .custom-snow-1 {
          position: fixed; top: -100vh; left: 0; width: 100vw; height: 200vh;
          pointer-events: none; z-index: -1; opacity: 0.6;
          background-image: 
            radial-gradient(8px 8px at 100px 50px, #ffffff, transparent),
            radial-gradient(12px 12px at 200px 150px, #e2e8f0, transparent),
            radial-gradient(6px 6px at 300px 250px, #f8fafc, transparent),
            radial-gradient(8px 8px at 400px 350px, #ffffff, transparent),
            radial-gradient(12px 12px at 500px 100px, #e2e8f0, transparent),
            radial-gradient(6px 6px at 50px 200px, #f8fafc, transparent),
            radial-gradient(8px 8px at 150px 300px, #ffffff, transparent),
            radial-gradient(12px 12px at 250px 400px, #e2e8f0, transparent),
            radial-gradient(6px 6px at 350px 500px, #f8fafc, transparent);
          background-size: 600px 600px;
          animation: snow 15s linear infinite;
        }
        .custom-snow-2 {
          position: fixed; top: -100vh; left: 0; width: 100vw; height: 200vh;
          pointer-events: none; z-index: -1; opacity: 0.4;
          background-image: 
            radial-gradient(6px 6px at 100px 50px, #e2e8f0, transparent),
            radial-gradient(10px 10px at 200px 150px, #ffffff, transparent),
            radial-gradient(4px 4px at 300px 250px, #f8fafc, transparent);
          background-size: 400px 400px;
          animation: snow 10s linear infinite;
        }
      `}} />

      <div className="custom-snow-1"></div>
      <div className="custom-snow-2"></div>

      <div className="relative min-h-[100dvh] w-full flex flex-col overflow-x-hidden selection:bg-primary/30 text-white">
        {/* Background ambient lighting for dark mode */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-black to-black pointer-events-none"></div>
      </div>
    </>
  );
}
