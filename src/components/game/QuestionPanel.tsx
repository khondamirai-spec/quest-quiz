import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Lightbulb } from "lucide-react";

interface QuestionPanelProps {
  question: string;
  answers: string[];
  selectedAnswer: number | null;
  correctAnswer: number;
  onAnswer: (index: number) => void;
  showHint: boolean;
  hint?: string;
  isAnswered: boolean;
}

export const QuestionPanel = ({
  question,
  answers,
  selectedAnswer,
  correctAnswer,
  onAnswer,
  showHint,
  hint,
  isAnswered
}: QuestionPanelProps) => {
  return (
    <Card className="p-6 bg-card border-2 border-primary/30 shadow-glow">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center text-foreground">
          {question}
        </h2>
        
        {showHint && hint && (
          <div className="flex items-start gap-2 p-3 bg-warning/10 border border-warning/30 rounded-lg">
            <Lightbulb className="h-5 w-5 text-warning mt-0.5" />
            <p className="text-sm text-warning">{hint}</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 gap-3">
          {answers.map((answer, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === correctAnswer;
            const showResult = isAnswered && isSelected;
            
            return (
              <Button
                key={index}
                onClick={() => !isAnswered && onAnswer(index)}
                disabled={isAnswered}
                variant="outline"
                className={cn(
                  "h-auto p-4 text-left justify-start text-base font-medium transition-all",
                  "border-2 hover:scale-[1.02]",
                  !isAnswered && "hover:border-primary hover:bg-primary/10",
                  showResult && isCorrect && "border-success bg-success/20 text-success",
                  showResult && !isCorrect && "border-destructive bg-destructive/20 text-destructive"
                )}
              >
                <span className={cn(
                  "mr-3 flex items-center justify-center w-8 h-8 rounded-full border-2 font-bold",
                  showResult && isCorrect && "border-success bg-success/30",
                  showResult && !isCorrect && "border-destructive bg-destructive/30",
                  !showResult && "border-muted-foreground/30"
                )}>
                  {String.fromCharCode(65 + index)}
                </span>
                {answer}
              </Button>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
