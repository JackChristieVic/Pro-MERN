
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
    // {
    //     id: 4, status: 'New', owner: 'Jill', effort: 10,         
    //     created: new Date(' 2018-09-16'), due: new Date(' 2018-10-30'),       title: 'No response when user clicks the submit button. From time to time, the whole webpage freezes'
    // }
];

const sampleIssue = {
    status: 'New', owner: 'Pieta',
    title: 'Completion date shouled be optional.'
};

// create an empty object to copy sampleIssue into
// const emptyIssue = {}

class IssueFilter extends React.Component {
    render() {
        return(
            <div>Issue Filter Placeholder</div>
        )
    }
}

class IssueRow extends React.Component {
    render() {
        const issue = this.props.issue;
        console.log('IssueRow Render is called')
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

class IssueTable extends React.Component {
    constructor() {
        super();
        // this.state = {issues: initialIssues};
        this.state = {issues: []};
        setTimeout(() => {
            this.createIssue(sampleIssue);
        }, 2000);
        //create another issue using the copy of the sampleIssue
        // setTimeout(() => {
        //     this.createIssue(Object.assign(emptyIssue, sampleIssue));
        // }, 2000)

    }


    componentDidMount() {
        this.loadDate();
    }

    loadDate() {
        setTimeout(() => {
            this.setState({issues: initialIssues});
        }, 500)
    }

    createIssue(issue) {
        issue.id = this.state.issues.length + 1;
        issue.created = new Date();
        let newIssueList = this.state.issues.slice();
        newIssueList.push(issue);
        this.setState({issues: newIssueList});
    }

    render() {
             const issueRows = this.state.issues.map(issue => 
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
}

class IssueAdd extends React.Component {
    render() {
        return (
            <div>Issue Add Placeholder</div>
        )
    }
}

class IssueList extends React.Component {
    render() {
        return (
            <React.Fragment>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable />
                <hr />
                <IssueAdd />
            </React.Fragment>
        )
    }
}

const element = <IssueList /> 
ReactDOM.render(element, document.getElementById('contents'))