import { Router } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import ActivityLog from '../models/ActivityLog';

const router = Router();

router.post('/logs', authenticate, async (req: AuthRequest, res: any) => {
  try {
    const { crop_cycle_id, activity_type, details } = req.body;
    
    if (!crop_cycle_id || !activity_type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const log = new ActivityLog({
      crop_cycle_id,
      activity_type,
      details
    });

    await log.save();
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create activity log' });
  }
});

// For fetching logs (useful for calendar)
router.get('/logs/:crop_cycle_id', authenticate, async (req: AuthRequest, res: any) => {
  try {
    const { crop_cycle_id } = req.params;
    const logs = await ActivityLog.find({ crop_cycle_id }).sort({ logged_at: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});

export default router;
