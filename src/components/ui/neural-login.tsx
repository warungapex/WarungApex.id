"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/lib/actions/auth";

export function NeuralLogin() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await loginAction(new FormData(e.currentTarget));
      if (result?.error) {
        setError(result.error);
        setLoading(false);
      } else {
        // success — navigate to admin dashboard
        router.push("/admin");
        router.refresh();
      }
    } catch {
      // redirect() throws internally in Next.js — treat as success
      router.push("/admin");
      router.refresh();
    }
  }

  // Fixed positions to avoid SSR/client hydration mismatch
  const blobsData = [
    { size: 280, left: 15, top: 20,  animationDelay: -5,  animationDuration: 22 },
    { size: 220, left: 70, top: 10,  animationDelay: -10, animationDuration: 18 },
    { size: 350, left: 55, top: 55,  animationDelay: -3,  animationDuration: 25 },
    { size: 180, left: 10, top: 65,  animationDelay: -15, animationDuration: 20 },
    { size: 260, left: 80, top: 75,  animationDelay: -8,  animationDuration: 17 },
    { size: 200, left: 40, top: 85,  animationDelay: -12, animationDuration: 23 },
  ];

  return (
    <div className="neural-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;800&family=Space+Mono&display=swap');

        :root {
          --bg: #050505;
          --mercury: #e0e0e0;
          --mercury-dark: #666666;
          --accent: #ffffff;
          --text-dim: rgba(255, 255, 255, 0.5);
          --filter-goo: url('#gooey');
        }

        .neural-wrapper {
          background-color: var(--bg);
          color: var(--accent);
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          width: 100vw;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .neural-wrapper * {
          box-sizing: border-box;
          -webkit-font-smoothing: antialiased;
        }

        .stage {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 0;
          filter: var(--filter-goo);
          opacity: 0.6;
        }

        .blob {
          position: absolute;
          background: linear-gradient(135deg, var(--mercury), #888);
          border-radius: 50%;
          filter: blur(20px);
          animation: float 20s infinite alternate ease-in-out;
          box-shadow: inset -10px -10px 20px rgba(0,0,0,0.5), 
                      10px 10px 30px rgba(255,255,255,0.2);
        }

        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(10vw, 20vh) scale(1.2); }
          66% { transform: translate(-5vw, 10vh) scale(0.8); }
          100% { transform: translate(5vw, -10vh) scale(1.1); }
        }

        .auth-container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 440px;
          padding: 40px;
        }

        .header {
          margin-bottom: 60px;
          text-align: left;
        }

        .brand-id {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--text-dim);
          margin-bottom: 8px;
          display: block;
        }

        .header h1 {
          font-weight: 800;
          font-size: 3rem;
          line-height: 0.9;
          letter-spacing: -2px;
          margin-left: -4px;
          margin-top: 0;
        }

        .form-group {
          position: relative;
          margin-bottom: 30px;
          transition: transform 0.4s cubic-bezier(0.2, 1, 0.3, 1);
        }

        .form-group:focus-within {
          transform: translateX(10px);
        }

        .form-group label {
          display: block;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: var(--text-dim);
          margin-bottom: 12px;
          text-transform: uppercase;
        }

        .form-group input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: none;
          color: var(--accent);
          padding: 12px 0;
          font-size: 18px;
          outline: none;
          box-shadow: none;
          transition: border-color 0.4s;
          -webkit-appearance: none;
          appearance: none;
        }

        .form-group input:-webkit-autofill,
        .form-group input:-webkit-autofill:hover,
        .form-group input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0px 1000px #050505 inset !important;
          -webkit-text-fill-color: var(--accent) !important;
          caret-color: var(--accent);
          border: none !important;
          border-bottom: none !important;
          outline: none !important;
        }

        .form-group input:focus {
          outline: none !important;
          box-shadow: none !important;
        }

        .input-glow {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 2px;
          background: var(--mercury);
          transition: width 0.6s cubic-bezier(0.2, 1, 0.3, 1);
          box-shadow: 0 0 15px var(--mercury);
        }

        .form-group input:focus + .input-glow {
          width: 100%;
        }

        .submit-wrap {
          margin-top: 50px;
          position: relative;
          filter: var(--filter-goo);
        }

        .btn-base {
          background: var(--accent);
          color: #000;
          border: none;
          padding: 20px 40px;
          font-size: 14px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          cursor: pointer;
          width: 100%;
          position: relative;
          z-index: 2;
          transition: letter-spacing 0.3s;
          border-radius: 50px;
        }

        .btn-base:hover:not(:disabled) {
          letter-spacing: 4px;
        }

        .btn-base:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .mercury-drop {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          background: var(--mercury);
          transform: translate(-50%, -50%);
          z-index: 1;
          border-radius: 50px;
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .submit-wrap:hover .mercury-drop {
          transform: translate(-50%, -50%) scale(1.05, 1.2);
          filter: brightness(1.2);
        }

        .error-msg {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #fca5a5;
          padding: 12px 16px;
          border-radius: 6px;
          font-size: 13px;
          margin-bottom: 20px;
          margin-top: 10px;
        }

        .svg-filter-hidden {
          position: absolute;
          width: 0;
          height: 0;
        }
      `}</style>

      <svg className="svg-filter-hidden">
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" 
              result="goo" 
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
          </filter>
        </defs>
      </svg>

      <div className="stage">
        {blobsData.map((data, index) => (
          <div
            key={index}
            className="blob"
            style={{
              width: `${data.size}px`,
              height: `${data.size}px`,
              left: `${data.left}%`,
              top: `${data.top}%`,
              animationDelay: `${data.animationDelay}s`,
              animationDuration: `${data.animationDuration}s`,
            }}
          />
        ))}
      </div>

      <main className="auth-container">
        <header className="header">
          <span className="brand-id">System Node: WARUNG_APEX</span>
          <h1>NEURAL<br/>ACCESS</h1>
        </header>

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group">
            <label>User Identity</label>
            <input 
              name="email"
              type="email" 
              placeholder="admin@warungapex.id" 
              required 
              autoComplete="email"
            />
            <div className="input-glow"></div>
          </div>

          <div className="form-group">
            <label>Sequence Key</label>
            <input 
              name="password"
              type="password" 
              placeholder="••••••••" 
              required 
              autoComplete="current-password"
            />
            <div className="input-glow"></div>
          </div>

          {error && (
            <div className="error-msg">
              {error}
            </div>
          )}

          <div className="submit-wrap">
            <div className="mercury-drop"></div>
            <button type="submit" className="btn-base" disabled={loading}>
              {loading ? "INITIALIZING..." : "Initialize Stream"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
