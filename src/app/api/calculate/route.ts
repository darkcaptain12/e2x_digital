import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const SETTINGS_PATH = path.join(process.cwd(), "data", "settings.json");

export async function POST(req: Request) {
  try {
    const { services, industryId, requirements } = await req.json();
    const settings = JSON.parse(await fs.readFile(SETTINGS_PATH, "utf8"));

    const selectedServices = settings.services.filter((s: any) => services.includes(s.id));
    const industry = settings.industries.find((i: any) => i.id === industryId);

    const apiKey = settings.site.ai.geminiApiKey;

    // If no API key, use fallback logic
    if (!apiKey) {
      const baseTotal = selectedServices.reduce((acc: number, s: any) => acc + s.basePrice, 0);
      const total = baseTotal * (industry?.multiplier || 1);
      return NextResponse.json({
        price: total,
        isAi: false,
        message: "Klasik hesaplama yöntemi kullanıldı."
      });
    }

    // AI Logic with Gemini
    const prompt = `
      ${settings.site.ai.pricingModel}

      BAZ FİYATLAR:
      ${JSON.stringify(settings.services)}

      SEKTÖR ÇARPANLARI:
      ${JSON.stringify(settings.industries)}

      MÜŞTERİ TALEBİ:
      - Seçilen Hizmetler: ${selectedServices.map((s: any) => s.name).join(", ")}
      - Sektör: ${industry?.name || "Belirtilmedi"}
      - Özel İstekler: ${requirements || "Yok"}

      Lütfen bu verilere dayanarak makul bir fiyat teklifi (TL cinsinden) ve kısa bir gerekçe oluştur.
      Yanıtını SADECE şu JSON formatında ver:
      {"price": 15000, "explanation": "Gerekçeniz..."}
    `;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const aiData = await response.json();
    const aiText = aiData.candidates[0].content.parts[0].text;
    const cleanJson = aiText.replace(/```json/g, "").replace(/```/g, "").trim();
    const result = JSON.parse(cleanJson);

    return NextResponse.json({
      price: result.price,
      explanation: result.explanation,
      isAi: true
    });

  } catch (error) {
    console.error("Pricing Error:", error);
    return NextResponse.json({ error: "Hesaplama yapılamadı" }, { status: 500 });
  }
}
