export const metadata = {
  title: "Create new user",
};
import CreateUser from "@/components/user/dashboard/CreateUser";

function page() {
  return (
    <div className="min-h-75 bg-transparent flex items-center justify-center p-6 mb-10">
      {/* Card formulaire */}
      <div className="w-full max-w-2xl bg-black rounded-2xl p-8 shadow-[0_0_10px_black] border border-white-500">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-white">Ajouter un étudiant</h1>
        </div>
        <CreateUser />
      </div>
    </div>
  );
}
export default page;
