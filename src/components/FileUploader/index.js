import {useState} from 'react';
import { Button, Alert , Form } from "react-bootstrap";
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';


export const FileUploader = ({setCids, setIpfsError, setSendingState}) => {
    
    const [files,setFiles]   = useState([]);
    
    const onInputChange = async (event) => {
        let file = event.target.files;

        let isExist = await checkFile(...file);

        if(isExist) return;

        files.push(...file);
        setFiles(files);

        // 显示已选择的文件
        let node   = document.createElement("li");
        let textNode = document.createTextNode(file[0].name);
        node.appendChild(textNode);
        document.getElementById("filesList").appendChild(node);
        document.getElementById("fl0").style.display = 'block';
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        const client = new Web3Storage({ token: process.env.REACT_APP_WEB3STORAGE_API_TOKEN });

        try {
            setSendingState(true);
            const rootCid = await client.put(files);
            console.log("Successfully sent to IPFS");
            console.log("https://" + rootCid + ".ipfs.dweb.link");
            setCids([rootCid]);
        } catch(e) {
            setIpfsError(true);
            console.log("Failed to send file to web3.storage");
            console.log(e);
            setSendingState(false);
        }

    }

    // 重新选择
    const onReset = () => {
        window.location.reload();
    }


    // 检测文件是否重复
    const checkFile = async (file) => {
        if(files.length <= 0) return false;

        for (let i = 0; i < files.length; i++) {
            if(file.name === files[i].name) {
                return true;
            }
        }

        return false;
    }

    return (
        <div>
            <Form method="post" action="#" id="#"  onSubmit={onSubmit}>
                <Form.Group className="mb-3 form-group files">
                    <input type="file"
                        onChange={onInputChange}
                        className="form-control"
                        multiple/>
                </Form.Group>

                <div id='fl0'>
                    <Alert variant='light'> 
                        Selected Files List
                    </Alert>
                    <ul id="filesList"> 
                    </ul>
                </div>

                <div className="btnGroup">
                    <Button variant="dark" type="submit">
                        Send via IPFS
                    </Button>
                    <Button className="btn-reset" variant="white" type="button" onClick={onReset}>
                        Reset
                    </Button>
                </div>
            </Form>
        </div>
    )
}