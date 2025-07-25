import React from "react";
import GitHubCalendar from "react-github-calendar";

const GitCalendar: React.FC = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
    <div style={{ padding: '2rem', backgroundColor: '#0d1117', color: '#c9d1d9' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {/* days */}
            <div style={{ paddingTop: '20px', paddingRight: '8px', display: 'flex', flexDirection: 'column' }}>
                {days.map((day, index) => (
                    <div key={day} style={{ minHeight: '21px', textAlign: 'center', fontSize: '14px' }}>
                        {index % 2 === 0 ? '' : day.slice(0, 3)}
                    </div>
                ))}
            </div>
            <GitHubCalendar
                username="developer-seongwon"
                blockSize={15}
                blockMargin={5}
                colorScheme="dark"
            />
        </div>
    </div>
    )
}

export default GitCalendar;