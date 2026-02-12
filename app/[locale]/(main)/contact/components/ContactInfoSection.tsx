import { getData } from "@/lib/request-server";
import type { ContactItem } from "@/schemas/types";
import { Mail, MapPin, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import ContactCard from "./ContactCard";

const ContactInfoSection = async () => {
  //   const data = await getData<BlogPostDetailsResponse>({ endpoint: `/blog-posts/${slug}` });
  //   const blog = data?.result?.blog_post;

  //   const formattedDate = moment(blog?.created_at).format("DD MMM, YYYY");
  const t = await getTranslations("contact");

  const contactData: ContactItem[] = [
    {
      icon: <Phone size={26} />,
      title: t("call"),
      value: "+962790000000",
      href: "tel:+962790000000",
    },
    {
      icon: <Mail size={26} />,
      title: t("emailcon"),
      value: "info@eventshubs.com",
      href: "mailto:info@eventshubs.com",
    },
    {
      icon: <MapPin size={26} />,
      title: t("visit"),
      value: t("map"),
      href: "https://maps.google.com",
      isExternal: true,
    },
  ];


  return (
    <section className="w-full py-16">
      <div className="container-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10">
          {contactData.map((item: any, index: number) => (
            <ContactCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};


export default ContactInfoSection; 