const continents = ['Africa', 'America', 'Asia', 'Australia', 'Europe'];
const helloContinets = Array.from(continents, c => `Hello ${c}!`);
const message = helloContinets.join(' ');

const element = (
    <div title='Outer div'>
        <h1 className="H1_Header">{message}</h1>
    </div>
)


ReactDOM.render( element, document.getElementById('contents'))