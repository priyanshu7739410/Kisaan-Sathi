import { Router } from 'express';
import Farm from '../models/Farm';
import { authenticate } from '../middleware/auth';

const router = Router();

// We need an authenticate middleware, I will create it.
router.post('/register', authenticate, async (req: any, res: any) => {
  try {
    const { name, soil_type, water_source, lat, lon } = req.body;
    
    if (!name || !soil_type || !water_source || !lat || !lon) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const farm = new Farm({
      user_id: req.user.id,
      name,
      soil_type,
      water_source,
      gps_location: {
        type: 'Point',
        coordinates: [parseFloat(lon), parseFloat(lat)] // GeoJSON is [longitude, latitude]
      }
    });

    await farm.save();
    res.status(201).json(farm);
  } catch (error) {
    res.status(500).json({ error: 'Failed to register farm' });
  }
});

export default router;
