import { Alert } from "react-bootstrap";

export const ShowFiles = ({files}) => {  

    return (
        <div>
            <Alert variant='light'> 
                Show Files List
            </Alert>
            <ul className="ulList"> 
                {files.map(function(data, index) {
                    return <li key={index}>{data.name}</li>
                })}
            </ul>
        </div>
    )
}