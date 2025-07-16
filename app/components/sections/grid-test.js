export default function GridTest() {
  return (
    <section className="py-16">
      <div className="grid-layout-3col">
        {/* Row 1 */}
        <div className="grid-cell"></div>
        <div className="grid-cell">
        <h1 
          className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground text-center transition-none"
        >
          Hello, I'm Natan A Frontend Developer
        </h1>
        </div>
        <div className="grid-cell"></div>
        
        {/* Row 2 */}
        <div className="grid-cell"></div>
        <div className="grid-cell">

        </div>
        <div className="grid-cell"></div>
        
        {/* Row 3 with different content lengths */}
        <div className="grid-cell"></div>
        <div className="grid-cell">
            <p className="text-base text-muted-foreground dark:text-muted-foreground text-center max-w-2xl">
            Experience in advanced web frameworks and server-side Programming. Managing, designing, and building A kick-butt website for clients using code, no-code, and AI.
            </p>
        </div>
        <div className="grid-cell"></div>
      </div>
    </section>
  );
}
