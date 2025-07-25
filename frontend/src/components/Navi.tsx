import React from "react";

const Navi: React.FC = () => {
    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>🌐 Developer Blog</div>
            <div style={styles.links}>
                <a href="#">Login</a>
                <a href="#">Theme</a>
            </div>
        </nav>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem 2rem',
        backgroundColor: '#fff',
        borderBottom: '1px solid #e0e0e0',
    },
    logo: {
        fontWeight: 'bold',
    },
    links: {
        display: 'flex',
        gap: '1rem',
    },
};

export default Navi;