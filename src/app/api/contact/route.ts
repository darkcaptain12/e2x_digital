import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, estimatedPrice, selectedServices, industry } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "İsim, e-posta ve mesaj alanları zorunludur." },
        { status: 400 }
      );
    }

    // In a real application, you would send an email or save to a database here.
    console.log("--- Yeni İletişim Formu Mesajı ---");
    console.log("Müşteri:", name);
    console.log("E-posta:", email);
    console.log("Mesaj:", message);

    if (estimatedPrice) {
      console.log("Teklif Detayları:");
      console.log("- Sektör:", industry);
      console.log("- Seçilen Hizmetler:", selectedServices?.join(", "));
      console.log("- Tahmini Fiyat:", estimatedPrice, "TL");
    }
    console.log("---------------------------------");

    // Mocking a successful submission
    return NextResponse.json(
      { message: "Mesajınız başarıyla alındı. Sizinle en kısa sürede iletişime geçeceğiz." },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Hatası:", error);
    return NextResponse.json(
      { error: "Sunucu hatası oluştu. Lütfen teknik destek ile iletişime geçin." },
      { status: 500 }
    );
  }
}
