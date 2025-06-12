'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from '@/lib/axios';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post('/auth/login', { email, password });
      router.push('/dashboard');
    } catch (err) {
      alert('Login gagal');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full border p-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full border p-2"
      />
      <button type="submit" className="bg-black text-white px-4 py-2 rounded">Login</button>
    </form>
  );
}
