import { httpClient } from "@/lib/http-client";

// TODO: add fetch user by id for use in index view
// TODO: add response validation
export const getAllUsers = async () => {
  try {
    const response = await httpClient.get("users");

    return response.data;
  } catch (error) {
    throw new Error("Error getting users");
  }
};
