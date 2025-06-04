// server.ts
import { serve } from 'bun';

const port = 17102;

serve({
  port,
  async fetch(req) {
    const url = new URL(req.url);

    if (req.method === 'GET' && url.pathname === '/') {
      console.log('Received GET request to /');
      return new Response('Success', { status: 200 });
    }

    if (req.method === 'POST' && url.pathname === '/ollama/chat') {
      console.log('Received POST request to /ollama/chat');
      try {
        const body = await req.json();

        const response = await fetch('http://host.docker.internal:11434/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        const responseData = await response.json();
        return new Response(JSON.stringify(responseData), {
          status: response.status,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      } catch (error) {
        console.error('Error proxying request:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    return new Response('Not Found', { status: 404 });
  },
});

console.log(`Proxy server running on http://localhost:${port}`);
