'use client';

import { useForm, SubmitHandler } from 'react-hook-form';

import React from 'react';

type Inputs = {
  username: string;
  email: string;
  password: string;
};

export default function page() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input
        {...register('username', { required: true })}
        placeholder="username"
      />
      <br />

      {/* include validation with required or other standard HTML validation rules */}
      <input {...register('email', { required: true })} placeholder="email" />

      <br />
      <input
        {...register('password', { required: true })}
        placeholder="password"
      />
      {/* errors will return when field validation fails  */}

      <br />
      <input type="submit" />
    </form>
  );
}
