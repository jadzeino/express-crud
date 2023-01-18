import { Router } from 'express';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

import { validateRequest } from '../../middlewares';
import * as EmployeeHandlers from './employees.handlers';
import { Employee } from './employees.model';

const router = Router();

//list All Employees
router.get('/', EmployeeHandlers.findAll);

//get employee by id
router.get(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  EmployeeHandlers.findOne,
);

//create an employee
router.post(
  '/',
  validateRequest({
    body: Employee,
  }),
  EmployeeHandlers.createOne,
);

//update an employee
router.put(
  '/:id',
  validateRequest({
    params: ParamsWithId,
    body: Employee,
  }),
  EmployeeHandlers.updateOne,
);

//delete an employee
router.delete(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  EmployeeHandlers.deleteOne,
);

export default router;
