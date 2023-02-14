import React from 'react';
import './RerollButton.css';

function RerollButton({onReroll}) {
    return (
        <div>
            <button className="reroll-button" onClick={onReroll}>Reroll</button>
        </div>
    )
}

export default RerollButton;