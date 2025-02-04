'use client';

import { useState } from 'react';
import { useDeepgram } from '@/lib/contexts/DeepgramContext';
import { addDocument } from '@/lib/firebase/firebaseUtils';
import { motion } from 'framer-motion';

export default function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const { connectToDeepgram, disconnectFromDeepgram, realtimeTranscript } = useDeepgram();

  const handleStartRecording = async () => {
    await connectToDeepgram();
    setIsRecording(true);
  };

  const handleStopRecording = async () => {
    disconnectFromDeepgram();
    setIsRecording(false);
    
    if (realtimeTranscript.trim()) {
      await addDocument('notes', {
        text: realtimeTranscript.trim(),
        timestamp: new Date().toISOString(),
      });
      window.location.reload(); // Refresh to show new note
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <button
        onClick={isRecording ? handleStopRecording : handleStartRecording}
        className={`w-full py-4 px-6 rounded-lg flex items-center justify-center gap-3 text-white font-semibold transition-colors ${
          isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isRecording ? (
          <>
            <span className="w-3 h-3 bg-white rounded-full animate-pulse" />
            Stop Recording
          </>
        ) : (
          <>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
            Start Recording
          </>
        )}
      </button>

      {isRecording && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-center mb-4">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-12 h-12 bg-blue-500 rounded-full opacity-75"
            />
          </div>
          <p className="text-gray-700 text-lg whitespace-pre-wrap">
            {realtimeTranscript || "Listening..."}
          </p>
        </div>
      )}
    </div>
  );
}