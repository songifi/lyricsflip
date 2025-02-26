// src/practice/services/feedback.service.ts
import { Injectable } from '@nestjs/common';
import { PracticeItem } from '../entities/practice-item.entity';
import { ItemType } from '../enums/item-type.enum';

@Injectable()
export class FeedbackService {
  async generateFeedback(
    item: PracticeItem,
    userResponse: Record<string, any>,
    score: number,
  ): Promise<Record<string, any>> {
    // Base feedback object
    const feedback = {
      score,
      isCorrect: score >= 100,
      generalFeedback: '',
      detailedFeedback: {},
      improvementSuggestions: [],
      relatedConcepts: [],
    };
    
    // General feedback based on score
    if (score >= 100) {
      feedback.generalFeedback = 'Excellent work! You got this correct.';
    } else if (score >= 75) {
      feedback.generalFeedback = 'Good job! You\'re mostly correct, but there\'s room for improvement.';
    } else if (score >= 50) {
      feedback.generalFeedback = 'You\'re on the right track, but need more practice with this concept.';
    } else {
      feedback.generalFeedback = 'This concept needs more work. Let\'s review the fundamentals.';
    }
    
    // Item-specific detailed feedback
    switch (item.type) {
      case ItemType.MULTIPLE_CHOICE: {
        const correctOption = item.solution.correctOption;
        const userOption = userResponse.selectedOption;
        
        if (correctOption === userOption) {
          feedback.detailedFeedback = {
            message: 'You selected the correct answer!',
          };
        } else {
          feedback.detailedFeedback = {
            message: `The correct answer was option ${correctOption}.`,
            explanation: item.solution.explanation || 'Review this concept for better understanding.',
            yourAnswer: userOption,
            correctAnswer: correctOption,
          };
          
          feedback.improvementSuggestions.push(
            'Review the related concepts to understand why this is the correct answer.'
          );
        }
        break;
      }
      
      case ItemType.FILL_IN_BLANK: {
        const correctAnswers = item.solution.answers;
        const userAnswers = userResponse.answers;
        const detailedFeedback = {
          correctAnswers: [],
          incorrectAnswers: [],
        };
        
        for (let i = 0; i < correctAnswers.length; i++) {
          if (i < userAnswers.length) {
            if (userAnswers[i].toLowerCase() === correctAnswers[i].toLowerCase()) {
              detailedFeedback.correctAnswers.push(i + 1);
            } else {
              detailedFeedback.incorrectAnswers.push({
                position: i + 1,
                yourAnswer: userAnswers[i],
                correctAnswer: correctAnswers[i],
              });
            }
          } else {
            detailedFeedback.incorrectAnswers.push({
              position: i + 1,
              yourAnswer: '(no answer)',
              correctAnswer: correctAnswers[i],
            });
          }
        }
        
        feedback.detailedFeedback = detailedFeedback;
        
        if (detailedFeedback.incorrectAnswers.length > 0) {
          feedback.improvementSuggestions.push(
            'Pay attention to spelling and terminology when filling in answers.'
          );
        }
        break;
      }
      
      // Add more detailed feedback logic for other item types
      
      default:
        feedback.detailedFeedback = {
          message: 'Review the correct solution to understand this better.',
          solution: item.solution,
        };
    }
    
    // Add related concepts for further study
    if (item.metadata.relatedConcepts) {
      feedback.relatedConcepts = item.metadata.relatedConcepts;
    }
    
    return feedback;
  }
}
