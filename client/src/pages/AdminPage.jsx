import React from 'react';
import NotesRepository from '../repositories/NoteRepository';

function AdminPage() {
	const [isFetching, setIsFetching] = React.useState(true);
	const [errorFetching, setErrorFetching] = React.useState(null);
	const [notes, setNotes] = React.useState([]);

	React.useEffect(() => {
		async function initialiseNotes() {
			try {
				const _notes = await NotesRepository.getAll();
				setNotes(_notes);
			} catch (e) {
				setErrorFetching('Something went wrong! Please try after some time!');
				console.error(e);
			} finally {
				setIsFetching(false);
			}
		}
		initialiseNotes();
	}, []);

	return <>
		<h2>Notes</h2>
		{isFetching && <p>Loading...</p>}
		{!isFetching && !errorFetching && <table>
			<thead>
				<tr>
					<th>Note Id</th>
					<th>Text</th>
					<th>Create At</th>
				</tr>
			</thead>
			<tbody>
				{notes.map(note => <tr key={note.getId()}>
					<td>{note.getId()}</td>
					<td>{note.getText()}</td>
					<td>{note.getCreatedAt()}</td>
				</tr>)}
			</tbody>
		</table>}
		{!isFetching && errorFetching && <p>{errorFetching}</p>}
	</>;
}

export default AdminPage;