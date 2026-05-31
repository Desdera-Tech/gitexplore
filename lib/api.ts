import { GITHUB_API_TOKEN, GITHUB_API_URL, GITHUB_URL } from "@/constants/env";
import axios, { AxiosError } from "axios";

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
  }
}

const handleGlobalError = (error: AxiosError) => {
  const response = error.response;
  const status = response?.status;

  if (!response) {
    return Promise.reject(
      new ApiError("Network error. Please check your connection."),
    );
  }

  let errorMessage = "An unexpected error occurred";

  if (status === 404) {
    errorMessage = "Resource not found";
  } else if (status === 403 || status === 429) {
    errorMessage = "GitHub rate limit exceeded";
  } else if (
    response.data &&
    typeof response.data === "object" &&
    "errors" in response.data
  ) {
    const gqlErrors = (
      response.data as {
        errors: { message: string }[];
      }
    ).errors;

    errorMessage = gqlErrors[0]?.message ?? "GitHub GraphQL API Error";
  } else if (error.message) {
    errorMessage = error.message;
  }

  return Promise.reject(new ApiError(errorMessage, status));
};

export const api = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${GITHUB_API_TOKEN}`,
  },
});

export const githubGraphql = axios.create({
  baseURL: `${GITHUB_URL}/graphql`,
  headers: {
    Authorization: `Bearer ${GITHUB_API_TOKEN}`,
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use((response) => response, handleGlobalError);

githubGraphql.interceptors.response.use(
  (response) => response,
  handleGlobalError,
);
