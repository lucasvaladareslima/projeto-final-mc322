"use client";

import { apiUrl } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { ForumMessage } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ForumPage() {
  const params = useParams();
  const { id } = params;

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [messages, setMessages] = useState<ForumMessage[]>([]);

  const { user } = useAuth();

  function getCookie(name: string): string | undefined {
    if (typeof document === "undefined") return undefined;

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift();
    }
    return undefined;
  }

  useEffect(() => {
    async function fetchMessages() {
      try {
        const turma_pk = 1;
        const res = await fetch(`${apiUrl}/ensino/turma/${turma_pk}/posts`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }); // Exemplo de endpoint
        if (!res.ok) {
          console.error("Erro ao buscar mensagens do fórum");
          return;
        }
        const data: ForumMessage[] = await res.json();
        setMessages(data);
      } catch (error) {
        console.error("Erro ao buscar mensagens do fórum:", error);
        return;
      }
    }
    fetchMessages();
  }, [id]);

  const handleFormSubmit = async () => {
    // console.error("IMPLEMENTAR: enviar mensagem para o banco de dados");
    if (content.trim() === "") return;
    const newMessage: ForumMessage = {
      id: messages.length + 1, // Simulando um ID único
      titulo: title.trim() || "Mensagem sem título",
      conteudo: content,
      data_criacao: new Date().toISOString(),
      autor: user!, // Aqui você pode pegar o nome do usuário logado
      tags: [],
      comentarios: [], // Inicialmente sem comentários
    };

    const csrftoken = getCookie("csrftoken");

    if (!csrftoken) {
      throw new Error("CSRF token not found");
    }
    //mandar mensagem para o banco de dados
    const res = await fetch(`${apiUrl}/ensino/turma/1/posts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken || "", // Adicionando o CSRF token
      },
      credentials: "include",
      body: JSON.stringify({
        titulo: newMessage.titulo,
        conteudo: newMessage.conteudo,
      }),
    });

    if (!res.ok) {
      console.error("Erro ao enviar mensagem para o fórum", res.status);
      return;
    }

    setMessages([newMessage, ...messages]); // Adiciona a nova mensagem ao início da lista
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
              <h3 className="text-lg font-semibold">{message.titulo}</h3>
              <p className="text-sm text-gray-700">{message.conteudo}</p>
              <p className="text-xs text-gray-500 mt-2">
                {message.autor.name} -{" "}
                {new Date(message.data_criacao).toLocaleString()}
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
            type="submit"
            className="material-icons outline-none focus:ring-2 ring-slate-600 rounded-full bg-sky-600 text-white p-2 ml-2 cursor-pointer"
          >
            arrow_forward
          </button>
        </div>
      </form>
    </main>
  );
}
