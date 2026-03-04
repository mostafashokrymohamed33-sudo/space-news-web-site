import { NextResponse } from "next/server";
export async function GET() {
  const KEY = process.env.NEWS_API_KEY;
  const url = `https://api.nasa.gov/neo/rest/v1/neo/3542519?api_key=${KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch news" }, { status: response.status });
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}