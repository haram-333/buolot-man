"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./page.module.css";

type Message = {
  id: string;
  sender: "technician" | "client";
  text: string;
  time: string;
};

type Conversation = {
  id: string;
  participant: {
    name: string;
    initials: string;
    status: "online" | "offline";
  };
  taskTitle: string;
  taskLocation: string;
  budget: string;
  updatedAt: string;
  unreadCount: number;
  preview: string;
  messages: Message[];
};

const initialConversations: Conversation[] = [
  {
    id: "conv-robert",
    participant: {
      name: "Robert M.",
      initials: "RM",
      status: "online",
    },
    taskTitle: "Need an experienced electrician for a complete commercial panel upgrade",
    taskLocation: "Austin, TX",
    budget: "$1,500 - $2,500",
    updatedAt: "10:42 AM",
    unreadCount: 0,
    preview: "That sounds fair. Can you start Thursday morning?",
    messages: [
      {
        id: "msg-r1",
        sender: "client",
        text: "Hi there! Are you available for a panel upgrade this week?",
        time: "10:30 AM",
      },
      {
        id: "msg-r2",
        sender: "technician",
        text: "Hello Robert, yes I am. Could you share a few details about the current panel and service size?",
        time: "10:35 AM",
      },
      {
        id: "msg-r3",
        sender: "client",
        text: "Sure, here are the specs from the original builder. Let me know if you need pictures as well.",
        time: "10:40 AM",
      },
    ],
  },
  {
    id: "conv-techcorp",
    participant: {
      name: "TechCorp Facilities",
      initials: "TF",
      status: "online",
    },
    taskTitle: "Warehouse lighting controls retrofit",
    taskLocation: "Dallas, TX",
    budget: "$2,800",
    updatedAt: "Tue",
    unreadCount: 2,
    preview: "When can you come for the installation walk-through?",
    messages: [
      {
        id: "msg-t1",
        sender: "client",
        text: "We reviewed your bid and want to schedule a short site walk-through.",
        time: "Tue 9:10 AM",
      },
      {
        id: "msg-t2",
        sender: "client",
        text: "When can you come for the installation walk-through?",
        time: "Tue 9:22 AM",
      },
    ],
  },
  {
    id: "conv-sarah",
    participant: {
      name: "Sarah Jenkins",
      initials: "SJ",
      status: "offline",
    },
    taskTitle: "Urgent plumbing repair coordination",
    taskLocation: "Houston, TX",
    budget: "$350",
    updatedAt: "Yesterday",
    unreadCount: 0,
    preview: "Thank you for the excellent work last week.",
    messages: [
      {
        id: "msg-s1",
        sender: "client",
        text: "Thank you for the excellent work last week.",
        time: "Yesterday",
      },
    ],
  },
  {
    id: "conv-mike",
    participant: {
      name: "Mike's Plumbing",
      initials: "MP",
      status: "offline",
    },
    taskTitle: "Generator room outlet upgrade",
    taskLocation: "San Antonio, TX",
    budget: "$640",
    updatedAt: "Mon",
    unreadCount: 0,
    preview: "The pipes look good to go.",
    messages: [
      {
        id: "msg-m1",
        sender: "client",
        text: "The pipes look good to go. We can coordinate with your electrical scope next.",
        time: "Mon",
      },
    ],
  },
  {
    id: "conv-elite",
    participant: {
      name: "Elite Landscapes",
      initials: "EL",
      status: "online",
    },
    taskTitle: "Outdoor power run for irrigation controls",
    taskLocation: "Round Rock, TX",
    budget: "$780",
    updatedAt: "Oct 12",
    unreadCount: 0,
    preview: "Invoice #2041 sent.",
    messages: [
      {
        id: "msg-e1",
        sender: "client",
        text: "Invoice #2041 sent.",
        time: "Oct 12",
      },
    ],
  },
  {
    id: "conv-austin-fixers",
    participant: {
      name: "Austin Fixers",
      initials: "AF",
      status: "offline",
    },
    taskTitle: "Retail outlet rewiring",
    taskLocation: "Austin, TX",
    budget: "$410",
    updatedAt: "Oct 10",
    unreadCount: 0,
    preview: "Let me know when you arrive.",
    messages: [
      {
        id: "msg-a1",
        sender: "client",
        text: "Let me know when you arrive.",
        time: "Oct 10",
      },
    ],
  },
];

export default function TechnicianMessagesPage() {
  const [threadSearch, setThreadSearch] = useState("");
  const [draft, setDraft] = useState("Yes, Thursday morning works perfectly. I will send a quick checklist before I arrive.");
  const [mobileListOpen, setMobileListOpen] = useState(true);
  const [conversations, setConversations] = useState(initialConversations);
  const [activeConversationId, setActiveConversationId] = useState(initialConversations[0]?.id ?? "");

  const filteredConversations = useMemo(() => {
    const normalized = threadSearch.trim().toLowerCase();
    if (!normalized) return conversations;

    return conversations.filter((conversation) =>
      [conversation.participant.name, conversation.taskTitle, conversation.taskLocation, conversation.preview]
        .join(" ")
        .toLowerCase()
        .includes(normalized)
    );
  }, [conversations, threadSearch]);

  const activeConversation =
    filteredConversations.find((conversation) => conversation.id === activeConversationId) ??
    conversations.find((conversation) => conversation.id === activeConversationId) ??
    filteredConversations[0] ??
    conversations[0];

  const selectConversation = (conversationId: string) => {
    setActiveConversationId(conversationId);
    setMobileListOpen(false);
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === conversationId ? { ...conversation, unreadCount: 0 } : conversation
      )
    );
  };

  const sendMessage = () => {
    const text = draft.trim();
    if (!text || !activeConversation) return;

    const now = "Now";
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === activeConversation.id
          ? {
              ...conversation,
              updatedAt: now,
              preview: text,
              messages: [
                ...conversation.messages,
                {
                  id: `${conversation.id}-${conversation.messages.length + 1}`,
                  sender: "technician",
                  text,
                  time: now,
                },
              ],
            }
          : conversation
      )
    );
    setDraft("");
  };

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <Link href="/" className={styles.brand} aria-label="Boulot Man home">
          <Image src="/boulotman-logo.png" alt="Boulot Man" width={220} height={56} className={styles.brandImage} priority />
        </Link>

        <div className={styles.topActions}>
          <Link href="/dashboard/technician" className={styles.dashboardLink}>
            <iconify-icon icon="lucide:layout-dashboard" />
            <span>Dashboard</span>
          </Link>
          <Link href="/dashboard/technician/profile" className={styles.profilePill}>
            <span className={styles.profileAvatar}>DM</span>
          </Link>
        </div>
      </header>

      <div className={styles.main}>
        <aside className={`${styles.sidebar} ${!mobileListOpen ? styles.sidebarHiddenMobile : ""}`}>
          <div className={styles.sidebarHead}>
            <h1>Messages</h1>
            <label className={styles.searchBox}>
              <iconify-icon icon="lucide:search" />
              <input
                type="search"
                value={threadSearch}
                onChange={(event) => setThreadSearch(event.target.value)}
                placeholder="Search messages..."
                aria-label="Search messages"
              />
            </label>
          </div>

          <div className={styles.conversationList}>
            {filteredConversations.map((conversation) => {
              const isActive = activeConversation?.id === conversation.id;

              return (
                <button
                  key={conversation.id}
                  type="button"
                  className={`${styles.conversationItem} ${isActive ? styles.conversationItemActive : ""}`}
                  onClick={() => selectConversation(conversation.id)}
                >
                  <div className={styles.conversationAvatarWrap}>
                    <span className={styles.conversationAvatar}>{conversation.participant.initials}</span>
                    <span
                      className={`${styles.statusDot} ${
                        conversation.participant.status === "offline" ? styles.statusDotOffline : ""
                      }`}
                    />
                  </div>

                  <div className={styles.conversationBody}>
                    <div className={styles.conversationTop}>
                      <strong>{conversation.participant.name}</strong>
                      <span>{conversation.updatedAt}</span>
                    </div>
                    <div className={styles.conversationBottom}>
                      <p>{conversation.preview}</p>
                      {conversation.unreadCount ? <span className={styles.unreadPill}>{conversation.unreadCount}</span> : null}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        <section className={`${styles.chatPanel} ${mobileListOpen ? styles.chatPanelHiddenMobile : ""}`}>
          {activeConversation ? (
            <>
              <header className={styles.chatHeader}>
                <div className={styles.chatUser}>
                  <button type="button" className={styles.mobileBackButton} aria-label="Back to conversations" onClick={() => setMobileListOpen(true)}>
                    <iconify-icon icon="lucide:arrow-left" />
                  </button>

                  <span className={styles.chatAvatar}>{activeConversation.participant.initials}</span>
                  <div className={styles.chatUserCopy}>
                    <strong>{activeConversation.participant.name}</strong>
                    <span className={styles.chatStatus}>
                      {activeConversation.participant.status === "online" ? "Online" : "Offline"}
                    </span>
                  </div>
                </div>

                <div className={styles.chatTools}>
                  <button type="button" className={styles.toolButton} aria-label="Call">
                    <iconify-icon icon="lucide:phone" />
                  </button>
                  <button type="button" className={styles.toolButton} aria-label="Video call">
                    <iconify-icon icon="lucide:video" />
                  </button>
                  <button type="button" className={styles.toolButton} aria-label="Conversation options">
                    <iconify-icon icon="lucide:more-vertical" />
                  </button>
                </div>
              </header>

              <div className={styles.messagesWrap}>
                <div className={styles.divider}>Task Details</div>

                <div className={styles.taskCard}>
                  <div className={styles.taskTitle}>{activeConversation.taskTitle}</div>
                  <div className={styles.taskMeta}>
                    <span className={styles.taskLocation}>
                      <iconify-icon icon="lucide:map-pin" />
                      <span>{activeConversation.taskLocation}</span>
                    </span>
                    <strong>{activeConversation.budget}</strong>
                  </div>
                </div>

                <div className={styles.divider}>Today</div>

                <div className={styles.thread}>
                  {activeConversation.messages.map((message) => (
                    <article
                      key={message.id}
                      className={`${styles.messageRow} ${
                        message.sender === "technician" ? styles.messageRowSent : styles.messageRowReceived
                      }`}
                    >
                      {message.sender === "client" ? <span className={styles.messageAvatar}>{activeConversation.participant.initials}</span> : null}
                      <div className={styles.bubbleGroup}>
                        <div className={styles.bubble}>{message.text}</div>
                        <div className={styles.messageTime}>{message.time}</div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <form
                className={styles.inputBar}
                onSubmit={(event) => {
                  event.preventDefault();
                  sendMessage();
                }}
              >
                <button type="button" className={styles.attachButton} aria-label="Attach a file">
                  <iconify-icon icon="lucide:paperclip" />
                </button>

                <label className={styles.composeBox}>
                  <input
                    type="text"
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    placeholder="Type a message..."
                    aria-label="Type a message"
                  />
                  <button type="button" className={styles.composeIconButton} aria-label="Add emoji">
                    <iconify-icon icon="lucide:smile" />
                  </button>
                </label>

                <button type="submit" className={styles.sendButton} aria-label="Send message" disabled={!draft.trim()}>
                  <iconify-icon icon="lucide:send" />
                </button>
              </form>
            </>
          ) : (
            <div className={styles.emptyState}>Select a conversation to start messaging.</div>
          )}
        </section>
      </div>
    </main>
  );
}
