import React, { useState } from 'react'

export default function CheckBoxList(props) {
    const [checkbox, checkboxchange] = useState(false);
    return (
        <div>
            <div className="form-check mt-3">
                <input
                checked={checkbox}
                onChange={(e) => checkboxchange(e.target.checked)}
                type="checkbox"
                className="form-check-input mb-5"
                ></input>
                <label className="form-check-label ms-2">{props.name}</label>
            </div>
        </div>
    )
}