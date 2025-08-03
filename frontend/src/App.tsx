import './App.css'
import './styles/themes.css'
import Navi from './components/Navi.tsx';
import CategoryMenu from './components/CategoryMenu.tsx';
import BlogPostList from './components/BlogPostList.tsx';
import GitHubContributions from "./components/GitContributions.tsx";
import { BlogProvider } from './context/BlogContext.tsx';

function App() {

    return (
        <BlogProvider>
            <Navi/>
            <div style={styles.mainContainer} className="main-container-app">
                {/* 상단 깃 컨트리뷰션 */}
                <GitHubContributions />
                
                {/* 카테고리와 포스트를 나란히 배치 */}
                <div style={styles.categoryPostWrapper} className="category-post-wrapper">
                    {/* 좌측 카테고리 메뉴 */}
                    <aside style={styles.categorySidebar} className="category-sidebar">
                        <CategoryMenu />
                    </aside>
                    
                    {/* 우측 블로그 포스트 목록 */}
                    <main style={styles.postSection} className="post-section">
                        <BlogPostList />
                    </main>
                </div>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </BlogProvider>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    mainContainer: {
        width: '80%',
        margin: '0 auto',
        padding: '24px 16px',
    },
    categoryPostWrapper: {
        display: 'flex',
        gap: '24px',
        alignItems: 'flex-start',
    },
    categorySidebar: {
        flexShrink: 0,
        width: '280px',
    },
    postSection: {
        flex: 1,
        minWidth: 0, // flexbox에서 overflow 방지
    },
};

// 반응형 디자인을 위한 CSS 추가
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    /* 반응형 디자인 */
    @media (max-width: 768px) {
        .category-post-wrapper {
            flex-direction: column;
        }
        
        .category-sidebar {
            width: 100%;
        }
        
        .main-container-app {
            padding: 16px 8px;
        }
    }
`;
document.head.appendChild(styleSheet);

export default App
