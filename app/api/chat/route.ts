import { NextResponse } from 'next/server';

type ChatMessage = {
  text: string;
  isUser: boolean;
  timestamp: string;
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
      return NextResponse.json({ error: 'Messages invalides' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    const projectId = process.env.OPENAI_PROJECT_ID;

    if (!apiKey || !projectId) {
      console.error('[API ERROR] Clé API ou Project ID manquant');
      return NextResponse.json({ error: 'Clé API ou Project ID manquant' }, { status: 500 });
    }

    const limitedMessages = messages.slice(-10);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'OpenAI-Project': projectId,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        max_tokens: 800,
        messages: [
          {
            role: 'system',
            content: `
Tu es un assistant voyage expert et chaleureux, spécialisé dans les régions du Québec et du Canada.

🎯 Ta mission :
- Aider des familles, campeurs, amoureux de la nature ou de la bouffe locale à organiser leur voyage.
- Proposer des destinations, itinéraires, activités et bons plans.
- Mettre en avant les contenus disponibles sur le site : blog, vidéos, objets, planificateur.
- Si la destination correspond à un article connu (ex : "tadoussac", "banff", "gaspésie"...), tu ajoutes les liens suivants en Markdown :

📘 Article : [Voir l’article](/blog/nOM-dESTINATION)  
🎥 Vidéos : [Regarder les vidéos](/videos#NOM-DESTINATION)  
🧳 Objets utiles : [Voir la liste](/objets)  
🗺️ Planificateur : [Planifier mon voyage](/planificateur)  
🏨 Hôtels : [Hôtels à NOM](https://www.booking.com/searchresults.html?city=xxx.fr.html)

🗣️ Ton ton :
- Simple, amical, professionnel.
- Pose une question à la fin : 
  → “Tu veux une étape plus sauvage ou plutôt gourmande ?”  
  → “Tu as une région ou un budget en tête ?”

🛑 Ne donne jamais de lien qui ne mène à rien.  
🗨️ Tu réponds uniquement en **français**. Tu peux utiliser des **emojis** avec modération.
            `,
          },
          ...limitedMessages.map((msg) => ({
            role: msg.isUser ? 'user' : 'assistant',
            content: msg.text,
          })),
        ],
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
