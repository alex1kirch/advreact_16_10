import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List} from 'react-virtualized'
import {TransitionMotion, spring} from 'react-motion'
import {fetchAll, peopleListSelector} from '../../ducks/people'
import PersonRow from './PersonRow'

class PeopleList extends Component {
    static propTypes = {};

    componentDidMount() {
        this.props.fetchAll()
    }

    componentDidUpdate({people}) {
        if (people.length && this.props.people.length > people.length) {
            setTimeout(() => {
                this.list.scrollToRow(this.props.people.length)
            }, 0)
        }
    }

    render() {
        return (
            <TransitionMotion
                willEnter={this.willEnter}
                styles={this.getStyles}
            >
                {interpolatedStyles =>
                    <List
                        rowCount={interpolatedStyles.length}
                        height={200}
                        width={500}
                        rowHeight={100}
                        rowRenderer={this.rowRenderer(interpolatedStyles)}
                        ref={this.setListRef}
                    />
                }
            </TransitionMotion>
        )
    }

    rowRenderer = interpolatedStyles => ({index, key, style}) =>
        <PersonRow person={this.props.people[index]} key={key}
                   style={{...style, ...interpolatedStyles[index].style}}/>

    willEnter = () => ({
        opacity: 0
    })

    getStyles = () => this.props.people.map(person => ({
        key: person.uid,
        style: {
            opacity: spring(1)
        },
        data: person
    }))

    setListRef = ref => this.list = ref
}

export default connect(state => ({
    people: peopleListSelector(state)
}), {fetchAll})(PeopleList)