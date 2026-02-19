"use client";

import LoadingPage from "@/components/common/LoadingPage";
import { useGetData } from "@/hooks/useFetch";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "@/components/common/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookDetailsResponse } from "@/schemas/types";
import DownloadButton from "@/components/common/DownloadButton";

const BookDetailsPage = () => {
  const { id } = useParams();
  const t = useTranslations("dashboard.books");

  const { data, isLoading } = useGetData<BookDetailsResponse>({
    endpoint: `/profile/books/${id}`,
    queryKey: [`profile-books-${id}`],
  });

  const book = data?.status === "success" ? data?.result?.book : null;

  if (isLoading) return <LoadingPage />;

  const descriptionLines = book?.description
    ? book?.description.split("\n").filter((line) => line.trim())
    : [];


  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div>
            <Button variant="link" size="sm" className="px-0" asChild>
              <Link href="/profile/books">
                {t("back-to-book-list")}
              </Link>
            </Button>
          </div>

          <CardTitle>{t("e-book")}</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Book Cover */}
            <div className="shrink-0 space-y-4">
              <Image
                src={book?.image}
                alt={book?.title || ""}
                width={400}
                height={600}
                className="w-full md:w-[360px] max-h-[400px] aspect-3/4 object-cover rounded-lg shadow-lg"
              />

              {
                book?.attachment && (
                  <Button asChild variant="orange" className="w-full" size={"xl"}>
                    <a href={book?.attachment?.file_path} target="_blank" rel="noopener noreferrer">
                      {t("download")}
                    </a>
                  </Button>
                )
              }
            </div>

            {/* Book Info */}
            <div className="flex-1 space-y-4 flex flex-col">
              <h2 className="text-2xl font-bold uppercase">{book?.title || ""}</h2>

              {descriptionLines.length > 0 && (
                <div className="space-y-3 flex-1">
                  <h3 className="font-semibold text-lg">{t("whats-in-this-book")}:</h3>
                  <ul className="space-y-2">
                    {descriptionLines.map((line, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{line.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {!descriptionLines.length && book?.description && (
                <p className="text-muted-foreground">{book?.description}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookDetailsPage;
