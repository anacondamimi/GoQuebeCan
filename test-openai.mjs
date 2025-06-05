import fetch from 'node-fetch';

// Remplace par ta clé à tester (TEMPORAIREMENT ici, ne la partage jamais ailleurs)
const apiKey = 'sk-...'; // ta clé ici entre guillemets

async function testOpenAI() {
  try {
    const response = await fetch('https://api.openai.com/v1/models', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Statut HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Clé API valide ! Modèles disponibles :');
    console.log(data.data.map((model) => model.id));
  } catch (err) {
    console.error('❌ Clé API invalide ou erreur de connexion :', err.message);
  }
}

testOpenAI();
