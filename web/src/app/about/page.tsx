export default function AboutPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '50px 20px', fontFamily: 'var(--font-sans)', color: 'var(--text-color)' }}>
      <h1 className="handwriting" style={{ fontSize: '3rem', color: 'var(--accent-color)', marginBottom: '20px' }}>About Smart Note</h1>
      <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
        Smart Note was born from the desire to find focus in a noisy digital world. 
        We believe that note-taking should be a fluid, zen experience that doesn't distract you with complex menus or cluttered interfaces.
      </p>
      <h2 style={{ marginTop: '40px', marginBottom: '20px' }}>Our Philosophy</h2>
      <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
        Minimalism is not about removing features; it's about removing friction. 
        Smart Note combines the tranquility of an empty page with the cutting-edge power of AI to help you summarize, tag, and search your thoughts by their actual meaning, not just by keywords.
      </p>
      <h2 style={{ marginTop: '40px', marginBottom: '20px' }}>Technology</h2>
      <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
        Built by a Senior Full Stack Architect, this application leverages a robust infrastructure. 
        The backend is powered by NestJS and Prisma, communicating with a Neon PostgreSQL database. 
        The frontend utilizes Next.js and TanStack Query, offering blazing-fast performance hosted on Vercel.
      </p>
    </div>
  );
}
