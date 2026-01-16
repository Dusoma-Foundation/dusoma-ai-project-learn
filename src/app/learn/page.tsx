"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GraduationCap, ArrowLeft, Brain, AlertTriangle, Lightbulb, Send, BookOpen, Calculator, FlaskConical } from "lucide-react";

interface TutorResponse {
  explanation: string;
  examples: string[];
  keyPoints: string[];
  furtherReading?: string[];
}

export default function LearnPage() {
  const [subject, setSubject] = useState<"reading" | "math" | "science">("math");
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("");
  const [level, setLevel] = useState<"beginner" | "intermediate" | "advanced">("intermediate");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TutorResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          topic,
          question,
          level,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get explanation");
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const getSubjectIcon = (sub: string) => {
    switch (sub) {
      case "reading":
        return <BookOpen className="h-4 w-4" />;
      case "math":
        return <Calculator className="h-4 w-4" />;
      case "science":
        return <FlaskConical className="h-4 w-4" />;
      default:
        return <Brain className="h-4 w-4" />;
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
            <Brain className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">AI Tutor</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ask about any topic and get clear, personalized explanations from our AI tutor.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle>What do you want to learn?</CardTitle>
              <CardDescription>
                Select a subject, enter a topic, and optionally ask a specific question.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Subject Selection */}
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Tabs value={subject} onValueChange={(v) => setSubject(v as "reading" | "math" | "science")}>
                    <TabsList className="grid grid-cols-3 w-full">
                      <TabsTrigger value="reading" className="gap-2">
                        <BookOpen className="h-4 w-4" />
                        Reading
                      </TabsTrigger>
                      <TabsTrigger value="math" className="gap-2">
                        <Calculator className="h-4 w-4" />
                        Math
                      </TabsTrigger>
                      <TabsTrigger value="science" className="gap-2">
                        <FlaskConical className="h-4 w-4" />
                        Science
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Topic */}
                <div className="space-y-2">
                  <Label htmlFor="topic">Topic *</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., fractions, photosynthesis, grammar"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    required
                  />
                </div>

                {/* Question */}
                <div className="space-y-2">
                  <Label htmlFor="question">Specific Question (optional)</Label>
                  <Textarea
                    id="question"
                    placeholder="Ask a specific question about this topic..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>

                {/* Level */}
                <div className="space-y-2">
                  <Label>Learning Level</Label>
                  <Tabs value={level} onValueChange={(v) => setLevel(v as "beginner" | "intermediate" | "advanced")}>
                    <TabsList className="grid grid-cols-3 w-full">
                      <TabsTrigger value="beginner">Beginner</TabsTrigger>
                      <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
                      <TabsTrigger value="advanced">Advanced</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <Button type="submit" disabled={isLoading || !topic.trim()} className="w-full gap-2">
                  {isLoading ? (
                    <>Generating...</>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Get Explanation
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {isLoading && (
              <Card className="bg-card/50 border-border">
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-full mt-2" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-24 w-full" />
                </CardContent>
              </Card>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {result && (
              <>
                {/* Explanation */}
                <Card className="bg-card/50 border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {getSubjectIcon(subject)}
                      Explanation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground whitespace-pre-wrap">{result.explanation}</p>
                  </CardContent>
                </Card>

                {/* Examples */}
                {result.examples && result.examples.length > 0 && (
                  <Card className="bg-card/50 border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-primary" />
                        Examples
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {result.examples.map((example, index) => (
                          <li key={index} className="p-3 rounded-lg bg-secondary/30 border border-border text-muted-foreground">
                            {example}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Key Points */}
                {result.keyPoints && result.keyPoints.length > 0 && (
                  <Card className="bg-card/50 border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-primary" />
                        Key Points to Remember
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-muted-foreground">
                        {result.keyPoints.map((point, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary font-bold">{index + 1}.</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Further Reading */}
                {result.furtherReading && result.furtherReading.length > 0 && (
                  <Card className="bg-card/50 border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        Further Learning
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-muted-foreground">
                        {result.furtherReading.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary">-</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </>
            )}

            {!isLoading && !error && !result && (
              <Card className="bg-card/50 border-border border-dashed">
                <CardContent className="py-12 text-center">
                  <Brain className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">
                    Select a subject and topic to get a personalized explanation.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 p-4 rounded-lg bg-destructive/5 border border-destructive/20 text-center">
          <p className="text-sm text-muted-foreground">
            <strong>Disclaimer:</strong> This tool provides educational content for general learning purposes. Always verify important information with qualified educators.
          </p>
        </div>
      </main>
    </div>
  );
}
