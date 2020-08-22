import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";

function HomePage() {
	return <>
		<h2>Home</h2>
		<div>
			<Link to={`/new/${uuidv4()}`}>New</Link>
		</div>
	</>;
}

export default HomePage;