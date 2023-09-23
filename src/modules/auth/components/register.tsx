import React, { memo, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface RegisterProps {
  signUpWithEmail: any;
  setForm: any;
}

function Register({ signUpWithEmail, setForm }: RegisterProps) {
  const emailRef = useRef<any>();
  const pwdRef = useRef<any>();
  const pwdConfirmRef = useRef<any>();
  const [error, setError] = useState('')

  const onSignUpWithEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!pwdConfirmRef.current.value?.length || !pwdRef.current.value || !emailRef.current.value){
        setError('There are fields is not filling!')
        return;
    }
    else {
        setError('')
    }
    if (pwdConfirmRef.current.value !== pwdRef.current.value){
        setError('Confirm password is incorrect!')
        return;
    }
    else {
        setError('')
    }

    await signUpWithEmail(emailRef.current.value, pwdRef.current.value);
  };

  useEffect(() => {
    if (!error.length) return;
    const timeOut = setTimeout(() => {
        setError('')
    }, 2000)
    return () => {
        clearTimeout(timeOut)
    }
  }, [error])

  return (
    <form className="flex flex-col gap-5 bg-slate-100 p-10 rounded-md w-11/12 max-w-xl">
      <h2 className="text-2xl font-medium md:text-3xl">Sign Up </h2>
      {error && !!error.length && <div className="alert alert-error">{error}</div>}
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
      <div className="form-control">
        <label className="label">
          <span className="label-text">Confirm Password</span>
        </label>
        <input
          type="password"
          placeholder="Enter your password again"
          className="input input-bordered input-primary"
          ref={pwdConfirmRef}
        />
      </div>
      <div className="flex flex-col gap-5 items-end">
        <button className="w-full btn btn-primary md:w-40" onClick={onSignUpWithEmail}>Sign Up</button>
      </div>
      <a
        className="text-blue-600 underline text-base cursor-pointer"
        onClick={() => setForm(true)}
      >
        Already have account ? Sign In
      </a>
    </form>
  );
}

export default memo(Register);
