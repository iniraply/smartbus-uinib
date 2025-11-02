export default function LoginPenumpang() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-6 text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-4">
          Login Penumpang
        </h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
