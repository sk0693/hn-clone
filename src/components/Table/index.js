import React from 'react'
import './styles.css';

const Table = (props) => {

    const todayDate = new Date();

    const calcDate = (old_data) => {
        let diff = Math.floor(todayDate.getTime() - old_data.getTime());
        let hour = 1000 * 60 * 60;
        let day = 1000 * 60 * 60 * 24;

        let hours = Math.floor(diff / hour);
        let days = Math.floor(diff / day);
        let months = Math.floor(days / 31);
        let years = Math.floor(months / 12);

        if (years > 0) return (years + ' years');
        if (months > 0) return (months + ' months');
        if (days > 0) return (days + ' days');
        if (hours > 0) return (hours + ' hours');
    }

    const getSite = (url) => {
        if (!url) return '-';
        let data = new URL(url);
        return data.hostname;
    }

    const renderTableData = (payload) => {
        if (payload.loading) {
            return (
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Loading...</td>
                </tr>
            )
        }
        return payload.hits.map((news, index) => {
            const { objectID, num_comments, points, title, url, author, created_at } = news //destructuring
            return (
                <tr key={objectID}>
                    <td>{num_comments}</td>
                    <td>{points}</td>
                    <td>
                        <div id="triangle"></div>
                    </td>
                    <td>
                        <span className="title">
                            {title}
                        </span>

                        <span className="site">
                            ( {getSite(url)} ) by
                        </span>

                        <span className="author">
                            {author}
                        </span>
                        <span className="site">
                            {calcDate(new Date(created_at))} ago
                        </span>
                        <span className="hide">hide</span>
                    </td>
                </tr>
            )
        })
    }

    return (
        <div>
            <table id='news'>
                <thead>
                    <tr>
                        <th>Comments</th>
                        <th>Vote Count</th>
                        <th>UpVote</th>
                        <th>News Details</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableData(props.payload)}
                </tbody>
                <tfoot >
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="paginateButtons">
                            <span className="previous">Previous</span>
                            <span> | </span>
                            <span className="next">Next</span>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Table;