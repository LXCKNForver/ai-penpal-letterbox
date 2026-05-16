import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json(
    { message: "Letters API is not implemented in the UI skeleton." },
    { status: 501 }
  );
}
