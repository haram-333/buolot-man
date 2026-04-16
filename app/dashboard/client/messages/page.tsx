"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { clientConversations, dashboardNavItems } from "../taskData";
import styles from "./page.module.css";

function getLatestMessagePreview(messages: Array<{ text: string }>) {
  return messages[messages.length - 1]?.text ?? "No messages yet.";
}

export default function ClientMessagesPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileConversationOpen, setMobileConversationOpen] = useState(false);
  const [threadSearch, setThreadSearch] = useState("");
  const [draft, setDraft] = useState("");
  const [conversations, setConversations] = useState(clientConversations);
  const [activeConversationId, setActiveConversationId] = useState(clientConversations[0]?.id ?? "");

  const filteredConversations = useMemo(() => {
    const normalized = threadSearch.trim().toLowerCase();
    if (!normalized) return conversations;

    return conversations.filter((conversation) =>
      [conversation.participant.name, conversation.participant.role, conversation.taskTitle, getLatestMessagePreview(conversation.messages)]
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
    setMobileConversationOpen(true);
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === conversationId ? { ...conversation, unreadCount: 0 } : conversation
      )
    );
  };

  const handleSendMessage = () => {
    const message = draft.trim();
    if (!message || !activeConversation) return;

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === activeConversation.id
          ? {
              ...conversation,
              updatedAt: "Now",
              messages: [
                ...conversation.messages,
                {
                  id: `${conversation.id}-${conversation.messages.length + 1}`,
                  sender: "client",
                  text: message,
                  time: "Now",
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
      <div className={styles.layout}>
        <aside className={`${styles.sidebar} ${mobileNavOpen ? styles.sidebarOpen : ""}`}>
          <div className={styles.sidebarHeader}>
            <div>
              <p className={styles.sidebarEyebrow}>Boulot Man</p>
              <h1 className={styles.sidebarTitle}>Client Space</h1>
            </div>
            <button type="button" className={styles.sidebarClose} aria-label="Close navigation" onClick={() => setMobileNavOpen(false)}>
              <iconify-icon icon="lucide:x" />
            </button>
          </div>

          <nav className={styles.sidebarNav} aria-label="Dashboard navigation">
            {dashboardNavItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`${styles.navItem} ${item.key === "messages" ? styles.navItemActive : ""}`}
                onClick={() => setMobileNavOpen(false)}
              >
                <iconify-icon icon={item.icon} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className={styles.sidebarFooter}>
            <Link href="/login" className={styles.logoutButton}>
              <iconify-icon icon="lucide:log-out" />
              <span>Logout</span>
            </Link>
          </div>
        </aside>

        <div className={styles.main}>
          <header className={styles.topbar}>
            <div className={styles.topbarLeft}>
              <button type="button" className={styles.mobileMenuButton} aria-label="Open navigation" onClick={() => setMobileNavOpen(true)}>
                <iconify-icon icon="lucide:menu" />
              </button>

              <label className={styles.searchBar}>
                <iconify-icon icon="lucide:search" />
                <input type="search" placeholder="Search tasks, professionals..." aria-label="Search tasks and professionals" />
              </label>
            </div>

            <div className={styles.topbarActions}>
              <button type="button" className={styles.iconButton} aria-label="Notifications">
                <iconify-icon icon="lucide:bell" />
                <span className={styles.notificationDot} />
              </button>

              <div className={styles.userMenu}>
                <div className={styles.userAvatar}>JD</div>
                <div>
                  <p className={styles.userName}>John Doe</p>
                  <p className={styles.userRole}>Client</p>
                </div>
              </div>
            </div>
          </header>

          <div className={styles.chatShell}>
            <aside
              className={`${styles.conversationPanel} ${
                mobileConversationOpen ? styles.conversationPanelHiddenMobile : ""
              }`}
            >
              <div className={styles.panelHeader}>
                <div className={styles.panelTitleRow}>
                  <h1 className={styles.panelTitle}>Messages</h1>
                  <button type="button" className={styles.newMessageButton} aria-label="Start a new message">
                    <iconify-icon icon="lucide:square-pen" />
                  </button>
                </div>

                <label className={styles.threadSearch}>
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
                {filteredConversations.length ? (
                  filteredConversations.map((conversation) => {
                    const latestMessage = getLatestMessagePreview(conversation.messages);
                    const isActive = conversation.id === activeConversation?.id;

                    return (
                      <button
                        key={conversation.id}
                        type="button"
                        className={`${styles.conversationItem} ${isActive ? styles.conversationItemActive : ""}`}
                        onClick={() => selectConversation(conversation.id)}
                      >
                        <div className={styles.conversationAvatarWrap}>
                          <div className={styles.conversationAvatar}>{conversation.participant.initials}</div>
                          <span
                            className={`${styles.onlineDot} ${
                              conversation.participant.status === "online" ? styles.onlineDotActive : ""
                            }`}
                          />
                        </div>

                        <div className={styles.conversationContent}>
                          <div className={styles.conversationMeta}>
                            <strong>{conversation.participant.name}</strong>
                            <span>{conversation.updatedAt}</span>
                          </div>
                          <div className={styles.conversationPreviewRow}>
                            <p className={`${styles.conversationPreview} ${conversation.unreadCount ? styles.conversationPreviewStrong : ""}`}>
                              {latestMessage}
                            </p>
                            {conversation.unreadCount ? (
                              <span className={styles.unreadPill}>{conversation.unreadCount}</span>
                            ) : null}
                          </div>
                          <span className={styles.conversationTask}>{conversation.taskTitle}</span>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className={styles.emptyThreads}>No conversations match your search.</div>
                )}
              </div>
            </aside>

            <section className={`${styles.chatPanel} ${mobileConversationOpen ? styles.chatPanelOpenMobile : ""}`}>
              {activeConversation ? (
                <>
                  <header className={styles.chatHeader}>
                    <div className={styles.chatUser}>
                      <button
                        type="button"
                        className={styles.mobileBackButton}
                        aria-label="Back to conversations"
                        onClick={() => setMobileConversationOpen(false)}
                      >
                        <iconify-icon icon="lucide:arrow-left" />
                      </button>

                      <div className={styles.chatAvatarWrap}>
                        <div className={styles.chatAvatar}>{activeConversation.participant.initials}</div>
                        <span
                          className={`${styles.onlineDot} ${
                            activeConversation.participant.status === "online" ? styles.onlineDotActive : ""
                          }`}
                        />
                      </div>

                      <div className={styles.chatUserDetails}>
                        <strong>{activeConversation.participant.name}</strong>
                        <span>
                          {activeConversation.participant.status === "online" ? "Online" : "Offline"} • {activeConversation.participant.role}
                        </span>
                      </div>
                    </div>

                    <div className={styles.chatHeaderActions}>
                      <button type="button" className={styles.circleIcon} aria-label="Call">
                        <iconify-icon icon="lucide:phone" />
                      </button>
                      <button type="button" className={styles.circleIcon} aria-label="Video call">
                        <iconify-icon icon="lucide:video" />
                      </button>
                      <button type="button" className={styles.circleIcon} aria-label="Conversation options">
                        <iconify-icon icon="lucide:ellipsis-vertical" />
                      </button>
                    </div>
                  </header>

                  <div className={styles.messagesArea}>
                    <div className={styles.dateRow}>
                      <span className={styles.datePill}>Today</span>
                    </div>

                    {activeConversation.messages.map((message) => (
                      <article
                        key={message.id}
                        className={`${styles.messageGroup} ${
                          message.sender === "client" ? styles.messageGroupSent : styles.messageGroupReceived
                        }`}
                      >
                        <div className={styles.messageBubble}>{message.text}</div>
                        <div className={styles.messageMeta}>
                          <span>{message.time}</span>
                          {message.sender === "client" ? <iconify-icon icon="lucide:check-check" /> : null}
                        </div>
                      </article>
                    ))}
                  </div>

                  <form
                    className={styles.composer}
                    onSubmit={(event) => {
                      event.preventDefault();
                      handleSendMessage();
                    }}
                  >
                    <label className={styles.composerField}>
                      <input
                        type="text"
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                        placeholder="Type a message..."
                        aria-label="Type a message"
                      />
                      <button type="button" className={styles.composerIconButton} aria-label="Attach a file">
                        <iconify-icon icon="lucide:paperclip" />
                      </button>
                    </label>

                    <button type="submit" className={styles.sendButton} aria-label="Send message" disabled={!draft.trim()}>
                      <iconify-icon icon="lucide:send-horizontal" />
                    </button>
                  </form>
                </>
              ) : (
                <div className={styles.emptyChat}>Select a conversation to start messaging.</div>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
