import { getData } from "@/lib/request-server";
import type { ContactItem, InfoResponse } from "@/schemas/types";
import { Mail, MapPin, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import ContactCard from "./ContactCard";

const ContactInfoSection = async () => {
  const t = await getTranslations("contact");

  const data = await getData<InfoResponse>({
    endpoint: "/info",
  });

  const info = data?.status === "success" ? data.result : null;

  if (!info) return null;

  const contactData: ContactItem[] = [
    {
      icon: <Phone size={26} />,
      title: t("call"),
      value: info?.mobile,
      href: `tel:${info.mobile}`,
    },
    {
      icon: <Mail size={26} />,
      title: t("emailcon"),
      value: info.email,
      href: `mailto:${info.email}`,
    },
    {
      icon: <MapPin size={26} />,
      title: t("visit"),
      value: info.address,
      href: info.map_url,
      isExternal: true,
    },
  ];

  return (
    <section className="w-full py-16">
      <div className="container-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10">
          {contactData.map((item, index) => (
            <ContactCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfoSection;
