import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {prisma} from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { schema } from "./schema";
import {v4 as uuid, validate} from "uuid";
import {encode} from "next-auth/jwt";

const adapter = PrismaAdapter(prisma);

export const {auth, handlers, signIn, signOut } = NextAuth({
  adapter,
  providers: [
    Credentials({
      credentials: {
        email: { },
        password: { },
      },
      async authorize(credentials, request) {

        const validatedCredentials = schema.parse(credentials);
        console.log(validatedCredentials);
        const user = await prisma.user.findFirst({
          where: {email: validatedCredentials.email, password: validatedCredentials.password},
        });
        if (!user) {
          throw new Error("Invalid credentials");
        } else {
          return user;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({token, account}) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
  },

  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }

        const createSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        if (!createSession) {
          throw new Error("Failed to create session");
        }

        return sessionToken;
      }
      return encode(params);
    },
  },

});
