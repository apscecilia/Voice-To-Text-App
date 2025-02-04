import VoiceRecorder from "@/components/VoiceRecorder";
import NotesList from "@/components/NotesList";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { DeepgramContextProvider } from "@/lib/contexts/DeepgramContext";

export default function Home() {
  return (
    <AuthProvider>
      <DeepgramContextProvider>
        <main className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
          <header className="w-full max-w-4xl mb-8">
            <div className="flex items-center justify-center gap-4">
              <svg
                className="w-12 h-12 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h1 className="text-4xl font-bold text-center">Doctor Notes</h1>
            </div>
          </header>

          <div className="w-full max-w-4xl space-y-8">
            <VoiceRecorder />
            <NotesList />
          </div>

          <footer className="w-full max-w-4xl mt-12 pt-8 border-t border-gray-200 text-center text-gray-500">
            <p>© {new Date().getFullYear()} Doctor Notes. All rights reserved.</p>
          </footer>
        </main>
      </DeepgramContextProvider>
    </AuthProvider>
  );
}
