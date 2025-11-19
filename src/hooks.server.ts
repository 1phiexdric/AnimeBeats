// --- TIPOS DE DATOS ---

// 1. Tipado del Payload del JWT que verificas
interface JwtPayload {
  email: string;
}

type MongoUser = {
  _id: import("mongodb").ObjectId;
  email: string;
  username: string;
  create_at: Date;
  password?: string;
};

declare global {
  namespace App {
    interface Locals {
      user?: {
        _id: string;
        email: string;
        username: string;
        create_at: Date;
      };
    }
  }
}

// --- IMPORTACIONES ---
import { type Handle } from "@sveltejs/kit";
// Asegúrate de que verificarToken tenga una firma que devuelva Promise<JwtPayload | string | null> o similar
import { verificarToken, generateToken } from "$lib/server/auth_utils";
import { getUserCollection } from "$lib/server/mongo";
import { env } from "$env/dynamic/private";

const isProduction = env.NODE_ENV === "production";
const collectionPromise = getUserCollection();

export const handle: Handle = async ({ event, resolve }) => {
  const collection = await collectionPromise;
  const accessToken = event.cookies.get("accessToken");
  const refreshToken = event.cookies.get("refreshToken");
  let user: MongoUser | null = null;
  if (accessToken) {
    try {
      const payload = verificarToken(accessToken) as JwtPayload;
      user = await collection.findOne(
        { email: payload.email },
        { projection: { password: 0 } }
      );

    
    } catch (err) {
      console.log("Access Token expirado o inválido, intentando refresh...");
    }
  }
  if (refreshToken) {
    try {
      const payloadRefresh = verificarToken(refreshToken);
      if (payloadRefresh && typeof payloadRefresh === "object") {
        const dbUser = await collection.findOne(
          { email: payloadRefresh.email },
          { projection: { password: 0 } }
        );
        if (dbUser) {
          const newAccessToken = generateToken(dbUser.email, "15m");

          event.cookies.set("accessToken", newAccessToken, {
            path: "/",
            secure: isProduction,
            httpOnly: true,
            sameSite: isProduction ? "lax" : false,
            maxAge: 15 * 60,
          });

          user = dbUser;
        }
      }
    } catch (err) {
      event.cookies.delete("accessToken", { path: "/" });
      event.cookies.delete("refreshToken", { path: "/" });
      console.log("Refresh Token inválido, deslogueando.");
    }
  }

 if (user) {
    event.locals.user = {
      _id: user._id.toString(),
      email: user.email,
      username: user.username,
      create_at: user.create_at,
    };
  } else {
    event.locals.user = undefined;
  }
  return await resolve(event);
};
