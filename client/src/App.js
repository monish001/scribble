import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom"; import HomePage from "./pages/HomePage";
import NotePage from "./pages/NotePage";
import AdminPage from "./pages/AdminPage";
import './App.css';

function App() {
	const [test, setTest] = React.useState(null);

	React.useEffect(() => {
		fetch('/api/common/health')
			.then(results => results.json())
			.then(data => setTest(JSON.stringify(data)));
	}, []);

	return (
		<Router>
			<div>
				<p>{test}</p>
				<nav>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/dashboard">Dashboard</Link>
						</li>
					</ul>
				</nav>

				{/* A <Switch> looks through its children <Route>s and
					renders the first one that matches the current URL. */}
				<Switch>
					<Route path="/notes/:noteId">
						<NotePage />
					</Route>
					<Route path="/dashboard">
						<AdminPage />
					</Route>
					<Route path="/">
						<HomePage />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
