"use client";
import Image from "next/image";
import Link from "next/link";

import { InstagramIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useGetData } from "@/hooks/useFetch";
import NewsletterForm from "./NewsletterForm";

const Footer = () => {
  const t = useTranslations("navigation");

  const { data } = useGetData<any>({
    endpoint: "/settings",
    queryKey: ["Settings"],
  });

  const settingsData =
    data?.status === "success" ? data?.response?.settings : null;

  return (
    <footer className="relative bg-primary text-primary-foreground">
      <div className="container">
        <div className="section-style grid grid-cols-2 gap-6 lg:grid-cols-6">
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Image
                  src="/logo.svg"
                  alt={t("brand-name")}
                  unoptimized
                  width={300}
                  height={150}
                  quality={100}
                  className="w-auto h-10 md:h-12 object-contain"
                />
              </Link>

              <div className="h-10 md:h-12 w-[1px] bg-gray-400"></div>

              <Image
                src="/images/ksa_center.png"
                alt={"المركز السعودي للأعمال"}
                unoptimized
                width={500}
                height={200}
                quality={100}
                className="w-auto h-10 md:h-12 object-contain"
              />
            </div>

            <div className="space-y-2 max-w-sm">
              {settingsData?.phone_first && (
                <a
                  href={`tel:${settingsData?.phone_first}`}
                  className="flex items-center gap-2 hover:opacity-90 hover:underline"
                >
                  <PhoneIcon size={20} className="shrink-0" />

                  <span>{settingsData?.phone_first}</span>
                </a>
              )}

              {settingsData?.phone_second && (
                <a
                  href={`tel:${settingsData?.phone_second}`}
                  className="flex items-center gap-2 hover:opacity-90 hover:underline"
                >
                  <PhoneIcon size={20} className="shrink-0" />

                  <span>{settingsData?.phone_second}</span>
                </a>
              )}

              <a
                href={settingsData?.location_link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-90 hover:underline"
              >
                <MapPinIcon size={20} className="shrink-0" />

                <span>{settingsData?.location_title}</span>
              </a>

              <div className="flex items-center gap-2">
                <Image
                  src={"/images/mastercard.png"}
                  alt={"mastercard"}
                  width={100}
                  height={100}
                  quality={100}
                  className="w-12 h-auto object-contain"
                />

                <Image
                  src={"/images/visa.png"}
                  alt={"visa"}
                  width={100}
                  height={100}
                  quality={100}
                  className="w-12 h-auto object-contain"
                />

                <Image
                  src={"/images/paypal.png"}
                  alt={"paypal"}
                  width={100}
                  height={100}
                  quality={100}
                  className="w-12 h-auto object-contain"
                />

                <Image
                  src={"/images/american_express.png"}
                  alt={"amex"}
                  width={100}
                  height={100}
                  quality={100}
                  className="w-12 h-auto object-contain"
                />

                <Image
                  src={"/images/mada.png"}
                  alt={"mada"}
                  width={100}
                  height={100}
                  quality={100}
                  className="w-12 h-auto object-contain"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="title-sm text-secondary">{t("links")}</h3>

            <ul className="space-y-2">
              <li>
                <Link
                  href="/pricing"
                  className="hover:opacity-90 hover:underline"
                >
                  {t("pricing")}
                </Link>
              </li>

              <li>
                <Link
                  href="/about-us"
                  className="hover:opacity-90 hover:underline"
                >
                  {t("about-us")}
                </Link>
              </li>

              {/* <li>
                <Link href="/" className="hover:opacity-90 hover:underline">
                  {t("careers")}
                </Link>
              </li>

              <li>
                <Link href="/" className="hover:opacity-90 hover:underline">
                  {t("blog")}
                </Link>
              </li> */}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="title-sm text-secondary">{t("legal")}</h3>

            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms-use"
                  className="hover:opacity-90 hover:underline"
                >
                  {t("terms-use")}
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:opacity-90 hover:underline"
                >
                  {t("privacy-policy")}
                </Link>
              </li>

              <li>
                <Link
                  href="/cookie-policy"
                  className="hover:opacity-90 hover:underline"
                >
                  {t("cookie-policy")}
                </Link>
              </li>

              <li>
                <Link href="/faqs" className="hover:opacity-90 hover:underline">
                  {t("faqs")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 space-y-4">
            <h3 className="title-sm text-secondary">{t("newsletter")}</h3>

            <div className="space-y-2 max-w-sm">
              <h4 className="title-xs">{t("newsletter-title")}</h4>

              <NewsletterForm />

              <p className="text-sm text-primary-foreground/60">
                {t("newsletter-desc")}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {settingsData?.facebook_link && (
                <a
                  href={
                    settingsData?.facebook_link?.startsWith("http")
                      ? settingsData?.facebook_link
                      : `https://${settingsData?.facebook_link}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-50 hover:text-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
                    />
                  </svg>
                </a>
              )}

              {settingsData?.instagram_link && (
                <a
                  href={
                    settingsData?.instagram_link?.startsWith("http")
                      ? settingsData?.instagram_link
                      : `https://${settingsData?.instagram_link}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-50 hover:text-gray-200"
                >
                  <InstagramIcon size={24} />
                </a>
              )}

              {settingsData?.twitter_link && (
                <a
                  href={
                    settingsData?.twitter_link?.startsWith("http")
                      ? settingsData?.twitter_link
                      : `https://${settingsData?.twitter_link}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-50 hover:text-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 14 14"
                  >
                    <g fill="none">
                      <g clipPath="url(#primeTwitter0)">
                        <path
                          fill="currentColor"
                          d="M11.025.656h2.147L8.482 6.03L14 13.344H9.68L6.294 8.909l-3.87 4.435H.275l5.016-5.75L0 .657h4.43L7.486 4.71zm-.755 11.4h1.19L3.78 1.877H2.504z"
                        />
                      </g>
                      <defs>
                        <clipPath id="primeTwitter0">
                          <path fill="#fff" d="M0 0h14v14H0z" />
                        </clipPath>
                      </defs>
                    </g>
                  </svg>
                </a>
              )}

              {settingsData?.youtube_link && (
                <a
                  href={
                    settingsData?.youtube_link?.startsWith("http")
                      ? settingsData?.youtube_link
                      : `https://${settingsData?.youtube_link}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-50 hover:text-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <mask id="lineMdYoutubeFilled0">
                      <g
                        fill="none"
                        fillOpacity="0"
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      >
                        <path
                          fill="#fff"
                          strokeDasharray="64"
                          strokeDashoffset="64"
                          d="M12 5c9 0 9 0 9 7c0 7 0 7 -9 7c-9 0 -9 0 -9 -7c0 -7 0 -7 9 -7Z"
                        >
                          <animate
                            fill="freeze"
                            attributeName="fillOpacity"
                            begin="0.6s"
                            dur="0.5s"
                            values="0;1"
                          />
                          <animate
                            fill="freeze"
                            attributeName="strokeDashoffset"
                            dur="0.6s"
                            values="64;0"
                          />
                        </path>
                        <path fill="#000" stroke="none" d="M12 11L12 12L12 13z">
                          <animate
                            fill="freeze"
                            attributeName="d"
                            begin="1.1s"
                            dur="0.2s"
                            values="M12 11L12 12L12 13z;M10 8.5L16 12L10 15.5z"
                          />
                          <set
                            fill="freeze"
                            attributeName="fillOpacity"
                            begin="1.1s"
                            to="1"
                          />
                        </path>
                      </g>
                    </mask>
                    <rect
                      width="24"
                      height="24"
                      fill="currentColor"
                      mask="url(#lineMdYoutubeFilled0)"
                    />
                  </svg>
                </a>
              )}

              {settingsData?.pinterest_link && (
                <a
                  href={
                    settingsData?.pinterest_link?.startsWith("http")
                      ? settingsData?.pinterest_link
                      : `https://${settingsData?.pinterest_link}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-50 hover:text-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M13.372 2.094a10.003 10.003 0 0 0-5.369 19.074a7.8 7.8 0 0 1 .162-2.292c.185-.839 1.296-5.463 1.296-5.463a3.7 3.7 0 0 1-.324-1.577c0-1.485.857-2.593 1.923-2.593a1.334 1.334 0 0 1 1.342 1.508c0 .9-.578 2.262-.88 3.54a1.544 1.544 0 0 0 1.575 1.923c1.897 0 3.17-2.431 3.17-5.301c0-2.201-1.457-3.847-4.143-3.847a4.746 4.746 0 0 0-4.93 4.793a2.96 2.96 0 0 0 .648 1.97a.48.48 0 0 1 .162.554c-.046.184-.162.623-.208.785a.354.354 0 0 1-.51.253c-1.384-.554-2.036-2.077-2.036-3.816c0-2.847 2.384-6.255 7.154-6.255c3.796 0 6.319 2.777 6.319 5.747c0 3.909-2.176 6.848-5.393 6.848a2.86 2.86 0 0 1-2.454-1.246s-.579 2.316-.692 2.754a8 8 0 0 1-1.019 2.131c.923.28 1.882.42 2.846.416a9.99 9.99 0 0 0 9.996-10.002a10 10 0 0 0-8.635-9.904"
                    />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-muted/30 py-4">
          <div className="flex justify-center md:justify-between">
            <p className="text-sm text-primary-foreground text-center flex justify-center gap-1.5">
              <span>{t("copyright")}</span>
              <span>{new Date().getFullYear()} ©</span>
              <Link
                href="https://hudhudit.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:opacity-90 hover:underline"
              >
                {t("brand-name")}
              </Link>
            </p>

            <p>
              <span className="text-primary-foreground/75">
                {t("powered-by")}
              </span>{" "}
              <a
                href="https://hudhudit.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="font-semibold hover:opacity-90 hover:underline">
                  Hudhud IT
                </span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
