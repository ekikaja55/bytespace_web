/* eslint-disable */

import axios from 'axios';
import { NextResponse } from 'next/server';

export const getTag = async () => {
  try {
    const response = await axios.get(`${process.env.DEVELOPER_API}/tags`);

    if (response.data.length <= 0) {
      return NextResponse.json({ message: 'data is null' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Success get data', data: response.data });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Failed to get data', detail: error.message },
      { status: 500 }
    );
  }
};

export const getArticel = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const tags = searchParams.get('tags');

    const baseUrl = process.env.DEVELOPER_API;
    const url = tags ? `${baseUrl}/articles?tags${tags}` : `${baseUrl}/articles`;
    const response = await axios.get(url);
    if (response.data.length <= 0) {
      return NextResponse.json({ message: 'data is null' }, { status: 404 });
    }

    return NextResponse.json({ message: 'success get data', data: response.data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'failed to get data', detail: error.message },
      { status: 500 }
    );
  }
};

export const getArticelTop = async (req: Request, context: { params: { top: number } }) => {
  try {
    const response = await axios.get(
      `${process.env.DEVELOPER_API}/articles?top=${context.params.top}`
    );
    if (response.data.length <= 0) {
      return NextResponse.json({ message: 'data is null' }, { status: 404 });
    }

    return NextResponse.json({ message: 'success get data', data: response.data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'failed to get data', detail: error.message },
      { status: 500 }
    );
  }
};
