async function fetchData(divId, apiUrl) {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        document.getElementById(divId).innerText = data.message;
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById(divId).innerText = 'Failed to load data.';
    }
}

fetchData('lineChart', 'http://localhost:5000/');
fetchData('barChart', 'http://localhost:5000/get_data');