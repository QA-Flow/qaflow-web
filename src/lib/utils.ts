import crypto from "crypto";
import prisma from "@/lib/prisma";
import { nanoid } from "nanoid";

export async function generateUniqueToken() {
  let token: string = '';
  let isUnique = false;

  while (!isUnique) {
    token = crypto.randomBytes(32).toString('hex');

    const existingToken = await prisma.apiToken.findUnique({
      where: { token },
    });

    if (!existingToken) {
      isUnique = true;
    }
  }

  return token;
}

export async function generateApiToken(userId: string) {
  const token = `tk_${nanoid(32)}`;

  await prisma.apiToken.create({
    data: {
      userId,
      token,
    },
  });

  return token;
}

export async function getUserTokens(userId: string) {
  const tokens = await prisma.apiToken.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  return tokens;
}

export async function deleteApiToken(tokenId: string) {
  return await prisma.apiToken.delete({
    where: { id: tokenId },
  });
}

export function toJSON<T>(
  obj: T & { toJSON?: () => any }
): Partial<T & { _id: string }> {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (e) {
    return {};
  }
}

export async function verifyApiToken(token: string) {
  const cleanToken = token.startsWith("Bearer ") ? token.substring(7) : token;
  console.log("cleanToken", cleanToken);
  try {
    const apiToken = await prisma.apiToken.findFirst({
      where: { token: cleanToken },
    });

    if (!apiToken) {
      console.log("apiToken not found");
      return null;
    }

    return {
      userId: apiToken.userId
    };
  } catch (error) {
    return null;
  }
}

export async function updateApiToken(userId: string) {
  const token = `tk_${nanoid(32)}`;

  try {
    const existingToken = await prisma.apiToken.findFirst({
      where: { userId },
    });

    if (existingToken) {
      await prisma.apiToken.update({
        where: { id: existingToken.id },
        data: { token },
      });
    } else {
      await prisma.apiToken.create({
        data: {
          userId,
          token,
        },
      });
    }

    return token;
  } catch (error) {
    throw error;
  }
}

const utils = {
  generateApiToken,
  getUserTokens,
  deleteApiToken,
  verifyApiToken,
  updateApiToken
};

export default utils;