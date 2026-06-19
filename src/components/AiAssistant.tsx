import { useState, useEffect, useRef } from "react";
import { Message } from "../types";
import { MessageSquare, X, Send, Bot, User, Trash2, HelpCircle, ArrowDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "assistant",
      content: "Hello! I am Portfolio AI, your recruiter-focused assistant. Ask me anything about Tilak's education, skills, projects, certifications, internships, or why he stands out as an exceptional candidate!",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isOpen]);

  const quickQuestions = [
    "Tell me about Tilak.",
    "What are Tilak's technical skills?",
    "Show Tilak's projects.",
    "What certifications has Tilak completed?",
    "What internship experience does Tilak have?",
    "Why should I hire Tilak?",
    "What technologies does Tilak use?",
    "Show educational qualifications.",
    "How can I contact Tilak?",
    "What are Tilak's achievements?"
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      // Build history payload for server-side
      const historyPayload = messages.slice(1).map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload
        })
      });

      if (!response.ok) {
         throw new Error("Server communication went offline");
      }

      const data = await response.json();
      const assistantMsg: Message = {
        id: Math.random().toString(),
        role: "assistant",
        content: data.text || "I am processing the data. Please verify connectivity.",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        id: Math.random().toString(),
        role: "assistant",
        content: "Oops! I encountered a technical connection glitch communicating with Tilak's server. Please try again! In the meantime, you can review his rich credentials and contact info on the page.",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: "init",
        role: "assistant",
        content: "History refreshed! I am ready to answer your inquiries about Tilak Killamsetty. What would you like to inspect?",
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Button */}
      <button
        id="btn-bot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-brand-gold text-neutral-950 rounded-full flex items-center justify-center hover:bg-[#C9AE68] transition-all duration-300 shadow-lg cursor-pointer border border-brand-gold/45 relative group"
        title="Chat with Portfolio AI"
      >
        <div className="absolute inset-x-0 -top-12 scale-0 group-hover:scale-100 transition-transform duration-300 origin-bottom bg-coal-card text-[11px] text-brand-gold border border-brand-gold/30 py-1 px-3.5 rounded-lg whitespace-nowrap font-mono tracking-widest shadow shadow-brand-gold/10">
          PORTFOLIO AI
        </div>
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={26} />
            </motion.div>
          ) : (
            <motion.div
              key="chat-icon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="flex items-center justify-center relative"
            >
              {/* Pulsing ring indicator */}
              <span className="absolute inset-0 w-full h-full bg-brand-gold rounded-full animate-ping opacity-60 pointer-events-none scale-150" />
              <Bot size={26} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Expandable Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", damping: 20 }}
            className="absolute bottom-16 right-0 w-[92vw] sm:w-[410px] h-[550px] glass-panel border border-brand-gold/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-50 shadow-brand-gold/10"
          >
            {/* Header */}
            <div className="px-4 py-3.5 bg-gradient-to-r from-coal-card to-neutral-900 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 bg-brand-gold/20 border border-brand-gold/40 rounded-full flex items-center justify-center relative">
                  <Bot size={18} className="text-brand-gold" />
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-coal-card" />
                </div>
                <div>
                  <h4 className="text-sm font-display font-bold text-white tracking-wider flex items-center gap-1.5 leading-tight">
                    PORTFOLIO AI <span className="text-[9px] font-mono py-0.5 px-2 bg-brand-gold/10 text-brand-gold rounded border border-brand-gold/20 uppercase tracking-widest leading-none">AGENT</span>
                  </h4>
                  <p className="text-[10px] text-gray-400 font-mono">Tilak's Portfolio Assistant</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="btn-bot-clear"
                  onClick={handleClearHistory}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  title="Clear Chat"
                >
                  <Trash2 size={15} />
                </button>
                <button
                  id="btn-bot-close-x"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Chat Body & Predefined list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  <div className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 border ${
                    msg.role === "user"
                      ? "bg-zinc-800 border-white/5 text-gray-300"
                      : "bg-brand-gold/10 border-brand-gold/20 text-brand-gold"
                  }`}>
                    {msg.role === "user" ? <User size={13} /> : <Bot size={13} />}
                  </div>

                  {/* Message Bubble */}
                  <div className={`max-w-[78%] rounded-xl p-3 text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "bg-brand-gold text-neutral-950 rounded-tr-none text-right font-sans font-medium"
                      : "bg-zinc-800/80 text-gray-200 border border-white/5 rounded-tl-none font-sans"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2.5 flex-row">
                  <div className="h-7 w-7 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold flex items-center justify-center shrink-0">
                    <Bot size={13} />
                  </div>
                  <div className="bg-zinc-800/80 text-gray-400 border border-white/5 rounded-xl rounded-tl-none p-3 text-xs flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 bg-brand-gold rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-1.5 w-1.5 bg-brand-gold rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="h-1.5 w-1.5 bg-brand-gold rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Predefined Quick Questions Menu */}
            <div className="px-3 pt-2.5 pb-1 border-t border-white/5 bg-zinc-950/40">
              <div className="flex items-center gap-1 text-[10px] text-brand-gold font-mono uppercase mb-1.5">
                <HelpCircle size={11} />
                <span>Suggested Recruiter Inquiries:</span>
              </div>
              <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none scroll-smooth select-none">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    id={`quick-q-${idx}`}
                    onClick={() => handleSendMessage(q)}
                    className="shrink-0 px-3 py-1 text-[10px] font-mono text-gray-300 bg-zinc-900 border border-white/5 rounded-full hover:border-brand-gold/50 hover:text-neutral-950 hover:bg-brand-gold transition-all duration-200 cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="p-3 bg-neutral-950 border-t border-white/5 flex gap-2"
            >
              <input
                id="bot-text-input"
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask Tilak's assistant..."
                disabled={isLoading}
                className="flex-1 px-3 py-2 text-xs bg-zinc-900 border border-white/5 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors inline-block"
              />
              <button
                id="btn-bot-send"
                type="submit"
                disabled={isLoading || !inputText.trim()}
                className="p-2 bg-brand-gold text-neutral-950 rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center shrink-0"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
