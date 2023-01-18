import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import employees from './employees/employees.routes';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/employees', employees);

export default router;
