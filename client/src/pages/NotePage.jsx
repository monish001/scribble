import React, { useCallback } from 'react';
import NotesRepository from '../repositories/NoteRepository';
import { useParams } from "react-router-dom"
var debounce = require('debounce-promise')

const AUTO_SAVE__DEBOUNCE_TIME = 500;

function NotePage() {
	const { noteId } = useParams();
	const [isFetching, setIsFetching] = React.useState(true);
	const [noteText, setNoteText] = React.useState('');
	const [errorFetching, setErrorFetching] = React.useState(null);

	const [isSaving, setIsSaving] = React.useState(false);
	const [errorSaving, setErrorSaving] = React.useState(null);

	async function handleChange(e) {
		const newText = e.target.value
		setNoteText(newText);
		debouncedSave(newText);
	}

	React.useEffect(() => {
		async function initialiseNote() {
			try {
				const note = await NotesRepository.get(noteId);
				setNoteText(note.getText());
			} catch (e) {
				setErrorFetching('Something went wrong! Please try after some time!');
				console.error(e);
			} finally {
				setIsFetching(false);
			}
		}
		initialiseNote();
	}, []);

	const save = async (newText) => {
		try {
			setIsSaving(true);
			await NotesRepository.update(noteId, { text: newText });
			setErrorSaving(null);
		} catch (e) {
			setErrorSaving('Something went wrong! Please try after some time!');
			console.error(e);
		} finally {
			setIsSaving(false);
		}
	}
	const debouncedSave = useCallback(debounce(save, AUTO_SAVE__DEBOUNCE_TIME), []);

	return <>
		<h2>Notes</h2>
		{isFetching && <p>Loading...</p>}
		{!isFetching && !errorFetching && <textarea value={noteText} onChange={handleChange} />}
		{!isFetching && errorFetching && <p>{errorFetching}</p>}
		{isSaving && <p>Saving...</p>}
		{!isSaving && !errorSaving && <p>Saved!</p>}
		{!isSaving && errorSaving && <p>{errorSaving}</p>}
	</>;
}

export default NotePage;