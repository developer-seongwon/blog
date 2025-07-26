import React, { useState, useEffect } from "react";
import ThemeModal from "./ThemeModal";
import GitHubIcon from '@mui/icons-material/GitHub';

const Navi: React.FC = () => {
    const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
    const [currentTheme, setCurrentTheme] = useState(() => {
        // localStorage에서 저장된 테마 가져오기
        return localStorage.getItem('selected-theme') || 'light-blue';
    });

    useEffect(() => {
        // 초기 테마 설정
        document.body.setAttribute('data-theme', currentTheme);
    }, [currentTheme]);

    const handleThemeSelect = (theme: string) => {
        setCurrentTheme(theme);
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('selected-theme', theme);
    };

    return (
        <>
            <nav style={styles.appBar}>
                <div style={styles.toolbar}>
                    <div style={styles.logo}>
                        <GitHubIcon sx={{ mr: 1 }} />
                        <span style={styles.logoText}>Developer Blog</span>
                    </div>
                    <div style={styles.actions}>
                        <button style={styles.textButton} className="nav-text-button">
                            Login
                        </button>
                        <button 
                            onClick={() => setIsThemeModalOpen(true)}
                            style={styles.textButton}
                            className="nav-text-button"
                        >
                            Theme
                        </button>
                    </div>
                </div>
            </nav>
            <ThemeModal 
                isOpen={isThemeModalOpen}
                onClose={() => setIsThemeModalOpen(false)}
                onThemeSelect={handleThemeSelect}
                currentTheme={currentTheme}
            />
        </>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    appBar: {
        position: 'relative',
        backgroundColor: 'var(--nav-background)',
        color: 'var(--text-primary)',
        boxShadow: 'var(--shadow-1)',
        transition: 'box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 24px',
        minHeight: '64px',
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    logoIcon: {
        fontSize: '28px',
    },
    logoText: {
        fontSize: '1.25rem',
        fontWeight: 500,
        letterSpacing: '0.0125em',
        color: 'var(--text-primary)',
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    textButton: {
        padding: '8px 16px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: 500,
        letterSpacing: '0.02857em',
        textTransform: 'uppercase',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        color: 'var(--primary-color)',
        position: 'relative',
        overflow: 'hidden',
    },
};

// Add hover effect styles
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    /* Theme-specific hover backgrounds */
    [data-theme="light-blue"] .nav-text-button:hover {
        color: var(--light-primary-300) !important;
        background-color: var(--light-primary-50) !important;
    }
    
    [data-theme="light-green"] .nav-text-button:hover {
        color: var(--light-success-300) !important;
        background-color: var(--light-success-50) !important;
    }
    
    [data-theme="dark-blue"] .nav-text-button:hover {
        color: var(--dark-primary-300) !important;
        background-color: rgba(33, 150, 243, 0.08) !important;
    }
    
    /* Active state */
    .nav-text-button:active {
        opacity: 0.8;
    }
    
    /* Ripple effect */
    .nav-text-button::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: var(--primary-color);
        opacity: 0.2;
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s;
    }
    
    .nav-text-button:active::before {
        width: 100px;
        height: 100px;
    }
`;
document.head.appendChild(styleSheet);

export default Navi;