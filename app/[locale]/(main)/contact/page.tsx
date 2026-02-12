import Image from "@/components/common/image"
import ContactInfoSection from "./components/ContactInfoSection"
import ContactForm from "./components/Form"

const page = async () => {

    return (
        <main className='container p-4 md:p-8 lg:p-12 space-y-12 md:space-y-8'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center">
                    <Image
                        src="/images/ContactImage.svg"
                        alt="Contact"
                        width={500}
                        height={500}
                        className="w-full max-w-md"
                    />
                </div>

                <div className="w-full">
                    <ContactForm />
                </div>
            </div>

            <ContactInfoSection />
        </main>
    )
}

export default page