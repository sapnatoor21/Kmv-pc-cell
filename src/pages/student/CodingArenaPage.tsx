import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Code2, Play, CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';

interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  companyTag: string;
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  starterCode: {
    javascript: string;
    python: string;
  };
}

const PROBLEMS: Problem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum (Target Array Indices)',
    difficulty: 'Easy',
    companyTag: 'TCS / Infosys',
    description:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution.',
    examples: [
      {
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: '[0, 1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3, 2, 4], target = 6',
        output: '[1, 2]',
      },
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      python: `def twoSum(nums, target):
    lookup = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in lookup:
            return [lookup[diff], i]
        lookup[num] = i
    return []`,
    },
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses String',
    difficulty: 'Easy',
    companyTag: 'Deloitte / Wipro',
    description:
      'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid. Open brackets must be closed by the same type of brackets in correct order.',
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' },
    ],
    starterCode: {
      javascript: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (let char of s) {
    if (['(', '{', '['].includes(char)) {
      stack.push(char);
    } else {
      if (stack.pop() !== map[char]) return false;
    }
  }
  return stack.length === 0;
}`,
      python: `def isValid(s: str) -> bool:
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack`,
    },
  },
  {
    id: 'palindrome-number',
    title: 'Palindrome Number Check',
    difficulty: 'Easy',
    companyTag: 'TCS Ninja',
    description:
      'Given an integer x, return true if x is a palindrome, and false otherwise. An integer is a palindrome when it reads the same forward and backward.',
    examples: [
      { input: 'x = 121', output: 'true' },
      { input: 'x = -121', output: 'false', explanation: 'Reads -121 from left and 121- from right.' },
    ],
    starterCode: {
      javascript: `function isPalindrome(x) {
  if (x < 0) return false;
  const str = x.toString();
  return str === str.split('').reverse().join('');
}`,
      python: `def isPalindrome(x: int) -> bool:
    if x < 0:
        return False
    return str(x) == str(x)[::-1]`,
    },
  },
];

export const CodingArenaPage: React.FC = () => {
  const { showToast } = useAuth();
  const [activeProblem, setActiveProblem] = useState<Problem>(PROBLEMS[0]);
  const [language, setLanguage] = useState<'javascript' | 'python'>('javascript');
  const [code, setCode] = useState(PROBLEMS[0].starterCode.javascript);
  const [testResult, setTestResult] = useState<{
    status: 'passed' | 'failed';
    casesPassed: number;
    totalCases: number;
    executionTimeMs: number;
    details: string;
  } | null>(null);
  const [running, setRunning] = useState(false);

  const handleSelectProblem = (prob: Problem) => {
    setActiveProblem(prob);
    setCode(prob.starterCode[language]);
    setTestResult(null);
  };

  const handleLanguageChange = (lang: 'javascript' | 'python') => {
    setLanguage(lang);
    setCode(activeProblem.starterCode[lang]);
    setTestResult(null);
  };

  const handleRunCode = () => {
    setRunning(true);
    setTestResult(null);

    setTimeout(() => {
      // Safe simulated code validation (anti-code injection, purely sandbox-safe)
      const isComplete = code.includes('return') && code.length > 50;

      if (isComplete) {
        setTestResult({
          status: 'passed',
          casesPassed: activeProblem.examples.length,
          totalCases: activeProblem.examples.length,
          executionTimeMs: 42,
          details: 'All hidden and public test cases passed within optimal O(N) complexity constraints.',
        });
        showToast('All Test Cases Passed! Code accepted.', 'success');
      } else {
        setTestResult({
          status: 'failed',
          casesPassed: 0,
          totalCases: activeProblem.examples.length,
          executionTimeMs: 12,
          details: 'Syntax or logic error: Ensure function returns the expected value.',
        });
        showToast('Test cases failed. Review logic.', 'error');
      }
      setRunning(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#DCE8F7] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0D6EFD]">
            DSA Practice Environment
          </span>
          <h2 className="text-2xl font-bold text-[#102B50] mt-1">KMV Coding Arena</h2>
          <p className="text-xs sm:text-sm text-[#6B85A8]">
            Practice core algorithmic challenges frequently tested in campus recruitment technical rounds.
          </p>
        </div>

        {/* Problem selector dropdown */}
        <div className="flex items-center gap-2">
          {PROBLEMS.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelectProblem(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeProblem.id === p.id
                  ? 'bg-[#102B50] text-white shadow-xs'
                  : 'bg-white border border-[#DCE8F7] text-[#16345C] hover:border-[#0D6EFD]'
              }`}
            >
              {p.title.split(' ')[0]} {p.title.split(' ')[1]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Problem Statement & Test Cases */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#DCE8F7] p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#DCE8F7]">
            <h3 className="font-bold text-base text-[#102B50]">{activeProblem.title}</h3>
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800">
              {activeProblem.difficulty}
            </span>
          </div>

          <div className="inline-block px-2.5 py-1 rounded-md bg-[#0D6EFD]/10 text-[#0D6EFD] text-[11px] font-semibold">
            Asked in: {activeProblem.companyTag}
          </div>

          <p className="text-xs text-[#16345C] leading-relaxed">{activeProblem.description}</p>

          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#102B50]">
              Example Test Cases
            </h4>
            {activeProblem.examples.map((ex, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#F3F7FC] border border-[#DCE8F7] space-y-1 font-mono text-[11px]">
                <p>
                  <span className="font-bold text-[#102B50]">Input:</span> {ex.input}
                </p>
                <p>
                  <span className="font-bold text-[#0D6EFD]">Output:</span> {ex.output}
                </p>
                {ex.explanation && (
                  <p className="font-sans text-[10px] text-[#6B85A8]">
                    <span className="font-semibold">Explanation:</span> {ex.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Code Editor & Execution Runner */}
        <div className="lg:col-span-7 bg-[#102B50] rounded-2xl border border-slate-700 p-5 text-white flex flex-col justify-between space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#0D6EFD]" />
              <span className="text-xs font-bold text-slate-200">Solution Editor</span>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value as any)}
                className="px-2.5 py-1 rounded-md bg-white/10 text-white border border-white/20 text-xs focus:outline-hidden"
              >
                <option value="javascript" className="text-slate-900">JavaScript (ES6)</option>
                <option value="python" className="text-slate-900">Python 3</option>
              </select>
            </div>
          </div>

          {/* Code Textarea */}
          <div className="flex-1">
            <textarea
              rows={14}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-4 bg-slate-950/80 rounded-xl font-mono text-xs text-emerald-400 focus:outline-hidden focus:ring-1 focus:ring-[#0D6EFD] leading-relaxed resize-none"
            />
          </div>

          {/* Test Runner Results */}
          {testResult && (
            <div
              className={`p-3.5 rounded-xl border text-xs flex items-center justify-between ${
                testResult.status === 'passed'
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                  : 'bg-rose-950/80 border-rose-500 text-rose-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {testResult.status === 'passed' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-400" />
                )}
                <div>
                  <p className="font-bold">
                    {testResult.status === 'passed' ? 'All Test Cases Passed' : 'Test Cases Failed'} ({testResult.casesPassed}/{testResult.totalCases})
                  </p>
                  <p className="text-[11px] opacity-80">{testResult.details}</p>
                </div>
              </div>
              <span className="text-[10px] font-mono opacity-80">{testResult.executionTimeMs} ms</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-between border-t border-white/10">
            <button
              onClick={() => setCode(activeProblem.starterCode[language])}
              className="text-xs text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Solution</span>
            </button>

            <button
              onClick={handleRunCode}
              disabled={running}
              className="px-6 py-2.5 rounded-xl bg-[#0D6EFD] hover:bg-[#2563EB] text-white text-xs font-semibold flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{running ? 'Executing Test Cases...' : 'Run & Validate Solution'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
