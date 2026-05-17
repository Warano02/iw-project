"use client";
import axios from "@/lib/axios";
import { useState } from "react";

function CreateUser() {
  const [payload, setPayload] = useState({
    matricule: "",
    name: "",
    prenon: "",
    email: "",
    faculte: "",
    level: "",
    sex: "",
    birtdate: "",
    school: "",
  });
  const handleSubmit = async () => {
    try {
      const { data } = await axios.post("/student", payload);
      alert(data.msg || "Ayiiii utilisateur cree ");
    } catch (e) {
      console.log("Error while creatin new user ", e);
    }
  };
  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      {/* Nom / Prénom */}
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="matricule"
          onChange={(e) =>
            setPayload((prev) => ({ ...prev, matricule: e.target.value }))
          }
          className="w-full bg-black border border-white-500 text-white placeholder-gray-400 rounded-xl p-3 outline-none focus:ring-2 focus:ring-white-500"
        />
        <input
          type="name"
          placeholder="Nom"
          onChange={(e) =>
            setPayload((prev) => ({ ...prev, name: e.target.value }))
          }
          className="w-full bg-black border border-white-500 text-white placeholder-gray-400 rounded-xl p-3 outline-none focus:ring-2 focus:ring-white-500"
        />
      </div>
      <input
        type="text"
        placeholder="email"
        onChange={(e) =>
          setPayload((prev) => ({ ...prev, email: e.target.value }))
        }
        className="w-full bg-black border border-white-500 text-white placeholder-gray-400 rounded-xl p-3 outline-none focus:ring-2 focus:ring-white-500"
        required
      />
      <input
        type="text"
        placeholder="faculte"
        onChange={(e) =>
          setPayload((prev) => ({ ...prev, faculte: e.target.value }))
        }
        className="w-full bg-black border border-white-500 text-white placeholder-gray-400 rounded-xl p-3 outline-none focus:ring-2 focus:ring-white-500"
      />
      <input
        type="text"
        placeholder="level"
        onChange={(e) =>
          setPayload((prev) => ({ ...prev, level: e.target.value }))
        }
        className="w-full bg-black border border-white-500 text-white placeholder-gray-400 rounded-xl p-3 outline-none focus:ring-2 focus:ring-white-500"
      />
      <input
        type="text"
        placeholder="Sex"
        onChange={(e) =>
          setPayload((prev) => ({ ...prev, sex: e.target.value }))
        }
        className="w-full bg-black border border-white-500 text-white placeholder-gray-400 rounded-xl p-3 outline-none focus:ring-2 focus:ring-white-500"
      />
      <input
        type="date"
        placeholder="birthdate"
        onChange={(e) =>
          setPayload((prev) => ({ ...prev, date: e.target.value }))
        }
        className="w-full bg-black border border-white-500 text-white placeholder-gray-400 rounded-xl p-3 outline-none focus:ring-2 focus:ring-white-500"
      />

      <input
        type="text"
        placeholder="school"
        onChange={(e) =>
          setPayload((prev) => ({ ...prev, school: e.target.value }))
        }
        className="w-full bg-black border border-white-500 text-white placeholder-gray-400 rounded-xl p-3 outline-none focus:ring-2 focus:ring-white-500"
      />

      {/* Boutons */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          className="px-5 py-2 rounded-xl border border-white text-white hover:bg-white hover:text-black transition"
        >
          Annuler
        </button>

        <button
          type="submit"
          className="px-5 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition shadow-lg shadow-pink-500/40"
        >
          Ajouter
        </button>
      </div>
    </form>
  );
}

export default CreateUser;
