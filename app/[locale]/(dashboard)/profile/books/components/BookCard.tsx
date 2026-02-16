"use client";

import { Button } from "@/components/ui/button";
import Image from "@/components/common/image";
import Link from "next/link";
import { Book } from "@/schemas/types";
import { API_URL } from "@/constant";

type BookCardProps = {
  book: Book;
};

const BookCard = ({ book }: BookCardProps) => {


  return (
    <article className="relative bg-background flex flex-col rounded-lg overflow-hidden border shadow-sm">
      <div className="relative">
        <Image
          src={book.image}
          alt={book.title}
          width={400}
          height={267}
          className="w-full aspect-3/2 object-cover rounded-t-lg"
        />
      </div>

      <div className="flex flex-col gap-2 p-4 flex-1">
        <h2 className="font-bold text-lg line-clamp-2">{book.title}</h2>

        <div className="mt-auto pt-2">
          <Button
            size={"lg"}
            variant="outlineSecondary"
            className="w-full border-orange-500 text-orange-500 hover:bg-orange-50"
            asChild
          >
            <Link href={`/profile/books/${book.id}`}>
              Open
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
};

export default BookCard;
