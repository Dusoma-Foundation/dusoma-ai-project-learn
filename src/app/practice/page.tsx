"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GraduationCap, ArrowLeft, Sparkles, AlertTriangle, Send, BookOpen, Calculator, FlaskConical, CheckCircle, XCircle, Lightbulb, Eye, EyeOff } from "lucide-react";

interface PracticeProblem {
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
  hint?: string;
}

interface PracticeResponse {
  problems: PracticeProblem[];
  topic: string;
  difficulty: string;
}

export default function PracticePage() {
  const [subject, setSubject] = useState<"reading" | "math" | "science">("math");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PracticeResponse | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showAnswers, setShowAnswers] = useState<Record<number, boolean>>({});
  const [showHints, setShowHints] = useState<Record<number, boolean>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);
    setUserAnswers({});
    setShowAnswers({});
    setShowHints({});

    try {
      const response = await fetch("/api/practice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          topic,
          difficulty,
          count: 5,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate practice problems");
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAnswer = (index: number) => {
    setShowAnswers((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleHint = (index: number) => {
    setShowHints((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "easy":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "hard":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-primary/20 text-primary border-primary/30";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <span className="font-semibold">Dusoma Learn</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Practice Problems</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Generate practice problems to test your knowledge and get instant feedback.
          </p>
        </div>

        {/* Input Form */}
        <Card className="bg-card/50 border-border mb-8">
          <CardHeader>
            <CardTitle>Generate Practice Problems</CardTitle>
            <CardDescription>
              Select a subject, enter a topic, and choose your difficulty level.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Subject Selection */}
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Tabs value={subject} onValueChange={(v) => setSubject(v as "reading" | "math" | "science")}>
                    <TabsList className="grid grid-cols-3 w-full">
                      <TabsTrigger value="reading">
                        <BookOpen className="h-4 w-4" />
                      </TabsTrigger>
                      <TabsTrigger value="math">
                        <Calculator className="h-4 w-4" />
                      </TabsTrigger>
                      <TabsTrigger value="science">
                        <FlaskConical className="h-4 w-4" />
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Topic */}
                <div className="space-y-2">
                  <Label htmlFor="topic">Topic *</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., multiplication, vocabulary"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    required
                  />
                </div>

                {/* Difficulty */}
                <div className="space-y-2">
                  <Label>Difficulty</Label>
                  <Tabs value={difficulty} onValueChange={(v) => setDifficulty(v as "easy" | "medium" | "hard")}>
                    <TabsList className="grid grid-cols-3 w-full">
                      <TabsTrigger value="easy">Easy</TabsTrigger>
                      <TabsTrigger value="medium">Medium</TabsTrigger>
                      <TabsTrigger value="hard">Hard</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>

              <Button type="submit" disabled={isLoading || !topic.trim()} className="w-full gap-2">
                {isLoading ? (
                  <>Generating...</>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Generate Problems
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="bg-card/50 border-border">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Problems */}
        {result && result.problems && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {result.topic} - {result.problems.length} Problems
              </h2>
              <Badge className={getDifficultyColor(result.difficulty)}>
                {result.difficulty}
              </Badge>
            </div>

            {result.problems.map((problem, index) => (
              <Card key={index} className="bg-card/50 border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Problem {index + 1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Question */}
                  <p className="text-foreground font-medium">{problem.question}</p>

                  {/* Options */}
                  {problem.options && problem.options.length > 0 && (
                    <div className="space-y-2">
                      {problem.options.map((option, optIndex) => (
                        <button
                          key={optIndex}
                          onClick={() => setUserAnswers((prev) => ({ ...prev, [index]: option }))}
                          className={`w-full text-left p-3 rounded-lg border transition-all ${
                            userAnswers[index] === option
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Hint */}
                  {problem.hint && (
                    <div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleHint(index)}
                        className="gap-2 text-muted-foreground"
                      >
                        <Lightbulb className="h-4 w-4" />
                        {showHints[index] ? "Hide Hint" : "Show Hint"}
                      </Button>
                      {showHints[index] && (
                        <p className="mt-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-sm text-muted-foreground">
                          {problem.hint}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Show Answer Button */}
                  <div className="pt-4 border-t border-border">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleAnswer(index)}
                      className="gap-2"
                    >
                      {showAnswers[index] ? (
                        <>
                          <EyeOff className="h-4 w-4" />
                          Hide Answer
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4" />
                          Show Answer
                        </>
                      )}
                    </Button>

                    {showAnswers[index] && (
                      <div className="mt-4 space-y-3">
                        <div className="flex items-start gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <p className="font-medium text-green-400">Correct Answer:</p>
                            <p className="text-muted-foreground">{problem.answer}</p>
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                          <p className="font-medium text-foreground mb-1">Explanation:</p>
                          <p className="text-muted-foreground text-sm">{problem.explanation}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && !result && (
          <Card className="bg-card/50 border-border border-dashed">
            <CardContent className="py-12 text-center">
              <Sparkles className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">
                Select a subject and topic to generate practice problems.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Disclaimer */}
        <div className="mt-12 p-4 rounded-lg bg-destructive/5 border border-destructive/20 text-center">
          <p className="text-sm text-muted-foreground">
            <strong>Disclaimer:</strong> These practice problems are for educational purposes. Always verify important information with qualified educators.
          </p>
        </div>
      </main>
    </div>
  );
}
