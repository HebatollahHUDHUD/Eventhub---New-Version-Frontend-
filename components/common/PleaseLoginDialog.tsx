"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

interface PleaseLoginDialogProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

const PleaseLoginDialog = ({
  title,
  description,
  children,
}: PleaseLoginDialogProps) => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("common");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {title || t("pleaseLogin")}
          </DialogTitle>
          <DialogDescription>
            {description ||
              t("pleaseLoginDescription")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-4">
          <Button
            variant="muted"
            onClick={() => setOpen(false)}
            aria-label={t("close")}
          >
            {t("close")}
          </Button>
          <Button asChild variant="secondary" aria-label={t("login")}>
            <Link href="/login" aria-label={t("login")}>
              {t("login")}
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PleaseLoginDialog;
