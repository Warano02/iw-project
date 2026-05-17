"use client";

import axios from "@/lib/axios";
import { useState } from "react";

function CreateAdminForm() {
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    matricule: "",
    bithdate: "",
  });
  const handleSubmit = async () => {
    try {
      const { data } = await axios.post("/create-teacher", payload);
      alert(data.msg || "Enseignant cree ");
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
          onChange={(e) =>
            setPayload((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Nom"
          className="w-full bg-black border border-white-500 text-white placeholder-gray-400 rounded-xl p-3 outline-none focus:ring-2 focus:ring-white-500"
        />
      </div>

      {/* Email */}
      <input
        type="email"
        placeholder="Email"
        onChange={(e) =>
          setPayload((prev) => ({ ...prev, email: e.target.value }))
        }
        className="w-full bg-black border border-white-500 text-white placeholder-gray-400 rounded-xl p-3 outline-none focus:ring-2 focus:ring-white-500"
        required
      />
      {/*Creer un composant client pour la gestion des formulaires */}
      {/* Matricule */}
      <input
        type="text"
        placeholder="Matricule "
        onChange={(e) =>
          setPayload((prev) => ({ ...prev, matricule: e.target.value }))
        }
        className="w-full bg-black border border-white-500 text-white placeholder-gray-400 rounded-xl p-3 outline-none focus:ring-2 focus:ring-white-500"
        required
      />

      {/* specialite*/}
      <input
        type="date"
        placeholder="birthdate"
        onChange={(e) =>
          setPayload((prev) => ({ ...prev, birthdate: e.target.value }))
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

export default CreateAdminForm;
