import { NextResponse } from 'next/server';

type ChatMessage = {
  text: string;
  isUser: boolean;
  timestamp: string; // ou Date si tu veux faire `new Date(msg.timestamp)`
};

type ChatRequestBody = {
  messages: ChatMessage[];
};

export async function POST(req: Request) {
  try {
    const body: ChatRequestBody = await req.json();
    const messages = body.messages;

    if (!messages || !Array.isArray(messages)) {
      console.error('[API ERROR] Messages invalides :', messages);
      return NextResponse.json(
        { error: 'Messages manquants ou au mauvais format' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    const projectId = process.env.OPENAI_PROJECT_ID;

    if (!apiKey || !projectId) {
      console.error('[API ERROR] Clé API ou Project ID manquant');
      return NextResponse.json({ error: 'Clé API ou Project ID manquant' }, { status: 500 });
    }

    const limitedMessages = messages.slice(-10);

    console.log('[DEBUG] Envoi à OpenAI avec:', {
      apiKey: apiKey.substring(0, 10) + '...',
      projectId,
      messages: limitedMessages,
    });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'OpenAI-Project': projectId,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content:
              'Tu es un assistant voyage expert du Québec et du Canada. Tu poses des questions pertinentes et proposes des destinations, activités, campings ou hôtels adaptés au profil (famille, ado, etc.). Termine toujours avec une question ou un conseil utile.',
          },
          ...limitedMessages.map((msg) => ({
            role: msg.isUser ? 'user' : 'assistant',
            content: msg.text,
          })),
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[OpenAI ERROR]', data);
      return NextResponse.json({ error: 'Erreur OpenAI', detail: data }, { status: 500 });
    }

    const reply =
      data.choices?.[0]?.message?.content || 'Je n’ai pas compris, peux-tu reformuler ?';

    return NextResponse.json({ message: reply });
  } catch (error) {
    console.error('[SERVER ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur ou OpenAI' }, { status: 500 });
  }
}
