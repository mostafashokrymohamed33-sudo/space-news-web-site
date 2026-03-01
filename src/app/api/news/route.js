import { NextResponse } from "next/server";
export async function GET() {
  const KEY = process.env.NEWS_API_KEY;
  const url = `https://api.nasa.gov/planetary/apod?api_key=${KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch news" }, { status: response.status });
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}