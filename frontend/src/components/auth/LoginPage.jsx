import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import businessTeamImage from "../../assets/company/Hero.png";
import axios from "axios";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login - PT. Bumi Kartanegara";
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) favicon.href = "/favicon.ico";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await axios.post("http://localhost:8000/api/login/", {
        username,
        password,
      });

      // Menyimpan data autentikasi di localStorage
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      localStorage.setItem("user_name", res.data.username);
      localStorage.setItem("user_email", res.data.email);
      // Mengganti "role" dengan "tipe"
      localStorage.setItem("tipe", res.data.tipe);

      // Logika navigasi berdasarkan tipe pengguna
      if (res.data.tipe === "admin") {
        navigate("/admin");
      } else if (res.data.tipe === "staff") {
        // Set flag untuk staff login juga
        localStorage.setItem("isStaffLoggedIn", "true");
        navigate("/staff");
      } else {
        setErrorMsg("Tipe pengguna tidak dikenali");
      }
    } catch (err) {
      setErrorMsg("Username atau password salah.");
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="username"
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

              {errorMsg && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-700 text-white font-semibold py-2 rounded-lg hover:bg-blue-800 transition duration-300"
              >
                Masuk
              </button>
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
