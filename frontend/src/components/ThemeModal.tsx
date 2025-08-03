import React from "react";

interface ThemeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onThemeSelect: (theme: string) => void;
    currentTheme: string;
}

const ThemeModal: React.FC<ThemeModalProps> = ({ isOpen, onClose, onThemeSelect, currentTheme }) => {
    if (!isOpen) return null;

    const themes = [
        { 
            name: 'Light Blue', 
            value: 'light-blue',
            primary: '#2196f3',
            secondary: '#64b5f6',
            background: '#ffffff',
            surface: '#f5f5f5'
        },
        { 
            name: 'Light Green', 
            value: 'light-green',
            primary: '#66bb6a',
            secondary: '#81c784',
            background: '#ffffff',
            surface: '#e8f5e9'
        },
        { 
            name: 'Dark Blue', 
            value: 'dark-blue',
            primary: '#1976d2',
            secondary: '#42a5f5',
            background: '#121212',
            surface: '#1e1e1e'
        },
    ];

    return (
        <>
            <div style={styles.backdrop} onClick={onClose} />
            <div style={styles.dialog}>
                <div style={styles.dialogTitle}>
                    <h2 style={styles.title}>Select Theme</h2>
                </div>
                <div style={styles.dialogContent}>
                    <div style={styles.themeGrid}>
                        {themes.map((theme) => (
                            <div
                                key={theme.value}
                                style={{
                                    ...styles.themeCard,
                                    ...(currentTheme === theme.value ? styles.themeCardActive : {}),
                                    backgroundColor: theme.background,
                                }}
                                onClick={() => onThemeSelect(theme.value)}
                            >
                                <div style={styles.colorPreview}>
                                    <div style={{...styles.colorCircle, backgroundColor: theme.primary}} />
                                    <div style={{...styles.colorCircle, backgroundColor: theme.secondary}} />
                                    <div style={{...styles.colorCircle, backgroundColor: theme.surface}} />
                                </div>
                                <span style={{
                                    ...styles.themeName,
                                    color: theme.background === '#121212' ? '#ffffff' : '#000000'
                                }}>
                                    {theme.name}
                                </span>
                                {currentTheme === theme.value && (
                                    <div style={styles.checkmark}>✓</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div style={styles.dialogActions}>
                    <button style={styles.button} onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    backdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1200,
        backdropFilter: 'blur(4px)',
    },
    dialog: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 11px 15px -7px rgba(0,0,0,0.2), 0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12)',
        zIndex: 1300,
        minWidth: '400px',
        maxWidth: '600px',
        maxHeight: '80vh',
        overflow: 'hidden',
    },
    dialogTitle: {
        padding: '16px 24px',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    title: {
        margin: 0,
        fontSize: '1.25rem',
        fontWeight: 500,
        lineHeight: 1.6,
        letterSpacing: '0.0075em',
    },
    dialogContent: {
        padding: '8px 24px',
        overflowY: 'auto',
    },
    dialogActions: {
        padding: '8px',
        display: 'flex',
        justifyContent: 'flex-end',
        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    },
    themeGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        padding: '16px 0',
    },
    themeCard: {
        position: 'relative',
        padding: '16px',
        borderRadius: '8px',
        border: '1px solid rgba(0, 0, 0, 0.12)',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
    },
    themeCardActive: {
        border: '2px solid #2196f3',
        boxShadow: '0 0 0 1px #2196f3',
    },
    colorPreview: {
        display: 'flex',
        gap: '8px',
    },
    colorCircle: {
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    themeName: {
        fontSize: '0.875rem',
        fontWeight: 500,
        letterSpacing: '0.01071em',
    },
    checkmark: {
        position: 'absolute',
        top: '8px',
        right: '8px',
        color: '#2196f3',
        fontSize: '18px',
        fontWeight: 'bold',
    },
    button: {
        padding: '6px 16px',
        fontSize: '0.875rem',
        fontWeight: 500,
        letterSpacing: '0.02857em',
        textTransform: 'uppercase',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: 'transparent',
        color: '#2196f3',
        cursor: 'pointer',
        transition: 'background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        minWidth: '64px',
    },
};

export default ThemeModal;