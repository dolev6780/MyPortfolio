// MobileModal.jsx
export default function MobileModal({ app, APP_COMPONENTS, onOpenUrl }) { // Add onOpenUrl here
  if (!app || !app.component) {
    return null; 
  }

  const AppComponent = APP_COMPONENTS[app.component];
  
  if (!AppComponent) {
    console.error(`Error: Component not found for app '${app.name}'`);
    return null;
  }

  return (
    <div 
      className="w-full max-w-md h-[50vh] max-h-[800px] overflow-hidden shadow-2xl animate-app-open flex flex-col cursor-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <header className="flex-shrink-0 p-2 text-white text-2xl flex items-center justify-center">
        <span className="font-semibold">{app.name}</span>
      </header>
      <main className="flex-grow overflow-y-auto p-4">
        <AppComponent onOpenUrl={onOpenUrl} />
      </main>
    </div>
  );
}