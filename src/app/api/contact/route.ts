import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Tüm alanlar zorunludur." },
        { status: 400 }
      );
    }

    // In a real application, you would send an email or save to a database here.
    console.log("Yeni İletişim Formu Mesajı:", { name, email, message });

    // Mocking a successful submission
    return NextResponse.json(
      { message: "Mesajınız başarıyla alındı." },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Hatası:", error);
    return NextResponse.json(
      { error: "Sunucu hatası oluştu." },
      { status: 500 }
    );
  }
}
