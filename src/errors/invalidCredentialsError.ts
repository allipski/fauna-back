import { ApplicationError } from "@/protocols";

export function invalidCredentialsError(): ApplicationError {
  return {
    name: "InvalidCredentialsError",
    message: "Email and password do not match",
  };
}