function tick() {

    const element = (
        <div>
            <h1>안녕, 리엑트!</h1>
            <H2>현재 시간: {new Date().toLocalTimeString()}</H2>
        </div>
        
        );

    ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);