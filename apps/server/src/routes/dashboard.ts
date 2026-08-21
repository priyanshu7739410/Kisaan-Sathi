import { Router } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import Farm from '../models/Farm';
import axios from 'axios';

const router = Router();

router.get('/alerts', authenticate, async (req: AuthRequest, res: any) => {
  try {
    const user_id = req.user.id;
    // Find the user's farm to get GPS location
    const farm = await Farm.findOne({ user_id });
    if (!farm) {
      return res.status(404).json({ error: 'Farm not found. Complete onboarding first.' });
    }

    const [lon, lat] = farm.gps_location.coordinates;
    
    // In P0, we mock the OpenWeather integration or use actual if we had the API key
    // Here we will generate a mock heatwave alert based on the spec
    // Scenario Decision Journey: Heatwave forecast (Tmax >= 40°C) triggers alert

    const alerts = [
      {
        id: 'alert_heatwave_01',
        type: 'weather_threat',
        title: 'Heatwave Warning',
        severity: 'high',
        description: 'Temperatures are expected to exceed 40°C in the next 48 hours.',
        scenarios: [
          { id: 'opt_a', text: 'Mulch and irrigate', recommended: true },
          { id: 'opt_b', text: 'Do nothing', recommended: false }
        ]
      }
    ];

    res.json({ alerts, location: { lat, lon } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
});

export default router;
