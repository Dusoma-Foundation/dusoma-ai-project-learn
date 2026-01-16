import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  GraduationCap: () => <div data-testid="graduationcap-icon" />,
  BookOpen: () => <div data-testid="bookopen-icon" />,
  Calculator: () => <div data-testid="calculator-icon" />,
  FlaskConical: () => <div data-testid="flaskconical-icon" />,
  ChevronRight: () => <div data-testid="chevronright-icon" />,
  Users: () => <div data-testid="users-icon" />,
  Brain: () => <div data-testid="brain-icon" />,
  Sparkles: () => <div data-testid="sparkles-icon" />,
}));

describe('Landing Page', () => {
  beforeEach(() => {
    render(<Home />);
  });

  describe('Hero Section', () => {
    it('renders the main title', () => {
      expect(screen.getByText('Dusoma Educational')).toBeInTheDocument();
    });

    it('renders the subtitle', () => {
      expect(screen.getByText('AI-powered learning for all')).toBeInTheDocument();
    });

    it('renders the description', () => {
      expect(screen.getByText(/Free, accessible education for everyone/)).toBeInTheDocument();
    });

    it('renders the Start Learning button', () => {
      const buttons = screen.getAllByRole('link', { name: /Start Learning/i });
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('renders the Practice Problems button', () => {
      const buttons = screen.getAllByRole('link', { name: /Practice Problems/i });
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('renders the Dusoma Foundation quote', () => {
      expect(screen.getByText(/Only Humans can fix broken systems/)).toBeInTheDocument();
    });
  });

  describe('How it Works Section', () => {
    it('renders the section title', () => {
      expect(screen.getByText('How it works')).toBeInTheDocument();
    });

    it('renders the Choose step', () => {
      expect(screen.getByText('Choose')).toBeInTheDocument();
    });

    it('renders the Learn step', () => {
      expect(screen.getByText('Learn')).toBeInTheDocument();
    });

    it('renders the Practice step', () => {
      expect(screen.getByText('Practice')).toBeInTheDocument();
    });
  });

  describe('Features Section', () => {
    it('renders the Features title', () => {
      expect(screen.getByText('Features')).toBeInTheDocument();
    });

    it('renders AI Tutoring feature', () => {
      expect(screen.getByText('AI Tutoring')).toBeInTheDocument();
    });

    it('renders Practice Problems feature', () => {
      const elements = screen.getAllByText('Practice Problems');
      expect(elements.length).toBeGreaterThan(0);
    });

    it('renders Free for Everyone feature', () => {
      expect(screen.getByText('Free for Everyone')).toBeInTheDocument();
    });
  });

  describe('Subjects Section', () => {
    it('renders the Subjects title', () => {
      expect(screen.getByText('Subjects')).toBeInTheDocument();
    });

    it('renders Reading & Writing subject', () => {
      expect(screen.getByText('Reading & Writing')).toBeInTheDocument();
    });

    it('renders Mathematics subject', () => {
      expect(screen.getByText('Mathematics')).toBeInTheDocument();
    });

    it('renders Science subject', () => {
      expect(screen.getByText('Science')).toBeInTheDocument();
    });
  });

  describe('Mission Section', () => {
    it('renders the Our Mission title', () => {
      expect(screen.getByText('Our Mission')).toBeInTheDocument();
    });

    it('renders the mission statement', () => {
      expect(screen.getByText(/The Dusoma Foundation believes that infrastructure is a human right/)).toBeInTheDocument();
    });

    it('renders the Learn About Dusoma link', () => {
      const links = screen.getAllByRole('link', { name: /Learn About Dusoma/i });
      expect(links.length).toBeGreaterThan(0);
    });

    it('renders the Marla.AI link', () => {
      const links = screen.getAllByRole('link', { name: /Marla.AI/i });
      expect(links.length).toBeGreaterThan(0);
    });
  });

  describe('Disclaimer Section', () => {
    it('renders the disclaimer', () => {
      expect(screen.getByText(/This tool provides educational content for general learning purposes/)).toBeInTheDocument();
    });
  });

  describe('Footer', () => {
    it('renders the Dusoma Learn brand', () => {
      expect(screen.getByText('Dusoma Learn')).toBeInTheDocument();
    });

    it('renders the Tools section', () => {
      expect(screen.getByText('Tools')).toBeInTheDocument();
    });

    it('renders the Dusoma section', () => {
      expect(screen.getByText('Dusoma')).toBeInTheDocument();
    });

    it('renders the Contact section', () => {
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('renders the copyright notice', () => {
      expect(screen.getByText(/2025 Dusoma Foundation/)).toBeInTheDocument();
    });

    it('renders link to dusoma.org', () => {
      const links = screen.getAllByRole('link', { name: /Dusoma.org/i });
      expect(links.length).toBeGreaterThan(0);
    });

    it('renders link to dusoma.com', () => {
      const links = screen.getAllByRole('link', { name: /Dusoma.com/i });
      expect(links.length).toBeGreaterThan(0);
    });

    it('renders contact email', () => {
      expect(screen.getByText('marla@dusoma.org')).toBeInTheDocument();
    });
  });
});
