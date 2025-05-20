import { addPost } from './controller';

export async function GET() {
  return new Response('Post route is active');
}

export const POST = addPost;
