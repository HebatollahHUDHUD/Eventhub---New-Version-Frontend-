"use client";

import { useGetData } from "@/hooks/useFetch";
import LoadingPage from "@/components/common/LoadingPage";
import BookCard from "./components/BookCard";
import Pagination from "@/components/common/Pagination";
import { parseAsString, useQueryStates } from "nuqs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { BooksResponse } from "@/schemas/types";

const BooksPage = () => {
  const t = useTranslations("dashboard.books");
  const [queryParams] = useQueryStates({
    page: parseAsString.withDefault("1"),
  });

  const { data, isLoading } = useGetData<BooksResponse>({
    endpoint: "/profile/books",
    queryKey: ["books", queryParams.page],
    config: {
      queryParams: {
        page: queryParams.page,
      },
    },
  });

  if (isLoading) return <LoadingPage />;

  const booksData = data?.status === "success" ? data.result : null;

  const books = booksData?.books?.data || [];
  const pagination = booksData?.books?.pagination || null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("books")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          <Pagination pagination={pagination} />
        </CardContent>
      </Card>
    </div>
  );
};

export default BooksPage;
