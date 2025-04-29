import { Lesson } from '../types';

export const mockLessons: Lesson[] = [
  {
    id: '1',
    title: 'Basic English Greetings',
    description: 'Learn common greetings and introductions to start conversations confidently.',
    level: 'beginner',
    vocabularyItems: [
      {
        id: '101',
        word: 'Hello',
        britishPronunciation: 'https://audio-samples.com/british/hello.mp3',
        americanPronunciation: 'https://audio-samples.com/american/hello.mp3',
        definition: 'Used as a greeting when meeting or speaking to someone.',
        example: 'Hello, it\'s nice to meet you.'
      },
      {
        id: '102',
        word: 'Good morning',
        britishPronunciation: 'https://audio-samples.com/british/good-morning.mp3',
        americanPronunciation: 'https://audio-samples.com/american/good-morning.mp3',
        definition: 'A greeting said in the morning.',
        example: 'Good morning! Did you sleep well?'
      },
      {
        id: '103',
        word: 'How are you',
        britishPronunciation: 'https://audio-samples.com/british/how-are-you.mp3',
        americanPronunciation: 'https://audio-samples.com/american/how-are-you.mp3',
        definition: 'A polite question used when greeting someone.',
        example: 'Hello John, how are you today?'
      }
    ]
  },
  {
    id: '2',
    title: 'Restaurant Vocabulary',
    description: 'Essential words and phrases for ordering food and dining out in English.',
    level: 'beginner',
    vocabularyItems: [
      {
        id: '201',
        word: 'Menu',
        britishPronunciation: 'https://audio-samples.com/british/menu.mp3',
        americanPronunciation: 'https://audio-samples.com/american/menu.mp3',
        definition: 'A list of dishes available in a restaurant.',
        example: 'Can I see the menu, please?'
      },
      {
        id: '202',
        word: 'Bill',
        britishPronunciation: 'https://audio-samples.com/british/bill.mp3',
        americanPronunciation: 'https://audio-samples.com/american/bill.mp3',
        definition: 'A statement of money owed for goods or services.',
        example: 'Could we have the bill, please?'
      },
      {
        id: '203',
        word: 'Reservation',
        britishPronunciation: 'https://audio-samples.com/british/reservation.mp3',
        americanPronunciation: 'https://audio-samples.com/american/reservation.mp3',
        definition: 'An arrangement to secure accommodations at a restaurant.',
        example: 'I\'d like to make a reservation for two people at 7 pm.'
      }
    ]
  },
  {
    id: '3',
    title: 'Professional Communication',
    description: 'Enhance your workplace vocabulary for effective business interactions.',
    level: 'intermediate',
    vocabularyItems: [
      {
        id: '301',
        word: 'Deadline',
        britishPronunciation: 'https://audio-samples.com/british/deadline.mp3',
        americanPronunciation: 'https://audio-samples.com/american/deadline.mp3',
        definition: 'A time or date by which something must be completed.',
        example: 'The deadline for this project is next Friday.'
      },
      {
        id: '302',
        word: 'Schedule',
        britishPronunciation: 'https://audio-samples.com/british/schedule.mp3',
        americanPronunciation: 'https://audio-samples.com/american/schedule.mp3',
        definition: 'A plan of things to be done and the times when they will be done.',
        example: 'Let me check my schedule to see if I\'m available for a meeting.'
      },
      {
        id: '303',
        word: 'Negotiate',
        britishPronunciation: 'https://audio-samples.com/british/negotiate.mp3',
        americanPronunciation: 'https://audio-samples.com/american/negotiate.mp3',
        definition: 'To discuss something to reach an agreement.',
        example: 'We need to negotiate the terms of the contract.'
      }
    ]
  },
  {
    id: '4',
    title: 'Common English Idioms',
    description: 'Master idiomatic expressions that native speakers use every day.',
    level: 'advanced',
    vocabularyItems: [
      {
        id: '401',
        word: 'Break a leg',
        britishPronunciation: 'https://audio-samples.com/british/break-a-leg.mp3',
        americanPronunciation: 'https://audio-samples.com/american/break-a-leg.mp3',
        definition: 'An expression used to wish someone good luck, especially before a performance.',
        example: 'Break a leg at your presentation tomorrow!'
      },
      {
        id: '402',
        word: 'Hit the books',
        britishPronunciation: 'https://audio-samples.com/british/hit-the-books.mp3',
        americanPronunciation: 'https://audio-samples.com/american/hit-the-books.mp3',
        definition: 'To study intensively.',
        example: 'I can\'t go out tonight, I need to hit the books for my exam.'
      },
      {
        id: '403',
        word: 'Cost an arm and a leg',
        britishPronunciation: 'https://audio-samples.com/british/cost-arm-leg.mp3',
        americanPronunciation: 'https://audio-samples.com/american/cost-arm-leg.mp3',
        definition: 'To be very expensive.',
        example: 'That new smartphone costs an arm and a leg!'
      }
    ]
  }
];