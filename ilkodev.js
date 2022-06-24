//daire alanı hesaplayan fonksiyon

const arguments = process.argv.slice(2);

const calculateArea = (perimeter) => {
    console.log(`Yarıçapı ${perimeter} olan dairenin alanı: ${perimeter**2*Math.PI} `);
}

// calculateArea(parseInt(arguments[0]));
calculateArea(arguments[0]*1);
