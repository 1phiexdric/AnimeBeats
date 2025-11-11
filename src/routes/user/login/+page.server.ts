import type { Actions } from "../../$types";
import { getUserCollection } from "$lib/server/mongo";
import { z } from "zod";
import { fail, redirect } from "@sveltejs/kit";
import * as bcrypt from "bcrypt";
import { generateToken } from "$lib/server/auth_utils";
import { env } from "$env/dynamic/private";
// --- esquemas de Zod ---
const registerSchema = z.object({
  email: z.string().email({ message: "Por favor, introduce un email valido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  username: z
    .string()
    .min(3, {
      message: "El nombre de usuario debe tener al menos 3 caracteres",
    }),
});

const isProduction = env.NODE_ENV === 'production'

const loginSchema = z.object({
  email: z.string().email({ message: "Por favor, introduce un email valido" }),
  password: z.string().min(1, { message: "La contraseña no debe estar vacia" }),
});
const collection = await getUserCollection();
export const actions = {
  login: async ({ request, cookies }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const result = loginSchema.safeParse(data);
    if (!result.success) {
      return fail(400, {
        data: data,
        errors: result.error.flatten().fieldErrors,
        action: "login",
      });
    }
    let user
    try {
       user = await collection.findOne({ email: result.data.email });
      if (!user) {
        return fail(401, {
          data,
          message: "Email o contraseña incorrectos",
          action: "login",
        });
      }

      const passwordMatch = await bcrypt.compare(
        result.data.password,
        user.password
      );

      if (!passwordMatch) {
        return fail(401, {
          data,
          message: "Email o contraseña incorrectos",
          action: "login",
        });
      }
      const accessToken = generateToken(user.email, '15m')
      const refreshToken = generateToken(user.email, '30d')
    
    cookies.set('accessToken', accessToken, { 
      path: '/',
      secure: isProduction,
    sameSite: isProduction ? 'lax' : false,
    maxAge: 15*60,
  });
    cookies.set('refreshToken', refreshToken, { 
      path: '/',
      secure: isProduction,
    sameSite: isProduction ? 'lax' : false,
    maxAge: 30 * 24 * 60 * 60,
  });
      console.log("action login");
      console.log(user);
      // redirect
    } catch (error) {
      return fail(500, {
        message: "Error del servidor. Intenta de nuevo.",
        action: "login",
      });
    }
    redirect(303, `/user/${user._id}`);
    return { success: true, action: "login" };
  },
  register: async ({ request, cookies }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const result = registerSchema.safeParse(data);
    if (!result.success) {
      return fail(400, {
        data: data, // para el formulario
        errors: result.error.flatten().fieldErrors,
        action: "register",
      });
    }
    try {
      console.log("action register");
      const userExist = await collection.findOne({ email: data.email });
      if (userExist) {
        return fail(409, {
          message: "Ya existe un usuario con ese email",
        });
      }
      const claveEncriptada = await bcrypt.hash(result.data.password, 10);
      await collection.insertOne({
        username: data.username,
        password: claveEncriptada,
        email: data.email,
        create_at: new Date()
      });
      const email = data.email.toString()
      const accessToken = generateToken(email, '15m')
      const refreshToken = generateToken(email, '30d')
    
    cookies.set('accessToken', accessToken, { 
      path: '/',
      secure: isProduction,
    sameSite: isProduction ? 'lax' : false,
    maxAge: 15*60,
  });
    cookies.set('refreshToken', refreshToken, { 
      path: '/',
      secure: isProduction,
    sameSite: isProduction ? 'lax' : false,
    maxAge: 30 * 24 * 60 * 60,
  });
    
    } catch (error) {
      
      return fail(500, { message: "No se pudo crear el usuario" });
    }
    redirect(303, `/user/${data.username}`);
    return {
      success: true,
      message: "Registrado con exito",
      action: "register",
    };
  },
} satisfies Actions;
