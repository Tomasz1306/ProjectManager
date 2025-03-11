import { executeAction } from "./executeAction";
import { prisma } from "@/lib/prisma";
import { schema } from "./schema";

const signUp = async (formData: FormData) => {
  return executeAction({
    actionFn: async () => {
        console.log("IWTAM");
      const email = formData.get("email");
      const password = formData.get("password");
      const validatedData = schema.parse({ email, password });
      console.log(validatedData);
      await prisma.user.create({
        data: {
          email: validatedData.email.toLowerCase(),
          password: validatedData.password,
        },
      });
    },
  });
};
export { signUp };
