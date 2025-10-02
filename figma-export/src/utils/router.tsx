import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Route definitions
export type Route = {
  path: string;
  component: ReactNode;
  title?: string;
};

export type RouterState = {
  currentPath: string;
  params: Record<string, string>;
  navigate: (path: string, replace?: boolean) => void;
  back: () => void;
};

const RouterContext = createContext<RouterState | null>(null);

export function useRouter(): RouterState {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}

interface RouterProviderProps {
  children: ReactNode;
  initialPath?: string;
}

export function RouterProvider({ children, initialPath }: RouterProviderProps) {
  const [currentPath, setCurrentPath] = useState(() => {
    // Initialize with the current browser path if no initialPath is provided
    return initialPath || window.location.pathname || '/';
  });
  const [scrollPositions, setScrollPositions] = useState<Record<string, number>>({});
  
  // Parse path and extract params
  const parseRoute = (path: string) => {
    const params: Record<string, string> = {};
    
    // Handle writing post routes like /writing/post-id
    const writingMatch = path.match(/^\/writing\/(.+)$/);
    if (writingMatch) {
      params.postId = writingMatch[1];
      return { path: '/writing/:postId', params };
    }
    
    // Handle blog post routes like /blog/post-id (backwards compatibility)
    const blogMatch = path.match(/^\/blog\/(.+)$/);
    if (blogMatch) {
      params.postId = blogMatch[1];
      return { path: '/blog/:postId', params };
    }
    
    return { path, params: {} };
  };

  const { path: normalizedPath, params } = parseRoute(currentPath);

  const navigate = (path: string, replace: boolean = false) => {
    // Save current scroll position before navigating
    setScrollPositions(prev => ({
      ...prev,
      [currentPath]: window.scrollY
    }));

    setCurrentPath(path);
    
    // Update browser history
    if (replace) {
      window.history.replaceState({ path }, '', path === '/' ? '/' : path);
    } else {
      window.history.pushState({ path }, '', path === '/' ? '/' : path);
    }

    // Scroll to top for new pages, restore position for same page
    setTimeout(() => {
      if (path === currentPath && scrollPositions[path] !== undefined) {
        window.scrollTo(0, scrollPositions[path]);
      } else {
        window.scrollTo(0, 0);
      }
    }, 100);
  };

  const back = () => {
    window.history.back();
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const newPath = event.state?.path || '/';
      setCurrentPath(newPath);
      
      // Restore scroll position if available
      setTimeout(() => {
        if (scrollPositions[newPath] !== undefined) {
          window.scrollTo(0, scrollPositions[newPath]);
        } else {
          window.scrollTo(0, 0);
        }
      }, 100);
    };

    window.addEventListener('popstate', handlePopState);
    
    // Set initial browser state
    window.history.replaceState({ path: currentPath }, '', currentPath === '/' ? '/' : currentPath);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [currentPath, scrollPositions]);

  // Update document title based on route
  useEffect(() => {
    const titleMap: Record<string, string> = {
      '/': 'Nick Roth - AI Product Manager & Engineer',
      '/focus': 'My Focus - Nick Roth',
      '/background': 'Background - Nick Roth',
      '/writing': 'Writing - Nick Roth',
      '/contact': 'Contact - Nick Roth',
      '/timeline': 'Career Timeline - Nick Roth',
      '/blog/:postId': 'Blog Post - Nick Roth',
      '/writing/:postId': 'Writing - Nick Roth'
    };

    const title = titleMap[normalizedPath] || titleMap['/'];
    document.title = title;
  }, [normalizedPath]);

  const value: RouterState = {
    currentPath: normalizedPath,
    params,
    navigate,
    back
  };

  return (
    <RouterContext.Provider value={value}>
      {children}
    </RouterContext.Provider>
  );
}

// Route matching component
interface RouteProps {
  path: string;
  component: ReactNode;
}

export function Route({ path, component }: RouteProps) {
  const { currentPath } = useRouter();
  
  // Simple route matching - exact match or pattern match
  const isMatch = currentPath === path || 
    (path.includes(':') && matchesPattern(currentPath, path));
  
  return isMatch ? <>{component}</> : null;
}

function matchesPattern(currentPath: string, pattern: string): boolean {
  const patternParts = pattern.split('/');
  const pathParts = currentPath.split('/');
  
  if (patternParts.length !== pathParts.length) {
    return false;
  }
  
  return patternParts.every((part, index) => {
    return part.startsWith(':') || part === pathParts[index];
  });
}

// Router component for easier route definitions
interface RouterProps {
  routes: Array<{
    path: string;
    component: ReactNode;
  }>;
  fallback?: ReactNode;
}

export function Router({ routes, fallback }: RouterProps) {
  const { currentPath } = useRouter();
  
  for (const route of routes) {
    const isMatch = currentPath === route.path || 
      (route.path.includes(':') && matchesPattern(currentPath, route.path));
    
    if (isMatch) {
      return <>{route.component}</>;
    }
  }
  
  return fallback ? <>{fallback}</> : null;
}

// Utility function to generate route paths
export function generatePath(pattern: string, params: Record<string, string>): string {
  let path = pattern;
  Object.entries(params).forEach(([key, value]) => {
    path = path.replace(`:${key}`, value);
  });
  return path;
}

// Hook for easy navigation with type safety
export function useNavigate() {
  const { navigate } = useRouter();
  
  return {
    toHome: () => navigate('/'),
    toFocus: () => navigate('/focus'),
    toBackground: () => navigate('/background'),
    toWriting: () => navigate('/writing'),
    toContact: () => navigate('/contact'),
    toTimeline: () => navigate('/timeline'),
    toDemo: () => navigate('/demo'),
    toDemoCards: () => navigate('/demo/cards'),
    toBlogPost: (postId: string) => navigate(`/blog/${postId}`),
    toWritingPost: (postId: string) => navigate(`/writing/${postId}`),
    navigate: (path: string, replace?: boolean) => navigate(path, replace),
    to: (path: string, replace?: boolean) => navigate(path, replace),
    back: () => window.history.back()
  };
}