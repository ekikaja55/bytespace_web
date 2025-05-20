import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

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
      return NextResponse.json({ message: 'There is an empty field' }, { status: 400 });
    }

    const result = await prisma.post.create({
      data: {
        post_title,
        post_short_desc,
        post_long_desc,
        post_image,
        post_tag,
        post_type,
        post_comment: [],
      },
    });

    return NextResponse.json(
      {
        message: 'Success add Post',
        detail: result,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Failed to add Post', detail: error.message },
      { status: 500 }
    );
  }
};
