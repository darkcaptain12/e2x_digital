import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data/settings.json");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

function isAuthorized(request: Request) {
  const authHeader = request.headers.get("Authorization");
  return authHeader === ADMIN_PASSWORD;
}

export async function GET() {
  // Publicly readable for the site functionality
  try {
    const data = await fs.readFile(DATA_PATH, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: "Settings not found" }, { status: 404 });
  }
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    await fs.writeFile(DATA_PATH, JSON.stringify(body, null, 2));
    return NextResponse.json({ message: "Settings updated" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
