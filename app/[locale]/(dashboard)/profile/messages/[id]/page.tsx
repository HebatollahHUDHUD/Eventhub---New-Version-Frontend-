"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar';
import { ChatMessage } from '../components/ChatMessage';
import { ChatInputForm } from '../components/ChatInputForm';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, MessageSquare } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Skeleton } from '@/components/ui/skeleton';
import MessageAvatar from '../components/MessageAvatar';
import moment from 'moment';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useGetData } from '@/hooks/useFetch';
import { getUserSession } from '@/lib/userSession';
import type { MessagesResponse, MessageType, ConversationDetailsResponse } from '@/schemas/messages';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const MessageDetailsPage = () => {
  const t = useTranslations("messages");
  const router = useRouter();
  const { id } = useParams();
  const conversationId = id as string;
  const user = getUserSession();

  const [page, setPage] = useState(1);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const shouldAutoScrollRef = useRef(true);
  const isLoadingMoreRef = useRef(false);
  const previousScrollHeightRef = useRef(0);
  const previousScrollTopRef = useRef(0);

  // Fetch conversation details
  const { data: conversationData } = useGetData<ConversationDetailsResponse>({
    endpoint: `/messages/conversations/${conversationId}`,
    queryKey: ["Conversation", conversationId],
  });

  const conversation = conversationData?.status === "success" ? conversationData.result?.conversation : null;

  // Fetch messages
  const { data: messagesData, isLoading, refetch } = useGetData<MessagesResponse>({
    endpoint: `/messages/conversations/${conversationId}/messages`,
    queryKey: ["Messages", conversationId, page],
    config: {
      queryParams: {
        page: page.toString(),
      },
    },
    enabled: !!conversationId,
  });

  // Update messages when data changes
  useEffect(() => {
    if (messagesData?.status === "success") {
      const fetchedMessages = messagesData.result?.messages?.data || [];
      const total_pages = messagesData.result?.messages?.pagination?.total_pages || 0;

      setTotalPages(total_pages);

      if (page === 1) {
        setMessages(fetchedMessages);
      } else {
        // Store scroll position before updating messages
        const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
          previousScrollHeightRef.current = viewport.scrollHeight;
          previousScrollTopRef.current = viewport.scrollTop;
        }

        // Prepend older messages
        setMessages((prev) => [...fetchedMessages, ...prev]);
        setIsLoadingMore(false);
      }
    }
  }, [messagesData, page]);

  // Reset page when conversation changes
  useEffect(() => {
    setPage(1);
    setMessages([]);
    setTotalPages(0);
  }, [conversationId]);

  const scrollToBottom = (force = false) => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport && (force || shouldAutoScrollRef.current)) {
        viewport.scrollTo({
          top: viewport.scrollHeight,
          behavior: force ? 'auto' : 'smooth'
        });
      }
    }
  };

  // Check if user is at bottom of scroll and handle pagination
  useEffect(() => {
    const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (!viewport) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = viewport;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      shouldAutoScrollRef.current = isNearBottom;

      // Load more messages when scrolling to top
      if (scrollTop < 100 && totalPages > page && !isLoadingMoreRef.current && !isLoading) {
        isLoadingMoreRef.current = true;
        setIsLoadingMore(true);
        setPage((prevPage) => prevPage + 1);
      }
    };

    viewport.addEventListener('scroll', handleScroll);
    return () => viewport.removeEventListener('scroll', handleScroll);
  }, [messages.length, totalPages, page, isLoading]);

  // Preserve scroll position when loading older messages
  useEffect(() => {
    if (isLoadingMoreRef.current && previousScrollHeightRef.current > 0 && page > 1) {
      const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) {
        requestAnimationFrame(() => {
          const newScrollHeight = viewport.scrollHeight;
          const scrollDifference = newScrollHeight - previousScrollHeightRef.current;
          viewport.scrollTop = previousScrollTopRef.current + scrollDifference;
          previousScrollHeightRef.current = 0;
          previousScrollTopRef.current = 0;
          isLoadingMoreRef.current = false;
        });
      }
    }
  }, [messages.length, page]);

  useEffect(() => {
    if (messages.length > 0 && page === 1) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [messages.length, page]);

  // Group messages and add date separators
  const groupedMessages = useMemo(() => {
    if (!messages.length) return [];

    const grouped: Array<{ type: 'date' | 'message'; data: any }> = [];
    let currentDate: string | null = null;

    messages.forEach((msg, index) => {
      const msgDate = moment(msg.created_at);
      const dateStr = msgDate.format('YYYY-MM-DD');

      // Add date separator if date changed
      if (dateStr !== currentDate) {
        currentDate = dateStr;
        const isToday = msgDate.isSame(moment(), 'day');
        const isYesterday = msgDate.isSame(moment().subtract(1, 'day'), 'day');

        let dateLabel = '';
        if (isToday) {
          dateLabel = t("today");
        } else if (isYesterday) {
          dateLabel = t("yesterday");
        } else {
          dateLabel = msgDate.format('MMMM DD, YYYY');
        }

        grouped.push({ type: 'date', data: dateLabel });
      }

      // Determine if message should be grouped with previous
      const prevMsg = index > 0 ? messages[index - 1] : null;
      const isGrouped = prevMsg &&
        prevMsg.sender.id === msg.sender.id &&
        moment(msg.created_at).diff(moment(prevMsg.created_at), 'minutes') < 5;

      grouped.push({
        type: 'message',
        data: { ...msg, isGrouped, showAvatar: !isGrouped, showSenderName: !isGrouped }
      });
    });

    return grouped;
  }, [messages, t]);

  // Function to add message optimistically
  const addMessageOptimistically = (messageData: { body?: string; attachments: File[] }) => {
    if (!user) return;

    const tempId = Date.now();
    const optimisticMessage: MessageType = {
      id: tempId,
      sender: {
        id: user.id,
        name: user.name || '',
        photo: user.photo || null,
      },
      is_mine: 1,
      body: messageData.body || '',
      attachments: messageData.attachments.map((file, index) => ({
        id: tempId + index,
        file_name: file.name,
        file_path: URL.createObjectURL(file),
      })),
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, optimisticMessage]);
  };

  const users = conversation?.users || [];
  const isMultiple = users.length > 2;
  const otherUser = !isMultiple ? users.find((u) => u.id !== user?.id) : null;

  if (!conversationId) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-muted-foreground">{t("select-a-conversation")}</div>
        </CardContent>
      </Card>
    );
  }

  if (!conversation) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-muted-foreground">{isLoading ? t("loading") : t("conversation-not-found")}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-full max-h-[calc(100vh-120px)] gap-0">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between gap-3 border-b pb-4">
        <div className="flex items-center gap-3">
          <Button
            variant={"ghost"}
            size={"icon"}
            type="button"
            onClick={() => {
              router.push('/profile/messages');
            }}
          >
            <ArrowLeftIcon className="size-4" />
          </Button>

          {isMultiple ? (
            <AvatarGroup>
              {users.slice(0, 3).map((u) => (
                <MessageAvatar
                  key={u.id}
                  image={u.photo || ""}
                  name={u.name || ""}
                  size="sm"
                />
              ))}

              {users.length > 3 && (
                <AvatarGroupCount>
                  +{users.length - 3}
                </AvatarGroupCount>
              )}
            </AvatarGroup>
          ) : (
            <MessageAvatar
              image={otherUser?.photo || ""}
              name={otherUser?.name || ""}
              size="md"
            />
          )}

          <div>
            <div className="flex items-center justify-start gap-3">
              {isMultiple ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className='text-start'>
                      <span className="underline font-semibold text-primary">
                        <span>
                          {users.slice(0, 3).map((u) => u.name?.split(" ")?.[0]).filter(Boolean).join(", ")}
                        </span>
                        {users.length > 3 && <span className="shrink-0 font-bold text-primary"> +{users.length - 3}</span>}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      {users.map((u) => (
                        <p key={u.id}>{u.name}</p>
                      ))}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <h3 className="font-medium">
                  {otherUser?.name || ""}
                </h3>
              )}
            </div>

            <div className="flex items-center gap-3">
              {conversation.subject?.job_ad && (
                <p className="text-xs text-muted-foreground">
                  {conversation.subject.job_ad.title}
                </p>
              )}

              {conversation.subject_id && conversation.subject_type && (
                <Link
                  href={conversation.subject_type}
                  className="underline text-xs text-primary"
                >
                  <span>
                    {t(conversation.subject_type.split("/")?.[conversation.subject_type.split("/")?.length - 2] || "")}
                  </span>
                  {" "}
                  <span>#{conversation.subject_id}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      {/* Messages list */}
      <CardContent className="flex-1 min-h-0 p-0">
        <ScrollArea ref={scrollAreaRef} className="px-4 border-0 w-full rounded-md h-full">
          {isLoading && page === 1 ? (
            <MessageSkeleton />
          ) : groupedMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">{t("no-messages-yet")}</p>
              <p className="text-sm text-muted-foreground mt-1">{t("start-the-conversation")}</p>
            </div>
          ) : (
            <div className="space-y-1 py-4">
              {isLoadingMore && (
                <div className="flex items-center justify-center py-2">
                  <div className="text-xs text-muted-foreground">{t("loading-more-messages") || "Loading more messages..."}</div>
                </div>
              )}
              {groupedMessages.map((item, index) => {
                if (item.type === 'date') {
                  return (
                    <div key={`date-${index}`} className="flex items-center justify-center my-4">
                      <div className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                        {item.data}
                      </div>
                    </div>
                  );
                }
                return (
                  <ChatMessage
                    key={item.data.id}
                    msg={item.data}
                    showAvatar={item.data.showAvatar}
                    showSenderName={item.data.showSenderName}
                    isGrouped={item.data.isGrouped}
                  />
                );
              })}
            </div>
          )}
        </ScrollArea>
      </CardContent>

      {/* Input */}
      <div className="border-t p-3 bg-background">
        <ChatInputForm
          conversation_id={Number(conversationId)}
          onSend={() => {
            // Scroll to bottom or handle send callback
          }}
          refetch={() => {
            refetch();
          }}
          onOptimisticMessage={(data) => {
            addMessageOptimistically(data);
            shouldAutoScrollRef.current = true;
            setTimeout(() => scrollToBottom(true), 50);
          }}
        />
      </div>
    </Card>
  );
};

export default MessageDetailsPage;

const MessageSkeleton = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className={`flex gap-2 ${index % 2 === 0 ? "justify-start" : "justify-end"}`}>
          {index % 2 === 0 && (
            <Skeleton className="size-9 rounded-full" />
          )}
          <div className="flex flex-col gap-2 min-w-[120px] max-w-[70%]">
            <Skeleton className={`h-16 rounded-md ${index % 2 === 0 ? "w-48" : "w-40 ml-auto"}`} />
            <Skeleton className="h-3 w-16 ml-auto" />
          </div>
          {index % 2 !== 0 && (
            <Skeleton className="size-9 rounded-full" />
          )}
        </div>
      ))}
    </div>
  );
};
