export { default } from "next-auth/middleware";

export const config = {
  matches: ["/kaizenjournal", "/api/auth/session", "/api/auth/signout"],
  pages: {
    signIn: "/api/auth/signin",
  },
};
