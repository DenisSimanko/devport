import { httpClient } from "@/lib/http-client";

// TODO: add response validation
export const getAllTodos = async () => {
  try {
    const response = await httpClient.get("todos");

    return response.data;
  } catch (error) {
    throw new Error("Error getting todos");
  }
};

// TODO: add response validation
export const addTodo = async (todo) => {
  try {
    const response = await httpClient.post("todos", todo);

    return response.data;
  } catch (error) {
    throw new Error("Error adding todo");
  }
};
