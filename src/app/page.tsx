import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, BookOpen, Calculator, FlaskConical, ChevronRight, Users, Brain, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <div className="min-h-[100vh] grid grid-cols-1 md:grid-cols-2">
        {/* Left side - Content */}
        <div className="flex flex-col justify-center px-8 py-12 md:px-16 bg-background">
          <div className="max-w-xl space-y-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
              <GraduationCap className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                <span className="block text-foreground">Dusoma Educational</span>
                <span className="block text-primary mt-2">AI-powered learning for all</span>
              </h1>
              <p className="mt-6 text-xl text-muted-foreground">
                Free, accessible education for everyone. Learn reading, math, and science with personalized AI tutoring and practice problems.
              </p>
            </div>
            <div className="pt-4 flex gap-4">
              <Button asChild size="lg" className="px-8 h-12 text-base font-medium rounded-xl shadow-lg hover:scale-105 transition-all gap-2">
                <Link href="/learn">
                  Start Learning <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 h-12 text-base font-medium rounded-xl shadow-lg hover:scale-105 transition-all gap-2">
                <Link href="/practice">
                  Practice Problems
                </Link>
              </Button>
            </div>
            <div className="pt-6 text-sm text-muted-foreground border-t border-border">
              <p className="italic">&quot;Only Humans can fix broken systems. AI should serve humanity, not harm it.&quot;</p>
              <p className="mt-2">A project by the <a href="https://dusoma.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Dusoma Foundation</a></p>
            </div>
          </div>
        </div>

        {/* Right side - Visual */}
        <div className="hidden md:flex relative h-full w-full bg-gradient-to-br from-background via-secondary/30 to-primary/10 items-center justify-center">
          <div className="text-center space-y-6">
            <div className="flex justify-center gap-4">
              <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20">
                <BookOpen className="h-16 w-16 text-primary" />
              </div>
              <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20">
                <Calculator className="h-16 w-16 text-primary" />
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20">
                <FlaskConical className="h-16 w-16 text-primary" />
              </div>
              <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20">
                <Brain className="h-16 w-16 text-primary" />
              </div>
            </div>
            <p className="text-2xl font-bold text-primary">Dusoma Educational Tutor</p>
            <p className="text-muted-foreground">Empowering learners with AI</p>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <section className="py-24 px-8 md:px-16 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">1</div>
              <h3 className="text-xl font-semibold">Choose</h3>
              <p className="text-muted-foreground">Select a subject and topic you want to learn or practice</p>
            </div>
            <div className="text-center space-y-4">
              <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">2</div>
              <h3 className="text-xl font-semibold">Learn</h3>
              <p className="text-muted-foreground">Get personalized explanations and examples from our AI tutor</p>
            </div>
            <div className="text-center space-y-4">
              <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">3</div>
              <h3 className="text-xl font-semibold">Practice</h3>
              <p className="text-muted-foreground">Solve practice problems and get instant feedback to improve</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card/50 border-border hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>AI Tutoring</CardTitle>
                <CardDescription>Get personalized explanations for any topic in reading, math, or science at your own pace</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-card/50 border-border hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Practice Problems</CardTitle>
                <CardDescription>Generate unlimited practice problems with step-by-step solutions and instant feedback</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-card/50 border-border hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Free for Everyone</CardTitle>
                <CardDescription>No login required. No fees. Just free, accessible education for all learners everywhere</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-24 px-8 md:px-16 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Subjects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card/50 border-border hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Reading & Writing</CardTitle>
                <CardDescription>Learn to read, write, and understand texts. Practice vocabulary, grammar, and comprehension.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-card/50 border-border hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                  <Calculator className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Mathematics</CardTitle>
                <CardDescription>Master arithmetic, algebra, geometry, and more. Practice with problems at every level.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-card/50 border-border hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                  <FlaskConical className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Science</CardTitle>
                <CardDescription>Explore biology, chemistry, physics, and earth science. Understand the world around you.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-8 md:px-16 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
          <p className="text-xl text-muted-foreground mb-8">
            The Dusoma Foundation believes that infrastructure is a human right. We build free tools that redirect the power of AI toward clean water, food, fair pay, and body autonomy.
          </p>
          <p className="text-lg text-muted-foreground mb-8">
            Education is the foundation of opportunity. Every person deserves access to quality learning resources, regardless of where they live or what they can afford.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild variant="outline" size="lg" className="rounded-xl">
              <a href="https://dusoma.org" target="_blank" rel="noopener noreferrer">Learn About Dusoma</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl">
              <a href="https://marla-ai.ai" target="_blank" rel="noopener noreferrer">Marla.AI</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 px-8 md:px-16 bg-destructive/5 border-y border-destructive/20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            <strong>Disclaimer:</strong> This tool provides educational content for general learning purposes. It is not a substitute for formal education or professional instruction. Always verify important information with qualified educators.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 md:px-16 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-6 w-6 text-primary" />
                <span className="font-bold">Dusoma Learn</span>
              </div>
              <p className="text-sm text-muted-foreground">AI-powered education for everyone.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Tools</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/learn" className="hover:text-foreground transition-colors">AI Tutor</Link></li>
                <li><Link href="/practice" className="hover:text-foreground transition-colors">Practice Problems</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Dusoma</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://dusoma.org" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Dusoma.org</a></li>
                <li><a href="https://dusoma.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Dusoma.com</a></li>
                <li><a href="https://marla-ai.ai" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Marla.AI</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>marla@dusoma.org</li>
                <li>Los Alamos, NM</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Dusoma Foundation. Free and open for all.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
