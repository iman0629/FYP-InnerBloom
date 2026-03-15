import { FaRobot, FaLock, FaUserCog,} from 'react-icons/fa';
import { ImAccessibility } from "react-icons/im";

export const features = [
  {
    title: 'AI-Powered Conversations',
    description: 'Talk naturally through text or voice – our empathetic AI listens, understands your emotions in real-time using advanced NLP, and responds with kindness and evidence-based guidance inspired by CBT.',
    icon: <FaRobot size={50} color="#4A90E2" />, // Blue for AI/tech feel
  },
  {
    title: 'Complete Privacy',
    description: 'Your conversations are fully encrypted and confidential. We never store sensitive data without consent and follow strict privacy standards – your safe space is truly yours.',
    icon: <FaLock size={50} color="#50C878" />, // Green for security/trust
  },
  {
    title: 'Personalized Support',
    description: 'Our intelligent two-tier system starts with a general check-in and smartly guides you to specialized modules (Anxiety, Depression, OCD, Bipolar, Phobias) tailored exactly to your needs.',
    icon: <FaUserCog size={50} color="#9B59B6" />, // Purple for personalization
  },
  {
    title: 'Interactive 3D Wellness Exercises',
    description: 'Bring therapy to life with high-quality, immersive 3D animated exercises. Follow guided breathing, progressive relaxation, mindfulness, and movement routines designed for your specific module – visual and engaging support that makes self-care easier and more effective.',
    icon: <ImAccessibility size={50} color="#F39C12" />, // Orange for growth/progress
  },
];
