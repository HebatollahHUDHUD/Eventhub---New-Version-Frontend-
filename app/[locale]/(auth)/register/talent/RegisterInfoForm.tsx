import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';
import { talentRegisterSchema } from '@/lib/schemas';
import { z } from 'zod';
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import InputImage from '@/components/common/InputImage';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import SelectCountry from '@/components/select/SelectCountry';
import SelectPosition from '@/components/select/SelectPosition';
import SelectLanguage from '@/components/select/SelectLanguage';
import { PasswordInput } from '@/components/ui/password-input';
import { LoaderIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const RegisterInfoForm = ({ form, isLoading }: { form: UseFormReturn<z.infer<typeof talentRegisterSchema>>, isLoading: boolean }) => {
  const t = useTranslations("auth");

  const userTypes = [
    "talent",
    "recruiter",
  ]

  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-full flex items-center justify-center gap-4 mb-4">
              {userTypes.map((userType: any) => (
                <Button key={userType}
                  type="button"
                  size={"lg"}
                  variant={form.watch("user_type") === userType ? "orange" : "muted"}
                  onClick={() => form.setValue("user_type", userType)}
                  className="flex-1 max-w-64 rounded-full"
                >
                  {t(userType)}
                </Button>
              ))}
            </div>

            <div className="col-span-full flex justify-center items-center mb-6">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputImage
                        className="w-40 h-40 object-cover rounded-full overflow-hidden"
                        onChange={(e) => field.onChange(e)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("full-name")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("full-name")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("email-address")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("enter-email")}
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>{t("phone-number")}</FormLabel>
                  <FormControl className="w-full">
                    <PhoneInput
                      placeholder={t("phone-number")}
                      value={field.value}
                      onChange={(value) => field.onChange(value || "")}
                      defaultCountry="JO"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("country")}</FormLabel>
                  <SelectCountry onChange={field.onChange} value={field.value} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="position_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("current-position")}</FormLabel>
                  <SelectPosition onChange={field.onChange} value={field.value} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="language_ids"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("languages")}</FormLabel>
                  <SelectLanguage
                    isMultiple
                    value={field.value || []}
                    onChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("password")}</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder={t("enter-password")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password_confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("password-confirmation")}
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder={
                        t("confirm-password")
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              size={"lg"}
              disabled={isLoading}
              variant={"accentSecondary"}
            >
              {isLoading ? (
                <LoaderIcon className="animate-spin" />
              ) : (
                t("sign-up")
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default RegisterInfoForm