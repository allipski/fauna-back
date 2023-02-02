import { Router } from "express";
import { postSpecies, getSpecies, getSingleSpecies } from '@/controllers'
import { authenticateToken } from "@/middlewares/authMiddleware";
import { validateSpeciesInput } from "@/middlewares/validateSpeciesInput";

const SpeciesRouter = Router();

SpeciesRouter
    .all("/*", authenticateToken)
    .post('/', validateSpeciesInput, postSpecies)
    .get('/', getSpecies)
    .get('/:id', getSingleSpecies);

export { SpeciesRouter };