import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Video, Mic, CheckCircle2, Award, Sparkles, MessageSquare, ChevronRight, RotateCcw } from 'lucide-react';

interface MockQuestion {
  id: number;
  type: 'technical' | 'hr';
  company: string;
  role: string;
  question: string;
  contextTips: string;
  idealAnswerPoints: string[];
}

const MOCK_QUESTIONS: MockQuestion[] = [
  {
    id: 1,
    type: 'technical',
    company: 'Tata Consultancy Services',
    role: 'Assistant System Engineer',
    question: 'Explain the difference between SQL and NoSQL databases. When would you choose MongoDB over MySQL?',
    contextTips: 'Highlight schema rigidity, ACID transactions vs CAP theorem, horizontal scalability, and nested documents.',
    idealAnswerPoints: [
      'SQL databases (MySQL, PostgreSQL) are relational, structured, and enforce ACID transactions.',
      'NoSQL databases (MongoDB) offer flexible JSON-like document schemas and scale horizontally with sharding.',
      'Choose MongoDB when handling unstructured or rapidly evolving schemas, high read/write throughput, and hierarchical records.',
    ],
  },
  {
    id: 2,
    type: 'hr',
    company: 'Deloitte India',
    role: 'Associate Analyst',
    question: 'Tell me about a challenging situation in a team project where team members had conflicting opinions. How did you resolve it?',
    contextTips: 'Apply the STAR technique: Situation, Task, Action taken, Result achieved. Emphasize active listening and consensus.',
    idealAnswerPoints: [
      'Clearly establish the project deadline and core objective.',
      'Arranged an objective meeting comparing the technical tradeoffs with measurable criteria.',
      'Assigned modular tasks based on individual member strengths.',
      'Delivered the final deliverable ahead of schedule with positive team alignment.',
    ],
  },
  {
    id: 3,
    type: 'technical',
    company: 'Infosys Limited',
    role: 'Specialist Programmer',
    question: 'How does indexing work in a relational database? What are the tradeoffs of adding too many indexes on a table?',
    contextTips: 'Mention B-Tree / B+Tree data structures, O(log N) search speed vs write amplification on INSERT/UPDATE/DELETE.',
    idealAnswerPoints: [
      'Indexes create auxillary B-Tree structures pointing to physical disk addresses.',
      'Improves SELECT queries from O(N) full table scan down to O(log N).',
      'Tradeoff: Extra storage overhead and slower write operations (INSERT/UPDATE/DELETE) due to index re-balancing.',
    ],
  },
  {
    id: 4,
    type: 'hr',
    company: 'Wipro Technologies',
    role: 'Project Engineer',
    question: 'Why do you want to join our organization, and where do you see yourself in the next 3 to 5 years?',
    contextTips: 'Connect the company’s recent technological achievements with your personal career trajectory and continuous learning.',
    idealAnswerPoints: [
      'Referenced corporate cloud innovation and campus hiring heritage.',
      'Desire to master modern enterprise architectures and earn technical credentials.',
      'Goal to advance into a Senior Software Engineer or Technical Lead managing distributed teams.',
    ],
  },
];

export const MockInterviewPage: React.FC = () => {
  const { user, showToast } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'technical' | 'hr'>('all');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [candidateResponse, setCandidateResponse] = useState('');
  const [feedback, setFeedback] = useState<{
    score: number;
    clarityRating: string;
    strengths: string[];
    improvements: string[];
  } | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const filteredQuestions = MOCK_QUESTIONS.filter(
    (q) => selectedCategory === 'all' || q.type === selectedCategory
  );

  const activeQ = filteredQuestions[currentQuestionIndex] || filteredQuestions[0];

  const handleEvaluateAnswer = () => {
    if (!candidateResponse.trim() || candidateResponse.trim().length < 20) {
      showToast('Please provide a detailed response (at least 20 words) for evaluation.', 'error');
      return;
    }

    setIsEvaluating(true);
    setTimeout(() => {
      // Analytical heuristic score
      const wordCount = candidateResponse.trim().split(/\s+/).length;
      let score = 7;
      if (wordCount > 60) score = 9;
      else if (wordCount > 35) score = 8;

      setFeedback({
        score,
        clarityRating: score >= 8 ? 'Exceptional Clarity & Structure' : 'Good Foundation',
        strengths: [
          'Directly addressed the core interview prompt without deviating.',
          'Demonstrated contextual vocabulary relevant to the corporate role.',
          'Well articulated problem solving mindset.',
        ],
        improvements: [
          'Incorporate specific quantitative metrics (e.g. % performance increase, team size, response time).',
          'Practice concise STAR framing (Situation, Task, Action, Result) in under 90 seconds.',
        ],
      });
      setIsEvaluating(false);
      showToast('Evaluation complete! Review your scorecard below.', 'success');
    }, 800);
  };

  const handleNextQuestion = () => {
    setCandidateResponse('');
    setFeedback(null);
    setCurrentQuestionIndex((prev) => (prev + 1) % filteredQuestions.length);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#DCE8F7] pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0D6EFD]">
          Simulated Interview Practice
        </span>
        <h2 className="text-2xl font-bold text-[#102B50] mt-1">
          Technical & HR Mock Interview Simulator
        </h2>
        <p className="text-xs sm:text-sm text-[#6B85A8] mt-1">
          Practice questions from campus recruiters with instant structured feedback, STAR rubric, and ideal answer keys.
        </p>
      </div>

      {/* Category selector */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            setSelectedCategory('all');
            setCurrentQuestionIndex(0);
            setFeedback(null);
          }}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold ${
            selectedCategory === 'all'
              ? 'bg-[#0D6EFD] text-white shadow-2xs'
              : 'bg-white border border-[#DCE8F7] text-[#16345C]'
          }`}
        >
          All Categories
        </button>
        <button
          onClick={() => {
            setSelectedCategory('technical');
            setCurrentQuestionIndex(0);
            setFeedback(null);
          }}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold ${
            selectedCategory === 'technical'
              ? 'bg-[#0D6EFD] text-white shadow-2xs'
              : 'bg-white border border-[#DCE8F7] text-[#16345C]'
          }`}
        >
          Technical (Core CS & Software)
        </button>
        <button
          onClick={() => {
            setSelectedCategory('hr');
            setCurrentQuestionIndex(0);
            setFeedback(null);
          }}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold ${
            selectedCategory === 'hr'
              ? 'bg-[#0D6EFD] text-white shadow-2xs'
              : 'bg-white border border-[#DCE8F7] text-[#16345C]'
          }`}
        >
          HR & Behavioral (STAR Model)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interview Panel Prompt & Candidate Response */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#DCE8F7] p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#DCE8F7]">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-[#102B50] text-white text-[10px] font-bold uppercase">
                {activeQ.company}
              </span>
              <span className="text-xs text-[#6B85A8]">Role: {activeQ.role}</span>
            </div>
            <span className="text-xs font-semibold text-[#0D6EFD] uppercase tracking-wide">
              {activeQ.type.toUpperCase()} ROUND
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#F3F7FC] border border-[#DCE8F7] space-y-2">
            <span className="text-[10px] font-bold uppercase text-[#0D6EFD] flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5" /> Interviewer Prompt
            </span>
            <h3 className="text-base font-bold text-[#102B50] leading-snug">
              "{activeQ.question}"
            </h3>
            <p className="text-[11px] text-[#6B85A8] pt-1">
              <span className="font-semibold text-[#16345C]">Interviewer Tip:</span> {activeQ.contextTips}
            </p>
          </div>

          {/* Candidate response textarea */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#16345C]">
                Your Proposed Answer (Type your response)
              </label>
              <span className="text-[11px] text-[#6B85A8]">
                {candidateResponse.trim().split(/\s+/).filter(Boolean).length} words
              </span>
            </div>
            <textarea
              rows={7}
              value={candidateResponse}
              onChange={(e) => setCandidateResponse(e.target.value)}
              placeholder="Structure your answer clearly. For technical questions, mention core mechanisms and tradeoffs. For HR questions, use Situation, Task, Action, Result..."
              className="w-full p-4 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs sm:text-sm text-[#16345C] focus:outline-hidden focus:border-[#0D6EFD]"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleNextQuestion}
              className="px-4 py-2 rounded-lg border border-[#DCE8F7] text-xs font-semibold text-[#16345C] hover:bg-slate-50 cursor-pointer"
            >
              Skip / Next Question
            </button>
            <button
              onClick={handleEvaluateAnswer}
              disabled={isEvaluating}
              className="px-6 py-2.5 rounded-xl bg-[#0D6EFD] hover:bg-[#2563EB] text-white text-xs font-semibold flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isEvaluating ? 'Evaluating...' : 'Evaluate My Answer'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Scorecard & Ideal Key */}
        <div className="lg:col-span-5 space-y-6">
          {feedback ? (
            <div className="bg-white rounded-2xl border border-emerald-200 p-6 shadow-xs space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Interview Scorecard
                </span>
                <span className="text-2xl font-black text-emerald-600">{feedback.score} / 10</span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase block">Clarity & Depth</span>
                <p className="text-xs font-bold text-[#102B50]">{feedback.clarityRating}</p>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-emerald-800 uppercase block">Key Strengths</span>
                <ul className="text-xs text-slate-700 space-y-1">
                  {feedback.strengths.map((str, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold text-amber-800 uppercase block">
                  Actionable Tips
                </span>
                <ul className="text-xs text-slate-700 space-y-1">
                  {feedback.improvements.map((imp, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#DCE8F7] p-6 text-center space-y-2">
              <Sparkles className="w-8 h-8 text-[#0D6EFD] mx-auto" />
              <h4 className="font-bold text-sm text-[#16345C]">Structured AI Evaluation</h4>
              <p className="text-xs text-[#6B85A8]">
                Type your response on the left and click "Evaluate My Answer" to review your score, strengths, and recommendations.
              </p>
            </div>
          )}

          {/* Model Ideal Points */}
          <div className="bg-white rounded-2xl border border-[#DCE8F7] p-6 shadow-xs space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#102B50]">
              Interviewer Benchmark Key Points
            </h4>
            <div className="space-y-2 text-xs text-slate-700">
              {activeQ.idealAnswerPoints.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-[#F3F7FC]">
                  <span className="w-4 h-4 rounded-full bg-[#0D6EFD] text-white flex items-center justify-center font-bold text-[9px] flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed">{pt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
