import React from 'react'
import { shallow } from 'enzyme'
import { configure } from 'enzyme';
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16';
import App from '../src/App'

configure({ adapter: new Adapter() });

describe('App', () => {
    it('renders without crashing given the required props', () => {
        const props = {
            hits: [
                {
                    created_at: "2018-03-14T03:50:30.000Z",
                    title: "Stephen Hawking has died",
                    url: "http://www.bbc.com/news/uk-43396008",
                    author: "Cogito",
                    points: 6015,
                    story_text: null,
                    comment_text: null,
                    num_comments: 436,
                    story_id: null,
                    story_title: null,
                    story_url: null,
                    parent_id: null,
                    created_at_i: 1520999430,
                    relevancy_score: 8012,
                    objectID: "16582136",
                }
            ]
        }
        const wrapper = shallow(<App {...props} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})