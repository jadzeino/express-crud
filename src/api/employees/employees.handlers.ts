import { Response, Request, NextFunction } from 'express';
import { ObjectId } from 'mongodb';

import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { EmployeeWithId, Employees, Employee } from './employees.model';

export async function findAll(req: Request, res: Response<EmployeeWithId[]>, next: NextFunction) {
  try {
    const employees = await Employees.find().toArray();
    res.json(employees);
  } catch (error) {
    next(error);
  }
}

export async function createOne(req: Request<{}, EmployeeWithId, Employee>, res: Response<EmployeeWithId>, next: NextFunction) {
  try {
    const insertResult = await Employees.insertOne(req.body);
    if (!insertResult.acknowledged) throw new Error('Error inserting employee.');
    res.status(201);
    res.json({
      _id: insertResult.insertedId,
      ...req.body,
    });
  } catch (error) {
    next(error);    
  }
}

export async function findOne(req: Request<ParamsWithId, EmployeeWithId, {}>, res: Response<EmployeeWithId>, next: NextFunction) {
  try {
    const result = await Employees.findOne({
      _id: new ObjectId(req.params.id),
    });
    if (!result) {
      res.status(404);
      throw new Error(`Employee with id "${req.params.id}" not found.`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateOne(req: Request<ParamsWithId, EmployeeWithId, Employee>, res: Response<EmployeeWithId>, next: NextFunction) {
  try {
    const result = await Employees.findOneAndUpdate({
      _id: new ObjectId(req.params.id),
    }, {
      $set: req.body,
    }, {
      returnDocument: 'after',
    });
    if (!result.value) {
      res.status(404);
      throw new Error(`Employee with id "${req.params.id}" not found.`);
    }
    res.json(result.value);
  } catch (error) {
    next(error);
  }
}

export async function deleteOne(req: Request<ParamsWithId, {}, {}>, res: Response<{}>, next: NextFunction) {
  try {
    const result = await Employees.findOneAndDelete({
      _id: new ObjectId(req.params.id),
    });
    if (!result.value) {
      res.status(404);
      throw new Error(`Employee with id "${req.params.id}" not found.`);
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  } 
}