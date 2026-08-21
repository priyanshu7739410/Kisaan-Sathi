import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Bot, User } from 'lucide-react';

export const Chat = () => {
  const [messages, setMessages] = useState<{role: string, text: string}[]>([
    { role: 'assistant', text: 'Hello! I am your AI Kisan Sathi. You can ask me about weather, crop manuals, or general farming topics.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput('');
    setLoading(true);

    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: `Based on ICAR manuals, for ${userText}, you should ensure proper drainage and monitor soil pH.` 
      }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 'var(--space-3)' }}>
      <header>
        <h2 style={{ fontSize: '2rem' }}>AI Assistant</h2>
        <p style={{ color: 'var(--color-text-secondary)' }}>Chat with agricultural intelligence.</p>
      </header>

      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {messages.map((msg, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: 'flex', gap: 'var(--space-3)',
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                backgroundColor: msg.role === 'user' ? 'var(--color-primary)' : 'var(--color-success)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
              }}>
                {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div style={{
                padding: 'var(--space-3)', borderRadius: 'var(--border-radius)',
                backgroundColor: msg.role === 'user' ? '#F0EDE5' : 'var(--color-background)',
                border: msg.role === 'assistant' ? '1px solid var(--color-border)' : 'none',
                maxWidth: '80%'
              }}>
                <p>{msg.text}</p>
              </div>
            </motion.div>
          ))}
          {loading && (
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
               <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <Bot size={20} />
               </div>
               <div style={{ padding: 'var(--space-3)', borderRadius: 'var(--border-radius)', backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)' }}>
                 <p>Typing...</p>
               </div>
            </div>
          )}
        </div>
        
        <div style={{ padding: 'var(--space-3)', borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
          <form onSubmit={handleSend} style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <input 
              type="text" 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              placeholder="Ask a farming question..." 
              style={{ flex: 1, borderRadius: 'var(--border-radius-pill)' }}
            />
            <button type="submit" className="btn" disabled={loading} style={{ padding: '0 var(--space-4)' }}>
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
