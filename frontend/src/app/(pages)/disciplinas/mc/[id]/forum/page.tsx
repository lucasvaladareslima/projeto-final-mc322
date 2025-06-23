"use client";

import { apiUrl } from "@/constants";
import { ForumMessage } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ForumPage() {
  const params = useParams();
  const { id } = params;

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [messages, setMessages] = useState<ForumMessage[]>([]);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch(`${apiUrl}/forum/${id}`); // Exemplo de endpoint
        if (!res.ok) {
          console.error("Erro ao buscar mensagens do fórum");
          return;
        }
        const data = await res.json();
        for (const message of data.messages) {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              ...message,
              timestamp: new Date(message.timestamp).toISOString(),
            },
          ]);
        }
      } catch (error) {
        console.error("Erro ao buscar mensagens do fórum:", error);
        return;
      }
    }
    fetchMessages();
  }, [id]);

  const handleFormSubmit = () => {
    // console.error("IMPLEMENTAR: enviar mensagem para o banco de dados");
    if (content.trim() === "") return;
    const newMessage: ForumMessage = {
      title: title.trim() || "Mensagem sem título",
      content,
      timestamp: new Date().toISOString(),
      author: "Usuário", // Aqui você pode pegar o nome do usuário logado
    };
    setMessages([...messages, newMessage]);
    setContent("");
    setTitle("");
  };

  return (
    <main className="text-black bg-white flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-center text-3xl font-extrabold">
        Fórum da Turma MC{id} X
      </h2>
      <p className="text-center text-sm">
        Participe das discussões e tire suas dúvidas.
      </p>
      <div className="mt-5 h-[50vh] min-w-2/3 space-y-4 rounded-xl border-2 border-slate-600 p-8 overflow-y-auto">
        {messages.length == 0 ? (
          <p className="text-sm text-slate-600">
            Sem mensagens por enquanto...
          </p>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className="flex flex-col bg-slate-200 p-4 rounded-lg"
            >
              <h3 className="text-lg font-semibold">{message.title}</h3>
              <p className="text-sm text-gray-700">{message.content}</p>
              <p className="text-xs text-gray-500 mt-2">
                {message.author} -{" "}
                {new Date(message.timestamp).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
      <form
        className="flex flex-col space-y-4 items-center mt-5 min-w-2/3"
        onSubmit={(e) => {
          e.preventDefault();
          handleFormSubmit();
        }}
      >
        <input
          className="w-full rounded-xl border border-black p-2 outline-none"
          placeholder="Título da mensagem"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex items-center w-full">
          <textarea
            rows={5}
            className="w-full rounded-xl border border-black p-2 outline-none resize-none"
            placeholder="Conteúdo da mensagem"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            onClick={handleFormSubmit}
            className="material-icons outline-none focus:ring-2 ring-slate-600 rounded-full bg-sky-600 text-white p-2 ml-2 cursor-pointer"
          >
            arrow_forward
          </button>
        </div>
      </form>
    </main>
  );
}
