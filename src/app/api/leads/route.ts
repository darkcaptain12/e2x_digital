import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data/leads.json");
const ADMIN_PASSWORD = "admin123";

function isAuthorized(request: Request) {
  const authHeader = request.headers.get("Authorization");
  return authHeader === ADMIN_PASSWORD;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await fs.readFile(DATA_PATH, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: "Leads not found" }, { status: 404 });
  }
}

export async function POST(request: Request) {
  // POSTing a lead is public (from the forms)
  try {
    const lead = await request.json();
    let leads = [];
    try {
      const data = await fs.readFile(DATA_PATH, "utf-8");
      leads = JSON.parse(data);
    } catch (e) {}

    const newLead = {
      ...lead,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    leads.push(newLead);
    await fs.writeFile(DATA_PATH, JSON.stringify(leads, null, 2));

    return NextResponse.json({ message: "Lead saved successfully", id: newLead.id });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const data = await fs.readFile(DATA_PATH, "utf-8");
    let leads = JSON.parse(data);

    leads = leads.filter((l: any) => l.id !== id);
    await fs.writeFile(DATA_PATH, JSON.stringify(leads, null, 2));

    return NextResponse.json({ message: "Lead deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
  }
}
