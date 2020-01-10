
class IssueFilter extends React.Component {
    render() {
        return(
            <div>Issue Filter Placeholder</div>
        )
    }
}

const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');
function jsonDateReviver(key, value) {
    if(dateRegex.test(value)) {
        return new Date(value);
    }
    return value;
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
                <td>{issue.due ? issue.due.toDateString() : ' '}</td>
                <td>{issue.title}</td>
            </tr>
        )
    }

async function graphQLFetch(query, variables = {}) {
    try {
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify({ query, variables })
        });
        const body = await response.text();
        const result = JSON.parse(body, jsonDateReviver);

        if(result.errors) {
            const error = result.errors[0];
            if(error.extensions.code === 'BAD_USER_INPUT') {
                const details = error.extensions.exception.errors.join('\n ');
                alert(`${error.message}: \n ${details}`);
            }else{
                alert(`${error.extensions.code}: ${error.message}`);
            }
        }
        return result.data;
    } catch (error) {
        alert(`Error in sending data to server: ${error.message}`);
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
            due: new Date(new Date().getTime() + 1000 * 3600 * 24 * 10)
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
    async loadData() {
        const query = `
            query {
                issueList {
                    id title status owner created effort due
                }
            }
        `;

        // const response = await fetch('/graphql', {
        //     method: 'POST',
        //     headers: { 'Content-Type' : 'application/json'},
        //     body: JSON.stringify( {query} )
        // });

        // const body = await response.text();
        // const result = JSON.parse( body, jsonDateReviver );
        
        // this.setState({issues: result.data.issueList});
        const data = await graphQLFetch(query);
        if(data) {
            this.setState( {issues: data.issueList} );
            }
        }
        
    

    async createIssue(issue) {
        const query = `mutation issueAdd($issue: IssueInputs!) {
            issueAdd(issue: $issue) {
              id
            }
          }`;

        // const response = await fetch('/graphql', {
        //     method: 'POST',
        //     headers: { 'Content-Type' : 'application/json'},
        //     body: JSON.stringify( {query, variables: { issue } } )
        // });
        // this.loadData();
        const data = await graphQLFetch(query, { issue });
        if(data) {
            this.loadData();
        }

    //     // set the issue id to the last id of the array issues plus 1
    //     issue.id = this.state.issues.length + 1;
    //     issue.created = new Date();
    //     // copy the current issues array into a new array called newIssueList
    //     const newIssueList = this.state.issues.slice();
    //     // push the new issue to the new array
    //     newIssueList.push(issue);
    //     // update the state to newIssueList which has the last issue
    //     this.setState({issues: newIssueList});

        
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


// mutation {     
//     issueAdd( issue:{         
//         title: "Completion date should be optional",         
//         owner: "Pieta",         
//         due: "2018-12-13",    
//     }) {         
//         id         
//         due        
//          created         
//          status    
//         } 
//     }

// C:\Users\C0383027.CAMOSUN\AppData\Local\MongoDBCompassCommunity\MongoDBCompassCommunity.exe