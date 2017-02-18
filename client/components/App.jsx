import React, { Component, PropTypes } from 'react';
//import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
//import { push } from 'react-router-redux';
import DevTools from '../utils/devtools';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import NotesActions from '../actions/NotesActions';

import NoteEditor from './NoteEditor.jsx';
import NotesGrid from './NotesGrid.jsx';

import './App.less';

class App extends Component {
    constructor(props) {
        super(props);
        this.props.dispatch(NotesActions.loadNotes());

        // Bind `this` within methods
        this.handleNoteDelete = this.handleNoteDelete.bind(this);
        this.handleNoteAdd = this.handleNoteAdd.bind(this);
    }

    handleNoteDelete(note) {
        this.props.dispatch(NotesActions.deleteNote(note.id));
    }

    handleNoteAdd(noteData) {
        this.props.dispatch(NotesActions.createNote(noteData));
    }

    render() {
        return (
            <div className='App'>
                <h2 className='App__header'>NotesApp</h2>
                <NoteEditor onNoteAdd={this.handleNoteAdd} />
                <NotesGrid notes={this.props.notes.notes} onNoteDelete={this.handleNoteDelete} />
                { process.env.NODE_ENV !== 'production' ? <DevTools /> : null }
            </div>
        );
    }
}

App.propsTypes = {
    notes: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        notes: state.notes
    };
}

export default connect(mapStateToProps)(App);