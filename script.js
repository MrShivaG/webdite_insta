document.getElementById('urlForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const url = document.getElementById('urlInput').value;
    const category = document.getElementById('categorySelect').value;

    if (!url || !category) {
        alert('Please fill in both fields.');
        return;
    }

    const data = {
        category: category,
        url: url
    };

    fetch('data.json')
        .then(response => response.json())
        .then(json => {
            json.push(data);
            const jsonData = JSON.stringify(json, null, 2);

            fetch('save_data.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonData
            })
            .then(response => {
                if (response.ok) {
                    alert('Data saved successfully!');
                    document.getElementById('urlForm').reset();
                } else {
                    alert('Failed to save data.');
                }
            })
            .catch(error => console.error('Error:', error));
        })
        .catch(error => console.error('Error fetching JSON:', error));
});
