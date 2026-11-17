// api/chat.js (Node.js Serverless Function)
export default async function handler(req, res) {
    // 1. Permitir apenas requisições POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    const { message } = req.body;

    if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Mensagem inválida' });
    }

    // 2. Chave de API protegida pelas Variáveis de Ambiente da hospedagem
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'Chave da API não configurada no servidor.' });
    }

    // 3. Prompt de sistema (Instruções do Agente de Tecnologia)
    const systemInstruction = `Você é o assistente de Inteligência Artificial do portal Eraldo Pereira Tech.
Sua função é tirar dúvidas de visitantes sobre tecnologia, desenvolvimento de software, banco de dados (SQL/NoSQL), redes, cibersegurança, Linux e infraestrutura.
Responda de forma clara, técnica, cortês e direta. Mantenha as respostas concisas para visualização em widget de chat.`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                system_instruction: {
                    parts: [{ text: systemInstruction }]
                },
                contents: [
                    {
                        parts: [{ text: message }]
                    }
                ]
            })
        });

        const data = await response.json();

        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
            const reply = data.candidates[0].content.parts[0].text;
            return res.status(200).json({ reply });
        } else {
            return res.status(500).json({ error: 'Resposta inválida da API do Gemini.' });
        }
    } catch (err) {
        console.error('Erro ao conectar à API do Gemini:', err);
        return res.status(500).json({ error: 'Erro de comunicação com o servidor de IA.' });
    }
}