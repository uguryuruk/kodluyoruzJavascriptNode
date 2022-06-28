const circleArea = (radius) => {
    console.log("Dairenin alanı: ",radius**2*Math.PI);
}

const circleCircumference = (radius) => {
    console.log("Dairenin çevresi: ",2*radius*Math.PI);
}

module.exports={
    circleArea,
    circleCircumference
}