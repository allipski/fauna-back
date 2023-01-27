import { ApplicationError } from "@/protocols";

export function couldNotSignUpError(): ApplicationError {
  return {
    name: "CouldNotSignUpError",
    message: "Something went wrong while signing you up. Please try again.",
  };
}