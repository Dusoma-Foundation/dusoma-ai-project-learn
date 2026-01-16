import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface TutorRequest {
  subject: "reading" | "math" | "science";
  topic: string;
  question: string;
  level?: "beginner" | "intermediate" | "advanced";
}

export interface TutorResponse {
  explanation: string;
  examples: string[];
  keyPoints: string[];
  furtherReading?: string[];
}

const SYSTEM_PROMPT = `You are an educational tutor for the Dusoma Foundation. Your role is to provide clear, accessible explanations of educational concepts to help learners of all backgrounds understand and master new skills.

IMPORTANT GUIDELINES:
1. Use simple, clear language that anyone can understand
2. Break down complex concepts into smaller, manageable parts
3. Provide concrete examples that relate to everyday life
4. Be encouraging and supportive
5. Adapt your explanations to the learner's level
6. Focus on building understanding, not just memorization

When explaining a topic, provide:
1. A clear, step-by-step explanation
2. Practical examples that illustrate the concept
3. Key points to remember
4. Suggestions for further learning (optional)

Respond in JSON format with the following structure:
{
  "explanation": "Clear, detailed explanation of the topic",
  "examples": ["example1", "example2", "example3"],
  "keyPoints": ["point1", "point2", "point3"],
  "furtherReading": ["suggestion1", "suggestion2"]
}`;

export async function POST(request: NextRequest) {
  try {
    const body: TutorRequest = await request.json();

    if (!body.topic || body.topic.trim().length === 0) {
      return NextResponse.json(
        { error: "Please provide a topic to learn about" },
        { status: 400 }
      );
    }

    if (!body.subject) {
      return NextResponse.json(
        { error: "Please select a subject (reading, math, or science)" },
        { status: 400 }
      );
    }

    const levelDescription = body.level === "beginner" 
      ? "Explain as if to someone completely new to this topic."
      : body.level === "advanced"
      ? "Provide a more in-depth explanation suitable for someone with prior knowledge."
      : "Provide a balanced explanation suitable for someone with basic knowledge.";

    const userMessage = `
Subject: ${body.subject}
Topic: ${body.topic}
${body.question ? `Specific Question: ${body.question}` : ""}
Level: ${body.level || "intermediate"}

${levelDescription}

Please explain this topic clearly and provide helpful examples.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-5.2",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
      temperature: 0.5,
      response_format: { type: "json_object" },
    });

    const responseContent = completion.choices[0]?.message?.content;

    if (!responseContent) {
      return NextResponse.json(
        { error: "Failed to generate explanation. Please try again." },
        { status: 500 }
      );
    }

    const tutorResult: TutorResponse = JSON.parse(responseContent);

    return NextResponse.json(tutorResult);
  } catch (error) {
    console.error("Error in tutor API:", error);
    
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Failed to parse AI response. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "An error occurred while generating the explanation. Please try again later." },
      { status: 500 }
    );
  }
}
