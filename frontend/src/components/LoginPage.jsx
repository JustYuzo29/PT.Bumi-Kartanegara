import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import businessTeamImage from "../assets/business-team.gif"; // Gambar GIF lokal

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // jika pakai session/cookie
      });

      if (response.ok) {
        window.location.href = "http://localhost:5173"; // Ganti dengan URL frontend-admin Anda jika berbeda
      } else {
        const data = await response.json();
        setErrorMessage(data.detail || "Email atau password salah.");
      }
    } catch (error) {
      setErrorMessage("Terjadi kesalahan pada server.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-950 font-inter px-4">
      <div className="flex flex-col sm:flex-row w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl">
        {/* Form Panel */}
        <div className="flex-1 order-2 sm:order-1 p-8 sm:p-12 bg-white">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-2">Selamat Datang</h2>
            <p className="text-center text-sm text-gray-500 mb-6">Silakan login untuk melanjutkan</p>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="you@example.com"
                required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="••••••••"
                required
                />
              </div>

              {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-700 text-white font-semibold py-2 rounded-lg hover:bg-blue-800 transition duration-300"
              >
                Masuk
              </button>

              <div className="text-right text-xs text-gray-500 hover:text-blue-600 mt-2">
                <a href="#">Lupa password?</a>
              </div>
            </form>
          </div>
        </div>

        {/* Image Panel */}
        <div className="flex-1 order-1 sm:order-2 relative bg-blue-700 flex items-center justify-center p-4 sm:p-6">
          <img
            src={businessTeamImage}
            alt="Business Team Illustration"
            className="w-full h-auto max-h-[90vh] object-contain drop-shadow-xl"
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white font-semibold text-base sm:text-lg text-center">
            PT. BUMI KARTANEGARA
          </div>
        </div>
      </div>
    </div>
  );
}
