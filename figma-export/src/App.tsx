import { RouterProvider, Router } from './utils/router';
import { HomePage } from './pages/HomePage';
import { FocusPage } from './pages/FocusPage';
import { BackgroundPage } from './pages/BackgroundPage';
import { WritingPage } from './pages/WritingPage';
import { BlogPostPageWrapper } from './pages/BlogPostPageWrapper';
import { ContactPage } from './pages/ContactPage';
import { DemoPage } from './pages/DemoPage';
import { CardsPage } from './pages/CardsPage';
import { TypographyPage } from './pages/TypographyPage';
import { ButtonsPage } from './pages/ButtonsPage';
import { UIElementsPage } from './pages/UIElementsPage';
import { BlogComponentsPage } from './pages/BlogComponentsPage';
import { ListComponentsPage } from './pages/ListComponentsPage';

function AppRoutes() {
  const routes = [
    {
      path: '/',
      component: <HomePage />
    },
    {
      path: '/focus',
      component: <FocusPage />
    },
    {
      path: '/background',
      component: <BackgroundPage />
    },
    {
      path: '/writing',
      component: <WritingPage />
    },
    {
      path: '/writing/:postId',
      component: <BlogPostPageWrapper />
    },
    {
      path: '/blog/:postId',
      component: <BlogPostPageWrapper />
    },
    {
      path: '/contact',
      component: <ContactPage />
    },
    {
      path: '/timeline',
      component: <BackgroundPage />
    },
    {
      path: '/demo',
      component: <DemoPage />
    },
    {
      path: '/demo/cards',
      component: <CardsPage />
    },
    {
      path: '/demo/typography',
      component: <TypographyPage />
    },
    {
      path: '/demo/buttons',
      component: <ButtonsPage />
    },
    {
      path: '/demo/ui-elements',
      component: <UIElementsPage />
    },
    {
      path: '/demo/blog-components',
      component: <BlogComponentsPage />
    },
    {
      path: '/demo/list-components',
      component: <ListComponentsPage />
    }
  ];

  const fallback = (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-display font-black mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
        <a 
          href="/"
          className="bg-black text-white px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:-translate-x-1 hover:-translate-y-1 font-bold cursor-pointer"
        >
          Go Home
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Router routes={routes} fallback={fallback} />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppRoutes />
    </RouterProvider>
  );
}