import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { motion } from 'motion/react';
import { Leaf } from 'lucide-react';

export const Onboarding = () => {
  const { login } = useAuthStore();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: phone, 2: otp, 3: farm setup

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    // mock API call
    setStep(2);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === '1234') {
      setStep(3);
    } else {
      alert('Invalid OTP. Use 1234');
    }
  };

  const handleSetupFarm = (e: React.FormEvent) => {
    e.preventDefault();
    login('mock-jwt-token', { phone, role: 'farmer', farm_setup: true });
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 'var(--space-4)', background: 'linear-gradient(135deg, var(--color-success) 0%, var(--color-background) 100%)'
    }}>
      <motion.div 
        className="card glass"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ maxWidth: '400px', width: '100%' }}
      >
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>
          <div style={{
            display: 'inline-flex', padding: '16px', borderRadius: '50%',
            backgroundColor: 'var(--color-primary)', color: 'white', marginBottom: 'var(--space-3)'
          }}>
            <Leaf size={32} />
          </div>
          <h1 style={{ color: 'var(--color-primary)' }}>Kisan Sathi</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>Empowering Farmers with AI</p>
        </div>

        {step === 1 && (
          <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <div>
              <label>Phone Number</label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Enter 10-digit number" required />
            </div>
            <button type="submit" className="btn" style={{ width: '100%' }}>Send OTP</button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <div>
              <label>Enter OTP (Use 1234 for demo)</label>
              <input type="text" value={otp} onChange={e => setOtp(e.target.value)} placeholder="4-digit code" required />
            </div>
            <button type="submit" className="btn" style={{ width: '100%' }}>Verify & Continue</button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleSetupFarm} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <h3>Farm Setup</h3>
            <div>
              <label>Farm Name</label>
              <input type="text" placeholder="My Farm" required />
            </div>
            <div>
              <label>Soil Type</label>
              <select required>
                <option value="">Select Soil Type</option>
                <option value="black">Black Soil</option>
                <option value="red">Red Soil</option>
                <option value="alluvial">Alluvial</option>
              </select>
            </div>
            <button type="submit" className="btn" style={{ width: '100%' }}>Complete Setup</button>
          </form>
        )}
      </motion.div>
    </div>
  );
};
