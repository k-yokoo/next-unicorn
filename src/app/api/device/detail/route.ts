import { NextResponse } from 'next/server';
type Data = {
  id: number;
  name: string;
  age: number;
  email: string;
};

const rows: Data[] = [
  { id: 1, name: 'John Doe', age: 25, email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', age: 30, email: 'jane@example.com' },
  { id: 3, name: 'Alice Johnson', age: 35, email: 'alice@example.com' },
];
export async function GET() {
  try {
    return NextResponse.json({
      result: rows,
    });
  } catch (error) {
    throw error
  }
}
