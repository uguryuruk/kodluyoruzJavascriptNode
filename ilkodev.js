//daire alanı hesaplayan fonksiyon

const arguments = process.argv.slice(2);

const calculateArea = (radius) => {
    console.log(`Yarıçapı ${radius} olan dairenin alanı: ${radius**2*Math.PI} `);
}

// calculateArea(parseInt(arguments[0]));
calculateArea(arguments[0]*1);
