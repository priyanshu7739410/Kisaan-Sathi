import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Mock OTP store for development
const otps = new Map<string, string>();

router.post('/login', async (req, res) => {
  const { phone_number } = req.body;
  if (!phone_number) {
    return res.status(400).json({ error: 'phone_number is required' });
  }
  
  // In a real app, send OTP via SMS. Here we just mock it as '1234'
  otps.set(phone_number, '1234');
  
  res.json({ message: 'OTP sent successfully', mockOtp: '1234' });
});

router.post('/verify', async (req, res) => {
  const { phone_number, otp } = req.body;
  
  if (!phone_number || !otp) {
    return res.status(400).json({ error: 'phone_number and otp are required' });
  }

  const validOtp = otps.get(phone_number);
  if (validOtp !== otp) {
    return res.status(401).json({ error: 'Invalid OTP' });
  }

  // Find or create user
  let user = await User.findOne({ phone_number });
  if (!user) {
    user = new User({ phone_number });
    await user.save();
  }

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  
  // Clean up used OTP
  otps.delete(phone_number);

  res.json({ token, user });
});

export default router;
