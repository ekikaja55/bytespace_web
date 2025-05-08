import { NextResponse } from 'next/server';

/* eslint-disable*/
export const addPost = async (req: Request) => {
  try {
    const { post_title, post_short_desc, post_long_desc, post_image, post_tag, post_type } =
      await req.json();
    if (
      !post_title ||
      !post_short_desc ||
      !post_long_desc ||
      !post_image ||
      !post_tag ||
      !post_type
    ) {
      return NextResponse.json({ message: '' });
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Failed to add Post', detail: error.message },
      { status: 500 }
    );
  }
};
