"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Loader2, ShieldCheck, Mail, User, Phone, CheckCircle2, Building2, BookOpen, Calendar as CalendarIcon, Users } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

declare global {
  interface Window { Razorpay: any; }
}

export default function SIHMasterclassPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [college, setCollege] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [passType, setPassType] = useState<"individual" | "team">("individual");
  
  const [teamMembers, setTeamMembers] = useState(
    Array(5).fill({ name: "", email: "", phone: "", college: "", branch: "", year: "" })
  );
  
  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [teamFormSubmitted, setTeamFormSubmitted] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (isSuccess && (passType === "individual" || (passType === "team" && teamFormSubmitted))) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const timer = setTimeout(() => {
        router.push('/');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, teamFormSubmitted, passType, router]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !college || !branch || !year) {
      setError("Please fill all fields.");
      return;
    }
    setError("");

    if (!razorpayLoaded) {
      setError("Payment gateway loading, please wait...");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/razorpay/sih-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, college, branch, year, passType }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create order");
      }

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "SIH Online Masterclass",
        description: "Online SIH Masterclass Pass",
        order_id: data.orderId,
        handler: function (response: any) {
          setIsSuccess(true);
          setLoading(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        prefill: {
          name: name,
          email: email,
          contact: phone,
        },
        theme: { color: "#2563eb" },
        modal: {
          ondismiss: function () {
            window.location.reload();
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        window.location.reload();
      });
      rzp.open();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
       const res = await fetch('/api/sih/team', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ leaderEmail: email, leaderName: name, members: teamMembers })
       });
       if (!res.ok) throw new Error("Failed to submit team details");
       setTeamFormSubmitted(true);
       window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch(e: any) {
       setError(e.message || "Failed to save team details");
    } finally {
       setLoading(false);
    }
  };

  const updateTeamMember = (index: number, field: string, value: string) => {
    const newMembers = [...teamMembers];
    newMembers[index] = { ...newMembers[index], [field]: value };
    setTeamMembers(newMembers);
  };

  return (
    <>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: 200%;
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="relative min-h-[100dvh] w-full flex flex-col overflow-x-hidden pt-20 md:pt-24 lg:pt-24 pb-12 md:pb-16 selection:bg-primary/30">
        
        {/* Background ambient lighting */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background pointer-events-none hidden dark:block"></div>

        <div className="relative z-10 flex flex-col w-full max-w-7xl px-4 md:px-6 lg:px-12 mx-auto mt-2 md:mt-12">
          
          {isSuccess && passType === "team" && !teamFormSubmitted ? (
            <div className="w-full max-w-3xl mx-auto bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
               <div className="text-center mb-8">
                 <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                   <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                 </div>
                 <h2 className="text-2xl font-black mb-2 text-foreground">Payment Successful, Team Leader!</h2>
                 <p className="text-foreground/70 font-medium">Please enter the details of your 5 teammates below to complete your team registration.</p>
               </div>
               
               {error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-semibold mb-4 border border-red-100">
                    {error}
                  </div>
                )}

               <form onSubmit={handleTeamSubmit} className="flex flex-col gap-8">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                      <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-600" /> Teammate {index + 1}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-foreground mb-1 block">Full Name</label>
                          <input required type="text" value={member.name} onChange={(e) => updateTeamMember(index, 'name', e.target.value)} className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 transition-all" />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-foreground mb-1 block">Email</label>
                          <input required type="email" value={member.email} onChange={(e) => updateTeamMember(index, 'email', e.target.value)} className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 transition-all" />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-foreground mb-1 block">Phone</label>
                          <input required type="tel" value={member.phone} onChange={(e) => updateTeamMember(index, 'phone', e.target.value)} className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 transition-all" />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-foreground mb-1 block">College</label>
                          <input required type="text" value={member.college} onChange={(e) => updateTeamMember(index, 'college', e.target.value)} className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 transition-all" />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-foreground mb-1 block">Branch</label>
                          <input required type="text" value={member.branch} onChange={(e) => updateTeamMember(index, 'branch', e.target.value)} className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 transition-all" />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-foreground mb-1 block">Year</label>
                          <input required type="text" value={member.year} onChange={(e) => updateTeamMember(index, 'year', e.target.value)} className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 transition-all" />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button 
                    disabled={loading}
                    type="submit"
                    className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-4 rounded-xl shadow-lg hover:shadow-blue-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-lg"
                  >
                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Complete Registration"}
                  </button>
               </form>
            </div>
          ) : isSuccess ? (
            <div className="text-center py-12 flex flex-col items-center bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md p-10 rounded-3xl">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-3xl font-black mb-4 text-foreground">Registration Successful!</h2>
              <div className="text-foreground/70 text-lg max-w-lg mx-auto space-y-4">
                <p>
                  Thank you, <strong>{name}</strong>! Your spot for the <strong>SIH Online Masterclass</strong> is confirmed.
                </p>
                <p className="font-medium text-foreground">
                  Please check your email and WhatsApp for the Google Meet link. See you this Friday at 5:30 PM!
                </p>
                <p className="text-sm text-foreground/50 pt-4">
                  Redirecting to homepage in 5 seconds...
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full">
              {/* Main Heading */}
              <div className="w-full flex flex-row md:flex-row items-center justify-start md:justify-start gap-4 md:gap-6 mb-10 md:mb-14 text-left">
                <Image src="/images/sih_logo.png" alt="SIH Logo" width={120} height={120} className="w-16 md:w-28 object-contain shrink-0" />
                <div className="text-left">
                  <h1 className="font-heading font-black tracking-tighter text-foreground text-3xl md:text-5xl drop-shadow-md mb-2">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">SIH Masterclass,</span> Winning Strategy
                  </h1>
                  <p className="text-sm md:text-xl font-bold text-foreground/70">
                    Online SIH Masterclass, From Internal round to Final Round.
                  </p>
                </div>
              </div>

              <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                  
                  {/* Left Side: Professional Overview & Deliverables */}
                  <div className="flex flex-col text-left w-full h-full">
                    
                    <div className="bg-blue-50/80 dark:bg-blue-900/20 backdrop-blur-md p-6 lg:p-8 rounded-3xl border border-blue-100 dark:border-blue-800/50 shadow-sm">
                      <p className="text-foreground/90 font-medium leading-relaxed text-base md:text-lg mb-6">
                        Confused about how college judges shortlist teams for Smart India Hackathon? Don't get eliminated in the internal round! Join our <strong>online SIH masterclass this Friday at 5:30 PM</strong>.
                      </p>
                      
                      <div className="mb-6">
                        <p className="font-bold text-foreground text-lg mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                          What You Will Get Inside:
                        </p>
                        <ul className="space-y-2.5">
                          <li className="flex items-start gap-2.5 text-foreground/80 font-medium text-sm md:text-base">
                            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                            <span><strong>Winning strategy</strong> directly from previous SIH Winners</span>
                          </li>
                          <li className="flex items-start gap-2.5 text-foreground/80 font-medium text-sm md:text-base">
                            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                            <span><strong>1-on-1 Q&A</strong> & dedicated doubt resolution for your SIH Hackathon project</span>
                          </li>
                          <li className="flex items-start gap-2.5 text-foreground/80 font-medium text-sm md:text-base">
                            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                            <span><strong>Official Winning PPT Format</strong> & presentation structure</span>
                          </li>
                          <li className="flex items-start gap-2.5 text-foreground/80 font-medium text-sm md:text-base">
                            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                            <span><strong>How to get selected</strong> in your Internal College Round</span>
                          </li>
                          <li className="flex items-start gap-2.5 text-foreground/80 font-medium text-sm md:text-base">
                            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                            <span><strong>SIH hackathon key dates</strong>, roadmap & submission timelines</span>
                          </li>
                          <li className="flex items-start gap-2.5 text-foreground/80 font-medium text-sm md:text-base">
                            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                            <span><strong>Top questions asked</strong> by evaluators in internal college screening rounds</span>
                          </li>
                          <li className="flex items-start gap-2.5 text-foreground/80 font-medium text-sm md:text-base">
                            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                            <span><strong>Official Judging Criteria</strong> and scoring parameters for SIH</span>
                          </li>
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-blue-200/60 dark:border-blue-800/40">
                        <p className="text-foreground/90 font-semibold text-base mb-2">
                          Secure your spot for masterclass by just <strong>₹29 for individual</strong> and team seats for <strong>₹150 for 6 teammates</strong>.
                        </p>
                        <p className="text-xs text-foreground/70 font-medium">
                          ⚡ Seat reservation is strictly on a first-come, first-served basis. Secure your registration ASAP to guarantee your spot.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Form */}
                  <div className="flex flex-col w-full max-w-md mx-auto lg:max-w-none lg:sticky lg:top-32">
                  <div className="bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                    
                    <h3 className="text-2xl font-bold mb-6 text-foreground">Secure your spot</h3>
                    
                    {error && (
                      <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-semibold mb-4 border border-red-100">
                        {error}
                      </div>
                    )}

                    <form onSubmit={handlePayment} className="flex flex-col gap-4">
                      
                      <div className="flex gap-4 mb-2">
                        <label className={`flex-1 flex items-center justify-center p-3 rounded-xl border cursor-pointer transition-all ${passType === "individual" ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300" : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-foreground/70"}`}>
                          <input type="radio" name="passType" value="individual" checked={passType === "individual"} onChange={() => setPassType("individual")} className="hidden" />
                          <span className="font-bold text-sm">Individual (₹29)</span>
                        </label>
                        <label className={`flex-1 flex items-center justify-center p-3 rounded-xl border cursor-pointer transition-all ${passType === "team" ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300" : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-foreground/70"}`}>
                          <input type="radio" name="passType" value="team" checked={passType === "team"} onChange={() => setPassType("team")} className="hidden" />
                          <span className="font-bold text-sm">Team (₹150)</span>
                        </label>
                      </div>

                      {passType === "team" && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 p-3 rounded-lg text-xs font-semibold border border-blue-200 dark:border-blue-800/50 mb-2">
                          Team Leader: Fill your details below to process the payment. You will add the details of the other 5 teammates after successful payment.
                        </div>
                      )}

                      <div>
                        <label className="text-sm font-bold text-foreground mb-1.5 block">
                          {passType === "team" ? "Team Leader Name" : "Full Name"}
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                          <input 
                            type="text" required placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)}
                            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-bold text-foreground mb-1.5 block">Email</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                            <input 
                              type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 pl-9 pr-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-bold text-foreground mb-1.5 block">Phone</label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                            <input 
                              type="tel" required placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)}
                              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 pl-9 pr-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-bold text-foreground mb-1.5 block">College Name</label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                          <input 
                            type="text" required placeholder="Institute of Technology..." value={college} onChange={(e) => setCollege(e.target.value)}
                            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-bold text-foreground mb-1.5 block">Branch</label>
                          <div className="relative">
                            <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                            <input 
                              type="text" required placeholder="CSE, IT..." value={branch} onChange={(e) => setBranch(e.target.value)}
                              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 pl-9 pr-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-bold text-foreground mb-1.5 block">Year</label>
                          <div className="relative">
                            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                            <input 
                              type="text" required placeholder="1st, 2nd..." value={year} onChange={(e) => setYear(e.target.value)}
                              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 pl-9 pr-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      <button 
                        disabled={loading || !razorpayLoaded}
                        type="submit"
                        className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-4 rounded-xl shadow-lg hover:shadow-blue-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-lg"
                      >
                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : `Pay ₹${passType === "individual" ? "29" : "150"}`}
                      </button>

                      <div className="flex items-center justify-center gap-1.5 mt-2 text-xs font-semibold text-zinc-400">
                        <ShieldCheck className="w-4 h-4 text-green-500" />
                        100% Secure Payments via Razorpay
                      </div>
                    </form>
                  </div>
                </div>

              </div>
              
              {/* Image Slider */}
              <div className="w-full overflow-hidden mt-20 pt-10 border-t border-zinc-200 dark:border-zinc-800 relative z-10">
                <h3 className="text-center font-bold text-2xl mb-8 text-foreground/80">Inside Smart India Hackathon</h3>
                <div className="animate-marquee flex gap-4 md:gap-8">
                  {[1, 2, 3, 4, 1, 2, 3, 4].map((num, idx) => (
                    <div key={idx} className="relative w-64 md:w-96 h-40 md:h-60 shrink-0 rounded-2xl overflow-hidden shadow-lg border border-black/5 dark:border-white/5">
                      <Image src={`/images/sih-slider-${num}.png`} alt="SIH Hackathon" fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </>
  );
}
