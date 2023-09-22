import React, { useRef } from "react";
import { FcGoogle } from "react-icons/fc";

interface LoginProps {
  signInWithEmail: any;
  signInWithGoogle: any;
  setForm: any
}

function Login({
  signInWithEmail,
  signInWithGoogle,
  setForm
}: LoginProps) {
  const emailRef = useRef<any>();
  const pwdRef = useRef<any>();
  
  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await signInWithEmail(emailRef.current.value, pwdRef.current.value);
  };

  const onSignInWithGoogle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await signInWithGoogle();
  };


  return (
    <form className="flex flex-col gap-5 bg-slate-100 p-10 rounded-md w-11/12 max-w-xl">
      <h2 className="text-2xl font-medium md:text-3xl">Sign In </h2>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="text"
          placeholder="Enter your email"
          className="input input-bordered input-primary"
          ref={emailRef}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          className="input input-bordered input-primary"
          ref={pwdRef}
        />
      </div>
      <div className="flex flex-col gap-5 items-end">
        <button className="w-full btn btn-primary md:w-40" onClick={onSubmit}>
          Sign In
        </button>
        <button className="w-full bg-white btn" onClick={onSignInWithGoogle}>
          <FcGoogle />
          Sign In With Google
        </button>
      </div>
      <a className="text-blue-600 underline text-base cursor-pointer" onClick={() => setForm(false)}>Don't have account ? Sign Up</a>
    </form>
  );
}

export default Login;
