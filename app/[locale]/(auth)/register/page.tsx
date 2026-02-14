import PageHeader from "@/components/common/PageHeader"
import Image from "@/components/common/image";
import { useTranslations } from "next-intl";
import Link from "next/link";


const RegisterPage = () => {
  const t = useTranslations("auth");

  return (
    <section className="space-y-12">
      <div className="flex items-center justify-center gap-4 md:gap-6 lg:gap-12">
        <Link href="/register/talent" className="flex-1 bg-background max-w-[400px] shadow-sm border rounded-xl overflow-hidden md:rounded-2xl lg:rounded-3xl">
          <div className={"w-full h-full flex flex-col items-center justify-center gap-4 px-4 py-6 md:px-6 md:py-8 lg:py-10 hover:bg-secondary/10 transition-all duration-300"}>
            <Image
              src="/images/auth/talent_register.png"
              alt="talent register"
              width={100}
              height={100}
              className="w-36 h-36 object-contain"
            />

            <div className="text-center space-y-2">
              <h2 className="title-3 text-primary font-normal">
                {t("register.talent-title")}
              </h2>

              <p className="description max-w-60">
                {t("register.talent-description")}
              </p>
            </div>
          </div>
        </Link>

        <Link href="/register/company" className="flex-1 bg-background max-w-[400px] shadow-sm border rounded-xl overflow-hidden md:rounded-2xl lg:rounded-3xl">
          <div className={"w-full h-full flex flex-col items-center justify-center gap-4 px-4 py-6 md:px-6 md:py-8 lg:py-10 hover:bg-secondary/10 transition-all duration-300"}>
            <Image
              src="/images/auth/company_register.png"
              alt="talent register"
              width={100}
              height={100}
              className="w-36 h-36 object-contain"
            />

            <div className="text-center space-y-2">
              <h2 className="title-3 text-primary font-normal">
                {t("register.company-title")}
              </h2>

              <p className="description max-w-60">
                {t("register.company-description")}
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="text-center">
        <p className="lg:text-lg text-primary font-semibold">{t.rich("register.already-have-account", {
          Link: (chunks: React.ReactNode) => <Link href="/login" className="text-secondary hover:underline">{chunks}</Link>
        })}</p>
      </div>
    </section>

  )
}

export default RegisterPage