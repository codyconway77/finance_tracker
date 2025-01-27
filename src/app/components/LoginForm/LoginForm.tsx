'use client';
import { useState } from 'react';
import { useLoginMutation } from 'src/generated/graphql';
import { useAuth } from 'src/hooks/useAuth';

const LoginForm = ({ className = '' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data, loading, error }] = useLoginMutation();
  const loginHook = useAuth().login; //should refactor this a bit later.

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { email, password } });
      // Store the token in localStorage or a secure cookie
      loginHook(data?.login);
      // Redirect to dashboard or update app state
      alert (`Logged in successfully + ${data?.login.user?.name}`);
    } catch (err) {
      alert(`Login error: ${err}`);
    }
  };
  
  return (
    <div className={`bg-white p-6 ${className}`}>
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign in</h2>
        <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
}

export default LoginForm;