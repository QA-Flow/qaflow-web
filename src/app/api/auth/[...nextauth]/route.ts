import { handlers } from "@/auth"

export const config = {
  runtime: "edge",
};

export const { GET, POST } = handlers