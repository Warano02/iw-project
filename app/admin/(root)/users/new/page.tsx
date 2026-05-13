/*export const metadata={
    title:"Create new user"
}
function CreateUser() {
  return (
    <div>CreateUser</div>
  )
}

export default CreateUser*/

export const metadata = {
  title: "Create new user",
};

function CreateUser() {
  return (
    <div className="min-h-75 bg-transparent flex items-center justify-center p-6 mb-10">
      {/* Card formulaire */}
      <div className="w-full max-w-2xl bg-black rounded-2xl p-8 shadow-[0_0_10px_black] border border-white-500">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-white">Ajouter un étudiant</h1>
        </div>

        {/* Formulaire */}
        <form className="space-y-5">
          {/* Nom / Prénom */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nom"
              className="w-full bg-black border border-white-500 text-white placeholder-gray-400 rounded-xl p-3 outline-none focus:ring-2 focus:ring-white-500"
            />

            <input
              type="text"
              placeholder="Prénom"
              className="w-full bg-black border border-white-500 text-white placeholder-gray-400 rounded-xl p-3 outline-none focus:ring-2 focus:ring-white-500"
            />
          </div>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-black border border-white-500 text-white placeholder-gray-400 rounded-xl p-3 outline-none focus:ring-2 focus:ring-white-500"
            required
          />

          {/* Matricule */}
          <input
            type="text"
            placeholder="Matricule (ex: 23A674FS)"
            className="w-full bg-black border border-white-500 text-white placeholder-gray-400 rounded-xl p-3 outline-none focus:ring-2 focus:ring-white-500"
            required
          />

          {/* Classe */}
          <select className="w-full bg-black border border-white-500 text-white rounded-xl p-3 outline-none focus:ring-2 focus:ring-white-500">
            <option>Choix du niveau</option>
            <option>Niveau 1</option>
            <option>Niveau 2</option>
            <option>Niveau 3</option>
          </select>

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
      </div>
    </div>
  );
}
export default CreateUser;
