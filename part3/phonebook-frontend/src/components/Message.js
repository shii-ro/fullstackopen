const Message = ({ msg }) => {
    if (msg === null) return (<div></div>)

    const styleSuccess = {
        border: 'solid darkgreen 5px',
        color: 'green',
        padding: '10px',
        fontSize: '20'
    }

    const styleFailure = {
        border: 'solid darkred 5px',
        color: 'red',
        padding: '10px',
        fontSize: '20'
    }

    const style = (msg.type) ? styleSuccess : styleFailure

    return (
        <div style={style}>{msg.content}</div>
    )
}

export default Message;