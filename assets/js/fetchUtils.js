async function fetchGet(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error in fetchGet:', error);
        throw error;
    }
}

async function fetchPost(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: data
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
}
export { fetchGet, fetchPost };