import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LearnPage from '@/app/learn/page';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  GraduationCap: () => <div data-testid="graduationcap-icon" />,
  ArrowLeft: () => <div data-testid="arrowleft-icon" />,
  Brain: () => <div data-testid="brain-icon" />,
  AlertTriangle: () => <div data-testid="alerttriangle-icon" />,
  Lightbulb: () => <div data-testid="lightbulb-icon" />,
  Send: () => <div data-testid="send-icon" />,
  BookOpen: () => <div data-testid="bookopen-icon" />,
  Calculator: () => <div data-testid="calculator-icon" />,
  FlaskConical: () => <div data-testid="flaskconical-icon" />,
}));

describe('Learn Page', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockReset();
  });

  describe('Initial Render', () => {
    it('renders the page title', () => {
      render(<LearnPage />);
      expect(screen.getByText('AI Tutor')).toBeInTheDocument();
    });

    it('renders the page description', () => {
      render(<LearnPage />);
      expect(screen.getByText(/Ask about any topic/)).toBeInTheDocument();
    });

    it('renders the form', () => {
      render(<LearnPage />);
      expect(screen.getByText('What do you want to learn?')).toBeInTheDocument();
    });

    it('renders the topic input', () => {
      render(<LearnPage />);
      expect(screen.getByLabelText(/Topic/)).toBeInTheDocument();
    });

    it('renders the question textarea', () => {
      render(<LearnPage />);
      expect(screen.getByLabelText(/Specific Question/)).toBeInTheDocument();
    });

    it('renders the submit button', () => {
      render(<LearnPage />);
      expect(screen.getByRole('button', { name: /Get Explanation/i })).toBeInTheDocument();
    });

    it('renders the back link', () => {
      render(<LearnPage />);
      expect(screen.getByRole('link', { name: /Back to Home/i })).toBeInTheDocument();
    });

    it('renders the disclaimer', () => {
      render(<LearnPage />);
      expect(screen.getByText(/This tool provides educational content/)).toBeInTheDocument();
    });

    it('renders the empty state message', () => {
      render(<LearnPage />);
      expect(screen.getByText(/Select a subject and topic/)).toBeInTheDocument();
    });
  });

  describe('Form Interaction', () => {
    it('allows typing in topic', async () => {
      render(<LearnPage />);
      const input = screen.getByLabelText(/Topic/);
      await userEvent.type(input, 'fractions');
      expect(input).toHaveValue('fractions');
    });

    it('allows typing in question', async () => {
      render(<LearnPage />);
      const input = screen.getByLabelText(/Specific Question/);
      await userEvent.type(input, 'How do I add fractions?');
      expect(input).toHaveValue('How do I add fractions?');
    });

    it('submit button is disabled when topic is empty', () => {
      render(<LearnPage />);
      const button = screen.getByRole('button', { name: /Get Explanation/i });
      expect(button).toBeDisabled();
    });

    it('submit button is enabled when topic has value', async () => {
      render(<LearnPage />);
      const input = screen.getByLabelText(/Topic/);
      await userEvent.type(input, 'fractions');
      const button = screen.getByRole('button', { name: /Get Explanation/i });
      expect(button).not.toBeDisabled();
    });
  });

  describe('API Interaction', () => {
    it('calls the API when form is submitted', async () => {
      const mockResponse = {
        explanation: 'Fractions represent parts of a whole.',
        examples: ['1/2 is half', '1/4 is a quarter'],
        keyPoints: ['Numerator is the top number', 'Denominator is the bottom number'],
        furtherReading: ['Practice with visual aids'],
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      render(<LearnPage />);
      const input = screen.getByLabelText(/Topic/);
      await userEvent.type(input, 'fractions');
      
      const button = screen.getByRole('button', { name: /Get Explanation/i });
      await userEvent.click(button);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/tutor', expect.any(Object));
      });
    });

    it('displays results after successful API call', async () => {
      const mockResponse = {
        explanation: 'Fractions represent parts of a whole.',
        examples: ['1/2 is half'],
        keyPoints: ['Numerator is the top number'],
        furtherReading: ['Practice with visual aids'],
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      render(<LearnPage />);
      const input = screen.getByLabelText(/Topic/);
      await userEvent.type(input, 'fractions');
      
      const button = screen.getByRole('button', { name: /Get Explanation/i });
      await userEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText('Fractions represent parts of a whole.')).toBeInTheDocument();
      });

      expect(screen.getByText('1/2 is half')).toBeInTheDocument();
    });

    it('displays error message on API failure', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'API Error' }),
      });

      render(<LearnPage />);
      const input = screen.getByLabelText(/Topic/);
      await userEvent.type(input, 'fractions');
      
      const button = screen.getByRole('button', { name: /Get Explanation/i });
      await userEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText('API Error')).toBeInTheDocument();
      });
    });
  });
});
