const fs = require('fs');

//oluşturma
fs.writeFile('employees.json', '{"name": "Employee 1 Name", "salary": 2000}', 'utf-8', (err) => {
    if (err) console.log(err);
    console.log('dosya oluşturuldu');
});

//güncelleme
fs.appendFile('employees.json', '\n{"name": "Employee 2 Name", "salary": 3000}', 'utf-8', (err) => {
    if (err) console.log(err);
    console.log('dosya güncellendi');
})
// okuma
fs.readFile('employees.json', 'utf-8', (err, data) => {
    if (err) console.log(err);
    console.log(data);
})

    // silme-- ayrıca çalıştırınız.
    fs.unlinkSync('employees.json', (err) => {
        if (err) console.log(err);
        console.log('dosya silindi');
    });




