import { SpeechConfig, AudioConfig, SpeechRecognizer } from 'npm:microsoft-cognitiveservices-speech-sdk';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

interface PronunciationAssessment {
  accuracy: number;
  fluency: number;
  completeness: number;
  pronunciation: number;
  phonemes: {
    phoneme: string;
    score: number;
    offset: number;
    duration: number;
  }[];
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { audioData, text, accent } = await req.json();

    // Configure Azure Speech Service
    const speechConfig = SpeechConfig.fromSubscription(
      Deno.env.get('AZURE_SPEECH_KEY') || '',
      Deno.env.get('AZURE_SPEECH_REGION') || ''
    );

    // Set recognition language based on accent
    speechConfig.speechRecognitionLanguage = accent === 'british' ? 'en-GB' : 'en-US';

    // Create audio config from the audio data
    const audioConfig = AudioConfig.fromWavFileInput(audioData);

    // Create recognizer
    const recognizer = new SpeechRecognizer(speechConfig, audioConfig);

    // Enable pronunciation assessment
    const pronunciationAssessment = {
      referenceText: text,
      gradingSystem: 'HundredMark',
      granularity: 'Phoneme',
      enableMiscue: true
    };

    // Perform pronunciation assessment
    const result = await new Promise((resolve) => {
      recognizer.recognizeOnceAsync((result) => {
        resolve(result);
      });
    });

    // Process and format the results
    const assessment: PronunciationAssessment = {
      accuracy: result.pronunciationAssessment?.accuracyScore || 0,
      fluency: result.pronunciationAssessment?.fluencyScore || 0,
      completeness: result.pronunciationAssessment?.completenessScore || 0,
      pronunciation: result.pronunciationAssessment?.pronunciationScore || 0,
      phonemes: result.pronunciationAssessment?.phonemes.map((p) => ({
        phoneme: p.phoneme,
        score: p.accuracyScore,
        offset: p.offset,
        duration: p.duration
      })) || []
    };

    return new Response(
      JSON.stringify(assessment),
      {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  }
});