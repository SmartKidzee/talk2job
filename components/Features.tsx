import React from 'react';
import { BotMessageSquare, Mic, BarChart3, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Mic,
    title: 'Realistic Voice Interaction',
    description: 'Practice speaking naturally with an AI that understands and responds like a real interviewer.',
    bgColor: 'bg-cyan-900/20',
    borderColor: 'border-cyan-600/30'
  },
  {
    icon: BotMessageSquare,
    title: 'Dynamic AI Questions',
    description: 'Get unique questions tailored to job roles, powered by advanced AI models (Google Gemini).'
  },
  {
    icon: BarChart3,
    title: 'Instant Feedback & Analysis',
    description: 'Receive immediate, actionable insights on your answers, tone, and clarity after each session.',
    bgColor: 'bg-blue-900/20',
    borderColor: 'border-blue-600/30'
  },
  {
    icon: Sparkles,
    title: 'Confidence Boosting',
    description: 'Build confidence through repeated practice in a safe, AI-guided environment.'
  }
];

export default function Features() {
  return (
    <section className="py-20 md:py-28 px-4 bg-black">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Why Talk2Job?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`p-6 rounded-xl border ${feature.borderColor || 'border-gray-800'} ${feature.bgColor || 'bg-gray-900/30'} 
                         shadow-lg transition-all duration-300 hover:shadow-cyan-500/20 hover:border-cyan-500/50 hover:-translate-y-1 flex flex-col items-center text-center`}
            >
              <div className="p-3 rounded-full bg-gradient-to-br from-cyan-600/20 to-blue-600/20 mb-4 border border-cyan-500/30">
                <feature.icon className="size-7 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-100">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 