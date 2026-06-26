export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '50px 20px', fontFamily: 'var(--font-sans)', color: 'var(--text-color)' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>Privacy Policy</h1>
      
      <p style={{ marginBottom: '20px' }}><strong>Last updated:</strong> June 2026</p>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ marginBottom: '15px' }}>1. Introduction</h2>
        <p>At Smart Note, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information.</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ marginBottom: '15px' }}>2. Data Collection</h2>
        <p>We collect information you provide directly to us when you create an account, including your email address. We use Auth0 as our identity provider to ensure your authentication data is handled securely.</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ marginBottom: '15px' }}>3. Note Security & Encryption</h2>
        <p>Your notes belong to you. We provide a feature to "Lock" specific notes using a custom password. Passwords used to lock notes are securely hashed using bcrypt before being stored in our PostgreSQL database. We cannot recover a locked note if you lose the password.</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ marginBottom: '15px' }}>4. AI Processing</h2>
        <p>If you choose to use the AI features (Summarization, Auto-Tagging), note contents may be sent to the configured LLM provider (such as OpenAI or Google Gemini). You have the option to configure a Local LLM (like Ollama or LMStudio) in your settings to ensure your data never leaves your machine.</p>
      </section>

      <section>
        <h2 style={{ marginBottom: '15px' }}>5. Contact</h2>
        <p>If you have any questions about this Privacy Policy, please contact the developer.</p>
      </section>
    </div>
  );
}
