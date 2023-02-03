import { Router } from "express";
import { postIndividual, getIndividuals, getSingleIndividual } from '@/controllers'
import { authenticateToken } from "@/middlewares/authMiddleware";
import { validateIndividualInput } from "@/middlewares/validateIndividualInput";

const IndividualsRouter = Router();

IndividualsRouter
    .all("/*", authenticateToken)
    .post('/', validateIndividualInput, postIndividual)
    .get('/', getIndividuals)
    .get('/:id', getSingleIndividual);

export { IndividualsRouter };