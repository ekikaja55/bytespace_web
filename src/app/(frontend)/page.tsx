/* eslint-disable */
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";

const schema = Joi.object({
  query: Joi.number().integer().min(1).required().messages({
    "number.base": "ID harus berupa angka",
    "number.min": "ID harus lebih besar dari 0",
    "any.required": "ID wajib diisi",
  }),
});

type FormData = {
  query: number;
};

export default function Home() {
  const [anime, setAnime] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: joiResolver(schema),
  });

  const handleSearch = async (data: FormData) => {
    setLoading(true);
    setSearchId(data.query);
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime/${data.query}`
      );
      setAnime(response.data.data);
    } catch (error) {
      console.error("Error fetching anime:", error);
      setAnime(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold underline text-center mb-4">
        kudacuki69
      </h1>
      <h2 className="text-2xl font-bold my-4">
        mau cari anime ketik sendiri njing
      </h2>
      <h2 className="my-4">
        btw cari nya pake id, ketik aja 1 atau 2 atau 3 jangan ketik selain id
        soalnya aku males, masi belajar jugaan, ini nembak api orang punyanya
        jikan.moe cari sendiri di gugel
      </h2>
      <h2 className="my-4">
        mau cek update project ku? clone aja github ku disini terus baca readme
        nya jangan males baca btw follow githubku kalo mau
      </h2>

      <a
        className="font-bold underline"
        href="https://github.com/ekikaja55/bytespace_web.git"
      >
        klik disini link githubnya, ga scam aman aja
      </a>

      <Image
        src="/next.svg"
        alt="Next.js Logo"
        width={180}
        height={37}
        priority
      />

      <form onSubmit={handleSubmit(handleSearch)} className="mb-6 mt-6">
        <div className="flex flex-col space-y-2">
          <label htmlFor="query" className="font-medium text-lg">
            Ini Form Nya
          </label>
          <input
            {...register("query")}
            id="query"
            type="number"
            className="border p-2 rounded"
            placeholder="Masukkan ID Anime"
          />
          {errors.query && (
            <p className="text-red-500">{errors.query.message}</p>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Cari
          </button>
        </div>
      </form>

      {loading && <p className="text-center">Loading Sabar Kntl...</p>}

      {anime ? (
        <div className=" p-4 rounded shadow-md mt-6">
          <div className="flex flex-col items-center">
            <Image
              src={anime.images.jpg.image_url}
              alt={anime.title}
              width={200}
              height={300}
              className="rounded"
            />
            <h2 className="text-xl font-bold mt-4">{anime.title}</h2>
            <h3 className="text-lg text-gray-500">{anime.title_japanese}</h3>
            <h4 className="text-lg mt-2">Tipe: {anime.type}</h4>
            <p className="mt-2">Status: {anime.status}</p>
            <p className="mt-2 font-semibold">
              Genre: {anime.genres.map((item: any) => item.name).join(", ")}
            </p>
            <p className="mt-4">{anime.synopsis}</p>
          </div>
        </div>
      ) : (
        searchId && (
          <p className="mt-4 text-center">
            Id {searchId} ga ketemu cari yang lain
          </p>
        )
      )}
    </div>
  );
}
