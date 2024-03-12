function generarPoblacionInicial(tamanoPoblacion, longitudBits) {
    let poblacion = [];
    for (let i = 0; i < tamanoPoblacion; i++) {
        let individuo = '';
        for (let j = 0; j < longitudBits; j++) {
            individuo += Math.random() < 0.5 ? '0' : '1';
        }
        poblacion.push(individuo);
    }
    return poblacion;
}

function binarioADecimal(binario) {
    let decimal = parseInt(binario, 2);
    if (binario[0] === '1') {
        decimal -= Math.pow(2, binario.length);
    }
    return decimal;
}

function calcularAptitud(x) {
    let y = -3 * Math.pow((x - 1), 2) + 0.7 * x + 3;
    return y;
}

function cruzamiento(padre1, padre2, puntoDeCruce) {
    console.log(`Punto de cruce: ${puntoDeCruce}`);
    console.log(`Padre 1: ${padre1}`);
    console.log(`Padre 2: ${padre2}`);
    let hijo1 = padre1.slice(0, puntoDeCruce) + padre2.slice(puntoDeCruce);
    let hijo2 = padre2.slice(0, puntoDeCruce) + padre1.slice(puntoDeCruce);
    console.log(`Hijo 1: ${hijo1}`);
    console.log(`Hijo 2: ${hijo2}`);
    return [hijo1, hijo2];
}

function mutacion(individuo, tasaMutacion) {
    let mutado = individuo;
    if (Math.random() < tasaMutacion) {
        let posicion1 = Math.floor(Math.random() * individuo.length);
        let posicion2;
        do {
            posicion2 = Math.floor(Math.random() * individuo.length);
        } while (posicion2 === posicion1); // Asegurar que la segunda posición sea diferente a la primera
        mutado = mutado.substring(0, posicion1) +
            (mutado[posicion1] === '0' ? '1' : '0') +
            mutado.substring(posicion1 + 1, posicion2) +
            (mutado[posicion2] === '0' ? '1' : '0') +
            mutado.substring(posicion2 + 1);
    }
    return mutado;
}

const tamanoPoblacion = 8;
const longitudBits = 8;
const tasaMutacion = 0.1;
const puntoDeCruce = Math.floor(Math.random() * longitudBits);

let poblacionInicial = generarPoblacionInicial(tamanoPoblacion, longitudBits);

console.log("Población inicial:");
for (let individuo of poblacionInicial) {
    let decimal = binarioADecimal(individuo);
    let aptitud = calcularAptitud(decimal);
    console.log(`Individuo: ${individuo}, Decimal: ${decimal}, Aptitud: ${aptitud}`);
}

let nuevaPoblacion = [];
for (let i = 0; i < poblacionInicial.length - 1; i += 2) {
    let padre1 = poblacionInicial[i];
    let padre2 = poblacionInicial[i + 1];
    let [hijo1, hijo2] = cruzamiento(padre1, padre2, puntoDeCruce);
    let hijo1Mutado = mutacion(hijo1, tasaMutacion);
    let hijo2Mutado = mutacion(hijo2, tasaMutacion);
    nuevaPoblacion.push(hijo1Mutado, hijo2Mutado);
}

console.log("\nNueva población después del cruzamiento y la mutación:");
for (let individuo of nuevaPoblacion) {
    let decimal = binarioADecimal(individuo);
    let aptitud = calcularAptitud(decimal);
    console.log(`Individuo: ${individuo}, Decimal: ${decimal}, Aptitud: ${aptitud}`);
}
