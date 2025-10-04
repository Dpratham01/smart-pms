import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, user } = useSelector((s) => s.auth);

  const onSubmit = (data) => dispatch(loginUser(data));

  if (user) navigate("/");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-lg rounded-xl p-8 w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <input {...register("email")} placeholder="Email" className="w-full mb-3 p-2 border rounded" />
        <input {...register("password")} type="password" placeholder="Password" className="w-full mb-3 p-2 border rounded" />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
