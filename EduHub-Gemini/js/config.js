// Configuração da API Gemini
const GEMINI_CONFIG = {
    API_KEY: 'AIzaSyALhJ4jZWVs5cJVhZFlCp7qAbglRYYd5f4',
    API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent',
    MODEL: 'gemini-1.5-flash-latest'
};

// Função para chamar a API Gemini
async function callGeminiAPI(prompt) {
    try {
        const response = await fetch(`${GEMINI_CONFIG.API_URL}?key=${GEMINI_CONFIG.API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 8192,
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Erro da API:', response.status, errorData);
            throw new Error(`Erro na API: ${response.status} - ${errorData}`);
        }

        const data = await response.json();
        
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            throw new Error('Resposta inválida da API');
        }
        
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Erro ao chamar API Gemini:', error);
        throw error;
    }
}

// Exportar para uso global
window.GEMINI_CONFIG = GEMINI_CONFIG;
window.callGeminiAPI = callGeminiAPI;

