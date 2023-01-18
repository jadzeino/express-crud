import { WithId } from 'mongodb';
import * as z from 'zod';

import { db } from '../../db';

export const Employee = z.object({
  name: z.string().min(3),//Lee for example
  age: z.number().min(16),
  email: z.string().email({message:"Provided Email is not valid."}),
  title: z.string().min(2),//HR for example
});

export type Employee = z.infer<typeof Employee>;
export type EmployeeWithId = WithId<Employee>;
export const Employees = db.collection<Employee>('employees');
