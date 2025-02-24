import crypto from "crypto";
import prisma from "@/lib/prisma";

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
  const token = await generateUniqueToken();

  const apiToken = await prisma.apiToken.create({
    data: {
      token: token!,
      userId,
    },
  });

  return apiToken;
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

export async function verifyApiToken(token: string) {
  const apiToken = await prisma.apiToken.findUnique({
    where: { token },
    include: { user: true },
  });

  return apiToken;
} 

export async function updateApiToken(userId: string) {
  const existingToken = await prisma.apiToken.findFirst({
    where: { userId },
  });

  if (!existingToken) {
    return generateApiToken(userId);
  } else {
    const token = await generateUniqueToken();

    await prisma.apiToken.update({
      where: { id: existingToken.id },
      data: {
        token
      },
    });
  }
}

export default {
  generateApiToken,
  getUserTokens,
  deleteApiToken,
  verifyApiToken,
  updateApiToken
};