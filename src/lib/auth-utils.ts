import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

/**
 * API endpoint'leri için auth kontrolü yapan yardımcı fonksiyon
 * @param req NextRequest objesi
 * @returns Eğer kullanıcı giriş yapmamışsa 401 hatası, aksi takdirde session objesi
 */
export async function checkAuth(req: NextRequest) {
  const session = await auth();
  
  if (!session || !session.user.id) {
    return {
      error: NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      ),
      session: null
    };
  }
  
  return {
    error: null,
    session
  };
}

/**
 * API endpoint'leri için auth kontrolü yapan ve kullanıcı ID'sini döndüren yardımcı fonksiyon
 * @param req NextRequest objesi
 * @returns Eğer kullanıcı giriş yapmamışsa 401 hatası, aksi takdirde kullanıcı ID'si
 */
export async function getUserIdFromSession(req: NextRequest) {
  const { error, session } = await checkAuth(req);
  
  if (error) {
    return { error, userId: null };
  }
  
  return { error: null, userId: session!.user.id };
} 