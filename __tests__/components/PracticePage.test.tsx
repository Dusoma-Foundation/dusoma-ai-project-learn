import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PracticePage from '@/app/practice/page';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  GraduationCap: () => <div data-testid="graduationcap-icon" />,
  ArrowLeft: () => <div data-testid="arrowleft-icon" />,
  Sparkles: () => <div data-testid="sparkles-icon" />,
  AlertTriangle: () => <div data-testid="alerttriangle-icon" />,
  Send: () => <div data-testid="send-icon" />,
  BookOpen: () => <div data-testid="bookopen-icon" />,
  Calculator: () => <div data-testid="calculator-icon" />,
  FlaskConical: () => <div data-testid="flaskconical-icon" />,
  CheckCircle: () => <div data-testid="checkcircle-icon" />,
  XCircle: () => <div data-testid="xcircle-icon" />,
  Lightbulb: () => <div data-testid="lightbulb-icon" />,
  Eye: () => <div data-testid="eye-icon" />,
  EyeOff: () => <div data-testid="eyeoff-icon" />,
}));

describe('Practice Page', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockReset();
  });

  describe('Initial Render', () => {
    it('renders the page title', () => {
      render(<PracticePage />);
      expect(screen.getByText('Practice Problems')).toBeInTheDocument();
    });

    it('renders the page description', () => {
      render(<PracticePage />);
      expect(screen.getByText(/Generate practice problems/)).toBeInTheDocument();
    });

    it('renders the form', () => {
      render(<PracticePage />);
      expect(screen.getByText('Generate Practice Problems')).toBeInTheDocument();
    });

    it('renders the topic input', () => {
      render(<PracticePage />);
      expect(screen.getByLabelText(/Topic/)).toBeInTheDocument();
    });

    it('renders the submit button', () => {
      render(<PracticePage />);
      expect(screen.getByRole('button', { name: /Generate Problems/i })).toBeInTheDocument();
    });

    it('renders the back link', () => {
      render(<PracticePage />);
      expect(screen.getByRole('link', { name: /Back to Home/i })).toBeInTheDocument();
    });

    it('renders the disclaimer', () => {
      render(<PracticePage />);
      expect(screen.getByText(/These practice problems are for educational purposes/)).toBeInTheDocument();
    });

    it('renders the empty state message', () => {
      render(<PracticePage />);
      expect(screen.getByText(/Select a subject and topic to generate/)).toBeInTheDocument();
    });
  });

  describe('Form Interaction', () => {
    it('allows typing in topic', async () => {
      render(<PracticePage />);
      const input = screen.getByLabelText(/Topic/);
      await userEvent.type(input, 'multiplication');
      expect(input).toHaveValue('multiplication');
    });

    it('submit button is disabled when topic is empty', () => {
      render(<PracticePage />);
      const button = screen.getByRole('button', { name: /Generate Problems/i });
      expect(button).toBeDisabled();
    });

    it('submit button is enabled when topic has value', async () => {
      render(<PracticePage />);
      const input = screen.getByLabelText(/Topic/);
      await userEvent.type(input, 'multiplication');
      const button = screen.getByRole('button', { name: /Generate Problems/i });
      expect(button).not.toBeDisabled();
    });
  });

  describe('API Interaction', () => {
    it('calls the API when form is submitted', async () => {
      const mockResponse = {
        problems: [
          {
            question: 'What is 5 x 3?',
            options: ['A) 12', 'B) 15', 'C) 18', 'D) 20'],
            answer: 'B) 15',
            explanation: '5 multiplied by 3 equals 15',
            hint: 'Think of 5 groups of 3',
          },
        ],
        topic: 'multiplication',
        difficulty: 'medium',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      render(<PracticePage />);
      const input = screen.getByLabelText(/Topic/);
      await userEvent.type(input, 'multiplication');
      
      const button = screen.getByRole('button', { name: /Generate Problems/i });
      await userEvent.click(button);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/practice', expect.any(Object));
      });
    });

    it('displays problems after successful API call', async () => {
      const mockResponse = {
        problems: [
          {
            question: 'What is 5 x 3?',
            options: ['A) 12', 'B) 15', 'C) 18', 'D) 20'],
            answer: 'B) 15',
            explanation: '5 multiplied by 3 equals 15',
            hint: 'Think of 5 groups of 3',
          },
        ],
        topic: 'multiplication',
        difficulty: 'medium',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      render(<PracticePage />);
      const input = screen.getByLabelText(/Topic/);
      await userEvent.type(input, 'multiplication');
      
      const button = screen.getByRole('button', { name: /Generate Problems/i });
      await userEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText('What is 5 x 3?')).toBeInTheDocument();
      });

      expect(screen.getByText('A) 12')).toBeInTheDocument();
      expect(screen.getByText('B) 15')).toBeInTheDocument();
    });

    it('displays error message on API failure', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'API Error' }),
      });

      render(<PracticePage />);
      const input = screen.getByLabelText(/Topic/);
      await userEvent.type(input, 'multiplication');
      
      const button = screen.getByRole('button', { name: /Generate Problems/i });
      await userEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText('API Error')).toBeInTheDocument();
      });
    });
  });
});
