export default function GuidePage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '50px 20px', fontFamily: 'var(--font-sans)', color: 'var(--text-color)' }}>
      <h1 className="handwriting" style={{ fontSize: '3rem', marginBottom: '30px', color: 'var(--accent-color)' }}>App User Guide</h1>

      <div style={{ marginBottom: '40px', padding: '20px', backgroundColor: 'var(--sidebar-bg)', borderRadius: '12px' }}>
        <h2>1. Getting Started</h2>
        <p style={{ marginTop: '10px' }}>
          When you first log in, you will see the main dashboard. To your left is the Navigation Sidebar where you can filter notes by Folders, Tags, or Date. In the middle is your Recent Notes list and the Note Editor. On the right, the Calendar.
        </p>
      </div>

      <div style={{ marginBottom: '40px', padding: '20px', backgroundColor: 'var(--sidebar-bg)', borderRadius: '12px' }}>
        <h2>2. Creating a Note</h2>
        <p style={{ marginTop: '10px' }}>
          Simply click the <strong>+ New Note</strong> button in the top right. A new blank canvas will appear in the Editor column. Type your title, and write your thoughts. They are automatically saved.
        </p>
      </div>

      <div style={{ marginBottom: '40px', padding: '20px', backgroundColor: 'var(--sidebar-bg)', borderRadius: '12px' }}>
        <h2>3. Securing Important Notes</h2>
        <p style={{ marginTop: '10px' }}>
          If you have sensitive information, click the <strong>🔒 Lock Note</strong> button in the editor toolbar. You will be prompted to enter a password. The note content will be hidden from the list view until unlocked.
        </p>
      </div>

      <div style={{ marginBottom: '40px', padding: '20px', backgroundColor: 'var(--sidebar-bg)', borderRadius: '12px' }}>
        <h2>4. Using Smart AI Features</h2>
        <p style={{ marginTop: '10px' }}>
          Click the <strong>🤖 AI Assist</strong> button in the editor. Depending on your configuration, this will connect to your local Ollama instance or the Gemini API to summarize your text or suggest tags.
        </p>
        <p style={{ marginTop: '10px' }}>
          Use the top Search bar to perform Semantic Searches — meaning you can search for the <em>meaning</em> of a note, not just exact keywords!
        </p>
      </div>

      <div style={{ marginBottom: '40px', padding: '20px', backgroundColor: 'var(--sidebar-bg)', borderRadius: '12px' }}>
        <h2>5. Customizing Themes</h2>
        <p style={{ marginTop: '10px' }}>
          Look at the bottom of the left sidebar. Click any of the colored circles to instantly switch your app theme between Light, Dark, Blue, Pink, or Slate. Find your Zen.
        </p>
      </div>

    </div>
  );
}
