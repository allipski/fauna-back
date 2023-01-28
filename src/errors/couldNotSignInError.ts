import { ApplicationError } from "@/protocols";

export function couldNotSignInError(): ApplicationError {
  return {
    name: "CouldNotSignInError",
    message: "Something went wrong while signing you In. Please try again.",
  };
}