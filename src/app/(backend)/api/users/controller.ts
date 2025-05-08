/* eslint-disable */
import { NextResponse } from 'next/server';

export const addUser = async (req: Request) => {
  try {
    const { user_name, user_email, user_password, user_gender, user_date_birth } = await req.json();

    return NextResponse.json(
      {
        message: 'Success add user',
        detail: { user_name, user_email, user_password, user_gender, user_date_birth },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Failed to create User', detail: error.message },
      { status: 500 }
    );
  }
};
