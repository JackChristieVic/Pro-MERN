"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var initialIssues = [{
  id: 1,
  status: 'New',
  owner: 'Ravan',
  effort: 5,
  created: new Date(' 2018-08-15'),
  due: undefined,
  title: 'Error in console when clicking Add'
}, {
  id: 2,
  status: 'Assigned',
  owner: 'Eddie',
  effort: 14,
  created: new Date(' 2018-08-16'),
  due: new Date(' 2018-08-30'),
  title: 'Missing bottom border on panel'
}, {
  id: 3,
  status: 'New',
  owner: 'Sam',
  effort: 1,
  created: new Date(' 2018-08-16'),
  due: new Date(' 2018-09-30'),
  title: 'Not showing anything'
}, {
  id: 4,
  status: 'New',
  owner: 'Jill',
  effort: 10,
  created: new Date(' 2018-09-16'),
  due: new Date(' 2018-10-30'),
  title: 'No response when user clicks the submit button. From time to time, the whole webpage freezes'
}]; // const sampleIssue = {
//     status: 'New', owner: 'Pieta',
//     title: 'Completion date shouled be optional.'
// };
// create an empty object to copy sampleIssue into
// const emptyIssue = {}

var IssueFilter =
/*#__PURE__*/
function (_React$Component) {
  _inherits(IssueFilter, _React$Component);

  function IssueFilter() {
    _classCallCheck(this, IssueFilter);

    return _possibleConstructorReturn(this, _getPrototypeOf(IssueFilter).apply(this, arguments));
  }

  _createClass(IssueFilter, [{
    key: "render",
    value: function render() {
      return React.createElement("div", null, "Issue Filter Placeholder");
    }
  }]);

  return IssueFilter;
}(React.Component);

var IssueRow =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(IssueRow, _React$Component2);

  function IssueRow() {
    _classCallCheck(this, IssueRow);

    return _possibleConstructorReturn(this, _getPrototypeOf(IssueRow).apply(this, arguments));
  }

  _createClass(IssueRow, [{
    key: "render",
    value: function render() {
      var issue = this.props.issue; // console.log('IssueRow Render is called')

      return React.createElement("tr", null, React.createElement("td", null, issue.id), React.createElement("td", null, issue.status), React.createElement("td", null, issue.owner), React.createElement("td", null, issue.created.toDateString()), React.createElement("td", null, issue.effort), React.createElement("td", null, issue.due ? issue.due.toDateString() : new Date(' 2018-12-24').toDateString()), React.createElement("td", null, issue.title));
    }
  }]);

  return IssueRow;
}(React.Component);

var BorderedWarp =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(BorderedWarp, _React$Component3);

  function BorderedWarp() {
    _classCallCheck(this, BorderedWarp);

    return _possibleConstructorReturn(this, _getPrototypeOf(BorderedWarp).apply(this, arguments));
  }

  _createClass(BorderedWarp, [{
    key: "render",
    value: function render() {
      var borderedStyle = {
        border: "1px solid black",
        padding: 6
      };
      return React.createElement("div", {
        style: borderedStyle
      }, this.props.children);
    }
  }]);

  return BorderedWarp;
}(React.Component);

var IssueTable =
/*#__PURE__*/
function (_React$Component4) {
  _inherits(IssueTable, _React$Component4);

  function IssueTable() {
    _classCallCheck(this, IssueTable);

    return _possibleConstructorReturn(this, _getPrototypeOf(IssueTable).apply(this, arguments));
  }

  _createClass(IssueTable, [{
    key: "render",
    value: function render() {
      var issueRows = this.props.issues.map(function (issue) {
        return React.createElement(IssueRow, {
          key: issue.id,
          issue: issue
        });
      });
      return React.createElement("table", {
        className: "bordered-table"
      }, React.createElement("thead", null, React.createElement("th", null, "ID"), React.createElement("th", null, "Status"), React.createElement("th", null, "Owner"), React.createElement("th", null, "Created"), React.createElement("th", null, "Effort"), React.createElement("th", null, "Due Date"), React.createElement("th", null, "Title")), React.createElement("tbody", null, issueRows));
    }
  }]);

  return IssueTable;
}(React.Component);

var IssueAdd =
/*#__PURE__*/
function (_React$Component5) {
  _inherits(IssueAdd, _React$Component5);

  function IssueAdd() {
    var _this;

    _classCallCheck(this, IssueAdd);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(IssueAdd).call(this));
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(IssueAdd, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var form = document.forms.issueAdd;
      var issue = {
        owner: form.owner.value,
        title: form.title.value,
        status: 'New'
      };
      this.props.createIssue(issue);
      form.owner.value = '';
      form.title.value = '';
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("form", {
        name: "issueAdd",
        onSubmit: this.handleSubmit
      }, React.createElement("input", {
        type: "text",
        name: "owner",
        placeholder: "Owner"
      }), React.createElement("input", {
        type: "text",
        name: "title",
        placeholder: "Title"
      }), React.createElement("button", null, "Add"));
    }
  }]);

  return IssueAdd;
}(React.Component);

var IssueList =
/*#__PURE__*/
function (_React$Component6) {
  _inherits(IssueList, _React$Component6);

  function IssueList() {
    var _this2;

    _classCallCheck(this, IssueList);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(IssueList).call(this)); // set the state variable issues to an empty array

    _this2.state = {
      issues: []
    }; // bind the createIssue method to keyword 'this'
    // the createIssue method also updates the state

    _this2.createIssue = _this2.createIssue.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(IssueList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // call the loadData method when the component mount because the DOM is ready, component can be re-rendered
      this.loadData();
    } // load the data of the array into the state variable issues

  }, {
    key: "loadData",
    value: function loadData() {
      var _this3 = this;

      setTimeout(function () {
        _this3.setState({
          issues: initialIssues
        });
      }, 500);
    }
  }, {
    key: "createIssue",
    value: function createIssue(issue) {
      // set the issue id to the last id of the array issues plus 1
      issue.id = this.state.issues.length + 1;
      issue.created = new Date(); // copy the current issues array into a new array called newIssueList

      var newIssueList = this.state.issues.slice(); // push the new issue to the new array

      newIssueList.push(issue); // update the state to newIssueList which has the last issue

      this.setState({
        issues: newIssueList
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(React.Fragment, null, React.createElement("h1", null, "Issue Tracker"), React.createElement(IssueFilter, null), React.createElement("hr", null), React.createElement(IssueTable, {
        issues: this.state.issues
      }), React.createElement("hr", null), React.createElement(IssueAdd, {
        createIssue: this.createIssue
      }));
    }
  }]);

  return IssueList;
}(React.Component);

var element = React.createElement(IssueList, null);
ReactDOM.render(element, document.getElementById('contents'));