import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface BlogPost {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    category: string;
    subcategory?: string;
    tags: string[];
    publishedAt: string;
    updatedAt: string;
    readTime: number; // 분 단위
}

interface BlogContextType {
    posts: BlogPost[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    filteredPosts: BlogPost[];
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

// 샘플 블로그 포스트 데이터
const samplePosts: BlogPost[] = [
    {
        id: '1',
        title: 'React 프로젝트 시작하기',
        content: 'React와 TypeScript를 사용한 블로그 프로젝트 구축 과정...',
        excerpt: 'React와 TypeScript를 사용한 블로그 프로젝트 구축 과정을 정리한 포스트입니다.',
        category: 'development',
        subcategory: 'frontend',
        tags: ['React', 'TypeScript', 'Vite'],
        publishedAt: '2024-01-15',
        updatedAt: '2024-01-15',
        readTime: 8
    },
    {
        id: '2',
        title: 'Git 컨트리뷰션 차트 만들기',
        content: 'GitHub API를 활용하여 커밋 활동을 시각화하는 컴포넌트...',
        excerpt: 'GitHub API를 활용하여 커밋 활동을 시각화하는 컴포넌트를 구현하는 방법을 설명합니다.',
        category: 'development',
        subcategory: 'frontend',
        tags: ['React', 'GitHub API', 'Data Visualization'],
        publishedAt: '2024-01-20',
        updatedAt: '2024-01-20',
        readTime: 12
    },
    {
        id: '3',
        title: 'Node.js 백엔드 API 설계',
        content: 'RESTful API 설계 원칙과 Node.js를 사용한 구현...',
        excerpt: 'RESTful API 설계 원칙과 Node.js를 사용한 실제 구현 방법을 다룹니다.',
        category: 'development',
        subcategory: 'backend',
        tags: ['Node.js', 'REST API', 'Express'],
        publishedAt: '2024-01-10',
        updatedAt: '2024-01-10',
        readTime: 15
    },
    {
        id: '4',
        title: 'Docker를 활용한 배포 자동화',
        content: 'Docker와 CI/CD 파이프라인을 구축하여 배포 자동화...',
        excerpt: 'Docker와 CI/CD 파이프라인을 구축하여 배포 과정을 자동화하는 방법을 소개합니다.',
        category: 'development',
        subcategory: 'devops',
        tags: ['Docker', 'CI/CD', 'DevOps'],
        publishedAt: '2024-01-25',
        updatedAt: '2024-01-25',
        readTime: 20
    },
    {
        id: '5',
        title: '웹 성능 최적화 기법',
        content: '웹 애플리케이션의 성능을 향상시키는 다양한 기법들...',
        excerpt: '웹 애플리케이션의 로딩 속도와 사용자 경험을 개선하는 성능 최적화 기법들을 정리했습니다.',
        category: 'troubleshooting',
        subcategory: 'performance',
        tags: ['Performance', 'Optimization', 'Web'],
        publishedAt: '2024-01-12',
        updatedAt: '2024-01-12',
        readTime: 10
    },
    {
        id: '6',
        title: '자주 발생하는 JavaScript 버그 해결법',
        content: '개발 중 자주 마주치는 JavaScript 버그들과 해결 방법...',
        excerpt: '개발 과정에서 자주 마주치는 JavaScript 버그들과 효과적인 해결 방법을 소개합니다.',
        category: 'troubleshooting',
        subcategory: 'bugs',
        tags: ['JavaScript', 'Debugging', 'Bug Fix'],
        publishedAt: '2024-01-08',
        updatedAt: '2024-01-08',
        readTime: 7
    },
    {
        id: '7',
        title: 'VS Code 효율적 사용법',
        content: 'VS Code의 숨겨진 기능들과 생산성 향상 팁들...',
        excerpt: 'VS Code의 숨겨진 기능들과 개발 생산성을 크게 향상시킬 수 있는 실용적인 팁들을 공유합니다.',
        category: 'tips',
        tags: ['VS Code', 'Productivity', 'Development Tools'],
        publishedAt: '2024-01-18',
        updatedAt: '2024-01-18',
        readTime: 6
    },
    {
        id: '8',
        title: 'React 상태 관리 완벽 가이드',
        content: 'React에서 상태 관리를 위한 다양한 패턴과 라이브러리들...',
        excerpt: 'React 애플리케이션에서 상태 관리를 위한 다양한 패턴과 라이브러리들을 비교 분석합니다.',
        category: 'learning',
        subcategory: 'tutorials',
        tags: ['React', 'State Management', 'Redux', 'Zustand'],
        publishedAt: '2024-01-22',
        updatedAt: '2024-01-22',
        readTime: 25
    },
    {
        id: '9',
        title: '개발자 커리어 로드맵',
        content: '주니어에서 시니어 개발자로 성장하는 방법...',
        excerpt: '주니어 개발자가 시니어로 성장하기 위한 구체적인 로드맵과 필요한 역량들을 정리했습니다.',
        category: 'career',
        tags: ['Career', 'Growth', 'Developer'],
        publishedAt: '2024-01-05',
        updatedAt: '2024-01-05',
        readTime: 18
    }
];

export const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [posts] = useState<BlogPost[]>(samplePosts);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // 선택된 카테고리에 따라 포스트 필터링
    const filteredPosts = React.useMemo(() => {
        if (selectedCategory === 'all') {
            return posts;
        }
        
        // 메인 카테고리 또는 서브카테고리로 필터링
        return posts.filter(post => 
            post.category === selectedCategory || 
            post.subcategory === selectedCategory
        );
    }, [posts, selectedCategory]);

    return (
        <BlogContext.Provider value={{
            posts,
            selectedCategory,
            setSelectedCategory,
            filteredPosts
        }}>
            {children}
        </BlogContext.Provider>
    );
};

export const useBlog = () => {
    const context = useContext(BlogContext);
    if (context === undefined) {
        throw new Error('useBlog must be used within a BlogProvider');
    }
    return context;
};
