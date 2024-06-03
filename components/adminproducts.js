// TODO: send product information
async function saveProduct(authenticated, data={}, file=null){
    
    if(authenticated){

        // const queryString = new URLSearchParams(data).toString();
        
        // Create a FormData object to send the data via fetch api
        let formData = new FormData();
        formData.append("data", JSON.stringify(data));
        formData.append("file", file);

        const request = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${authenticated}`
            },
            body: formData
        };
        
        const api = "http://localhost:8080/admin/api/product/add"

        // Send the request
        const response = await fetch(api, request);
        const status = response.status;
        let result = null;

        if(status === 201){
            result = await response.json();
            return result;
        }
        
        return;

    }
    return;
};