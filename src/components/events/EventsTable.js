import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchAllEvents, selectEvent, selectedEventsSelector, eventListSelector, loadedSelector, loadingSelector} from '../../ducks/events'
import Loader from '../common/Loader'

export class EventsTable extends Component {
    static propTypes = {

    };

    componentDidMount() {
        this.props.fetchAllEvents()
        console.log('---', 'load events')
    }

    render() {
        if (this.props.loading) return <Loader />
        return (
            <div>
                {this.props.selected.length}
            <table>
                <tbody>
                    {this.getRows()}
                </tbody>
            </table>
            </div>
        )
    }

    getRows = () => this.props.events.map(this.getRow)

    getRow = (event) => (
        <tr key = {event.uid} onClick = {(uid) => this.props.selectEvent(event.uid) } className = 'test__events_row'>
            <td>{event.title}</td>
            <td>{event.when}</td>
            <td>{event.where}</td>
        </tr>
    )
}

export default connect((state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state),
    selected: selectedEventsSelector(state)
}), { fetchAllEvents, selectEvent })(EventsTable)