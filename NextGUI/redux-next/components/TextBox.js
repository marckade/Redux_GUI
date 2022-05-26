import React from 'react';
class TextBox extends React.Component {

    constructor(props) {
        super(props)
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.textboxName = props.textbox.name;
        this.submitMsg = props.textbox.submitMsg;
        console.log(props.textbox.name)
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }


    handleSubmit(event) {

        getRequest(this.state.value).then(data =>
            alert('You requested a default instance from: ' + this.state.value + ' you received the instance: ' + data.defaultInstance)

        );
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    {this.textboxName+': '}
                    <input type = "text" value = {this.state.value} onChange = {this.handleChange}/>
                </label>
                <input type="submit" value={this.submitMsg} />
            </form>
        )
    }
    
}


async function getRequest(endRoute) {
    const res = await fetch('http://redux.aws.cose.isu.edu:27000/'+endRoute)
    const data = await res.json();
    return data;
}
export default TextBox

