import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthCard } from '../components/auth/AuthCard';

export default function LoginPage() {
  const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
      const [error, setError] = useState('');
        const [formData, setFormData] = useState({
            username: '',
                password: '',
                  });

                    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                        setFormData({
                              ...formData,
                                    [e.target.name]: e.target.value,
                                        });
                                          };

                                            const handleSubmit = async (event: FormEvent) => {
                                                event.preventDefault();
                                                    setError('');

                                                        if (!formData.username.trim() || !formData.password) {
                                                              setError('Please enter your username and password');
                                                                    return;
                                                                        }

                                                                            setLoading(true);

                                                                                try {
                                                                                      // Simulate/Trigger Authentication logic or Supabase Call
                                                                                            setTimeout(() => {
                                                                                                    setLoading(false);
                                                                                                            navigate('/home');
                                                                                                                  }, 1000);
                                                                                                                      } catch (err: any) {
                                                                                                                            setLoading(false);
                                                                                                                                  setError(err?.message || 'An unexpected error occurred during login');
                                                                                                                                      }
                                                                                                                                        };

                                                                                                                                          return (
                                                                                                                                              <div className="min-h-screen w-full bg-[#07090e] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
                                                                                                                                                    {/* Background Subtle Gradient Blurs */}
                                                                                                                                                          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-900/20 blur-[120px] rounded-full pointer-events-none" />
                                                                                                                                                                <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-purple-900/15 blur-[100px] rounded-full pointer-events-none" />

                                                                                                                                                                      {/* Main Glass Card Component */}
                                                                                                                                                                            <AuthCard
                                                                                                                                                                                    mode="login"
                                                                                                                                                                                            formData={formData}
                                                                                                                                                                                                    onChange={handleChange}
                                                                                                                                                                                                            onSubmit={handleSubmit}
                                                                                                                                                                                                                    onToggleMode={() => navigate('/signup')}
                                                                                                                                                                                                                            loading={loading}
                                                                                                                                                                                                                                    error={error}
                                                                                                                                                                                                                                          />
                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                