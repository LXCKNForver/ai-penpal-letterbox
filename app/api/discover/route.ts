import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json(
    { message: "Discover API is not implemented in the UI skeleton." },
    { status: 501 }
  );
}
