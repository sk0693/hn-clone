import React, { Component } from 'react'

class Table extends Component {
    constructor(props) {
        super(props)
        console.log('this.props.news', this.props.news );
    }

    renderTableHeader() {
        let header = Object.keys(this.state.students[0])
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    renderTableData() {
        return this.props.news.map((news, index) => {
            const { objectID, num_comments, points, title } = news //destructuring
            return (
                <tr key={objectID}>
                    <td>{num_comments}</td>
                    <td>{points}</td>
                    <td></td>
                    <td>{title}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <h1 id='title'>Hacker News Clone</h1>
                <table id='students'>
                    <tbody>
                        <tr>
                            <td>Comments</td>
                            <td>Votes Counts</td>
                            <td>UpVotes</td>
                            <td>News Details</td>
                        </tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Table