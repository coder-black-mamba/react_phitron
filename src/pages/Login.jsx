import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuthContext from "../hooks/useAuthContext";
import { useState } from "react";
import ErrorAlert from "../components/ErrorAlert";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors ,isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const { errorMsg, loginUser } = useAuthContext();

  const onSubmit = async (data) => {
    try { 
    await loginUser(data);
    navigate("/dashboard");
    } catch (error) {
      console.log("Login Failed", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-5 w-1/2 border-2 border-black rounded bg-base-200"> 
          <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
          {errorMsg && <ErrorAlert message={errorMsg} />}
          <h2 className="card-title text-2xl font-bold">Sign in</h2> 
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                className={`input input-bordered w-full ${
                  errors.email ? "input-error" : ""
                }`}
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="label-text-alt text-error">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className={`input input-bordered w-full ${
                  errors.email ? "input-error" : ""
                }`}
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <span className="label-text-alt text-error">
                  {errors.password.message}
                </span>
              )}
            </div>

            <button className='btn btn-warning w-full' onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>Login {isSubmitting && <span className="loading loading-ring loading-md"></span>}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-base-content/70">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="link link-primary">
                Sign up
              </Link>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Login;