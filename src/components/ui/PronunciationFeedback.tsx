import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './Card';

interface Phoneme {
  phoneme: string;
  score: number;
  offset: number;
  duration: number;
}

interface PronunciationFeedbackProps {
  accuracy: number;
  fluency: number;
  completeness: number;
  pronunciation: number;
  phonemes: Phoneme[];
}

export const PronunciationFeedback: React.FC<PronunciationFeedbackProps> = ({
  accuracy,
  fluency,
  completeness,
  pronunciation,
  phonemes
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPhonemeColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pronunciation Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold mb-1">
              <span className={getScoreColor(accuracy)}>{Math.round(accuracy)}%</span>
            </div>
            <div className="text-sm text-gray-600">Accuracy</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold mb-1">
              <span className={getScoreColor(fluency)}>{Math.round(fluency)}%</span>
            </div>
            <div className="text-sm text-gray-600">Fluency</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold mb-1">
              <span className={getScoreColor(completeness)}>{Math.round(completeness)}%</span>
            </div>
            <div className="text-sm text-gray-600">Completeness</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold mb-1">
              <span className={getScoreColor(pronunciation)}>{Math.round(pronunciation)}%</span>
            </div>
            <div className="text-sm text-gray-600">Overall</div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Phoneme Analysis</h3>
          <div className="flex flex-wrap gap-2">
            {phonemes.map((phoneme, index) => (
              <div
                key={index}
                className={`px-3 py-1 rounded-full text-sm font-medium ${getPhonemeColor(phoneme.score)}`}
                title={`Score: ${Math.round(phoneme.score)}%`}
              >
                {phoneme.phoneme}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};