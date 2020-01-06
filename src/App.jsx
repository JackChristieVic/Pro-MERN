
const initialIssues = [    
    {
        id: 1, status: 'New', owner: 'Ravan', effort: 5,         
        created: new Date(' 2018-08-15'), due: undefined,         
        title: 'Error in console when clicking Add'
    },    
    {
        id: 2, status: 'Assigned', owner: 'Eddie', effort: 14,         created: new Date(' 2018-08-16'), due: new Date(' 2018-08-30'),       title: 'Missing bottom border on panel'
    },
    {
        id: 3, status: 'New', owner: 'Sam', effort: 1,         
        created: new Date(' 2018-08-16'), due: new Date(' 2018-09-30'),       title: 'Not showing anything'
    },
    {
        id: 4, status: 'New', owner: 'Jill', effort: 10,         
        created: new Date(' 2018-09-16'), due: new Date(' 2018-10-30'),       title: 'No response when user clicks the submit button. From time to time, the whole webpage freezes'
    }
];

// const sampleIssue = {
//     status: 'New', owner: 'Pieta',
//     title: 'Completion date shouled be optional.'
// };

// create an empty object to copy sampleIssue into
// const emptyIssue = {}

class IssueFilter extends React.Component {
    render() {
        return(
            <div>Issue Filter Placeholder</div>
        )
    }
}

function IssueRow (props) {

        const issue = props.issue;
        // console.log('IssueRow Render is called')
        return (
            <tr>
                <td>{issue.id}</td>
                <td>{issue.status}</td>
                <td>{issue.owner}</td>
                <td>{issue.created.toDateString()}</td>
                <td>{issue.effort}</td>
                <td>{issue.due ? issue.due.toDateString() :  (new Date(' 2018-12-24')).toDateString()}</td>
                <td>{issue.title}</td>
            </tr>
        )
    }


class BorderedWarp extends React.Component {
    render() {
        const borderedStyle = {border: "1px solid black", padding: 6}
        return (
            <div style={borderedStyle}>
                {this.props.children}
            </div>
        )
    }
}

function IssueTable(props) {
    const issueRows = props.issues.map(issue => 
            <IssueRow key={issue.id} issue={issue}/>
            ); 
    return (
        <table className="bordered-table">
            <thead >
                <th>ID</th>
                <th>Status</th>
                <th>Owner</th>
                <th>Created</th>
                <th>Effort</th>
                <th>Due Date</th>
                <th>Title</th>
            </thead>
            <tbody>
                {issueRows}
            </tbody>
        </table>
    )
}


class IssueAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.issueAdd
        const issue = {
            owner: form.owner.value,
            title: form.title.value,
            status: 'New'
        };
        // calling createIssue() method in IssueList component because it's passed in as a props in IssueList
        this.props.createIssue(issue);
        form.owner.value = '';
        form.title.value = '';
    }
    render() {
        return (
            <form name="issueAdd" onSubmit={this.handleSubmit}>
                <input type="text" name="owner" placeholder="Owner"/>
                <input type="text" name="title" placeholder="Title"/>
                <button>Add</button>
            </form>
        )
    }
}

class IssueList extends React.Component {
    constructor() {
        super();
        // set the state variable issues to an empty array
        this.state = { issues: [] };
        // createIssue() method is from IssueAdd component, but the keyword 'this' refers to the IssueList component. So we need to bind the createIssue method to keyword 'this'
        // the createIssue method also updates the state
        this.createIssue = this.createIssue.bind(this);
    }

    componentDidMount() {
        // call the loadData method when the component mount because the DOM is ready, component can be re-rendered
        this.loadData();
    }

    // load the data of the array into the state variable issues
    loadData() {
        setTimeout(() => {
            this.setState({issues: initialIssues});
        }, 500)
    }

    createIssue(issue) {
        // set the issue id to the last id of the array issues plus 1
        issue.id = this.state.issues.length + 1;
        issue.created = new Date();
        // copy the current issues array into a new array called newIssueList
        const newIssueList = this.state.issues.slice();
        // push the new issue to the new array
        newIssueList.push(issue);
        // update the state to newIssueList which has the last issue
        this.setState({issues: newIssueList});
    }
    
    render() {
        return (
            <React.Fragment>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                {/* passing the state variable issues as a prop to the IssueTable component. In IssueTable, we can use this.props.issues  */}
                <IssueTable issues={this.state.issues}/>
                <hr />
                {/* passing the createIssue method as a props to IssueAdd Component. In IssueAdd, use this.props.createIssue() to access this method */}
                <IssueAdd createIssue={this.createIssue}/>
            </React.Fragment>
        )
    }
}

const element = <IssueList /> 
ReactDOM.render(element, document.getElementById('contents'))