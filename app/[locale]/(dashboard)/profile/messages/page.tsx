"use client"

import { AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar"
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import MessageAvatar from './components/MessageAvatar';
import { useTranslations } from "next-intl";
import { useGetData } from "@/hooks/useFetch";
import Link from "next/link";
import { getUserSession } from "@/lib/userSession";
import type { ConversationsResponse, Conversation } from "@/schemas/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Conversations = () => {

  const user = getUserSession();
  const [search, setSearch] = useState("");


  const t = useTranslations("messages");
  const { data, isLoading } = useGetData<ConversationsResponse>({
    endpoint: "/messages/conversations",
    queryKey: ["Conversations"],
    config: {
      queryParams: {
        search_key: search,
      },
    },
  })

  const conversations: Conversation[] = data?.status === "success" ? data.result?.conversations || [] : [];

  return (
    <Card>
      <CardHeader className="flex justify-between items-center space-y-0">
        <CardTitle>{t("messages")}</CardTitle>

        <Input
          value={search}
          placeholder={t("search-your-message")}
          onChange={(e) => setSearch(e.target.value)}
          className="h-12 max-w-xs"
        />
      </CardHeader>

      <CardContent>
        <div className='flex flex-col w-full h-full'>


          <div className="flex-1 min-h-0">
            <ScrollArea className="overflow-y-auto h-80 lg:h-92 pt-1 border-0 w-full">
              <div className="space-y-2">
                {isLoading ? (
                  <ConversationSkeleton />
                ) : (
                  conversations?.map((item: Conversation) => {
                    const isMultiple = item.users.length > 2;
                    const otherUser = !isMultiple ? item.users.find((u) => u.id !== user?.id) : null;
                    const subject = item.subject_type?.split("/")

                    return (
                      <Link
                        href={`/profile/messages/${item.id}`}
                        key={item.id}
                        className="flex w-full bg-background shadow-sm border border-border/80 px-4 py-4 rounded-md cursor-pointer relative hover:bg-muted/40"
                      >
                        {!!item.unread_count && item.unread_count > 0 && (
                          <span className="absolute top-1/2 end-4 -translate-y-1/2 shrink-0 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {item.unread_count}
                          </span>
                        )}

                        <div className="flex items-center text-start gap-4">
                          {isMultiple ? (
                            <AvatarGroup>
                              {item?.users?.slice(0, 1)?.map((u) => (
                                <MessageAvatar
                                  key={u.id}
                                  image={u?.photo || ""}
                                  name={u?.name || ""}
                                  size="lg"
                                />
                              ))}

                              {item?.users?.length > 1 && (
                                <AvatarGroupCount>
                                  +{item?.users?.length - 1}
                                </AvatarGroupCount>
                              )}

                            </AvatarGroup>
                          ) : (
                            <MessageAvatar
                              image={otherUser?.photo || ""}
                              name={otherUser?.name || ""}
                              size="lg"
                            />
                          )}

                          <div className="flex flex-col text-start">
                            {isMultiple ? <>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger className='text-start'>
                                    <span className="underline font-semibold text-primary">
                                      {t("multiple-members")}
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    {item.users.map((u) => (
                                      <div key={u.id}>
                                        <p>{u.name}</p>
                                      </div>
                                    ))}
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                            </> : <>
                              <p className="font-semibold text-primary">{otherUser?.name || ""}</p>
                            </>}

                            {!!item.subject && (
                              <p className="text-sm text-muted-foreground">{item?.subject?.job_ad?.title || ""}</p>
                            )}
                          </div>
                        </div>
                      </Link>
                    )
                  })
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </CardContent>

    </Card>

  )
}

export default Conversations

const ConversationSkeleton = () => {
  return Array.from({ length: 5 }).map((_, index) => (
    <div key={index} className="w-full p-2 rounded-md">
      <div className="flex items-center text-start gap-4">
        <Skeleton className="size-10 rounded-full" />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-40" />
        </div>
      </div>
    </div>
  ))
}