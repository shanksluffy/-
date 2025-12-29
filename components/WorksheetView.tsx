
import React, { useState } from 'react';
import { MathProblem } from '../types';
import Button from './Button';

interface WorksheetViewProps {
  problems: MathProblem[];
  onBack: () => void;
}

const WorksheetView: React.FC<WorksheetViewProps> = ({ problems, onBack }) => {
  const [showAnswers, setShowAnswers] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center print:hidden">
        <h2 className="text-xl font-black text-slate-800">口算练习卷预览</h2>
        <div className="flex gap-4">
          <button 
            onClick={() => setShowAnswers(!showAnswers)} 
            className="text-indigo-600 text-xs font-bold hover:underline"
          >
            {showAnswers ? '隐藏答案' : '显示答案'}
          </button>
          <button onClick={onBack} className="text-slate-400 text-xs font-bold hover:text-slate-600">
            返回修改
          </button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm print:shadow-none print:border-none print:p-0">
        <header className="text-center mb-10 border-b pb-6 border-slate-100">
          <h1 className="text-2xl font-black text-slate-800 mb-2">小学数学口算专项练习</h1>
          <div className="flex justify-center gap-10 text-sm text-slate-400 font-medium">
            <span>姓名：__________</span>
            <span>用时：__________</span>
            <span>得分：__________</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {problems.map((p, idx) => (
            <div key={p.id} className="flex items-center text-lg font-bold text-slate-700 border-b-2 border-slate-50 pb-2 whitespace-nowrap">
              <span className="flex-shrink-0 w-8 text-sm text-slate-300 font-medium">{idx + 1}.</span>
              <span className="flex-shrink-0">{p.expression} = </span>
              <span className={`flex-grow border-b-2 border-slate-200 ml-2 min-h-[1.5rem] flex items-end justify-center ${showAnswers ? 'text-indigo-400 font-black' : 'text-transparent'}`}>
                {p.correctAnswer}
              </span>
            </div>
          ))}
        </div>

        {showAnswers && (
          <div className="mt-16 pt-8 border-t-2 border-dashed border-slate-100 page-break-before">
            <h3 className="text-sm font-black text-slate-400 mb-6 uppercase tracking-widest">标准答案参考</h3>
            <div className="grid grid-cols-5 gap-6 text-xs font-bold text-slate-500">
              {problems.map((p, idx) => (
                <div key={p.id} className="flex gap-2 whitespace-nowrap">
                  <span className="text-slate-300">{idx + 1}.</span>
                  <span>{p.correctAnswer}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 pt-4 print:hidden">
        <Button onClick={handlePrint} size="lg" className="font-black">立即导出并打印 (PDF)</Button>
        <Button variant="outline" onClick={onBack}>返回重新生成</Button>
      </div>

      <style>{`
        @media print {
          body { background: white !important; padding: 0 !important; }
          .print\\:hidden { display: none !important; }
          .page-break-before { page-break-before: always; }
          main { shadow: none !important; border: none !important; margin: 0 !important; width: 100% !important; max-width: none !important; }
        }
      `}</style>
    </div>
  );
};

export default WorksheetView;
