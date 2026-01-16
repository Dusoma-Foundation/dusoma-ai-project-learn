import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface PracticeRequest {
  subject: "reading" | "math" | "science";
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  count?: number;
}

export interface PracticeProblem {
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
  hint?: string;
}

export interface PracticeResponse {
  problems: PracticeProblem[];
  topic: string;
  difficulty: string;
}

const SYSTEM_PROMPT = `You are an educational tutor for the Dusoma Foundation. Your role is to generate practice problems that help learners build and test their understanding of various subjects.

IMPORTANT GUIDELINES:
1. Create clear, well-structured problems
2. Provide multiple choice options when appropriate
3. Include detailed explanations for each answer
4. Add helpful hints that guide without giving away the answer
5. Vary the problem types to test different aspects of understanding
6. Make problems relevant and engaging

For each problem, provide:
1. A clear question
2. Multiple choice options (for applicable problems)
3. The correct answer
4. A detailed explanation of why the answer is correct
5. A helpful hint (optional)

Respond in JSON format with the following structure:
{
  "problems": [
    {
      "question": "The problem question",
      "options": ["A) option1", "B) option2", "C) option3", "D) option4"],
      "answer": "The correct answer",
      "explanation": "Why this is the correct answer",
      "hint": "A helpful hint"
    }
  ],
  "topic": "The topic covered",
  "difficulty": "The difficulty level"
}`;

export async function POST(request: NextRequest) {
  try {
    const body: PracticeRequest = await request.json();

    if (!body.topic || body.topic.trim().length === 0) {
      return NextResponse.json(
        { error: "Please provide a topic for practice problems" },
        { status: 400 }
      );
    }

    if (!body.subject) {
      return NextResponse.json(
        { error: "Please select a subject (reading, math, or science)" },
        { status: 400 }
      );
    }

    const count = Math.min(body.count || 5, 10);

    const userMessage = `
Subject: ${body.subject}
Topic: ${body.topic}
Difficulty: ${body.difficulty || "medium"}
Number of problems: ${count}

Please generate ${count} practice problems for this topic at the ${body.difficulty || "medium"} difficulty level.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-5.2",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const responseContent = completion.choices[0]?.message?.content;

    if (!responseContent) {
      return NextResponse.json(
        { error: "Failed to generate practice problems. Please try again." },
        { status: 500 }
      );
    }

    const practiceResult: PracticeResponse = JSON.parse(responseContent);

    return NextResponse.json(practiceResult);
  } catch (error) {
    console.error("Error in practice API:", error);
    
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Failed to parse AI response. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "An error occurred while generating practice problems. Please try again later." },
      { status: 500 }
    );
  }
}
