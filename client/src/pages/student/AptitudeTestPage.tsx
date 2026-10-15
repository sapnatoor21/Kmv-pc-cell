import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { CheckCircle2, Clock, AlertTriangle, RotateCcw, Award, Check, X } from 'lucide-react';

interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUESTION_BANK: Question[] = [
  {
    id: 1,
    category: 'Quantitative Aptitude',
    question: 'A train 240 m long passes a pole in 24 seconds. How long will it take to pass a platform 650 m long?',
    options: ['65 seconds', '89 seconds', '100 seconds', '150 seconds'],
    correctAnswer: 1,
    explanation: 'Speed = 240/24 = 10 m/sec. Total distance for platform = 240 + 650 = 890 m. Time = 890/10 = 89 seconds.',
  },
  {
    id: 2,
    category: 'Quantitative Aptitude',
    question: 'If the price of sugar increases by 25%, by what percent must a household decrease its consumption to keep expenditure constant?',
    options: ['15%', '20%', '25%', '33.3%'],
    correctAnswer: 1,
    explanation: 'Reduction in consumption = [R / (100 + R)] * 100% = [25 / 125] * 100% = 20%.',
  },
  {
    id: 3,
    category: 'Logical Reasoning',
    question: 'Look at this series: 7, 10, 8, 11, 9, 12, ... What number should come next?',
    options: ['7', '10', '12', '13'],
    correctAnswer: 1,
    explanation: 'This is an alternating addition and subtraction series: +3, -2, +3, -2, +3, -2. 12 - 2 = 10.',
  },
  {
    id: 4,
    category: 'Logical Reasoning',
    question: 'Statements: All mangoes are golden. No golden things are cheap. Conclusion: I. All mangoes are dear. II. Golden mangoes are not cheap.',
    options: ['Only I follows', 'Only II follows', 'Either I or II follows', 'Both I and II follow'],
    correctAnswer: 3,
    explanation: 'Both conclusions logically derive from the universal premises.',
  },
  {
    id: 5,
    category: 'Verbal Ability',
    question: 'Select the synonym for "EPHEMERAL":',
    options: ['Eternal', 'Transient', 'Monumental', 'Rigid'],
    correctAnswer: 1,
    explanation: 'Ephemeral means lasting for a very short time; transient is a direct synonym.',
  },
  {
    id: 6,
    category: 'Quantitative Aptitude',
    question: 'A can do a piece of work in 12 days and B in 15 days. If they work together for 4 days, what fraction of work is left?',
    options: ['1/5', '2/5', '3/5', '1/3'],
    correctAnswer: 1,
    explanation: "A's 1-day work = 1/12, B's 1-day work = 1/15. Together in 1 day = 9/60 = 3/20. In 4 days = 4*(3/20) = 3/5. Work left = 1 - 3/5 = 2/5.",
  },
  {
    id: 7,
    category: 'Logical Reasoning',
    question: 'Pointing to a photograph, Rohit said, "She is the daughter of my grandfather\'s only son." How is the girl related to Rohit?',
    options: ['Sister', 'Mother', 'Cousin', 'Aunt'],
    correctAnswer: 0,
    explanation: "Grandfather's only son is Rohit's father. The daughter of Rohit's father is his sister.",
  },
  {
    id: 8,
    category: 'Verbal Ability',
    question: 'Choose the correct preposition: "The candidate was disqualified ______ failing the biometric test."',
    options: ['at', 'for', 'with', 'on'],
    correctAnswer: 1,
    explanation: 'The standard idiom is "disqualified for" an infraction or reason.',
  },
  {
    id: 9,
    category: 'Quantitative Aptitude',
    question: 'In how many different ways can the letters of the word "LEADER" be arranged?',
    options: ['72', '144', '360', '720'],
    correctAnswer: 2,
    explanation: 'Word contains 6 letters with E repeated twice: 6! / 2! = 720 / 2 = 360.',
  },
  {
    id: 10,
    category: 'Logical Reasoning',
    question: 'Find the odd one out: 3, 5, 11, 14, 17, 21',
    options: ['14', '17', '21', '3'],
    correctAnswer: 0,
    explanation: '14 is the only even number in the sequence.',
  },
];

export const AptitudeTestPage: React.FC = () => {
  const { user, showToast } = useAuth();
  const [testState, setTestState] = useState<'intro' | 'active' | 'completed'>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes (600s)
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      api.student.getAssessments(user.id).then((res) => setHistory(res));
    }
  }, [user]);

  // Countdown timer
  useEffect(() => {
    let timer: any;
    if (testState === 'active' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (testState === 'active' && timeLeft === 0) {
      handleSubmitTest();
    }
    return () => clearInterval(timer);
  }, [testState, timeLeft]);

  const startTest = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setTimeLeft(600);
    setTestState('active');
  };

  const handleSelectOption = (optIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIndex]: optIndex,
    });
  };

  const handleSubmitTest = async () => {
    let finalScore = 0;
    QUESTION_BANK.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        finalScore++;
      }
    });
    setScore(finalScore);
    setTestState('completed');

    if (user) {
      const percentage = Math.round((finalScore / QUESTION_BANK.length) * 100);
      try {
        await api.student.saveAssessment({
          studentId: user.id,
          testType: 'aptitude',
          title: 'Campus Aptitude & Reasoning Diagnostic',
          score: finalScore,
          totalMarks: QUESTION_BANK.length,
          percentage,
          details: { answered: Object.keys(selectedAnswers).length },
        });
        showToast(`Aptitude test recorded! Score: ${finalScore}/${QUESTION_BANK.length} (${percentage}%)`, 'success');
        const updatedHistory = await api.student.getAssessments(user.id);
        setHistory(updatedHistory);
      } catch (err) {
        console.error('Failed to save assessment', err);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const currentQ = QUESTION_BANK[currentIndex];

  return (
    <div className="space-y-6">
      {/* INTRO SCREEN */}
      {testState === 'intro' && (
        <div className="bg-white rounded-2xl border border-[#DCE8F7] p-8 shadow-xs space-y-6">
          <div className="border-b border-[#DCE8F7] pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0D6EFD]">
              Campus Placement Diagnostic
            </span>
            <h2 className="text-2xl font-bold text-[#102B50] mt-1">
              Quantitative Aptitude & Logical Reasoning Simulation
            </h2>
            <p className="text-xs sm:text-sm text-[#6B85A8] mt-1">
              Modeled after the latest placement evaluation patterns of TCS (NQT), Infosys, and Deloitte.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#F3F7FC] border border-[#DCE8F7]">
              <span className="text-xs text-[#6B85A8]">Total Questions</span>
              <p className="text-xl font-bold text-[#102B50] mt-1">10 Questions</p>
            </div>
            <div className="p-4 rounded-xl bg-[#F3F7FC] border border-[#DCE8F7]">
              <span className="text-xs text-[#6B85A8]">Time Limit</span>
              <p className="text-xl font-bold text-[#102B50] mt-1">10 Minutes</p>
            </div>
            <div className="p-4 rounded-xl bg-[#F3F7FC] border border-[#DCE8F7]">
              <span className="text-xs text-[#6B85A8]">Passing Benchmark</span>
              <p className="text-xl font-bold text-emerald-600 mt-1">70% (7/10)</p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-[#16345C] bg-amber-50/70 p-4 rounded-xl border border-amber-200">
            <p className="font-bold text-amber-800">Guidelines & Evaluation Rules:</p>
            <ul className="list-disc list-inside space-y-1 text-amber-900">
              <li>Each question carries 1 mark. There is no negative marking in this diagnostic.</li>
              <li>You may navigate freely between questions using the bottom buttons or question palette.</li>
              <li>The test auto-submits when the timer reaches 00:00. Results are permanently stored in your student transcript.</li>
            </ul>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <span className="text-xs text-[#6B85A8]">
              Ready to begin? Click below to start the timer.
            </span>
            <button
              onClick={startTest}
              className="px-6 py-3 rounded-xl bg-[#0D6EFD] hover:bg-[#2563EB] text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer"
            >
              Start Aptitude Test Now
            </button>
          </div>

          {/* Past History */}
          {history.length > 0 && (
            <div className="pt-8 border-t border-[#DCE8F7] space-y-3">
              <h4 className="font-bold text-sm text-[#102B50]">Your Past Assessment Scores</h4>
              <div className="divide-y divide-slate-100 border border-[#DCE8F7] rounded-xl overflow-hidden">
                {history.map((h) => (
                  <div key={h.id} className="p-3 bg-white flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-[#16345C]">{h.title}</p>
                      <p className="text-[11px] text-[#6B85A8]">
                        Date: {new Date(h.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-[#0D6EFD]">{h.score} / {h.totalMarks}</span>
                      <span className="text-[11px] text-[#6B85A8] block">({h.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ACTIVE TEST SCREEN */}
      {testState === 'active' && (
        <div className="bg-white rounded-2xl border border-[#DCE8F7] p-6 sm:p-8 shadow-xs space-y-6">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-[#DCE8F7]">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md bg-[#0D6EFD]/10 text-[#0D6EFD] font-bold text-xs">
                Question {currentIndex + 1} of {QUESTION_BANK.length}
              </span>
              <span className="text-xs font-semibold text-[#6B85A8]">
                Category: {currentQ.category}
              </span>
            </div>

            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold text-xs ${
              timeLeft < 120 ? 'bg-rose-100 text-rose-700 animate-pulse' : 'bg-[#102B50] text-white'
            }`}>
              <Clock className="w-4 h-4" />
              <span>Time Left: {formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* Question Display */}
          <div className="space-y-4 py-2">
            <h3 className="text-base sm:text-lg font-bold text-[#102B50] leading-relaxed">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-2.5 pt-2">
              {currentQ.options.map((option, optIdx) => {
                const isSelected = selectedAnswers[currentIndex] === optIdx;
                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-[#0D6EFD] bg-[#0D6EFD]/10 text-[#0D6EFD] font-semibold ring-1 ring-[#0D6EFD]'
                        : 'border-[#DCE8F7] bg-[#F3F7FC]/70 hover:bg-[#F3F7FC] text-[#16345C]'
                    }`}
                  >
                    <span>{option}</span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? 'border-[#0D6EFD] bg-[#0D6EFD] text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Navigation Palette */}
          <div className="pt-4 border-t border-[#DCE8F7] flex flex-wrap gap-2">
            {QUESTION_BANK.map((_, idx) => {
              const isAnswered = selectedAnswers[idx] !== undefined;
              const isCurrent = currentIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-[#0D6EFD] text-white shadow-xs'
                      : isAnswered
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-[#F3F7FC] text-[#6B85A8] border border-[#DCE8F7]'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-[#DCE8F7] flex items-center justify-between">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(currentIndex - 1)}
              className="px-4 py-2 rounded-lg border border-[#DCE8F7] text-xs font-semibold text-[#16345C] disabled:opacity-40"
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              {currentIndex < QUESTION_BANK.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex(currentIndex + 1)}
                  className="px-5 py-2 rounded-lg bg-[#102B50] hover:bg-[#16345C] text-white text-xs font-semibold"
                >
                  Next Question
                </button>
              ) : (
                <button
                  onClick={handleSubmitTest}
                  className="px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs"
                >
                  Submit Assessment
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* COMPLETED RESULTS SCREEN */}
      {testState === 'completed' && (
        <div className="bg-white rounded-2xl border border-[#DCE8F7] p-8 shadow-xs space-y-6">
          <div className="text-center max-w-md mx-auto space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Award className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-[#102B50]">Assessment Completed!</h2>
            <p className="text-xs text-[#6B85A8]">
              Your results have been synchronized to your student academic record.
            </p>

            <div className="p-4 bg-[#F3F7FC] rounded-2xl border border-[#DCE8F7] flex items-center justify-around">
              <div>
                <span className="text-[11px] text-[#6B85A8] block">Raw Score</span>
                <span className="text-2xl font-extrabold text-[#102B50]">
                  {score} / {QUESTION_BANK.length}
                </span>
              </div>
              <div className="h-10 w-px bg-[#DCE8F7]" />
              <div>
                <span className="text-[11px] text-[#6B85A8] block">Percentage</span>
                <span className="text-2xl font-extrabold text-[#0D6EFD]">
                  {Math.round((score / QUESTION_BANK.length) * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Question Explanations & Review */}
          <div className="space-y-4 pt-6 border-t border-[#DCE8F7]">
            <h3 className="font-bold text-base text-[#102B50]">Question-by-Question Solution Review</h3>
            <div className="space-y-4">
              {QUESTION_BANK.map((q, idx) => {
                const userAns = selectedAnswers[idx];
                const isCorrect = userAns === q.correctAnswer;
                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border text-xs space-y-2 ${
                      isCorrect
                        ? 'border-emerald-200 bg-emerald-50/40'
                        : 'border-rose-200 bg-rose-50/40'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <p className="font-bold text-[#16345C] text-sm">
                        Q{idx + 1}. {q.question}
                      </p>
                      <span
                        className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                          isCorrect ? 'bg-emerald-200 text-emerald-800' : 'bg-rose-200 text-rose-800'
                        }`}
                      >
                        {isCorrect ? 'Correct' : userAns === undefined ? 'Unanswered' : 'Incorrect'}
                      </span>
                    </div>

                    <div className="space-y-1 text-slate-700">
                      <p>
                        <span className="font-semibold">Your Answer:</span>{' '}
                        {userAns !== undefined ? q.options[userAns] : 'None'}
                      </p>
                      <p>
                        <span className="font-semibold text-emerald-700">Correct Answer:</span>{' '}
                        {q.options[q.correctAnswer]}
                      </p>
                    </div>

                    <p className="text-[11px] text-[#6B85A8] bg-white p-2.5 rounded-lg border border-slate-200/60 leading-relaxed">
                      <span className="font-semibold text-[#16345C]">Explanation: </span>
                      {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-center">
            <button
              onClick={() => setTestState('intro')}
              className="px-6 py-2.5 rounded-xl bg-[#0D6EFD] text-white text-xs font-semibold flex items-center gap-2 hover:bg-[#2563EB]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Diagnostic Assessment</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
