import { Request, Response } from "express";
import * as testsService from "../services/testsService.js";
import { CreateTestData } from "../repositories/testsRepository.js";

export async function insertTest(req: Request, res: Response) {
  const test: CreateTestData = req.body;

  await testsService.insertTest(test);
  return res.sendStatus(201);
}

export async function getAllTestsByDisciplines(req: Request, res: Response) {
  const tests = await testsService.getAllTestsByDisciplines();
  return res.status(200).send(tests);
}