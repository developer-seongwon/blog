import React from "react";

const Git: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <h2>My GitHub Contributions</h2>
            <img
                src="https://ghchart.rshah.org/your-github-username"
                alt="GitHub Contributions Chart"
                style={{ width: '100%', maxWidth: '800px' }}
            />
        </div>
    )
}