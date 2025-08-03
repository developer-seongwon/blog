import './App.css'
import './styles/themes.css'
import Navi from './components/Navi.tsx';
// import GitCalendar from './components/GitCalendar.tsx';
import GitHubContributions from "./components/GitContributions.tsx";

function App() {

    return (
        <>
            <Navi/>
            <div style={{
                width: '80%', 
                margin: 'auto',
                paddingTop: '2rem',
            }}>
                <GitHubContributions />
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
