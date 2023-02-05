import { notFoundError, unauthorizedError } from "@/errors";
import projectsRepository from "@/repositories/projectsRepository";
import { ProjectType } from "@/controllers";

async function postProject(projectData: ProjectType, organizationId: number) {
    try {
        const project = await projectsRepository.createProject(projectData, organizationId);
        return project; 
    } catch (err) {
        throw unauthorizedError();
    }
}

async function updateProject(projectData: ProjectType, id: number) {
    try {
        const project = await projectsRepository.updateProject(projectData, id);
        return project; 
    } catch (err) {
        throw unauthorizedError();
    }
}

async function getProjects(organizationId: number) {
    try {
        const project = await projectsRepository.findProjects(organizationId);
        return project; 
    } catch (err) {
        throw notFoundError();
    }
}

async function getProject(projectId: number) {
    try {
        const project = await projectsRepository.findProjectById(projectId);
        return project; 
    } catch (err) {
        throw notFoundError();
    }
}

const projectsService = {
    postProject,
    getProjects,
    getProject,
    updateProject
}

export default projectsService