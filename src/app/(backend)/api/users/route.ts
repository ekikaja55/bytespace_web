import { addUser } from './controller';
export async function GET() {
  return new Response('User route is active')
}
export const POST = addUser;
