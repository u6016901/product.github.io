import React, { useEffect, useState } from "react";
export default class ButtonComponent extends React.Component {
    handleClick = () => {
        console.log(this.props.text);
    }

    render() {
        return (
            <button onClick={ this.handleClick }>
                { this.props.text }
            </button>
        );
    }
}