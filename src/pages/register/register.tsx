// src/pages/Register.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Definindo o esquema de validação com Yup
const schema = Yup.object({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: Yup.string().min(6, 'Senha deve ter no mínimo 6 caracteres').required('Senha é obrigatória'),
  phone: Yup.string().required('Telefone é obrigatório'),
});

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data); // Aqui você pode enviar para a API
  };

  return (
    <div>
      <h1>Cadastro de Usuário</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nome</label>
          <input {...register('name')} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div>
          <label>E-mail</label>
          <input {...register('email')} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label>Senha</label>
          <input type="password" {...register('password')} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div>
          <label>Telefone</label>
          <input {...register('phone')} />
          {errors.phone && <p>{errors.phone.message}</p>}
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Register;
