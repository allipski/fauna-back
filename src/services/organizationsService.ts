import { signUpData, UpdateData } from "@/controllers";
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

async function updateOrganization(updateData: UpdateData, userId: number) {
    try {
        const organization = await organizationsRepository.updateOrganization(updateData, userId);
        return organization;
    } catch (err) {
        throw couldNotSignUpError();
    }
}

const organizationsService = {
    signUp,
    updateOrganization
}

export default organizationsService