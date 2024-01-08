
const apiKey = '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'; // Replace with your actual API key
const apiUrl = 'https://api.openai.com/v1/engines/davinci/completions'; // Example API endpoint, adjust as needed

const prompt = 'Translate the following English text to French:';

const requestOptions = {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        prompt,
        max_tokens: 50, // Adjust this as needed
    }),
};

fetch(apiUrl, requestOptions)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log('Generated text:', data.choices[0].text);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
