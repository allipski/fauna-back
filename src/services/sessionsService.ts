import { signInData } from "@/controllers";
import { couldNotSignInError, invalidCredentialsError } from "@/errors";
import bcrypt from "bcrypt";
import organizationsRepository from "@/repositories/organizationsRepository";
import sessionsRepository from "@/repositories/sessionsRepository";
import jwt from "jsonwebtoken";

async function signIn(signInData: signInData) {
    const { email, password } = signInData;

    try {
        const user = await getOrganizationByEmail(email);
        await validatePassword(password, user.password);
        const token = await createSession(user.id);
        return token;
    } catch (err) {
        throw couldNotSignInError();
    }
}

async function getOrganizationByEmail(email: string) {
    const user = await organizationsRepository.findByEmail(email);
    if (!user) throw invalidCredentialsError(); 
    return user;
  }

  async function validatePassword(password: string, userPassword: string) {
    const isPasswordValid = await bcrypt.compare(password, userPassword);
    if (!isPasswordValid) throw invalidCredentialsError();
  }

  async function createSession(userId: number) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);
    await sessionsRepository.createSession(userId, token)
  
    return token;
  }

const sessionsService = {
    signIn
}

export default sessionsService