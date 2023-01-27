import { signUpData } from "@/controllers";
import { couldNotSignUpError } from "@/errors";
import organizationsRepository from "@/repositories/organizationsRepository";

async function signUp(signUpData: signUpData) {
    try {
        const newOrganization = await organizationsRepository.createOrganization(signUpData);
        return newOrganization;
    } catch (err) {
        throw couldNotSignUpError();
    }
}

const organizationsService = {
    signUp
}

export default organizationsService